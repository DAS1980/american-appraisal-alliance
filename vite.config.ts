/**
 * Vite Configuration for Landing Page Studio Preview Container
 * 
 * Supports both:
 * - Development: SPA mode with React Router for fast HMR
 * - Production: MPA mode with per-page HTML for SEO optimization
 * 
 * @see https://vitejs.dev/config/
 * @build 2026-02-02-multipage-seo
 */
import { defineConfig, Plugin, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import { stampConversionTriggers } from "./scripts/lib/conversion-stamp.mjs";
import { buildPublicUrl } from "./scripts/lib/url.mjs";
import { injectDevScripts } from "./scripts/dev-html-inject.mjs";
import { isPageNavigation, renderPageNotFound, resolveStaticPage } from "./scripts/lib/static-page-resolve.mjs";

// Types for pages.manifest.json
interface PageSeo {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
  noindex: boolean;
  structuredDataType: string;
  structuredData: Record<string, unknown> | null;
}

interface ManifestPage {
  id: string;
  name: string;
  slug: string;
  isHome: boolean;
  seo: PageSeo;
  sections: string[];
  inNavigation: boolean;
  filePath?: string;
  pageId?: string;
  sectionDetails?: Record<string, {
    headline?: string;
    cta_text?: string;
    anchor?: string;
  }>;
}

interface SectionRegistryEntry {
  file?: string;
  description?: string;
  props?: string[];
  usedOn?: string[];
}

interface PagesManifest {
  site: {
    name: string;
    domain: string;
    language: string;
    defaultSeo?: {
      titleTemplate?: string;
      ogImage?: string;
    };
  };
  pages: ManifestPage[];
  navigation: {
    header: string[];
    footer: string[];
  };
  sections: Record<string, SectionRegistryEntry>;
}

/**
 * Get the site domain from various sources:
 * 1. SITE_DOMAIN env var (set by agent at publish time for sitemap/canonical)
 * 2. Manifest domain when already a full URL (agent wrote custom/preview domain; prefer over PREVIEW_URL)
 * 3. PREVIEW_URL env var (auto-generated preview URL)
 * 4. Manifest domain (legacy/example.com excluded)
 * 5. Empty string (skip canonical/og:url generation)
 */
function getSiteDomain(manifestDomain: string): string {
  // Priority 1: Domain from environment (agent sets this at build-and-publish time)
  if (process.env.SITE_DOMAIN) {
    return process.env.SITE_DOMAIN.replace(/\/$/, ''); // Remove trailing slash
  }

  // Priority 2: Manifest already has a full URL (e.g. agent wrote custom domain) — use it so PREVIEW_URL doesn't override
  const trimmed = (manifestDomain || '').trim();
  if (trimmed.startsWith('https://') && !trimmed.includes('example.com')) {
    return trimmed.replace(/\/$/, '');
  }

  // Priority 3: Preview URL from environment
  if (process.env.PREVIEW_URL) {
    return process.env.PREVIEW_URL.replace(/\/$/, '');
  }

  // Priority 4: Domain from manifest (if set and not example.com)
  if (trimmed && !trimmed.includes('example.com')) {
    return trimmed.replace(/\/$/, '');
  }

  // No valid domain - skip canonical/og:url generation
  return '';
}

/**
 * LPS-1701: is this one of our own preview hosts rather than the customer's domain?
 *
 * Matched on hostname, not substring, so `notpreview.<suffix>.evil.com` cannot
 * pass as one.
 */
function isPreviewDomain(url: string): boolean {
  if (!url) return false;
  const previewSuffix = (process.env.PUBLIC_PREVIEW_DOMAIN || 'preview.builder.searchatlas.com')
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '');
  try {
    const host = new URL(url.includes('://') ? url : `https://${url}`).hostname;
    return host === previewSuffix || host.endsWith(`.${previewSuffix}`);
  } catch {
    return false;
  }
}

/**
 * Load pages.manifest.json with fallback defaults
 */
function loadManifest(): PagesManifest {
  const manifestPath = path.resolve(__dirname, './pages.manifest.json');
  
  try {
    if (fs.existsSync(manifestPath)) {
      const content = fs.readFileSync(manifestPath, 'utf-8');
      const manifest = JSON.parse(content) as Partial<PagesManifest>;

      // Ensure required fields exist (manifest may be missing site/pages/navigation/sections)
      if (!manifest.site) {
        manifest.site = { name: 'Website', domain: '', language: 'en' };
      }
      if (!manifest.pages || !Array.isArray(manifest.pages)) {
        manifest.pages = [];
      }
      if (!manifest.navigation) {
        manifest.navigation = { header: [], footer: [] };
      }
      if (!manifest.sections) {
        manifest.sections = {};
      }

      // Override domain with environment-based domain
      manifest.site.domain = getSiteDomain(manifest.site.domain || '');

      return manifest as PagesManifest;
    }
  } catch (error) {
    console.warn('[vite] Failed to read pages.manifest.json:', error);
  }
  
  // Default manifest for backwards compatibility
  return {
    site: { name: 'Website', domain: getSiteDomain(''), language: 'en' },
    pages: [{
      id: 'home',
      name: 'Home',
      slug: '',
      isHome: true,
      seo: {
        title: 'Welcome',
        description: '',
        keywords: [],
        ogImage: '',
        canonicalUrl: '',
        noindex: false,
        structuredDataType: '',
        structuredData: null,
      },
      sections: [],
      inNavigation: true,
    }],
    navigation: { header: ['home'], footer: ['home'] },
    sections: {},
  };
}

