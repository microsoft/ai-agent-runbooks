# 🤖 Agentic Workflow Orchestration

> The agent **plans, decomposes, and executes** multi-step tasks autonomously — calling
> tools, delegating to sub-agents, and adapting its plan based on intermediate results.

**Complexity:** ⭐⭐⭐⭐ High | **Core Capability:** Multi-step, multi-agent task completion

---

## 📋 Table of Contents

1. [Core Architecture](#-core-architecture)
2. [Connector Ecosystem (Power Platform)](#-connector-ecosystem)
3. [MCP Server Ecosystem](#-mcp-server-ecosystem-model-context-protocol)
4. [How to Use — Step by Step](#-how-to-use-this-pattern--step-by-step)
4. [Original Scenarios (A–C)](#-original-scenarios)
5. [Extended Scenarios with Diagrams](#-extended-scenarios-with-diagrams)
   - [D — DevOps: Jira Bug Triage & Auto-Fix PR](#scenario-d--devops-jira-bug-triage--auto-fix-pr)
   - [E — ITSM: ServiceNow Change Request Automation](#scenario-e--itsm-servicenow-change-request-automation)
   - [F — HR: Employee Onboarding Orchestration](#scenario-f--hr-employee-onboarding-orchestration)
   - [G — Customer Service: Complaint Resolution](#scenario-g--customer-service-complaint-resolution)
   - [H — Security: Threat Detection & Response](#scenario-h--security-threat-detection--response)
6. [Connector Reference Matrix](#-connector-reference-matrix)
7. [When to Use / Avoid](#-when-to-use--avoid)
8. [Related Labs & Accelerators](#-related-labs--accelerators)

---

## 🏗️ Core Architecture

```mermaid
flowchart TD
    U([👤 User Goal]) -->|high-level intent| CS[🤖 Copilot Studio\nOrchestrator Agent]

    CS --> PLAN[🧠 LLM Planner\nDecompose into steps]

    PLAN --> T1[🔍 Tool: Search\nKnowledge Base]
    PLAN --> T2[🌐 Tool: Call\nREST API]
    PLAN --> T3[⚡ Tool: Run\nPower Automate Flow]
    PLAN --> T4[📊 Tool: Query\nDatabase / Fabric]
    PLAN --> T5[🤖 Sub-Agent:\nSpecialist Agent]

    T1 --> AGG{{📥 Result Aggregator}}
    T2 --> AGG
    T3 --> AGG
    T4 --> AGG
    T5 --> AGG

    AGG --> EVAL{✅ Goal\nAchieved?}
    EVAL -->|No — replan| PLAN
    EVAL -->|Yes| SYNTH[🧠 Azure OpenAI\nResponse Synthesis]

    SYNTH -->|final answer + action summary| U

    style PLAN fill:#0078d4,color:#fff,stroke:#005a9e
    style EVAL fill:#d83b01,color:#fff,stroke:#a02b01
    style SYNTH fill:#107c10,color:#fff,stroke:#0a5c0a
    style CS fill:#8661c5,color:#fff,stroke:#5c3d9e
```

---

## 🔌 Connector Ecosystem

> All connectors below are **verified Power Platform connectors** — certified third-party or
> Microsoft first-party — available in Power Automate cloud flows. The **Integration** layer
> enables Graph API calls and custom REST endpoints for systems without a certified connector.

```mermaid
mindmap
  root((🤖 Copilot Studio\nOrchestrator))
    ITSM & DevOps
      ServiceNow
        Incident Management
        Change Requests
        CMDB Lookups
        HR Service Delivery
      Atlassian Jira
        Bug Triage
        Sprint Planning
        Issue Transitions
      Azure DevOps
        Pipeline Triggers
        Work Item Updates
        Repo & Branch Ops
    CRM & Business Apps
      Dynamics 365
        Case Management
        Opportunity Updates
        Customer 360
      Salesforce
        Lead Scoring
        Opportunity Stage
        Account History
    Collaboration & Workflow
      Microsoft Teams
        Channel Notifications
        Adaptive Cards
        Chat Messaging
      SharePoint
        Document Search
        Knowledge Base
        List Operations
      Office 365 Outlook
        Email Send & Draft
        Calendar Booking
        Meeting Management
      Approvals
        HITL Approval Flows
        Multi-stage Reviews
    Data & Storage
      Dataverse
        Record CRUD
        Process Flows
        Audit Logs
      Microsoft Fabric
        Data Pipeline Triggers
        Lakehouse Queries
      Power BI
        Dataset Refresh
        Alert Triggers
        Report Export
    Security & Identity
      Microsoft Sentinel
        Alert Enrichment
        Incident Response
        Threat Intel
      Defender for Endpoint
        Device Isolation
        Indicator Management
        Investigation Actions
      Azure AD / Entra ID
        User & Group Mgmt
        Session Revocation
        License Assignment
      Azure Key Vault
        Secret Retrieval
        Certificate Mgmt
    HR & Workforce
      Workday
        Employee Records
        Leave Balance
        Org Chart
    Integration
      HTTP with Azure AD
        Microsoft Graph API
        Custom REST Calls
      Custom Connectors
        OpenAPI Import
        API Key or OAuth Auth
```

---

## 🔗 MCP Server Ecosystem (Model Context Protocol)

> MCP is GA in Copilot Studio (May 2025). MCP servers are integrated through the Power Platform
> connector infrastructure — they inherit enterprise security, DLP controls, and VNet integration.
> **MCP and connectors are complementary** — connectors handle deterministic CRUD operations,
> while MCP servers provide dynamic tool discovery and AI-native integration.

### MCP vs Power Platform Connectors — When to Use Each

| Criteria | Power Platform Connector | MCP Server |
|----------|------------------------|------------|
| **Best for** | Deterministic, well-defined operations | Dynamic tool discovery, AI-native integration |
| **Setup** | Low-code UI in Power Automate / Copilot Studio | Deploy MCP server → connect via custom connector |
| **Tool updates** | Manual: update flow when API changes | Automatic: tools update as server evolves |
| **Governance** | Power Platform DLP policies | Same DLP + VNet + auth controls via connector infra |
| **Licensing** | Power Automate Premium | Azure MCP: Azure subscription; Work IQ MCP: M365 Copilot licence |
| **Typical use** | ServiceNow tickets, Jira issues, D365 cases | Azure infra management, M365 Copilot Search, multi-tool agents |

### Microsoft MCP Servers Available for Copilot Studio

```mermaid
mindmap
  root((🔗 MCP Servers\nfor Copilot Studio))
    Azure MCP Server
      AI & ML
        Azure AI Search
        Microsoft Foundry
        Azure Speech
      Databases
        Cosmos DB
        Azure SQL
        PostgreSQL & MySQL
      Compute & Apps
        App Service
        Azure Functions
        AKS
      Storage & Security
        Azure Storage & Blobs
        Azure Key Vault
        Azure Monitor
    Specialized MCP Servers
      Azure DevOps MCP
        Work Items
        Pipelines & Repos
        Wikis & Test Plans
      Microsoft Fabric MCP
        Data Pipelines
        Lakehouse Queries
        KQL Analytics
      Dataverse MCP
        Record CRUD
        Business Logic
    Work IQ MCP Servers
      Outlook Mail MCP
        Email Compose & Send
        Reply & Search
        Thread Management
      Outlook Calendar MCP
        Event Lifecycle
        Free/Busy Lookup
        Meeting Scheduling
      SharePoint & OneDrive MCP
        File Operations
        Metadata & Search
        Sensitivity Labels
      Teams MCP
        Chat & Channels
        Member Management
        Message Posting
      Word MCP
        Document Creation
        Content Retrieval
        Comment Management
      Copilot Search MCP
        Cross-M365 Search
        Multi-turn Grounding
        File-based Reasoning
      User Profile MCP
        Org Hierarchy
        Manager Lookups
        People Search
```

### MCP Server Reference

| MCP Server | Layer | Key Tools | Licence Requirement |
|------------|-------|-----------|---------------------|
| **Azure MCP Server** | Azure Infrastructure | 47+ Azure services: Storage, Cosmos DB, Key Vault, Monitor, AI Search, AKS, App Service, SQL | Azure subscription + RBAC |
| **Azure DevOps MCP** | Specialized | Work items, pipelines, repos, branches, wikis, test plans | Azure DevOps access |
| **Microsoft Fabric MCP** | Specialized | Data pipelines, lakehouse, KQL queries, semantic models | Microsoft Fabric licence |
| **Dataverse MCP** | Specialized | Table CRUD, business process flows, solution management | Power Platform environment |
| **Outlook Mail MCP** | Work IQ (M365) | Create, send, reply, search, delete emails; thread management | M365 Copilot licence |
| **Outlook Calendar MCP** | Work IQ (M365) | Create/update/cancel events; find free slots; accept/decline | M365 Copilot licence |
| **SharePoint & OneDrive MCP** | Work IQ (M365) | File upload, search, metadata, sensitivity labels | M365 Copilot licence |
| **Teams MCP** | Work IQ (M365) | Chat creation, channel ops, member management, messaging | M365 Copilot licence |
| **Word MCP** | Work IQ (M365) | Create documents from HTML/text, retrieve content, comments | M365 Copilot licence |
| **Copilot Search MCP** | Work IQ (M365) | Cross-M365 semantic search, multi-turn conversations, file grounding | M365 Copilot licence |
| **User Profile MCP** | Work IQ (M365) | Manager chain, direct reports, people search, org hierarchy | M365 Copilot licence |

> **Note:** Work IQ MCP servers (formerly Agent 365 tooling servers) require a **Microsoft 365 Copilot licence**
> and enrolment in the Frontier program. They respect the same security, compliance, and data boundaries
> as Microsoft 365 Copilot itself. All MCP servers are managed via the Microsoft 365 admin centre.

---

## 🚀 How to Use This Pattern — Step by Step

**Step 1 — Define the goal and sub-tasks**
Break the user's end goal into atomic tool-executable steps. Each step should map to
one Copilot Studio *Tool* or *Agent Flow* action (search, API call, data write, sub-agent).

**Step 2 — Build tools in Copilot Studio**
For each sub-task, configure a **Tool** in Copilot Studio:
- Knowledge-base queries → AI Search tool
- External system actions → Power Automate cloud flow tool
- Structured data reads → Power Platform connector tool

**Step 3 — Enable autonomous planning**
Turn on **Generative Orchestration** in Copilot Studio so the LLM dynamically
selects and sequences tools based on the user's intent — no rigid topic branching required.

**Step 4 — Set a replanning budget**
Define a maximum iteration count (recommended: 5–8 loops) to prevent infinite
replanning on ambiguous goals. Add a fallback escalation to a human if the budget is exceeded.

**Step 5 — Wire up sub-agents for specialization**
For tasks requiring deep expertise, delegate to a specialist agent via the
**Azure AI Agent Service** and wire the result back to the orchestrator.

**Step 6 — Test with adversarial goals**
Run tests with multi-step goals that require at least 3 tool calls. Validate that
the agent replans correctly when one tool returns no results.

---

## 📖 Original Scenarios

### Scenario A — IT Service Management: Incident Resolution
> IT engineer says: *"Investigate the payment service outage and open an incident ticket."*

1. Orchestrator decomposes: (a) search runbooks, (b) query monitoring API, (c) check recent deployments, (d) create incident
2. Tool 1 retrieves relevant runbook from AI Search
3. Tool 2 calls Azure Monitor REST API for live metrics
4. Tool 3 queries deployment history from Azure DevOps
5. Agent synthesizes root-cause hypothesis → Tool 4 creates ServiceNow ticket with context pre-filled

**Result:** Incident ticket creation time drops from 20 minutes to 90 seconds.

---

### Scenario B — Sales: Opportunity Research & Draft Proposal
> Sales rep says: *"Research Contoso's expansion plans and draft a proposal intro."*

1. Agent searches internal CRM for Contoso account history (Tool 1)
2. Searches SharePoint for past engagement documents (Tool 2)
3. Calls web search tool for recent Contoso news (Tool 3)
4. Synthesizes findings → drafts proposal intro grounded in all three sources

**Result:** Rep spends 5 minutes reviewing AI draft vs. 2 hours doing manual research.

---

### Scenario C — Finance: Month-End Close Checklist
> CFO assistant says: *"Run the month-end close checklist for March."*

1. Agent iterates through a checklist of 12 steps stored in Dataverse
2. For each step: executes Power Automate flow, verifies completion, logs result
3. Flags any step that fails or returns an exception to the human reviewer
4. Produces a completion summary report at the end

**Result:** Month-end coordination overhead reduced by 60% with full audit trail.

---

## 🆕 Extended Scenarios with Diagrams

---

### Scenario D — DevOps: Jira Bug Triage & Auto-Fix PR

> Dev lead says: *"Triage all critical Jira bugs from this sprint and open fix branches for the top 3."*

#### Flow Diagram

```mermaid
flowchart TD
    DEV([👨‍💻 Dev Lead]) -->|"Triage critical bugs\nthis sprint"| ORC[🤖 Copilot Studio\nOrchestrator]

    ORC --> J1[🐛 Jira Connector\nFetch Critical Bugs\nin Active Sprint]
    J1 --> J2[📊 Azure OpenAI\nRank by Impact &\nReproducibility Score]

    J2 --> J3[🔍 Azure AI Search\nSearch similar\npast bugs & fixes]
    J2 --> J4[📂 Azure DevOps\nCheck related\ncode commits]

    J3 --> SYNTH1[🧠 LLM Synthesizer\nGenerate fix approach\nper bug]
    J4 --> SYNTH1

    SYNTH1 --> ADO1[🔀 Azure DevOps\nCreate fix branch\nper bug]
    SYNTH1 --> J5[✏️ Jira Connector\nUpdate ticket: assign,\nadd fix notes, link PR]
    SYNTH1 --> TEAMS[💬 Teams Notification\nPost triage summary\nto dev channel]

    ADO1 --> DONE([✅ Summary Report\nto Dev Lead])
    J5 --> DONE
    TEAMS --> DONE

    style ORC fill:#8661c5,color:#fff,stroke:#5c3d9e
    style SYNTH1 fill:#107c10,color:#fff,stroke:#0a5c0a
    style J2 fill:#0078d4,color:#fff,stroke:#005a9e
```

#### Step-by-Step

| Step | Action | Connector |
|------|--------|-----------|
| 1 | Fetch all `Critical` bugs in the active sprint | **Jira** — `GET /rest/agile/1.0/sprint/{id}/issue` |
| 2 | Score each bug by impact × reproducibility using LLM | Azure OpenAI |
| 3 | Search for similar resolved bugs and past fixes | Azure AI Search (code knowledge base) |
| 4 | Pull related commits and blame history | **Azure DevOps** — Repos API |
| 5 | Generate a fix approach summary per top-3 bug | Azure OpenAI |
| 6 | Create feature branch `fix/BUG-{id}` per ticket | **Azure DevOps** — Repos connector |
| 7 | Update Jira ticket: assign, add fix notes, link branch | **Jira** — `PUT /rest/api/2/issue/{id}` |
| 8 | Post ranked triage card to dev Teams channel | **Microsoft Teams** connector |

**Result:** Sprint triage that takes 3 hours manually completes in under 4 minutes. Developers start coding, not triaging.

---

### Scenario E — ITSM: ServiceNow Change Request Automation

> Change manager says: *"Prepare and submit a change request for tonight's database migration."*

#### Flow Diagram

```mermaid
flowchart TD
    CM([👔 Change Manager]) -->|"Submit CR for\nDB migration tonight"| ORC[🤖 Copilot Studio\nOrchestrator]

    ORC --> SN1[🔍 ServiceNow\nCheck CMDB for\naffected CIs]
    ORC --> CAL[📅 Outlook Calendar\nCheck maintenance\nwindow availability]

    SN1 --> RISK[🧠 Azure OpenAI\nAssess risk score\nbased on CI criticality]
    CAL --> RISK

    RISK --> SN2[📋 ServiceNow\nDraft Change Request\nwith risk assessment]
    RISK --> APPR{Risk Level?}

    APPR -->|Low / Medium| SN3[✅ ServiceNow\nAuto-submit CR\nfor standard approval]
    APPR -->|High| HITL[🙋 Human-in-Loop\nTeams Adaptive Card\nManager approval]

    HITL -->|Approved| SN3
    HITL -->|Rejected| NOTIFY[📧 Email Notification\nCR rejected,\nreschedule required]

    SN3 --> SN4[🔔 ServiceNow\nNotify stakeholders\nvia SNow workflow]
    SN3 --> LOG[📝 Dataverse\nLog CR reference\nfor audit trail]

    SN4 --> DONE([✅ CR Submitted\n& Stakeholders Notified])
    LOG --> DONE

    style ORC fill:#8661c5,color:#fff,stroke:#5c3d9e
    style RISK fill:#0078d4,color:#fff,stroke:#005a9e
    style APPR fill:#d83b01,color:#fff,stroke:#a02b01
    style HITL fill:#ff8c00,color:#fff,stroke:#cc6d00
```

#### Step-by-Step

| Step | Action | Connector |
|------|--------|-----------|
| 1 | Look up all CIs impacted by the DB migration in CMDB | **ServiceNow** — CMDB API |
| 2 | Check if a valid maintenance window exists tonight | **Outlook Calendar** connector |
| 3 | Score risk: CI criticality × change complexity × window overlap | Azure OpenAI |
| 4 | Draft Change Request record with pre-filled risk fields | **ServiceNow** — Change Management API |
| 5 | Low/Medium risk → auto-submit; High risk → Teams approval card | **Teams** Adaptive Card |
| 6 | On approval: submit CR and trigger SNow notification workflow | **ServiceNow** connector |
| 7 | Log CR number + audit metadata to Dataverse | **Dataverse** connector |

**Result:** CR preparation time cut from 45 minutes to 3 minutes. Risk misclassification reduced by removing manual scoring.

---

### Scenario F — HR: Employee Onboarding Orchestration

> HR coordinator says: *"Start onboarding for new hire Priya Sharma joining next Monday."*

#### Flow Diagram

```mermaid
flowchart TD
    HR([👩‍💼 HR Coordinator]) -->|"Onboard Priya Sharma\njoining Monday"| ORC[🤖 Copilot Studio\nOrchestrator]

    ORC --> WD[👥 Workday\nFetch employee record\nrole, dept, location]
    WD --> PLAN[🧠 LLM Planner\nBuild onboarding\ntask checklist]

    PLAN --> AAD[🔐 Microsoft Entra ID\nCreate user account\n& assign licenses]
    PLAN --> SN_HR[📋 ServiceNow HR\nCreate onboarding\ntask bundle]
    PLAN --> SP[📂 SharePoint\nProvision personal\nteam site & folders]
    PLAN --> TEAMS2[💬 Teams\nAdd to team channels\n& post welcome message]
    PLAN --> OUT[📧 Outlook\nSend welcome email\nwith Day-1 guide]
    PLAN --> CAL2[📅 Outlook Calendar\nBook: manager 1:1,\nIT setup, orientation]

    AAD --> STATUS{{📊 Completion Tracker\nDataverse}}
    SN_HR --> STATUS
    SP --> STATUS
    TEAMS2 --> STATUS
    OUT --> STATUS
    CAL2 --> STATUS

    STATUS --> MGRNOT[🔔 Teams Notification\nManager notified:\nonboarding complete]

    style ORC fill:#8661c5,color:#fff,stroke:#5c3d9e
    style PLAN fill:#0078d4,color:#fff,stroke:#005a9e
    style STATUS fill:#107c10,color:#fff,stroke:#0a5c0a
```

#### Step-by-Step

| Step | Action | Connector |
|------|--------|-----------|
| 1 | Fetch employee profile: role, department, cost centre | **Workday** connector |
| 2 | LLM builds a role-specific onboarding checklist | Azure OpenAI |
| 3 | Create M365 account, assign licenses, set MFA | **Microsoft Entra ID** (Graph API) |
| 4 | Create onboarding task bundle (IT, equipment, training) | **ServiceNow HR** connector |
| 5 | Provision SharePoint team site with folder templates | **SharePoint** connector |
| 6 | Add new hire to relevant Teams channels | **Microsoft Teams** connector |
| 7 | Send personalised Day-1 welcome email | **Outlook** connector |
| 8 | Book orientation, manager 1:1, and IT setup slots | **Outlook Calendar** connector |
| 9 | Track completion of all tasks in Dataverse; notify manager | **Dataverse** + **Teams** |

**Result:** Onboarding setup that takes HR 4–6 hours is fully orchestrated in under 8 minutes. New hire is productive from Day 1.

---

### Scenario G — Customer Service: Complaint Resolution

> Support agent says: *"Customer ACC-4821 is escalating — resolve their billing dispute and send a recovery offer."*

#### Flow Diagram

```mermaid
flowchart TD
    AGT([🎧 Support Agent]) -->|"Resolve billing\ndispute for ACC-4821"| ORC[🤖 Copilot Studio\nOrchestrator]

    ORC --> CRM[📊 Dynamics 365\nFetch customer profile\n& case history]
    ORC --> BILL[💳 Billing System\nREST API — Fetch\ninvoices & disputes]

    CRM --> ANALYSIS[🧠 Azure OpenAI\nAnalyse dispute root\ncause & NPS risk]
    BILL --> ANALYSIS

    ANALYSIS --> POL[🔍 AI Search\nSearch refund &\ncompensation policy]
    ANALYSIS --> SENT{Customer\nSentiment?}

    POL --> DRAFT[✍️ Azure OpenAI\nDraft resolution\n& recovery offer]
    SENT -->|High Risk / Churning| ESCALATE[🙋 HITL Escalation\nSupervisor approval\nfor offer > $200]
    SENT -->|Standard| DRAFT

    ESCALATE -->|Approved| DRAFT

    DRAFT --> D365[📝 Dynamics 365\nUpdate case: resolution\nnotes + status = Resolved]
    DRAFT --> EMAIL[📧 Outlook\nSend personalised\napology + offer email]
    DRAFT --> SNcase[🎫 ServiceNow\nClose linked IT\nsupport ticket if any]

    D365 --> DONE([✅ Case Resolved\nCustomer Notified])
    EMAIL --> DONE
    SNcase --> DONE

    style ORC fill:#8661c5,color:#fff,stroke:#5c3d9e
    style ANALYSIS fill:#0078d4,color:#fff,stroke:#005a9e
    style SENT fill:#d83b01,color:#fff,stroke:#a02b01
    style DRAFT fill:#107c10,color:#fff,stroke:#0a5c0a
```

#### Step-by-Step

| Step | Action | Connector |
|------|--------|-----------|
| 1 | Pull full customer profile, open cases, and NPS history | **Dynamics 365** connector |
| 2 | Retrieve disputed invoices and billing transaction log | **Billing REST API** (custom connector) |
| 3 | Analyse dispute root cause, classify severity and churn risk | Azure OpenAI |
| 4 | Search refund policy and compensation tiers | **Azure AI Search** |
| 5 | High churn risk → supervisor approval via Teams card | **Teams** Adaptive Card |
| 6 | Draft personalised resolution letter + recovery offer | Azure OpenAI |
| 7 | Update Dynamics 365 case with resolution notes | **Dynamics 365** connector |
| 8 | Send recovery email with offer details | **Outlook** connector |
| 9 | Close any linked ServiceNow IT tickets | **ServiceNow** connector |

**Result:** Average handle time drops from 18 minutes to 4 minutes. CSAT scores improve by reducing resolution inconsistency.

---

### Scenario H — Security: Threat Detection & Response

> SOC analyst says: *"Investigate the suspicious login alert for user alex@contoso.com and contain if confirmed."*

#### Flow Diagram

```mermaid
flowchart TD
    SOC([🛡️ SOC Analyst]) -->|"Investigate alert:\nalex@contoso.com"| ORC[🤖 Copilot Studio\nOrchestrator]

    ORC --> SEN[🔍 Microsoft Sentinel\nFetch alert details\n& related incidents]
    ORC --> SIGN[🔐 Entra ID\nGet sign-in logs\nlast 24 hours]
    ORC --> DEF[🦠 Defender XDR\nCheck device health\n& risk score]

    SEN --> CORR[🧠 Azure OpenAI\nCorrelate signals\nThreat Intelligence]
    SIGN --> CORR
    DEF --> CORR

    CORR --> CONF{Confirmed\nThreat?}

    CONF -->|Yes — High Confidence| CONTAIN[🚨 Automated Response]
    CONF -->|No — Low Confidence| INVEST[🔎 Deep Investigation\nSub-Agent: Forensics]

    CONTAIN --> AAD2[🔐 Entra ID\nRevoke sessions\n& block account]
    CONTAIN --> DEF2[🦠 Defender XDR\nIsolate device\nfrom network]
    CONTAIN --> SEN2[📋 Sentinel\nCreate incident\n& add IOCs]

    INVEST --> ENRICH[🌐 Threat Intel API\nEnrich IPs & hashes\nfrom VirusTotal / MDTI]
    ENRICH --> CONF2{Confirmed\nafter enrichment?}
    CONF2 -->|Yes| CONTAIN
    CONF2 -->|No| HITL2[🙋 HITL\nSOC manager review\nvia Teams card]

    AAD2 --> NOTIFY2[📧 Notify user &\nIT Security team]
    DEF2 --> NOTIFY2
    SEN2 --> NOTIFY2
    NOTIFY2 --> DONE([✅ Threat Contained\nIncident Logged])

    style ORC fill:#8661c5,color:#fff,stroke:#5c3d9e
    style CORR fill:#0078d4,color:#fff,stroke:#005a9e
    style CONF fill:#d83b01,color:#fff,stroke:#a02b01
    style CONTAIN fill:#a80000,color:#fff,stroke:#800000
    style HITL2 fill:#ff8c00,color:#fff,stroke:#cc6d00
```

#### Step-by-Step

| Step | Action | Connector |
|------|--------|-----------|
| 1 | Fetch alert details and correlated incidents | **Microsoft Sentinel** connector |
| 2 | Pull sign-in logs with location, device, and risk signals | **Entra ID** (Graph API) |
| 3 | Check device risk score and active threats | **Microsoft Defender XDR** connector |
| 4 | Correlate signals using threat intelligence | Azure OpenAI + **MDTI** |
| 5 | High confidence: revoke sessions, block account | **Entra ID** connector |
| 6 | Isolate device from network | **Defender XDR** connector |
| 7 | Create Sentinel incident with IOCs and timeline | **Microsoft Sentinel** connector |
| 8 | Enrich low-confidence signals via external threat intel | **VirusTotal / MDTI** REST API |
| 9 | Notify user, IT security team, and log to audit | **Outlook** + **Teams** connectors |

**Result:** Mean time to contain (MTTC) drops from 4 hours to under 12 minutes. False positive rate reduced through automated enrichment before action.

---

## 🔌 Connector Reference Matrix

> **Classification key:** *First-party* = built and maintained by Microsoft. *Certified* = built by a partner, verified by Microsoft. *Custom* = user-created via OpenAPI spec.

| Connector | Category | Key Actions | Power Platform Type |
|-----------|----------|-------------|---------------------|
| **ServiceNow** | ITSM | Create/Update Incident, Change Request, CMDB lookup, HR cases | ✅ Certified connector |
| **Atlassian Jira** | DevOps | Fetch issues, Update status, Create issues, Transitions | ✅ Certified connector |
| **Azure DevOps** | DevOps | Create branch, Trigger pipeline, Update work item, Repo search | ✅ First-party connector |
| **Dynamics 365** | CRM | Read/Write cases, Opportunities, Contacts, Activities | ✅ First-party connector |
| **Salesforce** | CRM | Lead management, Opportunity stage, Account history, SOQL | ✅ Certified connector |
| **Workday** | HR | Employee record, Leave balance, Org chart data | ✅ Certified connector |
| **Azure AD / Entra ID** | Identity | User & group management, License assignment, Sign-in logs | ✅ First-party connector |
| **Microsoft Sentinel** | Security | Fetch alerts, Create incident, Add IOCs, Update status | ✅ First-party connector |
| **Defender for Endpoint** | Security | Device isolation, Machine actions, Investigation pack | ✅ First-party connector |
| **Azure Key Vault** | Security | Get secret, List secrets, Certificate retrieval | ✅ First-party connector |
| **Power BI** | Analytics | Refresh dataset, Post rows, Export report, Alert triggers | ✅ First-party connector |
| **Microsoft Fabric** | Data | Data pipeline triggers, Lakehouse operations | ✅ First-party connector |
| **SharePoint** | Collaboration | Document search, File upload, List operations | ✅ First-party connector |
| **Microsoft Teams** | Collaboration | Post message, Adaptive Card, Create channel, Chat | ✅ First-party connector |
| **Office 365 Outlook** | Communication | Send email, Draft, Calendar create, Search messages | ✅ First-party connector |
| **Approvals** | Workflow | Create approval, Multi-stage approval flows, Audit trail | ✅ First-party connector |
| **Dataverse** | Storage | CRUD records, Process flows, Audit log | ✅ First-party connector |
| **HTTP with Azure AD** | Integration | Microsoft Graph API calls, Custom REST APIs with Azure AD auth | ✅ First-party connector |
| **Custom Connectors** | Any | OpenAPI import, API Key / OAuth authentication | ✅ Custom connector |

> **Notes:**
> - *ServiceNow HR* operations (onboarding cases, equipment requests) use the same **ServiceNow** certified connector — different table endpoints, not a separate connector.
> - *Entra ID* operations (create user, assign license, revoke session) use the **Azure AD** connector for basic operations and **HTTP with Azure AD** for full Graph API coverage.
> - *Microsoft Purview* does not have a certified Power Platform connector — use **HTTP with Azure AD** to call the Graph Security API for compliance operations.
> - *Microsoft Fabric* connector supports pipeline triggers and basic lakehouse operations. For KQL queries, use the **Azure Data Explorer** connector.

---

## ⏰ When to Use / Avoid

| Use when... | Avoid when... |
|-------------|---------------|
| Task requires 3+ sequential or parallel tool calls | Single-turn Q&A is sufficient |
| Steps are conditional on prior results | All steps are always executed in fixed order |
| Multiple back-end systems need coordinating | Only one system is involved |
| User's goal can change mid-task | Goal is fully deterministic from the start |
| Cross-system data needs to be correlated before acting | Data lives entirely in one system |
| Approval gates or HITL checkpoints are needed | Fully automated with no human oversight required |
| Audit trail and logging across systems is required | One-off ad-hoc query with no compliance needs |

---

## 📐 Design Principles

| Principle | Guidance |
|-----------|----------|
| **Atomic tools** | Each tool should do exactly one thing. Composability > monolithic actions. |
| **Idempotency** | Tools that write data (create ticket, send email) must handle retries safely. |
| **Replanning budget** | Cap iterations at 5–8. Add HITL fallback when budget is exceeded. |
| **Least privilege** | Each connector should use a service account with minimum required permissions. |
| **Observability** | Log every tool call, input, and output to Dataverse or Azure Monitor. |
| **Graceful degradation** | If a non-critical tool fails (e.g., Power BI refresh), continue and flag in summary. |
| **HITL gates** | For irreversible actions (block user, isolate device, send bulk email) — always include an approval step. |

---

## 🔗 Related Labs & Accelerators

| Resource | Path |
|----------|------|
| Lab 1.2 — Tools in Copilot Studio | `/labs/lab-1.2` |
| Lab 1.3 — MCP Integration | `/labs/lab-1.3` |
| Lab 2.1 — ServiceNow ITSM Integration | `/labs/lab-2.1` |
| Lab 2.2 — Jira DevOps Agent | `/labs/lab-2.2` |
| Lab 2.3 — HR Onboarding Orchestration | `/labs/lab-2.3` |
| Functional Scoping Accelerator | `/accelerators/functional-scoping` |
| Connector Security Hardening Guide | `/accelerators/connector-security` |

---

