---
name: create-it-ticket
description: Use when the signed-in user asks to create, open, file, log, or report a new IT ticket or incident. Suggests a short description and a longer description from the conversation, lets the user choose Urgency (Low, Medium, High), always sets Caller to the signed-in user, and confirms every detail with the user before submitting. Do NOT use for listing or checking existing IT tickets, HR cases, or updating an existing ticket.
---
# Create a new ServiceNow IT ticket (incident)

Follow these steps to open a new IT ticket (incident) for the signed-in user.

1. Work out the issue description:
   - Review the conversation history for enough detail about the problem (what is broken, error messages, when it started, impact).
   - If there is enough detail, draft a suggested **Short description** (a concise one-line summary) and a longer suggested **Description** (the full details of the issue), and show both to the user for confirmation.
   - If there is not enough detail in the conversation, ask the user to describe the issue before drafting anything — do not invent details.
   - Never submit a ticket with a guessed or incomplete description — always get the user's explicit confirmation on the wording of both fields, and let them edit either one.

2. Ask the user to choose **Urgency**. Map clear severity wording to `1 - High` (high/critical/urgent), `2 - Medium` (medium/normal), or `3 - Low` (low/minor)

3. Set **Caller** to the signed-in user automatically. Do not ask the user for this — it is always the current, signed-in user raising the ticket for themselves.

4. Before submitting, show the user a summary of everything that will be sent:
   - Short description
   - Description
   - Urgency
   - Caller (the signed-in user)

   Ask the user to confirm this is correct ("Should I submit this ticket?"). Only proceed to step 5 after the user explicitly confirms. If the user asks to change anything, update it and show the summary again before asking for confirmation a second time.

5. Once confirmed, call the **Create IT Ticket** tool with:
   - Short description → the confirmed short description
   - Description → the confirmed longer description
   - Urgency → the user's chosen urgency
   - Caller → the signed-in user

6. Call 'Microsoft Dataverse MCP Server' to get the value is this environment variable 'ServiceNowInstanceName'. First check is current value set if not check default value. 

7. Confirm the result back to the user in plain language — share the new ticket number (or other identifier returned). If 'ServiceNowInstanceName' environment variable has value set then show ticket number formatted as a link to the actual ticket (https://{ServiceNowInstanceName}.service-now.com/nav_to.do?uri=incident.do?sys_id=<sys_id>) when a sys_id is available. Otherwise, show the case number as plain text. If the tool call fails, tell the user plainly that the ticket could not be created, share the reason if one was returned, and offer to try again.

## Edge cases

- If the user only gives a vague one-line issue report, ask once for more detail before drafting the Additional comments (Customer visible) field — do not submit with a thin or guessed description.
- Never skip the confirmation step in point 4, even if the user seems to be in a hurry — urgency of the issue is not a reason to skip confirming what gets submitted.
- If the user asks to check on or list their existing tickets instead of creating one, that is a different task — do not use this skill for that.
- If the user is reporting an HR matter rather than an IT problem, this skill does not apply.
- If the user wants to update or add detail to a ticket that was already created, this skill does not apply — only use it for creating a brand-new ticket.