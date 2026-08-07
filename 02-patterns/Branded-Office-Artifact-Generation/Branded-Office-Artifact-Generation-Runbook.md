# Runbook — Branded Office Artifact Generation

> **Use this when an agent must produce documents people will send or present.** Read
> [Branded-Office-Artifact-Generation.md](Branded-Office-Artifact-Generation.md) first.

---

## Prerequisites

| Requirement | Owner |
|---|---|
| Approved templates as files (`.potx`, `.dotx`, `.xltx`) | Brand / Communications |
| Approved logo and image assets | Brand / Communications |
| SharePoint Administrator rights | SharePoint admin |
| SharePoint Online Management Shell | Delivery engineer |
| A named brand reviewer | Customer |
| A named artifact owner (the person who would actually present it) | Customer |

---

## Step 1 — Collect the Real Artifacts

Get three things per artifact type:

1. The **template file** (`.potx` / `.dotx` / `.xltx`)
2. **Two or three finished examples** produced by a person — good ones
3. The **brand guidelines** they implement

The finished examples are the specification. They tell you the section order, the tone, the
length, and what a good version looks like — none of which is in the template file.

**Deliverable:** template files and reference artifacts, in the scenario resources folder.

---

## Step 2 — Template Hygiene Review

Run this with the brand team. Fix before configuring anything.

| # | Check | Status | Owner |
|---|---|---|---|
| 1 | Placeholders correctly defined in the slide master / document styles | | |
| 2 | Placeholder alignment consistent across layouts | | |
| 3 | Text colours consistent and defined by theme, not hard-coded | | |
| 4 | Layout count small and each one clearly, descriptively named | | |
| 5 | Fonts embedded, or organization fonts configured | | |
| 6 | No legacy or orphaned masters | | |
| 7 | Logos available as clean assets in the image library | | |
| 8 | Template saved in the correct format (`.potx` / `.dotx` / `.xltx`) | | |

> 📌 Descriptive layout names matter more than they look. "Section divider — dark" is usable
> signal; "Layout 14" is not.

**Deliverable:** remediated templates, signed off by the brand team.

---

## Step 3 — Configure the Organization Asset Library

1. Select or create a **single site** to host all organization asset libraries — they must all
   live on the same site, and you can have up to 30.
2. Set permissions. "Everyone except external users" as visitors is required for the libraries
   to surface; add the brand team as members or owners.
3. Create two libraries: one for Office templates, one for images and logos.
4. Upload the remediated templates and approved assets.
5. Designate them:

```powershell
Connect-SPOService -Url https://<tenant>-admin.sharepoint.com

# Office templates
Add-SPOOrgAssetsLibrary `
  -LibraryUrl https://<tenant>.sharepoint.com/sites/brand/Templates `
  -OrgAssetType OfficeTemplateLibrary

# Images and logos
Add-SPOOrgAssetsLibrary `
  -LibraryUrl https://<tenant>.sharepoint.com/sites/brand/Assets `
  -ThumbnailUrl https://<tenant>.sharepoint.com/sites/brand/Assets/logo.jpg `
  -OrgAssetType ImageDocumentLibrary
```

6. Verify with `Get-SPOOrgAssetsLibrary`.

**Then wait.** Templates can take up to 24 hours to appear. Do not start testing before that and
conclude the configuration failed.

**Deliverable:** configured libraries, verified via PowerShell.

---

## Step 4 — Verify Availability as a Normal User

Not as the admin, and not only on one client.

| Surface | Templates visible? | Notes |
|---|---|---|
| PowerPoint desktop | | Requires Microsoft 365 Apps 2002 or later |
| PowerPoint on the web | | Requires Office 365 E3/E5; found under the PowerPoint start page → Office Template Library |
| Word desktop | | |
| Excel desktop | | |

Known gaps to confirm rather than assume: the organization assets library is not available in
Word on the web or Excel on the web, and the feature is not available for 21Vianet or US
Government plans. Users also need at least read permission on the organization's root site.

**Deliverable:** availability verification table.

---

## Step 5 — Define the Artifact Structure

Encode the structure explicitly. Do not leave it to the model's judgement.

Template for a custom skill or agent instruction:

```text
<ARTIFACT NAME> STRUCTURE

Produce a <PowerPoint deck / Word document / Excel workbook> using the
corporate template from the organization asset library.

Sections, in this order:
1. <section> — <content rule, length limit>
2. <section> — <content rule, length limit>
...

LENGTH
- Maximum <N> slides / pages.
- <Section> is never more than <N> bullets.

FIDELITY
- Every factual claim must be traceable to a retrieved source.
- If a value is not present in the retrieved source, write exactly
  "Not recorded in <source>". Do not estimate, infer, or leave it blank.
- Never invent names, figures, or dates.

NEVER INCLUDE
- <topics that are out of bounds — pricing, legal positions, competitive claims,
  anything requiring certification>

