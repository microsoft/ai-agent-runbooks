# Resources and Source Basis - Insights Analyst D365 ERP

## Published Archives

| File | Contents | Intended use |
|---|---|---|
| [Insights-Analyst-D365-ERP-Cowork-Plugin.zip](Insights-Analyst-D365-ERP-Cowork-Plugin.zip) | Cowork plugin package: root `manifest.json`, `color.png`, `outline.png`, `README.md`, `INSTALL.md` and `LICENSE`, plus eleven expanded skill folders under `skills/`, each with `SKILL.md` and `reference.md` (28 files). | Upload the complete ZIP through the supported Cowork plugin surface after package-owner review. |
| [Insights-Analyst-D365-ERP-Skills.zip](Insights-Analyst-D365-ERP-Skills.zip) | Skills-only bundle: `README.md`, `LICENSE` and the same eleven skill folders at the root (24 files). No app manifest, icons or `INSTALL.md`. | Author testing through Upload skill or OneDrive; use the skill folders, not the root files. |

| Archive | SHA-256 |
|---|---|
| `Insights-Analyst-D365-ERP-Cowork-Plugin.zip` | `11b031496948e31c1607fa2210ca82a7ffd485e9456ed7ce5ab668a1ef92a13c` |
| `Insights-Analyst-D365-ERP-Skills.zip` | `1cea81ae7b0b94a66ae0ac5bf8e32f114f510d0ae6a8d9f7c4f0c68b659a3d06` |

The plugin manifest declares package version `1.1.3`, manifest version `devPreview` and id
`112929ad-f4ab-5798-837b-710e6f047396`, and Cowork shows the plugin as **Insights Analyst_D365 ERP**. All
eleven skills declare version `1.1.3`, `license: MIT` and `verified: "false"`. Package and skill versions
are package metadata, not evidence of tenant approval or completed acceptance.

## Included Skills

| Declared skill name | Version | Cadence | Function and outputs |
|---|---|---|---|
| `insights-analyst-concierge` | `1.1.1` | n/a | Route a goal to one report and cadence; hand briefs to `erp-concierge`; no data access |
| `cash-liquidity-pulse` | `1.1.1` | Daily | Closing balances, net movement, 7/14-day inflows and outflows, unreconciled lines |
| `warehouse-fulfillment-pulse` | `1.1.1` | Daily | Open warehouse work, pending shipments, backorders, transfers in transit, count variances |
| `ar-aging-collections-pulse` | `1.1.1` | Weekly | Ageing buckets, DSO, top-10 overdue customers, credit-limit and dispute flags |
| `ap-payment-readiness-pulse` | `1.1.1` | Weekly | AP ageing, DPO, payment-run readiness and match exceptions |
| `inventory-health-pulse` | `1.1.1` | Weekly | On-hand value, turns, days of supply, stock-level exceptions, slow-moving and obsolete items |
| `procurement-po-health-pulse` | `1.1.1` | Weekly | Open-PO health, late lines, requisition queue and price variance |
| `production-planning-pulse` | `1.1.1` | Weekly | Production and master-planning status, late orders and shortages |
| `pl-budget-variance-report` | `1.1.1` | Monthly | P&L, trial balance, budget versus actual and material variances with MoM and YoY |
| `close-readiness-analytics` | `1.1.1` | Monthly | Period status by module, close blockers (unposted journals, pending invoices, unreconciled lines, depreciation) and the days-to-close trend |
| `supplier-performance-report` | `1.1.1` | Monthly | OTIF, delay days, rejection, mismatch and lead-time variance per vendor; no composite score |

Folder names match the declared names. The eleven skill folders (`SKILL.md` and `reference.md`)
are byte-identical across the two archives, and both archives carry the same `README.md` and
`LICENSE`. Every `SKILL.md` stays under the package's 20,000-character recommended authoring target
(largest: 19,146 characters); Cowork's actual platform limit is 1 MB per `.md` skill file.

