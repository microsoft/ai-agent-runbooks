# Runbook — Agent Publishing & Channel Deployment

> **Run this before you promise a go-live date.** Read
> [Agent-Publishing-and-Channel-Deployment.md](Agent-Publishing-and-Channel-Deployment.md) first.

---

## Prerequisites

| Requirement | Owner |
|---|---|
| A working agent that passes its evaluation set in the authoring environment | Delivery engineer |
| Defined audience, including licence mix | Business sponsor |
| Test accounts: one licensed, one unlicensed (if unlicensed users are in scope), one guest (if applicable) | M365 admin |
| Admin access to the target channels | M365 / Teams / SharePoint admin |
| Agreed acceptance criteria including channel parity | Delivery engineer + sponsor |

---

## Step 1 — Channel Selection

| Channel | In scope? | Why | Audience |
|---|---|---|---|
| Microsoft 365 Copilot | | | |
| Microsoft Teams | | | |
| SharePoint | | | |
| Web / custom | | | |
| Third-party | | | |

Justify each. Every additional channel multiplies the test matrix and adds failure modes. If a
channel cannot be justified by a specific audience, drop it.

**Deliverable:** signed channel selection.

---

## Step 2 — Licensing Path Validation (do this before building further)

For each in-scope channel, walk the exact path a real user will take.

| Channel | Test user (least privileged in scope) | Can they add the agent? | Can they use it? | Error text if not |
|---|---|---|---|---|

If any user is blocked:

1. Record the **exact** error message.
2. Check whether the agent's knowledge sources introduce a licence dependency — graph-grounded
   or people-based knowledge in particular can add one that instruction-only agents do not have.
3. Check whether pay-as-you-go is configured **and** whether the admin-center policy and the
   Power Platform billing policy agree. Disagreement between the two is a frequent cause of
   confusing blocks.
4. If the block persists, treat it as an architectural constraint, not a bug to work around.
   Either change the audience, change the agent type, or change the channel.

> ⚠️ Do not let a licensed maker's successful test stand in for this. The person who built the
> agent is the least representative tester available.

**Deliverable:** licensing validation matrix with evidence.

---

## Step 3 — Authentication Prototype

Only where the agent uses authenticated knowledge, actions, external orchestration, or
third-party channels.

| Test | Result |
|---|---|
| First-time sign-in experience for a normal user | |
| Repeat invocation — is re-authentication required? | |
| Actions attribute to the invoking user, not the creator | |
| Parent → child agent chains propagate auth context | |
| Programmatic / SDK invocation does not trigger interactive prompts | |
| Guest or external user experience (if in scope) | |

The attribution test matters most. Run an action as a non-maker user and inspect the source
system's audit record. If it names the agent's creator rather than the actual user, the
connection is configured with maker credentials — fix it now, because it will fail a security
review later.

**Deliverable:** authentication test results, accepted by the security stakeholder.

---

## Step 4 — Publish to a Pilot Audience, One Channel at a Time

1. Publish to the first channel only.
2. Share with the pilot group.
3. Confirm the agent appears in the agent registry with the expected publisher and availability.
4. Wait for propagation and confirm the pilot group can see the current version. Version
   propagation is not instantaneous, and stale versions in the hands of some users is a common
   and confusing report.

Repeat per channel. Resist the temptation to publish everywhere and test in parallel — you lose
the ability to attribute a failure to a channel.

**Deliverable:** per-channel publish record.

---

## Step 5 — Run the Evaluation Set Per Channel

Take the agent's existing evaluation set and run it **in each channel**.

| # | Question | Authoring | M365 Copilot | Teams | SharePoint | Web | Match? |
|---|---|---|---|---|---|---|---|

Record differences in three categories:

| Category | Example | Action |
|---|---|---|
| **Acceptable, document it** | Slightly different formatting | Add to the launch communication |
| **Needs mitigation** | Fewer citations shown; truncated snippets | Shorten titles, reduce source count, or set expectations |
| **Blocking** | Substantially shallower answers; features that do not work | Do not launch on that channel until resolved |

