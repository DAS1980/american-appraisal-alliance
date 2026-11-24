/**
 * GTM dataLayer events for website interactions (GTM container GTM-TTFPBWJ7).
 *
 * One delegated, capture-phase click listener — registered once per page
 * load regardless of how many times PageLayout mounts during client-side
 * navigation — pushes:
 *
 *   click_to_call            any <a href="tel:..."> click
 *   appraisal_request_click  any link whose destination is /request/
 *
 * Parameters are limited to non-personal page context (page path, link
 * location, CTA text authored on this site). No visitor PII is ever read or
 * sent. These events reach GA4 only once matching Custom Event triggers and
 * GA4 event tags are configured in GTM.
 *
 * generate_lead is intentionally NOT pushed here: the HighLevel form is a
 * cross-origin iframe, and HighLevel's form_embed.js exposes no documented
 * submission event to the parent page. See the implementation report.
 */

type DataLayerEvent = Record<string, string | undefined> & { event: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
    __aaaAnalyticsListener?: boolean;
  }
}

function push(payload: DataLayerEvent): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

function linkLocation(el: Element): string | undefined {
  const section = el.closest("header, footer, section[id], nav");
  if (!section) return undefined;
  return section.id || section.tagName.toLowerCase();
}

function isRequestLink(anchor: HTMLAnchorElement): boolean {
  const raw = anchor.getAttribute("href") || "";
  if (!raw || /^(tel:|mailto:|#|javascript:)/i.test(raw)) return false;
  try {
    const url = new URL(raw, window.location.href);
    return url.origin === window.location.origin && /^\/request\/?$/.test(url.pathname);
  } catch {
    return false;
  }
}

export function registerAnalyticsListeners(): void {
  if (typeof window === "undefined" || window.__aaaAnalyticsListener) return;
  window.__aaaAnalyticsListener = true;

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      const base = {
        page_path: window.location.pathname,
        link_location: linkLocation(anchor),
      };

      if (/^tel:/i.test(href)) {
        push({ event: "click_to_call", ...base });
        return;
      }

      if (isRequestLink(anchor)) {
        push({
          event: "appraisal_request_click",
          ...base,
          link_text: (anchor.textContent || "").trim().slice(0, 100) || undefined,
        });
      }
    },
    true,
  );
}
