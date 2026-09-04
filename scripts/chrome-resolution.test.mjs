/**
 * LPS-1866 — descriptor-driven chrome resolution, and CSR/SSR parity.
 *
 * CSR resolves chrome through a lazy import.meta.glob; SSR through an eager
 * one. The MECHANISMS must differ, but for one descriptor both must resolve
 * the SAME module key — otherwise the client and the pre-rendered HTML
 * disagree and the header flashes then disappears (LPS-1536's whole class).
 *
 * Mirrors the pure logic from `src/lib/blogChrome.ts` (same approach as
 * blog-article-routes.test.mjs — TS modules can't be imported in plain node).
 * `test_source_still_carries_the_rules` guards against the mirror drifting.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { test } from "node:test";

const here = dirname(fileURLToPath(import.meta.url));

// ---- mirror of src/lib/blogChrome.ts ----------------------------------------

const CHROME_GLOB_PATTERNS = ["./components/**/*.tsx", "!./components/ui/**"];
const KNOWN_KINDS = new Set(["wrapper", "pair", "static_markup", "none"]);

function moduleKeyFor(module) {
  if (typeof module !== "string" || !module.startsWith("@/")) return "";
  if (module.split("/").includes("..")) return "";
  return `./${module.slice(2)}.tsx`;
}

function descriptorKind(raw) {
  if (!raw || typeof raw !== "object") return "none";
  return KNOWN_KINDS.has(raw.kind) ? raw.kind : "none";
}

function hasDescriptor(raw) {
  return !!raw && typeof raw === "object" && typeof raw.kind === "string";
}

// What a resolver must do, given a descriptor: use it, or fall back to legacy.
function resolutionMode(raw) {
  if (!hasDescriptor(raw)) return "legacy";
  const kind = descriptorKind(raw);
  return kind === "wrapper" || kind === "pair" ? kind : "no-chrome";
}

function chromeModuleKeys(raw) {
  const kind = descriptorKind(raw);
  if (kind === "wrapper") {
    const key = moduleKeyFor(raw.module);
    return key ? [key] : [];
  }
  if (kind === "pair") {
    return [moduleKeyFor(raw.header?.module), moduleKeyFor(raw.footer?.module)].filter(Boolean);
  }
  return [];
}

function pickDeclaredExport(mod, exportName, named) {
  if (!mod) return undefined;
  return named ? mod[exportName] : (mod.default ?? mod[exportName]);
}

// ---- the two resolvers, as CSR and SSR implement them -----------------------

function resolveCsr(raw, lazyGlob) {
  return chromeModuleKeys(raw).filter((k) => typeof lazyGlob[k] === "function");
}

function resolveSsr(raw, eagerGlob) {
  return chromeModuleKeys(raw).filter((k) => eagerGlob[k] !== undefined);
}

// ---- tests -----------------------------------------------------------------

const WRAPPER = {
  v: 1,
  kind: "wrapper",
  module: "@/components/sections/SiteLayout",
  export: "SiteLayout",
  named: true,
};

const PAIR = {
  v: 1,
  kind: "pair",
  header: { module: "@/components/sections/Navbar", export: "Navbar", named: false },
  footer: { module: "@/components/sections/Footer", export: "Footer", named: false },
};

test("wrapper descriptor resolves to one module key", () => {
  assert.deepEqual(chromeModuleKeys(WRAPPER), ["./components/sections/SiteLayout.tsx"]);
});

test("pair descriptor resolves header then footer, by declared path not filename", () => {
  assert.deepEqual(chromeModuleKeys(PAIR), [
    "./components/sections/Navbar.tsx",
    "./components/sections/Footer.tsx",
  ]);
});

test("CSR and SSR resolve the SAME keys for the same descriptor", () => {
  const lazy = { "./components/sections/SiteLayout.tsx": () => Promise.resolve({}) };
  const eager = { "./components/sections/SiteLayout.tsx": {} };
  assert.deepEqual(resolveCsr(WRAPPER, lazy), resolveSsr(WRAPPER, eager));
});

test("an unknown future kind resolves to nothing instead of throwing", () => {
  assert.equal(descriptorKind({ kind: "shadow_dom_chrome" }), "none");
  assert.deepEqual(chromeModuleKeys({ kind: "shadow_dom_chrome" }), []);
});

test("absent or malformed descriptor resolves to nothing", () => {
  for (const raw of [undefined, null, {}, 42, "wrapper"]) {
    assert.deepEqual(chromeModuleKeys(raw), []);
  }
});

// F1: absent and explicit-none are DIFFERENT states. Conflating them strips the
// header from every project that has not been backfilled yet.
test("an ABSENT descriptor falls back to legacy, not to no-chrome", () => {
  for (const raw of [undefined, null, {}, 42, "wrapper"]) {
    assert.equal(hasDescriptor(raw), false, `${JSON.stringify(raw)} must read as absent`);
    assert.equal(resolutionMode(raw), "legacy");
  }
});

test("an EXPLICIT kind none is respected as no-chrome", () => {
  const raw = { v: 1, kind: "none", source: "deterministic", reason: "no_landmarks" };
  assert.equal(hasDescriptor(raw), true);
  assert.equal(resolutionMode(raw), "no-chrome");
});

test("a present descriptor drives its own kind", () => {
  assert.equal(resolutionMode(WRAPPER), "wrapper");
  assert.equal(resolutionMode(PAIR), "pair");
  // static_markup is not a React render mode: articles render no chrome.
  assert.equal(resolutionMode({ v: 1, kind: "static_markup" }), "no-chrome");
});

test("a stale descriptor whose module was deleted resolves to nothing", () => {
  assert.deepEqual(resolveCsr(WRAPPER, {}), []);
  assert.deepEqual(resolveSsr(WRAPPER, {}), []);
});

test("the glob excludes shadcn ui", () => {
  assert.ok(CHROME_GLOB_PATTERNS.includes("!./components/ui/**"));
});

// --- adversarial cases beyond the brief's reference tests --------------------

test("a module string that does not start with @/ resolves to no key", () => {
  assert.equal(moduleKeyFor("components/sections/SiteLayout"), "");
  assert.equal(moduleKeyFor("./components/sections/SiteLayout"), "");
  assert.equal(moduleKeyFor(""), "");
  assert.equal(moduleKeyFor(undefined), "");
  assert.deepEqual(chromeModuleKeys({ v: 1, kind: "wrapper", module: "components/x" }), []);
});

test("a pair with one half missing yields only the present half's key", () => {
  const headerOnly = {
    v: 1,
    kind: "pair",
    header: { module: "@/components/sections/Navbar", export: "Navbar", named: false },
  };
  assert.deepEqual(chromeModuleKeys(headerOnly), ["./components/sections/Navbar.tsx"]);

  const footerOnly = {
    v: 1,
    kind: "pair",
    footer: { module: "@/components/sections/Footer", export: "Footer", named: false },
  };
  assert.deepEqual(chromeModuleKeys(footerOnly), ["./components/sections/Footer.tsx"]);

  const neither = { v: 1, kind: "pair" };
  assert.deepEqual(chromeModuleKeys(neither), []);
});

test("hasDescriptor rejects a non-string kind, including numeric and null", () => {
  assert.equal(hasDescriptor({ kind: 123 }), false);
  assert.equal(hasDescriptor({ kind: null }), false);
  assert.equal(hasDescriptor({ kind: undefined }), false);
  assert.equal(hasDescriptor({ kind: {} }), false);
  assert.equal(hasDescriptor({ kind: ["wrapper"] }), false);
  // descriptorKind still degrades to "none" for these, it just isn't "absent".
  assert.equal(descriptorKind({ kind: 123 }), "none");
  assert.equal(descriptorKind({ kind: null }), "none");
});

test("chromeModuleKeys never returns a key containing a path traversal segment", () => {
  const traversalAttempts = [
    { v: 1, kind: "wrapper", module: "@/../../etc/passwd" },
    { v: 1, kind: "wrapper", module: "@/components/../../../secrets" },
    {
      v: 1,
      kind: "pair",
      header: { module: "@/../outside", export: "X", named: false },
      footer: { module: "@/components/sections/Footer", export: "Footer", named: false },
    },
  ];
  for (const raw of traversalAttempts) {
    for (const key of chromeModuleKeys(raw)) {
      assert.ok(!key.includes(".."), `key ${key} must not contain a traversal segment`);
    }
  }
});

test("pickDeclaredExport honours named vs default per the declared style", () => {
  const namedModule = { SiteLayout: "the-named-export" };
  assert.equal(pickDeclaredExport(namedModule, "SiteLayout", true), "the-named-export");
  // named:false still falls back to the named key when there is no default export.
  assert.equal(pickDeclaredExport(namedModule, "SiteLayout", false), "the-named-export");

  const defaultModule = { default: "the-default-export" };
  assert.equal(pickDeclaredExport(defaultModule, "Footer", false), "the-default-export");

  // default-only module re-imported as named is undefined, not a throw.
  assert.equal(pickDeclaredExport(defaultModule, "Footer", true), undefined);

  const both = { default: "the-default-export", Footer: "the-named-export" };
  // named:false prefers the default when both exist, so a wrongly-declared
  // named:false against a module with both never silently picks the wrong one.
  assert.equal(pickDeclaredExport(both, "Footer", false), "the-default-export");

  assert.equal(pickDeclaredExport(undefined, "Footer", false), undefined);
});

// ---- which elements BlogArticleRoute renders, per kind ----------------------

function articleShape(mode) {
  if (mode === "wrapper") return ["Wrapper", "BlogArticle"];
  if (mode === "pair" || mode === "legacy") return ["Header", "main", "BlogArticle", "Footer"];
  return ["main", "BlogArticle"];
}

test("an absent descriptor renders the legacy header/footer shape, as today", () => {
  assert.deepEqual(articleShape(resolutionMode(null)), [
    "Header",
    "main",
    "BlogArticle",
    "Footer",
  ]);
});

test("wrapper articles render inside the wrapper and add no chrome of their own", () => {
  assert.deepEqual(articleShape("wrapper"), ["Wrapper", "BlogArticle"]);
});

test("pair articles keep today's header/main/footer shape", () => {
  assert.deepEqual(articleShape("pair"), ["Header", "main", "BlogArticle", "Footer"]);
});

test("none articles fail open to a bare article, as today", () => {
  assert.deepEqual(articleShape("none"), ["main", "BlogArticle"]);
});

// All-or-nothing gate: chromeModuleKeys can return a PARTIAL pair list when a module
// was renamed since ingest. Gate on count before any glob lookup, and keep CSR and
// SSR identical or the two disagree (flash-then-disappear).
function resolveChromeAllOrNothing(raw, availableKeys) {
  if (!hasDescriptor(raw)) return { kind: "legacy" };
  const kind = descriptorKind(raw);
  if (kind !== "wrapper" && kind !== "pair") return { kind: "none" };
  const keys = chromeModuleKeys(raw);
  if (kind === "wrapper" && keys.length !== 1) return { kind: "none" };
  if (kind === "pair" && keys.length !== 2) return { kind: "none" };
  if (!keys.every((k) => availableKeys.has(k))) return { kind: "none" };
  return { kind, keys };
}

test("a pair descriptor with only one half declared gates to none before any glob lookup", () => {
  const headerOnly = {
    v: 1,
    kind: "pair",
    header: { module: "@/components/sections/Navbar", export: "Navbar", named: false },
  };
  const everythingAvailable = new Set([
    "./components/sections/Navbar.tsx",
    "./components/sections/Footer.tsx",
  ]);
  assert.deepEqual(resolveChromeAllOrNothing(headerOnly, everythingAvailable), { kind: "none" });
});

test("a full pair descriptor where only one module survives in the glob gates to none", () => {
  const pair = {
    v: 1,
    kind: "pair",
    header: { module: "@/components/sections/Navbar", export: "Navbar", named: false },
    footer: { module: "@/components/sections/Footer", export: "Footer", named: false },
  };
  // Footer module was deleted/renamed since ingest — only Header survives.
  const onlyHeaderSurvives = new Set(["./components/sections/Navbar.tsx"]);
  assert.deepEqual(resolveChromeAllOrNothing(pair, onlyHeaderSurvives), { kind: "none" });
  // Symmetric: only Footer survives.
  const onlyFooterSurvives = new Set(["./components/sections/Footer.tsx"]);
  assert.deepEqual(resolveChromeAllOrNothing(pair, onlyFooterSurvives), { kind: "none" });
});

test("a full pair descriptor resolves only when BOTH modules survive in the glob", () => {
  const pair = {
    v: 1,
    kind: "pair",
    header: { module: "@/components/sections/Navbar", export: "Navbar", named: false },
    footer: { module: "@/components/sections/Footer", export: "Footer", named: false },
  };
  const both = new Set([
    "./components/sections/Navbar.tsx",
    "./components/sections/Footer.tsx",
  ]);
  assert.deepEqual(resolveChromeAllOrNothing(pair, both), {
    kind: "pair",
    keys: ["./components/sections/Navbar.tsx", "./components/sections/Footer.tsx"],
  });
});

test("a wrapper descriptor whose sole module is absent from the glob gates to none", () => {
  assert.deepEqual(resolveChromeAllOrNothing(WRAPPER, new Set()), { kind: "none" });
});

test("app_source_still_branches_on_kind", () => {
  const src = readFileSync(join(here, "..", "src", "App.tsx"), "utf8");
  assert.ok(src.includes("CHROME_GLOB_PATTERNS"), "App.tsx must use the shared glob patterns");
  assert.ok(src.includes("useSiteChrome"), "App.tsx must resolve chrome via useSiteChrome");
  // F1: the legacy probe must REMAIN reachable for absent-descriptor projects.
  assert.ok(src.includes("hasDescriptor"), "CSR must distinguish absent from explicit none");
  assert.ok(
    src.includes("chromeCandidatePaths"),
    "CSR must keep the legacy pair probe until the backfill completes (F1)",
  );
  // Character-identical to Task 11's entry-server.tsx glob, or CSR/SSR key
  // spaces diverge (flash-then-disappear). Both patterns must be present as
  // the literal import.meta.glob accepts (no shared-variable reference).
  assert.ok(
    src.includes('"./components/**/*.tsx"') && src.includes('"!./components/ui/**"'),
    "App.tsx's lazy glob literal must match CHROME_GLOB_PATTERNS exactly",
  );
  assert.ok(
    !src.includes("sectionChromeLoaders") && !src.includes("layoutChromeLoaders"),
    "the two narrow globs must be deleted, superseded by one broad lazy glob",
  );
  assert.ok(!src.includes("blogChromeCache"), "the old chrome component cache must be deleted");
});

test("source_still_carries_the_rules", () => {
  const src = readFileSync(join(here, "..", "src", "lib", "blogChrome.ts"), "utf8");
  assert.ok(src.includes("!./components/ui/**"), "ui/ exclusion must stay in source");
  assert.ok(src.includes("export function moduleKeyFor"), "moduleKeyFor must stay exported");
  assert.ok(src.includes("export function chromeModuleKeys"), "chromeModuleKeys must stay exported");
  assert.ok(src.includes("export function descriptorKind"), "descriptorKind must stay exported");
  assert.ok(src.includes("export function hasDescriptor"), "hasDescriptor must stay exported (F1)");
  assert.ok(
    src.includes("chromeCandidatePaths"),
    "the legacy pair probe must stay for absent-descriptor projects (F1)",
  );
  // The mirror above assumes the alias mapping; fail loudly if it changes.
  assert.ok(src.includes('`./${module.slice(2)}.tsx`'), "alias mapping must stay in sync");
});

// ---- Task 11: SSR (entry-server.tsx / prerender.mjs) must mirror CSR --------

test("ssr_source_uses_the_same_glob_and_descriptor", () => {
  const ssr = readFileSync(join(here, "..", "src", "entry-server.tsx"), "utf8");
  assert.ok(ssr.includes("./components/**/*.tsx"), "SSR must use the broad chrome glob");
  assert.ok(ssr.includes("!./components/ui/**"), "SSR must exclude shadcn ui");
  assert.ok(ssr.includes("chromeModuleKeys"), "SSR must resolve via chromeModuleKeys");
  // F1: SSR must fall back exactly as CSR does, or the two disagree on
  // un-backfilled projects — which is the flash-then-disappear bug itself.
  assert.ok(ssr.includes("hasDescriptor"), "SSR must distinguish absent from explicit none");
  assert.ok(
    ssr.includes("chromeCandidatePaths"),
    "SSR must keep the legacy pair probe until the backfill completes (F1)",
  );
});

