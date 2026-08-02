/**
 * Visual Editor Inspector
 * 
 * This script runs inside the preview iframe and provides:
 * - Element highlighting on hover
 * - Element selection on click
 * - Live preview of style edits
 * - Communication with parent window via postMessage
 * - Tailwind class detection and reverse lookup
 * - Element attribute extraction for context-aware controls
 */

import { 
  loadTailwindConfig, 
  detectTailwindClasses,
  getAvailableColors,
  getAvailableFontSizes,
  getAvailableFontWeights,
  getAvailableBorderRadius,
  type DetectedClasses 
} from './tailwindResolver';

import {
  setVirtualOverride,
  clearVirtualOverride,
  clearAllVirtualOverrides,
  isVirtualOverridesAvailable
} from './virtualOverrides';

import {
  getManifestSync,
  getSectionFilePath,
  getPagesUsingSection,
  type PagesManifest,
} from './manifest';

// =============================================================================
// Debug Logging
// =============================================================================

const DEBUG = false; // Set to true for debugging

function log(category: string, message: string, data?: unknown) {
  if (!DEBUG) return;
  const prefix = `[Inspector:${category}]`;
  if (data !== undefined) {
    console.log(prefix, message, data);
  } else {
    console.log(prefix, message);
  }
}

function logError(category: string, message: string, error?: unknown) {
  const prefix = `[Inspector:${category}]`;
  console.error(prefix, message, error);
}

// =============================================================================
// Source Key Symbol (matches lovable-tagger)
// =============================================================================

// This must match the Symbol used by lovable-tagger's jsxSource feature
const SOURCE_KEY = Symbol.for("__jsxSource__");

// Type for the source info stored by lovable-tagger
interface JsxSourceInfo {
  fileName: string;
  lineNumber: number;
  columnNumber: number;
  displayName?: string;
}

// WeakRef type (ES2021)
interface WeakRef<T extends object> {
  readonly [Symbol.toStringTag]: "WeakRef";
  deref(): T | undefined;
}

// Extend HTMLElement to include the source info
declare global {
  interface HTMLElement {
    [SOURCE_KEY]?: JsxSourceInfo;
  }
  interface Window {
    sourceElementMap?: Map<string, Set<WeakRef<HTMLElement>>>;
  }
}

// =============================================================================
// Types (mirror types from parent - keep in sync)
// =============================================================================

interface ElementLocation {
  lovId: string;
  filePath: string;
  lineNumber: number;
  columnNumber: number;
}

interface ElementRect {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface ElementStyles {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: string;
  color?: string;
  textDecoration?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  borderWidth?: string;
  borderColor?: string;
  borderRadius?: string;
  borderStyle?: string;
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  minWidth?: string;
  maxHeight?: string;
  minHeight?: string;
  boxShadow?: string;
  opacity?: string;
}

/**
 * Element attributes for context-aware controls
 */
interface ElementAttributes {
  // Image attributes
  src?: string;
  alt?: string;
  // Link attributes
  href?: string;
  target?: string;
  // Button/input attributes
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  // Generic
  id?: string;
  role?: string;
  ariaLabel?: string;
}

/**
 * Detected Tailwind classes (reverse lookup from computed styles)
 */
interface DetectedTailwindClasses {
  fontSize?: { className: string; value: string };
  fontWeight?: { className: string; value: string };
  textColor?: { className: string; value: string };
  backgroundColor?: { className: string; value: string };
  borderColor?: { className: string; value: string };
  borderRadius?: { className: string; value: string };
  opacity?: { className: string; value: string };
  display?: { className: string; value: string };
  // Add more as needed
}

/**
 * Element type hints for showing relevant controls
 */
type ElementTypeHint = 
  | 'text'           // h1-h6, p, span with text
  | 'container'      // div, section, main, article
  | 'image'          // img, or element with background-image
  | 'link'           // a tag
  | 'button'         // button, input[type=button/submit]
  | 'input'          // input, textarea, select
  | 'media'          // video, audio, iframe
  | 'list'           // ul, ol, li
  | 'unknown';

interface SelectedElement {
  location: ElementLocation;
  tagName: string;
  textContent?: string;
  className?: string;
  computedStyles: ElementStyles;
  boundingRect: ElementRect;
  // New fields for context-aware editing
  attributes: ElementAttributes;
  detectedClasses: DetectedTailwindClasses;
  elementType: ElementTypeHint;
  hasBackgroundImage: boolean;
  hasBorder: boolean;
  isFlexContainer: boolean;
  isGridContainer: boolean;
  /** Whether element has dynamic styling (CSS-in-JS, inline styles with JS vars) */
  hasDynamicStyling: boolean;
  // Multi-page awareness
  /** Page IDs that use this section/component */
  affectedPages: string[];
  /** Whether this is a shared layout component (Header/Footer) affecting all pages */
  isSharedComponent: boolean;
  /** Section name if this is from a recognized section */
  sectionName?: string;
  /** Loop context if element is rendered inside a .map() or loop */
  loopContext?: {
    instanceIndex: number;
    instanceCount: number;
  } | null;
}

interface VisualEdit {
  type: 'style' | 'text' | 'class' | 'attribute';
  property: string;
  value: string;
  previousValue?: string;
}

type ParentMessage =
  | { type: 'ENABLE_INSPECTOR' }
  | { type: 'DISABLE_INSPECTOR' }
  | { type: 'PREVIEW_EDIT'; payload: { lovId: string; edit: VisualEdit; instanceIndex?: number } }
  | { type: 'REVERT_PREVIEW' }
  | { type: 'SELECT_ELEMENT'; payload: { lovId: string; instanceIndex?: number } }
  | { type: 'SELECT_PARENT' }  // Select parent of currently selected element
  | { type: 'SELECT_CHILD'; payload: { index: number } }  // Select nth child of current element
  | { type: 'SELECT_SIBLING'; payload: { direction: 'prev' | 'next' } }  // Select previous/next sibling
  // Virtual overrides - for live code preview without persisting to disk
  | { type: 'SET_VIRTUAL_OVERRIDE'; payload: { filePath: string; content: string } }
  | { type: 'CLEAR_VIRTUAL_OVERRIDE'; payload: { filePath: string } }
  | { type: 'CLEAR_ALL_VIRTUAL_OVERRIDES' }
  | { type: 'GET_CAPABILITIES' } // Request available features
  // Interaction blocking - for vibe coding (post-generation edits)
  | { type: 'DISABLE_INTERACTIONS' }
  | { type: 'ENABLE_INTERACTIONS' };

// =============================================================================
// Inspector State
// =============================================================================

class VisualInspector {
  private isActive = false;
  private overlay: HTMLDivElement | null = null;
  private selectedOverlay: HTMLDivElement | null = null;
  private contextMenu: HTMLDivElement | null = null;
  private currentHoveredElement: HTMLElement | null = null;
  private selectedElement: HTMLElement | null = null;
  // Track original classNames per element (lovId) for proper revert
  private originalClassNames: Map<string, string> = new Map();
  private previewedChanges: Map<string, { 
    element: HTMLElement; 
    originalValue: string; 
    property: string;
    editType: 'text' | 'style' | 'class';
  }> = new Map();
  private tailwindConfigLoaded = false;
  // Interaction blocking for vibe coding
  private interactionsDisabled = false;
  private interactionBlockerStyle: HTMLStyleElement | null = null;

  constructor() {
    log('Init', '🚀 VisualInspector constructor called');
    log('Init', `Running in iframe: ${window !== window.parent}`);
    log('Init', `Document readyState: ${document.readyState}`);
    
    this.createOverlays();
    this.setupMessageListener();
    this.notifyReady();
    
    // Load Tailwind config for reverse lookups
    this.initTailwindConfig();
    
    // Debug: Check for elements with source info (from lovable-tagger)
    this.debugCheckSourceElements();
  }
  
  /**
   * Initialize Tailwind config for class detection
   */
  private async initTailwindConfig() {
    try {
      const config = await loadTailwindConfig();
      if (config) {
        this.tailwindConfigLoaded = true;
        log('Init', '✅ Tailwind config loaded - reverse lookups available');
      } else {
        log('Init', '⚠️ Tailwind config not found - using fallback detection');
      }
    } catch (error) {
      logError('Init', 'Failed to load Tailwind config:', error);
    }
  }
  
