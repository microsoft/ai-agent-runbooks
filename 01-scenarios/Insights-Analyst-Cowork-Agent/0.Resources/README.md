# Resources and Source Basis - Insights Analyst

## Published Archives

| File | Contents | Intended use |
|---|---|---|
| [Insights-Analyst-Cowork-Plugin.zip](Insights-Analyst-Cowork-Plugin.zip) | Cowork plugin package: root `manifest.json`, `color.png`, `outline.png`, and six expanded skill folders under `skills/`, each containing `SKILL.md` and `reference.md` (15 files total). | Upload the complete ZIP through the supported Cowork plugin surface after reviewing its manifest and tenant requirements. |
| [insights-analyst-business-functions-skills.zip](insights-analyst-business-functions-skills.zip) | Skills-only bundle: root `README.md` and six skill folders, each with `SKILL.md` and `reference.md` (13 files total). No app manifest or icons. | Inspect/customise individual skills for the supported per-user skill installation route. |

The plugin manifest declares package version **1.1.2** and manifest version **1.28**.
In both variants, the concierge declares skill version **1.0.0** and the five business-function
skills declare **1.1.0**, all with `verified: false`. Package and skill versions are distinct;
none implies tenant approval or completed acceptance.

## Included Skills

| Declared skill name | Function and outputs |
|---|---|
| `fabriciq-business-analytics-concierge` | Clarify business function and region/segment, then route to the appropriate review |
| `sales-analytics` | Consolidated revenue, pipeline and quota-attainment review |
| `finance-analytics` | Consolidated margin, spend/budget and forecast-variance review |
| `retail-analytics` | Consolidated sales, inventory/stockout and sell-through review |
| `manufacturing-analytics` | Consolidated throughput and quality review |
| `service-analytics` | Consolidated case volume, backlog/ageing and SLA review |

Each business-function skill prepares a source-grounded Markdown review and HTML dashboard,
with unavailable measures reported as gaps. `reference.md` supplies companion definitions,
thresholds and review guidance; confirm these against the customer's authoritative KPI contract.

## Package Differences and Prerequisites

- The skill names match across both archives. The skills-only function definitions additionally
  contain `cowork` frontmatter with `category: analysis` and `icon: DataPie`; those fields are
  omitted in the plugin variant. Do not assume the archives are byte-identical.
- The plugin manifest includes **placeholder `example.com` developer, privacy and terms URLs**.
  Have the package owner replace them with approved organisation values in a working copy
  before organisational distribution. The URLs in the published ZIP have not been changed.
- The skills-only README mentions additional sibling analytics skills and a broader output
  pack that are **not included in either archive**. Do not treat those references as bundled assets.
- The ZIPs do not bundle or enable the Fabric IQ data-access plugin, provision reports/models,
  grant source permissions, or supply customer data. Qualify the actual Power BI/Fabric or
  Excel Online access path as described in the [runbook](../3.Runbook.md).
- The source URL is requested for each run. Scheduled preparation still requires an approved,
  supported source-binding mechanism; an interactive-only input requirement must not be
  presented as validated unattended execution.

## Choosing and Using a Package

1. Select the plugin or skills-only installation route under tenant policy; avoid installing
   both variants blindly and creating duplicate skill names.
2. **Plugin:** retain root `manifest.json`, icons and expanded `skills/` folders. Upload the
   complete ZIP through the supported Cowork plugin surface after package-owner review.
3. **Skills-only:** extract the six folders, preserving each `SKILL.md` and `reference.md`.
   For the documented OneDrive route, place each folder under `Documents\Cowork\skills`;
   the aggregate ZIP is not a single skill with a root `SKILL.md`.
4. Start a new Cowork session, confirm discovery/routing, provide an approved source URL and
   execute the [acceptance tests](../3.Runbook.md) before enabling recurrence.

The plugin packages the skills through its app manifest; neither archive supplies a separately
hosted agent runtime. Source/RLS checks, KPI reconciliation, finance confidentiality and review
before distribution remain required. Copied HTML artifacts do not automatically enforce live RLS.

## Assets Required for Delivery

| Asset to obtain or produce | Purpose |
|---|---|
| Approved selection of the published plugin or skills-only bundle | Record the chosen package/skill versions, configuration changes and tenant approval |
| Approved source URL and actual query-access evidence | Explicit source binding, not inferred discoverability |
| KPI/period/filter/units contract and expected values | Reconciliation with the source owner |
| RLS personas and permitted output audiences | Retrieval and generated-artifact access tests |
| Sanitised Markdown/HTML review examples | Expected shape, not proof of tenant execution |
| Schedule inventory, baseline scorecard and handover record | Safe operations, cost and value measurement |

## Validation Status

Archive integrity, file inventory, manifest metadata and skill-variant differences were inspected
locally on September 25, 2026. On October 30, 2026, naming text in both ZIPs (plugin display
name, skill suite identifier, skills-only README and descriptive wording) was aligned with the
Insights Analyst name; skill logic, versions and file inventory were not changed. Upload
compatibility, actual data queries, RLS, output fidelity and live-tenant acceptance have not
been validated.

See the [overview](../1.Overview.md), [runbook](../3.Runbook.md) and
[governed analytics pattern](../../../02-patterns/Governed-Analytics-Review/Governed-Analytics-Review.md).