// LPS-19: read-only scan for the Hero's first hardcoded image URL so the
// browser starts the LCP fetch in parallel with JS parsing. Returns null
// when the Hero file isn't found or the URL isn't a literal — preload is
// silently skipped (degraded, not broken).
function findHeroImageUrl(
  page: ManifestPage,
  manifest: PagesManifest
): string | null {
  const heroName = page.sections?.[0];
  if (!heroName) return null;
  const sectionEntry = (manifest.sections as Record<string, { file?: string }>)?.[heroName];
  const filePath = sectionEntry?.file;
  if (!filePath) return null;
  try {
    const abs = path.resolve(__dirname, filePath);
    if (!fs.existsSync(abs)) return null;
    const content = fs.readFileSync(abs, 'utf-8');
    const m = content.match(/<img\b[^>]*\bsrc\s*=\s*["'](https?:\/\/[^"']+)["']/i);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

/**
 * LPS-321 — HTML-attribute escape used by every interpolated value in the
 * head. Covers `&`, `<`, `>`, `"`, `'` so user-controlled fields (post title,
 * page name, description) can never break the attribute or inject markup.
 *
 * Page-side head emission used to interpolate values directly; the
 * refactor in `renderSeoHead` routes everything through this helper so
 * the page path picks up the same hardening as the new blog path.
 */
function htmlAttr(value: string | number | undefined | null): string {
  if (value === undefined || value === null) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * LPS-321 — emit a JSON-LD `<script>` block with the only escape that can
 * actually break us: a literal `</script` inside a user-controlled value
 * would close the script tag and inject markup.
 */
function jsonLdScript(payload: Record<string, unknown>): string {
  const json = JSON.stringify(payload).replace(/<\/script/gi, '<\\/script');
  return `<script type="application/ld+json">${json}</script>`;
}

/**
 * Shape of the data passed to `renderSeoHead`. Both the page branch and the
 * LPS-321 blog-post branch build one of these so they share the same
 * cleanup+inject path and don't drift on Twitter Cards / OG fallback /
 * escaping rules.
 */
interface SeoData {
  title: string;
  description: string;
  canonicalUrl: string | null;
  ogType: 'website' | 'article';
  ogImage: string | null;
  noindex: boolean;
  /** Optional `<meta name="keywords">` content — page branch only. */
  keywords?: string[];
  /** LPS-19 LCP preload — page branch only (posts have no Hero). */
  preloadImage?: string | null;
  /** Array of JSON-LD payload objects, rendered into one `<script>` each. */
  jsonLd: Array<Record<string, unknown>>;
}

/** Resolve OG image to an absolute URL, supporting `/path` site-rooted forms. */
function resolveOgImage(image: string | null | undefined, baseUrl: string): string | null {
  if (!image) return null;
  return image.startsWith('http') ? image : `${baseUrl}${image}`;
}

/**
 * Pure HTML assembly. Takes a fully-resolved SeoData and emits the head
 * fragment. Both the page branch and the LPS-321 blog-post branch route
 * through this helper.
 */
function renderSeoHead(seo: SeoData): string {
  const parts: string[] = [];

  parts.push(`<title>${htmlAttr(seo.title)}</title>`);
  parts.push(`<meta name="description" content="${htmlAttr(seo.description)}" />`);

  if (seo.keywords && seo.keywords.length > 0) {
    parts.push(`<meta name="keywords" content="${htmlAttr(seo.keywords.join(', '))}" />`);
  }

  if (seo.canonicalUrl) {
    parts.push(`<link rel="canonical" href="${htmlAttr(seo.canonicalUrl)}" />`);
  }

  if (seo.preloadImage) {
    parts.push(
      `<link rel="preload" as="image" href="${htmlAttr(seo.preloadImage)}" fetchpriority="high" />`
    );
  }

  if (seo.noindex) {
    parts.push('<meta name="robots" content="noindex, nofollow" />');
  }

  // Open Graph
  parts.push(`<meta property="og:title" content="${htmlAttr(seo.title)}" />`);
  if (seo.description) {
    parts.push(`<meta property="og:description" content="${htmlAttr(seo.description)}" />`);
  }
  parts.push(`<meta property="og:type" content="${htmlAttr(seo.ogType)}" />`);
  if (seo.canonicalUrl) {
    parts.push(`<meta property="og:url" content="${htmlAttr(seo.canonicalUrl)}" />`);
  }
  if (seo.ogImage) {
    parts.push(`<meta property="og:image" content="${htmlAttr(seo.ogImage)}" />`);
  }

  // Twitter Card.
  //
  // LPS-321 contract note: the ticket's "out of scope" line for Twitter/X
  // Card tags means "don't build a separate Twitter implementation" — not
  // "strip them off". This shared emitter is used by both the page and
  // blog branches, so blog posts pick up the same tags pages already had.
  // `twitter:image` falls through `seo.ogImage` (featured image for posts,
  // og fallback for pages). Removing them on the blog path would require
  // a branch-aware flag here AND would regress page parity.
  parts.push('<meta name="twitter:card" content="summary_large_image" />');
  parts.push(`<meta name="twitter:title" content="${htmlAttr(seo.title)}" />`);
  if (seo.description) {
    parts.push(`<meta name="twitter:description" content="${htmlAttr(seo.description)}" />`);
  }
  if (seo.ogImage) {
    parts.push(`<meta name="twitter:image" content="${htmlAttr(seo.ogImage)}" />`);
  }

  for (const payload of seo.jsonLd) {
    parts.push(jsonLdScript(payload));
  }

  return parts.join('\n    ');
}

/**
 * Generate HTML <head> content for a page (data resolution → renderSeoHead).
 */
function generateHeadContent(
  page: ManifestPage,
  manifest: PagesManifest
): string {
  const seo = page.seo;
  const site = manifest.site;
  const baseUrl = site.domain || '';
  const pageUrl = buildPublicUrl(baseUrl, page.isHome ? '' : page.slug);

  const title = seo.title || page.name;
  // Meta description — always emit one so Lighthouse meta-description passes.
  const descriptionContent = seo.description ||
    `${page.name}${site.name ? ` — ${site.name}` : ''}`;

  // Canonical URL: explicit override > derived from baseUrl > none.
  // LPS-1701: never derive one from a preview host. It names a staging URL as
  // the real page, and survives into the published site once a custom domain is
  // attached. An explicit per-page override still wins — that is the customer's
  // own choice, not something we inferred.
  let canonical: string | null = null;
  if (seo.canonicalUrl) canonical = seo.canonicalUrl;
  else if (baseUrl && !isPreviewDomain(baseUrl)) canonical = pageUrl;

  const ogImage = resolveOgImage(seo.ogImage || site.defaultSeo?.ogImage, baseUrl);

  // Structured data (existing manifest-driven JSON-LD).
  const structuredJson = buildStructuredDataJson(page, manifest);

  const data: SeoData = {
    title,
    description: descriptionContent,
    canonicalUrl: canonical,
    ogType: 'website',
    ogImage,
    noindex: !!seo.noindex,
    keywords: seo.keywords,
    preloadImage: findHeroImageUrl(page, manifest),
    jsonLd: structuredJson ? [structuredJson] : [],
  };

  return renderSeoHead(data);
}

/**
 * Build the JSON-LD payload for a manifest page (returns the object, not the
 * wrapped `<script>` tag). The wrapping + `</script` escape now lives in
 * `jsonLdScript()`. Replaces the old `generateStructuredData` which mixed
 * payload construction with HTML emission.
 */
function buildStructuredDataJson(
  page: ManifestPage,
  manifest: PagesManifest
): Record<string, unknown> | null {
  if (!page.seo.structuredData && !page.seo.structuredDataType) {
    return null;
  }
  if (page.seo.structuredData) {
    return page.seo.structuredData;
  }
  const baseUrl = manifest.site.domain;
  const pageUrl = baseUrl ? buildPublicUrl(baseUrl, page.isHome ? '' : page.slug) : undefined;
  switch (page.seo.structuredDataType) {
    case 'WebSite':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: manifest.site.name,
        ...(baseUrl && { url: baseUrl }),
      };
    case 'Organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: manifest.site.name,
        ...(baseUrl && { url: baseUrl }),
      };
    case 'LocalBusiness':
      return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: manifest.site.name,
        ...(baseUrl && { url: baseUrl }),
      };
    case 'FAQPage':
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [],
      };
    default:
      return {
        '@context': 'https://schema.org',
        '@type': page.seo.structuredDataType || 'WebPage',
        name: page.seo.title,
        ...(pageUrl && { url: pageUrl }),
      };
  }
}

/**
 * LPS-321 — locate the blog post whose pre-rendered HTML shell sits at
 * ``relPath`` (e.g. ``"services/team/blog/why-x"``). Matches against the
 * server-provided ``post.post_path`` so we never re-parse slugs and don't
 * trip on edge cases (page slug "blog", nested page slugs, post slug
 * colliding with a sibling page slug).
 *
 * Uses a WeakMap-cached `post_path → post` index so the cost is O(1) per
 * lookup across the (~N pages × M posts) calls the seo plugin makes per
 * build, instead of O(M) per HTML entry. Built once per `BlogJson`
 * instance.
 */
const _BLOG_POST_INDEX_CACHE = new WeakMap<BlogJson, Map<string, BlogJsonPost>>();

function getBlogPostIndex(blog: BlogJson): Map<string, BlogJsonPost> {
  let index = _BLOG_POST_INDEX_CACHE.get(blog);
  if (!index) {
    index = new Map();
    for (const post of blog.posts) {
      // post.post_path always starts with `/`; defensive in case Django
      // ever regresses, mirror the same fallback the lookup uses.
      // LPS-1871: post_path is now the public trailing-slash form, but this
      // index is a lookup key, not a displayed URL — strip the trailing
      // slash too (findBlogPostByRelPath does the same) so a slashed
      // post_path still matches the bare relPath derived from a real
      // on-disk `.../index.html` file path.
      const withLeadingSlash = post.post_path.startsWith('/')
        ? post.post_path
        : `/${post.post_path}`;
      const key = withLeadingSlash.replace(/\/+$/, '') || '/';
      index.set(key, post);
    }
    _BLOG_POST_INDEX_CACHE.set(blog, index);
  }
  return index;
}

function findBlogPostByRelPath(relPath: string, blog: BlogJson | null): BlogJsonPost | null {
  if (!blog) return null;
  // post.post_path always starts with `/`; relPath never does.
  const withLeadingSlash = relPath.startsWith('/') ? relPath : `/${relPath}`;
  const normalized = withLeadingSlash.replace(/\/+$/, '') || '/';
  return getBlogPostIndex(blog).get(normalized) ?? null;
}

/**
 * LPS-321 — resolve the meta description for a blog post with a
 * backward-compatible fallback chain:
 *
 *   1. `meta_description` (server-computed, deterministic 160-char strip)
 *   2. `excerpt` (user-editable summary) — used only when meta_description
 *      is missing, which happens during the rollout window where the
 *      boilerplate ships before Django does
 *   3. `body_html` stripped of tags + entity-decoded + whitespace-collapsed
 *      and truncated at a word boundary at 160 chars
 *
 * Each candidate is trimmed and rejected if empty. Mirrors Django's
 * `derive_meta_description` (see `blog_html_processor.py`) so the two
 * sides converge on the same output when both run. Pure function — safe
 * to call at build time.
 */
