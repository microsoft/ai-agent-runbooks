# IT Service Desk Insights Agent - Release Readiness

Configuration, known-issue, and acceptance guidance for the
[GHCP runbook](../3.Runbook.md). The repository supplies documentation, runtime skill
definitions, and an unbound ServiceNow-only local MVP. No tenant deployment, published
agent, verified impersonation/ACL configuration, or complete live acceptance result is claimed. A user-provided
trace showed `sn-incident-read` routing to native **List Records** in a separately built
agent; it does not validate the checked-in local project, requester scope, pagination, or
incident creation.

## Current Known Issues and Limitations

| ID | Area | Current behavior / release decision |
|---|---|---|
| K1 | Native incident creation | The [Microsoft ServiceNow connector reference](https://learn.microsoft.com/en-us/connectors/service-now/) documents that **Create Record** ignores the full `description` value because of an underlying ServiceNow REST API limitation. The native MVP submits only `short_description` and returns the detailed investigation as a manual handoff. Use a separately validated custom create-only operation when complete evidence must be stored at creation. |
| K2 | Incident search coverage | `ListRecords` is bounded. The checked-in local tool defaults to 20 records; another tenant configuration can use a different limit, such as 100. One page is never proof that every incident was searched. Use focused queries and explicit pagination/offset when broader coverage is required. |
| K3 | Own-ticket enforcement | The intended profile uses ServiceNow invoker authentication: the source impersonates the signed-in user, and incident ACLs restrict both list and direct reads to records where that user is caller/requester. Creation sets `caller_id` server-side from the same identity. The local YAML cannot prove those tenant controls; `GetMyProfile` is context, not authorization. |
| K4 | Tool names in traces | Copilot Studio can show native action/schema names such as **List Records**, **Get Record**, and **Create Record** instead of a custom alias. Skills and acceptance evidence use the native names. |
| K5 | Tool attachment | A connector operation appearing in an export or connector definition does not mean it is attached as an active agent tool. In the latest user-provided export, **Create Record** was present in connector metadata but no active create-tool component was visible. Verify **Build > Tools**, connection binding, and the actual execution trace. |
| K6 | Knowledge scope | The local MVP has no fixed ServiceNow KB IDs. It searches every knowledge base readable through the signed-in connection. Approve and test the source scope before publication. |
| K7 | Local package status | The local YAML is unbound. PAC 2.12.2 serialized the components but omitted the native tool-to-connection association asset and verified connector icon metadata. The validation ZIP is not an import-ready release. |
| K8 | Runtime evidence | The JSON cases are definitions only. The observed **List Records** routing trace covers one read path, not the checked-in project or the remaining acceptance suite. Repository validation, a successful skill import, or a tool visible in a connector catalog is not evidence that tenant permissions, persistence, or failure handling work. |

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

Use [Sample prompts](../4.Sample-prompts.md) and the local
[acceptance definitions](Working-solution/Evaluation/acceptance-cases.json). Record the
agent version, signed-in user, connection identity, configured query limit, actual tool calls,
source record IDs, persisted fields, timestamp, result, and evidence location.

| Area | Repository status | Required tenant evidence |
|---|---|---|
| Knowledge retrieval | Defined, not run | Authorized article retrieval, citations, denied access, and KB scope |
| Incident read | Native `ListRecords` routing observed once in a separate tenant build; full suite not run | Bounded `ListRecords`, `GetRecord`, pagination/coverage statement, and no restricted-field disclosure |
| Incident create | Native schema reduced to `short_description` | Exact confirmation, persisted short description, manual detailed handoff, no hidden mutation, and unknown-outcome reconciliation |
| ServiceNow own-ticket boundary | Intended through invoker impersonation and source ACLs; not tenant-verified | Two-user list/direct-read tests, server-assigned caller on creation, and requester-close checks when enabled |
| Updates, notes, attachments, closure | Skill definitions only | Deployed narrow tools/workflows and positive/negative authorization evidence |
| Optional Dynamics handoff | Design and skills only | Separate environment, identity, field mapping, partial-failure, and lifecycle evidence |
| Packaging/import | Validation-only local pack | Supported export/import with tool associations, connection mapping, component review, and republish evidence |

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

[Overview](../1.Overview.md) | [Architecture](../2.Architecture.md) |
[Runbook](../3.Runbook.md) | [Sample prompts](../4.Sample-prompts.md) |
[Working solution](../5.Working-solution.md)
