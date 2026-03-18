/**
 * Unit tests for Badge wrapper component
 * Requirements: 10.1, 10.2, 10.3, 10.4
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge Component', () => {
  describe('Rendering', () => {
    it('renders with correct base styling', () => {
      render(<Badge>Badge Content</Badge>)
      const badge = screen.getByRole('status')
      expect(badge).toHaveClass('rounded-full', 'px-2', 'py-0.5', 'text-xs')
    })

    it('renders children content', () => {
      render(<Badge>Custom Text</Badge>)
      expect(screen.getByText('Custom Text')).toBeInTheDocument()
    })

    it('renders default variant', () => {
      render(<Badge variant="default">Default</Badge>)
      const badge = screen.getByRole('status')
      expect(badge).toHaveClass('bg-gray-100', 'text-gray-800')
    })
  })

  describe('Variant Colors', () => {
    it('uses correct colors for submitted variant', () => {
      render(<Badge variant="submitted">Submitted</Badge>)
      const badge = screen.getByRole('status')
      expect(badge).toHaveClass('bg-blue-100', 'text-blue-800')
    })

    it('uses correct colors for waiting variant', () => {
      render(<Badge variant="waiting">Waiting</Badge>)
      const badge = screen.getByRole('status')
      expect(badge).toHaveClass('bg-amber-100', 'text-amber-800')
    })

    it('uses correct colors for closed variant', () => {
      render(<Badge variant="closed">Closed</Badge>)
      const badge = screen.getByRole('status')
      expect(badge).toHaveClass('bg-green-100', 'text-green-800')
    })

    it('uses correct colors for cancelled variant', () => {
      render(<Badge variant="cancelled">Cancelled</Badge>)
      const badge = screen.getByRole('status')
      expect(badge).toHaveClass('bg-red-100', 'text-red-800')
    })
  })

  describe('Accessibility', () => {
    it('has role status', () => {
      render(<Badge>Test</Badge>)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('has aria-label for screen readers', () => {
      render(<Badge variant="submitted">Content</Badge>)
      const badge = screen.getByRole('status')
      expect(badge).toHaveAttribute('aria-label', 'Shipment Created')
    })

    it('uses default label when no children provided', () => {
      render(<Badge variant="waiting" />)
      const badge = screen.getByRole('status')
      expect(badge).toHaveTextContent('Waiting for Pick Up')
    })
  })

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(<Badge className="custom-class">Custom</Badge>)
      const badge = screen.getByRole('status')
      expect(badge).toHaveClass('custom-class')
    })
  })
})