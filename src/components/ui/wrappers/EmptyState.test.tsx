/**
 * Unit tests for EmptyState wrapper component
 * Requirements: 12.1, 12.2, 12.3, 12.4
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { EmptyState, EmptyStateVariant } from './EmptyState'

describe('EmptyState Component', () => {
  describe('Variant Content Rendering', () => {
    it('renders orders variant with correct content', () => {
      render(<EmptyState variant="orders" />)

      expect(screen.getByText('No orders found')).toBeInTheDocument()
      expect(screen.getByText(/haven't created any orders/i)).toBeInTheDocument()
    })

    it('renders outlets variant with correct content', () => {
      render(<EmptyState variant="outlets" />)

      expect(screen.getByText('No outlets available')).toBeInTheDocument()
      expect(screen.getByText(/no outlets have been configured/i)).toBeInTheDocument()
    })

    it('renders search variant with correct content', () => {
      render(<EmptyState variant="search" />)

      expect(screen.getByText('No results found')).toBeInTheDocument()
      expect(screen.getByText(/adjusting your search/i)).toBeInTheDocument()
    })

    it('renders offline variant with correct content', () => {
      render(<EmptyState variant="offline" />)

      expect(screen.getByText(/you're offline/i)).toBeInTheDocument()
      expect(screen.getByText(/features may be limited/i)).toBeInTheDocument()
    })

    it('renders error variant with correct content', () => {
      render(<EmptyState variant="error" />)

      expect(screen.getByText('Unable to load data')).toBeInTheDocument()
      expect(screen.getByText(/problem loading/i)).toBeInTheDocument()
    })

    it('renders default variant with correct content', () => {
      render(<EmptyState variant="default" />)

      expect(screen.getByText('No data available')).toBeInTheDocument()
    })
  })

  describe('Custom Content', () => {
    it('overrides title when provided', () => {
      render(<EmptyState variant="orders" title="Custom Title" />)

      expect(screen.getByText('Custom Title')).toBeInTheDocument()
      expect(screen.queryByText('No orders found')).not.toBeInTheDocument()
    })

    it('overrides description when provided', () => {
      render(<EmptyState variant="orders" description="Custom description" />)

      expect(screen.getByText('Custom description')).toBeInTheDocument()
    })

    it('overrides icon when provided', () => {
      const customIcon = <svg data-testid="custom-icon" />
      render(<EmptyState variant="orders" icon={customIcon} />)

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })
  })

  describe('Icon Display', () => {
    it('renders icon container', () => {
      render(<EmptyState variant="orders" />)

      // Find the icon container by looking for the div with w-16 h-16 classes
      const container = screen.getByRole('status')
      const iconWrapper = container.querySelector('div.w-16.h-16')
      expect(iconWrapper).toBeInTheDocument()
      expect(iconWrapper?.className).toContain('bg-gray-100')
    })

    it('renders different icons for different variants', () => {
      const { rerender } = render(<EmptyState variant="orders" />)
      const ordersIcon = screen.getByRole('status').querySelector('div.w-16.h-16')?.innerHTML

      rerender(<EmptyState variant="search" />)
      const searchIcon = screen.getByRole('status').querySelector('div.w-16.h-16')?.innerHTML

      expect(ordersIcon).not.toEqual(searchIcon)
    })

    it('hides icon from accessibility tree', () => {
      render(<EmptyState variant="orders" />)

      const iconWrapper = screen.getByRole('status').querySelector('div.w-16.h-16')
      expect(iconWrapper).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Action Button', () => {
    it('renders action button when provided', () => {
      const handleAction = vi.fn()
      render(
        <EmptyState
          variant="orders"
          action={{ label: 'Create Order', onClick: handleAction }}
        />
      )

      expect(screen.getByRole('button', { name: 'Create Order' })).toBeInTheDocument()
    })

    it('calls action callback when clicked', () => {
      const handleAction = vi.fn()
      render(
        <EmptyState
          variant="orders"
          action={{ label: 'Create Order', onClick: handleAction }}
        />
      )

      fireEvent.click(screen.getByRole('button', { name: 'Create Order' }))
      expect(handleAction).toHaveBeenCalledTimes(1)
    })

    it('does not render action button when not provided', () => {
      render(<EmptyState variant="orders" />)

      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('applies #ED0577 color to action button', () => {
      render(
        <EmptyState
          variant="orders"
          action={{ label: 'Create Order', onClick: vi.fn() }}
        />
      )

      const button = screen.getByRole('button', { name: 'Create Order' })
      expect(button.className).toContain('bg-[#ED0577]')
    })
  })

  describe('Accessibility', () => {
    it('has role status', () => {
      render(<EmptyState variant="orders" />)

      const container = screen.getByRole('status')
      expect(container).toBeInTheDocument()
    })

    it('has aria-live attribute', () => {
      render(<EmptyState variant="orders" />)

      const container = screen.getByRole('status')
      expect(container).toHaveAttribute('aria-live', 'polite')
    })

    it('has proper heading structure', () => {
      render(<EmptyState variant="orders" />)

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('No orders found')
    })

    it('has aria-label on action button', () => {
      render(
        <EmptyState
          variant="orders"
          action={{ label: 'Create Order', onClick: vi.fn() }}
        />
      )

      const button = screen.getByRole('button', { name: 'Create Order' })
      expect(button).toHaveAttribute('aria-label', 'Create Order')
    })
  })

  describe('Layout', () => {
    it('applies flex column layout', () => {
      render(<EmptyState variant="orders" />)

      const container = screen.getByRole('status')
      expect(container.className).toContain('flex')
      expect(container.className).toContain('flex-col')
      expect(container.className).toContain('items-center')
      expect(container.className).toContain('justify-center')
    })

    it('applies padding', () => {
      render(<EmptyState variant="orders" />)

      const container = screen.getByRole('status')
      expect(container.className).toContain('py-12')
      expect(container.className).toContain('px-4')
    })

    it('centers text with max-width', () => {
      render(<EmptyState variant="orders" />)

      const description = screen.getByText(/haven't created/)
      expect(description.className).toContain('text-center')
      expect(description.className).toContain('max-w-sm')
    })
  })

  describe('Class Names', () => {
    it('applies custom className', () => {
      render(<EmptyState variant="orders" className="custom-class" />)

      const container = screen.getByRole('status')
      expect(container.className).toContain('custom-class')
    })
  })
})