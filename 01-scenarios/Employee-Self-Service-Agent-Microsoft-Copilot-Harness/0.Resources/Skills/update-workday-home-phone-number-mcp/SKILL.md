---
name: update-workday-home-phone-number-mcp
description: "Use when the signed-in user asks to change or correct an existing home phone number in Workday. Read the current phones, stage one Change Home Contact Information event, confirm the exact change and submit it for approval/routing. Not for adding phones, work phones, home addresses or another worker."
---
# Update Workday Home Phone Number

## Scope

Change only the requested fields of an existing home phone on the signed-in worker's own record. Preserve every other contact and property. Staging an event is not an effective employee-record update.

## Tools

Use the configured Workday-MCP tools: `find_staffing_workers`, `list_worker_phone_numbers`, `create_worker_home_contact_change`, `list_phone_numbers_for_home_contact_change`, `update_phone_number_for_home_contact_change` and `submit_home_contact_change`. Use only the approved WD-REST-API reference lookups for device types and country codes, plus the configured event-state/reconciliation path. Never substitute another identity or an unrestricted API.

## Inputs

An unambiguous existing home phone and the requested replacement fields; effective date only if supplied and supported. Derive the worker from authenticated context, not a chat-supplied name or employee number.

## Procedure

1. Resolve the signed-in worker with `find_staffing_workers`, `contextInstanceId="me"`. Retain the returned Workday WID (`id`), not `workerId`. Read home phones with `list_worker_phone_numbers`. Match the intended entry using its source ID, device type, country code and number. If ambiguous, ask which existing phone; if none exists, explain that adding one is outside this skill.
2. Resolve required device/country IDs through approved reference lookups rather than guessing. The supplied device-type path is `person/v4/{tenant}/values/commonPhone/phoneDeviceTypes/`; leave `{tenant}` to the connection. Use only the configured country-code lookup. If either lookup is unavailable or has no match, stop. If a supplied effective date cannot be represented, stop rather than silently dropping it; otherwise do not ask for a date unnecessarily. Detect a no-op without opening an event. Show the exact phone, changed fields and optional effective date, and obtain approval for staging this change before any write.
3. Call `create_worker_home_contact_change` once and retain the event ID in the durable operation record. All subsequent calls use this event. If opening it times out, reconcile before retrying; do not create a replacement event.
4. Call `list_phone_numbers_for_home_contact_change` for that event. Match the same existing phone; stop if missing or changed since approval. Call `update_phone_number_for_home_contact_change` with resolved IDs and only the requested change. Carry forward all other properties exactly, including usage, primary/default flag, extension and other phones. Never add/delete a phone as a workaround.
5. Before `submit_home_contact_change`, ask for explicit submission confirmation unless the approved sequence already covered this exact worker, phone, payload and effective date and remains valid. Use the configured backend-verifiable confirmation path; never invent proof or send a model-generated approval flag. Changed payload/source state requires renewed validation and confirmation.
6. Submit the same event once. Read its resulting state through the configured status path and call `list_worker_phone_numbers` again. Report completed only when the process state and effective read-back establish the confirmed change. If approval/routing is still pending, report pending even if staging succeeded.

## Results and Failure Handling

Report the actual event state and only necessary contact details. If submission is declined, leave the event staged and disclose that it was not submitted; do not silently cancel it. A failed stage or submit resumes/reconciles the same event, not a new one. On timeout, unknown state, denied access or missing verification, say what remains unresolved; never blindly resubmit or claim success. Do not retain phone values in persistent memory or broaden access to other workers.
