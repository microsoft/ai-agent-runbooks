# Resources and Source Basis - Insights Analyst D365 Service

## Published Archives

| File | Contents | Intended use |
|---|---|---|
| [Insights-Analyst-D365-Service-Cowork-Plugin.zip](Insights-Analyst-D365-Service-Cowork-Plugin.zip) | Cowork plugin package: root `manifest.json`, `color.png`, `outline.png`, `README.md`, `LICENSE` and `shared/metric-dictionary.md`, plus seven expanded skill folders under `skills/`, each with `SKILL.md`, `references/reference.md` and `references/metric-dictionary.md` (27 files). | Upload the complete ZIP through the supported Cowork plugin surface after package-owner review. |
| [Insights-Analyst-D365-Service-Skills.zip](Insights-Analyst-D365-Service-Skills.zip) | Skills-only bundle: an `Insights-Analyst-d365-service/` wrapper with `README.md`, `LICENSE`, the master `metric-dictionary.md` and the same seven skill folders (24 files). No app manifest or icons. | Author testing through Upload skill or OneDrive; use the skill folders inside the wrapper. |

| Archive | SHA-256 |
|---|---|
| `Insights-Analyst-D365-Service-Cowork-Plugin.zip` | `da583e36dd838a580f98cbfeaba1448c5d58f1d75f12ac3abaa1e2b5a6450276` |
| `Insights-Analyst-D365-Service-Skills.zip` | `fb274e38a9b0dbd1dd5700eee455cb70787eb6c78a1ae8866cd9a08ecc785961` |

The plugin manifest declares package version `1.0.1`, manifest version `devPreview` and id
`8767fed2-f414-4339-b54d-0f74437e4a12`. All seven skills declare version `1.0.1` and the service
metric dictionary is version 1.0.0. The skills declare no verification flag. Package and skill
versions are package metadata, not evidence of tenant approval or completed acceptance.

## Included Skills

| Declared skill name | Version | Function and outputs |
|---|---|---|
| `service-analytics-concierge` | `1.0.1` | Route to one skill and cadence; quote metric definitions; no computation |
| `backlog-trend-weekly` | `1.0.1` | Weekly backlog and SLA KPIs, backlog bridge, ledgers and deltas with driving items |
| `sla-attainment-monthly` | `1.0.1` | Attainment by KPI, queue, priority and channel, with breach drivers and at-risk counts |
| `case-mix-quarterly` | `1.0.1` | Volume and rates by category, product and channel; incident-driven volume; patterns |
| `account-service-health` | `1.0.1` | 0-100 service health score and band per named key account, with evidence |
| `case-anomaly-watch` | `1.0.1` | Ledger of unusual case patterns in the look-back window |
| `service-report-pack` | `1.0.1` | Excel workbook and PowerPoint deck from the latest report; optional archive filing |

Folder names match the declared names. The seven skill folders (`SKILL.md` and both reference
files) are byte-identical across the two archives, and the eight copies of the metric dictionary
in each archive are identical. Only the two `README.md` files differ.

## Provenance and Changes

The package was authored as "Recurring Analytics - D365 Service" (package 1.0.0, October 2026)
and renamed to Insights Analyst by its author before first publication (November 2026). The
rename changed the plugin display name and descriptions, the README titles, the package name in
two skill descriptions, one concierge reply and one cross-reference to the Sales package, and the
file names. The author also aligned the manifest version to 1.0.0 to match the package
documentation. Skill logic, skill names, metric definitions, skill versions and the manifest id
were not changed.

Version 1.0.1 (November 2026, also before first publication) replaces the filing exception in the
skills and the plugin README: every archive filing needs its own approval after the destination
path and file name are shown, and a declined or unanswered filing leaves the report in the
session Output folder. The skills also declare `license: MIT`, and both archives include the MIT
licence notice as `LICENSE`. Package and skill versions moved to 1.0.1; skill names, metric
definitions and the manifest id did not change.

## Package Notes and Prerequisites

- **Companion skills.** Several "Use instead" tables and descriptions hand off to Chief of Staff
  Service skills (`service-leader-360`, `escalation-brief`, `knowledge-gap-pattern`, `queue-pulse`,
  `service-review-deck`). They are published as the
  [Chief of Staff D365 Service Cowork Agent](../../Chief-of-Staff-D365-Service-Cowork-Agent/1.Overview.md),
  not as part of the [Chief of Staff Cowork Agent](../../Chief-of-Staff-Cowork-Agent/1.Overview.md).
  The handoffs apply only where that package is installed for the same users; otherwise treat them
  as routing hints.
