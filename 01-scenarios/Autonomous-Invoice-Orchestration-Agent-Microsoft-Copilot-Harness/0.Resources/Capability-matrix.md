# Autonomous Invoice Orchestration Agent — Capability and Integration Contracts

## Implementation status

The agent is one standard configuration with one included capability, the skill `invoice-extraction-review`. It is invoked only by the **Invoice Intake** workflow, through the Workflows Agent node. Two workflows surround the agent. **Invoice Intake** owns the email trigger, the environment variables, saving the PDF and the agent call, and it ends there. The agent owns reading the PDF, writing the review JSON file and writing the Dataverse row, and the row is its only output. **Invoice Approval** starts when that row is added and owns the decision check, the approval and the emails to Finance and to the submitter. Both workflows use Office 365 Users lookups: the intake workflow looks up the sender's Object ID, and the approval workflow looks up the submitter's email address and manager. Copilot creates the workflows from the prompts in [Step 3-3](../3.Runbook.md#step-3-3-build-the-intake-workflow-invoice-intake) and [Step 3-4](../3.Runbook.md#step-3-4-build-the-approval-workflow-invoice-approval) of the Runbook.

Delivered assets are documentation, runtime skill definitions and an unmanaged solution package for development and test. No deployed agent, connection, Dataverse environment, sample tenant data or successful tenant test is included. Each statement below carries one label:

| Label | Meaning |
|---|---|
| **Documented** | Supported by the linked Microsoft documentation |
| **Design choice** | A boundary or convention selected for this scenario |
| **Scenario-defined contract** | An interface that operators implement during setup |
| `[VERIFY]` | A tenant check with a named owner, listed in the [release gates](README.md#release-gates) |
| `[FILL]` | A deployment value supplied by its owner, kept out of runtime skills |

## Capability matrix

The capability is in the standard configuration. Disabling the skill does not revoke its tools. Tool exposure, connection permissions and the two workflows are disabled separately (see the rollback steps in the [Runbook](../3.Runbook.md#phase-5-deployment)).

| Capability ID / linked SKILL.md | Behavior and boundary | Tools or knowledge | Actual implementation / operation ID | Dependencies | Standard inclusion / access / authorization |
|---|---|---|---|---|---|
| [invoice-extraction-review](Skills/invoice-extraction-review/SKILL.md) | Takes the invoice from a PDF attachment in the chat or from a SharePoint document-library link, and asks for the invoice when neither is present. A PDF uploaded in the chat is first saved to the `SourceFolderPath` folder under the name of the uploaded file, and the submitter is the chatting user, whose Object ID (the `id` value) comes from `GetMyProfile`. Creates a sharing link for the file (Source Link), extracts 11 fields and leaves a field that is not on the invoice empty instead of guessing. Works out Issues Found (the missing fields, separated by semicolons), a one-sentence Summary and the Decision (`READY_FOR_APPROVAL` only when all 11 fields were found, otherwise `NEEDS_REVIEW`). Reads the `SharePointSiteURL`, `SharePointDocumentLibrary`, `SourceFolderPath` and `ReviewsFolderPath` environment variables (current value, else default value, and stops naming the variable when neither exists), builds one JSON object with exactly 17 camelCase keys and saves it as `yyyyMMdd_hhmmss_<invoiceNumber>.json`, using the original invoice file name when the invoice number is empty. Creates a sharing link for the file (Review Link) and then creates one new row in the **Auto Invoice Review** table with the extracted values, the decision, both links and the Object ID of the person who submitted the invoice (Submitted By), which comes from the prompt or, for a PDF uploaded in the chat, from `GetMyProfile`. A field not found on the invoice is an empty string in the file and empty in the row. It checks that fields are present, not that the amounts add up. It returns nothing that a workflow reads, because the row is its output | SharePoint file content (link input), SharePoint **Create file** (`CreateFile`), `CreateSharingLink`, Office 365 Users **Get my profile (V2)** (`GetMyProfile`, used for a PDF uploaded in the chat), Dataverse (environment variable tables, create a row) | SharePoint MCP and Dataverse MCP tools plus the `CreateFile`, `CreateSharingLink` and `GetMyProfile` tools, as configured in [Step 3-1 of the Runbook](../3.Runbook.md#step-3-1-create-the-agent). Whether the harness reads PDF content returned by the SharePoint tool: `[VERIFY]` G1. Whether `GetMyProfile` returns the profile of the person who is chatting, and its `id` value: `[VERIFY]` G1. Whether the Dataverse tool can read `environmentvariabledefinition` and `environmentvariablevalue`: `[VERIFY]` G4. The Create file path and returned item ID: `[VERIFY]` G5 | The table from [Step 2-2 of the Runbook](../3.Runbook.md#step-2-2-create-table), the environment variables set in the Runbook and the agent from Step 3-1 of the Runbook. The email subject and the sender's Object ID come from the prompt that the intake workflow sends (see [Workflow-owned operations](#workflow-owned-operations)) | Included. Reads the invoice, creates view-only links for people in the organization, writes only to the folders in `ReviewsFolderPath` (`/Invoices/Reviews`) and `SourceFolderPath` (`/Invoices/Sources`, for a PDF uploaded in the chat) and writes one row, which starts the approval workflow. Connection identity is a service account with read access to the Invoices library, contribute rights on the Reviews and Sources folders only and create rights on the table |
No capability uses configured knowledge. The agent has no email tool, no approval tool and no tool that calls a workflow. The Dataverse row it writes is what starts the approval workflow.

## Workflow-owned operations

These steps run in the two workflows, not in the agent. They are not runtime skills and not agent tools. The prompts in [Step 3-3](../3.Runbook.md#step-3-3-build-the-intake-workflow-invoice-intake) and [Step 3-4](../3.Runbook.md#step-3-4-build-the-approval-workflow-invoice-approval) of the Runbook create them, and the checks there confirm each one. The two workflows share no variable and no output. The only link between them is the Dataverse row that the agent writes, so the approval workflow starts only after the intake workflow has called the agent and the agent has saved the row (see the [row contract](#row-contract)).

### Invoice Intake workflow

Steps 2 and 3 can appear in either order in the built workflow, as long as both come before step 4.

| Step | Operation | Inputs and settings | Outputs and branch | Label |
|---|---|---|---|---|
| 1. Trigger | Office 365 Outlook **When a new email arrives** | Inbox of the invoice mailbox `[FILL]`. **Include Attachments** = Yes. Optional **From** and **Subject Filter** `[FILL]`. Add a filter that excludes mail sent by the mailbox itself | Sender, subject, message ID, received time and attachments. Messages over the size limit and some protected messages are skipped by the trigger | Documented. Mailbox type and rights `[VERIFY]` G5 |
| 2. Read the environment variables | A lookup by display name of `SharePointSiteURL`, `SharePointDocumentLibrary` and `SourceFolderPath` | The current value, and the default value when there is no current value | The three values for step 4. When both values of a variable are empty, the run ends as **Failed** and the message names the variable. Nothing is saved | Scenario-defined contract. The operation that Copilot chooses and whether the workflow can read the variables `[VERIFY]` G5 |
| 3. Keep PDFs | **Apply to each** over the attachments, with a condition | Only PDF files continue (name ends in `.pdf` or content type `application/pdf`). Cap on files per email `[FILL]` | Other attachments are skipped. An email with no PDF ends with no saved file, no agent call and no email | Design choice |
| 4. Save the original | SharePoint **Create file**, inside the loop | Site Address = `SharePointSiteURL`. Library = `SharePointDocumentLibrary`. Folder Path = `SourceFolderPath` (`/Invoices/Sources`). File name and content from the attachment, see the [naming contract](#naming-and-path-contract) | The full path of the saved PDF | Documented. How Copilot combines the library and the folder into the Folder Path, behavior when the name exists, and the returned path form `[VERIFY]` G5 |
| 5. Look up the sender | Office 365 Users **Get user profile (V2)**, inside the loop | **User (UPN)** = the sender's email address from the trigger. **Select fields** = `id`. The step must not stop the run when it fails | The sender's Object ID (the `id` value). When the sender is not in the directory or the lookup fails, the value is empty and the run continues | Documented operation, which accepts a user principal name or an id. Whether the sender's email address works as the User (UPN) value, the result for a sender outside the directory, and continuing after a failed step `[VERIFY]` G3 |
| 6. Call the agent | Agent node named `InvoiceProcessingAgent`, **An existing agent** = the published Invoice Processing Agent | Prompt as shown below. The email body and the attachment text are not passed. The response parameter is `result` and the output is the default text. The node is the last step and nothing reads its output | The workflow waits for the agent to finish and ends. It does not know whether a row was written | Documented node. A failed agent step, and whether the run still ends as succeeded when the agent wrote no row `[VERIFY]` G2 |

The prompt in step 6 has this form. The values in angle brackets come from steps 4 and 5 and from the trigger.

```text
Process invoice: <full path of the saved PDF> | Email subject: <subject>| SubmittedBy: <Object ID of the sender>
```

The prompt carries the email subject and the sender's Object ID, and never the sender's email address. The skill writes them into the review file as `emailSubject` and `submittedBy`, and writes the Object ID into the Submitted By column of the row, which is how the approval workflow learns who submitted the invoice. The prompt carries no link, because the skill creates the sharing links itself. The Preview tests in Step 4-1 of the Runbook send the same prompt.

A PDF is processed on its own: steps 4 to 6 run once per PDF inside the same loop, so each PDF gets its own agent run, its own row and its own run of the approval workflow. Whether a failed PDF lets the loop continue with the remaining PDFs of the email depends on how Workflows handles a failed iteration, so this is `[VERIFY]` under G2. Test it with a two-PDF email in Step 4-2 before relying on it. If the loop stops, the unprocessed PDFs are not saved and the sender must resubmit them.

### Invoice Approval workflow

The workflow starts from the row and has no access to the email, the PDF or the agent's reply. Quoted names such as Decision and Submitted By are the display names of the table's columns, which the workflow reads from the output of the `Invoice` step (the Dataverse **Get a row by ID** action in step 1).

| Step | Operation | Inputs and settings | Outputs and branch | Label |
|---|---|---|---|---|
| 1. Trigger and read the row | Microsoft Dataverse **When a row is added, modified or deleted**, then Dataverse **Get a row by ID** named `Invoice` | **Change type** = Added. **Table name** = Auto Invoice Review. **Scope** = User, so the run starts only for rows that the workflow's owner owns. A row that the agent creates is owned by the account of the agent's Dataverse connection, so that account must also own this workflow. No column filter or row filter is needed. The `Invoice` step gets the row with the table and the row ID from the trigger and returns all columns | One run per new row. The `Invoice` step returns the column values, and a choice column also comes with its label in the `@OData.Community.Display.V1.FormattedValue` annotation. A row that the workflow's owner owns and that is added by hand or by another process starts a run too. A later change to the row starts nothing | Documented for the Dataverse trigger in cloud flows, where the scope User means rows owned by you. Its availability in Workflows, the connection owner's rights on the table and on the **Callback Registration** table, the owner of a row that the agent creates, and the form in which the Decision choice, the Date Only columns and the decimals arrive `[VERIFY]` G4 |
| 2. Read the environment variable | A lookup by display name of `FinanceEmailAddress` | The current value, and the default value when there is no current value | The value for steps 5 and 6. When both values are empty, the run ends as **Failed** and the message names the variable. No email is sent and no approval starts, and the row stays | Scenario-defined contract. The operation that Copilot chooses and whether the workflow can read the variable `[VERIFY]` G5 |
| 3. Look up the submitter | Office 365 Users **Get user profile (V2)** | **User (UPN)** = the row's Submitted By, which is an Object ID. **Select fields** = `mail`. The step must not stop the run when it fails | The submitter's email address. When Submitted By is empty, the user is not found or the lookup fails, the address is empty and the run continues | Documented operation, which accepts a user principal name or an id. The result for an empty or unknown value, and continuing after a failed step `[VERIFY]` G3 |
| 4. Decision check | If/else | The row's Decision equals `READY_FOR_APPROVAL`, compared as the choice label and not as its number. See the [decision rule](#decision-rule) | **Yes:** step 6. **No:** step 5 | Scenario-defined contract. The workflow, not the agent, decides who is notified. Whether the trigger returns the label or only the number `[VERIFY]` G4 |
| 5. Manual review email | Outlook **Send an email** | To the `FinanceEmailAddress` value, with the submitter's email address from step 3 in CC. Subject `Invoice approval needed: ` and the Invoice Number. HTML body with the Invoice Number, Vendor Name, Decision, Issues Found, Summary and the Source Link and Review Link as links | One email per row. The submitter is copied and sees the issues. The row already holds Decision `NEEDS_REVIEW`. When the address is empty, the email has no CC | Documented operation. Send rights `[VERIFY]` G5 |
| 6. Approval | Office 365 Users **Get manager (V2)** for the row's Submitted By, then Approvals standard approval **Start and wait for an approval** (**Approve/Reject - First to respond**) | Assigned to the submitter's manager email address. When the submitter has no manager, or the lookup returns nothing or fails, assigned to the `FinanceEmailAddress` value. The approval is named `InvoiceApproval`. Title `Invoice approval needed: ` and the Invoice Number. Details as text: Vendor Name, Total Amount Due and Currency, Invoice Date, Due Date, Summary, Source Link and Review Link | Outcome and responses are kept in the approval record and the run history. Then step 7. The workflow does not pay the invoice | Documented operations. Availability and time limits in Workflows `[VERIFY]` G3. Manager lookup, its result for a submitter outside the organization and the fallback `[VERIFY]` G3. Link formatting `[VERIFY]` G2 |
| 7. Tell the submitter the outcome | If/else with three branches named **Approved**, **Rejected** and **Other**, then Outlook **Send an email** | **Approved:** outcome `Approve`. **Rejected:** outcome `Reject`. **Other:** every other outcome. The email goes to the submitter's email address from step 3, as an HTML body | **Approved:** subject `Invoice approved: ` and the Invoice Number, with the Invoice Number, Vendor Name, the comment of the first approval response and the two links. **Rejected:** subject `Invoice rejected: ` and the Invoice Number, with the same values. **Other:** no action | Documented operation. The exact outcome values `[VERIFY]` G3. Send rights `[VERIFY]` G5 |

A new row is what starts the workflow, so rows written during Preview tests, and rows that the workflow's owner adds by hand, start it as well. To test the agent without starting approvals, keep the approval workflow off, or pass your own Object ID as the submitter, so that the emails and the approval go to you and your manager.

## Agent tool contracts

The tools are configured in [Step 3-1 of the Runbook](../3.Runbook.md#step-3-1-create-the-agent) and in **Build > Tools**. The exact tool names that the SharePoint and Dataverse MCP servers expose are `[VERIFY]` G1. The folder and table limits below are **Design choices** enforced by the permissions of the connection identity, because the skill does not check paths.

| Tool | Used by | Inputs | Outputs | Permitted records and paths | Notes |
|---|---|---|---|---|---|
| SharePoint MCP, read a file from its link | invoice-extraction-review | The link of the file in the library | File content and the file's item ID | The Invoices library, read only | PDF reading `[VERIFY]` G1. Item ID availability `[VERIFY]` G5 |
| `CreateSharingLink` (SharePoint **Create sharing link for a file or folder**) | invoice-extraction-review | Item ID from the agent. Site address and library name from the `SharePointSiteURL` and `SharePointDocumentLibrary` environment variables. Link Type = View Only and Link Scope = People in your organization, both fixed | Sharing link | Files in the Invoices library | Used for Source Link and Review Link. A link over 200 characters does not fit the columns `[VERIFY]` G5 |
| Dataverse MCP, read environment variables | invoice-extraction-review | Display name of `SharePointSiteURL`, `SharePointDocumentLibrary`, `SourceFolderPath` or `ReviewsFolderPath` | Current and default value | `environmentvariabledefinition` and `environmentvariablevalue`, read only | `[VERIFY]` G4 |
| SharePoint MCP, create a file (`CreateFile`) | invoice-extraction-review | Site from `SharePointSiteURL`, library from `SharePointDocumentLibrary`, folder from `ReviewsFolderPath` (the review file) or `SourceFolderPath` (a PDF uploaded in the chat), file name, JSON text or the PDF content | The created file and its item ID | The Reviews and Sources folders only | Behavior when the name exists `[VERIFY]` G5 |
| Office 365 Users **Get my profile (V2)** (`GetMyProfile`) | invoice-extraction-review | None. It uses the connection of the chatting user | The user's profile, of which the skill keeps only the Object ID (the `id` value) | The chatting user's own profile, read only | Used only for a PDF uploaded in the chat. It can fail for guest users, and then Submitted By stays empty `[VERIFY]` G1 |
| Dataverse MCP, create a row | invoice-extraction-review | Table **Auto Invoice Review** and 17 column values | New row | Auto Invoice Review only | No uniqueness check. The row is the last write of a run and starts the approval workflow |

| Topic | Contract |
|---|---|
| Execution identity | The agent's tool connections must be a dedicated service account, not a maker's personal account and not the email sender. Whether workflow-invoked runs use that connection or another identity is `[VERIFY]` G1. Owner: Power Platform admin |
| Connection ownership | `[FILL]` owner of each connection, a backup owner, and the process for rebinding connections when the solution moves between environments. The agent uses SharePoint, Dataverse and Office 365 Users (`GetMyProfile`). The intake workflow uses Outlook, SharePoint and Office 365 Users. The approval workflow uses Dataverse, Outlook, Office 365 Users and Approvals |
| Reading the PDF | Whether the harness can read the PDF content returned by the SharePoint tool is `[VERIFY]` G1. Until it passes, no dependent step is enabled and the agent must not guess values |
| Asynchronous work | None is used by the agent. The intake workflow waits for the agent to finish and then ends. The approval is asynchronous and runs in the approval workflow, tracked by its approval record and the run history |
| Failure visibility | Each workflow ends its run as failed when an environment variable has no value or when a step fails. The intake workflow does not read the agent's reply, so a successful intake run does not prove that a row exists. When the agent fails before it writes the row, the approval workflow never starts and nobody is emailed. Look for saved PDFs in `/Invoices/Sources` that have no row. The approval workflow reads the Decision of the row and does not check the two links. Steps that completed earlier (the saved PDF, the review file, the row) are kept |

## Row contract

The Dataverse row is the only thing that the two workflows share. The agent writes it as the last step of a run. The approval workflow starts from it. The agent returns nothing that a workflow reads, and the Agent node in the intake workflow has no structured output. The row has 17 columns that the skill writes, as listed in the [data model](#dataverse-data-model). The approval workflow reads these columns from the trigger:

| Column | Used for |
|---|---|
| Decision | The decision check. `READY_FOR_APPROVAL` or `NEEDS_REVIEW` |
| Invoice Number | The subject of the emails and of the approval, and the body of every email |
| Vendor Name | The emails and the approval details |
| Total Amount Due, Currency, Invoice Date, Due Date | The approval details |
| Issues Found | The manual review email |
| Summary | The manual review email and the approval details |
| Source Link, Review Link | The links in every email and in the approval details |
| Submitted By | The submitter lookup in step 3, which gives the email address for the CC on the manual review email and for the outcome email, and the manager lookup in step 6 |

A column that is not found on the invoice is empty in the row. The Step 3-4 prompt reads each column from the `Invoice` step by its column name, `{schemaname}_` followed by the lowercase display name without spaces, for example `body('Invoice')?['{schemaname}_invoicenumber']`. Copilot replaces `{schemaname}` with the schema name of the table. The Decision label comes from `body('Invoice')?['{schemaname}_decision@OData.Community.Display.V1.FormattedValue']`, because the plain value is the number of the choice. This is a **Scenario-defined contract**, and the form in which the step returns each value is `[VERIFY]` G4.

### Decision rule

The approval workflow makes one decision, in step 4, from the row's Decision.

1. **Ready for approval.** Decision is `READY_FOR_APPROVAL`. The skill sets it only when all 11 invoice fields were found. The approval workflow starts the approval.
2. **Anything else.** `NEEDS_REVIEW`, an empty value or any other value sends the manual review email to Finance, with the submitter in CC. The email lists Issues Found and Summary.

The approval workflow does not check the other columns or the two links. The submitter sees what is missing only through the CC on the Finance email, and Finance follows up. Invoices that do not print a purchase order number, a GL code, a vendor ID or a date therefore go to Finance, never to the approver. This is a **Design choice**.

### Outcome handling

| Situation | Meaning | Workflow action |
|---|---|---|
| Decision is `READY_FOR_APPROVAL` | The row and the review file are written, and every invoice field was found | Start the approval for the submitter's manager, or for Finance when the submitter has no manager |
| Decision is anything else | The invoice lacks information. The row is saved as `NEEDS_REVIEW` | Email Finance with the submitter in CC. No separate email to the submitter |
| Approval outcome `Approve` | The approver accepted the invoice | Email the submitter that the invoice was approved, with the approver's comment |
| Approval outcome `Reject` | The approver rejected the invoice | Email the submitter that the invoice was rejected |
| Any other approval outcome | The approval did not end in an approval or a rejection | Take no action. Inspect the run history |
| The submitter has no manager | The submitter is outside the organization or has no manager in the directory, or the lookup failed | Assign the approval to the `FinanceEmailAddress` value. The run continues |
| Submitted By is empty or unknown | The prompt carried no Object ID, the chat user could not be read, or the directory has no such user | The submitter lookup in step 3 returns no email address, so the manual review email has no CC and the approval goes to Finance. An outcome email has no recipient and fails `[VERIFY]` G4 |
| The approval workflow's environment variable has no current and no default value | The workflow cannot find the Finance address | End the run as failed with a message that names `FinanceEmailAddress`. Nothing is sent and the row stays |
| An intake environment variable has no current and no default value | The intake workflow cannot find the site, library or folder | End the run as failed with a message that names the variable. Nothing is saved |
| The agent step fails | The agent could not finish and may not have written a row | The intake run fails or ends without a row `[VERIFY]` G2. With no row, the approval workflow never starts and nobody is emailed |

## Dataverse data model

One table, **Auto Invoice Review**, in the **Autonomous Invoice Orchestration** solution. The solution unique name is `AutonomousInvoiceOrchestration`. The publisher prefix is `[FILL]`. The Copilot prompt that creates it is in [Step 2-2 of the Runbook](../3.Runbook.md#step-2-2-create-table).

| Display Name | Data Type | Options | Skill field | Set by |
|---|---|---|---|---|
| Accounting GL Code | Text | 100 | `AccountingGLCode` | invoice-extraction-review |
| Auto Invoice Review ID | GUID | Native primary key. Created by Dataverse, not in the Copilot prompt | — | Dataverse |
| Billed to Legal Entity | Boolean | Yes/No | — | No skill |
| Currency | Text | 100 | `Currency` | invoice-extraction-review |
| Decision | Choice | NEEDS_REVIEW, READY_FOR_APPROVAL | `Decision` | invoice-extraction-review |
| Due Date | Date Only | — | `DueDate` | invoice-extraction-review |
| Invoice Date | Date Only | — | `InvoiceDate` | invoice-extraction-review |
| Invoice Number | Text | 100 | `InvoiceNumber` | invoice-extraction-review |
| Issues Found | Multiline Text | At least 4000 (raised after the table is saved) | `IssuesFound` | invoice-extraction-review |
| Purchase Order Number | Text | 100 | `PurchaseOrderNumber` | invoice-extraction-review |
| Review Link | URL | 200 | `ReviewLink` | invoice-extraction-review |
| Source Link | URL | 200 | `SourceLink` | invoice-extraction-review |
| Submitted By | Text | 100 | `SubmittedBy` | invoice-extraction-review |
| Subtotal | Decimal | Precision 2 | `Subtotal` | invoice-extraction-review |
| Summary | Multiline Text | 2000 | `Summary` | invoice-extraction-review |
| Tax | Decimal | Precision 2 | `Tax` | invoice-extraction-review |
| Total Amount Due | Decimal | Precision 2 | `TotalAmountDue` | invoice-extraction-review |
| Vendor ID | Text | 100 | `VendorID` | invoice-extraction-review |
| Vendor Name | Text | 100 | `VendorName` | invoice-extraction-review |

- `invoice-extraction-review` writes 17 columns in one create-a-row call, after the review file exists. The new row is what starts the approval workflow. No skill sets Billed to Legal Entity, so it stays empty until the skill is extended. The skill's `InvoiceNumber` field holds the invoice number as printed and is saved in the Invoice Number column. Submitted By holds the `submittedBy` Object ID, which is the `SubmittedBy` value from the prompt or the chatting user's Object ID from `GetMyProfile`, and it is empty when neither is available. It stores an Object ID and never an email address.
- Every column is optional. Any business-required flag (a red `*` in the data grid) must be cleared, so an invoice that lacks a value is still saved with Decision `NEEDS_REVIEW` and Finance can follow up.
- Copilot chooses the table's primary name column from the 18 listed columns, most likely Vendor Name. The skill never reads or writes by it, and whether a row is still created when that column is empty is `[VERIFY]` G4.
- The Copilot prompt in Step 2-2 of the Runbook asks for 18 columns. The Auto Invoice Review ID is the table's native primary key that Dataverse creates itself, and its display name in the maker portal can be the table name. This scenario always calls it Auto Invoice Review ID.
- The table has no alternate key and the skill does not look for an existing row, so a second run for the same invoice creates a second row.
- Choice values are written as the labels `NEEDS_REVIEW` and `READY_FOR_APPROVAL`. Whether the connector accepts labels or option values is `[VERIFY]` G4.
- Source Link and Review Link are capped at 200 characters. Keep the site, library and folder names short.

## Naming and path contract

| Item | Rule |
|---|---|
| Original PDF | Saved in the `SourceFolderPath` folder (`/Invoices/Sources`) of the `SharePointDocumentLibrary` library under the attachment's file name. The intake workflow prompt defines no timestamp, prefix, length cap or character cleanup. Whether a second attachment with the same name fails, overwrites the first or gets a new name is `[VERIFY]` G5. If you need unique names, add a timestamp to the file name in the **Create file** action by hand |
| Review file | Named by the skill as `yyyyMMdd_hhmmss_<invoiceNumber>.json` in the `ReviewsFolderPath` folder (`/Invoices/Reviews`). When the invoice number is empty, the timestamp is followed by the original invoice file name. The name changes on every run, so a repeated run writes another file |
| Path form | The intake workflow passes the full path of the saved PDF to the agent. The exact path form that the SharePoint tool accepts and the link that the agent builds for the saved file are `[VERIFY]` G5 |
| Folder limits | The agent reads the Invoices library and writes only to the Reviews and Sources folders. These limits come from the connection permissions and the environment variables, not from a path check in the skill |

## Limitations and operational ownership

| Area | Limitation | Owner |
|---|---|---|
| PDF quality | Scanned images, handwriting and unusual layouts may yield missing or wrong values. A wrong value that is present is not caught by the decision check, so the approver must compare it with the PDF | AP/Finance team |
| Duplicates | There is no duplicate detection. The same invoice, or a corrected resubmission, creates another row and another review file, and the earlier `NEEDS_REVIEW` row stays. AP/Finance deletes extra rows | AP/Finance team |
| Checks the skill does not make | The skill checks that fields are present. It does not check that subtotal plus tax equals the total or that the bill-to is an approved legal entity, and it leaves Billed to Legal Entity empty | AP/Finance team |
| Manual review | An invoice that is not `READY_FOR_APPROVAL` is emailed to the `FinanceEmailAddress` value, with the submitter in CC, by the approval workflow. The submitter sees what is missing, and Finance contacts the submitter and decides how to continue | AP/Finance team |
| Partial writes | The row is the last write of a run. If the environment variables, the sharing link or the review file step fails, the skill has not reached the row, so no row may exist for that invoice, and the approval workflow does not start. Whether the agent still saves a row without a Review Link is `[VERIFY]` G2. The approval workflow does not check the links, so an empty link can show up in the approval and the emails as an empty value. The invoice is not processed again automatically | Power Platform engineer |
| Every added row starts the approval | The approval workflow starts for every row that is added to the table and owned by the workflow's owner. Rows from Preview tests, rows that the owner adds by hand, rows from another process that the owner owns and the second row of a duplicate invoice each start an approval or a review email. Keep the approval workflow off while you test the agent, or pass your own Object ID as the submitter | Power Platform engineer |
| Trigger scope User | The trigger starts only for rows that the workflow's owner owns. A row that the agent adds under another account, for example another connection in production, starts nothing and nobody is emailed. Use one account for the agent's Dataverse connection and for the workflow's Dataverse connection, or the workflow does not run `[VERIFY]` G4 | Power Platform engineer |
| Submitted By | The column stores the submitter's Object ID, not an email address. The intake workflow looks it up from the sender's email address, and the agent reads it with `GetMyProfile` for a PDF uploaded in the chat. A sender who is not in the directory (an external sender, or a guest whose address does not match the user principal name) gives an empty value. The approval then goes to Finance, the manual review email has no CC and the outcome email has no recipient. `GetMyProfile` can fail for guest users. The column holds up to 100 characters | Power Platform engineer |
| Callback registration | The approval workflow's connection owner needs create, read, write and delete rights on the **Callback Registration** table and read rights on Auto Invoice Review. Without them the trigger cannot be saved or does not fire `[VERIFY]` G4 | Power Platform admin |
| File names | An invoice number that contains characters SharePoint does not allow in a file name can make the review file write fail `[VERIFY]` G5 | Power Platform engineer |
| Approval outcome | The outcome is in the approval record and run history, not in Dataverse. No payment is made. The submitter is told only about an approval or a rejection, and any other outcome sends nothing | Solution owner |
| Agent errors | A failed agent step fails the intake run, and nobody is emailed. When the agent fails before it writes the row, nothing starts the approval workflow, so a saved PDF in `/Invoices/Sources` with no row is the only sign. Failure alerts to the owner are `[VERIFY]` G3 | Power Platform engineer |
| Capacity | Workflow runs, agent runs and the approval wait use Copilot Credits and platform limits. SharePoint allows 600 calls per 60 seconds per connection | Release / cost owner |
| Spoofed senders and untrusted text | Email sender names can be forged. The intake workflow turns the From address into an Object ID, so a forged From address maps to the real person's Object ID. The subject and the Object ID are passed to the agent as data and stored in the row as Submitted By, and the manager routing and the approval result email follow that person. A forged sender can therefore route the approval to another person's manager. Use a dedicated mailbox, an optional sender allowlist `[FILL]`, and give the approver the source PDF link | Messaging owner |
| Retention | Source PDFs, reviews, Dataverse rows and run history keep invoice data. Retention and access are `[FILL]` | Records owner |
| Rollback | Disable the intake workflow first, so no new rows appear. Check the runs in flight and the pending approvals, then disable the approval workflow. Then remove the agent's tool exposure or unpublish the agent. Removing a skill does not revoke tool permissions. Keep the written files and rows | Power Platform engineer |
