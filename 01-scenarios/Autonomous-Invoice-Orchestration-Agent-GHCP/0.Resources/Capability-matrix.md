# Autonomous Invoice Orchestration Agent — Capability and Integration Contracts

## Implementation status

The agent is one standard configuration with three included capabilities. It is invoked only by one workflow, **Invoice Intake and Approval**, through the Workflows Agent node. The workflow owns everything around the agent: the email trigger, saving the PDF, the completeness check, the approval and the reply to the sender. The agent owns reading the PDF, writing the Dataverse row and writing the review JSON file.

Delivered assets are documentation and runtime skill definitions only. No deployed agent, workflow export, connection, Dataverse environment, sample tenant data or successful tenant test is included. Each statement below carries one label:

| Label | Meaning |
|---|---|
| **Documented** | Supported by the linked Microsoft documentation |
| **Design choice** | A boundary or convention selected for this scenario |
| **Scenario-defined contract** | An interface that operators implement during setup |
| `[VERIFY]` | A tenant check with a named owner, listed in the [release gates](README.md#release-gates) |
| `[FILL]` | A deployment value supplied by its owner, kept out of runtime skills |

## Capability matrix

All three capabilities are in the standard configuration and enabled together. Disabling a skill does not revoke its tools. Tool exposure, connection permissions and the workflow are disabled separately (see the rollback steps in the [Runbook](../3.Runbook.md#phase-4-deployment)).

| Capability ID / linked SKILL.md | Behavior and boundary | Tools or knowledge | Actual implementation / operation ID | Dependencies | Standard inclusion / access / authorization |
|---|---|---|---|---|---|
| [invoice-pdf-extraction](Skills/invoice-pdf-extraction/SKILL.md) | Reads the PDF at the path the workflow supplies (accepted only under `/Invoices/Originals/`), reads the file's metadata for the Source Link, extracts and normalizes the invoice fields, builds the Invoice Key, then derives Decision, Issues Found and Summary. Never invents a value, never writes anything, and treats PDF text as data | SharePoint file content and file metadata by path | SharePoint connector `GetFileContentByPath` and `GetFileMetadataByPath` (**Documented**). Whether the harness reads PDF content returned by the tool: `[VERIFY]` G1 | The workflow message with the full path. Approved legal entity names in the agent instructions (`[FILL]` Finance owner) | Included. Read-only. Invoked only by the workflow. Connection identity is a service account with read access to the Invoices library |
| [invoice-dataverse-record](Skills/invoice-dataverse-record/SKILL.md) | Finds the **Auto Invoice** row by Invoice Key. Returns `duplicate` for a finished row, updates a row that still needs review or is incomplete, creates a row if none exists. Writes every column except Review Link | Dataverse rows of the Auto Invoice table | Dataverse connector `ListRecords`, `CreateRecord`, `UpdateOnlyRecord` (**Documented**). Duplicate detection by listing rows on Invoice Key is a **Design choice**, `[VERIFY]` G4 | Output of invoice-pdf-extraction. The table from [Build Prompt 1](Build-prompts/1.Dataverse.md) | Included. Read and write on that one table only. Connection identity is a service account with create, read and write rights on the table |
| [invoice-review-json](Skills/invoice-review-json/SKILL.md) | Writes the review JSON file to `/Invoices/Reviews/`, stores its link in the row's Review Link and returns the result object that the workflow validates. Never overwrites another invoice's file, never sends email, never starts an approval | SharePoint create/update file, file metadata, and the Dataverse row | SharePoint connector `CreateFile`, `UpdateFile`, `GetFileMetadataByPath`. Dataverse connector `UpdateOnlyRecord` (**Documented**) | Output of invoice-dataverse-record | Included. Writes only under `/Invoices/Reviews/`. Same service account, with contribute rights on that folder only |

No capability uses configured knowledge. The agent has no email tool, no approval tool and no tool that calls a second workflow.

## Workflow-owned operations

These steps run in the workflow, not in the agent. They are not runtime skills and not agent tools.

| Step | Operation | Inputs and settings | Outputs and branch | Label |
|---|---|---|---|---|
| 1. Trigger | Office 365 Outlook `OnNewEmailV3` (When a new email arrives (V3)) | Folder = Inbox of the invoice mailbox `[FILL]`. **Only with Attachments** = Yes, **Include Attachments** = Yes. Optional **From** and **Subject Filter** `[FILL]`. Ignore mail sent by the mailbox itself | Sender, subject, message ID, received time and attachments. Messages over the size limit and some protected messages are skipped by the trigger | Documented. Mailbox type and rights `[VERIFY]` G5 |
| 2. Keep PDFs | Built-in filter | Keep attachments whose name ends in `.pdf` or whose content type is `application/pdf`. Cap on files per email `[FILL]` | If none remain, stop with no reply (avoids replying to newsletters and auto-responders) | Design choice |
| 3. Save original | SharePoint `CreateFile`, **Apply to each** with concurrency 1 | Site Address `[FILL]`, Folder Path `/Invoices/Originals`, File Name per the [naming rule](#naming-and-path-contract), File Content = attachment content | `sourcePath` = `/Invoices/Originals/<file name>` | Documented. Behavior when the name exists `[VERIFY]` G5 |
| 4. Call the agent | Agent node, **An existing agent** = Autonomous Invoice Orchestration Agent | Message = fixed instruction plus `sourcePath` only. No email text, subject or sender is passed | The agent's [JSON response](#json-response-contract). Custom structured output if the node offers it for an existing agent, otherwise a Parse JSON step on the text response | Documented node. Output mode `[VERIFY]` G2. The workflow waits for the agent to finish |
| 5. Route on status | Condition | `status` | `failed`: end the run as failed so it stays visible in run history. `duplicate`: stop with no action. `created` or `updated`: go to step 6 | Scenario-defined contract |
| 6. Completeness check | Condition on the parsed JSON | The 18 fields in the [required-field rule](#required-field-rule) | All present: step 7. Any missing: step 8 | Scenario-defined contract. Authoritative: the agent's own opinion of completeness is not used |
| 7. Approval | Approvals `StartAndWaitForAnApproval` (**Approve/Reject - First to respond**) | Assigned to the AP approver or group `[FILL]`. Title with vendor, invoice number and total. Details: the extracted fields, Decision and Issues Found, with a prominent warning when Decision is `NEEDS_REVIEW`. Item link = Review Link. Source Link in the details | Outcome and responses are kept in the approval record and the run history. The workflow does not pay the invoice | Documented operation. Availability and time limits in Workflows `[VERIFY]` G3 |
| 8. Tell the sender | Outlook `ReplyToV3` (Reply to email V3) | `messageId` from the trigger. `mailboxAddress` for a shared mailbox. Body lists each missing field by display name and the saved PDF file name, and asks for a corrected invoice | One reply per PDF. The extracted values are stored in Dataverse with Decision `NEEDS_REVIEW` | Documented operation. Send rights `[VERIFY]` G5 |

A PDF is processed on its own: steps 3 to 8 run once per PDF inside the same loop. Whether a failed PDF lets the loop continue with the remaining PDFs of the email depends on how Workflows handles a failed iteration, so this is `[VERIFY]` under G2. Test it with a two-PDF email in Step 3-2 before relying on it. If the loop stops, the unprocessed PDFs are not saved and the sender must resubmit them.

## Agent tool contracts

The tools are configured in **Build > Tools** from the SharePoint and Microsoft Dataverse connectors. The operation IDs are **Documented** in the connector references: [SharePoint](https://learn.microsoft.com/en-us/connectors/sharepointonline/) and [Microsoft Dataverse](https://learn.microsoft.com/en-us/connectors/commondataserviceforapps/). Folder and table limits below are **Design choices** enforced by the skills and by the permissions of the connection identity.

| Operation | Inputs | Outputs | Permitted records and paths | Concurrency and idempotency |
|---|---|---|---|---|
| SharePoint `GetFileContentByPath` | Site Address, File Path | File content | Files under `/Invoices/Originals/` only | Read-only |
| SharePoint `GetFileMetadataByPath` | Site Address, File Path | File metadata, including a web link property `[VERIFY]` G5 | Files under `/Invoices/Originals/` and `/Invoices/Reviews/` | Read-only |
| SharePoint `CreateFile` | Site Address, Folder Path, File Name, File Content | Metadata of the created file | `/Invoices/Reviews/` only | The review file name is derived from the source file name, so a repeat for the same source reuses one name and never creates a second review file |
| SharePoint `UpdateFile` | Site Address, File Identifier, File Content | Updated file metadata | Only a review file that already exists for the same source file | Used when a repeat run finds its own earlier review file |
| Dataverse `ListRecords` | Table name, Filter rows (OData), Row count | Matching rows | Auto Invoice table only | Read-only |
| Dataverse `CreateRecord` | Table name and column values | New row with its Auto Invoice Review ID | Auto Invoice table only | The table does not enforce a unique Invoice Key. The skill lists the rows again after the create and fails the run if more than one row has the key `[VERIFY]` G4 |
| Dataverse `UpdateOnlyRecord` | Table name, Row ID, changed column values | Updated row | Auto Invoice table only. Auto Invoice Review ID and Invoice Key are never changed | Applying the same values twice is safe |

| Topic | Contract |
|---|---|
| Execution identity | The agent's tool connections must be a dedicated service account, not a maker's personal account and not the email sender. Whether workflow-invoked runs use that connection or another identity is `[VERIFY]` G1. Owner: Power Platform admin |
| Connection ownership | `[FILL]` owner of the SharePoint and Dataverse connections, a backup owner, and the process for rebinding connections when the solution moves between environments |
| Reading the PDF | Whether the harness can read the PDF content returned by the SharePoint tool is `[VERIFY]` G1. Until it passes, no dependent step is enabled and the agent must not guess values |
| Asynchronous work | None is used by the agent. The workflow waits for the agent to finish. The approval is asynchronous and is tracked by its approval record and the run history |
| Failure visibility | A partial write returns `status: failed` with a `statusDetail` that names the failed step. The workflow ends the run as failed. Successful earlier steps (row, file) are kept and reused by a later run |

## JSON response contract

The agent's final response is one JSON object, with no text before or after it. All keys are always present. Invoice-derived values are `null` when the PDF does not contain them. `issuesFound` is an empty string when nothing was found. Dates are `yyyy-MM-dd`. Money values are numbers with a `.` decimal separator and two decimals. This is a **Scenario-defined contract**.

| Key | Type | Meaning |
|---|---|---|
| `status` | string | `created`, `updated`, `duplicate` or `failed` |
| `statusDetail` | string | Empty, or the reason for `duplicate` or `failed` |
| `autoInvoiceReviewId` | string (GUID) | Primary key of the Dataverse row |
| `invoiceKey` | string | `VENDORID\|INVOICENUMBER`, or `SRC\|<source file name>` when either part is missing |
| `vendorId` | string or null | Vendor identifier printed on the invoice |
| `vendorName` | string or null | Vendor name |
| `invoiceNumber` | string or null | Invoice number |
| `purchaseOrderNumber` | string or null | Purchase order number |
| `invoiceDate` | string or null | Invoice date |
| `dueDate` | string or null | Due date |
| `currency` | string or null | ISO 4217 code such as `USD` |
| `subtotal` | number or null | Amount before tax |
| `tax` | number or null | Tax amount. `0` is a value |
| `totalAmountDue` | number or null | Total amount due |
| `accountingGlCode` | string or null | General ledger code, only if printed on the invoice |
| `billedToLegalEntity` | boolean or null | `true` when the Bill-To matches an approved legal entity. `false` when it clearly does not. `null` when it cannot be determined |
| `decision` | string | `READY_FOR_APPROVAL` or `NEEDS_REVIEW` |
| `issuesFound` | string | One issue per line. Empty when `decision` is `READY_FOR_APPROVAL` |
| `summary` | string | Plain summary of at most 2000 characters |
| `sourceLink` | string or null | Web link to the saved PDF |
| `reviewLink` | string or null | Web link to the review JSON file |
| `sourcePath` | string | Library path of the PDF |
| `reviewPath` | string or null | Library path of the review JSON file |

The review JSON file holds the same object without `status`, `statusDetail` and `reviewLink`, because the file cannot contain its own link. The Review Link is stored in the Dataverse row and returned in the response.

### Required-field rule

The workflow treats these 18 keys as required: `autoInvoiceReviewId`, `invoiceKey`, `vendorId`, `vendorName`, `invoiceNumber`, `purchaseOrderNumber`, `invoiceDate`, `dueDate`, `currency`, `subtotal`, `tax`, `totalAmountDue`, `accountingGlCode`, `billedToLegalEntity`, `decision`, `summary`, `sourceLink`, `reviewLink`.

- A field is missing when it is `null`, absent, or an empty or blank string. `0` for a number and `false` for `billedToLegalEntity` are values.
- `issuesFound` is not required because it is legitimately empty for a clean invoice.
- **Decision** does not stop the approval. When all 18 fields have values, the approval starts even if Decision is `NEEDS_REVIEW`; the approver sees the issues. This is a **Design choice**.
- Invoices that do not print a purchase order number or an accounting GL code are always returned to the sender. This follows the rule that one missing value means a reply to the sender.

### Status handling

| `status` | Meaning | Workflow action |
|---|---|---|
| `created` | New row, review file and Review Link written | Completeness check |
| `updated` | An earlier row for the same Invoice Key that was `NEEDS_REVIEW` or lacked a Review Link was replaced with the new values | Completeness check |
| `duplicate` | A finished row (`READY_FOR_APPROVAL` with a Review Link) already exists for the same Invoice Key. Nothing was written | Stop with no action |
| `failed` | A step did not complete. `statusDetail` names it | End the run as failed |

## Dataverse data model

One table, **Auto Invoice**, in the **Autonomous Invoice Orchestration** solution. The solution unique name is `AutonomousInvoiceOrchestration`. The publisher prefix is `[FILL]`. The build prompt is in [Build-prompts/1.Dataverse.md](Build-prompts/1.Dataverse.md).

| Display Name | Data Type | Options | JSON key | Set by |
|---|---|---|---|---|
| Accounting GL Code | Text | 100 | `accountingGlCode` | invoice-dataverse-record |
| Auto Invoice Review ID | GUID | Native primary key. Created by Dataverse, not in the build prompt | `autoInvoiceReviewId` | Dataverse |
| Billed to Legal Entity | Boolean | Yes/No | `billedToLegalEntity` | invoice-dataverse-record |
| Currency | Text | 100 | `currency` | invoice-dataverse-record |
| Decision | Choice | NEEDS_REVIEW, READY_FOR_APPROVAL | `decision` | invoice-dataverse-record |
| Due Date | Date Only | — | `dueDate` | invoice-dataverse-record |
| Invoice Date | Date Only | — | `invoiceDate` | invoice-dataverse-record |
| Invoice Key | Text | 850 | `invoiceKey` | invoice-dataverse-record |
| Invoice Number | Text | 100 | `invoiceNumber` | invoice-dataverse-record |
| Issues Found | Multiline Text | At least 4000 (raised in the build prompt checks) | `issuesFound` | invoice-dataverse-record |
| Purchase Order Number | Text | 100 | `purchaseOrderNumber` | invoice-dataverse-record |
| Review Link | URL | 200 | `reviewLink` | invoice-review-json |
| Source Link | URL | 200 | `sourceLink` | invoice-dataverse-record |
| Subtotal | Decimal | Precision 2 | `subtotal` | invoice-dataverse-record |
| Summary | Multiline Text | 2000 | `summary` | invoice-dataverse-record |
| Tax | Decimal | Precision 2 | `tax` | invoice-dataverse-record |
| Total Amount Due | Decimal | Precision 2 | `totalAmountDue` | invoice-dataverse-record |
| Vendor ID | Text | 100 | `vendorId` | invoice-dataverse-record |
| Vendor Name | Text | 100 | `vendorName` | invoice-dataverse-record |

- Every column is optional. The [build prompt checks](Build-prompts/1.Dataverse.md#check-the-table) clear any business-required flag (a red `*` in the data grid), so an invoice that lacks a value is still saved and the workflow decides what a missing value means.
- Copilot chooses the table's primary name column from the 18 listed columns, most likely Vendor Name. The skills never read or write by it, and whether a row is still created when that column is empty is `[VERIFY]` G4.
- The build prompt asks Copilot for the 18 other columns. The Auto Invoice Review ID is the table's native primary key that Dataverse creates itself, and its display name in the maker portal can be the table name. This scenario always calls it Auto Invoice Review ID.
- Invoice Key is the duplicate-detection value. The table has no alternate key, so Dataverse does not stop two rows with the same Invoice Key. The skill lists the rows by Invoice Key before it writes and again after a create, and the skills always update a row by Auto Invoice Review ID. The list filter with a key that contains `'`, `|` or `/` is `[VERIFY]` G4.
- Choice values are written as the labels `NEEDS_REVIEW` and `READY_FOR_APPROVAL`. Whether the connector accepts labels or option values is `[VERIFY]` G4.
- A Yes/No column normally holds a value. If it cannot hold a null, a `null` `billedToLegalEntity` is stored as the column default and the missing value is recorded in Issues Found. The response and the review file still carry `null`, so the workflow still sees the gap. `[VERIFY]` G4.
- Source Link and Review Link are capped at 200 characters. Keep the site, library and folder names short.

## Naming and path contract

| Item | Rule |
|---|---|
| Original PDF | `/Invoices/Originals/<base>_<yyyyMMddTHHmmss>_<n>.pdf`. `<base>` is the attachment name without extension, with characters outside letters, digits, `-` and `_` replaced by `_`, cut to 40 characters. The timestamp is the email's received time in UTC. `<n>` is the 1-based attachment index. Using the received time keeps the name stable if the trigger fires twice for one email |
| Review file | `/Invoices/Reviews/<same base name as the PDF>.review.json` |
| Path form | The workflow passes `sourcePath` starting with `/Invoices/Originals/`. The library name and site address are configured in the agent instructions `[FILL]`, and the skills add them when the tool needs a full path. The exact path form the SharePoint tool accepts is `[VERIFY]` G5 |
| Prefix checks | The extraction skill refuses a path that does not start with `/Invoices/Originals/`. The review skill writes only under `/Invoices/Reviews/` |

## Limitations and operational ownership

| Area | Limitation | Owner |
|---|---|---|
| PDF quality | Scanned images, handwriting and unusual layouts may yield missing or wrong values. A wrong value that is present is not caught by the completeness check, so the approver must compare it with the PDF | AP/Finance team |
| Duplicates across keys | If the vendor ID or invoice number is missing, the key is built from the file name. A corrected resubmission has a new key, and the earlier `NEEDS_REVIEW` row stays | AP/Finance team |
| No duplicate notice | A duplicate stops silently. The sender is not told | Solution owner |
| Simultaneous duplicates | The table does not enforce a unique Invoice Key. If two runs create the same new invoice at the same moment, two rows can exist. The skill detects this after the create and fails the run. AP/Finance deletes the extra row and the invoice is resubmitted | AP/Finance team |
| Approval outcome | The outcome is in the approval record and run history, not in Dataverse. No payment is made and the sender is not told the outcome | Solution owner |
| Recovery | To reprocess a finished invoice, the owner sets the row's Decision to `NEEDS_REVIEW` and the sender resubmits | AP/Finance team |
| Agent errors | A `failed` result ends the run as failed. Failure alerts to the owner are `[VERIFY]` G3 | Power Platform engineer |
| Capacity | Workflow runs, agent runs and the approval wait use Copilot Credits and platform limits. SharePoint allows 600 calls per 60 seconds per connection | Release / cost owner |
| Spoofed senders | Email sender names can be forged. Use a dedicated mailbox, an optional sender allowlist `[FILL]`, and give the approver the source PDF link | Messaging owner |
| Retention | Originals, reviews, Dataverse rows and run history keep invoice data. Retention and access are `[FILL]` | Records owner |
| Rollback | Disable the workflow first. Then remove the agent's tool exposure or unpublish the agent. Removing a skill does not revoke tool permissions. Keep the written files and rows | Power Platform engineer |
