/**
 * Tests for OrderCard component
 * Tests: status badge colors, action buttons (edit, cancel, detail),
 * offline badge, pending sync badge, navigation
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { OrderCard } from '@/src/components/OrderCard'
import { useUpdateOrder } from '@/src/hooks/useUpdateOrder'
import { useFilters, useSort, useLayout, usePagination } from '@/src/hooks/useUIStore'
import { Order, OrderStatus } from '@/src/types'
import { useRouter } from 'next/navigation'

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

vi.mock('@/src/hooks/useUpdateOrder', () => ({
  useUpdateOrder: vi.fn(),
}))

vi.mock('@/src/hooks/useUIStore', () => ({
  useFilters: vi.fn(),
  useSort: vi.fn(),
  useLayout: vi.fn(),
  usePagination: vi.fn(),
}))

const mockPush = vi.fn()
const mockMutateAsync = vi.fn()

describe('OrderCard', () => {
  const mockOrder: Order = {
    id: 'order-123',
    merchantId: 'merchant-1',
    outletId: 'outlet-1',
    status: 'submitted' as OrderStatus,
    statusDisplay: 'Shipment Created',
    invoiceNumber: 'ORD-123456',
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
      weight: 1.5,
      dimensions: { length: 20, width: 15, height: 10 },
      isFragile: false,
    },
    delivery: {
      serviceType: 'standard',
      distance: 2.5,
      shippingFee: 22500,
      baseFee: 10000,
      rate: 5000,
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ push: mockPush })
    ;(useUpdateOrder as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ mutateAsync: mockMutateAsync })
    ;(useFilters as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      filters: {
        dateRange: { from: null, to: null },
        statuses: [],
        outletId: null,
        serviceTypes: [],
        invoiceNumber: '',
      },
    })
    ;(useSort as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      sort: { field: 'date', direction: 'desc' },
    })
    ;(useLayout as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ layout: 'card' })
    ;(usePagination as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ currentPage: 1 })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render order card with order information', () => {
      render(<OrderCard order={mockOrder} />)

      expect(screen.getByText('ORD-123456')).toBeTruthy()
      expect(screen.getByText('John Doe')).toBeTruthy()
      expect(screen.getByText('123 Main Street, Jakarta')).toBeTruthy()
    })

    it('should display distance', () => {
      render(<OrderCard order={mockOrder} />)

      expect(screen.getByText('2.5 km')).toBeTruthy()
    })

    it('should display shipping fee', () => {
      render(<OrderCard order={mockOrder} />)

      // Fee is formatted as Rp 22.500,00 (Indonesian format)
      expect(screen.getByText(/Rp.*22\.500/)).toBeTruthy()
    })

    it('should display service type', () => {
      render(<OrderCard order={mockOrder} />)

      expect(screen.getByText('standard')).toBeTruthy()
    })

    it('should display creation date', () => {
      render(<OrderCard order={mockOrder} />)

      expect(screen.getByText('Jan 15, 2024')).toBeTruthy()
    })
  })

  describe('Status Badge Colors', () => {
    it('should show correct badge for submitted status', () => {
      render(<OrderCard order={mockOrder} />)

      const badge = screen.getByText('Shipment Created')
      expect(badge.closest('span')?.className).toContain('bg-status-submitted')
      expect(badge.closest('span')?.className).toContain('text-status-submitted')
    })

    it('should show correct badge for waiting status', () => {
      const waitingOrder = { ...mockOrder, status: 'waiting' as OrderStatus, statusDisplay: 'Waiting for Pick Up' }
      render(<OrderCard order={waitingOrder} />)

      const badge = screen.getByText('Waiting for Pick Up')
      expect(badge.closest('span')?.className).toContain('bg-status-waiting')
      expect(badge.closest('span')?.className).toContain('text-status-waiting')
    })

    it('should show correct badge for closed status', () => {
      const closedOrder = { ...mockOrder, status: 'closed' as OrderStatus, statusDisplay: 'Delivery Completed' }
      render(<OrderCard order={closedOrder} />)

      const badge = screen.getByText('Delivery Completed')
      expect(badge.closest('span')?.className).toContain('bg-status-closed')
      expect(badge.closest('span')?.className).toContain('text-status-closed')
    })

    it('should show correct badge for cancelled status', () => {
      const cancelledOrder = { ...mockOrder, status: 'cancelled' as OrderStatus, statusDisplay: 'Shipment Cancelled' }
      render(<OrderCard order={cancelledOrder} />)

      const badge = screen.getByText('Shipment Cancelled')
      expect(badge.closest('span')?.className).toContain('bg-status-cancelled')
      expect(badge.closest('span')?.className).toContain('text-status-cancelled')
    })
  })

  describe('Offline Badge', () => {
    it('should show offline badge when isOffline is true', () => {
      render(<OrderCard order={mockOrder} isOffline={true} />)

      expect(screen.getByText('Offline')).toBeTruthy()
    })

    it('should not show offline badge when isOffline is false', () => {
      render(<OrderCard order={mockOrder} isOffline={false} />)

      expect(screen.queryByText('Offline')).toBeNull()
    })

    it('should not show offline badge by default', () => {
      render(<OrderCard order={mockOrder} />)

      expect(screen.queryByText('Offline')).toBeNull()
    })
  })

  describe('Pending Sync Badge', () => {
    it('should show pending sync badge when isPendingSync is true', () => {
      render(<OrderCard order={mockOrder} isPendingSync={true} />)

      expect(screen.getByText('Pending Sync')).toBeTruthy()
    })

    it('should not show pending sync badge when isPendingSync is false', () => {
      render(<OrderCard order={mockOrder} isPendingSync={false} />)

      expect(screen.queryByText('Pending Sync')).toBeNull()
    })

    it('should not show pending sync badge by default', () => {
      render(<OrderCard order={mockOrder} />)

      expect(screen.queryByText('Pending Sync')).toBeNull()
    })
  })

  describe('Action Buttons', () => {
    it('should show action buttons on hover', async () => {
      render(<OrderCard order={mockOrder} />)

      // Initially action buttons should be hidden (opacity-0)
      const actionContainer = screen.getByRole('group', { name: 'Order actions' })
      expect(actionContainer.className).toContain('opacity-0')

      // Hover over the card
      fireEvent.mouseEnter(screen.getByRole('button', { name: /Order.*Status:/ }))

      await waitFor(() => {
        expect(actionContainer.className).toContain('opacity-100')
      })
    })

    it('should show Edit button for submitted orders', async () => {
      render(<OrderCard order={mockOrder} />)

      fireEvent.mouseEnter(screen.getByRole('button', { name: /Order.*Status:/ }))

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Edit order' })).toBeTruthy()
      })
    })

    it('should disable Edit button for non-submitted orders', async () => {
      const closedOrder = { ...mockOrder, status: 'closed' as OrderStatus }
      render(<OrderCard order={closedOrder} />)

      fireEvent.mouseEnter(screen.getByRole('button', { name: /Order.*Status:/ }))

      await waitFor(() => {
        const editButton = screen.getByRole('button', { name: 'Edit order - disabled for non-pending orders' })
        expect(editButton).toBeDisabled()
      })
    })

    it('should show Cancel button for cancellable orders', async () => {
      render(<OrderCard order={mockOrder} />)

      fireEvent.mouseEnter(screen.getByRole('button', { name: /Order.*Status:/ }))

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Cancel order' })).toBeTruthy()
      })
    })

    it('should disable Cancel button for non-cancellable orders', async () => {
      const closedOrder = { ...mockOrder, status: 'closed' as OrderStatus }
      render(<OrderCard order={closedOrder} />)

      fireEvent.mouseEnter(screen.getByRole('button', { name: /Order.*Status:/ }))

      await waitFor(() => {
        const cancelButton = screen.getByRole('button', { name: 'Cancel order - disabled for non-pending orders' })
        expect(cancelButton).toBeDisabled()
      })
    })

    it('should show Detail button', async () => {
      render(<OrderCard order={mockOrder} />)

      fireEvent.mouseEnter(screen.getByRole('button', { name: /Order.*Status:/ }))

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'View order details' })).toBeTruthy()
      })
    })
  })

  describe('Navigation', () => {
    it('should navigate to order detail when card is clicked', () => {
      render(<OrderCard order={mockOrder} />)

      const card = screen.getByRole('button', { name: /Order.*Status:/ })
      fireEvent.click(card)

      expect(mockPush).toHaveBeenCalledWith('/orders/order-123?page=1&sortField=date&sortDir=desc&layout=card')
    })

    it('should navigate to edit page when Edit button is clicked', async () => {
      render(<OrderCard order={mockOrder} />)

      fireEvent.mouseEnter(screen.getByRole('button', { name: /Order.*Status:/ }))

      await waitFor(() => {
        const editButton = screen.getByRole('button', { name: 'Edit order' })
        fireEvent.click(editButton)
      })

      expect(mockPush).toHaveBeenCalledWith('/create-order?edit=order-123')
    })

    it('should open cancel dialog when Cancel button is clicked', async () => {
      render(<OrderCard order={mockOrder} />)

      fireEvent.mouseEnter(screen.getByRole('button', { name: /Order.*Status:/ }))

      await waitFor(() => {
        const cancelButton = screen.getByRole('button', { name: 'Cancel order' })
        fireEvent.click(cancelButton)
      })

      expect(screen.getByRole('dialog', { name: 'Cancel Order?' })).toBeTruthy()
    })

    it('should navigate to detail page when Detail button is clicked', async () => {
      render(<OrderCard order={mockOrder} />)

      fireEvent.mouseEnter(screen.getByRole('button', { name: /Order.*Status:/ }))

      await waitFor(() => {
        const detailButton = screen.getByRole('button', { name: 'View order details' })
        fireEvent.click(detailButton)
      })

      expect(mockPush).toHaveBeenCalledWith('/orders/order-123?page=1&sortField=date&sortDir=desc&layout=card')
    })
  })

  describe('Cancel Order Dialog', () => {
    it('should display order details in cancel dialog', async () => {
      render(<OrderCard order={mockOrder} />)

      fireEvent.mouseEnter(screen.getByRole('button', { name: /Order.*Status:/ }))

      await waitFor(() => {
        const cancelButton = screen.getByRole('button', { name: 'Cancel order' })
        fireEvent.click(cancelButton)
      })

      // Use more specific selectors to avoid matching multiple elements
      const dialog = screen.getByRole('dialog', { name: 'Cancel Order?' })
      expect(dialog.textContent).toContain('ORD-123456')
      expect(dialog.textContent).toContain('John Doe')
    })

    it('should call updateOrder when cancel is confirmed', async () => {
      mockMutateAsync.mockResolvedValue(undefined)

      render(<OrderCard order={mockOrder} />)

      fireEvent.mouseEnter(screen.getByRole('button', { name: /Order.*Status:/ }))

      await waitFor(() => {
        const cancelButton = screen.getByRole('button', { name: 'Cancel order' })
        fireEvent.click(cancelButton)
      })

      const confirmButton = screen.getByRole('button', { name: 'Cancel Order' })
      fireEvent.click(confirmButton)

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledWith({
          id: 'order-123',
          updates: {
            status: 'cancelled',
            statusDisplay: 'Shipment Cancelled',
          },
        })
      })
    })

    it('should close dialog when Keep Order is clicked', async () => {
      render(<OrderCard order={mockOrder} />)

      fireEvent.mouseEnter(screen.getByRole('button', { name: /Order.*Status:/ }))

      await waitFor(() => {
        const cancelButton = screen.getByRole('button', { name: 'Cancel order' })
        fireEvent.click(cancelButton)
      })

      expect(screen.getByRole('dialog', { name: 'Cancel Order?' })).toBeTruthy()

      const keepButton = screen.getByRole('button', { name: 'Keep Order' })
      fireEvent.click(keepButton)

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).toBeNull()
      })
    })
  })

  describe('Keyboard Navigation', () => {
    it('should be focusable with keyboard', () => {
      render(<OrderCard order={mockOrder} />)

      const card = screen.getByRole('button', { name: /Order.*Status:/ })
      expect(card).toHaveAttribute('tabIndex')
    })

    it('should navigate to detail on Enter key', () => {
      render(<OrderCard order={mockOrder} />)

      const card = screen.getByRole('button', { name: /Order.*Status:/ })
      fireEvent.keyDown(card, { key: 'Enter' })

      expect(mockPush).toHaveBeenCalled()
    })

    it('should navigate to detail on Space key', () => {
      render(<OrderCard order={mockOrder} />)

      const card = screen.getByRole('button', { name: /Order.*Status:/ })
      fireEvent.keyDown(card, { key: ' ' })

      expect(mockPush).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA label', () => {
      render(<OrderCard order={mockOrder} />)

      const card = screen.getByRole('button', { name: /Order.*Status:/ })
      expect(card).toHaveAttribute('aria-label')
    })

    it('should have role button', () => {
      render(<OrderCard order={mockOrder} />)

      const card = screen.getByRole('button', { name: /Order.*Status:/ })
      expect(card).toHaveAttribute('role', 'button')
    })
  })
})