## Provenance and Changes

The package was authored as "Insights Analyst_D365 ERP" by Arulvel Rajan (Microsoft) and supplied
as package 1.1.0 (November 2026) with the author's *Cowork Insights Analyst (D365 ERP) Scenario
Runbook*. Version 1.1.0 added the explicit hand-off to the Chief-of-staff-erp package, the
once-per-conversation session inputs, the HTML default and the Word follow-up.

Version 1.1.1 (November 2026, before first publication in this repository) changes the following
in the skills, the reference files, `README.md` and `INSTALL.md`; skill names, logic, KPI
definitions and the manifest id did not change:

- **Email approval:** a scheduled run requests approval before each email. Approval of the schedule
  or of an earlier send no longer covers the next send, and a declined or unanswered send leaves
  the report in the session Output folder.
- **Snapshot approval:** storing a snapshot outside the session Output folder is treated as a
  file write. The skill shows the path and file name and requests approval for that write only; a
  declined or unanswered write keeps the snapshot in the Output folder, and approval of a schedule
  or of an earlier write does not authorize the next write.
- **Licence:** every skill declares `license: MIT` and both archives include the MIT licence
  notice as `LICENSE`.
- **Archive names:** the ZIPs follow repository naming, and `INSTALL.md` refers to
  `Insights-Analyst-D365-ERP-Cowork-Plugin.zip`.

## Package Notes and Prerequisites

- **Companion package.** Every report declines chief-of-staff brief requests and names the
  Chief-of-staff-erp package, published as the
  [Chief of Staff D365 ERP Cowork Agent](../../Chief-of-Staff-D365-ERP-Cowork-Agent/1.Overview.md).
  The hand-offs work only where that package is installed for the same users.
- **Snapshots.** Point-in-time metrics have no history in the source entities, so each skill
  persists its own run's snapshot (values, as-of date and legal entity) for the next run's
  comparison. The package does not name a storage location. Record where snapshots are kept; a
  write outside the session Output folder is approved per write, and IA-V-15 confirms that the
  second run finds the first run's snapshot and that a declined write leaves no copy elsewhere.
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
- **Overlap.** The [Insights Analyst Cowork Agent](../../Insights-Analyst-Cowork-Agent/1.Overview.md)
  includes a Finance review over Power BI, Fabric or Excel data, and the
  [Close Owner](../../Close-Owner-Cowork-Agent/1.Overview.md) persona pack covers close and variance
  packs. Qualify routing with
  [Persona Skill Routing and Scope Isolation](../../../02-patterns/Persona-Skill-Routing-and-Scope-Isolation/Persona-Skill-Routing-and-Scope-Isolation.md)
  before enabling overlapping packs for the same users.

## Choosing and Using a Package

1. Select one installation route per user under tenant policy; avoid installing both archives and
   creating duplicate skill names. Remove any 1.0 loose-skill install first.
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
| Material-variance threshold and any other customer thresholds | `reference.md` parameter set |
| Snapshot storage location and its owner | Period-over-period comparison and retention |
| Entity gap list from the metadata check | Source-gap expectations and later reference-file correction |
| Baseline measurements and a schedule inventory with owners | Value measurement, operations and rollback |

## Validation Status

Archive integrity, file inventory, manifest metadata, declared skill names and versions, YAML
front matter, `SKILL.md` sizes and the cross-archive identity of the skill files were checked
locally on November 25, 2026, after the 1.1.1 changes. Upload compatibility in other tenants,
data access, live-tenant acceptance and author testing of the IA-V scenarios have not been
validated.

See the [overview](../1.Overview.md), [runbook](../3.Runbook.md),
[plugin enablement pattern](../../../02-patterns/Cowork-D365-Finance-SCM-Plugin-Enablement/Cowork-D365-Finance-SCM-Plugin-Enablement.md)
and [governed analytics pattern](../../../02-patterns/Governed-Analytics-Review/Governed-Analytics-Review.md).
