/**
 * Main Application Component
 * 
 * Handles routing for all pages defined in pages.manifest.json.
 * In development, uses React Router for SPA navigation.
 * In production, each page has its own HTML entry point.
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams } from "react-router-dom";
import { Suspense, lazy, useEffect, useState, useCallback, ComponentType, Fragment } from "react";
import { createPortal } from "react-dom";
import { initRouteNotifier } from "@/lib/routeNotifier";
import { isFromEditor, postToEditor } from "@/lib/editor_channel";
import {
  CHROME_GLOB_PATTERNS,
  chromeCandidatePaths,
  chromeModuleKeys,
  descriptorKind,
  hasDescriptor,
  isChromeModuleMiss,
  pickChromeExport,
  pickDeclaredExport,
  type ChromeDescriptor,
  type ChromeName,
  type SiteChrome,
} from "@/lib/blogChrome";
import ErrorBoundary from "@/components/ErrorBoundary";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import { useSeoMeta } from "@/hooks/useSeoMeta";

// Static page imports (always available)
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// LPS-320 — Blog rendering (statically imported; lightweight + always available)
import { BlogListing } from "@/components/blog/BlogListing";
import { BlogArticle } from "@/components/blog/BlogArticle";
// LPS-1667: the posts' own frozen paths are the only record of a hub's earlier
// slugs, so the router reads them to keep pre-rename article URLs resolving.
import { getPostsForPage } from "@/lib/blog-data";

// Loading component for lazy-loaded pages
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

const queryClient = new QueryClient();

/**
 * Cache for lazy-loaded page components.
 * This prevents creating new lazy() components on every render,
 * which would cause infinite remount loops.
 */
const lazyPageCache = new Map<string, ComponentType>();

/**
 * LPS-1786 — a bundler-analyzable glob, not a raw ignored dynamic import, so
 * Rollup includes every page under src/pages/ as a real chunk regardless of
 * whether a manifest filePath override references it. Without this, a
 * filePath that diverges from the slug convention (e.g. after an incomplete
 * rename) has no build-time guarantee its chunk survives tree-shaking, and
 * any transient fetch miss falls straight through to NotFound.
 */
const pageModules = import.meta.glob<{ default: ComponentType }>('./pages/**/*.{tsx,jsx}');

/**
 * WordPress folder-mode export (LPS-1392) nests every page's slug under the
 * folder (e.g. "nice/about") for routing purposes, but on-disk component
 * files are still named from the BARE page name ("About.tsx"). Any slug ->
 * filename/route derivation must strip the folder first, or it looks for a
 * component/route that was never nested on disk (manifests "Page component
 * not found" -> silently falls to NotFound).
 */
function stripRouterBase(slug: string): string {
  const base = (import.meta.env.VITE_ROUTER_BASE || '').replace(/^\/+|\/+$/g, '');
  if (!base) return slug;
  if (slug === base) return '';
  if (slug.startsWith(`${base}/`)) return slug.slice(base.length + 1);
  return slug;
}

/**
 * Get or create a lazy-loaded page component for a slug.
 * Uses a cache to ensure the same component instance is returned for the same slug.
 */
function getLazyPageComponent(slug: string, filePath?: string): ComponentType {
  const cacheKey = filePath || slug;
  if (lazyPageCache.has(cacheKey)) {
    return lazyPageCache.get(cacheKey)!;
  }

  const LazyPage = lazy(async () => {
    // A module that resolves but THROWS at eval (e.g. a use-before-declaration
    // TDZ ReferenceError in the page's own tree) is a real bug — re-throw it so
    // the route ErrorBoundary surfaces it for repair; only a genuinely missing
    // module falls through to NotFound. (LPS-1320)
    const miss = (e: unknown) =>
      /failed to fetch dynamically imported module|unknown variable dynamic import|importing a module script failed|failed to resolve (?:module|import)/i.test(
        e instanceof Error ? e.message : String(e),
      );

    // When filePath is provided (upload projects), resolve it through the
    // glob map above rather than a raw dynamic import — the glob key is
    // known at build time, so "not in pageModules" means the file genuinely
    // doesn't exist (deterministic), while a thrown loader() call means the
    // chunk exists but the fetch/eval failed (worth one retry before giving up).
    if (filePath) {
      const importPath = filePath.startsWith('src/') ? `./${filePath.slice(4)}` : `./${filePath}`;
      const loader = pageModules[importPath];
      if (loader) {
        try {
          return await loader();
        } catch (e) {
          if (!miss(e)) throw e;
          try {
            return await loader();
          } catch (e2) {
            if (!miss(e2)) throw e2;
            console.warn(`[Router] filePath chunk failed after retry: ${filePath}, falling back to convention`);
          }
        }
      } else {
        console.warn(`[Router] filePath not found among bundled pages: ${filePath}, falling back to convention`);
      }
    }

    // Convention-based resolution: convert slug to PascalCase component name
    const relSlug = stripRouterBase(slug);
    const componentName = relSlug
      .split(/[-/]/)
      .filter(Boolean)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    try {
      return await import(`./pages/${componentName}.tsx`);
    } catch (e) {
      if (!miss(e)) throw e;
      try {
        return await import(`./pages/${relSlug.charAt(0).toUpperCase() + relSlug.slice(1)}.tsx`);
      } catch (e2) {
        if (!miss(e2)) throw e2;
        if (!relSlug.includes('-') && relSlug.length <= 5) {
          try {
            return await import(`./pages/${relSlug.toUpperCase()}.tsx`);
          } catch (e3) {
            if (!miss(e3)) throw e3;
          }
        }
        console.warn(`[Router] Page component not found for slug: ${slug}`);
        return { default: NotFound };
      }
    }
  });

  lazyPageCache.set(cacheKey, LazyPage);
  return LazyPage;
}

