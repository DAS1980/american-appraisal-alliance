/**
 * SSR entry point for build-time pre-rendering (LPS-864).
 *
 * Used by `npm run build:ssr` → `scripts/prerender.mjs` to inject static HTML
 * into the per-page dist shells so AI crawlers can read page body content.
 *
 * Non-fatal: every renderPage / renderBlogPost call is wrapped in try/catch
 * so that components using browser APIs (window/document) fail silently and
 * are skipped rather than aborting the entire pre-render run.
 *
 * LPS-320 (Option B): listing pages render their original page component in
 * SSR — the `<BlogListing variant="section"/>` slot is injected client-side
 * via a portal (App.tsx::BlogListingPortal) which doesn't run during SSR.
 * The listing grid therefore appears post-hydration, not in pre-rendered
 * HTML. Article pages (where SEO matters most) still SSR fully via the
 * separate `renderBlogPost` export.
 */
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import { BlogArticle } from "@/components/blog/BlogArticle";
import {
  chromeCandidatePaths,
  chromeModuleKeys,
  descriptorKind,
  hasDescriptor,
  pickChromeExport,
  pickDeclaredExport,
  type ChromeDescriptor,
  type ChromeName,
} from "@/lib/blogChrome";

type PageMod = { default: React.ComponentType };

// Resolve all page components at Vite build time — no runtime scanning needed
const pageModules = import.meta.glob<PageMod>("./pages/*.tsx", { eager: true });

// LPS-1866: descriptor-declared chrome can live at any path. Eager (build-time
// only) and character-identical to App.tsx's glob so CSR and SSR share one key
// space — a divergence here is flash-then-disappear chrome.
const chromeModules = import.meta.glob<Record<string, unknown>>(
  ["./components/**/*.tsx", "!./components/ui/**"],
  { eager: true },
);

type SsrChrome =
  | { kind: "wrapper"; keys: string[]; Wrapper: React.ComponentType<{ children?: React.ReactNode }> }
  | { kind: "pair"; keys: string[]; Header: React.ComponentType; Footer: React.ComponentType }
  | { kind: "none"; keys: string[] };

/** Today's eager pair probe, for projects with no descriptor yet (F1). */
function legacySsrChrome(): SsrChrome {
  const pick = (name: ChromeName): React.ComponentType | undefined => {
    const [sectionsPath, layoutPath] = chromeCandidatePaths(name);
    const mod = chromeModules[sectionsPath] ?? chromeModules[layoutPath];
    return pickChromeExport(mod, name) as React.ComponentType | undefined;
  };
  const Header = pick("Header");
  const Footer = pick("Footer");
  // Match CSR: a missing half renders nothing rather than removing the other.
  return Header || Footer
    ? {
        kind: "pair",
        keys: ["legacy:Header", "legacy:Footer"],
        Header: Header ?? (() => null),
        Footer: Footer ?? (() => null),
      }
    : { kind: "none", keys: [] };
}

/**
 * The site's chrome for blog article pages, from the manifest descriptor. (LPS-1866)
 *
 * Mirrors App.tsx::useSiteChrome's exact shape (F1 fallback, then the
 * all-or-nothing gate: count check before presence check) — CSR and SSR MUST
 * agree, or the pre-rendered HTML and the client disagree on whether/which
 * chrome wraps the article (the flash-then-disappear class, LPS-1536).
 */
function resolveSiteChrome(raw: ChromeDescriptor | null): SsrChrome {
  // F1: absent means "not yet classified" — fall back, exactly as CSR does.
  if (!hasDescriptor(raw)) return legacySsrChrome();

  const kind = descriptorKind(raw);
  if (kind !== "wrapper" && kind !== "pair") return { kind: "none", keys: [] };

  const keys = chromeModuleKeys(raw);
  if (kind === "wrapper" && keys.length !== 1) return { kind: "none", keys: [] };
  if (kind === "pair" && keys.length !== 2) return { kind: "none", keys: [] };
  if (!keys.every((k) => chromeModules[k] !== undefined)) {
    console.warn(`[prerender] chrome_stale: descriptor module missing from the tree: ${keys.join(", ")}`);
    return { kind: "none", keys: [] };
  }

  const d = raw as ChromeDescriptor;
  if (kind === "wrapper") {
    const Comp = pickDeclaredExport(chromeModules[keys[0]], d.export ?? "", d.named === true);
    return Comp
      ? { kind: "wrapper", keys, Wrapper: Comp as React.ComponentType<{ children?: React.ReactNode }> }
      : { kind: "none", keys: [] };
  }
  const Header = pickDeclaredExport(chromeModules[keys[0]], d.header!.export, d.header!.named);
  const Footer = pickDeclaredExport(chromeModules[keys[1]], d.footer!.export, d.footer!.named);
  return Header && Footer
    ? { kind: "pair", keys, Header: Header as React.ComponentType, Footer: Footer as React.ComponentType }
    : { kind: "none", keys: [] };
}

// Marks where the article goes inside a rendered chrome template — the same
// shell-then-splice idiom as prerender.mjs's ROOT_PLACEHOLDER, so a per-project
// <Wrapper> can be cached independently of the per-post article.
const CHROME_ARTICLE_MARKER = "__LPS_CHROME_ARTICLE_MARKER_LPS1866__";

// Chrome active-nav state depends only on the page (not the post slug), so the
// rendered chrome template is identical across every article of the same blog
// page. Memoize per (kind, keys, page) — not just per page — so a project that
// somehow resolves two different chromes across pages can never serve one
// page's cached chrome to another. (LPS-1411/1866)
const chromeHtmlCache = new Map<string, string>();

