/**
 * Property-based tests for Phase 3 components (Accordion, Pagination, EmptyState)
 * Validates Properties 10, 11, 14 from design.md
 * Uses fast-check library for property-based testing
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { render, screen, cleanup } from '@testing-library/react'
import { Pagination } from '@/src/components/ui/wrappers/Pagination'
import { EmptyState, EmptyStateVariant } from '@/src/components/ui/wrappers/EmptyState'

describe('Property 11: Pagination Active Page Styling', () => {
  /**
   * For any pagination component with an active page, the active page button
   * SHALL display the #ED0577 background color.
   * 
   * Validates: Requirement 9.5
   */
  it('applies #ED0577 background to active page', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        fc.integer({ min: 1, max: 50 }),
        (currentPage, totalPages) => {
          cleanup()
          const total = Math.max(totalPages, 1)
          // Ensure currentPage is within valid range
          const validPage = Math.min(currentPage, total)
          
          render(
            <Pagination
              currentPage={validPage}
              totalPages={total}
              totalItems={total * 20}
              showingStart={(validPage - 1) * 20 + 1}
              showingEnd={Math.min(validPage * 20, total * 20)}
              onPageChange={() => {}}
            />
          )

          const activePage = screen.getByRole('button', { name: `Page ${validPage}` })
          expect(activePage.className).toContain('bg-[#ED0577]')
        }
      ),
      { numRuns: 50 }
    )
  })

  it('marks active page with aria-current', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 20 }),
        (currentPage) => {
          cleanup()
          render(
            <Pagination
              currentPage={currentPage}
              totalPages={20}
              totalItems={400}
              showingStart={(currentPage - 1) * 20 + 1}
              showingEnd={currentPage * 20}
              onPageChange={() => {}}
            />
          )

          const activePage = screen.getByRole('button', { name: `Page ${currentPage}` })
          expect(activePage).toHaveAttribute('aria-current', 'page')
        }
      ),
      { numRuns: 20 }
    )
  })
})

describe('Property 14: EmptyState Variant Content', () => {
  /**
   * For any empty state variant (orders, outlets, search, offline, error),
   * the rendered empty state SHALL display the correct icon, title, and description.
   * 
   * Validates: Requirements 12.1, 12.2, 12.3
   */
  it('renders correct content for orders variant', () => {
    cleanup()
    render(<EmptyState variant="orders" />)
    expect(screen.getByText('No orders found')).toBeInTheDocument()
    expect(screen.getByText(/haven't created any orders/i)).toBeInTheDocument()
  })

  it('renders correct content for outlets variant', () => {
    cleanup()
    render(<EmptyState variant="outlets" />)
    expect(screen.getByText('No outlets available')).toBeInTheDocument()
    expect(screen.getByText(/no outlets have been configured/i)).toBeInTheDocument()
  })

  it('renders correct content for search variant', () => {
    cleanup()
    render(<EmptyState variant="search" />)
    expect(screen.getByText('No results found')).toBeInTheDocument()
    expect(screen.getByText(/adjusting your search/i)).toBeInTheDocument()
  })

  it('renders correct content for offline variant', () => {
    cleanup()
    render(<EmptyState variant="offline" />)
    expect(screen.getByText(/you're offline/i)).toBeInTheDocument()
    expect(screen.getByText(/features may be limited/i)).toBeInTheDocument()
  })

  it('renders correct content for error variant', () => {
    cleanup()
    render(<EmptyState variant="error" />)
    expect(screen.getByText('Unable to load data')).toBeInTheDocument()
    expect(screen.getByText(/problem loading/i)).toBeInTheDocument()
  })

  it('allows custom title override', () => {
    cleanup()
    render(<EmptyState variant="orders" title="Custom Title" />)
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
    expect(screen.queryByText('No orders found')).not.toBeInTheDocument()
  })

  it('allows custom description override', () => {
    cleanup()
    render(<EmptyState variant="orders" description="Custom description" />)
    expect(screen.getByText('Custom description')).toBeInTheDocument()
  })

  it('renders icon for all variants', () => {
    const variants: EmptyStateVariant[] = ['orders', 'outlets', 'search', 'offline', 'error']
    
    variants.forEach((variant) => {
      cleanup()
      render(<EmptyState variant={variant} />)
      
      const iconWrapper = screen.getByRole('status').querySelector('div.w-16.h-16')
      expect(iconWrapper).toBeInTheDocument()
    })
  })
})