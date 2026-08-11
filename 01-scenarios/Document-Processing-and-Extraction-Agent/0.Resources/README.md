# Resources — Document Processing & Extraction Agent

| Folder / file | Purpose |
|---|---|
| `Golden-Set/` | 30+ documents with independently confirmed correct values — the accuracy reference |
| `Schemas/` | Field schemas per document type, with validation rules and thresholds |
| `Evaluation/` | Accuracy reports per field and per language, threshold derivation data |
| `Output-Specs/` | Target system import specifications and tested sample files |
| `Baseline/` | Manual process timings, volumes (documents **and** pages), error rates |
| `Poison-Queue/` | Documents that fail processing, with reasons — the extension backlog |

> 📌 Re-run the golden set quarterly. Supplier template changes degrade accuracy gradually and
> nobody reports it — the regression run is what catches the drift.
