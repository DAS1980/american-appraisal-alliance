import { useEffect, useState } from "react";

interface ManifestPage {
  id: string;
  slug: string;
  isHome?: boolean;
  hasBlogSection?: boolean;
}

/** Resolves the current pathname to a manifest page id, or null. Loads the
 *  manifest async via fetch — same source App.tsx uses — so we don't ship a
 *  stale snapshot.
 *
 *  Lives in its own module (not BlogListing.tsx) so that component file exports
 *  only a component: react-swc Fast Refresh requires "consistent component
 *  exports", and a hook exported alongside a component forces a full page
 *  reload instead of HMR on every edit (LPS-1399). */
export function useResolvedPageId(
  explicitPageId: string | undefined,
  pathname: string,
): string | null {
  const [resolved, setResolved] = useState<string | null>(explicitPageId ?? null);

  useEffect(() => {
    if (explicitPageId) {
      setResolved(explicitPageId);
      return;
    }
    let cancelled = false;
    fetch(`${import.meta.env.BASE_URL}pages.manifest.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((manifest) => {
        if (cancelled || !manifest?.pages) return;
        const normalized = pathname.toLowerCase().replace(/\/$/, "") || "/";
        const match = (manifest.pages as ManifestPage[]).find((p) => {
          const pPath = p.isHome || !p.slug ? "/" : `/${p.slug}`;
          return pPath === normalized;
        });
        setResolved(match?.id ?? null);
      })
      .catch(() => {
        if (!cancelled) setResolved(null);
      });
    return () => {
      cancelled = true;
    };
  }, [explicitPageId, pathname]);

  return resolved;
}
