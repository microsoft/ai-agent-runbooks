/* =============================================================
   AI Agent Runbooks — content catalogue
   Single source of truth for the site. Add an entry here when a
   new scenario, pattern or reference lands in the repository.
   ============================================================= */

const REPO = "https://github.com/spetren/ai-agent-runbooks";
const TREE = REPO + "/tree/main";
const BLOB = REPO + "/blob/main";

const SCENARIOS = [
  {
    id: "Autonomous-Invoice-Orchestration-Agent",
    title: "Autonomous Invoice Orchestration Agent",
    type: "Payment Approval Automation",
    icon: "🧾",
    desc: "Autonomous agent that helps employees raise payment request forms and drives them through manager approval, automating the invoice-to-approval path end to end.",
    tech: ["Microsoft Copilot Studio", "Power Automate"],
    status: "Available"
  },
  {
    id: "Calendar-Request-Approval-Agent",
    title: "Calendar Request Approval Agent",
    type: "Workforce Productivity / Approvals",
    icon: "📅",
    desc: "Draft guide for conversational calendar intake, deterministic approval and routing, and SharePoint/Outlook publication. Includes identity, privacy and recovery gates; not an importable solution.",
    tech: ["Microsoft Copilot Studio", "Power Automate", "SharePoint", "Office 365 Outlook"],
    status: "Draft"
  },
  {
    id: "Copilot-License-Lifecycle-Agent",
    title: "Copilot Licence Lifecycle Agent",
    type: "IT Operations / FinOps for Copilot",
    icon: "🎟️",
    desc: "Manages the Microsoft 365 Copilot licence estate — inventory, dormancy detection, notification, reclaim with approvals and waitlist management — with a full audit trail in Dataverse.",
    tech: ["Microsoft Copilot Studio", "Power Automate", "Microsoft Graph", "Dataverse"],
    status: "Available"
  },
  {
    id: "Country-Aware-HR-Knowledge-Agent",
    title: "Country-Aware HR Knowledge Agent",
    type: "HR Knowledge / Governed Retrieval",
    icon: "🧑‍💼",
    desc: "Draft reference design for country-scoped SharePoint knowledge with organization-wide and optional restricted lanes. Requires custom ingestion and authenticated query-time authorization; deployment artifacts are not included.",
    tech: ["Microsoft Copilot Studio", "SharePoint", "Microsoft Graph", "Azure AI Search", "Azure OpenAI"],
    status: "Draft"
  },
  {
    id: "CRM-Account-Planning-Cowork-Agent",
    title: "CRM Account Planning Cowork Agent",
    type: "Sales Productivity / Revenue Operations",
    icon: "💼",
    desc: "Copilot Cowork connected to the CRM through a purpose-built MCP server that reaches custom objects the standard connector cannot. Produces branded account plans, QBR decks and pipeline models, with approval gates on write-back.",
    tech: ["Microsoft 365 Copilot Cowork", "MCP Server", "Salesforce", "Organization Asset Library"],
    status: "Available"
  },
  {
    id: "Client-Meeting-Preparation-Agent",
    title: "Client Meeting Preparation Agent",
    type: "Client Advisory / Relationship Management",
    icon: "🤝",
    desc: "Pre-meeting briefings and post-meeting file notes for advisers and relationship managers, assembled from the book of record, correspondence and the client file — with hard advice boundaries, information barrier enforcement and full citation.",
    tech: ["Microsoft 365 Copilot", "Copilot Connectors", "MCP Server", "SharePoint", "Microsoft Purview"],
    status: "Available"
  },
  {
    id: "Contract-and-Legal-Intelligence-Agent",
    title: "Contract & Legal Intelligence Agent",
    type: "Legal Operations / Contract Lifecycle",
    icon: "⚖️",
    desc: "Clause extraction, risk flagging against documented standard positions, tracked-changes redlines and evidence retrieval across a document corpus — with a hard legal-advice boundary and a qualified human on every decision.",
    tech: ["Microsoft Copilot Studio", "Microsoft Foundry", "Document Intelligence", "SharePoint", "Word"],
    status: "Available"
  },
  {
    id: "D365-Finance-&-SupplyChain-Compare-and-Copy-Configurations-Agent",
    title: "D365 F&SCM Compare & Copy Configurations Agent",
    type: "ERP Configuration Management (D365 F&SCM)",
    icon: "⚙️",
    desc: "Compares and copies module configurations across Dynamics 365 Finance & Supply Chain environments so administrators can spot differences, validate settings during implementation and hold consistency, using the Dynamics 365 ERP MCP server.",
    tech: ["Microsoft Copilot Studio", "Dynamics 365 F&SCM", "MCP Server"],
    status: "Available"
  },
  {
    id: "Document-Processing-and-Extraction-Agent",
    title: "Document Processing & Extraction Agent",
    type: "Operations / Back-Office Automation",
    icon: "📄",
    desc: "Classify, extract, validate and route high-volume documents at production accuracy. Multilingual OCR, validation against master data, confidence-based human review, and output shaped to whatever the downstream system actually accepts.",
    tech: ["Microsoft Foundry", "Document Intelligence", "Content Understanding", "Microsoft Copilot Studio", "Power Automate"],
    status: "Available"
  },
  {
    id: "Dynamics-365-Monitoring-Agent",
    title: "Dynamics 365 Monitoring Agent",
    type: "System Administration (D365 F&O)",
    icon: "🔧",
    desc: "Monitoring and diagnostics for Dynamics 365 Finance & Supply Chain that pairs Application Insights telemetry with Copilot Studio to surface anomalies, answer natural-language telemetry questions and guide remediation.",
    tech: ["Microsoft Copilot Studio", "Dynamics 365 F&O", "Azure Application Insights"],
    status: "Available"
  },
  {
    id: "Dynamics-365-PO-Generation-Agent",
    title: "Dynamics 365 PO Generation Agent",
    type: "System Administration (D365 F&O)",
    icon: "🛒",
    desc: "Autonomous agent that creates a purchase order either autonomously or under manual direction, removing repetitive procurement data entry from the ERP.",
    tech: ["Microsoft Copilot Studio", "Dynamics 365 F&O"],
    status: "Available"
  },
  {
    id: "Dynperf-Performance-Agent",
    title: "DynPerf Performance Agent",
    type: "Performance Diagnostics (D365)",
    icon: "📊",
    desc: "Leverages DynamicsPerf data to diagnose performance issues, analyse SQL query statistics, identify bottlenecks and return actionable, natural-language optimisation recommendations.",
    tech: ["Microsoft Copilot Studio", "Dynamics 365", "DynamicsPerf", "Azure Application Insights"],
    status: "Available"
  },
  {
    id: "ERP-D365-Inventory-Optimization-Agent",
    title: "ERP D365 Inventory Optimization Agent",
    type: "Inventory Analytics (D365 F&O)",
    icon: "📈",
    desc: "Interactive agent that generates inventory reports from D365 F&O so inventory managers and stakeholders get current stock information, predictions and analytics on demand.",
    tech: ["Microsoft Copilot Studio", "Dynamics 365 F&O"],
    status: "Available"
  },
  {
    id: "Email-and-Mailbox-Triage-Agent",
    title: "Email & Mailbox Triage Agent",
    type: "Shared Mailbox Operations / Customer Service",
    icon: "📬",
    desc: "Classifies, prioritises, routes and drafts responses for high-volume shared mailboxes. Covers taxonomy design, confidence thresholds, the draft-never-send boundary and the ticket handoff. The most requested use case in the portfolio.",
    tech: ["Microsoft Copilot Studio", "Power Automate", "Exchange Online", "Microsoft Foundry"],
    status: "Available"
  },
  {
    id: "Employee-Self-Service-Agent",
    title: "Employee Self-Service Agent",
    type: "Employee Experience (HR + IT front door)",
    icon: "🧑‍💻",
    desc: "One conversational front door in Microsoft 365 Copilot for HR and IT support, grounded on the HRIS, ITSM and SharePoint. Includes the qualification, content architecture and readiness work that dominates this delivery.",
    tech: ["Microsoft 365 Copilot", "Copilot Connectors", "ServiceNow", "Workday", "SharePoint", "Microsoft Copilot Studio"],
    status: "Available"
  },
  {
    id: "F&O-User-Onboarding-Agent",
    title: "F&O User Onboarding Agent",
    type: "ERP Administration / User Lifecycle",
    icon: "🪪",
    desc: "Automates onboarding of new users into Dynamics 365 Finance & Operations — provisioning accounts in Microsoft Entra ID, assigning roles and running approval workflows through AI-driven orchestration.",
    tech: ["Microsoft Copilot Studio", "Dynamics 365 F&O", "Microsoft Entra ID", "Power Automate", "Microsoft Teams"],
    status: "Available"
  },
  {
    id: "HR-Onboarding-Agent",
    title: "HR Onboarding Agent",
    type: "Employee Self-Service (HR)",
    icon: "🧑‍💼",
    desc: "Autonomous agent that helps new hires find HR information — onboarding processes, policies and benefits — by grounding on a ServiceNow Knowledge Base.",
    tech: ["Microsoft Copilot Studio", "Copilot Connectors", "ServiceNow", "Power Platform"],
    status: "Available"
  },
  {
    id: "IT-Service-Desk-Insights-Agent",
    title: "IT Service Desk Insights Agent",
    type: "IT Service Management / Employee Support",
    icon: "🎫",
    desc: "Declarative agent grounded on ServiceNow knowledge and catalog content. Answers how-to and catalog questions and runs sentiment and theme analysis over ticket text, with permission-trimmed retrieval.",
    tech: ["Microsoft 365 Copilot", "Agent Builder", "Copilot Connectors", "ServiceNow"],
    status: "Available"
  },
  {
    id: "M365-Agent",
    title: "M365 Agent Templates",
    type: "Pre-configured Agent Templates",
    icon: "🧩",
    desc: "Ten pre-configured, deploy-ready Microsoft 365 Copilot agent templates from the CAPE team — Plan My Day, Executive Briefing, Request Tracker, SME Finder and more — designed for rapid customisation.",
    tech: ["Microsoft 365 Copilot", "Microsoft Copilot Studio"],
    status: "Overview Available"
  },
  {
    id: "Meeting-Intelligence-Agent",
    title: "Meeting Intelligence Agent",
    type: "Workforce Productivity / Governance",
    icon: "🗓️",
    desc: "Extracts decisions, actions and owners from meeting transcripts under a hard evidence rule, deduplicates across recurring series and tracks commitments to closure. Includes the consent position and the invented-action release gate.",
    tech: ["Microsoft 365 Copilot", "Microsoft Copilot Studio", "Microsoft Teams", "Microsoft Graph", "Dataverse"],
    status: "Available"
  },
  {
    id: "Workplace-Agent",
    title: "Workplace Agent",
    type: "Workforce Productivity / Internal Operations",
    icon: "🏢",
    desc: "Handles internal FAQ inquiries and application requests — equipment loans, expense approvals — using SharePoint, Dataverse and Power Automate.",
    tech: ["Microsoft Copilot Studio", "SharePoint", "Dataverse", "Power Automate"],
    status: "Available"
  }
];