- **Sibling reference.** `account-service-health` points to `key-account-health` in the Insights
  Analyst D365 Sales package, published as the
  [Insights Analyst D365 Sales Cowork Agent](../../Insights-Analyst-D365-Sales-Cowork-Agent/1.Overview.md).
- **Environment selection.** The skills tell users to change the environment with
  `Set environment to [environment name]`. Current Microsoft Learn guidance for the Service plugin
  selects the environment through the plugin's Settings in Cowork; use that route where the
  phrase is not honoured. The skills never change the environment either way.
- **Developer details.** The manifest names "Productivity Squad" as developer, with microsoft.com
  website, privacy and terms URLs. Have the package owner replace them with approved organisation
  values in a working copy before organisational distribution. The URLs in the published ZIP have
  not been changed.
- **Manifest version.** The manifest uses `devPreview`. Switch to 1.28 or 1.29 in a working copy
  only if the upload channel requires it, then retest.
- **Data access.** The ZIPs do not enable the Service plugin, the Customer Service MCP
  configuration, the Dataverse MCP server, the tenant Work IQ setting, case audit history, the SLA
  calendar or the Fabric IQ plugin, and do not provision the report archive folder. Qualify these
  with the [Cowork D365 Plugin Enablement](../../../02-patterns/Cowork-D365-Sales-Service-Plugin-Enablement/Cowork-D365-Sales-Service-Plugin-Enablement.md) pattern
  and the [runbook](../3.Runbook.md).
- **Overlap.** The [Insights Analyst Cowork Agent](../../Insights-Analyst-Cowork-Agent/1.Overview.md)
  includes a `service-analytics` skill, and the Case Specialist and Service Ops Leader packs cover
  adjacent service workflows. The `backlog-trend-weekly` description includes the trigger phrase
  "weekly service analytics", which may compete with `service-analytics` where both packages are
  installed. Qualify routing with
  [Persona Skill Routing and Scope Isolation](../../../02-patterns/Persona-Skill-Routing-and-Scope-Isolation/Persona-Skill-Routing-and-Scope-Isolation.md)
  before enabling overlapping packs for the same users. No skill names are shared with the
  Insights Analyst Cowork Agent archives.

## Choosing and Using a Package

1. Select one installation route per user under tenant policy; avoid installing both archives and
   creating duplicate skill names.
2. **Plugin:** keep the root layout (`manifest.json`, icons, `shared/` and the expanded `skills/`
   folders). Upload the complete ZIP; do not add an outer folder or nest ZIPs.
3. **Skills-only:** extract the bundle and use the seven skill folders inside
   `Insights-Analyst-d365-service/`, not the wrapper. Each skill needs `SKILL.md` directly under
   its folder with its `references/` folder alongside. Use this route for author testing only; it
   leaves one metric dictionary copy per skill per user without central version control.
4. Start a new Cowork session, confirm discovery and routing, and run the
   [acceptance tests](../3.Runbook.md) before enabling schedules.

The plugin packages the skills through its app manifest. Neither archive supplies a separately
hosted agent runtime, grants source access or provisions schedules.

## Assets Required for Delivery

| Asset to obtain or produce | Purpose |
|---|---|
| Approved selection of the plugin or skills-only archive | Record the chosen version, configuration changes and tenant approval |
| Approved environment display name and per-user environment check | Environment rule in every report header |
| Confirmation of audit or change tracking on case and SLA KPI fields, and of the SLA calendar | Period-over-period comparison and business-hour metrics |
| Queues in scope and key-account list | Parameter set for prompts and reference defaults |
| Report archive folder path and naming pattern | Comparison fallback and filing destination |
| Certified semantic model name (optional) | Fabric IQ aggregates, labelled in reports |
| Baseline measurements and a schedule inventory with owners | Value measurement, operations and rollback |

## Validation Status

Archive integrity, file inventory, manifest metadata, declared skill names and the cross-archive
identity of the skill files and metric dictionary copies were inspected locally on November 24,
2026. [Author testing: add the date, environment type and the RS test IDs executed with their
results, or delete this sentence.] Upload compatibility in other tenants, data access and
live-tenant acceptance have not been validated.

See the [overview](../1.Overview.md), [runbook](../3.Runbook.md) and
[governed analytics pattern](../../../02-patterns/Governed-Analytics-Review/Governed-Analytics-Review.md).
