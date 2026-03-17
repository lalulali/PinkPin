/**
 * Unit tests for LocalStorageAdapter
 * Tests storage adapter CRUD operations and error handling
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { LocalStorageAdapter } from '../LocalStorageAdapter'
import { StorageError } from '../StorageAdapter'
import { Order, OrderStatus, ServiceType } from '@/src/types'

const createMockOrder = (overrides: Partial<Order> = {}): Order => ({
  id: 'ORD-001',
  merchantId: 'MERCH-001',
  outletId: 'OUTLET-001',
  status: 'submitted' as OrderStatus,
  statusDisplay: 'Shipment Created',
  invoiceNumber: 'INV-001',
  recipient: {
    name: 'John Doe',
    phone: '1234567890',
    email: 'john@example.com',
    address: '123 Main St',
    coordinates: { lat: 13.7563, lng: 100.5018 },
  },
  items: [{ id: 'ITEM-001', description: 'Test Item', quantity: 1 }],
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

// Mock localStorage with proper availability simulation
let localStorageData: Record<string, string> = {}
let localStorageAvailable = true

const mockLocalStorage = {
  getItem: vi.fn((key: string) => {
    // Handle storage availability check key
    if (key === '__storage_test__') {
      return localStorageAvailable ? '__storage_test__' : null
    }
    if (!localStorageAvailable) {
      throw new Error('localStorage is not available (private browsing or storage disabled)')
    }
    return localStorageData[key] ?? null
  }),
  setItem: vi.fn((key: string, value: string) => {
    // Handle storage availability check key
    if (key === '__storage_test__') {
      return
    }
    if (!localStorageAvailable) {
      throw new Error('localStorage is not available (private browsing or storage disabled)')
    }
    localStorageData[key] = value
  }),
  clear: vi.fn(() => {
    if (!localStorageAvailable) {
      throw new Error('localStorage is not available (private browsing or storage disabled)')
    }
    localStorageData = {}
  }),
  removeItem: vi.fn((key: string) => {
    if (!localStorageAvailable) {
      throw new Error('localStorage is not available (private browsing or storage disabled)')
    }
    delete localStorageData[key]
  }),
  get length() {
    return Object.keys(localStorageData).length
  },
  key: vi.fn((index: number) => {
    return Object.keys(localStorageData)[index] ?? null
  }),
}

Object.defineProperty(global, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
})

describe('LocalStorageAdapter', () => {
  let adapter: LocalStorageAdapter

  beforeEach(() => {
    adapter = new LocalStorageAdapter()
    vi.clearAllMocks()
    localStorageData = {}
    localStorageAvailable = true
    // Reset mock implementations
    mockLocalStorage.getItem.mockImplementation((key: string) => {
      if (key === '__storage_test__') {
        return localStorageAvailable ? '__storage_test__' : null
      }
      if (!localStorageAvailable) {
        throw new Error('localStorage is not available (private browsing or storage disabled)')
      }
      return localStorageData[key] ?? null
    })
    mockLocalStorage.setItem.mockImplementation((key: string, value: string) => {
      if (key === '__storage_test__') {
        return
      }
      if (!localStorageAvailable) {
        throw new Error('localStorage is not available (private browsing or storage disabled)')
      }
      localStorageData[key] = value
    })
  })

  afterEach(() => {
    localStorageData = {}
    localStorageAvailable = true
  })

  describe('getOrders', () => {
    it('should return empty array when no orders exist', async () => {
      localStorageData['pink_pin_orders'] = undefined as unknown as string

      const orders = await adapter.getOrders()

      expect(orders).toEqual([])
    })

    it('should return parsed orders from localStorage', async () => {
      const orders = [createMockOrder({ id: 'ORD-001' }), createMockOrder({ id: 'ORD-002' })]
      localStorageData['pink_pin_orders'] = JSON.stringify(orders)

      const result = await adapter.getOrders()

      expect(result).toHaveLength(2)
      expect(result[0].id).toBe('ORD-001')
      expect(result[1].id).toBe('ORD-002')
    })

    it('should parse date strings to Date objects', async () => {
      const orders = [createMockOrder({ id: 'ORD-001' })]
      localStorageData['pink_pin_orders'] = JSON.stringify(orders)

      const result = await adapter.getOrders()

      expect(result[0].createdAt).toBeInstanceOf(Date)
      expect(result[0].updatedAt).toBeInstanceOf(Date)
    })

    it('should throw StorageError when localStorage is unavailable', async () => {
      localStorageAvailable = false

      await expect(adapter.getOrders()).rejects.toThrow(StorageError)
    })

    it('should throw StorageError when JSON parsing fails', async () => {
      localStorageData['pink_pin_orders'] = 'invalid json'

      await expect(adapter.getOrders()).rejects.toThrow(StorageError)
    })
  })

  describe('getOrderById', () => {
    it('should return order when found', async () => {
      const orders = [createMockOrder({ id: 'ORD-001' }), createMockOrder({ id: 'ORD-002' })]
      localStorageData['pink_pin_orders'] = JSON.stringify(orders)

      const order = await adapter.getOrderById('ORD-001')

      expect(order).not.toBeNull()
      expect(order?.id).toBe('ORD-001')
    })

    it('should return null when order not found', async () => {
      const orders = [createMockOrder({ id: 'ORD-001' })]
      localStorageData['pink_pin_orders'] = JSON.stringify(orders)

      const order = await adapter.getOrderById('NONEXISTENT')

      expect(order).toBeNull()
    })

    it('should throw StorageError when localStorage is unavailable', async () => {
      localStorageAvailable = false

      await expect(adapter.getOrderById('ORD-001')).rejects.toThrow(StorageError)
    })
  })

  describe('createOrder', () => {
    it('should add order to localStorage', async () => {
      const existingOrders = [createMockOrder({ id: 'ORD-001' })]
      localStorageData['pink_pin_orders'] = JSON.stringify(existingOrders)

      const newOrder = createMockOrder({ id: 'ORD-002' })
      const result = await adapter.createOrder(newOrder)

      expect(result.id).toBe('ORD-002')
      expect(mockLocalStorage.setItem).toHaveBeenCalled()
    })

    it('should set createdAt and updatedAt on new order', async () => {
      localStorageData['pink_pin_orders'] = JSON.stringify([])

      const newOrder = createMockOrder({ id: 'ORD-NEW' })
      const result = await adapter.createOrder(newOrder)

      expect(result.createdAt).toBeInstanceOf(Date)
      expect(result.updatedAt).toBeInstanceOf(Date)
    })

    it('should throw StorageError when storage is full', async () => {
      localStorageData['pink_pin_orders'] = JSON.stringify([])
      mockLocalStorage.setItem.mockImplementation(() => {
        const error = new Error('Quota exceeded')
        error.name = 'QuotaExceededError'
        throw error
      })

      const newOrder = createMockOrder({ id: 'ORD-NEW' })

      await expect(adapter.createOrder(newOrder)).rejects.toThrow(StorageError)
    })

    it('should throw StorageError when localStorage is unavailable', async () => {
      localStorageAvailable = false

      const newOrder = createMockOrder({ id: 'ORD-NEW' })

      await expect(adapter.createOrder(newOrder)).rejects.toThrow(StorageError)
    })
  })

  describe('updateOrder', () => {
    it('should update existing order', async () => {
      const orders = [createMockOrder({ id: 'ORD-001', status: 'submitted' })]
      localStorageData['pink_pin_orders'] = JSON.stringify(orders)

      const result = await adapter.updateOrder('ORD-001', { status: 'waiting' })

      expect(result.status).toBe('waiting')
      expect(mockLocalStorage.setItem).toHaveBeenCalled()
    })

    it('should update updatedAt timestamp', async () => {
      const originalDate = new Date('2024-01-01')
      const orders = [createMockOrder({ id: 'ORD-001', updatedAt: originalDate })]
      localStorageData['pink_pin_orders'] = JSON.stringify(orders)

      const result = await adapter.updateOrder('ORD-001', { status: 'waiting' })

      expect(result.updatedAt.getTime()).toBeGreaterThan(originalDate.getTime())
    })

    it('should throw StorageError when order not found', async () => {
      const orders = [createMockOrder({ id: 'ORD-001' })]
      localStorageData['pink_pin_orders'] = JSON.stringify(orders)

      await expect(adapter.updateOrder('NONEXISTENT', { status: 'waiting' })).rejects.toThrow(
        StorageError
      )
    })

    it('should throw StorageError when localStorage is unavailable', async () => {
      localStorageAvailable = false

      await expect(adapter.updateOrder('ORD-001', { status: 'waiting' })).rejects.toThrow(
        StorageError
      )
    })
  })

  describe('deleteOrder', () => {
    it('should remove order from localStorage', async () => {
      const orders = [
        createMockOrder({ id: 'ORD-001' }),
        createMockOrder({ id: 'ORD-002' }),
      ]
      localStorageData['pink_pin_orders'] = JSON.stringify(orders)

      await adapter.deleteOrder('ORD-001')

      expect(mockLocalStorage.setItem).toHaveBeenCalled()
      // Find the call with the orders key (not the storage test key)
      const ordersCall = mockLocalStorage.setItem.mock.calls.find(
        (call) => call[0] === 'pink_pin_orders'
      )
      expect(ordersCall).toBeDefined()
      const savedData = JSON.parse(ordersCall[1])
      expect(savedData).toHaveLength(1)
      expect(savedData[0].id).toBe('ORD-002')
    })

    it('should not throw when order does not exist', async () => {
      const orders = [createMockOrder({ id: 'ORD-001' })]
      localStorageData['pink_pin_orders'] = JSON.stringify(orders)

      await expect(adapter.deleteOrder('NONEXISTENT')).resolves.not.toThrow()
    })

    it('should throw StorageError when localStorage is unavailable', async () => {
      localStorageAvailable = false

      await expect(adapter.deleteOrder('ORD-001')).rejects.toThrow(StorageError)
    })
  })

  describe('getOutlets', () => {
    it('should return empty array when no outlets exist', async () => {
      localStorageData['pink_pin_outlets'] = undefined as unknown as string

      const outlets = await adapter.getOutlets()

      expect(outlets).toEqual([])
    })

    it('should return parsed outlets from localStorage', async () => {
      const outlets = [
        { id: 'OUT-001', name: 'Outlet 1', merchantId: 'MERCH-001', address: 'Address 1', coordinates: { lat: 13.7563, lng: 100.5018 }, createdAt: new Date() },
      ]
      localStorageData['pink_pin_outlets'] = JSON.stringify(outlets)

      const result = await adapter.getOutlets()

      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('OUT-001')
    })

    it('should throw StorageError when localStorage is unavailable', async () => {
      localStorageAvailable = false

      await expect(adapter.getOutlets()).rejects.toThrow(StorageError)
    })
  })

  describe('getMerchant', () => {
    it('should return null when no merchant exists', async () => {
      localStorageData['pink_pin_merchants'] = undefined as unknown as string

      const merchant = await adapter.getMerchant('MERCH-001')

      expect(merchant).toBeNull()
    })

    it('should return merchant when found', async () => {
      const merchants = [{ id: 'MERCH-001', email: 'test@example.com', name: 'Test Merchant', outlets: [], createdAt: new Date() }]
      localStorageData['pink_pin_merchants'] = JSON.stringify(merchants)

      const merchant = await adapter.getMerchant('MERCH-001')

      expect(merchant).not.toBeNull()
      expect(merchant?.id).toBe('MERCH-001')
    })

    it('should throw StorageError when localStorage is unavailable', async () => {
      localStorageAvailable = false

      await expect(adapter.getMerchant('MERCH-001')).rejects.toThrow(StorageError)
    })
  })
})