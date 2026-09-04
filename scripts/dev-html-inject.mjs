// Dev-script injection for the LPS-1333 raw-serve path (staticHtmlServingPlugin):
// raw-served HTML bypasses Vite's transformIndexHtml pipeline entirely, so the
// vite client — and the react-refresh preamble any /src/ module needs — must be
// spliced in here or the page boots blank.

const VITE_CLIENT_TAG = '<script type="module" src="/@vite/client"></script>';

// Byte-identical to @vitejs/plugin-react-swc's transformIndexHtml preamble; without
// it every react-refresh-wrapped module throws "can't detect preamble" at eval.
const REACT_REFRESH_PREAMBLE = `<script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => RefreshRuntime.createSignatureFunctionForTransform(type)
window.__vite_plugin_react_preamble_installed__ = true
</script>`;

// '>' inside a quoted attribute value is legal HTML (<head data-x="a>b">) and must
// not end the start tag — cutting at the first '>' splices the scripts mid-tag.
function endOfStartTag(html, from) {
  let quote = null;
  for (let i = from; i < html.length; i++) {
    const c = html[i];
    if (quote) { if (c === quote) quote = null; }
    else if (c === '"' || c === "'") quote = c;
    else if (c === '>') return i + 1;
  }
  return -1;
}

export function injectDevScripts(html) {
  if (html.includes('/@vite/client')) return html;

  // <head> can carry attributes (LPS-1104 stamps data-lps-eid on every tag), so an
  // exact-string match falls through to comment text containing a literal "<head>".
  // First document-order match wins — same disposition as the code this replaced.
  const tags = /<script[^>]*\ssrc=["']\/src\//i.test(html) ? `${REACT_REFRESH_PREAMBLE}\n  ${VITE_CLIENT_TAG}` : VITE_CLIENT_TAG;
  const headOpen = /<head[\s>]/i.exec(html);
  const at = headOpen ? endOfStartTag(html, headOpen.index) : -1;
  if (at > -1) {
    return html.slice(0, at) + `\n  ${tags}` + html.slice(at);
  }
  if (html.includes('</head>')) return html.replace('</head>', `  ${tags}\n</head>`);
  return `${tags}\n${html}`;
}
