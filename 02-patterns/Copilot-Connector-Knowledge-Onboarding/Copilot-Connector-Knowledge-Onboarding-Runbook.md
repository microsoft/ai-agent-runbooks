# Runbook — Copilot Connector Knowledge Onboarding

> **Use this during active delivery.** Read
> [Copilot-Connector-Knowledge-Onboarding.md](Copilot-Connector-Knowledge-Onboarding.md) first
> to confirm the pattern applies.

---

## Prerequisites

| Requirement | Owner |
|---|---|
| Microsoft 365 admin role (or Search Admin) | Microsoft 365 admin |
| Admin access to the source system | Source system admin |
| Service / integration account in the source system | Source system admin |
| Named pilot group (security group) | Delivery engineer |
| Test users: one with broad access, one with restricted access | Delivery engineer |

---

## Step 1 — Source Inventory

Complete this table before touching the admin center. Every row is a decision you will
otherwise make badly under time pressure.

| Container (KB / space / project) | Permission mechanism | Scripted rules? | Item count | Language | Content owner | In scope? |
|---|---|---|---|---|---|---|

**Deliverable:** a signed inventory. The content owner column is not optional — content without
an owner cannot be remediated when it produces bad answers.

---

## Step 2 — Permission Model Decision

Answer these three questions in writing:

1. **Does the source use scripted or computed access rules?**
   If yes, the connector needs its advanced evaluation path, which typically requires
   source-side API setup. If you use the simple path against scripted deny rules, the connector
   fails safe and blocks that content for everyone — expect "the connector indexed nothing
   useful" as the symptom.

2. **What roles does the service account need?**
   Base read roles are rarely sufficient. Scoped applications inside the source system (HR
   modules in particular) need their own read roles. Missing roles usually cause *silent*
   failures: empty permission results interpreted as "no restrictions".

3. **How do source identities map to Entra identities?**
   Default is email. If the source uses employee number, SAM account name, or a separate
   namespace, configure a custom mapping formula at connection creation.

**Deliverable:** permission model note, reviewed by the source system admin.

---

## Step 3 — Source-Side Preparation

Generic sequence — adapt to the specific connector's documentation:

1. Create the integration user with the required roles.
2. Enable API access on the tables or endpoints the connector reads.
3. Register the authentication method. Prefer federated identity credentials where the connector
   supports them — no client secret to store, no rotation to schedule.
4. If using the advanced permission path, create the required API namespace or scripted endpoint
   and record its name.
5. Verify the integration user can read: content, permission definitions, and the system
   property table that controls default visibility.

**Deliverable:** integration account documented with its roles and owner.

---

## Step 4 — Deploy the Connection

1. **Microsoft 365 admin center → Copilot → Connectors → Gallery**.
2. Select the connector.
3. Configure:

| Setting | Guidance |
|---|---|
| Display name | A name users will recognise. It appears on citations and as a source filter |
| Permission / criteria flow | Simple or Advanced, per Step 2 |
| Instance URL | Source system base URL |
| Authentication | Federated identity preferred; otherwise OAuth 2.0 |
| API namespace | Only for the advanced path |
| Query string / filter | Narrow to the containers in scope from Step 1 |
| Access permissions | Leave as "only people with access". Never set to "Everyone" |
| Access URL expression | Set it now. On many connectors this cannot be changed later |
| Rollout | **Limited audience** = the pilot group |

4. Create the connection. Indexing starts immediately.

**Deliverable:** connection created with staged rollout to the pilot group.

---

## Step 5 — Wait, Then Reconcile

Wait for status **Ready**. Then:

| Check | Pass criteria |
|---|---|
| Indexed item count | Within a reasonable margin of the Step 1 inventory |
| Indexed user / identity count | Matches the expected population |
| Sample item inspection | Pick a known item, verify its computed permissions |

If the item count is far below expectation, work through this order:

