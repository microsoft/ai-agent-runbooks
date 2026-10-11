# Invoice Processing Agent — Runtime Skills

Both skills are included in the standard configuration. Import them in the order below. Each file is self-contained with its declared tool dependencies. The second skill uses the invoice fields and the review outcome that the first skill produced, so the agent's instructions run them in this order for every invoice.

| Order | Capability / file | Purpose | Required tools |
|---|---|---|---|
| 1 | [invoice-extraction-review](invoice-extraction-review/SKILL.md) | Get the invoice PDF, create a sharing link for it (Source Link), extract the 11 invoice fields, work out Issues Found, Summary and Decision, and save one row in the **Auto Invoice Review** Dataverse table | SharePoint file content tool and `CreateSharingLink`. Dataverse create a row |
| 2 | [save-invoice-json-to-sharepoint](save-invoice-json-to-sharepoint/SKILL.md) | Resolve the SharePoint site, document library and Reviews folder from environment variables, build the review JSON, save it as a file, create a sharing link for it (Review Link) and store the link in the Dataverse row | Dataverse list rows, SharePoint **Create file** and `CreateSharingLink`. Dataverse update a row |

The tools are real connector operations configured in **Build > Tools**, listed with their limits in [Capability and Integration Contracts](../Capability-matrix.md#agent-tool-contracts). The agent has no email or approval tool. The decision check, approval and the emails to Finance and the sender are workflow steps, not skills.

## Skill inputs

| Skill | Runs when | Inputs |
|---|---|---|
| invoice-extraction-review | The prompt gives an invoice as a PDF attachment or as a link to a file in a SharePoint document library | The invoice PDF or its SharePoint link |
| save-invoice-json-to-sharepoint | The invoice fields have been extracted, **and** the prompt supplies all four of `emailSubject`, `emailSender`, `sourcePdfPath` and `sourcePdfLink`. Without all four it does nothing | The output of invoice-extraction-review plus the four prompt fields. The JSON file has 18 keys: 14 extracted or computed values and the four prompt fields |

The prompt that the workflow builds carries `emailSubject` (as "Email subject"), `emailSender` (as "Sender") and `sourcePdfPath` (the saved PDF path), but no `sourcePdfLink`. Unless the agent supplies the link itself, from the sharing link that `invoice-extraction-review` creates, the review JSON file and the Review Link are never written. This is release gate G2 in the [Resources README](../README.md#release-gates). If the check fails, add the link to the prompt of the Agent node by hand.

## Environment variables

save-invoice-json-to-sharepoint does not hardcode the destination. It reads three Power Platform environment variables from the solution through the Dataverse tool (the `environmentvariabledefinition` and `environmentvariablevalue` tables). It uses the current value, falls back to the default value, and stops with a message that names the variable if neither has a value.

| Purpose | Environment variable display name |
|---|---|
| SharePoint site URL | `SharePointSiteURL` |
| SharePoint document library that holds the review JSON | `SharePointDocumentLibrary` |
| Destination folder for the review JSON | `ReviewsFolderPath` |

Create all three variables in the solution before testing, as described in [Phase 2 of the Runbook](../../3.Runbook.md#phase-2-create-dataverse-solution-table-and-environment-variables). The Dataverse connection needs read access to these two tables.

## Import

Upload each `SKILL.md` in **Build > Skills > Add skill > Upload a skill**. No ZIP is needed for these standalone files. Inspect the name, the quoted description and the imported instructions afterward. Uploading a skill does not create a tool, connection, workflow or permission.

The skills contain no site addresses, library names, mailbox names or legal entity names. Site and folder values come from the environment variables above. Other deployment values go in the agent instructions as described in [Step 3-1 of the Runbook](../../3.Runbook.md#step-3-1-create-the-agent).

For an operational pause, disable the workflow first. Then remove the agent's tool exposure or unpublish the agent. Removing a skill alone does not revoke tool permissions.

Use the [capability tests and the composed test](../../4.Sample-prompts.md#capability-tests) before publication. Skill selection is not guaranteed ordering, so the instructions state the order and the workflow reads the returned decision.
