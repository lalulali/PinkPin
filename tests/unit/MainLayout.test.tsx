/**
 * Unit tests for MainLayout component
 * Tests layout structure, responsive behavior, and component integration
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { MainLayout } from '../../src/components/MainLayout'
import { AuthProvider } from '../../src/context/AuthContext'

// Mock window.location
delete (window as any).location
window.location = { href: '' } as any

const renderMainLayout = (children = <div>Test Content</div>) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <MainLayout>{children}</MainLayout>
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('MainLayout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.location.href = ''
  })

  describe('Layout Structure', () => {
    it('should render header component', () => {
      renderMainLayout()
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    it('should render sidebar component', () => {
      renderMainLayout()
      const sidebar = screen.getByRole('navigation')
      expect(sidebar).toBeInTheDocument()
    })

    it('should render main content area', () => {
      renderMainLayout(<div>Test Content</div>)
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should render children content', () => {
      const testContent = 'This is test content'
      renderMainLayout(<div>{testContent}</div>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('should have proper layout container structure', () => {
      renderMainLayout()
      const layoutContainer = screen.getByRole('banner').parentElement
      expect(layoutContainer).toHaveClass('min-h-screen', 'bg-gray-50')
    })
  })

  describe('Header Integration', () => {
    it('should display Pink Pin logo in header', () => {
      renderMainLayout()
      expect(screen.getByText('Pink Pin')).toBeInTheDocument()
    })

    it('should display user menu in header', () => {
      renderMainLayout()
      const userMenuButton = screen.getByLabelText('User menu')
      expect(userMenuButton).toBeInTheDocument()
    })

    it('should display menu toggle button', () => {
      renderMainLayout()
      const toggleButton = screen.getByLabelText('Toggle sidebar')
      expect(toggleButton).toBeInTheDocument()
    })
  })

  describe('Sidebar Integration', () => {
    it('should display navigation links', () => {
      renderMainLayout()
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Order History')).toBeInTheDocument()
      expect(screen.getByText('Create Order')).toBeInTheDocument()
    })

    it('should toggle sidebar visibility on menu button click', async () => {
      renderMainLayout()
      const toggleButton = screen.getByLabelText('Toggle sidebar')
      const aside = screen.getByRole('navigation').parentElement

      // Initially closed on mobile
      expect(aside).toHaveClass('-translate-x-full')

      // Click to open
      fireEvent.click(toggleButton)
      await waitFor(() => {
        expect(screen.getByRole('navigation').parentElement).toHaveClass('translate-x-0')
      })

      // Click to close
      fireEvent.click(toggleButton)
      await waitFor(() => {
        expect(screen.getByRole('navigation').parentElement).toHaveClass('-translate-x-full')
      })
    })

    it('should close sidebar when clicking a navigation link', async () => {
      renderMainLayout()
      const toggleButton = screen.getByLabelText('Toggle sidebar')

      // Open sidebar
      fireEvent.click(toggleButton)
      await waitFor(() => {
        expect(screen.getByRole('navigation').parentElement).toHaveClass('translate-x-0')
      })

      // Click a link
      const dashboardLink = screen.getByText('Dashboard')
      fireEvent.click(dashboardLink)

      // Sidebar should close
      await waitFor(() => {
        expect(screen.getByRole('navigation').parentElement).toHaveClass('-translate-x-full')
      })
    })
  })

  describe('Responsive Design', () => {
    it('should have flex layout for desktop', () => {
      renderMainLayout()
      const layoutContainer = screen.getByRole('banner').parentElement?.querySelector('.flex')
      expect(layoutContainer).toHaveClass('flex')
    })

    it('should have responsive main content width', () => {
      renderMainLayout()
      const main = screen.getByRole('main')
      expect(main).toHaveClass('flex-1', 'w-full', 'md:w-auto')
    })

    it('should have responsive padding', () => {
      renderMainLayout()
      const main = screen.getByRole('main')
      const contentDiv = main.firstElementChild
      expect(contentDiv).toHaveClass('px-4', 'sm:px-6', 'lg:px-8', 'py-8')
    })

    it('should have proper z-index layering', () => {
      renderMainLayout()
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('z-20')
    })
  })

  describe('Mobile Overlay', () => {
    it('should display overlay when sidebar is open', async () => {
      renderMainLayout()
      const toggleButton = screen.getByLabelText('Toggle sidebar')

      fireEvent.click(toggleButton)
      await waitFor(() => {
        const overlay = document.querySelector('[aria-hidden="true"]')
        expect(overlay).toBeInTheDocument()
      })
    })

    it('should close sidebar when overlay is clicked', async () => {
      renderMainLayout()
      const toggleButton = screen.getByLabelText('Toggle sidebar')

      fireEvent.click(toggleButton)
      await waitFor(() => {
        const overlay = document.querySelector('[aria-hidden="true"]')
        expect(overlay).toBeInTheDocument()
      })

      const overlay = document.querySelector('[aria-hidden="true"]')
      fireEvent.click(overlay!)

      await waitFor(() => {
        expect(screen.getByRole('navigation').parentElement).toHaveClass('-translate-x-full')
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      renderMainLayout()
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('should have proper heading hierarchy', () => {
      renderMainLayout()
      const logo = screen.getByText('Pink Pin')
      expect(logo).toBeInTheDocument()
    })

    it('should have proper ARIA labels', () => {
      renderMainLayout()
      expect(screen.getByLabelText('Toggle sidebar')).toBeInTheDocument()
      expect(screen.getByLabelText('User menu')).toBeInTheDocument()
    })

    it('should have proper tap target sizes', () => {
      renderMainLayout()
      const toggleButton = screen.getByLabelText('Toggle sidebar')
      expect(toggleButton).toHaveClass('min-h-[44px]', 'min-w-[44px]')
    })

    it('should have proper color contrast', () => {
      renderMainLayout()
      const logo = screen.getByText('Pink Pin')
      expect(logo).toHaveClass('text-[#ED0577]')
    })
  })

  describe('Content Area', () => {
    it('should render children in main content area', () => {
      const testContent = 'Dashboard Content'
      renderMainLayout(<div>{testContent}</div>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('should have proper background color', () => {
      renderMainLayout()
      const layoutContainer = screen.getByRole('banner').parentElement
      expect(layoutContainer).toHaveClass('bg-gray-50')
    })

    it('should have proper minimum height', () => {
      renderMainLayout()
      const layoutContainer = screen.getByRole('banner').parentElement
      expect(layoutContainer).toHaveClass('min-h-screen')
    })
  })

  describe('State Management', () => {
    it('should manage sidebar open/close state', async () => {
      renderMainLayout()
      const toggleButton = screen.getByLabelText('Toggle sidebar')
      const aside = screen.getByRole('navigation').parentElement

      // Initial state: closed
      expect(aside).toHaveClass('-translate-x-full')

      // Toggle open
      fireEvent.click(toggleButton)
      await waitFor(() => {
        expect(screen.getByRole('navigation').parentElement).toHaveClass('translate-x-0')
      })

      // Toggle closed
      fireEvent.click(toggleButton)
      await waitFor(() => {
        expect(screen.getByRole('navigation').parentElement).toHaveClass('-translate-x-full')
      })
    })

    it('should maintain sidebar state across re-renders', async () => {
      const { rerender } = renderMainLayout(<div>Content 1</div>)
      const toggleButton = screen.getByLabelText('Toggle sidebar')

      fireEvent.click(toggleButton)
      await waitFor(() => {
        expect(screen.getByRole('navigation').parentElement).toHaveClass('translate-x-0')
      })

      // Re-render with different content
      rerender(
        <BrowserRouter>
          <AuthProvider>
            <MainLayout>
              <div>Content 2</div>
            </MainLayout>
          </AuthProvider>
        </BrowserRouter>
      )

      // Sidebar should still be open
      expect(screen.getByRole('navigation').parentElement).toHaveClass('translate-x-0')
    })
  })

  describe('Visual Design', () => {
    it('should have proper header styling', () => {
      renderMainLayout()
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('bg-white', 'shadow-sm', 'sticky', 'top-0')
    })

    it('should have proper sidebar styling', () => {
      renderMainLayout()
      const sidebar = screen.getByRole('navigation').parentElement
      expect(sidebar).toHaveClass('bg-white', 'border-r', 'border-[#E5E7EB]')
    })

    it('should have proper main content styling', () => {
      renderMainLayout()
      const main = screen.getByRole('main')
      expect(main).toHaveClass('flex-1')
    })
  })
})
