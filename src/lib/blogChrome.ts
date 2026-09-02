/**
 * Shared Header/Footer ("chrome") resolution rules for blog article pages (LPS-1411).
 *
 * CSR (App.tsx::getBlogChrome) resolves chrome via a runtime dynamic `@vite-ignore`
 * import; SSR (entry-server.tsx::resolveChrome) resolves it via an eager
 * `import.meta.glob`. The two MECHANISMS must differ, but the candidate paths and
 * the export-shape rule must stay identical — otherwise the client and the
 * pre-rendered HTML can disagree on whether a site has chrome, producing a
 * flash-then-disappear header/footer and an SEO-vs-rendered mismatch.
 */
import type { ComponentType, ReactNode } from "react";

export type ChromeName = "Header" | "Footer";

/** Ordered module paths a project's chrome may live at (page_creator convention first). */
export function chromeCandidatePaths(name: ChromeName): [string, string] {
  return [`./components/sections/${name}.tsx`, `./components/layout/${name}.tsx`];
}

/** Pick the component export from a resolved module: default export first, then named. */
export function pickChromeExport(
  mod: Record<string, unknown> | undefined,
  name: ChromeName,
): unknown {
  return mod?.default ?? mod?.[name];
}

/**
 * True when a dynamic-import failure means the module is genuinely ABSENT
 * (chrome-less site) rather than present-but-throwing-at-eval. A throw is a real
 * bug the caller should surface for repair; a miss should fall through quietly.
 * Mirrors the miss-detection in App.tsx::getLazyPageComponent. (LPS-1320)
 */
export function isChromeModuleMiss(e: unknown): boolean {
  return /failed to fetch dynamically imported module|unknown variable dynamic import|importing a module script failed|failed to resolve (?:module|import)/i.test(
    e instanceof Error ? e.message : String(e),
  );
}

/**
 * LPS-1866 — descriptor-driven chrome resolution.
 *
 * `chromeCandidatePaths` above could only express a Header/Footer PAIR at two
 * hardcoded paths, so a project whose chrome is a single <SiteLayout> wrapper —
 * what every multi-page export looks like — was invisible, and one named
 * `Navbar.tsx` resolved on the listing page but not on articles.
 *
 * The manifest now declares the answer. This module only maps that declaration
 * to module keys; CSR and SSR each look those keys up in their own glob. Keep
 * this logic PURE: scripts/chrome-resolution.test.mjs mirrors it, and the
 * CSR/SSR parity test is the guard against flash-then-disappear chrome.
 */

/** Glob patterns both entry points must use, so their key spaces match. */
export const CHROME_GLOB_PATTERNS = ["./components/**/*.tsx", "!./components/ui/**"];

export type ChromeKind = "wrapper" | "pair" | "static_markup" | "none";

export interface ChromeComponentRef {
  module: string;
  export: string;
  named: boolean;
}

export interface ChromeDescriptor {
  v?: number;
  kind?: string;
  source?: string;
  module?: string;
  export?: string;
  named?: boolean;
  header?: ChromeComponentRef;
  footer?: ChromeComponentRef;
}

export type SiteChrome =
  | { kind: "wrapper"; Wrapper: ComponentType<{ children?: ReactNode }> }
  | { kind: "pair"; Header: ComponentType; Footer: ComponentType }
  | { kind: "none" };

const KNOWN_KINDS = new Set<ChromeKind>(["wrapper", "pair", "static_markup", "none"]);

/**
 * True when the manifest actually declared chrome. (LPS-1866, pre-flight F1)
 *
 * ABSENT and kind:"none" are different states and must not be conflated:
 * absent means "not yet classified" and MUST fall back to the legacy
 * chromeCandidatePaths probe so un-backfilled projects keep the chrome they
 * render today; kind:"none" is a positive finding and is respected.
 */
export function hasDescriptor(raw: unknown): boolean {
  return !!raw && typeof raw === "object" && typeof (raw as ChromeDescriptor).kind === "string";
}

/**
 * `@/components/x` → `./components/x.tsx`, the key shape both globs produce.
 *
 * Rejects a `..` segment: the manifest descriptor is data, not a trusted path,
 * and a traversal segment must never survive into a module-key lookup even
 * though today's glob-map lookup already fails it closed.
 */
export function moduleKeyFor(module: string | undefined): string {
  if (typeof module !== "string" || !module.startsWith("@/")) return "";
  if (module.split("/").includes("..")) return "";
  return `./${module.slice(2)}.tsx`;
}

/** An unrecognised kind degrades to "none" — never throws. Version skew is certain. */
export function descriptorKind(raw: unknown): ChromeKind {
  if (!raw || typeof raw !== "object") return "none";
  const kind = (raw as ChromeDescriptor).kind as ChromeKind;
  return KNOWN_KINDS.has(kind) ? kind : "none";
}

/** Ordered module keys a resolver must look up: [wrapper] or [header, footer]. */
export function chromeModuleKeys(raw: unknown): string[] {
  const kind = descriptorKind(raw);
  const d = raw as ChromeDescriptor;
  if (kind === "wrapper") {
    const key = moduleKeyFor(d.module);
    return key ? [key] : [];
  }
  if (kind === "pair") {
    return [moduleKeyFor(d.header?.module), moduleKeyFor(d.footer?.module)].filter(Boolean);
  }
  return [];
}

/** Pick an export honouring the declared style: a default-only module re-imported
 *  as a named binding is `undefined` and throws on render. */
export function pickDeclaredExport(
  mod: Record<string, unknown> | undefined,
  exportName: string,
  named: boolean,
): unknown {
  if (!mod) return undefined;
  return named ? mod[exportName] : (mod.default ?? mod[exportName]);
}
