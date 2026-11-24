#!/usr/bin/env node
// DAS Content Publishing Pipeline — rendered-page verification (read-only).
//
// Drives an already-running Chrome over the DevTools protocol (no packages):
//   chrome --headless=new --remote-debugging-port=9333 --user-data-dir=<tmp>
//   node scripts/das-publish/verify-render.mjs <baseUrl> <slug> [<slug>...] [--shots <dir>]
//
// For each article, at desktop (1440) and mobile (390) widths, checks: one
// H1 matching the post title, rendered body, all images loaded, no horizontal
// overflow, no JS exceptions, a /request/ call to action, and the article's
// presence on the blog index. Exits non-zero on any failure. Never submits forms.
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const shotsIdx = args.indexOf("--shots");
const shotsDir = shotsIdx >= 0 ? args.splice(shotsIdx, 2)[1] : null;
const [baseUrl, ...slugs] = args;
const port = process.env.CDP_PORT || 9333;
const config = JSON.parse(fs.readFileSync("das-publish.config.json", "utf8"));
const blog = JSON.parse(fs.readFileSync(config.output.blogJson, "utf8"));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function openTab() {
  const t = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" })).json();
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));
  let id = 0;
  const pending = new Map();
  const errors = [];
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
    if (m.method === "Runtime.exceptionThrown") {
      errors.push(m.params.exceptionDetails?.exception?.description?.split("\n")[0] || m.params.exceptionDetails?.text);
    }
  });
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  await send("Runtime.enable");
  await send("Page.enable");
  await send("Network.enable");
  await send("Network.setCacheDisabled", { cacheDisabled: true });
  return { ws, send, ev, errors };
}

const failures = [];
const results = [];

for (const slug of slugs) {
  const post = blog.posts.find((p) => p.slug === slug);
  if (!post) { failures.push(`${slug}: not in blog data`); continue; }
  for (const [label, width, height] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
    const tab = await openTab();
    await tab.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 768 });
    await tab.send("Page.navigate", { url: `${baseUrl}${post.post_path}` });
    await sleep(6000);
    await tab.ev(`(async()=>{for(let y=0;y<document.body.scrollHeight;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,100));}scrollTo(0,0);})()`);
    // Force lazy images to load and wait for each (or its error) before measuring.
    await tab.ev(`Promise.all([...document.querySelectorAll('article img')].map(i=>{i.loading='eager';
      return i.complete?null:new Promise(r=>{i.addEventListener('load',r,{once:true});i.addEventListener('error',r,{once:true});setTimeout(r,15000);});}))`);
    await sleep(500);
    const m = await tab.ev(`(()=>{const imgs=[...document.querySelectorAll('article img')];return {
      title: document.title,
      h1s: [...document.querySelectorAll('h1')].map(h=>h.textContent.trim()),
      bodyChars: (document.querySelector('.blog-prose')?.textContent||'').length,
      images: imgs.length,
      brokenImages: imgs.filter(i=>!(i.complete&&i.naturalWidth>0)).map(i=>i.src),
      overflow: document.documentElement.scrollWidth > innerWidth,
      requestLinks: document.querySelectorAll('.blog-prose a[href="/request/"]').length,
      telLinks: document.querySelectorAll('.blog-prose a[href^="tel:"]').length,
      notFound: /post not found|404/i.test(document.querySelector('main, #root')?.textContent?.slice(0,400)||''),
      gtm: !!document.querySelector('script[src*="googletagmanager.com/gtm.js"]'),
    }})()`);
    const r = { slug, label, ...m, jsErrors: tab.errors };
    results.push(r);
    if (m.h1s.length !== 1 || m.h1s[0] !== post.title) failures.push(`${slug}/${label}: H1 mismatch ${JSON.stringify(m.h1s)}`);
    if (m.bodyChars < 2000) failures.push(`${slug}/${label}: body not rendered (${m.bodyChars} chars)`);
    if (m.brokenImages.length) failures.push(`${slug}/${label}: broken images ${m.brokenImages.join(", ")}`);
    if (m.overflow) failures.push(`${slug}/${label}: horizontal overflow`);
    if (!m.requestLinks) failures.push(`${slug}/${label}: no /request/ CTA`);
    if (m.notFound) failures.push(`${slug}/${label}: not-found content`);
    if (tab.errors.length) failures.push(`${slug}/${label}: JS errors ${tab.errors.join(" | ")}`);
    if (shotsDir) {
      fs.mkdirSync(shotsDir, { recursive: true });
      const shot = await tab.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
      fs.writeFileSync(path.join(shotsDir, `${slug}-${label}.png`), Buffer.from(shot.result.data, "base64"));
    }
    await tab.send("Page.close").catch(() => {});
    tab.ws.close();
  }
}

// Blog index lists every requested slug.
{
  const tab = await openTab();
  await tab.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await tab.send("Page.navigate", { url: `${baseUrl}${config.blog.pathPrefix}` });
  await sleep(7000);
  const hrefs = await tab.ev(`[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))`);
  for (const slug of slugs) {
    const p = `${config.blog.pathPrefix}${slug}`;
    if (!hrefs.some((h) => h.replace(/\/$/, "") === p)) failures.push(`blog index: no link to ${p}/`);
  }
  results.push({ blogIndexLinks: hrefs.filter((h) => h.startsWith(config.blog.pathPrefix) && h !== config.blog.pathPrefix) });
  if (shotsDir) {
    const shot = await tab.send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(shotsDir, `blog-index.png`), Buffer.from(shot.result.data, "base64"));
  }
  await tab.send("Page.close").catch(() => {});
  tab.ws.close();
}

console.log(JSON.stringify(results, null, 1));
if (failures.length) {
  console.error("[verify-render] FAILED:\n  - " + failures.join("\n  - "));
  process.exit(1);
}
console.log("[verify-render] All checks passed.");
process.exit(0);