  private debugCheckSourceElements() {
    // Check for elements with SOURCE_KEY symbol (lovable-tagger style)
    const elementsWithSource = this.findAllElementsWithSource();
    log('Init', `Found ${elementsWithSource.length} elements with __jsxSource__ symbol`);
    
    if (elementsWithSource.length > 0) {
      const sample = elementsWithSource.slice(0, 5).map(el => {
        const source = el[SOURCE_KEY];
        return {
          tag: el.tagName,
          fileName: source?.fileName,
          line: source?.lineNumber,
          col: source?.columnNumber,
          displayName: source?.displayName,
        };
      });
      log('Init', 'Sample elements with source:', sample);
    } else {
      // Also check window.sourceElementMap from lovable-tagger
      const mapSize = window.sourceElementMap?.size ?? 0;
      log('Init', `window.sourceElementMap size: ${mapSize}`);
      
      if (mapSize === 0) {
        logError('Init', '⚠️ NO elements with __jsxSource__ found! lovable-tagger may not be working.');
        logError('Init', 'Possible causes:');
        logError('Init', '  1. Vite not running in development mode');
        logError('Init', '  2. lovable-tagger jsxSource feature not enabled (need: componentTagger({ jsxSource: true }))');
        logError('Init', '  3. Page still loading/hydrating');
        
        // Schedule delayed checks
        this.scheduleDelayedSourceCheck();
      }
    }
  }
  
  private findAllElementsWithSource(): HTMLElement[] {
    const results: HTMLElement[] = [];
    const walk = (node: Node) => {
      if (node instanceof HTMLElement && node[SOURCE_KEY]) {
        results.push(node);
      }
      for (const child of node.childNodes) {
        walk(child);
      }
    };
    walk(document.body);
    return results;
  }
  
  private scheduleDelayedSourceCheck() {
    // Check again after delays to catch hydration
    const delays = [500, 1000, 2000, 5000];
    
    delays.forEach(delay => {
      setTimeout(() => {
        const elements = this.findAllElementsWithSource();
        const mapSize = window.sourceElementMap?.size ?? 0;
        
        if (elements.length > 0 || mapSize > 0) {
          log('DelayedCheck', `✅ After ${delay}ms: Found ${elements.length} elements with __jsxSource__, sourceElementMap size: ${mapSize}`);
          if (elements.length > 0) {
            const sample = elements.slice(0, 3).map(el => {
              const source = el[SOURCE_KEY];
              return {
                tag: el.tagName,
                file: source?.fileName,
                line: source?.lineNumber,
              };
            });
            log('DelayedCheck', 'Sample:', sample);
          }
        } else {
          log('DelayedCheck', `⚠️ After ${delay}ms: Still 0 elements with __jsxSource__`);
        }
      }, delay);
    });
  }

  // ===========================================================================
  // Setup
  // ===========================================================================

  private createOverlays() {
    log('Setup', 'Creating overlays...');
    
    // Hover overlay (blue)
    this.overlay = document.createElement('div');
    this.overlay.id = 'lps-inspector-overlay';
    this.overlay.style.cssText = `
      position: fixed;
      pointer-events: none;
      background: rgba(59, 130, 246, 0.15);
      border: 2px solid rgba(59, 130, 246, 0.8);
      border-radius: 4px;
      z-index: 99999;
      display: none;
      transition: all 0.1s ease-out;
    `;
    document.body.appendChild(this.overlay);

    // Selected overlay (green)
    this.selectedOverlay = document.createElement('div');
    this.selectedOverlay.id = 'lps-inspector-selected';
    this.selectedOverlay.style.cssText = `
      position: fixed;
      pointer-events: none;
      background: rgba(34, 197, 94, 0.1);
      border: 2px solid rgba(34, 197, 94, 0.9);
      border-radius: 4px;
      z-index: 99998;
      display: none;
    `;
    document.body.appendChild(this.selectedOverlay);

    // Context menu for element navigation
    this.contextMenu = document.createElement('div');
    this.contextMenu.id = 'lps-inspector-context-menu';
    this.contextMenu.style.cssText = `
      position: fixed;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
      z-index: 100001;
      display: none;
      min-width: 200px;
      max-width: 300px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 12px;
      color: #e0e0e0;
      overflow: hidden;
      pointer-events: auto;
    `;
    document.body.appendChild(this.contextMenu);
    
    log('Setup', 'Overlays and context menu created and appended to body');
  }

  private setupMessageListener() {
    log('Setup', 'Setting up postMessage listener...');
    
    window.addEventListener('message', (event) => {
      log('Message', `Received message from origin: ${event.origin}`, event.data);
      
      // Security: In production, verify origin
      const message = event.data as ParentMessage;
      if (!message || typeof message.type !== 'string') {
        log('Message', 'Ignoring non-inspector message');
        return;
      }

      this.handleMessage(message);
    });
    
    log('Setup', 'postMessage listener registered');
  }

  private handleMessage(message: ParentMessage) {
    log('Message', `Handling message type: ${message.type}`);
    
    switch (message.type) {
      case 'ENABLE_INSPECTOR':
        log('Message', '✅ ENABLE_INSPECTOR received');
        this.enable();
        break;

      case 'DISABLE_INSPECTOR':
        log('Message', '❌ DISABLE_INSPECTOR received');
        this.disable();
        break;

      case 'PREVIEW_EDIT':
        log('Message', 'PREVIEW_EDIT received', message.payload);
        this.previewEdit(message.payload.lovId, message.payload.edit, message.payload.instanceIndex);
        break;

      case 'REVERT_PREVIEW':
        log('Message', 'REVERT_PREVIEW received');
        this.revertAllPreviews();
        break;

      case 'SELECT_ELEMENT':
        log('Message', 'SELECT_ELEMENT received', message.payload);
        this.selectElementByLovId(message.payload.lovId, message.payload.instanceIndex);
        break;

      case 'SELECT_PARENT':
        log('Message', 'SELECT_PARENT received');
        this.selectParentElement();
        break;

      case 'SELECT_CHILD':
        log('Message', 'SELECT_CHILD received', message.payload);
        this.selectChildElement(message.payload.index);
        break;

      case 'SELECT_SIBLING':
        log('Message', 'SELECT_SIBLING received', message.payload);
        this.selectSiblingElement(message.payload.direction);
        break;

      // Virtual override handlers - for live code preview
      case 'SET_VIRTUAL_OVERRIDE':
        log('Message', 'SET_VIRTUAL_OVERRIDE received', { filePath: message.payload.filePath });
        this.handleSetVirtualOverride(message.payload.filePath, message.payload.content);
        break;

      case 'CLEAR_VIRTUAL_OVERRIDE':
        log('Message', 'CLEAR_VIRTUAL_OVERRIDE received', message.payload);
        this.handleClearVirtualOverride(message.payload.filePath);
        break;

      case 'CLEAR_ALL_VIRTUAL_OVERRIDES':
        log('Message', 'CLEAR_ALL_VIRTUAL_OVERRIDES received');
        this.handleClearAllVirtualOverrides();
        break;

      case 'GET_CAPABILITIES':
        log('Message', 'GET_CAPABILITIES received');
        this.sendCapabilities();
        break;

      case 'DISABLE_INTERACTIONS':
        log('Message', '🚫 DISABLE_INTERACTIONS received - blocking clicks during vibe coding');
        this.disableInteractions();
        break;

      case 'ENABLE_INTERACTIONS':
        log('Message', '✅ ENABLE_INTERACTIONS received - restoring interactions');
        this.enableInteractions();
        break;
        
      default:
        log('Message', `Unknown message type: ${(message as any).type}`);
    }
  }

  // ===========================================================================
  // Virtual Override Handlers
  // ===========================================================================

  private handleSetVirtualOverride(filePath: string, content: string) {
    const success = setVirtualOverride(filePath, content);
    window.parent.postMessage({
      type: 'VIRTUAL_OVERRIDE_RESULT',
      payload: { filePath, success, action: 'set' }
    }, '*');
  }

  private handleClearVirtualOverride(filePath: string) {
    const success = clearVirtualOverride(filePath);
    window.parent.postMessage({
      type: 'VIRTUAL_OVERRIDE_RESULT',
      payload: { filePath, success, action: 'clear' }
    }, '*');
  }

  private handleClearAllVirtualOverrides() {
    const success = clearAllVirtualOverrides();
    window.parent.postMessage({
      type: 'VIRTUAL_OVERRIDE_RESULT',
      payload: { success, action: 'clear_all' }
    }, '*');
  }

  private sendCapabilities() {
    window.parent.postMessage({
      type: 'CAPABILITIES',
      payload: {
        virtualOverrides: isVirtualOverridesAvailable(),
        tailwindConfig: this.tailwindConfigLoaded,
        jsxSource: true,
      }
    }, '*');
  }

  private notifyReady() {
    log('Setup', '📤 Sending INSPECTOR_READY to parent...');
    window.parent.postMessage({ 
      type: 'INSPECTOR_READY',
      payload: {
        capabilities: {
          virtualOverrides: isVirtualOverridesAvailable(),
          tailwindConfig: false, // Will be updated after config loads
          jsxSource: true,
        }
      }
    }, '*');
    log('Setup', '✅ INSPECTOR_READY sent');
  }

  // ===========================================================================
  // Enable/Disable
  // ===========================================================================

