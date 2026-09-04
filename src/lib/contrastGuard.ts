// Runtime contrast guard (LPS-1025): shape-agnostic fallback to the write-time
// overlay fix. Adds a dark/light scrim (via an `::after` pseudo — no DOM nodes,
// React-safe) under full-bleed bg images whose text would otherwise be unreadable.

const DATA_ATTR = "data-lps-cg"; // presence triggers the ::after scrim
const OPT_OUT_ATTR = "data-lps-no-contrast-guard";
const STYLE_ID = "lps-contrast-guard-style";
const DARK_SCRIM = "linear-gradient(to bottom, rgba(0,0,0,0.76) 0%, rgba(0,0,0,0.66) 100%)";
const LIGHT_SCRIM = "linear-gradient(to bottom, rgba(249,248,246,0.86) 0%, rgba(249,248,246,0.80) 100%)";

const LIGHT_TEXT_LUMINANCE = 0.6;
const DARK_TEXT_LUMINANCE = 0.45;
const ADEQUATE_DARK = 0.55;
const ADEQUATE_LIGHT = 0.7;
const MIN_IMG_OPACITY = 0.35;
const MIN_BG_AREA = 60_000;
const COVER_RATIO = 0.85;
const OPAQUE_BG_ALPHA = 0.9;
const MAX_SCANS = 120;
const SCAN_DEBOUNCE_MS = 250;

interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

const processed = new WeakSet<Element>();

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const f = (n: number) =>
    l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function parseColor(value: string): RGBA | null {
  const rgb = value.match(
    /rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+%?))?\s*\)/i,
  );
  if (rgb) {
    let a = 1;
    if (rgb[4] != null) a = rgb[4].endsWith("%") ? parseFloat(rgb[4]) / 100 : parseFloat(rgb[4]);
    return { r: +rgb[1], g: +rgb[2], b: +rgb[3], a: Number.isFinite(a) ? a : 1 };
  }
  const hsl = value.match(
    /hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%(?:[\s,/]+([\d.]+%?))?\s*\)/i,
  );
  if (hsl) {
    let a = 1;
    if (hsl[4] != null) a = hsl[4].endsWith("%") ? parseFloat(hsl[4]) / 100 : parseFloat(hsl[4]);
    const [r, g, b] = hslToRgb(+hsl[1], +hsl[2], +hsl[3]);
    return { r, g, b, a: Number.isFinite(a) ? a : 1 };
  }
  return null;
}

function luminance({ r, g, b }: RGBA): number {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function coverage(c: RGBA, wantLight: boolean): number {
  return wantLight ? c.a * luminance(c) : c.a * (1 - luminance(c));
}

function gradientStops(bgImage: string): RGBA[] {
  const stops: RGBA[] = [];
  const re = /(?:rgba?|hsla?)\([^)]*\)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(bgImage)) !== null) {
    const c = parseColor(m[0]);
    if (c) stops.push(c);
  }
  return stops;
}

/** Worst-case coverage a layer guarantees (a gradient is only as strong as its weakest stop). */
function layerCoverage(el: Element, wantLight: boolean): number {
  const cs = getComputedStyle(el);
  let best = 0;
  const flat = parseColor(cs.backgroundColor);
  if (flat) best = coverage(flat, wantLight);
  if (cs.backgroundImage && cs.backgroundImage !== "none") {
    const stops = gradientStops(cs.backgroundImage);
    if (stops.length) best = Math.max(best, Math.min(...stops.map((s) => coverage(s, wantLight))));
  }
  return best;
}

function rect(el: Element): DOMRect {
  return el.getBoundingClientRect();
}

function coversContainer(el: Element, container: Element): boolean {
  const e = rect(el);
  const c = rect(container);
  if (c.width === 0 || c.height === 0) return false;
  return (
    (e.width * e.height) / (c.width * c.height) >= COVER_RATIO &&
    e.left <= c.left + 2 &&
    e.top <= c.top + 2
  );
}

function backdropContainer(el: HTMLElement): HTMLElement {
  let node: HTMLElement | null = el.parentElement;
  while (node && node !== document.body) {
    const pos = getComputedStyle(node).position;
    if (pos === "relative" || pos === "absolute" || pos === "fixed") return node;
    node = node.parentElement;
  }
  return el.parentElement ?? el;
}

function hasText(el: Element): boolean {
  return !!el.textContent && el.textContent.trim().length > 1;
}

/**
 * True when `el`'s own background — flat color OR gradient — is opaque. The
 * `background` shorthand (used by most AI-generated badges/pills) sets only
 * background-image, leaving computed backgroundColor transparent, so a
 * flat-color-only check misses these as unshielded (LPS-1939).
 */
