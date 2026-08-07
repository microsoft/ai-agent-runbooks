# 🎯 How to Use Scenarios

**Purpose:** This guide explains how the `01-scenarios/` folder is organized, how to navigate scenario-specific runbooks, and how to contribute new scenarios.

---

## 📂 Scenario Folder Structure Overview

The `01-scenarios/` folder contains scenario-specific runbooks for each supported agent delivery scenario.  
Each scenario folder is self-contained and follows a standardized structure so that any engineer can pick it up and deliver consistently — regardless of region or prior experience with the scenario.

```
📦 01-scenarios/
├── 📂 Autonomous-Invoice-Orchestration-Agent/ ← ✅ Available
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
├── 📂 Client-Meeting-Preparation-Agent/    ← ✅ Available
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
| `4.Sample-prompts.md` | Validated prompt examples for agent topics, trigger phrases, and conversation flows |

---

## 📋 Currently Supported Scenarios

| Scenario | Type | Description | Platform | Status |
|----------|------|-------------|----------|--------|
| [Autonomous-Invoice-Orchestration-Ageny](./Autonomous-Invoice-Orchestration-Agent/) | Payment Approval Automation | Automates the payment request and approval process.| Microsoft Copilot Studios, Power Automate|✅ Available |
| [Copilot-License-Lifecycle-Agent](./Copilot-License-Lifecycle-Agent/) | IT Operations / FinOps for Copilot | Copilot Studio agent that manages the Microsoft 365 Copilot licence estate — inventory, dormancy detection, notification and reclaim with approvals, and waitlist management — with a full audit trail in Dataverse. Also works well as a Copilot Studio enablement asset for customer teams. | Microsoft Copilot Studio, Power Automate, Microsoft Graph, Dataverse | ✅ Available |
| [CRM-Account-Planning-Cowork-Agent](./CRM-Account-Planning-Cowork-Agent/) | Sales Productivity / Revenue Operations | Copilot Cowork connected to the CRM through a purpose-built MCP server that exposes custom objects and composed queries the standard connector cannot reach. Produces branded account plans, QBR decks, and pipeline models as Office artifacts, with approval gates on write-back. | Microsoft 365 Copilot Cowork, MCP server, Salesforce, Organization Asset Library | ✅ Available |
| [Client-Meeting-Preparation-Agent](./Client-Meeting-Preparation-Agent/) | Client Advisory / Relationship Management | Pre-meeting briefings and post-meeting file notes for advisers, relationship managers, and account teams. Assembles positions, relationship history, outstanding items, and watch-outs from the book of record, correspondence, and the client file — with hard advice boundaries, information barrier enforcement, and full citation. Generalises across wealth, banking, insurance, subscriptions, and durable assets. | Microsoft 365 Copilot, Copilot connectors or MCP server, SharePoint, Microsoft Purview | ✅ Available |
| [D365-Finance-&-SupplyChain-Compare-and-Copy-Configurations-Agent](./D365-Finance-&-SupplyChain-Compare-and-Copy-Configurations-Agent/) | ERP Configuration Management (D365 F&SCM) | AI-powered agent that compares and copies module configurations across Dynamics 365 Finance & Supply Chain Management environments. Helps administrators identify configuration differences between companies, validate settings during implementations, and maintain consistency across environments using the Dynamics 365 ERP MCP server. | Microsoft Copilot Studio, Dynamics 365 F&SCM, Dynamics 365 ERP MCP Server | ✅ Available |
| [Dynamics-365-Monitoring-Agent](./Dynamics-365-Monitoring-Agent/) | System Administration (D365 F&O) | AI-powered monitoring and diagnostics agent for Dynamics 365 Finance & Supply Chain that combines Application Insights telemetry with Copilot Studio to surface anomalies, answer natural-language queries on telemetry data, and guide or automate remediations. | Microsoft Copilot Studio, Dynamics 365 F&O, Azure Application Insights | ✅ Available |
| [Dynamics-365-PO-Generation-Agent](./Dynamics-365-PO-Generation-Agent/) | System Administration (D365 F&O) | Autonomous agent that creates a purchase order autonomously or manually |Microsoft Copilot Studios, Dynamics 365 F&O | ✅ Available |
| [Dynperf-Performance-Agent](./Dynperf-Performance-Agent) | Performance Diagnostics (D365) | AI-powered performance analysis agent that leverages DynamicsPerf data to help administrators diagnose performance issues, analyze SQL query statistics, identify bottlenecks, and provide actionable recommendations for optimizing Dynamics 365 environments. | Microsoft Copilot Studio, Dynamics 365, DynamicsPerf, Azure Application Insights | ✅ Available |
| [ERP-D365-Inventory-Optimization-Agent](./ERP-D365-Inventory-Optimization-Agent/) | Generates reports of inventory data (D365 F&O) |Interactive agent that generates reports on Inventory from D365 F&O for inventory managers and other stakeholders to get current information, predictions, and other analytics around their inventory data |Microsoft Copilot Studios, Dynamics 365 F&O | ✅ Available |
| [Employee-Self-Service-Agent](./Employee-Self-Service-Agent/) | Employee Experience (HR + IT front door) | One conversational entry point in Microsoft 365 Copilot for HR and IT support, grounded on the HRIS, ITSM, and SharePoint. Covers the qualification, content architecture, and readiness work that make up most of the delivery effort. | Microsoft 365 Copilot, Copilot connectors (ServiceNow / Workday / SuccessFactors), SharePoint, Copilot Studio | ✅ Available |
| [IT-Service-Desk-Insights-Agent](./IT-Service-Desk-Insights-Agent/) | IT Service Management / Employee Support | Declarative agent grounded on ServiceNow knowledge and catalog content. Answers how-to and catalog questions and performs sentiment and theme analysis over ticket text, with permission-trimmed retrieval driven by ServiceNow user criteria. | Microsoft 365 Copilot, Agent Builder, ServiceNow Knowledge + Catalog Copilot connectors | ✅ Available |
| [F&O-User-Onboarding-Agent](./F&O-User-Onboarding-Agent/) | ERP Administration / User Lifecycle | Automates onboarding of new users into Dynamics 365 Finance & Operations by provisioning accounts, assigning roles, and managing approval workflows using AI-driven orchestration. | Microsoft Copilot Studio, Dynamics 365 F&O, Azure AD, Power Automate, Microsoft Teams | ✅ Available |
| [HR-Onboarding-Agent](./HR-Onboarding-Agent/) | Employee Self-Service (HR) | Autonomous agent that helps new hires find HR-related information such as onboarding processes, policies, and employee benefits by leveraging a ServiceNow Knowledge Base. | Microsoft Copilot Studio, ServiceNow Copilot Connector, Power Platform | ✅ Available |
| [M365-Agent](./M365-Agent/) | Pre-configured Agent Templates | Pre-configured, deploy-ready AI agent templates for Microsoft 365 built by the Copilot Agents & Platform Ecosystem (CAPE) team. This folder contains Overview documents for the following **10** agent templates:<br>• [AI Learning Advisor Agent](./M365-Agent-Templates/AI-Learning-Advisor-Agent-Overview.md) — Personal AI teaching assistant for the Microsoft stack, delivering step-by-step guidance and learning plans grounded in Microsoft Learn<br>• [Executive Briefing Agent](./M365-Agent-Templates/Executive-Briefing-Agent-Overview.md) — Generates concise leadership briefings with account health, key metrics, and recommended talking points<br>• [Know My Customer Agent](./M365-Agent-Templates/Know-My-Customer-Agent-Overview.md) — Surfaces customer insights, account history, and relationship context from Microsoft 365 data<br>• [My Company Policy Agent](./M365-Agent-Templates/My-Company-Policy-Agent-Overview.md) — Provides employees with trusted, conversational access to company policies, HR information, and benefits<br>• [Personal News Digest Agent](./M365-Agent-Templates/Personal-News-Digest-Agent-Overview.md) — Filters corporate broadcasts into a personalized, role- and location-aware digest of what truly matters<br>• [Plan My Day Agent](./M365-Agent-Templates/Plan-My-Day-Agent-Overview.md) — Pulls calendar, emails, and tasks to help employees prioritize their day<br>• [Project Delta Digest Agent](./M365-Agent-Templates/Project-Delta-Digest-Agent-Overview.md) — Generates structured daily/weekly digests of project activity including shipped items, risks, and blockers<br>• [Request Tracker Agent](./M365-Agent-Templates/Request-Tracker-Agent.md) — Tracks and manages internal requests and approval workflows<br>• [SME Finder Agent](./M365-Agent-Templates/SME-Finder-Agent-Overview.md) — Surfaces the most relevant subject matter experts using real M365 work signals with ready-to-use introduction messages<br>• [Status Update Agent](./M365-Agent-Templates/Status-Update-Agent-Overview.md) — Turns Microsoft 365 activity into clear status summaries, brag docs, and manager emails | Microsoft 365 Copilot, Copilot Studio | 📋 Overview Available |
| [Workplace-Agent](./Workplace-Agent/) | Workforce Productivity / Internal Operations | AI-powered agent that handles internal inquiries (FAQ) and application requests (e.g., equipment loans, expense approvals) using SharePoint, Dataverse, and Power Automate. | Microsoft Copilot Studio, SharePoint, Dataverse, Power Automate | ✅ Available |

---

## 🔗 Quick Links

- [← Back to Repository Root](../README.md)
- [📂 Overview](../00-overview/)
- [📂 Patterns](../02-patterns/)
- [📂 References](../03-references/)
