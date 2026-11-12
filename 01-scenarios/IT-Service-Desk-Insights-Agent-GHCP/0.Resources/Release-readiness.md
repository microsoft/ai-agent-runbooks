[1. Overview](../1.Overview.md) > [2. Architecture](../2.Architecture.md) > [3. Runbook](../3.Runbook.md) > [4. Sample Prompts](../4.Sample-prompts.md) > [5. Packaging Guide](../5.Working-solution.md) > **Release Readiness**

# IT Service Desk Insights Agent with GHCP Harness - Release Readiness

Configuration, known-issue, and acceptance guidance for the
[GHCP runbook](../3.Runbook.md). The repository supplies documentation, twelve instruction-only
skill definitions, proposed tool contracts, and Markdown acceptance cases. It does not supply
an agent project, connector definitions, workflow exports, evaluation JSON, or a solution ZIP.
No tenant deployment, published agent, verified impersonation/ACL configuration, or executed
acceptance result is claimed.

## Current Known Issues and Limitations

| ID | Area | Current behavior / release decision |
|---|---|---|
| K1 | Native incident creation | The [Microsoft ServiceNow connector reference](https://learn.microsoft.com/en-us/connectors/service-now/) documents that **Create Record** ignores the full `description` value because of an underlying ServiceNow REST API limitation. The proposed native profile submits only `short_description` and returns the detailed investigation as a manual handoff. Use a separately validated custom create-only operation when complete evidence must be stored at creation. |
| K2 | Incident search coverage | Configure and record a bounded `ListRecords` query limit; no tool or default limit is supplied here. One page is never proof that every incident was searched. Use focused queries and explicit pagination/offset when broader coverage is required. |
| K3 | Own-ticket enforcement | The intended profile uses ServiceNow invoker authentication: the source impersonates the signed-in user, and incident ACLs restrict both list and direct reads to records where that user is caller/requester. Creation sets `caller_id` server-side from the same identity. These tenant controls require runtime evidence; `GetMyProfile` is context, not authorization. |
| K4 | Tool names in traces | Copilot Studio can show native action/schema names such as **List Records**, **Get Record**, and **Create Record** instead of a custom alias. Skills and acceptance evidence use the native names. |
| K5 | Tool attachment | A connector operation appearing in an export or connector definition does not mean it is attached as an active agent tool. Verify **Build > Tools**, connection binding, and the actual execution trace for each enabled operation. |
| K6 | Knowledge scope | Configure approved ServiceNow KB scope before enabling retrieval. Connection readability alone is not approval to search every accessible knowledge base. Test the permitted and excluded sources before publication. |
| K7 | Packaging readiness | No agent package or importable solution is supplied. After implementation, verify exported components, tool-to-connection associations, target connection mapping, and import behavior using the [packaging guide](../5.Working-solution.md). Successful serialization alone is not release acceptance. |
| K8 | Runtime evidence | The Markdown acceptance cases are proposed tests, not recorded results. Repository validation, a successful skill import, or a tool visible in a connector catalog is not evidence that tenant permissions, persistence, or failure handling work. |

The native `description` limitation applies to **Create Record**. It does not authorize
exposing generic **Update Record**, and it does not prove that a separately constrained
update workflow is safe. Updates, notes, attachments, and closure remain independent
capabilities with their own authorization and tests.

## Release Gates

Keep actual tenant IDs, connection names, users, records, and results in an access-controlled
deployment record. Never put credentials or production incident contents in Git.

| Gate | Owner | Required evidence / exit criterion |
|---|---|---|
| G1 | Power Platform admin and delivery owner | Correct Copilot Studio environment and GitHub Copilot harness, approved model/capacity, authenticated pilot channel, DLP/network policy, and support owner |
| G2 | ServiceNow knowledge owner and admin | Approved KB scope, citation behavior, permitted/denied/revoked-user tests, and documented synchronization/freshness expectations |
| G3 | ServiceNow identity owner | Two-user proof that the connector impersonates each signed-in user; list and direct `sys_id` reads expose only that user's caller/requester incidents; creation sets caller server-side; `GetMyProfile` is not treated as authorization |
| G4 | Delivery/test owner | Imported skill names match capability IDs; **List Records**, **Get Record**, and enabled write tools are attached under **Build > Tools**; matching and non-matching prompts show the expected trace |
| G5 | ServiceNow and integration owners | Creation profile selected: native `short_description`-only behavior accepted, or custom create-only operation proves full description persistence; duplicate and unknown-outcome handling verified |
| G6 | Backend owners | Every enabled update, note, attachment, and requester-close operation has a fixed schema, field/record authorization, confirmation rules, audit result, and OFF-path enforcement |
| G7 | Release owner | Selected profile, actual connections, pilot audience, acceptance results, support path, monitoring, disable procedure, and rollback are approved |
| D1 | Delivery owner | Agent/environment IDs, published version, capability ON/OFF list, tool/component IDs, connection owners, and evidence location recorded |
| E1 | Test owner | Knowledge, bounded read, empty/denied/failed search, alias/native-name routing, and missing-tool tests pass with sanitized fixtures |
| E2 | ServiceNow/test owners | Native or custom creation test confirms exactly which fields persisted; no hidden update/note/attachment occurs; uncertain outcomes are reconciled before retry |
| E3 | Identity/release owners | Cross-user access, requester-only closure when enabled, capability removal in fresh and existing sessions, monitoring, and rollback are verified |

Creation remains OFF when the approved business requirement is "persist the complete initial
description" and only native **Create Record** is available. If the restricted pilot accepts
a summary-only incident plus a detailed manual handoff, record that decision explicitly.

## Acceptance Status

Use the Markdown acceptance cases and [evaluation-record template](../4.Sample-prompts.md#evaluation-record)
in [Sample prompts](../4.Sample-prompts.md). Record the
agent version, signed-in user, connection identity, configured query limit, actual tool calls,
source record IDs, persisted fields, timestamp, result, and evidence location.

| Area | Repository status | Required tenant evidence |
|---|---|---|
| Knowledge retrieval | Defined, not run | Authorized article retrieval, citations, denied access, and KB scope |
| Incident read | Skill and tool contract defined; not run | Bounded `ListRecords`, `GetRecord`, pagination/coverage statement, and no restricted-field disclosure |
| Incident create | Proposed native contract uses `short_description`; not run | Exact confirmation, persisted short description, manual detailed handoff, no hidden mutation, and unknown-outcome reconciliation; full description persistence for a custom complete-evidence profile |
| ServiceNow own-ticket boundary | Intended through invoker impersonation and source ACLs; not tenant-verified | Two-user list/direct-read tests, server-assigned caller on creation, and requester-close checks when enabled |
| Updates, notes, attachments, closure | Skill definitions only | Deployed narrow tools/workflows and positive/negative authorization evidence |
| Optional Dynamics handoff | Design and skills only | Separate environment, identity, field mapping, partial-failure, and lifecycle evidence |
| Packaging/import | Guide only; no package supplied or import tested | Supported export/import with tool associations, connection mapping, component review, and republish evidence |

## Monitor, Disable, and Roll Back

1. Monitor Copilot Studio execution history, connector failures, ServiceNow records, credit
   use, and source-system audit evidence. An agent reply is not proof that a write persisted.
2. To stop an operation, revoke backend authorization, remove or disable the tool, remove the
   skill association, and republish. Removing only the skill is not a permission boundary.
3. Check already accepted or uncertain operations separately. Disabling future calls does not
   undo a persisted record or necessarily cancel backend work.
4. Reconcile uncertain creation by focused `ListRecords`/`GetRecord` checks before any retry.
   Never create a duplicate because the first response timed out.
5. Restore a recorded known-good profile through the supported tenant process, then repeat
   G4-E3 before re-enabling the affected capability.

## Related Resources

| Resource | Link |
|---|---|
| Capability and Integration Contracts | [Capability matrix](Capability-matrix.md) |
| Acceptance Cases | [Sample prompts](../4.Sample-prompts.md) |
| Export and Import Guidance | [Packaging guide](../5.Working-solution.md) |