/**
 * Wrapper component that renders a lazy-loaded page with Suspense.
 */
function LazyPageWrapper({ slug, filePath }: { slug: string; filePath?: string }) {
  const LazyPage = getLazyPageComponent(slug, filePath);
  return (
    <Suspense fallback={<PageLoader />}>
      <LazyPage />
    </Suspense>
  );
}

/**
 * Load page routes from manifest.
 * Returns array of route objects for React Router.
 *
 * LPS-320: `id`, `name`, and `hasBlogSection` are pulled from the manifest
 * so blog-enabled pages route to <BlogListing/> instead of the lazy page
 * wrapper, and the nested /<slug>/blog/:postSlug route can resolve the
 * right pageId for <BlogArticle/>.
 */
interface PageRoute {
  id: string;
  name: string;
  path: string;
  slug: string;
  isHome: boolean;
  filePath?: string;
  hasBlogSection: boolean;
  /**
   * LPS-1052: when true, the page's source JSX already renders
   * `<BlogListingSection>` (or equivalent). The runtime `<BlogListingPortal>`
   * must skip this page or the listing will render twice. Source-anchored
   * placement is what makes the section selectable in the visual editor;
   * the portal stays as a fallback for legacy pages where this is false.
   */
  hasInlineBlogSection: boolean;
}

/**
 * LPS-1704: the canonical blog page is identified by its manifest `id` — stable
 * by convention (the rename flow keeps it, and Django's manifest_sync keys the
 * Page row on it) — NOT by the slug "blog". A customer may rename the hub (e.g.
 * to "Resources", slug "resources") and its posts must still resolve directly
 * under it (/resources/<post>) rather than gaining a /blog infix. The slug test
 * stays for legacy/imported manifests whose blog page carries a different id.
 */
const BLOG_HOST_PAGE_ID = 'blog';

function isDedicatedBlog(route: PageRoute): boolean {
  return route.id?.toLowerCase() === BLOG_HOST_PAGE_ID || route.slug === BLOG_HOST_PAGE_ID;
}

/**
 * Directory prefixes the posts THEMSELVES claim, from blog.json.
 *
 * LPS-1667: `published_relpath` is frozen per post at create time (LPS-1096), so
 * after a hub rename the posts still sit at the shape that was live when they
 * were created. Guessing those shapes from the current slug does not work — a hub
 * renamed twice (blog -> resources -> news) leaves posts under `/resources/`,
 * an intermediate slug the router has no other way to learn. So read the paths
 * off the data instead of inferring them: whatever prefix a post actually claims
 * is a prefix this hub must answer on.
 */
