# Runbook — Grounding & Response Quality Remediation

> **Use this when an agent is live or in UAT and the answers are wrong.** Read
> [Grounding-and-Response-Quality-Remediation.md](Grounding-and-Response-Quality-Remediation.md)
> first for the diagnostic ladder.

---

## Before You Start

Collect these from the person raising the complaint. Do not begin without them.

| Item | Why |
|---|---|
| The **exact** question text | Paraphrases send you down the wrong path |
| The exact answer received (screenshot) | Distinguishes wrong answer from withheld answer |
| Who asked it (identity, licence type) | Rung 2 |
| Which surface (Copilot, Teams, SharePoint, web) | Channel behaviour differs |
| When it happened | Correlate with model or content changes |
| What the correct answer is, and which document it comes from | Otherwise there is nothing to test against |
| Whether it ever worked | Regression vs never-worked are different investigations |

---

## Step 1 — Reproduce

Ask the same question three times, in three separate chat sessions, as yourself.

| # | Run 1 | Run 2 | Run 3 |
|---|---|---|---|

| Outcome | Go to |
|---|---|
| Fails 3/3 | Step 2 |
| Fails 1–2 of 3 | **Step 6 first**, then return to Step 2 |
| Passes 3/3 | Get the exact original phrasing and repeat. If it still passes, the issue is user-specific → Step 2 |

---

## Step 2 — Test Across Users

Run the same question as at least two more users.

| User | Licence type | Region / BU | Result |
|---|---|---|---|

| Pattern | Action |
|---|---|
| Fails only for specific users | Permissions or identity mapping → Step 3, then the connector runbook |
| Degrades for unlicensed users | Expected retrieval difference. Document it and set expectations, or bring that population into scope for graph grounding |
| Fails only in one region | Content scoping or a regional feature gap. Verify feature availability for that cloud |
| Fails for everyone | Continue to Step 3 |

---

## Step 3 — Verify Retrievability

