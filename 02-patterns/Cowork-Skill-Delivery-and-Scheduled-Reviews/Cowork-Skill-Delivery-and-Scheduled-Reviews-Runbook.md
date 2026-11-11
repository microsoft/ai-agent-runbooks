# Cowork Skill Delivery and Scheduled Reviews - Runbook

Use this with the [pattern](Cowork-Skill-Delivery-and-Scheduled-Reviews.md) and the selected
scenario's skill-specific acceptance tests.

## 1. Readiness Gate

Use the [Cowork Enablement runbook](../Cowork-Enablement/Cowork-Enablement-Runbook.md) for
shared tenant setup, security, billing and platform test evidence. Reuse accepted evidence
where current; the checklist below adds the workflow's skill and actual source-access gates.

| Check | Evidence and owner |
|---|---|
| Cowork available to pilot users on supported surface | Tenant administrator demonstrates a session |
| Skills/plugins and any data tool approved | Admin records current policy and installation/sharing route |
| Real source retrieval works | Source owner supplies an authorised positive and denied-access test |
| Billing arrangement and supported controls understood | Billing owner records current entitlement, metering, reports and alerts |
| Processing/retention/output handling accepted | Security owner approves source exclusions and artifact destinations |
| Delivery vs ongoing operation assigned | Sponsor identifies package, schedule, source and support owners |

Stop at an unmet gate. Do not install broader dependencies or acquire permissions simply to
make a demonstration pass.

## 2. Define the Workflow Contract

Record intent, target skill, input requirements, source identity/binding, period, output sections,
evidence requirements, missing-input behaviour and never-automate actions. Define the concierge
as route-or-clarify, not an extra report generator.

For people-related workflows, prohibit employee ranking/scoring, sentiment or wellbeing
inference and working-hours/productivity surveillance. For analytics, apply the
[governed data contract](../Governed-Analytics-Review/Governed-Analytics-Review-Runbook.md).
Document approval controls and a manual fallback **action route**, not a fake success response.

**Deliverable:** approved workflow/source/output contract and baseline metrics.

## 3. Inspect and Version the Package

1. Obtain the approved archive or skill folders from a trusted owner. If only documentation is
   available, record installation as blocked; do not report the package as deployed.
2. Inventory declared names/descriptions, router targets and companion references.
3. Inspect instructions, scripts, connectors, requested access and unexpected external
   destinations. Skill text is executable guidance, so source provenance matters.
4. Tune reference rules first. Keep credentials and customer-specific source data out of
   public packages. Record any instruction changes for regression testing.
5. Save an approved version identifier, owner and rollback copy in the governed workspace.

For multi-persona delivery, also complete the
[persona-routing and scope-isolation runbook](../Persona-Skill-Routing-and-Scope-Isolation/Persona-Skill-Routing-and-Scope-Isolation-Runbook.md).
Inspect outer ZIP wrappers and package/skill version differences recorded in each resource guide.
Resolve same-name variants, sibling handoffs and built-in overlap before installing multiple
packs; do not rely on upload order or a persona label to select the implementation or scope.

**Deliverable:** reviewed package/reference inventory, no broken dependencies or unexplained tools.

## 4. Install and Discover

Choose one supported route under the tenant's policy:

| Route | Procedure | Check |
|---|---|---|
| Per-user OneDrive skills | Place each skill under `Documents\Cowork\skills` with root `SKILL.md` and companions | New session discovers the intended declared name |
| Skill upload | Use Customize > Skills and a supported skill file/archive | Upload completes; dependencies and names intact |
| Plugin package | Use Customize > Plugins > Upload plugin, then approved organisational sharing | Conversion/validation completes; recipients receive the intended version |

Use [current Customize instructions](https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-customize)
for exact packaging/UI requirements. Resolve duplicate declared names and stale copies before
testing. Start a new conversation. Inspect the selected skill during execution; a plausible
generic answer is not proof that the custom skill ran.

Sharing a package does not share source permissions. Test the recipient's actual access.
Use Re-share where required for updates and verify recipient-side version behaviour.

## 5. Evaluate On Demand

Run clear intents, ambiguous intents, missing inputs, denied sources, contradictory evidence,
prompt-injection content, restricted audience, and action-without-approval cases.

| Release gate | Minimum criterion |
|---|---|
| Discovery/routing | Every accepted skill discovered and every clear test intent routed correctly |
| Evidence | All sampled material claims traceable; missing sources clearly reported |
| Permissions | Zero unauthorised content disclosed in negative tests |
| Safety | All scenario-specific prohibited requests handled correctly |
| Approval | Zero consequential actions without required preview/approval |
| Output | Required sections/artifact types present; no fabricated successful file creation |
| Recovery | Tool, policy, access and missing-input errors are explicit |

Record expected/observed outputs, reviewer, corrections and retests. Platform skill evaluation
can complement but does not replace these scenario and source-access gates.

## 6. Qualify and Create Recurrence

Agree the following before changing any schedule:

| Field | Required decision |
|---|---|
| Owner | Account responsible for execution, review and lifecycle |
| Prompt/version | Exact accepted task; no hidden scope expansion |
| Source binding | Approved per-run input or supported configured reference |
| Period and timezone | Date boundaries, comparison window and daylight-saving treatment |
| Cadence/first run | Frequency and whether immediate execution is intended |
| Output/reviewer | Draft destination, classification and named reviewer |
| Pause conditions | Access loss, stale data, quality failure, cost/policy block |

If interactive input cannot be supplied securely, retain on-demand operation. If scope
excludes recurrence, do not create it simply because the UI permits it.

After explicit approval, create the schedule and verify its next-run configuration. Test
view/edit/pause/resume/delete, missed run, access loss, source change and duplicate prevention.
Check actual draft output against the on-demand contract; do not infer success from schedule
creation alone. No automatic distribution unless separately scoped and enforceably approved.

## 7. Operate, Update and Roll Back

- Track usage, preparation-plus-review time, quality corrections and policy failures.
- Use official tenant billing reports; `/cost` is only an approximate user-facing signal.
- Review access, schedules and source freshness on an agreed cadence.
- For updates, version references/instructions, rerun targeted tests and re-share as required.
- To roll back, pause owned schedules, restore the approved version, start a new session,
  verify recipients and retest. Remove duplicate schedules or stale copies through supported
  controls; do not delete unrelated user assets.
- For decommissioning, stop schedules, revoke relevant sharing/access and handle generated
  copies under retention policy. Verify rather than assume revocation removes existing copies.

## Handover Checklist

- Approved package/reference/prompt inventory and installation route.
- Accepted audience and source/output boundaries.
- Test evidence, known gaps and release decision.
- Schedule inventory and tested stop/rollback procedures.
- Support, security, data and billing owners.
- Baseline comparison and expansion criteria.

See the [Chief of Staff](../../01-scenarios/Chief-of-Staff-Cowork-Agent/3.Runbook.md) and
[Insights Analyst](../../01-scenarios/Insights-Analyst-Cowork-Agent/3.Runbook.md) runbooks
for function-specific tests and outputs.
