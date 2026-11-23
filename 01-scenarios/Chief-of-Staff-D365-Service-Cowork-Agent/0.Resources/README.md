# Resources and Source Basis - Chief of Staff D365 Service

## Published Archives

| File | Contents | Intended use |
|---|---|---|
| [Chief-of-Staff-D365-Service-Cowork-Plugin.zip](Chief-of-Staff-D365-Service-Cowork-Plugin.zip) | Cowork plugin package: root `manifest.json`, `color.png` (192x192), `outline.png` (32x32) and `README.md`, plus seven expanded skill folders under `skills/`, each with `SKILL.md` and `references/reference.md` (18 files). | Upload the complete ZIP through the supported Cowork plugin surface after package-owner review. |
| [Chief-of-Staff-D365-Service-Skills.zip](Chief-of-Staff-D365-Service-Skills.zip) | Skills-only bundle: a `Chief-of-staff-d365-service/` wrapper with `README.md` and the same seven skill folders (15 files). No app manifest or icons. | Author testing through Upload skill or OneDrive; use the skill folders inside the wrapper. |

| Archive | SHA-256 |
|---|---|
| `Chief-of-Staff-D365-Service-Cowork-Plugin.zip` | `97ed4eb33b3775e99a9696931207de44d8b600c835d6daea370b67565493377d` |
| `Chief-of-Staff-D365-Service-Skills.zip` | `6abe044cf5ea709f2daf64d594bb583a9e11b7b291b9da162e30804b6cd0d439` |

The plugin manifest declares the display name "Chief of Staff Service", package version `1.0.0`,
manifest version `devPreview` and id `e9dae3f6-efec-4009-ab00-f8456cf3e94e`. All seven skills
declare version `1.0.0`. The skills declare no verification flag. Package and skill versions are
package metadata, not evidence of tenant approval or completed acceptance.

## Included Skills

| Declared skill name | Version | Function and outputs | Dynamics 365 posture |
|---|---|---|---|
| `service-concierge` | `1.0.0` | Route to one skill; name the built-in skill for one-case asks | No access |
| `service-leader-360` | `1.0.0` | Weekly operating brief, backlog dashboard, risk lens and first moves | Read-only |
| `escalation-brief` | `1.0.0` | Leadership brief on one escalation, incident or account | Read-only |
| `queue-pulse` | `1.0.0` | Hygiene ledgers and drafted fixes | Read; priority, follow-up by and queue only via approval |
| `queue-pattern` | `1.0.0` | Pattern by queue, product, channel, region or category from case facts | Read-only |
| `knowledge-gap-pattern` | `1.0.0` | Recurring themes without knowledge coverage; draft outlines | Read-only; nothing published |
| `service-review-deck` | `1.0.0` | PowerPoint from a package brief | No new data |

Folder names match the declared names, and the manifest lists the seven folders in its
`agentSkills` array. The fourteen skill files (`SKILL.md` and `references/reference.md` per skill)
are byte-identical across the two archives; only the two `README.md` files differ.

## Provenance and Changes

The package was authored as "Chief of Staff Service" (package 1.0.0, October 2026) with the
delivery runbook "Cowork Chief of Staff (Customer Service) Runbook", version 1.0. It is
independent of the Chief of Staff Sales package; deploy either or both.

The archives were supplied as `Chief-of-staff-d365-service_Cowork_Plugin_v1.0.0.zip` and
`Chief-of-staff-d365-service_v1.0.0.zip` and renamed on publication to match the scenario. Their
contents are unchanged. The scenario documents adapt the author's runbook: test IDs CS-01 to
CS-12, definitions, the pilot boundary and the evaluation targets are retained, example parameter
values were replaced with placeholders, and Microsoft Learn prerequisites reviewed on November 20,
2026 were added.

## Package Notes and Prerequisites

- **Environment selection.** The skills tell users to change the environment with
  `list environments` or `Set environment to [environment name]`. Current Microsoft Learn guidance
  for the Service plugin selects the environment through the plugin's Settings in Cowork, and an
  administrator may configure a default. Use that route where the phrase is not honoured; the
  skills never change the environment either way.
- **MCP configuration.** Microsoft Learn asks administrators to confirm that the Service app is
  assigned and that the required Customer Service MCP configuration is in place. The author's
  runbook enables the Dataverse MCP server on the environment. Record the configuration the tenant
  uses during [Cowork D365 Plugin Enablement](../../../02-patterns/Cowork-D365-Sales-Service-Plugin-Enablement/Cowork-D365-Sales-Service-Plugin-Enablement.md).
