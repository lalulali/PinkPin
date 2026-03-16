/**
 * Unit tests for Sidebar component
 * Tests navigation links, active states, responsive behavior, and accessibility
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Sidebar } from '../../src/components/Sidebar'

const renderSidebar = (props = {}) => {
  return render(
    <BrowserRouter>
      <Sidebar {...props} />
    </BrowserRouter>
  )
}

describe('Sidebar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Navigation Links', () => {
    it('should display all navigation links', () => {
      renderSidebar()
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Order History')).toBeInTheDocument()
      expect(screen.getByText('Create Order')).toBeInTheDocument()
    })

    it('should have correct href for each link', () => {
      renderSidebar()
      const dashboardLink = screen.getByText('Dashboard').closest('a')
      const orderHistoryLink = screen.getByText('Order History').closest('a')
      const createOrderLink = screen.getByText('Create Order').closest('a')

      expect(dashboardLink).toHaveAttribute('href', '/dashboard')
      expect(orderHistoryLink).toHaveAttribute('href', '/orders')
      expect(createOrderLink).toHaveAttribute('href', '/create-order')
    })

    it('should display icons for each link', () => {
      renderSidebar()
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        const svg = link.querySelector('svg')
        expect(svg).toBeInTheDocument()
      })
    })
  })

  describe('Active State', () => {
    it('should highlight active link with primary color', () => {
      window.history.pushState({}, 'Dashboard', '/dashboard')
      renderSidebar()

      const dashboardLink = screen.getByText('Dashboard').closest('a')
      expect(dashboardLink).toHaveClass('bg-[#ED0577]', 'text-white')
    })

    it('should set aria-current for active link', () => {
      window.history.pushState({}, 'Dashboard', '/dashboard')
      renderSidebar()

      const dashboardLink = screen.getByText('Dashboard').closest('a')
      expect(dashboardLink).toHaveAttribute('aria-current', 'page')
    })

    it('should not highlight inactive links', () => {
      window.history.pushState({}, 'Dashboard', '/dashboard')
      renderSidebar()

      const orderHistoryLink = screen.getByText('Order History').closest('a')
      expect(orderHistoryLink).not.toHaveClass('bg-[#ED0577]')
      expect(orderHistoryLink).toHaveClass('text-gray-700')
    })

    it('should have hover state for inactive links', () => {
      renderSidebar()
      const orderHistoryLink = screen.getByText('Order History').closest('a')
      expect(orderHistoryLink).toHaveClass('hover:bg-gray-100', 'hover:text-[#ED0577]')
    })
  })

  describe('Mobile Responsive Behavior', () => {
    it('should be hidden by default on mobile', () => {
      renderSidebar({ isOpen: false })
      const aside = screen.getByRole('navigation').parentElement
      expect(aside).toHaveClass('-translate-x-full')
    })

    it('should be visible when isOpen is true', () => {
      renderSidebar({ isOpen: true })
      const aside = screen.getByRole('navigation').parentElement
      expect(aside).toHaveClass('translate-x-0')
    })

    it('should display overlay when sidebar is open', () => {
      renderSidebar({ isOpen: true })
      const overlay = document.querySelector('[aria-hidden="true"]')
      expect(overlay).toBeInTheDocument()
      expect(overlay).toHaveClass('bg-black', 'bg-opacity-50')
    })

    it('should call onClose when overlay is clicked', () => {
      const onClose = vi.fn()
      renderSidebar({ isOpen: true, onClose })
      const overlay = document.querySelector('[aria-hidden="true"]')
      fireEvent.click(overlay!)
      expect(onClose).toHaveBeenCalled()
    })

    it('should call onClose when link is clicked', () => {
      const onClose = vi.fn()
      renderSidebar({ isOpen: true, onClose })
      const dashboardLink = screen.getByText('Dashboard')
      fireEvent.click(dashboardLink)
      expect(onClose).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have proper tap target sizes', () => {
      renderSidebar()
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveClass('min-h-[44px]')
      })
    })

    it('should have semantic navigation element', () => {
      renderSidebar()
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })

    it('should have proper link text', () => {
      renderSidebar()
      const links = screen.getAllByRole('link')
      expect(links.length).toBe(3)
      expect(links[0]).toHaveTextContent('Dashboard')
      expect(links[1]).toHaveTextContent('Order History')
      expect(links[2]).toHaveTextContent('Create Order')
    })

    it('should have proper color contrast for inactive links', () => {
      window.history.pushState({}, 'Dashboard', '/dashboard')
      renderSidebar()
      const orderHistoryLink = screen.getByText('Order History').closest('a')
      expect(orderHistoryLink).toHaveClass('text-gray-700')
    })

    it('should have focus states', () => {
      renderSidebar()
      const dashboardLink = screen.getByText('Dashboard').closest('a')
      expect(dashboardLink).toHaveClass('rounded-lg')
    })
  })

  describe('Visual Design', () => {
    it('should have proper spacing between links', () => {
      renderSidebar()
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('space-y-2')
    })

    it('should have proper padding', () => {
      renderSidebar()
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('p-4')
    })

    it('should have border styling', () => {
      renderSidebar()
      const sidebar = screen.getByRole('navigation').parentElement
      expect(sidebar).toHaveClass('border-r', 'border-[#E5E7EB]')
    })

    it('should have proper background color', () => {
      renderSidebar()
      const sidebar = screen.getByRole('navigation').parentElement
      expect(sidebar).toHaveClass('bg-white')
    })

    it('should have transition effects', () => {
      renderSidebar()
      const sidebar = screen.getByRole('navigation').parentElement
      expect(sidebar).toHaveClass('transition-transform', 'duration-300', 'ease-in-out')
    })
  })

  describe('Link Icons', () => {
    it('should display dashboard icon', () => {
      renderSidebar()
      const dashboardLink = screen.getByText('Dashboard').closest('a')
      const svg = dashboardLink?.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveClass('w-5', 'h-5')
    })

    it('should display order history icon', () => {
      renderSidebar()
      const orderHistoryLink = screen.getByText('Order History').closest('a')
      const svg = orderHistoryLink?.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should display create order icon', () => {
      renderSidebar()
      const createOrderLink = screen.getByText('Create Order').closest('a')
      const svg = createOrderLink?.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('Mobile Overlay', () => {
    it('should not display overlay when sidebar is closed', () => {
      renderSidebar({ isOpen: false })
      const overlay = document.querySelector('[aria-hidden="true"]')
      expect(overlay).not.toBeInTheDocument()
    })

    it('should have proper overlay styling', () => {
      renderSidebar({ isOpen: true })
      const overlay = document.querySelector('[aria-hidden="true"]')
      expect(overlay).toHaveClass('fixed', 'inset-0', 'bg-black', 'bg-opacity-50', 'md:hidden')
    })
  })
})
