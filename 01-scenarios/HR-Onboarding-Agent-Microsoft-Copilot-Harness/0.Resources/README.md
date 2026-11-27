# HR Onboarding Agent - Resources

## Contents and implementation status

The skill downloads are [hr-email-reply.md](Skills/hr-email-reply.md) and [hr-onboarding-checklist.md](Skills/hr-onboarding-checklist.md), adapted from the supplied samples and aligned with the walkthrough. The email skill returns HTML directly; the workflow sends that result through Outlook. See the [skill index](Skills/README.md) for behavior, customization and checks.

| Artifact | Purpose |
|---|---|
| [Capability matrix](Capability-matrix.md) | Two skills, entry paths, dependencies, workflow field mappings and limitations |
| [Skill index](Skills/README.md) | Standalone Studio upload files in matrix order |
| [Runbook](../3.Runbook.md) | Agent instructions, configuration, owner-assigned gates and release procedure |
| [Release readiness](Release-readiness.md) | Global instructions, owner checks, workflow setup, acceptance and pause/rollback |
| [Connector setup guide](Sample-documents/ServiceNow-Tenant-%26-Copilot-Connector-Setup-Guide.md) | ServiceNow developer-instance and permission-preserving connector walkthrough |
| [Sample handbook](Sample-documents/Contoso%20Employee%20Handbook.docx) and [wellness document](Sample-documents/Wellness%20Benefits%20Sample%20Knowledge.docx) | Synthetic article content for the isolated setup walkthrough, not production policy |
| [Screenshot placeholders](Images) | Runbook and connector-guide illustrations retained for manual UI replacement |
| [Acceptance cases](../4.Sample-prompts.md) | Evidence and action expectations, not executed test results |

These files document one standard scenario for all-employee HR chat and autonomous user-mailbox replies, with onboarding as a subset and both skills included by default. They are authoring deliverables, not a solution package. Operators configure and test the dependencies during setup; importing a skill creates no connector, tool, workflow, authorization service or exception queue. No runtime skill links to repository-only supporting files.

## Knowledge and test resources

