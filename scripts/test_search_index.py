"""Small regression checks for the generated search index."""

from __future__ import annotations

import json
from collections import Counter
from pathlib import Path
import re
import subprocess
import tempfile
import unittest


PROJECT = Path(__file__).resolve().parent.parent
SOURCE = PROJECT
SITE = PROJECT / "docs"
OUTPUT = SITE / "assets" / "search-index.js"
PREFIX = "window.ARB_SEARCH_INDEX = "


def build_index() -> list[dict[str, str]]:
    subprocess.run(
        ["node", str(PROJECT / "scripts" / "build-search-index.js")],
        cwd=PROJECT,
        check=True,
        capture_output=True,
        text=True,
    )
    text = OUTPUT.read_text(encoding="utf-8")
    if not text.startswith(PREFIX):
        raise AssertionError("search-index.js must assign window.ARB_SEARCH_INDEX directly")
    return json.loads(text[len(PREFIX):].rstrip().removesuffix(";"))


def read_catalogue() -> tuple[list[dict[str, object]], list[dict[str, object]], list[dict[str, object]]]:
    script = (
        "const { readCatalogue } = require('./scripts/build-search-index.js');"
        "console.log(JSON.stringify(readCatalogue('./docs')));"
    )
    result = subprocess.run(
        ["node", "-e", script],
        cwd=PROJECT,
        check=True,
        capture_output=True,
    )
    data = json.loads(result.stdout.decode("utf-8"))
    return data["scenarios"], data["patterns"], data["references"]


