# Invoice Processing Agent — Resources

## Contents and implementation status

| Folder / file | Purpose |
|---|---|
| [Capability-matrix.md](Capability-matrix.md) | Two included capabilities, the workflow-owned operations, the JSON response contract, the decision rule, the Dataverse data model and the limits |
| [Skills/README.md](Skills/README.md) | Runtime import order, tool dependencies and upload notes |
| `Skills/<capability-id>/SKILL.md` | Standalone skill instructions, not tools or connection installers |
| [Sample-invoices](Sample-invoices/README.md) | Two synthetic fixture invoices and what each one tests |
| [Sample Prompts](../4.Sample-prompts.md) | Acceptance cases, with every result recorded as Not run |

Delivered assets are documentation, runtime definitions and synthetic fixtures only. No deployed agent, workflow export, connection, service credentials, real invoice data or successful tenant test evidence is included. Keep operational evidence and environment values in the organization's access-controlled delivery record.

Build in this order: the SharePoint library, then the Dataverse solution, table and environment variables ([Runbook Step 2-2](../3.Runbook.md#step-2-2-create-table) has the Copilot prompt that creates the **Auto Invoice Review** table), then the agent with its tools, instructions and skills ([Runbook Step 3-1](../3.Runbook.md#step-3-1-create-the-agent)), then the workflow, then the tests. The [Runbook](../3.Runbook.md) has the steps. Uploading a skill does not create tools, connections, the workflow or any authorization. Copilot creates the workflow from the ready-made prompt in [Runbook Step 3-3](../3.Runbook.md#step-3-3-build-the-workflow-invoice-intake-and-approval). The routing, decision check, approval and emails live in the workflow, not in a skill.

## Release gates

Each gate is closed by its named role before dependent behavior is enabled. These are implementation requirements, not optional capabilities.

| Gate | Owner | Required evidence / acceptance |
|---|---|---|
| G1 — Host, PDF reading and tool identity | Delivery engineer / Power Platform admin | [VERIFY] The agent uses the GitHub Copilot harness. A tool-returned PDF from the SharePoint tool is read correctly for a text invoice and a scanned invoice. The tool connections used in workflow-invoked runs are the intended service account with only the permissions in the [matrix](Capability-matrix.md#agent-tool-contracts) |
| G2 — Workflow-to-agent call | Delivery engineer | [VERIFY] The Agent node can select the published agent, send the prompt, wait for the finish and return the `result` as custom structured output with the 10 keys, which the workflow reads as `structuredOutput/<key>`. What happens when the agent step fails or returns no structured output is recorded. The prompt carries no `sourcePdfLink`, so record whether the agent still runs `save-invoice-json-to-sharepoint` and fills `reviewLink`, and add the link to the prompt by hand if it does not. The approval details read an `invoice_date` key that the structured output does not have, and the approval title and the two outcome email subjects read `['invoiceKey']` without `structuredOutput/`, so check these expressions in the saved workflow. Record whether a failed PDF stops the loop |
| G3 — Approval and run failures | Power Platform admin / AP approver | [VERIFY] The approval action is available in Workflows, the approval time limit and run duration suit the approver's response time, and a failed run alerts the owner. The manager lookup returns the manager of an employee sender, and for a sender outside the organization it returns nothing or fails without stopping the run, so the approval goes to the `FinanceEmailAddress` value. The approval returns the outcome values that the **Approved** (`Approve`) and **Rejected** (`Reject`) conditions test, and any other outcome takes the **Other** branch |
| G4 — Dataverse behavior | Dataverse owner | [VERIFY] 17 columns saved as specified, no column is required, and the sample rows are deleted. The invoice number from the skill's `INVOICE_KEY` field lands in the Invoice Number column. A row is still created when the primary name column is empty. Choice labels can be written. Decimal precision 2 is kept. The Dataverse tool can create a row, update the Review Link and read the `environmentvariabledefinition` and `environmentvariablevalue` tables |
| G5 — Mailbox and SharePoint behavior | Messaging owner / SharePoint owner | [VERIFY] The trigger fires for the invoice mailbox and skips oversize or protected mail as documented. Send rights for the Finance and sender emails work for the mailbox type. Create file behavior when a name exists is recorded, and so is a review file name that holds a character SharePoint does not allow. The tool's accepted path form, the item ID and the sharing link properties are recorded, how the `SharePointDocumentLibrary` and `SourceFolderPath` values combine into the Create file folder path is recorded, and a sharing link fits in 200 characters. The two folders exist and are permissioned. The workflow can read the environment variables |
| G6 — Business configuration | AP/Finance owner | [FILL] Invoice mailbox, optional sender allowlist, the Finance address in `FinanceEmailAddress` (also the approver when the sender has no manager), files-per-email cap, retention and the site, library and folder values in the environment variables |
| G7 — Test evidence | Test / privacy owner | [VERIFY] Every case in [Sample Prompts](../4.Sample-prompts.md#acceptance-cases) is run in isolation, then the composed run, with the result and evidence recorded. No real invoices are used before the pilot is approved |
| G8 — Cost and capacity | Release / cost owner | [VERIFY] Credit use for a measured number of invoices, expected monthly volume and budget controls. SharePoint call limits are not exceeded at peak volume |
| G9 — ALM and rollback | Power Platform engineer | [VERIFY] The solution moves from Dev to Test to Prod, the connections are rebound, the skill versions are traceable and the rollback steps are rehearsed |

Do not reduce a gate to an instruction telling the model to be careful. The decision check, the approval and the emails are deterministic workflow steps. The agent's instructions help it extract well, but they do not decide who is notified or who approves.

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
| [SharePoint connector](https://learn.microsoft.com/en-us/connectors/sharepointonline/) | `CreateFile` in the workflow and `CreateSharingLink` (Create sharing link for a file or folder) as an agent tool. Limit of 600 calls per 60 seconds per connection | G5/G8, SharePoint owner |
| [Microsoft Dataverse connector](https://learn.microsoft.com/en-us/connectors/commondataserviceforapps/) | Row operations such as create, update and list. The agent reaches them through the Dataverse MCP tool | G4, Dataverse owner |
| [Office 365 Outlook connector](https://learn.microsoft.com/en-us/connectors/office365/) | The new-email trigger with attachment filters, the send-email action, and the trigger's size and protected-mail limits | G5, messaging owner |
| [Approvals connector](https://learn.microsoft.com/en-us/connectors/approvals/) | `StartAndWaitForAnApproval` with an approval type and a cancel option | G3, Power Platform admin |
| [Date and time column behavior](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/behavior-format-date-time-field) | Date Only behavior for Invoice Date and Due Date | G4, Dataverse owner |
| [Create tables with Copilot](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/create-edit-entities-portal), [reviewing the generated tables](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/ai-conversations-create-app), [preferred solution](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/preferred-solution) and [solutions](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/create-solution) | Start with Copilot generates tables in the Create new tables workspace, where View data shows and removes the sample rows. Missing or wrong columns are fixed by hand in the table designer. A preferred solution receives new tables. Display name and unique name differ | G4/G9, verify the saved columns and solution |
| [Preview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/preview-overview) and [Evaluate](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/analytics-agent-evaluation-intro) | Preview shows the agent's tool calls. Evaluate scores a test set | G7, add explicit checks of the written row and files |
| [Publish](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-fundamentals-publish-channels) | Publishing creates a live version that other components can use | G9, delivery engineer |
| [Credits and capacity](https://learn.microsoft.com/en-us/power-platform/admin/manage-copilot-studio-copilot-credits-capacity) | Agent and environment usage monitoring and allocation | G8, release / cost owner |

## Design choices and operational records

- One workflow and one agent. The agent is called only by the workflow and has no end-user channel. The agent calls no workflow and has no email or approval tool.
- The workflow decides from the returned `decision`. The approval starts only when Decision is `READY_FOR_APPROVAL`, which the skill sets only when all 11 invoice fields were found. Any other decision sends a manual review email to Finance and the sender is not told. This is a **scenario-defined contract**.
- Routine intake has no per-message human approval before the extraction and the row are written. A person approves each invoice that is ready for approval, and the sender gets an approved or rejected email afterwards.
- Record the invoice mailbox, approver, connection owners, library and solution names, tool and skill versions, test runs and release approvals in a restricted delivery record. Store no credentials or real invoices in this repository.