test("the descriptor-state to resolution-mode table is fixed", () => {
  // Both entry points call resolutionMode and MUST NOT branch on anything else,
  // so pinning this table pins CSR/SSR agreement. The two source-drift guards
  // above are what prove each side actually routes through it.
  const cases = [
    [undefined, "legacy"],
    [null, "legacy"],
    [{}, "legacy"],
    [{ v: 1, kind: "none", reason: "no_landmarks" }, "no-chrome"],
    [{ v: 1, kind: "static_markup" }, "no-chrome"],
    [{ v: 1, kind: "shadow_dom_chrome" }, "no-chrome"],
    [WRAPPER, "wrapper"],
    [PAIR, "pair"],
  ];
  for (const [raw, expected] of cases) {
    assert.equal(resolutionMode(raw), expected, `${JSON.stringify(raw)} -> ${expected}`);
  }
});

test("prerender_passes_the_descriptor_through", () => {
  const pre = readFileSync(join(here, "prerender.mjs"), "utf8");
  assert.ok(pre.includes("manifest.chrome"), "prerender must forward manifest.chrome");
});

test("csr and ssr globs are character-identical", () => {
  const app = readFileSync(join(here, "..", "src", "App.tsx"), "utf8");
  const ssr = readFileSync(join(here, "..", "src", "entry-server.tsx"), "utf8");
  const pattern = /\[\s*"\.\/components\/\*\*\/\*\.tsx",\s*"!\.\/components\/ui\/\*\*",?\s*\]/;
  assert.ok(pattern.test(app), "App.tsx glob must match the canonical pattern");
  assert.ok(pattern.test(ssr), "entry-server.tsx glob must match the canonical pattern");
});

