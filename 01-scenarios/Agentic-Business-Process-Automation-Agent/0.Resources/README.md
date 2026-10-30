# Source References and Capability Evidence

This page collects the upstream source references and capability evidence used in
this scenario.

Runtime packages, code, images, and
domain knowledge files remain upstream; no accelerator binaries are copied here.
Pin a source commit and compatible solution versions during delivery because `main`
and its package names can change.

| Source | Evidence used in this scenario |
|---|---|
| [Accelerator overview](https://github.com/microsoft/copilot-agentic-business-process/blob/main/README.md) | Reusable core, state-driven handoffs, role-based HITL, console, monitoring, deployment skills, and claims WIP status |
| [Tracking model specification](https://github.com/microsoft/copilot-agentic-business-process/blob/main/core/spec/business-process-data-model-spec.md) | Six tracking tables, typed outputs, relationships, and lifecycle states |
| [Business Process API](https://github.com/microsoft/copilot-agentic-business-process/blob/main/core/plugins/business-process-api/README.md) | Caller-scoped access, team/role task eligibility and precedence, self-claim without a target assignee, concurrency, and transactional completion |
| [Core deployment guide](https://github.com/microsoft/copilot-agentic-business-process/blob/main/core/solution/DEPLOYMENT.md) | Identities, privileges, licensing, imports, monitoring-tool associations, console URL, and verification |
| [Monitoring agent definition](https://github.com/microsoft/copilot-agentic-business-process/blob/main/core/solution/export/bots/faf001_businessprocessmonitoringagent/configuration.json) | Process discovery without order-specific assumptions; strictly read-only behavior; tool-evidence requirements |
| [Workflow Console guide](https://github.com/microsoft/copilot-agentic-business-process/blob/main/core/codeapps/workflow-console/README.md) | Power Apps code-app development, configuration, testing, and deployment |
| [Console contributor guide](https://github.com/microsoft/copilot-agentic-business-process/blob/main/core/codeapps/workflow-console/AGENTS.md) | Widget reuse/registration, typed submission contract, output keys, tests, and packaging into core |
| [Business-process contributor guide](https://github.com/microsoft/copilot-agentic-business-process/blob/main/business-processes/AGENTS.md) | Separate process solutions, stage/trigger contracts, human decisions, notification pattern, and extension checklist |
| [Order Processing reference](https://github.com/microsoft/copilot-agentic-business-process/blob/main/business-processes/order-processing/README.md) | Four workflows, two published agents, two human gates, demo knowledge, and SAP payload generation without posting |
| [Order Processing deployment](https://github.com/microsoft/copilot-agentic-business-process/blob/main/business-processes/order-processing/solution/DEPLOYMENT.md) | Mailbox/automation account, process roles, connection binding, activation, and verification |
| [Upstream deployment skills](https://github.com/microsoft/copilot-agentic-business-process/tree/main/.github/skills) | `deploy-business-process-core` and `deploy-order-processing`; separate from runtime agents and optional Forge customization |
| [Power Automate duration limits](https://learn.microsoft.com/en-us/power-automate/limits-and-config#duration-limits) | The single-cloud-flow 30-day run limit; not a certification of this accelerator's elapsed-time behavior |

The [overview comparison](../1.Overview.md#additional-value-compared-with-the-invoice-scenarios)
uses the existing [invoice overview](../../Autonomous-Invoice-Orchestration-Agent/1.Overview.md)
and [GHCP invoice overview](../../Autonomous-Invoice-Orchestration-Agent-GHCP/1.Overview.md).
It does not infer a production capability from the mere presence of a solution package.

## Availability and Validation

- **Upstream assets available:** BusinessProcessCore and Order Processing.
- **Customization guidance only:** claims, contracts, loans, deals, tax, and RFQ variants;
  Forge-assisted adaptation is not a bundled runtime integration.
- **Not executed here:** tenant deployment, model evaluation, end-to-end acceptance,
  actual greater-than-30-day waiting/resume, or production performance testing.
- **Delivery evidence required:** the [runbook's acceptance cases](../3.Runbook.md#acceptance-and-release-gates),
  recorded against the pinned source/packages in the target tenant.
