# Resources and Source Basis - Insights Analyst D365 Sales

## Published Archives

| File | Contents | Intended use |
|---|---|---|
| [Insights-Analyst-D365-Sales-Cowork-Plugin.zip](Insights-Analyst-D365-Sales-Cowork-Plugin.zip) | Cowork plugin package: root `manifest.json`, `color.png`, `outline.png`, `README.md`, `LICENSE` and `shared/metric-dictionary.md`, plus seven expanded skill folders under `skills/`, each with `SKILL.md`, `references/reference.md` and `references/metric-dictionary.md` (27 files). | Upload the complete ZIP through the supported Cowork plugin surface after package-owner review. |
| [Insights-Analyst-D365-Sales-Skills.zip](Insights-Analyst-D365-Sales-Skills.zip) | Skills-only bundle: an `Insights-Analyst-d365-sales/` wrapper with `README.md`, `LICENSE`, the master `metric-dictionary.md` and the same seven skill folders (24 files). No app manifest or icons. | Author testing through Upload skill or OneDrive; use the skill folders inside the wrapper. |

| Archive | SHA-256 |
|---|---|
| `Insights-Analyst-D365-Sales-Cowork-Plugin.zip` | `9f0866c9c38d520bb16e98b215a82eab30ad9f4e9e7cb664b3bbedaf2f1e76a7` |
| `Insights-Analyst-D365-Sales-Skills.zip` | `4715c5c6d50d2aa5c9663b5315b84c87ed62ce357508b9c037506cdecc1c752c` |

The plugin manifest declares package version `1.0.1`, manifest version `devPreview` and id
`8d045188-27a6-4073-a3c8-f17465a26467`. All seven skills declare version `1.0.1` and the metric
dictionary is version 1.0.0. The skills declare no verification flag. Package and skill versions
are package metadata, not evidence of tenant approval or completed acceptance.

## Included Skills

| Declared skill name | Version | Function and outputs |
|---|---|---|
| `analytics-concierge` | `1.0.1` | Route to one skill and cadence; quote metric definitions; no computation |
| `pipeline-trend-weekly` | `1.0.1` | Weekly KPIs, movement bridge, ledgers and deltas with driving deals |
| `forecast-variance-monthly` | `1.0.1` | Commit at month start versus closed won, with four driver ledgers |
| `win-loss-quarterly` | `1.0.1` | Win/loss by segment, product, territory and competitor; loss reasons; patterns |
| `key-account-health` | `1.0.1` | 0-100 health score and band per named key account, with evidence |
| `pipeline-anomaly-watch` | `1.0.1` | Ledger of unusual opportunity changes in the look-back window |
| `analytics-report-pack` | `1.0.1` | Excel workbook and PowerPoint deck from the latest report; optional archive filing |

Folder names match the declared names. The seven skill folders (`SKILL.md` and both reference
files) are byte-identical across the two archives, and the eight copies of the metric dictionary
in each archive are identical. Only the two `README.md` files differ.

## Provenance and Changes

The package was authored as "Recurring Analytics - D365 Sales" (package 1.0.0, October 2026) and
renamed to Insights Analyst by its author before first publication (November 2026). The rename
changed the plugin display name and descriptions, the README titles, the package name in two
skill descriptions and one concierge reply, and the file names. Skill logic, skill names, metric
definitions, versions and the manifest id were not changed.

Version 1.0.1 (November 2026, also before first publication) replaces the filing exception in the
skills and the plugin README: every archive filing needs its own approval after the destination
path and file name are shown, and a declined or unanswered filing leaves the report in the
session Output folder. The skills also declare `license: MIT`, and both archives include the MIT
licence notice as `LICENSE`. Package and skill versions moved to 1.0.1; skill names, metric
definitions and the manifest id did not change.

## Package Notes and Prerequisites

- **Companion skills.** Several "Use instead" tables and descriptions hand off to Chief of Staff
  Sales skills (`sales-leader-360`, `deal-brief`, `pipeline-pulse`, `segment-pattern`,
  `pipeline-review-deck`) and to one Chief of Staff Service skill (`escalation-brief`). They are
  published as the
  [Chief of Staff D365 Sales Cowork Agent](../../Chief-of-Staff-D365-Sales-Cowork-Agent/1.Overview.md)
  and the
  [Chief of Staff D365 Service Cowork Agent](../../Chief-of-Staff-D365-Service-Cowork-Agent/1.Overview.md),
  not as part of the [Chief of Staff Cowork Agent](../../Chief-of-Staff-Cowork-Agent/1.Overview.md).
  The handoffs apply only where those packages are installed for the same users; otherwise treat
  them as routing hints.
- **Developer details.** The manifest names "Productivity Squad" as developer, with microsoft.com
  website, privacy and terms URLs. Have the package owner replace them with approved organisation
  values in a working copy before organisational distribution. The URLs in the published ZIP have
  not been changed.
- **Manifest version.** The manifest uses `devPreview`. Switch to 1.28 or 1.29 in a working copy
  only if the upload channel requires it, then retest.
- **Data access.** The ZIPs do not enable the Sales plugin, the Dataverse MCP server, the tenant
  Work IQ setting, opportunity audit history or the Fabric IQ plugin, and do not provision the
  report archive folder. Qualify these with the
  [Cowork D365 Plugin Enablement](../../../02-patterns/Cowork-D365-Sales-Service-Plugin-Enablement/Cowork-D365-Sales-Service-Plugin-Enablement.md) pattern
  and the [runbook](../3.Runbook.md).
- **Overlap.** The [Insights Analyst Cowork Agent](../../Insights-Analyst-Cowork-Agent/1.Overview.md)
  includes a `sales-analytics` skill, and the Number Owner and Quota Carrier packs cover adjacent
  sales workflows. Qualify routing with
  [Persona Skill Routing and Scope Isolation](../../../02-patterns/Persona-Skill-Routing-and-Scope-Isolation/Persona-Skill-Routing-and-Scope-Isolation.md)
  before enabling overlapping packs for the same users. No skill names are shared with the
  Insights Analyst Cowork Agent archives.

## Choosing and Using a Package

1. Select one installation route per user under tenant policy; avoid installing both archives and
   creating duplicate skill names.
2. **Plugin:** keep the root layout (`manifest.json`, icons, `shared/` and the expanded `skills/`
   folders). Upload the complete ZIP; do not add an outer folder or nest ZIPs.
3. **Skills-only:** extract the bundle and use the seven skill folders inside
   `Insights-Analyst-d365-sales/`, not the wrapper. Each skill needs `SKILL.md` directly under its
   folder with its `references/` folder alongside. Use this route for author testing only; it
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
| Confirmation of audit or change tracking on the opportunity fields | Period-over-period comparison without snapshots |
| Value threshold, currency, quota source and key-account list | Parameter set for prompts and reference defaults |
| Report archive folder path and naming pattern | Comparison fallback and filing destination |
| Certified semantic model name (optional) | Fabric IQ aggregates, labelled in reports |
| Baseline measurements and a schedule inventory with owners | Value measurement, operations and rollback |

## Validation Status

Archive integrity, file inventory, manifest metadata, declared skill names and the cross-archive
identity of the skill files and metric dictionary copies were inspected locally on November 24,
2026. [Author testing: add the date, environment type and the RA test IDs executed with their
results, or delete this sentence.] Upload compatibility in other tenants, data access and
live-tenant acceptance have not been validated.

See the [overview](../1.Overview.md), [runbook](../3.Runbook.md) and
[governed analytics pattern](../../../02-patterns/Governed-Analytics-Review/Governed-Analytics-Review.md).
