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
├── contribute.html     → Contribution shapes, file standards, naming rules, CLA
├── .nojekyll           → Tells GitHub Pages to serve the files as-is
└── assets/
    ├── data.js         → ★ Single source of truth for all catalogue content
    ├── styles.css      → Design system (Microsoft 365 Copilot visual language)
    └── app.js          → Theme, navigation, search/filter engine, card rendering
```

No build step, no framework, no npm install. Open `docs/index.html` in a browser and it works.

## Design

Visual language follows the Microsoft 365 Copilot deck styling: a soft light gradient mesh
background, Segoe UI type, the Copilot spectrum (violet → blue → teal → green → amber) used as a
narrow accent rather than a wash, white rounded cards with subtle elevation, and generous
whitespace. A dark theme is included and follows the OS preference unless the visitor overrides it
with the header toggle (persisted in `localStorage`).

Accessibility: semantic landmarks, `aria-pressed` on filter chips, `aria-live` result counts,
keyboard-operable controls, visible focus states, and `prefers-reduced-motion` support.

## Adding content

Everything the site displays comes from `docs/assets/data.js` — nothing is hard-coded in the HTML.
When a new scenario or pattern lands in the repository, add one object:

```js
// SCENARIOS — id must match the folder name under 01-scenarios/
{
  id: "My-New-Agent",
  title: "My New Agent",
  type: "Business area / function",
  icon: "🤖",
  desc: "One or two sentences on what it does and what makes it non-obvious.",
  tech: ["Microsoft Copilot Studio", "Power Automate"],
  status: "Available"
}

// PATTERNS — file must match the path under 02-patterns/
{
  id: "My-New-Pattern",
  file: "My-New-Pattern/My-New-Pattern.md",
  title: "My New Pattern",
  icon: "🧩",
  theme: "Architecture & Design",   // drives the filter chips
  desc: "What decision this pattern settles.",
  tech: ["Microsoft Copilot Studio"],
  status: "Available"
}
```

Filter chips, search, result counts and the homepage statistics all regenerate automatically.
Keep `tech` values spelled consistently — the platform filters are derived from them, and only
values used by more than one item become chips.

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
