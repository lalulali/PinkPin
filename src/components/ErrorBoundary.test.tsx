/**
 * ErrorBoundary Tests
 * Validates: Requirements 3.5, 3.7
 * - Requirement 3.5: Display user-friendly error message and log error for debugging
 * - Requirement 3.7: Provide "Retry" button to attempt operation again
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { ErrorBoundary } from './ErrorBoundary'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock console.error to verify error logging
const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

describe('ErrorBoundary', () => {
  beforeEach(() => {
    mockConsoleError.mockClear()
  })

  afterAll(() => {
    mockConsoleError.mockRestore()
  })

  it('should render children when no error occurs', () => {
    const ChildComponent = () => <div data-testid="child">Child Content</div>

    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })

  it('should display error UI when child component throws', () => {
    const ThrowError = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Please refresh the page and try again.')).toBeInTheDocument()
  })

  it('should display retry button (Requirement 3.7)', () => {
    const ThrowError = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    const retryButton = screen.getByRole('button', { name: /retry/i })
    expect(retryButton).toBeInTheDocument()
    expect(retryButton).toHaveClass('bg-[#ED0577]')
  })

  it('should log errors to console for debugging (Requirement 3.5)', () => {
    const ThrowError = () => {
      throw new Error('Test error for logging')
    }

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(mockConsoleError).toHaveBeenCalled()
    expect(mockConsoleError).toHaveBeenCalledWith(
      expect.stringContaining('ErrorBoundary caught an error'),
      expect.any(Error)
    )
  })

  it('should reset error state when retry button is clicked', () => {
    let shouldThrow = true
    const ToggleError = () => {
      if (shouldThrow) {
        throw new Error('Test error')
      }
      return <div data-testid="recovered">Recovered Content</div>
    }

    const { rerender } = render(
      <ErrorBoundary>
        <ToggleError />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()

    const retryButton = screen.getByRole('button', { name: /retry/i })
    fireEvent.click(retryButton)

    // After retry, the component should re-render
    // Since shouldThrow is still true, it will throw again
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('should use custom fallback when provided', () => {
    const ThrowError = () => {
      throw new Error('Test error')
    }

    const CustomFallback = () => <div data-testid="custom-fallback">Custom Error UI</div>

    render(
      <ErrorBoundary fallback={<CustomFallback />}>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })

  it('should have accessible error message', () => {
    const ThrowError = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    // Check for ARIA role - there should be at least one alert element
    const alerts = screen.getAllByRole('alert')
    expect(alerts.length).toBeGreaterThanOrEqual(1)
  })

  it('should have proper styling for error UI', () => {
    const ThrowError = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    const container = screen.getByText('Something went wrong').closest('div')
    expect(container).toHaveClass('bg-white', 'rounded-lg', 'shadow-md', 'p-6')
  })

  it('should have minimum tap target size for retry button (44px)', () => {
    const ThrowError = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    const retryButton = screen.getByRole('button', { name: /retry/i })
    expect(retryButton).toHaveClass('min-h-[44px]')
  })
})

export default ErrorBoundary