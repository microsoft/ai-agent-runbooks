# Runbook — Intelligent Document Processing Pipeline

> Read
> [Intelligent-Document-Processing-Pipeline.md](Intelligent-Document-Processing-Pipeline.md) first.

---

## Prerequisites

| Requirement | Owner |
|---|---|
| **Real, unfiltered** sample documents — at least 50, covering all variants | Customer |
| The target system of record and its write path | Platform team |
| Named business owner for accuracy thresholds | Customer |
| Foundry / Document Intelligence access | Platform team |
| A reviewer population identified | Customer |

---

## Step 1 — Inventory the Document Variants

The single biggest scoping error is assuming one document type.

| Variant | Volume/month | Source | Format | Text or image? | In scope? |
|---|---|---|---|---|---|

Ask specifically: how many issuers, templates, languages, and layouts? A "vendor invoice" is rarely
one thing — one engagement discovered the volume came from many issuers with different layouts.

**Deliverable:** variant inventory with volumes.

---

## Step 2 — Define the Output Contract First

Before touching extraction, define exactly what the pipeline must produce.

| Field | Type | Required? | Source in document | Validation rule | Material? |
|---|---|---|---|---|---|

"Material" marks fields that must always be reviewed regardless of confidence — amounts, dates,
counterparties, quantities.

Then define the target: which system, which schema, which write mechanism, and whether the write is
autonomous or produces a file for a human to commit.

**Deliverable:** output contract, signed by the business owner.

---

## Step 3 — Confirm the Write Path Exists

Do this in week one. Extraction is rarely the blocker; the write is.

| Question | Answer |
|---|---|
| Does the target system have an API? | |
| If not, what is the supported import mechanism? | |
| Who owns credentials and entitlement? | |
| Is autonomous write acceptable, or file-based export only? | |
| Is there an idempotency key we can use? | |

> ⚠️ One payroll engagement documented that **no APIs existed between the systems at all**, which
> reframed the entire solution. Discover this before designing around it.

**Deliverable:** write-path confirmation.

---

## Step 4 — Baseline Extraction on Real Content

Run the unfiltered sample set — including the bad ones — through extraction.

| Field | Docs tested | Extracted correctly | Accuracy | Notes |
|---|---|---|---|---|

Record failures by cause: rotation, handwriting, poor scan, unexpected language, unseen layout,
photograph of a screen.

Set the confidence threshold from **this** data, not from a default.

**Deliverable:** extraction accuracy baseline per field.

---

## Step 5 — Design the Confidence Gate

| Field | Threshold | Below threshold → | Always review? |
|---|---|---|---|

Start conservative:

1. **Pilot:** review everything. Measure accuracy in production conditions.
2. **After 4+ weeks of data:** auto-approve the fields that demonstrably exceed the threshold.
3. **Never** auto-approve material fields without an explicit, signed business decision.

**Deliverable:** confidence gate design with the review policy.

---

## Step 6 — Build the Review Surface

Non-negotiable requirements:

- [ ] Extracted value shown **beside** the source document
- [ ] The specific page or region highlighted
- [ ] Confidence visible per field
- [ ] Correction is one action, not a re-key
- [ ] Reviewer can reject and route back
- [ ] Every correction captured for accuracy measurement

If a reviewer has to open the source document separately, the time saving evaporates and they will
stop using it.

**Deliverable:** review surface, tested with actual reviewers.

---

## Step 7 — Failure Paths

| Failure | Behaviour |
|---|---|
| Document unreadable | Route to human queue with the document attached. Never drop |
| Unknown document type | Route to triage. Never guess the schema |
| Required field missing | Flag as exception; do not fabricate |
| Validation rule violated | Hold; surface the rule that failed |
| Target system unavailable | Queue and retry; do not lose the work |
| Duplicate detected | Idempotency key; report rather than re-create |

**Deliverable:** failure path matrix.

---

## Step 8 — Audit Trail

Capture per document:

| Element | Captured? |
|---|---|
| Source document reference | |
| Extracted values with confidence | |
| Validation results | |
| Reviewer identity | |
| Corrections made | |
| Timestamp of write | |
| Target record reference | |

For invoicing, transfer pricing, and regulatory use cases the audit trail *is* the deliverable.

**Deliverable:** audit design signed by compliance.

---

## Step 9 — Pilot and Measure

Run in parallel with the manual process for a full cycle.

| Metric | Baseline | Pilot | Target |
|---|---|---|---|
| Documents processed per day | | | |
| Straight-through rate | | | |
| Field-level accuracy | | | |
| Reviewer time per document | | | |
| End-to-end turnaround | | | |
| Exceptions requiring rework | | | |

Straight-through rate and reviewer time per document are the two that determine whether the business
case lands.

---

## Step 10 — Operate

| Cadence | Activity | Owner |
|---|---|---|
| Weekly (first month) | Correction review — which fields fail most | Delivery engineer |
| Monthly | Accuracy trend; adjust thresholds | Business owner |
| On new variant | Re-baseline extraction before enabling | Delivery engineer |
| Quarterly | Re-run the full sample set | Delivery engineer |

New document variants are the main cause of production regression. Make variant onboarding an
explicit, gated process.

---

## Exit Criteria

- [ ] Variant inventory with volumes
- [ ] Output contract signed
- [ ] Write path confirmed to exist
- [ ] Extraction baselined on real, unfiltered content
- [ ] Confidence gate designed from measured accuracy
- [ ] Review surface shows value beside source, tested with reviewers
- [ ] Failure paths defined — nothing dropped, nothing guessed
- [ ] Audit trail signed by compliance
- [ ] Parallel-run pilot measured against baseline
- [ ] Variant onboarding process defined
