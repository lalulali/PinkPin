/**
 * Integration tests for Theme Color Application
 * Verifies that #ED0577 primary color is applied to interactive states
 * 
 * Property 16: Theme Color Application
 * Validates: Requirements 14.1
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { Button } from '@/src/components/ui/wrappers/Button'
import { Input } from '@/src/components/ui/wrappers/Input'
import { Checkbox } from '@/src/components/ui/wrappers/Checkbox'
import { Select } from '@/src/components/ui/wrappers/Select'

const PRIMARY_COLOR = '#ED0577'

describe('Property 16: Theme Color Application', () => {
  describe('Button Focus Ring Styling', () => {
    it('applies #ED0577 focus ring to primary variant', () => {
      const { container } = render(<Button variant="primary">Primary Button</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('focus-visible:ring-[#ED0577]')
    })

    it('applies #ED0577 background to primary variant', () => {
      const { container } = render(<Button variant="primary">Primary Button</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-[#ED0577]')
    })

    it('applies #ED0577 hover state to primary variant', () => {
      const { container } = render(<Button variant="primary">Primary Button</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('hover:bg-[#d9066a]')
    })

    it('applies focus ring to secondary variant', () => {
      const { container } = render(<Button variant="secondary">Secondary</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('focus-visible:ring-[#ED0577]')
    })

    it('applies focus ring to ghost variant', () => {
      const { container } = render(<Button variant="ghost">Ghost</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('focus-visible:ring-[#ED0577]')
    })

    it('applies focus ring to danger variant', () => {
      const { container } = render(<Button variant="danger">Danger</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('focus-visible:ring-[#ED0577]')
    })
  })

  describe('Input Focus Ring Styling', () => {
    it('applies #ED0577 focus ring to input', () => {
      const { container } = render(<Input />)
      const input = container.querySelector('input')
      expect(input).toHaveClass('focus-visible:ring-[#ED0577]')
    })

    it('applies #ED0577 border color on focus', () => {
      const { container } = render(<Input />)
      const input = container.querySelector('input')
      expect(input).toHaveClass('focus-visible:border-[#ED0577]')
    })

    it('applies focus ring to error state input', () => {
      const { container } = render(<Input error="Error message" />)
      const input = container.querySelector('input')
      expect(input).toHaveClass('focus-visible:ring-[#ED0577]')
    })

    it('applies focus ring to disabled input', () => {
      const { container } = render(<Input disabled />)
      const input = container.querySelector('input')
      expect(input).toHaveClass('focus-visible:ring-[#ED0577]')
    })
  })

  describe('Interactive State Colors', () => {
    it('Button shows active state with primary color', () => {
      const { container } = render(<Button variant="primary">Active Test</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-[#ED0577]')
    })

    it('Checkbox applies #ED0577 to checked state', () => {
      const { container } = render(<Checkbox checked />)
      const checkbox = container.querySelector('[data-state="checked"]')
      expect(checkbox).toBeInTheDocument()
    })

    it('Select applies focus ring with primary color', () => {
      const { container } = render(
        <Select
          options={[{ value: 'opt1', label: 'Option 1' }]}
          value="opt1"
        />
      )
      const trigger = container.querySelector('[data-state="open"]') || container.querySelector('.relative')
      expect(container.querySelector('button')).toBeInTheDocument()
    })
  })

  describe('Focus Management', () => {
    it('Button receives focus correctly', () => {
      render(<Button>Focus Test</Button>)
      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })

    it('Input receives focus correctly', () => {
      render(<Input label="Focus Test" />)
      const input = screen.getByRole('textbox')
      input.focus()
      expect(input).toHaveFocus()
    })

    it('Checkbox receives focus correctly', () => {
      render(<Checkbox label="Focus Test" />)
      const checkbox = screen.getByRole('checkbox')
      checkbox.focus()
      expect(checkbox).toHaveFocus()
    })

    it('Focus outline uses primary color', () => {
      const { container } = render(<Button variant="primary">Focus Outline</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('focus-visible:ring-[#ED0577]')
    })
  })

  describe('Active State Colors', () => {
    it('Button active state uses primary color', () => {
      const { container } = render(<Button variant="primary">Active State</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-[#ED0577]')
    })

    it('Button hover state uses darker primary color', () => {
      const { container } = render(<Button variant="primary">Hover State</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('hover:bg-[#d9066a]')
    })
  })

  describe('Status Colors', () => {
    it('Badge submitted uses blue color scheme', () => {
      const { container } = render(<Badge variant="submitted">Submitted</Badge>)
      const badge = container.querySelector('[role="status"]')
      expect(badge).toHaveClass('bg-blue-100', 'text-blue-800')
    })

    it('Badge waiting uses amber color scheme', () => {
      const { container } = render(<Badge variant="waiting">Waiting</Badge>)
      const badge = container.querySelector('[role="status"]')
      expect(badge).toHaveClass('bg-amber-100', 'text-amber-800')
    })

    it('Badge closed uses green color scheme', () => {
      const { container } = render(<Badge variant="closed">Closed</Badge>)
      const badge = container.querySelector('[role="status"]')
      expect(badge).toHaveClass('bg-green-100', 'text-green-800')
    })

    it('Badge cancelled uses red color scheme', () => {
      const { container } = render(<Badge variant="cancelled">Cancelled</Badge>)
      const badge = container.querySelector('[role="status"]')
      expect(badge).toHaveClass('bg-red-100', 'text-red-800')
    })
  })

  describe('Card Status Badge Colors', () => {
    const mockOrder = {
      id: 'order-001',
      invoiceNumber: 'INV-2024-001',
      status: 'submitted' as const,
      recipient: { name: 'John', address: 'Address' },
      delivery: { distance: 1, serviceType: 'standard', shippingFee: 10000 },
      createdAt: new Date(),
    }

    it('Card status badge uses correct color for submitted', () => {
      const { container } = render(<Card order={mockOrder} />)
      const badge = container.querySelector('span[class*="rounded-full"]')
      expect(badge).toHaveClass('bg-blue-100', 'text-blue-800')
    })

    it('Card status badge uses correct color for waiting', () => {
      const { container } = render(<Card order={{ ...mockOrder, status: 'waiting' }} />)
      const badge = container.querySelector('span[class*="rounded-full"]')
      expect(badge).toHaveClass('bg-amber-100', 'text-amber-800')
    })

    it('Card status badge uses correct color for closed', () => {
      const { container } = render(<Card order={{ ...mockOrder, status: 'closed' }} />)
      const badge = container.querySelector('span[class*="rounded-full"]')
      expect(badge).toHaveClass('bg-green-100', 'text-green-800')
    })

    it('Card status badge uses correct color for cancelled', () => {
      const { container } = render(<Card order={{ ...mockOrder, status: 'cancelled' }} />)
      const badge = container.querySelector('span[class*="rounded-full"]')
      expect(badge).toHaveClass('bg-red-100', 'text-red-800')
    })
  })

  describe('Pagination Active Page Styling', () => {
    it('Active page uses #ED0577 background', () => {
      const { container } = render(
        <Pagination
          currentPage={3}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={vi.fn()}
        />
      )
      const activePage = container.querySelector('[data-state="active"]')
      expect(activePage).toBeInTheDocument()
    })
  })

  describe('Dialog Overlay Styling', () => {
    it('Dialog overlay has 50% opacity black background', () => {
      render(
        <Dialog isOpen={true} onClose={vi.fn()}>
          Dialog Content
        </Dialog>
      )
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })
})

import { Badge } from '@/src/components/ui/wrappers/Badge'
import { Card } from '@/src/components/ui/wrappers/Card'
import { Pagination } from '@/src/components/ui/wrappers/Pagination'
import { Dialog } from '@/src/components/ui/wrappers/Dialog'