# Runbook — Copilot Credits & Cost Control

> **Run this at design time, not after the first invoice.** Read
> [Copilot-Credits-Cost-Control.md](Copilot-Credits-Cost-Control.md) first.

---

## Prerequisites

| Requirement | Owner |
|---|---|
| Power Platform admin access | Power Platform admin |
| Microsoft 365 admin access | M365 admin |
| Current prepaid Copilot Credit capacity | Licensing owner |
| Agent design (orchestration mode, knowledge, tools) | Delivery engineer |
| Expected user volume and licence mix | Business sponsor |

---

## Step 1 — Establish the Audience and Licensing Boundary

Answer before anything else:

| Question | Answer |
|---|---|
| Who uses the agent? | |
| How many hold a Microsoft 365 Copilot licence? | |
| How many do not? | |
| Will the agent run under the end user's identity? | |
| Is the usage employee-facing (B2E) or customer-facing (B2C)? | |

The unlicensed population drives essentially all of the cost. If that number is unknown, stop
and find it — every subsequent number depends on it.

**Deliverable:** audience and licensing statement, signed by the business sponsor.

---

## Step 2 — Estimate

1. Open the [Copilot Studio agent usage estimator](https://microsoft.github.io/copilot-studio-estimator/).
2. Enter the intended design: agent type, traffic, orchestration mode, knowledge sources, tools.
3. Record the output.
4. Independently work the arithmetic using the worksheet in the pattern document.
5. Reconcile. A large gap means an assumption about the design is wrong — resolve it now.

**Deliverable:** estimate with the assumptions written down beside it.

---

## Step 3 — Optimise the Design Before Building

Walk the design against this table and record what you changed.

| Lever | Effect | When to apply |
|---|---|---|
| Authored topics instead of generative answers | 1 credit instead of 2, and more deterministic | High-volume, well-understood questions |
| Turn off tenant graph grounding where not needed | Saves 10 credits per message | Agents grounded on a single SharePoint site or uploaded documents |
| Avoid reasoning models by default | Removes the premium token charge | Anything that does not need multi-step reasoning |
| Reduce agent actions per interaction | 5 credits each | Collapse unnecessary topic transitions |
| Batch flow calls | Billed per 100 actions | Chatty flows making many small calls |
| Basic instead of standard/premium AI tools | 1 vs 15 vs 100 per 10 responses | Simple extraction and formatting tasks |

> 📌 Turning tenant graph grounding off is a quality trade-off, not a free saving. For agents
> grounded on SharePoint it materially improves retrieval. Make the decision deliberately and
> record it.

**Deliverable:** optimisation decisions log.

---

## Step 4 — Allocate Capacity

**Power Platform admin center → Licensing → Copilot Studio → Manage Copilot credits.**

1. Allocate capacity explicitly to:
   - The development environment (bounded, so testing cannot drain the pool)
   - Each production environment hosting agents
2. Leave the remainder as tenant pool for low-risk environments.
3. Record the allocation.

| Environment | Purpose | Allocated credits | PAYG enabled? |
|---|---|---|---|

Remember: an environment with its own allocation is insulated from tenant-level overage
enforcement while its allocation lasts. Environments with no allocation share the tenant pool's
fate.

**Deliverable:** capacity allocation table.

---

## Step 5 — Decide Enforcement Posture

Choose one, explicitly, per environment:

| Posture | Configuration | Consequence |
|---|---|---|
| **Hard ceiling** | Prepaid capacity only. **No** pay-as-you-go | Agents are disabled at 125% of capacity. Business interruption is possible — this is the point |
| **Continuity first** | Pay-as-you-go linked to an Azure subscription | No hard stop. Overage bills to Azure. Requires alerting and monthly review |
| **Mixed** | Allocation plus PAYG on the environment | Enforcement does not apply once the allocation is exhausted; the meter takes over |

Write the choice and its consequence into the design document, and have the business sponsor
acknowledge it. "We thought it would just stop" is the most common post-incident statement in
this area.

**Deliverable:** enforcement posture decision, acknowledged by the sponsor.

---

## Step 6 — Set Per-Agent Limits

**Power Platform admin center → Licensing → Copilot Studio → Manage Agents.**

Set a monthly consumption limit for every production agent. Size it at roughly 1.5× the
estimate from Step 2 — tight enough to catch a runaway agent, loose enough to survive a busy
month.

| Agent | Environment | Estimated monthly credits | Cap set |
|---|---|---|---|

**Deliverable:** per-agent caps applied.

---

## Step 7 — Budget for Testing

1. Allocate a specific credit budget to the development environment.
2. Brief the maker community: **the test canvas bills at production rates**. Agents with action
   flows can consume thousands of credits during iteration.
3. Track development consumption separately from production so a build spike does not look like
   a production incident.

**Deliverable:** development budget allocated and communicated.

---

## Step 8 — Design Chargeback (if required)

1. Decide the attribution unit. In order of practicality:
   - **Environment per cost centre** — most reliable; consumption reporting is environment-level
   - **Agent per cost centre** — workable with per-agent reporting
   - **User-level attribution** — hardest; verify identifier consistency across usage reporting
     and audit logs before committing to it
2. Prototype one month of the report before promising it to finance.
3. Document the known limitations rather than discovering them in a finance review.

**Deliverable:** chargeback design with a worked one-month example.

---

## Step 9 — Monitor and Reconcile

**Power Platform admin center → Licensing → Copilot Studio → Environments.** Review the Copilot
credit consumption grid.

| Cadence | Activity | Owner |
|---|---|---|
| Weekly (first month) | Consumption vs estimate, by environment | Delivery engineer |
| Monthly | Reconcile actual vs estimate; investigate variance >30% | Power Platform admin |
| Monthly | Chargeback report | Finance / IT ops |
| Quarterly | Re-estimate against the current agent design | Delivery engineer |

**Investigate any of these immediately:**

- A step change in consumption without a corresponding usage change — usually a model or
  orchestration change
- One agent dominating consumption — check for a retry loop or a chatty flow
- Consumption from an environment you did not know hosted agents

**Deliverable:** monthly reconciliation record.

---

## Step 10 — Incident Response

**If consumption spikes unexpectedly:**

1. Identify the environment and agent from the consumption grid.
2. Apply or lower the per-agent monthly limit immediately.
3. If necessary, disable the agent in its environment.
4. Determine the cause before re-enabling:
   - Genuine usage increase → re-estimate and re-allocate
   - Design change (model switch, orchestration change, graph grounding enabled) → assess and
     revert or accept
   - Loop or retry storm → fix the agent
   - Testing → move to a bounded development environment
5. Record the incident and the resolution.

---

## Exit Criteria

- [ ] Audience and licensing boundary documented and signed
- [ ] Estimate produced and cross-checked against the estimator
- [ ] Design optimisation decisions logged
- [ ] Capacity allocated per environment, including development
- [ ] Enforcement posture chosen and acknowledged by the sponsor
- [ ] Per-agent monthly limits applied to all production agents
- [ ] Development testing budget allocated and communicated to makers
- [ ] Chargeback design prototyped (if required)
- [ ] Monitoring cadence agreed with named owners
- [ ] Incident response steps documented
