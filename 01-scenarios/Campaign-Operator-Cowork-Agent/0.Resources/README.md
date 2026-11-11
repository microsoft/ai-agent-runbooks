# Resources and Source Basis - Campaign Operator Cowork Agent

## Published Archive

| File | Contents | Intended use |
|---|---|---|
| [campaign-operator-cowork-plugin.zip](campaign-operator-cowork-plugin.zip) | Original supplied persona plugin; 16 files, 6 skill folders with `SKILL.md` and `reference.md`, app manifest and icons | Inspect and prepare an owner-approved working package for a supported tenant installation route |

**Package version:** `3.1.0`. **Manifest version:** `devPreview`.
The skills declare `verified: false`; metadata and documentation availability do not establish tenant approval.

**SHA-256 of the unchanged original:**

```text
12a24e0efd04b9577fe0bf3a9d4a8f364201de17b831845eca20bb2ba7f7b114
```

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
| `asset-production` | `3.1.0` | `reference.md` | Workflow and output contract |
| `campaign-command-center` | `3.1.0` | `reference.md` | Workflow and output contract |
| `campaign-operator-concierge` | `3.1.0` | `reference.md` | Route or clarify only |
| `content-drift-audit` | `3.1.0` | `reference.md` | Workflow and output contract |
| `customer-signal-synthesis` | `3.1.0` | `reference.md` | Workflow and output contract |
| `event-command-center` | `3.1.0` | `reference.md` | Workflow and output contract |


## Source Variants and Compatibility

- The supplied domain-level loose skill sources differ from this ZIP for: `asset-production`, `campaign-command-center`, `campaign-operator-concierge`, `content-drift-audit`, `customer-signal-synthesis`, `event-command-center`. They are not interchangeable. This scenario uses the ZIP as its source of truth.
- The supplied expanded plugin directory also differs from the original ZIP. Extract this published ZIP for editing rather than assuming the loose directory represents its version.

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
The supplied source variants were compared without modifying the published archive.

Upload compatibility, tenant installation, actual source access, runtime approval enforcement,
label handling, scheduling and business acceptance **have not been validated**. The prompts and
result tables are specifications, not executed evidence. Keep deployment blocked at any unmet
critical gate.

See the [overview](../1.Overview.md), [delivery runbook](../3.Runbook.md),
[sample prompts](../4.Sample-prompts.md) and
[shared skill-delivery pattern](../../../02-patterns/Cowork-Skill-Delivery-and-Scheduled-Reviews/Cowork-Skill-Delivery-and-Scheduled-Reviews.md).
