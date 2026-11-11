# Resources and Source Basis - Quota Carrier Cowork Agent

## Published Archive

| File | Contents | Intended use |
|---|---|---|
| [quota-carrier-cowork-plugin.zip](quota-carrier-cowork-plugin.zip) | Original supplied persona plugin; 18 files, 7 skill folders with `SKILL.md` and `reference.md`, app manifest and icons | Inspect and prepare an owner-approved working package for a supported tenant installation route |

**Package version:** `3.0.1`. **Manifest version:** `devPreview`.
The skills declare `verified: false`; metadata and documentation availability do not establish tenant approval.

**SHA-256 of the unchanged original:**

```text
018f4a49c63123b596eb728311d8b6e79784e2469c66189b87f0cc1341459f04
```

## Archive Layout and Installation

The original ZIP has an outer `quota-carrier-cowork-plugin/` folder; its manifest is **not at the ZIP root**. Extract it and open the inner folder. For a supported upload route that requires root-level `manifest.json`, build a separately versioned working archive from those inner contents and obtain package-owner approval. Do not upload the wrapped original as though it already has a root manifest.

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
| `at-risk-commit-deals` | `3.0.1` | `reference.md` | Workflow and output contract |
| `expansion-and-upsell` | `3.0.1` | `reference.md` | Workflow and output contract |
| `meeting-prep-and-follow-up` | `3.0.1` | `reference.md` | Workflow and output contract |
| `proposal-pursuit` | `3.0.1` | `reference.md` | Workflow and output contract |
| `quota-carrier-concierge` | `3.0.1` | `reference.md` | Route or clarify only |
| `renewal-and-qbr-prep` | `3.0.1` | `reference.md` | Workflow and output contract |
| `rfp-response` | `3.0.1` | `reference.md` | Workflow and output contract |


## Source Variants and Compatibility

- The supplied domain-level loose skill sources differ from this ZIP for: `at-risk-commit-deals`, `expansion-and-upsell`, `meeting-prep-and-follow-up`, `proposal-pursuit`, `quota-carrier-concierge`, `renewal-and-qbr-prep`, `rfp-response`. They are not interchangeable. This scenario uses the ZIP as its source of truth.
- Both sales persona archives declare `at-risk-commit-deals` and `expansion-and-upsell`, and the supplied persona packages have different versions. Do not assume both copies can coexist or overwrite one another safely. Test actual discovery and scope using the [persona-isolation runbook](../../../02-patterns/Persona-Skill-Routing-and-Scope-Isolation/Persona-Skill-Routing-and-Scope-Isolation-Runbook.md).

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