function hasOpaqueOwnBackground(el: Element): boolean {
  const cs = getComputedStyle(el);
  const flat = parseColor(cs.backgroundColor);
  if (flat && flat.a >= OPAQUE_BG_ALPHA) return true;
  if (cs.backgroundImage && cs.backgroundImage !== "none") {
    const stops = gradientStops(cs.backgroundImage);
    if (stops.length && stops.every((s) => s.a >= OPAQUE_BG_ALPHA)) return true;
  }
  return false;
}

/**
 * True when `el` sits on its OWN opaque background within `root` (a card,
 * trust-bar, callout, etc.). Such text is already readable on its own surface,
 * so it must NOT vote on what scrim the *section background* needs — otherwise
 * a section with a white headline (on the image) plus a white card full of navy
 * text gets mis-judged as "wants light" and the whole section is veiled
 * near-white, washing the headline out (LPS-1215). Bare text directly on the
 * section background still drives the decision, so the guard keeps protecting
 * light text over bright images and text over busy/text-containing images.
 */
function onOwnOpaqueBackground(el: Element | null, root: Element): boolean {
  let node: Element | null = el;
  while (node && node !== root) {
    if (hasOpaqueOwnBackground(node)) return true;
    node = node.parentElement;
  }
  return false;
}

function zIndexOf(el: Element): number {
  const z = parseInt(getComputedStyle(el).zIndex, 10);
  return Number.isFinite(z) ? z : 0;
}

/** Dominant readable-text direction in the section, or null if mixed/none. */
function textDirection(root: HTMLElement): "dark" | "light" | null {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let light = 0;
  let dark = 0;
  let checked = 0;
  let node: Node | null;
  while ((node = walker.nextNode()) && checked < 24) {
    const text = node.textContent?.trim();
    if (!text || text.length < 2) continue;
    const parent = node.parentElement;
    if (!parent) continue;
    // Text shielded by its own opaque background (cards, trust-bars, callouts)
    // is already legible there and must not drive the section-background scrim
    // decision (LPS-1215).
    if (onOwnOpaqueBackground(parent, root)) continue;
    const c = parseColor(getComputedStyle(parent).color);
    if (!c || c.a <= 0.25) continue;
    checked += 1;
    const lum = luminance(c);
    if (lum > LIGHT_TEXT_LUMINANCE) light += 1;
    else if (lum < DARK_TEXT_LUMINANCE) dark += 1;
  }
  if (light === 0 && dark === 0) return null;
  if (light > 0 && dark > 0 && Math.max(light, dark) < Math.min(light, dark) * 2) return null;
  return light >= dark ? "dark" : "light";
}

/** Strongest existing full-cover overlay (className OR inline style). */
function existingCoverage(container: HTMLElement, wantLight: boolean, skip: Element | null): number {
  let best = 0;
  for (const child of Array.from(container.children)) {
    if (child === skip || hasText(child)) continue;
    const cs = getComputedStyle(child);
    if (cs.position !== "absolute" && cs.position !== "fixed") continue;
    if (!coversContainer(child, container)) continue;
    best = Math.max(best, layerCoverage(child, wantLight));
  }
  return best;
}

function hasStickyOrFixedDescendant(container: HTMLElement): boolean {
  for (const el of Array.from(container.querySelectorAll<HTMLElement>("*"))) {
    const pos = getComputedStyle(el).position;
    if (pos === "sticky" || pos === "fixed") return true;
  }
  return false;
}

/**
 * Pick the scrim's z-index, or null to skip. The scrim is a `::after` pseudo
 * (always painted last among its host's children at its z), so it must sit
 * STRICTLY below the lowest content layer to never cover text:
 *   scrimZ = minContentZ − 1, and scrimZ ≥ the backdrop image's z (so it
 *   still covers the image). Content children must all be positioned (so they
 *   own a layer); a static one, or text already shielded by an opaque bg, → skip.
 */
function planScrimZ(container: HTMLElement, imgSource: Element | null): number | null {
  const contentChildren = Array.from(container.children).filter(hasText);
  if (contentChildren.length === 0) return null;
  let minContentZ = Infinity;
  let allOpaque = true;
  for (const c of contentChildren) {
    const cs = getComputedStyle(c);
    if (cs.position === "static") return null;
    minContentZ = Math.min(minContentZ, zIndexOf(c));
    if (!hasOpaqueOwnBackground(c)) allOpaque = false;
  }
  if (allOpaque) return null;
  const imageZ = imgSource ? zIndexOf(imgSource) : -1; // CSS bg paints at the very bottom
  const scrimZ = minContentZ - 1;
  if (scrimZ < imageZ || scrimZ < 0) return null; // can't sit above image yet below content
  return scrimZ;
}

