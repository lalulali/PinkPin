'use client'

import { Component, ReactNode, ErrorInfo } from 'react'
import { EmptyState } from './EmptyState'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  resetKey?: string | number
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * ErrorBoundary - Catches React component errors and displays a user-friendly error UI
 * Implements Requirements 3.5, 3.7
 * - Displays user-friendly error message
 * - Logs errors for debugging
 * - Provides retry button to attempt operation again
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error for debugging (Requirement 3.5)
    console.error('ErrorBoundary caught an error:', error)
    console.error('Component stack:', errorInfo.componentStack)

    // Call optional error callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    this.setState({ errorInfo })
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  public render(): ReactNode {
    // Check if reset key changed
    if (this.props.resetKey !== undefined) {
      // Force re-render when resetKey changes
      this.state = { hasError: false, error: null, errorInfo: null }
    }

    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI (Requirement 3.5, 3.7)
      return (
        <EmptyState
          variant="error"
          title="Something went wrong"
          description="An error occurred while loading this content. Please try again."
          action={{
            label: 'Retry',
            onClick: this.handleRetry,
          }}
        />
      )
    }

    return this.props.children
  }
}

/**
 * AsyncErrorBoundary - Error boundary that handles async errors
 */
interface AsyncErrorBoundaryProps extends Omit<ErrorBoundaryProps, 'children'> {
  children: ReactNode
  asyncError?: Error | null
  onAsyncRetry?: () => void
}

interface AsyncErrorBoundaryState {
  hasAsyncError: boolean
}

export class AsyncErrorBoundary extends Component<
  Omit<AsyncErrorBoundaryProps, 'error' | 'errorInfo'>,
  AsyncErrorBoundaryState
> {
  public state: AsyncErrorBoundaryState = {
    hasAsyncError: false,
  }

  public static getDerivedStateFromError(error: Error): AsyncErrorBoundaryState {
    return { hasAsyncError: true }
  }

  public componentDidUpdate(prevProps: AsyncErrorBoundaryProps): void {
    // Clear async error when it's resolved
    if (this.state.hasAsyncError && prevProps.asyncError !== this.props.asyncError) {
      if (!this.props.asyncError) {
        this.setState({ hasAsyncError: false })
      }
    }
  }

  private handleRetry = (): void => {
    this.setState({ hasAsyncError: false })
    if (this.props.onAsyncRetry) {
      this.props.onAsyncRetry()
    }
  }

  public render(): ReactNode {
    if (this.state.hasAsyncError) {
      return (
        <EmptyState
          variant="error"
          title="Something went wrong"
          description="An error occurred while processing your request. Please try again."
          action={{
            label: 'Retry',
            onClick: this.handleRetry,
          }}
        />
      )
    }

    return this.props.children
  }
}

/**
 * createErrorBoundary - HOC to wrap a component with error boundary
 */
export function createErrorBoundary(
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
) {
  return function <T extends object>(WrappedComponent: React.ComponentType<T>) {
    return function ErrorBoundedComponent(props: T) {
      return (
        <ErrorBoundary fallback={fallback} onError={onError}>
          <WrappedComponent {...props} />
        </ErrorBoundary>
      )
    }
  }
}

export default ErrorBoundary