  enable() {
    log('State', `enable() called, isActive=${this.isActive}`);
    
    if (this.isActive) {
      log('State', 'Already active, skipping enable');
      return;
    }
    this.isActive = true;

    log('State', 'Adding event listeners (mousemove, click, keydown, contextmenu, scroll)...');
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('click', this.handleClick, true);
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('contextmenu', this.handleContextMenu, true);
    window.addEventListener('scroll', this.handleScroll, true);

    // Add cursor style
    document.body.style.cursor = 'crosshair';
    
    log('State', '✅ Inspector ENABLED - cursor set to crosshair');
    
    // Re-check for elements with source info after enabling
    this.debugCheckSourceElements();
  }

  disable() {
    log('State', `disable() called, isActive=${this.isActive}`);

    if (!this.isActive) {
      log('State', 'Already inactive, skipping disable');
      return;
    }
    this.isActive = false;

    log('State', 'Removing event listeners...');
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('click', this.handleClick, true);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('contextmenu', this.handleContextMenu, true);
    window.removeEventListener('scroll', this.handleScroll, true);

    // Hide both overlays (hover/blue and selected/green) and context menu
    if (this.overlay) this.overlay.style.display = 'none';
    this.hideSelectedOverlay();
    this.hideContextMenu();

    // Reset cursor
    document.body.style.cursor = '';

    // Clear element references
    this.currentHoveredElement = null;
    this.selectedElement = null;

    // Send deselect messages to parent
    window.parent.postMessage({ type: 'ELEMENT_HOVER', payload: null }, '*');
    window.parent.postMessage({ type: 'ELEMENT_DESELECT' }, '*');

    log('State', '❌ Inspector DISABLED');
  }

  // ===========================================================================
  // Interaction Blocking (for vibe coding - post-generation edits)
  // ===========================================================================

  /**
   * Disable user interactions (clicks on buttons, links, forms) during vibe coding.
   * Scrolling remains enabled for viewing the page.
   */
  disableInteractions() {
    if (this.interactionsDisabled) {
      log('Interactions', 'Already disabled, skipping');
      return;
    }

    log('Interactions', '🚫 Disabling interactive elements...');
    this.interactionsDisabled = true;

    // Inject CSS to disable pointer events on interactive elements
    this.interactionBlockerStyle = document.createElement('style');
    this.interactionBlockerStyle.id = 'lps-interaction-blocker';
    this.interactionBlockerStyle.textContent = `
      /* LPS Vibe Coding: Disable interactions while allowing scroll */
      button, 
      a, 
      input, 
      select, 
      textarea, 
      form,
      [role="button"],
      [onclick],
      [type="submit"],
      [type="button"] {
        pointer-events: none !important;
        cursor: wait !important;
        opacity: 0.7 !important;
        user-select: none !important;
      }
      
      /* Keep body scrollable */
      body {
        overflow: auto !important;
      }
    `;
    document.head.appendChild(this.interactionBlockerStyle);

    log('Interactions', '✅ Interactive elements disabled (scroll still works)');
  }

  /**
   * Re-enable user interactions after vibe coding is complete.
   */
  enableInteractions() {
    if (!this.interactionsDisabled) {
      log('Interactions', 'Already enabled, skipping');
      return;
    }

    log('Interactions', '✅ Re-enabling interactive elements...');
    this.interactionsDisabled = false;

    // Remove the CSS blocker
    if (this.interactionBlockerStyle && this.interactionBlockerStyle.parentNode) {
      this.interactionBlockerStyle.parentNode.removeChild(this.interactionBlockerStyle);
      this.interactionBlockerStyle = null;
    }

    log('Interactions', '✅ Interactive elements re-enabled');
  }

  // ===========================================================================
  // Event Handlers
  // ===========================================================================

  private handleMouseMove = (event: MouseEvent) => {
    if (!this.isActive) return;

    const target = event.target as HTMLElement;
    
    // Skip if same element or is our overlay
    if (target === this.currentHoveredElement) return;
    if (target.id?.startsWith('lps-inspector')) return;

    // Find element with source info
    const elementWithId = this.findElementWithSource(target);
    if (!elementWithId) {
      this.hideOverlay();
      this.currentHoveredElement = null;
      return;
    }

    // Only log when we find a valid element (to avoid spam)
    const source = elementWithId[SOURCE_KEY];
    log('Hover', `Found element: <${elementWithId.tagName.toLowerCase()}> source=${source?.fileName}:${source?.lineNumber}`);

    this.currentHoveredElement = elementWithId;
    this.showOverlay(elementWithId);

    // Send hover info to parent
    const elementInfo = this.extractElementInfo(elementWithId);
    log('Hover', '📤 Sending ELEMENT_HOVER to parent');
    window.parent.postMessage({ type: 'ELEMENT_HOVER', payload: elementInfo }, '*');
  };

  private handleClick = (event: MouseEvent) => {
    log('Click', `Click event received, isActive=${this.isActive}`);
    
    if (!this.isActive) {
      log('Click', 'Not active, ignoring click');
      return;
    }

    const target = event.target as HTMLElement;
    log('Click', `Clicked element: <${target.tagName.toLowerCase()}> id=${target.id} class=${target.className}`);
    
    // Skip our overlays
    if (target.id?.startsWith('lps-inspector')) {
      log('Click', 'Clicked on inspector overlay, ignoring');
      return;
    }

    // Prevent default click behavior
    event.preventDefault();
    event.stopPropagation();
    log('Click', 'Prevented default and stopped propagation');

    // Find element with source info
    const elementWithId = this.findElementWithSource(target);
    if (!elementWithId) {
      log('Click', '⚠️ No element with __jsxSource__ found in click target or ancestors');
      return;
    }

    const source = elementWithId[SOURCE_KEY];
    log('Click', `✅ Found selectable element: <${elementWithId.tagName.toLowerCase()}> source=${source?.fileName}:${source?.lineNumber}`);

    // Select the element
    this.selectElement(elementWithId);
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    // Escape key deselects and hides context menu
    if (event.key === 'Escape') {
      if (this.contextMenu?.style.display !== 'none') {
        this.hideContextMenu();
      } else {
        log('Keyboard', 'Escape pressed, clearing selection');
        this.clearSelection();
        window.parent.postMessage({ type: 'ELEMENT_DESELECT' }, '*');
      }
    }
  };

  private scrollStartY: number | null = null;
  private static SCROLL_THRESHOLD = 50; // px of scroll before clearing selection

  private handleScroll = () => {
    const currentY = window.scrollY;

    // Record scroll position when selection is active
    if (this.scrollStartY === null) {
      this.scrollStartY = currentY;
      return;
    }

    // Only clear selection after scrolling past threshold
    if (Math.abs(currentY - this.scrollStartY) < VisualInspector.SCROLL_THRESHOLD) {
      return;
    }

    // Hide overlays and clear selection
    if (this.selectedElement) {
      log('Scroll', 'Scroll threshold exceeded, clearing selection');
      this.clearSelection();
      window.parent.postMessage({ type: 'ELEMENT_DESELECT' }, '*');
    }
    this.hideOverlay();
    this.scrollStartY = null;
  };

  // ===========================================================================
  // Context Menu
  // ===========================================================================

  private handleContextMenu = (event: MouseEvent) => {
    if (!this.isActive) return;

    const target = event.target as HTMLElement;
    
    // Skip our overlays and context menu
    if (target.id?.startsWith('lps-inspector')) return;

    event.preventDefault();
    event.stopPropagation();

    // Find element with source info
    const elementWithId = this.findElementWithSource(target);
    if (!elementWithId) {
      log('ContextMenu', 'No element with source found');
      return;
    }

    // Select the element first
    this.selectElement(elementWithId);
    
    // Show context menu
    this.showContextMenu(event.clientX, event.clientY, elementWithId);
  };