const _BLOG_DESC_TAG_RE = /<[^>]+>/g;
const _BLOG_DESC_WHITESPACE_RE = /\s+/g;
const _BLOG_DESC_NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};
function _decodeEntities(text: string): string {
  // Numeric entities (&#NNN; and &#xHHH;) covered first; named entities last.
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-zA-Z]+);/g, (m, name) =>
      _BLOG_DESC_NAMED_ENTITIES[name.toLowerCase()] ?? m
    );
}
function _stripBodyToText(bodyHtml: string, maxChars = 160): string {
  let text = bodyHtml.replace(_BLOG_DESC_TAG_RE, ' ');
  text = _decodeEntities(text);
  text = text.replace(_BLOG_DESC_WHITESPACE_RE, ' ').trim();
  if (text.length <= maxChars) return text;
  const head = text.slice(0, maxChars);
  const cut = head.lastIndexOf(' ');
  return (cut > 0 ? head.slice(0, cut) : head).trimEnd();
}
function resolveBlogDescription(post: BlogJsonPost): string {
  const md = (post.meta_description ?? '').trim();
  if (md) return md;
  const ex = (post.excerpt ?? '').trim();
  if (ex) return ex;
  return _stripBodyToText(post.body_html ?? '');
}

/**
 * LPS-321 — build the blog branch's SeoData. Inputs: the blog post + its
 * owning page meta from `pages_with_blog` + the manifest. The owning-page
 * meta is needed for the BreadcrumbList middle step.
 */
function buildBlogPostSeoData(
  post: BlogJsonPost,
  pageMeta: { page_slug: string; page_name: string } | undefined,
  manifest: PagesManifest
): SeoData {
  const site = manifest.site;
  const baseUrl = site.domain || '';
  // LPS-1701: same rule as pages — no canonical (and no JSON-LD @id) off a
  // preview host. Mirrors the existing empty-baseUrl path, which already yields null.
  const canonical =
    baseUrl && !isPreviewDomain(baseUrl)
      ? buildPublicUrl(baseUrl, post.post_path)
      : null;

  const title = site.name ? `${post.title} | ${site.name}` : post.title;
  // LPS-321 — fallback chain (meta_description → excerpt → stripped body)
  // so older Django responses that don't ship meta_description still
  // produce a useful <meta description> / og:description / JSON-LD
  // description during the rollout window.
  const description = resolveBlogDescription(post);

  // og:image — featured image first, fall back to site default. Preserves
  // the page branch's fallback chain so blog posts don't regress.
  const ogImage = resolveOgImage(
    post.featured_image || site.defaultSeo?.ogImage || null,
    baseUrl
  );

  // BlogPosting JSON-LD
  const blogPosting: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
  };
  if (post.featured_image) blogPosting.image = post.featured_image;
  if (post.published_at) blogPosting.datePublished = post.published_at;
  if (post.updated_at) blogPosting.dateModified = post.updated_at;
  if (post.author) {
    blogPosting.author = { '@type': 'Person', name: post.author };
  }
  if (canonical) {
    blogPosting.mainEntityOfPage = { '@type': 'WebPage', '@id': canonical };
  }

  // BreadcrumbList — Home > [Page] > Article. Skip the middle step for
  // home-blog posts (page_slug is empty there).
  const items: Array<Record<string, unknown>> = [];
  let position = 1;
  items.push({
    '@type': 'ListItem',
    position: position++,
    name: 'Home',
    item: baseUrl ? `${baseUrl}/` : '/',
  });
  if (pageMeta && pageMeta.page_slug) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: pageMeta.page_name || pageMeta.page_slug,
      item: baseUrl ? buildPublicUrl(baseUrl, pageMeta.page_slug) : `/${pageMeta.page_slug}/`,
    });
  }
  if (canonical) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: post.title,
      item: canonical,
    });
  }
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };

  return {
    title,
    description,
    canonicalUrl: canonical,
    ogType: 'article',
    ogImage,
    noindex: !!post.page_noindex,
    jsonLd: [blogPosting, breadcrumbList],
  };
}

/**
 * Plugin to inject SEO metadata into HTML during build.
 * 
 * For development (SPA mode): Only applies to index.html
 * For production (MPA mode): Applies to each page's HTML
 * 
 * IMPORTANT: In development, we read the manifest fresh on each request
 * because the agent may update pages.manifest.json after Vite starts.
 */
function seoInjectorPlugin(initialManifest: PagesManifest, isDev: boolean): Plugin {
  return {
    name: 'seo-injector',
    transformIndexHtml(html, ctx) {
      // In development, always read fresh manifest (agent may have updated it)
      // In production build, use the cached manifest for consistency
      const manifest = isDev ? loadManifest() : initialManifest;
      
      // Determine which page this HTML is for
      let page: ManifestPage | undefined;
      // LPS-321 — when ctx.filename matches a blog-post HTML shell we hand
      // off to the blog branch and skip the manifest-page lookup.
      let blogSeo: SeoData | null = null;

      if (ctx.filename) {
        // Normalize the path under the project root so a single forward-slash
        // form drives both blog detection and page lookup. Windows paths
        // would otherwise mismatch the post_path comparison.
        const relativePath = path.relative(__dirname, ctx.filename).replace(/\\/g, '/');

        // Strip trailing /index.html → "<page-slug>/blog/<post-slug>" or just
        // "<page-slug>". Empty string for the home page.
        const relWithoutIndex = relativePath.endsWith('/index.html')
          ? relativePath.slice(0, -'/index.html'.length)
          : relativePath;

        // LPS-321 — try to match this HTML shell to a blog post by full
        // `post_path`. This avoids parsing slugs and survives nested page
        // slugs (`services/team`), page slugs literally named `blog`, and
        // post slugs that collide with a sibling page slug.
        const blog = readBlogJson();
        const post = findBlogPostByRelPath(relWithoutIndex, blog);
        if (post) {
          const pageMeta = blog?.pages_with_blog.find(p => p.page_id === post.page_id);
          blogSeo = buildBlogPostSeoData(post, pageMeta, manifest);
        } else {
          // Not a blog post — original manifest-page resolution by dir name.
          const dirName = relWithoutIndex; // already path-with-no-index-suffix
          const pagePath = dirName === '' ? '' : dirName;
          page = manifest.pages.find(p =>
            p.slug === pagePath || (p.isHome && pagePath === '')
          ) || manifest.pages[0];
        }
      } else {
        // Default to home page
        page = manifest.pages.find(p => p.isHome) || manifest.pages[0];
      }

      if (!blogSeo && !page) return html;

      // Generate SEO content from whichever branch matched.
      const seoContent = blogSeo
        ? renderSeoHead(blogSeo)
        : generateHeadContent(page!, manifest);
      
      // =================================================================
      // CLEANUP: Remove all SEO-related content written by the agent
      // The agent may write SEO tags directly to index.html, but we
      // control all SEO through pages.manifest.json for consistency.
      // =================================================================
      
      // Remove SEO meta tags
      html = html.replace(/<title>.*?<\/title>/gi, '');
      html = html.replace(/<meta name="description"[^>]*>/gi, '');
      html = html.replace(/<meta name="keywords"[^>]*>/gi, '');
      html = html.replace(/<meta name="robots"[^>]*>/gi, '');
      html = html.replace(/<meta property="og:[^"]*"[^>]*>/gi, '');
      html = html.replace(/<meta name="twitter:[^"]*"[^>]*>/gi, '');
      html = html.replace(/<link rel="canonical"[^>]*>/gi, '');
      html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
      
      // Remove agent-written comment sections (leaves empty lines, cleaned up below)
      // These are common patterns agents use when organizing SEO in index.html
      html = html.replace(/<!--\s*Title and Description\s*-->/gi, '');
      html = html.replace(/<!--\s*Open Graph\s*-->/gi, '');
      html = html.replace(/<!--\s*Twitter Card\s*-->/gi, '');
      html = html.replace(/<!--\s*SEO\s*-->/gi, '');
      html = html.replace(/<!--\s*SEO Metadata\s*-->/gi, '');
      html = html.replace(/<!--\s*Meta Tags\s*-->/gi, '');
      html = html.replace(/<!--\s*Canonical\s*-->/gi, '');
      html = html.replace(/<!--\s*Structured Data\s*-->/gi, '');
      
      // Clean up multiple consecutive blank lines (from removed tags/comments)
      html = html.replace(/(\n\s*){3,}/g, '\n\n    ');
      
      // Inject SEO content before </head>
      html = html.replace(
        '</head>',
        `<!-- SEO Metadata -->\n    ${seoContent}\n  </head>`
      );
      
      return html;
    },
  };
}

