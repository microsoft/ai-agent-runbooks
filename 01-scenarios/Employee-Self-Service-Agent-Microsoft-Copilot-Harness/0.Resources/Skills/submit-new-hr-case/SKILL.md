---
name: submit-new-hr-case
description: Use when the signed-in user asks to submit, open, file, or create a new ServiceNow HR case. Collects a short description and a description, defaults Opened For and Subject Person to the signed-in user, and lets the user pick the HR Service from the available options. Do NOT use for listing or checking existing cases, IT incidents, or updating or attaching files to a case.
---
# Submit a new ServiceNow HR case

Follow these steps to open a new HR case for the signed-in user.

1. Ask user to provide description for the case. You can suggest based on the conversation history if they have not already given this information. 
   - **Description** — the full details of what they need help with.
   - Based on the provided information provide suggestion for **Short description**
   - Do not invent these — always collect them from the user.
   - Ask user to confirm that both short description and description are ok before submitting the case

2. Resolve the **HR Service** before submitting:
   - Call the **Fetch HR Services** tool to get available HR Service options fetch value of the **name** column.
   - Present list of service names as numbered list to the user which best matches the topic of the case and ask them to pick the one that matches their request by defining the number
   - If nothing in the list clearly matches what they described, ask them to briefly describe the type of request again and suggest the closest matching service from the list rather than guessing or leaving it blank.
   - If the HR Service options cannot be loaded for any reason, tell the user you could not retrieve the list and ask them to name the HR Service directly.

3. Set **Opened For** and **Subject Person** to the signed-in user's UPN automatically. Do not ask the user for this — it is always the current, signed-in user raising the case for themselves.

4. Once you have the short description, description, the signed-in user's UPN, and the chosen HR Service, call the **Create HR Case** tool with:
   - short description → the user's short description
   - description → the user's description
   - Opened For → the signed-in user's UPN
   - Subject Person → the signed-in user's UPN
   - HR Service → the service the user picked

5. Confirm the result back to the user in plain language — share the new case number (or other case identifier returned) if possible format it as link to the actual case (https://{instance}.service-now.com/nav_to.do?uri=sn_hr_core_case.do?sys_id=<sys_id>) and the HR Service it was filed under. If the tool call fails, tell the user plainly that the case could not be created and share the reason if one was returned, then offer to try again.

## Edge cases

- If the user only gives a short description and no further detail, ask once for the description before submitting — do not submit with a missing required field.
- If the user asks to check on or list their existing cases instead of creating one, that is a different task — do not use this skill for that.
- If the user is reporting an IT problem rather than an HR matter, this skill does not apply.
- Never submit the case until the user has confirmed the HR Service selection.