  private showContextMenu(x: number, y: number, element: HTMLElement) {
    if (!this.contextMenu) return;

    // Helper to escape HTML
    const escapeHtml = (text: string) => {
      return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };

    // Build menu content
    const menuItems: Array<{ label: string; icon: string; action: () => void; disabled?: boolean }> = [];

    // Get parent with source
    const parent = this.findParentWithSource(element);
    if (parent) {
      const parentTag = parent.tagName.toLowerCase();
      const parentClass = parent.className && typeof parent.className === 'string' 
        ? `.${parent.className.split(' ')[0]}` 
        : '';
      menuItems.push({
        label: `Parent: &lt;${parentTag}&gt;${escapeHtml(parentClass)}`,
        icon: '↑',
        action: () => {
          this.selectElement(parent);
          this.hideContextMenu();
        }
      });
    }

    // Get siblings with source
    const siblings = this.getSiblingsWithSource(element);
    if (siblings.length > 1) {
      menuItems.push({
        label: `Siblings (${siblings.length})`,
        icon: '↔',
        action: () => {}, // Header, no action
        disabled: true
      });
      
      siblings.forEach((sibling, index) => {
        const siblingTag = sibling.tagName.toLowerCase();
        const isCurrentElement = sibling === element;
        const className = sibling.className && typeof sibling.className === 'string'
          ? `.${sibling.className.split(' ')[0]}` 
          : '';
        // Capture sibling reference for closure
        const siblingRef = sibling;
        menuItems.push({
          label: `${isCurrentElement ? '● ' : '  '}&lt;${siblingTag}&gt;${escapeHtml(className)}`,
          icon: '',
          action: () => {
            this.selectElement(siblingRef);
            this.hideContextMenu();
          },
          disabled: isCurrentElement
        });
      });
    }

    // Get children with source
    const children = this.getChildrenWithSource(element);
    if (children.length > 0) {
      menuItems.push({
        label: `Children (${children.length})`,
        icon: '↓',
        action: () => {}, // Header, no action
        disabled: true
      });
      
      children.slice(0, 10).forEach((child) => {
        const childTag = child.tagName.toLowerCase();
        const className = child.className && typeof child.className === 'string'
          ? `.${child.className.split(' ')[0]}` 
          : '';
        const text = child.textContent?.trim().slice(0, 20);
        const textPreview = text ? ` "${escapeHtml(text)}${text.length >= 20 ? '...' : ''}"` : '';
        menuItems.push({
          label: `&lt;${childTag}&gt;${escapeHtml(className)}${textPreview}`,
          icon: '',
          action: () => {
            this.selectElement(child);
            this.hideContextMenu();
          }
        });
      });
      
      if (children.length > 10) {
        menuItems.push({
          label: `... and ${children.length - 10} more`,
          icon: '',
          action: () => {},
          disabled: true
        });
      }
    }

    // Build HTML
    const isHeader = (label: string) => label.startsWith('Siblings') || label.startsWith('Children') || label.startsWith('Parent');
    const isIndented = (label: string) => label.startsWith('●') || label.startsWith('  ') || label.startsWith('&lt;') || label.startsWith('...');
    
    this.contextMenu.innerHTML = menuItems.map((item, index) => `
      <div 
        class="lps-context-menu-item${item.disabled ? ' disabled' : ''}" 
        data-index="${index}"
        style="
          padding: 8px 12px;
          cursor: ${item.disabled ? 'default' : 'pointer'};
          display: flex;
          align-items: center;
          gap: 8px;
          pointer-events: auto;
          ${item.disabled && !isHeader(item.label) ? 'opacity: 0.6;' : ''}
          ${isHeader(item.label) ? 'font-weight: 600; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;' : ''}
          ${isIndented(item.label) && !isHeader(item.label) ? 'padding-left: 28px;' : ''}
          ${isHeader(item.label) && index > 0 ? 'border-top: 1px solid #333; margin-top: 4px; padding-top: 12px;' : ''}
        "
      >
        ${item.icon ? `<span style="width: 16px; text-align: center; flex-shrink: 0;">${item.icon}</span>` : ''}
        <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: ui-monospace, monospace; ${isHeader(item.label) ? 'font-family: inherit;' : ''}">${item.label}</span>
      </div>
    `).join('');

    // Store menu items reference
    const menuItemsRef = menuItems;

    // Add click handlers directly to each item
    this.contextMenu.querySelectorAll('.lps-context-menu-item').forEach((el, index) => {
      const item = menuItemsRef[index];
      const htmlEl = el as HTMLElement;
      
      if (!item.disabled) {
        htmlEl.style.cursor = 'pointer';
        
        // Hover effects
        htmlEl.onmouseenter = () => {
          htmlEl.style.background = '#333';
        };
        htmlEl.onmouseleave = () => {
          htmlEl.style.background = 'transparent';
        };
        
        // Click handler - use mouseup which fires after mousedown
        htmlEl.onmouseup = (e) => {
          e.stopPropagation();
          e.preventDefault();
          item.action();
        };
      }
    });

    // Position menu
    const menuWidth = 250;
    const menuHeight = this.contextMenu.offsetHeight || 200;
    
    let posX = x;
    let posY = y;
    
    // Adjust if menu would go off screen
    if (x + menuWidth > window.innerWidth) {
      posX = window.innerWidth - menuWidth - 10;
    }
    if (y + menuHeight > window.innerHeight) {
      posY = window.innerHeight - menuHeight - 10;
    }

    this.contextMenu.style.left = `${posX}px`;
    this.contextMenu.style.top = `${posY}px`;
    this.contextMenu.style.display = 'block';

    // Close menu when clicking outside - use a delayed check
    setTimeout(() => {
      document.addEventListener('click', this.hideContextMenuOnOutsideClick, true);
    }, 100);

    log('ContextMenu', `Showing context menu at (${posX}, ${posY}) with ${menuItems.length} items`);
  }

  private hideContextMenuOnOutsideClick = (e: MouseEvent) => {
    // Only hide if click is outside the context menu
    const target = e.target as Node;
    const isInsideMenu = this.contextMenu && this.contextMenu.contains(target);
    
    if (!isInsideMenu) {
      this.hideContextMenu();
    }
  };

  private hideContextMenu() {
    if (this.contextMenu) {
      this.contextMenu.style.display = 'none';
      this.contextMenu.onclick = null;
    }
    document.removeEventListener('click', this.hideContextMenuOnOutsideClick, true);
  }

  private findParentWithSource(element: HTMLElement): HTMLElement | null {
    let current: HTMLElement | null = element.parentElement;
    while (current && current !== document.body) {
      if (current[SOURCE_KEY]) {
        return current;
      }
      current = current.parentElement;
    }
    return null;
  }

  private getSiblingsWithSource(element: HTMLElement): HTMLElement[] {
    const parent = element.parentElement;
    if (!parent) return [element];

    const siblings: HTMLElement[] = [];
    for (const child of parent.children) {
      if (child instanceof HTMLElement) {
        if (child[SOURCE_KEY]) {
          siblings.push(child);
        } else {
          // Walk DOWN to find first descendant with source
          const descendant = this.findFirstDescendantWithSource(child);
          if (descendant) {
            siblings.push(descendant);
          }
        }
      }
    }
    return siblings;
  }

  private getChildrenWithSource(element: HTMLElement): HTMLElement[] {
    const children: HTMLElement[] = [];
    for (const child of element.children) {
      if (child instanceof HTMLElement) {
        if (child[SOURCE_KEY]) {
          children.push(child);
        } else {
          // Walk DOWN to find first descendant with source
          const descendant = this.findFirstDescendantWithSource(child);
          if (descendant) {
            children.push(descendant);
          }
        }
      }
    }
    return children;
  }

  /**
   * Walk DOWN the tree to find the first descendant with __jsxSource__
   */
  private findFirstDescendantWithSource(element: HTMLElement): HTMLElement | null {
    // Check direct children first (breadth-first)
    for (const child of element.children) {
      if (child instanceof HTMLElement && child[SOURCE_KEY]) {
        return child;
      }
    }
    // Then check grandchildren
    for (const child of element.children) {
      if (child instanceof HTMLElement) {
        const found = this.findFirstDescendantWithSource(child);
        if (found) return found;
      }
    }
    return null;
  }

  // ===========================================================================
  // Element Finding & Info Extraction
  // ===========================================================================

  private findElementWithSource(element: HTMLElement): HTMLElement | null {
    let current: HTMLElement | null = element;
    let depth = 0;
    
    while (current && current !== document.body) {
      const source = current[SOURCE_KEY];
      if (source) {
        const lovId = this.sourceToLovId(source);
        log('Find', `Found __jsxSource__ at depth ${depth}: ${lovId}`);
        return current;
      }
      current = current.parentElement;
      depth++;
    }
    
    log('Find', `No __jsxSource__ found after traversing ${depth} ancestors`);
    return null;
  }
  
  private sourceToLovId(source: JsxSourceInfo): string {
    // Convert source info to lovId format: "filepath:line:col"
    return `${source.fileName}:${source.lineNumber}:${source.columnNumber}`;
  }

