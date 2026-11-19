# Governed Analytics Review - Runbook

Use with the [pattern](Governed-Analytics-Review.md) and the scenario's function-specific tests.

## 1. Qualify Access and Ownership

Obtain the exact approved source and identify its business/data owners. Prove an actual query
through the intended runtime and user identity; browser report access is insufficient.
For the Insights Analyst Cowork route, qualify the required Fabric IQ plugin for Power
BI/Fabric or the supported Excel Online access path. Stop if unavailable; do not silently
substitute a connector or identity.

Record allowed datasets, dimensions and output audiences, plus denied-access test identities.
Data/model remediation is a separate work item, not a hidden part of prompt tuning.

**Deliverable:** source-access evidence and accountable owners.

## 2. Sign the Data Contract

Record these fields in the customer's governed workspace:

| Field group | Required values |
|---|---|
| Source and identity | Exact URL/ID, model/report/workbook, query identity and RLS scope |
| Time | Reporting/comparison windows, timezone/fiscal calendar, as-of and refresh limit |
| Filters/grain | Region/segment and other slices, aggregate level, exclusions |
| KPI dictionary | Names, authoritative measures, units/currency, denominators and baselines |
| Derived values | Explicitly approved formulas, rounding and zero/missing treatment |
| Risk/quality | Materiality thresholds, unknown state, reconciliation tolerances |
| Output | Narrative/tables/dashboard schema, classification, reviewer and destination |

For Insights Analyst, default to the last complete Monday-Sunday week unless explicitly
overridden. For another scenario, use its signed period contract rather than assuming that default.

**Deliverable:** source-owner-approved contract and known expected values.

## 3. Build the Evaluation Set

Choose normal, boundary and negative cases:

- Known current/prior, budget/actual or plan values.
- Monday and midweek runs, month/year boundaries and fiscal-calendar overrides.
- Missing quota/budget/measure, zero denominator, negative values and mixed units/currencies.
- Stale refresh, partial/truncated retrieval and conflicting source versions.
- Two differently entitled RLS personas plus a denied user.
- Missing/changed source URL and revoked scheduled-owner access.
- Unsupported causal explanation, employee ranking and unapproved sharing.

Set numerical tolerances with the data owner **before** judging outputs. Match identity,
refresh, filters and period in the expected-value query; otherwise the comparison is invalid.

## 4. Reconcile Before Narrating

1. Retrieve the approved measures; capture minimal source metadata and query scope.
2. Check freshness, completeness, units and period alignment.
3. Compare sampled KPIs to authoritative values within agreed tolerances.
4. Apply only approved derived calculations and risk thresholds.
5. Mark unavailable/undefined values explicitly. If a material requirement is unverified,
   produce an incomplete/blocked review rather than a normal-looking success.
6. Have the data owner resolve mismatches; do not tune the prompt to hide a source error.

**Deliverable:** accepted result table with provenance and gaps.

## 5. Generate and Review Outputs

Generate Markdown narrative, KPI/variance tables and any HTML/Office artifacts from the same
accepted values. Verify source header, refresh, periods, filters, units, subreports, risk labels,
proposed actions and limitations.

Trace each material explanation to evidence. Label hypotheses and avoid asserting causality
from correlation. Keep unconfirmed owners/dates unknown.

Inspect HTML/artifacts for hidden restricted data, credentials, external requests and unsafe
content; verify any interactive behaviour only within approved security controls. No automatic
external hosting is implied. Check Office outputs against existing templates if in scope.

**Release gates:** all sampled numbers within signed tolerance; all representations consistent;
zero invented measures; zero unauthorised disclosures; zero approval bypasses.

## 6. Review Distribution Independently

Record the exact content, intended audience, destination, sensitivity and approver. Test output
access separately from source RLS: a file created under a broad-access persona must not be
shared automatically to a narrower-access audience. Use supported label/sharing controls and
verify their actual behaviour rather than claiming inheritance.

Where mandatory review cannot be enforced in the runtime, leave distribution manual.

## 7. Add Recurrence and Operate

Use the [Cowork schedule lifecycle](../Cowork-Skill-Delivery-and-Scheduled-Reviews/Cowork-Skill-Delivery-and-Scheduled-Reviews-Runbook.md)
when applicable. Bind the source explicitly, validate the owner identity and period rule, and
keep draft preparation distinct from distribution. Interactive-only source input may require
on-demand use.

On model, measure, filter, permission, refresh or period-rule changes, rerun relevant
reconciliation and access tests. Pause recurrence for unresolved material failures. Track
preparation-plus-review effort, corrections, readout latency, missed variances and usage costs;
do not claim benefits from generation time alone.

## Handover

Provide the signed contract, accepted test evidence, output examples, schedule/source inventory,
known gaps, data/support/security owners and pause/recovery procedures. Keep customer data and
source URLs out of the public repository.

See [Insights Analyst delivery](../../01-scenarios/Insights-Analyst-Cowork-Agent/3.Runbook.md)
for the six-skill implementation and per-function acceptance matrix.
