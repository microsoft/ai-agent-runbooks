---
name: save-invoice-json-to-sharepoint
description: Use when the agent has extracted invoice fields and the prompt also supplies emailSubject, emailSender, sourcePdfPath, and sourcePdfLink. Builds a JSON record of the extracted invoice review and saves it as a file in SharePoint, with the destination site, document library and folder resolved from Power Platform environment variables. Do NOT use when those four fields were not supplied in the prompt.
---
# Save invoice review as a JSON file in SharePoint

After extracting the invoice fields and computing the review outcome (per the invoice extraction and review skill), build one JSON object and save it as a file in SharePoint.

## Step 1 — Confirm this skill applies

Only run this skill when the prompt supplied all four of: emailSubject, emailSender, sourcePdfPath, sourcePdfLink, alongside the invoice. If any of these four are missing, skip this skill — it only saves the JSON companion file, not the Dataverse row.

## Step 2 — Resolve the destination from environment variables

The SharePoint site URL, the document library and the destination folder path are not hardcoded — they come from three Power Platform environment variables in this solution. For each one, use the Dataverse tool to:

1. Query the `environmentvariabledefinition` table filtered by `displayname` equal to the variable's schema name, retrieving its `environmentvariabledefinitionid` and `defaultvalue`.
2. Query the `environmentvariablevalue` table filtered by the lookup to that `environmentvariabledefinitionid`, retrieving its `value`.
3. Use the `environmentvariablevalue.value` if a row exists; otherwise fall back to the definition's `defaultvalue`. If neither yields a usable value, stop and tell the user the environment variable has no value configured, naming the schema name.

Resolve these three variables this way:

| Purpose | Environment variable displayname |
|---|---|
| SharePoint site URL | SharePointSiteURL |
| SharePoint document library | SharePointDocumentLibrary |
| Destination folder path | ReviewsFolderPath |

Do this resolution once per run, before building the JSON content.

## Step 3 — Build the JSON content

Assemble a JSON object with exactly these keys, using the values extracted/computed by the invoice extraction and review skill, plus the four passed-in fields:

| Key | Source |
|---|---|
| invoiceKey | extracted INVOICE_KEY |
| vendorName | extracted VENDOR_NAME |
| vendorId | extracted VENDOR_ID |
| invoiceDate | extracted INVOICE_DATE |
| dueDate | extracted DUE_DATE |
| purchaseOrderNumber | extracted PURCHASE_ORDER_NUMBER |
| subtotal | extracted SUBTOTAL |
| tax | extracted TAX |
| totalAmountDue | extracted TOTAL_AMOUNT_DUE |
| currency | extracted CURRENCY |
| glCode | extracted GL_CODE |
| decision | computed DECISION |
| issues | computed ISSUES_FOUND |
| summary | computed SUMMARY |
| emailSubject | passed in the prompt |
| emailSender | passed in the prompt |
| sourcePdfPath | passed in the prompt |
| sourcePdfLink | passed in the prompt |

Leave any field that was not found on the invoice as an empty string, matching how it was recorded in the Dataverse row. Do not add, rename, or drop keys.

Example output:

```json
{"invoiceKey": "TEST-MISSING-003", "vendorName": "Fabrikam Test Services", "vendorId": "V12345", "invoiceDate": "9/24/2026", "dueDate": "10/24/2026", "purchaseOrderNumber": "PO-2026-1042", "subtotal": "500.00", "tax": "40.00", "totalAmountDue": "540.00", "currency": "USD", "glCode": "GL-12345", "decision": "NEEDS_REVIEW", "issues": "Invoice date not provided on document; Due date not provided", "summary": "This is a synthetic test invoice from Fabrikam Test Services for $540.00 that needs manual review.", "emailSubject": "Invoice", "emailSender": "AmberR@M365CPI76932473.OnMicrosoft.com", "sourcePdfPath": "/Shared Documents/Invoices/Source/20261007_135209_Incomplete_Test_Invoice_NEEDS_REVIEW.pdf", "sourcePdfLink": "https://m365cpi76932473.sharepoint.com/:b:/s/CopilotAgent/IQD40_y39bm9T7Nrt0spcYEHASfzwUKzs6E5UeS6LXjkqyI"}
```

## Step 4 — Name the file

Name the file using timestamp 'yyyyMMdd_hhmmss_' and invoiceKey when available, e.g. `20261007_135209_TEST-MISSING-003.json`. If invoiceKey is empty, name it using a timestamp instead using original invoice file name

## Step 5 — Save the file

Use the Create SharePoint File tool to create the file with:

- Site: the SharePoint site URL resolved in Step 2
- Library: the SharePoint document library resolved in Step 2
- Folder: the destination folder path resolved in Step 2
- File name: as determined in Step 4
- File content: the JSON object from Step 3, serialized as text
- Return file's ItemId

## Step 6 - Create sharing link

Use 'CreateSharingLink' tool with file's ItemId, the SharePoint site URL and the document library resolved in Step 2 to create sharing link to be used as file's REVIEW_LINK

## Step 7 — Update Dataverse record

Update table record REVIEW_LINK with sharing link