  private extractElementInfo(element: HTMLElement): SelectedElement {
    const source = element[SOURCE_KEY];
    let location = this.sourceToLocation(source);

    // Reusable Component Redirect: shared/reusable components should target
    // the parent section that renders them, not the component definition.
    // e.g., clicking a Button in HomeFeaturedPhones should target
    // HomeFeaturedPhones.tsx, not button.tsx
    // This covers: shadcn/ui (/components/ui/), utility components
    // (SectionLink, NavLink, ErrorBoundary), and any non-section/non-layout
    // component under /components/.
    let wasUIRedirected = false;
    let parentSectionElement: HTMLElement | null = null;
    if (this.isReusableComponent(location.filePath)) {
      const parentSource = this.findParentSectionSource(element);
      if (parentSource) {
        log('Extract', `Reusable redirect: ${location.filePath} → ${parentSource.fileName}:${parentSource.lineNumber}`);
        // Find the DOM element that corresponds to the parent section source,
        // so we can scope loop detection to within this section only.
        parentSectionElement = this.findSectionContainer(element, parentSource);
        wasUIRedirected = true;
        location = {
          ...location,
          filePath: parentSource.fileName,
          lineNumber: parentSource.lineNumber,
          columnNumber: parentSource.columnNumber,
        };
      }
    }

    const computed = window.getComputedStyle(element);
    const computedStyles = this.extractComputedStyles(element);
    const rect = element.getBoundingClientRect();

    // Extract additional context for smart controls
    const attributes = this.extractAttributes(element);
    const elementType = this.determineElementType(element, computed);
    const detectedClasses = this.extractDetectedClasses(computed);
    const hasBackgroundImage = this.hasBackgroundImage(computed);
    const hasBorder = this.hasBorder(computed);
    const isFlexContainer = computed.display === 'flex' || computed.display === 'inline-flex';
    const isGridContainer = computed.display === 'grid' || computed.display === 'inline-grid';
    const hasDynamicStyling = this.detectDynamicStyling(element);

    // Multi-page awareness: determine affected pages
    const { affectedPages, isSharedComponent, sectionName } = this.getAffectedPages(location.filePath);

    // Loop detection: check if multiple DOM elements share the same lov-id.
    // For UI-redirected elements (e.g., shadcn Button), use the ORIGINAL
    // lovId (button.tsx) since that's what the actual DOM elements share,
    // then scope to the parent section to avoid counting buttons from other sections.
    const originalLovId = this.sourceToLovId(source);
    const loopLovId = wasUIRedirected ? originalLovId : location.lovId;
    let loopContext: { instanceIndex: number; instanceCount: number } | undefined;
    if (window.sourceElementMap) {
      const refs = window.sourceElementMap.get(loopLovId);
      if (refs && refs.size > 1) {
        let instances = [...refs]
          .map(r => r.deref())
          .filter((el): el is HTMLElement => !!el && document.contains(el));

        // For UI-redirected elements, scope to only siblings within the same
        // section container so we don't count buttons from other sections.
        if (wasUIRedirected && parentSectionElement && instances.length > 1) {
          instances = instances.filter(el => parentSectionElement!.contains(el));
          log('Extract', `Loop scoped to section: ${instances.length} instances (was ${refs.size})`);
        }

        if (instances.length > 1) {
          // Sort by DOM order
          instances.sort((a, b) => {
            const pos = a.compareDocumentPosition(b);
            if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
            if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
            return 0;
          });
          const index = instances.indexOf(element);
          if (index !== -1) {
            loopContext = { instanceIndex: index, instanceCount: instances.length };
          }
        }
      }
    }

    log('Extract', `Element type: ${elementType}, hasBgImage: ${hasBackgroundImage}, hasBorder: ${hasBorder}, isFlex: ${isFlexContainer}, hasDynamic: ${hasDynamicStyling}`);
    log('Extract', `Multi-page: affectedPages=${affectedPages.length}, isShared=${isSharedComponent}, section=${sectionName || 'none'}`);

    // Handle SVG elements where className is SVGAnimatedString, not string
    let classNameStr: string | undefined;
    if (element.className) {
      if (typeof element.className === 'string') {
        classNameStr = element.className || undefined;
      } else if (element.className instanceof SVGAnimatedString) {
        classNameStr = element.className.baseVal || undefined;
      } else {
        // Fallback: try to convert to string
        classNameStr = String(element.className) || undefined;
      }
    }

    return {
      location,
      tagName: element.tagName.toLowerCase(),
      textContent: this.getDirectTextContent(element),
      className: classNameStr,
      computedStyles,
      boundingRect: {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
      },
      // New context-aware fields
      attributes,
      detectedClasses,
      elementType,
      hasBackgroundImage,
      hasBorder,
      isFlexContainer,
      isGridContainer,
      hasDynamicStyling,
      // Multi-page awareness
      affectedPages,
      isSharedComponent,
      sectionName,
      // Loop context
      loopContext: loopContext ?? null,
    };
  }

  /**
   * Determine which pages are affected by editing an element at the given file path.
   * Uses the section registry from pages.manifest.json.
   */
  private getAffectedPages(filePath: string): { 
    affectedPages: string[]; 
    isSharedComponent: boolean;
    sectionName?: string;
  } {
    try {
      const manifest = getManifestSync();
      
      // Check if this is a shared layout component
      const isHeader = filePath.includes('/layout/Header');
      const isFooter = filePath.includes('/layout/Footer');
      const isPageLayout = filePath.includes('/layout/PageLayout');
      
      if (isHeader || isFooter || isPageLayout) {
        // Shared components affect ALL pages
        const allPageIds = manifest.pages.map(p => p.id);
        return {
          affectedPages: allPageIds,
          isSharedComponent: true,
          sectionName: isHeader ? 'Header' : isFooter ? 'Footer' : 'PageLayout',
        };
      }
      
      // Check if this is a section component
      // Extract section name from path: src/components/sections/Hero.tsx -> Hero
      const sectionMatch = filePath.match(/\/sections\/([A-Za-z0-9_]+)\.tsx$/);
      if (sectionMatch) {
        const sectionName = sectionMatch[1];
        const section = manifest.sections[sectionName];
        
        if (section && section.usedOn) {
          return {
            affectedPages: section.usedOn,
            isSharedComponent: section.usedOn.length > 1,
            sectionName,
          };
        }
        
        // Section not in registry - check which pages list it in their sections array
        const pagesWithSection = manifest.pages
          .filter(p => p.sections.includes(sectionName))
          .map(p => p.id);
        
        return {
          affectedPages: pagesWithSection,
          isSharedComponent: pagesWithSection.length > 1,
          sectionName,
        };
      }
      
      // Check if this is a page component
      // Extract page slug from path: src/pages/about/AboutPage.tsx -> about
      const pageMatch = filePath.match(/\/pages\/([A-Za-z0-9_-]+)\//);
      if (pageMatch) {
        const pageSlug = pageMatch[1];
        const page = manifest.pages.find(p => 
          p.slug === pageSlug || p.id === pageSlug || 
          (pageSlug === 'Index' && p.isHome)
        );
        
        if (page) {
          return {
            affectedPages: [page.id],
            isSharedComponent: false,
          };
        }
      }
      
      // Unknown component - assume single page impact
      return {
        affectedPages: [],
        isSharedComponent: false,
      };
    } catch (error) {
      logError('Extract', 'Error getting affected pages:', error);
      return {
        affectedPages: [],
        isSharedComponent: false,
      };
    }
  }

  private sourceToLocation(source: JsxSourceInfo | undefined): ElementLocation {
    if (!source) {
      return {
        lovId: '',
        filePath: '',
        lineNumber: 0,
        columnNumber: 0,
      };
    }

    const lovId = this.sourceToLovId(source);
    return {
      lovId,
      filePath: source.fileName,
      lineNumber: source.lineNumber,
      columnNumber: source.columnNumber,
    };
  }

  /**
   * Check if a file path is a reusable/shared component that should be
   * redirected to its parent section for editing.
   *
   * Reusable components are anything under /components/ that is NOT:
   * - /components/sections/ (authored section components)
   * - /components/layout/ (layout components like Header, Footer, PageLayout)
   * - /pages/ (page components)
   *
   * This covers: /components/ui/ (shadcn), /components/SectionLink.tsx,
   * /components/NavLink.tsx, /components/ErrorBoundary.tsx, etc.
   */
  private isReusableComponent(filePath: string): boolean {
    if (!filePath.includes('/components/')) return false;
    // These directories contain authored components — NOT reusable
    if (filePath.includes('/components/sections/')) return false;
    if (filePath.includes('/components/layout/')) return false;
    return true;
  }

  /**
   * Walk up from element to find nearest ancestor with __jsxSource__
   * from a section, layout, or page file (skipping reusable components).
   * Returns the source of the parent section/page that renders the reusable component.
   */
  private findParentSectionSource(element: HTMLElement): JsxSourceInfo | null {
    let current = element.parentElement;
    while (current && current !== document.body) {
      const source = current[SOURCE_KEY] as JsxSourceInfo | undefined;
      if (source && !this.isReusableComponent(source.fileName)) {
        return source;
      }
      current = current.parentElement;
    }
    return null;
  }

  /** @deprecated Use findParentSectionSource instead */
  private findParentNonUISource(element: HTMLElement): JsxSourceInfo | null {
    return this.findParentSectionSource(element);
  }

  /**
   * Walk up from element to find the DOM element whose __jsxSource__ matches
   * the given section source. This is the section's root <section>/<div> element
   * used to scope loop detection to within one section only.
   */
  private findSectionContainer(element: HTMLElement, sectionSource: JsxSourceInfo): HTMLElement | null {
    const targetFile = sectionSource.fileName;
    let current = element.parentElement;
    let lastMatch: HTMLElement | null = null;
    while (current && current !== document.body) {
      const source = current[SOURCE_KEY] as JsxSourceInfo | undefined;
      if (source && source.fileName === targetFile) {
        // Keep walking up — we want the outermost element from this file
        // (the section root), not an inner element.
        lastMatch = current;
      }
      current = current.parentElement;
    }
    return lastMatch;
  }

  private getDirectTextContent(element: HTMLElement): string | undefined {
    // Allow text extraction when children are inline/phrasing elements (LPS-498).
    // Banner headings often contain <span> for gradient text, <strong>, <em>, etc.
    // These are normal inline formatting — not a reason to block text editing.
    const INLINE_TAGS = new Set([
      'span', 'strong', 'em', 'b', 'i', 'br', 'a', 'mark',
      'small', 'sub', 'sup', 'code', 'abbr', 'time', 'wbr',
    ]);

    const hasBlockChildren = Array.from(element.childNodes).some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        !INLINE_TAGS.has((node as HTMLElement).tagName.toLowerCase())
    );

    if (hasBlockChildren) return undefined;

    const text = element.textContent?.trim();
    return text || undefined;
  }

