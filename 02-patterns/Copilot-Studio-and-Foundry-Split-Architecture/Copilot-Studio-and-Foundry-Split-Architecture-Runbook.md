# Runbook — Copilot Studio & Foundry Split Architecture

> Read
> [Copilot-Studio-and-Foundry-Split-Architecture.md](Copilot-Studio-and-Foundry-Split-Architecture.md)
> first. Run this **before** the build starts — the cost of discovering the boundary late is
> rebuilding the part that carries the business value.

---

## Prerequisites

| Requirement | Owner |
|---|---|
| Sample of the **actual** source content (real documents, real images) | Customer |
| Azure subscription and Foundry access, if the split is confirmed | Platform team |
| Copilot Studio environment | Customer |
| Named owner for the integration contract between the layers | Both |
| SI statement of work, if a partner is involved | Both |

---

## Step 1 — Classify Every Workload

List every step the solution performs. For each, answer the single question: *can this complete in
a few seconds, over content Copilot Studio can already read?*

| # | Workload step | Source format | Seconds? | Home | Rationale |
|---|---|---|---|---|---|

Automatic Foundry triggers — if any apply, stop debating and allocate:

- [ ] Source is scanned, photographed, or image-based
- [ ] Output depends on interpreting an image
- [ ] Step takes minutes rather than seconds
- [ ] A custom or fine-tuned model is required
- [ ] Multi-step research across many systems

**Deliverable:** workload allocation table.

---

## Step 2 — Prove It With Real Content

Do not allocate on assumption. Take **actual** customer documents and images — not clean samples —
and test.

| Test | Method | Result |
|---|---|---|
| Can Copilot Studio ground on this document as-is? | Add as knowledge, ask a question only that document answers | |
| Is text extractable, or is it an image of text? | Attempt selection/search in the source file | |
| Do tables ground correctly? | Ask for a value inside a table | |
| Does the image carry the meaning? | Ask a question that depends on the image | |

If Copilot Studio returns nothing useful on real content, that workload is a Foundry workload. This
half-day test prevents the most expensive late discovery in this pattern.

**Deliverable:** grounding test evidence.

---

## Step 3 — Define the Integration Contract

The item most often left unowned. Write it down.

| Aspect | Decision |
|---|---|
| Call mechanism (connected agent / MCP tool / custom connector) | |
| Request shape | |
| Response shape, and its size bound | |
| Synchronous or asynchronous | |
| Timeout budget | |
| Error contract — what does a failure return? | |
| Retry and idempotency behaviour | |
| Identity: user or service? | |
| Who owns this contract? | |

> ⚠️ Identity passthrough to downstream services is not guaranteed. Confirm what identity the
> Foundry component actually receives before designing entitlement around it — see
> [MCP Server Integration](../MCP-Server-Integration/MCP-Server-Integration.md), the `whoami` spike.

**Deliverable:** signed integration contract.

---

## Step 4 — Handle Long-Running Work

If any Foundry step exceeds the synchronous budget:

1. Copilot Studio submits the job and receives a handle immediately.
2. The conversation acknowledges and sets expectation ("I'll let you know when this is done").
3. Foundry processes asynchronously.
4. Completion notifies the user — Teams message, email, or a status the user can query.

Do not block the conversation on a multi-minute job. It will time out, and the user will retry,
which duplicates the work.

**Deliverable:** async design, or written confirmation that everything fits synchronously.

---

## Step 5 — Assign Build Ownership

| Component | Owner | Environment | Defect owner |
|---|---|---|---|
| Copilot Studio orchestration | | | |
| Conversation and topics | | | |
| Knowledge sources | | | |
| Approval / human-review gates | | | |
| Foundry document or vision pipeline | | | |
| Custom model logic | | | |
| **Integration contract** | | | |

If an SI is involved, this table goes in the statement of work. A real engagement spent weeks
closing scope because the split between partner pro-code work and delivery-team orchestration work
was not agreed in writing.

**Deliverable:** responsibility matrix.

---

## Step 6 — Governance on Both Sides

The halves do not inherit each other's posture. Confirm each independently.

| Control | Copilot Studio side | Foundry side |
|---|---|---|
| DLP / connector policy | | |
| Audit logging | | |
| Data residency | | |
| Content safety configuration | | |
| Secrets management | | |
| Cost monitoring | | |

**Deliverable:** governance checklist covering both layers.

---

## Step 7 — Test Across the Boundary

| Test | Pass criteria |
|---|---|
| Happy path end to end | Correct result surfaced in the conversation |
| Foundry component unavailable | Copilot Studio degrades gracefully with a useful message |
| Foundry returns an error | Error surfaced meaningfully, not "something went wrong" |
| Oversized payload | Bounded, not truncated silently |
| Long-running job | Async path works; no conversation timeout |
| Retry after failure | No duplicate processing |
| Restricted user | Entitlement enforced on the Foundry side too |
| Latency at p95 | Within the agreed budget |

The failure-path tests matter more than the happy path here. A split architecture has two things
that can be down.

**Deliverable:** cross-boundary test matrix.

---

## Step 8 — Operate

| Concern | Owner | Cadence |
|---|---|---|
| Foundry component availability and latency | Platform team | Continuous |
| Copilot Studio agent health | Maker team | Continuous |
| Cross-boundary error rate | Named single owner | Weekly |
| Cost across both layers | FinOps | Monthly |
| Integration contract changes | Contract owner | On change |

Give cross-boundary defects **one** owner. Split ownership produces tickets that bounce.

---

## Troubleshooting Quick Reference

| Symptom | Likely cause | Action |
|---|---|---|
| Agent returns nothing on document questions | Workload wrongly allocated to Copilot Studio | Step 2 grounding test; move to Foundry |
| Conversation times out | Long-running synchronous call | Step 4 async design |
| "Something went wrong" with no detail | No error contract | Step 3 |
| Duplicate processing after a retry | No idempotency | Step 3 |
| Entitlement enforced on one side only | Identity not carried across the boundary | `whoami` spike; Step 3 |
| Defects bounce between teams | No single cross-boundary owner | Step 5 |
| Latency unacceptable | Too many hops | Reconsider whether the split is necessary |

---

## Exit Criteria

- [ ] Workload allocation table completed
- [ ] Grounding tested against **real** customer content, evidence retained
- [ ] Integration contract signed, with a named owner
- [ ] Async design in place for any long-running step
- [ ] Responsibility matrix agreed (in the SoW if a partner is involved)
- [ ] Governance confirmed independently on both layers
- [ ] Cross-boundary tests passed, including failure paths
- [ ] Single owner assigned for cross-boundary defects