// --- adversarial additions beyond the brief, for the SSR side ----------------

test("ssr entry keeps the all-or-nothing gate shape (count check before presence check)", () => {
  const ssr = readFileSync(join(here, "..", "src", "entry-server.tsx"), "utf8");
  assert.ok(
    ssr.includes('kind === "wrapper" && keys.length !== 1'),
    "SSR must reject a wrapper descriptor whose key count isn't exactly 1",
  );
  assert.ok(
    ssr.includes('kind === "pair" && keys.length !== 2'),
    "SSR must reject a pair descriptor whose key count isn't exactly 2",
  );
});

test("ssr entry checks presence in its OWN eager glob map, not the CSR lazy one", () => {
  const ssr = readFileSync(join(here, "..", "src", "entry-server.tsx"), "utf8");
  assert.ok(
    /chromeModules\[[\w.]+\]\s*!==\s*undefined/.test(ssr),
    "SSR presence check must read the eager glob map (undefined means absent, unlike a lazy loader function)",
  );
});

test("a ui/ wrapper descriptor still resolves a key from chromeModuleKeys (exclusion is the glob's job, not the resolver's)", () => {
  // moduleKeyFor is pure and knows nothing about ui/ — the negative glob is what keeps
  // such a key out of both entry points' module maps.
  assert.deepEqual(
    chromeModuleKeys({ v: 1, kind: "wrapper", module: "@/components/ui/button" }),
    ["./components/ui/button.tsx"],
  );
});

