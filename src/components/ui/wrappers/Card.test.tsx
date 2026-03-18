/**
 * Unit tests for Card wrapper component
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Card, statusColors } from './Card'

describe('Card Component', () => {
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

  describe('Rendering', () => {
    it('renders order information correctly', () => {
      render(<Card order={mockOrder} />)
      expect(screen.getByText('INV-2024-001')).toBeInTheDocument()
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('123 Main St, Jakarta')).toBeInTheDocument()
    })

    it('renders status badge with correct label', () => {
      render(<Card order={mockOrder} />)
      expect(screen.getByText('Shipment Created')).toBeInTheDocument()
    })

    it('renders distance and service type', () => {
      render(<Card order={mockOrder} />)
      expect(screen.getByText('5.5 km')).toBeInTheDocument()
      expect(screen.getByText('express')).toBeInTheDocument()
    })

    it('renders shipping fee with currency formatting', () => {
      render(<Card order={mockOrder} />)
      expect(screen.getByText(/Rp/)).toBeInTheDocument()
    })

    it('renders created date', () => {
      render(<Card order={mockOrder} />)
      expect(screen.getByText(/Jan/)).toBeInTheDocument()
    })
  })

  describe('Status Badge Colors', () => {
    it('uses correct colors for submitted status', () => {
      const { container } = render(<Card order={mockOrder} />)
      const badge = container.querySelector('span[class*="rounded-full"]')
      expect(badge).toHaveClass('bg-blue-100', 'text-blue-800')
    })

    it('uses correct colors for waiting status', () => {
      const waitingOrder = { ...mockOrder, status: 'waiting' as const }
      const { container } = render(<Card order={waitingOrder} />)
      const badge = container.querySelector('span[class*="rounded-full"]')
      expect(badge).toHaveClass('bg-amber-100', 'text-amber-800')
    })

    it('uses correct colors for closed status', () => {
      const closedOrder = { ...mockOrder, status: 'closed' as const }
      const { container } = render(<Card order={closedOrder} />)
      const badge = container.querySelector('span[class*="rounded-full"]')
      expect(badge).toHaveClass('bg-green-100', 'text-green-800')
    })

    it('uses correct colors for cancelled status', () => {
      const cancelledOrder = { ...mockOrder, status: 'cancelled' as const }
      const { container } = render(<Card order={cancelledOrder} />)
      const badge = container.querySelector('span[class*="rounded-full"]')
      expect(badge).toHaveClass('bg-red-100', 'text-red-800')
    })
  })

  describe('Interactions', () => {
    it('calls onViewDetails when card is clicked', () => {
      const handleViewDetails = vi.fn()
      render(<Card order={mockOrder} onViewDetails={handleViewDetails} />)
      // Click on the card itself (the outer div with role button)
      const card = screen.getByLabelText(/Order INV-2024-001/)
      fireEvent.click(card)
      expect(handleViewDetails).toHaveBeenCalledWith('order-001')
    })

    it('calls onEdit when edit button is clicked', () => {
      const handleEdit = vi.fn()
      render(<Card order={mockOrder} onEdit={handleEdit} />)
      const editButton = screen.getByRole('button', { name: /Edit/i })
      fireEvent.click(editButton)
      expect(handleEdit).toHaveBeenCalledWith('order-001')
    })

    it('calls onCancel when cancel button is clicked', () => {
      const handleCancel = vi.fn()
      render(<Card order={mockOrder} onCancel={handleCancel} />)
      const cancelButton = screen.getByRole('button', { name: /Cancel/i })
      fireEvent.click(cancelButton)
      expect(handleCancel).toHaveBeenCalledWith('order-001')
    })
  })

  describe('Offline and Pending Sync Badges', () => {
    it('renders offline badge when isOffline is true', () => {
      render(<Card order={mockOrder} isOffline />)
      expect(screen.getByText('Offline')).toBeInTheDocument()
    })

    it('renders pending sync badge when isPendingSync is true', () => {
      render(<Card order={mockOrder} isPendingSync />)
      expect(screen.getByText('Pending Sync')).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('applies responsive padding classes', () => {
      const { container } = render(<Card order={mockOrder} />)
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('p-3', 'sm:p-4')
    })
  })
})