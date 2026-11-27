# Autonomous Invoice Orchestration Agent — Runtime Skills

The standard configuration has one skill. Import it before the workflows are turned on. The file is self-contained with its declared tool dependencies, and the agent's instructions run it for every invoice.

| Order | Capability / file | Purpose | Required tools |
|---|---|---|---|
| 1 | [invoice-extraction-review](invoice-extraction-review/SKILL.md) | Get the invoice PDF, create a sharing link for it (Source Link), extract the 11 invoice fields, work out Issues Found, Summary and Decision, resolve the SharePoint site, document library and Reviews folder from environment variables, save the review JSON as a file, create a sharing link for it (Review Link) and save one row in the **Auto Invoice Review** Dataverse table | SharePoint file content tool, SharePoint **Create file** (`CreateFile`) and `CreateSharingLink`, Office 365 Users `GetMyProfile` (for a PDF uploaded in the chat). Dataverse list rows (environment variables) and create a row |

The tools are real connector operations configured in **Build > Tools**, listed with their limits in [Capability and Integration Contracts](../Capability-matrix.md#agent-tool-contracts). The agent has no email or approval tool. The decision check, approval and the emails to Finance and the submitter are steps of the approval workflow, not skills. The agent writes one row, and that row starts the approval workflow.

## Skill inputs

| Skill | Runs when | Inputs |
|---|---|---|
| invoice-extraction-review | The prompt gives an invoice as a PDF attachment or as a link to a file in a SharePoint document library | The invoice PDF or its SharePoint link. The review JSON also takes `emailSubject` and `submittedBy` from the prompt, and `submittedBy`, the Object ID of the submitter, is saved in the Submitted By column of the row. For a PDF uploaded in the chat, the skill gets the Object ID of the chatting user with `GetMyProfile` |

The prompt that the intake workflow builds carries the email subject (as "Email subject"), the sender's Object ID (as "SubmittedBy") and the saved PDF path. The review JSON file has 17 keys: 14 extracted or computed values, `emailSubject`, `submittedBy` and `sourceLink`, the sharing link that the skill creates for the PDF. It does not hold the Review Link, because the link is created after the file. The skill has no rule for a prompt that lacks the subject or the Object ID, so what the file and the Submitted By column hold then is `[VERIFY]` under release gate G2 in the [Resources README](../README.md#release-gates).

## Environment variables

invoice-extraction-review does not hardcode the destination of the review file. It reads three Power Platform environment variables from the solution through the Dataverse tool (the `environmentvariabledefinition` and `environmentvariablevalue` tables). It uses the current value, falls back to the default value, and stops with a message that names the variable if neither has a value. It resolves them before it saves anything, so a missing value stops the run before the row is written.

| Purpose | Environment variable display name |
|---|---|
| SharePoint site URL | `SharePointSiteURL` |
| SharePoint document library that holds the review JSON | `SharePointDocumentLibrary` |
| Destination folder for the review JSON | `ReviewsFolderPath` |

Create all three variables in the solution before testing, as described in [Phase 2 of the Runbook](../../3.Runbook.md#phase-2-create-dataverse-solution-table-and-environment-variables). The Dataverse connection needs read access to these two tables.

## Import

Upload the `SKILL.md` in **Build > Skills > Add skill > Upload a skill**. No ZIP is needed for this standalone file. Inspect the name, the quoted description and the imported instructions afterward. Uploading a skill does not create a tool, connection, workflow or permission.

The skill contains no site addresses, library names, mailbox names or legal entity names. Site and folder values come from the environment variables above. Other deployment values go in the agent instructions as described in [Step 3-1 of the Runbook](../../3.Runbook.md#step-3-1-create-the-agent).

For an operational pause, disable the intake workflow first, so no new rows appear, then the approval workflow. Then remove the agent's tool exposure or unpublish the agent. Removing a skill alone does not revoke tool permissions.

Use the [capability tests and the composed test](../../4.Sample-prompts.md#capability-tests) before publication. The approval workflow reads the row's Decision, not the skill's steps.
