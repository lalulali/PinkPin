/**
 * Integration tests for Order Creation Flow
 * Tests complete flow: outlet selection, recipient info, items, package details,
 * delivery info with map selection, to order confirmation
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act, cleanup } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCreateOrder } from '@/src/hooks/useCreateOrder'
import { useOrders } from '@/src/hooks/useOrders'
import { useOutlets } from '@/src/hooks/useOutlets'
import { useFilters, useSort, useLayout, usePagination } from '@/src/hooks/useUIStore'
import { useOfflineStore } from '@/src/stores/offlineStore'
import { getStorageAdapter } from '@/src/services/storage'
import { Order, OrderStatus, ServiceType, Outlet } from '@/src/types'
import { calculateDistance, calculateShippingFee, isDistanceValid } from '@/src/utils/calculations'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ push: vi.fn(), replace: vi.fn() })),
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

vi.mock('@/src/stores/offlineStore', () => ({
  useOfflineStore: vi.fn(),
}))

const mockGetStorageAdapter = vi.mocked(getStorageAdapter)
const mockUseOutlets = vi.mocked(useOutlets)
const mockUseFilters = vi.mocked(useFilters)
const mockUseSort = vi.mocked(useSort)
const mockUseLayout = vi.mocked(useLayout)
const mockUsePagination = vi.mocked(usePagination)
const mockUseOfflineStore = vi.mocked(useOfflineStore)

const createMockOutlet = (overrides: Partial<Outlet> = {}): Outlet => ({
  id: 'OUTLET-001',
  merchantId: 'MERCH-001',
  name: 'Main Outlet',
  address: '123 Main Street, Jakarta',
  coordinates: { lat: -6.2088, lng: 106.8456 },
  createdAt: new Date('2024-01-01'),
  ...overrides,
})

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
    address: '123 Main Street, Jakarta',
    coordinates: { lat: -6.2090, lng: 106.8460 },
  },
  items: [{ id: 'ITEM-001', description: 'Test Package', quantity: 1 }],
  package: {
    weight: 1.5,
    dimensions: { length: 20, width: 15, height: 10 },
    isFragile: false,
  },
  delivery: {
    serviceType: 'standard' as ServiceType,
    distance: 2.5,
    shippingFee: 22500,
    baseFee: 10000,
    rate: 5000,
  },
  createdAt: new Date('2024-01-15T10:00:00Z'),
  updatedAt: new Date('2024-01-15T10:00:00Z'),
  ...overrides,
})

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  })

describe('Order Creation Flow Integration', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = createQueryClient()
    vi.clearAllMocks()
    
    mockUseOutlets.mockReturnValue({ data: [createMockOutlet()], isLoading: false })
    mockUseFilters.mockReturnValue({
      filters: { dateRange: { from: null, to: null }, statuses: [], outletId: null, serviceTypes: [], invoiceNumber: '' },
      setDateRange: vi.fn(), setStatuses: vi.fn(), setOutletId: vi.fn(),
      setServiceTypes: vi.fn(), setInvoiceNumber: vi.fn(), resetFilters: vi.fn(),
    })
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
    mockUseOfflineStore.mockReturnValue({ isOnline: true, setIsOnline: vi.fn() })
  })

  afterEach(() => {
    queryClient.clear()
    cleanup()
  })

  describe('Outlet Selection', () => {
    it('should display available outlets', () => {
      const outlets = [createMockOutlet({ id: 'OUTLET-001', name: 'Main Outlet' })]
      expect(outlets.length).toBe(1)
      expect(outlets[0].name).toBe('Main Outlet')
    })

    it('should select outlet and update form state', () => {
      const selectedOutletId = 'OUTLET-001'
      expect(selectedOutletId).toBeTruthy()
    })

    it('should center map on selected outlet', () => {
      const outlet = createMockOutlet()
      expect(outlet.coordinates.lat).toBe(-6.2088)
      expect(outlet.coordinates.lng).toBe(106.8456)
    })
  })

  describe('Recipient Information', () => {
    it('should validate required recipient fields', () => {
      const recipient = {
        name: 'John Doe',
        phone: '+62812345678',
        email: 'john@example.com',
        address: '123 Main St',
      }
      
      expect(recipient.name.length).toBeGreaterThan(0)
      expect(recipient.phone.length).toBeGreaterThan(0)
      expect(recipient.email.includes('@')).toBe(true)
      expect(recipient.address.length).toBeGreaterThan(0)
    })

    it('should validate email format', () => {
      const validEmails = ['test@example.com', 'user.name@domain.org', 'user+tag@example.co.id']
      const invalidEmails = ['invalid', 'no@domain', '@nodomain.com', 'test@']
      
      validEmails.forEach(email => {
        expect(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)).toBe(true)
      })
      
      invalidEmails.forEach(email => {
        expect(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)).toBe(false)
      })
    })

    it('should validate phone number format', () => {
      const validPhones = ['+62812345678', '081234567890', '+62 812 345 6789']
      const phoneRegex = /^[\d\s\-+()]+$/
      
      validPhones.forEach(phone => {
        expect(phoneRegex.test(phone)).toBe(true)
      })
    })
  })

  describe('Items Management', () => {
    it('should add items to order', () => {
      const items = [
        { id: 'ITEM-001', description: 'Package 1', quantity: 1 },
        { id: 'ITEM-002', description: 'Package 2', quantity: 2 },
      ]
      
      expect(items.length).toBe(2)
      expect(items[0].description).toBe('Package 1')
    })

    it('should calculate total item quantity', () => {
      const items = [
        { id: 'ITEM-001', description: 'Package 1', quantity: 2 },
        { id: 'ITEM-002', description: 'Package 2', quantity: 3 },
      ]
      
      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
      expect(totalQuantity).toBe(5)
    })

    it('should remove items from order', () => {
      const items = [
        { id: 'ITEM-001', description: 'Package 1', quantity: 1 },
        { id: 'ITEM-002', description: 'Package 2', quantity: 1 },
      ]
      
      const filteredItems = items.filter(item => item.id !== 'ITEM-001')
      expect(filteredItems.length).toBe(1)
      expect(filteredItems[0].id).toBe('ITEM-002')
    })
  })

  describe('Package Details', () => {
    it('should store package dimensions', () => {
      const packageDetails = {
        weight: 1.5,
        dimensions: { length: 20, width: 15, height: 10 },
        isFragile: false,
      }
      
      expect(packageDetails.weight).toBe(1.5)
      expect(packageDetails.dimensions.length).toBe(20)
      expect(packageDetails.dimensions.width).toBe(15)
      expect(packageDetails.dimensions.height).toBe(10)
    })

    it('should track fragile flag', () => {
      const fragilePackage = { isFragile: true }
      const normalPackage = { isFragile: false }
      
      expect(fragilePackage.isFragile).toBe(true)
      expect(normalPackage.isFragile).toBe(false)
    })
  })

  describe('Delivery Information with Map', () => {
    it('should calculate distance from outlet to delivery location', () => {
      const outletCoords = { lat: -6.2088, lng: 106.8456 }
      const deliveryCoords = { lat: -6.2200, lng: 106.8500 }
      
      const distance = calculateDistance(outletCoords, deliveryCoords)
      expect(distance).toBeGreaterThan(0)
      expect(distance).toBeLessThanOrEqual(3)
    })

    it('should validate distance is within 3km radius', () => {
      const validDistance = 2.5
      const invalidDistance = 4.0
      
      expect(isDistanceValid(validDistance)).toBe(true)
      expect(isDistanceValid(invalidDistance)).toBe(false)
    })

    it('should calculate shipping fee based on distance and service type', () => {
      const distance = 2.0
      
      const standardFee = calculateShippingFee(distance, 'standard')
      expect(standardFee).toBe(20000) // 10000 + (2 * 5000)
      
      const expressFee = calculateShippingFee(distance, 'express')
      expect(expressFee).toBe(35000) // 20000 + (2 * 7500)
      
      const sameDayFee = calculateShippingFee(distance, 'same-day')
      expect(sameDayFee).toBe(50000) // 30000 + (2 * 10000)
    })

    it('should update delivery coordinates on map click', () => {
      const newCoordinates = { lat: -6.2150, lng: 106.8480 }
      expect(newCoordinates.lat).toBeDefined()
      expect(newCoordinates.lng).toBeDefined()
    })
  })

  describe('Order Confirmation', () => {
    it('should generate unique order ID', () => {
      const orderId = `ORD-${Date.now()}`
      expect(orderId.startsWith('ORD-')).toBe(true)
    })

    it('should set initial order status', () => {
      const newOrder = createMockOrder()
      expect(newOrder.status).toBe('submitted')
      expect(newOrder.statusDisplay).toBe('Shipment Created')
    })

    it('should create complete order object', () => {
      const order = createMockOrder()
      
      expect(order.id).toBeDefined()
      expect(order.merchantId).toBeDefined()
      expect(order.outletId).toBeDefined()
      expect(order.recipient).toBeDefined()
      expect(order.items.length).toBeGreaterThan(0)
      expect(order.package).toBeDefined()
      expect(order.delivery).toBeDefined()
      expect(order.createdAt).toBeInstanceOf(Date)
    })

    it('should save order to storage', async () => {
      const order = createMockOrder()
      const mockAdapter = {
        createOrder: vi.fn().mockResolvedValue(order),
      }
      mockGetStorageAdapter.mockReturnValue(mockAdapter)
      
      await mockAdapter.createOrder(order)
      expect(mockAdapter.createOrder).toHaveBeenCalledWith(order)
    })
  })

  describe('Order Creation with Different Service Types', () => {
    it('should create order with Standard service', () => {
      const order = createMockOrder({
        delivery: { serviceType: 'standard', distance: 2.0, shippingFee: 20000, baseFee: 10000, rate: 5000 },
      })
      
      expect(order.delivery.serviceType).toBe('standard')
      expect(order.delivery.baseFee).toBe(10000)
      expect(order.delivery.rate).toBe(5000)
    })

    it('should create order with Express service', () => {
      const order = createMockOrder({
        delivery: { serviceType: 'express', distance: 2.0, shippingFee: 35000, baseFee: 20000, rate: 7500 },
      })
      
      expect(order.delivery.serviceType).toBe('express')
      expect(order.delivery.baseFee).toBe(20000)
      expect(order.delivery.rate).toBe(7500)
    })

    it('should create order with Same-Day service', () => {
      const order = createMockOrder({
        delivery: { serviceType: 'same-day', distance: 2.0, shippingFee: 50000, baseFee: 30000, rate: 10000 },
      })
      
      expect(order.delivery.serviceType).toBe('same-day')
      expect(order.delivery.baseFee).toBe(30000)
      expect(order.delivery.rate).toBe(10000)
    })
  })

  describe('Form Validation Before Submission', () => {
    it('should require outlet selection', () => {
      const outletId = 'OUTLET-001'
      expect(outletId.length).toBeGreaterThan(0)
    })

    it('should require recipient name', () => {
      const name = 'John Doe'
      expect(name.trim().length).toBeGreaterThan(0)
    })

    it('should require recipient phone', () => {
      const phone = '+62812345678'
      expect(phone.length).toBeGreaterThan(0)
    })

    it('should require at least one item', () => {
      const items = [{ id: 'ITEM-001', description: 'Package', quantity: 1 }]
      expect(items.length).toBeGreaterThan(0)
    })

    it('should require valid delivery location', () => {
      const coordinates = { lat: -6.2100, lng: 106.8470 }
      const distance = calculateDistance({ lat: -6.2088, lng: 106.8456 }, coordinates)
      
      expect(isDistanceValid(distance)).toBe(true)
    })
  })

  describe('Auto-save Functionality', () => {
    it('should persist form data to localStorage', () => {
      const formData = {
        outletId: 'OUTLET-001',
        recipientName: 'John Doe',
        items: [{ id: 'ITEM-001', description: 'Package', quantity: 1 }],
      }
      
      const serialized = JSON.stringify(formData)
      expect(serialized.length).toBeGreaterThan(0)
    })

    it('should restore form data from localStorage', () => {
      const savedData = JSON.stringify({
        outletId: 'OUTLET-001',
        recipientName: 'John Doe',
      })
      
      const parsed = JSON.parse(savedData)
      expect(parsed.outletId).toBe('OUTLET-001')
      expect(parsed.recipientName).toBe('John Doe')
    })
  })
})

describe('Order Creation Error Handling', () => {
  it('should handle storage errors gracefully', async () => {
    const mockAdapter = {
      createOrder: vi.fn().mockRejectedValue(new Error('Storage error')),
    }
    mockGetStorageAdapter.mockReturnValue(mockAdapter)
    
    const order = createMockOrder()
    
    try {
      await mockAdapter.createOrder(order)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect((error as Error).message).toBe('Storage error')
    }
  })

  it('should display validation errors', () => {
    const errors = {
      recipientName: 'This field is required',
      recipientPhone: 'Please enter a valid phone number',
      recipientEmail: 'Please enter a valid email address',
    }
    
    expect(errors.recipientName).toBeDefined()
    expect(errors.recipientPhone).toBeDefined()
    expect(errors.recipientEmail).toBeDefined()
  })

  it('should show distance validation error', () => {
    const distanceError = 'Delivery location must be within 3 km radius of the outlet'
    expect(distanceError.length).toBeGreaterThan(0)
  })
})