const PATTERNS = [
  {
    id: "Enterprise-RAG-Pattern",
    file: "Enterprise-RAG-Pattern/Enterprise-RAG-Pattern.md",
    title: "Enterprise RAG Pattern",
    icon: "🧠",
    theme: "Grounding & Knowledge",
    desc: "Multi-source, governed retrieval-augmented generation. Grounds responses in organizational data with document-level access control and full citation trails.",
    tech: ["Microsoft Copilot Studio", "Azure AI Search", "Azure OpenAI", "Foundry IQ"],
    status: "Available"
  },
  {
    id: "Agentic-Workflow-Orchestration",
    file: "Agentic-Workflow-Orchestration/Agentic-Workflow-Orchestration.md",
    title: "Agentic Workflow Orchestration",
    icon: "🔀",
    theme: "Architecture & Design",
    desc: "Coordinating handoffs between specialised agents — sequential, concurrent and hierarchical collaboration across complex, multi-step business workflows.",
    tech: ["Microsoft Copilot Studio", "Microsoft Foundry", "Agent Framework"],
    status: "Available"
  },
  {
    id: "Declarative-vs-Custom-engine-agent",
    file: "Declarative-vs-Custom-engine-agent/Declarative-Agents-vs-Copilot-Studio-Custom-Engine-Agents.md",
    title: "Declarative vs Custom Engine Agent",
    icon: "🧭",
    theme: "Architecture & Design",
    desc: "Decision framework for choosing between declarative agents and Copilot Studio custom engine agents — three build methods, knowledge scale matrices, reference architectures and full implementation runbooks for both.",
    tech: ["Microsoft 365 Copilot", "Microsoft Copilot Studio", "Agent Builder", "Agents Toolkit", "Azure OpenAI", "Azure AI Search"],
    status: "Available"
  },
  {
    id: "Copilot-Connector-Knowledge-Onboarding",
    file: "Copilot-Connector-Knowledge-Onboarding/Copilot-Connector-Knowledge-Onboarding.md",
    title: "Copilot Connector Knowledge Onboarding",
    icon: "🔌",
    theme: "Grounding & Knowledge",
    desc: "Getting third-party enterprise content into the Microsoft Graph index with correct ACLs — connector selection, source permission modelling, identity mapping, staged rollout and the permission evidence that unblocks security review.",
    tech: ["Copilot Connectors", "Microsoft Graph", "ServiceNow", "Jira", "Confluence", "Salesforce", "Workday"],
    status: "Available"
  },
  {
    id: "MCP-Federated-Connectors",
    file: "MCP-Federated-Connectors/MCP-Federated-Connectors.md",
    title: "MCP Federated Connectors",
    icon: "🔎",
    theme: "Grounding & Knowledge",
    desc: "Live, read-only external retrieval in supported Microsoft 365 Copilot experiences without a source index. Gallery and custom onboarding, complex-authentication gaps, private-only on-premises blockers, and host-level acceptance.",
    tech: ["Copilot Connectors", "MCP Server", "Microsoft 365 Copilot", "Microsoft Entra", "OAuth 2.0"],
    status: "Available"
  },
  {
    id: "Agent-Governance-and-Rollout-Control-Plane",
    file: "Agent-Governance-and-Rollout-Control-Plane/Agent-Governance-and-Rollout-Control-Plane.md",
    title: "Agent Governance & Rollout Control Plane",
    icon: "🛡️",
    theme: "Governance & Operations",
    desc: "Separating agent creation from consumption, controlling sharing scope, establishing an approval route and building the inventory and audit position enterprise rollouts depend on. The most common blocker between a working agent and a deployed one.",
    tech: ["Microsoft 365 admin center", "Power Platform admin center", "Microsoft Entra", "Microsoft Purview", "Microsoft Agent 365"],
    status: "Available"
  },
  {
    id: "Copilot-Credits-Cost-Control",
    file: "Copilot-Credits-Cost-Control/Copilot-Credits-Cost-Control.md",
    title: "Copilot Credits & Cost Control",
    icon: "💳",
    theme: "Governance & Operations",
    desc: "Consumption rates per agent feature, what enforcement actually stops versus only alerts, capacity allocation by environment, per-agent caps, testing budgets and chargeback design.",
    tech: ["Microsoft Copilot Studio", "Power Platform admin center", "Azure"],
    status: "Available"
  },
  {
    id: "Grounding-and-Response-Quality-Remediation",
    file: "Grounding-and-Response-Quality-Remediation/Grounding-and-Response-Quality-Remediation.md",
    title: "Grounding & Response Quality Remediation",
    icon: "🔬",
    theme: "Grounding & Knowledge",
    desc: "An ordered diagnostic ladder for agents that are built, connected and still answering badly — reproducibility, user specificity, retrievability, content readability, retrieval path, instructions, platform change and architectural fit.",
    tech: ["Microsoft 365 Copilot", "Microsoft Copilot Studio", "Microsoft Graph", "Copilot Agent Kit"],
    status: "Available"
  },
  {
    id: "Agent-Publishing-and-Channel-Deployment",
    file: "Agent-Publishing-and-Channel-Deployment/Agent-Publishing-and-Channel-Deployment.md",
    title: "Agent Publishing & Channel Deployment",
    icon: "🚢",
    theme: "Delivery & Deployment",
    desc: "The last mile: licensing prerequisites per channel, channel-specific behaviour differences, authentication and action attribution, and rich-content rendering across Microsoft 365 Copilot, Teams, SharePoint, web and third-party channels.",
    tech: ["Microsoft Copilot Studio", "Microsoft 365 Copilot", "Microsoft Teams", "SharePoint", "Microsoft Entra"],
    status: "Available"
  },
  {
    id: "MCP-Server-Integration",
    file: "MCP-Server-Integration/MCP-Server-Integration.md",
    title: "MCP Server Integration",
    icon: "🧷",
    theme: "Integration",
    desc: "Connecting third-party systems to Copilot when connectors are not deep enough — the MCP-vs-connector decision, task-shaped tool design, tool count limits, per-user identity, dynamic tool discovery and running the server as a production service.",
    tech: ["MCP Server", "Copilot Cowork", "Microsoft Copilot Studio", "Microsoft Foundry", "Salesforce", "Databricks", "Snowflake"],
    status: "Available"
  },
  {
    id: "Branded-Office-Artifact-Generation",
    file: "Branded-Office-Artifact-Generation/Branded-Office-Artifact-Generation.md",
    title: "Branded Office Artifact Generation",
    icon: "🎨",
    theme: "Delivery & Deployment",
    desc: "Making agent-generated PowerPoint, Word and Excel output brand-compliant, factually reliable and safe to send — Organization Asset Library setup, template hygiene, the entry-point × model test matrix and destructive-edit safety.",
    tech: ["Copilot Cowork", "Office Agent Mode", "SharePoint", "Microsoft 365 Copilot"],
    status: "Available"
  },
  {
    id: "Copilot-Studio-Migration-and-Modernisation",
    file: "Copilot-Studio-Migration-and-Modernisation/Copilot-Studio-Migration-and-Modernisation.md",
    title: "Copilot Studio Migration & Modernisation",
    icon: "🔄",
    theme: "Delivery & Deployment",
    desc: "Moving existing conversational and automation estates onto Copilot Studio — inventory and disposition, the pre-requisite work packages that stall most migrations, parallel-run cut-over and decommissioning.",
    tech: ["Microsoft Copilot Studio", "Power Platform", "Microsoft Entra", "Microsoft Purview"],
    status: "Available"
  },
  {
    id: "Copilot-Studio-and-Foundry-Split-Architecture",
    file: "Copilot-Studio-and-Foundry-Split-Architecture/Copilot-Studio-and-Foundry-Split-Architecture.md",
    title: "Copilot Studio & Foundry Split Architecture",
    icon: "🧬",
    theme: "Architecture & Design",
    desc: "Deciding what belongs in Copilot Studio and what belongs in Foundry, how the two halves talk, and the ownership, cost and latency consequences of the boundary. Includes the four common split topologies.",
    tech: ["Microsoft Copilot Studio", "Microsoft Foundry", "Azure AI Search", "Document Intelligence"],
    status: "Available"
  },
  {
    id: "Intelligent-Document-Processing-Pipeline",
    file: "Intelligent-Document-Processing-Pipeline/Intelligent-Document-Processing-Pipeline.md",
    title: "Intelligent Document Processing Pipeline",
    icon: "📑",
    theme: "Integration",
    desc: "Classify → extract → validate → route → output. Extraction stack selection, confidence thresholds derived from measured data, validation against master data, and the downstream boundary when the target system has no API.",
    tech: ["Microsoft Foundry", "Document Intelligence", "Content Understanding", "Power Automate", "Microsoft Copilot Studio"],
    status: "Available"
  },
  {
    id: "Human-in-the-Loop-Review-and-Approval",
    file: "Human-in-the-Loop-Review-and-Approval/Human-in-the-Loop-Review-and-Approval.md",
    title: "Human-in-the-Loop Review & Approval",
    icon: "✋",
    theme: "Governance & Operations",
    desc: "Designing the gate between an agent's output and a consequence — gate placement, what the reviewer must be shown, confidence-based routing, review fatigue, escalation and the audit record that makes the decision defensible.",
    tech: ["Microsoft Copilot Studio", "Power Automate", "Dataverse", "Microsoft Teams"],
    status: "Available"
  }
];

