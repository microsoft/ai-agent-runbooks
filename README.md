# 🤖 AI Agent Runbooks

Welcome to **AI Agent Runbooks** — your go-to hub for building and deploying production-ready AI Agent solutions on Microsoft platforms. This repository provides structured runbooks, proven technical patterns, and real-world scenarios to accelerate your AI Agent delivery with confidence.

## What is AI Agent Runbooks?

**AI Agent Runbooks** is an open, community-driven repository that provides hands-on implementation guides, validated technical patterns, and ready-to-use scenario blueprints for building enterprise-grade AI Agents using Microsoft technologies — including **Copilot Studio**, **Azure AI Foundry**, and **Microsoft 365 Copilot**.

Whether you're building your first agent or scaling across multiple business domains, this repository gives you the structure and guidance to deliver faster and smarter.


## Repository Structure

```
📦 ai-agent-runbooks
├── 📂 00-overview/          → Understand the repository objectives, structure, and how to get started
├── 📂 01-scenarios/         → Explore pre-built AI Agent use cases and end-to-end implementations
├── 📂 02-patterns/          → Learn technical patterns and industry best practices
└── 📂 03-references/        → Access additional resources, templates, and reference materials
```

## How to use this repository

| Purpose | Description | Starting Path |
|---------|-------------|----------------|
| 📋 Overview | Understand the repository objectives, agent taxonomy, and navigation guide | [`00-overview/`](./00-overview/) |
| 🎯 Agent Scenarios | Explore pre-built use cases such as HR Onboarding Agent, Helpdesk Agent, and more | [`01-scenarios/`](./01-scenarios/) |
| 🏗️ Technical Patterns | Learn implementation patterns for Copilot Studio, Azure AI, and multi-agent orchestration | [`02-patterns/`](./02-patterns/) |
| 📚 References | Access templates, guides, architecture references, and additional resources | [`03-references/`](./03-references/)|

## 🚀 Quick Start

**New here?** Start with [00-overview/](./00-overview/) to understand the structure and agent taxonomy.

**Ready to build?** Jump to [01-scenarios/](./01-scenarios/) and explore real-world agent implementations like:

