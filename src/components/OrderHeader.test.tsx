/**
 * OrderHeader Component Tests
 * Tests for Requirements 11.1, 11.4 and Property 13: Status Badge Colors
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OrderHeader } from './OrderHeader'
import { Order } from '@/src/types'
import fc from 'fast-check'

// Helper to create a test order
function createTestOrder(overrides?: Partial<Order>): Order {
  return {
    id: '1',
    merchantId: 'merchant-1',
    outletId: 'outlet-1',
    status: 'submitted',
    statusDisplay: 'Shipment Created',
    invoiceNumber: 'INV-001',
    recipient: {
      name: 'John Doe',
      phone: '+1234567890',
      email: 'john@example.com',
      address: '123 Main St',
      coordinates: { lat: 0, lng: 0 },
    },
    items: [],
    package: {
      weight: 1,
      dimensions: { length: 10, width: 10, height: 10 },
      isFragile: false,
    },
    delivery: {
      serviceType: 'standard',
      distance: 1,
      shippingFee: 15000,
      baseFee: 10000,
      rate: 5000,
    },
    createdAt: new Date('2024-01-15T10:00:00'),
    updatedAt: new Date('2024-01-15T10:30:00'),
    ...overrides,
  }
}

describe('OrderHeader Component', () => {
  describe('Requirement 11.1: Display order header with ID, status, creation date', () => {
    test('should display order ID', () => {
      const order = createTestOrder({ invoiceNumber: 'INV-12345' })
      render(<OrderHeader order={order} />)
      expect(screen.getByText('INV-12345')).toBeInTheDocument()
    })

    test('should display creation date', () => {
      const order = createTestOrder({ createdAt: new Date('2024-01-15T10:00:00') })
      render(<OrderHeader order={order} />)
      expect(screen.getByText(/Created: Jan 15, 2024 10:00/)).toBeInTheDocument()
    })

    test('should display updated date', () => {
      const order = createTestOrder({ updatedAt: new Date('2024-01-15T14:30:00') })
      render(<OrderHeader order={order} />)
      expect(screen.getByText(/Updated: Jan 15, 2024 14:30/)).toBeInTheDocument()
    })
  })

  describe('Requirement 11.4: Status badge with color coding', () => {
    test('should display blue badge for submitted status', () => {
      const order = createTestOrder({ status: 'submitted', statusDisplay: 'Shipment Created' })
      render(<OrderHeader order={order} />)
      const badge = screen.getByText('Shipment Created')
      expect(badge).toHaveClass('bg-status-submitted/20', 'text-status-submitted')
    })

    test('should display orange badge for waiting status', () => {
      const order = createTestOrder({ status: 'waiting', statusDisplay: 'Waiting for Pick Up' })
      render(<OrderHeader order={order} />)
      const badge = screen.getByText('Waiting for Pick Up')
      expect(badge).toHaveClass('bg-status-waiting/20', 'text-status-waiting')
    })

    test('should display green badge for closed status', () => {
      const order = createTestOrder({ status: 'closed', statusDisplay: 'Delivery Completed' })
      render(<OrderHeader order={order} />)
      const badge = screen.getByText('Delivery Completed')
      expect(badge).toHaveClass('bg-status-closed/20', 'text-status-closed')
    })

    test('should display red badge for cancelled status', () => {
      const order = createTestOrder({ status: 'cancelled', statusDisplay: 'Shipment Cancelled' })
      render(<OrderHeader order={order} />)
      const badge = screen.getByText('Shipment Cancelled')
      expect(badge).toHaveClass('bg-status-cancelled/20', 'text-status-cancelled')
    })
  })

  describe('Property 13: Status Badge Colors', () => {
    it(
      'should display correct status badge color for any valid order status',
      () => {
        fc.assert(
          fc.property(
            fc.oneof(
              fc.constant({ status: 'submitted' as const, label: 'Shipment Created', bg: 'bg-status-submitted/20', text: 'text-status-submitted' }),
              fc.constant({ status: 'waiting' as const, label: 'Waiting for Pick Up', bg: 'bg-status-waiting/20', text: 'text-status-waiting' }),
              fc.constant({ status: 'closed' as const, label: 'Delivery Completed', bg: 'bg-status-closed/20', text: 'text-status-closed' }),
              fc.constant({ status: 'cancelled' as const, label: 'Shipment Cancelled', bg: 'bg-status-cancelled/20', text: 'text-status-cancelled' }),
            ),
            (statusConfig) => {
              const order = createTestOrder({
                status: statusConfig.status,
                statusDisplay: statusConfig.label as any,
              })
              const { unmount } = render(<OrderHeader order={order} />)
              const badge = screen.getByText(statusConfig.label)
              expect(badge).toHaveClass(statusConfig.bg, statusConfig.text)
              unmount()
            },
          ),
        )
      },
    )
  })

  describe('Accessibility', () => {
    test('should have minimum tap target size for status badge', () => {
      const order = createTestOrder()
      render(<OrderHeader order={order} />)
      const badge = screen.getByText('Shipment Created')
      expect(badge).toHaveClass('min-h-[44px]', 'flex', 'items-center')
    })

    test('should have proper heading hierarchy', () => {
      const order = createTestOrder()
      render(<OrderHeader order={order} />)
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('INV-001')
    })
  })
})
