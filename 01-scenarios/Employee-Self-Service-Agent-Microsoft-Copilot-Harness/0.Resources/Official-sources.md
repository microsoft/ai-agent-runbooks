# References and validation checks

**Reviewed:** 2026-10-28. These references accompany the setup and capability descriptions. Feature availability, licensing, security and behavior still require validation in the deployment tenant.

**Starter-scope refresh, 2026-11-11:** D4 and D5 were re-read for tool addition and Markdown skill upload. The seven replacement skill names, Workday paths and ServiceNow parameters come from user-supplied definitions, not independently verified vendor API documentation. Integration owners must verify actual bindings and schemas before enablement.

**Connector profile addition, 2026-11-13:** the supplied `get-workday-employee-information` definition adds an eighth skill using `WD-REST-API` and `staffing/v7/{tenant}/workers/me`. Its endpoint and seven-field schema remain tenant validation requirements, not independently verified API guarantees.

| ID / reference | Capability / setup area | Remaining tenant check / owner |
|---|---|---|
| D1 [Microsoft Copilot Harness overview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/overview) | Microsoft Copilot Harness is a distinct Studio harness; no transfer to/from standard harness; knowledge, tools, skills, Preview, Evaluate and Monitor; Entra auth and M365/Teams at host level | Delivery owner: correct harness, cloud/region, model, channel and identity availability |
| D2 [Create agent](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/build-new-agent) | Home > Agent or Agents > New agent; name/settings/instructions/save, then components | Maker: actual new-agent experience and solution strategy before first save |
| D3 [Add knowledge](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/knowledge-add-existing-copilot) | Build > Knowledge; SharePoint and ServiceNow source options; policy-blocked sources; no general-knowledge toggle | Knowledge owner: exact selected source path, connection, permission trimming, freshness and citations |
| D4 [Add tools](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/add-tools-custom-agent) | Tools picker includes connectors, MCP and Workflows; custom MCP/workflow routes, authentication and action selection | Integration owner: actual operations, schemas and delegated execution |
| D5 [Upload skills](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/skills-add-existing) | Build > Skills > Upload a skill; Markdown name/description or ZIP containing SKILL.md and assets; skipped/invalid skills must be checked | Maker: each enabled definition loads once and routes correctly |
| D6 [Preview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/preview-overview) | Interactive testing, source/tool/skill execution evidence and fresh conversations | QA owner: real allowed/denied users, not maker-only screenshots |
| D7 [Evaluate](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/analytics-agent-evaluation-intro) | Evaluate test sets; General quality does not compare expected answers; evaluations run as signed-in profile | QA owner: deterministic backend and permission assertions supplement quality scores; sign in separately per identity |
| D8 [Publish](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-fundamentals-publish-channels) | Publish creates live version; drafts remain separate; configure distribution channels after publishing | Release owner: approved audience/channel, policy checks, version and rollback record |
| D11 [ServiceNow Knowledge deployment](https://learn.microsoft.com/en-us/microsoft-365/copilot/connectors/servicenow-knowledge-deployment) | Knowledge ingestion and user criteria; Simple flow can skip script-based allow criteria; Advanced flow evaluates scripts; authentication is distinct from employee action sign-in | Knowledge + ServiceNow owners: scope and scripted user criteria, permissions changes, chosen ingestion auth and coexistence |
| D12 [ServiceNow Power Platform connector](https://learn.microsoft.com/en-us/connectors/service-now/) | Generic create/read/update operations and auth choices; full description can be ignored on Create Record; instance-domain limitation | Integration owner: exact operation binding and full-description fidelity; no Basic-auth workaround in this employee-facing design |
| D13 [Workday Power Platform connector](https://learn.microsoft.com/en-us/connectors/workdaysoap/) | Execute REST request (Preview) with connection-owned `{tenant}` substitution and signed-in-user OAuth; bind as WD-REST-API for the supplied profile procedure | Workday + integration owners: staffing/v7 endpoint/schema, own-worker/field allowlists, domain/OAuth permissions and selected connector/MCP core-profile route |

## Interpretation and support boundaries

- **Integration boundary:** the eight starter procedures define required Workday and ServiceNow bindings. Integration owners must establish supported schemas, delegated identity and per-environment validation before enabling them.
- **Design choice:** one authenticated front door; knowledge/navigation through global instructions without separate skills; eight optional own-record live skills, with one primary route for overlapping core-profile lookups; exact confirmation and reconciliation for writes; no autonomous execution.
- **Binding evidence:** names/paths from the supplied skills are requirements to validate, not proof of vendor availability or delivered workflows. No former scenario-owned aliases are needed.
- **Tenant gate:** runbook `[VERIFY]` entries have owners and acceptance criteria. Sensitive capabilities require explicit approval and tenant validation before enablement.
- **Deployment value:** runbook `[FILL]` entries belong in a restricted deployment record, not runtime skills or source control.

No licensing prices, seat thresholds, crawl schedules or blanket GA promises are carried from the source.