1. Query string filter too narrow
2. Service account missing a role on a specific container
3. Permission evaluation failing safe (wrong flow selected in Step 2)
4. Container excluded by a default-visibility system property

Do not proceed while counts are unexplained. Every downstream quality complaint will trace back
to this.

**Deliverable:** reconciliation record.

---

## Step 6 — Permission Validation (Both Directions)

This is the step that unblocks security review. Do it properly and keep the evidence.

### Positive tests

| # | Test user | Content they should see | Query | Result |
|---|---|---|---|---|

### Negative tests

| # | Test user | Content they must NOT see | Query | Result |
|---|---|---|---|---|

Include at least one negative test against the most sensitive content in scope — restricted HR
content, executive material, or a security runbook. If that returns content, stop everything.

**Deliverable:** completed test matrix, signed by the source system admin and the security
reviewer.

---

## Step 7 — Citation and Link Validation

1. Ask Copilot a question that returns connector content.
2. Click the citation.
3. Confirm it opens the correct item, in the UI the organization actually uses.

If links are wrong or truncated, the access URL expression needs fixing — and on many connectors
that means recreating the connection. Better to discover this now than after tenant-wide rollout.

**Deliverable:** citation validation note.

---

## Step 8 — Set Freshness Expectations

Document and communicate:

| Event | When it becomes visible |
|---|---|
| New or edited item | Next incremental crawl |
| Item-level permission change | Next incremental crawl |
| Container-level permission change | Next **full** crawl |
| Identity / group membership change | Next **full** crawl |
| Deleted item | Next full crawl |

Content owners consistently assume changes are instant. Tell them, in writing, before they raise
an incident about it.

**Deliverable:** freshness note in the operations handover.

---

## Step 9 — Expand Rollout

Only after Steps 5–7 pass:

1. Expand the connector's rollout audience.
2. Expand the agent's audience **to match**. A user with the agent but outside the connector
   audience gets confidently empty answers, which is the worst possible first experience.
3. Monitor connector health in the admin center for the first two full crawl cycles.

**Deliverable:** rollout record with audience definitions for both connector and agent.

---

## Step 10 — Operational Handover

| Item | Owner |
|---|---|
| Connector health monitoring | M365 admin |
| Service account credential / certificate lifecycle | Source system admin |
| Content freshness and de-duplication | Content owner |
| Re-running the permission test matrix after major source changes | Delivery engineer |
| Graph connector agent patching (on-premises sources only) | Infrastructure team |

---

## Troubleshooting Quick Reference

| Symptom | Likely cause | Action |
|---|---|---|
| Connection stuck, low item count | Query string or missing role | Recheck Step 2 and Step 4 |
| Whole container missing from results | Permission evaluation failed safe on scripted rules | Switch to the advanced flow and configure the API endpoint |
| Restricted content visible to everyone | Service account cannot read permission definitions for a scoped application | Add the scoped read role, run a full crawl, re-test |
| Some users get no results at all | Identity mapping failure | Configure the custom mapping formula; check for users without the mapped attribute |
| Citations point to broken URLs | Access URL expression | Recreate the connection with the correct expression |
| Results are stale after a permission change | Waiting on a full crawl | Confirm the full crawl schedule; explain the lag |
| Content is searchable but the agent does not use it | Retrieval / relevance, not ingestion | Move to the [Grounding & Response Quality Remediation](../Grounding-and-Response-Quality-Remediation/Grounding-and-Response-Quality-Remediation-Runbook.md) runbook |

---

## Exit Criteria

- [ ] Source inventory signed
- [ ] Permission model documented and reviewed
- [ ] Integration account documented with an owner
- [ ] Connection Ready, counts reconciled
- [ ] Positive and negative permission tests passed and retained as evidence
- [ ] Citation links validated
- [ ] Freshness expectations communicated in writing
- [ ] Connector and agent audiences aligned
- [ ] Operational handover complete
