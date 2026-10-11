# Invoice Processing Agent — Capability and Integration Contracts

## Implementation status

The agent is one standard configuration with two included capabilities. It is invoked only by one workflow, **Invoice Intake and Approval**, through the Workflows Agent node. The workflow owns everything around the agent: the email trigger, the environment variables, saving the PDF, the decision check, the approval and the emails to Finance and to the sender. Copilot creates it from the prompt in [Step 3-3 of the Runbook](../3.Runbook.md#step-3-3-build-the-workflow-invoice-intake-and-approval). The agent owns reading the PDF, writing the Dataverse row and writing the review JSON file.

Delivered assets are documentation and runtime skill definitions only. No deployed agent, workflow export, connection, Dataverse environment, sample tenant data or successful tenant test is included. Each statement below carries one label:

| Label | Meaning |
|---|---|
| **Documented** | Supported by the linked Microsoft documentation |
| **Design choice** | A boundary or convention selected for this scenario |
| **Scenario-defined contract** | An interface that operators implement during setup |
| `[VERIFY]` | A tenant check with a named owner, listed in the [release gates](README.md#release-gates) |
| `[FILL]` | A deployment value supplied by its owner, kept out of runtime skills |

## Capability matrix

Both capabilities are in the standard configuration and enabled together. Disabling a skill does not revoke its tools. Tool exposure, connection permissions and the workflow are disabled separately (see the rollback steps in the [Runbook](../3.Runbook.md#phase-5-deployment)).

| Capability ID / linked SKILL.md | Behavior and boundary | Tools or knowledge | Actual implementation / operation ID | Dependencies | Standard inclusion / access / authorization |
|---|---|---|---|---|---|
| [invoice-extraction-review](Skills/invoice-extraction-review/SKILL.md) | Takes the invoice from a PDF attachment in the chat or from a SharePoint document-library link, and asks for the invoice when neither is present. Creates a sharing link for the file (Source Link), extracts 11 fields and leaves a field that is not on the invoice empty instead of guessing. Works out Issues Found (the missing fields, separated by semicolons), a one-sentence Summary and the Decision (`READY_FOR_APPROVAL` only when all 11 fields were found, otherwise `NEEDS_REVIEW`), then creates one new row in the **Auto Invoice Review** table. It checks that fields are present, not that the amounts add up, and it does not write the Review Link | SharePoint file content (link input), `CreateSharingLink`, Dataverse create a row | SharePoint MCP and Dataverse MCP tools plus the `CreateSharingLink` tool, as configured in [Step 3-1 of the Runbook](../3.Runbook.md#step-3-1-create-the-agent). Whether the harness reads PDF content returned by the SharePoint tool: `[VERIFY]` G1. The Source Link of a chat attachment, which has no SharePoint item: `[VERIFY]` G5 | The table from [Step 2-2 of the Runbook](../3.Runbook.md#step-2-2-create-table) and the agent from Step 3-1 of the Runbook | Included. Reads the invoice, creates a view-only link for people in the organization and writes one row. Connection identity is a service account with read access to the Invoices library and create rights on the table |
| [save-invoice-json-to-sharepoint](Skills/save-invoice-json-to-sharepoint/SKILL.md) | Runs only when the prompt supplies `emailSubject`, `emailSender`, `sourcePdfPath` and `sourcePdfLink`, and otherwise does nothing. Reads the `SharePointSiteURL`, `SharePointDocumentLibrary` and `ReviewsFolderPath` environment variables (current value, else default value, and stops naming the variable when neither exists), builds one JSON object with exactly 18 camelCase keys and saves it as `yyyyMMdd_hhmmss_<invoiceNumber>.json`, using the original invoice file name when the invoice number is empty. Creates a sharing link for the file and stores it in the row's Review Link. A field not found on the invoice is an empty string. It does not return the JSON to the workflow | Dataverse (environment variable tables, update a row), SharePoint **Create file**, `CreateSharingLink` | Dataverse MCP and SharePoint tools plus the `CreateSharingLink` tool, as configured in [Step 3-1 of the Runbook](../3.Runbook.md#step-3-1-create-the-agent). Whether the Dataverse tool can read `environmentvariabledefinition` and `environmentvariablevalue`: `[VERIFY]` G4. The Create file path and returned item ID: `[VERIFY]` G5 | Output of invoice-extraction-review, the four fields in its prompt (the workflow's message carries three, see [Workflow-owned operations](#workflow-owned-operations)) and the three environment variables set in the Runbook | Included. Writes only to the folder in `ReviewsFolderPath` (`/Invoices/Reviews`) and updates only the Review Link of the row. Same service account, with contribute rights on that folder only |

No capability uses configured knowledge. The agent has no email tool, no approval tool and no tool that calls a second workflow.

## Workflow-owned operations

These steps run in the workflow, not in the agent. They are not runtime skills and not agent tools. The prompt in Step 3-3 of the Runbook creates them, and the checks there confirm each one. Steps 2 and 3 can appear in either order in the built workflow, as long as both come before step 4.

| Step | Operation | Inputs and settings | Outputs and branch | Label |
|---|---|---|---|---|
| 1. Trigger | Office 365 Outlook **When a new email arrives** | Inbox of the invoice mailbox `[FILL]`. **Include Attachments** = Yes. Optional **From** and **Subject Filter** `[FILL]`. Add a filter that excludes mail sent by the mailbox itself | Sender, subject, message ID, received time and attachments. Messages over the size limit and some protected messages are skipped by the trigger | Documented. Mailbox type and rights `[VERIFY]` G5 |
| 2. Read the environment variables | A lookup by display name of `SharePointSiteURL`, `SharePointDocumentLibrary`, `SourceFolderPath` and `FinanceEmailAddress` | The current value, and the default value when there is no current value | The four values for steps 4, 7 and 8. When both values of a variable are empty, the run ends as **Failed** and the message names the variable. Nothing is saved | Scenario-defined contract. The operation that Copilot chooses and whether the workflow can read the variables `[VERIFY]` G5 |
| 3. Keep PDFs | **Apply to each** over the attachments, with a condition | Only PDF files continue (name ends in `.pdf` or content type `application/pdf`). Cap on files per email `[FILL]` | Other attachments are skipped. An email with no PDF ends with no saved file, no agent call and no email | Design choice |
| 4. Save the original | SharePoint **Create file**, inside the loop | Site Address = `SharePointSiteURL`. Library = `SharePointDocumentLibrary`. Folder Path = `SourceFolderPath` (`/Invoices/Sources`). File name and content from the attachment, see the [naming contract](#naming-and-path-contract) | The full path of the saved PDF | Documented. How Copilot combines the library and the folder into the Folder Path, behavior when the name exists, and the returned path form `[VERIFY]` G5 |
| 5. Call the agent | Agent node named `InvoiceProcessingAgent`, **An existing agent** = the published Invoice Processing Agent | Prompt as shown below. The email body and the attachment text are not passed. The response parameter is `result`. Output = **Custom structured output** with the 10 string properties of the [JSON response contract](#json-response-contract) | The 10 values as `structuredOutput/<key>`. The workflow waits for the agent to finish | Documented node. Output behavior and a failed agent step `[VERIFY]` G2 |
| 6. Decision check | If/else | `decision` equals `READY_FOR_APPROVAL`. See the [decision rule](#decision-rule) | **Yes:** step 8. **No:** step 7 | Scenario-defined contract. The workflow, not the agent, decides who is notified |
| 7. Manual review email | Outlook **Send an email** | To the `FinanceEmailAddress` value. Subject `Invoice approval needed: ` and the invoice number. HTML body with the invoice number, vendor, decision, issues, summary, a link to the source PDF and a link to the review package | One email per PDF. The sender is not told. The row is already saved with Decision `NEEDS_REVIEW` | Documented operation. Send rights `[VERIFY]` G5 |
| 8. Approval | Office 365 Users **Get manager (V2)** for the sender, then Approvals standard approval **Start and wait for an approval** (**Approve/Reject - First to respond**) | Assigned to the sender's manager email address. When the sender has no manager, or the lookup returns nothing or fails, assigned to the `FinanceEmailAddress` value. Title `Invoice approval needed: ` and the invoice number. Details as text: vendor, total amount due and currency, invoice date, due date, summary, the source PDF link and the review package link | Outcome and responses are kept in the approval record and the run history. Then step 9. The workflow does not pay the invoice. The 10-key output has no invoice date, so that line stays blank | Documented operations. Availability and time limits in Workflows `[VERIFY]` G3. Manager lookup, its result for a sender outside the organization and the fallback `[VERIFY]` G3. Invoice date line and link formatting `[VERIFY]` G2 |
| 9. Tell the sender the outcome | If/else with three branches named **Approved**, **Rejected** and **Other**, then Outlook **Send an email** | **Approved:** outcome `Approve`. **Rejected:** outcome `Reject`. **Other:** every other outcome. The email goes to the sender of the invoice email, as an HTML body | **Approved:** subject `Invoice approved: ` and the invoice number, with the invoice number, vendor and the two links. **Rejected:** subject `Invoice rejected: ` and the invoice number, with the invoice number, vendor, decision, issues, summary and the two links. **Other:** no action | Documented operation. The exact outcome values `[VERIFY]` G3. Send rights `[VERIFY]` G5 |

The prompt in step 5 has this form. The values in angle brackets come from step 4 and from the trigger.

```text
Process invoice: <full path of the saved PDF> | Email subject: <subject>| Sender: <sender address>
```

This message has no `sourcePdfLink`. `save-invoice-json-to-sharepoint` runs only when it has all four of `emailSubject`, `emailSender`, `sourcePdfPath` and `sourcePdfLink`. The first skill does create a sharing link for the file, so whether the agent passes that link on to the second skill is `[VERIFY]` under G2. If it does not, no review file is written, the Review Link stays empty, and the approval and the emails show an empty review link. In that case add the link to the prompt of the Agent node by hand. The Preview tests in Step 4-1 of the Runbook supply all four fields.

A PDF is processed on its own: steps 4 to 9 run once per PDF inside the same loop. Whether a failed PDF lets the loop continue with the remaining PDFs of the email depends on how Workflows handles a failed iteration, so this is `[VERIFY]` under G2. Test it with a two-PDF email in Step 4-2 before relying on it. If the loop stops, the unprocessed PDFs are not saved and the sender must resubmit them.

## Agent tool contracts

The tools are configured in [Step 3-1 of the Runbook](../3.Runbook.md#step-3-1-create-the-agent) and in **Build > Tools**. The exact tool names that the SharePoint and Dataverse MCP servers expose are `[VERIFY]` G1. The folder and table limits below are **Design choices** enforced by the permissions of the connection identity, because the skills do not check paths.

| Tool | Used by | Inputs | Outputs | Permitted records and paths | Notes |
|---|---|---|---|---|---|
| SharePoint MCP, read a file from its link | invoice-extraction-review | The link of the file in the library | File content and the file's item ID | The Invoices library, read only | PDF reading `[VERIFY]` G1. Item ID availability `[VERIFY]` G5 |
| `CreateSharingLink` (SharePoint **Create sharing link for a file or folder**) | Both skills | Item ID from the agent. Site address and library name from the `SharePointSiteURL` and `SharePointDocumentLibrary` environment variables. Link Type = View Only and Link Scope = People in your organization, both fixed | Sharing link | Files in the Invoices library | Used for Source Link and Review Link. A link over 200 characters does not fit the columns `[VERIFY]` G5 |
| Dataverse MCP, create a row | invoice-extraction-review | Table **Auto Invoice Review** and 15 column values | New row | Auto Invoice Review only | No uniqueness check |
| Dataverse MCP, read environment variables | save-invoice-json-to-sharepoint | Display name of `SharePointSiteURL`, `SharePointDocumentLibrary` or `ReviewsFolderPath` | Current and default value | `environmentvariabledefinition` and `environmentvariablevalue`, read only | `[VERIFY]` G4 |
| SharePoint MCP, create a file | save-invoice-json-to-sharepoint | Site from `SharePointSiteURL`, library from `SharePointDocumentLibrary`, folder from `ReviewsFolderPath`, file name, JSON text | The created file and its item ID | The Reviews folder only | Behavior when the name exists `[VERIFY]` G5 |
| Dataverse MCP, update a row | save-invoice-json-to-sharepoint | The row and the Review Link | Updated row | The Review Link of the row created in the same run | Applying the same value twice is safe |

| Topic | Contract |
|---|---|
| Execution identity | The agent's tool connections must be a dedicated service account, not a maker's personal account and not the email sender. Whether workflow-invoked runs use that connection or another identity is `[VERIFY]` G1. Owner: Power Platform admin |
| Connection ownership | `[FILL]` owner of the SharePoint and Dataverse connections, a backup owner, and the process for rebinding connections when the solution moves between environments |
| Reading the PDF | Whether the harness can read the PDF content returned by the SharePoint tool is `[VERIFY]` G1. Until it passes, no dependent step is enabled and the agent must not guess values |
| Asynchronous work | None is used by the agent. The workflow waits for the agent to finish. The approval is asynchronous and is tracked by its approval record and the run history |
| Failure visibility | The workflow ends the run as failed when an environment variable has no value or when a step fails. It reads only `decision` from the response and does not check the two links. Steps that completed earlier (the saved PDF, the row, the review file) are kept |

## JSON response contract

The agent's final response is one JSON object, with no text before or after it. It is defined in the agent instructions in [Step 3-1 of the Runbook](../3.Runbook.md#step-3-1-create-the-agent) and has exactly these 10 camelCase keys. All keys are always present. A value that is not on the invoice is an empty string. The Agent node's custom structured output has the same 10 string properties, and the workflow reads each one as `structuredOutput/<key>`. This is a **Scenario-defined contract**.

| Key | Type | Meaning |
|---|---|---|
| `invoiceNumber` | string | The invoice number as printed. The Dataverse row holds it in the Invoice Number column |
| `vendorName` | string | Vendor name |
| `currency` | string | ISO 4217 code such as `USD` |
| `totalAmountDue` | string | Total amount due |
| `dueDate` | string | Due date |
| `decision` | string | `READY_FOR_APPROVAL` or `NEEDS_REVIEW` |
| `issues` | string | The missing fields, separated by semicolons. Empty when nothing is missing |
| `summary` | string | One sentence about the invoice and the decision |
| `sourceLink` | string | Sharing link to the saved PDF |
| `reviewLink` | string | Sharing link to the review JSON file |

The response is shorter than the review file. Vendor ID, purchase order number, invoice date, subtotal, tax and GL code are saved in the Dataverse row and in the 18-key review file, and the response carries them only through `decision` and `issues`.

### Decision rule

The workflow makes one decision, in step 6, from `decision`.

1. **Ready for approval.** `decision` is exactly `READY_FOR_APPROVAL`. The skill sets it only when all 11 invoice fields were found, so it covers the six fields that the response does not carry. The workflow starts the approval.
2. **Anything else.** `NEEDS_REVIEW`, an empty value or any other text sends the manual review email to Finance. The email lists `issues` and `summary`.

The workflow does not check the other keys or the two links. The sender is not told what is missing, and Finance follows up. Invoices that do not print a purchase order number, a GL code, a vendor ID or a date therefore go to Finance, never to the approver. This is a **Design choice**.

### Outcome handling

| Situation | Meaning | Workflow action |
|---|---|---|
| `decision` is `READY_FOR_APPROVAL` | The row and the review file are written, and every invoice field was found | Start the approval for the sender's manager, or for Finance when the sender has no manager |
| `decision` is anything else | The invoice lacks information. The row is saved as `NEEDS_REVIEW` | Email Finance. Do not email the sender |
| Approval outcome `Approve` | The approver accepted the invoice | Email the sender that the invoice was approved |
| Approval outcome `Reject` | The approver rejected the invoice | Email the sender that the invoice was rejected |
| Any other approval outcome | The approval did not end in an approval or a rejection | Take no action. Inspect the run history |
| The sender has no manager | The sender is outside the organization or has no manager in the directory, or the lookup failed | Assign the approval to the `FinanceEmailAddress` value. The run continues |
| An environment variable has no current and no default value | The workflow cannot find the site, library, folder or Finance address | End the run as failed with a message that names the variable. Nothing is saved |
| The agent step fails or returns no structured output | The agent could not finish | The run fails or the decision check takes the **No** branch with blank values. Which one happens is `[VERIFY]` G2 |

## Dataverse data model

One table, **Auto Invoice Review**, in the **Autonomous Invoice Orchestration** solution. The solution unique name is `AutonomousInvoiceOrchestration`. The publisher prefix is `[FILL]`. The Copilot prompt that creates it is in [Step 2-2 of the Runbook](../3.Runbook.md#step-2-2-create-table).

| Display Name | Data Type | Options | Skill field | Set by |
|---|---|---|---|---|
| Accounting GL Code | Text | 100 | `GL_CODE` | invoice-extraction-review |
| Auto Invoice Review ID | GUID | Native primary key. Created by Dataverse, not in the Copilot prompt | — | Dataverse |
| Billed to Legal Entity | Boolean | Yes/No | — | No skill |
| Currency | Text | 100 | `CURRENCY` | invoice-extraction-review |
| Decision | Choice | NEEDS_REVIEW, READY_FOR_APPROVAL | `DECISION` | invoice-extraction-review |
| Due Date | Date Only | — | `DUE_DATE` | invoice-extraction-review |
| Invoice Date | Date Only | — | `INVOICE_DATE` | invoice-extraction-review |
| Invoice Number | Text | 100 | `INVOICE_NUMBER` | invoice-extraction-review |
| Issues Found | Multiline Text | At least 4000 (raised after the table is saved) | `ISSUES_FOUND` | invoice-extraction-review |
| Purchase Order Number | Text | 100 | `PURCHASE_ORDER_NUMBER` | invoice-extraction-review |
| Review Link | URL | 200 | `REVIEW_LINK` | save-invoice-json-to-sharepoint |
| Source Link | URL | 200 | `SOURCE_LINK` | invoice-extraction-review |
| Subtotal | Decimal | Precision 2 | `SUBTOTAL` | invoice-extraction-review |
| Summary | Multiline Text | 2000 | `SUMMARY` | invoice-extraction-review |
| Tax | Decimal | Precision 2 | `TAX` | invoice-extraction-review |
| Total Amount Due | Decimal | Precision 2 | `TOTAL_AMOUNT_DUE` | invoice-extraction-review |
| Vendor ID | Text | 100 | `VENDOR_ID` | invoice-extraction-review |
| Vendor Name | Text | 100 | `VENDOR_NAME` | invoice-extraction-review |

- `invoice-extraction-review` writes 15 columns and `save-invoice-json-to-sharepoint` writes the Review Link. No skill sets Billed to Legal Entity, so it stays empty until a skill is extended. The skill's `INVOICE_NUMBER` field holds the invoice number as printed and is saved in the Invoice Number column.
- Every column is optional. Any business-required flag (a red `*` in the data grid) must be cleared, so an invoice that lacks a value is still saved with Decision `NEEDS_REVIEW` and Finance can follow up.
- Copilot chooses the table's primary name column from the 17 listed columns, most likely Vendor Name. The skills never read or write by it, and whether a row is still created when that column is empty is `[VERIFY]` G4.
- The Copilot prompt in Step 2-2 of the Runbook asks for 17 columns. The Auto Invoice Review ID is the table's native primary key that Dataverse creates itself, and its display name in the maker portal can be the table name. This scenario always calls it Auto Invoice Review ID.
- The table has no alternate key and neither skill looks for an existing row, so a second run for the same invoice creates a second row.
- Choice values are written as the labels `NEEDS_REVIEW` and `READY_FOR_APPROVAL`. Whether the connector accepts labels or option values is `[VERIFY]` G4.
- Source Link and Review Link are capped at 200 characters. Keep the site, library and folder names short.

## Naming and path contract

| Item | Rule |
|---|---|
| Original PDF | Saved in the `SourceFolderPath` folder (`/Invoices/Sources`) of the `SharePointDocumentLibrary` library under the attachment's file name. The workflow prompt defines no timestamp, prefix, length cap or character cleanup. Whether a second attachment with the same name fails, overwrites the first or gets a new name is `[VERIFY]` G5. If you need unique names, add a timestamp to the file name in the **Create file** action by hand |
| Review file | Named by the skill as `yyyyMMdd_hhmmss_<invoiceNumber>.json` in the `ReviewsFolderPath` folder (`/Invoices/Reviews`). When the invoice number is empty, the timestamp is followed by the original invoice file name. The name changes on every run, so a repeated run writes another file |
| Path form | The workflow passes the full path of the saved PDF to the agent. The exact path form that the SharePoint tool accepts and the link that the agent builds for the saved file are `[VERIFY]` G5 |
| Folder limits | The agent reads the Invoices library and writes only to the Reviews folder. These limits come from the connection permissions and the environment variables, not from a path check in the skills |

## Limitations and operational ownership

| Area | Limitation | Owner |
|---|---|---|
| PDF quality | Scanned images, handwriting and unusual layouts may yield missing or wrong values. A wrong value that is present is not caught by the decision check, so the approver must compare it with the PDF | AP/Finance team |
| Duplicates | There is no duplicate detection. The same invoice, or a corrected resubmission, creates another row and another review file, and the earlier `NEEDS_REVIEW` row stays. AP/Finance deletes extra rows | AP/Finance team |
| Checks the skills do not make | The skills check that fields are present. They do not check that subtotal plus tax equals the total or that the bill-to is an approved legal entity, and they leave Billed to Legal Entity empty | AP/Finance team |
| Manual review | An invoice that is not `READY_FOR_APPROVAL` is emailed only to the `FinanceEmailAddress` value. The sender is not told what is missing, so Finance contacts the sender and decides how to continue | AP/Finance team |
| Partial writes | If the row is written but the sharing link, the review file or the Review Link update fails, the row stays without a Review Link. The workflow does not check the links, so the approval and the emails show an empty review link. The invoice is not processed again automatically | Power Platform engineer |
| File names | An invoice number that contains characters SharePoint does not allow in a file name can make the review file write fail `[VERIFY]` G5 | Power Platform engineer |
| Approval outcome | The outcome is in the approval record and run history, not in Dataverse. No payment is made. The sender is told only about an approval or a rejection, and any other outcome sends nothing | Solution owner |
| Agent errors | A failed agent step fails the run and nobody is emailed. Failure alerts to the owner are `[VERIFY]` G3 | Power Platform engineer |
| Capacity | Workflow runs, agent runs and the approval wait use Copilot Credits and platform limits. SharePoint allows 600 calls per 60 seconds per connection | Release / cost owner |
| Spoofed senders and untrusted text | Email sender names can be forged. The subject and the sender address are passed to the agent as data, and the approval result email goes to that address. The manager lookup also uses that address, so a forged sender can route the approval to another person's manager. Use a dedicated mailbox, an optional sender allowlist `[FILL]`, and give the approver the source PDF link | Messaging owner |
| Retention | Source PDFs, reviews, Dataverse rows and run history keep invoice data. Retention and access are `[FILL]` | Records owner |
| Rollback | Disable the workflow first. Then remove the agent's tool exposure or unpublish the agent. Removing a skill does not revoke tool permissions. Keep the written files and rows | Power Platform engineer |