const REFERENCES = [
  {
    title: "Agent Delivery Reference Library",
    icon: "📚",
    file: "03-references/Agent-Delivery-Reference-Library.md",
    desc: "The curated documentation index for agent delivery — the product docs, learning paths and licensing references worth keeping open during an engagement."
  },
  {
    title: "Known Limitations & Workarounds",
    icon: "🧱",
    file: "03-references/Known-Limitations-and-Workarounds.md",
    desc: "Field-observed platform constraints and the workarounds that shape design decisions. Read this before you commit an architecture to a customer."
  },
  {
    title: "Useful Links",
    icon: "🔗",
    file: "03-references/Useful-links.md",
    desc: "Quick-access links to the tooling, portals, samples and community resources used across the runbooks."
  }
];

const RUNBOOK_ANATOMY = [
  { file: "1.Overview.md", desc: "Business context, objectives, target users, key capabilities and expected outcomes." },
  { file: "2.Architecture.md", desc: "Solution architecture diagrams, technology stack, integration points and data flow." },
  { file: "3.Runbook.md", desc: "Step-by-step implementation covering configuration, development, testing and deployment." },
  { file: "4.Sample-prompts.md", desc: "Validated prompt examples for agent topics, trigger phrases and conversation flows." },
  { file: "0.Resources/", desc: "Supporting assets — images, diagrams and reference files used within the scenario." }
];
