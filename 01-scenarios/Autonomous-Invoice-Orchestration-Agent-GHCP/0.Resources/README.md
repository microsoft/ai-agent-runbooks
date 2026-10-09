# Autonomous Invoice Orchestration Agent — Resources

## Contents and implementation status

| Folder / file | Purpose |
|---|---|
| [Capability-matrix.md](Capability-matrix.md) | Three included capabilities, the workflow-owned operations, the JSON response contract, the Dataverse data model and the limits |
| [Skills/README.md](Skills/README.md) | Runtime import order, tool dependencies and upload notes |
| `Skills/<capability-id>/SKILL.md` | Standalone skill instructions, not tools or connection installers |
| [Build-prompts/1.Dataverse.md](Build-prompts/1.Dataverse.md) | One Copilot (Tables > Get started with Copilot) prompt that creates the **Auto Invoice** table with its 18 columns in the **Autonomous Invoice Orchestration** solution. Includes the checks to run after Copilot builds the table, how to delete the sample rows and how to add or change a column by hand |
| [Sample-invoices](Sample-invoices/README.md) | Two synthetic fixture invoices and what each one tests |
| [Sample Prompts](../4.Sample-prompts.md) | Acceptance cases, with every result recorded as Not run |

Delivered assets are documentation, runtime definitions and synthetic fixtures only. No deployed agent, workflow export, connection, service credentials, real invoice data or successful tenant test evidence is included. Keep operational evidence and environment values in the organization's access-controlled delivery record.

Build in this order: the Dataverse table, then the SharePoint library, then the agent with its tools, instructions and skills, then the workflow, then the tests. The [Runbook](../3.Runbook.md) has the steps. Uploading a skill does not create tools, connections, the workflow or any authorization. The routing, completeness check, approval and sender reply live in the workflow, not in a skill.

## Release gates

Each gate is closed by its named role before dependent behavior is enabled. These are implementation requirements, not optional capabilities.

