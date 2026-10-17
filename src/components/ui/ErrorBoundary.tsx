import { Component, type ReactNode, type ErrorInfo } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  name?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  silentFallback?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (this.props.onError) {
      try {
        this.props.onError(error, errorInfo);
      } catch {
        // ignore callback error
      }
    }
    console.warn(`[ErrorBoundary${this.props.name ? `:${this.props.name}` : ''}] caught error:`, error, errorInfo);
  }

  reset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (typeof this.props.fallback === 'function' && this.state.error) {
        return this.props.fallback(this.state.error, this.reset);
      }
      if (this.props.fallback !== undefined && typeof this.props.fallback !== 'function') {
        return this.props.fallback;
      }
      if (this.props.silentFallback) {
        return null;
      }
      return (
        <div className="p-6 my-4 rounded-xl bg-midnight-surface/80 border border-white/10 text-white font-sans">
          <h3 className="text-lg font-bold text-cyan mb-2">Module Temporarily Unavailable</h3>
          <p className="text-sm text-ink-muted mb-4">
            A visual component encountered an issue and has been safely isolated.
          </p>
          <button
            type="button"
            onClick={this.reset}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-semibold text-white transition-colors"
          >
            Retry Module
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
