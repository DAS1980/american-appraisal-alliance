/**
 * LPS-1938 — resolve a static-upload request to the file that should answer it,
 * accepting every shape the page could live in, and refuse when none can rather
 * than letting Vite's SPA fallback impersonate it with Home. Split out to test.
 */

const PAGE_EXT = /\.html?$/i;
const HAS_EXT = /\.[a-z0-9]+$/i;
const BUILD_DIR = 'dist';

// Vite's own surfaces plus source trees. Never page requests, never ours to 404.
const PASSTHROUGH_PREFIXES = [
  '/@',
  '/__',
  '/node_modules/',
  '/src/',
  '/public/',
  '/.well-known',
];

/**
 * `pathname` has query/hash stripped; `exists` probes workspace-relative paths.
 * @returns {{kind:'file',filePath:string}|{kind:'passthrough'}|{kind:'not-found'}}
 */
export function resolveStaticPage({ pathname, slugMap = {}, exists }) {
  if (!pathname || !pathname.startsWith('/')) return { kind: 'passthrough' };
  if (PASSTHROUGH_PREFIXES.some((p) => pathname.startsWith(p))) {
    return { kind: 'passthrough' };
  }
  // Home is raw-served by the caller; never our business to answer or refuse.
  if (pathname === '/' || /^\/index\.html?$/i.test(pathname)) {
    return { kind: 'passthrough' };
  }

  const rel = pathname.replace(/^\/+/, '');
  // The caller joins the result onto the workspace root, so a traversal segment
  // must never reach it — and it is never a page request either way.
  if (rel.split('/').includes('..')) return { kind: 'passthrough' };

  if (PAGE_EXT.test(rel)) {
    if (exists(rel)) return { kind: 'file', filePath: rel };
    // The suffix the studio appended is not on disk. The page may still be here
    // in directory-index shape — this is the `/blog.html` → `blog/index.html`
    // recovery, and the reason a `file_path`-less Page row still resolves.
    const base = rel.replace(PAGE_EXT, '');
    return resolveSlug(base, slugMap, exists);
  }

  // Anything else carrying an extension is an asset, not a page.
  if (HAS_EXT.test(rel)) return { kind: 'passthrough' };

  return resolveSlug(rel.replace(/\/+$/, ''), slugMap, exists);
}

function resolveSlug(slug, slugMap, exists) {
  if (!slug) return { kind: 'passthrough' };
  const candidates = [
    slugMap[slug],
    `${slug}/index.html`,
    `${slug}/index.htm`,
    `${slug}.html`,
    `${slug}.htm`,
  ].filter(Boolean);
  for (const candidate of candidates) {
    if (exists(candidate)) return { kind: 'file', filePath: candidate };
  }
  // Only once the workspace has NOTHING for this path: blog articles are emitted
  // into dist/ at publish and never into the workspace, so this is the only place
  // they exist. Workspace-first, so a stale build can never shadow a live file.
  for (const candidate of candidates) {
    const built = `${BUILD_DIR}/${candidate}`;
    if (exists(built)) return { kind: 'file', filePath: built };
  }
  return { kind: 'not-found' };
}

/**
 * Only navigations get the not-found page — an XHR, script or preload that 404s
 * must keep whatever behaviour it has today.
 */
export function isPageNavigation({ method = 'GET', accept = '' }) {
  return (method === 'GET' || method === 'HEAD') && accept.includes('text/html');
}

/**
 * Posts `APP_RENDERED` or the studio holds its "Almost ready…" overlay for the
 * full fallback window and then reveals — which is how this read as a slow
 * container. Dev-server only: a published site is static files in GCS.
 */
export function renderPageNotFound(pathname) {
  const shown = String(pathname).replace(/[<&>"]/g, (c) => `&#${c.charCodeAt(0)};`);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Page not in workspace</title>
<style>
  :root { color-scheme: light dark; }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center;
         font: 15px/1.6 ui-sans-serif, system-ui, -apple-system, sans-serif;
         background: #fafafa; color: #18181b; padding: 24px; }
  @media (prefers-color-scheme: dark) { body { background: #18181b; color: #fafafa; } }
  .card { max-width: 32rem; text-align: center; }
  h1 { font-size: 1.05rem; margin: 0 0 .5rem; font-weight: 600; }
  p { margin: 0; opacity: .7; }
  code { font: 13px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace;
         background: rgba(127,127,127,.16); padding: .15em .4em; border-radius: 4px; }
</style>
</head>
<body data-lps-page-not-found="1">
  <div class="card">
    <h1>This page isn't in the workspace yet</h1>
    <p>Nothing on disk answers <code>${shown}</code>.</p>
  </div>
  <script>try{parent.postMessage({type:'APP_RENDERED'},'*')}catch(e){}</script>
</body>
</html>
`;
}
