/* =============================================================
   AI Agent Runbooks — behaviour
   Theme, navigation, catalogue filters, and site-wide search.
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

const SEARCH_SCOPES = [
  { value: "all", label: "All" },
  { value: "site", label: "Site" },
  { value: "scenarios", label: "Scenarios" },
  { value: "patterns", label: "Patterns" },
  { value: "references", label: "References" }
];

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

function searchScopeLabel(scope) {
  return scope === "site" ? "Site page"
    : scope === "scenarios" ? "Scenario"
      : scope === "patterns" ? "Pattern"
        : "Reference";
}

function normalizeSearchText(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function snippetFromText(text, query) {
  const value = String(text || "").replace(/\s+/g, " ").trim();
  if (!value) return "";
  if (!query) return value.slice(0, 200) + (value.length > 200 ? "…" : "");

  const phrase = normalizeSearchText(query);
  const tokens = phrase.split(" ").filter(Boolean);
  const haystack = value.toLowerCase();
  let index = haystack.indexOf(phrase);
  if (index === -1) {
    tokens.some(function (token) {
      index = haystack.indexOf(token);
      return index !== -1;
    });
  }
  if (index === -1) index = 0;

  const start = Math.max(0, index - 80);
  const end = Math.min(value.length, index + 160);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < value.length ? "…" : "";
  return prefix + value.slice(start, end).trim() + suffix;
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
  const facet = opts.facet;
  const searchText = opts.searchText;

  const input = document.getElementById(opts.searchId);
  const chipBox = document.getElementById(opts.filterId);
  const counter = document.getElementById(opts.countId);

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
      return '<button class="chip" type="button" data-value="' + esc(f) + '" aria-pressed="false">' + esc(f) + ' <span aria-hidden="true">·</span> ' + counts[f] + "</button>";
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

/* ---------- site-wide search ---------- */
function initGlobalSearch() {
  const triggers = Array.prototype.slice.call(document.querySelectorAll("[data-global-search]"));
  if (!triggers.length) return;

  const state = {
    scope: "all",
    query: "",
    index: null,
    loading: null,
    lastTrigger: null
  };

  document.body.insertAdjacentHTML("beforeend",
    '<dialog class="search-dialog" id="site-search-dialog" aria-labelledby="site-search-title">' +
      '<div class="search-dialog-panel">' +
        '<div class="search-dialog-head">' +
          '<div>' +
            '<p class="search-dialog-kicker">Global search</p>' +
            '<h2 id="site-search-title">Search the site and public runbook source</h2>' +
          "</div>" +
          '<button class="icon-btn search-dialog-close" type="button" aria-label="Close search dialog">×</button>' +
        "</div>" +
        '<form class="search-shell search-dialog-form" method="dialog" novalidate>' +
          '<label class="search-dialog-label" for="site-search-input">Search query</label>' +
          '<div class="search search-dialog-search">' +
            '<span data-search-icon aria-hidden="true"></span>' +
            '<input id="site-search-input" type="search" autocomplete="off" spellcheck="false" placeholder="Try “contract review”, “RAG”, or “limitations”">' +
          "</div>" +
        "</form>" +
        '<fieldset class="search-scope" aria-label="Search scope">' +
          SEARCH_SCOPES.map(function (scope) {
            return '<label class="scope-chip"><input type="radio" name="site-search-scope" value="' + scope.value + '"' + (scope.value === "all" ? " checked" : "") + '><span>' + scope.label + "</span></label>";
          }).join("") +
        "</fieldset>" +
        '<div class="search-meta">' +
          '<p class="result-count" id="site-search-status" role="status" aria-live="polite">Loading the search index…</p>' +
          '<button class="btn btn-ghost search-retry" type="button" hidden>Retry</button>' +
        "</div>" +
        '<div class="search-results" id="site-search-results" tabindex="-1"></div>' +
      "</div>" +
    "</dialog>");

  const dialog = document.getElementById("site-search-dialog");
  const input = document.getElementById("site-search-input");
  const results = document.getElementById("site-search-results");
  const status = document.getElementById("site-search-status");
  const retry = dialog.querySelector(".search-retry");
  const closeBtn = dialog.querySelector(".search-dialog-close");
  dialog.querySelector(".search-dialog-form").addEventListener("submit", function (e) {
    e.preventDefault();
    renderResults();
  });

  function resetIndex() {
    state.index = null;
    state.loading = null;
    delete window.ARB_SEARCH_INDEX;
    document.querySelectorAll("script[data-search-index-script]").forEach(function (script) { script.remove(); });
  }

  function setStatus(message, mode) {
    status.textContent = message;
    status.dataset.mode = mode || "";
  }

  function loadIndex() {
    if (Array.isArray(window.ARB_SEARCH_INDEX)) {
      state.index = window.ARB_SEARCH_INDEX;
      return Promise.resolve(state.index);
    }
    if (state.loading) return state.loading;

    state.loading = new Promise(function (resolve, reject) {
      const script = document.createElement("script");
      script.src = "assets/search-index.js";
      script.async = true;
      script.dataset.searchIndexScript = "true";
      script.onload = function () {
        if (Array.isArray(window.ARB_SEARCH_INDEX)) {
          state.index = window.ARB_SEARCH_INDEX;
          resolve(state.index);
          return;
        }
        reject(new Error("Search index loaded but did not expose window.ARB_SEARCH_INDEX."));
      };
      script.onerror = function () {
        reject(new Error("Search index failed to load."));
      };
      document.head.appendChild(script);
    }).catch(function (error) {
      resetIndex();
      throw error;
    });

    return state.loading;
  }

  function rankResults(items, query, scope) {
    const phrase = normalizeSearchText(query);
    const tokens = phrase.split(" ").filter(Boolean);
    if (!tokens.length) return [];

    return items.map(function (item) {
      if (scope !== "all" && item.category !== scope) return null;
      const title = normalizeSearchText(item.title);
      const text = normalizeSearchText(item.text);
      const combined = title + " " + text;
      if (!tokens.every(function (token) { return combined.indexOf(token) !== -1; })) return null;

      let score = 0;
      if (title.indexOf(phrase) !== -1) score += 200;
      if (text.indexOf(phrase) !== -1) score += 90;
      tokens.forEach(function (token) {
        if (title.indexOf(token) !== -1) score += 40;
        if (text.indexOf(token) !== -1) score += 10;
      });
      if (scope === "all" && item.category === "site") score += 5;

      return { item: item, score: score };
    }).filter(Boolean).sort(function (a, b) {
      return b.score - a.score || a.item.title.localeCompare(b.item.title);
    }).slice(0, 40).map(function (entry) { return entry.item; });
  }

  function renderResults() {
    if (!Array.isArray(state.index)) return;
    const query = state.query.trim();
    if (!query) {
      results.innerHTML = '<div class="empty"><p><strong>Start typing to search.</strong></p><p>Search titles first, then full text across the site and the public runbook source.</p></div>';
      setStatus("Ready. Search titles and full text across site pages and public runbooks.", "ready");
      retry.hidden = true;
      return;
    }

    const matches = rankResults(state.index, query, state.scope);
    if (!matches.length) {
      results.innerHTML = '<div class="empty"><p><strong>No matches.</strong></p><p>Try a different phrase, or widen the scope.</p></div>';
      setStatus('No matches for "' + query + '".', "empty");
      retry.hidden = true;
      return;
    }

    results.innerHTML = matches.map(function (item) {
      return (
        '<a class="search-result" href="' + esc(item.url) + '"' + (item.url.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : "") + ">" +
          '<div class="search-result-head">' +
            '<strong>' + esc(item.title) + "</strong>" +
            '<span class="tag">' + esc(searchScopeLabel(item.category)) + "</span>" +
          "</div>" +
          '<p>' + esc(snippetFromText(item.text, query)) + "</p>" +
          '<span class="search-result-url">' + esc(item.url) + "</span>" +
        "</a>"
      );
    }).join("");
    setStatus("Showing " + matches.length + " result" + (matches.length === 1 ? "" : "s") + " in " + SEARCH_SCOPES.filter(function (scope) { return scope.value === state.scope; })[0].label + ".", "ready");
    retry.hidden = true;
  }

  function showLoadError(error) {
    results.innerHTML = '<div class="empty"><p><strong>Search is unavailable right now.</strong></p><p>' + esc(error.message || "The search index could not be loaded.") + "</p></div>";
    setStatus("Search index failed to load.", "error");
    retry.hidden = false;
  }

  function openDialog(trigger) {
    state.lastTrigger = trigger;
    if (!dialog.open) dialog.showModal();
    setStatus("Loading the search index…", "loading");
    results.innerHTML = '<div class="empty"><p><strong>Loading search index…</strong></p><p>This only happens when you open search.</p></div>';
    retry.hidden = true;
    loadIndex().then(function () {
      renderResults();
      if (dialog.open) {
        input.focus();
        input.select();
      }
    }).catch(showLoadError);
  }

  closeBtn.addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", function () {
    if (state.lastTrigger && typeof state.lastTrigger.focus === "function") state.lastTrigger.focus();
  });
  input.addEventListener("input", function () {
    state.query = input.value;
    renderResults();
  });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      e.preventDefault();
      dialog.close();
    }
  });
  dialog.querySelectorAll('input[name="site-search-scope"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
      state.scope = radio.value;
      renderResults();
    });
  });
  retry.addEventListener("click", function () {
    if (retry.hidden) return;
    setStatus("Retrying search index load…", "loading");
    results.innerHTML = '<div class="empty"><p><strong>Retrying…</strong></p></div>';
    retry.hidden = true;
    resetIndex();
    loadIndex().then(renderResults).catch(showLoadError);
  });
  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      openDialog(trigger);
    });
  });
}

/* ---------- chrome ---------- */
document.addEventListener("DOMContentLoaded", function () {
  applyTheme(document.documentElement.getAttribute("data-theme") || "light");
  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  });

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.innerHTML = ICONS.menu;
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a.navlink").forEach(function (a) {
    if (a.getAttribute("href") === here) a.classList.add("active");
  });

  document.querySelectorAll("[data-search-icon]").forEach(function (el) { el.innerHTML = ICONS.search; });
  document.querySelectorAll("[data-github-icon]").forEach(function (el) { el.innerHTML = ICONS.github; });

  initGlobalSearch();

  const sc = document.getElementById("stat-scenarios");
  if (sc) sc.textContent = SCENARIOS.length;
  const pc = document.getElementById("stat-patterns");
  if (pc) pc.textContent = PATTERNS.length;
});
