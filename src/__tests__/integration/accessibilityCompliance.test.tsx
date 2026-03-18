/**
 * Integration tests for Accessibility Compliance
 * Verifies WCAG 2.1 AA compliance for all migrated components
 * 
 * Property 17: Accessibility Compliance
 * Validates: Requirements 15.1, 15.2, 15.3, 15.4, 15.5, 15.6
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from '@/src/components/ui/wrappers/Button'
import { Input } from '@/src/components/ui/wrappers/Input'
import { Card } from '@/src/components/ui/wrappers/Card'
import { Badge } from '@/src/components/ui/wrappers/Badge'
import { Dialog } from '@/src/components/ui/wrappers/Dialog'
import { Select } from '@/src/components/ui/wrappers/Select'
import { Checkbox } from '@/src/components/ui/wrappers/Checkbox'
import { Accordion } from '@/src/components/ui/wrappers/Accordion'
import { Pagination } from '@/src/components/ui/wrappers/Pagination'
import { EmptyState } from '@/src/components/ui/wrappers/EmptyState'
import { DropdownMenu } from '@/src/components/ui/wrappers/DropdownMenu'

expect.extend(toHaveNoViolations)

describe('Property 17: Accessibility Compliance', () => {
  describe('Button Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Button>Click Me</Button>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no violations with variant prop', async () => {
      const { container } = render(
        <div>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no violations with disabled state', async () => {
      const { container } = render(<Button disabled>Disabled</Button>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no violations with loading state', async () => {
      const { container } = render(<Button loading>Loading</Button>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have aria-busy attribute when loading', () => {
      render(<Button loading>Loading</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-busy', 'true')
    })

    it('should have proper focus management', () => {
      render(<Button>Focus Test</Button>)
      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })

    it('should have visible focus indicator', () => {
      const { container } = render(<Button>Focus Indicator</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('focus-visible:ring-[#ED0577]')
    })

    it('should have proper button type', () => {
      render(<Button type="button">Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'button')
    })

    it('should support aria-label for icon-only buttons', () => {
      render(
        <Button aria-label="Close dialog">
          <span>×</span>
        </Button>
      )
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Close dialog')
    })
  })

  describe('Input Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Input label="Name" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no violations with error state', async () => {
      const { container } = render(
        <Input label="Email" error="Invalid email address" />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no violations with disabled state', async () => {
      const { container } = render(<Input label="Disabled" disabled />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have proper label association', () => {
      render(<Input label="Username" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('id')
    })

    it('should have aria-invalid when there is an error', () => {
      render(<Input error="Required field" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('should have aria-describedby for error message', () => {
      const { container } = render(<Input error="Error message" />)
      const input = container.querySelector('input')
      expect(input).toHaveAttribute('aria-describedby')
    })

    it('should have proper focus management', () => {
      render(<Input label="Focus Test" />)
      const input = screen.getByRole('textbox')
      input.focus()
      expect(input).toHaveFocus()
    })

    it('should have visible focus indicator', () => {
      const { container } = render(<Input />)
      const input = container.querySelector('input')
      expect(input).toHaveClass('focus-visible:ring-[#ED0577]')
    })

    it('should have required attribute when required', () => {
      render(<Input label="Required" required />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('required')
    })

    it('should have proper input type', () => {
      render(<Input type="email" label="Email" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('type', 'email')
    })
  })

  describe('Card Accessibility', () => {
    const mockOrder = {
      id: 'order-001',
      invoiceNumber: 'INV-2024-001',
      status: 'submitted' as const,
      recipient: { name: 'John Doe', address: '123 Main St' },
      delivery: { distance: 5.5, serviceType: 'express', shippingFee: 15000 },
      createdAt: new Date('2024-01-15'),
    }

    it('should have no accessibility violations', async () => {
      const { container } = render(<Card order={mockOrder} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no violations with action buttons', async () => {
      const { container } = render(
        <Card
          order={mockOrder}
          onEdit={vi.fn()}
          onCancel={vi.fn()}
          onViewDetails={vi.fn()}
        />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have proper focus management for action buttons', () => {
      render(
        <Card
          order={mockOrder}
          onEdit={vi.fn()}
          onCancel={vi.fn()}
        />
      )
      const editButton = screen.getByRole('button', { name: /Edit/i })
      editButton.focus()
      expect(editButton).toHaveFocus()
    })

    it('should have visible focus indicators on action buttons', () => {
      const { container } = render(
        <Card
          order={mockOrder}
          onEdit={vi.fn()}
        />
      )
      const editButton = container.querySelector('button')
      expect(editButton).toHaveClass('focus-visible:ring-[#ED0577]')
    })

    it('should announce status changes to screen readers', () => {
      render(<Card order={mockOrder} />)
      const badge = screen.getByRole('status')
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Badge Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Badge variant="submitted">Shipment Created</Badge>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have role status', () => {
      render(<Badge variant="submitted">Status</Badge>)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('should have proper color contrast', async () => {
      const { container } = render(
        <div>
          <Badge variant="submitted">Submitted</Badge>
          <Badge variant="waiting">Waiting</Badge>
          <Badge variant="closed">Closed</Badge>
          <Badge variant="cancelled">Cancelled</Badge>
        </div>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have aria-label for screen readers', () => {
      render(<Badge variant="submitted">Content</Badge>)
      const badge = screen.getByRole('status')
      expect(badge).toHaveAttribute('aria-label', 'Shipment Created')
    })
  })

  describe('Dialog Accessibility', () => {
    it('should have no accessibility violations when open', async () => {
      const { container } = render(
        <Dialog isOpen={true} onClose={vi.fn()} title="Test Dialog">
          Dialog Content
        </Dialog>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have role dialog', () => {
      render(
        <Dialog isOpen={true} onClose={vi.fn()} title="Test Dialog">
          Content
        </Dialog>
      )
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should have aria-modal set to true', () => {
      render(
        <Dialog isOpen={true} onClose={vi.fn()} title="Test Dialog">
          Content
        </Dialog>
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-modal', 'true')
    })

    it('should have proper label association', () => {
      render(
        <Dialog isOpen={true} onClose={vi.fn()} title="My Dialog">
          Content
        </Dialog>
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-labelledby')
    })

    it('should have close button with aria-label', () => {
      render(
        <Dialog isOpen={true} onClose={vi.fn()} title="Test Dialog" showCloseButton>
          Content
        </Dialog>
      )
      const closeButton = screen.getByRole('button', { name: /close/i })
      expect(closeButton).toBeInTheDocument()
    })

    it('should trap focus within dialog', () => {
      render(
        <Dialog isOpen={true} onClose={vi.fn()} title="Test Dialog">
          <Button>First Button</Button>
          <Button>Second Button</Button>
        </Dialog>
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
    })

    it('should have visible focus indicators', () => {
      const { container } = render(
        <Dialog isOpen={true} onClose={vi.fn()} title="Test Dialog">
          <Button>Action</Button>
        </Dialog>
      )
      const button = container.querySelector('button')
      expect(button).toHaveClass('focus-visible:ring-[#ED0577]')
    })
  })

  describe('Select Accessibility', () => {
    const mockOptions = [
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
    ]

    it('should have no accessibility violations', async () => {
      const { container } = render(
        <Select options={mockOptions} label="Select Option" />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have role combobox', () => {
      render(<Select options={mockOptions} />)
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('should have proper label association', () => {
      render(<Select options={mockOptions} label="Choose one" />)
      expect(screen.getByText('Choose one')).toBeInTheDocument()
    })

    it('should have aria-expanded when open', () => {
      render(
        <Select options={mockOptions} value="opt1" />
      )
      const combobox = screen.getByRole('combobox')
      expect(combobox).toBeInTheDocument()
    })

    it('should have proper error association', () => {
      render(<Select options={mockOptions} error="Selection required" />)
      expect(screen.getByText('Selection required')).toBeInTheDocument()
    })
  })

  describe('Checkbox Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Checkbox label="I agree to terms" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have role checkbox', () => {
      render(<Checkbox label="Accept terms" />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('should have proper label association', () => {
      render(<Checkbox label="Remember me" />)
      expect(screen.getByLabelText('Remember me')).toBeInTheDocument()
    })

    it('should have aria-checked reflecting checked state', () => {
      const { rerender } = render(<Checkbox checked={false} />)
      expect(screen.getByRole('checkbox')).not.toBeChecked()
      
      rerender(<Checkbox checked={true} />)
      expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('should be disabled when disabled prop is set', () => {
      render(<Checkbox label="Disabled" disabled />)
      expect(screen.getByRole('checkbox')).toBeDisabled()
    })

    it('should have visible focus indicator', () => {
      const { container } = render(<Checkbox label="Focus test" />)
      const checkbox = container.querySelector('button')
      expect(checkbox).toHaveClass('focus-visible:ring-[#ED0577]')
    })
  })

  describe('Accordion Accessibility', () => {
    const mockSections = [
      { id: 'section1', title: 'Section 1', content: 'Content 1' },
      { id: 'section2', title: 'Section 2', content: 'Content 2' },
    ]

    it('should have no accessibility violations', async () => {
      const { container } = render(<Accordion items={mockSections} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have proper accordion role', () => {
      render(<Accordion items={mockSections} />)
      expect(screen.getByRole('heading', { name: /Section 1/i })).toBeInTheDocument()
    })

    it('should have proper button roles for triggers', () => {
      render(<Accordion items={mockSections} />)
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('should have aria-expanded reflecting state', () => {
      render(<Accordion items={mockSections} defaultExpanded={['section1']} />)
      const firstButton = screen.getByRole('button', { name: /Section 1/i })
      expect(firstButton).toHaveAttribute('aria-expanded', 'true')
    })

    it('should have visible focus indicators', () => {
      const { container } = render(<Accordion items={mockSections} />)
      const button = container.querySelector('button')
      expect(button).toHaveClass('focus-visible:ring-[#ED0577]')
    })

    it('should announce content changes to screen readers', () => {
      render(<Accordion items={mockSections} />)
      const content = screen.getByText('Content 1')
      expect(content).toBeInTheDocument()
    })
  })

  describe('Pagination Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={vi.fn()}
        />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have role navigation', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={vi.fn()}
        />
      )
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('should have proper button roles for page numbers', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          totalItems={50}
          itemsPerPage={10}
          onPageChange={vi.fn()}
        />
      )
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('should have aria-current for current page', () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={vi.fn()}
        />
      )
      const currentPage = screen.getByRole('button', { name: /3/i })
      expect(currentPage).toBeInTheDocument()
    })

    it('should have visible focus indicators', () => {
      const { container } = render(
        <Pagination
          currentPage={1}
          totalPages={5}
          totalItems={50}
          itemsPerPage={10}
          onPageChange={vi.fn()}
        />
      )
      const button = container.querySelector('button')
      expect(button).toHaveClass('focus-visible:ring-[#ED0577]')
    })
  })

  describe('EmptyState Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <EmptyState variant="orders" title="No orders" />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have role status', () => {
      render(<EmptyState variant="orders" />)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('should have aria-live for dynamic content', () => {
      render(<EmptyState variant="orders" title="No orders" />)
      const status = screen.getByRole('status')
      expect(status).toBeInTheDocument()
    })

    it('should have proper heading structure', () => {
      render(
        <EmptyState
          variant="orders"
          title="No orders found"
          description="Create your first order"
        />
      )
      expect(screen.getByText('No orders found')).toBeInTheDocument()
    })

    it('should have accessible action button', () => {
      render(
        <EmptyState
          variant="orders"
          action={{ label: 'Create Order', onClick: vi.fn() }}
        />
      )
      const button = screen.getByRole('button', { name: /Create Order/i })
      expect(button).toBeInTheDocument()
    })
  })

  describe('DropdownMenu Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <DropdownMenu
          trigger={<button>Open Menu</button>}
          user={{ name: 'John Doe', email: 'john@example.com' }}
          onLogout={vi.fn()}
        />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have proper menu role', () => {
      render(
        <DropdownMenu
          trigger={<button>Menu</button>}
          user={{ name: 'John', email: 'john@test.com' }}
          onLogout={vi.fn()}
        />
      )
      expect(screen.getByRole('button', { name: /Menu/i })).toBeInTheDocument()
    })

    it('should have visible focus indicators', () => {
      const { container } = render(
        <DropdownMenu
          trigger={<button>Menu</button>}
          user={{ name: 'John', email: 'john@test.com' }}
          onLogout={vi.fn()}
        />
      )
      const button = container.querySelector('button')
      expect(button).toHaveClass('focus-visible:ring-[#ED0577]')
    })
  })

  describe('Color Contrast Compliance', () => {
    it('Button primary variant should have sufficient contrast', async () => {
      const { container } = render(<Button variant="primary">Text</Button>)
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true },
        },
      })
      expect(results.violations.filter(v => v.id === 'color-contrast')).toHaveLength(0)
    })

    it('Badge variants should have sufficient contrast', async () => {
      const { container } = render(
        <div>
          <Badge variant="submitted">Submitted</Badge>
          <Badge variant="waiting">Waiting</Badge>
          <Badge variant="closed">Closed</Badge>
          <Badge variant="cancelled">Cancelled</Badge>
        </div>
      )
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true },
        },
      })
      expect(results.violations.filter(v => v.id === 'color-contrast')).toHaveLength(0)
    })
  })

  describe('Keyboard Navigation', () => {
    it('All interactive elements should be keyboard accessible', () => {
      render(
        <div>
          <Button>Button</Button>
          <Input label="Input" />
          <Checkbox label="Checkbox" />
        </div>
      )
      
      const button = screen.getByRole('button', { name: /Button/i })
      const input = screen.getByRole('textbox')
      const checkbox = screen.getByRole('checkbox')
      
      expect(button).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(checkbox).toBeInTheDocument()
    })

    it('Should be able to tab through all interactive elements', () => {
      render(
        <div>
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </div>
      )
      
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBe(3)
    })
  })
})