OUTPUT
- Save to <governed location>. Do not send to anyone.
```

The required-phrase rule in the FIDELITY block is the highest-value line in the whole file. It
turns a silent fabrication into a visible gap that a reviewer can act on.

**Deliverable:** artifact structure definitions, under source control.

---

## Step 6 — Build the Test Matrix

Test every combination your users can reach. This is where the unpleasant surprises are.

| Entry point | Model A | Model B | Model C |
|---|---|---|---|
| In-app Copilot sidebar | | | |
| Office Agent Mode | | | |
| Copilot Chat | | | |
| Cowork session | | | |
| Custom agent | | | |

For each cell, record four results:

| Check | Pass criteria |
|---|---|
| Template applied | Correct master, not a generic theme |
| Fonts | Corporate fonts, no substitution |
| Logo | Correct asset, undistorted, not regenerated |
| Layouts | Content in the intended placeholders |

Publish the completed matrix internally. Where a combination does not honour the template, steer
users to a verified path and say why. An honest matrix is far better received by a brand team
than an unexplained inconsistency.

**Deliverable:** completed matrix, published.

---

## Step 7 — Fidelity Testing

Separate from brand testing, and more important.

| Test | Expected |
|---|---|
| Generate an artifact where source data is complete | All sections populated correctly |
| Generate where source data is **sparse** | "Not recorded in ..." — never plausible invented content |
| Generate where a key numeric field is empty | States it is not recorded. Does not estimate |
| Generate the same artifact three times | Same structure, same facts, comparable depth |
| Generate at the maximum expected length | Completes; no truncation mid-document |
| Generate an artifact type known to be fragile | Produces the file at all |
| Include a logo or brand image | Correct asset, undistorted |

Any fabricated figure, name, or date is a hard fail. Do not weigh it against the other results.

**Deliverable:** fidelity test results.

---

## Step 8 — Safety Configuration

| Control | Setting | Verified |
|---|---|---|
| New file by default rather than in-place edit | | |
| No external send without human review | | |
| Output saved to a governed location, not downloaded | | |
| Approval prompts for medium and high risk actions left enabled | | |
| Users trained on version history recovery | | |
| Sensitivity labelling coverage of the output formats confirmed | | |
| Audit and retention position for generated artifacts confirmed | | |

If an output format falls outside labelling coverage, either constrain the agent to formats that
are covered or document the gap explicitly with the compliance stakeholder. Do not leave it
undecided.

**Deliverable:** safety configuration record and compliance position.

---

## Step 9 — Human Review

Two reviewers, two different questions.

| Reviewer | Question | Sign-off |
|---|---|---|
| **Brand team** | Would this pass brand review if a person had made it? | |
| **Artifact owner** (seller, bid manager, analyst) | Would I present this to a customer without rebuilding it? | |

The second question is the real acceptance test. If the answer is "I'd fix a few things first",
find out exactly which things — that list is your remaining work.

**Deliverable:** dual sign-off.

---

## Step 10 — Launch and Operate

Publish with the artifact, at launch:

| Topic | What to say |
|---|---|
| Which artifacts it produces | Named, with an example of each |
| Which entry point to use | The verified path from the matrix |
| Known differences | From the matrix — be specific |
| What "Not recorded in ..." means | Fix the source system, not the prompt |
| Review expectation | Nothing goes external without a human read |
| Recovery | How version history works, and when to use it |

| Cadence | Activity | Owner |
|---|---|---|
| Weekly (first month) | Review generated artifacts for brand and fidelity drift | Delivery engineer |
| On template change | Re-run the test matrix | Brand team |
| On model or platform change | Re-run the test matrix | Delivery engineer |
| Quarterly | Refresh the artifact structure definitions with the owner | Artifact owner |

---

## Troubleshooting Quick Reference

| Symptom | Likely cause | Action |
|---|---|---|
| Generic theme instead of the corporate template | Entry point or model does not honour OAL | Check the matrix; steer to a verified path |
| Templates not visible at all | Propagation window, licence, client version, or root-site permission | Wait 24h; verify licence and Microsoft 365 Apps version |
| Templates visible on desktop, not on the web | Web has different licence and app coverage | Confirm E3/E5; note Word and Excel on the web are not supported |
| Content in the wrong place on slides | Placeholders not defined in the master | Template hygiene, Step 2 |
| Fonts substituted | Fonts not embedded or organization fonts not configured | Template hygiene |
| Logo distorted or altered | The model generated it instead of referencing it | Reference the approved asset from the image library; never generate a logo |
| Text cropped in generated images | Generated imagery limitation | Use template placeholders for customer-facing material |
| Document not produced at all | Generation failure for that format or length | Test the artifact type explicitly; reduce length; try a different format |
| Invented figures or names | No required-phrase rule, or upstream truncation | Add the rule; bound the upstream payload |
| Existing content overwritten | In-place edit without a review gate | Switch to new-file-by-default; train on version history |
| Generation blocked by content moderation | Brand assets or sensitive topic triggered a filter | Have a documented fallback path |

---

## Exit Criteria

- [ ] Template files and reference artifacts collected
- [ ] Template hygiene checklist completed and signed by the brand team
- [ ] Organization Asset Library configured and verified via PowerShell
- [ ] Availability verified as a normal user, desktop and web
- [ ] Artifact structure definitions written and under source control
- [ ] Required-phrase fidelity rule in place
- [ ] Entry-point × model test matrix completed and published
- [ ] Fidelity tests passed, including the sparse-data case
- [ ] Safety configuration verified; compliance position recorded
- [ ] Brand team and artifact owner have both signed off on real output
- [ ] Launch note published with the verified path and known differences
- [ ] Re-test triggers agreed (template change, model change, platform change)
