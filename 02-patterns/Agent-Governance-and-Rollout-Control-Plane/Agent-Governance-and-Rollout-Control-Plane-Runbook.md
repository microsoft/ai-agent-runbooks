# Runbook — Agent Governance & Rollout Control Plane

> **Use this before an agent rollout goes past the pilot group.** Read
> [Agent-Governance-and-Rollout-Control-Plane.md](Agent-Governance-and-Rollout-Control-Plane.md)
> first.

---

## Prerequisites

| Requirement | Owner |
|---|---|
| Microsoft 365 admin access | M365 admin |
| Power Platform admin access | Power Platform admin |
| Purview / compliance admin access (for audit) | Compliance admin |
| Security or risk stakeholder identified | Customer |
| Workplace / adoption owner identified | Customer |

> ⚠️ Platform controls in this area change frequently. Verify the current capability in the
> admin centres before writing the design document. Do not reuse a design older than a quarter
> without re-validating it.

---

## Step 1 — Baseline: What Exists Today

Before proposing anything, produce the current state.

### 1a. Export the agent inventory

**Microsoft 365 admin center → Copilot → Agents.** Export the registry. Record:

| Field | Why |
|---|---|
| Agent name | Identification |
| Publisher type (organization, user-shared, Microsoft, partner, Frontier) | Which door it came through |
| Creator | Ownership |
| Created date | Sprawl rate |
| Host products | Where it runs |
| Availability status | Current exposure |

### 1b. Record the current settings

Screenshot or document the current state of the agent-related settings in the Microsoft 365
admin center and the relevant Power Platform environment settings. When behaviour changes
mid-project — and it will — you need to know whether you changed it.

### 1c. Quantify the problem

| Metric | Today |
|---|---|
| Total agents in registry | |
| Agents shared organization-wide | |
| Agents with no identifiable owner | |
| Agents created in the last 30 days | |
| Power Platform environments containing agents | |

**Deliverable:** baseline inventory and settings snapshot.

---

## Step 2 — Decide the Policy (Workshop)

Run a single workshop with the security, workplace, and Power Platform owners. Fill in this
table. Do not leave the room without it.

| # | Question | Decision | Applies to which build surface |
|---|---|---|---|
| 1 | Who can create agents? | | Agent Builder / SharePoint / Copilot Studio / pro-code |
| 2 | Who can use agents? | | All surfaces |
| 3 | Can creators share organization-wide? | | |
| 4 | Can creators share with security groups? | | |
| 5 | Is there an audience size cap? | | |
| 6 | Approval route: store submission or direct share? | | |
| 7 | Who approves? | | |
| 8 | Which connectors are permitted in agents? | | |
| 9 | Is web grounding allowed? | | |
| 10 | Which environments may host agents? | | Copilot Studio |
| 11 | How is an agent blocked in an emergency, and by whom? | | |
| 12 | What is retained for audit, and for how long? | | |

**Deliverable:** signed policy decision table.

---

## Step 3 — Configure Microsoft 365 Controls

Work through the agent settings in **Microsoft 365 admin center → Copilot → Agents &
connectors**, applying the decisions from Step 2.

| Area | What to configure |
|---|---|
| Agent availability | Which users or groups can access agents |
| Agent creation | Restrict the creation entry points to the nominated maker group where the platform supports it |
| Sharing | Sharing scope and audience restrictions |
| Agent Store / requests | Enable the submission and approval route; assign approvers |
| Individual agents | Block or allow specific first-party, partner, and Frontier agents |
| Connectors | Which Copilot connectors are available, and to whom |

Two practical notes:

- **First-party assistants** such as Researcher and Analyst are part of the core Copilot
  experience and are not governed by the same agent settings. Confirm this with the customer —
  it frequently comes up as "we blocked agents and lost Researcher", or the reverse.
- **Blocking an agent does not always remove it from every surface immediately.** Verify the end
  user experience after blocking, and set expectations accordingly.

**Deliverable:** configured settings, with a screenshot record.

---

## Step 4 — Configure Power Platform Controls

Only applies where Copilot Studio agents are in scope.

1. **Environment strategy.** Decide which environments may host agents. Restrict maker access on
   the rest. The default environment should not host production agents.
2. **DLP policies.** Define connector groups (business / non-business / blocked) aligned to
   decision 8 in Step 2. Apply per environment.
