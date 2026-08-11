# Agent Delivery Reference Library

A curated set of references for delivering Microsoft 365 Copilot and Copilot Studio agents,
organised by the delivery question you are trying to answer rather than by product.

> ⚠️ **Verify before you rely on it.** This platform changes monthly. Every link below was
> checked at the time of writing (August 2026), but capability statements — especially around
> governance controls, licensing boundaries, and preview features — go stale quickly. Treat this
> as a starting index, not a source of truth.

---

## 1. Choosing the Right Agent Type

| Resource | Use it for |
|---|---|
| [Agents for Microsoft 365 Copilot](https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/agents-overview) | The two approaches to building agents for Microsoft 365 Copilot |
| [Declarative agents overview](https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/overview-declarative-agent) | What a declarative agent is, its benefits, and national cloud support |
| [Choose the right tool to build your declarative agent](https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/declarative-agent-tool-comparison) | Agent Builder vs Agents Toolkit vs Copilot Studio vs SharePoint |
| [Agent Builder](https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/agent-builder) | The no-code path inside Microsoft 365 Copilot |
| [Copilot Studio overview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-what-is-copilot-studio) | The low-code platform |
| [SharePoint agents](https://learn.microsoft.com/en-us/sharepoint/get-started-sharepoint-agents) | Per-site agents; frequently the customer's quality benchmark |
| [Microsoft 365 Agents Toolkit](https://learn.microsoft.com/en-us/microsoftteams/platform/toolkit/overview-agents-toolkit) | The pro-code path |
| In this repo: [Declarative vs Custom Engine Agent](../02-patterns/Declarative-vs-Custom-engine-agent/Declarative-Agents-vs-Copilot-Studio-Custom-Engine-Agents.md) | Decision framework with scenarios and runbooks |

---

## 2. Connecting Enterprise Knowledge

| Resource | Use it for |
|---|---|
| [Copilot connectors overview](https://learn.microsoft.com/en-us/microsoft-365/copilot/connectors/overview) | Synced vs federated vs personal connectors, and when to use each |
| [Set up connectors in the admin center](https://learn.microsoft.com/en-us/microsoft-365/copilot/connectors/deployment-overview) | Deployment mechanics and crawl guidance |
| [Deploy the ServiceNow Knowledge connector](https://learn.microsoft.com/en-us/microsoft-365/copilot/connectors/servicenow-knowledge-deployment) | The most-used third-party connector in this domain |
| [Set up ServiceNow for connector ingestion](https://learn.microsoft.com/en-us/microsoft-365/copilot/connectors/servicenow-knowledge-admin-setup) | Source-side prerequisites, roles, and hierarchical permissions |
| [Staged rollout](https://learn.microsoft.com/en-us/microsoft-365/copilot/connectors/staged-rollout) | Limiting the audience during validation |
| [Enhance Copilot discovery of connector content](https://learn.microsoft.com/en-us/microsoft-365/copilot/connectors/enhance-copilot-discovery) | Display names, semantic labels, and relevance |
| [Map non-Entra identities](https://learn.microsoft.com/en-us/microsoft-365/copilot/connectors/map-non-entra-id) | When the source system does not key on email |
| [Graph connector agent](https://learn.microsoft.com/en-us/microsoft-365/copilot/connectors/connector-agent) | On-premises sources |
| [Microsoft Graph connectors API](https://learn.microsoft.com/en-us/graph/connecting-external-content-connectors-api-overview) | Building a custom connector |
| [Semantic index for Copilot](https://learn.microsoft.com/en-us/microsoftsearch/semantic-index-for-copilot) | How semantic indexing affects retrieval quality; supported content types |
| In this repo: [Copilot Connector Knowledge Onboarding](../02-patterns/Copilot-Connector-Knowledge-Onboarding/Copilot-Connector-Knowledge-Onboarding.md) | The delivery pattern |

---

## 3. Knowledge, Grounding, and Response Quality

| Resource | Use it for |
|---|---|
| [Knowledge sources summary (Copilot Studio)](https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio) | Supported sources, per-source limits, and the settings that drive grounding behaviour |
| [Tenant graph grounding with semantic search](https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio#tenant-graph-grounding-with-semantic-search) | The highest-impact quality setting for SharePoint- and connector-grounded agents |
| [Limits and limitations for unstructured data](https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-unstructured-data) | File size, type, and count limits |
| [Code interpreter for structured data](https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-code-interpreter-structured-data) | The right answer for spreadsheet-style questions |
| [Generative orchestration](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-generative-actions) | Orchestration modes and how tool/knowledge descriptions drive selection |
| [Grounding with Bing Search](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/how-to/tools/bing-grounding) | What "use information from the web" actually does |
| [Azure AI Search](https://learn.microsoft.com/en-us/azure/search/) | When Graph-based grounding is not enough |
| In this repo: [Grounding & Response Quality Remediation](../02-patterns/Grounding-and-Response-Quality-Remediation/Grounding-and-Response-Quality-Remediation.md) | The diagnostic ladder |
| In this repo: [Enterprise RAG Pattern](../02-patterns/Enterprise-RAG-Pattern/Enterprise-RAG-Pattern.md) | The escalation path for large, governed corpora |

---

## 4. Multi-Agent and Interoperability

| Resource | Use it for |
|---|---|
| [Add other agents overview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents) | Child agents vs connected agents, when to split, and known limitations |
| [Multi-agent orchestration patterns and best practices](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/multi-agent-patterns) | Design guidance for multi-agent solutions |
| [Connect to A2A agents](https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent) | Agent-to-agent protocol integration |
| [Connect to Microsoft Foundry agents](https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-foundry-agent) | Bringing pro-code agents into a Copilot Studio solution |
| [Model Context Protocol specification](https://modelcontextprotocol.io/) | The open standard behind MCP tools and federated connectors *(non-Microsoft)* |
| [A2A protocol](https://a2a-protocol.org/) | The open agent-to-agent interoperability specification *(non-Microsoft)* |
| [Plugins for Microsoft 365 Copilot](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/overview-plugins) | MCP and REST API plugins, dynamic tool discovery, confirmation prompts, and the plugin/tool count limits |
| [Build plugins from an MCP server](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/build-mcp-plugins) | Creating an MCP plugin for a declarative agent |
| [Dynamic tool discovery for MCP plugins](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/plugin-dynamic-tool-discovery) | Runtime tool resolution and when to pin instead |
| [MCP apps — interactive UI widgets](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/plugin-mcp-apps) | Rich responses returned alongside the tool result |
| [Work IQ in Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-work-iq) | Microsoft's own MCP surface — read-only unless an admin enables writes |
| In this repo: [MCP Server Integration](../02-patterns/MCP-Server-Integration/MCP-Server-Integration.md) | The delivery pattern, including tool design and identity |
| In this repo: [Agentic Workflow Orchestration](../02-patterns/Agentic-Workflow-Orchestration/Agentic-Workflow-Orchestration.md) | Orchestration patterns |

> 📌 Multi-agent designs increase latency because every hop adds an orchestration pass, and they
> multiply the testing and governance surface. Split an agent only when there is a reason —
> separate teams, separate lifecycles, separate settings, or degraded tool selection past roughly
> 30–40 choices.

---

## 5. Governance, Security, and Compliance

| Resource | Use it for |
|---|---|
| [Manage agents in the Microsoft 365 admin center](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-copilot-agents-integrated-apps) | The agent types you can manage and how |
| [Agent management overview](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/agent-365-overview) | Roles, permissions, inventory, lifecycle |
| [Agent registry](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/agent-registry) | The tenant inventory of agents |
| [Agent requests](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/agent-requests) | The submission and approval route |
| [Agent settings](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/agent-settings) | Tenant-level agent controls |
| [Microsoft Agent 365 overview](https://learn.microsoft.com/en-us/microsoft-agent-365/overview) | Observe, govern, and secure agents across platforms |
| [Purview for AI agents](https://learn.microsoft.com/en-us/purview/ai-agent-365) | Data security, DLP, and compliance for agents |
| [Share agents with other users (Copilot Studio)](https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-share-bots) | Sharing model and controls |
| [Power Platform environment strategy](https://learn.microsoft.com/en-us/power-platform/guidance/adoption/environment-strategy) | The environment is the unit of isolation, DLP, and cost |
| [Power Platform DLP policies](https://learn.microsoft.com/en-us/power-platform/admin/wp-data-loss-prevention) | Controlling which connectors agents may use |
| [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) | Threat model for agent solutions *(non-Microsoft)* |
| [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) | Risk framing that regulated customers often ask for *(non-Microsoft)* |
| [EU AI Act — official text](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) | Regulatory context for EU deployments *(non-Microsoft)* |
| In this repo: [Agent Governance & Rollout Control Plane](../02-patterns/Agent-Governance-and-Rollout-Control-Plane/Agent-Governance-and-Rollout-Control-Plane.md) | The delivery pattern |

---

## 6. Licensing, Credits, and Cost

| Resource | Use it for |
|---|---|
| [Copilot Studio billing rates and management](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management) | Credit rates per feature, overage enforcement, worked billing examples |
| [Copilot Studio agent usage estimator](https://microsoft.github.io/copilot-studio-estimator/) | Forecast consumption at design time |
| [Manage Copilot Studio credits and capacity](https://learn.microsoft.com/en-us/power-platform/admin/manage-copilot-studio-messages-capacity) | Allocation, per-agent limits, consumption reporting |
| [Microsoft Copilot Studio Licensing Guide](https://go.microsoft.com/fwlink/?linkid=2320995) | The authoritative licensing document |
| [Agent flows overview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-overview) | Agent flows and how they bill |
| In this repo: [Copilot Credits & Cost Control](../02-patterns/Copilot-Credits-Cost-Control/Copilot-Credits-Cost-Control.md) | The delivery pattern |

---

## 7. Publishing and Channels

| Resource | Use it for |
|---|---|
| [Publish an agent to Microsoft Teams](https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-add-bot-to-microsoft-teams) | Teams publishing, including citation rendering behaviour |
| [Add an agent to SharePoint](https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-add-bot-to-sharepoint) | SharePoint channel and its licensing prerequisites |
| [Configure user authentication](https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication) | End-user vs maker identity for knowledge and actions |
| [Adaptive Cards](https://adaptivecards.io/) | Card schema and designer *(non-Microsoft-hosted, Microsoft-maintained)* |
| In this repo: [Agent Publishing & Channel Deployment](../02-patterns/Agent-Publishing-and-Channel-Deployment/Agent-Publishing-and-Channel-Deployment.md) | The delivery pattern |

---

## 7b. Copilot Cowork and Office Artifact Generation

| Resource | Use it for |
|---|---|
| [Copilot Cowork overview](https://learn.microsoft.com/en-us/copilot/microsoft-365/cowork) | What Cowork does, its built-in skills, custom skills, approval model, and scheduled/event-driven tasks |
| [Use plugins with Cowork](https://learn.microsoft.com/en-us/copilot/microsoft-365/cowork-plugins) | Browsing, installing, and admin-deploying plugins that extend Cowork |
| [Create an organization assets library](https://learn.microsoft.com/en-us/sharepoint/organization-assets-library) | Brand templates and approved imagery for Copilot-generated Office files |
| [Add-SPOOrgAssetsLibrary](https://learn.microsoft.com/en-us/powershell/module/sharepoint-online/add-spoorgassetslibrary) | Designating a library as an Office template or image library |
| [Organization fonts in PowerPoint for the web](https://learn.microsoft.com/en-us/sharepoint/support-for-organization-fonts-in-powerpoint-for-the-web) | Font fidelity in generated decks |
| [Keep your presentation on-brand with Copilot](https://support.microsoft.com/topic/keep-your-presentation-on-brand-with-copilot-a3f7ff23-4d5a-4a4d-9ba0-a0a3e0dc8db4) | End-user guidance for brand-compliant generation |
| In this repo: [Branded Office Artifact Generation](../02-patterns/Branded-Office-Artifact-Generation/Branded-Office-Artifact-Generation.md) | The delivery pattern |
| In this repo: [CRM Account Planning Cowork Agent](../01-scenarios/CRM-Account-Planning-Cowork-Agent/1.Overview.md) | The scenario that combines Cowork, MCP, and artifact generation |

---

## 8. Testing, Evaluation, and Operations

| Resource | Use it for |
|---|---|
| [Copilot Agent Kit](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit) | Batch testing, agent inventory, compliance hub, agent debugger, prompt advisor, SharePoint synchronisation |
| [Copilot Agent Kit — testing capabilities](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/main/TESTING_CAPABILITIES.md) | Automated test sets with rubric-based scoring of generative answers |
| [Copilot Agent Kit — agent review tool](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/main/AGENT_REVIEW_TOOL.md) | Static analysis for anti-patterns before go-live |
| [Copilot Agent Kit — agent inventory](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/main/AGENT_INVENTORY.md) | Tenant-wide inventory of Copilot Studio agents |
| [Copilot Agent Kit — automated testing with pipelines](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/main/AUTOMATED_TESTING.md) | Quality gates in the deployment pipeline |
| [Application Insights for agents](https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview) | Telemetry and observability |
| [Azure AI Evaluation SDK](https://learn.microsoft.com/en-us/azure/ai-foundry/how-to/develop/evaluate-sdk) | Groundedness, relevance, and coherence scoring |
| [RAGAS](https://docs.ragas.io/) | Open-source RAG evaluation metrics *(non-Microsoft)* |
| [promptfoo](https://www.promptfoo.dev/) | Open-source prompt and agent regression testing *(non-Microsoft)* |

---

## 9. Application Lifecycle Management

| Resource | Use it for |
|---|---|
| [Power Platform ALM](https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm) | Solutions, layering, managed vs unmanaged |
| [Power Platform pipelines](https://learn.microsoft.com/en-us/power-platform/alm/pipelines) | Promotion between environments |
| [Connection references](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/create-connection-reference) | Making solutions portable |
| [Environment variables](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables) | Configuration without rebuilds |

> 📌 Build every Copilot Studio agent inside a solution, in a non-default environment, from the
> first component. Agents created outside a solution frequently cannot be added to one cleanly
> afterwards.

---

## 10. Responsible AI

| Resource | Use it for |
|---|---|
| [Responsible AI validation checks for declarative agents](https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/rai-validation) | Why an agent may be blocked at publish time |
| [Content safety harm categories](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/concepts/harm-categories) | What content moderation levels actually filter |
| [Microsoft Responsible AI Standard](https://www.microsoft.com/ai/responsible-ai) | The framework customers ask about in review |
| [Transparency notes for Microsoft 365 Copilot](https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-privacy) | Data handling questions from privacy and legal teams |

---

## 11. Document Processing and Extraction

For any workload where the input is a document rather than a question.

| Resource | Use it for |
|---|---|
| [Azure AI Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/overview) | OCR, layout, prebuilt and custom extraction models — the default when input is scanned |
| [Document Intelligence prebuilt models](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/model-overview) | Invoices, receipts, IDs, contracts — check before building a custom model |
| [Document Intelligence layout model](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout) | Tables, line items, and reading order — required for anything with a schedule |
| [Custom extraction models](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/train/custom-model) | Consistent-layout forms specific to the customer |
| [Content Understanding](https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview) | Multimodal extraction across documents, images, audio, and video where layout varies |
| [Document Intelligence language support](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/language-support) | Confirm coverage before promising multilingual accuracy |
| [AI Builder document processing](https://learn.microsoft.com/en-us/ai-builder/form-processing-model-overview) | Low-code extraction inside Power Platform where volumes are modest |
| [Power Automate approvals](https://learn.microsoft.com/en-us/power-automate/get-started-approvals) | The human gate between extraction and a downstream write |

> 📌 Estimate document workloads on **pages per month**, not documents per month. The difference is
> commonly 3–5x, and it is the whole cost model.

---

## How to Use This Library

1. Start from the delivery question, not the product. The sections above map to the phases of an
   agent engagement.
2. Read the in-repo pattern first — it tells you what the documentation does not, which is what
   goes wrong in practice.
3. Verify capability claims against the product before writing them into a customer document.
   Governance controls and licensing boundaries in this space change frequently enough that a
   six-month-old design note is unreliable.
4. When you find that a documented behaviour has changed, update the relevant pattern in this
   repository. That is the mechanism that keeps this useful.

---

## Related

- [Useful links](./Useful-links.md) — broader platform documentation
- [Known limitations and workarounds](./Known-Limitations-and-Workarounds.md) — the field-observed constraints that shape design
