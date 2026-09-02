/**
 * LPS-1902 — `src/components/blog/` (and any other dir in `_ENGINE_REFRESH_DIRS`)
 * stops receiving engine refreshes for a given file the moment a customer/agent
 * edit touches it (the hash gate in `_refresh_engine_files` then preserves it
 * forever, by design). But blog components still import from `src/lib/blog-data.ts`
 * and `src/lib/utils.ts`, which DO keep refreshing untouched. If a future engine
 * change renames or removes one of these exports, every already-frozen blog
 * component silently breaks the next time its project builds — no error until
 * then, and no refresh will ever fix it since the file is frozen.
 *
 * This is a floor, not a snapshot: new exports are fine, only removing/renaming
 * one of these fails. Scoped to the actual cross-file dependency (verified via
 * `grep -rn "@/lib" src/components/blog/*.tsx`) — no `src/hooks` entry here
 * because nothing in blog/sections/layout currently imports from `@/hooks`.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { test } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function exportedNames(relpath) {
  const src = readFileSync(join(root, relpath), "utf8");
  const names = new Set();
  for (const m of src.matchAll(/export\s+(?:async\s+)?(?:function|const|interface|type|class)\s+([A-Za-z0-9_]+)/g)) {
    names.add(m[1]);
  }
  return names;
}

test("src/lib/blog-data.ts keeps the exports blog components depend on", () => {
  const names = exportedNames("src/lib/blog-data.ts");
  for (const name of [
    "BlogPost",
    "BlogPageMeta",
    "getPostsForPage",
    "getPostBySlug",
    "getBlogPages",
    "hasBlogSection",
    "getBlogPageMeta",
    "isDraftPost",
    "usePostsForPage",
  ]) {
    assert.ok(names.has(name), `blog-data.ts no longer exports "${name}" — a frozen blog component depends on it`);
  }
});

test("src/lib/utils.ts keeps cn()", () => {
  const names = exportedNames("src/lib/utils.ts");
  assert.ok(names.has("cn"), 'utils.ts no longer exports "cn" — every blog component imports it');
});
