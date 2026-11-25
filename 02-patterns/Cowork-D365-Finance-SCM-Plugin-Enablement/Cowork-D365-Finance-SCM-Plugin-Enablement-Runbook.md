# Cowork D365 Finance and SCM Plugin Enablement - Runbook

**Audience:** delivery engineer, Microsoft 365/Copilot administrator, Power Platform administrator,
finance and operations system administrator, Finance and Supply Chain Management business owners,
security/compliance owner.  
**Approach:** confirm the core gate and module scope, enable the shared foundation once, enable each
module in scope, prove permissions, legal-entity trimming and policies, test, hand over.  
**Duration:** not fixed. Plan from the customer's approval lead times (Works Council, data
protection, security roles and legal-entity assignments), not from a template.

Read the [Cowork D365 Finance and SCM Plugin Enablement pattern](Cowork-D365-Finance-SCM-Plugin-Enablement.md)
first. Apply this procedure after [Cowork Enablement](../Cowork-Enablement/Cowork-Enablement-Runbook.md)
and before the Dynamics 365 ERP scenario runbooks; plugin enablement is not a separate business
scenario.

Finance and Supply Chain Management are served by **one Cowork plugin, the Dynamics 365 ERP apps
plugin, connected to one finance and operations environment**, so the plugin, the MCP server and
the environment connection are enabled once. Items are labelled **[Finance]**, **[SCM]** or
**[Either module]** (shared foundation, completed once if at least one module is in scope). Skip
items whose label is out of scope. The procedure has 13 numbered steps, and each names its
**deliverable**. Portal paths and setting names change; confirm each against current Microsoft
documentation and the customer's tenant, and record any difference.

## 1. Roles and Prerequisites

### Roles

| Role | Responsibility |
|---|---|
| Factory / delivery engineer | Executes this runbook end to end and records evidence |
| Microsoft 365 / Copilot admin | Dataverse integration setting; plugin availability under Agents > Tools |
| Power Platform admin | Confirms the finance and operations environment is linked to a Dataverse environment; assigns the Finance and Operations Basic User role to pilot users |
| Finance and operations system administrator | Confirms version and environment type; enables the Dynamics 365 ERP MCP server feature; maintains Allowed MCP clients; owns user provisioning, security roles, and legal-entity assignments |
| Finance business owner (controller / finance process owner) | Approves Finance scenarios, pilot users, legal entities, and record-write posture |
| Supply chain business owner (procurement / inventory / operations lead) | Approves Supply Chain Management scenarios, pilot users, sites and warehouses, and record-write posture |
| Security / compliance owner | Approves data scope, write posture, segregation-of-duties position, and Works Council / DPO items where applicable |
| Finance and operations developer (only if action tools are in scope) | Owns any custom AI tools exposed through the MCP server; not required for out-of-the-box pilots |

### Gating prerequisite: core Cowork enablement complete

**Do not start this runbook until the [Cowork Enablement runbook](../Cowork-Enablement/Cowork-Enablement-Runbook.md) exit criteria are signed off.** These core outcomes are hard dependencies for every step below:

| Core outcome | Why this runbook depends on it |
|---|---|
| Cowork enabled and pilot users validated | Plugin toggles live inside Cowork; without working Cowork access nothing here can be tested |
| Microsoft 365 Copilot licenses assigned to pilot users | Cowork access is licence-gated; plugin use inherits it |
| Billing method, spending policies, and cost management configured | Plugin tool calls meter Copilot Credits under the same policies; ERP MCP tool execution can carry its own per-call charge |
| Agent and plugin governance surface reviewed | Plugin availability decisions in this runbook extend that review |
| Purview audit capture confirmed | Plugin interactions are audited under the same Copilot activities; finance and operations attributes every MCP action to the signed-in user |
| Support and escalation model assigned | Plugin issues route through the same support path |

Record the Cowork Enablement completion date and sign-off owner before proceeding.

### Plugin prerequisites

| Requirement | Owner | Evidence |
|---|---|---|
| Module scope decided: Finance only, SCM only, or both | Business sponsor(s) | Scope statement |
| [Either module] Dataverse integration setting enabled (allow up to one hour to propagate) | M365/Copilot admin | Admin center setting evidence |
| [Either module] Target finance and operations environment named and approved (production vs. Tier-2 or higher sandbox), with URL and linked Dataverse environment recorded | F&O system administrator / business sponsors | Boundary statement |
| [Either module] Environment version at or above 10.0.47, 10.0.46 PQU-2, or 10.0.45 PQU-7, with quality updates applied | F&O system administrator | Environment details screenshot |
| [Either module] Power Platform integration enabled and environment linked to a Dataverse environment | Power Platform admin / F&O system administrator | Power Platform admin center evidence |
| [Either module] Dynamics 365 ERP Model Context Protocol server feature enabled | F&O system administrator | Feature management screenshot |
| [Either module] Microsoft Cowork client present and allowed in Allowed MCP clients | F&O system administrator | Allowed MCP clients screenshot |
| [Either module] Pilot users provisioned in finance and operations (Microsoft Entra identity, enabled, roles, legal entities) and holding the Finance and Operations Basic User role in the linked Dataverse environment | F&O system administrator / Power Platform admin | User and role export |
| [Either module] Scenario skill packages for Step 11 (Chief of staff_D365 ERP, Insights Analyst_D365 ERP) uploaded in Cowork (Customize > Plugins > Upload plugin) and switched on for pilot users | Delivery engineer | Plugin list screenshot |
| [Finance] Dynamics 365 Finance licenses for pilot users | Licensing owner | License assignment export |
| [Finance] Finance legal entities, scenarios, and record writes approved | Finance business owner | Boundary statement |
| [SCM] Dynamics 365 Supply Chain Management licenses for pilot users | Licensing owner | License assignment export |
| [SCM] SCM legal entities, sites/warehouses, scenarios, and record writes approved | Supply chain business owner | Boundary statement |