/**
 * Plugin to inject custom embeddings (analytics, tracking) into HTML.
 */
function embeddingsInjectorPlugin(): Plugin {
  return {
    name: 'embeddings-injector',
    transformIndexHtml(html) {
      const embeddingsPath = path.resolve(__dirname, './src/embeddings.json');
      let embeddings = { header: '', footer: '' };
      
      try {
        if (fs.existsSync(embeddingsPath)) {
          const content = fs.readFileSync(embeddingsPath, 'utf-8');
          embeddings = JSON.parse(content);
        }
      } catch (error) {
        console.warn('[embeddings-injector] Failed to read embeddings.json:', error);
      }
      
      // Normalize external <script src="..."> tags to non-blocking by adding defer
      // if they don't already have defer or async
      const normalizeScripts = (snippet: string): string => {
        return snippet.replace(
          /<script\b((?![^>]*\b(?:defer|async)\b)[^>]*)\bsrc\s*=/gi,
          '<script defer$1src='
        );
      };

      if (embeddings.header) {
        html = html.replace(
          '</head>',
          `  <!-- Custom Header Embeddings -->\n  ${normalizeScripts(embeddings.header)}\n  </head>`
        );
      }

      if (embeddings.footer) {
        html = html.replace(
          '</body>',
          `  <!-- Custom Footer Embeddings -->\n  ${normalizeScripts(embeddings.footer)}\n  </body>`
        );
      }

      return html;
    },
  };
}

// LPS-1196: stamps JSX source (not just rendered HTML) so data-conversion-trigger
// survives createRoot()'s client remount. enforce: 'pre' runs before react-swc.
function conversionTriggerStampPlugin(): Plugin {
  return {
    name: 'lps-conversion-trigger-stamp',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.tsx')) return null;
      return stampConversionTriggers(code, id);
    },
  };
}

/**
 * LPS-321 — fail-open reader for src/data/blog.json. Returns null when the
 * file is missing or malformed so callers degrade to the no-blog code path.
 */
interface BlogJsonPost {
  id: string;
  page_id: string;
  page_slug: string;
  slug: string;
  title: string;
  excerpt: string;
  body_html: string;
  category: string;
  read_time_minutes: number;
  featured_image: string;
  author: string;
  tags: string[];
  published_at: string | null;
  updated_at?: string | null;
  meta_description?: string;
  page_noindex?: boolean;
  post_path: string;
}
interface BlogJson {
  version: number;
  pages_with_blog: Array<{
    page_id: string;
    page_slug: string;
    page_name: string;
    post_count: number;
  }>;
  posts: BlogJsonPost[];
}
function readBlogJson(): BlogJson | null {
  const blogJsonPath = path.resolve(__dirname, 'src/data/blog.json');
  if (!fs.existsSync(blogJsonPath)) return null;
  try {
    const parsed = JSON.parse(fs.readFileSync(blogJsonPath, 'utf-8'));
    if (!parsed || !Array.isArray(parsed.posts)) return null;
    return parsed as BlogJson;
  } catch (e) {
    console.warn(
      `[blog] Failed to read src/data/blog.json (degrading): ${(e as Error).message}`
    );
    return null;
  }
}

// LPS-321 — anything updated within this window gets `<changefreq>weekly</…>`;
// older entries get `monthly`. Mirrors Django's _RECENT_BLOG_POST_WINDOW so
// the two sitemap generators emit identical entries for the same project state.
const BLOG_POST_RECENT_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Plugin to generate sitemap.xml and robots.txt during build.
 */
function sitemapPlugin(manifest: PagesManifest): Plugin {
  return {
    name: 'sitemap-generator',
    generateBundle() {
      const baseUrl = manifest.site.domain;
      if (!baseUrl) {
        console.log('[sitemap] Skipping sitemap generation - no domain configured');
        return;
      }

      // Generate sitemap.xml
      const urls = manifest.pages
        .filter(p => !p.seo.noindex)
        .map(page => {
          const loc = buildPublicUrl(baseUrl, page.isHome ? '' : page.slug);
          const priority = page.isHome ? '1.0' : '0.8';
          return `  <url>
    <loc>${loc}</loc>
    <priority>${priority}</priority>
    <changefreq>weekly</changefreq>
  </url>`;
        })
        .join('\n');

      // LPS-321 — published blog post entries. Inherits Page.noindex via
      // post.page_noindex (set server-side). post.post_path already carries
      // the correct page prefix, so no slug assembly here.
      const blog = readBlogJson();
      const now = Date.now();
      const blogUrls = (blog?.posts ?? [])
        .filter(p => !p.page_noindex)
        .map(post => {
          const loc = buildPublicUrl(baseUrl, post.post_path);
          // LPS-321 — emit the source ISO timestamp verbatim. Round-tripping
          // through `new Date(ts).toISOString()` would normalize to UTC and
          // shift the calendar day for posts updated near midnight in a
          // non-UTC offset (Sitemaps.org allows full W3C datetime, so
          // retaining the offset is both more accurate and matches Django's
          // sitemap_service emission). `recent` still uses the parsed
          // millisecond timestamp — that comparison is timezone-agnostic.
          const lastModSource = post.updated_at || post.published_at;
          let lastMod: string | null = null;
          let recent = true;
          if (lastModSource) {
            const ts = Date.parse(lastModSource);
            if (!Number.isNaN(ts)) {
              lastMod = lastModSource;
              recent = (now - ts) <= BLOG_POST_RECENT_WINDOW_MS;
            }
          }
          const changefreq = recent ? 'weekly' : 'monthly';
          const lastModLine = lastMod ? `\n    <lastmod>${lastMod}</lastmod>` : '';
          return `  <url>
    <loc>${loc}</loc>${lastModLine}
    <changefreq>${changefreq}</changefreq>
    <priority>0.6</priority>
  </url>`;
        })
        .join('\n');

      const allUrls = blogUrls ? `${urls}\n${blogUrls}` : urls;

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls}
</urlset>`;

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: sitemap,
      });

      // Generate robots.txt
      const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
LLMs-txt: ${baseUrl}/llms.txt`;

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: robots,
      });

      const pageCount = manifest.pages.filter(p => !p.seo.noindex).length;
      const postCount = (blog?.posts ?? []).filter(p => !p.page_noindex).length;
      console.log(
        `[sitemap] Generated sitemap.xml with ${pageCount} pages` +
          (postCount > 0 ? ` + ${postCount} blog posts` : '')
      );
    },
  };
}

/**
 * Plugin to generate llms.txt during build.
 * Provides a markdown-based summary of the site for AI crawlers and LLM-based search engines.
 * @see https://llmstxt.org/
 */
function cleanMarkdownText(value: unknown): string {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
}

function getPageUrl(baseUrl: string, page: ManifestPage): string {
  return buildPublicUrl(baseUrl, page.isHome ? '' : page.slug);
}

function getSectionSummaries(page: ManifestPage, manifest: PagesManifest): string[] {
  const summaries: string[] = [];

  for (const rawName of page.sections || []) {
    const name = cleanMarkdownText(rawName);
    if (!name) continue;

    const registryEntry = manifest.sections?.[name];
    const detailEntry = page.sectionDetails?.[name];
    const detail =
      cleanMarkdownText(registryEntry?.description) ||
      cleanMarkdownText(detailEntry?.headline) ||
      cleanMarkdownText(detailEntry?.cta_text);

    summaries.push(
      detail && detail.toLowerCase() !== name.toLowerCase()
        ? `${name}: ${detail}`
        : name
    );
  }

  return summaries;
}

function buildLlmsTxt(manifest: PagesManifest, baseUrl: string): string {
  const lines: string[] = [];
  const siteName = cleanMarkdownText(manifest.site.name) || 'Website';

  lines.push(`# ${siteName}`);
  lines.push('');

  const homePage = manifest.pages.find(p => p.isHome);
  const homeDescription = cleanMarkdownText(homePage?.seo?.description);
  if (homeDescription) {
    lines.push(`> ${homeDescription}`);
    lines.push('');
  }

  lines.push('## Pages');
  lines.push('');

  const topics: string[] = [];
  const seenTopics = new Set<string>();

  for (const page of manifest.pages) {
    if (page.seo?.noindex) continue;

    const pageUrl = getPageUrl(baseUrl, page);
    const title = cleanMarkdownText(page.seo?.title) || cleanMarkdownText(page.name) || 'Untitled';

    lines.push(`- [${title}](${pageUrl})`);

    const description = cleanMarkdownText(page.seo?.description);
    if (description) {
      lines.push(`  ${description}`);
    }

    const sections = getSectionSummaries(page, manifest);
    if (sections.length > 0) {
      lines.push(`  Sections: ${sections.join(', ')}`);
    }

    for (const keyword of page.seo?.keywords || []) {
      const topic = cleanMarkdownText(keyword);
      const topicKey = topic.toLowerCase();
      if (topic && !seenTopics.has(topicKey)) {
        seenTopics.add(topicKey);
        topics.push(topic);
      }
    }
  }

  if (topics.length > 0) {
    lines.push('');
    lines.push('## Topics');
    lines.push('');
    lines.push(topics.join(', '));
  }

  return `${lines.join('\n').trimEnd()}\n`;
}

