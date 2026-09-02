/**
 * LPS-1667 — which article routes each blog host registers, and who owns a
 * post-path prefix when two pages could claim it.
 *
 * Both cases below came out of review of !283:
 *
 *  1. A hub renamed to /resources satisfies the identity test, so `App.tsx` used
 *     to make home cede /blog/:postSlug to it. The hub then claimed that route
 *     with pageId="blog", and a home-hosted post (page_id "home", which always
 *     lives at /blog/<post>) matched nothing and rendered "not found".
 *  2. Two pages can hold posts under the same directory after a rename. Deciding
 *     per-page, both registered `${prefix}/:postSlug`; React Router takes the
 *     first, so a post could render against the wrong pageId.
 *
 * Mirrors the pure logic from `src/App.tsx` (same approach as
 * blog-page-render-gate.test.mjs — App.tsx can't be imported in plain node).
 * `test_source_still_carries_the_rules` guards against the mirror drifting.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { test } from "node:test";

const BLOG_HOST_PAGE_ID = "blog";

const isDedicatedBlog = (route) =>
  route.id?.toLowerCase() === BLOG_HOST_PAGE_ID || route.slug === BLOG_HOST_PAGE_ID;

function postPathDir(rawPath) {
  const path = (rawPath || "").trim();
  if (!path.startsWith("/")) return null;
  if (/[:*?#\s]/.test(path) || path.includes("..")) return null;
  const dir = path.slice(0, path.lastIndexOf("/"));
  return dir && dir !== "/" ? dir : null;
}

function postPrefixOwners(routes, posts) {
  const counts = new Map();
  for (const route of routes) {
    for (const post of posts.filter((p) => p.page_id === route.id)) {
      const dir = postPathDir(post.post_path);
      if (!dir) continue;
      const byPage = counts.get(dir) ?? new Map();
      byPage.set(route.id, (byPage.get(route.id) ?? 0) + 1);
      counts.set(dir, byPage);
    }
  }
  const owners = new Map();
  for (const [prefix, byPage] of counts) {
    const ranked = [...byPage.entries()].sort((a, b) => b[1] - a[1]);
    if (ranked.length === 1 || ranked[0][1] > ranked[1][1]) {
      owners.set(prefix, ranked[0][0]);
    }
  }
  return owners;
}

function blogArticlePaths(route, allRoutes, prefixOwners) {
  const dedicated = isDedicatedBlog(route);
  const paths = [
    dedicated ? `${route.path}/:postSlug` : `${route.path}/blog/:postSlug`,
  ];
  const claim = (p) => {
    if (!paths.includes(p)) paths.push(p);
  };

  if (dedicated && route.slug !== BLOG_HOST_PAGE_ID) {
    claim(`${route.path}/blog/:postSlug`);
    const blogPrefix = `/${BLOG_HOST_PAGE_ID}`;
    const claimedByData = prefixOwners.has(blogPrefix);
    const claimedBySlug = allRoutes.some(
      (r) => !r.isHome && r.slug === BLOG_HOST_PAGE_ID,
    );
    if (!claimedByData && !claimedBySlug) claim("/blog/:postSlug");
  }

  const ownedByAnotherPage = new Set(
    allRoutes.filter((r) => !r.isHome && r.path !== route.path).map((r) => r.path),
  );
  for (const [prefix, ownerId] of prefixOwners) {
    if (ownerId !== route.id) continue;
    if (ownedByAnotherPage.has(prefix)) continue;
    claim(`${prefix}/:postSlug`);
  }
  return paths;
}

function homeServesBlogArticles(routes, prefixOwners) {
  const homeRoute = routes.find((r) => r.isHome);
  const dedicatedBlogPage = routes.find((r) => !r.isHome && isDedicatedBlog(r));
  const blogPrefixOwner = prefixOwners.get(`/${BLOG_HOST_PAGE_ID}`);
  const pageSluggedBlog = routes.some(
    (r) => !r.isHome && r.slug === BLOG_HOST_PAGE_ID,
  );
  return (
    !!homeRoute &&
    !pageSluggedBlog &&
    (blogPrefixOwner === homeRoute.id ||
      (!blogPrefixOwner && !dedicatedBlogPage))
  );
}

/** Every (path -> owning pageId) the router would register. */
function registered(routes, posts) {
  const owners = postPrefixOwners(routes, posts);
  const out = [];
  const home = routes.find((r) => r.isHome);
  if (homeServesBlogArticles(routes, owners)) {
    out.push(["/blog/:postSlug", home.id]);
  }
  for (const r of routes.filter((x) => !x.isHome)) {
    for (const p of blogArticlePaths(r, routes, owners)) out.push([p, r.id]);
  }
  return out;
}

const paths = (reg) => reg.map(([p]) => p);
const ownerOf = (reg, path) => reg.find(([p]) => p === path)?.[1];
const HOME = { id: "home", slug: "", isHome: true, path: "/" };

function assertNoDuplicatePaths(reg) {
  const seen = paths(reg);
  assert.deepEqual(
    seen.filter((p, i) => seen.indexOf(p) !== i),
    [],
    "no path may be registered twice — React Router silently takes the first",
  );
}

