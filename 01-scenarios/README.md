# 🎯 How to Use Scenarios

**Purpose:** This guide explains how the `01-scenarios/` folder is organized, how to navigate scenario-specific runbooks, and how to contribute new scenarios.

---

## 📂 Scenario Folder Structure Overview

The `01-scenarios/` folder contains scenario-specific runbooks for each supported agent delivery scenario.  
Each scenario folder is self-contained and follows a standardized structure so that any engineer can pick it up and deliver consistently — regardless of region or prior experience with the scenario.

```
📦 01-scenarios/
├── 📂 Calendar-Request-Approval-Agent/          ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Country-Aware-HR-Knowledge-Agent/         ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Contract-Review-GitHub-Copilot-Harness-Agent/ ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Compliance-Self-Inspection-Agent/     ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Autonomous-Invoice-Orchestration-Agent/ ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Autonomous-Invoice-Orchestration-Agent-GHCP/ ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Agentic-Business-Process-Automation-Agent/ ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 D365-Finance-&-SupplyChain-Compare-and-Copy-Configurations-Agent/ ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Copilot-License-Lifecycle-Agent/     ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 CRM-Account-Planning-Cowork-Agent/   ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Chief-of-Staff-Cowork-Agent/        ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Insights-Analyst-Cowork-Agent/      ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Campaign-Operator-Cowork-Agent/     ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Case-Specialist-Cowork-Agent/       ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Close-Owner-Cowork-Agent/           ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Contract-Counsel-Cowork-Agent/      ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Decision-Maker-Cowork-Agent/        ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Force-Multiplier-Cowork-Agent/      ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Launch-Lead-Cowork-Agent/           ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Number-Owner-Cowork-Agent/          ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Portfolio-Counsel-Cowork-Agent/     ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Procurement-Operator-Cowork-Agent/  ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Quota-Carrier-Cowork-Agent/         ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Service-Ops-Leader-Cowork-Agent/    ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Client-Meeting-Preparation-Agent/    ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Contract-and-Legal-Intelligence-Agent/ ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Document-Processing-and-Extraction-Agent/ ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Email-and-Mailbox-Triage-Agent/      ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Meeting-Intelligence-Agent/          ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Dynamics-365-Monitoring-Agent/       ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Dynamics-365-PO-Generation-Agent/       ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Dynperf-Performance-Agent/           ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 ERP-D365-Inventory-Optimization-Agent/           ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Employee-Self-Service-Agent/         ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 IT-Service-Desk-Insights-Agent/      ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── F&O-User-Onboarding-Agent/                   ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   ├── 4.Sample-prompts.md
│   └── 5.UAT-Test-Guide.md
├── 📂 HR-Onboarding-Agent/                     ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 HR-Onboarding-Agent-GHCP/                ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 M365-Agent/                            ← 📋 Overview Available
│   ├── AI-Learning-Advisor-Agent-Overview.md
│   ├── Executive-Briefing-Agent-Overview.md
│   ├── Know-My-Customer-Agent-Overview.md
│   ├── My-Company-Policy-Agent-Overview.md
│   ├── Personal-News-Digest-Agent-Overview.md
│   ├── Plan-My-Day-Agent-Overview.md
│   ├── Project-Delta-Digest-Agent-Overview.md
│   ├── Request-Tracker-Agent.md
│   ├── SME-Finder-Agent-Overview.md
│   └── Status-Update-Agent-Overview.md
├── 📂 Workplace-Agent/                      ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-Prompts.md
├── LICENSE
├── README.md
└── SECURITY.md
```

> 💡 **Tip:** Always start with the scenario's `Overview.md` to confirm the scenario matches your customer's use case before proceeding with delivery.

