/**
 * Unit tests for Dialog wrapper component
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Dialog, ConfirmationDialog } from './Dialog'

describe('Dialog Component', () => {
  describe('Rendering', () => {
    it('renders dialog when isOpen is true', () => {
      render(
        <Dialog isOpen={true} onClose={() => {}}>
          <p>Dialog content</p>
        </Dialog>
      )
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('does not render dialog when isOpen is false', () => {
      render(
        <Dialog isOpen={false} onClose={() => {}}>
          <p>Dialog content</p>
        </Dialog>
      )
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('renders title when provided', () => {
      render(
        <Dialog isOpen={true} onClose={() => {}} title="Test Title">
          <p>Dialog content</p>
        </Dialog>
      )
      expect(screen.getByText('Test Title')).toBeInTheDocument()
    })

    it('renders description when provided', () => {
      render(
        <Dialog isOpen={true} onClose={() => {}} description="Test description">
          <p>Dialog content</p>
        </Dialog>
      )
      expect(screen.getByText('Test description')).toBeInTheDocument()
    })

    it('renders children content', () => {
      render(
        <Dialog isOpen={true} onClose={() => {}}>
          <p>Test content</p>
        </Dialog>
      )
      expect(screen.getByText('Test content')).toBeInTheDocument()
    })
  })

  describe('Close Behavior', () => {
    it('calls onClose when dialog closes', () => {
      const handleClose = vi.fn()
      render(
        <Dialog isOpen={true} onClose={handleClose}>
          <p>Content</p>
        </Dialog>
      )
      
      // Click the Cancel button in the footer
      const cancelButton = screen.getByText('Cancel')
      fireEvent.click(cancelButton)
      
      expect(handleClose).toHaveBeenCalled()
    })

    it('renders close button by default', () => {
      render(
        <Dialog isOpen={true} onClose={() => {}}>
          <p>Content</p>
        </Dialog>
      )
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
    })

    it('hides close button when showCloseButton is false', () => {
      render(
        <Dialog isOpen={true} onClose={() => {}} showCloseButton={false}>
          <p>Content</p>
        </Dialog>
      )
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has dialog role', () => {
      render(
        <Dialog isOpen={true} onClose={() => {}}>
          <p>Content</p>
        </Dialog>
      )
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('has proper heading structure', () => {
      render(
        <Dialog isOpen={true} onClose={() => {}} title="Dialog Title">
          <p>Content</p>
        </Dialog>
      )
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Dialog Title')
    })
  })
})

describe('ConfirmationDialog Component', () => {
  describe('Rendering', () => {
    it('renders confirmation dialog', () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          onClose={() => {}}
          onConfirm={() => {}}
          title="Confirm Action"
        />
      )
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText('Confirm Action')).toBeInTheDocument()
    })

    it('renders invoice number when provided', () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          onClose={() => {}}
          onConfirm={() => {}}
          title="Cancel Order"
          invoiceNumber="INV-001"
        />
      )
      expect(screen.getByText('Invoice Number:')).toBeInTheDocument()
      expect(screen.getByText('INV-001')).toBeInTheDocument()
    })

    it('renders recipient name when provided', () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          onClose={() => {}}
          onConfirm={() => {}}
          title="Cancel Order"
          recipientName="John Doe"
        />
      )
      expect(screen.getByText('Recipient:')).toBeInTheDocument()
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('renders confirm and cancel buttons', () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          onClose={() => {}}
          onConfirm={() => {}}
          title="Confirm"
        />
      )
      // Check that Cancel and Confirm buttons exist
      const buttons = screen.getAllByRole('button')
      const buttonTexts = buttons.map(b => b.textContent)
      expect(buttonTexts).toContain('Cancel')
      expect(buttonTexts).toContain('Confirm')
    })

    it('uses custom button text when provided', () => {
      render(
        <ConfirmationDialog
          isOpen={true}
          onClose={() => {}}
          onConfirm={() => {}}
          title="Confirm"
          confirmText="Yes, Delete"
          cancelText="No, Keep"
        />
      )
      expect(screen.getByText('No, Keep')).toBeInTheDocument()
      expect(screen.getByText('Yes, Delete')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls onConfirm when confirm button is clicked', () => {
      const handleConfirm = vi.fn()
      render(
        <ConfirmationDialog
          isOpen={true}
          onClose={() => {}}
          onConfirm={handleConfirm}
          title="Confirm"
        />
      )
      // Use querySelector to find the Confirm button in the custom footer
      const confirmButton = document.querySelector('button') as HTMLButtonElement
      // Find the button that has "Confirm" text and is not the dialog close button
      const allButtons = document.querySelectorAll('button')
      const confirmBtn = Array.from(allButtons).find(b => b.textContent === 'Confirm')
      if (confirmBtn) {
        fireEvent.click(confirmBtn)
      }
      expect(handleConfirm).toHaveBeenCalled()
    })

    it('calls onClose when cancel button is clicked', () => {
      const handleClose = vi.fn()
      render(
        <ConfirmationDialog
          isOpen={true}
          onClose={handleClose}
          onConfirm={() => {}}
          title="Confirm"
        />
      )
      const allButtons = document.querySelectorAll('button')
      const cancelBtn = Array.from(allButtons).find(b => b.textContent === 'Cancel')
      if (cancelBtn) {
        fireEvent.click(cancelBtn)
      }
      expect(handleClose).toHaveBeenCalled()
    })
  })
})