3. **Credit capacity.** Allocate Copilot Credits per environment rather than letting everything
   draw from the tenant pool. See
   [Copilot Credits & Cost Control](../Copilot-Credits-Cost-Control/Copilot-Credits-Cost-Control-Runbook.md).
4. **Managed Environments.** Enable for any environment hosting production agents, for the
   additional governance signals.
5. **Solution and ALM discipline.** Require agents to be built inside solutions in a dev
   environment and promoted. This is a policy decision as much as a technical one.

**Deliverable:** environment and DLP design, applied.

---

## Step 5 — Establish the Approval Route

A control that people route around is not a control. Make the approved path the fastest one.

1. Publish a short intake form: agent name, purpose, audience, data sources, owner, review date.
2. Define the review checklist:

| Check | Pass criteria |
|---|---|
| Named owner and backup | Both identified and aware |
| Purpose is specific | Not "a general assistant" |
| Data sources listed and permitted | Match the DLP and connector policy |
| Audience justified | Matches the purpose |
| Boundaries defined | Especially for HR, legal, finance, and safety-adjacent topics |
| Evaluation evidence | At least a basic accuracy and consistency test |
| Review date set | Agents decay; schedule the recheck |

3. Commit to a turnaround time. If approval takes three weeks, people will use direct sharing
   instead and your governance model becomes fiction.

**Deliverable:** published intake form, checklist, and turnaround commitment.

---

## Step 6 — Audit and Observability

| Capability | Where | What to configure |
|---|---|---|
| Agent inventory | Microsoft 365 admin center agent registry | Scheduled export |
| Usage reporting | Microsoft 365 admin center | Baseline the first month |
| Prompt and response audit | Microsoft Purview | Confirm retention meets decision 12 |
| Data security posture | Purview DSPM for AI | Review agent-related signals |
| Copilot Studio telemetry | Application Insights | Enable for production agents |
| Cross-platform agent inventory | Microsoft Agent 365 | Where licensed, use as the consolidated registry |

Known gaps to design around rather than assume away:

- Reporting across agent types is not always unified in a single view. Plan to combine sources.
- Agent identifiers may not be consistent across usage reports and audit logs. Do not build a
  chargeback model on the assumption that they are — validate first.
- Agents that have never been shared may not appear in usage reports. The registry, not usage,
  is your inventory source of truth.

**Deliverable:** audit and reporting configuration, plus a documented list of known gaps.

---

## Step 7 — The Amnesty (only if sprawl already exists)

Where user-created agents are already widespread:

1. Export the registry.
2. Communicate a deadline: owners register their agent through the intake form or it will be
   blocked.
3. Offer help. Most unregistered agents exist because someone had a real problem and no
   sanctioned route.
4. On the deadline, block unclaimed agents that are shared beyond their creator. Leave
   personal-use agents alone unless policy says otherwise.
5. Publish the outcome. Visibility is what stops the next wave.

**Deliverable:** amnesty communication, results, and blocked-agent list.

---

## Step 8 — Operate

| Cadence | Activity | Owner |
|---|---|---|
| Weekly (first month) | New agents in registry, triage unowned | Workplace admin |
| Monthly | Sharing-scope report; agents shared org-wide | Workplace admin |
| Monthly | Credit consumption by environment and agent | Power Platform admin |
| Quarterly | Re-validate policy against current platform capability | Delivery engineer |
| Quarterly | Review-date sweep: agents past their review date | Agent owners |
| On incident | Block / quarantine procedure | Named responder |

---

## Emergency: Block a Single Agent

Test this before you need it.

1. Identify the agent in the Microsoft 365 admin center agent registry.
2. Block it.
3. Verify the end-user experience — confirm it is genuinely unavailable, not merely hidden.
4. For a Copilot Studio agent, also disable it in the hosting environment.
5. Notify the owner with the reason and the remediation path.
6. Record the incident.

Run this end to end on a test agent during Step 3 and record how long it takes. "We can block
an agent" is a claim; "we blocked a test agent in four minutes and here is the evidence" is a
control.

---

## Exit Criteria

- [ ] Baseline inventory and settings snapshot captured
- [ ] Policy decision table signed by security and workplace owners
- [ ] Microsoft 365 controls configured and recorded
- [ ] Power Platform environment and DLP design applied
- [ ] Approval route published with a committed turnaround time
- [ ] Audit and reporting configured; known gaps documented
- [ ] Emergency block procedure tested and timed
- [ ] Operating cadence agreed with named owners
