# Runbook — Human-in-the-Loop Review & Approval

> Read
> [Human-in-the-Loop-Review-and-Approval.md](Human-in-the-Loop-Review-and-Approval.md) first.
> Run this during design, not after compliance rejects the solution.

---

## Prerequisites

| Requirement | Owner |
|---|---|
| Complete list of actions and outputs the agent can produce | Delivery engineer |
| Named compliance or risk stakeholder | Customer |
| Identified reviewer population, with capacity | Customer |
| Understanding of the regulatory context | Compliance |

---

## Step 1 — Enumerate Every Action

Every output and every write. Miss one and it will be the ungated one.

| # | Action / output | Reversible? | Consequence if wrong | Regulated? | Leaves the org? |
|---|---|---|---|---|---|

---

## Step 2 — Assign a Gate Per Action

| # | Action | Gate (Notify / Confirm / Draft / Mandatory) | Approver role | Rationale |
|---|---|---|---|---|

Assignment guide:

- **Notify** — reversible, low value, no external impact
- **Confirm** — moderate consequence, and the user can genuinely evaluate it in the moment
- **Draft** — carries the organisation's voice, numbers, or commitments
- **Mandatory review** — clinical, legal, financial, safety, or anything a regulator will ask about

> ⚠️ If the user cannot realistically assess correctness at the point of the prompt, **Confirm is
> the wrong gate.** Use Draft.

**Deliverable:** gate assignment table, reviewed by compliance.

---

## Step 3 — Design the Review Surface

Per gate type, confirm:

| Requirement | Notify | Confirm | Draft | Mandatory |
|---|---|---|---|---|
| Evidence / source shown | – | ✅ | ✅ | ✅ |
| Confidence shown | – | where available | ✅ | ✅ |
| Change visible (diff / tracked changes) | – | – | ✅ | ✅ |
| Reviewer identity captured | – | ✅ | ✅ | ✅ |
| Reject path defined | – | ✅ | ✅ | ✅ |
| Review unit small enough to read | – | ✅ | ✅ | ✅ |

Test with a real reviewer, not a project team member. Ask them to find a deliberately introduced
error. If they cannot, the surface is wrong.

**Deliverable:** review surface, validated with an actual reviewer.

---

## Step 4 — Carry Draft Status Downstream

| Destination | How draft status is represented | Verified? |
|---|---|---|

If the agent writes to Jira, a CRM, SharePoint or a document library, the record must show it is
unreviewed **in that system**. Chat-only draft status is invisible to everyone downstream.

**Deliverable:** downstream draft representation confirmed per destination.

---

## Step 5 — Define Batch and Blast-Radius Limits

| Control | Limit |
|---|---|
| Maximum items in a single approval request | |
| Maximum records a single instruction can modify | |
| Behaviour when the limit is exceeded | |

Nobody meaningfully reviews item 200 of 200. Cap it and force a split.

**Deliverable:** limits configured and tested.

---

## Step 6 — Design the Reject Path

| Question | Answer |
|---|---|
| What happens to a rejected item? | |
| Is the requester notified? | |
| Does it route to a human queue or back to the agent? | |
| Is the rejection reason captured? | |
| Can it be resubmitted, and by whom? | |

Approval paths get tested; rejection paths get discovered in production. Test this one explicitly.

**Deliverable:** reject path implemented and tested.

---

## Step 7 — Instrument the Gate

Capture per reviewed item:

- [ ] Reviewer identity
- [ ] Decision (approve / reject / amend)
- [ ] What was changed
- [ ] Time spent in review
- [ ] Confidence at time of review
- [ ] Timestamp

This is your accuracy signal, your improvement backlog, and your evidence if the gate is ever
questioned.

**Deliverable:** instrumentation live before pilot.

---

## Step 8 — Pilot with Everything Gated

Start conservative. Measure:

| Metric | Week 1 | Week 2 | Week 3 | Week 4 |
|---|---|---|---|---|
| Items reviewed | | | | |
| Approved unchanged | | | | |
| Amended | | | | |
| Rejected | | | | |
| Reviewer minutes per item | | | | |
| Post-approval defects found | | | | |

If reviewer minutes per item approaches the manual baseline, stop and fix the gate placement or the
review surface. The business case depends on this number.

---

## Step 9 — Relax Gates on Evidence Only

After four or more weeks of production-condition data:

| Action | Approved-unchanged rate | Proposed new gate | Business sign-off |
|---|---|---|---|

Rules:

- Relax only where the approved-unchanged rate is consistently high
- **Never** relax material fields or high-consequence actions without a signed business decision
- Record the decision and the evidence behind it
- Re-tighten immediately if post-approval defects appear

**Deliverable:** gate relaxation decisions with evidence and sign-off.

---

## Step 10 — Operate

| Cadence | Activity | Owner |
|---|---|---|
| Weekly (first month) | Correction analysis — where is the agent weak? | Delivery engineer |
| Monthly | Reviewer time and queue depth | Business owner |
| Monthly | Post-approval defect review | Compliance |
| Quarterly | Re-validate gate assignments against current risk | Compliance |
| On scope change | Re-run Steps 1–2 for new actions | Delivery engineer |

---

## Troubleshooting Quick Reference

| Symptom | Likely cause | Action |
|---|---|---|
| Reviewers approve everything without reading | Review surface lacks evidence, or batches too large | Steps 3 and 5 |
| Business case not landing | Review time too high | Re-place the gate; improve the surface |
| Compliance rejects at sign-off | Gates assigned without them | Step 2 with compliance in the room |
| Downstream teams act on unreviewed output | Draft status not carried downstream | Step 4 |
| Rejected work disappears | Undefined reject path | Step 6 |
| Errors found after approval | Gate not effective | Re-tighten; investigate the surface |
| Review queue is the bottleneck | Gate too broad, or too few reviewers | Confidence-route; add exception-only gating |

---

## Exit Criteria

- [ ] Every action enumerated
- [ ] Gate assigned per action and reviewed by compliance
- [ ] Review surface validated with a real reviewer finding a planted error
- [ ] Draft status represented in every downstream destination
- [ ] Batch and blast-radius limits configured and tested
- [ ] Reject path implemented and tested
- [ ] Instrumentation live before pilot
- [ ] Pilot run with everything gated, metrics captured
- [ ] Any gate relaxation backed by evidence and signed off
