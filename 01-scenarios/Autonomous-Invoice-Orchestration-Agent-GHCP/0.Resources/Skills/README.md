# Autonomous Invoice Orchestration Agent — Runtime Skills

All three skills are included in the standard configuration. Import them in the order below. Each file is self-contained with its declared tool dependencies. The output of one skill is the input of the next, so the agent's instructions run them in this order for every invoice.

| Order | Capability / file | Purpose | Required tool contracts |
|---|---|---|---|
| 1 | [invoice-pdf-extraction](invoice-pdf-extraction/SKILL.md) | Read the PDF, extract and normalize the fields, build the Invoice Key, derive Decision, Issues Found and Summary | SharePoint `GetFileContentByPath`, `GetFileMetadataByPath` |
| 2 | [invoice-dataverse-record](invoice-dataverse-record/SKILL.md) | Create, update or detect a duplicate **Auto Invoice** row | Dataverse `ListRecords`, `CreateRecord`, `UpdateOnlyRecord` |
| 3 | [invoice-review-json](invoice-review-json/SKILL.md) | Write the review JSON file, store the Review Link and return the JSON result | SharePoint `CreateFile`, `UpdateFile`, `GetFileMetadataByPath`, Dataverse `UpdateOnlyRecord` |

The tools are real connector operations configured in **Build > Tools**, listed with their limits in [Capability and Integration Contracts](../Capability-matrix.md#agent-tool-contracts). The agent has no email or approval tool. The completeness check, approval and reply to the sender are workflow steps, not skills.

Upload each `SKILL.md` in **Build > Skills > Add skill > Upload a skill**. No ZIP is needed for these standalone files. Inspect the name, the quoted description and the imported instructions afterward. Uploading a skill does not create a tool, connection, workflow or permission.

The skills contain no site addresses, library names, mailbox names or legal entity names. Those deployment values go in the agent instructions as described in the [Runbook](../../3.Runbook.md#step-2-3-update-agent-instructions).

For an operational pause, disable the workflow first. Then remove the agent's tool exposure or unpublish the agent. Removing a skill alone does not revoke tool permissions.

Use the [capability tests and the composed test](../../4.Sample-prompts.md#capability-tests) before publication. Skill selection is not guaranteed ordering, so the instructions state the order and the workflow validates the returned JSON.
