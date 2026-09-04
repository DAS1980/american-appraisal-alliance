/**
 * Embeddings Loader
 * 
 * Dynamically injects custom HTML/JS embeddings into the page.
 * Used for analytics tracking (Google Analytics, Meta Pixel), chat widgets, etc.
 * 
 * The embeddings.json file is updated by the agent daemon when the user
 * saves settings from the Settings tab in the frontend.
 * 
 * For dev preview: Embeddings are injected at runtime (this loader)
 * For published static: Embeddings are injected at build time (vite plugin)
 */

// Import embeddings config - Vite will hot-reload when this file changes
import embeddingsConfig from '../embeddings.json';

/**
 * Parse HTML string and inject each element into the target
 */
function injectHTML(html: string, target: HTMLElement | null): void {
  if (!html || !target) return;
  
  // Create a temporary container to parse the HTML
  const container = document.createElement('div');
  container.innerHTML = html;
  
  // Clone and inject each child element
  Array.from(container.children).forEach((child) => {
    // For script tags, we need to create new script elements
    // because innerHTML-created scripts don't execute
    if (child.tagName === 'SCRIPT') {
      const script = document.createElement('script');
      
      // Copy attributes
      Array.from(child.attributes).forEach((attr) => {
        script.setAttribute(attr.name, attr.value);
      });
      
      // Copy content (for inline scripts)
      if (child.textContent) {
        script.textContent = child.textContent;
      }

      // Ensure external scripts don't render-block: add defer if missing async/defer
      if (script.hasAttribute('src') && !script.hasAttribute('defer') && !script.hasAttribute('async')) {
        script.setAttribute('defer', '');
      }

      target.appendChild(script);
    } else {
      // For non-script elements, just clone and append
      target.appendChild(child.cloneNode(true));
    }
  });
}

/**
 * Load and inject embeddings into the page.
 * 
 * This is called once when the app initializes.
 * Vite HMR will reload the page when embeddings.json changes.
 */
export function loadEmbeddings(): void {
  // In production, embeddings are already injected into HTML at build time by the Vite plugin.
  // This loader only runs in dev preview where the plugin is disabled.
  if (import.meta.env.PROD) return;

  // Mark that we've loaded embeddings (prevent duplicate injection)
  const MARKER_ATTR = 'data-embeddings-loaded';
  if (document.documentElement.hasAttribute(MARKER_ATTR)) {
    return;
  }
  document.documentElement.setAttribute(MARKER_ATTR, 'true');
  
  const { header, footer } = embeddingsConfig;
  
  // Inject header embeddings into <head>
  if (header) {
    console.log('[Embeddings] Injecting header embeddings');
    injectHTML(header, document.head);
  }
  
  // Inject footer embeddings before </body>
  if (footer) {
    console.log('[Embeddings] Injecting footer embeddings');
    injectHTML(footer, document.body);
  }
}

// Auto-load on import
loadEmbeddings();

// Export for manual use if needed
export default { loadEmbeddings };