1. Open the source document that should answer the question.
2. Copy a distinctive phrase from it.
3. Search for that phrase in Microsoft Search (or the source system's own search).

| Result | Action |
|---|---|
| Not found | **Ingestion problem.** Go to the [Copilot Connector Knowledge Onboarding runbook](../Copilot-Connector-Knowledge-Onboarding/Copilot-Connector-Knowledge-Onboarding-Runbook.md), Step 5 |
| Found, but the agent does not use it | Continue to Step 4 |
| Found, and the agent uses it but answers wrongly | Skip to Step 6 |

---

## Step 4 — Inspect the Content

Run this checklist against the specific document that failed.

| # | Check | Result | Fix if failed |
|---|---|---|---|
| 1 | Is it text, or a scan / image-only PDF? | | Re-publish as text |
| 2 | Is the answer inside a table in a PDF? | | Restate in text or move to a structured source |
| 3 | Is the answer inside an image or diagram? | | Add a text description |
| 4 | How long is the document? Is the answer deep in it? | | Split into focused documents |
| 5 | How large is the file? | | Split; check the size limit for your retrieval path |
| 6 | Does the filename contain unusual characters? | | Normalise |
| 7 | Do near-duplicate or superseded versions exist? | | Archive them — this is the most common fix at this step |
| 8 | Does the user's terminology match the document's? | | Add a synonyms section to the content or the instructions |
| 9 | Is the content in a different language from the question? | | Provide the high-traffic topics in the question language |

Record which check failed. If several did, fix them all before re-testing — partial fixes produce
ambiguous results.

**Re-test after fixing.** If resolved, stop here and write up the cause.

---

## Step 5 — Check the Retrieval Path

| Question | Answer | Action |
|---|---|---|
| What type of agent is this? | | See the retrieval table in the pattern document |
| If Copilot Studio: is tenant graph grounding with semantic search enabled? | | If not, and the agent is grounded on SharePoint or connectors, enable it |
| Is user authentication set to authenticate with Microsoft? | | Required for graph grounding to be configurable |
| What is the orchestration mode? | | Generative and classic have different knowledge-source limits |
| How many knowledge sources are configured? | | Past a certain count, sources are filtered before search — reduce or improve descriptions |
| Is the customer benchmarking against a SharePoint agent? | | Different retrieval stack — say so, and set the target accordingly |

**If enabling graph grounding:**

1. Note the credit implication (10 credits per grounded message).
2. Re-run the full evaluation set, not just the failing question.
3. Measure latency — expect a small increase.

**If the gap remains on SharePoint content at scale**, evaluate synchronising the curated content
into Dataverse. Present it as a trade-off: materially better accuracy against an additional store
to maintain. Have the accuracy numbers from your evaluation set ready — this conversation goes
much better with evidence.

---

## Step 6 — Audit the Instructions

### 6a. The citation check (do this first for intermittent failures)

| Check | Action |
|---|---|
| Do the instructions tell the model to always cite its source in-text? | If not, add it |
| Do the instructions force a rigid output format (JSON, fixed template)? | Remove or relax it — it suppresses citation markers |
| Do the instructions tell the model to omit sources or references? | Remove |
| Is the response rendered through a custom variable or adaptive card? | Citations are not added automatically — render them yourself |
| Is "allow ungrounded responses" off? | Then answers without a citation are withheld. This is the mechanism behind intermittent failures |

### 6b. General instruction hygiene

| Check | Action |
|---|---|
| Length | Cut. Long instruction sets degrade compliance and hit the character limit |
| Contradictions | Two rules that conflict produce non-deterministic behaviour |
| Language rule | State it as a procedure, not a preference |
| Content in the instructions | Move it to knowledge. Instructions are for behaviour |
| Boundaries | For sensitive domains, state what the agent must not do, explicitly |

Change **one thing at a time** and re-run the evaluation set after each change. Changing three
instructions at once and seeing improvement teaches you nothing.

---

## Step 7 — Check for Platform or Model Change

| Check | Where | Action |
|---|---|---|
| Has the agent's model been changed? | Agent settings / change history | Revert and re-test. Model changes have caused agents to stop searching knowledge entirely |
| Different behaviour across surfaces? | Test the same prompt in each | Standardise where possible; document where not |
| Orchestration mode changed? | Agent settings | Re-validate knowledge-source limits |
| Service advisory? | Microsoft 365 Message Center | Check before investigating further |
| Content changed? | Source system version history | A "regression" is often an edited document |

If you have a stored evaluation baseline, run it now. The comparison will tell you in minutes
what would otherwise take days.

---

## Step 8 — Assess Architectural Fit

If Steps 1–7 have not resolved it, ask whether the requirement is achievable with retrieval over
documents at all.

| The user is really asking for | Verdict |
|---|---|
| A count, sum, rate, or trend | Not a retrieval problem. BI or a data agent |
| A specific row from a large spreadsheet | Code interpreter over structured data, or a database action |
| A join across structured entities | A query, not a search. Structured source or action |
| An exhaustive list from a source system | Use the source system |
| Live record status | Federated connector or a real-time action |
| High-precision retrieval over a very large corpus | [Enterprise RAG](../Enterprise-RAG-Pattern/Enterprise-RAG-Pattern.md) with Azure AI Search |

Write the finding up and take it to the sponsor. Continuing to tune an agent against a
requirement it structurally cannot meet is the most expensive mistake in this pattern.

---

## Step 9 — Establish the Safety Net

Whatever the cause, do not leave without this.

1. Build or extend the evaluation set to at least 30 questions covering:
   - Real user phrasings from the complaints
   - Known-good questions (regression protection)
   - Questions with no answer (should decline cleanly)
   - Permission cases (should return nothing)
   - Cross-language cases, if applicable
2. Run each three times, record results, store the baseline.
3. Automate it with the Copilot Agent Kit if the agent matters.
4. Define the re-run triggers: model change, instruction change, content migration, quarterly.

---

## Step 10 — Write It Up

A one-page write-up per incident, added to the scenario's resources folder:

| Field | Content |
|---|---|
| Symptom as reported | |
| Reproduction result | |
| Rung at which the cause was found | |
| Root cause | |
| Fix applied | |
| Evaluation result before / after | |
| Preventive action | |

These write-ups become the most valuable asset in the repository. The same six causes recur
across customers, and a team that has read the write-ups diagnoses in an hour what took the
first team a week.

---

## Quick Reference — Symptom to Rung

| Symptom | Start at |
|---|---|
| "It worked yesterday" | Rung 6 (citations) |
| "Works for me, not for my colleague" | Rung 2 |
| "It never finds this document" | Rung 3 |
| "It gets the policy right but the numbers wrong" | Rung 4 (tables) |
| "It answers in the wrong language" | Rung 6, then Rung 4 |
| "It cites the wrong document" | Rung 4 (duplicates) |
| "The SharePoint agent was better" | Rung 5 |
| "It got worse last week and we changed nothing" | Rung 7 |
| "It can't count anything" | Rung 8 |

---

## Exit Criteria

- [ ] Root cause identified and recorded against a specific rung
- [ ] Fix applied and verified with three-run consistency testing
- [ ] Full evaluation set re-run, not just the failing question
- [ ] Cross-user verification completed
- [ ] Baseline stored for future regression comparison
- [ ] Write-up added to the scenario resources
- [ ] Preventive action agreed (content ownership, change triggers, or architecture decision)
