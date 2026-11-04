# Resources — IT Service Desk Insights Agent (GHCP)

Start with [Capability-matrix.md](Capability-matrix.md). It maps each agent-scoped
skill to its tool, connector/API operation, prerequisites, dependencies, and ON/OFF behavior.

These resources belong only to the [GHCP scenario](../1.Overview.md), hosted inside
Copilot Studio. The separate [Agent Builder scenario](../../IT-Service-Desk-Insights-Agent/1.Overview.md)
does not use these skills or action tools.

**Included:** documentation, proposed tool contracts, eight core ServiceNow skills plus
four optional Dynamics Customer Service [skill definitions](Skills/README.md), and a locally authored
[ServiceNow-only MVP](Working-solution/README.md). The MVP includes agent YAML, connector
tool definitions, three imported skills, and evaluation definitions. **Not included:**
bound tenant connections, deployed workflows, tenant credentials, live test results, or a
published agent. Implement/configure and approve the backend components before enabling
actions; local YAML and uploaded skills do not create connections or grant permissions.

Keep tenant-specific deployment assets in an approved access-controlled location. The
Working-solution folder contains only non-secret, unbound local components.

| Folder / file | Purpose |
|---|---|
| [Capability-matrix.md](Capability-matrix.md) | Included capability catalog, dependencies, profiles, limitations, and capability-card fields |
| [Release-readiness.md](Release-readiness.md) | Known issues, owner-assigned release gates, acceptance status, monitoring, and rollback |
| [Working-solution/](Working-solution/README.md) | ServiceNow-only local MVP agent, unbound connector definitions, known limitations, and acceptance cases |
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
- Creation profile decision and evidence: native `CreateRecord` persists only the tested
  `short_description`, or a custom create-only operation proves that the full initial
  description persisted. Native creation must not be presented as complete-evidence creation.
- Pending backend outcome handling, partial cross-system handoff recovery, and audit correlation.
- Product/API entitlement and preview acceptance, deployment owner, support owner, and rollback.

Store secrets in managed connections or an approved secret store, never these files. Redact
record contents and user-supplied evidence before adding examples to the public repository.