| Gate | Owner | Required evidence / acceptance |
|---|---|---|
| G1 — Host, PDF reading and tool identity | Delivery engineer / Power Platform admin | [VERIFY] The agent uses the GitHub Copilot harness. A tool-returned PDF from the SharePoint tool is read correctly for a text invoice and a scanned invoice. The tool connections used in workflow-invoked runs are the intended service account with only the permissions in the [matrix](Capability-matrix.md#agent-tool-contracts) |
| G2 — Workflow-to-agent call | Delivery engineer | [VERIFY] The Agent node can select the published agent, send the message, wait for the finish and return either structured output or JSON text that the workflow parses. A reply that is not valid JSON is handled as a failed run |
| G3 — Approval and run failures | Power Platform admin / AP approver | [VERIFY] The approval action is available in Workflows, the approval time limit and run duration suit the approver's response time, and a failed run alerts the owner |
| G4 — Dataverse behavior | Dataverse owner | [VERIFY] 18 columns saved as specified, no column is required, and the sample rows are deleted. A row is still created when the primary name column is empty. Listing rows by Invoice Key finds the saved row, including a key that contains `'`, `|` or `/`. Choice labels can be written. The Yes/No column behavior for an unknown value is recorded. Decimal precision 2 is kept. Two simultaneous runs for one new invoice end with one row or a failed result |
| G5 — Mailbox and SharePoint behavior | Messaging owner / SharePoint owner | [VERIFY] The trigger fires for the invoice mailbox and skips oversize or protected mail as documented. Reply send rights work for the mailbox type. Create file behavior when a name exists is recorded. The tool's accepted path form and link properties are recorded. The two folders exist and are permissioned |
| G6 — Business configuration | AP/Finance owner | [FILL] Invoice mailbox, optional sender allowlist, approver or group, approved legal entity names, files-per-email cap, retention and the site and library names |
| G7 — Test evidence | Test / privacy owner | [VERIFY] Every case in [Sample Prompts](../4.Sample-prompts.md#acceptance-cases) is run in isolation, then the composed run, with the result and evidence recorded. No real invoices are used before the pilot is approved |
| G8 — Cost and capacity | Release / cost owner | [VERIFY] Credit use for a measured number of invoices, expected monthly volume and budget controls. SharePoint call limits are not exceeded at peak volume |
| G9 — ALM and rollback | Power Platform engineer | [VERIFY] The solution moves from Dev to Test to Prod, the connections are rebound, the skill versions are traceable and the rollback steps are rehearsed |

Do not reduce a gate to an instruction telling the model to be careful. The completeness check and the approval are deterministic workflow steps. The agent's instructions help it extract well, but they do not decide who is notified or who approves.

## Official-source verification

**Documented** means the linked guidance supports the stated product behavior. **Design choice** and **scenario-defined contract** describe this scenario's required implementation. Neither establishes tenant availability or successful execution.

| Source | Documented claim used | Tenant check / owner |
|---|---|---|
| [Harnesses](https://learn.microsoft.com/en-us/microsoft-copilot-studio/harnesses-overview) and [GHCP overview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/overview) | The GitHub Copilot harness uses instructions, skills and tools in Studio. It is distinct from the other harnesses | G1, delivery engineer |
| [Create an agent](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/build-new-agent) | A new agent is created from Home or Agents, then configured in Build | G1/G9, delivery engineer |
| [Workflows overview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/workflows-experience/flows-overview) | Workflows can start from an event, run manually or on a schedule, and include AI, human-in-the-loop, built-in and connector actions | G2/G3, delivery engineer |
| [Workflows Agent node](https://learn.microsoft.com/en-us/microsoft-copilot-studio/workflows-experience/agent-node-workflow) | The node can call an existing published agent with a message, waits for the agent, and offers text or structured output modes | G2, confirm existing-agent output modes and identity |
| [Skills upload](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/skills-add-existing) | A skill is Markdown with YAML name and description, or a ZIP with SKILL.md and assets | G1, delivery engineer |
| [Add tools](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/add-tools-custom-agent) | Build > Tools offers connectors, MCP servers and workflows. Tools can be blocked by data policy | G1/G5, confirm operations and policy |
| [SharePoint connector](https://learn.microsoft.com/en-us/connectors/sharepointonline/) | `GetFileContentByPath`, `GetFileMetadataByPath`, `CreateFile`, `UpdateFile`. Limit of 600 calls per 60 seconds per connection | G5/G8, SharePoint owner |
| [Microsoft Dataverse connector](https://learn.microsoft.com/en-us/connectors/commondataserviceforapps/) | `ListRecords`, `CreateRecord`, `UpdateOnlyRecord` and related row operations | G4, Dataverse owner |
| [Office 365 Outlook connector](https://learn.microsoft.com/en-us/connectors/office365/) | `OnNewEmailV3` with attachment filters, `ReplyToV3`, and the trigger's size and protected-mail limits | G5, messaging owner |
| [Approvals connector](https://learn.microsoft.com/en-us/connectors/approvals/) | `StartAndWaitForAnApproval` with an approval type and a cancel option | G3, Power Platform admin |
| [Date and time column behavior](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/behavior-format-date-time-field) | Date Only behavior for Invoice Date and Due Date | G4, Dataverse owner |
| [Create tables with Copilot](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/create-edit-entities-portal), [reviewing the generated tables](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/ai-conversations-create-app), [preferred solution](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/preferred-solution) and [solutions](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/create-solution) | Start with Copilot generates tables in the Create new tables workspace, where View data shows and removes the sample rows. Missing or wrong columns are fixed by hand in the table designer. A preferred solution receives new tables. Display name and unique name differ | G4/G9, verify the saved columns and solution |
| [Preview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/preview-overview) and [Evaluate](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/analytics-agent-evaluation-intro) | Preview shows the agent's tool calls. Evaluate scores a test set | G7, add explicit checks of the written row and files |
| [Publish](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-fundamentals-publish-channels) | Publishing creates a live version that other components can use | G9, delivery engineer |
| [Credits and capacity](https://learn.microsoft.com/en-us/power-platform/admin/manage-copilot-studio-copilot-credits-capacity) | Agent and environment usage monitoring and allocation | G8, release / cost owner |

## Design choices and operational records

- One workflow and one agent. The agent is called only by the workflow and has no end-user channel. The agent calls no workflow and has no email or approval tool.
- The workflow decides completeness from the returned JSON. The approval starts only when all 18 required fields have values, and the sender is told otherwise. This is a **scenario-defined contract**.
- The approver decides on invoices the agent marked `NEEDS_REVIEW` when every field has a value. Routine intake has no per-message human approval before the extraction and the row are written.
- Record the invoice mailbox, approver, connection owners, library and solution names, tool and skill versions, test runs and release approvals in a restricted delivery record. Store no credentials or real invoices in this repository.