function llmsTxtPlugin(manifest: PagesManifest): Plugin {
  return {
    name: 'llms-txt-generator',
    generateBundle() {
      const baseUrl = getSiteDomain(manifest.site.domain || '');
      if (!baseUrl) {
        console.warn('[llms.txt] Missing SITE_DOMAIN/manifest domain; llms.txt was not generated');
        return;
      }

      const content = buildLlmsTxt(manifest, baseUrl);

      this.emitFile({
        type: 'asset',
        fileName: 'llms.txt',
        source: content,
      });

      console.log(`[llms.txt] Generated llms.txt with ${manifest.pages.filter(p => !p.seo.noindex).length} pages`);
    },
  };
}

/**
 * Plugin to suppress the Vite error overlay during agent-initiated
 * edits (parallel page creation and similar bulk operations).
 *
 * Watches ``.lps-hmr-state.json`` written by the agent daemon. When
 * ``status === "quiet"`` and ``expires_at`` is in the future, the
 * plugin emits a ``lps:quiet:start`` WS event. On idle it emits
 * ``lps:quiet:end``. The client hook (``src/lib/quietHmr.ts``) listens
 * and toggles the existing ``HIDE_VITE_ERROR_OVERLAY`` postMessage
 * plumbing in ``index.html``.
 *
 * Safety: the plugin never suppresses anything on its own. It only
 * forwards state transitions. TTL enforcement is duplicated in the
 * client so a missed ``end`` event cannot wedge the overlay.
 */
function quietHmrPlugin(): Plugin {
  const statePath = path.resolve(__dirname, '.lps-hmr-state.json');
  // Seed as 'idle' so the initial read of a non-existent file (the
  // common case at dev-server start) does NOT broadcast an 'end'.
  // Browsers default to "no suppression" — nothing to signal.
  let lastStatus: 'quiet' | 'idle' = 'idle';

  interface QuietState {
    status?: string;
    request_id?: string;
    started_at?: number;
    expires_at?: number;
    ended_at?: number;
    end_status?: string;
  }

  function readState(source: string): QuietState | null {
    if (!fs.existsSync(statePath)) return null;
    try {
      const raw = fs.readFileSync(statePath, 'utf-8');
      return JSON.parse(raw) as QuietState;
    } catch (err) {
      // Only log parse errors — they indicate a real problem
      // (corrupted write / external writer). Successful reads stay
      // silent; the transition log in ``broadcast`` is the user-facing
      // signal. ``source`` is preserved in the log so we can localize
      // a regression.
      console.log(`[quiet-hmr] readState(${source}) parse error: ${err}`);
      return null;
    }
  }

  function broadcast(
    server: import('vite').ViteDevServer,
    state: QuietState | null,
    source: string,
  ) {
    const now = Math.floor(Date.now() / 1000);
    const isQuiet =
      state?.status === 'quiet' &&
      typeof state.expires_at === 'number' &&
      state.expires_at > now;

    const nextStatus: 'quiet' | 'idle' = isQuiet ? 'quiet' : 'idle';
    if (nextStatus === lastStatus) {
      // No transition. Stay quiet in the logs so a noisy file system
      // (or the scratch script's many writes) doesn't spam.
      return;
    }
    lastStatus = nextStatus;

    if (nextStatus === 'quiet') {
      console.log(
        `[quiet-hmr] -> START (${source}) request_id=${state?.request_id} expires_at=${state?.expires_at}`,
      );
      server.ws.send({
        type: 'custom',
        event: 'lps:quiet:start',
        data: {
          request_id: state?.request_id ?? null,
          expires_at: state?.expires_at ?? null,
        },
      });
    } else {
      console.log(
        `[quiet-hmr] -> END (${source}) request_id=${state?.request_id ?? 'none'} status=${state?.end_status ?? 'cleared'}`,
      );
      server.ws.send({
        type: 'custom',
        event: 'lps:quiet:end',
        data: {
          request_id: state?.request_id ?? null,
          end_status: state?.end_status ?? 'cleared',
        },
      });
    }
  }

  return {
    name: 'lps-quiet-hmr',
    transformIndexHtml() {
      // Cold-load path: if a quiet window is active at the moment the
      // browser requests index.html, inject the state into
      // ``window.__LPS_QUIET_INITIAL__``. quietHmr.ts reads it on boot
      // and enters quiet mode BEFORE Vite can transform any broken
      // modules. Without this, a refresh mid-window briefly shows the
      // red overlay until the WS ``lps:quiet:start`` event arrives.
      const state = readState('transformIndexHtml');
      const now = Math.floor(Date.now() / 1000);
      const isQuiet =
        state?.status === 'quiet' &&
        typeof state.expires_at === 'number' &&
        state.expires_at > now;
      if (!isQuiet) return;
      // Escape ``</`` so a crafted ``request_id`` cannot break out of
      // the <script> element. ``JSON.stringify`` by default does NOT
      // escape ``</script>`` / ``<!--`` / ``-->`` — the HTML parser
      // terminates the script early if we leave them intact.
      const safeJson = JSON.stringify({
        request_id: state?.request_id ?? null,
        expires_at: state?.expires_at ?? null,
      }).replace(/</g, '\\u003c');
      return [
        {
          tag: 'script',
          attrs: { type: 'text/javascript' },
          injectTo: 'head-prepend',
          children: `window.__LPS_QUIET_INITIAL__ = ${safeJson};`,
        },
      ];
    },
    configureServer(server) {
      server.watcher.add(statePath);

      server.watcher.on('add', (p) => {
        if (path.resolve(p) === statePath) {
          broadcast(server, readState('add'), 'add');
        }
      });
      server.watcher.on('change', (p) => {
        if (path.resolve(p) === statePath) {
          broadcast(server, readState('change'), 'change');
        }
      });
      server.watcher.on('unlink', (p) => {
        if (path.resolve(p) === statePath) {
          broadcast(server, null, 'unlink');
        }
      });

      // Telemetry sink: client POSTs ``{suppressed_error_count}`` here
      // on ``lps:quiet:end`` so the daemon can include it in the
      // ``generation_metrics`` payload. Written as a small file that
      // the daemon reads + deletes when closing its quiet window.
      const telemetryPath = path.resolve(__dirname, '.lps-hmr-telemetry.json');
      server.middlewares.use('/__lps/quiet/telemetry', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end();
          return;
        }
        let body = '';
        req.on('data', (chunk: Buffer) => (body += chunk.toString()));
        req.on('end', () => {
          try {
            const payload = body ? JSON.parse(body) : {};
            fs.writeFileSync(
              telemetryPath,
              JSON.stringify({
                suppressed_error_count: Number(payload.suppressed_error_count) || 0,
                request_id: payload.request_id ?? null,
                recorded_at: Math.floor(Date.now() / 1000),
              }),
            );
            res.statusCode = 204;
            res.end();
          } catch (err) {
            res.statusCode = 400;
            res.end(`bad telemetry: ${err}`);
          }
        });
      });

      // HTTP fallback + diagnostic endpoint.
      //   GET  /__lps/quiet          → current state + lastStatus (JSON)
      //   POST /__lps/quiet/start    → body {request_id, ttl_seconds} writes quiet state
      //   POST /__lps/quiet/end      → body {request_id, status} writes idle state
      // Bypasses file-watcher flakiness so we can confirm the WS path
      // in isolation. If this works but file-based does not, the issue
      // is in the watcher / file-write race, not the plugin.
      server.middlewares.use('/__lps/quiet', (req, res) => {
        if (req.method === 'GET') {
          const state = readState('http-get');
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              statePath,
              state,
              lastStatus,
              nowEpochSec: Math.floor(Date.now() / 1000),
            }),
          );
          return;
        }
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: Buffer) => (body += chunk.toString()));
          req.on('end', () => {
            try {
              const payload = body ? JSON.parse(body) : {};
              const isStart = (req.url || '').endsWith('/start');
              const isEnd = (req.url || '').endsWith('/end');
              const nowEpochSec = Math.floor(Date.now() / 1000);
              let state: QuietState;
              if (isStart) {
                state = {
                  status: 'quiet',
                  request_id: payload.request_id ?? `http-${nowEpochSec}`,
                  started_at: nowEpochSec,
                  expires_at: nowEpochSec + (payload.ttl_seconds ?? 90),
                };
              } else if (isEnd) {
                state = {
                  status: 'idle',
                  request_id: payload.request_id ?? null,
                  ended_at: nowEpochSec,
                  end_status: payload.status ?? 'success',
                };
              } else {
                res.statusCode = 404;
                res.end('use /__lps/quiet/start or /__lps/quiet/end');
                return;
              }
              fs.writeFileSync(statePath, JSON.stringify(state));
              broadcast(server, state, 'http');
              res.statusCode = 204;
              res.end();
            } catch (err) {
              res.statusCode = 400;
              res.end(`bad request: ${err}`);
            }
          });
          return;
        }
        res.statusCode = 405;
        res.end();
      });

      // Initial read at server start — logs whether the file exists,
      // and broadcasts only if we're starting mid-quiet-window.
      console.log(`[quiet-hmr] plugin configured; watching ${statePath}`);
      broadcast(server, readState('init'), 'init');
    },
  };
}

