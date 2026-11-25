# Resources and Source Basis - Chief of Staff D365 ERP

## Published Archives

| File | Contents | Intended use |
|---|---|---|
| [Chief-of-Staff-D365-ERP-Cowork-Plugin.zip](Chief-of-Staff-D365-ERP-Cowork-Plugin.zip) | Cowork plugin package: root `manifest.json`, `color.png`, `outline.png`, `README.md`, `INSTALL.md` and `LICENSE`, plus eleven expanded skill folders under `skills/`, each with `SKILL.md` and `reference.md` (28 files). | Upload the complete ZIP through the supported Cowork plugin surface after package-owner review. |
| [Chief-of-Staff-D365-ERP-Skills.zip](Chief-of-Staff-D365-ERP-Skills.zip) | Skills-only bundle: `README.md`, `LICENSE` and the same eleven skill folders at the root (24 files). No app manifest, icons or `INSTALL.md`. | Author testing through Upload skill or OneDrive; use the skill folders, not the root files. |

| Archive | SHA-256 |
|---|---|
| `Chief-of-Staff-D365-ERP-Cowork-Plugin.zip` | `30003cbd248c456ff5924d69abb3bca69467c9ed87e0f1b424a848e3b555ab36` |
| `Chief-of-Staff-D365-ERP-Skills.zip` | `049cef45ef206e77ce888b26a4ca81550a0ff607abfc2498850d017d3e6f9267` |

The plugin manifest declares package version `2.0.1`, manifest version `devPreview` and id
`3642e18b-8c79-5936-a06b-88cdb97ab026`, and Cowork shows the plugin as **Chief of staff_D365 ERP**. All
eleven skills declare version `2.0.1`, `license: MIT` and `verified: "false"`. Package and skill versions
are package metadata, not evidence of tenant approval or completed acceptance.

## Included Skills

| Declared skill name | Version | Function and outputs |
|---|---|---|
| `erp-concierge` | `2.0.1` | Route a goal to one brief and its trigger phrase; hand reports, KPIs and trends to `insights-analyst-concierge`; no data access |
| `finance-morning-brief` | `2.0.1` | Daily finance attention list across payables, receivables, ledger, bank and fixed assets |
| `finance-approvals-brief` | `2.0.1` | Finance items waiting in workflow, with age, amount and what clears each |
| `customer-account-brief` | `2.0.1` | Customers needing attention; one-page call brief for one customer |
| `project-portfolio-brief` | `2.0.1` | Weekly project watch-list ordered by exposure |
| `finance-week-ahead-brief` | `2.0.1` | Dated finance week with carry-over |
| `scm-morning-brief` | `2.0.1` | Daily cross-module supply chain attention list |
| `procurement-decisions-brief` | `2.0.1` | Requisitions, purchase order changes, RFQs and quality orders awaiting a decision |
| `operations-week-ahead-brief` | `2.0.1` | Dated operations week with carry-over lates |
| `order-trace-brief` | `2.0.1` | Stuck orders; end-to-end trace of one order with the blocking step |
| `supplier-brief` | `2.0.1` | Vendors needing attention; one-page call brief for one vendor |

Folder names match the declared names. The eleven skill folders (`SKILL.md` and `reference.md`)
are byte-identical across the two archives, and both archives carry the same `README.md` and
`LICENSE`. Every `SKILL.md` is under Cowork's 20,000-character upload limit (largest: 19,615
characters).

## Provenance and Changes

The package was authored as "Chief of staff_D365 ERP" by Arulvel Rajan (Microsoft) and supplied as
package 2.0.0 (September 2026) with the author's *Cowork Chief of Staff (D365 ERP) Scenario
Runbook*. Version 2.0.0 replaced the ten module briefs of 1.0.0 with the current ten briefs and
removed the package's only write path.

Version 2.0.1 (November 2026, before first publication in this repository) changes the following
in the skills, the reference files, `README.md` and `INSTALL.md`; skill names, logic, definitions,
thresholds and the manifest id did not change:

- **Email approval:** a scheduled run requests approval before each email. Approval of the schedule
  or of an earlier send no longer covers the next send, and a declined or unanswered send leaves
  the brief in the session Output folder.
- **Licence:** every skill declares `license: MIT` and both archives include the MIT licence
  notice as `LICENSE`.
- **Companion name:** hand-offs name the analytics package by its published name,
  Insights-Analyst-erp and `insights-analyst-concierge`, instead of the pre-publication name
  Recurring-Analytics-erp and `recurring-analytics-concierge`.
