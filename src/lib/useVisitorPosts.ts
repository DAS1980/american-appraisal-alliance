import { useCallback, useEffect, useRef, useState } from "react";

// Same reasoning as useFormSubmission: if this module is hot-swapped mid-session
// the hook count can change under React. Force a reload instead.
if (import.meta.hot) {
  import.meta.hot.decline();
}

/**
 * Runtime owner of reading a public visitor feed (LPS-1824).
 *
 * The published site is a static bundle, so entries cannot be baked in at build
 * time — a post written a minute ago has to arrive without a republish. This
 * reads the feed at runtime from the same origin `useFormSubmission` posts to.
 *
 * Pairs with a form carrying `data-form-uuid`: pass that same UUID here and the
 * section shows what visitors have written.
 */
export type VisitorPostsStatus = "idle" | "loading" | "ready" | "error";

export interface VisitorPost {
  id: string;
  name: string;
  message: string;
  photo_url: string;
  submitted_at: string;
}

export interface UseVisitorPostsResult {
  entries: VisitorPost[];
  status: VisitorPostsStatus;
  /** True while a `loadMore` is in flight, so a button can disable itself. */
  isLoadingMore: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  /** Re-read from the first page — call after a successful submission. */
  refresh: () => Promise<void>;
}

interface FeedPage {
  results?: unknown;
  next?: unknown;
}

function parseEntries(page: FeedPage): VisitorPost[] {
  if (!Array.isArray(page.results)) return [];
  return page.results.flatMap((row) => {
    if (!row || typeof row !== "object") return [];
    const entry = row as Record<string, unknown>;
    if (typeof entry.id !== "string") return [];
    return [
      {
        id: entry.id,
        name: typeof entry.name === "string" ? entry.name : "",
        message: typeof entry.message === "string" ? entry.message : "",
        photo_url: typeof entry.photo_url === "string" ? entry.photo_url : "",
        submitted_at:
          typeof entry.submitted_at === "string" ? entry.submitted_at : "",
      },
    ];
  });
}

export function useVisitorPosts(formUuid: string | undefined): UseVisitorPostsResult {
  const [entries, setEntries] = useState<VisitorPost[]>([]);
  const [status, setStatus] = useState<VisitorPostsStatus>("idle");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  // A late response from a superseded request must not overwrite fresher state.
  const requestId = useRef(0);

  const firstPageUrl = useCallback(() => {
    if (!formUuid || formUuid === "__FORM__") return null;
    const base = (import.meta.env.VITE_FORM_SUBMIT_URL as string | undefined) || "";
    return `${base}/api/public/forms/${formUuid}/entries/`;
  }, [formUuid]);

  const load = useCallback(
    async (url: string, mode: "replace" | "append") => {
      const id = ++requestId.current;
      if (mode === "replace") setStatus("loading");
      else setIsLoadingMore(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          // 404 is the deliberate answer for a form whose owner never turned
          // the feed on — an empty section, not a broken one.
          if (id === requestId.current) {
            setStatus(response.status === 404 ? "ready" : "error");
            if (mode === "replace") setEntries([]);
            setNextUrl(null);
          }
          return;
        }
        const page = (await response.json()) as FeedPage;
        if (id !== requestId.current) return;
        const parsed = parseEntries(page);
        setEntries((previous) =>
          mode === "append" ? [...previous, ...parsed] : parsed
        );
        setNextUrl(typeof page.next === "string" ? page.next : null);
        setStatus("ready");
      } catch {
        if (id === requestId.current) {
          setStatus("error");
          setNextUrl(null);
        }
      } finally {
        if (id === requestId.current) setIsLoadingMore(false);
      }
    },
    []
  );

  const refresh = useCallback(async () => {
    const url = firstPageUrl();
    if (!url) return;
    await load(url, "replace");
  }, [firstPageUrl, load]);

  const loadMore = useCallback(async () => {
    if (!nextUrl) return;
    await load(nextUrl, "append");
  }, [load, nextUrl]);

  useEffect(() => {
    const url = firstPageUrl();
    if (!url) {
      // Placeholder UUID: the scanner has not run yet (preview before first
      // publish). Show an empty feed rather than hammering a 404 URL.
      setStatus("ready");
      setEntries([]);
      return;
    }
    void load(url, "replace");
  }, [firstPageUrl, load]);

  return {
    entries,
    status,
    isLoadingMore,
    hasMore: Boolean(nextUrl),
    loadMore,
    refresh,
  };
}
