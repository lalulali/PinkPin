/**
 * Unit tests for Pagination wrapper component
 * Requirements: 9.1, 9.2, 9.3, 9.4, 9.5
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Pagination } from './Pagination'

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    totalItems: 100,
    showingStart: 1,
    showingEnd: 20,
    onPageChange: vi.fn(),
  }

  describe('Rendering', () => {
    it('renders showing info text', () => {
      render(<Pagination {...defaultProps} />)

      // Check that the showing info container exists
      const elements = screen.queryAllByText((content, element) => {
        return element?.textContent?.includes('Showing') && 
               element?.textContent?.includes('orders')
      })
      expect(elements.length).toBeGreaterThan(0)
    })

    it('renders page numbers', () => {
      render(<Pagination {...defaultProps} />)

      expect(screen.getByRole('button', { name: 'Page 1' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Page 2' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Page 3' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Page 4' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Page 5' })).toBeInTheDocument()
    })

    it('renders previous and next buttons', () => {
      render(<Pagination {...defaultProps} />)

      expect(screen.getByRole('button', { name: 'Previous page' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Next page' })).toBeInTheDocument()
    })

    it('renders navigation with proper role', () => {
      render(<Pagination {...defaultProps} />)

      expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument()
    })
  })

  describe('Active Page Styling', () => {
    it('applies #ED0577 background to active page', () => {
      render(<Pagination {...defaultProps} currentPage={3} />)

      const activePage = screen.getByRole('button', { name: 'Page 3' })
      expect(activePage.className).toContain('bg-[#ED0577]')
    })

    it('marks active page with aria-current', () => {
      render(<Pagination {...defaultProps} currentPage={2} />)

      const activePage = screen.getByRole('button', { name: 'Page 2' })
      expect(activePage).toHaveAttribute('aria-current', 'page')
    })

    it('does not apply active styling to inactive pages', () => {
      render(<Pagination {...defaultProps} currentPage={1} />)

      const inactivePage = screen.getByRole('button', { name: 'Page 2' })
      expect(inactivePage.className).not.toContain('bg-[#ED0577]')
    })
  })

  describe('Page Navigation', () => {
    it('calls onPageChange when clicking a page number', () => {
      const onPageChange = vi.fn()
      render(<Pagination {...defaultProps} onPageChange={onPageChange} />)

      const pageButton = screen.getByRole('button', { name: 'Page 3' })
      fireEvent.click(pageButton)

      expect(onPageChange).toHaveBeenCalledWith(3)
    })

    it('calls onPageChange when clicking next button', () => {
      const onPageChange = vi.fn()
      render(<Pagination {...defaultProps} onPageChange={onPageChange} />)

      const nextButton = screen.getByRole('button', { name: 'Next page' })
      fireEvent.click(nextButton)

      expect(onPageChange).toHaveBeenCalledWith(2)
    })

    it('calls onPageChange when clicking previous button', () => {
      const onPageChange = vi.fn()
      render(<Pagination {...defaultProps} currentPage={3} onPageChange={onPageChange} />)

      const prevButton = screen.getByRole('button', { name: 'Previous page' })
      fireEvent.click(prevButton)

      expect(onPageChange).toHaveBeenCalledWith(2)
    })

    it('disables previous button on first page', () => {
      render(<Pagination {...defaultProps} currentPage={1} />)

      const prevButton = screen.getByRole('button', { name: 'Previous page' })
      expect(prevButton).toBeDisabled()
    })

    it('disables next button on last page', () => {
      render(<Pagination {...defaultProps} currentPage={5} totalPages={5} />)

      const nextButton = screen.getByRole('button', { name: 'Next page' })
      expect(nextButton).toBeDisabled()
    })
  })

  describe('Ellipsis Display', () => {
    it('shows ellipsis when there are many pages', () => {
      render(
        <Pagination
          {...defaultProps}
          currentPage={5}
          totalPages={10}
          showingStart={81}
          showingEnd={100}
        />
      )

      // Use getAllByText since there can be multiple ellipsis
      const ellipsisElements = screen.getAllByText('...')
      expect(ellipsisElements.length).toBeGreaterThan(0)
      // Verify they are in the pagination nav
      const nav = screen.getByRole('navigation', { name: 'Pagination' })
      const ellipsisInNav = Array.from(ellipsisElements).some(el => nav.contains(el))
      expect(ellipsisInNav).toBe(true)
    })

    it('does not show ellipsis when pages are few', () => {
      render(<Pagination {...defaultProps} totalPages={3} />)

      expect(screen.queryByText('...')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper aria-labels on page buttons', () => {
      render(<Pagination {...defaultProps} />)

      expect(screen.getByRole('button', { name: 'Page 1' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Page 2' })).toBeInTheDocument()
    })

    it('has aria-live attribute on showing info', () => {
      render(<Pagination {...defaultProps} />)

      // Find the element with aria-live="polite"
      const elements = screen.queryAllByText((content, element) => {
        return element?.textContent?.includes('Showing')
      })
      expect(elements.length).toBeGreaterThan(0)
      // Check the first one has aria-live
      const showingInfo = elements.find(el => el.tagName === 'P')
      expect(showingInfo).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('Responsive Design', () => {
    it('applies responsive class names', () => {
      render(<Pagination {...defaultProps} />)

      const container = screen.getByRole('navigation', { name: 'Pagination' }).parentElement
      expect(container?.className).toContain('flex-col')
      expect(container?.className).toContain('sm:flex-row')
    })

    it('has minimum touch target sizes', () => {
      render(<Pagination {...defaultProps} />)

      const pageButton = screen.getByRole('button', { name: 'Page 1' })
      expect(pageButton.className).toContain('min-h-[44px]')
    })
  })

  describe('Class Names', () => {
    it('applies custom className', () => {
      render(<Pagination {...defaultProps} className="custom-class" />)

      const container = screen.getByRole('navigation', { name: 'Pagination' }).parentElement
      expect(container?.className).toContain('custom-class')
    })
  })
})