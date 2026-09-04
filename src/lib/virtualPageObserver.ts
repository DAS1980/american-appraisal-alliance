/**
 * Virtual Page Observer (LPS-854)
 *
 * Some static-HTML uploads ship as a single `index.html` whose nav doesn't
 * change the URL — instead a JS function (e.g. `navigate('#')`) toggles
 * an `.active` class on `<div class="page" id="page-X">` containers. The
 * editor's page-selector dropdown can't follow these "virtual" page changes
 * via URL signals because there are none.
 *
 * This module:
 *   1. **Detects** the JS-toggle SPA pattern at load (multiple `.page`
 *      elements, exactly one with `.active`). When the pattern isn't
 *      present, it's a complete no-op — every other upload type and every
 *      AI-generated SPA sees zero behavior change.
 *   2. **Observes** class-attribute mutations on the `.page` containers.
 *      When `.active` moves to a different element, posts `PAGE_CHANGED`
 *      to the parent with the new container's id (so PreviewFrame's
 *      pageId-based match resolves the right `Page` row).
 *   3. **Listens** for parent's `NAVIGATE_TO_VIRTUAL_PAGE` postMessage and
 *      programmatically clicks the matching nav trigger (looked up by
 *      `[data-page=…]`, `#nav-<slug>`, or as a last resort by an `<a>`
 *      whose `onclick` references the slug). Falls back to direct DOM
 *      class toggle when no nav trigger is found.
 */

import { isFromEditor, postToEditor } from './editor_channel';

interface VirtualPageChangedPayload {
  path: string;
  pageId?: string;
  pageName?: string;
}

interface NavigateToVirtualPagePayload {
  slug?: string;
  domId?: string;
}

let isInitialized = false;
let lastNotifiedDomId: string | null = null;

/** Strip a known prefix off a DOM container id to recover the page slug. */
function domIdToSlug(domId: string): string {
  return domId.replace(/^page[-_]/i, '').toLowerCase();
}

/** Best-effort name lookup from the existing nav (capitalized link text). */
function findNameForSlug(slug: string): string | undefined {
  const candidate =
    document.querySelector<HTMLElement>(`[data-page="${slug}"]`) ??
    document.querySelector<HTMLElement>(`#nav-${slug}`);
  const text = candidate?.textContent?.trim();
  return text || undefined;
}

function notifyVirtualPageChange(domId: string) {
  if (window === window.parent) return;
  if (domId === lastNotifiedDomId) return;
  lastNotifiedDomId = domId;

  const slug = domIdToSlug(domId);
  const payload: VirtualPageChangedPayload = {
    path: window.location.pathname,
    // Use the slug as pageId so PreviewFrame's pageId-based match
    // (`pages.find(p => p.page_id === payload.pageId)`) resolves; the
    // editor's `Page.page_id` for these rows is the slug (e.g. "menu",
    // "about"), not the DOM container id.
    pageId: slug,
    pageName: findNameForSlug(slug),
  };

  // eslint-disable-next-line no-console
  console.debug('[VirtualPageObserver] Sending PAGE_CHANGED:', payload);

  postToEditor({ type: 'PAGE_CHANGED', payload });
}

function findActivePageContainer(): HTMLElement | null {
  return document.querySelector<HTMLElement>('.page.active');
}

function attachClassObserver(containers: HTMLElement[]) {
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type !== 'attributes' || m.attributeName !== 'class') continue;
      const target = m.target as HTMLElement;
      if (target.classList.contains('active') && target.id) {
        notifyVirtualPageChange(target.id);
        return; // one notification per mutation batch
      }
    }
  });
  for (const c of containers) {
    observer.observe(c, { attributes: true, attributeFilter: ['class'] });
  }
}

/** Click the nav trigger that activates `slug`. Returns true on success. */
function triggerVirtualPageNavigation(slug: string, domId?: string): boolean {
  const candidates: HTMLElement[] = [];

  const dataPage = document.querySelector<HTMLElement>(
    `[data-page="${slug}"]`,
  );
  if (dataPage) candidates.push(dataPage);

  const navIdEl = document.querySelector<HTMLElement>(`#nav-${slug}`);
  if (navIdEl) candidates.push(navIdEl);

  if (!candidates.length) {
    // Fallback: scan anchors whose onclick references the slug.
    const onclickMatches = Array.from(
      document.querySelectorAll<HTMLElement>('a[onclick], button[onclick]'),
    ).filter((el) => {
      const onclick = el.getAttribute('onclick') || '';
      return new RegExp(`['"]${slug}['"]`).test(onclick);
    });
    candidates.push(...onclickMatches);
  }

  if (candidates.length) {
    candidates[0].click();
    return true;
  }

  // Last-resort: directly toggle the active class on the target container.
  // Only correct for the canonical `.page` + `#page-<slug>` shape; if the
  // user's HTML has a richer nav handler the prior selectors should have
  // matched.
  const targetId = domId || `page-${slug}`;
  const target = document.getElementById(targetId);
  if (target && target.classList.contains('page')) {
    document
      .querySelectorAll<HTMLElement>('.page.active')
      .forEach((el) => el.classList.remove('active'));
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return true;
  }

  return false;
}

function attachParentMessageListener() {
  window.addEventListener('message', (event: MessageEvent) => {
    if (!isFromEditor(event)) return;
    const data = event.data as
      | { type?: string; payload?: NavigateToVirtualPagePayload }
      | undefined;
    if (!data || data.type !== 'NAVIGATE_TO_VIRTUAL_PAGE') return;
    const { slug, domId } = data.payload || {};
    if (!slug && !domId) return;
    const targetSlug = slug || (domId ? domIdToSlug(domId) : '');
    if (!targetSlug) return;
    triggerVirtualPageNavigation(targetSlug, domId);
  });
}

/**
 * Initialize the observer if and only if the DOM looks like a JS-toggle
 * SPA. Idempotent — safe to invoke from multiple script tags or on HMR.
 */
export function initVirtualPageObserver(): void {
  if (window === window.parent) return;
  if (isInitialized) return;

  const containers = Array.from(
    document.querySelectorAll<HTMLElement>('.page[id]'),
  );
  // Pattern requires ≥2 page containers (so there's something to switch
  // BETWEEN) and exactly one currently active.
  if (containers.length < 2) return;
  const active = findActivePageContainer();
  if (!active) return;

  isInitialized = true;
  // eslint-disable-next-line no-console
  console.debug(
    '[VirtualPageObserver] Detected js-toggle SPA — attaching observer',
    { count: containers.length, active: active.id },
  );

  // Notify parent of current page so the dropdown is correct on initial load.
  notifyVirtualPageChange(active.id);

  attachClassObserver(containers);
  attachParentMessageListener();
}

export default initVirtualPageObserver;
