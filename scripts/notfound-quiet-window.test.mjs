/**
 * LPS-2001 — NotFound must honour the quiet window.
 *
 * During a landing→website conversion the routing structure changes underneath
 * the iframe, so a route can briefly resolve to nothing. Rendering the raw 404
 * there reads as "my site is gone". NotFound mirrors ErrorBoundary's
 * `data-lps-quiet` check and shows a neutral "rebuilding" splash instead.
 *
 * Source-level assertions: the component is JSX/React and this suite is a plain
 * `node --test` mirror with no renderer, so we assert on the wiring rather than
 * on rendered output.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(root, "src/pages/NotFound.tsx"), "utf8");

test("NotFound reads the same data-lps-quiet flag as ErrorBoundary", () => {
  assert.match(src, /dataset\?\.lpsQuiet === "1"/);
});

test("NotFound renders a rebuilding splash instead of the 404 card while quiet", () => {
  assert.match(src, /Rebuilding your site/);
  const quietBranch = src.indexOf("if (isQuiet)");
  const notFoundCard = src.indexOf("Oops! Page not found");
  assert.ok(quietBranch > -1, "expected an isQuiet early-return branch");
  assert.ok(
    quietBranch < notFoundCard,
    "the quiet splash must short-circuit before the 404 card",
  );
});

test("the quiet flag is observed, so an ending window falls back to the real 404", () => {
  // Read-once would strand the user on a spinner forever when the route is
  // genuinely missing and the window closes.
  assert.match(src, /MutationObserver/);
  assert.match(src, /attributeFilter: \["data-lps-quiet"\]/);
});

test("no 404 console error is emitted while the window is open", () => {
  // Keeps conversion noise out of the preview console; the observer keys on
  // window.onerror, not this line, so suppressing it changes no repair signal.
  assert.match(src, /if \(isQuiet\) return;\s*\n\s*console\.error\("404 Error/);
});