Pay particular attention to answer depth if the agent uses multi-agent orchestration. Loss of
depth and truncation when surfacing through Teams and the Microsoft 365 Copilot channel is a
known and significant effect — validate it explicitly rather than assuming parity.

**Deliverable:** per-channel evaluation matrix.

---

## Step 6 — Rich Content and Payload Tests

Run these in every channel where they apply.

| Test | M365 Copilot | Teams | SharePoint | Web |
|---|---|---|---|---|
| Adaptive card renders correctly | | | | |
| Card actions work | | | | |
| Image renders | | | | |
| Chart renders | | | | |
| Citations appear and resolve | | | | |
| Long response is not truncated | | | | |
| File upload works (if in scope) | | | | |
| Generated file downloads and opens | | | | |
| Long-running action completes without timeout | | | | |
| Quick replies / suggested prompts work | | | | |

Any failure here is either a design change (simplify the card, shorten the response, paginate)
or a documented limitation. Do not launch with an untested rich-content path — this is where the
most visible embarrassments happen.

**Deliverable:** rich-content test matrix.

---

## Step 7 — Session and History Behaviour

| Test | Result |
|---|---|
| Conversation history persists as users expect, per channel | |
| Multi-turn context is retained across turns | |
| Behaviour in a Teams group chat | |
| Behaviour in a Teams channel | |
| Behaviour on mobile | |
| Session timeout behaviour | |

Group chat and channel contexts frequently behave differently from one-to-one chat, especially
where the underlying content is permission-trimmed. If group usage is in scope, test it
specifically.

**Deliverable:** session behaviour notes.

---

## Step 8 — Document the Differences

Produce a one-page "what to expect" note for the launch communication:

| Channel | What works | Known differences | Where to go instead |
|---|---|---|---|

This single page prevents most launch-week support tickets. Publish it with the agent, not after
the complaints start.

**Deliverable:** channel differences note.

---

## Step 9 — Rollback Plan

Before go-live, confirm and **time** the following:

| Action | How | Who | Time taken |
|---|---|---|---|
| Unpublish from a single channel | | | |
| Block the agent tenant-wide | | | |
| Disable the agent in its environment | | | |
| Roll back to a previous agent version | | | |
| Notify users | | | |

Run these on a test agent. An untested rollback plan is a document, not a capability.

**Deliverable:** tested rollback procedure with measured timings.

---

## Step 10 — Go Live and Watch

| Window | Activity |
|---|---|
| Day 1 | Watch thumbs-down feedback and support channels directly |
| Week 1 | Daily triage: channel issue vs content issue vs expectation issue |
| Week 2 | Re-run the per-channel evaluation set — propagation and platform changes can shift behaviour |
| Month 1 | Review usage per channel. Retire channels nobody uses; each one carries ongoing test cost |

---

## Troubleshooting Quick Reference

| Symptom | Family | First check |
|---|---|---|
| "You need a Copilot licence" for a user who should have access | Licensing | Agent knowledge sources, and admin-center vs Power Platform billing policy alignment |
| Agent published but not visible | Publishing | Propagation delay, then agent registry availability status |
| Answers shorter or shallower than in authoring | Channel behaviour | Response and citation limits; multi-agent depth loss |
| Citations missing | Channel behaviour | Custom-rendered responses do not add citations automatically |
| Repeated sign-in prompts | Authentication | Channel auth model; connection configuration |
| Actions attributed to the creator | Authentication | End-user authentication configuration |
| Card does not render | Rendering | Test the exact card in the exact channel; simplify |
| Some users have an old version | Publishing | Version propagation; confirm and communicate the lag |
| Timeout on long actions | Payload | Redesign asynchronously |

---

## Exit Criteria

- [ ] Channel selection justified by audience and signed off
- [ ] Licensing path validated with the least-privileged real user, per channel
- [ ] Authentication prototype accepted, including action attribution evidence
- [ ] Published per channel to a pilot audience, staggered
- [ ] Evaluation set run in every channel with differences categorised
- [ ] Rich-content and payload tests completed per channel
- [ ] Session and group-chat behaviour verified
- [ ] Channel differences note published with the launch communication
- [ ] Rollback procedure tested and timed
- [ ] Post-launch watch schedule agreed
