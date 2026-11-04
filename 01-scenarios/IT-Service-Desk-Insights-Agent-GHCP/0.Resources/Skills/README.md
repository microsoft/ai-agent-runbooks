# Agent-Scoped Skill Definitions - GHCP

This folder contains **eight core ServiceNow skill definitions** and **four optional
Dynamics Customer Service skill definitions**, one for each capability in the
[component matrix](../Capability-matrix.md), listed below in matrix order.
Each definition is stored as `<capability-name>/SKILL.md`; its YAML `name` matches the
folder and matrix capability ID exactly.

These files are intended for the single [IT Service Desk Insights Agent (GHCP)](../../1.Overview.md) on the GitHub Copilot
harness inside Copilot Studio. They are not installed automatically and are not an
organization-wide skill deployment.

**Runtime focus:** the skill instructions assume that their tools and connections are
configured. Connector operation IDs, permissions, and deployment prerequisites belong
in the [matrix](../Capability-matrix.md) and runbook, not in every skill. Each skill lists
only the tools it uses, the information it needs, and how to execute and report the task.

## ServiceNow

| Skill definition | Purpose |
|---|---|
| [sn-knowledge-read](sn-knowledge-read/SKILL.md) | Search/read permitted knowledge articles |
| [sn-catalog-read](sn-catalog-read/SKILL.md) | Browse permitted catalog items without ordering |
| [sn-incident-read](sn-incident-read/SKILL.md) | Read a bounded set of the impersonated ServiceNow user's own incidents |
| [sn-incident-create](sn-incident-create/SKILL.md) | Create a summary-only native incident, or use a validated custom create-only implementation for complete evidence |
| [sn-incident-update](sn-incident-update/SKILL.md) | Change only allowlisted descriptive fields |
| [sn-incident-note](sn-incident-note/SKILL.md) | Append an authorized internal work note |
| [sn-incident-attach](sn-incident-attach/SKILL.md) | Upload approved, sanitized evidence to an existing incident |
| [sn-incident-close](sn-incident-close/SKILL.md) | Close only the user's own eligible incident on request |

## Optional Dynamics 365 Customer Service Extension

Import these only when a downstream support team manages escalated cases in Dynamics.
They are not dependencies of the ServiceNow knowledge, incident, or requester-close flow.

| Skill definition | Purpose |
|---|---|
| [d365-case-read](d365-case-read/SKILL.md) | Read authorized cases and check for duplicates |
| [d365-case-create](d365-case-create/SKILL.md) | Create an evidence-rich case without routing or reciprocal writes |
| [d365-case-update](d365-case-update/SKILL.md) | Update descriptive fields only, without upsert |
| [d365-case-close](d365-case-close/SKILL.md) | Close only the user's own eligible case on request |

## Shared User Context

The agent exposes `GetMyProfile` through Office 365 Users **Get my profile (V2)**
(`MyProfile_V2`). This is a shared read-only tool, not another action skill.

- Load the current user's profile once when details are needed, then reuse it across
  skills in that conversation. Do not refetch on every skill activation or record-status check.
- Request only `id,displayName,mail,userPrincipalName,preferredLanguage`. Use returned
  details to prefill supported fields and avoid repeating intake questions.
- Honor explicit language preference first, then message language, using
  `preferredLanguage` only as a fallback. Keep missing values missing; ask if the language
  remains unclear. A profile language or office location is not a timezone.
- Keep the profile within the current user's conversation and refresh after a user/
  connection change or explicit refresh request. Do not cache authorization decisions.
- On failure, explain which details are missing. Stop only the operations that need
  them; do not invent identity mappings or search for someone else's profile.

The action runs as the user of its connection, so the runbook binds it to the end user,
not the maker. The backend still decides record access and requester relationships;
returned profile fields alone do not prove either.

## Definition Contents

Each standalone `SKILL.md` includes:

- YAML name and activation description.
- Scope and excluded operations.
- The exact action/read tools used by the procedure and shared `GetMyProfile` tool.
- Inputs, step-by-step procedure, expected results, and explicit failure behavior.
- Relevant requester/record authorization, confirmation, and retry boundaries.

There are no bundled scripts, credentials, connector definitions, or workflow exports.
The matrix maps tool names to connector/API implementations and required capabilities.
The delivery team provisions those mappings and controls; skills do not perform setup
or invoke native APIs as alternative paths.

## Import One Capability at a Time

1. Select the approved ON/OFF profile and complete the capability cards from the matrix.
   Provision the required environment, shared user-profile tool, and product connections.
2. Implement/configure the named tools, fixed schemas, source permissions, and workflow
   policies. Resolve the actual operation IDs, field allowlists, ServiceNow impersonation
   and own-record ACLs, other-product requester mappings, and operation budgets in deployment
   configuration, not in chat.
3. Prepare required read dependencies before write capabilities. The
   source-incident read dependency of `d365-case-create` is conditional on using a
   ServiceNow reference; case creation does not require ServiceNow write permission.
4. In the target agent, select **Build > Skills > Add skill > Upload a skill** and upload
   the chosen capability's `SKILL.md`. Its YAML name, not the common filename, identifies
   the capability. Import only the skills selected for this agent.
5. Expose only its approved tools/actions and enable the backend policy together with
   the profile change. Importing instructions alone neither creates tools nor grants access.
6. Run the relevant cases in [Sample prompts](../../4.Sample-prompts.md), including OFF,
   denied, failed, and uncertain outcomes. Confirm behavior before publishing the profile.

To disable a capability, revoke its execution authorization, remove/disable the relevant
tools, and remove its skill association. Keep shared connections and dependencies needed
by remaining capabilities. Recheck existing sessions; removing instructions alone is not
a permission boundary.

## Non-Negotiable Boundaries

- Backend teams own all routing/assignment. No definition creates a routing capability,
  including as part of case creation.
- Requester-close skills require an explicit request for the individual's own record and
  a supported backend transition. General updates can remain OFF. A reported fix
  does not close records, and closure never cascades to a linked record.
- No device telemetry or remote diagnostic/remediation tools are included. Use knowledge
  and authorized record evidence; distinguish user-reported findings from verified facts.
- Accepted backend work is not completion, and disabling a tool does not cancel an
  already accepted operation.
- ERP, GitHub engineering support, record deletion, catalog ordering, unrestricted APIs,
  and attempts to bypass an OFF capability remain outside scope.

References: [Import existing skills into Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/skills-add-existing)
and [Office 365 Users](https://learn.microsoft.com/en-us/connectors/office365users/).
