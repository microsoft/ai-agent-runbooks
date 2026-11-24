---
name: request-workday-time-off-mcp
description: "Use when the signed-in user asks to request or submit standard Workday Time Off or Absence Table time, such as PTO, vacation or sick time. Validate eligible type, dates, daily quantities, units and balance, obtain exact confirmation and submit once. Not for Leave of Absence, approval, cancellation or another worker."
---
# Request Workday Time Off

## Scope

Submit a standard Time Off / Absence Table request for the signed-in worker. Leave of Absence (including parental, FMLA and extended medical leave) uses the approved separate process.

## Tools

Use Workday-MCP: `find_staffing_workers`, `find_worker_eligible_absence_types`, `find_worker_valid_time_off_dates`, `find_worker_time_off_details` and `create_worker_time_off_request`, with the configured operation-status/reconciliation path.

## Inputs

Exact dates/date range, requested type, full/partial-day intent and any required daily quantities. Resolve timezone or relative-date ambiguity before validation. Identity always comes from authenticated context.

## Procedure

1. Resolve the signed-in worker via `find_staffing_workers`, `contextInstanceId="me"`, using returned `id` (WID), not `workerId`. If resolution fails, stop; do not ask for a different worker's ID. Clarify dates and day shape. Call `find_worker_eligible_absence_types` for this worker and select one eligible Time Off / Absence Table type. Ask if multiple types plausibly match; never select a Leave of Absence type.
2. Call `find_worker_valid_time_off_dates` for that worker and type. Obtain valid dates, per-day quantities/units and required position/reference values from Workday. Do not invent IDs, working days, reason codes or hours-per-day conversions. If a required value cannot be resolved, stop and give the approved Workday/HR route.
3. Call `find_worker_time_off_details` for balance and overlapping existing entries. Present type, exact dates, daily quantities/units and findings. An invalid date blocks submission. Disclose insufficient balance or overlaps; proceed only if Workday/backend policy permits and the user confirms the complete request including those findings.
4. Obtain explicit confirmation through the configured backend-verifiable path for this worker, type, dates, quantities and units. Revalidate changes and source-state conflicts before renewed confirmation. No confirmation means no submission; do not invent proof.
5. Call `create_worker_time_off_request` once with the confirmed WID and validated daily entries (date, type ID, quantity and unit where required by the actual schema). This starts submission/approval routing; do not call a separate approval action. Retain the source request reference and operation receipt for reconciliation.
6. Report the returned actual status. Submitted/pending approval is not approved or finalized. Use the configured status path to resolve uncertainty; never repeat creation merely because a response was delayed.

## Results and Failure Handling

Report submitted, pending, denied, failed or unknown truthfully, with an authorized reference when available. Resolve an uncertain create through the same operation record and source request before any retry. If reconciliation is unavailable, stop and disclose the unresolved outcome. Do not resubmit overlapping work as a workaround, approve a request, change pay or infer medical entitlement. Use a source-backed Leave of Absence route for excluded requests.
