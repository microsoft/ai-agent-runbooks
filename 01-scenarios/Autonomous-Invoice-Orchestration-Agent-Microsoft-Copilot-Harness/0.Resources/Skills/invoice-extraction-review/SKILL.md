---
name: invoice-extraction-review
description: Use when the user shares an invoice as a PDF attachment in the chat, or as a link to a file in a SharePoint document library. Extracts the key invoice fields and saves one record to the Auto Invoice Review table in Dataverse. This also builds a JSON record of the extracted invoice review and saves it as a file in SharePoint, with the destination site, document library and folder resolved from Power Platform environment variables. Do NOT use for general invoice questions that do not involve a specific invoice document to process. 
---
# Invoice extraction and review

Analyze the invoice the user provided — either as an attachment in the prompt or as a link to a file in a SharePoint document library — and save the extracted information as one new row in the Auto Invoice Review Dataverse table.

## Step 1 — Resolve the destination from environment variables

The SharePoint site URL, the document library and the destination folder path are not hardcoded — they come from three Power Platform environment variables in this solution. For each one, use the Dataverse tool to:

1. Query the `environmentvariabledefinition` table filtered by `displayname` equal to the variable's schema name, retrieving its `environmentvariabledefinitionid` and `defaultvalue`.
2. Query the `environmentvariablevalue` table filtered by the lookup to that `environmentvariabledefinitionid`, retrieving its `value`.
3. Use the `environmentvariablevalue.value` if a row exists; otherwise fall back to the definition's `defaultvalue`. If neither yields a usable value, stop and tell the user the environment variable has no value configured, naming the schema name.

REMEMBER to first check Current value if that does not exists then Default value!

Resolve these three variables this way:

| Purpose | Environment variable displayname |
|---|---|
| SharePoint site URL | SharePointSiteURL |
| SharePoint document library | SharePointDocumentLibrary |
| Review file (JSON) folder path | ReviewsFolderPath |
| Source file (PDF) folder path | SourceFolderPath |

Do this resolution once per run, before building the JSON content.

## Step 2 — Get file content

### Step 2.1 — If file is uploaded in the chat

- Use the **CreateFile** tool to save the uploaded file to SharePoint
  - Site: the SharePoint site URL resolved in Step 1
  - Library: the SharePoint document library resolved in Step 1
  - Folder: the SourceFolderPath resolved in Step 1
  - File name: **Exact same name as the uploaded file**
  - File content: use the SharePoint tool to fetch the file's content

- Get the user's Object ID (the `id` value) using GetMyProfile tool which is needed to be saved to SubmittedBy

### Step 2.2 — If file is provided via SharePoint link

- If SharePoint link is provided in the prompt, then use the SharePoint tool to fetch the file's content from that link, then read it.
- If neither an attachment nor a usable SharePoint link is present, ask the user to provide the invoice before continuing.

## Step 3 - Create sharing link

Use 'CreateSharingLink' tool with file's ItemId to create sharing link to be used as file's SourceLink

## Step 4 — Extract the required fields

Read the invoice carefully and extract each of these fields. If a field is genuinely not present on the invoice, leave its column value empty/null rather than guessing a value.

| Information | Column | Type | Notes |
|---|---|---|---|
| Invoice number | InvoiceNumber | single line of text | |
| Vendor | VendorName | single line of text | |
| Vendor ID | VendorID | single line of text | |
| Invoice date | InvoiceDate | datetime | leave empty if not found |
| Due date | DueDate | datetime | leave empty if not found |
| Purchase order | PurchaseOrderNumber | whole number | |
| Subtotal | Subtotal | decimal | |
| Tax | Tax | decimal | |
| Total amount | TotalAmountDue | decimal | |
| Currency | Currency | single line of text | ISO code such as USD or EUR |
| GL code | AccountingGLCode | single line of text | |

Example: an invoice showing "Invoice #INV-10234", "Acme Supplies Ltd", vendor ID "V-4471", dated "2026-03-01", due "2026-03-31", PO "48291", subtotal "1200.00", tax "96.00", total "1296.00", currency "USD", GL code "6100-OFFICE" maps directly one field per row above, with no reformatting beyond normalizing dates to datetime and amounts to decimals.

## Step 5 — Work out the review fields

Once you've tried to extract every field in Step 3, compute these:

