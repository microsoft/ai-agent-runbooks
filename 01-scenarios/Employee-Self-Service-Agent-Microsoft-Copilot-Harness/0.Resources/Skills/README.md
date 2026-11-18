# Runtime skill index

Eight starter skills replace the earlier 28-skill inventory. Import only approved rows into the **Microsoft Copilot Harness in Microsoft Copilot Studio**. Each file is standalone; tool bindings/permissions must be configured separately and remain OFF until validated.

## Workday skills

| Skill name / standalone upload | Integration type | Workday permissions needed |
|---|---|---|
| [update-workday-home-phone-number-mcp](update-workday-home-phone-number-mcp/SKILL.md) | Workday MCP Server | Read own worker/home phones and approved device-type/country-code values; initiate, edit and submit own Change Home Contact Information event; read event status and effective phone. Existing home phone only; no add/delete or work-phone changes. |
| [get-workday-cost-center](get-workday-cost-center/SKILL.md) | Workday Power Platform Connector | Read own worker Organizations and exact Cost Center assignments; no other-worker or organization-membership access. |
| [get-workday-employee-information](get-workday-employee-information/SKILL.md) | Workday Power Platform Connector | Read own staffing worker profile: Employee ID, Name, Business Title, Location (City + Country), Phone, Email and Worker Type. No home-contact/absence lookups or write permissions. |
| [get-workday-employee-information-mcp](get-workday-employee-information-mcp/SKILL.md) | Workday MCP Server | Read approved own staffing/profile fields. Read own home addresses, home phones or absence balances only when requested; no write permissions or excluded sensitive fields. |
| [request-workday-time-off-mcp](request-workday-time-off-mcp/SKILL.md) | Workday MCP Server | Read own worker, eligible absence types, valid dates, daily quantities/units, balances and overlapping time off; initiate/submit own standard time-off request and read its status. No approval, cancellation or Leave of Absence permissions. |

For overlapping core-profile questions, record one primary route: connector `get-workday-employee-information` or `get-workday-employee-information-mcp`. If both are imported, route core-profile lookups only to the selected version; MCP-only requested reads remain separately governed. Never switch routes to bypass an OFF capability, denied access or failed lookup.

## ServiceNow skills

| Skill name / standalone upload | Integration type | ServiceNow permissions needed |
|---|---|---|
| [create-servicenow-incident](create-servicenow-incident/SKILL.md) | ServiceNow Power Platform Connector | Trusted own-user resolution and incident creation as that caller. |
| [list-open-servicenow-tickets](list-open-servicenow-tickets/SKILL.md) | ServiceNow Power Platform Connector | Read own active incidents and approved display fields. |
| [list-hr-cases](list-hr-cases/SKILL.md) | ServiceNow Power Platform Connector | HRSD access to read own employee-visible HR cases and approved display fields. |

## Integration and permission validation

- **Integration type:** each row identifies one primary integration. Workday types are **Workday Power Platform Connector**, **Workday MCP Server** or **Workday Self-Service Agent (A2A)**; ServiceNow rows use **ServiceNow Power Platform Connector**. The home-phone MCP procedure additionally needs WD-REST-API reference lookups through the Workday connector; this dependency does not change its primary type.
- **Power Platform connectors:** bind WD-REST-API to the approved REST action of the [Workday connector](https://learn.microsoft.com/en-us/connectors/workdaysoap/) and restrict paths and fields; REST actions are currently Preview. Validate the [ServiceNow connector](https://learn.microsoft.com/en-us/connectors/service-now/) operations and HRSD access separately.
- **Workday MCP Server:** validate Workday's actual tool catalog and delegated identity. [Workday MCP setup](https://developer.workday.com/documentation/GUID-03605c39-71d3-4314-bf71-97f274df457c-enHYPHENus/ConnectanExternalAgentwithWorkdayMCP) requires registered/configured external-agent access, OAuth and agent-skill security; the supplied tool names are not proof that a tenant exposes them.
- **Workday Self-Service Agent (A2A):** none of the current eight skills uses this type. It delegates to a Workday agent rather than directly calling the supplied MCP/REST tools. Before adding an A2A skill, validate the target agent's advertised operations, employee identity, approval boundaries, returned evidence and Microsoft Copilot Harness compatibility using [Workday A2A configuration](https://developer.workday.com/documentation/GUID-59871309-bbc4-4f06-9a68-80c331c7ed7b-enHYPHENus/ConnectCustomAgentstoExternalAgentsUsingA2A), then align its definition and the [capability matrix](../Capability-matrix.md).
- **Workday permissions:** the Workday table describes minimum access, not verified tenant domain names or OAuth scope IDs. The Workday owner must map each operation to its exact domain and business-process security policies, grant only the required View/Get and Modify/Put or initiation/submission rights, and validate OAuth scopes and delegated employee access. For MCP/A2A, use **View Security for Agent Skill**, configure the invoking users' security groups and activate approved pending changes as described in [Configure Security Policies for Agent Skills](https://doc.workday.com/admin-guide/en-us/workday-ai/agent-security/configure-security-policies-for-agents.html). Agent availability and Entra SSO alone do not grant underlying data/action permissions.

Knowledge answers and source-backed navigation use global instructions and approved SharePoint/ServiceNow knowledge; no separate runtime skills are needed. A knowledge-only release imports none of these eight live skills.

Adapted from seven user-supplied definitions on 2026-11-11, with the supplied connector-based employee-information skill added on 2026-11-13. Names and core procedures are retained; own-record enforcement, minimal profile reads, unique caller resolution, safe retries and truthful status handling are aligned with the scenario. The supplied other-person incident search is intentionally omitted. Standard time-off submission is in scope; Leave of Absence is not.

For an existing deployment, remove the old runtime definitions rather than importing both inventories. Coordinate the [capability matrix](../Capability-matrix.md), tool exposure, backend permissions, active sessions and pending operations; removing a skill alone does not revoke a tool.

Upload through **Build > Skills > Upload a skill**. These Markdown files require no supporting assets or ZIP. These are Studio runtime definitions, not skills for the repository authoring assistant.