test("chromeHtmlCache key must incorporate resolved chrome identity, not just the page", () => {
  const ssr = readFileSync(join(here, "..", "src", "entry-server.tsx"), "utf8");
  assert.ok(
    /chrome\.kind.*chrome\.keys\.join/.test(ssr) || /kind.*keys\.join\(.\|.\)/.test(ssr),
    "the chromeHtmlCache key must be derived from (kind, keys.join('|'), page) per the brief",
  );
});

// A wrapper can pass Django's static {children} check yet omit it at runtime. The splice
// is a plain string replace: 0 occurrences drops the article, 2+ fills only the first.
// Mirrors entry-server.tsx::renderChromeTemplate's marker-count guard.

const TEST_MARKER = "__LPS_CHROME_ARTICLE_MARKER_LPS1866__";

function chromeTemplateGuard(html, marker) {
  if (!html) return html;
  const markerCount = html.split(marker).length - 1;
  return markerCount === 1 ? html : "";
}

test("a chrome template with zero article markers falls back to the bare article", () => {
  const html = chromeTemplateGuard("<div><header/><footer/></div>", TEST_MARKER);
  assert.equal(html, "", "a marker-less template must be discarded, not cached as valid chrome");
});

test("a chrome template with two article markers falls back to the bare article", () => {
  const html = chromeTemplateGuard(`<div>${TEST_MARKER}<footer/>${TEST_MARKER}</div>`, TEST_MARKER);
  assert.equal(html, "", "a duplicated marker must be discarded, not spliced into only the first slot");
});

