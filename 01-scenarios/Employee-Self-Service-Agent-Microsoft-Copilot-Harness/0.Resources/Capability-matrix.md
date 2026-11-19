# Employee Self-Service Microsoft Copilot Harness capability matrix

**Implementation status:** Nine starter runtime skills, including confirmed submission of an employee's own HR case. No deployed tool bindings, workflows, credentials or live test evidence are supplied. All live capabilities are OFF until validated.

## Profiles and enabling rules

**Knowledge-only baseline:** approved SharePoint and ServiceNow KB retrieval and source-backed navigation are handled by global instructions and configured knowledge, not separate skills. No action tools are exposed. Enable knowledge only after K passes.

**Starter live scope:** select individual rows below after their gates pass; importing all nine is not required. Tool names come from the supplied skill definitions and are **binding requirements to verify**, not independently verified vendor operation IDs or proof of tenant availability. Record actual schemas, versions, delegated identity and allowed operations in the deployment manifest. For overlapping core-profile lookups, select the connector or MCP profile route; MCP-only requested reads remain separately governed. Do not duplicate lookups or switch routes after OFF, denied or failed results. Do not retain the old 28-skill set alongside these replacements.

## Capability inventory and import order

| Capability ID / linked SKILL.md | Source behavior / disposition | Tools or knowledge | Actual implementation / operation ID | Dependencies | Profile / access / approval |
|---|---|---|---|---|---|
| [update-workday-home-phone-number-mcp](Skills/update-workday-home-phone-number-mcp/SKILL.md) | Supplied home-phone procedure; replaces broad phone update | Workday-MCP worker/phone reads, home-contact event create/list/update/submit; WD-REST-API reference lookups | Supplied tool names; tenant binding unverified | D, W, H | OFF; existing own home phone only, exact staging/submission approval, one event |
| [get-workday-cost-center](Skills/get-workday-cost-center/SKILL.md) | Supplied Organizations lookup; replaces cost-center alias | WD-REST-API `GET common/v1/{tenant}/workers/me/organizations` | Supplied path; tenant binding unverified | D | OFF; own exact Cost Center assignments, no other organization types |
| [get-workday-employee-information](Skills/get-workday-employee-information/SKILL.md) | Supplied connector-based core profile; alternative to overlapping MCP profile reads | WD-REST-API `GET staffing/v7/{tenant}/workers/me` | Workday Power Platform Connector REST binding; supplied path/schema to validate | D, H | OFF; own requested Employee ID, Name, Business Title, Location, Phone, Email and Worker Type only; no home-contact/absence lookups or writes |
| [get-workday-employee-information-mcp](Skills/get-workday-employee-information-mcp/SKILL.md) | Supplied employee profile; consolidates requested own details | `find_staffing_workers`; requested `list_worker_addresses`, `list_worker_phone_numbers`, `find_absence_balances` | Supplied Workday-MCP names; tenant binding unverified | D, H | OFF; approved core fields; home contacts/balances only when requested |
| [request-workday-time-off-mcp](Skills/request-workday-time-off-mcp/SKILL.md) | Supplied standard time-off procedure; new starter capability | Worker resolution; `find_worker_eligible_absence_types`, `find_worker_valid_time_off_dates`, `find_worker_time_off_details`, `create_worker_time_off_request` | Supplied Workday-MCP names; tenant binding unverified | D, W, H | OFF; own Time Off / Absence Table only, confirmed submission, no Leave of Absence or approval |
| [create-it-ticket](Skills/create-it-ticket/SKILL.md) | Create an IT incident for the signed-in caller | `Create IT Ticket`; Microsoft Dataverse MCP Server for `ServiceNowInstanceName` links | ServiceNow Create Record (Incident); verify both descriptions and urgency persist on create | S, W | OFF; confirm short description, full description, urgency and caller before submission |
| [list-it-tickets](Skills/list-it-tickets/SKILL.md) | List own IT incidents across states | `List My IT Tickets`; Microsoft Dataverse MCP Server for `ServiceNowInstanceName` | ServiceNow List Records (Incident) with enforced own-caller filter; validate delegated identity and bounded pagination | S | OFF; Number, State, Short Description. Link the number when an instance name and authorized record ID are available; otherwise show it as text. |
| [list-hr-cases](Skills/list-hr-cases/SKILL.md) | Supplied HR-case list; replaces HR list alias | `List My HR Cases` | Supplied name; own-case/filter behavior unverified | S, H | OFF; own employee-visible cases with current user as both Opened For and Subject Person, four-column table with linked case numbers, actual queried state scope |
| [submit-new-hr-case](Skills/submit-new-hr-case/SKILL.md) | Submit an ordinary HR case for oneself | `Fetch HR Services`, `Create HR Case` | List Records (HR Services) and Create Record (HR Case); validate service eligibility and persistence of both descriptions on create | S, H, W | OFF; employee selects service and confirms the case; both Opened For and Subject Person must resolve to the signed-in employee |

Dependencies are tool/backend requirements, not additional skill imports:

| Key | Required dependency and exit criterion | Owner |
|---|---|---|
| K | Approved SharePoint/ServiceNow KB source IDs; ACL/user-criteria, citations, freshness and conflict tests | Knowledge + ServiceNow owners |
| S | Approved ServiceNow bindings, unique immutable user mapping, own-record/field enforcement; `gs.getUserID()` must be the employee | ServiceNow + identity owners |
| D | Supported Workday-MCP/WD-REST-API bindings, delegated employee/WID resolution, domain security, endpoint/reference allowlists and actual schemas | Workday + identity owners |
| H | Per-capability HR/privacy approval, field minimization, sensitive absence/home-contact rendering, transcript/memory/retention controls | HR + privacy owners |
| W | Exact-payload trusted confirmation, durable operation/event record, retry deduplication, source-state checks, status reconciliation and bounded read-back | Integration + security owners |

## Deferred and excluded scope

HR-case details/latest-update/update/attachment skills, incident details/latest-update/update/attachment skills, Workday email updates and specialist Workday reads (compensation, certifications, company code, emergency contacts, languages, national IDs, passports, visas and dedicated anniversary lookup) are **not shipped or enabled** in this starter set. Requested approved employee-ID fields may be answered by either configured profile route; source service dates remain MCP-only if actually returned. This does not restore specialist operations. No attachments, new phone creation, work-phone edits, Leave of Absence, manager access, catalog checkout or population reporting are implied.

Knowledge answers/navigation remain supported without runtime skills. The planning workbook is a broader illustrative backlog, not the current import manifest: mark any rows outside this matrix deferred/not selected.

[Skills index](Skills/README.md) and [acceptance cases](../5.Sample-prompts.md#capability-tests) cover these same nine IDs in this order. Disabling/deleting a skill also requires revoking its tool/backend/alternate-path access and handling active sessions and pending work; preserve shared connections needed by other enabled skills.
