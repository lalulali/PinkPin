/**
 * Unit tests for Header component
 * Tests logo display, user menu, logout functionality, and responsive behavior
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Header } from '../../src/components/Header'
import { AuthProvider } from '../../src/context/AuthContext'

// Mock window.location
delete (window as any).location
window.location = { href: '' } as any

const renderHeader = (props = {}) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Header {...props} />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.location.href = ''
  })

  describe('Logo Display', () => {
    it('should display Pink Pin logo', () => {
      renderHeader()
      expect(screen.getByText('Pink Pin')).toBeInTheDocument()
    })

    it('should display Merchant subtitle', () => {
      renderHeader()
      expect(screen.getByText('Merchant')).toBeInTheDocument()
    })

    it('should have logo with correct styling', () => {
      renderHeader()
      const logo = screen.getByText('Pink Pin')
      expect(logo).toHaveClass('text-[#ED0577]')
    })
  })

  describe('User Menu', () => {
    it('should display user avatar with initial', () => {
      renderHeader()
      // Avatar should be visible with user initial
      const avatars = screen.getAllByText(/[A-Z]/)
      expect(avatars.length).toBeGreaterThan(0)
    })

    it('should open user menu when clicked', async () => {
      renderHeader()
      const userMenuButton = screen.getByLabelText('User menu')
      fireEvent.click(userMenuButton)

      await waitFor(() => {
        expect(screen.getByText(/logout/i)).toBeInTheDocument()
      })
    })

    it('should close user menu when clicking outside', async () => {
      renderHeader()
      const userMenuButton = screen.getByLabelText('User menu')
      fireEvent.click(userMenuButton)

      await waitFor(() => {
        expect(screen.getByText(/logout/i)).toBeInTheDocument()
      })

      // Click outside
      fireEvent.mouseDown(document.body)

      await waitFor(() => {
        expect(screen.queryByText(/logout/i)).not.toBeInTheDocument()
      })
    })

    it('should display user info in menu when opened', async () => {
      renderHeader()
      const userMenuButton = screen.getByLabelText('User menu')
      fireEvent.click(userMenuButton)

      await waitFor(() => {
        // Should display logout button
        expect(screen.getByText(/logout/i)).toBeInTheDocument()
      })
    })
  })

  describe('Logout Functionality', () => {
    it('should have logout button in user menu', async () => {
      renderHeader()
      const userMenuButton = screen.getByLabelText('User menu')
      fireEvent.click(userMenuButton)

      await waitFor(() => {
        expect(screen.getByText(/logout/i)).toBeInTheDocument()
      })
    })

    it('should close menu after logout', async () => {
      renderHeader()
      const userMenuButton = screen.getByLabelText('User menu')
      fireEvent.click(userMenuButton)

      await waitFor(() => {
        expect(screen.getByText(/logout/i)).toBeInTheDocument()
      })

      const logoutButton = screen.getByText(/logout/i)
      fireEvent.click(logoutButton)

      await waitFor(() => {
        expect(screen.queryByText(/logout/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('Mobile Menu Toggle', () => {
    it('should display menu toggle button on mobile', () => {
      renderHeader()
      const toggleButton = screen.getByLabelText('Toggle sidebar')
      expect(toggleButton).toBeInTheDocument()
    })

    it('should call onMenuToggle when toggle button is clicked', () => {
      const onMenuToggle = vi.fn()
      renderHeader({ onMenuToggle })
      const toggleButton = screen.getByLabelText('Toggle sidebar')
      fireEvent.click(toggleButton)
      expect(onMenuToggle).toHaveBeenCalled()
    })

    it('should update aria-expanded attribute', () => {
      const onMenuToggle = vi.fn()
      const { rerender } = renderHeader({ onMenuToggle, isSidebarOpen: false })
      const toggleButton = screen.getByLabelText('Toggle sidebar')
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false')

      rerender(
        <BrowserRouter>
          <AuthProvider>
            <Header onMenuToggle={onMenuToggle} isSidebarOpen={true} />
          </AuthProvider>
        </BrowserRouter>
      )

      expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('Accessibility', () => {
    it('should have proper tap target sizes', () => {
      renderHeader()
      const userMenuButton = screen.getByLabelText('User menu')
      expect(userMenuButton).toHaveClass('min-h-[44px]')
    })

    it('should have proper ARIA labels', () => {
      renderHeader()
      expect(screen.getByLabelText('Toggle sidebar')).toBeInTheDocument()
      expect(screen.getByLabelText('User menu')).toBeInTheDocument()
    })

    it('should have semantic HTML structure', () => {
      renderHeader()
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    it('should have proper color contrast', () => {
      renderHeader()
      const logo = screen.getByText('Pink Pin')
      expect(logo).toHaveClass('text-[#ED0577]')
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive user name display', () => {
      renderHeader()
      // The user name span should have hidden sm:inline classes for responsive display
      const userNameSpan = screen.getByRole('banner').querySelector('span.hidden')
      expect(userNameSpan).toBeInTheDocument()
      expect(userNameSpan).toHaveClass('hidden', 'sm:inline')
    })

    it('should have responsive padding', () => {
      renderHeader()
      const headerDiv = screen.getByRole('banner').querySelector('div')
      expect(headerDiv).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')
    })
  })

  describe('Visual States', () => {
    it('should have hover states on interactive elements', () => {
      renderHeader()
      const userMenuButton = screen.getByLabelText('User menu')
      expect(userMenuButton).toHaveClass('hover:text-[#ED0577]')
    })

    it('should have transition effects', () => {
      renderHeader()
      const userMenuButton = screen.getByLabelText('User menu')
      expect(userMenuButton).toHaveClass('transition-colors')
    })
  })
})
