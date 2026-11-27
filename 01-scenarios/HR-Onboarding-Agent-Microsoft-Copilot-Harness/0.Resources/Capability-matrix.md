# Employee HR capability matrix

**Implementation status:** This scenario supplies documentation and two runtime skill files for one HR agent. The runbook configures a simple Outlook workflow in the tenant; no executable workflow, custom backend, exception queue or tenant deployment is supplied.

## Capability inventory

| Capability / linked Markdown file | Behavior and boundary | Tools or knowledge | Dependencies | Entry path |
|---|---|---|---|---|
| [hr-onboarding-checklist](Skills/hr-onboarding-checklist.md) | Search configured knowledge, then return a phased numbered onboarding checklist with placeholders for unknown details; no task writes | Configured agent knowledge and supplied new-hire details; no action tools | Available onboarding knowledge; name, role, start date, location and equipment needs when known | Interactive chat, including general onboarding questions |
| [hr-email-reply](Skills/hr-email-reply.md) | Short HTML email body with numbered citations and a source table; no sending | No tools; article content already retrieved by the agent | Employee question and applicable ServiceNow article text, KB numbers, titles and links | Workflow response preparation |

Ordinary HR policy answers and follow-up conversation use global instructions and configured knowledge, not a separate skill. Skills guide behavior; they do not create connections, grant permissions or enforce workflow controls.

## Standard configuration and entry-path boundaries

Import both skills into the same published HR agent.

- **Interactive chat:** answer HR questions conversationally, retrieve applicable knowledge for policy claims, and use the checklist skill for onboarding plans. Do not add email subjects, sign-offs or workflow output to normal chat.
- **Autonomous email:** the Outlook trigger invokes the agent through Workflows. The agent retrieves knowledge and uses `hr-email-reply` to return HTML. The workflow sends the result through Outlook without a per-message approval step.
- **No agent mail tools:** the Outlook trigger and send action belong to the workflow, not **Build > Tools**. A chat request cannot trigger sending merely by asking or pasting an email.

The intended scope excludes personal HR records, medical histories, payroll changes, benefit enrollment, leave submissions, HR cases and provisioning. No Reply All, CC/BCC, attachments, forwarding, mailbox drafts or general inbox search are configured.

## Knowledge dependency

The [ServiceNow Knowledge Copilot connector](https://learn.microsoft.com/en-us/microsoft-365/copilot/connectors/servicenow-knowledge-overview) ingests approved articles and permission metadata into Microsoft 365. The agent retrieves indexed content through its configured knowledge source, not through a direct ServiceNow query. Index freshness depends on synchronization.

Validate authenticated employee access in chat. **A workflow connection's retrieval rights are not automatically the email sender's rights.** For this simple email workflow, use only knowledge approved for every possible recipient and restrict the mailbox audience using tenant controls. A subject filter and a From value do not authenticate an employee or enforce source permissions. If that audience/data boundary cannot be established, do not enable automatic replies.

## Documented product operations and call direction

| Operation / surface | Direction | Scenario configuration |
|---|---|---|
| Outlook **When a new email arrives** | Connected user's mailbox → workflow | **Subject filter = HR question**; no shared mailbox |
| Workflows **Agent** node | Workflow → existing published HR agent → result | **Message = Body** from the trigger; verify autonomous skill routing and effective retrieval identity before enabling sending |
| Outlook **Send an email** | Workflow → recipient | **To = From** on the trigger; **Subject = Answer to your HR inquiry**; **Body = Result** from the Agent node |
| Agent **Preview → History** | Maker inspects agent execution | Check the autonomous run, knowledge retrieval and email skill execution |
| Workflow execution details | Operator inspects trigger and action outcomes | Check sending separately; an agent run completing is not proof of email delivery |

See [Workflows Agent-node guidance](https://learn.microsoft.com/en-us/microsoft-copilot-studio/workflows-experience/agent-node-workflow) and the [Outlook connector reference](https://learn.microsoft.com/en-us/connectors/office365/). The workflow is not an agent-called tool or a native Email channel. No custom operation IDs are required.

## Email workflow configuration

1. Prepare and publish the HR agent with its instructions, knowledge and both skills.
2. Configure the Outlook trigger, Agent node and Outlook send action using the mappings above.
3. Check agent output without an active send action first. Keep the final workflow unpublished until the complete agent and test scope are ready.
4. Enable the workflow only for an approved test mailbox/audience, then send an inquiry with **HR question** in its subject.
5. Inspect both the agent trace and the workflow send action; verify the received message and its source references.

The screenshot order and delayed workflow publication are explained in the [runbook](../3.Runbook.md#step-2-3-add-workflow-for-autonomous-trigger).

## Agent reply result

The result is **HTML only**, not JSON and not a subject/body object. It contains a greeting, the question, a source-grounded answer, a next step when supported, a source table with **Ref**, **KB number**, **Title** and **Link**, and the **HR Onboarding Agent** sign-off. If the name is unknown, use a neutral greeting. Do not leave template placeholders in an email.

The subject and recipient come from workflow configuration, never from the generated body. The email skill reports evidence gaps in the HTML; that does **not** stop the send action. The current workflow sends the returned result without a separate semantic validator, HTML sanitizer or hold branch.

## Limitations and operational ownership

| Area | Current behavior / owner action |
|---|---|
| Identity and source access | Mailbox and identity owners must verify the connection account and recipient-safe knowledge scope. No custom sender mapping or per-recipient entitlement check is supplied. |
| Answer quality and HTML | HR reviews pilot answers, citation mappings, source tables and rendering. Skill instructions guide formatting but are not a deterministic validation layer. |
| Unsupported inquiries | The agent should explain missing evidence and provide a known HR contact route. The simple workflow can email that explanation; it does not queue, block or escalate it automatically. |
| Duplicate events and retries | The Outlook trigger can produce duplicate or missed events. No durable deduplication, outbox or exactly-once guarantee is supplied. Inspect retry settings and do not replay uncertain sends without checking the mailbox/provider outcome. |
| Loops and unwanted intake | The reply subject omits **HR question**, but that alone is not comprehensive loop suppression. Mailbox owners must review auto-replies, external access and unintended matching messages before enabling the workflow. |
| Attachments and sensitive content | No attachment processing or personal-record lookup is configured. This is not a deterministic filter that rejects every sensitive or attachment-bearing email. Use synthetic, non-sensitive pilot inquiries. |
| Failures and delivery | Workflow/agent history exposes execution outcomes, not a custom status API or proof of recipient delivery. Mailbox owners monitor failures and handle unresolved inquiries manually. |
| Maintenance | Disable the email workflow to stop new automated intake; removing a skill does not stop the Outlook action. Inspect already-running executions separately, and verify the pause before changing the agent. |

These limitations make this a development walkthrough, not a production-ready HR mail service. Wider use requires an explicit review of the actual audience, data exposure and operational controls; additional controls are separate work, not implied capabilities.

## Integration acceptance and ownership

Use [release readiness](Release-readiness.md#release-gates) and [sample tests](../4.Sample-prompts.md#acceptance-cases) to record connection identity, published agent version, HTML output, observed sends, failures and pause behavior. HR owns answer quality, tenant/identity owners own access, and the mailbox/workflow owner handles monitoring and manual follow-up. No live results are supplied.
