# Resources — IT Service Desk Insights Agent with GHCP Harness

Start with [Capability-matrix.md](Capability-matrix.md). It maps each agent-scoped
skill to its tool, connector/API operation, prerequisites, dependencies, and ON/OFF behavior.

These resources belong only to the [GHCP scenario](../1.Overview.md), hosted inside
Copilot Studio. The separate [Agent Builder scenario](../../IT-Service-Desk-Insights-Agent/1.Overview.md)
does not use these skills or action tools.

**Included:** documentation, proposed tool contracts, eight core ServiceNow plus four optional
Dynamics Customer Service [instruction-only skill definitions](Skills/README.md), and Markdown
[acceptance cases](../4.Sample-prompts.md). **Not included:** an agent project or agent YAML,
connector definitions, workflow exports, evaluation JSON, an importable solution ZIP, bound
tenant connections, credentials, live test results, or a published agent. Implement/configure
and approve the backend components before enabling actions; uploaded skills do not create
connections or grant permissions.

Keep tenant-specific deployment assets in an approved access-controlled location. The
[packaging guide](../5.Working-solution.md) describes how to package and validate your own
implementation; there is no `Working-solution/` folder in these resources.

| Folder / file | Purpose |
|---|---|
| [Capability-matrix.md](Capability-matrix.md) | Included capability catalog, dependencies, profiles, limitations, and capability-card fields |
| [Release-readiness.md](Release-readiness.md) | Known issues, owner-assigned release gates, acceptance status, monitoring, and rollback |
| [Packaging guide](../5.Working-solution.md) | Proposed export/import and validation steps after implementing the approved profile; no downloadable solution |
| [Sample prompts](../4.Sample-prompts.md) | Markdown acceptance cases and evaluation-record template; no executed results |
| [Skills/](Skills/README.md) | Runtime-focused definitions with matching capability names, tool usage, procedures, and failure behavior; setup/dependencies remain in the matrix |

The `Instructions/`, `Profiles/`, `Workflows/`, `Connections/`, `Evaluation/`,
`Sample-documents/`, and `Images/` names used in the delivery guidance describe records that
an implementation team may maintain in its access-controlled deployment workspace. Those
folders are not supplied in this repository and must not be read as included artifacts.

## Required Deployment Evidence

- Office 365 Users `GetMyProfile` uses each end user's connection, selects minimal fields,
  and is reused only within that user's conversation; profile errors and language fallback
  do not trigger impersonation or broaden source access.
- Approved scope: ServiceNow and optional Dynamics Customer Service; no device telemetry,
  remote diagnostics/remediation, ERP, GitHub engineering integration, or agent routing/assignment.
- Separate permission decisions for creation, descriptive updates, notes, attachments,
  and requester closure. A create-only profile contains no hidden subsequent writes.
- Backend-owned routing behavior, including which creation fields the agent cannot set.
- ServiceNow invoker impersonation, own-record ACLs for list/direct reads, and server-owned
  caller assignment on creation. When the Dynamics extension is enabled, record its
  separate requester mapping. Include requester-close lifecycle/state rules and proof that
  read/write privileges alone cannot close someone else's record.
- Positive and negative authorization outcomes, including disabled-action bypass attempts.
- Creation profile decision and evidence: verify native `CreateRecord` persists the confirmed
  `short_description`, or a custom create-only operation proves that the full initial
  description persisted. Native creation must not be presented as complete-evidence creation.
- Pending backend outcome handling, partial cross-system handoff recovery, and audit correlation.
- Product/API entitlement and preview acceptance, deployment owner, support owner, and rollback.

Store secrets in managed connections or an approved secret store, never these files. Redact
record contents and user-supplied evidence before adding examples to the public repository.