test("a chrome template with exactly one article marker is unchanged", () => {
  const template = `<div><header/><main>${TEST_MARKER}</main><footer/></div>`;
  assert.equal(chromeTemplateGuard(template, TEST_MARKER), template);
});

test("ssr entry rejects a marker-less or duplicated chrome template before caching it, with a distinct warning", () => {
  const ssr = readFileSync(join(here, "..", "src", "entry-server.tsx"), "utf8");
  assert.ok(
    /markerCount\s*!==\s*1/.test(ssr),
    "entry-server.tsx must verify the marker appears exactly once before caching the chrome template",
  );
  assert.ok(
    ssr.includes("chrome_no_slot"),
    "the rejection must emit a distinct chrome_no_slot warning, not reuse chrome_stale (which means a different failure)",
  );
});

// Review fix (LPS-1866 !311): a kind:"pair" naming two different exports from
// the SAME module collided on the CSR component cache -- App.tsx's load()
// keyed by module key alone, so caching the first-loaded export returned it
// again for the second slot (two headers, no footer). SSR was unaffected
// because resolveSiteChrome has no cache; it reads the export fresh each time.
// Mirrors App.tsx's load()'s cache-key formula.

function loadWithCache(cache, key, exportName, named) {
  const cacheKey = `${key}::${exportName}::${named}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;
  const identity = Symbol(`${exportName}:${named}`);
  cache.set(cacheKey, identity);
  return identity;
}

test("a pair naming two different exports from the same module resolves to two distinct identities", () => {
  const cache = new Map();
  const key = "./components/sections/Chrome.tsx";
  const header = loadWithCache(cache, key, "Header", true);
  const footer = loadWithCache(cache, key, "Footer", true);
  assert.notEqual(header, footer, "header and footer must not resolve to the same cached component");
});

test("a pair naming the same export from the same module resolves to the SAME identity (validate() must reject this shape upstream, not the cache)", () => {
  const cache = new Map();
  const key = "./components/sections/Chrome.tsx";
  const header = loadWithCache(cache, key, "Header", true);
  const footerAgain = loadWithCache(cache, key, "Header", true);
  assert.equal(
    header,
    footerAgain,
    "the cache correctly reuses identity for an identical (key, export, named) triple -- " +
      "this degenerate shape must never reach the cache, which is why validate() rejects it",
  );
});

test("app_source_keys_the_chrome_cache_by_module_AND_export", () => {
  const src = readFileSync(join(here, "..", "src", "App.tsx"), "utf8");
  assert.ok(
    src.includes("`${key}::${exportName}::${named}`"),
    "chromeComponentCache must be keyed by module key + export name + named flag, or a " +
      "same-module pair with different exports collides and one slot silently reuses the other's component",
  );
});
