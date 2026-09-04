import { test } from "node:test";
import assert from "node:assert/strict";

import { sanitizeNoscriptHeadings } from "./noscript-sanitize.mjs";

const LEGACY_BLOCK = `<noscript>
  <div style="padding: 2rem;">
    <h1>JavaScript Required</h1>
    <p>This website requires JavaScript to function properly.</p>
  </div>
</noscript>`;

test("downgrades h1 inside noscript to p", () => {
  const out = sanitizeNoscriptHeadings(LEGACY_BLOCK);
  assert.ok(!/<h[1-6]/i.test(out));
  assert.ok(out.includes("<p>JavaScript Required</p>"));
  assert.ok(out.includes("requires JavaScript to function"));
});

test("preserves heading attributes on the downgraded tag", () => {
  const out = sanitizeNoscriptHeadings('<noscript><h2 class="x">Hi</h2></noscript>');
  assert.equal(out, '<noscript><p class="x">Hi</p></noscript>');
});

test("leaves headings outside noscript untouched", () => {
  const html = `<h1>Real Page Heading</h1>${LEGACY_BLOCK}`;
  const out = sanitizeNoscriptHeadings(html);
  assert.ok(out.startsWith("<h1>Real Page Heading</h1>"));
  assert.equal((out.match(/<h1/g) || []).length, 1);
});

test("handles multiple noscript blocks and noscript with attributes", () => {
  const html =
    '<noscript data-x="1"><h3>A</h3></noscript><h2>keep</h2><noscript><h1>B</h1></noscript>';
  const out = sanitizeNoscriptHeadings(html);
  assert.equal(
    out,
    '<noscript data-x="1"><p>A</p></noscript><h2>keep</h2><noscript><p>B</p></noscript>'
  );
});

test("no-op on already-clean html", () => {
  const html = '<noscript><p>JavaScript Required</p></noscript>';
  assert.equal(sanitizeNoscriptHeadings(html), html);
});

test("leaves script and style bodies alone", () => {
  // The prerender applies this to every .html in dist, so a string literal
  // that merely spells out the markup is code, not a heading to downgrade.
  for (const html of [
    '<script>var a = "<noscript><h1>x</h1></noscript>";</script>',
    '<script type="application/ld+json">{"x":"<noscript><h1>t</h1></noscript>"}</script>',
    '<style>/* <noscript><h1>a</h1></noscript> */</style>',
  ]) {
    assert.equal(sanitizeNoscriptHeadings(html), html);
  }
});

test("still fixes a real noscript that follows a script mentioning one", () => {
  const html =
    '<script>var a="<noscript><h1>x</h1></noscript>";</script>' +
    "<noscript><h1>Real</h1></noscript>";
  assert.equal(
    sanitizeNoscriptHeadings(html),
    '<script>var a="<noscript><h1>x</h1></noscript>";</script>' +
      "<noscript><p>Real</p></noscript>"
  );
});
