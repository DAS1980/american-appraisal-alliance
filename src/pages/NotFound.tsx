import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

/** Read the quiet flag `src/lib/quietHmr.ts` sets on <body>. */
function readQuiet(): boolean {
  return typeof document !== "undefined" && document.body?.dataset?.lpsQuiet === "1";
}

/**
 * LPS-2001 — during a landing→website conversion the routing structure changes
 * underneath the iframe, so a route can briefly resolve to nothing. Showing the
 * raw 404 there reads as "my site is gone" at the exact moment the user is most
 * invested. Mirror ErrorBoundary's `data-lps-quiet` check and show the same
 * neutral splash instead.
 *
 * The flag is observed rather than read once: if the window ends while this is
 * still mounted (route genuinely missing), we must fall back to the real 404
 * rather than spin forever.
 */
const NotFound = () => {
  const location = useLocation();
  const [isQuiet, setIsQuiet] = useState(readQuiet);

  useEffect(() => {
    if (typeof document === "undefined" || !document.body) return;
    const observer = new MutationObserver(() => setIsQuiet(readQuiet()));
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-lps-quiet"],
    });
    setIsQuiet(readQuiet());
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isQuiet) return;
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname, isQuiet]);

  if (isQuiet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-sm p-8">
          <div className="mx-auto mb-6 h-10 w-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <h2 className="text-lg font-medium text-foreground mb-1">
            Rebuilding your site…
          </h2>
          <p className="text-sm text-muted-foreground">
            Your preview will refresh automatically in a moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
