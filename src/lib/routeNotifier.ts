/**
 * Route Change Notifier
 * 
 * Notifies the parent window (Next.js frontend) when navigation occurs
 * inside the iframe. This allows the parent to keep its page selector UI
 * in sync with the actual page being viewed.
 * 
 * Usage: Import and call initRouteNotifier() in App.tsx after BrowserRouter
 */

interface PageChangedPayload {
  path: string;
  pageId?: string;
  pageName?: string;
}

interface PagesManifest {
  pages: Array<{
    id: string;
    name: string;
    slug: string;
    isHome: boolean;
  }>;
}

let manifest: PagesManifest | null = null;
let lastNotifiedPath: string | null = null;
let isInitialized = false;

/**
 * Load manifest to map paths to page IDs
 */
async function loadManifest(): Promise<PagesManifest | null> {
  if (manifest) return manifest;
  
  try {
    const response = await fetch('/pages.manifest.json');
    if (response.ok) {
      manifest = await response.json();
      return manifest;
    }
  } catch (error) {
    console.warn('[RouteNotifier] Failed to load manifest:', error);
  }
  return null;
}

/**
 * Find page info from manifest based on current path
 */
function findPageFromPath(path: string, manifest: PagesManifest): { pageId?: string; pageName?: string } {
  // Normalize path (remove trailing slash, ensure leading slash)
  const normalizedPath = '/' + path.replace(/^\/|\/$/g, '');
  
  for (const page of manifest.pages) {
    const pagePath = page.isHome ? '/' : `/${page.slug}`;
    if (normalizedPath === pagePath) {
      return { pageId: page.id, pageName: page.name };
    }
  }
  
  return {};
}

/**
 * Send page change notification to parent
 */
function notifyPageChange(path: string, pageId?: string, pageName?: string) {
  // Don't notify if we're not in an iframe
  if (window === window.parent) return;
  
  // Don't notify if path hasn't changed
  if (path === lastNotifiedPath) return;
  lastNotifiedPath = path;
  
  const payload: PageChangedPayload = {
    path,
    pageId,
    pageName,
  };
  
  console.debug('[RouteNotifier] Sending PAGE_CHANGED:', payload);
  
  window.parent.postMessage({
    type: 'PAGE_CHANGED',
    payload,
  }, '*');
}

/**
 * Handle route changes
 */
async function handleRouteChange() {
  const path = window.location.pathname;
  const loadedManifest = await loadManifest();
  
  if (loadedManifest) {
    const { pageId, pageName } = findPageFromPath(path, loadedManifest);
    notifyPageChange(path, pageId, pageName);
  } else {
    notifyPageChange(path);
  }
}

/**
 * Initialize route change listener.
 * Call this after the router is mounted.
 * Idempotent - safe to call multiple times (e.g., during HMR).
 */
export function initRouteNotifier() {
  // Don't initialize if not in iframe
  if (window === window.parent) {
    console.debug('[RouteNotifier] Not in iframe, skipping initialization');
    return;
  }
  
  // Idempotency check - don't initialize twice
  if (isInitialized) {
    console.debug('[RouteNotifier] Already initialized, skipping');
    // Still notify on current path in case we're at a different route after HMR
    handleRouteChange();
    return;
  }
  isInitialized = true;
  
  console.debug('[RouteNotifier] Initializing route change listener');
  
  // Notify on initial load
  handleRouteChange();
  
  // Listen for popstate (browser back/forward)
  window.addEventListener('popstate', handleRouteChange);
  
  // Override pushState and replaceState to catch programmatic navigation
  // Store originals on window to avoid re-wrapping during HMR
  const historyPatched = '__routeNotifierPatched__' in history;
  if (!historyPatched) {
    const originalPushState = history.pushState.bind(history);
    const originalReplaceState = history.replaceState.bind(history);
    
    history.pushState = function(...args) {
      const result = originalPushState(...args);
      handleRouteChange();
      return result;
    };
    
    history.replaceState = function(...args) {
      const result = originalReplaceState(...args);
      handleRouteChange();
      return result;
    };
    
    // Mark as patched
    (history as typeof history & { __routeNotifierPatched__: boolean }).__routeNotifierPatched__ = true;
  }
  
  // Also listen for hashchange (in case hash routing is used)
  window.addEventListener('hashchange', handleRouteChange);
  
  console.debug('[RouteNotifier] Route change listener initialized');
}

export default initRouteNotifier;