  private extractComputedStyles(element: HTMLElement): ElementStyles {
    const computed = window.getComputedStyle(element);

    // Read hover-affected properties (backgroundColor, color, borderColor) from
    // a non-hovered clone so the color picker shows base colors, not hover state.
    let baseBg = computed.backgroundColor;
    let baseColor = computed.color;
    let baseBorderColor = computed.borderColor;

    if (element.matches(':hover')) {
      try {
        const clone = element.cloneNode(false) as HTMLElement;
        clone.style.position = 'fixed';
        clone.style.left = '-9999px';
        clone.style.top = '-9999px';
        element.parentElement?.appendChild(clone);
        const baseComputed = window.getComputedStyle(clone);
        baseBg = baseComputed.backgroundColor;
        baseColor = baseComputed.color;
        baseBorderColor = baseComputed.borderColor;
        clone.remove();
      } catch {
        // Fall back to hover-state values if clone fails
      }
    }

    return {
      fontFamily: computed.fontFamily,
      fontSize: computed.fontSize,
      fontWeight: computed.fontWeight,
      lineHeight: computed.lineHeight,
      letterSpacing: computed.letterSpacing,
      textAlign: computed.textAlign,
      color: baseColor,
      textDecoration: computed.textDecoration,
      marginTop: computed.marginTop,
      marginRight: computed.marginRight,
      marginBottom: computed.marginBottom,
      marginLeft: computed.marginLeft,
      paddingTop: computed.paddingTop,
      paddingRight: computed.paddingRight,
      paddingBottom: computed.paddingBottom,
      paddingLeft: computed.paddingLeft,
      backgroundColor: baseBg,
      backgroundImage: computed.backgroundImage,
      borderWidth: computed.borderWidth,
      borderColor: baseBorderColor,
      borderRadius: computed.borderRadius,
      borderStyle: computed.borderStyle,
      display: computed.display,
      flexDirection: computed.flexDirection,
      justifyContent: computed.justifyContent,
      alignItems: computed.alignItems,
      gap: computed.gap,
      width: computed.width,
      height: computed.height,
      maxWidth: computed.maxWidth,
      minWidth: computed.minWidth,
      maxHeight: computed.maxHeight,
      minHeight: computed.minHeight,
      boxShadow: computed.boxShadow,
      opacity: computed.opacity,
    };
  }

  /**
   * Extract relevant attributes from an element
   */
  private extractAttributes(element: HTMLElement): ElementAttributes {
    const attrs: ElementAttributes = {};
    const tag = element.tagName.toLowerCase();

    // Image attributes
    if (tag === 'img') {
      attrs.src = element.getAttribute('src') || undefined;
      attrs.alt = element.getAttribute('alt') || undefined;
    }

    // Link attributes
    if (tag === 'a') {
      attrs.href = element.getAttribute('href') || undefined;
      attrs.target = element.getAttribute('target') || undefined;
    }

    // Button/input attributes
    if (tag === 'button' || tag === 'input') {
      attrs.type = element.getAttribute('type') || undefined;
      attrs.disabled = element.hasAttribute('disabled');
      if (tag === 'input') {
        attrs.placeholder = element.getAttribute('placeholder') || undefined;
      }
    }

    // Generic attributes
    attrs.id = element.id || undefined;
    attrs.role = element.getAttribute('role') || undefined;
    attrs.ariaLabel = element.getAttribute('aria-label') || undefined;

    return attrs;
  }

  /**
   * Determine the element type hint for context-aware controls
   */
  private determineElementType(element: HTMLElement, computed: CSSStyleDeclaration): ElementTypeHint {
    const tag = element.tagName.toLowerCase();

    // Direct tag matches
    if (tag === 'img') return 'image';
    if (tag === 'a') return 'link';
    if (tag === 'button' || (tag === 'input' && ['button', 'submit', 'reset'].includes(element.getAttribute('type') || ''))) {
      return 'button';
    }
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return 'input';
    if (tag === 'video' || tag === 'audio' || tag === 'iframe') return 'media';
    if (tag === 'ul' || tag === 'ol' || tag === 'li') return 'list';

    // Text elements
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'label'].includes(tag)) {
      return 'text';
    }

    // Container elements
    if (['div', 'section', 'main', 'article', 'aside', 'header', 'footer', 'nav'].includes(tag)) {
      // Check if it has background image - could be hero/banner
      if (computed.backgroundImage !== 'none') {
        return 'image';
      }
      return 'container';
    }

