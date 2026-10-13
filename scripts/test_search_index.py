"""Small regression checks for the generated search index."""

from __future__ import annotations

import json
from collections import Counter
from pathlib import Path
import subprocess
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
    js = (SITE / "assets" / "data.js").read_text(encoding="utf-8")
    script = (
        js
        + "\nconsole.log(JSON.stringify({scenarios: SCENARIOS, patterns: PATTERNS, references: REFERENCES}));"
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
        scenarios, patterns, references = read_catalogue()
        index = build_index()
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
