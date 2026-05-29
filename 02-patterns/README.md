# How to Use Patterns

This guide explains how the `02-patterns/` folder is organized, how to navigate technical pattern documentation, and how to apply patterns to your agent delivery scenarios.

---

## What Are Patterns?

Patterns are reusable technical building blocks that solve recurring implementation challenges in AI Agent delivery. Unlike Scenarios (which describe a specific business use case end-to-end), Patterns are:

| Dimension    | Scenarios (`01-scenarios/`) | Patterns (`02-patterns/`) |
|--------------|-----------------------------|---------------------------|
| Focus        | Business use case (e.g., HR Onboarding) | Technical implementation (e.g., RAG) |
| Scope        | End-to-end delivery runbook | Reusable across multiple scenarios |
| Start point  | Customer use case           | Architecture decision |
| Output       | Deployed agent              | Validated technical component |

> 💡 **Tip:** Patterns are not standalone deliverables — they are applied *within* a scenario. Always identify the relevant pattern(s) before opening a Scenario Runbook.

---

## Pattern Folder Structure Overview

The `02-patterns/` folder contains one subfolder per supported technical pattern. Each pattern folder is self-contained and follows a standardized structure.

```
02-patterns/
├── README.md                                                        ← 📖 You are here
├── Agentic-Workflow-Orchestration/                                  ← ✅ Available
│   └── Agentic-Workflow-Orchestration.md
├── Declarative-vs-Custom-engine-agent/                              ← ✅ Available
│   ├── Declarative-Agents-vs-Copilot-Studio-Custom-Engine-Agents.md
│   └── Declarative-Agents-vs-Copilot-Studio-Custom-Engine-Agents-Runbook.md
├── Enterprise-RAG-Pattern/                                          ← ✅ Available
│   ├── Enterprise-RAG-Pattern.md
│   └── Enterprise-RAG-Pattern-Runbook.md
├── Pattern04 (TBD)/                                                 ← 🚧 Coming Soon
└── Pattern05 (TBD)/                                                 ← 🚧 Coming Soon
```

---

## Pattern Folder Structure

Each pattern folder follows a standardized 2-file structure:

| File | Description |
|------|-------------|
| `[PatternName].md` | Pattern overview: what it is, when to use it, architecture diagram, step-by-step usage guide, and real-world scenarios. **Start here** to understand the pattern before applying it. |
| `[PatternName]-Runbook.md` | Step-by-step implementation runbook: prerequisites, detailed configuration procedures, and validation steps. Use this during active delivery. |

---

## Example: Enterprise RAG Pattern

The `Enterprise-RAG-Pattern/` folder is the reference example for how patterns are structured in this repository.

### Folder Contents

```
02-patterns/
└── Enterprise-RAG-Pattern/
    ├── Enterprise-RAG-Pattern.md           ← Pattern overview & decision guide
    └── Enterprise-RAG-Pattern-Runbook.md   ← Step-by-step implementation runbook
```

### What Each File Contains

#### 📘 Enterprise-RAG-Pattern.md — Pattern Overview

The pattern overview file answers the "What and Why" questions:

- **Why this pattern:** Supported industries, data sources, and task types
- **Architecture Diagram:** Mermaid-rendered data flow from user query to grounded response (Copilot Studio → Foundry IQ → Azure AI Search → Azure OpenAI)
- **How to Use (Step-by-Step):** 7 steps from knowledge inventory to evaluation
- **Real-World Scenarios:** 4 industry examples (Insurance, Healthcare, HR, Legal) with measurable outcomes
- **When to Use / Avoid:** Decision table for pattern applicability
- **SharePoint & OneDrive Integration Tiers:** Tier 1 (Native Direct) → Tier 2 (AI Search-Backed) → Tier 3 (Foundry IQ), with a decision flowchart
- **Related Labs & Accelerators:** Links to hands-on labs and accelerator resources

