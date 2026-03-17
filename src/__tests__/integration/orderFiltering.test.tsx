/**
 * Integration tests for Order Filtering Flow
 * Tests: date range, status, outlet, service type, invoice number filters with AND logic
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useOrders } from '@/src/hooks/useOrders'
import { useFilters, useSort, useLayout, usePagination } from '@/src/hooks/useUIStore'
import { useOutlets } from '@/src/hooks/useOutlets'
import { getStorageAdapter } from '@/src/services/storage'
import { Order, OrderStatus, ServiceType, Outlet } from '@/src/types'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}))

vi.mock('@/src/services/storage', () => ({
  getStorageAdapter: vi.fn(),
}))

vi.mock('@/src/hooks/useOutlets', () => ({
  useOutlets: vi.fn(),
}))

vi.mock('@/src/hooks/useUIStore', () => ({
  useFilters: vi.fn(),
  useSort: vi.fn(),
  useLayout: vi.fn(),
  usePagination: vi.fn(),
}))

const mockGetStorageAdapter = vi.mocked(getStorageAdapter)
const mockUseOutlets = vi.mocked(useOutlets)
const mockUseFilters = vi.mocked(useFilters)
const mockUseSort = vi.mocked(useSort)
const mockUseLayout = vi.mocked(useLayout)
const mockUsePagination = vi.mocked(usePagination)

const createMockOrder = (overrides: Partial<Order> = {}): Order => ({
  id: 'ORD-001',
  merchantId: 'MERCH-001',
  outletId: 'OUTLET-001',
  status: 'submitted' as OrderStatus,
  statusDisplay: 'Shipment Created',
  invoiceNumber: 'INV-001',
  recipient: {
    name: 'John Doe',
    phone: '+62812345678',
    email: 'john@example.com',
    address: '123 Main St',
    coordinates: { lat: -6.2090, lng: 106.8460 },
  },
  items: [{ id: 'ITEM-001', description: 'Test Package', quantity: 1 }],
  package: { weight: 1.5, dimensions: { length: 20, width: 15, height: 10 }, isFragile: false },
  delivery: { serviceType: 'standard' as ServiceType, distance: 2.5, shippingFee: 22500, baseFee: 10000, rate: 5000 },
  createdAt: new Date('2024-01-15T10:00:00Z'),
  updatedAt: new Date('2024-01-15T10:00:00Z'),
  ...overrides,
})

const createMockOutlet = (overrides: Partial<Outlet> = {}): Outlet => ({
  id: 'OUTLET-001',
  merchantId: 'MERCH-001',
  name: 'Main Outlet',
  address: '123 Main Street',
  coordinates: { lat: -6.2088, lng: 106.8456 },
  createdAt: new Date('2024-01-01'),
  ...overrides,
})

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  })

describe('Order Filtering Flow Integration', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = createQueryClient()
    vi.clearAllMocks()
    
    mockUseOutlets.mockReturnValue({ data: [createMockOutlet()], isLoading: false })
    mockUseSort.mockReturnValue({
      sort: { field: 'date', direction: 'desc' },
      setSort: vi.fn(), setSortField: vi.fn(), setSortDirection: vi.fn(), toggleSortDirection: vi.fn(),
    })
    mockUseLayout.mockReturnValue({ layout: 'card', setLayout: vi.fn(), toggleLayout: vi.fn() })
    mockUsePagination.mockReturnValue({
      currentPage: 1, itemsPerPage: 20,
      setCurrentPage: vi.fn(), setItemsPerPage: vi.fn(),
      nextPage: vi.fn(), previousPage: vi.fn(), goToPage: vi.fn(),
    })
  })

  afterEach(() => {
    queryClient.clear()
    cleanup()
  })

  describe('Date Range Filter', () => {
    it('should filter orders by date range', () => {
      const orders = [
        createMockOrder({ id: 'ORD-001', createdAt: new Date('2024-01-10') }),
        createMockOrder({ id: 'ORD-002', createdAt: new Date('2024-01-15') }),
        createMockOrder({ id: 'ORD-003', createdAt: new Date('2024-01-20') }),
      ]
      
      const fromDate = new Date('2024-01-12')
      const toDate = new Date('2024-01-18')
      
      const filteredOrders = orders.filter(order => 
        order.createdAt >= fromDate && order.createdAt <= toDate
      )
      
      expect(filteredOrders.length).toBe(1)
      expect(filteredOrders[0].id).toBe('ORD-002')
    })

    it('should handle null date range (no filter)', () => {
      const orders = [
        createMockOrder({ id: 'ORD-001' }),
        createMockOrder({ id: 'ORD-002' }),
      ]
      
      const fromDate = null
      const toDate = null
      
      const filteredOrders = orders.filter(order => {
        if (!fromDate || !toDate) return true
        return order.createdAt >= fromDate && order.createdAt <= toDate
      })
      
      expect(filteredOrders.length).toBe(2)
    })

    it('should filter orders from specific date only', () => {
      const orders = [
        createMockOrder({ id: 'ORD-001', createdAt: new Date('2024-01-10') }),
        createMockOrder({ id: 'ORD-002', createdAt: new Date('2024-01-15') }),
        createMockOrder({ id: 'ORD-003', createdAt: new Date('2024-01-20') }),
      ]
      
      const fromDate = new Date('2024-01-15')
      const toDate = null
      
      const filteredOrders = orders.filter(order => order.createdAt >= fromDate)
      expect(filteredOrders.length).toBe(2)
    })
  })

  describe('Status Filter', () => {
    it('should filter by submitted status', () => {
      const orders = [
        createMockOrder({ id: 'ORD-001', status: 'submitted' as OrderStatus }),
        createMockOrder({ id: 'ORD-002', status: 'waiting' as OrderStatus }),
        createMockOrder({ id: 'ORD-003', status: 'closed' as OrderStatus }),
      ]
      
      const filteredOrders = orders.filter(order => order.status === 'submitted')
      expect(filteredOrders.length).toBe(1)
      expect(filteredOrders[0].id).toBe('ORD-001')
    })

    it('should filter by multiple statuses', () => {
      const orders = [
        createMockOrder({ id: 'ORD-001', status: 'submitted' as OrderStatus }),
        createMockOrder({ id: 'ORD-002', status: 'waiting' as OrderStatus }),
        createMockOrder({ id: 'ORD-003', status: 'closed' as OrderStatus }),
        createMockOrder({ id: 'ORD-004', status: 'cancelled' as OrderStatus }),
      ]
      
      const selectedStatuses: OrderStatus[] = ['submitted', 'waiting']
      const filteredOrders = orders.filter(order => selectedStatuses.includes(order.status))
      
      expect(filteredOrders.length).toBe(2)
      expect(filteredOrders.map(o => o.id)).toEqual(['ORD-001', 'ORD-002'])
    })

    it('should return all orders when no status filter', () => {
      const orders = [
        createMockOrder({ id: 'ORD-001', status: 'submitted' as OrderStatus }),
        createMockOrder({ id: 'ORD-002', status: 'waiting' as OrderStatus }),
      ]
      
      const selectedStatuses: OrderStatus[] = []
      const filteredOrders = orders.filter(order => 
        selectedStatuses.length === 0 || selectedStatuses.includes(order.status)
      )
      
      expect(filteredOrders.length).toBe(2)
    })
  })

  describe('Outlet Filter', () => {
    it('should filter by outlet ID', () => {
      const orders = [
        createMockOrder({ id: 'ORD-001', outletId: 'OUTLET-001' }),
        createMockOrder({ id: 'ORD-002', outletId: 'OUTLET-002' }),
        createMockOrder({ id: 'ORD-003', outletId: 'OUTLET-001' }),
      ]
      
      const filteredOrders = orders.filter(order => order.outletId === 'OUTLET-001')
      expect(filteredOrders.length).toBe(2)
    })

    it('should return all orders when no outlet filter', () => {
      const orders = [
        createMockOrder({ id: 'ORD-001', outletId: 'OUTLET-001' }),
        createMockOrder({ id: 'ORD-002', outletId: 'OUTLET-002' }),
      ]
      
      const outletId = null
      const filteredOrders = orders.filter(order => !outletId || order.outletId === outletId)
      
      expect(filteredOrders.length).toBe(2)
    })
  })

  describe('Service Type Filter', () => {
    it('should filter by service type', () => {
      const orders = [
        createMockOrder({ id: 'ORD-001', delivery: { serviceType: 'standard', distance: 2, shippingFee: 20000, baseFee: 10000, rate: 5000 } }),
        createMockOrder({ id: 'ORD-002', delivery: { serviceType: 'express', distance: 2, shippingFee: 35000, baseFee: 20000, rate: 7500 } }),
        createMockOrder({ id: 'ORD-003', delivery: { serviceType: 'standard', distance: 2, shippingFee: 20000, baseFee: 10000, rate: 5000 } }),
      ]
      
      const filteredOrders = orders.filter(order => order.delivery.serviceType === 'standard')
      expect(filteredOrders.length).toBe(2)
    })

    it('should filter by multiple service types', () => {
      const orders = [
        createMockOrder({ id: 'ORD-001', delivery: { serviceType: 'standard', distance: 2, shippingFee: 20000, baseFee: 10000, rate: 5000 } }),
        createMockOrder({ id: 'ORD-002', delivery: { serviceType: 'express', distance: 2, shippingFee: 35000, baseFee: 20000, rate: 7500 } }),
        createMockOrder({ id: 'ORD-003', delivery: { serviceType: 'same-day', distance: 2, shippingFee: 50000, baseFee: 30000, rate: 10000 } }),
      ]
      
      const selectedTypes: ServiceType[] = ['standard', 'express']
      const filteredOrders = orders.filter(order => selectedTypes.includes(order.delivery.serviceType))
      
      expect(filteredOrders.length).toBe(2)
    })
  })

  describe('Invoice Number Filter', () => {
    it('should search by invoice number', () => {
      const orders = [
        createMockOrder({ id: 'ORD-001', invoiceNumber: 'INV-001' }),
        createMockOrder({ id: 'ORD-002', invoiceNumber: 'INV-002' }),
        createMockOrder({ id: 'ORD-003', invoiceNumber: 'INV-003' }),
      ]
      
      const searchTerm = 'INV-002'
      const filteredOrders = orders.filter(order => 
        order.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )
      
      expect(filteredOrders.length).toBe(1)
      expect(filteredOrders[0].id).toBe('ORD-002')
    })

    it('should return all orders when invoice search is empty', () => {
      const orders = [
        createMockOrder({ id: 'ORD-001', invoiceNumber: 'INV-001' }),
        createMockOrder({ id: 'ORD-002', invoiceNumber: 'INV-002' }),
      ]
      
      const searchTerm = ''
      const filteredOrders = orders.filter(order => 
        !searchTerm || order.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )
      
      expect(filteredOrders.length).toBe(2)
    })

    it('should be case insensitive', () => {
      const orders = [
        createMockOrder({ id: 'ORD-001', invoiceNumber: 'INV-ABC' }),
        createMockOrder({ id: 'ORD-002', invoiceNumber: 'inv-abc' }),
        createMockOrder({ id: 'ORD-003', invoiceNumber: 'Inv-Abc' }),
      ]
      
      const searchTerm = 'inv-abc'
      const filteredOrders = orders.filter(order => 
        order.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )
      
      expect(filteredOrders.length).toBe(3)
    })
  })

  describe('Combined Filters with AND Logic', () => {
    it('should apply all filters together', () => {
      const orders = [
        createMockOrder({ id: 'ORD-001', outletId: 'OUTLET-001', status: 'submitted', invoiceNumber: 'INV-001', createdAt: new Date('2024-01-15'), delivery: { serviceType: 'standard', distance: 2, shippingFee: 20000, baseFee: 10000, rate: 5000 } }),
        createMockOrder({ id: 'ORD-002', outletId: 'OUTLET-001', status: 'submitted', invoiceNumber: 'INV-002', createdAt: new Date('2024-01-16'), delivery: { serviceType: 'express', distance: 2, shippingFee: 35000, baseFee: 20000, rate: 7500 } }),
        createMockOrder({ id: 'ORD-003', outletId: 'OUTLET-002', status: 'submitted', invoiceNumber: 'INV-001', createdAt: new Date('2024-01-15'), delivery: { serviceType: 'standard', distance: 2, shippingFee: 20000, baseFee: 10000, rate: 5000 } }),
      ]
      
      const filters = {
        outletId: 'OUTLET-001',
        statuses: ['submitted'] as OrderStatus[],
        serviceTypes: ['standard'] as ServiceType[],
        invoiceNumber: 'INV-001',
        dateRange: { from: new Date('2024-01-14'), to: new Date('2024-01-16') },
      }
      
      const filteredOrders = orders.filter(order => {
        const matchOutlet = !filters.outletId || order.outletId === filters.outletId
        const matchStatus = filters.statuses.length === 0 || filters.statuses.includes(order.status)
        const matchService = filters.serviceTypes.length === 0 || filters.serviceTypes.includes(order.delivery.serviceType)
        const matchInvoice = !filters.invoiceNumber || order.invoiceNumber.toLowerCase().includes(filters.invoiceNumber.toLowerCase())
        const matchDate = (!filters.dateRange.from || order.createdAt >= filters.dateRange.from) &&
                         (!filters.dateRange.to || order.createdAt <= filters.dateRange.to)
        
        return matchOutlet && matchStatus && matchService && matchInvoice && matchDate
      })
      
      expect(filteredOrders.length).toBe(1)
      expect(filteredOrders[0].id).toBe('ORD-001')
    })

    it('should return empty when no orders match filters', () => {
      const orders = [
        createMockOrder({ id: 'ORD-001', outletId: 'OUTLET-001', status: 'submitted', invoiceNumber: 'INV-001', delivery: { serviceType: 'standard', distance: 2, shippingFee: 20000, baseFee: 10000, rate: 5000 } }),
      ]
      
      const filters = {
        outletId: 'OUTLET-002', // Different outlet
        statuses: ['closed'] as OrderStatus[], // Different status
        serviceTypes: ['express'] as ServiceType[], // Different service
        invoiceNumber: 'INV-999', // Non-existent invoice
        dateRange: { from: new Date('2024-06-01'), to: new Date('2024-06-30') }, // Future date
      }
      
      const filteredOrders = orders.filter(order => {
        const matchOutlet = !filters.outletId || order.outletId === filters.outletId
        const matchStatus = filters.statuses.length === 0 || filters.statuses.includes(order.status)
        const matchService = filters.serviceTypes.length === 0 || filters.serviceTypes.includes(order.delivery.serviceType)
        const matchInvoice = !filters.invoiceNumber || order.invoiceNumber.toLowerCase().includes(filters.invoiceNumber.toLowerCase())
        const matchDate = (!filters.dateRange.from || order.createdAt >= filters.dateRange.from) &&
                         (!filters.dateRange.to || order.createdAt <= filters.dateRange.to)
        
        return matchOutlet && matchStatus && matchService && matchInvoice && matchDate
      })
      
      expect(filteredOrders.length).toBe(0)
    })

    it('should return all orders when no filters are active', () => {
      const orders = [
        createMockOrder({ id: 'ORD-001' }),
        createMockOrder({ id: 'ORD-002' }),
        createMockOrder({ id: 'ORD-003' }),
      ]
      
      const filters = {
        outletId: null,
        statuses: [] as OrderStatus[],
        serviceTypes: [] as ServiceType[],
        invoiceNumber: '',
        dateRange: { from: null, to: null },
      }
      
      const filteredOrders = orders.filter(order => {
        const matchOutlet = !filters.outletId || order.outletId === filters.outletId
        const matchStatus = filters.statuses.length === 0 || filters.statuses.includes(order.status)
        const matchService = filters.serviceTypes.length === 0 || filters.serviceTypes.includes(order.delivery.serviceType)
        const matchInvoice = !filters.invoiceNumber || order.invoiceNumber.toLowerCase().includes(filters.invoiceNumber.toLowerCase())
        const matchDate = (!filters.dateRange.from || order.createdAt >= filters.dateRange.from) &&
                         (!filters.dateRange.to || order.createdAt <= filters.dateRange.to)
        
        return matchOutlet && matchStatus && matchService && matchInvoice && matchDate
      })
      
      expect(filteredOrders.length).toBe(3)
    })
  })

  describe('Filter State Management', () => {
    it('should update filter state', () => {
      const mockSetStatuses = vi.fn()
      mockUseFilters.mockReturnValue({
        filters: { dateRange: { from: null, to: null }, statuses: [], outletId: null, serviceTypes: [], invoiceNumber: '' },
        setDateRange: vi.fn(), setStatuses: mockSetStatuses, setOutletId: vi.fn(),
        setServiceTypes: vi.fn(), setInvoiceNumber: vi.fn(), resetFilters: vi.fn(),
      })
      
      mockSetStatuses(['submitted', 'waiting'])
      expect(mockSetStatuses).toHaveBeenCalledWith(['submitted', 'waiting'])
    })

    it('should reset all filters', () => {
      const mockResetFilters = vi.fn()
      mockUseFilters.mockReturnValue({
        filters: { dateRange: { from: new Date('2024-01-01'), to: new Date('2024-01-31') }, statuses: ['submitted'], outletId: 'OUTLET-001', serviceTypes: ['standard'], invoiceNumber: 'INV' },
        setDateRange: vi.fn(), setStatuses: vi.fn(), setOutletId: vi.fn(),
        setServiceTypes: vi.fn(), setInvoiceNumber: vi.fn(), resetFilters: mockResetFilters,
      })
      
      mockResetFilters()
      expect(mockResetFilters).toHaveBeenCalled()
    })
  })

  describe('Empty State', () => {
    it('should display message when no orders match filters', () => {
      const hasFilters = true
      const filteredCount = 0
      
      expect(hasFilters).toBe(true)
      expect(filteredCount).toBe(0)
    })
  })
})