# Autonomous Invoice Orchestration Agent — Capability and Integration Contracts

## Implementation status

The agent is one standard configuration with two included capabilities. It is invoked only by one workflow, **Invoice Intake and Approval**, through the Workflows Agent node. The workflow owns everything around the agent: the email trigger, saving the PDF, the completeness check, the approval and the reply to the sender. The agent owns reading the PDF, writing the Dataverse row and writing the review JSON file.

Delivered assets are documentation and runtime skill definitions only. No deployed agent, workflow export, connection, Dataverse environment, sample tenant data or successful tenant test is included. Each statement below carries one label:

| Label | Meaning |
|---|---|
| **Documented** | Supported by the linked Microsoft documentation |
| **Design choice** | A boundary or convention selected for this scenario |
| **Scenario-defined contract** | An interface that operators implement during setup |
| `[VERIFY]` | A tenant check with a named owner, listed in the [release gates](README.md#release-gates) |
| `[FILL]` | A deployment value supplied by its owner, kept out of runtime skills |

## Capability matrix

Both capabilities are in the standard configuration and enabled together. Disabling a skill does not revoke its tools. Tool exposure, connection permissions and the workflow are disabled separately (see the rollback steps in the [Runbook](../3.Runbook.md#phase-4-deployment)).

| Capability ID / linked SKILL.md | Behavior and boundary | Tools or knowledge | Actual implementation / operation ID | Dependencies | Standard inclusion / access / authorization |
|---|---|---|---|---|---|
| [invoice-extraction-review](Skills/invoice-extraction-review/SKILL.md) | Takes the invoice from a PDF attachment in the chat or from a SharePoint document-library link, and asks for the invoice when neither is present. Creates a sharing link for the file (Source Link), extracts 11 fields and leaves a field that is not on the invoice empty instead of guessing. Works out Issues Found (the missing fields, separated by semicolons), a one-sentence Summary and the Decision (`READY_FOR_APPROVAL` only when all 11 fields were found, otherwise `NEEDS_REVIEW`), then creates one new row in the **Auto Invoice Review** table. It checks that fields are present, not that the amounts add up, and it does not write the Review Link | SharePoint file content (link input), `CreateSharingLink`, Dataverse create a row | SharePoint MCP and Dataverse MCP tools plus the `CreateSharingLink` tool, as configured in [Build Prompt 2](Build-prompts/2.Agent.md). Whether the harness reads PDF content returned by the SharePoint tool: `[VERIFY]` G1. The Source Link of a chat attachment, which has no SharePoint item: `[VERIFY]` G5 | The table from [Build Prompt 1](Build-prompts/1.Dataverse.md) and the agent from Build Prompt 2 | Included. Reads the invoice, creates a view-only link for people in the organization and writes one row. Connection identity is a service account with read access to the Invoices library and create rights on the table |
| [save-invoice-json-to-sharepoint](Skills/save-invoice-json-to-sharepoint/SKILL.md) | Runs only when the prompt supplies `emailSubject`, `emailSender`, `sourcePdfPath` and `sourcePdfLink`, and otherwise does nothing. Reads the `SharePointSiteURL` and `ReviewsFolderPath` environment variables (current value, else default value, and stops naming the variable when neither exists), builds one JSON object with exactly 18 camelCase keys and saves it as `yyyyMMdd_hhmmss_<invoiceKey>.json`, using the original invoice file name when the key is empty. Creates a sharing link for the file and stores it in the row's Review Link. A field not found on the invoice is an empty string. It does not return the JSON to the workflow | Dataverse (environment variable tables, update a row), SharePoint **Create file**, `CreateSharingLink` | Dataverse MCP and SharePoint tools plus the `CreateSharingLink` tool, as configured in Build Prompt 2. Whether the Dataverse tool can read `environmentvariabledefinition` and `environmentvariablevalue`: `[VERIFY]` G4. The Create file path and returned item ID: `[VERIFY]` G5 | Output of invoice-extraction-review, the four prompt fields from the workflow and the two environment variables set in the Runbook | Included. Writes only to the folder in `ReviewsFolderPath` (`/Invoices/Reviews`) and updates only the Review Link of the row. Same service account, with contribute rights on that folder only |

No capability uses configured knowledge. The agent has no email tool, no approval tool and no tool that calls a second workflow.

## Workflow-owned operations

These steps run in the workflow, not in the agent. They are not runtime skills and not agent tools.

| Step | Operation | Inputs and settings | Outputs and branch | Label |
|---|---|---|---|---|
| 1. Trigger | Office 365 Outlook `OnNewEmailV3` (When a new email arrives (V3)) | Folder = Inbox of the invoice mailbox `[FILL]`. **Only with Attachments** = Yes, **Include Attachments** = Yes. Optional **From** and **Subject Filter** `[FILL]`. Ignore mail sent by the mailbox itself | Sender, subject, message ID, received time and attachments. Messages over the size limit and some protected messages are skipped by the trigger | Documented. Mailbox type and rights `[VERIFY]` G5 |
| 2. Keep PDFs | Built-in filter | Keep attachments whose name ends in `.pdf` or whose content type is `application/pdf`. Cap on files per email `[FILL]` | If none remain, stop with no reply (avoids replying to newsletters and auto-responders) | Design choice |
| 3. Save original | SharePoint `CreateFile`, **Apply to each** with concurrency 1 | Site Address `SharePointSiteURL`, library `SharePointDocumentLibrary`, Folder Path `SourceFolderPath` (`/Invoices/Sources`), File Name per the [naming rule](#naming-and-path-contract), File Content = attachment content | `sourcePdfPath` = the saved file's path. `sourcePdfLink` = a link to the saved file | Documented. Behavior when the name exists and the link property `[VERIFY]` G5. Whether the workflow can read the environment variables `[VERIFY]` G5, otherwise enter the values in the action |
| 4. Call the agent | Agent node, **An existing agent** = Autonomous Invoice Orchestration Agent | Message = a fixed instruction plus the four fields `emailSubject`, `emailSender`, `sourcePdfPath` and `sourcePdfLink` (see below). The email body and the attachment text are not passed | The agent's [JSON response](#json-response-contract). Custom structured output if the node offers it for an existing agent, otherwise a Parse JSON step on the text response | Documented node. Output mode `[VERIFY]` G2. The workflow waits for the agent to finish |
| 5. Validate the response | Condition on the parsed JSON | The text parses as JSON and has all 10 keys of the [JSON response contract](#json-response-contract) | Valid: step 6. Not valid or a key is absent: end the run as failed so it stays visible in run history | Scenario-defined contract |
| 6. Completeness check | Condition on the parsed JSON | The [completeness rule](#completeness-rule) | Complete: step 7. Missing information: step 8. Complete invoice with no `sourceLink` or `reviewLink`: end the run as failed | Scenario-defined contract. Authoritative: the workflow, not the agent, decides who is notified |
| 7. Approval | Approvals `StartAndWaitForAnApproval` (**Approve/Reject - First to respond**) | Assigned to the approver in the `Approvers` environment variable `[FILL]`. Title with vendor, invoice key and total. Details: `vendorName`, `invoiceKey`, `currency`, `totalAmountDue`, `dueDate` and `summary`. Item link = `reviewLink`. `sourceLink` in the details | Outcome and responses are kept in the approval record and the run history. The workflow does not pay the invoice | Documented operation. Availability and time limits in Workflows `[VERIFY]` G3 |
| 8. Tell the sender | Outlook `ReplyToV3` (Reply to email V3) | `messageId` from the trigger. `mailboxAddress` for a shared mailbox. Body lists the missing fields from `issues` (and any blank key by name) and the saved PDF file name, and asks for a corrected invoice | One reply per PDF. The extracted values are stored in Dataverse with Decision `NEEDS_REVIEW` | Documented operation. Send rights `[VERIFY]` G5 |

The message in step 4 has this form. The values in angle brackets come from the trigger and from step 3.

```text
Process this invoice and return only the JSON object.
emailSubject: <subject>
emailSender: <sender address>
sourcePdfPath: <path of the saved PDF>
sourcePdfLink: <link to the saved PDF>
```

Without all four fields the agent skips `save-invoice-json-to-sharepoint`, so no review file and no Review Link are written. A PDF is processed on its own: steps 3 to 8 run once per PDF inside the same loop. Whether a failed PDF lets the loop continue with the remaining PDFs of the email depends on how Workflows handles a failed iteration, so this is `[VERIFY]` under G2. Test it with a two-PDF email in Step 3-2 before relying on it. If the loop stops, the unprocessed PDFs are not saved and the sender must resubmit them.

## Agent tool contracts

The tools are configured by [Build Prompt 2](Build-prompts/2.Agent.md) and in **Build > Tools**. The exact tool names that the SharePoint and Dataverse MCP servers expose are `[VERIFY]` G1. The folder and table limits below are **Design choices** enforced by the permissions of the connection identity, because the skills do not check paths.

| Tool | Used by | Inputs | Outputs | Permitted records and paths | Notes |
|---|---|---|---|---|---|
| SharePoint MCP, read a file from its link | invoice-extraction-review | The link of the file in the library | File content and the file's item ID | The Invoices library, read only | PDF reading `[VERIFY]` G1. Item ID availability `[VERIFY]` G5 |
| `CreateSharingLink` (SharePoint **Create sharing link for a file or folder**) | Both skills | Item ID from the agent. Site address and library name from the `SharePointSiteURL` and `SharePointDocumentLibrary` environment variables. Link Type = View Only and Link Scope = People in your organization, both fixed | Sharing link | Files in the Invoices library | Used for Source Link and Review Link. A link over 200 characters does not fit the columns `[VERIFY]` G5 |
| Dataverse MCP, create a row | invoice-extraction-review | Table **Auto Invoice Review** and 15 column values | New row | Auto Invoice Review only | No uniqueness check |
| Dataverse MCP, read environment variables | save-invoice-json-to-sharepoint | Display name of `SharePointSiteURL` or `ReviewsFolderPath` | Current and default value | `environmentvariabledefinition` and `environmentvariablevalue`, read only | `[VERIFY]` G4 |
| SharePoint MCP, create a file | save-invoice-json-to-sharepoint | Site, folder from `ReviewsFolderPath`, file name, JSON text | The created file and its item ID | The Reviews folder only | Behavior when the name exists `[VERIFY]` G5 |
| Dataverse MCP, update a row | save-invoice-json-to-sharepoint | The row and the Review Link | Updated row | The Review Link of the row created in the same run | Applying the same value twice is safe |

| Topic | Contract |
|---|---|
| Execution identity | The agent's tool connections must be a dedicated service account, not a maker's personal account and not the email sender. Whether workflow-invoked runs use that connection or another identity is `[VERIFY]` G1. Owner: Power Platform admin |
| Connection ownership | `[FILL]` owner of the SharePoint and Dataverse connections, a backup owner, and the process for rebinding connections when the solution moves between environments |
| Reading the PDF | Whether the harness can read the PDF content returned by the SharePoint tool is `[VERIFY]` G1. Until it passes, no dependent step is enabled and the agent must not guess values |
| Asynchronous work | None is used by the agent. The workflow waits for the agent to finish. The approval is asynchronous and is tracked by its approval record and the run history |
| Failure visibility | The workflow ends the run as failed when the response is not the expected JSON, or when a complete invoice has no `sourceLink` or `reviewLink`. Steps that completed earlier (the row, the review file) are kept |

## JSON response contract

The agent's final response is one JSON object, with no text before or after it. It is defined in the agent instructions of [Build Prompt 2](Build-prompts/2.Agent.md) and has exactly these 10 camelCase keys. All keys are always present. A value that is not on the invoice is an empty string. This is a **Scenario-defined contract**.

| Key | Type | Meaning |
|---|---|---|
| `invoiceKey` | string | The invoice number as printed |
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

### Completeness rule

The workflow applies these checks in order. A value is missing when it is `null`, absent, or an empty or blank string. `0` is a value.

1. **Valid response.** The text must parse as JSON and carry all 10 keys. Otherwise the run ends as failed.
2. **Missing information.** The invoice is incomplete when `decision` is not `READY_FOR_APPROVAL`, when `issues` is not blank, or when `invoiceKey`, `vendorName`, `currency`, `totalAmountDue`, `dueDate` or `summary` is missing. The skill sets `READY_FOR_APPROVAL` only when all 11 invoice fields were found, so `decision` covers the six fields that the response does not carry. The workflow replies to the sender.
3. **System links.** A complete invoice whose `sourceLink` or `reviewLink` is blank means that a link or file step did not finish. The run ends as failed. The sender is not told, because the invoice itself is complete.
4. **Approval.** Otherwise every field has a value and the approval starts.

Invoices that do not print a purchase order number, a GL code, a vendor ID or a date are therefore returned to the sender. This follows the rule that one missing value means a reply to the sender. The approval never starts for `NEEDS_REVIEW`. This is a **Design choice**.

### Outcome handling

| Response | Meaning | Workflow action |
|---|---|---|
| Valid JSON, `READY_FOR_APPROVAL`, blank `issues`, a value in every other key | The row and the review file are written | Start the approval |
| Valid JSON with `NEEDS_REVIEW`, an issue or a blank key | The invoice lacks information. The row is saved as `NEEDS_REVIEW` | Reply to the sender |
| Valid JSON, complete, but `sourceLink` or `reviewLink` is blank | The sharing link, the review file or the row update did not finish | End the run as failed |
| Not valid JSON, or a key is absent | The agent could not finish | End the run as failed |

## Dataverse data model

One table, **Auto Invoice Review**, in the **Autonomous Invoice Orchestration** solution. The solution unique name is `AutonomousInvoiceOrchestration`. The publisher prefix is `[FILL]`. The build prompt is in [Build-prompts/1.Dataverse.md](Build-prompts/1.Dataverse.md).

| Display Name | Data Type | Options | Skill field | Set by |
|---|---|---|---|---|
| Accounting GL Code | Text | 100 | `GL_CODE` | invoice-extraction-review |
| Auto Invoice Review ID | GUID | Native primary key. Created by Dataverse, not in the build prompt | — | Dataverse |
| Billed to Legal Entity | Boolean | Yes/No | — | No skill |
| Currency | Text | 100 | `CURRENCY` | invoice-extraction-review |
| Decision | Choice | NEEDS_REVIEW, READY_FOR_APPROVAL | `DECISION` | invoice-extraction-review |
| Due Date | Date Only | — | `DUE_DATE` | invoice-extraction-review |
| Invoice Date | Date Only | — | `INVOICE_DATE` | invoice-extraction-review |
| Invoice Key | Text | 850 | `INVOICE_KEY` | invoice-extraction-review |
| Invoice Number | Text | 100 | — | No skill |
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

- `invoice-extraction-review` writes 15 columns and `save-invoice-json-to-sharepoint` writes the Review Link. No skill sets Billed to Legal Entity or Invoice Number, so both stay empty until a skill is extended. The skill's `INVOICE_KEY` holds the invoice number as printed.
- Every column is optional. Any business-required flag (a red `*` in the data grid) must be cleared, so an invoice that lacks a value is still saved and the workflow decides what a missing value means.
- Copilot chooses the table's primary name column from the 18 listed columns, most likely Vendor Name. The skills never read or write by it, and whether a row is still created when that column is empty is `[VERIFY]` G4.
- The build prompt asks Copilot for 18 columns. The Auto Invoice Review ID is the table's native primary key that Dataverse creates itself, and its display name in the maker portal can be the table name. This scenario always calls it Auto Invoice Review ID.
- The table has no alternate key and neither skill looks for an existing row, so a second run for the same invoice creates a second row.
- Choice values are written as the labels `NEEDS_REVIEW` and `READY_FOR_APPROVAL`. Whether the connector accepts labels or option values is `[VERIFY]` G4.
- Source Link and Review Link are capped at 200 characters. Keep the site, library and folder names short.

## Naming and path contract

| Item | Rule |
|---|---|
| Original PDF | `/Invoices/Sources/<base>_<yyyyMMddTHHmmss>_<n>.pdf`, where the folder is the `SourceFolderPath` value. `<base>` is the attachment name without extension, with characters outside letters, digits, `-` and `_` replaced by `_`, cut to 40 characters. The timestamp is the email's received time in UTC. `<n>` is the 1-based attachment index. Using the received time keeps the name stable if the trigger fires twice for one email |
| Review file | Named by the skill as `yyyyMMdd_hhmmss_<invoiceKey>.json` in the `ReviewsFolderPath` folder (`/Invoices/Reviews`). When the invoice key is empty, the timestamp is followed by the original invoice file name. The name changes on every run, so a repeated run writes another file |
| Path form | The workflow passes `sourcePdfPath` and `sourcePdfLink`. The exact path form that the SharePoint tool accepts and the link property that the Create file action returns are `[VERIFY]` G5 |
| Folder limits | The agent reads the Invoices library and writes only to the Reviews folder. These limits come from the connection permissions and the environment variables, not from a path check in the skills |

## Limitations and operational ownership

| Area | Limitation | Owner |
|---|---|---|
| PDF quality | Scanned images, handwriting and unusual layouts may yield missing or wrong values. A wrong value that is present is not caught by the completeness check, so the approver must compare it with the PDF | AP/Finance team |
| Duplicates | There is no duplicate detection. The same invoice, or a corrected resubmission, creates another row and another review file, and the earlier `NEEDS_REVIEW` row stays. AP/Finance deletes extra rows | AP/Finance team |
| Checks the skills do not make | The skills check that fields are present. They do not check that subtotal plus tax equals the total or that the bill-to is an approved legal entity, and they leave Billed to Legal Entity and Invoice Number empty | AP/Finance team |
| Partial writes | If the row is written but the sharing link, the review file or the Review Link update fails, the row stays without a Review Link and the run ends as failed. The invoice is not processed again automatically | Power Platform engineer |
| File names | An invoice number that contains characters SharePoint does not allow in a file name can make the review file write fail `[VERIFY]` G5 | Power Platform engineer |
| Approval outcome | The outcome is in the approval record and run history, not in Dataverse. No payment is made and the sender is not told the outcome | Solution owner |
| Agent errors | A response that is not the expected JSON ends the run as failed and the sender is not told. Failure alerts to the owner are `[VERIFY]` G3 | Power Platform engineer |
| Capacity | Workflow runs, agent runs and the approval wait use Copilot Credits and platform limits. SharePoint allows 600 calls per 60 seconds per connection | Release / cost owner |
| Spoofed senders and untrusted text | Email sender names can be forged. The subject and the sender address are passed to the agent and saved in the review file as data. Use a dedicated mailbox, an optional sender allowlist `[FILL]`, and give the approver the source PDF link | Messaging owner |
| Retention | Source PDFs, reviews, Dataverse rows and run history keep invoice data. Retention and access are `[FILL]` | Records owner |
| Rollback | Disable the workflow first. Then remove the agent's tool exposure or unpublish the agent. Removing a skill does not revoke tool permissions. Keep the written files and rows | Power Platform engineer |