/** Render one chrome piece to HTML, isolated so a throw never kills the article. */
function renderChromePiece(name: string, node: React.ReactNode, location: string): string {
  try {
    return renderToString(
      <StaticRouter location={location} basename={import.meta.env.VITE_ROUTER_BASE || '/'}>
        {node}
      </StaticRouter>
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[prerender] ${name} render failed (location="${location}"): ${msg}`);
    return "";
  }
}

/**
 * Render the resolved chrome to an HTML template with `CHROME_ARTICLE_MARKER`
 * standing in for the article, cached by the chrome's own resolved identity so
 * a blog with N posts renders its chrome once instead of N times.
 */
function renderChromeTemplate(chrome: SsrChrome, location: string, pageId: string): string {
  if (chrome.kind === "none") return "";
  const cacheKey = `${chrome.kind}::${chrome.keys.join("|")}::${pageId}`;
  const cached = chromeHtmlCache.get(cacheKey);
  if (cached !== undefined) return cached;

  let html = "";
  if (chrome.kind === "wrapper") {
    html = renderChromePiece("Wrapper", <chrome.Wrapper>{CHROME_ARTICLE_MARKER}</chrome.Wrapper>, location);
  } else {
    const header = renderChromePiece("Header", <chrome.Header />, location);
    const footer = renderChromePiece("Footer", <chrome.Footer />, location);
    // Match CSR: neither half rendering means no chrome; one failing keeps the other.
    html = !header && !footer
      ? ""
      : `<div class="min-h-screen flex flex-col">${header}<main class="flex-1">${CHROME_ARTICLE_MARKER}</main>${footer}</div>`;
  }
  // A wrapper can pass Django's static {children} check yet not emit the marker at
  // runtime. The splice is a plain string replace: 0 drops the article, 2+ fills only the
  // first. Fail open to the bare article instead.
  if (html) {
    const markerCount = html.split(CHROME_ARTICLE_MARKER).length - 1;
    if (markerCount !== 1) {
      console.warn(
        `[prerender] chrome_no_slot: rendered chrome has ${markerCount} article slots (expected 1) for page="${pageId}", kind="${chrome.kind}"`,
      );
      html = "";
    }
  }
  chromeHtmlCache.set(cacheKey, html);
  return html;
}

/**
 * Render a page component to static HTML.
 *
 * @param slug     URL slug — "" for home, "about" for /about
 * @param filePath Optional manifest filePath, e.g. "src/pages/About.tsx"
 * @returns Rendered HTML string, or "" if component not found / render fails
 */
export function renderPage(slug: string, filePath?: string): string {
  let mod: PageMod | undefined;

  // 1. Prefer the manifest's explicit file path (most reliable)
  if (filePath) {
    const key = "./" + filePath.replace(/^src\//, "");
    mod = pageModules[key];
  }

  // 2. Fall back to deriving the module key from the slug
  if (!mod) {
    if (!slug) {
      // Home page is always Index.tsx
      mod = pageModules["./pages/Index.tsx"];
    } else {
      // "about-us" → "AboutUs", "blog-post" → "BlogPost"
      const pascal = slug
        .split(/[-_]/)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join("");
      mod = pageModules[`./pages/${pascal}.tsx`];
    }
  }

  if (!mod?.default) return "";

  const Comp = mod.default;
  const location = slug ? `/${slug}` : "/";

  try {
    return renderToString(
      <StaticRouter location={location} basename={import.meta.env.VITE_ROUTER_BASE || '/'}>
        <Comp />
      </StaticRouter>
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[prerender] renderToString failed (slug="${slug}"): ${msg}`);
    return "";
  }
}

/**
 * Render a single blog article to static HTML. (LPS-320)
 *
 * Location URL pattern matches BlogPost.post_url on the Django side:
 *   home:        /blog/<post-slug>
 *   blog hub:    /<page-slug>/<post-slug>          (LPS-1704 — no /blog infix)
 *   named page:  /<page-slug>/blog/<post-slug>
 *
 * Called once per post by `scripts/prerender.mjs` so AI crawlers receive
 * fully rendered article HTML without executing JavaScript.
 */
export function renderBlogPost(
  pageId: string,
  pageSlug: string,
  pageName: string,
  postSlug: string,
  chromeDescriptor: ChromeDescriptor | null = null,
): string {
  // LPS-1704: the hub is identified by pageId, not the literal slug — a renamed
  // hub ("Resources") hosts posts directly under it. Must stay in lockstep with
  // Django's BlogPost.blog_post_relpath and App.tsx's blogArticlePaths().
  const isBlogHub = pageId?.toLowerCase() === 'blog' || pageSlug === 'blog';
  const location = pageSlug
    ? `/${pageSlug}/${isBlogHub ? '' : 'blog/'}${postSlug}`
    : `/blog/${postSlug}`;
  let article = "";
  try {
    article = renderToString(
      <StaticRouter location={location} basename={import.meta.env.VITE_ROUTER_BASE || '/'}>
        <BlogArticle
          pageId={pageId}
          pageSlug={pageSlug}
          pageName={pageName}
          postSlug={postSlug}
        />
      </StaticRouter>
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[prerender] renderBlogPost failed (location="${location}"): ${msg}`);
    return "";
  }
  if (!article) return "";

  // LPS-1411/1866: wrap the article in the site's chrome from the SAME descriptor CSR
  // reads, so crawlers and the pre-JS paint match every other page. Memoized by resolved
  // chrome identity plus page, since chrome is post-invariant.
  const chrome = resolveSiteChrome(chromeDescriptor);
  if (chrome.kind === "none") return article;
  const template = renderChromeTemplate(chrome, location, pageId);
  if (!template) return article;
  return template.replace(CHROME_ARTICLE_MARKER, () => article);
}
