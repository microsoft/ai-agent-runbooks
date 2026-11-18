# Resources - Employee Self-Service Agent with Microsoft Copilot Harness

These are authoring artifacts for a standalone employee self-service agent, not a deployed Microsoft Copilot Harness agent.

| Artifact | Purpose |
|---|---|
| [Capability matrix](Capability-matrix.md) | Eight starter capability IDs, supplied tool binding requirements, dependencies and default OFF states |
| [References and validation checks](Official-sources.md) | Setup links, support boundaries and tenant validation owners |
| [Example use-case planning workbook](Use-case-planning.xlsx) | Broader illustrative backlog for [Scope and Readiness](../3.Scope-and-readiness.md), not the current skill manifest; mark non-starter rows deferred/not selected |
| [Skills index](Skills/README.md) | Eight standalone runtime definitions in matrix/import order, including connector and MCP employee-profile variants |

The source is `01-scenarios\Employee-Self-Service-Agent` at local revision `a776697d6c072ec6d4cf8b09ba7670bd11a3e73c`. No original asset is copied or modified. The new destination is the sibling `01-scenarios\Employee-Self-Service-Agent-Microsoft-Copilot-Harness`.

Runtime skills have only `name` and quoted `description` front matter, and Scope, Tools, Inputs, Procedure, and Results and Failure Handling sections. They reference no unpackaged repository resources. Upload a standalone `SKILL.md` through **Build > Skills > Upload a skill**. A ZIP is needed only if adding supporting assets. Importing skills does not create connections, workflows or backend authorization.

Keep actual tenant values, credentials, personal records and restricted test evidence out of this public repository. Store release evidence in the organization's approved restricted location, recorded by the owners in the [runbook](../4.Runbook.md#release-gates).
