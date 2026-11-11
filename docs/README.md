# AI Agent Runbooks — website

A new front door for [`microsoft/ai-agent-runbooks`](https://github.com/microsoft/ai-agent-runbooks).
Static, dependency-free and built to be the browsable catalogue for every runbook, pattern and
reference in the repository.

## What's here

```
docs/
├── index.html          → Landing page: hero, overview pillars, featured scenarios & patterns, contribute CTA
├── overview.html       → Overview: what the repo is, runbook anatomy, platforms, coverage, repository map
├── scenarios.html      → Full scenario catalogue with live search + platform filters
├── patterns.html       → Full pattern catalogue with live search + theme filters
├── references.html     → Reference library, repository map, scenario anatomy
├── contribute.html     → Contribution shapes, file standards, naming rules, CLA, step-by-step fork and pull request guide
├── .nojekyll           → Tells GitHub Pages to serve the files as-is
└── assets/
    ├── data.js         → Generated scenario/pattern catalogue and reference metadata
    ├── styles.css      → Design system (Microsoft 365 Copilot visual language)
    └── app.js          → Theme, navigation, search/filter engine, card rendering
```

No framework or npm install is required. Open `docs/index.html` in a browser and it works.
Global search uses the prebuilt `docs/assets/search-index.js`, loaded when search opens.

## Design

Visual language follows the Microsoft 365 Copilot deck styling: a soft light gradient mesh
background, Segoe UI type, the Copilot spectrum (violet → blue → teal → green → amber) used as a
narrow accent rather than a wash, white rounded cards with subtle elevation, and generous
whitespace. A dark theme is included and follows the OS preference unless the visitor overrides it
with the header toggle (persisted in `localStorage`).

Accessibility: semantic landmarks, `aria-pressed` on filter chips, `aria-live` result counts,
keyboard-operable controls, visible focus states, and `prefers-reduced-motion` support.

## Adding content

`scripts/build-search-index.js` generates `docs/assets/data.js` from every scenario and pattern
folder in the same repository commit. Do not edit the generated file.

Add the scenario's `1.Overview.md` or the pattern's `[FolderName].md`, and update the corresponding
README catalogue table. Those tables supply descriptions, scenario types, technologies and
documentation availability. Common platform names are normalized for consistent filters.
Even before a README row is added, a new folder is included using its overview heading, introductory
paragraph and available metadata; absence of a status is shown as **Documentation Available**,
not as an assertion that the agent has been deployed.

`scripts/catalogue-config.json` holds optional display titles, icons and pattern themes, plus the
reference library and runbook anatomy. Existing display order is preserved; new folders without a
display override are appended alphabetically. Adding a display override is optional, not a
prerequisite for appearing on the website.

Missing source documents, ambiguous pattern entry points and README rows pointing to missing
folders stop the build rather than publishing incomplete or broken cards. Remove a deleted
folder's README row too; unused display overrides do not create phantom cards.

Filter chips, search entries, result counts and homepage statistics regenerate together.
Cards open the public source folders or documents; global search also includes nested Markdown,
including the individual Microsoft 365 agent-template overviews.

## Site-wide search

The search button before the theme toggle opens a keyboard-accessible dialog. Search titles
and full text, or narrow results to Site, Scenarios, Patterns or References. Escape closes
the dialog and restores focus to the button; Enter keeps the results visible.

The index includes the six site pages, the current catalogue metadata, and Markdown from
this public repository's `00-overview`, `01-scenarios`, `02-patterns` and `03-references`
folders. No private dev content or runtime GitHub API requests are used.

From the repository root, rebuild and validate with:

```powershell
node scripts\build-search-index.js
python scripts\test_search_index.py
python scripts\test_persona_scenarios.py
```

The Pages workflow rebuilds both the catalogue and index from the same commit it deploys. Changes to any of
those source folders, `docs/`, or `scripts/` trigger deployment. New source documents are
searchable automatically and appear in the catalogue without manually editing `data.js`.

The persona checks validate the twelve scenario structures, original archive inventories/hashes,
declared skill/reference coverage, preserved acceptance-test IDs, package-variant warnings and
local documentation links. They do not execute skills or replace live-tenant acceptance.
The Pages workflow runs both regression suites before uploading the site.

## Deploying to GitHub Pages

1. Copy the `docs/` folder into the root of the `ai-agent-runbooks` repository.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*.
4. Choose branch `main` and folder `/docs`, then **Save**.

The site publishes at `https://microsoft.github.io/ai-agent-runbooks/`.

If the organisation prefers GitHub Actions over branch deployment, the workflow in
`.github/workflows/pages.yml` (included in this bundle) does the same thing — copy it to
`.github/workflows/` and set **Source** to *GitHub Actions*.

## Local preview

```powershell
cd docs
python -m http.server 8899
# then open http://localhost:8899
```

## Notes

- Every GitHub link the site generates was verified to return HTTP 200 against `main`.
- The catalogue links out to the repository rather than duplicating content, so the runbooks stay
  the single source of truth and the site never goes stale on content edits.
- If you later want the runbook markdown rendered on the site itself, the same `data.js` model can
  drive a per-item detail page — the card renderers in `app.js` are the only thing that would change.
