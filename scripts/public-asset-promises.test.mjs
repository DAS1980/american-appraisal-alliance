/**
 * LPS-2066 — every local asset path the shipped markup promises must exist in
 * `public/`, or it 404s on every published site built from this boilerplate.
 *
 * `index.html` linked `/favicon-16x16.png`, `/favicon-32x32.png` and
 * `/apple-touch-icon.png`, and every writer of `pages.manifest.json` defaults
 * `site.defaultSeo.ogImage` to `/og-default.png` — while `public/` held only
 * `favicon.svg`. Vite copies `public/` into `dist/` verbatim and invents
 * nothing, so all four were hard 404s: no tab icon, no iOS home-screen icon,
 * and a blank preview card on every social share.
 *
 * The four files are the fix; this test is what stops the next `<link>` from
 * re-opening it. It reads the promises out of the real files rather than
 * listing filenames, so a newly added tag is covered the moment it is written.
 *
 * Scope: root-relative local paths only. Absolute URLs (fonts/CDNs) and
 * Vite-built `/assets/*` bundles are not served from `public/`.
 */
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { test } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Root-relative `href`/`src` values in index.html, minus Vite's build output. */
function promisedByIndexHtml() {
  const html = readFileSync(join(root, "index.html"), "utf8");
  const paths = new Set();
  for (const m of html.matchAll(/(?:href|src)\s*=\s*"(\/[^"]*)"/g)) {
    const p = m[1].split(/[?#]/)[0];
    // `/assets/*` is emitted by the build and `/src/*` is resolved by Vite from
    // source (the module entry) — neither is ever served out of `public/`.
    if (p === "/" || p.startsWith("/assets/") || p.startsWith("/src/")) continue;
    paths.add(p);
  }
  return paths;
}

/** ogImage defaults declared in the shipped manifest (site + per page). */
function promisedByManifest() {
  const manifest = JSON.parse(
    readFileSync(join(root, "pages.manifest.json"), "utf8"),
  );
  const paths = new Set();
  const add = (v) => {
    if (typeof v === "string" && v.startsWith("/") && !v.startsWith("//")) {
      paths.add(v.split(/[?#]/)[0]);
    }
  };
  add(manifest?.site?.defaultSeo?.ogImage);
  for (const page of manifest?.pages ?? []) add(page?.seo?.ogImage);
  return paths;
}

function missing(paths) {
  return [...paths].filter((p) => !existsSync(join(root, "public", p)));
}

test("index.html promises no local asset that public/ lacks", () => {
  const promised = promisedByIndexHtml();
  assert.ok(promised.size > 0, "parsed no local asset paths — regex drifted");
  assert.deepEqual(
    missing(promised),
    [],
    "index.html references these but public/ has no such file — they will 404 " +
      "on every published site. Add the file, or drop the tag.",
  );
});

test("manifest ogImage defaults resolve to a real file", () => {
  assert.deepEqual(
    missing(promisedByManifest()),
    [],
    "pages.manifest.json points og:image/twitter:image at a file public/ does " +
      "not have — social shares render a blank card.",
  );
});

test("the four LPS-2066 assets are present", () => {
  // Named explicitly so deleting one fails here, not only via the parsers
  // above (which would go quiet if the tag were removed in the same change).
  for (const f of [
    "favicon-16x16.png",
    "favicon-32x32.png",
    "apple-touch-icon.png",
    "og-default.png",
    "favicon.svg",
  ]) {
    assert.ok(existsSync(join(root, "public", f)), `public/${f} is missing`);
  }
});