- **Archive names:** the ZIPs follow repository naming, and `INSTALL.md` refers to
  `Chief-of-Staff-D365-ERP-Cowork-Plugin.zip`.

## Package Notes and Prerequisites

- **Companion package.** The hand-off tables in every brief name report skills from the
  [Insights Analyst D365 ERP Cowork Agent](../../Insights-Analyst-D365-ERP-Cowork-Agent/1.Overview.md)
  (`cash-liquidity-pulse`, `ar-aging-collections-pulse`, `ap-payment-readiness-pulse`,
  `close-readiness-analytics`, `pl-budget-variance-report`, `inventory-health-pulse`,
  `procurement-po-health-pulse`, `production-planning-pulse`, `warehouse-fulfillment-pulse`,
  `supplier-performance-report`). The hand-offs work only where that package is installed for the
  same users; otherwise treat them as routing hints.
- **Developer details.** The manifest names "Arulvel Rajan, Microsoft" as developer, with
  microsoft.com website, privacy and terms URLs. Have the package owner replace them with approved
  organisation values in a working copy before organisational distribution.
- **Manifest version.** The manifest uses `devPreview`. Switch to a released schema version in a
  working copy only if the upload channel requires it, then retest.
- **Data access.** The ZIPs do not enable the Dynamics 365 ERP apps plugin, the Dataverse setting,
  the ERP MCP server feature, Allowed MCP clients or any finance and operations role. Qualify these
  with the
  [Cowork D365 Finance and SCM Plugin Enablement](../../../02-patterns/Cowork-D365-Finance-SCM-Plugin-Enablement/Cowork-D365-Finance-SCM-Plugin-Enablement.md)
  pattern and the [runbook](../3.Runbook.md).
- **Overlap.** The [Close Owner](../../Close-Owner-Cowork-Agent/1.Overview.md) and
  [Procurement Operator](../../Procurement-Operator-Cowork-Agent/1.Overview.md) persona packs cover
  adjacent finance and procurement workflows. Qualify routing with
  [Persona Skill Routing and Scope Isolation](../../../02-patterns/Persona-Skill-Routing-and-Scope-Isolation/Persona-Skill-Routing-and-Scope-Isolation.md)
  before enabling overlapping packs for the same users.

## Choosing and Using a Package

1. Select one installation route per user under tenant policy; avoid installing both archives and
   creating duplicate skill names. Remove any 1.x loose-skill install first.
2. **Plugin:** keep the root layout (`manifest.json`, icons, `README.md`, `INSTALL.md`, `LICENSE`
   and the expanded `skills/` folders). Upload the complete ZIP; do not add an outer folder or
   nest ZIPs.
3. **Skills-only:** extract the bundle and use the eleven skill folders. Each skill needs
   `SKILL.md` and `reference.md` directly under its folder. Use this route for author testing
   only.
4. Start a new Cowork session, confirm discovery and routing, and run the
   [acceptance tests](../3.Runbook.md) before enabling schedules.

The plugin packages the skills through its app manifest. Neither archive supplies a separately
hosted agent runtime, grants source access or provisions schedules.

## Assets Required for Delivery

| Asset to obtain or produce | Purpose |
|---|---|
| Approved selection of the plugin or skills-only archive | Record the chosen version, configuration changes and tenant approval |
| Approved environment, its URL and the legal-entity codes per user | Session inputs stated in every header band |
| Thresholds accepted or reset per customer | `reference.md` parameter set |
| Entity gap list from the metadata check | Source-gap expectations and later reference-file correction |
| Baseline measurements and a schedule inventory with owners | Value measurement, operations and rollback |

## Validation Status

Archive integrity, file inventory, manifest metadata, declared skill names and versions, YAML
front matter, `SKILL.md` sizes and the cross-archive identity of the skill files were checked
locally on November 25, 2026, after the 2.0.1 changes. [Author testing: add the date, environment
type and the CoS-V test IDs executed with their results, or delete this sentence.] Upload
compatibility in other tenants, data access and live-tenant acceptance have not been validated.

See the [overview](../1.Overview.md), [runbook](../3.Runbook.md) and
[plugin enablement pattern](../../../02-patterns/Cowork-D365-Finance-SCM-Plugin-Enablement/Cowork-D365-Finance-SCM-Plugin-Enablement.md).
