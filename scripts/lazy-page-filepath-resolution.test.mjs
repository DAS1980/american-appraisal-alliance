/**
 * LPS-1786 — a page's manifest filePath can diverge from its slug (e.g. a
 * rename that relabels the slug but never renames the underlying component
 * file, exactly what happened to ZatroX Studio's Blog->Resources page).
 * `getLazyPageComponent` used to resolve filePath via a raw ignored dynamic
 * import with no build-time inclusion guarantee, so a transient fetch miss
 * fell straight through to NotFound. It now resolves filePath through a
 * glob-derived map (real chunks, known at build time) with one retry before
 * falling back to convention.
 *
 * Mirrors the pure resolution logic from `src/App.tsx` (same approach as
 * blog-article-routes.test.mjs — App.tsx can't be imported in plain node).
 * `test_source_still_carries_the_rules` guards against the mirror drifting.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { test } from "node:test";

const isMiss = (e) =>
  /failed to fetch dynamically imported module|unknown variable dynamic import|importing a module script failed|failed to resolve (?:module|import)/i.test(
    e instanceof Error ? e.message : String(e),
  );

/** Mirrors the filePath branch of getLazyPageComponent's lazy() callback. */
async function resolveFilePath(pageModules, filePath) {
  const importPath = filePath.startsWith("src/") ? `./${filePath.slice(4)}` : `./${filePath}`;
  const loader = pageModules[importPath];
  if (!loader) return { resolved: false };
  try {
    return { resolved: true, mod: await loader() };
  } catch (e) {
    if (!isMiss(e)) throw e;
    try {
      return { resolved: true, mod: await loader() };
    } catch (e2) {
      if (!isMiss(e2)) throw e2;
      return { resolved: false };
    }
  }
}

const MISS = () => {
  throw new Error("Failed to fetch dynamically imported module: ./pages/Resources.tsx");
};

test("filePath present and its chunk exists — resolves without retry", async () => {
  let calls = 0;
  const pageModules = {
    "./pages/Blog.tsx": async () => {
      calls++;
      return { default: "BlogPage" };
    },
  };
  const result = await resolveFilePath(pageModules, "src/pages/Blog.tsx");
  assert.equal(result.resolved, true);
  assert.equal(result.mod.default, "BlogPage");
  assert.equal(calls, 1, "must not retry a loader that succeeds first try");
});

test("filePath chunk misses once (transient) then succeeds — the LPS-1786 fix", async () => {
  let calls = 0;
  const pageModules = {
    "./pages/Blog.tsx": async () => {
      calls++;
      if (calls === 1) MISS();
      return { default: "BlogPage" };
    },
  };
  const result = await resolveFilePath(pageModules, "src/pages/Blog.tsx");
  assert.equal(result.resolved, true, "one retry must recover a transient miss");
  assert.equal(calls, 2);
});

test("filePath chunk misses twice — falls through to convention, not NotFound directly", async () => {
  let calls = 0;
  const pageModules = {
    "./pages/Blog.tsx": async () => {
      calls++;
      MISS();
    },
  };
  const result = await resolveFilePath(pageModules, "src/pages/Blog.tsx");
  assert.equal(result.resolved, false);
  assert.equal(calls, 2, "exactly one retry, then give up");
});

test("filePath not among bundled pages — no retry attempted, deterministic miss", async () => {
  const pageModules = {
    "./pages/Blog.tsx": async () => ({ default: "BlogPage" }),
  };
  const result = await resolveFilePath(pageModules, "src/pages/Resources.tsx");
  assert.equal(result.resolved, false);
});

test("a genuine eval error (not a miss) is re-thrown, never swallowed (LPS-1320)", async () => {
  const pageModules = {
    "./pages/Blog.tsx": async () => {
      throw new ReferenceError("Cannot access 'x' before initialization");
    },
  };
  await assert.rejects(
    () => resolveFilePath(pageModules, "src/pages/Blog.tsx"),
    ReferenceError,
  );
});

test("source still carries the rules this file mirrors", () => {
  const appTsx = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "..", "src", "App.tsx"),
    "utf8",
  );
  for (const marker of [
    "const pageModules = import.meta.glob",
    "const loader = pageModules[importPath]",
    "filePath chunk failed after retry",
    "filePath not found among bundled pages",
  ]) {
    assert.ok(appTsx.includes(marker), `src/App.tsx should still contain: ${marker}`);
  }
});