HR supplies approved handbook, ongoing benefits/wellness, leave-process, workplace and onboarding articles through the configured ServiceNow knowledge source. The [runbook](../3.Runbook.md#phase-1-servicenow-knowledge-base-setup) covers connection setup, source scope, citations and permissions. Production HR articles and tenant configuration are not included.

The local sample Word documents provide synthetic test content, not production policy or the entire acceptance suite. Review their contents before loading them into an isolated test knowledge base. The runbook contains 76 visible screenshot placements and 5 in the hidden environment-variable step; the connector guide contains 52. Screenshots are being refreshed during editing; retained placeholders are not current-UI evidence. Superseded settings are labeled **Screenshot to replace**. The verification URL in `Images/012.png` is redacted because it contains account-verification material; replace it with a safely captured screenshot from your own setup, never an active token.

The [controlled fixtures](../4.Sample-prompts.md#controlled-fixtures) cover ongoing employees, onboarding, wellness, conflicts and HTML email composition. Load articles only into an isolated source and record actual IDs/URLs; fixture labels are not live citations. Use an isolated agent-only workflow with no send node for composition checks. Real email tests require verified invocation, recipient-safe knowledge and explicit pilot approval.

## Knowledge quality requirements

For each production policy, record authority, population, country/entity/category, effective period, owner and permission rules. If permitted evidence conflicts and lacks a priority or supersession rule, preserve the uncertainty rather than choose an entitlement.

Fixtures F3 and F4 intentionally state **15** and **20 vacation days** for the same test cohort without priority metadata. They test conflict handling, not company policy. Fixture F2 omits monthly medical premiums; an answer must say that the value is unspecified rather than claim it is "Included." Prompt coverage does not establish evidence for personal pay dates, bank-detail setup, leave approval or IT provisioning.

**Gate G2, HR owner:** resolve authoritative production policy or exclude conflicting topics from pilot scope. Keep conflict fixtures in the isolated test corpus. Do not copy synthetic policy facts, contact addresses, credentials or provider recommendations into runtime instructions.

**Autonomous email quality and access:** use a corpus approved for every possible email recipient and restrict the mailbox audience through tenant controls. Connection-owner access does not impersonate the sender. The agent composes HTML with a source table and sign-off; the workflow sends that result directly. It supplies no independent validator, HTML sanitizer, per-recipient source filter or hold branch. HR must review pilot outputs, and operators must monitor failures. If the data/audience boundary cannot be established, leave automatic email disabled.

## Workflow invocation finding

The [Workflows overview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/workflows-experience/flows-overview) documents the new Microsoft Copilot-powered automation experience, including event triggers and agent calls. More specifically, [Add an agent node to a workflow](https://learn.microsoft.com/en-us/microsoft-copilot-studio/workflows-experience/agent-node-workflow) is marked for the **Microsoft Copilot harness** and documents **Workflows > Agent > An existing agent**, selecting a published agent, passing a **Message**, waiting for completion and using the result downstream. This is evidence of **workflow → agent invocation**, not just an agent calling a tool. The page also describes new inline agents, but this scenario targets the existing published HR agent, not a replacement inline agent.

This documents an inbound invocation pattern in the Microsoft Copilot Workflows experience; it is **not solely the standard-harness agent-flow page**. During setup, select the exact published **HR Onboarding Agent** and record its version, successful non-sending invocation, email-skill routing, HTML output and effective retrieval identity (E1). Passing the email Body is the walkthrough mapping, not a guarantee of routing behavior. Resolve a wrong target, chat-formatted result or identity mismatch before enabling the workflow.

The following distinctions prevent false support claims:

- [Standard agent-flow Agent node](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-node-workflow), [direct event triggers](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-trigger-event), and [Microsoft 365 Agents SDK integration](https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-integrate-web-or-native-app-m365-agents-sdk) explicitly describe the **standard harness**. They do not establish direct Microsoft Copilot autonomous triggers or an inbound API for this agent.
- The [Microsoft Copilot Studio connector](https://learn.microsoft.com/en-us/connectors/microsoftcopilotstudio/) documents **Execute Agent** (`ExecuteCopilot`) and **Execute Agent and wait** (`ExecuteCopilotAsyncV2`), but does not identify compatible target harnesses. Do not claim those connector operations as a verified Microsoft Copilot route.
- [Add a workflow as a tool](https://learn.microsoft.com/en-us/microsoft-copilot-studio/workflows-experience/flow-agent) requires **When an agent calls the flow** and **Respond to the agent**. That is **agent → workflow**, the opposite direction from incoming HR mail.
- The [Microsoft Copilot channel table](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-overview) marks Email unavailable. External Workflows intake is not a native Email channel. The Studio Microsoft Copilot harness is not a standalone SDK host or CLI.

## Mailbox and workflow implementation boundaries

The [Outlook connector reference](https://learn.microsoft.com/en-us/connectors/office365/) documents user-mailbox triggers and send actions. The walkthrough uses **When a new email arrives**, **Subject filter = HR question**, and **Send an email**, not a shared mailbox or a reply-to-thread action. These are connector operations, not an HR policy gate.

Use the Outlook connection's signed-in mailbox and verify its delegated account, folder and send permissions. No attachment processing is configured; that does not reject all attachment-bearing messages. Subject/From filters are not sender authentication. Protected or oversized messages may be skipped, and duplicate/missed events can occur. Keep normal mailbox coverage rather than promising every incoming message is processed once.

The send action uses trigger **From**, fixed subject **Answer to your HR inquiry** and Agent **Result** as its body. It sends a new message, not a guaranteed threaded reply. Inspect run and mailbox/provider evidence before retrying an uncertain send. No custom status service, outbox, deduplication or exception queue is included.

The [workflow designer guidance](https://learn.microsoft.com/en-us/microsoft-copilot-studio/workflows-experience/flow-designer#test-your-workflow) warns that tests can call real APIs and may publish/install connections. **Mock inputs do not make a live send node non-sending.** Use an isolated agent-only test workflow without the send action for E1. Keep the final email workflow unpublished until the complete agent and pilot approval are ready. No emailed human-assistance or approval step is part of this configuration.

## Official-source verification

"Documented" is evidence about product guidance, not proof that a specific tenant is configured or licensed. The [runbook gates](../3.Runbook.md#release-gates) are authoritative for owner-assigned deployment checks.

| Official source | Documented claim read | Remaining tenant check / owner |
|---|---|---|
| [Harnesses](https://learn.microsoft.com/en-us/microsoft-copilot-studio/harnesses-overview) | Microsoft Copilot, standard and Copilot chat are different runtimes | G1: correct experience / delivery owner |
| [Microsoft Copilot overview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/overview) | Instructions, knowledge, tools, skills, model and memory; no cross-harness transfer; build/test/evaluate may consume credits | G1: environment, approved model, credits and memory / tenant and cost owners |
| [Create a new agent](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/build-new-agent) | Home > Agent or Agents > New agent; name/settings/instructions before save | G1: actual authoring access and schema name / delivery owner |
| [Agent settings](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/settings-overview) | Designer … > Settings; Agent details before first save, Safety & access authentication, Greeting & prompts | G1/G5: Microsoft authentication, approved moderation and current channel configuration / tenant and delivery owners |
| [Model selection](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/authoring-select-agent-model) | Build > Model > Save; experimental/preview models are not for production | G1: approved available generally available model and provider permissions / tenant and cost owners |
| [Skills overview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/skills-overview) | Description-driven activation and progressive loading; skills are not tools | G4: matching and non-matching traces / delivery owner |
| [Create skills](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/skills-create) | Create from blank or Generate with AI; inspect before adding | G4: imported names, descriptions and bodies / delivery owner |
| [Upload existing skills](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/skills-add-existing) | Build > Skills > Add skill > Upload a skill; Markdown front matter or ZIP with SKILL.md | G4: import validation / delivery owner |
| [Add knowledge](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/knowledge-add-existing-copilot) | Build > Knowledge supports ServiceNow; no general-knowledge toggle | G2-G3: select actual connection, test source limits and ACLs / source and identity owners |
| [ServiceNow Knowledge deployment](https://learn.microsoft.com/en-us/microsoft-365/copilot/connectors/servicenow-knowledge-deployment) | Permissions, identity mapping, Simple/Advanced criteria, HRSD warning, AccessUrl and distinct sync types | G2-G3: scoped connector, HR criteria and revocation / ServiceNow and M365 admins |
| [Add tools](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/add-tools-custom-agent) | Connector action selection; custom MCP and workflow routes | E1: actual email operations and execution identities / integration owner |
| [Evaluate](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/analytics-agent-evaluation-intro) | Test conversations, version and user profile; General quality does not compare expected answers | G4: deterministic acceptance review in addition to scores / test owner |
| [Publish overview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-fundamentals-publish-channels) | Draft/live separation, publish states, channel distribution and republishing | G5: approved version and audience / release owner |
| [Available channels](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-overview) | Teams and M365 Copilot available; native Email unavailable | G5: actual channel identity/rendering; E1: separate event integration / tenant and integration owners |
| [Workflows overview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/workflows-experience/flows-overview) | Microsoft Copilot-powered workflows, manual/event/scheduled triggers and AI/connector actions | E1: actual environment/designer/connector availability / integration and tenant owners |
| [Microsoft Copilot Workflows Agent node](https://learn.microsoft.com/en-us/microsoft-copilot-studio/workflows-experience/agent-node-workflow) | Existing published agent invocation and downstream result, inline custom output differs from existing-agent configuration | E1: target/version, identity, skill routing and HTML output / integration owner |
| [Workflow designer](https://learn.microsoft.com/en-us/microsoft-copilot-studio/workflows-experience/flow-designer) | Node tests call APIs, full tests run live and may publish, errors block publishing | E1-E3: isolated mocks, safe connections, inspected graph and restricted pilot / test and release owners |
| [Workflow as tool](https://learn.microsoft.com/en-us/microsoft-copilot-studio/workflows-experience/flow-agent) | Agent-called flow with response is outbound tool use, not inbound agent invocation | E1: do not reverse call direction / integration owner |
| [Office 365 Outlook](https://learn.microsoft.com/en-us/connectors/office365/) | User-mailbox trigger, send action, delegated authentication and trigger/transport limitations | E1-E2: mailbox permissions, recipient mapping, retries and manual monitoring / mailbox and integration owners |
| [Copilot Studio connector](https://learn.microsoft.com/en-us/connectors/microsoftcopilotstudio/) | Execute Agent operations exist, target harness not specified | E1: not accepted alone as Microsoft Copilot compatibility evidence / integration owner |
| [Standard event triggers](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-trigger-event) | Scope explicitly standard harness, author-credential risk | E1: no copied direct Microsoft Copilot trigger setup / identity and integration owners |
| [Standard SDK integration](https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-integrate-web-or-native-app-m365-agents-sdk) | Scope explicitly standard harness | E1: no assumed Microsoft Copilot invocation fallback / integration owner |

**Design choices:** one HR agent, onboarding as a subset of all-employee guidance, normal chat, HTML workflow replies without per-message approval, both skills, and memory off initially. **Workflow:** Outlook trigger → existing published agent → Outlook Send an email. **Deployment checks and limitations:** see the [matrix](Capability-matrix.md) and [release readiness](Release-readiness.md#release-gates). Checklist placeholders intentionally mark unknown planning details; email placeholders must be resolved or omitted. No live workflow, source-ACL or tenant testing is claimed.

[Overview](../1.Overview.md) | [Architecture](../2.Architecture.md) | [Runbook](../3.Runbook.md) | [Prompts](../4.Sample-prompts.md)