function ensureStyle(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent =
    `[${DATA_ATTR}]::after{content:"";position:absolute;inset:0;pointer-events:none;` +
    `z-index:var(--lps-cg-z,0);background:var(--lps-cg-bg);}`;
  document.head.appendChild(style);
}

function guardElement(container: HTMLElement, imgSource: Element | null): void {
  if (processed.has(container) || container.hasAttribute(DATA_ATTR)) return;
  processed.add(container);
  if (container.closest(`[${OPT_OUT_ATTR}]`)) return;
  const r = rect(container);
  if (r.width * r.height < MIN_BG_AREA) return;

  const dir = textDirection(container);
  if (dir === null) return;
  const wantLight = dir === "light";

  if (existingCoverage(container, wantLight, imgSource) >= (wantLight ? ADEQUATE_LIGHT : ADEQUATE_DARK)) {
    return;
  }
  if (hasStickyOrFixedDescendant(container)) return;
  const scrimZ = planScrimZ(container, imgSource);
  if (scrimZ === null) return;

  // ---- write: attribute + CSS vars only (no node insertion, no content mutation) ----
  ensureStyle();
  if (getComputedStyle(container).position === "static") container.style.position = "relative";
  container.style.setProperty("--lps-cg-bg", wantLight ? LIGHT_SCRIM : DARK_SCRIM);
  container.style.setProperty("--lps-cg-z", String(scrimZ));
  container.setAttribute(DATA_ATTR, "");
}

let observer: MutationObserver | null = null;
let scanCount = 0;

function scan(): void {
  if (typeof document === "undefined") return;
  if (scanCount >= MAX_SCANS) {
    observer?.disconnect();
    observer = null;
    return;
  }
  scanCount += 1;

  const root = document.getElementById("root") ?? document.body;
  if (!root) return;

  for (const el of Array.from(root.querySelectorAll<HTMLElement>("img, video"))) {
    if (processed.has(el)) continue;
    processed.add(el);
    const cs = getComputedStyle(el);
    if (cs.position !== "absolute" && cs.position !== "fixed") continue;
    if (cs.objectFit !== "cover" && cs.objectFit !== "fill") continue;
    if (parseFloat(cs.opacity) < MIN_IMG_OPACITY) continue;
    const container = backdropContainer(el);
    if (!coversContainer(el, container)) continue;
    guardElement(container, el);
  }
  for (const el of Array.from(root.querySelectorAll<HTMLElement>("section, header, div"))) {
    if (processed.has(el) || el.hasAttribute(DATA_ATTR)) continue;
    const cs = getComputedStyle(el);
    if (!cs.backgroundImage || !cs.backgroundImage.includes("url(")) continue;
    guardElement(el, null);
  }
}

function install(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const run = () => {
    try {
      scan();
    } catch {
      // A safety net must never throw into the app.
    }
  };

  const kick = () => {
    run();
    setTimeout(run, 300);
    setTimeout(run, 1200);
  };
  if (document.readyState === "complete" || document.readyState === "interactive") {
    requestAnimationFrame(kick);
  } else {
    window.addEventListener("DOMContentLoaded", () => requestAnimationFrame(kick));
  }

  // Re-scan only on element additions (debounced). Attribute/style writes
  // aren't observed (childList only), so our own writes never retrigger it.
  let pending = 0;
  const debounced = (records: MutationRecord[]) => {
    if (pending) return;
    let added = false;
    for (const rec of records) {
      if (rec.addedNodes.length) {
        for (const n of Array.from(rec.addedNodes)) {
          if (n.nodeType === 1) {
            added = true;
            break;
          }
        }
      }
      if (added) break;
    }
    if (!added) return;
    pending = window.setTimeout(() => {
      pending = 0;
      run();
    }, SCAN_DEBOUNCE_MS);
  };
  const observeRoot = () => {
    const root = document.getElementById("root") ?? document.body;
    observer = new MutationObserver(debounced);
    observer.observe(root, { childList: true, subtree: true });
  };
  if (document.getElementById("root")) observeRoot();
  else window.addEventListener("DOMContentLoaded", observeRoot);

  const wrap = (fn: typeof history.pushState) =>
    function (this: History, ...args: Parameters<typeof history.pushState>) {
      const ret = fn.apply(this, args);
      requestAnimationFrame(kick);
      return ret;
    };
  history.pushState = wrap(history.pushState);
  history.replaceState = wrap(history.replaceState);
  window.addEventListener("popstate", () => requestAnimationFrame(kick));
}

install();

export {};
