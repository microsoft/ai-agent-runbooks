# Runbook — Copilot Studio Migration & Modernisation

> Read [Copilot-Studio-Migration-and-Modernisation.md](Copilot-Studio-Migration-and-Modernisation.md)
> first. This runbook assumes something already exists and you are replacing it.

---

## Prerequisites

| Requirement | Owner |
|---|---|
| Access to the incumbent solution (to baseline it) | Customer |
| Named owner for pre-requisite completion | Customer |
| Delivery constraints published (connector limits, supported topologies) | Delivery org |
| Statement of work naming the partner boundary, if an SI is involved | Both |
| Power Platform environment strategy agreed | Customer platform team |

---

## Step 1 — Classify the Source

| Question | Answer |
|---|---|
| What is being replaced? | |
| Source type: legacy bot / competitor platform / custom RAG / accelerator IP / flow sprawl | |
| Why replace it? (cost, stability, consolidation, data-copy avoidance, capability) | |
| What must transfer: knowledge, prompts, logic, index, nothing? | |
| What is the decommission plan and who owns it? | |

The "why" determines the acceptance measure. Stability-driven migrations are judged on reliability;
consolidation-driven ones on parity; cost-driven ones on run rate.

**Deliverable:** one-page migration brief.

---

## Step 2 — Baseline the Incumbent (do this early — access disappears)

1. Build a fixed question set — 25–30 real user questions.
2. Run it against the **existing** solution.
3. Record answers, latency, and failures verbatim.

| # | Question | Incumbent answer | Latency | Correct? |
|---|---|---|---|---|

This becomes the go-live gate. Without it, "is the new one better?" is an opinion.

**Deliverable:** incumbent baseline, stored in the scenario resources folder.

---

## Step 3 — Pre-Requisites as a Managed Phase

This is where most migrations stall. Give it a plan and an owner.

| Pre-requisite | Owner | Requested | Due | Status |
|---|---|---|---|---|
| Power Platform environment provisioned | | | | |
| Delivery team access granted | | | | |
| Connectors approved through DLP | | | | |
| Source system credentials / test accounts | | | | |
| Data classification sign-off on the corpus | | | | |
| Copilot Studio capacity confirmed | | | | |
| Partner/SI onboarding complete | | | | |

Escalation rule: any item unmoved for two weeks goes to the sponsor. Environment provisioning and
access requests have delayed real engagements by weeks — treat slippage as a risk, not an
inconvenience.

**Deliverable:** pre-requisite tracker with a named owner and an escalation path.

---

## Step 4 — Validate Scope Against Delivery Constraints

Reconcile **before** commitment, not after.

| Constraint | Limit | This engagement needs | Reconciled? |
|---|---|---|---|
| Custom connectors per use case | | | |
| Supported publishing channels | | | |
| Environment topology (dev/test/prod) | | | |
| Licensing / capacity model | | | |
| Data residency | | | |
| Supported languages | | | |

> ⚠️ A real engagement was approved requiring three custom connectors, then hit a one-per-use-case
> delivery policy after approval. The conversation that followed happened in front of the customer.
> This table exists to prevent that.

**Deliverable:** signed scope reconciliation.

---

## Step 5 — Decide the Platform Boundary

| Component | Copilot Studio | Foundry | Rationale |
|---|---|---|---|
| Conversational orchestration | | | |
| Knowledge retrieval | | | |
| Document processing / OCR | | | |
| Image or vision workloads | | | |
| Custom model or pro-code logic | | | |
| Long-running processing | | | |

See [Copilot Studio & Foundry Split Architecture](../Copilot-Studio-and-Foundry-Split-Architecture/Copilot-Studio-and-Foundry-Split-Architecture.md).

**Deliverable:** component allocation table.

---

## Step 6 — Define the Partner Boundary

Only where an SI or partner shares delivery.

| Component | Owned by | Environment | Defect owner |
|---|---|---|---|

Put it in the statement of work. Ambiguity here has cost real engagements weeks of scope
negotiation while the customer waited.

**Deliverable:** responsibility matrix in the SoW.

---

## Step 7 — Rebuild the Use Case

Rules that keep the migration from importing the old debt:

- **Do not port the topic tree.** Start from generative orchestration and add topics only where you
  need determinism.
- **Do not port custom NLU intents.** They are an artefact of the old platform.
- **Do re-use** the knowledge corpus, the prompt library, and the business logic.
- **Do reduce.** If the new agent has as many components as the old one, you have rebuilt the debt.

Track the reduction — it is a good migration health signal:

| Metric | Incumbent | New | Delta |
|---|---|---|---|
| Topics / dialogs | | | |
| Custom integrations | | | |
| Lines of custom code | | | |

---

## Step 8 — Comparison Gate

Run the Step 2 question set against the new agent.

| # | Question | Incumbent | New agent | Better / same / worse |
|---|---|---|---|---|

| Result | Action |
|---|---|
| New agent equal or better on ≥90%, no regressions on critical questions | Proceed |
| Regressions on non-critical questions | Document, fix, re-test |
| Any regression on a critical question | Do not switch |

**Deliverable:** comparison results, signed by the business owner.

---

## Step 9 — Cut Over and Decommission

1. Run both in parallel for a defined window — not indefinitely.
2. Set a decommission date **at cutover**, with a named owner.
3. Confirm the business case actually lands: if the driver was operational cost, verify the old
   system's cost is removed.

A migration that leaves the incumbent running has not delivered. This step is the one most often
skipped, and it is the one the business case depends on.

**Deliverable:** decommission confirmation.

---

## Troubleshooting Quick Reference

| Symptom | Likely cause | Action |
|---|---|---|
| Weeks pass with no build progress | Stuck in pre-requisites | Escalate per Step 3; this is the single most common failure |
| Scope argument mid-delivery | Constraints not reconciled at approval | Step 4, retrospectively; publish constraints upstream |
| New agent worse than incumbent | Ported architecture rather than rebuilt use case | Step 7 |
| Unclear who fixes a defect | Partner boundary undefined | Step 6 |
| Customer keeps the old system | No decommission plan or unmet baseline | Steps 8 and 9 |
| Endless "one more use case" | No scope boundary at nomination | Fix at intake, not in delivery |

---

## Exit Criteria

- [ ] Migration brief with source classification and decommission owner
- [ ] Incumbent baseline captured before access was lost
- [ ] Pre-requisite tracker completed, with slippage escalated
- [ ] Scope reconciled against delivery constraints and signed
- [ ] Platform boundary decided (Copilot Studio / Foundry)
- [ ] Partner responsibility matrix in the SoW
- [ ] Use case rebuilt, component-count reduction recorded
- [ ] Comparison gate passed with no critical regressions
- [ ] Parallel-run window closed and incumbent decommissioned
