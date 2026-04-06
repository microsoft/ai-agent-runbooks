# How to Use Scenarios

> **Purpose:** This guide explains how the `01-scenarios/` folder is organized,
> how to navigate scenario-specific runbooks, and how to contribute new scenarios.  

---

## Scenario Folder Structure Overview

The `01-scenarios/` folder contains **scenario-specific runbooks** for each supported 
agent delivery scenario. Each scenario folder is self-contained and follows a
standardized structure so that any CSA or vendor team can pick it up and deliver
consistently — regardless of region or prior experience with the scenario.

```
01-scenarios/
├── HR-Onboarding-Agent/        ← ✅ Available
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-Prompts.md
├── Workplace-Agent/           ← 🔨 In progress
│   ├── 1.Overview.md
│   ├── 2.Architecture.md
│   ├── 3.Runbook.md
│   └── 4.Sample-Prompts.md
├── Scenario02(TBD)/           ← 🚧 Coming Soon
├── Scenario03(TBD)/           ← 🚧 Coming Soon
├── Scenario04(TBD)/           ← 🚧 Coming Soon
└── Scenario05(TBD)/           ← 🚧 Coming Soon
```

> 💡 **Tip:** Always start with the scenario's `Overview.md` to confirm the scenario
> matches your customer's use case before proceeding with delivery.

---

## Scenario Folder Structure

Each scenario folder follows a standardized 4-file structure to ensure consistency,
reusability, and clarity across all agent deliveries.

Below is the standard structure, using **HR Onboarding Agent** as the reference example:

| File | Description |
|------|-------------|
| `Overview.md` | High-level summary of the scenario: supported CAF category (e.g., Employee Self-Service), business value, customer eligibility criteria, supported technical patterns, and expected delivery outcomes. Start here before opening a runbook. |
| `Architecture.md` | Logical architecture diagram and detailed explanation of key components, data flows, integration points, and authentication model. Reuse the pre-generated architecture diagrams stored here. |
| `Runbook.md` | Scenario-specific delivery procedures for **Phase 1 → Phase 2 → Phase 3**, customized from the standard phase runbooks in `01-runbooks/` to reflect the specific requirements, integrations, and configurations of this scenario. |
| `Sample-Prompts.md` | Example conversations with the agent covering primary use cases, edge cases, and error handling scenarios. Use these as reference inputs for UAT test case design and training material preparation. |

---

## How to Navigate Scenarios

Follow this decision flow when starting a new engagement:

**Step 1.** Confirm scenario category with customer  
↓
**Step 2.** Open `01-scenarios/` → locate matching scenario folder  
↓
**Step 3.** Read `Overview.md` → confirm CAF eligibility and pattern fit  
↓
**Step 4.** Review `Architecture.md` → validate against customer environment  
↓
**Step 5.** Follow `Runbook.md` → Phase 1 → Phase 2 → Phase 3  
↓
**Step 6.** Use `Sample-Prompts.md` → UAT test case preparation & training  

> ⚠️ **If no matching scenario folder exists** for the customer's use case:
> - Check `02-patterns/` for reusable technical patterns that can be combined
> - If the scenario is new but in-scope, follow the **How to Add a New Scenario** section below to contribute a new scenario folder

---

## Currently Supported Scenarios

| Scenario | Category | Technical Pattern | Status |
|---|---|---|---|
| HR Onboarding Agent | Employee Self-Service (ESS) | Studio + Connectors / API | ✅ Available |
| Workplace Agent | Workforce Productivity / Internal Operations | Studio + Connectors / API | 🔨 In progress |
| Scenario02(TBD) | TBD | TBD | 🚧 Coming Soon |
| Scenario03(TBD) | TBD | TBD | 🚧 Coming Soon |
| Scenario04(TBD) | TBD | TBD | 🚧 Coming Soon |
| Scenario05(TBD) | TBD | TBD | 🚧 Coming Soon |


## Scenario Naming Convention

Use **kebab-case** for all scenario folder and file names to ensure consistency
across the repository:

| ✅ Correct | ❌ Incorrect |
|---|---|
| `HR-Onboarding-Agent/` | `HR Onboarding Agent/` |
| `Workplace-Agent/` | `WorkplaceAgent/` |
| `Sample-Prompts.md` | `SamplePrompts.md` |

---

> 🏠 **Back to README:** [../../README.md](https://github.com/microsoft/ai-agent-runbooks/blob/af8f66e6052d2a6373ba44e11614930a0fcf5af1/README.md)
>
> 🔧 **Technical Patterns:** [../../02-patterns/](https://github.com/microsoft/ai-agent-runbooks/tree/af8f66e6052d2a6373ba44e11614930a0fcf5af1/02-patterns)
>
> 📋 **Contribution Guide:** [../../CONTRIBUTING.md](../../CONTRIBUTING.md)

