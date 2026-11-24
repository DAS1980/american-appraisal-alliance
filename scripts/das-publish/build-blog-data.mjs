#!/usr/bin/env node
// DAS Content Publishing Pipeline — compile prepared articles into the site's
// blog data file (reusable across LPS/Vite sites; client settings come from
// das-publish.config.json).
//
// Usage:
//   node scripts/das-publish/build-blog-data.mjs            write blog data
//   node scripts/das-publish/build-blog-data.mjs --check    validate only, write nothing
//   DAS_PUBLISH_NOW=2026-11-27T09:00:00-06:00 node ...      simulate a publish time
//
// Rules:
//   * An article is included only when status is "scheduled" or "published"
//     AND publish_at <= now. Future-dated and "hold" articles never reach the
//     blog data, so they never reach routes, the listing, or the sitemap.
//   * Posts not created by this pipeline (no `das_pipeline` flag) are kept
//     untouched — e.g. posts published earlier through the site builder.
//   * Output is deterministic; running twice with the same inputs produces an
//     identical file (idempotent — retries cannot duplicate posts).
import fs from "node:fs";
import path from "node:path";
import { parseFrontMatter, markdownToHtml, htmlToText } from "./lib/markdown.mjs";
import { imageSize } from "./lib/images.mjs";

const root = process.cwd();
const config = JSON.parse(fs.readFileSync(path.join(root, "das-publish.config.json"), "utf8"));
const checkOnly = process.argv.includes("--check");
const now = process.env.DAS_PUBLISH_NOW ? Date.parse(process.env.DAS_PUBLISH_NOW) : Date.now();
if (Number.isNaN(now)) throw new Error(`Invalid DAS_PUBLISH_NOW: ${process.env.DAS_PUBLISH_NOW}`);

const REQUIRED = ["id", "slug", "title", "meta_description", "excerpt", "category", "publish_at", "status", "featured_image", "featured_image_alt"];
const STATUSES = new Set(["scheduled", "published", "hold"]);
const errors = [];

function resolveImage(src) {
  if (!src.startsWith(config.imageUrlBase + "/")) return null;
  const file = path.join(root, "public", src);
  if (!fs.existsSync(file)) {
    errors.push(`Missing image file: public${src}`);
    return null;
  }
  const size = imageSize(fs.readFileSync(file));
  return { src, ...(size || {}) };
}

function loadArticles() {
  const dir = path.join(root, config.contentDir);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => {
      const { data, body } = parseFrontMatter(fs.readFileSync(path.join(dir, f), "utf8"));
      return { file: f, data, body };
    });
}

const articles = loadArticles();
const seenSlugs = new Set();
const seenIds = new Set();
const posts = [];

for (const { file, data, body } of articles) {
  for (const key of REQUIRED) if (!data[key]) errors.push(`${file}: missing front matter "${key}"`);
  if (!STATUSES.has(data.status)) errors.push(`${file}: status must be scheduled|published|hold`);
  if (seenSlugs.has(data.slug)) errors.push(`${file}: duplicate slug ${data.slug}`);
  if (seenIds.has(data.id)) errors.push(`${file}: duplicate id ${data.id}`);
  seenSlugs.add(data.slug);
  seenIds.add(data.id);
  if (file !== `${data.slug}.md`) errors.push(`${file}: filename must equal slug (${data.slug}.md)`);
  const publishTs = Date.parse(data.publish_at);
  if (Number.isNaN(publishTs)) errors.push(`${file}: invalid publish_at`);
  if (data.meta_description && data.meta_description.length > 160) {
    errors.push(`${file}: meta_description is ${data.meta_description.length} chars (max 160)`);
  }

  const bodyHtml = markdownToHtml(body, { resolveImage, siteUrl: config.siteUrl });
  for (const s of config.forbiddenStrings || []) {
    if ((body + JSON.stringify(data)).toLowerCase().includes(s.toLowerCase())) {
      errors.push(`${file}: contains forbidden string "${s}"`);
    }
  }
  // Only approved contact addresses may appear (never personal addresses).
  const allowed = new Set((config.allowedEmails || []).map((e) => e.toLowerCase()));
  for (const email of body.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || []) {
    if (!allowed.has(email.toLowerCase())) errors.push(`${file}: unapproved email address ${email}`);
  }
  if (data.featured_image) resolveImage(data.featured_image);
  if ((bodyHtml.match(/<h1\b/g) || []).length !== 1) errors.push(`${file}: body must contain exactly one H1`);

  const live = data.status !== "hold" && publishTs <= now;
  if (!live) continue;

  const words = htmlToText(bodyHtml).split(" ").filter(Boolean).length;
  const postPath = `${config.blog.pathPrefix}${data.slug}/`;
  posts.push({
    id: data.id,
    page_id: config.blog.pageId,
    page_slug: config.blog.pageSlug,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    body_html: bodyHtml,
    category: data.category,
    read_time_minutes: Math.max(1, Math.round(words / (config.wordsPerMinute || 225))),
    featured_image: config.siteUrl + data.featured_image,
    author: data.author || config.defaults.author,
    tags: data.tags || [],
    published_at: data.publish_at,
    updated_at: data.updated_at || data.publish_at,
    meta_description: data.meta_description,
    page_noindex: false,
    status: "published",
    post_path: postPath,
    das_pipeline: true,
  });
}

if (errors.length) {
  console.error("[das-publish] Validation failed:\n  - " + errors.join("\n  - "));
  process.exit(1);
}

const blogJsonPath = path.join(root, config.output.blogJson);
const existing = JSON.parse(fs.readFileSync(blogJsonPath, "utf8"));
const kept = existing.posts.filter((p) => !p.das_pipeline);
const allPosts = [...kept, ...posts].sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at));
const pages = existing.pages_with_blog.map((p) =>
  p.page_id === config.blog.pageId ? { ...p, post_count: allPosts.filter((x) => x.page_id === p.page_id).length } : p,
);
// Internal links to other articles must point at posts that are live now —
// a link to a future-dated or held article would render "Post not found".
const livePaths = new Set(allPosts.map((p) => p.post_path));
for (const p of posts) {
  for (const [, href] of p.body_html.matchAll(/href="(\/blog\/[^"#?]+)"/g)) {
    const normalized = href.endsWith("/") ? href : `${href}/`;
    if (!livePaths.has(normalized)) errors.push(`${p.slug}: links to ${href}, which is not a live post`);
  }
}
if (errors.length) {
  console.error("[das-publish] Validation failed:\n  - " + errors.join("\n  - "));
  process.exit(1);
}

const next = { ...existing, pages_with_blog: pages, posts: allPosts };
const serialized = JSON.stringify(next, null, 2) + "\n";

const summary = {
  now: new Date(now).toISOString(),
  articles: articles.length,
  livePipelinePosts: posts.map((p) => p.slug),
  keptNonPipelinePosts: kept.map((p) => p.slug),
  pending: articles.filter((a) => !posts.some((p) => p.id === a.data.id)).map((a) => `${a.data.slug} (${a.data.status}, ${a.data.publish_at})`),
};

if (checkOnly) {
  console.log("[das-publish] Check passed.", JSON.stringify(summary, null, 2));
  process.exit(0);
}

const current = fs.readFileSync(blogJsonPath, "utf8");
if (current === serialized) {
  console.log("[das-publish] No changes — blog data already up to date.");
} else {
  fs.writeFileSync(blogJsonPath, serialized);
  console.log("[das-publish] Wrote", config.output.blogJson);
}
if (config.output.publicJson) fs.writeFileSync(path.join(root, config.output.publicJson), serialized);
console.log(JSON.stringify(summary, null, 2));
