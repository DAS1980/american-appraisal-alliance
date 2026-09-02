import test from 'node:test';
import assert from 'node:assert/strict';
import { injectDevScripts } from './dev-html-inject.mjs';

// Regression shape (LPS blank home): LPS-1104 stamps attributes onto <head>, and the
// boilerplate's LPS-943 comment contains a literal "<head>" — the old exact-string
// replace spliced the client tag INSIDE that comment, so the browser never ran it.
const STAMPED_SHELL = `<!DOCTYPE html>
<html data-lps-eid="index-e0" lang="en">
  <head data-lps-eid="index-e1">
    <title data-lps-eid="index-e4">Loading...</title>
    <!-- LPS-943: warm up the connection to the Unsplash CDN before the
         post-SSR <link rel="preload" as="image"> in <head> kicks in. -->
    <link rel="preconnect" href="https://images.unsplash.com" crossorigin />
  </head>
  <body><div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

test('attributed <head> injects after the real opening tag, not into the LPS-943 comment', () => {
  const out = injectDevScripts(STAMPED_SHELL);
  const headAt = out.indexOf('<head data-lps-eid="index-e1">');
  const commentAt = out.indexOf('post-SSR');
  const clientAt = out.indexOf('src="/@vite/client"');
  assert.ok(headAt > -1 && clientAt > headAt && clientAt < out.indexOf('</title>'), 'client sits right after the real head open');
  assert.ok(commentAt === -1 || clientAt < commentAt, 'injection precedes the comment mentioning <head>');
  assert.ok(!out.includes('in <head>\n  <script type="module" src="/@vite/client">'), 'client not spliced into comment text');
});

test('React-mounting shell also gets the react-refresh preamble', () => {
  const out = injectDevScripts(STAMPED_SHELL);
  assert.ok(out.includes('__vite_plugin_react_preamble_installed__ = true'), 'preamble flag set');
  assert.ok(out.includes('RefreshRuntime.injectIntoGlobalHook(window)'), 'preamble hooks global');
  const preAt = out.indexOf('injectIntoGlobalHook');
  const clientAt = out.indexOf('src="/@vite/client"');
  assert.ok(preAt > -1 && preAt < clientAt, 'preamble precedes the client');
});

test('an asset path under /src/ on a non-script tag does not trigger the preamble', () => {
  const out = injectDevScripts('<html><head><title>t</title></head><body><img src="/src/logo.png" /></body></html>');
  assert.ok(out.includes('/@vite/client'));
  assert.ok(!out.includes('@react-refresh'), 'no preamble for an incidental /src/ asset reference outside a module script');
});

test('bare <head> still injects directly after it', () => {
  const out = injectDevScripts('<html><head><title>t</title></head><body></body></html>');
  assert.ok(out.startsWith('<html><head>\n  <script type="module" src="/@vite/client"></script>'));
});

test('pure static home gets the client but no preamble', () => {
  const out = injectDevScripts('<html><head><title>Mine</title></head><body><h1>hi</h1></body></html>');
  assert.ok(out.includes('/@vite/client'));
  assert.ok(!out.includes('@react-refresh'));
});

test('missing head open tag falls back to </head>', () => {
  const out = injectDevScripts('<html><title>t</title></head><body></body></html>');
  assert.ok(out.includes('  <script type="module" src="/@vite/client"></script>\n</head>'));
});

test('no head at all prepends', () => {
  const out = injectDevScripts('<div>fragment</div>');
  assert.ok(out.startsWith('<script type="module" src="/@vite/client"></script>\n'));
});

test('already has the client: unchanged', () => {
  const html = '<html><head><script type="module" src="/@vite/client"></script></head></html>';
  assert.equal(injectDevScripts(html), html);
});

test('quoted ">" inside a head attribute value does not splice mid-tag', () => {
  const out = injectDevScripts('<html><head data-x="a>b"><title>t</title></head><body><h1>hi</h1></body></html>');
  assert.ok(
    out.includes('<head data-x="a>b">\n  <script type="module" src="/@vite/client">'),
    'injection lands after the complete start tag, not at the quoted ">"'
  );
  assert.ok(out.includes('<title>t</title>'), 'title survives intact');
});

test('unterminated quote in a head attribute falls back to </head>', () => {
  const out = injectDevScripts('<html><head data-x="a><title>t</title></head><body></body></html>');
  assert.ok(out.includes('  <script type="module" src="/@vite/client"></script>\n</head>'));
});

test('<header> in the body is not treated as the head', () => {
  const out = injectDevScripts('<html><head><title>t</title></head><body><header>site header</header></body></html>');
  const clientAt = out.indexOf('src="/@vite/client"');
  assert.ok(clientAt > -1 && clientAt < out.indexOf('</head>'), 'client injected inside the real head');
  assert.equal(out.match(/\/@vite\/client/g)?.length, 1, 'exactly one client tag');
});