/**
 * Plugin to notify the client when pages.manifest.json changes.
 *
 * In dev mode, the agent may add new pages via vibe coding. When the manifest
 * is updated, this plugin sends a custom HMR event so App.tsx can re-fetch
 * routes and register the new page in React Router — preventing 404s.
 */
function manifestHmrPlugin(): Plugin {
  return {
    name: 'manifest-hmr',
    configureServer(server) {
      const manifestPath = path.resolve(__dirname, 'pages.manifest.json');

      server.watcher.add(manifestPath);
      server.watcher.on('change', (changedPath) => {
        if (path.resolve(changedPath) === manifestPath) {
          console.log('[manifest-hmr] pages.manifest.json changed, notifying client');
          server.ws.send({
            type: 'custom',
            event: 'manifest-update',
          });
        }
      });
    },
  };
}

/**
 * Plugin to generate per-page HTML entry points for MPA builds.
 * 
 * In production, Vite's MPA mode needs distinct HTML files for each page.
 * This plugin:
 * 1. Creates {slug}/index.html for each non-home page (copies root index.html)
 * 2. Sets rollupOptions.input to map each page to its own HTML file
 * 3. Cleans up generated HTML files after the build
 * 
 * This ensures Rollup treats each page as a separate entry and produces
 * separate HTML outputs (e.g., dist/index.html, dist/menu/index.html).
 */
