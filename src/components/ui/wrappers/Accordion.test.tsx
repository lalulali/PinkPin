/**
 * Unit tests for Accordion wrapper component
 * Requirements: 8.1, 8.2, 8.3, 8.4, 8.5
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Accordion, AccordionSection } from './Accordion'

describe('Accordion Component', () => {
  const mockSections: AccordionSection[] = [
    {
      id: 'outlet',
      title: 'Outlet Selection',
      content: <div data-testid="outlet-content">Outlet selection form</div>,
    },
    {
      id: 'recipient',
      title: 'Recipient Information',
      content: <div data-testid="recipient-content">Recipient form</div>,
      isValid: true,
    },
    {
      id: 'items',
      title: 'Items',
      content: <div data-testid="items-content">Items form</div>,
      hasErrors: true,
    },
    {
      id: 'delivery',
      title: 'Delivery Information',
      content: <div data-testid="delivery-content">Delivery form</div>,
    },
  ]

  describe('Rendering', () => {
    it('renders all section titles', () => {
      render(<Accordion sections={mockSections} />)

      expect(screen.getByText('Outlet Selection')).toBeInTheDocument()
      expect(screen.getByText('Recipient Information')).toBeInTheDocument()
      expect(screen.getByText('Items')).toBeInTheDocument()
      expect(screen.getByText('Delivery Information')).toBeInTheDocument()
    })

    it('renders section content when open', () => {
      render(<Accordion sections={mockSections} />)

      // Click to open first section
      const outletHeader = screen.getByText('Outlet Selection').closest('button')
      fireEvent.click(outletHeader!)
      expect(screen.getByText('Outlet selection form')).toBeInTheDocument()
    })

    it('hides section content when closed', () => {
      render(<Accordion sections={mockSections} />)

      // First section is closed by default
      expect(screen.queryByText('Recipient form')).not.toBeInTheDocument()
    })

    it('renders validation indicators', () => {
      render(<Accordion sections={mockSections} />)

      // Recipient section has isValid: true - should show green dot
      const recipientHeader = screen.getByText('Recipient Information').closest('button')
      expect(recipientHeader?.innerHTML).toContain('bg-green-500')

      // Items section has hasErrors: true - should show red dot
      const itemsHeader = screen.getByText('Items').closest('button')
      expect(itemsHeader?.innerHTML).toContain('bg-red-500')
    })

    it('does not render validation indicator when isValid is undefined and no errors', () => {
      render(<Accordion sections={mockSections} />)

      const outletHeader = screen.getByText('Outlet Selection').closest('button')
      const validationIndicator = outletHeader?.querySelector('span.w-2.h-2.rounded-full')
      expect(validationIndicator).not.toBeInTheDocument()
    })
  })

  describe('Section Toggling', () => {
    it('opens a section when clicked', () => {
      render(<Accordion sections={mockSections} />)

      // Click on second section header
      const recipientHeader = screen.getByText('Recipient Information').closest('button')
      fireEvent.click(recipientHeader!)

      expect(screen.getByTestId('recipient-content')).toBeInTheDocument()
    })

    it('closes a section when already open (single mode)', () => {
      render(<Accordion sections={mockSections} type="single" />)

      // Click to open first section
      const outletHeader = screen.getByText('Outlet Selection').closest('button')
      fireEvent.click(outletHeader!)
      expect(screen.getByTestId('outlet-content')).toBeInTheDocument()

      // Click again to close
      fireEvent.click(outletHeader!)
      expect(screen.queryByTestId('outlet-content')).not.toBeInTheDocument()
    })

    it('toggles between sections', () => {
      render(<Accordion sections={mockSections} />)

      // Click on first section to open it
      const outletHeader = screen.getByText('Outlet Selection').closest('button')
      fireEvent.click(outletHeader!)
      expect(screen.getByTestId('outlet-content')).toBeInTheDocument()

      // Click on second section
      const recipientHeader = screen.getByText('Recipient Information').closest('button')
      fireEvent.click(recipientHeader!)

      // Second section should be open
      expect(screen.getByTestId('recipient-content')).toBeInTheDocument()

      // First section should be closed
      expect(screen.queryByTestId('outlet-content')).not.toBeInTheDocument()
    })

    it('has only one section open at a time in single mode', () => {
      render(<Accordion sections={mockSections} type="single" />)

      // Open first section
      const outletHeader = screen.getByText('Outlet Selection').closest('button')
      fireEvent.click(outletHeader!)
      expect(screen.getByTestId('outlet-content')).toBeInTheDocument()

      // Open second section
      const recipientHeader = screen.getByText('Recipient Information').closest('button')
      fireEvent.click(recipientHeader!)

      // Open third section
      const itemsHeader = screen.getByText('Items').closest('button')
      fireEvent.click(itemsHeader!)

      // Only third section should be open
      expect(screen.getByTestId('items-content')).toBeInTheDocument()
      expect(screen.queryByTestId('outlet-content')).not.toBeInTheDocument()
      expect(screen.queryByTestId('recipient-content')).not.toBeInTheDocument()
      expect(screen.queryByTestId('delivery-content')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper region label', () => {
      render(<Accordion sections={mockSections} />)

      const region = screen.getByRole('region', { name: 'Order form sections' })
      expect(region).toBeInTheDocument()
    })

    it('has validation indicator with aria-label for errors', () => {
      render(<Accordion sections={mockSections} />)

      const errorIndicator = screen.getByLabelText('Section has errors')
      expect(errorIndicator).toBeInTheDocument()
    })

    it('has validation indicator with aria-label for completion', () => {
      render(<Accordion sections={mockSections} />)

      const completeIndicator = screen.getByLabelText('Section complete')
      expect(completeIndicator).toBeInTheDocument()
    })

    it('has focus indicators', () => {
      render(<Accordion sections={mockSections} />)

      const outletButton = screen.getByRole('button', { name: 'Outlet Selection' })
      expect(outletButton.className).toContain('focus-visible:ring')
    })
  })

  describe('onToggle Callback', () => {
    it('calls onToggle when section is toggled', () => {
      const handleToggle = vi.fn()
      render(<Accordion sections={mockSections} onToggle={handleToggle} />)

      const recipientHeader = screen.getByText('Recipient Information').closest('button')
      fireEvent.click(recipientHeader!)

      expect(handleToggle).toHaveBeenCalled()
    })
  })

  describe('Empty Sections', () => {
    it('handles empty sections array', () => {
      render(<Accordion sections={[]} />)

      const region = screen.queryByRole('region', { name: 'Order form sections' })
      expect(region).toBeInTheDocument()
    })

    it('handles single section', () => {
      const singleSection: AccordionSection[] = [
        {
          id: 'single',
          title: 'Single Section',
          content: <div data-testid="single-content">Content</div>,
        },
      ]

      render(<Accordion sections={singleSection} />)

      expect(screen.getByText('Single Section')).toBeInTheDocument()
      
      // Click to open
      const header = screen.getByText('Single Section').closest('button')
      fireEvent.click(header!)
      expect(screen.getByTestId('single-content')).toBeInTheDocument()
    })
  })

  describe('Class Names', () => {
    it('applies custom className', () => {
      render(<Accordion sections={mockSections} className="custom-class" />)

      const container = screen.getByRole('region', { name: 'Order form sections' })
      expect(container.className).toContain('custom-class')
    })

    it('has responsive spacing classes', () => {
      render(<Accordion sections={mockSections} />)

      const container = screen.getByRole('region', { name: 'Order form sections' })
      expect(container.className).toContain('space-y-2')
      expect(container.className).toContain('sm:space-y-3')
    })
  })
})