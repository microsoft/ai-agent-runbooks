# Resources and Source Basis - Case Specialist Cowork Agent

## Published Archive

| File | Contents | Intended use |
|---|---|---|
| [case-specialist-cowork-plugin.zip](case-specialist-cowork-plugin.zip) | Original supplied persona plugin; 16 files, 6 skill folders with `SKILL.md` and `reference.md`, app manifest and icons | Inspect and prepare an owner-approved working package for a supported tenant installation route |

**Package version:** `3.0.0`. **Manifest version:** `devPreview`.
The skills declare `verified: false`; metadata and documentation availability do not establish tenant approval.

**SHA-256 of the unchanged original:**

```text
287aa8c19769c50c85894673bf9a80e339375701a5d79555fe41a2812dd2d0b7
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
| `knowledge-cited-reply` | `3.0.0` | `reference.md` | Workflow and output contract |
| `escalation-handoff` | `3.0.0` | `reference.md` | Workflow and output contract |
| `stalled-case-outreach` | `3.0.0` | `reference.md` | Workflow and output contract |
| `case-specialist-concierge` | `3.0.0` | `reference.md` | Route or clarify only |
| `root-cause-diagnosis` | `3.0.0` | `reference.md` | Workflow and output contract |
| `case-intake-brief` | `3.0.0` | `reference.md` | Workflow and output contract |


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
The supplied source variants were compared without modifying the published archive.

Upload compatibility, tenant installation, actual source access, runtime approval enforcement,
label handling, scheduling and business acceptance **have not been validated**. The prompts and
result tables are specifications, not executed evidence. Keep deployment blocked at any unmet
critical gate.

See the [overview](../1.Overview.md), [delivery runbook](../3.Runbook.md),
[sample prompts](../4.Sample-prompts.md) and
[shared skill-delivery pattern](../../../02-patterns/Cowork-Skill-Delivery-and-Scheduled-Reviews/Cowork-Skill-Delivery-and-Scheduled-Reviews.md).
