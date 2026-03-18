/**
 * Integration tests for Wrapper API Compatibility
 * Tests that wrapper components maintain backward compatibility with existing APIs
 * 
 * Property 15: Wrapper API Compatibility
 * Validates: Requirements 13.1, 13.2, 13.3
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
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

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  })

const renderWithQueryClient = (component: React.ReactNode) => {
  const queryClient = createQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  )
}

describe('Property 15: Wrapper API Compatibility', () => {
  describe('Button Wrapper API', () => {
    it('accepts same props as original component', () => {
      const handleClick = vi.fn()
      render(
        <Button
          variant="primary"
          size="default"
          disabled={false}
          loading={false}
          iconPosition="leading"
          onClick={handleClick}
          type="button"
          className="custom-class"
        >
          Click Me
        </Button>
      )
      
      const button = screen.getByRole('button', { name: /Click Me/i })
      expect(button).toBeInTheDocument()
      expect(button).not.toBeDisabled()
    })

    it('passes all variant options correctly', () => {
      const variants = ['primary', 'secondary', 'ghost', 'danger'] as const
      
      variants.forEach(variant => {
        const { unmount } = render(<Button variant={variant}>Test</Button>)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        unmount()
      })
    })

    it('passes all size options correctly', () => {
      const sizes = ['sm', 'default', 'lg'] as const
      
      sizes.forEach(size => {
        const { unmount } = render(<Button size={size}>Test</Button>)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        unmount()
      })
    })

    it('handles icon props correctly', () => {
      const mockIcon = <span data-testid="icon">★</span>
      render(
        <Button icon={mockIcon} iconPosition="leading">
          With Icon
        </Button>
      )
      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    it('maintains onClick callback behavior', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click Me</Button>)
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('maintains disabled state behavior', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick} disabled>Disabled</Button>)
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('maintains loading state behavior', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick} loading>Loading</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-busy', 'true')
    })
  })

  describe('Input Wrapper API', () => {
    it('accepts same props as original component', () => {
      const handleChange = vi.fn()
      const handleBlur = vi.fn()
      
      render(
        <Input
          type="text"
          label="Name"
          placeholder="Enter name"
          value="test"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={false}
          readonly={false}
          required={true}
          name="name"
          error=""
          className="custom-class"
        />
      )
      
      expect(screen.getByLabelText('Name')).toBeInTheDocument()
    })

    it('passes all input types correctly', () => {
      const types = ['text', 'number', 'date', 'email', 'search'] as const
      
      types.forEach(type => {
        const { unmount } = render(<Input type={type} />)
        const input = screen.getByRole('textbox')
        expect(input).toBeInTheDocument()
        unmount()
      })
    })

    it('maintains label association', () => {
      render(<Input label="Email" type="email" />)
      expect(screen.getByLabelText('Email')).toBeInTheDocument()
    })

    it('maintains error state and message display', () => {
      render(<Input error="This field is required" />)
      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })

    it('maintains disabled and readonly states', () => {
      const { rerender } = render(<Input disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
      
      rerender(<Input readonly />)
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
    })

    it('maintains onChange callback behavior', () => {
      const handleChange = vi.fn()
      render(<Input onChange={handleChange} />)
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } })
      expect(handleChange).toHaveBeenCalled()
    })

    it('maintains aria-describedby for accessibility', () => {
      const { container } = render(<Input error="Error message" />)
      const input = container.querySelector('input')
      expect(input).toHaveAttribute('aria-describedby')
    })
  })

  describe('Card Wrapper API', () => {
    const mockOrder = {
      id: 'order-001',
      invoiceNumber: 'INV-2024-001',
      status: 'submitted' as const,
      recipient: {
        name: 'John Doe',
        address: '123 Main St, Jakarta',
      },
      delivery: {
        distance: 5.5,
        serviceType: 'express',
        shippingFee: 15000,
      },
      createdAt: new Date('2024-01-15'),
    }

    it('accepts same props as original component', () => {
      render(
        <Card
          order={mockOrder}
          onEdit={vi.fn()}
          onCancel={vi.fn()}
          onViewDetails={vi.fn()}
          className="custom-class"
        />
      )
      
      expect(screen.getByText('INV-2024-001')).toBeInTheDocument()
    })

    it('maintains order data rendering', () => {
      render(<Card order={mockOrder} />)
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('123 Main St, Jakarta')).toBeInTheDocument()
    })

    it('maintains callback behavior', () => {
      const handleEdit = vi.fn()
      const handleCancel = vi.fn()
      const handleViewDetails = vi.fn()
      
      render(
        <Card
          order={mockOrder}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onViewDetails={handleViewDetails}
        />
      )
      
      fireEvent.click(screen.getByRole('button', { name: /Edit/i }))
      expect(handleEdit).toHaveBeenCalledWith('order-001')
    })

    it('maintains status badge rendering', () => {
      render(<Card order={mockOrder} />)
      expect(screen.getByText('Shipment Created')).toBeInTheDocument()
    })

    it('maintains offline and pending sync badges', () => {
      const { rerender } = render(<Card order={mockOrder} />)
      expect(screen.queryByText('Offline')).not.toBeInTheDocument()
      
      rerender(<Card order={mockOrder} isOffline />)
      expect(screen.getByText('Offline')).toBeInTheDocument()
    })
  })

  describe('Badge Wrapper API', () => {
    it('accepts same props as original component', () => {
      render(
        <Badge
          variant="submitted"
          className="custom-class"
        >
          Badge Content
        </Badge>
      )
      
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('passes all variant options correctly', () => {
      const variants = ['submitted', 'waiting', 'closed', 'cancelled', 'default'] as const
      
      variants.forEach(variant => {
        const { unmount } = render(<Badge variant={variant}>Test</Badge>)
        const badge = screen.getByRole('status')
        expect(badge).toBeInTheDocument()
        unmount()
      })
    })

    it('maintains children rendering', () => {
      render(<Badge>Custom Content</Badge>)
      expect(screen.getByText('Custom Content')).toBeInTheDocument()
    })
  })

  describe('Dialog Wrapper API', () => {
    it('accepts same props as original component', () => {
      render(
        <Dialog
          isOpen={true}
          onClose={vi.fn()}
          title="Test Dialog"
          description="Dialog description"
          size="md"
          showCloseButton={true}
        >
          Dialog Content
        </Dialog>
      )
      
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText('Test Dialog')).toBeInTheDocument()
    })

    it('maintains open/close behavior', () => {
      const handleClose = vi.fn()
      const { rerender } = render(
        <Dialog isOpen={false} onClose={handleClose}>
          Content
        </Dialog>
      )
      
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      
      rerender(
        <Dialog isOpen={true} onClose={handleClose}>
          Content
        </Dialog>
      )
      
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('maintains size variants', () => {
      const sizes = ['sm', 'md', 'lg', 'xl'] as const
      
      sizes.forEach(size => {
        const { unmount, rerender } = render(
          <Dialog isOpen={true} onClose={vi.fn()} size={size}>
            Test
          </Dialog>,
          { container: document.body }
        )
        expect(screen.getByRole('dialog')).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Select Wrapper API', () => {
    const mockOptions = [
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
      { value: 'opt3', label: 'Option 3' },
    ]

    it('accepts same props as original component', () => {
      render(
        <Select
          options={mockOptions}
          value="opt1"
          onChange={vi.fn()}
          placeholder="Select option"
          label="Test Select"
          error=""
          disabled={false}
          multiple={false}
          name="test-select"
          className="custom-class"
        />
      )
      
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('maintains single select behavior', () => {
      const handleChange = vi.fn()
      render(
        <Select
          options={mockOptions}
          value="opt1"
          onChange={handleChange}
          placeholder="Select option"
        />
      )
      
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('maintains multi-select behavior', () => {
      const handleChange = vi.fn()
      render(
        <Select
          options={mockOptions}
          value={['opt1', 'opt2']}
          onChange={handleChange}
          placeholder="Select options"
          multiple={true}
        />
      )
      
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('maintains label association', () => {
      render(<Select options={mockOptions} label="Test Label" />)
      expect(screen.getByText('Test Label')).toBeInTheDocument()
    })

    it('maintains error state display', () => {
      render(<Select options={mockOptions} error="Selection required" />)
      expect(screen.getByText('Selection required')).toBeInTheDocument()
    })
  })

  describe('Checkbox Wrapper API', () => {
    it('accepts same props as original component', () => {
      render(
        <Checkbox
          checked={true}
          onChange={vi.fn()}
          label="I agree"
          disabled={false}
          name="agree"
          id="agree"
          className="custom-class"
        />
      )
      
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('maintains checked state', () => {
      const { rerender } = render(<Checkbox checked={false} />)
      expect(screen.getByRole('checkbox')).not.toBeChecked()
      
      rerender(<Checkbox checked={true} />)
      expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('maintains label association', () => {
      render(<Checkbox label="Accept terms" />)
      expect(screen.getByLabelText('Accept terms')).toBeInTheDocument()
    })

    it('maintains disabled state', () => {
      render(<Checkbox disabled />)
      expect(screen.getByRole('checkbox')).toBeDisabled()
    })

    it('maintains onChange callback behavior', () => {
      const handleChange = vi.fn()
      render(<Checkbox onChange={handleChange} />)
      fireEvent.click(screen.getByRole('checkbox'))
      expect(handleChange).toHaveBeenCalled()
    })
  })

  describe('Accordion Wrapper API', () => {
    const mockSections = [
      { id: 'section1', title: 'Section 1', content: 'Content 1' },
      { id: 'section2', title: 'Section 2', content: 'Content 2' },
      { id: 'section3', title: 'Section 3', content: 'Content 3' },
    ]

    it('accepts same props as original component', () => {
      render(
        <Accordion
          items={mockSections}
          defaultExpanded={['section1']}
          onToggle={vi.fn()}
          type="single"
          className="custom-class"
        />
      )
      
      expect(screen.getByText('Section 1')).toBeInTheDocument()
    })

    it('maintains single expansion mode', () => {
      const handleToggle = vi.fn()
      render(
        <Accordion
          items={mockSections}
          defaultExpanded={[]}
          onToggle={handleToggle}
          type="single"
        />
      )
      
      expect(screen.getByText('Section 1')).toBeInTheDocument()
    })

    it('maintains multiple expansion mode', () => {
      render(
        <Accordion
          items={mockSections}
          defaultExpanded={['section1', 'section2']}
          type="multiple"
        />
      )
      
      expect(screen.getByText('Section 1')).toBeInTheDocument()
    })

    it('maintains toggle callback', () => {
      const handleToggle = vi.fn()
      render(
        <Accordion
          items={mockSections}
          onToggle={handleToggle}
        />
      )
      
      fireEvent.click(screen.getByRole('button', { name: /Section 1/i }))
      expect(handleToggle).toHaveBeenCalledWith('section1')
    })

    it('maintains validation indicators', () => {
      const sectionsWithErrors = [
        { ...mockSections[0], error: true },
        { ...mockSections[1], completed: true },
      ]
      
      render(<Accordion items={sectionsWithErrors} />)
      expect(screen.getByRole('button', { name: /Section 1/i })).toBeInTheDocument()
    })
  })

  describe('Pagination Wrapper API', () => {
    it('accepts same props as original component', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={vi.fn()}
          showItemsPerPage={true}
          className="custom-class"
        />
      )
      
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('maintains page navigation', () => {
      const handlePageChange = vi.fn()
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={handlePageChange}
        />
      )
      
      expect(screen.getByRole('button', { name: /1/i })).toBeInTheDocument()
    })

    it('maintains showing info text', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={vi.fn()}
        />
      )
      
      expect(screen.getByText(/Showing/i)).toBeInTheDocument()
    })

    it('maintains active page styling', () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={vi.fn()}
        />
      )
      
      expect(screen.getByRole('button', { name: /3/i })).toBeInTheDocument()
    })
  })

  describe('EmptyState Wrapper API', () => {
    it('accepts same props as original component', () => {
      render(
        <EmptyState
          variant="orders"
          title="No orders"
          description="Create your first order"
          action={{ label: 'Create Order', onClick: vi.fn() }}
          className="custom-class"
        />
      )
      
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('passes all variant options correctly', () => {
      const variants = ['orders', 'outlets', 'search', 'offline', 'error'] as const
      
      variants.forEach(variant => {
        const { unmount } = render(<EmptyState variant={variant} />)
        const emptyState = screen.getByRole('status')
        expect(emptyState).toBeInTheDocument()
        unmount()
      })
    })

    it('maintains action button functionality', () => {
      const handleAction = vi.fn()
      render(
        <EmptyState
          variant="orders"
          action={{ label: 'Create Order', onClick: handleAction }}
        />
      )
      
      fireEvent.click(screen.getByRole('button', { name: /Create Order/i }))
      expect(handleAction).toHaveBeenCalled()
    })

    it('maintains custom title and description', () => {
      render(
        <EmptyState
          variant="orders"
          title="Custom Title"
          description="Custom description text"
        />
      )
      
      expect(screen.getByText('Custom Title')).toBeInTheDocument()
      expect(screen.getByText('Custom description text')).toBeInTheDocument()
    })
  })

  describe('DropdownMenu Wrapper API', () => {
    it('accepts same props as original component', () => {
      render(
        <DropdownMenu
          trigger={<button>Open Menu</button>}
          user={{ name: 'John Doe', email: 'john@example.com' }}
          onLogout={vi.fn()}
          className="custom-class"
        />
      )
      
      expect(screen.getByRole('button', { name: /Open Menu/i })).toBeInTheDocument()
    })

    it('maintains user info display', () => {
      render(
        <DropdownMenu
          trigger={<button>Menu</button>}
          user={{ name: 'John Doe', email: 'john@example.com' }}
          onLogout={vi.fn()}
        />
      )
      
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('john@example.com')).toBeInTheDocument()
    })

    it('maintains logout functionality', () => {
      const handleLogout = vi.fn()
      render(
        <DropdownMenu
          trigger={<button>Menu</button>}
          user={{ name: 'John Doe', email: 'john@example.com' }}
          onLogout={handleLogout}
        />
      )
      
      expect(screen.getByRole('button', { name: /Menu/i })).toBeInTheDocument()
    })
  })
})

describe('Wrapper API Rendered Output Structure', () => {
  it('Button renders correct HTML structure', () => {
    render(<Button>Test Button</Button>)
    const button = screen.getByRole('button')
    expect(button.tagName).toBe('BUTTON')
    expect(button).toHaveTextContent('Test Button')
  })

  it('Input renders correct HTML structure', () => {
    render(<Input label="Name" />)
    const input = screen.getByRole('textbox')
    expect(input.tagName).toBe('INPUT')
  })

  it('Badge renders correct HTML structure', () => {
    render(<Badge variant="submitted">Status</Badge>)
    const badge = screen.getByRole('status')
    expect(badge.tagName).toBe('SPAN')
  })

  it('Card renders correct HTML structure', () => {
    const mockOrder = {
      id: 'order-001',
      invoiceNumber: 'INV-2024-001',
      status: 'submitted' as const,
      recipient: { name: 'John', address: 'Address' },
      delivery: { distance: 1, serviceType: 'standard', shippingFee: 10000 },
      createdAt: new Date(),
    }
    render(<Card order={mockOrder} />)
    expect(screen.getByText('INV-2024-001')).toBeInTheDocument()
  })
})
