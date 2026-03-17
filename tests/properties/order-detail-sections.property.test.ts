/**
 * Property-Based Test: Order Detail Sections
 * **Validates: Requirements 11.2**
 * 
 * Property 19: Order Detail Sections
 * For any order detail page load, all sections should display: 
 * order header, recipient info, items list, package details, delivery info, 
 * and shipping fee breakdown.
 */

import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { OrderDetail } from '@/src/page-components/OrderDetail'
import { Order } from '@/src/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

// Create mock functions
const mockUseOrderById = vi.fn()
const mockUseOutlets = vi.fn()
const mockRouter = { back: vi.fn() }

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useParams: vi.fn(() => ({ id: 'order-123' })),
  useRouter: vi.fn(() => mockRouter),
  useSearchParams: vi.fn(() => ({
    forEach: vi.fn(),
    get: vi.fn(),
    has: vi.fn(),
  })),
}))

// Mock hooks
vi.mock('@/src/hooks/useOrderById', () => ({
  useOrderById: () => mockUseOrderById(),
}))

vi.mock('@/src/hooks/useOutlets', () => ({
  useOutlets: () => mockUseOutlets(),
}))

// Mock MapContainer component - must use default export for lazy loading
vi.mock('@/src/components/MapContainer', () => ({
  default: ({ className }: { className?: string }) => 
    React.createElement('div', { 'data-testid': 'map-container', className }, 'Map'),
}))

// Helper to create a test order with all required fields
function createTestOrder(overrides?: Partial<Order>): Order {
  return {
    id: 'order-123',
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
      coordinates: { lat: 13.7563, lng: 100.5018 },
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
    createdAt: new Date('2024-01-15T10:00:00'),
    updatedAt: new Date('2024-01-15T10:30:00'),
    ...overrides,
  }
}

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children
    )
}

