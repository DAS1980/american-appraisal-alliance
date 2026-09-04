/**
 * Virtual Overrides Utility
 * 
 * Communicates with the searchatlas-tagger plugin's virtualOverrides feature
 * to enable live code preview without persisting changes to disk.
 * 
 * This allows the Visual Editor to:
 * 1. Apply code changes instantly (virtual override)
 * 2. See real HMR updates (component re-renders with new code)
 * 3. Discard changes easily (clear override reverts to original)
 * 4. Save only when ready (persist to actual file)
 * 
 * Communication is done via Vite's WebSocket using custom events:
 * - searchatlas:override - Set virtual file content
 * - searchatlas:clear-override - Clear override for a file
 * - searchatlas:clear-all-overrides - Clear all overrides
 */

const DEBUG = true;

function log(message: string, data?: unknown) {
  if (!DEBUG) return;
  if (data !== undefined) {
    console.log(`[VirtualOverrides] ${message}`, data);
  } else {
    console.log(`[VirtualOverrides] ${message}`);
  }
}

/**
 * Get the Vite WebSocket connection
 * Vite exposes this on import.meta.hot in dev mode
 */
function getViteWebSocket(): WebSocket | null {
  // @ts-ignore - Vite's HMR API
  if (import.meta.hot) {
    // @ts-ignore
    return import.meta.hot;
  }
  return null;
}

/**
 * Send a custom event to Vite's WebSocket
 */
function sendViteEvent(event: string, data?: unknown) {
  const hot = getViteWebSocket();
  if (!hot) {
    log('Vite HMR not available');
    return false;
  }

  try {
    // @ts-ignore - Vite's HMR send method
    hot.send(event, data);
    log(`Sent ${event}`, data);
    return true;
  } catch (error) {
    log(`Failed to send ${event}:`, error);
    return false;
  }
}

/**
 * Set a virtual override for a file
 * The file will appear to have the given content until cleared
 * Vite will trigger HMR for the affected modules
 * 
 * @param filePath - Path to the file (relative to project root or absolute)
 * @param content - The new file content
 */
export function setVirtualOverride(filePath: string, content: string): boolean {
  log(`Setting override for: ${filePath}`);
  return sendViteEvent('searchatlas:override', { path: filePath, content });
}

/**
 * Clear the virtual override for a file
 * The file will revert to its original content on disk
 * Vite will trigger HMR to restore the original
 * 
 * @param filePath - Path to the file
 */
export function clearVirtualOverride(filePath: string): boolean {
  log(`Clearing override for: ${filePath}`);
  return sendViteEvent('searchatlas:clear-override', { path: filePath });
}

/**
 * Clear all virtual overrides
 * All files revert to their original content
 */
export function clearAllVirtualOverrides(): boolean {
  log('Clearing all overrides');
  return sendViteEvent('searchatlas:clear-all-overrides', undefined);
}

/**
 * Check if virtual overrides feature is available
 */
export function isVirtualOverridesAvailable(): boolean {
  return getViteWebSocket() !== null;
}

/**
 * Example usage for Visual Editor:
 * 
 * // User makes a visual edit (e.g., changes text-lg to text-xl)
 * const originalCode = await fetch('/src/components/Hero.tsx').then(r => r.text());
 * const modifiedCode = originalCode.replace('text-lg', 'text-xl');
 * 
 * // Apply as virtual override - instant HMR preview
 * setVirtualOverride('src/components/Hero.tsx', modifiedCode);
 * 
 * // User likes the change - save to actual file
 * await saveToFile('src/components/Hero.tsx', modifiedCode);
 * clearVirtualOverride('src/components/Hero.tsx');
 * 
 * // User doesn't like the change - discard
 * clearVirtualOverride('src/components/Hero.tsx'); // Reverts to original via HMR
 */

export type { };