> 📌 **Note:** The `M365-Agent-Templates/` folder is an exception to the standard 4-file structure. It contains **Overview documents only** for each agent template. For detailed setup guides, evaluation test plans, agent packages (.zip), and sample data files, please refer to the original [microsoft/m365-agent-templates](https://microsoft.github.io/m365-agent-templates/) repository.

---

## 📖 Scenario Folder Structure

Each scenario folder follows a standardized **4-file structure** to ensure consistency, reusability, and clarity across all agent deliveries.  
Below is the standard structure, using **HR Onboarding Agent** as the reference example:

| File | Description |
|------|-------------|
| `0.Resources/` | Supporting assets such as images, diagrams, and reference files used within the scenario |
| `1.Overview.md` | Business context, objectives, target users, key capabilities, and expected outcomes of the agent scenario |
| `2.Architecture.md` | Solution architecture diagrams, technology stack, integration points, and data flow |
| `3.Runbook.md` | Step-by-step implementation instructions covering configuration, development, testing, and deployment |
| `4.Sample-prompts.md` | Prompt examples, expected behaviour and validation status for topics, trigger phrases, and conversation flows |

### Guidelines for New Scenarios

Apply the same structure to every new scenario, including persona-based Cowork agents:

- Use a descriptive, hyphen-separated folder name ending in `-Agent`, following existing
  scenario naming conventions. Keep the four numbered documents and `0.Resources/` together.
- Describe the business outcome, target users, capabilities, scope exclusions and measurable
  baseline in the overview. Link the reusable patterns used by the scenario.
- Show the actual runtime, identity, source permissions, integrations, data flow and approval
  boundaries in the architecture; do not describe configured skills as separately hosted agents.
- Include prerequisites, configuration, testing, acceptance, operational ownership and rollback
  in the runbook. Start on demand and qualify optional scheduling separately.
- Give each workflow sample prompts with expected behaviour, plus missing-data, permission,
  safety, approval and recovery tests. Distinguish proposed tests from executed evidence.
- For packaged resources, include `0.Resources/README.md` with provenance, versions, contents,
  installation caveats and validation status. Preserve supplied originals and document approved
  working-copy changes rather than silently replacing them.
- Add the scenario to both the folder tree and the catalogue below using the existing folder
  presentation and status labels. Keep deployment and acceptance qualifications in the guidance
  and resource guide rather than introducing a different status convention per scenario.

Use [HR Onboarding](./HR-Onboarding-Agent/1.Overview.md) as the general reference and
[Chief of Staff Cowork](./Chief-of-Staff-Cowork-Agent/1.Overview.md) for configuration-first
Cowork delivery. The persona scenarios use that same model, not an exception to it.

---

## Persona-Based Cowork Scenarios

The twelve persona scenarios follow the same four-document model as Chief of Staff. Each
resource guide links an unchanged supplied plugin ZIP and records actual skill versions,
archive layout, source variants and local inspection status. Documentation and starter-archive
availability do **not** imply supported upload, tenant deployment or completed acceptance.

- Leadership: [Decision Maker](./Decision-Maker-Cowork-Agent/1.Overview.md) and
  [Force Multiplier](./Force-Multiplier-Cowork-Agent/1.Overview.md).
- Sales: [Quota Carrier](./Quota-Carrier-Cowork-Agent/1.Overview.md) and
  [Number Owner](./Number-Owner-Cowork-Agent/1.Overview.md).
- Marketing: [Campaign Operator](./Campaign-Operator-Cowork-Agent/1.Overview.md) and
  [Launch Lead](./Launch-Lead-Cowork-Agent/1.Overview.md).
- Finance/operations: [Close Owner](./Close-Owner-Cowork-Agent/1.Overview.md) and
  [Procurement Operator](./Procurement-Operator-Cowork-Agent/1.Overview.md).
- Legal: [Contract Counsel](./Contract-Counsel-Cowork-Agent/1.Overview.md) and
  [Portfolio Counsel](./Portfolio-Counsel-Cowork-Agent/1.Overview.md).
- Service: [Case Specialist](./Case-Specialist-Cowork-Agent/1.Overview.md) and
  [Service Ops Leader](./Service-Ops-Leader-Cowork-Agent/1.Overview.md).

Reuse shared [Cowork Enablement](../02-patterns/Cowork-Enablement/Cowork-Enablement.md),
[skill delivery](../02-patterns/Cowork-Skill-Delivery-and-Scheduled-Reviews/Cowork-Skill-Delivery-and-Scheduled-Reviews.md),
[cost governance](../02-patterns/Cowork-Spending-Policies-and-Cost-Governance/Cowork-Spending-Policies-and-Cost-Governance.md)
and [pilot gates](../02-patterns/Pilot-to-Scale-Validation-Gates/Pilot-to-Scale-Validation-Gates.md).
Apply [Persona Skill Routing and Scope Isolation](../02-patterns/Persona-Skill-Routing-and-Scope-Isolation/Persona-Skill-Routing-and-Scope-Isolation.md)
before enabling overlapping packs. Each overview maps additional domain-specific patterns.
These are configured skill suites, not twelve new hosted runtimes; existing scenarios remain distinct.

## 📋 Currently Supported Scenarios

**Status refers to repository content, not deployment:** **✅ Available** identifies an available
scenario documentation set; **📋 Overview Available** identifies overview-only content. Neither
label implies tenant deployment or completed acceptance.

For Chief of Staff, Insights Analyst and the twelve persona-based Cowork scenarios, starter
archives are also available in each scenario's resource folder. Review its resource guide for
package versions, layout, compatibility and validation status before installation.

Apply the [Cowork Enablement pattern](../02-patterns/Cowork-Enablement/Cowork-Enablement.md)
within Chief of Staff, Insights Analyst, CRM Account Planning and the persona-based Cowork
scenarios. Tenant enablement is shared delivery guidance, not an additional business scenario.

| Scenario | Type | Description | Platform | Status |
|----------|------|-------------|----------|--------|
| [Decision Maker Cowork Agent](./Decision-Maker-Cowork-Agent/) | Executive Decision Support | Daily attention dashboard, board pre-reads, sourced decision briefs, KPI exceptions and professional relationship briefings; leader/delegate access and exact-action review. | Microsoft 365 Copilot Cowork, Outlook, Teams, SharePoint, OneDrive, Excel Online | ✅ Available |
| [Force Multiplier Cowork Agent](./Force-Multiplier-Cowork-Agent/) | Executive Delegation / Coordination | Week-in-review, cross-org status, inbox decision queues, delegated artifacts and coverage plans; verified delegated access and draft-only preparation. | Microsoft 365 Copilot Cowork, Outlook, Teams, SharePoint, OneDrive | ✅ Available |
| [Quota Carrier Cowork Agent](./Quota-Carrier-Cowork-Agent/) | Seller Productivity | Customer meeting follow-through, RFPs, proposals, QBRs, expansion and Commit-deal review; qualified CRM grounding and seller-approved actions. | Microsoft 365 Copilot Cowork, Dynamics 365 Sales, Outlook, Teams, SharePoint | ✅ Available |
| [Number Owner Cowork Agent](./Number-Owner-Cowork-Agent/) | Sales Leadership / Pipeline | Team-scope Commit review, pipeline-versus-budget explanation and expansion plays with authoritative targets, reconciled values and no seller ranking. | Microsoft 365 Copilot Cowork, Dynamics 365 Sales, SharePoint, Excel Online, Power BI, Microsoft Fabric | ✅ Available |
| [Campaign Operator Cowork Agent](./Campaign-Operator-Cowork-Agent/) | Marketing / Campaign Execution | Content-drift audits, campaign/asset/event coordination and customer-signal synthesis from governed messaging and evidence; no unapproved publication or source edits. | Microsoft 365 Copilot Cowork, Outlook, Teams, SharePoint, Excel Online | ✅ Available |
| [Launch Lead Cowork Agent](./Launch-Lead-Cowork-Agent/) | Marketing / Launch Activation | Audience-specific launch kits, competitive responses, messaging frameworks and results readouts; cited proof, explicit gaps and comms/legal review. | Microsoft 365 Copilot Cowork, Outlook, Teams, SharePoint, OneDrive | ✅ Available |
| [Close Owner Cowork Agent](./Close-Owner-Cowork-Agent/) | Finance / Close and Controls | Weekly reviews, close/variance packs, budget consolidation, reconciliation, audit evidence and market intelligence with authoritative totals and human finance decisions. | Microsoft 365 Copilot Cowork, Excel Online, Power BI, Microsoft Fabric, SharePoint | ✅ Available |
| [Procurement Operator Cowork Agent](./Procurement-Operator-Cowork-Agent/) | Procurement / Operations | Master-data and expense staging, RFQ responses, supplier comparison and regulatory evidence preparation; traceable fields, segregation of duties and no autonomous submission. | Microsoft 365 Copilot Cowork, Excel Online, SharePoint, Outlook, Teams | ✅ Available |
| [Contract Counsel Cowork Agent](./Contract-Counsel-Cowork-Agent/) | Legal / Agreement Lifecycle | Playbook review, precedent drafting, tracked-change assistance and final-draft comparison; qualified counsel owns interpretation, markup decisions and execution. | Microsoft 365 Copilot Cowork, Microsoft 365 Copilot, Word, Outlook, Teams, SharePoint | ✅ Available |
| [Portfolio Counsel Cowork Agent](./Portfolio-Counsel-Cowork-Agent/) | Legal / Portfolio and Matter Evidence | Portfolio terms, obligations/deadlines, contract-family maps, regulatory gaps and case chronologies; clause citations, ethical walls and counsel-owned decisions. | Microsoft 365 Copilot Cowork, Word, Excel Online, SharePoint, Outlook, Teams | ✅ Available |
| [Case Specialist Cowork Agent](./Case-Specialist-Cowork-Agent/) | Service / Complex Cases | Case intake, knowledge-cited replies, diagnosis hypotheses, stalled-case outreach and escalation handoffs; PII controls and specialist-approved actions. | Microsoft 365 Copilot Cowork, SharePoint, OneDrive, Outlook, Teams | ✅ Available |
| [Service Ops Leader Cowork Agent](./Service-Ops-Leader-Cowork-Agent/) | Service / Operations Leadership | SLA triage, service reviews, intervention trackers, customer-feedback themes and team-level coaching; fresh source/timezone checks and no individual agent scoring. | Microsoft 365 Copilot Cowork, Excel Online, SharePoint, Outlook, Teams, Power BI | ✅ Available |
| [Chief-of-Staff-Cowork-Agent](./Chief-of-Staff-Cowork-Agent/) | Leadership Productivity / Executive Readiness | Five configured skills for weekly briefs, executive drafts, leadership packs and observable team-work digests; draft-first approvals, people safety and optional recurring preparation. | Microsoft 365 Copilot Cowork, Outlook, Teams, SharePoint, OneDrive | ✅ Available |
| [Insights Analyst Cowork Agent](./Insights-Analyst-Cowork-Agent/) | Business Analytics / Recurring Reviews | Six configured skills: one router and five consolidated Sales, Finance, Retail, Manufacturing and Service reviews from approved sources; KPI reconciliation, RLS, Markdown and HTML outputs. | Microsoft 365 Copilot Cowork, Power BI, Microsoft Fabric, Excel Online | ✅ Available |
| [Calendar Request Approval Agent](./Calendar-Request-Approval-Agent/1.Overview.md) | Workforce Productivity / Approvals | Confirm calendar requests, enforce request-type authorization and approval policy, and publish to SharePoint and an explicitly authorized Outlook calendar. Includes production recovery guidance. | Microsoft Copilot Studio, Power Automate, SharePoint, Office 365 Outlook | ✅ Available |
| [Country-Aware HR Knowledge Agent](./Country-Aware-HR-Knowledge-Agent/1.Overview.md) | HR Knowledge / Governed Retrieval | Country-scoped SharePoint knowledge with organization-wide and optional restricted lanes, custom ingestion, authenticated retrieval, ACL freshness, and permission-aware access. | Microsoft Copilot Studio, Microsoft Graph, Azure AI Search, Azure OpenAI, SharePoint | ✅ Available |
| [Autonomous-Invoice-Orchestration-Ageny](./Autonomous-Invoice-Orchestration-Agent/) | Payment Approval Automation | Automates the payment request and approval process.| Microsoft Copilot Studios, Power Automate|✅ Available |
| [Autonomous Invoice Orchestration Agent with GHCP Harness](./Autonomous-Invoice-Orchestration-Agent-GHCP/1.Overview.md) | Accounts Payable / Invoice Approval | Email-triggered PDF invoice extraction into Dataverse and a JSON review file, then approval or Finance review, using one skill and two Workflows flows. Implementation and tenant validation are required. | Microsoft Copilot Studio, GitHub Copilot harness, Workflows, Outlook, SharePoint, Dataverse, Approvals | ✅ Available |
| [Agentic Business Process Automation Agent](./Agentic-Business-Process-Automation-Agent/1.Overview.md) | Cross-Domain Operations / Long-Running Document-Based Processes | Reusable event-driven case runtime designed for waits beyond 30 days, a custom HITL console and task APIs for functional/regional teams and role-based allocation, process-agnostic monitoring, and adaptation for claims, contracts, loans, deals, tax, and RFQs using [Agent Forge](https://azure-samples.github.io/faf-landing-page/), an AI-powered software factory for agentic development. Order Processing reference; tenant and elapsed-time validation required. | Microsoft Copilot Studio, GitHub Copilot harness, Workflows, Dataverse, Power Apps code apps, Teams, Outlook | ✅ Available |
| [Copilot-License-Lifecycle-Agent](./Copilot-License-Lifecycle-Agent/) | IT Operations / FinOps for Copilot | Copilot Studio agent that manages the Microsoft 365 Copilot licence estate — inventory, dormancy detection, notification and reclaim with approvals, and waitlist management — with a full audit trail in Dataverse. Also works well as a Copilot Studio enablement asset for customer teams. | Microsoft Copilot Studio, Power Automate, Microsoft Graph, Dataverse | ✅ Available |
| [CRM-Account-Planning-Cowork-Agent](./CRM-Account-Planning-Cowork-Agent/) | Sales Productivity / Revenue Operations | Copilot Cowork connected to the CRM through a purpose-built MCP server that exposes custom objects and composed queries the standard connector cannot reach. Produces branded account plans, QBR decks, and pipeline models as Office artifacts, with approval gates on write-back. | Microsoft 365 Copilot Cowork, MCP server, Salesforce, Organization Asset Library | ✅ Available |
| [Client-Meeting-Preparation-Agent](./Client-Meeting-Preparation-Agent/) | Client Advisory / Relationship Management | Pre-meeting briefings and post-meeting file notes for advisers, relationship managers, and account teams. Assembles positions, relationship history, outstanding items, and watch-outs from the book of record, correspondence, and the client file — with hard advice boundaries, information barrier enforcement, and full citation. Generalises across wealth, banking, insurance, subscriptions, and durable assets. | Microsoft 365 Copilot, Copilot connectors or MCP server, SharePoint, Microsoft Purview | ✅ Available |
| [Contract-and-Legal-Intelligence-Agent](./Contract-and-Legal-Intelligence-Agent/) | Legal Operations / Contract Lifecycle | Clause extraction, risk flagging against documented standard positions, tracked-changes redlines, and evidence retrieval across a document corpus — with a hard legal-advice boundary and a qualified human on every decision. Covers DPA and NDA review, negotiation support, resolutions, and claim evidence assembly. | Copilot Studio, Microsoft Foundry / Document Intelligence, SharePoint, Word | ✅ Available |
| [Contract Review with GitHub Copilot Harness](./Contract-Review-GitHub-Copilot-Harness-Agent/1.Overview.md) | Legal Operations / Contract Review | Reference design for evidence-linked clause comparison and approved fallback drafts; authorized read-only tools, a reusable review skill, and mandatory qualified counsel review. No exported agent or executed acceptance evidence is included. | Microsoft Copilot Studio, GitHub Copilot Harness, skills, controlled workflows | ✅ Available |
| [Compliance Self-Inspection Agent](./Compliance-Self-Inspection-Agent/1.Overview.md) | Compliance Risk Awareness / Employee Self-Inspection | Employee-initiated fair-trade / antitrust checks of their own OneDrive documents and Outlook mail; deterministic attention ratings, personal result sheets, and metadata-only completion reporting to Legal. An awareness tool, not enforcement or legal advice. | Microsoft Copilot Studio, Power Automate, Dataverse, OneDrive for Business, Outlook, SharePoint, Excel Online | ✅ Available |
| [Document-Processing-and-Extraction-Agent](./Document-Processing-and-Extraction-Agent/) | Operations / Back-Office Automation | Classify, extract, validate, and route high-volume documents — quotes, invoices, order confirmations, billing statements, work instructions. Multilingual OCR, validation against master data, confidence-based routing to human review, and output shaped to whatever the downstream system actually accepts (including when it has no API). | Microsoft Foundry / Document Intelligence, Content Understanding, Copilot Studio, Power Automate | ✅ Available |
| [Email-and-Mailbox-Triage-Agent](./Email-and-Mailbox-Triage-Agent/) | Shared Mailbox Operations / Customer Service | Classifies, prioritises, routes, and drafts responses for high-volume shared mailboxes. Covers classification taxonomy design, confidence thresholds, the draft-never-send boundary, and the ticket or case handoff. The single most frequent use case in the portfolio. | Copilot Studio, Power Automate, Exchange Online, Microsoft Foundry (for attachments) | ✅ Available |
| [Meeting-Intelligence-Agent](./Meeting-Intelligence-Agent/) | Workforce Productivity / Governance | Extracts decisions, actions, and owners from meeting transcripts with a hard evidence rule, deduplicates across recurring series, and tracks commitments to closure. Includes the consent and works-council position, the excluded-meeting categories, and the invented-action release gate. | Microsoft 365 Copilot, Copilot Studio, Microsoft Teams, Microsoft Graph, Dataverse | ✅ Available |
| [D365-Finance-&-SupplyChain-Compare-and-Copy-Configurations-Agent](./D365-Finance-&-SupplyChain-Compare-and-Copy-Configurations-Agent/) | ERP Configuration Management (D365 F&SCM) | AI-powered agent that compares and copies module configurations across Dynamics 365 Finance & Supply Chain Management environments. Helps administrators identify configuration differences between companies, validate settings during implementations, and maintain consistency across environments using the Dynamics 365 ERP MCP server. | Microsoft Copilot Studio, Dynamics 365 F&SCM, Dynamics 365 ERP MCP Server | ✅ Available |
| [Dynamics-365-Monitoring-Agent](./Dynamics-365-Monitoring-Agent/) | System Administration (D365 F&O) | AI-powered monitoring and diagnostics agent for Dynamics 365 Finance & Supply Chain that combines Application Insights telemetry with Copilot Studio to surface anomalies, answer natural-language queries on telemetry data, and guide or automate remediations. | Microsoft Copilot Studio, Dynamics 365 F&O, Azure Application Insights | ✅ Available |
| [Dynamics-365-PO-Generation-Agent](./Dynamics-365-PO-Generation-Agent/) | System Administration (D365 F&O) | Autonomous agent that creates a purchase order autonomously or manually |Microsoft Copilot Studios, Dynamics 365 F&O | ✅ Available |
| [Dynperf-Performance-Agent](./Dynperf-Performance-Agent) | Performance Diagnostics (D365) | AI-powered performance analysis agent that leverages DynamicsPerf data to help administrators diagnose performance issues, analyze SQL query statistics, identify bottlenecks, and provide actionable recommendations for optimizing Dynamics 365 environments. | Microsoft Copilot Studio, Dynamics 365, DynamicsPerf, Azure Application Insights | ✅ Available |
| [ERP-D365-Inventory-Optimization-Agent](./ERP-D365-Inventory-Optimization-Agent/) | Generates reports of inventory data (D365 F&O) |Interactive agent that generates reports on Inventory from D365 F&O for inventory managers and other stakeholders to get current information, predictions, and other analytics around their inventory data |Microsoft Copilot Studios, Dynamics 365 F&O | ✅ Available |
| [Employee-Self-Service-Agent](./Employee-Self-Service-Agent/) | Employee Experience (HR + IT front door) | One conversational entry point in Microsoft 365 Copilot for HR and IT support, grounded on the HRIS, ITSM, and SharePoint. Covers the qualification, content architecture, and readiness work that make up most of the delivery effort. | Microsoft 365 Copilot, Copilot connectors (ServiceNow / Workday / SuccessFactors), SharePoint, Copilot Studio | ✅ Available |
| [IT-Service-Desk-Insights-Agent](./IT-Service-Desk-Insights-Agent/) | IT Service Management / Employee Support | Declarative agent grounded on ServiceNow knowledge and catalog content. Answers how-to and catalog questions and performs sentiment and theme analysis over ticket text, with permission-trimmed retrieval driven by ServiceNow user criteria. | Microsoft 365 Copilot, Agent Builder, ServiceNow Knowledge + Catalog Copilot connectors | ✅ Available |
| [F&O-User-Onboarding-Agent](./F&O-User-Onboarding-Agent/) | ERP Administration / User Lifecycle | Automates onboarding of new users into Dynamics 365 Finance & Operations by provisioning accounts, assigning roles, and managing approval workflows using AI-driven orchestration. | Microsoft Copilot Studio, Dynamics 365 F&O, Azure AD, Power Automate, Microsoft Teams | ✅ Available |
| [HR-Onboarding-Agent](./HR-Onboarding-Agent/) | Employee Self-Service (HR) | Autonomous agent that helps new hires find HR-related information such as onboarding processes, policies, and employee benefits by leveraging a ServiceNow Knowledge Base. | Microsoft Copilot Studio, ServiceNow Copilot Connector, Power Platform | ✅ Available |
| [HR Onboarding Agent with GHCP Harness](./HR-Onboarding-Agent-GHCP/1.Overview.md) | Employee Self-Service (HR) | Normal HR chat, onboarding plans and connected user-mailbox replies with two skills. Outlook sends the agent's HTML without per-message approval; development scope and limitations are documented. | Microsoft Copilot Studio, GitHub Copilot harness, Workflows, Outlook, ServiceNow knowledge | ✅ Available |
| [M365-Agent](./M365-Agent/) | Pre-configured Agent Templates | Pre-configured, deploy-ready AI agent templates for Microsoft 365 built by the Copilot Agents & Platform Ecosystem (CAPE) team. This folder contains Overview documents for the following **10** agent templates:<br>• [AI Learning Advisor Agent](./M365-Agent/AI-Learning-Advisor-Agent-Overview.md) — Personal AI teaching assistant for the Microsoft stack, delivering step-by-step guidance and learning plans grounded in Microsoft Learn<br>• [Executive Briefing Agent](./M365-Agent/Executive-Briefing-Agent-Overview.md) — Generates concise leadership briefings with account health, key metrics, and recommended talking points<br>• [Know My Customer Agent](./M365-Agent/Know-My-Customer-Agent-Overview.md) — Surfaces customer insights, account history, and relationship context from Microsoft 365 data<br>• [My Company Policy Agent](./M365-Agent/My-Company-Policy-Agent-Overview.md) — Provides employees with trusted, conversational access to company policies, HR information, and benefits<br>• [Personal News Digest Agent](./M365-Agent/Personal-News-Digest-Agent-Overview.md) — Filters corporate broadcasts into a personalized, role- and location-aware digest of what truly matters<br>• [Plan My Day Agent](./M365-Agent/Plan-My-Day-Agent-Overview.md) — Pulls calendar, emails, and tasks to help employees prioritize their day<br>• [Project Delta Digest Agent](./M365-Agent/Project-Delta-Digest-Agent-Overview.md) — Generates structured daily/weekly digests of project activity including shipped items, risks, and blockers<br>• [Request Tracker Agent](./M365-Agent/Request-Tracker-Agent.md) — Tracks and manages internal requests and approval workflows<br>• [SME Finder Agent](./M365-Agent/SME-Finder-Agent-Overview.md) — Surfaces the most relevant subject matter experts using real M365 work signals with ready-to-use introduction messages<br>• [Status Update Agent](./M365-Agent/Status-Update-Agent-Overview.md) — Turns Microsoft 365 activity into clear status summaries, brag docs, and manager emails | Microsoft 365 Copilot, Copilot Studio | 📋 Overview Available |
| [Workplace-Agent](./Workplace-Agent/) | Workforce Productivity / Internal Operations | AI-powered agent that handles internal inquiries (FAQ) and application requests (e.g., equipment loans, expense approvals) using SharePoint, Dataverse, and Power Automate. | Microsoft Copilot Studio, SharePoint, Dataverse, Power Automate | ✅ Available |

---

## 🔗 Quick Links

- [← Back to Repository Root](../README.md)
- [📂 Overview](../00-overview/)
- [📂 Patterns](../02-patterns/)
- [📂 References](../03-references/)
