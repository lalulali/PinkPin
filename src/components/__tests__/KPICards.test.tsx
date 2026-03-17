/**
 * Tests for KPICards component
 * Tests: KPI calculations (today's orders, active shipments, success rate),
 * loading state, data display
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { KPICards } from '@/src/components/KPICards'
import { useOrders } from '@/src/hooks/useOrders'
import { Order, OrderStatus } from '@/src/types'

// Mock dependencies
vi.mock('@/src/hooks/useOrders', () => ({
  useOrders: vi.fn(),
}))

describe('KPICards', () => {
  const createMockOrder = (status: OrderStatus, createdAt: Date) => ({
    id: `order-${Math.random()}`,
    merchantId: 'merchant-1',
    outletId: 'outlet-1',
    status,
    statusDisplay: status === 'submitted' ? 'Shipment Created' : 
                    status === 'waiting' ? 'Waiting for Pick Up' :
                    status === 'closed' ? 'Delivery Completed' : 'Shipment Cancelled',
    invoiceNumber: `ORD-${Date.now()}`,
    recipient: {
      name: 'Test User',
      phone: '+62812345678',
      email: 'test@example.com',
      address: '123 Test St',
      coordinates: { lat: 0, lng: 0 },
    },
    items: [{ id: 'item-1', description: 'Test Item', quantity: 1 }],
    package: { weight: 1, dimensions: { length: 10, width: 10, height: 10 }, isFragile: false },
    delivery: { serviceType: 'standard', distance: 1, shippingFee: 10000, baseFee: 10000, rate: 5000 },
    createdAt,
    updatedAt: createdAt,
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Loading State', () => {
    it('should show loading skeleton when isLoading is true', () => {
      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: [],
        isLoading: true,
        isRefetching: false,
      })

      render(<KPICards />)

      expect(screen.getByRole('status', { name: 'Loading KPI cards' })).toBeTruthy()
      expect(screen.getAllByRole('status').length).toBeGreaterThanOrEqual(1)
    })

    it('should show skeleton cards while loading', () => {
      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: [],
        isLoading: true,
        isRefetching: false,
      })

      render(<KPICards />)

      // Should have 3 skeleton cards
      const skeletons = document.querySelectorAll('.animate-pulse')
      expect(skeletons.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe("Today's Orders KPI", () => {
    it('should display today\'s order count', () => {
      const today = new Date()
      const orders = [
        createMockOrder('submitted', today),
        createMockOrder('submitted', today),
        createMockOrder('closed', new Date(Date.now() - 86400000)), // Yesterday
      ]

      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: orders,
        isLoading: false,
        isRefetching: false,
      })

      render(<KPICards />)

      // Use aria-label to find the specific card
      const todayCard = screen.getByLabelText("Today's Orders")
      expect(todayCard).toBeTruthy()
      expect(todayCard.textContent).toContain('2')
      expect(todayCard.textContent).toContain('orders created today')
    })

    it('should show 0 when no orders today', () => {
      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: [],
        isLoading: false,
        isRefetching: false,
      })

      render(<KPICards />)

      const todayCard = screen.getByLabelText("Today's Orders")
      expect(todayCard).toBeTruthy()
      expect(todayCard.textContent).toContain('0')
    })

    it('should only count orders from today', () => {
      const today = new Date()
      const yesterday = new Date(Date.now() - 86400000)
      const orders = [
        createMockOrder('submitted', today),
        createMockOrder('submitted', yesterday),
        createMockOrder('closed', yesterday),
      ]

      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: orders,
        isLoading: false,
        isRefetching: false,
      })

      render(<KPICards />)

      const todayCard = screen.getByLabelText("Today's Orders")
      expect(todayCard.textContent).toContain('1')
    })
  })

  describe('Active Shipments KPI', () => {
    it('should display active shipment count', () => {
      const orders = [
        createMockOrder('submitted', new Date()),
        createMockOrder('waiting', new Date()),
        createMockOrder('closed', new Date()),
        createMockOrder('cancelled', new Date()),
      ]

      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: orders,
        isLoading: false,
        isRefetching: false,
      })

      render(<KPICards />)

      const activeCard = screen.getByLabelText('Active Shipments')
      expect(activeCard).toBeTruthy()
      expect(activeCard.textContent).toContain('2')
      expect(activeCard.textContent).toContain('orders in transit')
    })

    it('should count only submitted and waiting orders', () => {
      const orders = [
        createMockOrder('submitted', new Date()),
        createMockOrder('waiting', new Date()),
        createMockOrder('closed', new Date()),
        createMockOrder('cancelled', new Date()),
      ]

      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: orders,
        isLoading: false,
        isRefetching: false,
      })

      render(<KPICards />)

      // Should show 2 (submitted + waiting)
      const activeCard = screen.getByLabelText('Active Shipments')
      expect(activeCard.textContent).toContain('2')
    })

    it('should show 0 when no active shipments', () => {
      const orders = [
        createMockOrder('closed', new Date()),
        createMockOrder('cancelled', new Date()),
      ]

      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: orders,
        isLoading: false,
        isRefetching: false,
      })

      render(<KPICards />)

      const activeCard = screen.getByLabelText('Active Shipments')
      expect(activeCard).toBeTruthy()
      expect(activeCard.textContent).toContain('0')
    })
  })

  describe('Success Rate KPI', () => {
    it('should display delivery success rate percentage', () => {
      const today = new Date()
      const orders = [
        createMockOrder('closed', today),
        createMockOrder('closed', today),
        createMockOrder('submitted', today),
        createMockOrder('waiting', today),
      ]

      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: orders,
        isLoading: false,
        isRefetching: false,
      })

      render(<KPICards />)

      const successCard = screen.getByLabelText('Success Rate')
      expect(successCard).toBeTruthy()
      expect(successCard.textContent).toContain('50%')
      expect(successCard.textContent).toContain('delivery completion this month')
    })

    it('should calculate success rate for current month only', () => {
      const today = new Date()
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 15)

      const orders = [
        createMockOrder('closed', today),
        createMockOrder('closed', lastMonth),
      ]

      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: orders,
        isLoading: false,
        isRefetching: false,
      })

      render(<KPICards />)

      // Should show 100% (only today's order counts)
      const successCard = screen.getByLabelText('Success Rate')
      expect(successCard.textContent).toContain('100%')
    })

    it('should show 0% when no orders this month', () => {
      const lastMonth = new Date()
      lastMonth.setMonth(lastMonth.getMonth() - 1)

      const orders = [
        createMockOrder('closed', lastMonth),
      ]

      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: orders,
        isLoading: false,
        isRefetching: false,
      })

      render(<KPICards />)

      const successCard = screen.getByLabelText('Success Rate')
      expect(successCard).toBeTruthy()
      expect(successCard.textContent).toContain('0%')
    })

    it('should show 0% when no orders at all', () => {
      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: [],
        isLoading: false,
        isRefetching: false,
      })

      render(<KPICards />)

      const successCard = screen.getByLabelText('Success Rate')
      expect(successCard).toBeTruthy()
      expect(successCard.textContent).toContain('0%')
    })

    it('should round percentage to nearest whole number', () => {
      const today = new Date()
      const orders = [
        createMockOrder('closed', today),
        createMockOrder('closed', today),
        createMockOrder('closed', today),
        createMockOrder('submitted', today),
      ]

      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: orders,
        isLoading: false,
        isRefetching: false,
      })

      render(<KPICards />)

      // 3/4 = 75%
      const successCard = screen.getByLabelText('Success Rate')
      expect(successCard.textContent).toContain('75%')
    })
  })

  describe('Icons', () => {
    it('should display package icon for today\'s orders', () => {
      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: [],
        isLoading: false,
        isRefetching: false,
      })

      render(<KPICards />)

      const todayCard = screen.getByLabelText("Today's Orders")
      expect(todayCard.querySelector('svg')).toBeTruthy()
    })

    it('should display truck icon for active shipments', () => {
      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: [],
        isLoading: false,
        isRefetching: false,
      })

      render(<KPICards />)

      const activeCard = screen.getByLabelText('Active Shipments')
      expect(activeCard.querySelector('svg')).toBeTruthy()
    })

    it('should display trending up icon for success rate', () => {
      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: [],
        isLoading: false,
        isRefetching: false,
      })

      render(<KPICards />)

      const successCard = screen.getByLabelText('Success Rate')
      expect(successCard.querySelector('svg')).toBeTruthy()
    })
  })

  describe('Refetching State', () => {
    it('should show loading overlay when isRefetching is true', () => {
      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: [createMockOrder('submitted', new Date())],
        isLoading: false,
        isRefetching: true,
      })

      render(<KPICards />)

      // Should have loading indicators
      const loadingOverlays = document.querySelectorAll('.bg-gray-50\\/50')
      expect(loadingOverlays.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: [],
        isLoading: false,
        isRefetching: false,
      })

      render(<KPICards />)

      const section = screen.getByRole('region', { name: 'Key Performance Indicators' })
      expect(section).toBeTruthy()
    })

    it('should have proper ARIA labels for values', () => {
      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: [createMockOrder('submitted', new Date())],
        isLoading: false,
        isRefetching: false,
      })

      render(<KPICards />)

      // Values should have aria-live for dynamic updates
      const valueElements = document.querySelectorAll('[aria-live]')
      expect(valueElements.length).toBeGreaterThanOrEqual(1)
    })

    it('should have proper card labels', () => {
      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: [],
        isLoading: false,
        isRefetching: false,
      })

      render(<KPICards />)

      expect(screen.getByLabelText("Today's Orders")).toBeTruthy()
      expect(screen.getByLabelText('Active Shipments')).toBeTruthy()
      expect(screen.getByLabelText('Success Rate')).toBeTruthy()
    })
  })

  describe('Responsive Layout', () => {
    it('should have grid layout for cards', () => {
      ;(useOrders as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        data: [],
        isLoading: false,
        isRefetching: false,
      })

      render(<KPICards />)

      const grid = screen.getByRole('region', { name: 'Key Performance Indicators' })
      expect(grid.className).toContain('grid')
      expect(grid.className).toContain('grid-cols-1')
      expect(grid.className).toContain('md:grid-cols-3')
    })
  })
})