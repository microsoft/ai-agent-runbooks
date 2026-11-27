# Employee HR runtime skills

These two Markdown files provide reusable task instructions for **HR Onboarding Agent in Microsoft Copilot Studio's Microsoft Copilot harness**. Import them into the same agent; they are not separate agents and are not installed into the repository coding assistant.

## Skills at a glance

| Capability / upload file | Standard use | Dependency |
|---|---|---|
| [hr-onboarding-checklist.md](hr-onboarding-checklist.md) | Search knowledge and return a phased, numbered onboarding plan in chat | Configured onboarding knowledge, supplied details and placeholders for unknown specifics |
| [hr-email-reply.md](hr-email-reply.md) | HTML email body with a source table | ServiceNow article content already retrieved by the agent; this skill does not search ServiceNow |

Download the [onboarding checklist](https://raw.githubusercontent.com/microsoft/ai-agent-runbooks/main/01-scenarios/HR-Onboarding-Agent-Microsoft-Copilot-Harness/0.Resources/Skills/hr-onboarding-checklist.md) or [email reply](https://raw.githubusercontent.com/microsoft/ai-agent-runbooks/main/01-scenarios/HR-Onboarding-Agent-Microsoft-Copilot-Harness/0.Resources/Skills/hr-email-reply.md) as raw Markdown. If the browser displays text, press **Ctrl+S** and keep the corresponding `.md` filename.

## What a skill adds

A skill packages **when to use a procedure, how to perform it and what the output should look like**. It helps the agent produce a consistent result without putting every task-specific instruction into the global instructions.

| Part of each file | Purpose |
|---|---|
| YAML `name` | Identifies the skill, such as `hr-email-reply` |
| YAML `description` | Describes matching requests and exclusions to guide skill selection |
| YAML `metadata` | Supplies category and icon metadata; it does not grant permissions |
| Purpose and When NOT to Use | Explain the task boundary |
| Steps | Describe the procedure |
| Output format and worked example | Show the intended response structure |
| Guardrails | State limits such as not inventing facts or sending a chat checklist |

Skills are instructions, not connectors or executable operations. Uploading these files does not connect ServiceNow, create an Outlook connection, install a workflow or grant access to employee data. Knowledge retrieval and workflow actions must be configured separately.

### Choosing the right behavior

| Request or entry path | Expected behavior |
|---|---|
| Direct chat: "What is the wellness benefit?" | Normal conversational answer from configured knowledge; neither formatting skill is required |
| Direct chat: "What documents do I need for that?" | Continue the same conversation naturally, with citations where applicable |
| Direct chat: "Make an onboarding checklist for my new team member." | Use `hr-onboarding-checklist` and return the checklist in chat |
| Workflow receives an HR inquiry by email | Agent retrieves applicable knowledge, then uses `hr-email-reply` to format the answer as HTML |

Global instructions must keep these paths distinct. Ordinary chat should not become an email with a subject, sign-off or workflow payload. Pasting an email or a From address into chat does not create an authenticated workflow event. Skill descriptions guide selection but are not an authorization boundary.

## hr-onboarding-checklist

### Purpose and inputs

This skill turns the details supplied by a manager, HR colleague or new hire into a readable onboarding plan. It uses the person's **name, role, start date, location, remote/office arrangement and equipment needs** when available.

It also supports general questions such as **What is the onboarding process?** The supplied version requires a search of the agent's configured knowledge before answering either type of request. It does not access employee records or perform tasks. Its sample tasks are not evidence of company requirements; unknown details stay as placeholders such as `[manager name]`, `[HR portal]` and `[CRM tool]`.

### How it works

1. Read the known details and search configured agent knowledge before answering.
2. Group tasks into **Before Day 1**, **Day 1**, **First Week** and **First Month**, dropping phases with no content.
3. Number items sequentially within each phase, restarting at **1** for the next phase.
4. Use placeholders instead of guessing tools, portals, contacts or other missing specifics.
5. Return the formatted checklist directly in the conversation, not as an email.

The checklist can cover equipment and accounts, workspace or badge arrangements, paperwork, introductions, benefits information, training and check-ins. Wording such as "order a laptop" is a proposed task for a person, not a claim that the agent placed an order.

### Example

**Chat input**

```text
New hire Maria starts Monday as a Sales rep in the Helsinki office, needs a laptop.
```

**Illustrative chat output excerpt**

```text
Onboarding checklist for Maria - Sales rep, starting Monday (Helsinki office)

**Before Day 1**
1. Arrange the requested laptop with [IT contact].
2. Confirm the Day 1 meeting time with [manager name].

**Day 1**
1. Collect the laptop at [reception/IT desk].
2. Meet [manager name] and the immediate team.
```

The full skill includes First Week and First Month examples too. These examples do not establish real deadlines, benefit eligibility or company requirements.

### Boundaries and customization

Use this skill for onboarding planning, not unrelated project task lists, policy lookup, HR tickets or email composition. It neither schedules meetings nor provisions accounts, orders equipment or marks tasks complete.

To customize it, edit the phase names, task categories, placeholder style or example locally. Keep the chat-only boundary and distinguish generic suggestions from actual company policy. Do not replace an unknown contact or system with a plausible-looking invented value.

## hr-email-reply

### Purpose and inputs

This skill is a **formatter for an HR answer based on ServiceNow knowledge already available to the agent**. It is not a ServiceNow search tool. In this scenario, configured knowledge provides indexed ServiceNow articles; the skill then uses their content to compose the email.

The useful inputs are the employee's question, their first name when available, and one or more articles containing **KB number, title, relevant text and source URL**. The JSON article example inside the skill illustrates input data, not the desired response format.

### How it works

1. Read the supplied articles and identify the content that answers the question.
2. Write a short, friendly answer using only that content.
3. Include a next step only when supported, and number references in first-use order.
4. Add an HTML source table with links to the articles used, omitting it when no usable sources exist.
5. Return **HTML only** for the workflow's email body, without exposing the input JSON.

If the articles do not cover part of the question, the skill instructs the agent to say so rather than invent an answer. That instruction does not itself implement an exception queue, a hold status or a send authorization check.

### Expected email structure

| Part | Content |
|---|---|
| Greeting | Employee's first name when supplied; otherwise **Hello,** |
| Question | The employee's question |
| Answer | A short, plain-language explanation supported by the supplied articles |
| Next step | An action from the source; omit if unsupported |
| Sources | A real HTML table containing each cited article once, with reference number, KB number, title and clickable link |
| Closing | **Kind regards,** followed by **HR Onboarding Agent** |

HTML source text must be escaped, and citation numbers must match the correct article. Keep source links tied to the retrieved evidence. The source table makes the answer traceable; it does not independently prove the answer is correct or that the recipient may read the source.

### How it fits the workflow

The current [walkthrough](../../3.Runbook.md#step-2-3-add-workflow-for-autonomous-trigger) uses **When a new email arrives** in the connected user's mailbox with **Subject filter = HR question**. The agent receives the email Body, retrieves knowledge and composes its response. The Outlook **Send an email** action is configured by the workflow, not installed by this skill.

| Workflow email field | Walkthrough mapping |
|---|---|
| **To** | **From** on the email trigger |
| **Subject** | **Answer to your HR inquiry** |
| **Body** | **Result** from the Agent node |

The skill returns the HTML body only. The subject is set separately in the Outlook action. An HTML result is prepared content, not evidence that an email was sent; verify the workflow action's outcome separately.

Customize the greeting, length, source-table columns and closing in the downloaded file. Preserve source-only factual content and HTML escaping. Decide how to handle missing names, absent next steps and unsupported questions before enabling delivery; do not leave template placeholders in a real email.

## Uploading and updating the skills

1. Download both Markdown files and review their scope, examples and the customization notes below.
2. In the agent, select **Skills**, then **Upload a skill**, or drag and drop the files into the upload area. Upload each file separately; no ZIP is needed for these standalone files.
3. Inspect the imported name, description and complete instructions. Upload success alone does not confirm correct routing or output.
4. To change a skill, edit the downloaded Markdown file locally, then use **Replace** to upload the revised file.
5. **Save** the agent, check the behavior in Preview, and publish the version intended for the workflow or other live channels.

For an existing agent, remove the former separate policy-answer and email-draft skills if they are still installed. Deleting repository files does not update a published agent or revoke permissions.

## Quick behavior checks

These are suggested checks, not recorded test results.

| Check | Expected result |
|---|---|
| Ask a normal HR question, then a follow-up | Natural conversation using applicable knowledge; no email formatting |
| Describe a new hire, or ask "What is the onboarding process?" | Knowledge retrieval followed by a phased checklist with numbering restarted per phase |
| Omit the manager's name and portal URL | Neutral placeholders, not invented company details |
| Ask the checklist to order equipment | No actual order or claim that provisioning completed |
| Supply an HR question and authorized article text to email composition | HTML body with a supported answer, source references and closing |
| Ask about a detail absent from the supplied article | Explicit limitation rather than an invented policy value |
| Use multiple articles or text containing `&`, `<` or `>` | Correctly matched references and escaped HTML text |
| Inspect the workflow's Agent result before testing delivery | HTML rather than JSON or Markdown fences; no unresolved placeholders |

Test composition without sending first. Workflow actions can call real services; a test message or sample input does not make a live send action harmless. Use an authorized test recipient and inspect the workflow before testing actual delivery.

## Customization and limitations

The checklist is the latest supplied version, including separate examples for
new-hire details and a general onboarding question. Both require a knowledge search.
The email skill's HTML examples use four source columns, matching citations and the
**HR Onboarding Agent** closing.

- Sample names, links and parental-leave values illustrate formatting, not current company policy or personal entitlement.
- Keep the neutral greeting and omission rules for missing names, next steps and sources; never send unresolved template placeholders.
- The checklist uses placeholders intentionally for unknown planning details and must label generic tasks as suggestions.
- These are model instructions, not a factual validator, HTML sanitizer, source-permission filter or send-blocking mechanism.
- Updating files in Git does not update the live agent. Replace the imported skills, save and republish, then repeat the non-sending checks before enabling the email workflow.

## Related resources

| Resource | Purpose |
|---|---|
| [Runbook: Add Runtime Skills](../../3.Runbook.md#step-2-4-add-runtime-skills) | Screenshot-based download, upload, replacement and save steps |
| [Capability matrix](../Capability-matrix.md) | Capability boundaries, actual workflow mappings and operational limitations |
| [Sample prompts](../../4.Sample-prompts.md) | HR questions, HTML output examples and chat/workflow acceptance checks |
| [Microsoft: Upload existing skills](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/skills-add-existing) | Product guidance for importing skill files |
