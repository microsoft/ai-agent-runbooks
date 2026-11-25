# Cowork D365 Plugin Enablement - Runbook

**Audience:** delivery engineer, Microsoft 365/Copilot administrator, Power Platform administrator,
Dynamics 365 administrator, Sales and Service business sponsors, security/compliance owner.  
**Approach:** confirm the core gate and scope, enable the shared foundation once, enable each
plugin module in scope, prove permissions, policies and approval-gated writes, test, hand over.  
**Duration:** not fixed. Plan from the customer's approval lead times (Works Council, data
protection, security roles), not from a template.

Read the [Cowork D365 Plugin Enablement pattern](Cowork-D365-Sales-Service-Plugin-Enablement.md) first. Apply
this procedure after [Cowork Enablement](../Cowork-Enablement/Cowork-Enablement-Runbook.md) and
before the Dynamics 365 scenario runbooks; plugin enablement is not a separate business scenario.

Items are labelled **[Sales]**, **[Service]**, **[Either plugin]** (shared foundation, completed
once if at least one plugin is in scope) or **[Analytics]** (needed only when an Insights Analyst
D365 scenario follows). Skip items whose label is out of scope. The procedure has 13 numbered
steps, and each names its **deliverable**. Portal paths and setting names change; confirm each
against current Microsoft documentation and the customer's tenant, and record any difference.

## 1. Roles and Prerequisites

### Gating prerequisite: core Cowork enablement complete

Do not start until the [Cowork Enablement runbook](../Cowork-Enablement/Cowork-Enablement-Runbook.md)
exit criteria are signed off. These core outcomes are hard dependencies:

| Core outcome | Why this runbook depends on it |
|---|---|
| Cowork enabled and pilot users validated | Plugin toggles live inside Cowork; without working Cowork access nothing here can be tested |
| Microsoft 365 Copilot licences assigned to pilot users | Cowork access is licence-gated; plugin use inherits it |
| Billing method, spending policies and cost management configured | Plugin tool calls meter Copilot Credits under the same policies |
| Agent and plugin governance surface reviewed | Plugin availability decisions here extend that review |
| Purview audit capture confirmed | Plugin interactions are audited under the same Copilot activities |
| Support and escalation model assigned | Plugin issues route through the same support path |

Record the core runbook completion date and sign-off owner before proceeding.

### Plugin prerequisites

| Requirement | Owner | Evidence |
|---|---|---|
| Plugin scope decided: Sales only, Service only, or both | Business sponsor | Scope statement |
| [Either plugin] Dataverse integration setting enabled and scoped to the pilot group | M365/Copilot admin | Admin center setting evidence |
| [Sales] Dynamics 365 Sales Enterprise or Sales Premium licences for pilot users | Licensing owner | Licence assignment export |
| [Sales] Sales app installed; Sales plugin and Dynamics 365 Sales MCP component not blocked under Agents > Tools; "Copilot Cowork, Copilot Code, and Microsoft Scout" enabled in the Sales agent administrator settings | M365/Copilot admin, Dynamics 365 admin | Admin center and Sales settings evidence |
| [Sales] Target Sales environment named and approved (production or sandbox); exact display name recorded | Dynamics 365 admin / business sponsor | Boundary statement |
| [Service] Dynamics 365 Customer Service licences for pilot users | Licensing owner | Licence assignment export |
| [Service] Service app installed and assigned to pilot users or an effective Microsoft Entra group; required Customer Service MCP configuration in place | M365/Copilot admin, Dynamics 365 admin | Admin center and environment evidence |
| [Service] Target Customer Service environment named and approved; exact display name recorded | Dynamics 365 admin / business sponsor | Boundary statement |
| [Analytics] Audit or change tracking enabled on the fields the scenario needs, and pilot roles can read audit history | Dynamics 365 admin | Environment audit settings evidence |
| [Analytics] [Service] SLA calendar confirmed on the environment | Dynamics 365 admin | Settings evidence |

### Required licences