- 🤖 [Autonomous Invoice Orchestration Agent](./01-scenarios/Autonomous-Invoice-Orchestration-Agent/) — Autonomous agent that helps employees create payment request forms and get them approved by their manager
- 🧾 [Autonomous Invoice Orchestration Agent with GHCP Harness](./01-scenarios/Autonomous-Invoice-Orchestration-Agent-GHCP/1.Overview.md) — GitHub Copilot harness scenario that extracts fields from emailed PDF invoices into Dataverse, then starts an approval or sends the invoice to Finance for review. Two Workflows flows and one runtime skill.
- 🔄 [Agentic Business Process Automation Agent](./01-scenarios/Agentic-Business-Process-Automation-Agent/1.Overview.md) — Reusable accelerator for long-running, event-driven document cases, with a custom HITL console, multi-team task queues and role-based allocation APIs, process-agnostic monitoring agent, and agentic customization supported by [Agent Forge](https://azure-samples.github.io/faf-landing-page/), an AI-powered software factory for agentic development. Order Processing reference implementation available.
- 💼 [CRM Account Planning Cowork Agent](./01-scenarios/CRM-Account-Planning-Cowork-Agent/) — Copilot Cowork connected to the CRM through a purpose-built MCP server, producing branded account plans, QBR decks, and pipeline models as Office artifacts.
- 🗓️ [Calendar Request Approval Agent](./01-scenarios/Calendar-Request-Approval-Agent/1.Overview.md) — Conversational calendar intake, deterministic approval and routing, SharePoint/Outlook publication, and explicit identity and recovery controls.
- 🧑‍💼 [Chief of Staff Cowork Agent](./01-scenarios/Chief-of-Staff-Cowork-Agent/) — Five configured skills for weekly leadership briefs, stakeholder drafts, review packs and factual team-work visibility, with human review and people-safety boundaries.
- 🤝 [Client Meeting Preparation Agent](./01-scenarios/Client-Meeting-Preparation-Agent/) — Pre-meeting briefings and post-meeting file notes for advisers and relationship managers, assembled from the book of record, relationship history, and the client file. Built for regulated advisory work, with hard advice boundaries and information barrier enforcement.
- 🛡️ [Compliance Self-Inspection Agent](./01-scenarios/Compliance-Self-Inspection-Agent/1.Overview.md) — Runbook for employee-initiated fair-trade / antitrust awareness checks over the employee's own OneDrive and Outlook content, with personal risk-rated results and metadata-only completion reporting to Legal.
- ⚖️ [Contract Review with GitHub Copilot Harness](./01-scenarios/Contract-Review-GitHub-Copilot-Harness-Agent/1.Overview.md) — Copilot Studio reference design for evidence-linked clause comparison and approved fallback drafts, using authorized read-only tools and mandatory qualified counsel review.
- ⚖️ [Contract & Legal Intelligence Agent](./01-scenarios/Contract-and-Legal-Intelligence-Agent/) — Clause extraction, risk flagging against documented standard positions, tracked-changes redlines, and evidence retrieval — with a hard legal-advice boundary and a qualified human on every decision.
- 🎟️ [Copilot Licence Lifecycle Agent](./01-scenarios/Copilot-License-Lifecycle-Agent/) — Copilot Studio agent that manages the Microsoft 365 Copilot licence estate: inventory, dormancy detection, reclaim and reassignment, and waitlist management.
- 🌍 [Country-Aware HR Knowledge Agent](./01-scenarios/Country-Aware-HR-Knowledge-Agent/1.Overview.md) — Country-scoped SharePoint knowledge with organization-wide and optional restricted ingestion lanes, authenticated retrieval, and query-time authorization.
- ⚙️ [D365 F&SCM Compare & Copy Configurations Agent](./01-scenarios/D365-Finance-&-SupplyChain-Compare-and-Copy-Configurations-Agent) — AI-powered agent that compares and copies module configurations across Dynamics 365 Finance & Supply Chain Management environments, helping administrators identify configuration differences, validate settings, and maintain consistency using the Dynamics 365 ERP MCP server.
- 📄 [Document Processing & Extraction Agent](./01-scenarios/Document-Processing-and-Extraction-Agent/) — Classify, extract, validate, and route high-volume documents at production accuracy, with confidence-based human review and output shaped to whatever the downstream system actually accepts.
- 🔧 [Dynamics 365 Monitoring Agent](./01-scenarios/Dynamics-365-Monitoring-Agent/) — AI-powered monitoring and diagnostics agent for D365 Finance & Supply Chain using Application Insights telemetry
- 🛒 [Dynamics 365 PO Generation Agent](./01-scenarios/Dynamics-365-PO-Generation-Agent/) — Autonomous agent that creates a purchase order autonomously or manually
- 📊 [DynPerf Performance Agent](./01-scenarios/Dynperf-Performance-Agent) — AI-powered performance diagnostics agent that leverages DynamicsPerf data to help administrators analyze SQL query statistics, detect bottlenecks, and optimize Dynamics 365 environment performance with actionable, natural-language insights.
- 📈 [ERP-D365-Inventory-Optimization-Agent](./01-scenarios/ERP-D365-Inventory-Optimization-Agent) — Interactive agent that generates reports on Inventory from D365 F&O for inventory managers and other stakeholders to get current information, predictions, and other analytics around their inventory data.
- 📬 [Email & Mailbox Triage Agent](./01-scenarios/Email-and-Mailbox-Triage-Agent/) — Classifies, prioritises, routes, and drafts responses for high-volume shared mailboxes, with a draft-never-send boundary and a ticket handoff. The most frequently requested use case across the CAF portfolio.
- 🧑‍💻 [Employee Self-Service Agent](./01-scenarios/Employee-Self-Service-Agent/) — One conversational front door in Microsoft 365 Copilot for HR and IT support, grounded on the HRIS, ITSM, and SharePoint. Includes the qualification and readiness work that dominates this delivery.
- 🧾 [F&O User Onboarding Agent](./01-scenarios/F&O-User-Onboarding-Agent/) — Autonomous onboarding solution that automates user provisioning in Microsoft Entra ID and Dynamics 365 Finance & Operations, including approval workflows and role assignment.  
- 🧑‍💼 [HR Onboarding Agent](./01-scenarios/HR-Onboarding-Agent/) — Autonomous agent that helps new hires find HR-related information using a ServiceNow Knowledge Base
- 🧑‍💼 [HR Onboarding Agent with GHCP Harness](./01-scenarios/HR-Onboarding-Agent-GHCP/1.Overview.md) — GitHub Copilot harness scenario with normal HR conversation, onboarding checklists and connected user-mailbox Workflows replies using two runtime skills. The workflow sends the agent's HTML through Outlook without per-message approval. This is a development walkthrough with documented limitations, not a deployed integration.
- 🎫 [IT Service Desk Insights Agent](./01-scenarios/IT-Service-Desk-Insights-Agent/) — Declarative agent grounded on ServiceNow knowledge and catalog content that answers employee how-to questions and performs sentiment and theme analysis over ticket text, with permission-trimmed retrieval.
- 🧩 [M365 Agent](./01-scenarios/M365-Agent/) — Collection of pre-built, deploy-ready Microsoft 365 Copilot agents (e.g., Plan My Day, Executive Briefing, Request Tracker) designed to accelerate common workplace scenarios and enable rapid customization.
- 🗓️ [Meeting Intelligence Agent](./01-scenarios/Meeting-Intelligence-Agent/) — Extracts decisions, actions, and owners from meeting transcripts under a hard evidence rule, deduplicates across recurring series, and tracks commitments to closure. Includes the consent position and the invented-action release gate.
- 📊 [Insights Analyst Cowork Agent](./01-scenarios/Insights-Analyst-Cowork-Agent/) — Six configured skills for Sales, Finance, Retail, Manufacturing and Service reviews from existing Power BI, Fabric or Excel data, with reconciled KPIs and Markdown/HTML outputs.
- 🏢 [Workplace Agent](./01-scenarios/Workplace-Agent/) — Declarative agent that handles internal FAQ inquiries and application request workflows using SharePoint, Dataverse, and Power Automate  


### Persona-Based Cowork Scenarios

Twelve configuration-first persona suites follow the Chief of Staff documentation model, with
unchanged starter plugin archives, package/version notes, source and approval boundaries, and
workflow-specific acceptance tests. Archive availability is not tenant deployment or acceptance.

| Domain | Persona scenarios |
|---|---|
| Leadership | [Decision Maker](./01-scenarios/Decision-Maker-Cowork-Agent/1.Overview.md), [Force Multiplier](./01-scenarios/Force-Multiplier-Cowork-Agent/1.Overview.md) |
| Sales | [Quota Carrier](./01-scenarios/Quota-Carrier-Cowork-Agent/1.Overview.md), [Number Owner](./01-scenarios/Number-Owner-Cowork-Agent/1.Overview.md) |
| Marketing | [Campaign Operator](./01-scenarios/Campaign-Operator-Cowork-Agent/1.Overview.md), [Launch Lead](./01-scenarios/Launch-Lead-Cowork-Agent/1.Overview.md) |
| Finance and operations | [Close Owner](./01-scenarios/Close-Owner-Cowork-Agent/1.Overview.md), [Procurement Operator](./01-scenarios/Procurement-Operator-Cowork-Agent/1.Overview.md) |
| Legal | [Contract Counsel](./01-scenarios/Contract-Counsel-Cowork-Agent/1.Overview.md), [Portfolio Counsel](./01-scenarios/Portfolio-Counsel-Cowork-Agent/1.Overview.md) |
| Service | [Case Specialist](./01-scenarios/Case-Specialist-Cowork-Agent/1.Overview.md), [Service Ops Leader](./01-scenarios/Service-Ops-Leader-Cowork-Agent/1.Overview.md) |

Use the [persona catalogue](./01-scenarios/README.md#persona-based-cowork-scenarios) and
[Persona Skill Routing and Scope Isolation](./02-patterns/Persona-Skill-Routing-and-Scope-Isolation/Persona-Skill-Routing-and-Scope-Isolation.md)
to select workflows and qualify overlapping packages before installation.

**Need implementation patterns?** Check out [02-patterns/](./02-patterns/) for proven technical approaches including Copilot Studio orchestration, RAG patterns, and multi-agent design.

- 🛡️ [Agent Governance & Rollout Control Plane](./02-patterns/Agent-Governance-and-Rollout-Control-Plane/) — Separating agent creation from consumption, controlling sharing, establishing an approval route, and building the inventory and audit position that enterprise rollouts depend on
- 🚢 [Agent Publishing & Channel Deployment](./02-patterns/Agent-Publishing-and-Channel-Deployment/) — The last mile: licensing prerequisites, channel-specific behaviour, authentication, and rendering across Microsoft 365 Copilot, Teams, SharePoint, and third-party channels
- 🔀 [Agentic Workflow Orchestration](./02-patterns/Agentic-Workflow-Orchestration/) — Multi-agent orchestration pattern for coordinating handoffs between specialized agents, enabling sequential, concurrent, and hierarchical agent collaboration across complex business workflows
- 🎨 [Branded Office Artifact Generation](./02-patterns/Branded-Office-Artifact-Generation/) — Making agent-generated PowerPoint, Word, and Excel output brand-compliant, factually reliable, and safe to send, using the Organization Asset Library and an entry-point × model test matrix
- 🔌 [Copilot Connector Knowledge Onboarding](./02-patterns/Copilot-Connector-Knowledge-Onboarding/) — Getting third-party enterprise content (ServiceNow, Jira, Confluence, Salesforce, Workday) into the Microsoft Graph index with correct ACLs, including the permission validation evidence that unblocks security review
- 💳 [Copilot Credits & Cost Control](./02-patterns/Copilot-Credits-Cost-Control/) — Credit consumption rates, what enforcement actually stops, capacity allocation, per-agent caps, and chargeback design
- 🧭 [Copilot Studio Harness Selection & Cowork](./02-patterns/Copilot-Studio-Harness-Selection/Copilot-Studio-Harness-Selection.md) — Upfront compatibility gaps for channels, authentication, variables, Adaptive Cards, knowledge, and models, plus decision trees for Cowork versus building, standard generative versus GitHub Copilot harness, and release readiness
- 🔄 [Copilot Studio Migration & Modernisation](./02-patterns/Copilot-Studio-Migration-and-Modernisation/) — Moving an existing conversational or automation estate onto Copilot Studio: inventory and disposition, the pre-requisite work packages that stall most migrations, parallel-run cut-over, and decommissioning
- 🧬 [Copilot Studio & Foundry Split Architecture](./02-patterns/Copilot-Studio-and-Foundry-Split-Architecture/) — Deciding what belongs in Copilot Studio and what belongs in Foundry, how the halves communicate, and the ownership, cost, and latency consequences of the boundary
- 🚀 [Cowork Enablement](./02-patterns/Cowork-Enablement/) — Shared tenant readiness, security, governance, billing, functional validation and handover pattern applied within Cowork business scenarios
- 🧰 [Cowork Skill Delivery and Scheduled Reviews](./02-patterns/Cowork-Skill-Delivery-and-Scheduled-Reviews/) — Trusted skill/reference packaging, routing, tenant qualification, controlled sharing, optional scheduled draft preparation and operational handover
- 🧾 [Cowork Spending Policies and Cost Governance](./02-patterns/Cowork-Spending-Policies-and-Cost-Governance/) — Copilot Credit spending policies, limits, alerts, discovery, billing methods, precedence rules and reconciliation for Cowork; distinct from the Copilot Studio credits pattern
- 🧭 [Declarative vs Custom Engine Agent](./02-patterns/Declarative-vs-Custom-engine-agent/) — Decision framework for selecting between Declarative Agents and Copilot Studio Custom Engine 
  Agents, covering three build methods (Agent Builder, Copilot Studio, Agents Toolkit), knowledge scale matrices, reference architectures, use-case scenario library, performance comparisons, and step-by-step implementation runbooks for both agent types and multi-agent composition
- 🧠 [Enterprise RAG Pattern](./02-patterns/Enterprise-RAG-Pattern/) — Multi-source, governed RAG pattern that grounds LLM responses in organizational data (SharePoint, OneDrive, Dataverse, Azure SQL, Fabric, Dynamics CRM) with document-level access control and full citation trails via Azure AI Search
- [GitHub Copilot Harness Execution](./02-patterns/GitHub-Copilot-Harness-Execution/GitHub-Copilot-Harness-Execution.md) — Adaptive planning, knowledge, tools, skills, and Hooks inside Copilot Studio, with independent backend authorization, exact-version human approvals, and idempotent consequential workflows.
- 📊 [Governed Analytics Review](./02-patterns/Governed-Analytics-Review/) — Explicit source/KPI contracts, period and numerical reconciliation, RLS and generated-artifact access checks, with consistent narrative and dashboard outputs
- 🔬 [Grounding & Response Quality Remediation](./02-patterns/Grounding-and-Response-Quality-Remediation/) — An ordered diagnostic ladder for agents that are built, connected, and still answering badly
- ✋ [Human-in-the-Loop Review & Approval](./02-patterns/Human-in-the-Loop-Review-and-Approval/) — Designing the gate between an agent's output and a consequence: gate placement, what the reviewer must be shown, confidence-based routing, review fatigue, and the audit record
- 📑 [Intelligent Document Processing Pipeline](./02-patterns/Intelligent-Document-Processing-Pipeline/) — Classify → extract → validate → route → output: extraction stack selection, confidence thresholds derived from measured data, validation against master data, and the downstream boundary when the target system has no API
- 🚦 [Pilot-to-Scale Validation Gates](./02-patterns/Pilot-to-Scale-Validation-Gates/) — Evidence-gated progression from pilot to scale: signed boundary, control posture, verification tests, success criteria, ownership matrix and a recorded expand/extend/pause/stop decision
- [Persona Skill Routing and Scope Isolation](./02-patterns/Persona-Skill-Routing-and-Scope-Isolation/Persona-Skill-Routing-and-Scope-Isolation.md) - Route-or-clarify, same-name skill/version conflicts, built-in overlap and verified seller/team, delegate and case/matter scope across persona packs; includes a delivery runbook.
- 🔎 [MCP Federated Connectors](./02-patterns/MCP-Federated-Connectors/MCP-Federated-Connectors.md) — A separate pattern for live, read-only external retrieval in supported Microsoft 365 Copilot experiences without a source index, including custom connector onboarding, complex-authentication limitations, and private-only on-premises connectivity gaps
- 🔌 [MCP Server Integration](./02-patterns/MCP-Server-Integration/) — Connecting third-party systems (Salesforce, Workday, ServiceNow, Databricks, Snowflake, GitHub) to Copilot Cowork, declarative agents, Copilot Studio, and Foundry via Model Context Protocol servers, including tool design, per-user identity, dynamic tool discovery, and gateway-mediated topologies for on-premises and private-network backends (APIM, Apigee, Workato, MuleSoft)

**Need reference material?** [03-references/](./03-references/) holds the curated documentation index and the field-observed constraints that shape design.

- 📚 [Agent Delivery Reference Library](./03-references/Agent-Delivery-Reference-Library.md) — Microsoft and non-Microsoft references organised by delivery question rather than by product
- ⚠️ [Known Limitations & Workarounds](./03-references/Known-Limitations-and-Workarounds.md) — constraints observed repeatedly in the field, with the design responses that work

## Key Features

🤖 **Agent Runbooks** – Step-by-step implementation guides for real-world AI Agent scenarios  
🎯 **Pre-built Scenarios** – Ready-to-deploy use cases across HR, IT, Customer Service, and more  
🏗️ **Technical Patterns** – Validated design patterns for Copilot Studio and Azure AI Foundry  
🔗 **Copilot Studio Native** – First-class support for Microsoft Copilot Studio agent development  
⚡ **Accelerated Delivery** – Structured runbooks to reduce time-to-production  
📖 **Comprehensive Guidance** – End-to-end documentation from design to deployment  

## Support & Documentation

- 📖 Full documentation available in each section's README
- 💡 Scenario runbooks with step-by-step implementation instructions
- 🔧 Technical patterns with architecture diagrams and code samples
- 🎓 Best practices and lessons learned from real-world deployments

## 📣 Feedback & Issues

Found a bug? Have a question? We'd love to hear from you — no GitHub experience needed!

| | Action | Description |
|---|---|---|
| 🐛 | [**Report a Bug**](https://github.com/microsoft/ai-agent-runbooks/issues/new?template=bug_report.yml) | Something not working as expected? A broken link, incorrect step, or outdated information? Let us know and we'll look into it. |
| 💬 | [**Ask a Question**](https://github.com/microsoft/ai-agent-runbooks/issues/new?template=question.yml) | Not sure how something works? Ask the community and our team will help. |



## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA), which confirms that you have the right to, and do, grant us the rights to use your contribution. For more details, visit [Contributor License Agreements](https://cla.opensource.microsoft.com).

When you submit a pull request, a CLA bot will automatically determine whether you need to provide a CLA and will update the PR accordingly (for example, by adding a status check or comment). Simply follow the instructions provided by the bot. You only need to complete this process once for all repositories that use our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).

For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos must comply with [Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general).

Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.

Any use of third-party trademarks or logos is subject to the policies of those third parties.

---
