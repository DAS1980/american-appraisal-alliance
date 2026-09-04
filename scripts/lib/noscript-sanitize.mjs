/**
 * LPS-1984 — downgrade heading tags inside <noscript> blocks to <p>.
 *
 * The legacy boilerplate index.html shipped `<h1>JavaScript Required</h1>` in
 * its noscript fallback, and index.html is engine-never-touch (LPS-1362), so
 * existing projects keep that H1 in their committed shell forever. Non-JS SEO
 * auditors parse the raw HTML and count it as a duplicate H1 on every page.
 * Rewriting at build time self-heals every affected site on its next publish
 * without touching any workspace.
 */

const NOSCRIPT_RE = /<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi;

// Script and style bodies are raw text, not markup: a string literal that
// merely spells out `<noscript><h1>` is code, and rewriting it edits the
// customer's JavaScript. The prerender applies this to every .html in dist,
// so the blast radius of getting that wrong is every page of every site.
const RAWTEXT_RE = /<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi;

export function sanitizeNoscriptHeadings(html) {
  const rawtext = [];
  for (const m of html.matchAll(RAWTEXT_RE)) {
    rawtext.push([m.index, m.index + m[0].length]);
  }
  const inRawtext = (pos) => rawtext.some(([s, e]) => pos >= s && pos < e);

  return html.replace(NOSCRIPT_RE, (block, offset) =>
    inRawtext(offset)
      ? block
      : block.replace(/<h[1-6](\s[^>]*)?>/gi, "<p$1>").replace(/<\/h[1-6]>/gi, "</p>")
  );
}
