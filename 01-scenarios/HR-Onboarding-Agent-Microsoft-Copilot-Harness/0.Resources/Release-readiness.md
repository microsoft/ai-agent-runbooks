# HR Onboarding Agent - Release Readiness

Configuration and acceptance guidance for the [walkthrough](../3.Runbook.md). The scenario uses one agent, two skills and a simple Outlook workflow. No tenant setup or live test execution is claimed.

## Release gates

Keep actual tenant IDs, contacts and results in an access-controlled deployment record. Never put credentials in Git.

| Gate | Owner | Required evidence / exit criterion |
|---|---|---|
| G1 | Tenant admin, delivery and cost owners | Suitable environment, Microsoft Copilot authoring access, approved model/data policies and Copilot Credits or pay-as-you-go billing |
| G2 | HR content owner and ServiceNow admin | Approved articles by topic, audience and effective date; usable citations and known conflicts/gaps |
| G3 | M365 identity and ServiceNow admins | Tested source permissions for permitted, denied and revoked users; an audience-safe email knowledge scope |
| G4 | Delivery/test owner and HR reviewer | Normal chat, checklist and follow-up tests pass; policy claims and citations manually reviewed |
| G5 | Release owner and tenant admin | Published version, approved channel audience, catalog approval, support contact and rollback plan |
| D1 | Delivery owner | Environment/agent IDs, connection names, model, published version, pilot audience and evidence location |
| D2 | HR and privacy owners | Approved HR contact, retention, log access and data-minimization rules |
| D3 | Mailbox and identity owners | Connected mailbox/folder, allowed pilot senders, knowledge scope, manual follow-up owner and reviewed retry settings |
| E1 | Workflow and tenant owners | Exact published agent invocation, autonomous skill routing and HTML-only result verified without sending |
| E2 | HR, identity and workflow owners | Reviewed sample answers, recipient mapping, failure behavior and workflow pause; limitations understood and acceptable for the restricted pilot |
| E3 | Release and mailbox owners | Approved real-mail pilot, observed reply and workflow action results, monitoring and tested pause procedure |