### Required licences

- Microsoft 365 Copilot license per pilot user (validated in Cowork Enablement).
- [Finance] Dynamics 365 Finance (or Finance Premium) license per pilot user; a user license for the application is required to access its data and business operations through the plugin.
- [SCM] Dynamics 365 Supply Chain Management (or Supply Chain Management Premium) license per pilot user.
- [Either module] Validate current Dynamics 365 ERP MCP server billing terms: for agent clients other than Copilot Studio, tool execution is stated at 0.1 Copilot Credits per tool call (one credit per 10 tool calls), with Dynamics 365 Finance Premium and Supply Chain Management Premium users exempt from tool-execution billing. Confirm how Cowork is classified against current Microsoft billing documentation before estimating scenario costs.

### Required administrative roles

| Task | Role |
|---|---|
| [Either module] Enable/verify Dataverse integration setting; manage plugin availability (Agents > Tools) | M365 admin with agent management permissions |
| [Either module] Confirm Power Platform integration and Dataverse link; assign the Finance and Operations Basic User role | Power Platform admin (environment admin on the linked environment) |
| [Either module] Verify version and environment type; enable the ERP MCP server feature; maintain Allowed MCP clients | Finance and operations System administrator |
| [Either module] Provision users; review or adjust finance and operations security roles and legal-entity assignments | Finance and operations System administrator / Security administrator |
| [Either module] Review segregation-of-duties rules for pilot roles | Security administrator / compliance owner |

### Customer readiness checklist

| Item | Confirmed | Notes |
|---|---|---|
| Cowork Enablement exit criteria signed off | [ ] | |
| Module scope decided: Finance only, SCM only, or both | [ ] | |
| [Either module] Target finance and operations environment named (URL, type, version, linked Dataverse environment) | [ ] | |
| [Either module] Environment is not a cloud-hosted environment and meets the minimum version | [ ] | |
| [Either module] Legal entities in scope named; out-of-scope legal entities listed | [ ] | |
| [Either module] Approved test records identified (vendors, customers, items, warehouses, journal names, RFQs) | [ ] | |
| [Finance] Finance security-role hygiene reviewed for pilot users (roles, duties, privileges, legal-entity assignment) | [ ] | |
| [Finance] Record-write approval posture accepted by the finance business owner | [ ] | |
| [SCM] SCM security-role hygiene reviewed for pilot users | [ ] | |
| [SCM] Record-write approval posture accepted by the supply chain business owner | [ ] | |
| [Either module] Segregation-of-duties conflicts for pilot roles reviewed | [ ] | |
| [Either module] Works Council / DPO sign-off for Dataverse integration obtained (EU tenants) | [ ] | |

### Security and governance prerequisites

- [Finance] Confirm which Finance data classes, data entities, and pages are in scope and excluded (for example general ledger, accounts payable, accounts receivable, fixed assets, budgeting, cash and bank), which legal entities are in scope, and which record writes (for example creating an unposted vendor invoice journal, updating a customer credit limit) are permitted during the pilot. Posting, settlement, payment generation, and period-close actions should be excluded from the pilot write posture unless explicitly approved.
- [SCM] Confirm which Supply Chain Management data classes, data entities, and pages are in scope and excluded (for example procurement, inventory on-hand, warehouse, production, requests for quotation, order fulfilment), which legal entities, sites, and warehouses are in scope, and which record writes (for example creating a purchase order for an approved test vendor, updating RFQ replies) are permitted. Purchase order confirmation, inventory adjustment and counting journals, warehouse work, and production posting should be excluded unless explicitly approved.
- [Either module] Confirm that plugin outputs remain subject to the approval posture defined in Cowork Enablement: Cowork summarises a proposed write before it executes, and pilot users must review that summary before approving. Because the plugin can create, update, and delete records and invoke application actions under the user's identity, treat least-privilege finance and operations roles — not the Cowork approval card alone — as the primary control.
- [Either module] Confirm that segregation-of-duties rules, posting controls, and workflow approvals configured in finance and operations remain in force; the MCP server does not bypass validations, workflows, or server-side business rules, and rejects what the application client would reject.
- [Either module] Confirm that pilot roles cannot reach system administration pages; the MCP server excludes security configuration, user and role management, Microsoft Entra ID applications, and Feature management pages by design.

### Dependencies and known limitations

