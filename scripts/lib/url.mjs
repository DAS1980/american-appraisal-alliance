// LPS-1871: one shared "build public URL" helper for every page/post-URL
// generator (sitemap, canonical, og:url, JSON-LD, llms.txt) — mirrors the
// Traefik `-slash` redirectRegex (k8s_custom_domain_route_service.py) so a
// generated URL never disagrees with what the live 301 would produce.

/**
 * @param {string} baseUrl - site origin, no trailing slash (e.g. "https://example.com")
 * @param {string} relpath - a bare page slug or a full post relpath; leading/trailing
 *   slashes are stripped, internal slashes pass through untouched.
 * @returns {string} baseUrl unchanged for the root/home page, otherwise
 *   `${baseUrl}/${slug}/` — exactly one trailing slash, idempotent on
 *   already-slashed input.
 */
export function buildPublicUrl(baseUrl, relpath) {
  const slug = (relpath || "").replace(/^\/+|\/+$/g, "");
  return slug ? `${baseUrl}/${slug}/` : baseUrl;
}