These checks do not add runtime validators, sender authentication, queues or deduplication. See the [actual workflow limitations](Capability-matrix.md#limitations-and-operational-ownership). If the knowledge cannot safely be shared with every possible recipient, keep automatic email disabled.

Build the workflow as a draft, finish the agent and verify E1 before publishing the email workflow. Use synthetic content and approved test accounts for the real-mail pilot. Approval is for the pilot/release, not for each message.

The [workflow designer](https://learn.microsoft.com/en-us/microsoft-copilot-studio/workflows-experience/flow-designer#test-your-workflow) can call real connector APIs during tests. Mock input alone does not prevent sending. For E1, use an isolated test workflow with only the agent invocation and no send action/connection; never run the final send node as a supposedly harmless preview.

## Global agent instructions

Copy this block into the agent. Entry-path handling must be verified in the actual workflow trace; a label pasted into chat is not trusted runtime context. The workflow, not the model, controls mail actions.

```markdown
You help all employees understand ongoing HR policies, benefits, wellness and leave processes. Onboarding and role-transition guidance are supported subsets only when approved applicable sources establish them.

Be concise, respectful and clear. Respond in the user's language when supported, preserve source names/links, and ask for clarification when translation is uncertain.

## Support two entry paths:

- Interactive employee chat.
- HR mailbox workflow intake (autonomous)

### For autonomous intake request:

- Agent is invoked autonomously using Workflow
- **Always** access agent knowledge sources to search answer to user questions
- If asked about onboarding, use 'hr-onboarding-checklist' skill to format onboarding tasks which should be included in the email body
- **IMPORTANT!** Before responding, use 'hr-email-reply' skill to create structured email body which should always follow the same formatting

### For interactive chat:

- Use only the agent knowledge sources to answer user questions
- If user asks about onboarding steps/tasks/actions the 'hr-onboarding-checklist' skill to create structured email body which should always follow the same formatting

## HR contact and escalation guidance

Use the HR contact route from trusted configuration or authorized knowledge.

If none is available, advise contacting the HR team through the normal internal channel without inventing an address. Guidance is not a created case or handoff.
```

## Workflow setup

Follow [Step 2-3](../3.Runbook.md#step-2-3-add-workflow-for-autonomous-trigger) to build the workflow. Keep it unpublished until [runtime skills](../3.Runbook.md#step-2-4-add-runtime-skills) and [greeting/prompts](../3.Runbook.md#step-2-5-add-greeting-message-and-suggested-prompts) are complete and the agent is republished.

| Component | Configuration |
|---|---|
| Trigger | Office 365 Outlook **When a new email arrives**, connected user's mailbox |
| Filter | **Subject filter = HR question** |
| Agent | Existing published **HR Onboarding Agent** |
| Agent message | Trigger **Body** |
| Send action | Office 365 Outlook **Send an email** |
| Recipient | Trigger **From**, not text generated by the agent |
| Subject | **Answer to your HR inquiry** |
| Body | Agent **Result**, expected to be HTML only |

No custom intake, validation, submission, status or exception-queue endpoints are required. No mailbox tools are added to the agent. This is **workflow → agent → workflow**, not a workflow exposed as an agent tool or a native Email channel.

Before enabling:

1. Confirm the Outlook connection account, monitored folder and send permissions.
2. Verify effective knowledge identity and restrict the corpus to content safe for every possible recipient. The trigger's subject filter is not an access-control mechanism.
3. Check that the exact published agent recognizes autonomous invocation and returns HTML through `hr-email-reply`. If it returns conversational text, resolve routing before activating sending; do not assume passing **Body** alone guarantees selection.
4. Review Outlook retry behavior, expected sender audience, auto-reply/loop risks and manual coverage. Do not assume exactly-once delivery or automatic exception handling.
5. Complete E1/E2, obtain pilot approval, then publish the final workflow and run E3 with an approved test sender.

## Acceptance tests

Use [Sample prompts](../4.Sample-prompts.md#acceptance-cases). Repeat relevant chat tests in three fresh conversations and inspect facts/citations manually.

| Case | Expected observation |
|---|---|
| HR policy + follow-up | Natural cited answers, no email formatting |
| Onboarding checklist | Phased numbered suggestions, unknown details bracketed, no action-completion claims |
| Sending requested in chat | No Outlook operation; explanation of the no-send boundary |
| Denied/missing/conflicting evidence | No restricted content or fabricated policy; explicit limitation |
| Workflow invocation without sending | Knowledge retrieval followed by email skill; HTML-only result, correct source rows and sign-off |
| Restricted real-mail test | Correct configured recipient and subject, rendered HTML body, received reply and send-action evidence |
| Missing evidence in email | Honest limitation in HTML; no claim of a queue/hold/handoff, since the simple workflow may send that explanation |
| Failed/uncertain send | Record actual workflow and mailbox evidence; no blind replay or invented success |
| Maintenance pause | Disabled workflow admits no new test events after pause verification; check existing executions separately |

## Evaluate the agent

In **Evaluate**, select the agent version and test profile. [General quality scoring](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/analytics-agent-evaluation-intro) does not compare expected answers. Check exact facts, citations, skill routing and absence of unintended actions manually.

Record version, identity, source set, entry path, timestamps, result and evidence. Evaluate/Preview agent output is not evidence that Outlook sent or delivered a message.

## Autonomous email test stages

1. **Non-sending composition:** use synthetic, audience-safe knowledge and an isolated agent-only workflow with no send node. Verify identity, routing and HTML.
2. **Restricted real-mail pilot:** after E1/E2/D3 and release approval, publish the final workflow. Send a synthetic inquiry with **HR question** in the subject from an approved account. Check the Agent result, Outlook action and received email separately.
3. **Failure and pause checks:** inspect failed or delayed executions, verify how operators are informed through the available tenant monitoring, and test disabling the workflow. Do not deliberately replay a send with an uncertain outcome.

This workflow supplies no automatic sender verification, content validator, sensitive-input filter, duplicate suppression or HR queue. Wider deployment needs a separate assessment of these limitations and any additional controls; a successful demonstration is not proof of production readiness.

## Monitor and roll back

1. Review agent **Preview → History**, workflow execution details, the connected mailbox and credit usage. HR reviews answer quality; the mailbox owner follows up on failed, missed or unsupported inquiries.
2. If responses or access are wrong, disable the email workflow first. Inspect already-running executions separately; disabling future intake does not recall mail or necessarily cancel an in-flight send.
3. Check the send action and mailbox/provider evidence before any retry. An agent run marked completed is not proof of a sent or delivered email.
4. Correct and republish the agent or restore a recorded known-good configuration through the supported tenant process. Recheck routing and HTML without sending before re-enabling the workflow.
5. Restrict or withdraw affected channel access when needed. Preserve shared knowledge connections still used by permitted chat users. Verify the final workflow state and channel access rather than assuming removal of a skill stops delivery.
