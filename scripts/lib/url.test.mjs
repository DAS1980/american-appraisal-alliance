/**
 * LPS-1871 — standalone test for url.mjs. No test framework in the
 * boilerplate, so this runs with plain `node scripts/lib/url.test.mjs`
 * (exit 0 = pass, 1 = fail).
 */
import { buildPublicUrl } from "./url.mjs";

const cases = [
  ["home page → baseUrl unchanged", "https://example.com", "", "https://example.com"],
  ["root slash → baseUrl unchanged", "https://example.com", "/", "https://example.com"],
  ["bare slug → trailing slash added", "https://example.com", "about", "https://example.com/about/"],
  ["leading-slash slug → trailing slash added", "https://example.com", "/about", "https://example.com/about/"],
  ["already-slashed slug → idempotent", "https://example.com", "/about/", "https://example.com/about/"],
  ["multi-segment blog relpath", "https://example.com", "/blog/my-post", "https://example.com/blog/my-post/"],
  ["multi-segment, no leading slash", "https://example.com", "blog/my-post", "https://example.com/blog/my-post/"],
  ["already-slashed multi-segment → idempotent", "https://example.com", "/blog/my-post/", "https://example.com/blog/my-post/"],
];

let failures = 0;

for (const [name, baseUrl, relpath, want] of cases) {
  const got = buildPublicUrl(baseUrl, relpath);
  const ok = got === want;
  if (!ok) { console.error(`FAIL ${name}: got "${got}", want "${want}"`); failures++; }
  else console.log(`PASS ${name}`);
}

// idempotent when called twice on its own output (safe to run repeatedly)
{
  const once = buildPublicUrl("https://example.com", "services/botox");
  const twice = buildPublicUrl("https://example.com", once.replace("https://example.com", ""));
  if (once !== twice) { console.error(`FAIL idempotent: "${once}" !== "${twice}"`); failures++; }
  else console.log("PASS idempotent on own output");
}

console.log(failures ? `\n${failures} FAILED` : "\nAll passed");
process.exit(failures ? 1 : 0);
