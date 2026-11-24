# Resources and Source Basis - Chief of Staff D365 Sales

## Published Archives

| File | Contents | Intended use |
|---|---|---|
| [Chief-of-Staff-D365-Sales-Cowork-Plugin.zip](Chief-of-Staff-D365-Sales-Cowork-Plugin.zip) | Cowork plugin package: root `manifest.json`, `color.png` (192x192), `outline.png` (32x32), `README.md` and `LICENSE`, plus seven expanded skill folders under `skills/`, each with `SKILL.md` and `references/reference.md` (19 files). | Upload the complete ZIP through the supported Cowork plugin surface after package-owner review. |
| [Chief-of-Staff-D365-Sales-Skills.zip](Chief-of-Staff-D365-Sales-Skills.zip) | Skills-only bundle: a `Chief-of-staff-d365-sales/` wrapper with `README.md`, `LICENSE` and the same seven skill folders (16 files). No app manifest or icons. | Author testing through Upload skill or OneDrive; use the skill folders inside the wrapper. |

| Archive | SHA-256 |
|---|---|
| `Chief-of-Staff-D365-Sales-Cowork-Plugin.zip` | `00deef795d15f6bebb8077c11b6984fa1dad8c3d8f91e7d88ec44ed87c9a89cb` |
| `Chief-of-Staff-D365-Sales-Skills.zip` | `18e93ba05ca48c4c6febd0f46412c86f94f3465e1911dafdacbc39284b68d346` |

The plugin manifest declares the display name "Chief of Staff Sales", package version `1.1.1`,
manifest version `devPreview` and id `753f12de-5098-4dd3-8c88-772267328f93`. All seven skills
declare version `1.1.1`. The skills declare no verification flag. Package and skill versions are
package metadata, not evidence of tenant approval or completed acceptance.

## Included Skills

| Declared skill name | Version | Function and outputs | Dynamics 365 posture |
|---|---|---|---|
| `sales-concierge` | `1.1.1` | Route to one skill; name the built-in skill for plain asks | No access |
| `sales-leader-360` | `1.1.1` | Weekly operating brief, dashboard, deal-risk lens and first moves | Read-only |
| `deal-brief` | `1.1.1` | Executive one-page brief for one account, opportunity or meeting | Read-only |
| `pipeline-pulse` | `1.1.1` | Hygiene ledgers and drafted fixes | Read; next step and close date only via approval |
| `lead-reengagement` | `1.1.1` | Quiet-lead ledger, angles and outreach drafts | Read-only; sends via approval |
| `segment-pattern` | `1.1.1` | Segment and territory patterns from deal facts | Read-only |
| `pipeline-review-deck` | `1.1.1` | PowerPoint from a package brief | No new data |

Folder names match the declared names, and the manifest lists the seven folders in its
`agentSkills` array. The fourteen skill files (`SKILL.md` and `references/reference.md` per skill)
are byte-identical across the two archives; only the two `README.md` files differ.

## Provenance and Changes

The package was authored as "Chief of Staff Sales" (package 1.1.0, October 2026) with the
delivery runbook "Cowork Chief of Staff (Sales) Runbook", version 4.1. According to the package
README, version 1.1.0 added explicit handoffs to the built-in Sales skills, narrowed trigger
phrases, aligned environment handling and approval gates with documented Cowork behaviour, moved
companion files to `references/`, removed manifest fields that the 1.28 schema rejects and added
`lead-reengagement`, `segment-pattern` and `pipeline-review-deck`.

Version 1.1.1 (November 2026, before first publication) changes only the licence: the skills
declare `license: MIT`, both archives include the MIT licence notice as `LICENSE`, and the README
files record the new version. Skill instructions, skill names and the manifest id did not change.

The scenario documents adapt the author's runbook: test IDs S-01 to S-12, definitions, the pilot
boundary and the evaluation targets are retained, example parameter values were replaced with
placeholders, and Microsoft Learn prerequisites reviewed on November 20, 2026 were added.

## Package Notes and Prerequisites