| Area | Note |
|---|---|
| Dataverse integration | If the tenant-level setting is disabled, users see the plugin as disabled by the organization's administrator; in some EU tenants with Works Council requirements it is disabled by default. Changes take up to one hour to propagate |
| Dataverse user role | Each plugin user needs at least one Dataverse role in the linked environment (Finance and Operations Basic User). If the role does not exist, the Finance and Operations Virtual Entities package is not present — revisit the Power Platform integration |
| Finance and operations version | The plugin requires version 10.0.45 or later with all quality updates; the MCP server requires 10.0.47, 10.0.46 PQU-2, or 10.0.45 PQU-7. The SQL-based data find tool replaces the OData find tool from 10.0.48 |
| Environment type | In finance and operations the non-production environment type is still called a sandbox, and the tier qualifies it: a sandbox must be Tier-2 (standard acceptance test) or higher. Production and Unified Developer Environments are also supported; the MCP server is not supported on cloud-hosted (Tier-1 developer) environments |
| Static MCP server retirement | The earlier static Dynamics 365 ERP MCP server (13 fixed tools) is retired on 1 October 2026; the Cowork plugin uses the dynamic server. Any customer agents still on the static server must migrate separately |
| Finance and operations permissions | Cowork inherits the user's finance and operations roles, duties, privileges, legal-entity assignments, and data security policies; over-broad roles surface data and actions more readily through natural language |
| Legal entities | Data and actions are per legal entity; prompts should name the company (for example "in USMF"). Users see only legal entities their role assignments cover |
| Write behaviour | The plugin can create, update, and delete records and invoke page actions; finance and operations validations, workflows, and business rules still run |
| Language and formats | The MCP server returns metadata and guidance in US English only; dates, times, and numbers use ISO format regardless of user locale |
| Unsupported controls | Calendar, organization chart, list view, availability view, HTML editor, image, radio button, and time-edit controls, plus custom controls, cannot be operated by the agent |
| Attachments | Document viewer and file-upload controls are not supported through the MCP server |
| Filters | Only the "matches" operator is supported on grids; advanced date operators (before, after, between) are not |
| Form tabs and multistep pages | Tabs are closed by default; page-driven interactions take more tool calls and longer than data lookups |
| Servicing windows | The MCP server is unavailable during environment downtime (for example One Version servicing); plugin requests fail during those windows |
| Excluded pages | Security configuration, user role assignment, segregation-of-duties configuration, temporary and privileged access, Users and User groups, Microsoft Entra ID applications, and Feature management pages are not reachable through the MCP server |
| Data quality | Thin or stale master data and open transactions reduce plugin output quality and pilot credibility |
| Environment mismatch | Connecting a sandbox instead of production (or vice versa) invalidates test results or risks unintended production writes |
| Managed Environments | Managing the Dataverse MCP server through advanced connector policies requires a Managed Environment; the Dynamics 365 ERP MCP server used by this plugin is controlled from the Allowed MCP clients page in finance and operations (Step 4C), and its prerequisites do not include a Managed Environment |
| Regional availability | The plugin is available in regions where Cowork is deployed; confirm availability for the tenant's region |

---

## 2. Scope Selection and Discovery

### Step 1 - Confirm plugin scope and boundaries

1. Record the module scope: Finance only, Supply Chain Management only, or both.
2. Answer the boundary questions:

| Question | Answer |
|---|---|
| Which modules are in scope: Finance, Supply Chain Management, or both? | |
| [Either module] Which finance and operations environment is in scope (name, URL, type, version), and which Dataverse environment is it linked to? | |
| [Either module] Which legal entities are in scope, and which are explicitly excluded? | |
| [Finance] Which Finance areas and record writes are allowed (for example unposted journals only)? | |
| [SCM] Which SCM areas, sites and warehouses, and record writes are allowed (for example unconfirmed purchase orders for approved test vendors only)? | |
| Which pilot users are in scope per module, and which finance and operations roles do they hold today? | |
| Which approved test records will be used for the validation checkpoints? | |
| Who owns plugin support after enablement (Cowork side and finance and operations side)? | |

**Deliverable:** Plugin scope and boundary statement.

### Step 2 - Validate plugin requirements

| Requirement | Confirmed | Notes |
|---|---|---|
| Cowork Enablement exit criteria complete | | |
| [Either module] Environment version, type, Power Platform integration, and Dataverse link confirmed | | |
| [Either module] Dataverse integration approved | | |
| [Finance] Finance scenarios, licenses, legal entities, and roles confirmed | | |
| [SCM] SCM scenarios, licenses, legal entities, and roles confirmed | | |

**Deliverable:** Requirements validation record.

### Step 3 - Document plugin risks

| Risk | Impact | Mitigation | Owner | Status |
|---|---|---|---|---|
| Thin or stale finance and operations data undermines scenarios | Poor output quality and lost pilot credibility | Data-quality spot check of in-scope master data and open transactions before selecting scenarios | F&O admin / business owners | |
| Broad finance and operations security roles (for example System administrator or full-module roles on pilot users) | Oversharing and unintended actions via natural language | Role hygiene review and legal-entity scoping before enablement (Step 7) | Security owner / F&O admin | |
| Write actions executed against live documents | Incorrect journals, purchase orders, or master-data changes | Step 11 scenarios are read-only; posting and confirmation excluded from the write posture; least-privilege roles reviewed in Step 7 | Delivery engineer / business owners | |
| Wrong environment connected (sandbox vs. production) | Invalid tests or unintended production writes | Name the approved environment and URL; validate at connection time from the plugin connector settings | Delivery engineer | |
| Environment below minimum version or on an unsupported type | Plugin lists no environments or fails to connect | Version and type check in Step 4 before any user testing | F&O admin | |
| Microsoft Cowork client missing from Allowed MCP clients | "Unable to connect" after selecting the environment | Verify the Microsoft Cowork client ID in Step 4 | F&O admin | |
| Servicing window during the pilot | Test failures misread as defects | Check the environment's update calendar; schedule tests outside servicing windows | F&O admin | |
| Works Council / DPO objection (EU) | Dataverse integration blocked; plugin unusable | Engage in Step 4 before any enablement work | Compliance owner | |
| Segregation-of-duties conflict introduced by pilot role changes | Audit finding | Run the SoD conflict check after any role change | Security administrator | |