#### 📋 Enterprise-RAG-Pattern-Runbook.md — Implementation Runbook

The runbook answers the "How" question with operational detail:

- **Prerequisites:** Azure subscription, M365 tenant, Copilot Studio license
- **Step-by-Step Procedures:** From knowledge source inventory through Azure AI Search index setup, permission trimming, Copilot Studio connection, response node configuration, citation surfacing, and evaluation
- **Deliverables per Step:** Concrete outputs to validate completion at each stage

---

## How to Navigate Patterns

Follow this decision flow when starting a new engagement:

```
Step 1. Identify the core technical challenge in the customer's scenario
         ↓
Step 2. Open 02-patterns/ → locate the matching pattern folder
         ↓
Step 3. Read [PatternName].md → confirm the pattern fits the architecture and use case
         ↓
Step 4. Check the "When to Use / Avoid" section → validate applicability
         ↓
Step 5. Follow [PatternName]-Runbook.md → execute step-by-step implementation
         ↓
Step 6. Cross-reference 01-scenarios/ → apply the pattern within the scenario runbook
```

> ⚠️ **Important:** Always validate the pattern against the customer's actual environment (data sources, licenses, access control requirements) before committing to implementation.

---

## Currently Available Patterns

| Pattern | Description | Key Technologies | Status |
|---------|-------------|------------------|--------|
| [Enterprise RAG Pattern](./Enterprise-RAG-Pattern/Enterprise-RAG-Pattern.md) | Multi-source, governed retrieval-augmented generation. Grounds LLM responses in organizational data with access control and citation trails. | Copilot Studio, Azure AI Search, Azure OpenAI, Foundry IQ | ✅ Available |
| [Agentic Workflow Orchestration](./Agentic-Workflow-Orchestration/Agentic-Workflow-Orchestration.md) | Multi-agent workflow orchestration pattern for coordinating complex, multi-step tasks across multiple specialized agents. | Copilot Studio, Azure AI Foundry, Agent Framework | ✅ Available |
| [Declarative vs Custom Engine Agent](./Declarative-vs-Custom-engine-agent/Declarative-Agents-vs-Copilot-Studio-Custom-Engine-Agents.md) | Decision framework for choosing between Declarative Agents and Copilot Studio Custom Engine Agents. Covers three build methods (Agent Builder, Copilot Studio, Agents Toolkit), knowledge scale matrices, reference architectures, use-case scenarios, performance comparisons, and full implementation runbooks for both agent types and multi-agent composition. | Microsoft 365 Copilot, Copilot Studio, Agent Builder, Microsoft 365 Agents Toolkit, Azure OpenAI, Azure AI Search, Power Automate | ✅ Available |
| Pattern03 (TBD) | TBD | TBD | 🚧 Coming Soon |
| Pattern04 (TBD) | TBD | TBD | 🚧 Coming Soon |

---

## Pattern Naming Convention

Use **Kebab-Case** (hyphens) for all pattern folder and file names:

| ✅ Correct | ❌ Incorrect |
|-----------|-------------|
| `Enterprise-RAG-Pattern/` | `Enterprise_RAG_Pattern/` |
| `Enterprise-RAG-Pattern.md` | `EnterpriseRAGPattern.md` |
| `Enterprise-RAG-Pattern-Runbook.md` | `enterprise_rag_runbook.md` |

---

## How to Add a New Pattern

1. Create a new folder under `02-patterns/` using the naming convention above
2. Add `[PatternName].md` — Pattern overview (follow the Enterprise RAG Pattern as the reference template)
3. Add `[PatternName]-Runbook.md` — Step-by-step implementation runbook
4. Update the **Currently Available Patterns** table in this file
5. Cross-reference the pattern in any relevant scenario files under `01-scenarios/`

---

📌 **Looking for a scenario to apply this pattern to?**
Head to [`01-scenarios/`](../01-scenarios/) to explore pre-built agent delivery runbooks.
