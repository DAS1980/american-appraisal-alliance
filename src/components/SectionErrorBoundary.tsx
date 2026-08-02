import React from "react";

interface SectionErrorBoundaryProps {
  children: React.ReactNode;
  sectionName?: string;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Lightweight error boundary for individual page sections.
 * When a section crashes, only that section shows a fallback — the rest
 * of the page (header, footer, other sections) stays functional.
 */
class SectionErrorBoundary extends React.Component<SectionErrorBoundaryProps, SectionErrorBoundaryState> {
  constructor(props: SectionErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): SectionErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const name = this.props.sectionName || "Unknown section";
    console.error(`[SectionErrorBoundary] ${name} crashed:`, error.message);

    // Notify parent frame with section-level detail
    if (window !== window.parent) {
      try {
        window.parent.postMessage(
          {
            type: "RUNTIME_ERROR",
            payload: {
              message: `Section "${name}" crashed: ${error.message}`,
              componentStack: errorInfo.componentStack || "",
              timestamp: Date.now(),
            },
          },
          "*"
        );
      } catch {
        // postMessage failed — silently ignore
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export default SectionErrorBoundary;