function postPathDir(rawPath: string | undefined): string | null {
  const path = (rawPath || '').trim();
  if (!path.startsWith('/')) return null;
  // A path is data, so it must not be able to become route SYNTAX: `:` would
  // declare a param, `*` a splat, and `..` could climb. Skip rather than
  // sanitise — a malformed post_path is a bug to see, not to paper over.
  if (/[:*?#\s]/.test(path) || path.includes('..')) return null;
  const dir = path.slice(0, path.lastIndexOf('/'));
  return dir && dir !== '/' ? dir : null;
}

/**
 * Which page owns each post-path prefix, decided once across ALL pages.
 *
 * Two pages can legitimately hold posts under the same directory — easy after a
 * rename moves one page's posts under a prefix another page's posts already use.
 * Deciding per-page, both would register `${prefix}/:postSlug`; React Router
 * silently takes the first, so a post can render against the wrong `pageId` and
 * come back "not found" instead of 404ing honestly.
 *
 * The page with the most posts under a prefix owns it. A tie is left UNCLAIMED:
 * with no way to tell which page a visitor meant, not registering the route is
 * more honest than routing half the posts to the wrong listing.
 */
function postPrefixOwners(routes: PageRoute[]): Map<string, string> {
  const counts = new Map<string, Map<string, number>>();
  for (const route of routes) {
    for (const post of getPostsForPage(route.id)) {
      const dir = postPathDir(post.post_path);
      if (!dir) continue;
      const byPage = counts.get(dir) ?? new Map<string, number>();
      byPage.set(route.id, (byPage.get(route.id) ?? 0) + 1);
      counts.set(dir, byPage);
    }
  }
  const owners = new Map<string, string>();
  for (const [prefix, byPage] of counts) {
    const ranked = [...byPage.entries()].sort((a, b) => b[1] - a[1]);
    if (ranked.length === 1 || ranked[0][1] > ranked[1][1]) {
      owners.set(prefix, ranked[0][0]);
    }
  }
  return owners;
}

/**
 * Article paths a dedicated blog hub must answer on, canonical first.
 *
 * The canonical shape follows the hub's CURRENT slug. Everything after it is a
 * legacy shape kept alive so a pre-rename article does not 404 on hydration after
 * its prerendered HTML has already painted — and so the container tolerates a
 * Django/preview-image version skew in either direction.
 */
function blogArticlePaths(
  route: PageRoute,
  allRoutes: PageRoute[] = [],
  prefixOwners: Map<string, string> = new Map(),
): string[] {
  const dedicated = isDedicatedBlog(route);
  const paths = [dedicated ? `${route.path}/:postSlug` : `${route.path}/blog/:postSlug`];
  const claim = (p: string) => {
    if (!paths.includes(p)) paths.push(p);
  };

  if (dedicated && route.slug !== BLOG_HOST_PAGE_ID) {
    claim(`${route.path}/blog/:postSlug`);
    // A speculative legacy shape, for a Django/preview-image version skew where
    // Django has already moved the paths but blog.json has not caught up. Claim
    // it ONLY when nobody owns /blog by data or by slug: home-hosted posts live
    // at /blog/<post>, and a page literally slugged `blog` owns it canonically.
    // Taking it from either would route their posts at this hub's pageId, which
    // matches nothing and renders "not found" (review of !283).
    const blogPrefix = `/${BLOG_HOST_PAGE_ID}`;
    const claimedByData = prefixOwners.has(blogPrefix);
    const claimedBySlug = allRoutes.some(
      r => !r.isHome && r.slug === BLOG_HOST_PAGE_ID,
    );
    if (!claimedByData && !claimedBySlug) claim('/blog/:postSlug');
  }

  // Whatever the posts actually claim, from any earlier slug this page has had.
  // Applies to ANY blog host, not just the hub: renaming an ordinary page that
  // carries an inline listing strands its posts the same way. Ownership is
  // resolved globally (postPrefixOwners), so two pages can never both claim it.
  const ownedByAnotherPage = new Set(
    allRoutes.filter(r => !r.isHome && r.path !== route.path).map(r => r.path),
  );
  for (const [prefix, ownerId] of prefixOwners) {
    if (ownerId !== route.id) continue;
    if (ownedByAnotherPage.has(prefix)) continue;
    claim(`${prefix}/:postSlug`);
  }
  return paths;
}

// Populated by the manifest fetch below, read by useSiteChrome(). Module-scoped because
// BlogArticleRoute remounts per navigation and cannot otherwise reach the manifest
// loaded once at boot. (LPS-1866)
let chromeDescriptor: ChromeDescriptor | null = null;

async function loadPageRoutes(): Promise<PageRoute[]> {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}pages.manifest.json`, { cache: 'no-cache' });
    if (response.ok) {
      const manifest = await response.json();
      chromeDescriptor = (manifest.chrome ?? null) as ChromeDescriptor | null;
      // WordPress folder-mode export (LPS-1392) nests every page's slug under
      // the folder (e.g. "nice/about") AND sets VITE_ROUTER_BASE to that same
      // folder as the <BrowserRouter basename>. Route <path> must be BASENAME-
      // RELATIVE — React Router prepends basename automatically — or it's
      // applied twice ("/nice" + "/nice/about" instead of "/nice/about").
      const routePathForSlug = (slug: string) => `/${stripRouterBase(slug)}`;
      return manifest.pages.map((page: {
        id?: string;
        name?: string;
        slug: string;
        isHome: boolean;
        filePath?: string;
        hasBlogSection?: boolean;
        hasInlineBlogSection?: boolean;
      }) => ({
        id: page.id ?? (page.isHome ? 'home' : page.slug),
        name: page.name ?? (page.isHome ? 'Home' : page.slug),
        path: page.isHome ? '/' : routePathForSlug(page.slug),
        slug: page.slug,
        isHome: page.isHome,
        filePath: page.filePath,
        hasBlogSection: page.hasBlogSection === true,
        hasInlineBlogSection: page.hasInlineBlogSection === true,
      }));
    }
  } catch (error) {
    console.warn('[Router] Failed to load manifest, using default routes:', error);
  }

  // Default to single home page
  return [{ id: 'home', name: 'Home', path: '/', slug: '', isHome: true, hasBlogSection: false, hasInlineBlogSection: false }];
}

// LPS-1866: descriptor chrome can live at any path, so glob the tree and index by key.
// Lazy, to keep the main bundle unchanged. Must stay identical to entry-server's glob;
// repeated literally because import.meta.glob needs a statically analysable literal.
const chromeLoaders = import.meta.glob<Record<string, unknown>>([
  "./components/**/*.tsx",
  "!./components/ui/**",
]);

const chromeComponentCache = new Map<string, ComponentType>();

/**
 * Today's behaviour, retained verbatim for projects with no descriptor yet.
 * (LPS-1866 pre-flight F1 — removed in phase 4 once the backfill has run.)
 *
 * Probes the same two paths chromeCandidatePaths has always returned, in the
 * same order, and fails open to no chrome exactly as before.
 */
function legacyPairChrome(): SiteChrome {
  const load = (name: ChromeName): ComponentType => {
    const cached = chromeComponentCache.get(`legacy:${name}`);
    if (cached) return cached;
    const [sectionsPath, layoutPath] = chromeCandidatePaths(name);
    const Lazy = lazy(async () => {
      // sections/ before layout/. A missing module (chrome-less site) is absent from the
      // glob and skipped; one that RESOLVES but throws at eval is a real bug and is
      // rethrown so SectionErrorBoundary surfaces it. (LPS-1411/1320/1536)
      for (const key of [sectionsPath, layoutPath]) {
        const loader = chromeLoaders[key];
        if (!loader) continue;
        try {
          const mod = await loader();
          const Comp = pickChromeExport(mod, name) as ComponentType | undefined;
          if (Comp) return { default: Comp };
        } catch (e) {
          if (!isChromeModuleMiss(e)) throw e;
        }
      }
      return { default: (() => null) as ComponentType };
    });
    chromeComponentCache.set(`legacy:${name}`, Lazy);
    return Lazy;
  };
  return { kind: "pair", Header: load("Header"), Footer: load("Footer") };
}

/**
 * The site's chrome for blog article routes, from the manifest descriptor. (LPS-1866)
 *
 * Fails open to { kind: "none" } at every step — a stale descriptor (the module was
 * renamed or deleted since ingest) must render a chrome-less article, exactly as
 * today, never throw. A module that RESOLVES but throws at eval is a real bug and is
 * surfaced by SectionErrorBoundary.
 *
 * ALL-OR-NOTHING GATE: for kind:"pair", chromeModuleKeys can return a partial list
 * (one module renamed/deleted since ingest). Rendering the surviving half would
 * float a header with no footer, so BOTH keys must count-match and BOTH must be
 * present in chromeLoaders before anything renders — one miss degrades the whole
 * pair to "none", not to the half that resolved. Task 11's SSR resolver must apply
 * this identical shape (count check, then full-presence check) or CSR and the
 * pre-rendered HTML disagree on whether the page has chrome.
 */
function useSiteChrome(raw: ChromeDescriptor | null): SiteChrome {
  // F1: no descriptor means "not yet classified", NOT "no chrome". Keep today's
  // sections/|layout/ pair probe so un-backfilled projects render unchanged.
  if (!hasDescriptor(raw)) return legacyPairChrome();

  const kind = descriptorKind(raw);
  if (kind !== "wrapper" && kind !== "pair") return { kind: "none" };

  const keys = chromeModuleKeys(raw);
  if (kind === "wrapper" && keys.length !== 1) return { kind: "none" };
  if (kind === "pair" && keys.length !== 2) return { kind: "none" };
  if (!keys.every((k) => typeof chromeLoaders[k] === "function")) {
    console.warn(`[chrome_stale] descriptor module missing from the tree: ${keys.join(", ")}`);
    return { kind: "none" };
  }

  // Cache key must include exportName+named, not just the module key -- a
  // kind:"pair" naming two different exports from the SAME module (header and
  // footer sharing one file) would otherwise collide on the module key alone,
  // caching the first-loaded export and silently reusing it for the second slot.
  const load = (key: string, exportName: string, named: boolean): ComponentType => {
    const cacheKey = `${key}::${exportName}::${named}`;
    const cached = chromeComponentCache.get(cacheKey);
    if (cached) return cached;
    const Lazy = lazy(async () => {
      const mod = await chromeLoaders[key]();
      const Comp = pickDeclaredExport(mod, exportName, named) as ComponentType | undefined;
      return { default: Comp ?? ((() => null) as ComponentType) };
    });
    chromeComponentCache.set(cacheKey, Lazy);
    return Lazy;
  };

  if (kind === "wrapper") {
    const d = raw as ChromeDescriptor;
    const Wrapper = load(keys[0], d.export ?? "", d.named === true) as ComponentType<{
      children?: React.ReactNode;
    }>;
    return { kind: "wrapper", Wrapper };
  }
  const d = raw as ChromeDescriptor;
  return {
    kind: "pair",
    Header: load(keys[0], d.header!.export, d.header!.named),
    Footer: load(keys[1], d.footer!.export, d.footer!.named),
  };
}

/**
 * Wrapper that reads :postSlug from the route params and forwards to
 * <BlogArticle/>. Needs to live inside a <Route> element so useParams
 * resolves. (LPS-320)
 *
 * LPS-1411/1866: the article is wrapped in the site's own chrome so it matches
 * every other page — either the project's <Wrapper> or a Header/Footer pair,
 * per the manifest descriptor (falling back to the legacy pair probe when no
 * descriptor exists yet, F1). Chrome is best-effort (fails open to nothing).
 */
function BlogArticleRoute({ pageId, pageSlug, pageName }: { pageId: string; pageSlug: string; pageName: string }) {
  const { postSlug } = useParams<{ postSlug: string }>();
  // useSiteChrome is plain synchronous resolution (no React hook state), but it
  // is named `use*` so eslint's rules-of-hooks treats it as one; call it above
  // the early return so it's never conditional.
  const chrome = useSiteChrome(chromeDescriptor);
  if (!postSlug) return <NotFound />;
  const article = <BlogArticle pageId={pageId} pageSlug={pageSlug} pageName={pageName} postSlug={postSlug} />;

  // The project's own wrapper already provides <main>; adding one here would
  // nest <main> in <main>.
  if (chrome.kind === "wrapper") {
    const { Wrapper } = chrome;
    return (
      <SectionErrorBoundary sectionName="SiteChrome">
        <Suspense fallback={null}><Wrapper>{article}</Wrapper></Suspense>
      </SectionErrorBoundary>
    );
  }

  if (chrome.kind === "pair") {
    const { Header, Footer } = chrome;
    return (
      <div className="min-h-screen flex flex-col">
        <SectionErrorBoundary sectionName="Header">
          <Suspense fallback={null}><Header /></Suspense>
        </SectionErrorBoundary>
        <main className="flex-1">{article}</main>
        <SectionErrorBoundary sectionName="Footer">
          <Suspense fallback={null}><Footer /></Suspense>
        </SectionErrorBoundary>
      </div>
    );
  }

  return <div className="min-h-screen flex flex-col"><main className="flex-1">{article}</main></div>;
}

/**
 * Inner app component that handles SEO and routing.
 * Must be inside BrowserRouter to use useLocation-based hooks.
 */
function AppRoutes({ routes }: { routes: PageRoute[] }) {
  // Update page title and meta tags on route change
  useSeoMeta();

  // Normalize path to lowercase (handles case-insensitive navigation)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const lowercasePath = location.pathname.toLowerCase();
    if (location.pathname !== lowercasePath) {
      navigate(lowercasePath + location.search, { replace: true });
    }
  }, [location, navigate]);

  // LPS-320 (Option B): blog-enabled pages render their normal component;
  // the BlogListing grid is injected by <BlogListingPortal/> below before
  // the page's <footer>, preserving the page's existing content.
  const homeRoute = routes.find(r => r.isHome);
  // LPS-1052: the dedicated blog page owns its own /<slug>/:postSlug so its
  // posts resolve at /<slug>/<post>, not /<slug>/blog/<post>.
  const dedicatedBlogPage = routes.find(r => !r.isHome && isDedicatedBlog(r));
  // Resolved once and shared, so no two pages claim the same post prefix.
  const prefixOwners = postPrefixOwners(routes);
  // Who serves the bare /blog/:postSlug for HOME-hosted posts (page_id "home",
  // which always live at /blog/<post>).
  //
  // Identity-based `dedicatedBlogPage` alone is not the right test: a hub renamed
  // to /resources satisfies it, so home would cede a route the hub then claims
  // with pageId="blog" — and a home-hosted post matches nothing and renders "not
  // found". Only cede when someone genuinely owns /blog: a page literally slugged
  // `blog` (it is that page's canonical path), or posts whose data says so.
  // Absent both, the historical rule stands — home keeps it unless a hub exists.
  const blogPrefixOwner = prefixOwners.get(`/${BLOG_HOST_PAGE_ID}`);
  const pageSluggedBlog = routes.some(r => !r.isHome && r.slug === BLOG_HOST_PAGE_ID);
  const homeServesBlogArticles =
    !!homeRoute &&
    !pageSluggedBlog &&
    (blogPrefixOwner === homeRoute.id || (!blogPrefixOwner && !dedicatedBlogPage));

  return (
    <Routes>
      {/* Home page */}
      <Route path="/" element={<ErrorBoundary><Index /></ErrorBoundary>} />

      {homeServesBlogArticles && homeRoute && (
        <Route
          path="/blog/:postSlug"
          element={
            <ErrorBoundary>
              <BlogArticleRoute pageId={homeRoute.id} pageSlug="" pageName={homeRoute.name} />
            </ErrorBoundary>
          }
        />
      )}

      {/* Dynamic routes for other pages — each wrapped in its own ErrorBoundary */}
      {routes
        .filter(route => !route.isHome && route.slug && !route.filePath?.endsWith('.html'))
        .map(route => (
          <Fragment key={route.path}>
            <Route
              path={route.path}
              element={<ErrorBoundary><LazyPageWrapper slug={route.slug} filePath={route.filePath} /></ErrorBoundary>}
            />
            {/* LPS-1027: see comment above on /blog/:postSlug for rationale.
                LPS-1052/1704: the dedicated blog page hosts posts directly under
                it; every other page nests at /<slug>/blog/:postSlug. */}
            {blogArticlePaths(route, routes, prefixOwners).map(articlePath => (
              <Route
                key={articlePath}
                path={articlePath}
                element={
                  <ErrorBoundary>
                    <BlogArticleRoute pageId={route.id} pageSlug={route.slug} pageName={route.name} />
                  </ErrorBoundary>
                }
              />
            ))}
          </Fragment>
        ))
      }

      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

/**
 * Global injector for the blog listing section. (LPS-320 Option B)
 *
 * Lives outside <Routes> so it persists across navigation. On each route
 * change:
 *   1. Look up the current page in the routes table.
 *   2. If it's blog-enabled, find the page's <footer> element in the DOM.
 *   3. Insert a sentinel <div> immediately before the footer.
 *   4. Render <BlogListing variant="section"/> into that sentinel via portal.
 *
 * Why a portal instead of editing each page's .tsx: page components are
 * AI-generated and own their own Header/Footer placement. Surgically
 * splicing into their JSX would require touching every page; the portal
 * lets us insert into the rendered DOM tree non-destructively.
 *
 * Trade-off: SSR doesn't run useEffect, so the listing grid won't appear
 * in pre-rendered HTML for listing pages — only after client hydration.
 * Article pages (which DO need crawler-visible content) still SSR fully
 * via renderBlogPost. LPS-321's sitemap.xml will list post URLs explicitly.
 */
function BlogListingPortal({ routes }: { routes: PageRoute[] }) {
  const location = useLocation();
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

  // Pick the route matching the current pathname.
  const currentRoute = (() => {
    const normalized = location.pathname.toLowerCase().replace(/\/$/, "") || "/";
    return routes.find(r => r.path.toLowerCase() === normalized);
  })();
  // LPS-1052/LPS-1411: inject on ANY blog-enabled page; the `sync()` DOM check
  // below (`[data-blog-listing-section]`) is the reliable double-render guard —
  // it fires only when a REAL BlogPage/BlogListingSection renders. We must NOT
  // also gate on `hasInlineBlogSection`: that manifest flag is set true for an
  // agent-authored "on-brand" blog anatomy (BlogHero/BlogInsights/BlogStats…)
  // whose sections are static and render NO real listing, which suppressed the
  // portal and left the page with no post grid / featured post at all.
  const shouldRender = currentRoute?.hasBlogSection === true;

  useEffect(() => {
    if (!shouldRender) {
      setPortalEl(null);
      return;
    }

    const SENTINEL_ID = "lps-blog-listing-slot";
    const removeSentinel = () => {
      const node = document.getElementById(SENTINEL_ID);
      node?.parentNode?.removeChild(node);
    };

    // Returns true only when the outcome is TERMINAL (the page's own
    // <BlogListingSection> renders it, so the portal must stay off). Mounting
    // the fallback returns false so the observer keeps watching — the source
    // marker can appear LATER, after usePostsForPage's async fetch resolves
    // (BlogListingSection returns null at 0 posts), and we must tear the portal
    // back down then rather than stack two identical listings (LPS-1395).
    const sync = () => {
      if (document.querySelector("[data-blog-listing-section]")) {
        removeSentinel();
        setPortalEl(null);
        return true;
      }
      const existing = document.getElementById(SENTINEL_ID);
      if (existing) {
        setPortalEl(existing);
        return false;
      }
      const footers = document.querySelectorAll<HTMLElement>("footer");
      // Prefer the LAST footer — that's the site footer at the bottom of the page.
      const footer = footers[footers.length - 1];
      if (!footer || !footer.parentNode) return false;
      const sentinel = document.createElement("div");
      sentinel.id = SENTINEL_ID;
      sentinel.setAttribute("data-lps-blog-slot", "1");
      footer.parentNode.insertBefore(sentinel, footer);
      setPortalEl(sentinel);
      return false;
    };

    const observer = new MutationObserver(() => {
      if (sync()) observer.disconnect();
    });
    // Run once immediately, then keep observing (lazy pages + the late source
    // marker) until the source owns the listing or the 5s safety window ends.
    if (!sync()) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
    const timeout = setTimeout(() => observer.disconnect(), 5000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
      removeSentinel();
    };
  }, [location.pathname, shouldRender]);

  if (!shouldRender || !portalEl || !currentRoute) return null;
  return createPortal(
    <BlogListing variant="section" pageId={currentRoute.id} />,
    portalEl,
  );
}

/**
 * Preload all non-home page chunks so Suspense fallback never shows during navigation.
 * No-op for landing pages (single home page only).
 */
function preloadPageChunks(routes: PageRoute[]) {
  routes
    // LPS-320 — blog-enabled pages render <BlogListing/> (statically imported), no lazy chunk to preload
    .filter(r => !r.isHome && r.slug && !r.filePath?.endsWith('.html') && !r.hasBlogSection)
    .forEach(route => {
      if (route.filePath) {
        const importPath = route.filePath.startsWith('src/') ? `./${route.filePath.slice(4)}` : `./${route.filePath}`;
        import(/* @vite-ignore */ importPath).catch(() => {});
        return;
      }
      const relSlug = stripRouterBase(route.slug);
      const componentName = relSlug
        .split(/[-/]/)
        .filter(Boolean)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
      import(`./pages/${componentName}.tsx`).catch(() => {
        import(`./pages/${relSlug.charAt(0).toUpperCase() + relSlug.slice(1)}.tsx`).catch(() => {});
      });
    });
}

/**
 * Intercepts clicks on plain <a> tags for internal routes and converts them
 * to React Router SPA navigation. Prevents full page reloads when AI-generated
 * components use <a href="/path"> instead of <Link to="/path">.
 */
function LinkInterceptor({ routes }: { routes: PageRoute[] }) {
  const navigate = useNavigate();

  useEffect(() => {
    const htmlPaths = new Set(routes.filter(r => r.filePath?.endsWith('.html')).map(r => r.path));
    const knownPaths = new Set(routes.filter(r => !htmlPaths.has(r.path)).map(r => r.path));
    // LPS-320 — also SPA-navigate within blog-enabled page prefixes so internal
    // post links (including LPS-319's auto-injected related-post anchors in the
    // article body) don't trigger full reloads.
    // LPS-1704: derived from blogArticlePaths() so the intercept set can never
    // drift from the registered routes. Note a renamed hub's canonical prefix is
    // its bare path, so this deliberately intercepts everything one level under
    // the hub (that IS the post namespace); real pages are matched by knownPaths
    // first, and a non-post asset link under the hub needs `download` or an
    // absolute URL to opt out.
    const prefixOwners = postPrefixOwners(routes);
    const blogPrefixes = routes
      .filter(r => r.hasBlogSection && !htmlPaths.has(r.path))
      .flatMap(r => (r.isHome
        ? ['/blog/']
        : blogArticlePaths(r, routes, prefixOwners).map(p => p.replace(':postSlug', ''))));

    function isHandled(pathname: string): boolean {
      if (knownPaths.has(pathname)) return true;
      return blogPrefixes.some(prefix => pathname.startsWith(prefix));
    }

    function handleClick(e: MouseEvent) {
      // Skip if already handled (e.g., React Router <Link> already called preventDefault)
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const href = anchor.getAttribute('href');
      if (!href) return;
      if (/^(mailto:|tel:|javascript:|blob:|data:)/.test(href)) return;
      if (href.startsWith('#')) return;

      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;

        const pathname = url.pathname.toLowerCase().replace(/\/$/, '') || '/';
        if (isHandled(pathname)) {
          e.preventDefault();
          navigate(pathname + url.search + url.hash);
        }
      } catch {
        return;
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [routes, navigate]);

  return null;
}

/**
 * Resets scroll position to the top whenever the route changes.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Listens for NAVIGATE_TO_PAGE postMessages from the parent frame
 * and performs SPA navigation via React Router (no full reload).
 */
function ParentNavigationListener() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window === window.parent) return; // Not in iframe

    const handleMessage = (event: MessageEvent) => {
      if (!isFromEditor(event)) return;
      const message = event.data;
      if (message?.type === 'NAVIGATE_TO_PAGE' && message.payload?.path) {
        navigate(message.payload.path);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  return null;
}

/**
 * Wraps ErrorBoundary with a route-aware resetKey so that navigating to a
 * different page clears the error state instead of leaving the whole
 * app stuck on the "Something went wrong" screen.
 */
function RouteErrorBoundary({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return <ErrorBoundary resetKey={pathname}>{children}</ErrorBoundary>;
}

const App = () => {
  const [routes, setRoutes] = useState<PageRoute[]>([
    { id: 'home', name: 'Home', path: '/', slug: '', isHome: true, hasBlogSection: false, hasInlineBlogSection: false }
  ]);
  const [isLoading, setIsLoading] = useState(true);

  // Probe consumed by error_observer's blank_root signal: distinguishes
  // "React mounted but produced empty root" (real bug → repair) from
  // "React never mounted" (still loading / module graph broken; covered
  // by pageerror/dynamic-import signals → logged but not repaired).
  useEffect(() => {
    (window as unknown as { __lps_react_mounted?: boolean }).__lps_react_mounted = true;
  }, []);

  const refreshRoutes = useCallback(() => {
    loadPageRoutes().then((loadedRoutes) => {
      setRoutes(loadedRoutes);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    refreshRoutes();
  }, [refreshRoutes]);

  // Re-fetch routes when pages.manifest.json changes (dev mode HMR).
  //
  // CRITICAL: lazyPageCache must be cleared in lockstep with the routes
  // refresh. Without this, a `lazy()` created BEFORE the new page files
  // landed in Vite's module graph caches its failed import (returning
  // NotFound) and keeps returning NotFound for that path forever — even
  // after Vite has fully integrated the new file. First click after an
  // agent adds pages 404s; only a hard refresh clears the symptom
  // because that recreates the module-level Map. Clearing here lets the
  // next render create a fresh lazy() that re-runs the import against a
  // now-warm dev server.
  useEffect(() => {
    if (import.meta.hot) {
      import.meta.hot.on('manifest-update', () => {
        lazyPageCache.clear();
        refreshRoutes();
      });
    }
  }, [refreshRoutes]);

  // Preload non-home page chunks so navigation is instant (no Suspense flash)
  useEffect(() => {
    if (!isLoading) preloadPageChunks(routes);
  }, [isLoading, routes]);

  // Initialize route notifier to sync page changes with parent
  useEffect(() => {
    initRouteNotifier();
  }, []);

  // Signal to parent frame that the app has rendered
  useEffect(() => {
    postToEditor({ type: 'APP_RENDERED' });
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          basename={`/${(import.meta.env.VITE_ROUTER_BASE || '').replace(/^\/+|\/+$/g, '')}`}
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <ScrollToTop />
          <ParentNavigationListener />
          <LinkInterceptor routes={routes} />
          <RouteErrorBoundary>
            <AppRoutes routes={routes} />
          </RouteErrorBoundary>
          <BlogListingPortal routes={routes} />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
