---
name: sn-incident-create
description: "Create a new incident in ServiceNow."
---

# Create a ServiceNow Incident

## Scope

Use the ServiceNow `CreateRecord` action, displayed as **Create Record**, when the user
asks to create a new incident. Creation covers the initial record only. It does not
include subsequent updates, notes, attachments, routing, assignment, or closure.

## Tools

- Create an incident: `CreateRecord` (**Create Record**).
- Check for duplicates: `ListRecords` (`GetRecords`).
- Read one matching incident when needed: `GetRecord`.
- Shared user context: `GetMyProfile`.

## Inputs

Set `tableType` to `incident`. Always prepare:

- `short_description`: a concise summary of the issue.
- A detailed handoff summary containing the reported symptoms, affected service, relevant
  errors, attempted fixes, timestamps, and remaining impact.

Reuse known conversation details. Ask only for missing information required to create a
useful incident. ServiceNow must set `caller_id` server-side from the impersonated current
user. Do not send or invent a caller ID from chat, an email address, or `GetMyProfile`.
For the native ServiceNow `CreateRecord` action, send only `short_description`; Microsoft
documents that the action ignores `description`. Include a full description in the create
body only when a separately validated custom create-only operation proves it persists.

## Procedure

1. Use `ListRecords` to check the current impersonated user's own incidents for a relevant
   duplicate. Inspect a candidate
   with `GetRecord` when needed. If the check fails, do not treat it as "no duplicate."
2. If a suitable incident already exists, return its reference and stop creation.
   Do not create another incident to work around disabled updates.
3. Prepare the proposed `short_description` and detailed handoff summary. For the native
   action, build the `body` with `short_description` only. Never include an assignee,
   assignment group, owner, queue, state, priority override, closure field, or another
   lifecycle/routing field.
4. Show the exact summary, the detailed handoff, and which fields the selected create
   implementation will persist. Obtain explicit confirmation.
   If the payload changes materially, renew confirmation before submitting.
5. Call `CreateRecord` with `tableType: incident` and the confirmed `body`. The backend
   sets the caller from the impersonated ServiceNow user and rejects caller overrides.
6. Report success only when the action returns an authoritative incident identifier.
   Do not perform an update, note, or attachment after creation.

## Results and Failure Handling

Return the incident number or `sys_id`, confirmed fields, actual persisted state when
available, and any connector limitation. For native ServiceNow creation, state that only
`short_description` was submitted and preserve the confirmed detailed handoff separately.
For a custom create-only implementation, claim full description persistence only when the
result or a permitted read confirms it.

If `CreateRecord` is absent, denied, disconnected, fails, or times out, report the actual
error. For an unknown outcome, search with `ListRecords` before considering another
creation attempt. Never blindly retry, substitute another connector action, or repair an
incomplete incident through an update. No routing or post-creation write is part of this
skill.