- **Built-in skill overlap.** The package's handoff tables name three built-in Sales skills
  (meeting preparation, activity synthesis and pipeline prioritizer). Microsoft Learn (page updated
  November 3, 2026) lists a broader built-in set, including executive deal review, segment
  analysis, CRM data hygiene, team pipeline review, deal catch-up and draft outreach, which overlap
  `deal-brief`, `sales-leader-360`, `segment-pattern`, `pipeline-pulse` and `lead-reengagement`.
  The same page lists pipeline prioritizer under the CRM-agnostic Sales for Cowork plugin rather
  than the Sales plugin. Check the skills that the tenant's Sales plugin shows, run S-08 and the
  [overlap probes](../4.Sample-prompts.md#built-in-overlap-probes), and agree routing before the
  pilot.
- **Related scenarios.** The
  [Insights Analyst D365 Sales Cowork Agent](../../Insights-Analyst-D365-Sales-Cowork-Agent/1.Overview.md)
  hands weekly-brief, deal-brief, hygiene, segment and deck requests to these skills. The
  [Chief of Staff Cowork Agent](../../Chief-of-Staff-Cowork-Agent/1.Overview.md) is a different
  five-skill package over Microsoft 365 sources. No declared skill names are shared with it, with
  the Quota Carrier or Number Owner archives or with the Insights Analyst archives, but intents
  overlap. Qualify routing with
  [Persona Skill Routing and Scope Isolation](../../../02-patterns/Persona-Skill-Routing-and-Scope-Isolation/Persona-Skill-Routing-and-Scope-Isolation.md)
  before enabling overlapping packs for the same users.
- **Developer details.** The manifest names "Productivity Squad" as developer, with microsoft.com
  website, privacy and terms URLs. Have the package owner replace them with approved organisation
  values in a working copy before organisational distribution. The URLs in the published ZIPs are
  unchanged.
- **Manifest version.** The manifest uses `devPreview`. Switch `manifestVersion` and `$schema` to
  1.28 or 1.29 in a working copy only if the upload channel requires it, then retest.
- **Data access.** The ZIPs do not enable the Sales plugin, the Dataverse MCP server or the tenant
  Dataverse setting, do not grant Dynamics 365 roles and do not provision schedules. Qualify these
  with the
  [Cowork D365 Plugin Enablement](../../../02-patterns/Cowork-D365-Sales-Service-Plugin-Enablement/Cowork-D365-Sales-Service-Plugin-Enablement.md)
  pattern and the [runbook](../3.Runbook.md).
- **Candidate expansions.** The package README names `deal-signal-watch` and `meeting-to-crm` as
  future candidates. They are not included in either archive.

## Choosing and Using a Package

1. Select one installation route per user under tenant policy; avoid installing both archives and
   creating duplicate skill names.
2. **Plugin:** keep the root layout (`manifest.json`, icons and the expanded `skills/` folders).
   Upload the complete ZIP; do not add an outer folder or nest ZIPs.
3. **Skills-only:** extract the bundle and use the seven skill folders inside
   `Chief-of-staff-d365-sales/`, not the wrapper. Each skill needs `SKILL.md` directly under its
   folder with its `references/` folder alongside. Use this route for author testing only.
4. Start a new Cowork session, confirm discovery and routing, and run the
   [acceptance tests](../3.Runbook.md) before enabling the Monday schedule.

The plugin packages the skills through its app manifest. Neither archive supplies a separately
hosted agent runtime, grants source access, commits record updates or provisions schedules.

## Assets Required for Delivery

| Asset to obtain or produce | Purpose |
|---|---|
| Approved selection of the plugin or skills-only archive | Record the chosen version, configuration changes and tenant approval |
| Signed pilot boundary | Users, environment, threshold, currency, key accounts, batch cap, permitted fields and rules |
| Cowork D365 Plugin Enablement evidence for the Sales module | Plugin availability, MCP server, tenant setting, write posture and PLG results |
| Approved environment display name and per-user environment check | Environment rule in every output header |
| Monday prompt text and schedule owner | Scheduled preparation, change control and rollback |
| Low-privilege test user and approved test records | S-05, S-06 and S-09 |
| Baseline measurements | Value measurement at 30 and 60 days |

## Validation Status

Archive integrity, file inventory, manifest metadata, declared skill names and versions and the
cross-archive identity of the skill files were inspected locally on November 24, 2026.
[Author testing: add the date, environment type and the S test IDs executed with their results,
or delete this sentence.] Upload compatibility in other tenants, data access and live-tenant
acceptance have not been validated.

See the [overview](../1.Overview.md), [runbook](../3.Runbook.md) and
[plugin enablement pattern](../../../02-patterns/Cowork-D365-Sales-Service-Plugin-Enablement/Cowork-D365-Sales-Service-Plugin-Enablement.md).