- **IssuesFound** (multiple lines of text): a semicolon-separated list naming every one of the 11 fields above that was missing from the invoice, in plain language — for example "Purchase order missing; GL code missing". If nothing was missing, leave IssuesFound empty.
- **Summary** (one sentence, no line breaks): one plain-language sentence summarizing the invoice and your decision — for example "Invoice INV-10234 from Acme Supplies Ltd for 1296.00 USD is ready for approval." or "Invoice from Acme Supplies Ltd is missing its purchase order and GL code, so it needs review."
- **Decision** (choice — READY_FOR_APPROVAL or NEEDS_REVIEW): READY_FOR_APPROVAL only when all 11 fields from Step 2 were found on the invoice; otherwise NEEDS_REVIEW if even one of them is missing.

## Step 6 — Build the JSON content

Assemble a JSON object with exactly these keys, using the values extracted/computed by the invoice extraction and review skill, plus the four passed-in fields:

| Key | Source |
|---|---|
| invoiceNumber | Extracted InvoiceNumber |
| vendorName | Extracted VendorName |
| vendorId | Extracted VendorID |
| invoiceDate | Extracted InvoiceDate |
| dueDate | Extracted DueDate |
| purchaseOrderNumber | Extracted PurchaseOrderNumber |
| subtotal | Extracted Subtotal |
| tax | Extracted Tax |
| totalAmountDue | Extracted TotalAmountDue |
| currency | Extracted Currency |
| glCode | Extracted AccountingGLCode |
| decision | Extracted Decision |
| issues | Extracted IssuesFound |
| summary | Extracted Summary |
| emailSubject | passed in the prompt |
| submittedBy | Object ID passed in the prompt as SubmittedBy, or the user's Object ID from GetMyProfile (Step 2) |
| sourceLink | Created sharing link (Step 2) |

Leave any field that was not found on the invoice as an empty string in the JSON row. Do not add, rename, or drop keys.

Example output:

```json
{"invoiceNumber": "TEST-MISSING-003", "vendorName": "Fabrikam Test Services", "vendorId": "V12345", "invoiceDate": "9/24/2026", "dueDate": "10/24/2026", "purchaseOrderNumber": "PO-2026-1042", "subtotal": "500.00", "tax": "40.00", "totalAmountDue": "540.00", "currency": "USD", "glCode": "GL-12345", "decision": "NEEDS_REVIEW", "issues": "Invoice date not provided on document; Due date not provided", "summary": "This is a synthetic test invoice from Fabrikam Test Services for $540.00 that needs manual review.", "emailSubject": "Invoice", "submittedBy": "3f2b8c1e-5a47-4d9e-9b1c-7e6d2a4f8b10", "sourcePdfLink": "https://m365cpi76932473.sharepoint.com/:b:/s/CopilotAgent/IQD40_y39bm9T7Nrt0spcYEHASfzwUKzs6E5UeS6LXjkqyI"}
```

## Step 7 — Name the file

Name the file using timestamp 'yyyyMMdd_hhmmss_' and invoiceNumber when available, e.g. `20261007_135209_TEST-MISSING-003.json`. If invoiceNumber is empty, name it using a timestamp instead using original invoice file name

## Step 8 — Save the file

Use the Create SharePoint File tool to create the file with:

- Site: the SharePoint site URL resolved in Step 5
- Library: the SharePoint document library resolved in Step 5
- Folder: the destination folder path resolved in Step 5
- File name: as determined in Step 8
- File content: the JSON object from Step 6 and Step 7, serialized as text
- Return file's ItemId

## Step 9 - Create sharing link

Use 'CreateSharingLink' tool with file's ItemId, the SharePoint site URL and the document library resolved in Step 5 to create sharing link to be used as file's ReviewLink


## Step 10 — Save the record

Use the Dataverse tool to create one new row in the "Auto Invoice Review" table with these column values:

- InvoiceNumber, VendorName, VendorID, InvoiceDate, DueDate, PurchaseOrderNumber, Subtotal, Tax, TotalAmountDue, Currency, AccountingGLCode — as extracted in Step 2 (empty/null for anything not found).
- IssuesFound, Summary, Decision — as computed in Step 3.
- SourceLink from Step 2.
- ReviewLink from Step 10.
- SubmittedBy — the submittedBy Object ID from Step 6 (empty if none was passed and none was found).
