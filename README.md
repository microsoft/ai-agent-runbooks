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

- 🧑‍💼 [HR Onboarding Agent](./01-scenarios/HR-Onboarding-Agent/) — Autonomous agent that helps new hires find HR-related information using a ServiceNow Knowledge Base
- 🔧 [Dynamics 365 Monitoring Agent](./01-scenarios/Dynamics-365-Monitoring-Agent/) — AI-powered monitoring and diagnostics agent for D365 Finance & Supply Chain using Application Insights telemetry
- 🛒 [Dynamics 365 PO Generation Agent](./01-scenarios/Dynamics-365-PO-Generation-Agent/) — AI-powered monitoring and diagnostics agent for D365 Finance & Supply Chain using Application Insights telemetry
- 🏢 [Workplace Agent](./01-scenarios/Workplace-Agent/) — Declarative agent that handles internal FAQ inquiries and application request workflows using SharePoint, Dataverse, and Power Automate  
- 🧾 [F&O User Onboarding Agent](./01-scenarios/F&O-User-Onboarding-Agent/) — Autonomous onboarding solution that automates user provisioning in Microsoft Entra ID and Dynamics 365 Finance & Operations, including approval workflows and role assignment.  
- 🧩 [M365 Agent Templates](./01-scenarios/M365-Agent-Templates/) — Collection of pre-built, deploy-ready Microsoft 365 Copilot agents (e.g., Plan My Day, Executive Briefing, Request Tracker) designed to accelerate common workplace scenarios and enable rapid customization.
- ⚙️ [D365 F&SCM Compare & Copy Configurations Agent](./01-scenarios/D365-Finance-&-SupplyChain-Compare-and-Copy-Configurations-Agent) — AI-powered agent that compares and copies module configurations across Dynamics 365 Finance & Supply Chain Management environments, helping administrators identify configuration differences, validate settings, and maintain consistency using the Dynamics 365 ERP MCP server.
- 📊 [DynPerf Performance Agent](./01-scenarios/Dynperf-Performance-Agent) — AI-powered performance diagnostics agent that leverages DynamicsPerf data to help administrators analyze SQL query statistics, detect bottlenecks, and optimize Dynamics 365 environment performance with actionable, natural-language insights.


**Need implementation patterns?** Check out [02-patterns/](./02-patterns/) for proven technical approaches including Copilot Studio orchestration, RAG patterns, and multi-agent design.

- 🧠 [Enterprise RAG Pattern](./02-patterns/Enterprise-RAG-Pattern/) — Multi-source, governed RAG pattern that grounds LLM responses in organizational data (SharePoint, OneDrive, Dataverse, Azure SQL, Fabric, Dynamics CRM) with document-level access control and full citation trails via Azure AI Search
- 🔀 [Agentic Workflow Orchestration](./02-patterns/Agentic-Workflow-Orchestration/) — Multi-agent orchestration pattern for coordinating handoffs between specialized agents, enabling sequential, concurrent, and hierarchical agent collaboration across complex business workflows
- 🧭 [Declarative vs Custom Engine Agent](./02-patterns/Declarative-vs-Custom-engine-agent/) — Decision framework for selecting between Declarative Agents and Copilot Studio Custom Engine 
  Agents, covering three build methods (Agent Builder, Copilot Studio, Agents Toolkit), knowledge scale matrices, reference architectures, use-case scenario library, performance comparisons, and step-by-step implementation runbooks for both agent types and multi-agent composition

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

