/**
 * LPS-1561 — the section-level wrappers must carry their own width.
 *
 * `ImageBackground` and `Surface` render a `<section>` with `width: auto`, which
 * only spans the container while the element sits as a block in normal flow.
 * Generated heroes legitimately wrap them in an outer section, and when that
 * wrapper is `flex` (or `grid`) the wrapper becomes an item and shrinks to
 * fit-content — the parent's background then shows beside the image, which is the
 * "broken banner" QA reported.
 *
 * The components own their width rather than constraining what may contain them,
 * so this asserts the class survives future edits. Removing `w-full` looks
 * redundant to a reader; it is not.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { test } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** The class list the component always applies, i.e. the first `cn(` argument list. */
function baseClasses(file) {
  const src = readFileSync(join(root, "src/components", file), "utf8");
  const m = src.match(/className=\{cn\(([\s\S]*?)\)\}/);
  assert.ok(m, `${file}: no className={cn(...)} found — the component was restructured`);
  return m[1];
}

for (const file of ["ImageBackground.tsx", "Surface.tsx"]) {
  test(`${file} stays full-width inside a flex/grid parent`, () => {
    assert.match(
      baseClasses(file),
      /\bw-full\b/,
      `${file} must keep w-full — without it the section collapses to fit-content ` +
        `whenever a caller wraps it in a flex or grid parent (LPS-1561)`,
    );
  });
}
