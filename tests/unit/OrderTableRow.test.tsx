/**
 * OrderTableRow Unit Tests
 * Tests for the table row component displaying order data
 * Implements Requirement 10.8
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { OrderTableRow } from '@/src/components/OrderTableRow'
import { Order } from '@/src/types'
import { useRouter } from 'next/navigation'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

describe('OrderTableRow', () => {
  const mockOrder: Order = {
    id: 'order-123',
    merchantId: 'merchant-1',
    outletId: 'outlet-1',
    status: 'submitted',
    statusDisplay: 'Shipment Created',
    invoiceNumber: 'INV-001',
    recipient: {
      name: 'John Doe',
      phone: '+62812345678',
      email: 'john@example.com',
      address: '123 Main Street, Jakarta',
      coordinates: { lat: -6.2088, lng: 106.8456 },
    },
    items: [
      { id: 'item-1', description: 'Package 1', quantity: 1 },
    ],
    package: {
      weight: 2.5,
      dimensions: { length: 30, width: 20, height: 15 },
      isFragile: false,
    },
    delivery: {
      serviceType: 'standard',
      distance: 2.5,
      shippingFee: 22500,
      baseFee: 10000,
      rate: 5000,
    },
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z'),
  }

  const mockRouterPush = vi.fn()

  beforeEach(() => {
    ;(useRouter as unknown as vi.Mock).mockReturnValue({ push: mockRouterPush })
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders order ID in table row', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      expect(screen.getByText('INV-001')).toBeInTheDocument()
    })

    it('renders status badge with correct label', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      expect(screen.getByText('Shipment Created')).toBeInTheDocument()
    })

    it('renders recipient name', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('renders recipient address', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      expect(screen.getByText('123 Main Street, Jakarta')).toBeInTheDocument()
    })

    it('renders distance with km unit', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      expect(screen.getByText('2.5 km')).toBeInTheDocument()
    })

    it('renders shipping fee in IDR format', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      expect(screen.getByText(/Rp\s22\.500,00/)).toBeInTheDocument()
    })

    it('renders formatted date', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument()
    })

    it('renders edit button', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      expect(screen.getByLabelText('Edit order')).toBeInTheDocument()
    })

    it('renders cancel button', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      expect(screen.getByLabelText('Cancel order')).toBeInTheDocument()
    })

    it('renders see detail button', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      expect(screen.getByLabelText('View order details')).toBeInTheDocument()
    })
  })

  describe('Status Badge Colors', () => {
    it('shows blue badge for submitted status', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      const badge = screen.getByText('Shipment Created').closest('span')
      expect(badge).toHaveClass('bg-status-submitted/20', 'text-status-submitted')
    })

    it('shows orange badge for waiting status', () => {
      const waitingOrder = { ...mockOrder, status: 'waiting', statusDisplay: 'Waiting for Pick Up' }
      render(<OrderTableRow order={waitingOrder} isOffline={false} />)
      const badge = screen.getByText('Waiting for Pick Up').closest('span')
      expect(badge).toHaveClass('bg-status-waiting/20', 'text-status-waiting')
    })

    it('shows green badge for closed status', () => {
      const closedOrder = { ...mockOrder, status: 'closed', statusDisplay: 'Delivery Completed' }
      render(<OrderTableRow order={closedOrder} isOffline={false} />)
      const badge = screen.getByText('Delivery Completed').closest('span')
      expect(badge).toHaveClass('bg-status-closed/20', 'text-status-closed')
    })

    it('shows red badge for cancelled status', () => {
      const cancelledOrder = { ...mockOrder, status: 'cancelled', statusDisplay: 'Shipment Cancelled' }
      render(<OrderTableRow order={cancelledOrder} isOffline={false} />)
      const badge = screen.getByText('Shipment Cancelled').closest('span')
      expect(badge).toHaveClass('bg-status-cancelled/20', 'text-status-cancelled')
    })
  })

  describe('Action Buttons', () => {
    it('navigates to edit page when edit button is clicked', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      fireEvent.click(screen.getByLabelText('Edit order'))
      expect(mockRouterPush).toHaveBeenCalledWith('/create-order?edit=order-123')
    })

    it('navigates to order detail when see detail button is clicked', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      fireEvent.click(screen.getByLabelText('View order details'))
      // Should preserve filter and sort state in URL (Requirement 10.12)
      expect(mockRouterPush).toHaveBeenCalledWith(expect.stringContaining('/orders/order-123'))
    })

    it('navigates to order detail when row is clicked', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      fireEvent.click(screen.getByRole('row'))
      // Should preserve filter and sort state in URL (Requirement 10.12)
      expect(mockRouterPush).toHaveBeenCalledWith(expect.stringContaining('/orders/order-123'))
    })

    it('disables edit button for non-submitted orders', () => {
      const waitingOrder = { ...mockOrder, status: 'waiting' }
      render(<OrderTableRow order={waitingOrder} isOffline={false} />)
      const editButton = screen.getByLabelText('Edit order')
      expect(editButton).toBeDisabled()
    })

    it('disables cancel button for non-submitted orders', () => {
      const closedOrder = { ...mockOrder, status: 'closed' }
      render(<OrderTableRow order={closedOrder} isOffline={false} />)
      const cancelButton = screen.getByLabelText('Cancel order')
      expect(cancelButton).toBeDisabled()
    })
  })

  describe('Accessibility', () => {
    it('has correct aria-labels on action buttons', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      expect(screen.getByLabelText('Edit order')).toBeInTheDocument()
      expect(screen.getByLabelText('Cancel order')).toBeInTheDocument()
      expect(screen.getByLabelText('View order details')).toBeInTheDocument()
    })

    it('has minimum tap target size for action buttons', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      const editButton = screen.getByLabelText('Edit order')
      // Minimum 44px tap target per WCAG guidelines (Requirement 4.4)
      expect(editButton).toHaveClass('min-w-[44px]', 'min-h-[44px]')
    })
  })

  describe('Styling', () => {
    it('applies hover effect on table row', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      const row = screen.getByRole('row')
      expect(row).toHaveClass('hover:bg-gray-50')
    })

    it('applies cursor pointer on table row', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      const row = screen.getByRole('row')
      expect(row).toHaveClass('cursor-pointer')
    })

    it('applies primary color to shipping fee', () => {
      render(<OrderTableRow order={mockOrder} isOffline={false} />)
      const feeElement = screen.getByText(/Rp\s22\.500,00/).closest('span')
      expect(feeElement).toHaveClass('text-[#ED0577]')
    })
  })
})