/* =============================================================
   AI Agent Runbooks — behaviour
   Theme, navigation, and the catalogue search/filter engine.
   ============================================================= */

/* ---------- theme (runs immediately, see inline bootstrap in <head>) ---------- */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem("arb-theme", theme); } catch (e) { /* storage blocked */ }
  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    btn.innerHTML = theme === "dark" ? ICONS.sun : ICONS.moon;
  });
}

const ICONS = {
  moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
  sun: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  menu: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  github: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.3 1.19-3.1-.12-.3-.51-1.48.11-3.08 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.24 2.78.12 3.07.74.81 1.19 1.85 1.19 3.11 0 4.43-2.7 5.41-5.26 5.69.41.36.78 1.06.78 2.15v3.19c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>',
  arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
};

/* ---------- helpers ---------- */
function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function tagRow(tech, max) {
  const shown = tech.slice(0, max);
  let html = shown.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");
  if (tech.length > max) html += '<span class="tag more">+' + (tech.length - max) + "</span>";
  return html;
}

function statusPill(status) {
  const preview = status !== "Available";
  return '<span class="pill-status' + (preview ? " preview" : "") + '">' + esc(status) + "</span>";
}

/* ---------- card renderers ---------- */
function scenarioCard(s) {
  return (
    '<a class="card" href="' + TREE + "/01-scenarios/" + encodeURI(s.id) + '" target="_blank" rel="noopener">' +
    '<div class="card-icon" aria-hidden="true">' + s.icon + "</div>" +
    "<h3>" + esc(s.title) + "</h3>" +
    '<div class="type">' + esc(s.type) + "</div>" +
    "<p>" + esc(s.desc) + "</p>" +
    '<div class="foot">' + statusPill(s.status) + tagRow(s.tech, 3) + "</div>" +
    "</a>"
  );
}

function patternCard(p) {
  return (
    '<a class="card" href="' + BLOB + "/02-patterns/" + encodeURI(p.file) + '" target="_blank" rel="noopener">' +
    '<div class="card-icon" aria-hidden="true">' + p.icon + "</div>" +
    "<h3>" + esc(p.title) + "</h3>" +
    '<div class="type">' + esc(p.theme) + "</div>" +
    "<p>" + esc(p.desc) + "</p>" +
    '<div class="foot">' + statusPill(p.status) + tagRow(p.tech, 3) + "</div>" +
    "</a>"
  );
}

/* ---------- catalogue ---------- */
function initCatalogue(opts) {
  const grid = document.getElementById(opts.gridId);
  if (!grid) return;

  const items = opts.items;
  const render = opts.render;
  const facet = opts.facet;          // function(item) -> array of filter values
  const searchText = opts.searchText; // function(item) -> string

  const input = document.getElementById(opts.searchId);
  const chipBox = document.getElementById(opts.filterId);
  const counter = document.getElementById(opts.countId);

  // build facet list, most common first
  const counts = {};
  items.forEach(function (it) {
    facet(it).forEach(function (v) { counts[v] = (counts[v] || 0) + 1; });
  });
  const facets = Object.keys(counts)
    .filter(function (v) { return counts[v] > 1; })
    .sort(function (a, b) { return counts[b] - counts[a] || a.localeCompare(b); })
    .slice(0, opts.maxFacets || 10);

  let active = "";
  let query = "";

  chipBox.innerHTML =
    '<button class="chip" type="button" data-value="" aria-pressed="true">All ' + opts.label + "</button>" +
    facets.map(function (f) {
      return '<button class="chip" type="button" data-value="' + esc(f) + '" aria-pressed="false">' + esc(f) + " <span aria-hidden=\"true\">·</span> " + counts[f] + "</button>";
    }).join("");

  function draw() {
    const q = query.trim().toLowerCase();
    const matches = items.filter(function (it) {
      const okFacet = !active || facet(it).indexOf(active) !== -1;
      const okQuery = !q || searchText(it).toLowerCase().indexOf(q) !== -1;
      return okFacet && okQuery;
    });

    grid.innerHTML = matches.length
      ? matches.map(render).join("")
      : '<div class="empty"><p><strong>No matches.</strong></p><p>Try a different keyword, or clear the filters to see all ' + items.length + " " + opts.label.toLowerCase() + ".</p></div>";
    grid.style.gridTemplateColumns = matches.length ? "" : "1fr";

    counter.textContent =
      "Showing " + matches.length + " of " + items.length + " " + opts.label.toLowerCase() +
      (active ? " · " + active : "") + (q ? ' · "' + query.trim() + '"' : "");
  }

  chipBox.addEventListener("click", function (e) {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    active = btn.dataset.value;
    chipBox.querySelectorAll(".chip").forEach(function (c) {
      c.setAttribute("aria-pressed", String(c === btn));
    });
    draw();
  });

  if (input) {
    input.addEventListener("input", function () { query = input.value; draw(); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { input.value = ""; query = ""; draw(); }
    });
  }

  draw();
}

/* ---------- chrome ---------- */
document.addEventListener("DOMContentLoaded", function () {
  // theme buttons
  applyTheme(document.documentElement.getAttribute("data-theme") || "light");
  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  });

  // mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.innerHTML = ICONS.menu;
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // mark the current page in the nav
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a.navlink").forEach(function (a) {
    if (a.getAttribute("href") === here) a.classList.add("active");
  });

  // search icon injection
  document.querySelectorAll("[data-search-icon]").forEach(function (el) { el.innerHTML = ICONS.search; });
  document.querySelectorAll("[data-github-icon]").forEach(function (el) { el.innerHTML = ICONS.github; });

  // homepage stat counts stay honest with the data file
  const sc = document.getElementById("stat-scenarios");
  if (sc) sc.textContent = SCENARIOS.length;
  const pc = document.getElementById("stat-patterns");
  if (pc) pc.textContent = PATTERNS.length;
});
