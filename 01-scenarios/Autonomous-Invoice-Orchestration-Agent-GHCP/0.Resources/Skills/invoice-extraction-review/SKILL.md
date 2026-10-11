---
name: invoice-extraction-review
description: Use when the user shares an invoice as a PDF attachment in the chat, or as a link to a file in a SharePoint document library. Extracts the key invoice fields and saves one record to the Auto Invoice Review table in Dataverse. Do NOT use for general invoice questions that do not involve a specific invoice document to process.
---
# Invoice extraction and review

Analyze the invoice the user provided — either as an attachment in the prompt or as a link to a file in a SharePoint document library — and save the extracted information as one new row in the Auto Invoice Review Dataverse table.

## Step 1 — Get the invoice content

- If the user attached a PDF directly in the prompt, read it from the attachment.
- If the user instead gave a link to a file in a SharePoint document library, use the SharePoint tool to fetch the file's content from that link, then read it.
- If neither an attachment nor a usable SharePoint link is present, ask the user to provide the invoice before continuing.

## Step 2 - Create sharing link

Use 'CreateSharingLink' tool with file's ItemId to create sharing link to be used as file's SOURCE_LINK

## Step 3 — Extract the required fields

Read the invoice carefully and extract each of these fields. If a field is genuinely not present on the invoice, leave its column value empty/null rather than guessing a value.

| Information | Column | Type | Notes |
|---|---|---|---|
| Invoice number | INVOICE_NUMBER | single line of text | |
| Vendor | VENDOR_NAME | single line of text | |
| Vendor ID | VENDOR_ID | single line of text | |
| Invoice date | INVOICE_DATE | datetime | leave empty if not found |
| Due date | DUE_DATE | datetime | leave empty if not found |
| Purchase order | PURCHASE_ORDER_NUMBER | whole number | |
| Subtotal | SUBTOTAL | decimal | |
| Tax | TAX | decimal | |
| Total amount | TOTAL_AMOUNT_DUE | decimal | |
| Currency | CURRENCY | single line of text | ISO code such as USD or EUR |
| GL code | GL_CODE | single line of text | |

Example: an invoice showing "Invoice #INV-10234", "Acme Supplies Ltd", vendor ID "V-4471", dated "2026-03-01", due "2026-03-31", PO "48291", subtotal "1200.00", tax "96.00", total "1296.00", currency "USD", GL code "6100-OFFICE" maps directly one field per row above, with no reformatting beyond normalizing dates to datetime and amounts to decimals.

## Step 4 — Work out the review fields

Once you've tried to extract every field in Step 3, compute these:

- **ISSUES_FOUND** (multiple lines of text): a semicolon-separated list naming every one of the 11 fields above that was missing from the invoice, in plain language — for example "Purchase order missing; GL code missing". If nothing was missing, leave ISSUES_FOUND empty.
- **SUMMARY** (one sentence, no line breaks): one plain-language sentence summarizing the invoice and your decision — for example "Invoice INV-10234 from Acme Supplies Ltd for 1296.00 USD is ready for approval." or "Invoice from Acme Supplies Ltd is missing its purchase order and GL code, so it needs review."
- **DECISION** (choice — READY_FOR_APPROVAL or NEEDS_REVIEW): READY_FOR_APPROVAL only when all 11 fields from Step 2 were found on the invoice; otherwise NEEDS_REVIEW if even one of them is missing.

## Step 5 — Save the record

Use the Dataverse tool to create one new row in the "Auto Invoice Review" table with these column values:

- INVOICE_NUMBER, VENDOR_NAME, VENDOR_ID, INVOICE_DATE, DUE_DATE, PURCHASE_ORDER_NUMBER, SUBTOTAL, TAX, TOTAL_AMOUNT_DUE, CURRENCY, GL_CODE — as extracted in Step 2 (empty/null for anything not found).
- ISSUES_FOUND, SUMMARY, DECISION — as computed in Step 3.
- SOURCE_LINK from Step 2.