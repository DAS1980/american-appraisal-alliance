// DAS Content Publishing Pipeline — Markdown utilities (reusable, no dependencies).
//
// Deliberately small: supports the subset our editorially prepared articles
// use — front matter, #–#### headings, paragraphs, ordered/unordered lists,
// pipe tables, blockquotes, images, links, **bold**, *italic*. Raw HTML in
// the source is escaped, never passed through, so prepared articles cannot
// inject markup into the site.

/**
 * Front matter: a block between `---` lines. Each line is `key: value`.
 * Values beginning with [ { or " are parsed as JSON; everything else is a
 * plain string (trimmed).
 */
export function parseFrontMatter(src) {
  const text = src.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const line of m[1].split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const idx = line.indexOf(":");
    if (idx === -1) throw new Error(`Bad front matter line: ${line}`);
    const key = line.slice(0, idx).trim();
    const raw = line.slice(idx + 1).trim();
    data[key] = /^[[{"]/.test(raw) ? JSON.parse(raw) : raw;
  }
  return { data, body: text.slice(m[0].length) };
}

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Inline formatting. `resolveImage(src)` may return {src,width,height}. */
function inline(text, opts) {
  let s = escapeHtml(text);
  // images ![alt](src)
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, src) => imgTag(alt, src, opts));
  // links [text](href)
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    if (/^\s*(javascript|data):/i.test(href)) return label;
    const external = /^https?:\/\//i.test(href) && !(opts.siteUrl && href.startsWith(opts.siteUrl));
    return external
      ? `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`
      : `<a href="${href}">${label}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
  return s;
}

function imgTag(alt, src, opts) {
  const meta = opts.resolveImage ? opts.resolveImage(src) : null;
  const finalSrc = meta?.src ?? src;
  const dims = meta?.width ? ` width="${meta.width}" height="${meta.height}"` : "";
  return `<img src="${finalSrc}" alt="${alt}"${dims} loading="lazy" decoding="async" />`;
}

/** Convert Markdown body to HTML. */
export function markdownToHtml(md, opts = {}) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;
  const usedIds = new Set();
  const uniqueId = (base) => {
    let id = base || "section";
    let n = 2;
    while (usedIds.has(id)) id = `${base}-${n++}`;
    usedIds.add(id);
    return id;
  };

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const content = inline(h[2].trim(), opts);
      const id = level >= 2 ? ` id="${uniqueId(slugify(h[2]))}"` : "";
      out.push(`<h${level}${id}>${content}</h${level}>`);
      i++;
      continue;
    }

    // standalone image line
    const img = line.match(/^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/);
    if (img) {
      out.push(`<figure>${imgTag(escapeHtml(img[1]), img[2], opts)}</figure>`);
      i++;
      continue;
    }

    if (line.startsWith(">")) {
      const buf = [];
      while (i < lines.length && lines[i].startsWith(">")) buf.push(lines[i++].replace(/^>\s?/, ""));
      out.push(`<blockquote>${markdownToHtml(buf.join("\n"), opts)}</blockquote>`);
      continue;
    }

    if (/^\s*\|/.test(line) && i + 1 < lines.length && /^\s*\|?\s*:?-{3,}/.test(lines[i + 1])) {
      const cells = (l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const head = cells(line);
      i += 2;
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(cells(lines[i++]));
      out.push(
        "<table><thead><tr>" + head.map((c) => `<th>${inline(c, opts)}</th>`).join("") + "</tr></thead><tbody>" +
          rows.map((r) => "<tr>" + r.map((c) => `<td>${inline(c, opts)}</td>`).join("") + "</tr>").join("") +
          "</tbody></table>",
      );
      continue;
    }

    const ul = /^\s*[-*]\s+/;
    const ol = /^\s*\d+\.\s+/;
    if (ul.test(line) || ol.test(line)) {
      const ordered = ol.test(line);
      const re = ordered ? ol : ul;
      const items = [];
      while (i < lines.length && re.test(lines[i])) {
        let item = lines[i++].replace(re, "");
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !re.test(lines[i])) item += " " + lines[i++].trim();
        items.push(`<li>${inline(item, opts)}</li>`);
      }
      const tag = ordered ? "ol" : "ul";
      out.push(`<${tag}>${items.join("")}</${tag}>`);
      continue;
    }

    const para = [];
    while (
      i < lines.length && lines[i].trim() &&
      !/^(#{1,4})\s/.test(lines[i]) && !lines[i].startsWith(">") &&
      !ul.test(lines[i]) && !ol.test(lines[i]) && !/^\s*\|/.test(lines[i]) &&
      !/^!\[[^\]]*\]\([^)\s]+\)\s*$/.test(lines[i])
    ) para.push(lines[i++].trim());
    out.push(`<p>${inline(para.join(" "), opts)}</p>`);
  }
  return out.join("\n");
}

/** Plain text (for word counts, excerpts, descriptions). */
export function htmlToText(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}