// Root-absolutize relative asset URLs (href on <link>, src on <script>/<img>/
// <source>) in a page shell. mpaHtmlGeneratorPlugin copies the root index.html
// verbatim into nested dirs (blog/<slug>/index.html, <page-slug>/index.html);
// for HTML uploads whose root index.html uses relative asset paths
// (`href="styles.css"`), Vite would otherwise resolve them relative to the
// NESTED shell (blog/<slug>/styles.css → missing) and ship a dead relative link
// that 404s → an unstyled blog page. Rewriting `styles.css` → `/styles.css`
// makes Vite resolve from the project root and bundle+hash it exactly as it does
// for the home entry. Anchors (<a href>) and already-absolute/remote/data/anchor
// URLs are left untouched. (LPS-1457 blog HTML upload compat.)
export function absolutizeShellAssetUrls(html: string): string {
  // The attr is matched with a leading whitespace (`\s`), not `\b`: `\b` before
  // `href`/`src` also matches inside `data-src`/`data-href` (the hyphen is a
  // word boundary), which would corrupt lazy-load data attributes and skip the
  // real src. Requiring whitespace pins it to a genuine attribute start.
  return html.replace(
    /(<(?:link|script|img|source)\b[^>]*?\s(?:href|src)=)(["'])(?!https?:|\/\/|\/|data:|#|mailto:|tel:|blob:|javascript:)([^"']+)\2/gi,
    (_m, pre: string, q: string, url: string) => `${pre}${q}/${url.replace(/^\.\//, '')}${q}`,
  );
}

function mpaHtmlGeneratorPlugin(manifest: PagesManifest): Plugin {
  const generatedFiles: string[] = [];
  
  return {
    name: 'mpa-html-generator',
    config() {
      const rootHtml = path.resolve(__dirname, 'index.html');
      const rootHtmlContent = fs.readFileSync(rootHtml, 'utf-8');
      // Shells are copied into nested dirs; root-absolutize their asset URLs so
      // relative refs (e.g. `href="styles.css"`) resolve from the project root
      // instead of the nested path (which 404s → unstyled blog). See helper.
      const shellHtmlContent = absolutizeShellAssetUrls(rootHtmlContent);
      const inputs: Record<string, string> = {};
      const seenFiles = new Set<string>();
      // Collect slug dirs so we can tell Vite's dev-server watcher to ignore them.
      // mpaHtmlGeneratorPlugin only runs during production builds (!isDev), but the
      // Vite dev server is a separate supervisord process that may be running at the
      // same time.  Without the ignore, chokidar fires add/unlink on the temp HTML
      // files and briefly invalidates the module graph → false-positive APP_BOOT_FAILED.
      const watchIgnored: string[] = [];

      for (const page of manifest.pages) {
        // Upload projects with filePath pointing to an HTML file: use it directly as a build entry.
        // Virtual pages sharing the same file are deduplicated — only one rollup entry per physical file.
        if (page.filePath?.endsWith('.html')) {
          if (seenFiles.has(page.filePath)) continue;
          seenFiles.add(page.filePath);
          const absPath = path.resolve(__dirname, page.filePath);
          if (fs.existsSync(absPath)) {
            inputs[page.id] = absPath;
            console.log(`[mpa] Using upload HTML entry: ${page.filePath}`);
            continue;
          }
        }

        if (page.isHome) {
          inputs[page.id] = rootHtml;
        } else {
          // Non-home pages need their own HTML file for Rollup to treat as distinct entries.
          // The path MUST be inside __dirname so Rollup computes a non-traversing relative
          // path (e.g. "blog/index.html") as the output fileName — paths outside the root
          // (e.g. /tmp) become "../tmp/…" which Rollup rejects as a relative-path fileName.
          const pageDir = path.resolve(__dirname, page.slug);
          const pageHtml = path.resolve(pageDir, 'index.html');

          fs.mkdirSync(pageDir, { recursive: true });
          fs.writeFileSync(pageHtml, shellHtmlContent);
          generatedFiles.push(pageHtml);

          inputs[page.id] = pageHtml;
          watchIgnored.push(`**/${page.slug}/**`);
          console.log(`[mpa] Generated HTML entry: ${page.slug}/index.html`);
        }
      }

      // ── LPS-320 ──────────────────────────────────────────────────────────
      // Emit one HTML shell per blog post so Rollup writes
      //   dist/<page-slug>/blog/<post-slug>/index.html        (named page)
      //   dist/blog/<post-slug>/index.html                    (home)
      // Reads src/data/blog.json — empty default ships with the boilerplate,
      // and the agent's blog_data_sync helper overwrites it at publish time
      // (Step 1.5 of handle_build_and_publish). Same temp-shell+cleanup
      // pattern as the page loop above.
      // ─────────────────────────────────────────────────────────────────────
      const blogJsonPath = path.resolve(__dirname, 'src/data/blog.json');
      if (fs.existsSync(blogJsonPath)) {
        try {
          const blogData = JSON.parse(fs.readFileSync(blogJsonPath, 'utf-8'));
          const pagesWithBlog: Array<{ page_id: string; page_slug: string }> =
            blogData.pages_with_blog ?? [];
          const posts: Array<{ id: string; page_id: string; slug: string; post_path?: string }> =
            blogData.posts ?? [];
          const pageSlugById = new Map(
            pagesWithBlog.map((p) => [p.page_id, p.page_slug ?? '']),
          );

          const blogWatchPaths = new Set<string>();
          for (const post of posts) {
            let pageSlug = pageSlugById.get(post.page_id);
            if (pageSlug === undefined) {
              // pages_with_blog is empty or stale — derive the page slug from
              // post_path (always /<pageSlug>/<postSlug>) so shells are still
              // generated even when sync_blog_data fell back to blog.json.last.
              const derived = (post.post_path || '').split('/').filter(Boolean)[0] || '';
              if (!derived) continue;
              pageSlug = derived;
            }
        
            // LPS-1704: the fallback keys on the page IDENTITY, not the literal
            // slug — a renamed hub (id "blog", slug "resources") hosts its posts
            // directly at /resources/<post>. Kept byte-identical to the same
            // fallback in scripts/prerender.mjs; if they disagree the shell and
            // the pre-render land in different directories.
            const isBlogHub = post.page_id === 'blog' || pageSlug === 'blog';
            const relPath = (post.post_path || '').replace(/^\/+|\/+$/g, '')
              || (isBlogHub
                ? `${pageSlug || 'blog'}/${post.slug}`
                : `${pageSlug ? `${pageSlug}/` : ''}blog/${post.slug}`);
            const postDir = path.resolve(__dirname, relPath);
            const postHtml = path.resolve(postDir, 'index.html');

            fs.mkdirSync(postDir, { recursive: true });
            fs.writeFileSync(postHtml, shellHtmlContent);
            generatedFiles.push(postHtml);

            inputs[`blog-${post.id}`] = postHtml;
            const relDir = relPath.split('/').slice(0, -1).join('/');
            blogWatchPaths.add(relDir ? `**/${relDir}/**` : '**/blog/**');
            console.log(`[mpa] Generated blog HTML entry: ${relPath}/index.html`);
          }
          for (const w of blogWatchPaths) {
            if (!watchIgnored.includes(w)) watchIgnored.push(w);
          }
        } catch (e) {
          console.warn(`[mpa] Failed to process src/data/blog.json (skipping blog entries): ${(e as Error).message}`);
        }
      }

      console.log(`[mpa] ${Object.keys(inputs).length} HTML entry points configured`);

      return {
        build: {
          rollupOptions: {
            input: inputs,
          },
        },
        // Tell the dev server watcher to ignore the temp slug dirs so it never
        // fires add/unlink events for files we create and delete during the build.
        server: {
          watch: {
            ignored: watchIgnored,
          },
        },
      };
    },
    generateBundle() {
      // Include pages.manifest.json in build output for client-side routing.
      // The React app fetches this at runtime to register React Router routes.
      // Without it, only the home route works on the static site.
      const manifestPath = path.resolve(__dirname, 'pages.manifest.json');
      if (fs.existsSync(manifestPath)) {
        this.emitFile({
          type: 'asset',
          fileName: 'pages.manifest.json',
          source: fs.readFileSync(manifestPath, 'utf-8'),
        });
        console.log('[mpa] Included pages.manifest.json in build output');
      }

      // LPS-1468 — emit blog-data.json from the SAME src/data/blog.json Vite just
      // bundled, so the listing's runtime fetch (usePostsForPage → /blog-data.json)
      // can never lag the bundled data the detail pages read (getPostsForPage).
      // Previously only the publish flow (export.py) emitted it, so a preview build
      // could serve a stale blog-data.json while its bundle carried newer posts —
      // the listing showed fewer posts than exist.
      const blogDataPath = path.resolve(__dirname, 'src/data/blog.json');
      if (fs.existsSync(blogDataPath)) {
        this.emitFile({
          type: 'asset',
          fileName: 'blog-data.json',
          source: fs.readFileSync(blogDataPath, 'utf-8'),
        });
        console.log('[mpa] Included blog-data.json in build output');
      }
    },
    closeBundle() {
      // Clean up generated HTML files (they were only needed for the build).
      // LPS-320 — also walk up empty parent dirs so nested blog post shells
      // like `<page-slug>/blog/<post-slug>/index.html` don't leave behind
      // empty `<page-slug>/blog/` husks that chokidar might wake up on.
      for (const file of generatedFiles) {
        try {
          fs.unlinkSync(file);
        } catch {
          // ignore
        }
      }
      // Walk deepest-first so child dirs are removed before parents are tested.
      const dirs = Array.from(new Set(generatedFiles.map(f => path.dirname(f))))
        .sort((a, b) => b.split(path.sep).length - a.split(path.sep).length);
      for (const dir of dirs) {
        let current = dir;
        while (current.startsWith(__dirname) && current !== __dirname) {
          try {
            if (fs.existsSync(current) && fs.readdirSync(current).length === 0) {
              fs.rmdirSync(current);
              current = path.dirname(current);
            } else {
              break;
            }
          } catch {
            break;
          }
        }
      }
      if (generatedFiles.length > 0) {
        console.log(`[mpa] Cleaned up ${generatedFiles.length} generated HTML files`);
      }
    },
  };
}

function lpsGlobalsPlugin(isDev: boolean): Plugin {
  return {
    name: 'lps-inject-globals',
    transformIndexHtml(html) {
      const projectId = process.env.PROJECT_ID || '';
      if (!projectId) return;
      // Only self-hosted subpath builds carry VITE_BASE_PATH — gating on it
      // keeps the real project id out of every other project's public HTML.
      const basePath = process.env.VITE_BASE_PATH || '';
      const isSelfHostedBuild = basePath !== '' && basePath !== '/';
      const attrSafe = projectId.replace(/"/g, '&quot;');
      // Matches any existing content= value and either self-closing form:
      // tenant repos scaffolded at different times carry `content="1" />`,
      // `content="1"/>`, or an already-stamped id, and an exact-string match
      // would silently no-op on all but the first — leaving the generic
      // fingerprint in place and verification permanently failing.
      const stampedHtml = isSelfHostedBuild
        ? html.replace(
            /<meta\s+name="lps-build-fingerprint"\s+content="[^"]*"\s*\/?>/i,
            `<meta name="lps-build-fingerprint" content="${attrSafe}" />`,
          )
        : html;
      if (!isDev) return { html: stampedHtml, tags: [] };
      const safe = JSON.stringify(projectId).replace(/</g, '\\u003c');
      return {
        html: stampedHtml,
        tags: [{
          tag: 'script',
          attrs: { type: 'text/javascript' },
          injectTo: 'head-prepend',
          children: `window.__LPS_PROJECT_ID = ${safe};`,
        }],
      };
    },
  };
}

/**
 * Dev middleware for static HTML uploads (Phase 4 — Upload V2).
 *
 * Vite's SPA fallback returns `index.html` for all unmatched paths.
 * For static HTML uploads with multiple `.html` files, this middleware
 * intercepts requests matching known page slugs and serves the correct
 * `.html` file directly — before Vite's built-in handler runs.
 *
 * Only active when IS_STATIC_HTML_PROJECT=true.
 */
function staticHtmlServingPlugin(manifest: PagesManifest): Plugin {
  const isStaticHtml = process.env.IS_STATIC_HTML_PROJECT === 'true';

  return {
    name: 'static-html-serving',
    configureServer(server) {
      if (!isStaticHtml) return;

      // Build slug → filePath map from manifest, refresh on change.
      let slugMap = buildSlugMap(manifest);

      server.watcher.on('change', (changedPath) => {
        if (path.resolve(changedPath) === path.resolve(__dirname, 'pages.manifest.json')) {
          try {
            const fresh = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pages.manifest.json'), 'utf-8'));
            slugMap = buildSlugMap(fresh);
            console.log(`[static-html] Refreshed slug map: ${Object.keys(slugMap).length} entries`);
          } catch { /* ignore parse errors */ }
        }
      });

      // LPS-1333 — home is raw-served (no Vite html entry), so we own its reload signal.
      const indexHtmlPath = path.resolve(__dirname, 'index.html');
      server.watcher.add(indexHtmlPath);
      server.watcher.on('change', (changedPath) => {
        if (path.resolve(changedPath) === indexHtmlPath) {
          server.ws.send({ type: 'full-reload' });
        }
      });

      // Register middleware BEFORE Vite's SPA fallback.
      server.middlewares.use((req, res, next) => {
        // OPTIONS preflight must reach Vite's built-in cors handler — serveRawHtml only
        // sets ACAO and would answer the preflight without the required Allow-Headers.
        if (req.method === 'OPTIONS') { next(); return; }

        const url = req.url || '';
        const pathname = url.split('?')[0].split('#')[0];

        // LPS-1333 — raw-serve home to skip Vite's HTML transform (re-runs PostCSS over
        // all inline CSS every request — ~1s+ vs ~8ms on large single-HTML uploads).
        if (pathname === '/' || pathname === '/index.html') {
          if (fs.existsSync(indexHtmlPath)) {
            serveRawHtml(res, injectDevScripts(fs.readFileSync(indexHtmlPath, 'utf-8')));
            return;
          }
        }

        // LPS-1938 — accept flat / dir-index / manifest-slug shapes, then REFUSE
        // a page path nothing can answer. Falling through handed it to Vite's SPA
        // fallback, which answered `index.html` — a 200 showing Home.
        const resolved = resolveStaticPage({
          pathname,
          slugMap,
          exists: (rel: string) => fs.existsSync(path.resolve(__dirname, rel)),
        });
        if (resolved.kind === 'file') {
          serveRawHtml(res, fs.readFileSync(path.resolve(__dirname, resolved.filePath), 'utf-8'));
          return;
        }
        if (
          resolved.kind === 'not-found' &&
          isPageNavigation({ method: req.method || 'GET', accept: String(req.headers.accept || '') })
        ) {
          res.statusCode = 404;
          serveRawHtml(res, renderPageNotFound(pathname));
          return;
        }

        next();
      });
    },
  };
}

// LPS-1333 — ACAO matches Vite's dev cors:true; the studio gates preview reveal on a fetch() probe.
function serveRawHtml(res: import('http').ServerResponse, html: string): void {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(html);
}

function buildSlugMap(manifest: PagesManifest): Record<string, string> {
  const map: Record<string, string> = {};
  for (const page of manifest.pages) {
    if (page.filePath?.endsWith('.html') && page.slug) {
      map[page.slug] = page.filePath;
    }
  }
  return map;
}

/**
 * Production build plugin for static HTML uploads (Phase 5 — Upload V2).
 *
 * For static HTML projects, the standard React MPA build is wrong — there
 * are no React entry points. Instead, this plugin copies all HTML/CSS/JS/
 * asset files to `dist/`, injects SEO metadata from the manifest into each
 * HTML file, and generates sitemap + robots.txt.
 *
 * Only active when IS_STATIC_HTML_PROJECT=true in production builds.
 */
function staticHtmlBuildPlugin(manifest: PagesManifest): Plugin {
  const isStaticHtml = process.env.IS_STATIC_HTML_PROJECT === 'true';

  return {
    name: 'static-html-build',
    apply: 'build',
    enforce: 'pre',
    config() {
      if (!isStaticHtml) return;

      // Collect all HTML files as rollup inputs.
      const inputs: Record<string, string> = {};
      const seen = new Set<string>();

      for (const page of manifest.pages) {
        if (page.filePath?.endsWith('.html') && !seen.has(page.filePath)) {
          seen.add(page.filePath);
          const absPath = path.resolve(__dirname, page.filePath);
          if (fs.existsSync(absPath)) {
            inputs[page.id] = absPath;
          }
        }
      }

      // If no HTML pages found, fall back to default (React build).
      if (Object.keys(inputs).length === 0) return;

      console.log(`[static-html-build] ${Object.keys(inputs).length} HTML entry points`);

      return {
        build: {
          rollupOptions: {
            input: inputs,
          },
        },
      };
    },
    generateBundle() {
      if (!isStaticHtml) return;

      // Emit the manifest as a build asset.
      const manifestPath = path.resolve(__dirname, 'pages.manifest.json');
      if (fs.existsSync(manifestPath)) {
        this.emitFile({
          type: 'asset',
          fileName: 'pages.manifest.json',
          source: fs.readFileSync(manifestPath, 'utf-8'),
        });
      }

      // Copy non-HTML assets (CSS, JS, images) that HTML files reference.
      const assetExts = ['.css', '.js', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico', '.woff', '.woff2'];
      for (const entry of fs.readdirSync(__dirname)) {
        const ext = path.extname(entry).toLowerCase();
        if (assetExts.includes(ext)) {
          const content = fs.readFileSync(path.resolve(__dirname, entry));
          this.emitFile({
            type: 'asset',
            fileName: entry,
            source: content,
          });
        }
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const manifest = loadManifest();
  const isDev = mode === 'development';
  
  console.log(`[Vite Config] Mode: ${mode}`);
  console.log(`[Vite Config] Pages in manifest: ${manifest.pages.length}`);
  console.log(`[Vite Config] componentTagger enabled: ${isDev}`);
  
  const config: UserConfig = {
    base: process.env.VITE_BASE_PATH || '/',
    define: {
      // LPS Validation Phase 3 — Tier 4 observer routing.
      // `telemetry_client.ts` reads `window.__LPS_CONTEXT` to decide
      // between the authenticated builder endpoint and the (Phase 6)
      // public production endpoint. The production publish pipeline
      // overrides this to "production" at build time.
      "window.__LPS_CONTEXT": JSON.stringify("builder"),
    },
    server: {
      host: "::",
      port: 5173,
      allowedHosts: true,
      cors: true,
      // Ignore graphify's output (LPS-1252): it rewrites src/graphify-out/* every edit, inside
      // the watched tree → dev-server reload-loops the preview. (.gitignore doesn't gate chokidar.)
      watch: {
        ignored: ['**/graphify-out/**'],
      },
      proxy: isDev
        ? {
            '/api': {
              target: process.env.DJANGO_API_URL || 'http://lps.django.web:8000',
              changeOrigin: true,
            },
          }
        : undefined,
    },
    plugins: [
      react(),
      // Production-only: see conversionTriggerStampPlugin above (LPS-1196)
      !isDev && conversionTriggerStampPlugin(),
      // Development-only: component tagger for visual editing
      isDev && componentTagger({ 
        jsxSource: true,
        tailwindConfig: true,
        virtualOverrides: true,
        debug: false,
      }),
      // Development-only: notify client when pages.manifest.json changes
      isDev && manifestHmrPlugin(),
      // Development-only: suppress the Vite error overlay during
      // agent-initiated bulk edits (LPS-327 quiet-hmr spike)
      isDev && quietHmrPlugin(),
      lpsGlobalsPlugin(isDev),
      // Development-only: serve static HTML pages for upload projects
      isDev && staticHtmlServingPlugin(manifest),
      // Production-only: MPA HTML generator (creates per-page HTML entry points)
      !isDev && mpaHtmlGeneratorPlugin(manifest),
      // Production-only: static HTML build for upload projects
      !isDev && staticHtmlBuildPlugin(manifest),
      // SEO metadata injection (reads manifest fresh in dev mode)
      seoInjectorPlugin(manifest, isDev),
      // Production-only: custom embeddings injected at build time (dev uses EmbeddingsLoader.ts)
      !isDev && embeddingsInjectorPlugin(),
      // Production-only: sitemap generation and llmtxtplugin
      !isDev && sitemapPlugin(manifest),
      !isDev && llmsTxtPlugin(manifest),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      // Explicit minification for production performance (90+ PSI)
      minify: 'esbuild',
      cssMinify: true,
      cssCodeSplit: true,
      // MPA build configuration handled by mpaHtmlGeneratorPlugin
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react':  ['react', 'react-dom'],
            'vendor-router': ['react-router-dom'],
            'vendor-motion': ['framer-motion'],
            'vendor-charts': ['recharts'],
            'vendor-icons':  ['lucide-react'],
            'vendor-forms':  ['react-hook-form', '@hookform/resolvers', 'zod'],
            'vendor-query':  ['@tanstack/react-query'],
          },
        },
      },
    },
    optimizeDeps: {
      include: [
        // Radix UI (used by shadcn/ui components - may be lazy-loaded per page)
        '@radix-ui/react-accordion',
        '@radix-ui/react-alert-dialog',
        '@radix-ui/react-aspect-ratio',
        '@radix-ui/react-avatar',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-collapsible',
        '@radix-ui/react-context-menu',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-hover-card',
        '@radix-ui/react-label',
        '@radix-ui/react-menubar',
        '@radix-ui/react-navigation-menu',
        '@radix-ui/react-popover',
        '@radix-ui/react-progress',
        '@radix-ui/react-radio-group',
        '@radix-ui/react-scroll-area',
        '@radix-ui/react-select',
        '@radix-ui/react-separator',
        '@radix-ui/react-slider',
        '@radix-ui/react-slot',
        '@radix-ui/react-switch',
        '@radix-ui/react-tabs',
        '@radix-ui/react-toast',
        '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group',
        '@radix-ui/react-tooltip',
        // Heavy deps that sections may import
        'framer-motion',
        'lucide-react',
        'recharts',
        'react-hook-form',
        '@hookform/resolvers',
        'sonner',
        'date-fns',
        'cmdk',
        'embla-carousel-react',
        'input-otp',
        'react-day-picker',
        'react-resizable-panels',
        'vaul',
        '@tanstack/react-query',
        'react-router-dom',
      ],
    },
  };

  return config;
});
