/**
 * LPS-1938 — the preview must not answer a dead page path with Home. Fixtures
 * mirror prod `2c963169`: blog at `blog/index.html`, studio asked `/blog.html`.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import {
  isPageNavigation,
  renderPageNotFound,
  resolveStaticPage,
} from "./static-page-resolve.mjs";

/** The Crestmark shape: dir-index blog, flat everything else, no manifest blog entry. */
const WORKSPACE = new Set([
  "index.html",
  "about.html",
  "services.html",
  "blog/index.html",
  "assets/app.css",
  "favicon.ico",
]);
const exists = (rel) => WORKSPACE.has(rel);
const SLUG_MAP = { about: "about.html", services: "services.html" };

const resolve = (pathname, slugMap = SLUG_MAP) =>
  resolveStaticPage({ pathname, slugMap, exists });

// ── the defect ──────────────────────────────────────────────────────────────

test("the dead path the studio asked for resolves to the dir-index page", () => {
  // Was: both branches missed → next() → SPA fallback → Home, HTTP 200.
  assert.deepEqual(resolve("/blog.html"), {
    kind: "file",
    filePath: "blog/index.html",
  });
});

test("a page-shaped path nothing can answer is refused, not faked", () => {
  assert.deepEqual(resolve("/careers.html"), { kind: "not-found" });
  assert.deepEqual(resolve("/careers"), { kind: "not-found" });
});

test("dir-index pages resolve with and without a trailing slash", () => {
  for (const p of ["/blog", "/blog/", "/blog/index.html"]) {
    assert.equal(resolve(p).filePath, "blog/index.html", p);
  }
});

test("a dir-index page resolves with no manifest entry at all", () => {
  // The whole premise of the bug: the manifest lost its `blog` entry, so
  // buildSlugMap can't know about the page. Disk still can.
  assert.equal(resolve("/blog.html", {}).filePath, "blog/index.html");
});

test("a blog article missing from the workspace is served from the build output", () => {
  // LPS-1938 follow-up: static_blog_generator only ever writes articles into
  // dist/, so /blog/<slug>/ has never been previewable — it silently rendered
  // Home. The content is right there; serve it rather than 404.
  const withDist = new Set([
    ...WORKSPACE,
    "dist/blog/finding-the-best-tile-contractor/index.html",
  ]);
  const r = resolveStaticPage({
    pathname: "/blog/finding-the-best-tile-contractor/",
    slugMap: SLUG_MAP,
    exists: (rel) => withDist.has(rel),
  });
  assert.deepEqual(r, {
    kind: "file",
    filePath: "dist/blog/finding-the-best-tile-contractor/index.html",
  });
});

test("the workspace always wins over the build output", () => {
  // A stale dist/ must never shadow a file that is actually in the workspace.
  const both = new Set(["about.html", "dist/about/index.html"]);
  const r = resolveStaticPage({
    pathname: "/about",
    slugMap: {},
    exists: (rel) => both.has(rel),
  });
  assert.equal(r.filePath, "about.html");
});

test("dist is not consulted for a path the workspace can answer any shape of", () => {
  const both = new Set(["blog/index.html", "dist/blog/index.html"]);
  const seen = [];
  resolveStaticPage({
    pathname: "/blog.html",
    slugMap: {},
    exists: (rel) => (seen.push(rel), both.has(rel)),
  });
  assert.ok(
    !seen.some((r) => r.startsWith("dist/")),
    `probed dist unnecessarily: ${seen.join(", ")}`,
  );
});

test("still not-found when neither the workspace nor dist has it", () => {
  assert.deepEqual(resolve("/careers"), { kind: "not-found" });
});

// ── what must keep working ──────────────────────────────────────────────────

test("a flat page is still served directly", () => {
  assert.deepEqual(resolve("/about.html"), {
    kind: "file",
    filePath: "about.html",
  });
});

test("a manifest slug still resolves to its filePath", () => {
  assert.deepEqual(resolve("/services"), {
    kind: "file",
    filePath: "services.html",
  });
});

test("a manifest entry pointing at a missing file falls through to disk", () => {
  const stale = { blog: "blog.html" };
  assert.equal(resolve("/blog", stale).filePath, "blog/index.html");
});

test("home is never ours to answer or refuse", () => {
  for (const p of ["/", "/index.html"]) {
    assert.deepEqual(resolve(p), { kind: "passthrough" }, p);
  }
});

test("assets pass through — a missing one must not become a page", () => {
  for (const p of ["/assets/app.css", "/assets/missing.css", "/favicon.ico"]) {
    assert.deepEqual(resolve(p), { kind: "passthrough" }, p);
  }
});

test("vite internals and source trees pass through", () => {
  for (const p of [
    "/@vite/client",
    "/@react-refresh",
    "/@fs/workspace/src/main.tsx",
    "/src/main.tsx",
    "/node_modules/.vite/deps/react.js",
    "/__vite_ping",
    "/.well-known/acme-challenge/x",
  ]) {
    assert.deepEqual(resolve(p), { kind: "passthrough" }, p);
  }
});

test("a traversal segment never reaches the workspace join", () => {
  for (const p of ["/../secrets.html", "/a/../../etc/passwd.html", "/../.."]) {
    assert.deepEqual(resolve(p), { kind: "passthrough" }, p);
  }
});

// ── who gets the not-found page ─────────────────────────────────────────────

test("only html navigations get the not-found page", () => {
  assert.equal(
    isPageNavigation({ method: "GET", accept: "text/html,*/*;q=0.8" }),
    true,
  );
  assert.equal(isPageNavigation({ method: "HEAD", accept: "text/html" }), true);
  // A fetch/XHR or a preload keeps whatever it does today.
  assert.equal(isPageNavigation({ method: "GET", accept: "*/*" }), false);
  assert.equal(
    isPageNavigation({ method: "POST", accept: "text/html" }),
    false,
  );
});

test("the not-found page reveals itself instead of hiding behind the overlay", () => {
  const html = renderPageNotFound("/blog.html");
  assert.match(html, /APP_RENDERED/);
  assert.match(html, /\/blog\.html/);
  assert.match(html, /data-lps-page-not-found/);
});

test("the shown path is escaped", () => {
  const html = renderPageNotFound('/<img src=x onerror="alert(1)">');
  assert.ok(!html.includes("<img"), "raw markup reached the document");
});

// ── wiring ──────────────────────────────────────────────────────────────────

test("the static-html middleware is still wired to this resolver", () => {
  // This repo has lost a fix to a wholesale file restore before (LPS-1832 was
  // dropped by the LPS-1788 revert), and a resolver nobody calls fails silently:
  // the SPA fallback simply resumes answering dead page paths with Home.
  const src = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "..", "..", "vite.config.ts"),
    "utf-8",
  );
  assert.match(src, /from ["']\.\/scripts\/lib\/static-page-resolve\.mjs["']/);
  for (const symbol of ["resolveStaticPage(", "isPageNavigation(", "renderPageNotFound("]) {
    assert.ok(src.includes(symbol), `vite.config.ts no longer calls ${symbol}`);
  }
  // And the SPA fallback must not be reachable for a resolved page again.
  assert.match(src, /res\.statusCode = 404/);
});
