// LPS-1759 — guard: components the section-id stamper is allowed to stamp
// MUST forward unknown props to their rendered DOM element.
//
// The stamper (agent_daemon/scripts/swc_section_roots.cjs) normally refuses to
// put `data-section-id` on a root that is a custom component, because a
// component has no obligation to forward unknown props and the id would never
// reach the DOM — a phantom id is worse than no id. `ImageBackground` is an
// explicit exception: it is OUR component, it declares
// `HTMLAttributes<HTMLElement>`, and it spreads `{...props}` onto its host
// root. Every hero roots on it, so without the exception the highest-reach
// section on every site would be invisible to section analytics.
//
// This test is the check on that exception. It renders each allowlisted
// component and asserts the attribute lands on the ROOT element, so a refactor
// that stops forwarding (or forwards to an inner layer) is caught here rather
// than silently producing ids that never appear in the DOM.
//
// This runs in CI via the `unit_tests` job (`npm test`), so it IS an automated
// gate — a refactor that breaks forwarding fails the pipeline. Locally:
//   npm ci && node --test scripts/section-id-forwarding.test.mjs
//
// KEEP IN SYNC: the allowlist below mirrors `FORWARDING_COMPONENTS` in
// agent_daemon/scripts/swc_section_roots.cjs. Adding an entry to either
// without the other is the bug this comment exists to prevent.

import assert from "node:assert/strict";
import { test } from "node:test";
import Module from "node:module";
import { createRequire } from "node:module";
import { dirname, resolve as resolvePath } from "node:path";
import { existsSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ROOT = resolvePath(dirname(fileURLToPath(import.meta.url)), "..");

const ALLOWLIST = [
  {
    component: "ImageBackground",
    file: "src/components/ImageBackground.tsx",
    // Props the component genuinely requires to render.
    props: { src: "https://example.com/a.jpg", alt: "A" },
    expectedRootTag: "section",
  },
];

// --- minimal TS/TSX loader (swc + the project's "@/" alias) --------------

// @swc/core is a TRANSITIVE dep (via @vitejs/plugin-react-swc), so it is not
// guaranteed to be hoisted to the top-level node_modules. Resolve it through
// the package that actually declares it when the direct require misses.
const swc = (() => {
  try {
    return require("@swc/core");
  } catch {
    const pluginRequire = createRequire(require.resolve("@vitejs/plugin-react-swc"));
    return pluginRequire("@swc/core");
  }
})();
const compiled = new Map();

function resolveModule(specifier, fromDir) {
  let base;
  if (specifier.startsWith("@/")) {
    base = resolvePath(ROOT, "src", specifier.slice(2));
  } else if (specifier.startsWith(".")) {
    base = resolvePath(fromDir, specifier);
  } else {
    return null; // real package — let node resolve it
  }
  for (const candidate of [
    base,
    `${base}.tsx`,
    `${base}.ts`,
    `${base}.jsx`,
    `${base}.js`,
    resolvePath(base, "index.tsx"),
    resolvePath(base, "index.ts"),
  ]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  throw new Error(`cannot resolve ${specifier} from ${fromDir}`);
}

function loadTs(absPath) {
  if (compiled.has(absPath)) return compiled.get(absPath).exports;

  const source = readFileSync(absPath, "utf8");
  const { code } = swc.transformSync(source, {
    filename: absPath,
    jsc: {
      parser: { syntax: "typescript", tsx: absPath.endsWith(".tsx") },
      transform: { react: { runtime: "automatic" } },
      target: "es2020",
    },
    module: { type: "commonjs" },
  });

  const mod = new Module(absPath, null);
  mod.filename = absPath;
  mod.paths = Module._nodeModulePaths(dirname(absPath));
  compiled.set(absPath, mod);

  const localRequire = (specifier) => {
    const resolved = resolveModule(specifier, dirname(absPath));
    return resolved ? loadTs(resolved) : require(specifier);
  };

  const wrapper = new Function("exports", "require", "module", "__filename", "__dirname", code);
  wrapper(mod.exports, localRequire, mod, absPath, dirname(absPath));
  mod.loaded = true;
  return mod.exports;
}

// --- the guard -----------------------------------------------------------

const PROBE = "lps-1759-probe";

for (const entry of ALLOWLIST) {
  test(`${entry.component} forwards data-section-id to its DOM root`, () => {
    const { createElement } = require("react");
    const { renderToStaticMarkup } = require("react-dom/server");

    const exported = loadTs(resolvePath(ROOT, entry.file));
    const Component = exported.default ?? exported[entry.component];
    assert.ok(Component, `${entry.component} has no usable export`);

    const markup = renderToStaticMarkup(
      createElement(Component, { ...entry.props, "data-section-id": PROBE }, "child")
    );

    assert.ok(
      markup.includes(`data-section-id="${PROBE}"`),
      `${entry.component} dropped data-section-id — it must spread {...props} onto its ` +
        `host root, or be removed from FORWARDING_COMPONENTS in swc_section_roots.cjs.\n` +
        `Rendered: ${markup.slice(0, 300)}`
    );

    // The stamper writes the attribute onto the component's ROOT element, so
    // it has to land on the outermost tag — not on some inner layer, which
    // would key analytics to the wrong box.
    const rootTag = markup.match(/^<([a-z][a-z0-9]*)\b/i);
    assert.ok(rootTag, `could not read a root tag from: ${markup.slice(0, 120)}`);
    assert.equal(rootTag[1], entry.expectedRootTag);

    const rootOpenTag = markup.slice(0, markup.indexOf(">") + 1);
    assert.ok(
      rootOpenTag.includes(`data-section-id="${PROBE}"`),
      `${entry.component} forwarded data-section-id to an inner element instead of ` +
        `its root.\nRoot tag was: ${rootOpenTag}`
    );
  });

  test(`${entry.component} emits data-section-id exactly once`, () => {
    const { createElement } = require("react");
    const { renderToStaticMarkup } = require("react-dom/server");

    const exported = loadTs(resolvePath(ROOT, entry.file));
    const Component = exported.default ?? exported[entry.component];

    // {...props} must come LAST in the JSX, otherwise a future internal
    // attribute of the same name could silently shadow the stamped id.
    const markup = renderToStaticMarkup(
      createElement(Component, { ...entry.props, "data-section-id": PROBE }, "child")
    );
    const occurrences = markup.split(`data-section-id="`).length - 1;
    assert.equal(occurrences, 1, `expected exactly one data-section-id, got ${occurrences}`);
  });
}
