# Sample Invoices

Four synthetic, single-page invoices for testing the Invoice Processing Agent, as two pairs. All names, numbers and addresses are fictional. The PDFs contain selectable text.

| File | Purpose | Expected result |
|---|---|---|
| `Fabrikam-INV-2026-0417-complete.pdf` | Complete invoice with every field printed | Decision `READY_FOR_APPROVAL`, no issues, approval starts |
| `Fabrikam-INV-2026-0418-missing-po.pdf` | Same layout, no purchase order number | Purchase Order Number missing, Decision `NEEDS_REVIEW`, email to Finance, no approval |
| `Complete_Test_Invoice_READY_FOR_APPROVAL.pdf` | Complete invoice with a table layout, line items and an accounting section | Decision `READY_FOR_APPROVAL`, no issues, approval starts |
| `Incomplete_Test_Invoice_NEEDS_REVIEW.pdf` | Exception path: the invoice date, due date, accounting/GL code and billed-to legal entity are printed as `NOT PROVIDED`, and no vendor ID or purchase order is printed | Decision `NEEDS_REVIEW`, Issues Found lists vendor ID, invoice date, due date, purchase order and GL code, email to Finance with the submitter in CC, no approval |

The file names of the second pair state the expected decision. The agent must decide from the content of the PDF, not from its name.

## Values printed on the Fabrikam invoices

| Field | `…-0417-complete.pdf` | `…-0418-missing-po.pdf` |
|---|---|---|
| Vendor ID | V-10482 | V-10482 |
| Vendor name | Fabrikam Office Supplies Ltd | Fabrikam Office Supplies Ltd |
| Invoice number | INV-2026-0417 | INV-2026-0418 |
| Purchase order | PO-558201 | not printed |
| Invoice date | 2026-04-15 | 2026-04-16 |
| Due date | 2026-05-15 | 2026-05-16 |
| Currency | USD | USD |
| Subtotal | 1250.00 | 500.00 |
| Tax (8%) | 100.00 | 40.00 |
| Total amount due | 1350.00 | 540.00 |
| GL code | 6410 Office Supplies | 6410 Office Supplies |
| Bill To | Contoso Holdings Ltd | Contoso Holdings Ltd |

## Values printed on the Test invoices

| Field | `Complete_Test_Invoice_READY_FOR_APPROVAL.pdf` | `Incomplete_Test_Invoice_NEEDS_REVIEW.pdf` |
|---|---|---|
| Vendor ID | TEST-VENDOR-042 | not printed |
| Vendor name | Contoso Office Supplies LLC | Fabrikam Test Services |
| Invoice number | INV-2026-READY-002 | TEST-MISSING-003 |
| Purchase order | PO-2026-1042 | not printed |
| Invoice date | 2026-09-24 | `NOT PROVIDED` |
| Due date | 2026-10-24 | `NOT PROVIDED` |
| Currency | USD | USD |
| Subtotal | 1600.00 | 500.00 |
| Tax | 128.00 (8%) | 40.00 |
| Total amount due | 1728.00 | 540.00 |
| GL code | 610500 - Office Equipment & Supplies | `NOT PROVIDED` |
| Bill to | Contoso Corporate IT Operations | `NOT PROVIDED` |

Do not use these files as production data. Test with a real mailbox and library only in a non-production environment. Do not add real invoices to this repository.
