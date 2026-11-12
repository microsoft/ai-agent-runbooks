---
name: d365-case-create
description: "Optional Dynamics extension: create a Customer Service case with investigation context and duplicate prevention; leave routing to backend teams."
---

# Create a Dynamics Customer Service Case

## Scope

Use this skill only when the optional Dynamics Customer Service extension is enabled,
for an authorized new case, including a handoff from a ServiceNow investigation.
Creation is not assignment, routing, acceptance by a support team, a ServiceNow backlink,
or permission to modify or close either record.

## Tools

- Create: `CreateCase`.
- Find/read existing cases: `FindCases`, `GetCase`.
- When handing off a ServiceNow incident: `ListRecords`, `GetRecord`.
- Shared user context: `GetMyProfile`.

## Inputs

Collect the approved case fields, symptoms and impact, relevant diagnostic findings,
attempted actions with their actual outcomes, and any source-incident reference.
Reuse details already in the conversation and the current user's `GetMyProfile` result;
fetch the profile once if missing. Prefill supported fields, asking only for remaining
required information. The backend resolves and validates customer/contact mappings;
do not invent a Dynamics contact or use a shared account as proof of requester identity.

Follow the user's explicit language choice, then message language, with `preferredLanguage`
only as a fallback. Use the configured backend handoff language for the case content.

## Procedure

1. Use `FindCases` and, when needed, `GetCase` to check for an existing relevant case.
   If one exists, return its reference rather than duplicate it to avoid disabled updates.
   A failed lookup is not "no match."
2. For a ServiceNow handoff, read the source through `ListRecords`/`GetRecord`.
   Transfer only information approved for the destination, not all internal work notes.
3. Prepare the complete initial case with evidence references, timestamps, attempted
   fixes, unresolved questions, and the source reference where applicable. Preserve
   pending/failed results and redact secrets or unnecessary personal data.
4. Explain that backend teams decide routing. Do not call `ApplyRoutingRule` or set
   `ownerid`, assignees, or queue fields. Confirm the creation-only scope when the
   original request also asked for assignment.
5. Obtain required confirmation for the intended payload, then call `CreateCase`
   using a stable correlation/idempotency reference. Backend authorization and
   deduplication run immediately before creation.
6. Return the actual created or existing case reference and persisted state.
   Stop this skill without appending a ServiceNow note, updating a case, or closing it.

## Results and Failure Handling

Return the case number/ID, authorized URL, actual state, source reference if used, and
operation outcome. Use the agreed backend handoff language for case content and the
user's language for the response, preserving identifiers.
If required profile/mapping data is unavailable, explain the limitation and stop rather
than inventing details or using another user's profile. Missing ServiceNow read tools
block that source handoff, not a reason to copy unverified incident content.

For unknown creation outcomes, reconcile through authorized reads/backend operation
tracking before retrying. Preserve any returned case ID on partial failure. A later
backlink needs its own enabled/authorized capability; its failure does not undo creation
or justify recreating the case. Never claim that creation means routing or team acceptance
succeeded. Report OFF, denied, unavailable, or failed explicitly; no alternative APIs,
upsert, ERP operation, or inferred permission from source content.