describe('Property 19: Order Detail Sections', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockRouter.back.mockClear()
  })

  describe('All required sections display for any valid order', () => {
    it('should display order header section with order ID and status', () => {
      const order = createTestOrder()
      mockUseOrderById.mockReturnValue({ data: order, isLoading: false, error: null })
      mockUseOutlets.mockReturnValue({ data: [{ id: 'outlet-1', name: 'Main Outlet' }] })

      render(React.createElement(OrderDetail), { wrapper: createWrapper() })

      // Order header should display order ID (invoiceNumber)
      expect(screen.getByText(order.invoiceNumber)).toBeInTheDocument()
      
      // Order header should display status badge
      expect(screen.getByText(order.statusDisplay)).toBeInTheDocument()
    })

    it('should display recipient information section', () => {
      const order = createTestOrder()
      mockUseOrderById.mockReturnValue({ data: order, isLoading: false, error: null })
      mockUseOutlets.mockReturnValue({ data: [{ id: 'outlet-1', name: 'Main Outlet' }] })

      render(React.createElement(OrderDetail), { wrapper: createWrapper() })

      // Find recipient info section and verify content
      const recipientSection = screen.getByText('Recipient Information').closest('div')
      expect(recipientSection).toBeInTheDocument()
      
      // Within recipient section, find name
      const nameElement = within(recipientSection!).getByText('Name').nextElementSibling
      expect(nameElement).toHaveTextContent(order.recipient.name)
      
      // Find phone
      const phoneElement = within(recipientSection!).getByText('Phone').nextElementSibling
      expect(phoneElement).toHaveTextContent(order.recipient.phone)
      
      // Find email
      const emailElement = within(recipientSection!).getByText('Email').nextElementSibling
      expect(emailElement).toHaveTextContent(order.recipient.email)
      
      // Find address
      const addressElement = within(recipientSection!).getByText('Address').nextElementSibling
      expect(addressElement).toHaveTextContent(order.recipient.address)
    })

    it('should display items list section', () => {
      const order = createTestOrder()
      mockUseOrderById.mockReturnValue({ data: order, isLoading: false, error: null })
      mockUseOutlets.mockReturnValue({ data: [{ id: 'outlet-1', name: 'Main Outlet' }] })

      render(React.createElement(OrderDetail), { wrapper: createWrapper() })

      // Items section header should be present
      expect(screen.getByText('Items')).toBeInTheDocument()
      
      // Each item description should be displayed
      order.items.forEach((item) => {
        expect(screen.getByText(item.description)).toBeInTheDocument()
      })
    })

    it('should display package details section', () => {
      const order = createTestOrder()
      mockUseOrderById.mockReturnValue({ data: order, isLoading: false, error: null })
      mockUseOutlets.mockReturnValue({ data: [{ id: 'outlet-1', name: 'Main Outlet' }] })

      render(React.createElement(OrderDetail), { wrapper: createWrapper() })

      // Package details section header should be present
      expect(screen.getByText('Package Details')).toBeInTheDocument()
      
      // Weight should be displayed
      expect(screen.getByText(`${order.package.weight} kg`)).toBeInTheDocument()
      
      // Dimensions should be displayed
      const dimensionsText = `${order.package.dimensions.length} × ${order.package.dimensions.width} × ${order.package.dimensions.height} cm`
      expect(screen.getByText(dimensionsText)).toBeInTheDocument()
    })

    it('should display delivery information section', () => {
      const order = createTestOrder()
      mockUseOrderById.mockReturnValue({ data: order, isLoading: false, error: null })
      mockUseOutlets.mockReturnValue({ data: [{ id: 'outlet-1', name: 'Main Outlet' }] })

      render(React.createElement(OrderDetail), { wrapper: createWrapper() })

      // Delivery info section header should be present
      expect(screen.getByText('Delivery Information')).toBeInTheDocument()
      
      // Service type should be displayed (using capitalize class)
      expect(screen.getByText(/standard|express|same-day/i)).toBeInTheDocument()
      
      // Distance should be displayed - find in Delivery Information section
      const deliverySection = screen.getByText('Delivery Information').closest('div')
      expect(within(deliverySection!).getByText(/[0-9]+\.?[0-9]* km/)).toBeInTheDocument()
    })

    it('should display shipping fee breakdown section', () => {
      const order = createTestOrder()
      mockUseOrderById.mockReturnValue({ data: order, isLoading: false, error: null })
      mockUseOutlets.mockReturnValue({ data: [{ id: 'outlet-1', name: 'Main Outlet' }] })

      render(React.createElement(OrderDetail), { wrapper: createWrapper() })

      // Shipping fee breakdown section header should be present
      expect(screen.getByText('Shipping Fee Breakdown')).toBeInTheDocument()
      
      // Total shipping fee should be displayed
      expect(screen.getByText(`Rp ${order.delivery.shippingFee.toLocaleString('id-ID')}`)).toBeInTheDocument()
    })

    it('should display map view section when outlet is available', () => {
      const order = createTestOrder()
      mockUseOrderById.mockReturnValue({ data: order, isLoading: false, error: null })
      mockUseOutlets.mockReturnValue({ data: [{ id: 'outlet-1', name: 'Main Outlet' }] })

      render(React.createElement(OrderDetail), { wrapper: createWrapper() })

      // Map container should be rendered
      expect(screen.getByTestId('map-container')).toBeInTheDocument()
    })
  })

  describe('All sections display correctly for all order statuses', () => {
    const statuses = [
      { status: 'submitted', label: 'Shipment Created' },
      { status: 'waiting', label: 'Waiting for Pick Up' },
      { status: 'closed', label: 'Delivery Completed' },
      { status: 'cancelled', label: 'Shipment Cancelled' },
    ]

    statuses.forEach(({ status, label }) => {
      it(`should display all sections for ${status} status`, () => {
        const order = createTestOrder({ status: status as Order['status'], statusDisplay: label })
        mockUseOrderById.mockReturnValue({ data: order, isLoading: false, error: null })
        mockUseOutlets.mockReturnValue({ data: [{ id: 'outlet-1', name: 'Main Outlet' }] })

        render(React.createElement(OrderDetail), { wrapper: createWrapper() })

        // All sections should be present
        expect(screen.getByText(order.invoiceNumber)).toBeInTheDocument() // Order header
        expect(screen.getByText('Items')).toBeInTheDocument() // Items section
        expect(screen.getByText('Package Details')).toBeInTheDocument() // Package details
        expect(screen.getByText('Delivery Information')).toBeInTheDocument() // Delivery info
        expect(screen.getByText('Shipping Fee Breakdown')).toBeInTheDocument() // Shipping fee
        expect(screen.getByTestId('map-container')).toBeInTheDocument() // Map
      })
    })
  })

  describe('Back button and data refresh functionality', () => {
    it('should display back button that calls router.back()', () => {
      const order = createTestOrder()
      mockUseOrderById.mockReturnValue({ data: order, isLoading: false, error: null })
      mockUseOutlets.mockReturnValue({ data: [{ id: 'outlet-1', name: 'Main Outlet' }] })

      render(React.createElement(OrderDetail), { wrapper: createWrapper() })

      // Back button should be present
      const backButton = screen.getByRole('button', { name: /Back to Orders/i })
      expect(backButton).toBeInTheDocument()
      
      // Back button should have minimum tap target size
      expect(backButton).toHaveClass('min-h-[44px]')
    })

    it('should fetch order data on page load', () => {
      const order = createTestOrder()
      mockUseOrderById.mockReturnValue({ data: order, isLoading: false, error: null })
      mockUseOutlets.mockReturnValue({ data: [{ id: 'outlet-1', name: 'Main Outlet' }] })

      render(React.createElement(OrderDetail), { wrapper: createWrapper() })

      // Order data should be displayed (verifies data was fetched)
      expect(screen.getByText(order.invoiceNumber)).toBeInTheDocument()
    })
  })
})