**Deliverable:** Risk log.

---

---

## 3. Plugin Enablement

Complete **Step 4** once if either module is in scope, then **Step 5** for Finance, **Step 6** for Supply Chain Management, or both:

| Module scope | Complete |
|---|---|
| Finance only | Step 4 + Step 5 |
| Supply Chain Management only | Step 4 + Step 6 |
| Both modules | Step 4 + Step 5 + Step 6 |

### Step 4 - Shared foundation [Either module]

**4A. Microsoft 365 tenant**

1. In the [Microsoft 365 admin center](https://admin.microsoft.com/), > Copilot > Settings > View All > Dataverse data available in Microsoft 365 Copilot. Confirm the **Allow users to access Dataverse data in Microsoft Copilot** setting is enabled either for All Users or Specific groups containing the pilot users. This integration is enabled by default, but if the organization has disabled it, users see the plugin as disabled by the organization's administrator. In EU tenants with Works Council requirements, obtain sign-off before re-enabling. Allow up to one hour for the change to propagate.
2. In the Microsoft 365 admin center, review **Agents** > **Tools** and confirm availability for the Dynamics 365 ERP Apps plugin matches the agreed pilot scope (all licensed users or specific groups). Admin-deployed plugins are labeled "Managed by your organization."

**4B. Finance and operations environment readiness**

3. Confirm the approved environment's type (production, Tier-2 or higher sandbox, or Unified Developer Environment — not cloud-hosted) and version (10.0.47, 10.0.46 PQU-2, or 10.0.45 PQU-7 or later, with quality updates) from the environment details page in Lifecycle Services or the [Power Platform admin center](https://admin.powerplatform.microsoft.com). Record the environment URL; the MCP endpoint is `https://<environment-url>/mcp`.
4. Confirm Power Platform integration is enabled and the environment is linked to a Dataverse environment (the linked environment shows the finance and operations URL on its details page in the Power Platform admin center). Record the linked Dataverse environment name.

**4C. Enable the Dynamics 365 ERP MCP server**

5. In the finance and operations client, go to **System administration** > **Workspaces** > **Feature management** and confirm **Dynamics 365 ERP Model Context Protocol server** is enabled (it is enabled by default on supported versions; select **Check for updates** if it is not listed).
6. Go to **System administration** > **Setup** > **Allowed MCP clients**. Confirm the **Microsoft Cowork** client (Client ID `6ab48b67-cd74-4ad4-81af-5932984589be`) is listed with **Allowed** set to Yes; add it if absent. Review the remaining default clients (Microsoft Copilot Studio, Visual Studio Code, Finance Agent) against the customer's policy and disable any not required in this environment.

**4D. User and role mapping**

7. In finance and operations, go to **System administration** > **Users** > **Users** and confirm each pilot user exists, is enabled, is mapped to their Microsoft Entra identity, and holds the intended security roles with legal-entity (organization) assignments (refined in Steps 5 to 7).
8. In the Power Platform admin center, open the **linked Dataverse environment** > **Settings** > **Users** and confirm each pilot user holds the **Finance and Operations Basic User** role. If the role is missing from the environment, the Finance and Operations Virtual Entities package is not installed — resolve through the Power Platform integration before proceeding.
9. Record any tenant-specific configuration differences.

**Validation checkpoint:** A pilot user opens Cowork, selects the **+** button > **Customize**, sees the **Dynamics 365 ERP Apps** plugin, adds it, opens the connector settings (gear icon), and sees the approved environment in the list (not yet connected or queried).

If the checkpoint fails:

| Symptom | Likely cause | Resolution |
|---|---|---|
| Plugin shows "Disabled by your organization's administrator" | Dataverse setting disabled | Enable it in the Microsoft 365 admin center; wait up to one hour |
| Plugin not visible in the catalog | Plugin not made available to the user's group under Agents > Tools, or the plugin package not enabled for the tenant | Check Agents > Tools scoping; escalate to Microsoft support if still absent |
| Plugin available but no environments listed | Environment not provisioned or linked, MCP feature disabled, or user lacks access | Re-check 4B, 4C, and 4D |
| "Unable to connect" after selecting an environment | MCP endpoint unreachable, Microsoft Cowork client not allowed, or Dataverse role missing | Re-check Allowed MCP clients and the Finance and Operations Basic User role |

**Deliverable:** Shared foundation evidence (admin center, environment details, Feature management, Allowed MCP clients, and role screenshots).

### Step 5 - Dynamics 365 Finance module [Finance]

1. Confirm pilot users hold a Dynamics 365 Finance license for the approved environment.
2. With the finance business owner, confirm the Finance scenario list and legal entities for the pilot (for example vendor invoice status and past-due analysis, customer credit limits and balances, general ledger journal enquiry, fixed asset and depreciation profile lookups, budget versus actual enquiry).
3. Confirm pilot users' finance and operations roles follow least privilege for those scenarios (for example Accounts payable clerk, Accounts receivable clerk, Accountant, or purpose-built read-only pilot roles), restricted to the in-scope legal entities. Remove System administrator or other full-access roles from pilot users.
4. Confirm the Finance record-write posture: which documents Cowork may create or update (for example an unposted vendor invoice journal for an approved test vendor) and which actions are excluded (posting, settlement, payment proposals, period close). Confirm that finance and operations workflow and posting controls remain the system of record for approval.
5. Confirm approved Finance test records (test vendor, test customer, test journal name) in the approved legal entity, and record them in the boundary statement.

**Validation checkpoint [Finance]:** A pilot user opens Cowork, selects the **+** button > **Customize**, turns on the **Dynamics 365 ERP Apps** plugin, selects the approved environment from the connector settings (gear icon), completes the one-time sign-in or consent flow, and completes a read-only prompt such as "What is the credit limit and open balance for customer [approved test customer] in [legal entity]? Do not change any records." with correct, permission-trimmed results and no proposed writes.

**Deliverable [Finance]:** Finance module enablement evidence for the approved environment and legal entities.

### Step 6 - Dynamics 365 Supply Chain Management module [SCM]

1. Confirm pilot users hold a Dynamics 365 Supply Chain Management license for the approved environment.
2. With the supply chain business owner, confirm the SCM scenario list, legal entities, sites, and warehouses for the pilot (for example open purchase orders by vendor, on-hand inventory by item and warehouse, RFQ bid evaluation, purchase requisition status, order fulfilment status, production order status).
3. Confirm pilot users' finance and operations roles follow least privilege for those scenarios (for example Purchasing agent, Purchasing manager, Warehouse manager, Materials manager, or purpose-built read-only pilot roles), restricted to the in-scope legal entities. Remove System administrator or other full-access roles from pilot users.
4. Confirm the SCM record-write posture: which documents Cowork may create or update (for example a purchase order for an approved test vendor and item, RFQ reply updates) and which actions are excluded (purchase order confirmation, inventory adjustment and counting journals, warehouse work, production posting).
5. Confirm approved SCM test records (test vendor, test item, test warehouse, test RFQ) in the approved legal entity, and record them in the boundary statement.

**Validation checkpoint [SCM]:** A pilot user opens Cowork, selects the **+** button > **Customize**, turns on the **Dynamics 365 ERP Apps** plugin, selects the approved environment from the connector settings (gear icon), completes the one-time sign-in or consent flow, and completes a read-only prompt such as "Show all open purchase orders for vendor [approved test vendor] in [legal entity] with quantities, delivery dates, and status. Do not change any records." with correct, permission-trimmed results and no proposed writes.

**Deliverable [SCM]:** Supply Chain Management module enablement evidence for the approved environment and legal entities.

### Step 7 - Validate permissions and security trimming

1. For each in-scope module, confirm finance and operations security roles, duties, and privileges for pilot users follow least privilege for the in-scope pages and data entities, and that role assignments are restricted to the in-scope legal entities.
2. Confirm that record-level security and data security policies applied to pilot users in the client also apply through Cowork (the MCP server evaluates every request under the user's identity and does not elevate privilege).
3. Run the segregation-of-duties conflict check after any pilot role change.
4. Validate security trimming with one deliberately low-privilege test user per enabled module, plus one user assigned only to an out-of-scope legal entity.

| Check | Expected | Result |
|---|---|---|
| [Finance] Finance roles | Pilot users' roles limited to in-scope Finance pages, entities, and legal entities | |
| [Finance] Security trimming | Low-privilege test user cannot retrieve out-of-scope Finance data or invoke excluded actions via Cowork | |
| [SCM] SCM roles | Pilot users' roles limited to in-scope SCM pages, entities, legal entities, sites, and warehouses | |
| [SCM] Security trimming | Low-privilege test user cannot retrieve out-of-scope SCM data or invoke excluded actions via Cowork | |
| [Either module] Legal-entity boundary | A user assigned only to legal entity A receives no data or a clear denial for legal entity B | |
| [Either module] Administrative pages | Prompts to open user, role, security, Microsoft Entra ID application, or Feature management pages are refused | |
| [Either module] Segregation of duties | No new SoD conflicts introduced by pilot roles | |

**Deliverable:** Permissions validation record.

### Step 8 - Confirm plugin policies

| Policy | Decision |
|---|---|
| [Either module] Plugin availability | Scoped to pilot group or tenant-wide, per Agents > Tools decision |
| [Either module] Environment selection | Approved environment and URL; production vs. Tier-2 or higher sandbox policy |
| [Either module] Allowed MCP clients | Microsoft Cowork allowed; position on the other default clients (Copilot Studio, Visual Studio Code, Finance Agent) per environment |
| [Either module] Legal-entity scope | In-scope and excluded legal entities per module |
| [Either module] Action tools | Whether any custom AI tools (developer-exposed business logic) are permitted during the pilot (default: none) |
| [Finance] Finance record writes | Which documents may be created or updated; posting and settlement excluded; approval posture confirmed for all writes |
| [SCM] SCM record writes | Which documents may be created or updated; confirmation, inventory adjustments, and production posting excluded; approval posture confirmed for all writes |
| [Either module] Approval dialog posture | Per-action approval during the pilot; no **Always allow** for record writes, emails or Insights Analyst snapshot writes outside the session, because it covers similar actions for the rest of the conversation rather than one destination |
| [Either module] People safety | No ranking, rating or comparison of employees, approvers, buyers, planners or warehouse staff in any scenario output |

**Deliverable:** Plugin policy record.

### Step 9 - Plugin billing considerations

The billing method, spending policies and cost management set up in Cowork Enablement govern plugin use without change. Note additionally:

1. [Either module] Plugin tool calls meter Copilot Credits like other tool actions. Page-driven (form tool) scenarios — opening pages and tabs, setting values, selecting actions — take several tool calls per task and run at higher intensity than single data-entity lookups; multi-document sweeps (past-due invoice reviews, RFQ bid evaluations across vendors) run higher still.
2. [Either module] Validate current Dynamics 365 ERP MCP server tool-execution terms for the customer's license mix (standard vs. Finance Premium / Supply Chain Management Premium) and how Cowork is classified, before estimating scenario costs.
3. [Either module] Coach pilot users to name the legal entity and use application terminology in prompts; this reduces tool calls spent on discovery.
4. Update the credit estimation worksheet in the [Cowork Enablement runbook](../Cowork-Enablement/Cowork-Enablement-Runbook.md) with the rows: "[Finance] Finance scenarios expected?", "[SCM] SCM scenarios expected?", and "[Either module] Share of scenarios that require page interactions or writes?"

**Deliverable:** Updated credit estimation worksheet.

---

## 4. Validation and Functional Testing

### Step 10 - Run the plugin verification checklist

| Check | Pass condition |
|---|---|
| [Either module] Plugin visible and toggleable | Pilot user can add and enable the Dynamics 365 ERP Apps plugin from the Cowork customize surface |
| [Either module] Environment connection works | Pilot user can select the approved environment from the connector settings and complete the one-time sign-in |
| [Either module] Connection persists | Pilot user is not prompted to reconnect in a new conversation |
| [Either module] Scenario skill packages available | Pilot user sees Chief of staff_D365 ERP and Insights Analyst_D365 ERP switched on in the Sources & Skills panel |
| [Finance] Finance read scenario works | Read-only Finance prompt returns correct, permission-trimmed results in the approved legal entity |
| [SCM] SCM read scenario works | Read-only SCM prompt returns correct, permission-trimmed results in the approved legal entity |
| [Either module] Plugin blocked state correct | Out-of-scope user sees the plugin disabled or absent as configured |
| [Either module] Servicing-window behaviour understood | Test plan avoids the environment's servicing windows; failure mode during downtime documented for pilot users |

**Deliverable:** Verification checklist results.

### Step 11 - Execute plugin functional tests

Run PLG-001 to PLG-004 only when the Finance module is in scope, PLG-005 to PLG-008 only when the Supply Chain Management module is in scope, and PLG-009 whenever at least one module is enabled. All prompts are taken from the **Chief of staff_D365 ERP** and **Insights Analyst_D365 ERP** skill packages and are read-only by design; no test creates, updates, approves, or posts anything. Start each package test in a new conversation: on the first prompt the skill asks once for any session input not already given (company / legal entity, environment URL), and later prompts reuse them. Replace [legal entity] with the approved company code; use approved legal entities only. The prompts and expected results are in [Functional Tests and Prompts](#functional-tests-and-prompts).

**Deliverable:** functional test results with evidence.

### Step 12 - Confirm plugin success criteria

| Criterion | Target | Actual | Met |
|---|---|---|---|
| [Either module] Plugin connectivity to the approved environment | 100% pilot users in scope | | |
| [Finance] Finance read scenarios verified | 100% Finance read tests | | |
| [Finance] No record writes proposed or performed during Finance tests | 0 | | |
| [SCM] SCM read scenarios verified | 100% SCM read tests | | |
| [SCM] No record writes proposed or performed during SCM tests | 0 | | |
| [Either module] Boundary test passed | 100% | | |
| No unresolved high-severity security issues | 0 | | |

If any criterion fails, **do not continue to the scenario runbooks**. Remediate and retest.

**Deliverable:** Success criteria sign-off.

---

## 5. Operational Handoff

### Step 13 - Assign plugin run-state ownership

| Area | Owner | Notes |
|---|---|---|
| [Either module] Dynamics 365 ERP MCP server feature state per environment | | Re-verify after every version update |
| [Either module] Allowed MCP clients per environment | | Review whenever a new agent platform is requested |
| [Either module] Finance and Operations Basic User role in the linked Dataverse environment | | Include in the joiner, mover, and leaver process |
| [Either module] Cowork plugin availability (Agents > Tools) | | |
| [Either module] Environment version currency and servicing-window communication | | MCP server is unavailable during servicing; notify pilot users ahead of each window |
| [Either module] Custom AI tools (action tools) governance | | Only if action tools are enabled later |
| [Finance] Finance security-role and legal-entity review for plugin users | | |
| [SCM] SCM security-role and legal-entity review for plugin users | | |
| Plugin issue support and escalation | | Routes through the Cowork Enablement support model; finance and operations issues route to the F&O support owner |

**Deliverable:** Ownership matrix.

## Exit Criteria

- [ ] Cowork Enablement exit criteria confirmed complete before start
- [ ] Module scope recorded: Finance only, SCM only, or both
- [ ] [Either module] Dataverse integration setting enabled (with Works Council / DPO sign-off where applicable)
- [ ] [Either module] Approved environment meets version and type requirements; Power Platform integration and Dataverse link confirmed
- [ ] [Either module] Dynamics 365 ERP MCP server feature enabled and Microsoft Cowork client allowed on the approved environment
- [ ] [Either module] Pilot users provisioned in finance and operations and holding the Finance and Operations Basic User role in the linked Dataverse environment
- [ ] [Either module] Plugin availability scoped, environment connection tested, security trimming and boundary test passed
- [ ] [Finance] Finance licenses validated, roles scoped to legal entities, scenarios tested
- [ ] [Finance] Finance scenarios completed read-only; no record writes proposed or performed
- [ ] [SCM] SCM licenses validated, roles scoped to legal entities, scenarios tested
- [ ] [SCM] SCM scenarios completed read-only; no record writes proposed or performed
- [ ] Plugin run-state ownership assigned and support path confirmed

## Functional Tests and Prompts

**Before running any test below, install the packages these tests depend on:** upload the
**Chief of staff_D365 ERP** and **Insights Analyst_D365 ERP** skill packages in Cowork (Customize >
Plugins > Upload plugin) and switch them on for the pilot users, per the "Scenario skill packages"
prerequisite above and each scenario's own 0.Resources install guide. Confirm both packages appear
switched on in the pilot user's Sources & Skills panel before starting PLG-001.

These are acceptance-test starters, **not results validated in your tenant**. Run them as pilot
users in a new Cowork session with approved legal entities and test records only. Every prompt is
read-only; do not test writes in production. Record pass or fail, evidence and reviewer.

| Test ID | Scenario | Prompt | Expected result |
|---|---|---|---|
| PLG-001 | [Finance] Finance approvals brief (Chief of staff_D365 ERP) | "Run the finance approvals brief for [legal entity]. Show me everything waiting in finance workflow — journals, vendor invoices, expense reports, timesheets and budget register entries — grouped by type, with how long each item has been waiting and its amount, and include the record numbers so I can open them in Dynamics 365. This is read-only: do not approve, reject or change any records." | Skill confirms the legal entity and asks once for the environment URL (first prompt in the conversation), then returns a chat summary and a self-contained HTML brief of workflow items grouped by type with age, amount, and record number as plain text; only items the user can see in the application; one follow-up question (Word, email, or scheduled run); no writes |
| PLG-002 | [Finance] Finance week-ahead brief (Chief of staff_D365 ERP) | "Run the finance week-ahead brief for [legal entity]. Give me a day-by-day view of this week: vendor payments due, customer receipts expected, cash discounts about to expire, journals still to post, depreciation runs and any period-end dates, and flag anything carried over from last week. Do not post, schedule or change any records." | HTML brief with a dated view of the week — payments due, receipts expected, discounts expiring, journals to post, depreciation runs, period-end dates — plus carried-over items, each with its record number as plain text; no writes |
| PLG-003 | [Finance] Weekly AR ageing and collections report (Insights Analyst_D365 ERP) | "Give me the weekly AR ageing and collections report for [legal entity] as of today. Include the ageing buckets, DSO compared with last week where history exists, the top-10 overdue customers by exposure with their account numbers, and any customers over their credit limit or with disputed invoices. Read-only — do not update any customer or invoice records." | HTML report with ageing buckets, DSO, top-10 overdue customers with account numbers, and credit-limit and dispute flags for the confirmed legal entity; a first run reports "trend not yet available" rather than estimating; no writes |
| PLG-004 | [Finance] Monthly P&L and budget variance report for a period (Insights Analyst_D365 ERP) | "Run the monthly P&L, trial balance, and budget vs actual report for [legal entity] for this month. Show revenue, cost of goods sold and margin, the budget-versus-actual variance by main account or cost centre, and the top-5 favourable and unfavourable variances, with month-over-month and year-over-year trend where history exists. Do not post or change any ledger records." | HTML report for the current fiscal period: revenue, COGS and margin, budget-versus-actual variance by account or dimension, and top-5 favourable and unfavourable variances; month-over-month and year-over-year trend shown only where history exists; no writes |
| PLG-005 | [SCM] Procurement decisions brief (Chief of staff_D365 ERP) | "Run the procurement decisions brief for [legal entity]. Show me what is waiting on a purchasing decision — requisitions in review, purchase order change requests, RFQs waiting for an award and quality orders awaiting disposition — with the age, value and record number of each item. Read-only: do not approve, award or change any records." | HTML brief of requisitions in review, purchase order change requests, RFQs awaiting an award, and quality orders awaiting disposition, each with age, value, and record number as plain text; only items the user can see in the application; no writes |
| PLG-006 | [SCM] Supplier brief (Chief of staff_D365 ERP) | "Run the supplier brief for [legal entity]. List the vendors that need attention this week — open purchase orders, late lines, quality issues, invoice mismatches, holds and pending payments — with their vendor account numbers, and tell me which one I should call first and why. Do not change any vendor, purchase order or invoice records." | HTML brief of vendors needing attention with the reasons and vendor account numbers as plain text, ordered by urgency; naming a vendor drills into a one-page call brief; no writes |
| PLG-007 | [SCM] Weekly inventory health report for a period (Insights Analyst_D365 ERP) | "Run the weekly inventory health report for [legal entity] for this week. Give me on-hand value, inventory turns and days of supply by site and warehouse, items below safety stock, any negative or blocked on-hand quantities, and the slow-moving or obsolete items, with item numbers. Read-only — do not adjust inventory or change any records." | HTML report of on-hand value, turns, days of supply, stock-level exceptions (safety stock, negative, blocked), and slow-moving or obsolete items by site or warehouse, with item numbers as plain text; no writes |
| PLG-008 | [SCM] Daily warehouse and fulfilment operations report (Insights Analyst_D365 ERP) | "Run the daily warehouse and fulfilment operations report for [legal entity] for today. Show open warehouse work by type, shipments pending today, backordered delivery lines, transfer orders in transit and any cycle-count variances. If any of this is not available to me, say so rather than estimating. Do not release, ship or change any records." | HTML report of open warehouse work, pending shipments, backorders, transfers in transit, and cycle-count variances for the confirmed legal entity; anything the user cannot access is reported as a source gap, never substituted; no writes |
| PLG-009 | [Either module] Boundary test | A user without a Dynamics 365 Finance or Supply Chain Management license or finance and operations role runs the PLG-001 prompt ("Run the finance approvals brief for [legal entity]…") or the PLG-005 prompt ("Run the procurement decisions brief for [legal entity]…") | Clean denial or a plainly reported source gap; no out-of-scope data returned |

**Pass rule:** every applicable test passes. A failed trimming or boundary test (PLG-009) blocks
the dependent scenarios. An excluded test needs a recorded scope decision, not a fabricated pass.

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
| Plugin scope and boundary statement | 1 | Modules, environment, legal entities, writes, users, test records and support owners |
| Requirements validation record | 2 | Version, environment type, Power Platform link, licences and integration approval |
| Risk log | 3 | Plugin risks, mitigations and owners |
| Shared foundation evidence | 4 | Dataverse setting, Agents > Tools, environment details, Feature management, Allowed MCP clients and role screenshots |
| Finance module enablement evidence | 5 | Licences, scenarios, least-privilege roles, write posture and test records |
| Supply Chain Management module enablement evidence | 6 | Licences, scenarios, sites and warehouses, least-privilege roles, write posture and test records |
| Permissions validation record | 7 | Roles, trimming, legal-entity boundary, administrative pages and segregation of duties |
| Plugin policy record | 8 | Availability, environment, Allowed MCP clients, legal entities, action tools and record writes |
| Updated credit estimation worksheet | 9 | Finance and SCM scenario rows in the core estimate |
| Verification checklist results | 10 | Plugin, connection, packages, read scenarios, blocked state and servicing windows |
| Functional test results | 11 | PLG results with evidence and reviewer |
| Success criteria sign-off | 12 | Gate before the scenario runbooks |
| Ownership matrix | 13 | Plugin run-state responsibility |

## Source Basis and Interpretation

Adapted on November 25, 2026 from the user-provided *Dynamics 365 Finance & Supply Chain Management
Plugin Enablement Runbook - Microsoft 365 Copilot Cowork* (version 1.0). The Microsoft Learn pages
*Use Copilot Cowork with Dynamics 365 ERP* and *Enable the Dynamics 365 ERP apps plugin for Copilot
Cowork* (both last updated October 27, 2026) were reviewed the same day. The steps, test IDs and
labels are the author's; no live-tenant validation is implied.

- **Core runbook:** the source depends on an internal *Cowork Enablement Runbook*. In this
  repository the [Cowork Enablement](../Cowork-Enablement/Cowork-Enablement.md) pattern fills that
  role, and Step 9 points to its credit estimation worksheet.
- **Scenario packages:** the source names the *Chief of staff_D365 ERP* and *Insights
  Analyst_D365 ERP* packages for Step 11. They are published here as the
  [Chief of Staff D365 ERP](../../01-scenarios/Chief-of-Staff-D365-ERP-Cowork-Agent/1.Overview.md)
  and [Insights Analyst D365 ERP](../../01-scenarios/Insights-Analyst-D365-ERP-Cowork-Agent/1.Overview.md)
  scenarios, and both packages are read-only.
- **Connector configuration:** the reviewed pages configure the plugin's **Finance & Operations**
  connector from the **Sources & Skills** panel (Configure, select the environment, sign in). The
  source describes the same step from the plugin's connector settings (gear icon). Record the
  route the tenant shows.
- **Prerequisites confirmed by the reviewed pages:** Microsoft 365 Copilot and Cowork access;
  usage-based billing and Copilot Credits configured for plugin users, because a billing policy can
  hide the plugin or turn Install into Request access; a qualifying finance and operations licence;
  version 10.0.47, 10.0.46 PQU-2 or 10.0.45 PQU-7 or later; Tier 2 or above or a Unified Developer
  Environment; the Dynamics 365 ERP Model Context Protocol server feature; the Cowork client in
  Allowed MCP clients; and the Dataverse setting, with up to one hour to propagate. The pages also
  note that administrators in the EU, EFTA and UK must enable Anthropic models for Cowork users.
- **Linked Dataverse environment and role:** the source requires a linked Dataverse environment
  and the Finance and Operations Basic User role for every plugin user. The reviewed pages do not
  list them; keep them as the author's tested guidance and confirm in the tenant (Step 4D).
- **Approvals:** the reviewed pages state that **Always allow** applies to similar actions for the
  rest of the conversation. The two scenario packages are read-only, and their scheduled emails to
  the user are approved per send.
- **Billing terms:** the source records a per-tool-call charge for the ERP MCP server with
  exemptions for Premium licences. The reviewed pages state that calls can consume Copilot Credits
  under the current MCP licensing rules, with exemptions for qualifying premium licences. Confirm
  the terms for the customer's licence mix before estimating costs.

## References

- [Use Copilot Cowork with Dynamics 365 ERP](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/fin-ops/copilot/use-copilot-cowork-erp)
- [Enable the Dynamics 365 ERP apps plugin for Copilot Cowork](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/copilot/enable-copilot-cowork-erp)
- [Use Model Context Protocol for finance and operations apps](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/copilot/copilot-mcp)
- [Finance and operations MCP security](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/copilot/mcp/mcp-security)
- [Power Platform integration overview](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/power-platform/overview)
- [Enable Power Platform integration](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/power-platform/enable-power-platform-integration)
- [Virtual entities overview](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/power-platform/virtual-entities-overview)
- [Manage plugins for Copilot Cowork](https://learn.microsoft.com/en-us/copilot/cowork/cowork-manage-plugins)
- [Available plugins for Copilot Cowork](https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-available-plugins)
- [Use Copilot Cowork](https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/use-cowork)
- [Build plugins for Copilot Cowork](https://learn.microsoft.com/en-us/copilot/cowork/cowork-plugin-development)