class SearchIndexTests(unittest.TestCase):
    def test_catalogue_covers_every_source_folder(self) -> None:
        build_index()
        scenarios, patterns, _ = read_catalogue()
        for folder, items in (("01-scenarios", scenarios), ("02-patterns", patterns)):
            expected = {entry.name for entry in (SOURCE / folder).iterdir() if entry.is_dir()}
            ids = [item["id"] for item in items]
            self.assertEqual(set(ids), expected)
            self.assertEqual(len(ids), len(set(ids)))
            for item in items:
                self.assertTrue(item["title"])
                self.assertTrue(item["desc"])
                self.assertTrue(item["status"])
                self.assertIsInstance(item["tech"], list)

        for item in patterns:
            self.assertTrue((SOURCE / "02-patterns" / item["file"]).is_file())

        home = (SITE / "index.html").read_text(encoding="utf-8")
        for name, items in (("scenarios", scenarios), ("patterns", patterns)):
            count = re.search(rf'id="stat-{name}">(\d+)</div>', home)
            self.assertIsNotNone(count)
            self.assertEqual(int(count.group(1)), len(items))

    def test_recent_additions_have_cards_and_search_entries(self) -> None:
        index = build_index()
        scenarios, patterns, _ = read_catalogue()
        for category, items, ids in (
            ("scenarios", scenarios, (
                "Compliance-Self-Inspection-Agent",
                "Contract-Review-GitHub-Copilot-Harness-Agent",
                "Agentic-Business-Process-Automation-Agent",
                "Decision-Maker-Cowork-Agent",
                "Force-Multiplier-Cowork-Agent",
                "Quota-Carrier-Cowork-Agent",
                "Number-Owner-Cowork-Agent",
                "Campaign-Operator-Cowork-Agent",
                "Launch-Lead-Cowork-Agent",
                "Close-Owner-Cowork-Agent",
                "Procurement-Operator-Cowork-Agent",
                "Contract-Counsel-Cowork-Agent",
                "Portfolio-Counsel-Cowork-Agent",
                "Case-Specialist-Cowork-Agent",
                "Service-Ops-Leader-Cowork-Agent",
            )),
            ("patterns", patterns, (
                "GitHub-Copilot-Harness-Execution",
                "Cowork-Enablement",
                "Cowork-Spending-Policies-and-Cost-Governance",
                "Pilot-to-Scale-Validation-Gates",
                "Persona-Skill-Routing-and-Scope-Isolation",
            )),
        ):
            cards = {item["id"]: item for item in items}
            for item_id in ids:
                self.assertIn(item_id, cards)
                self.assertTrue(any(
                    entry["category"] == category and entry["title"] == cards[item_id]["title"]
                    for entry in index
                ))
                self.assertTrue(any(
                    f"/{item_id}/" in entry["url"] and entry["url"].endswith(".md")
                    for entry in index
                ))

    def test_cowork_enablement_is_only_a_pattern(self) -> None:
        index = build_index()
        scenarios, patterns, _ = read_catalogue()
        self.assertNotIn("Cowork-Enablement-Pilot", {item["id"] for item in scenarios})
        self.assertNotIn("Cowork-Enablement", {item["id"] for item in scenarios})
        self.assertFalse((SOURCE / "01-scenarios" / "Cowork-Enablement-Pilot").exists())
        self.assertFalse(any("Cowork-Enablement-Pilot" in entry["url"] for entry in index))
        cards = {item["id"]: item for item in patterns}
        self.assertEqual(cards["Cowork-Enablement"]["theme"], "Delivery & Deployment")
        self.assertEqual(
            cards["Cowork-Spending-Policies-and-Cost-Governance"]["theme"],
            "Governance & Operations",
        )
        self.assertEqual(cards["Pilot-to-Scale-Validation-Gates"]["theme"], "Delivery & Deployment")
        self.assertTrue(any(
            entry["category"] == "patterns"
            and "/Cowork-Enablement/Cowork-Enablement-Runbook.md" in entry["url"]
            for entry in index
        ))

    def test_build_is_repeatable(self) -> None:
        build_index()
        before = (OUTPUT.read_bytes(), (SITE / "assets" / "data.js").read_bytes())
        build_index()
        self.assertEqual(before, (OUTPUT.read_bytes(), (SITE / "assets" / "data.js").read_bytes()))

    def test_new_folders_do_not_require_manual_catalogue_entries(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for folder in ("scripts", "docs/assets", "00-overview", "01-scenarios", "02-patterns", "03-references"):
                (root / folder).mkdir(parents=True)
            config = {"scenarios": {}, "patterns": {}, "references": [], "anatomy": []}
            (root / "scripts/catalogue-config.json").write_text(json.dumps(config), encoding="utf-8")
            for folder in ("00-overview", "01-scenarios", "02-patterns", "03-references"):
                (root / folder / "README.md").write_text("# Public documentation\n", encoding="utf-8")
            for page in ("index", "overview", "scenarios", "patterns", "references", "contribute"):
                (root / "docs" / f"{page}.html").write_text(
                    '<main><h1>Public page</h1><div id="stat-scenarios">0</div>'
                    '<div id="stat-patterns">0</div></main>', encoding="utf-8",
                )
            scenario = root / "01-scenarios/Future-Agent"
            pattern = root / "02-patterns/Future-Pattern"
            scenario.mkdir()
            pattern.mkdir()
            (scenario / "1.Overview.md").write_text(
                "# Future Agent - Overview\n\n**Scenario Type:** New Business\n"
                "**Primary Tools:** Copilot Studio, Teams\n**Status:** Draft\n\n"
                "New scenario with UniqueFutureScenarioEvidence.\n", encoding="utf-8",
            )
            (pattern / "Future-Pattern.md").write_text(
                "# Future Pattern\n\nNew pattern with UniqueFuturePatternEvidence.\n", encoding="utf-8",
            )
            script = """
const assert = require('node:assert/strict');
const { buildSearchIndex, readCatalogue } = require('./scripts/build-search-index.js');
const path = require('node:path');
const root = process.argv[1];
const result = buildSearchIndex(root);
const catalogue = readCatalogue(path.join(root, 'docs'));
assert.equal(catalogue.scenarios.length, 1);
assert.equal(catalogue.patterns.length, 1);
assert.equal(catalogue.scenarios[0].title, 'Future Agent');
assert.equal(catalogue.scenarios[0].type, 'New Business');
assert.equal(catalogue.scenarios[0].status, 'Draft');
assert.deepEqual(Array.from(catalogue.scenarios[0].tech), ['Microsoft Copilot Studio', 'Microsoft Teams']);
assert.equal(catalogue.patterns[0].file, 'Future-Pattern/Future-Pattern.md');
assert.equal(catalogue.patterns[0].status, 'Documentation Available');
assert.ok(result.entries.some(item => item.text.includes('UniqueFutureScenarioEvidence')));
assert.ok(result.entries.some(item => item.text.includes('UniqueFuturePatternEvidence')));
const fs = require('node:fs');
const readme = path.join(root, '01-scenarios', 'README.md');
fs.writeFileSync(readme,
  '# Scenarios\\n\\n| [Repository Title](./Future-Agent/1.Overview.md) | Updated Business '
  + '| Updated catalogue description. | Microsoft Copilot Studios | Overview Available |\\n');
buildSearchIndex(root);
const updated = readCatalogue(path.join(root, 'docs')).scenarios[0];
assert.equal(updated.title, 'Repository Title');
assert.equal(updated.type, 'Updated Business');
assert.equal(updated.desc, 'Updated catalogue description.');
assert.equal(updated.status, 'Overview Available');
assert.equal(updated.tech[0], 'Microsoft Copilot Studio');
fs.writeFileSync(readme, '# Scenarios\\n');
fs.rmSync(path.join(root, '01-scenarios', 'Future-Agent'), {recursive: true});
buildSearchIndex(root);
assert.equal(readCatalogue(path.join(root, 'docs')).scenarios.length, 0);
fs.appendFileSync(path.join(root, '01-scenarios', 'README.md'),
  '\\n| [Missing](./Missing/) | Business | Description | Copilot Studio | Available |\\n');
assert.throws(() => buildSearchIndex(root), /missing folder/);
"""
            subprocess.run(["node", "-e", script, str(root)], cwd=PROJECT, check=True)

    def test_card_links_encode_repository_path_segments(self) -> None:
        script = """
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = vm.createContext({ document: {addEventListener() {}} });
vm.runInContext(fs.readFileSync('./docs/assets/data.js', 'utf8')
  + '\\n' + fs.readFileSync('./docs/assets/app.js', 'utf8'), context);
const card = vm.runInContext("scenarioCard({id:'Agent & #1', title:'Test', type:'Test', "
  + "icon:'', desc:'Test', tech:[], status:'Available'})", context);
assert.ok(card.includes('/Agent%20%26%20%231"'));
const pattern = vm.runInContext("patternCard({file:'Pattern #1/Guide & notes.md', "
  + "title:'Test', theme:'Test', icon:'', desc:'Test', tech:[], status:'Available'})", context);
assert.ok(pattern.includes('/Pattern%20%231/Guide%20%26%20notes.md"'));
"""
        subprocess.run(["node", "-e", script], cwd=PROJECT, check=True)

    def test_markdown_preserves_sections_and_code(self) -> None:
        script = """
const assert = require('node:assert/strict');
const { markdownText } = require('./scripts/build-search-index.js');
const text = markdownText('# Start\\n---\\n## Runbook Components\\nuseful text\\n---\\n## End\\n```js\\nUniqueCodeSymbol()\\n```');
assert.ok(text.includes('Runbook Components'));
assert.ok(text.includes('useful text'));
assert.ok(text.includes('UniqueCodeSymbol'));
assert.ok(!markdownText('---\\ntitle: hidden metadata\\n---\\nVisible content').includes('hidden metadata'));
assert.ok(markdownText('---\\ntitle: hidden metadata\\n---\\nVisible content').includes('Visible content'));
"""
        subprocess.run(["node", "-e", script], cwd=PROJECT, check=True)

    def test_generated_count_matches_public_inputs(self) -> None:
        index = build_index()
        scenarios, patterns, references = read_catalogue()
        markdown_count = sum(
            1
            for folder in ("00-overview", "01-scenarios", "02-patterns", "03-references")
            for _ in (SOURCE / folder).rglob("*.md")
        )
        expected = 6 + len(scenarios) + len(patterns) + len(references) + markdown_count
        self.assertEqual(len(index), expected)

        counts = Counter(item["category"] for item in index)
        self.assertEqual(counts["site"], 6)
        self.assertGreater(counts["scenarios"], len(scenarios))
        self.assertGreater(counts["patterns"], len(patterns))
        self.assertGreaterEqual(counts["references"], len(references) + 1)

    def test_non_site_results_use_public_urls_only(self) -> None:
        index = build_index()
        allowed_categories = {"site", "scenarios", "patterns", "references"}
        self.assertEqual({item["category"] for item in index}, allowed_categories)

        for item in index:
            self.assertTrue(item["title"])
            self.assertTrue(item["text"])
            if item["category"] == "site":
                self.assertTrue(item["url"].endswith(".html"), item["url"])
            else:
                self.assertTrue(
                    item["url"].startswith("https://github.com/microsoft/ai-agent-runbooks/"),
                    item["url"],
                )
                self.assertNotIn(".search-source", item["url"])
                self.assertNotIn("\\", item["url"])


if __name__ == "__main__":
    unittest.main(verbosity=2)
