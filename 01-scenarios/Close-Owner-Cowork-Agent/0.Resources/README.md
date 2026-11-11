# Resources and Source Basis - Close Owner Cowork Agent

## Published Archive

| File | Contents | Intended use |
|---|---|---|
| [close-owner-cowork-plugin.zip](close-owner-cowork-plugin.zip) | Supplied persona plugin; 18 files, 7 skill folders with `SKILL.md` and `reference.md`, app manifest and icons | Inspect and prepare an owner-approved working package for a supported tenant installation route |

**Package version:** `3.0.0`. **Manifest version:** `devPreview`.
The skills declare `verified: false`; metadata and documentation availability do not establish tenant approval.

**SHA-256 of the archive in this repository:**

```text
c46d015c2cf6892e7e14c5180ed6c2721dec811206b88122ac00c8e3d2cb2f02
```

The original supplied archive (SHA-256
`683b194df5f21087efed0e5de318ce6133aac96c53568c2ac0464964afc93f4d`) differs only by one wording
update: the Dashboard / model note in `skills/weekly-business-review/reference.md` now refers to
the Insights Analyst scenario.

## Archive Layout and Installation

The original ZIP has `manifest.json`, `color.png`, `outline.png` and the expanded `skills/` directories at its root. Keep that layout when preparing an approved working package.

The ZIP itself contains editable skills. No separate skills-only ZIP is supplied with this
scenario. For a policy-approved individual skill route, extract only the selected skill folders
and keep each `SKILL.md` with its paired `reference.md`. Do not install an outer wrapper as a
skill or replace expanded plugin skills with nested ZIPs.

Choose one supported route and verify new-session discovery. The preview manifest and current
tenant packaging/governance requirements must be accepted before deployment. An archive does
not grant source access, install connectors, configure billing or provision schedules.

## Included Skills

| Declared skill | Skill version | Companion | Role |
|---|---|---|---|
| `budget-consolidation` | `3.0.0` | `reference.md` | Workflow and output contract |
| `market-intelligence` | `3.0.0` | `reference.md` | Workflow and output contract |
| `audit-evidence-package` | `3.0.0` | `reference.md` | Workflow and output contract |
| `weekly-business-review` | `3.0.0` | `reference.md` | Workflow and output contract |
| `close-owner-concierge` | `3.0.0` | `reference.md` | Route or clarify only |
| `close-and-variance-package` | `3.0.0` | `reference.md` | Workflow and output contract |
| `reconciliation-review` | `3.0.0` | `reference.md` | Workflow and output contract |


## Source Variants and Compatibility

- The supplied expanded plugin and matching domain-level skill files were byte-compared with this archive and matched for the inventoried skill/reference pairs. This is source consistency evidence, not upload or runtime acceptance.

Tune references in an approved working copy first. Fixed approval, authorization, privacy,
people-safety and domain restrictions cannot be loosened by customer settings. Version any
approved instruction changes and rerun affected tests.

## Delivery Assets to Obtain or Produce

| Asset | Purpose and owner |
|---|---|
| Approved working package, hash/version record and rollback copy | Package owner and administrator accept layout, variants and distribution route |
| Source/identity/scope contract and exclusions | Source owner proves actual retrieval and denied access |
| Existing templates, thresholds and reference settings | Persona owner accepts output structure and authoritative definitions |
| Sanitized test cases and reviewed expected answers | Reviewer repeats original test IDs and negative/recovery probes |
| Baseline/pilot scorecard and official cost evidence | Sponsor/billing owner decide value and budget fit |
| Schedule inventory, stop rules and operational handover | Support owner can pause, update, roll back and retire the accepted version |

## Validation Status

On **2026-10-27**, the original archive's ZIP integrity, SHA-256 copy, manifest inventory,
declared names, skill versions and companion-file presence were inspected locally.
The supplied source variants were compared without modifying the published archive. On **2026-10-30**,
the one wording update described above was applied; no other archive content changed.

Upload compatibility, tenant installation, actual source access, runtime approval enforcement,
label handling, scheduling and business acceptance **have not been validated**. The prompts and
result tables are specifications, not executed evidence. Keep deployment blocked at any unmet
critical gate.

See the [overview](../1.Overview.md), [delivery runbook](../3.Runbook.md),
[sample prompts](../4.Sample-prompts.md) and
[shared skill-delivery pattern](../../../02-patterns/Cowork-Skill-Delivery-and-Scheduled-Reviews/Cowork-Skill-Delivery-and-Scheduled-Reviews.md).
