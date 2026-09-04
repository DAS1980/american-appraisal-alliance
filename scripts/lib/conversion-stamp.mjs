// LPS-1196: stamp each CTA's conversion role at build time; the Django install
// maps the user's Google category → role and binds to the matching stamp.
//
// `Button` (shadcn) is included because real generations always wrap CTAs in
// it — it spreads unknown props onto its underlying button/Slot-merged child.
const _TAG_OPEN_RE = /<(a|button|Button)\b/gi;

// LPS-1653: a flat `[^>]*?` stopped at the `>` inside `=>` in raw JSX source
// (e.g. `onClick={() => fn()}`), corrupting the tag. Track quote/brace state
// so only a real depth-0, non-string `>` counts as the tag close.
function _findTagEnd(src, startIdx) {
  let depth = 0;
  let quote = null;
  for (let i = startIdx; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === "\\") { i++; continue; }
      if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { quote = c; continue; }
    if (c === "{") { depth++; continue; }
    if (c === "}") { if (depth > 0) depth--; continue; }
    if (c === ">" && depth === 0) return i;
  }
  return -1; // unterminated — caller leaves the tag untouched
}

// Non-white/non-transparent background in a style attr — signals a custom-coloured CTA
// that won't carry bg-primary (Layer 1 heuristic for inline-styled buttons/links).
const _BG_COLOR_RE = /\bbackground(?:-color)?\s*:\s*(?!transparent|none|inherit|initial|unset|white\b|#fff\b|#ffffff\b|rgba?\(\s*255\s*,\s*255\s*,\s*255)/i;

// Common design-system CTA class tokens beyond bg-primary.
const _CTA_CLASS_RE = /(^|\s)(btn-primary|btn-cta|cta-btn|cta-button|button-primary|cta-primary)(\s|$)/i;

// LPS-1685: the inverted CTA — a light button on a brand-coloured section, so it
// carries the brand as TEXT (`bg-background text-primary`) while `bg-primary`
// sits on the parent. Every check here is element-local, so the section's class
// is invisible and the page's most prominent CTA goes unstamped. Both halves are
// required: `text-primary` alone is ordinary body copy or a quiet inline link.
const _INVERTED_FG_RE = /(^|\s)text-primary(\s|$)/;
const _INVERTED_BG_RE = /(^|\s)bg-(background|white|card|primary-foreground)(\s|$)/;

function _conversionRole(tag, attrs) {
  if (/\bdata-conversion-trigger\s*=/i.test(attrs)) return null; // already stamped
  const href = (attrs.match(/\bhref\s*=\s*["']([^"']*)["']/i) || [, ""])[1].trim();
  if (tag === "a" && /^tel:/i.test(href)) return "TEL";
  const type = (attrs.match(/\btype\s*=\s*["']([^"']*)["']/i) || [, ""])[1].trim().toLowerCase();
  if ((tag === "button" || tag === "Button") && type === "submit") return "FORM_SUBMIT";
  const cls = (attrs.match(/\bclass(?:Name)?\s*=\s*["']([^"']*)["']/i) || [, ""])[1];
  if (/(^|\s)bg-primary(\s|$)/.test(cls)) return "CTA"; // `~=` token, never bg-primary/10 tints
  if (_CTA_CLASS_RE.test(cls)) return "CTA";
  if (_INVERTED_FG_RE.test(cls) && _INVERTED_BG_RE.test(cls)) return "CTA";
  // Inline background-colour heuristic — skip #-anchors and mailto (tel: already handled above).
  if (tag === "a" && (!href || /^(#|mailto:)/i.test(href))) return null;
  const style = (attrs.match(/\bstyle\s*=\s*["']([^"']*)["']/i) || [, ""])[1];
  if (style && _BG_COLOR_RE.test(style)) return "CTA";
  return null;
}

// Idempotent (skips already-stamped tags), fail-open (returns input on error).
// Works on both rendered HTML and raw JSX source: `<a>`/`<button>` opening
// tags are syntactically identical, and `class(?:Name)?` already covers JSX's
// `className`. JSX permits self-closing `<button ... />`, which never occurs
// in rendered HTML (React always emits a real close tag) — insert the stamp
// before the trailing `/`, not after, so self-closing tags stay well-formed.
export function stampConversionTriggers(html, label = "") {
  try {
    let result = "";
    let lastIndex = 0;
    _TAG_OPEN_RE.lastIndex = 0;
    let m;
    while ((m = _TAG_OPEN_RE.exec(html))) {
      const tag = m[1];
      const attrsStart = _TAG_OPEN_RE.lastIndex;
      const tagEnd = _findTagEnd(html, attrsStart);
      if (tagEnd === -1) {
        // No resolvable tag close (unterminated, or brace/quote tracking never
        // settles) — treat this one match as a non-match and keep scanning,
        // same as the old regex silently skipping a non-matching position.
        _TAG_OPEN_RE.lastIndex = attrsStart;
        continue;
      }

      const attrs = html.slice(attrsStart, tagEnd);
      const role = _conversionRole(tag, attrs);
      result += html.slice(lastIndex, m.index);
      if (!role) {
        result += html.slice(m.index, tagEnd + 1);
      } else {
        const selfClosing = /\/\s*$/.test(attrs);
        const openAttrs = selfClosing ? attrs.replace(/\s*\/\s*$/, "") : attrs;
        result += `<${tag}${openAttrs} data-conversion-trigger="${role}"${selfClosing ? " />" : ">"}`;
      }

      lastIndex = tagEnd + 1;
      _TAG_OPEN_RE.lastIndex = lastIndex;
    }
    result += html.slice(lastIndex);
    return result;
  } catch (e) {
    console.warn(`[prerender] ⚠  CTA stamping failed for ${label}: ${e.message}`);
    return html;
  }
}
