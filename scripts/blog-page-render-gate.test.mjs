
import assert from "node:assert/strict";
import { test } from "node:test";

function shouldRenderBlogPage(hasResolvedPageId, postCount, isDedicatedPage) {
  if (!hasResolvedPageId) return false;
  if (postCount === 0 && !isDedicatedPage) return false;
  return true;
}

test("no resolved page id never renders", () => {
  assert.equal(shouldRenderBlogPage(false, 0, true), false);
  assert.equal(shouldRenderBlogPage(false, 5, true), false);
  assert.equal(shouldRenderBlogPage(false, 5, false), false);
});

test("dedicated blog page renders even with zero posts (LPS-1516)", () => {
  assert.equal(shouldRenderBlogPage(true, 0, true), true);
});

test("dedicated blog page renders with posts", () => {
  assert.equal(shouldRenderBlogPage(true, 3, true), true);
});

test("injected section collapses to null when empty", () => {
  assert.equal(shouldRenderBlogPage(true, 0, false), false);
});

test("injected section renders when it has posts", () => {
  assert.equal(shouldRenderBlogPage(true, 3, false), true);
});
