# 🎯 How to Use Scenarios

> **Purpose:** This guide explains how the `01-scenarios/` folder is organized,
> how to navigate scenario-specific runbooks, and how to contribute new scenarios.  

---

## 📂 Scenario Folder Structure Overview

The `01-scenarios/` folder contains **scenario-specific runbooks** for each supported 
agent delivery scenario. Each scenario folder is self-contained and follows a
standardized structure so that any engineer can pick it up and deliver
consistently — regardless of region or prior experience with the scenario.

```
📦 01-scenarios/
├── 📂 Dynamics-365-Monitoring-Agent/        ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 HR-Onboarding-Agent/                  ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-prompts.md
├── 📂 Workplace-Agent/                      ← ✅ Available
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-Prompts.md
├── F&O-User-Onboarding-Agent/               ← 🔨 In progress
│   ├── 📂 0.Resources/
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   ├── 4.Sample-prompts.md
│   └── 5.UAT-Test-Guide.md
├── Scenario04(TBD)/                          ← 🚧 Coming Soon
├── Scenario05(TBD)/                          ← 🚧 Coming Soon
└── README.md
```

> 💡 **Tip:** Always start with the scenario's `Overview.md` to confirm the scenario
> matches your customer's use case before proceeding with delivery.

---

## 📖 Scenario Folder Structure

Each scenario folder follows a standardized 4-file structure to ensure consistency,
reusability, and clarity across all agent deliveries.

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
| [HR-Onboarding-Agent](./HR-Onboarding-Agent/) | Employee Self-Service (HR) | Autonomous agent that helps new hires find HR-related information such as onboarding processes, policies, and employee benefits by leveraging a ServiceNow Knowledge Base. | Microsoft Copilot Studio, ServiceNow Copilot Connector, Power Platform | ✅ Available |
| [Dynamics-365-Monitoring-Agent](./Dynamics-365-Monitoring-Agent/) | System Administration (D365 F&O) | AI-powered monitoring and diagnostics agent for Dynamics 365 Finance & Supply Chain that combines Application Insights telemetry with Copilot Studio to surface anomalies, answer natural-language queries on telemetry data, and guide or automate remediations. | Microsoft Copilot Studio, Dynamics 365 F&O, Azure Application Insights | ✅ Available |
| [Workplace-Agent](./Workplace-Agent/) | Workforce Productivity / Internal Operations | Declarative agent that handles internal FAQ inquiries and application request workflows. It searches a SharePoint FAQ knowledge base using AI-powered semantic search, creates inquiry tickets in Dataverse when no match is found, and automates application approval workflows via Power Automate. | Microsoft Copilot Studio, SharePoint, Dataverse, Power Automate | ✅ Available |
| F&O-User-Onboarding-Agent | User Onboarding (D365 F&O) | Agent that automates Dynamics 365 Finance & Operations user onboarding processes including user provisioning, security role assignment, and environment access configuration. | TBD | 🔨 In Progress |
| Scenario04(TBD) | TBD | TBD | TBD | 🚧 Coming Soon |
| Scenario05(TBD) | TBD | TBD | TBD | 🚧 Coming Soon |

---

## 🔗 Quick Links

- [← Back to Repository Root](../README.md)
- [📂 Overview](../00-overview/)
- [📂 Patterns](../02-patterns/)
- [📂 References](../03-references/)
