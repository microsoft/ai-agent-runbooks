# Sample Invoices

Two synthetic, single-page invoices for testing the Invoice Processing Agent. All names, numbers and addresses are fictional. The PDFs contain selectable text.

| File | Purpose | Expected result |
|---|---|---|
| `Fabrikam-INV-2026-0417-complete.pdf` | Complete invoice with every field printed | Decision `READY_FOR_APPROVAL`, no issues, approval starts |
| `Fabrikam-INV-2026-0418-missing-po.pdf` | Same layout, no purchase order number | Purchase Order Number missing, Decision `NEEDS_REVIEW`, email to Finance, no approval |

## Values printed on the invoices

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

Do not use these files as production data. Test with a real mailbox and library only in a non-production environment. Do not add real invoices to this repository.