- Microsoft 365 Copilot licence per pilot user (validated in the core runbook).
- [Sales] Dynamics 365 Sales Enterprise or Sales Premium licence per pilot user for the target
  environment.
- [Service] Dynamics 365 Customer Service licence per pilot user for the target environment.
- [Either plugin] Validate the current Dataverse MCP billing terms for the customer's licence mix
  before estimating scenario costs (see [Source Basis and Interpretation](#source-basis-and-interpretation)).

### Required administrative roles

| Task | Role |
|---|---|
| [Either plugin] Enable or verify the Dataverse integration setting; manage plugin availability (Agents > Tools); upload scenario plugin packages | Tenant administrator or Copilot administrator |
| [Either plugin] Enable the Dataverse MCP server and MCP client records per environment; audit settings | Power Platform administrator |
| [Either plugin] Review or adjust Dynamics 365 security roles for pilot users | Dynamics 365 system administrator |

### Customer readiness checklist

| Item | Confirmed | Notes |
|---|---|---|
| Core Cowork Enablement exit criteria signed off | [ ] | |
| Plugin scope decided: Sales only, Service only, or both | [ ] | |
| Scenarios in scope identified (see the pattern's scenario table) | [ ] | |
| [Sales] Target Sales environment named; display name recorded | [ ] | |
| [Sales] Sales security-role hygiene reviewed for pilot users | [ ] | |
| [Sales] Record-write approval posture accepted by the sales business owner | [ ] | |
| [Service] Target Customer Service environment named; display name recorded | [ ] | |
| [Service] Service security-role hygiene reviewed for pilot users | [ ] | |
| [Service] Record-write approval posture accepted by the service business owner | [ ] | |
| [Analytics] Audit history confirmed readable; [Service] SLA calendar confirmed | [ ] | |
| [Either plugin] Works Council or data protection sign-off for the Dataverse integration obtained where required | [ ] | |
| [Either plugin] Purview Information Barriers status checked (they block skill and plugin uploads) | [ ] | |
| [Either plugin] Pilot users use Cowork on desktop or web (custom skills and plugins are not available on mobile) | [ ] | |

### Security and governance prerequisites

- [Sales] Confirm which Sales data classes and tables are in scope and excluded, and which record
  writes (for example opportunity next step, close date, activity creation) are permitted during
  the pilot.
- [Service] Confirm which Customer Service data classes and tables are in scope and excluded, and
  which record writes (for example case priority, follow-up date, queue; never close, resolve or
  reassign) are permitted during the pilot.
- [Either plugin] Confirm that plugin outputs remain subject to the core approval posture:
  proposed record updates, drafted emails and other actions surface in Cowork's approval dialog
  before commit. Pilot users do not select **Always allow** or **Approve & don't ask again** for
  Dataverse updates or sends.
- [Either plugin] Carry the people-safety rule into every scenario: outputs report records (deals,
  cases, queues, accounts), never rankings or ratings of individual sellers or agents.

### Dependencies and known limitations

| Area | Note |
|---|---|
| Dataverse integration | If the tenant setting is disabled, users see the plugin as disabled by the organisation's administrator; in some EU tenants with Works Council requirements it is disabled by default |
| Plugin presence | Product pages describe the Sales and Service apps as installed for eligible users or managed by an administrator; Cowork admin pages describe plugins an administrator can deploy. Record what the tenant shows (Step 4) rather than assuming either |
| Environment selection | Sales: chosen in chat on the first sales prompt and remembered; changed with `list environments` or `Set environment to [name]`. Service: selected in the Service plugin's Settings in Cowork, and an administrator may configure a default. No documented administrator override of a user's remembered Sales selection exists |
| Dynamics 365 permissions | Cowork inherits the user's Dynamics 365 security roles; over-broad roles surface data more readily through natural language |
| Record history | Period-over-period analytics need audit or change tracking on the relevant fields; without it, scenario reports are single-period snapshots |
| Data quality | Thin or stale CRM and case data reduces plugin output quality and pilot credibility |
| Environment mismatch | Connecting a sandbox instead of production (or the reverse) invalidates test results or risks unintended production writes; scenario skills report the environment and stop on a mismatch |
| Managed Environments | Managing the Dataverse MCP server through advanced connector policies requires a Managed Environment |
| Information Barriers | Not supported for plugin or skill management and sharing; in tenants that use them, embedded knowledge file uploads are blocked, which prevents affected plugins and skills from being uploaded or published |
| Scoping | Country or region-based scoping is not supported for plugin availability; use security groups for geographic or organisational segments |
| Mobile | Custom skills and plugins are not available in Cowork on mobile |
| Scheduled prompts | Up to 25 per user; they run under the owner's identity, permissions and selected environment and are managed from **Automations** |
| Custom skills | Up to 50 per user; up to 20 skills per plugin package |

---

## 2. Scope Selection and Discovery

### Step 1 - Confirm plugin scope and boundaries

Record the plugin scope and the scenarios that will follow, then answer:

| Question | Answer |
|---|---|
| Which plugins are in scope: Sales, Customer Service, or both? | |
| Which scenarios follow: Chief of Staff D365, Insights Analyst D365, or both, per plugin? | |
| [Sales] Which Sales environment is in scope (exact display name), and which Sales record writes are allowed? | |
| [Service] Which Customer Service environment is in scope (exact display name), and which Service record writes are allowed? | |
| Which pilot users are in scope per plugin, and which security group represents them? | |
| Who owns plugin support after enablement? | |

**Deliverable:** plugin scope and boundary statement.

### Step 2 - Validate plugin requirements

| Requirement | Confirmed | Notes |
|---|---|---|
| Core runbook exit criteria complete | | |
| [Sales] Sales scenarios, licences, prerequisites and target environment confirmed | | |
| [Service] Service scenarios, licences, prerequisites and target environment confirmed | | |
| [Either plugin] Dataverse integration approved | | |
| [Analytics] Audit history and (Service) SLA calendar confirmed | | |

**Deliverable:** requirements validation record.

### Step 3 - Document plugin risks

| Risk | Impact | Mitigation | Owner | Status |
|---|---|---|---|---|
| Thin or stale Dynamics 365 data undermines scenarios | Poor output quality and lost pilot credibility | Data-quality spot check before selecting scenarios | Dynamics 365 admin / business owner | |
| Broad Dynamics 365 security roles | Oversharing through natural-language access | Role hygiene review before enablement (Step 7) | Security owner / Dynamics 365 admin | |
| Wrong environment selected (sandbox or production) | Invalid tests or unintended production writes | Record exact environment names; confirm the selection at connection time and in PLG-007 | Delivery engineer | |
| Audit history missing for analytics fields | Insights Analyst reports degrade to snapshots | Confirm audit settings in Step 2; PLG-008 | Dynamics 365 admin | |
| Works Council or data protection objection (EU) | Dataverse integration blocked; plugins unusable | Engage before any enablement work in Step 4 | Compliance owner | |

**Deliverable:** risk log.

---

## 3. Plugin Enablement

Complete Step 4 once if either plugin is in scope, then Step 5 for Sales, Step 6 for Customer
Service, or both:

| Plugin scope | Complete |
|---|---|
| Sales only | Step 4 + Step 5 |
| Customer Service only | Step 4 + Step 6 |
| Both plugins | Step 4 + Step 5 + Step 6 |

### Step 4 - Shared foundation [Either plugin]

1. In the [Microsoft 365 admin center](https://admin.microsoft.com/), go to **Copilot > Settings**
   and open the Dataverse setting (documented as **Dataverse data available in Microsoft 365
   Copilot**; some tenants label it **Business Applications data in Work IQ available to
   Copilot**). Confirm it is enabled for **All users** or for **Specific groups** that contain the
   pilot users. The integration is enabled by default; if the organisation has disabled it, users
   see the plugin as disabled by the organisation's administrator. In EU tenants with Works
   Council requirements, obtain sign-off before re-enabling it.
2. Record how the Sales and Service plugins are present in the tenant:
   - **Preinstalled:** they appear for pilot users under **Customize** as **Sales** and
     **Service** without administrator action. Skip item 3.1 and continue with item 3.2.
   - **Deployed:** they must be deployed from **Agents > Tools** as in item 3.1.
3. In the Microsoft 365 admin center, scope each in-scope Dynamics 365 plugin. This requires a
   tenant administrator or the **Copilot administrator** role.
   1. **Deploy the plugin (deployed tenants only).** Select **Agents > Tools**, search for
      **Sales** and/or **Service** and open the plugin's details. Select **Installed for**, choose
      **Specific users/groups** and select the pilot security group. Choose **All users** only if
      tenant-wide scope was approved in Step 1. Target users acquire the plugin automatically with
      a "Managed by your organization" label and cannot remove it.
   2. **Set plugin availability.** In **Agents > Tools**, open the plugin and go to the **Users**
      tab. Set availability to match the boundary statement: **Available to specific users or
      groups** (pilot security group, recommended), **Available to all users** (only when
      approved) or **Block** (any Dynamics 365 plugin out of scope).
   3. **Use security groups for segmentation.** Country or region-based scoping is not supported;
      represent segments such as EU pilot users with security groups.
   4. **Note user-side and rollback behaviour.** Users can still enable or disable the plugin for
      their own conversations from **Customize** (or the **Sources & Skills** panel where shown).
      Blocking a plugin takes effect for new conversations only.
   5. **Record evidence** per plugin: plugin name as shown, preinstalled or deployed, target
      security group, **Users** tab availability setting, date and the administrator who made the
      change.
4. Record any tenant-specific configuration differences, such as setting labels and panel names.

**Validation checkpoint:** a pilot user opens **Customize** and sees **Sales** and/or **Service**
(the toggle may still be off and no environment selected yet).

**Deliverable:** shared foundation evidence.

### Step 5 - Dynamics 365 Sales plugin module [Sales]

1. In the [Power Platform admin center](https://admin.powerplatform.microsoft.com), open the
   approved **Sales** environment: **Manage > Environments** > select the environment >
   **Settings > Product > Features**.
2. Locate **Dataverse Model Context Protocol** and make sure **Allow MCP clients to interact with
   Dataverse MCP server** is turned on.
3. Select **Advanced Settings**. If an MCP client record for Cowork or Microsoft Copilot is
   listed, open it, set **Is Enabled** to **Yes** and save; only the Microsoft Copilot Studio
   client is enabled by default. If no such record exists, record that no additional client
   enablement was required.
4. [Analytics] Confirm audit is enabled on opportunity stage, estimated value, estimated close
   date, forecast category and owner, and that pilot roles include audit-history read.
5. Confirm pilot users hold a Dynamics 365 Sales Enterprise or Sales Premium licence for this
   environment.
6. Record the approved Sales environment's exact display name in the boundary statement; users
   pass this value to `Set environment to [name]`.
7. Confirm the Sales prerequisites listed on Microsoft Learn: the Sales app is installed and
   available, the Sales plugin and the Dynamics 365 Sales MCP component are not blocked under
   **Agents > Tools**, and **Copilot Cowork, Copilot Code, and Microsoft Scout** is enabled in the
   Sales agent administrator settings.

**Validation checkpoint [Sales]:** a pilot user opens Cowork, selects **Customize** and turns on
**Sales**, then enters a read-only prompt such as "List my open opportunities closing this
quarter". On first use Cowork asks for the Dynamics 365 environment; the user selects the approved
one and confirms it with `list environments`. Results are correct and permission-trimmed, with no
proposed writes.

**Deliverable [Sales]:** Sales plugin enablement evidence for the approved environment.

### Step 6 - Dynamics 365 Customer Service plugin module [Service]

1. In the [Power Platform admin center](https://admin.powerplatform.microsoft.com), open the
   approved **Customer Service** environment: **Manage > Environments** > select the environment >
   **Settings > Product > Features**.
2. Locate **Dataverse Model Context Protocol** and make sure **Allow MCP clients to interact with
   Dataverse MCP server** is turned on.
3. Select **Advanced Settings**. If an MCP client record for Cowork or Microsoft Copilot is
   listed, open it, set **Is Enabled** to **Yes** and save. If none exists, record that no
   additional client enablement was required.
4. [Analytics] Confirm audit is enabled on case status, priority, queue, owner and SLA KPI
   instances; confirm the SLA calendar; confirm pilot roles include audit-history read.
5. Confirm pilot users hold a Dynamics 365 Customer Service licence for this environment.
6. Where several environments exist, configure the **default environment** for the Customer
   Service plugin where the tenant exposes that setting, so pilot users do not land on a sandbox.
   Record the approved environment's exact display name either way.
7. Confirm the Service prerequisites listed on Microsoft Learn: the Service app is installed and
   assigned to the pilot users or an effective Microsoft Entra group, and the Customer Service MCP
   configuration the plugin requires is in place. Record which MCP configuration the tenant uses.

**Validation checkpoint [Service]:** a pilot user opens Cowork, selects **Customize** and turns on
**Service**, then selects or confirms the approved environment in the Service plugin's
**Settings** (or accepts the administrator default) and enters a read-only prompt such as
"Summarize my open cases". Results are correct and permission-trimmed, with no proposed writes.

**Deliverable [Service]:** Customer Service plugin enablement evidence for the approved
environment.

### Step 7 - Validate permissions and security trimming

1. For each plugin in scope, confirm that Dynamics 365 security roles for pilot users follow least
   privilege for the in-scope tables.
2. Validate security trimming with one deliberately low-privilege test user per enabled plugin.

| Check | Expected | Result |
|---|---|---|
| [Sales] Sales roles | Pilot users' roles limited to in-scope tables and records | |
| [Sales] Security trimming | Low-privilege test user cannot retrieve out-of-scope Sales data through Cowork | |
| [Service] Customer Service roles | Pilot users' roles limited to in-scope queues and cases | |
| [Service] Security trimming | Low-privilege test user cannot retrieve out-of-scope Service data through Cowork | |
| [Analytics] Audit read | Pilot roles can read record history; the low-privilege user cannot read history for out-of-scope records | |

**Deliverable:** permissions validation record.

### Step 8 - Confirm plugin policies

| Policy | Decision |
|---|---|
| [Sales] Sales plugin availability | Scoped to the pilot group or tenant-wide, per the Agents > Tools decision |
| [Sales] Sales record writes | Which proposed updates are allowed (Chief of Staff default: next step and close date); approval posture confirmed for all writes |
| [Sales] Sales environment selection | Approved environment display name; production or sandbox policy; users select in chat and confirm with `list environments` |
| [Service] Customer Service plugin availability | Scoped to the pilot group or tenant-wide, per the Agents > Tools decision |
| [Service] Service record writes | Which proposed updates are allowed (Chief of Staff default: priority, follow-up by and queue; never close, resolve or reassign); approval posture confirmed |
| [Service] Service environment selection | Approved environment display name, selection route and administrator default where available; production or sandbox policy |
| [Either plugin] Approval dialog posture | Per-action approval during the pilot; no **Always allow** or **Approve & don't ask again** for Dataverse updates, sends or Insights Analyst report-archive filing |
| [Either plugin] People safety | No per-seller or per-agent rankings or ratings in any scenario output |

**Deliverable:** plugin policy record.

### Step 9 - Plugin billing considerations

The core runbook's billing method, spending policies and cost management govern plugin use without
change. In addition:

1. [Either plugin] Plugin tool calls meter Copilot Credits like other tool actions. Multi-record
   scenarios (pipeline sweeps, queue triage, analytics aggregations) run at higher intensity than
   single-record lookups.
2. [Analytics] Scheduled prompts meter under the schedule owner; daily anomaly schedules are the
   highest-volume items in the scenario packages. Bound scope by threshold, horizon or queue.
3. [Either plugin] Validate the current Dataverse MCP billing terms for the customer's licence mix
   before estimating scenario costs.
4. Add rows for "[Sales] Chief of Staff D365", "[Sales] Insights Analyst D365 schedules",
   "[Service] Chief of Staff D365" and "[Service] Insights Analyst D365 schedules" to the credit
   estimation worksheet in Step 18 of the
   [Cowork Enablement runbook](../Cowork-Enablement/Cowork-Enablement-Runbook.md).

**Deliverable:** updated credit estimation worksheet.

---

## 4. Validation and Functional Testing

### Step 10 - Run the plugin verification checklist

| Check | Pass condition |
|---|---|
| [Sales] Sales plugin visible and toggleable | Pilot user can turn on **Sales** under Customize |
| [Sales] Sales environment selection works | Pilot user is prompted on first use, selects the approved environment, and `list environments` confirms it |
| [Service] Service plugin visible and toggleable | Pilot user can turn on **Service** under Customize |
| [Service] Service environment selection works | Pilot user selects or confirms the approved environment in the plugin's Settings, or the administrator default applies |
| [Either plugin] Plugin blocked state correct | An out-of-scope user sees the plugin disabled or absent as configured |

**Deliverable:** verification checklist results.

### Step 11 - Execute plugin functional tests

Run PLG-001 to PLG-003 when the Sales plugin is in scope, PLG-004 and PLG-005 when the Customer
Service plugin is in scope, PLG-006 and PLG-007 whenever at least one plugin is enabled, and
PLG-008 when an Insights Analyst D365 scenario follows. The prompts and expected results are in
[Functional Tests and Prompts](#functional-tests-and-prompts). Use approved test records only.

**Deliverable:** functional test results with evidence, including the side-panel Skills chips for
PLG-002 and PLG-004.

### Step 12 - Confirm plugin success criteria

| Criterion | Target | Actual | Met |
|---|---|---|---|
| [Sales] Sales plugin connectivity and environment confirmed | 100% of pilot users in Sales scope | | |
| [Sales] Sales write-approval behaviour verified | 100% of Sales write tests | | |
| [Service] Service plugin connectivity and environment confirmed | 100% of pilot users in Service scope | | |
| [Service] Service write-approval behaviour verified | 100% of Service write tests | | |
| [Either plugin] Environment switching verified | PLG-007 passed per plugin | | |
| [Analytics] Record history readable | PLG-008 passed per plugin in analytics scope | | |
| Unresolved high-severity security issues | 0 | | |

If any criterion fails, **do not continue to the scenario runbooks**. Remediate and retest.

**Deliverable:** success criteria sign-off.

---

## 5. Operational Handoff

### Step 13 - Assign plugin run-state ownership

| Area | Owner | Notes |
|---|---|---|
| [Either plugin] Dataverse integration setting and group scope | | |
| [Either plugin] Dataverse MCP server settings per environment | | |
| [Either plugin] Cowork plugin availability (Agents > Tools) | | Also governs scenario plugin packages |
| [Either plugin] Approved environment display names and the environment-selection instructions | | Referenced by every scenario runbook |
| [Sales] Sales security-role review for plugin users | | |
| [Service] Service security-role review for plugin users; default environment and MCP configuration | | |
| [Analytics] Audit settings and SLA calendar | | |
| Plugin issue support and escalation | | Routes through the core support model |
| Scenario package ownership | | Per scenario runbook: skill versions, schedules, archive folders |

**Deliverable:** ownership matrix.

---

## Exit Criteria

- [ ] Core Cowork Enablement exit criteria confirmed complete before start
- [ ] Plugin scope recorded (Sales only, Service only, or both) and scenarios identified
- [ ] [Either plugin] Dataverse integration setting enabled and scoped, with Works Council or data protection sign-off where applicable
- [ ] [Either plugin] Plugin presence recorded (preinstalled or deployed) with Users-tab availability evidence
- [ ] [Sales] Dataverse MCP server and any required MCP client record enabled on the approved Sales environment; Sales prerequisites confirmed
- [ ] [Sales] Sales plugin on for pilot users, environment selected and confirmed, licences validated
- [ ] [Sales] Sales record-write posture verified through approval-gated tests
- [ ] [Service] MCP configuration and any required MCP client record enabled on the approved Customer Service environment; Service app assignment confirmed
- [ ] [Service] Service plugin on for pilot users, environment selected and confirmed, licences validated
- [ ] [Service] Service record-write posture verified through approval-gated tests
- [ ] [Either plugin] PLG-007 environment switching passed
- [ ] [Analytics] Audit history confirmed (PLG-008) and SLA calendar confirmed where in scope
- [ ] Plugin run-state ownership assigned and support path confirmed

## Functional Tests and Prompts

These are acceptance-test starters, **not results validated in your tenant**. Run them as pilot
users in a new Cowork session with approved test records only, and do not test destructive actions
in production. Record pass or fail, evidence and reviewer.

| Test ID | Scenario | Prompt | Expected result |
|---|---|---|---|
| PLG-001 | [Sales] Sales read query | "List my open opportunities closing this quarter with links to each record." | Only the user's permitted opportunities are returned, with record links; no writes |
| PLG-002 | [Sales] Sales meeting preparation (built-in skill) | "Help me prepare for my meeting with [approved test account]." | Grounded briefing from the built-in meeting-preparation skill; no record updates proposed |
| PLG-003 | [Sales] Sales write approval | "Update the next step on [approved test opportunity] to 'Send revised proposal'." | The proposed field update surfaces in Cowork's approval dialog before any commit; the user approves per action |
| PLG-004 | [Service] Service case summary (built-in skill) | "Give me a one-screen brief on case [approved test case]." | Accurate grounded summary from permitted data only |
| PLG-005 | [Service] Service response approval | "Draft a reply to the customer on [approved test case]. Do not send until I approve." | Draft appears; sending requires approval in Cowork's dialog |
| PLG-006 | [Either plugin] Boundary test | A user without a Dynamics 365 licence or role attempts a plugin scenario | Clean denial or empty result; no out-of-scope data returned |
| PLG-007 | [Either plugin] Environment switching | List environments, switch to [sandbox], re-run PLG-001 or PLG-004, then switch back | Only accessible environments listed; the switch takes effect; results change accordingly; approved environment restored and confirmed |
| PLG-008 | [Analytics] Record history readable | "Show the close-date change history for [approved test opportunity]" or "Show the status change history for [approved test case]" | Change history returned with dates and old and new values; a low-privilege user is denied for out-of-scope records |

For PLG-007, Sales uses `list environments` and `Set environment to [name]`; for Service, use the
plugin's Settings where the phrases are not honoured.

**Pass rule:** every applicable test passes. A failed approval (PLG-003, PLG-005), trimming
(PLG-006) or environment (PLG-007) test blocks the dependent scenarios. An excluded test needs a
recorded scope decision, not a fabricated pass.

### Test Capture Template

| Test ID | Tester | Date | Result / scope exclusion | Evidence | Reviewer | Retest needed |
|---|---|---|---|---|---|---|
| | | | | | | |

## Evidence Artifacts

Keep customer evidence in the customer's governed workspace, not in this public repository. The
tables in this runbook can be copied there as working templates.

| Artifact | Runbook step | Purpose |
|---|---|---|
| Core enablement sign-off record | Prerequisites | Completion date and owner of the gating prerequisite |
| Plugin scope and boundary statement | 1 | Plugins, scenarios, environments, writes, users and support owner |
| Requirements validation record | 2 | Licences, prerequisites, integration approval, audit and SLA calendar |
| Risk log | 3 | Plugin risks, mitigations and owners |
| Shared foundation evidence | 4 | Tenant setting, plugin presence and availability scope |
| Sales plugin enablement evidence | 5 | MCP settings, prerequisites, licences and environment name |
| Customer Service plugin enablement evidence | 6 | MCP configuration, Service app, licences, default and environment name |
| Permissions validation record | 7 | Least-privilege roles and trimming results |
| Plugin policy record | 8 | Availability, writes, environment selection, approval and people safety |
| Updated credit estimation worksheet | 9 | Dynamics 365 scenario rows in the core estimate |
| Verification checklist results | 10 | Toggle, environment and blocked-state checks |
| Functional test results | 11 | PLG results with evidence and reviewer |
| Success criteria sign-off | 12 | Gate before the scenario runbooks |
| Ownership matrix | 13 | Plugin run-state responsibility |

## Source Basis and Interpretation

Adapted on November 20, 2026 from the user-provided *Dynamics 365 Plugin Enablement Runbook -
Microsoft 365 Copilot Cowork* (version 1.1, October 2026). Microsoft Learn pages for the Sales
plugin, the Customer Service plugin and the Dataverse MCP server were reviewed the same day. The
steps, test IDs and labels are the author's; no live-tenant validation is implied.

- **Scenario names:** the source lists Chief of Staff (Sales) v4.1, Chief of Staff (Customer
  Service) v1.0 and Recurring Analytics (Sales and Customer Service) v1.0 as internal documents.
  Here they are the published Chief of Staff D365 and Insights Analyst D365 scenarios; Recurring
  Analytics was renamed Insights Analyst before publication. The [Analytics] label is unchanged.
- **Core runbook:** the source depends on an internal *Cowork Enablement Runbook*. In this
  repository the [Cowork Enablement](../Cowork-Enablement/Cowork-Enablement.md) pattern fills
  that role, and Step 9 points to its credit estimation worksheet.
- **Tenant setting name:** documented as Dataverse data available in Microsoft 365 Copilot; some
  tenants label it Business Applications data in Work IQ available to Copilot. Record the label
  the tenant shows.
- **Sales prerequisites:** the reviewed Sales page also requires the Sales app, the Sales plugin
  and Dynamics 365 Sales MCP component not blocked under Agents > Tools, the "Copilot Cowork,
  Copilot Code, and Microsoft Scout" toggle in the Sales agent administrator settings and a Sales
  Enterprise or Sales Premium licence. These were added to the prerequisites and Step 5.
- **Service prerequisites and environment:** the reviewed Customer Service page asks
  administrators to confirm the Service app assignment and the required Customer Service MCP
  configuration, and selects the environment through the Service plugin's Settings in Cowork. The
  source enables the Dataverse MCP server and uses `list environments` and `Set environment to`.
  Steps 6 and 10 and PLG-007 accept either route; record the one the tenant uses.
- **Dataverse MCP billing:** the source records that access to Dynamics 365 data was described as
  not separately charged for eligible licence holders. The reviewed Dataverse MCP page states that
  `search_data` uses usage-based Copilot Credit billing and that other tools follow the basic text
  and generative AI rate. Confirm which terms apply to Cowork plugin use and the customer's licence
  mix before estimating costs.
- **Built-in skills:** the reviewed Sales page lists a broader built-in skill set than the three
  skills the source and scenario packages name. Each scenario qualifies overlap in its own tests.

## References

- [Manage plugins for Copilot Cowork](https://learn.microsoft.com/en-us/copilot/cowork/cowork-manage-plugins)
- [Available plugins for Copilot Cowork](https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-available-plugins)
- [Use Copilot Cowork](https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/use-cowork)
- [Customize Copilot Cowork](https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-customize)
- [Use sales skills in Copilot Cowork](https://learn.microsoft.com/en-us/dynamics365/sales/use-copilot-cowork-sales-skills)
- [Use Customer Service skills in Copilot Cowork](https://learn.microsoft.com/en-us/dynamics365/customer-service/use/use-copilot-cowork-service-skills)
- [Overview of Dynamics 365 Customer Service MCP tools](https://learn.microsoft.com/en-us/dynamics365/customer-service/develop/mcp-tools-overview)
- [Dataverse data in Microsoft 365 Copilot (tenant setting)](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/data-platform-intelligence)
- [Configure the Dataverse MCP server](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/data-platform-mcp-disable)
- [Connect to Dataverse with Model Context Protocol (tools and billing)](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/data-platform-mcp)
- [Build plugins for Copilot Cowork](https://learn.microsoft.com/en-us/copilot/cowork/cowork-plugin-development)