// ---------------------------------------------------------------------------
// Review case 1 — a renamed hub must not take /blog/:postSlug from home
// ---------------------------------------------------------------------------

test("home keeps /blog/:postSlug when the hub was renamed away", () => {
  const routes = [HOME, { id: "blog", slug: "resources", isHome: false, path: "/resources" }];
  const reg = registered(routes, [
    { page_id: "home", post_path: "/blog/welcome" },
    { page_id: "blog", post_path: "/resources/guide" },
  ]);

  assert.equal(ownerOf(reg, "/blog/:postSlug"), "home");
  assert.equal(ownerOf(reg, "/resources/:postSlug"), "blog");
  assertNoDuplicatePaths(reg);
});

test("a page literally slugged blog still takes /blog/:postSlug from home", () => {
  const routes = [HOME, { id: "blog", slug: "blog", isHome: false, path: "/blog" }];
  const reg = registered(routes, [{ page_id: "blog", post_path: "/blog/a" }]);

  assert.equal(ownerOf(reg, "/blog/:postSlug"), "blog");
  assertNoDuplicatePaths(reg);
});

test("with no blog hub at all, home keeps /blog/:postSlug", () => {
  const reg = registered([HOME], [{ page_id: "home", post_path: "/blog/a" }]);
  assert.deepEqual(reg, [["/blog/:postSlug", "home"]]);
});

test("a renamed hub may still claim /blog/:postSlug when home has no posts", () => {
  const routes = [HOME, { id: "blog", slug: "news", isHome: false, path: "/news" }];
  const reg = registered(routes, [{ page_id: "blog", post_path: "/news/a" }]);

  assert.equal(ownerOf(reg, "/blog/:postSlug"), "blog");
  assertNoDuplicatePaths(reg);
});

// ---------------------------------------------------------------------------
// Review case 2 — two pages must never both claim a prefix
// ---------------------------------------------------------------------------

test("the page with the most posts under a prefix owns it", () => {
  const routes = [
    HOME,
    { id: "blog", slug: "news", isHome: false, path: "/news" },
    { id: "lib", slug: "library", isHome: false, path: "/library" },
  ];
  const reg = registered(routes, [
    { page_id: "blog", post_path: "/resources/a" },
    { page_id: "blog", post_path: "/resources/b" },
    { page_id: "lib", post_path: "/resources/c" },
  ]);

  assert.equal(ownerOf(reg, "/resources/:postSlug"), "blog");
  assertNoDuplicatePaths(reg);
});

test("a tied prefix is left unclaimed rather than guessed", () => {
  const routes = [
    HOME,
    { id: "blog", slug: "news", isHome: false, path: "/news" },
    { id: "lib", slug: "library", isHome: false, path: "/library" },
  ];
  const reg = registered(routes, [
    { page_id: "blog", post_path: "/resources/a" },
    { page_id: "lib", post_path: "/resources/c" },
  ]);

  assert.equal(ownerOf(reg, "/resources/:postSlug"), undefined);
  assertNoDuplicatePaths(reg);
});

test("a prefix that is another page's own route path is never claimed", () => {
  const routes = [
    HOME,
    { id: "blog", slug: "news", isHome: false, path: "/news" },
    { id: "about", slug: "about", isHome: false, path: "/about" },
  ];
  const reg = registered(routes, [{ page_id: "blog", post_path: "/about/a" }]);

  assert.equal(ownerOf(reg, "/about/:postSlug"), undefined);
  assertNoDuplicatePaths(reg);
});

// ---------------------------------------------------------------------------
// The rename-twice case this whole mechanism exists for
// ---------------------------------------------------------------------------

test("posts under an intermediate slug still resolve after two renames", () => {
  const routes = [HOME, { id: "blog", slug: "news", isHome: false, path: "/news" }];
  const reg = registered(routes, [
    { page_id: "blog", post_path: "/resources/old-post" }, // blog -> resources -> news
    { page_id: "blog", post_path: "/news/new-post" },
  ]);

  assert.equal(ownerOf(reg, "/resources/:postSlug"), "blog");
  assert.equal(ownerOf(reg, "/news/:postSlug"), "blog");
  assertNoDuplicatePaths(reg);
});

test("a post_path carrying route syntax is refused, not sanitised", () => {
  for (const bad of ["/a/:id/x", "/a/*/x", "/../etc/x", "/a b/x", "relative/x"]) {
    assert.equal(postPathDir(bad), null, `${bad} must not become a route`);
  }
  assert.equal(postPathDir("/resources/ok-post"), "/resources");
});

// ---------------------------------------------------------------------------
// Drift guard — the mirror above must keep matching src/App.tsx
// ---------------------------------------------------------------------------

test("source still carries the rules this file mirrors", () => {
  const appTsx = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "..", "src", "App.tsx"),
    "utf8",
  );
  for (const marker of [
    "function postPrefixOwners",
    "homeServesBlogArticles",
    "ranked[0][1] > ranked[1][1]", // tie -> unclaimed
    "if (ownerId !== route.id) continue",
    "pageSluggedBlog",
  ]) {
    assert.ok(appTsx.includes(marker), `src/App.tsx should still contain: ${marker}`);
  }
});
