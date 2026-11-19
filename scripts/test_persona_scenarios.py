"""Regression checks for the persona scenario documentation and supplied archives."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path, PurePosixPath
import re
import unittest
from urllib.parse import unquote, urlsplit
import zipfile


ROOT = Path(__file__).resolve().parent.parent
PATTERN = "Persona-Skill-Routing-and-Scope-Isolation"
PERSONAS = {
    "Decision-Maker": (6, "DM", 15),
    "Force-Multiplier": (6, "FM", 14),
    "Quota-Carrier": (7, "QC", 17),
    "Number-Owner": (4, "NO", 17),
    "Campaign-Operator": (6, "CO", 16),
    "Launch-Lead": (5, "LL", 15),
    "Close-Owner": (7, "CLO", 17),
    "Procurement-Operator": (6, "PRO", 16),
    "Contract-Counsel": (6, "CC", 16),
    "Portfolio-Counsel": (6, "PC", 16),
    "Case-Specialist": (6, "CS", 15),
    "Service-Ops-Leader": (6, "SOL", 16),
}
WRAPPED = {"Decision-Maker", "Force-Multiplier", "Quota-Carrier", "Number-Owner"}
DOCUMENTS = (
    "1.Overview.md", "2.Architecture.md", "3.Runbook.md",
    "4.Sample-prompts.md", "0.Resources/README.md",
)
SHARED_DOCUMENTS = (
    "README.md",
    "01-scenarios/README.md",
    "02-patterns/README.md",
    "03-references/Agent-Delivery-Reference-Library.md",
    "02-patterns/Cowork-Enablement/Cowork-Enablement.md",
    "02-patterns/Cowork-Skill-Delivery-and-Scheduled-Reviews/Cowork-Skill-Delivery-and-Scheduled-Reviews.md",
    "02-patterns/Cowork-Skill-Delivery-and-Scheduled-Reviews/Cowork-Skill-Delivery-and-Scheduled-Reviews-Runbook.md",
    "02-patterns/Cowork-Spending-Policies-and-Cost-Governance/Cowork-Spending-Policies-and-Cost-Governance.md",
    "02-patterns/Governed-Analytics-Review/Governed-Analytics-Review.md",
    "02-patterns/Pilot-to-Scale-Validation-Gates/Pilot-to-Scale-Validation-Gates.md",
)


def scenario(persona: str) -> Path:
    return ROOT / "01-scenarios" / f"{persona}-Cowork-Agent"


def prose(text: str) -> str:
    return re.sub(r"(?ms)^```.*?^```\s*$", "", text)


def heading_ids(text: str) -> set[str]:
    result = set()
    duplicates: dict[str, int] = {}
    for heading in re.findall(r"(?m)^#{1,6}\s+(.+)$", prose(text)):
        base = re.sub(r"[^\w -]", "", heading.lower()).replace(" ", "-")
        count = duplicates.get(base, 0)
        duplicates[base] = count + 1
        result.add(f"{base}-{count}" if count else base)
    return result


class PersonaScenarioTests(unittest.TestCase):
    def test_readme_uses_standard_tree_and_catalogue_entries(self) -> None:
        readme = (ROOT / "01-scenarios/README.md").read_text(encoding="utf-8")
        tree_match = re.search(r"```\n(.*?)\n```", readme, re.DOTALL)
        self.assertIsNotNone(tree_match)
        blocks = re.split(r"(?m)(?=^├── )", tree_match.group(1))
        rows = [line for line in readme.splitlines() if line.startswith("| [")]
        reference_rows = [
            row for row in rows
            if re.search(r"\]\(\./Chief-of-Staff-Cowork-Agent/\)", row)
        ]
        self.assertEqual(len(reference_rows), 1)
        reference_status = reference_rows[0].strip("|").split("|")[-1].strip()
        expected_children = [
            "│   ├── 📂 0.Resources/",
            "│   ├── 1.Overview.md",
            "│   ├── 2.Architecture.md",
            "│   ├── 3.Runbook.md",
            "│   └── 4.Sample-prompts.md",
        ]
        for persona in PERSONAS:
            with self.subTest(persona=persona):
                folder = f"{persona}-Cowork-Agent"
                entries = [
                    block.strip().splitlines() for block in blocks
                    if re.match(rf"├── 📂 {re.escape(folder)}/\s+← ", block)
                ]
                self.assertEqual(len(entries), 1)
                self.assertTrue(entries[0][0].endswith(reference_status))
                self.assertEqual(entries[0][1:], expected_children)
                matches = [
                    row for row in rows
                    if re.search(rf"\]\(\./{re.escape(folder)}/\)", row)
                ]
                self.assertEqual(len(matches), 1)
                cells = [cell.strip() for cell in matches[0].strip("|").split("|")]
                self.assertEqual(len(cells), 5)
                self.assertTrue(all(cells))
                self.assertEqual(cells[-1], reference_status)
                for child in ("0.Resources", *DOCUMENTS[:4]):
                    self.assertTrue((scenario(persona) / child).exists(), child)
        self.assertIn("### Guidelines for New Scenarios", readme)
        self.assertIn("Status refers to repository content, not deployment", readme)
        self.assertIn("Neither\nlabel implies tenant deployment or completed acceptance", readme)

    def test_standard_structure_and_honest_status(self) -> None:
        for persona in PERSONAS:
            with self.subTest(persona=persona):
                directory = scenario(persona)
                for name in DOCUMENTS:
                    self.assertTrue((directory / name).is_file(), name)
                overview = (directory / "1.Overview.md").read_text(encoding="utf-8")
                self.assertIn("**Scenario Type:**", overview)
                self.assertIn("**Primary Tools:**", overview)
                self.assertIn("not tenant-validated", overview)
                self.assertIn("## Patterns Used", overview)
                self.assertIn(f"/{PATTERN}/{PATTERN}.md", overview)
                architecture = (directory / "2.Architecture.md").read_text(encoding="utf-8")
                self.assertIn("```mermaid\nflowchart", architecture)
                self.assertIn("not separately hosted services", architecture)
                self.assertEqual(architecture.count("```") % 2, 0)

    def test_archives_match_resource_inventory(self) -> None:
        for persona, (count, _, _) in PERSONAS.items():
            with self.subTest(persona=persona):
                directory = scenario(persona)
                resources = directory / "0.Resources"
                filename = f"{persona.lower()}-cowork-plugin.zip"
                self.assertEqual([path.name for path in resources.glob("*.zip")], [filename])
                guide = (resources / "README.md").read_text(encoding="utf-8")
                archive_path = resources / filename
                self.assertIn(hashlib.sha256(archive_path.read_bytes()).hexdigest(), guide)
                self.assertIn("have not been validated", guide)
                self.assertIn("verified: false", guide)
                self.assertIn("No separate skills-only ZIP", guide)
                with zipfile.ZipFile(archive_path) as archive:
                    self.assertIsNone(archive.testzip())
                    names = [name for name in archive.namelist() if not name.endswith("/")]
                    self.assertEqual(len(names), len(set(names)))
                    for name in names:
                        self.assertFalse(PurePosixPath(name).is_absolute())
                        self.assertNotIn("..", PurePosixPath(name).parts)
                    manifests = [name for name in names if PurePosixPath(name).name == "manifest.json"]
                    self.assertEqual(len(manifests), 1)
                    prefix = manifests[0].removesuffix("manifest.json")
                    self.assertEqual(bool(prefix), persona in WRAPPED)
                    if prefix:
                        self.assertIn("not at the ZIP root", guide)
                    manifest = json.loads(archive.read(manifests[0]).decode("utf-8-sig"))
                    self.assertIn(f"`{manifest['version']}`", guide)
                    self.assertIn(f"`{manifest['manifestVersion']}`", guide)
                    self.assertIn(f"{len(names)} files", guide)
                    self.assertEqual(len(manifest["agentSkills"]), count)
                    declared_paths = {prefix + entry["folder"] + "/SKILL.md" for entry in manifest["agentSkills"]}
                    actual_paths = {name for name in names if name.endswith("/SKILL.md")}
                    self.assertEqual(declared_paths, actual_paths)
                    for name in sorted(actual_paths):
                        skill = archive.read(name).decode("utf-8-sig")
                        declared = re.search(r"(?m)^name:\s*(\S+)", skill)
                        self.assertIsNotNone(declared)
                        skill_name = declared.group(1).strip("'\"")
                        self.assertEqual(skill_name, PurePosixPath(name).parent.name)
                        self.assertIn(str(PurePosixPath(name).parent / "reference.md"), names)
                        self.assertIn(f"`{skill_name}`", guide)
                        version = re.search(r"(?m)^  version:\s*(\S+)", skill)
                        self.assertIsNotNone(version)
                        self.assertIn(f"`{version.group(1).strip(chr(34) + chr(39))}`", guide)
                        prompts = (directory / "4.Sample-prompts.md").read_text(encoding="utf-8")
                        self.assertRegex(prompts, rf"(?m)^## \d+\. `{re.escape(skill_name)}`$")
                        self.assertIn("**Expected:**", prompts.split(f"`{skill_name}`", 1)[1])

    def test_original_functional_test_identifiers_are_retained(self) -> None:
        for persona, (_, prefix, count) in PERSONAS.items():
            with self.subTest(persona=persona):
                runbook = (scenario(persona) / "3.Runbook.md").read_text(encoding="utf-8")
                for number in range(1, count + 1):
                    self.assertIn(f"{prefix}-{number:03}", runbook)
                self.assertIn("## 5. Evaluation and Business Acceptance", runbook)
                self.assertIn("### Run-state and rollback record", runbook)
                self.assertIn("Repository minimum release gates", runbook)

    def test_public_docs_do_not_depend_on_internal_sources(self) -> None:
        forbidden = (
            r"(?i)C:\\Users\\", r"(?i)C:/Users/", r"Factory team",
            r"personas\.json", r"\bslides? \d+",
            r"completed or waiver recorded", r"passed or has an approved waiver",
            r"(?i)outputs inherit the highest applicable",
        )
        for persona in PERSONAS:
            for name in DOCUMENTS:
                path = scenario(persona) / name
                with self.subTest(path=path.relative_to(ROOT)):
                    text = path.read_text(encoding="utf-8")
                    self.assertTrue(text.isascii())
                    for pattern in forbidden:
                        self.assertNotRegex(text, pattern)
                    self.assertNotRegex(text, r"(?m)^> >")
                    self.assertEqual(text.count("```") % 2, 0)

    def test_local_links_and_anchors_resolve(self) -> None:
        files = [scenario(persona) / name for persona in PERSONAS for name in DOCUMENTS]
        files += list((ROOT / "02-patterns" / PATTERN).glob("*.md"))
        shared_paths = {ROOT / name for name in SHARED_DOCUMENTS}
        files += sorted(shared_paths)
        introduced_targets = [f"{persona}-Cowork-Agent" for persona in PERSONAS]
        introduced_targets += [PATTERN, "#persona-based-cowork-scenarios"]
        for path in files:
            text = prose(path.read_text(encoding="utf-8"))
            for link in re.findall(r"!?\[[^\]]*\]\(([^)\n]+)\)", text):
                if path in shared_paths and not any(marker in link for marker in introduced_targets):
                    continue
                with self.subTest(path=path.relative_to(ROOT), link=link):
                    target = urlsplit(link.strip("<>"))
                    if target.scheme or target.netloc:
                        continue
                    linked = (path.parent / unquote(target.path)).resolve() if target.path else path
                    self.assertTrue(linked.exists(), f"{path}: {link}")
                    if target.fragment and linked.suffix.lower() == ".md":
                        self.assertIn(
                            unquote(target.fragment),
                            heading_ids(linked.read_text(encoding="utf-8")),
                            f"{path}: {link}",
                        )

    def test_shared_pattern_has_overview_runbook_and_all_personas(self) -> None:
        directory = ROOT / "02-patterns" / PATTERN
        overview = (directory / f"{PATTERN}.md").read_text(encoding="utf-8")
        runbook = (directory / f"{PATTERN}-Runbook.md").read_text(encoding="utf-8")
        for persona in PERSONAS:
            self.assertIn(f"/{persona}-Cowork-Agent/1.Overview.md", overview)
        for number in range(1, 11):
            self.assertIn(f"PSI-{number:02}", runbook)
        self.assertIn("```mermaid", overview)
        for filename in ("README.md", "01-scenarios/README.md", "02-patterns/README.md"):
            self.assertIn(PATTERN, (ROOT / filename).read_text(encoding="utf-8"))

    def test_variant_and_scope_warnings_remain_explicit(self) -> None:
        for persona in ("Campaign-Operator", "Launch-Lead"):
            guide = (scenario(persona) / "0.Resources/README.md").read_text(encoding="utf-8")
            self.assertIn("expanded plugin directory also differs", guide)
            self.assertIn("not interchangeable", guide)
        for persona in ("Decision-Maker", "Force-Multiplier"):
            guide = (scenario(persona) / "0.Resources/README.md").read_text(encoding="utf-8")
            self.assertIn("not uniform", guide)
        for persona in ("Quota-Carrier", "Number-Owner"):
            guide = (scenario(persona) / "0.Resources/README.md").read_text(encoding="utf-8")
            self.assertIn("at-risk-commit-deals", guide)
            self.assertIn("expansion-and-upsell", guide)
            self.assertIn("different versions", guide)
            self.assertIn("scope", guide)


if __name__ == "__main__":
    unittest.main(verbosity=2)