    return 'unknown';
  }

  /**
   * Detect Tailwind classes from computed styles
   */
  private extractDetectedClasses(computed: CSSStyleDeclaration): DetectedTailwindClasses {
    if (!this.tailwindConfigLoaded) {
      return {};
    }

    try {
      const detected = detectTailwindClasses(computed);
      const result: DetectedTailwindClasses = {};

      // Convert the detected classes to our format
      if (detected.fontSize) {
        result.fontSize = { className: detected.fontSize.className, value: detected.fontSize.value };
      }
      if (detected.fontWeight) {
        result.fontWeight = { className: detected.fontWeight.className, value: detected.fontWeight.value };
      }
      if (detected.textColor) {
        result.textColor = { className: detected.textColor.className, value: detected.textColor.value };
      }
      if (detected.backgroundColor) {
        result.backgroundColor = { className: detected.backgroundColor.className, value: detected.backgroundColor.value };
      }
      if (detected.borderRadius) {
        result.borderRadius = { className: detected.borderRadius.className, value: detected.borderRadius.value };
      }
      if (detected.opacity) {
        result.opacity = { className: detected.opacity.className, value: detected.opacity.value };
      }
      if (detected.display) {
        result.display = { className: detected.display.className, value: detected.display.value };
      }

      return result;
    } catch (error) {
      logError('Detect', 'Error detecting Tailwind classes:', error);
      return {};
    }
  }

  /**
   * Check if element has a meaningful background image
   */
  private hasBackgroundImage(computed: CSSStyleDeclaration): boolean {
    const bgImage = computed.backgroundImage;
    return bgImage !== 'none' && bgImage !== '';
  }

  /**
   * Check if element has visible border
   */
  private hasBorder(computed: CSSStyleDeclaration): boolean {
    const borderWidth = parseFloat(computed.borderWidth) || 0;
    const borderStyle = computed.borderStyle;
    return borderWidth > 0 && borderStyle !== 'none';
  }

  /**
   * Detect if element has dynamic styling that can't be edited directly.
   * Only flags true CSS-in-JS frameworks (Emotion, Styled-components) where
   * inline style overrides would conflict with JS-managed styling.
   *
   * NOT flagged (safe to edit):
   * - CSS variables in inline styles — standard CSS, readable via
   *   getComputedStyle(), safely overridable with inline styles.
   * - Framer Motion elements — residual inline styles (opacity: 1;
   *   transform: none) don't conflict with visual editing.
   * - Tailwind utility classes — never indicate dynamic styling.
   */
  private detectDynamicStyling(element: HTMLElement): boolean {
    const classList = element.className;
    if (typeof classList === 'string') {
      // Emotion CSS-in-JS: css-{hash}
      if (/css-[a-z0-9]{5,}/i.test(classList)) {
        return true;
      }
      // Styled-components: sc-{hash}
      if (/sc-[a-z]{5,}/i.test(classList)) {
        return true;
      }
    }

    return false;
  }

  // ===========================================================================
  // Overlay Management
  // ===========================================================================

  private showOverlay(element: HTMLElement) {
    if (!this.overlay) return;

    const rect = element.getBoundingClientRect();
    
    this.overlay.style.display = 'block';
    this.overlay.style.top = `${rect.top}px`;
    this.overlay.style.left = `${rect.left}px`;
    this.overlay.style.width = `${rect.width}px`;
    this.overlay.style.height = `${rect.height}px`;
  }

  private hideOverlay() {
    if (this.overlay) {
      this.overlay.style.display = 'none';
    }
  }

  private showSelectedOverlay(element: HTMLElement) {
    if (!this.selectedOverlay) return;

    const rect = element.getBoundingClientRect();
    
    this.selectedOverlay.style.display = 'block';
    this.selectedOverlay.style.top = `${rect.top}px`;
    this.selectedOverlay.style.left = `${rect.left}px`;
    this.selectedOverlay.style.width = `${rect.width}px`;
    this.selectedOverlay.style.height = `${rect.height}px`;
  }

  private hideSelectedOverlay() {
    if (this.selectedOverlay) {
      this.selectedOverlay.style.display = 'none';
    }
  }

  // ===========================================================================
  // Selection
  // ===========================================================================

  private selectElement(element: HTMLElement) {
    log('Select', `Selecting element: <${element.tagName.toLowerCase()}>`);

    this.selectedElement = element;
    this.scrollStartY = window.scrollY; // Reset scroll threshold for new selection
    this.showSelectedOverlay(element);

    // Extract and send element info
    const elementInfo = this.extractElementInfo(element);
    log('Select', '📤 Sending ELEMENT_SELECT to parent:', {
      tagName: elementInfo.tagName,
      lovId: elementInfo.location.lovId,
      filePath: elementInfo.location.filePath,
      lineNumber: elementInfo.location.lineNumber,
    });
    
    window.parent.postMessage({ type: 'ELEMENT_SELECT', payload: elementInfo }, '*');
    log('Select', '✅ ELEMENT_SELECT sent');
  }

  private selectElementByLovId(lovId: string, instanceIndex?: number) {
    log('Select', `selectElementByLovId called with: ${lovId} (instanceIndex=${instanceIndex})`);

    // Try to find element using window.sourceElementMap (from lovable-tagger)
    const element = this.findElementByLovId(lovId, instanceIndex);
    if (element) {
      log('Select', `Found element for lovId: ${lovId}`);
      this.selectElement(element);
    } else {
      logError('Select', `No element found for lovId: ${lovId}`);
    }
  }

  /**
   * Resolve a lovId to a DOM element.
   *
   * LPS-743: When the JSX site is inside a `.map()`/loop, every rendered
   * sibling shares the same lovId. The `instanceIndex` argument disambiguates
   * by DOM order so visual edits land on the correct instance instead of
   * always the first match. Callers that have no instance context (legacy
   * paths, programmatic single-instance selection) continue to receive
   * first-match behavior.
   */
  private findElementByLovId(lovId: string, instanceIndex?: number): HTMLElement | null {
    // Try sourceElementMap first (lovable-tagger style)
    if (window.sourceElementMap) {
      const refs = window.sourceElementMap.get(lovId);
      if (refs) {
        const live: HTMLElement[] = [];
        for (const ref of refs) {
          const el = ref.deref();
          if (el && document.contains(el)) {
            live.push(el);
          }
        }
        if (live.length > 0) {
          if (instanceIndex !== undefined && live.length > 1) {
            // Sort by DOM order so instanceIndex matches what the inspector
            // computed at selection time (extractElementInfo uses the same sort).
            live.sort((a, b) => {
              const pos = a.compareDocumentPosition(b);
              if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
              if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
              return 0;
            });
            return live[instanceIndex] ?? live[0];
          }
          return live[0];
        }
      }
    }

    // Fallback: walk DOM and find element with matching source
    const allElements = this.findAllElementsWithSource();
    const matches: HTMLElement[] = [];
    for (const el of allElements) {
      const source = el[SOURCE_KEY];
      if (source && this.sourceToLovId(source) === lovId) {
        matches.push(el);
      }
    }
    if (matches.length === 0) return null;
    if (instanceIndex !== undefined && matches.length > 1) {
      return matches[instanceIndex] ?? matches[0];
    }
    return matches[0];
  }

  private clearSelection() {
    log('Select', 'Clearing selection');
    this.selectedElement = null;
    this.hideSelectedOverlay();
  }

  /**
   * Select the parent element of the currently selected element.
   * This allows navigating up through overlays to reach underlying elements.
   */
  private selectParentElement() {
    if (!this.selectedElement) {
      log('Select', 'No element selected, cannot select parent');
      return;
    }

    // Find the parent with __jsxSource__
    let current: HTMLElement | null = this.selectedElement.parentElement;
    while (current && current !== document.body) {
      const source = current[SOURCE_KEY];
      if (source) {
        log('Select', `Found parent with source: ${source.fileName}:${source.lineNumber}`);
        this.selectElement(current);
        return;
      }
      current = current.parentElement;
    }

    log('Select', 'No parent with __jsxSource__ found');
    // Notify parent that there's no parent element available
    window.parent.postMessage({ 
      type: 'NO_PARENT_ELEMENT',
      payload: { message: 'No parent element with source info available' }
    }, '*');
  }

  /**
   * Select a child element of the currently selected element.
   * @param index The index of the child to select (0-based)
   */
  private selectChildElement(index: number) {
    if (!this.selectedElement) {
      log('Select', 'No element selected, cannot select child');
      return;
    }

    // Find children with __jsxSource__
    const childrenWithSource: HTMLElement[] = [];
    for (const child of this.selectedElement.children) {
      if (child instanceof HTMLElement) {
        const source = child[SOURCE_KEY];
        if (source) {
          childrenWithSource.push(child);
        } else {
          // Check if any descendant has source
          const descendant = this.findElementWithSource(child);
          if (descendant) {
            childrenWithSource.push(descendant);
          }
        }
      }
    }

    if (index >= 0 && index < childrenWithSource.length) {
      log('Select', `Selecting child at index ${index} of ${childrenWithSource.length}`);
      this.selectElement(childrenWithSource[index]);
    } else {
      log('Select', `Invalid child index ${index}, have ${childrenWithSource.length} children with source`);
    }
  }

  /**
   * Select a sibling element of the currently selected element.
   * @param direction 'prev' for previous sibling, 'next' for next sibling
   */
  private selectSiblingElement(direction: 'prev' | 'next') {
    if (!this.selectedElement) {
      log('Select', 'No element selected, cannot select sibling');
      return;
    }

    const parent = this.selectedElement.parentElement;
    if (!parent) {
      log('Select', 'No parent element, cannot find siblings');
      return;
    }

    // Find all siblings with __jsxSource__ (including current element)
    const siblingsWithSource: HTMLElement[] = [];
    for (const child of parent.children) {
      if (child instanceof HTMLElement) {
        const source = child[SOURCE_KEY];
        if (source) {
          siblingsWithSource.push(child);
        } else {
          // Check if any descendant has source (for wrapper elements)
          const descendant = this.findElementWithSource(child);
          if (descendant) {
            siblingsWithSource.push(descendant);
          }
        }
      }
    }

    // Find current element's index
    const currentIndex = siblingsWithSource.findIndex(el => el === this.selectedElement);
    if (currentIndex === -1) {
      log('Select', 'Current element not found in siblings list');
      return;
    }

    // Calculate target index with wraparound
    let targetIndex: number;
    if (direction === 'prev') {
      targetIndex = currentIndex === 0 ? siblingsWithSource.length - 1 : currentIndex - 1;
    } else {
      targetIndex = currentIndex === siblingsWithSource.length - 1 ? 0 : currentIndex + 1;
    }

    log('Select', `Selecting ${direction} sibling: index ${currentIndex} -> ${targetIndex} (of ${siblingsWithSource.length})`);
    this.selectElement(siblingsWithSource[targetIndex]);
  }

  // ===========================================================================
  // Live Preview (LEGACY - DEPRECATED)
  // 
  // This inline CSS preview system is deprecated in favor of Virtual Overrides.
  // 
  // OLD WAY (this code):
  //   - Parent sends PREVIEW_EDIT with edit details
  //   - Inspector applies inline CSS/class changes to DOM
  //   - Changes are visual-only, don't affect actual React code
  //   - Pseudo-classes (hover, focus) don't work properly
  //   - Responsive breakpoints may not apply correctly
  // 
  // NEW WAY (Virtual Overrides):
  //   - Parent generates modified source code locally
  //   - Parent sends SET_VIRTUAL_OVERRIDE with full file content
  //   - Vite serves virtual file, triggers real HMR
  //   - Component actually re-renders with new Tailwind classes
  //   - Full Tailwind functionality (hover, responsive, animations)
  // 
  // This legacy code is kept as fallback when virtualOverrides is unavailable.
  // ===========================================================================

  /**
   * @deprecated Use SET_VIRTUAL_OVERRIDE instead for true HMR preview.
   * This method applies inline CSS changes which don't reflect actual code changes.
   */
  private previewEdit(lovId: string, edit: VisualEdit, instanceIndex?: number) {
    const element = this.findElementByLovId(lovId, instanceIndex);
    if (!element) {
      log('Preview', `Element not found for lovId: ${lovId} (instanceIndex=${instanceIndex})`);
      return;
    }

    const key = `${lovId}:${edit.type}:${edit.property}`;
    log('Preview', `Applying preview edit: ${key}`, edit);

    // Store original value if not already stored
    if (!this.previewedChanges.has(key)) {
      let originalValue = '';
      
      if (edit.type === 'text') {
        originalValue = element.textContent || '';
      } else if (edit.type === 'style') {
        originalValue = element.style.getPropertyValue(this.camelToKebab(edit.property));
      } else if (edit.type === 'class') {
        // For class edits, use the TRUE original className stored per-element
        // This prevents corruption when multiple class properties are edited
        if (!this.originalClassNames.has(lovId)) {
          this.originalClassNames.set(lovId, element.className);
          log('Preview', `Stored TRUE original className for ${lovId}: "${element.className}"`);
        }
        originalValue = this.originalClassNames.get(lovId) || element.className;
      }

      log('Preview', `Stored original value: "${originalValue}" for type: ${edit.type}`);
      this.previewedChanges.set(key, {
        element,
        originalValue,
        property: edit.property,
        editType: edit.type,
      });
    }

    // Apply the edit
    if (edit.type === 'text') {
      element.textContent = edit.value;
      log('Preview', `Set textContent to: "${edit.value}"`);
    } else if (edit.type === 'style') {
      element.style.setProperty(this.camelToKebab(edit.property), edit.value);
      log('Preview', `Set style ${edit.property} to: "${edit.value}"`);
    } else if (edit.type === 'class') {
      // For class changes, remove conflicting classes and add the new one
      const currentClasses = element.className.split(/\s+/).filter(Boolean);
      
      // Remove conflicting classes based on property type
      const conflictPatterns = this.getConflictPattern(edit.property);
      const filteredClasses = currentClasses.filter(cls => {
        // Keep classes that don't match any conflict pattern
        return !conflictPatterns.some(pattern => pattern.test(cls));
      });
      
      // Add the new class if not already present
      if (!filteredClasses.includes(edit.value)) {
        filteredClasses.push(edit.value);
      }
      
      element.className = filteredClasses.join(' ');
      log('Preview', `Set classes (removed conflicts for ${edit.property}): "${element.className}"`);
    }

    // Update selected overlay position (element size may have changed)
    if (element === this.selectedElement) {
      this.showSelectedOverlay(element);
    }

    // Notify parent
    window.parent.postMessage({
      type: 'PREVIEW_APPLIED',
      payload: { lovId, editCount: this.previewedChanges.size },
    }, '*');
  }

  /**
   * @deprecated Use CLEAR_VIRTUAL_OVERRIDE or CLEAR_ALL_VIRTUAL_OVERRIDES instead.
   * Virtual overrides provide instant HMR revert to original code.
   */
  private revertAllPreviews() {
    log('Preview', `(Legacy) Reverting ${this.previewedChanges.size} preview changes`);
    
    for (const [key, { element, originalValue, property, editType }] of this.previewedChanges) {
      log('Preview', `Reverting: ${key}, type: ${editType}, originalValue: "${originalValue}"`);
      
      // Use the stored edit type to determine how to revert
      if (editType === 'text') {
        element.textContent = originalValue;
        log('Preview', `Reverted textContent to: "${originalValue}"`);
      } else if (editType === 'class') {
        element.className = originalValue;
        log('Preview', `Reverted className to: "${originalValue}"`);
      } else if (editType === 'style') {
        element.style.setProperty(this.camelToKebab(property), originalValue);
        log('Preview', `Reverted style ${property} to: "${originalValue}"`);
      }
    }

    this.previewedChanges.clear();
    this.originalClassNames.clear(); // Also clear the original classNames tracking
    log('Preview', 'All previews reverted and cleared');

    // Update selected overlay if needed
    if (this.selectedElement) {
      this.showSelectedOverlay(this.selectedElement);
    }
  }

  private camelToKebab(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  /**
   * Get regex patterns for conflicting Tailwind classes based on property type.
   * Used to remove existing classes before adding new ones in preview mode.
   */
  private getConflictPattern(property: string): RegExp[] {
    // Patterns updated to handle Tailwind opacity modifiers (e.g., bg-gold/90, text-blue-500/75)
    const patterns: Record<string, RegExp[]> = {
      fontSize: [/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/],
      fontWeight: [/^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/],
      textAlign: [/^text-(left|center|right|justify)$/],
      // Text color: matches text-{color}, text-{color}-{shade}, text-{color}/{opacity}, text-[#hex]
      textColor: [/^text-(\w+(-\d+)?(\/\d+)?|\[#[0-9a-fA-F]{3,8}\])$/],
      // Background color: matches bg-{color}, bg-{color}-{shade}, bg-{color}/{opacity}, bg-[#hex], bg-gradient-*
      backgroundColor: [/^bg-(\w+(-\d+)?(\/\d+)?|\[#[0-9a-fA-F]{3,8}\])$/, /^bg-gradient-/],
      // Border color: matches border-{color}, border-{color}-{shade}, border-{color}/{opacity}, border-[#hex]
      borderColor: [/^border-(\w+(-\d+)?(\/\d+)?|\[#[0-9a-fA-F]{3,8}\])$/],
      marginTop: [/^mt-/],
      marginRight: [/^mr-/],
      marginBottom: [/^mb-/],
      marginLeft: [/^ml-/],
      margin: [/^m-\d/, /^mx-/, /^my-/],
      paddingTop: [/^pt-/],
      paddingRight: [/^pr-/],
      paddingBottom: [/^pb-/],
      paddingLeft: [/^pl-/],
      padding: [/^p-\d/, /^px-/, /^py-/],
      display: [/^(block|flex|grid|hidden|inline|inline-block|inline-flex)$/],
      flexDirection: [/^flex-(row|row-reverse|col|col-reverse)$/],
      justifyContent: [/^justify-/],
      alignItems: [/^items-/],
      gap: [/^gap-/],
      width: [/^w-/],
      height: [/^h-/],
      borderRadius: [/^rounded(-|$)/],
      borderWidth: [/^border(-\d|$)/],
      opacity: [/^opacity-/],
      boxShadow: [/^shadow(-|$)/],
    };

    return patterns[property] || [];
  }
}

// =============================================================================
// Initialize
// =============================================================================

// Boot logs - only shown when DEBUG is true
if (DEBUG) {
  log('Boot', '🔍 inspector.ts loaded');
  log('Boot', `window === window.parent: ${window === window.parent}`);
  log('Boot', `In iframe: ${window !== window.parent}`);
}

// Debug helper - expose on window for console debugging
(window as any).__lpsDebugInspector = () => {
  console.log('=== LPS Visual Editor Debug ===');
  console.log('In iframe:', window !== window.parent);
  
  // Check for sourceElementMap from lovable-tagger
  const mapSize = window.sourceElementMap?.size ?? 0;
  console.log(`window.sourceElementMap size: ${mapSize}`);
  
  if (mapSize > 0 && window.sourceElementMap) {
    console.log('Sample source map entries:');
    let count = 0;
    for (const [key, refs] of window.sourceElementMap) {
      if (count >= 10) break;
      const activeRefs = Array.from(refs).filter(r => r.deref());
      console.log(`  ${count + 1}. ${key} (${activeRefs.length} refs)`);
      count++;
    }
  }
  
  // Also walk DOM for SOURCE_KEY
  const SOURCE_KEY = Symbol.for("__jsxSource__");
  let elementsWithSource = 0;
  const sampleElements: Array<{tag: string; source: string}> = [];
  
  const walk = (node: Node) => {
    if (node instanceof HTMLElement && (node as any)[SOURCE_KEY]) {
      elementsWithSource++;
      if (sampleElements.length < 10) {
        const src = (node as any)[SOURCE_KEY];
        sampleElements.push({
          tag: node.tagName.toLowerCase(),
          source: `${src.fileName}:${src.lineNumber}:${src.columnNumber}`
        });
      }
    }
    for (const child of node.childNodes) {
      walk(child);
    }
  };
  walk(document.body);
  
  console.log(`Elements with __jsxSource__: ${elementsWithSource}`);
  if (sampleElements.length > 0) {
    console.log('Sample elements:');
    sampleElements.forEach((el, i) => {
      console.log(`  ${i + 1}. <${el.tag}> source="${el.source}"`);
    });
  } else {
    console.log('⚠️ NO elements with __jsxSource__ found!');
    console.log('Check if lovable-tagger jsxSource feature is enabled:');
    console.log('  componentTagger({ jsxSource: true })');
  }
  
  console.log('\nInspector state:');
  console.log('  __lpsInspector exists:', !!(window as any).__lpsInspector);
  
  return { mapSize, elementsWithSource };
};

if (DEBUG) log('Boot', '💡 Debug helper available: __lpsDebugInspector()');

// Only initialize if running in an iframe
if (window !== window.parent) {
  if (DEBUG) log('Boot', '✅ Running in iframe, will initialize inspector');
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    if (DEBUG) log('Boot', 'DOM loading, waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', () => {
      if (DEBUG) log('Boot', 'DOMContentLoaded fired, creating VisualInspector');
      const inspector = new VisualInspector();
      (window as any).__lpsInspector = inspector;
    });
  } else {
    if (DEBUG) log('Boot', 'DOM already ready, creating VisualInspector immediately');
    const inspector = new VisualInspector();
    (window as any).__lpsInspector = inspector;
  }
} else {
  if (DEBUG) {
    log('Boot', '❌ Not in iframe, inspector will NOT initialize');
    log('Boot', 'This is expected when viewing the page directly');
  }
}

export {};