- **Related scenarios.** The
  [Insights Analyst D365 Service Cowork Agent](../../Insights-Analyst-D365-Service-Cowork-Agent/1.Overview.md)
  hands weekly-brief, escalation, queue hygiene, knowledge-gap and deck requests to these skills.
  The [Chief of Staff Cowork Agent](../../Chief-of-Staff-Cowork-Agent/1.Overview.md) is a
  different five-skill package over Microsoft 365 sources. No declared skill names are shared with
  it, with the Case Specialist or Service Ops Leader archives or with the Insights Analyst
  archives, but intents overlap. Qualify routing with
  [Persona Skill Routing and Scope Isolation](../../../02-patterns/Persona-Skill-Routing-and-Scope-Isolation/Persona-Skill-Routing-and-Scope-Isolation.md)
  before enabling overlapping packs for the same users.
- **Test identifiers.** CS-01 to CS-12 are this package's original test IDs. They are unrelated to
  the CS-001 series in the Case Specialist scenario.
- **Developer details.** The manifest names "Productivity Squad" as developer, with microsoft.com
  website, privacy and terms URLs. Have the package owner replace them with approved organisation
  values in a working copy before organisational distribution. The published ZIP is unchanged.
- **Licence metadata.** Each `SKILL.md` declares `license: Proprietary` in its frontmatter. The
  repository [LICENSE](../../../LICENSE) governs content published here; align the field in any
  working copy prepared for distribution.
- **Manifest version.** The manifest uses `devPreview`. Switch `manifestVersion` and `$schema` to
  1.28 or 1.29 in a working copy only if the upload channel requires it, then retest.
- **Data access.** The ZIPs do not enable the Service plugin, its MCP configuration or the tenant
  Dataverse setting, do not grant Dynamics 365 roles and do not provision schedules. Qualify these
  with the plugin enablement pattern and the [runbook](../3.Runbook.md).
- **Candidate expansions.** The package README names `case-signal-watch` and `incident-comms` as
  future candidates. They are not included in either archive.

## Choosing and Using a Package

1. Select one installation route per user under tenant policy; avoid installing both archives and
   creating duplicate skill names.
2. **Plugin:** keep the root layout (`manifest.json`, icons and the expanded `skills/` folders).
   Upload the complete ZIP; do not add an outer folder or nest ZIPs.
3. **Skills-only:** extract the bundle and use the seven skill folders inside
   `Chief-of-staff-d365-service/`, not the wrapper. Each skill needs `SKILL.md` directly under its
   folder with its `references/` folder alongside. Use this route for author testing only.
4. Start a new Cowork session, confirm discovery and routing, and run the
   [acceptance tests](../3.Runbook.md) before enabling the Monday schedule.

The plugin packages the skills through its app manifest. Neither archive supplies a separately
hosted agent runtime, grants source access, commits record updates, publishes articles or
provisions schedules.

## Assets Required for Delivery

| Asset to obtain or produce | Purpose |
|---|---|
| Approved selection of the plugin or skills-only archive | Record the chosen version, configuration changes and tenant approval |
| Signed pilot boundary | Users, environment, queues, key accounts, SLA definitions, thresholds, batch cap, permitted fields and rules |
| Cowork D365 Plugin Enablement evidence for the Customer Service module | Plugin availability, MCP configuration, tenant setting, write posture and PLG results |
| Approved environment display name and selection route per user | Environment rule in every output header |
| Monday prompt text and schedule owner | Scheduled preparation, change control and rollback |
| Knowledge review route | Owner and process for reviewing article outlines |
| Low-privilege test user and approved test cases | CS-05, CS-06 and CS-09 |
| Baseline measurements | Value measurement at 30 and 60 days |

## Validation Status

Archive integrity, file inventory, manifest metadata, declared skill names and versions and the
cross-archive identity of the skill files were inspected locally on November 20, 2026.
[Author testing: add the date, environment type and the CS test IDs executed with their results,
or delete this sentence.] Upload compatibility in other tenants, data access and live-tenant
acceptance have not been validated.

See the [overview](../1.Overview.md), [runbook](../3.Runbook.md) and
[plugin enablement pattern](../../../02-patterns/Cowork-D365-Sales-Service-Plugin-Enablement/Cowork-D365-Sales-Service-Plugin-Enablement.md).
