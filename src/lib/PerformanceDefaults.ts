/**
 * Performance Defaults
 *
 * Automatically optimizes images and LCP elements for high PageSpeed scores.
 * - Applies lazy loading and async decoding to all images
 * - Appends Unsplash auto-format/quality params for next-gen formats
 * - Identifies LCP candidate (largest above-fold image) and sets fetchpriority=high
 * - Injects <link rel="preload"> for the LCP image
 * - Uses MutationObserver to reapply defaults to dynamically added images
 */

const VIEWPORT_HEIGHT = window.innerHeight;

/** Append Unsplash auto-format params if the URL is from Unsplash */
function applyUnsplashParams(img: HTMLImageElement): void {
  const src = img.getAttribute('src') || '';
  if (src.includes('images.unsplash.com') && !src.includes('auto=format')) {
    const separator = src.includes('?') ? '&' : '?';
    img.setAttribute('src', `${src}${separator}auto=format&q=80`);
  }
}

/** Apply default loading/decoding attributes to an image */
function optimizeImage(img: HTMLImageElement): void {
  if (img.hasAttribute('data-perf-optimized')) return;
  img.setAttribute('data-perf-optimized', 'true');

  applyUnsplashParams(img);

  // Default to lazy loading and async decoding
  if (!img.hasAttribute('loading')) {
    img.setAttribute('loading', 'lazy');
  }
  if (!img.hasAttribute('decoding')) {
    img.setAttribute('decoding', 'async');
  }
}

/** Find the largest above-fold image and mark it as LCP candidate */
function promoteLCPCandidate(): void {
  const images = document.querySelectorAll<HTMLImageElement>('img');
  let lcpCandidate: HTMLImageElement | null = null;
  let largestArea = 0;

  images.forEach((img) => {
    const rect = img.getBoundingClientRect();
    // Only consider images whose top is within the initial viewport
    if (rect.top < VIEWPORT_HEIGHT && rect.bottom > 0) {
      const area = rect.width * rect.height;
      if (area > largestArea) {
        largestArea = area;
        lcpCandidate = img;
      }
    }
  });

  if (lcpCandidate) {
    const img = lcpCandidate as HTMLImageElement;
    // Override lazy loading for LCP — it must load eagerly
    img.setAttribute('loading', 'eager');
    img.setAttribute('fetchpriority', 'high');

    // Inject preload link in <head> if not already present
    const src = img.getAttribute('src');
    if (src && !document.querySelector(`link[rel="preload"][href="${CSS.escape(src)}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    }
  }
}

/** Run optimization on all current images, then identify LCP */
function optimizeAll(): void {
  document.querySelectorAll<HTMLImageElement>('img').forEach(optimizeImage);
  promoteLCPCandidate();
}

// Run after initial DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', optimizeAll);
} else {
  // DOM already parsed — run on next microtask to let React render
  queueMicrotask(optimizeAll);
}

// Re-run after full page load (images may have layout by then)
window.addEventListener('load', promoteLCPCandidate);

// Observe dynamically added images (e.g. from React rendering)
const observer = new MutationObserver((mutations) => {
  let hasNewImages = false;
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node instanceof HTMLImageElement) {
        optimizeImage(node);
        hasNewImages = true;
      } else if (node instanceof HTMLElement) {
        const imgs = node.querySelectorAll<HTMLImageElement>('img');
        if (imgs.length > 0) {
          imgs.forEach(optimizeImage);
          hasNewImages = true;
        }
      }
    }
  }
  // Re-evaluate LCP if new images appeared
  if (hasNewImages) {
    promoteLCPCandidate();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
