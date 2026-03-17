import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { LocalStorageAdapter } from '@/src/services/storage/LocalStorageAdapter'
import { StorageError, isStorageError } from '@/src/services/storage/StorageAdapter'
import { Order, Merchant, Outlet, OrderStatus, ServiceType } from '@/src/types'

/**
 * Mock localStorage for testing
 */
function createMockLocalStorage() {
  const store: Record<string, string> = {}
  let shouldThrow = false
  let throwError: Error | null = null

  const mock = {
    store,
    get shouldThrowErrors() {
      return shouldThrow
    },
    set shouldThrowErrors(value: boolean) {
      shouldThrow = value
    },
    set throwError(error: Error | null) {
      throwError = error
    },
    getItem: function (key: string): string | null {
      if (shouldThrow && throwError) {
        throw throwError
      }
      return store[key] ?? null
    },
    setItem: function (key: string, value: string): void {
      if (shouldThrow && throwError) {
        throw throwError
      }
      store[key] = value
    },
    removeItem: function (key: string): void {
      if (shouldThrow && throwError) {
        throw throwError
      }
      delete store[key]
    },
    clear: function (): void {
      for (const key of Object.keys(store)) {
        delete store[key]
      }
    },
    get length(): number {
      return Object.keys(store).length
    },
    key: function (index: number): string | null {
      const keys = Object.keys(store)
      return keys[index] ?? null
    },
  }

  return mock
}

// Helper to create test orders
const createTestOrder = (overrides: Partial<Order> = {}): Order => ({
  id: 'order-1',
  merchantId: 'merchant-1',
  outletId: 'outlet-1',
  status: 'submitted' as OrderStatus,
  statusDisplay: 'Shipment Created',
  invoiceNumber: 'INV-001',
  recipient: {
    name: 'John Doe',
    phone: '+1234567890',
    email: 'john@example.com',
    address: '123 Test St',
    coordinates: { lat: 13.7563, lng: 100.5018 },
  },
  items: [
    { id: 'item-1', description: 'Test Item', quantity: 1 },
  ],
  package: {
    weight: 1.5,
    dimensions: { length: 20, width: 15, height: 10 },
    isFragile: false,
  },
  delivery: {
    serviceType: 'standard' as ServiceType,
    distance: 1.5,
    shippingFee: 17500,
    baseFee: 10000,
    rate: 5000,
  },
  createdAt: new Date('2024-01-15T10:00:00Z'),
  updatedAt: new Date('2024-01-15T10:00:00Z'),
  ...overrides,
})

// Helper to create test merchant
const createTestMerchant = (overrides: Partial<Merchant> = {}): Merchant => ({
  id: 'merchant-1',
  email: 'test@pinkpin.com',
  name: 'Test Merchant',
  outlets: [],
  createdAt: new Date('2024-01-01T00:00:00Z'),
  ...overrides,
})

// Helper to create test outlet
const createTestOutlet = (overrides: Partial<Outlet> = {}): Outlet => ({
  id: 'outlet-1',
  merchantId: 'merchant-1',
  name: 'Main Outlet',
  address: '456 Outlet Ave',
  coordinates: { lat: 13.7563, lng: 100.5018 },
  createdAt: new Date('2024-01-01T00:00:00Z'),
  ...overrides,
})

describe('LocalStorageAdapter', () => {
  let mockStorage: ReturnType<typeof createMockLocalStorage>
  let adapter: LocalStorageAdapter

  beforeEach(() => {
    mockStorage = createMockLocalStorage()
    // Mock global localStorage
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: true,
    })
    adapter = new LocalStorageAdapter()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Order CRUD Operations', () => {
    describe('getOrders', () => {
      it('should return empty array when no orders exist', async () => {
        const orders = await adapter.getOrders()
        expect(orders).toEqual([])
      })

      it('should return parsed orders from localStorage', async () => {
        const order = createTestOrder()
        mockStorage.store['pink_pin_orders'] = JSON.stringify([order])

        const orders = await adapter.getOrders()
        expect(orders).toHaveLength(1)
        expect(orders[0].id).toBe('order-1')
      })

      it('should convert date strings to Date objects', async () => {
        const order = createTestOrder()
        mockStorage.store['pink_pin_orders'] = JSON.stringify([order])

        const orders = await adapter.getOrders()
        expect(orders[0].createdAt).toBeInstanceOf(Date)
        expect(orders[0].updatedAt).toBeInstanceOf(Date)
      })

      it('should throw StorageError when localStorage is unavailable', async () => {
        mockStorage.shouldThrowErrors = true
        mockStorage.throwError = new Error('localStorage is not available')

        await expect(adapter.getOrders()).rejects.toThrow(StorageError)
      })

      it('should throw StorageError for corrupted JSON data', async () => {
        mockStorage.store['pink_pin_orders'] = 'invalid json{'

        await expect(adapter.getOrders()).rejects.toThrow(StorageError)
      })
    })

    describe('getOrderById', () => {
      it('should return null when order does not exist', async () => {
        const order = await adapter.getOrderById('non-existent')
        expect(order).toBeNull()
      })

      it('should return order by id', async () => {
        const order1 = createTestOrder({ id: 'order-1' })
        const order2 = createTestOrder({ id: 'order-2' })
        mockStorage.store['pink_pin_orders'] = JSON.stringify([order1, order2])

        const result = await adapter.getOrderById('order-2')
        expect(result).not.toBeNull()
        expect(result!.id).toBe('order-2')
      })

      it('should throw StorageError when localStorage is unavailable', async () => {
        mockStorage.shouldThrowErrors = true
        mockStorage.throwError = new Error('localStorage is not available')

        await expect(adapter.getOrderById('order-1')).rejects.toThrow(StorageError)
      })
    })

    describe('createOrder', () => {
      it('should add order to storage', async () => {
        const order = createTestOrder()
        const created = await adapter.createOrder(order)

        expect(created.id).toBe('order-1')
        const stored = JSON.parse(mockStorage.store['pink_pin_orders'])
        expect(stored).toHaveLength(1)
        expect(stored[0].id).toBe('order-1')
      })

      it('should preserve order data', async () => {
        const order = createTestOrder()
        const created = await adapter.createOrder(order)

        expect(created.merchantId).toBe('merchant-1')
        expect(created.recipient.name).toBe('John Doe')
        expect(created.delivery.serviceType).toBe('standard')
      })

      it('should throw StorageError when localStorage is unavailable', async () => {
        mockStorage.shouldThrowErrors = true
        mockStorage.throwError = new Error('localStorage is not available')

        await expect(adapter.createOrder(createTestOrder())).rejects.toThrow(StorageError)
      })

      it('should throw StorageError with quota exceeded message', async () => {
        // First set up the storage to be available
        mockStorage.shouldThrowErrors = false
        // Create initial order so getOrders returns something
        const order = createTestOrder()
        mockStorage.store['pink_pin_orders'] = JSON.stringify([order])
        
        // Now set up to throw quota error only on the setItem call for orders
        // We need to intercept setItem specifically for the orders key
        const originalSetItem = mockStorage.setItem
        mockStorage.setItem = function(key: string, value: string): void {
          if (key === 'pink_pin_orders') {
            const error = new Error('QuotaExceededError: Quota exceeded')
            error.name = 'QuotaExceededError'
            mockStorage.throwError = error
            mockStorage.shouldThrowErrors = true
          }
          return originalSetItem.call(this, key, value)
        }

        try {
          await adapter.createOrder(createTestOrder({ id: 'order-2' }))
          expect.fail('Should have thrown')
        } catch (error) {
          expect(isStorageError(error)).toBe(true)
          expect((error as StorageError).userMessage).toBeDefined()
          expect((error as StorageError).message).toContain('Storage is full')
        }
      })
    })

    describe('updateOrder', () => {
      it('should update existing order', async () => {
        const order = createTestOrder()
        mockStorage.store['pink_pin_orders'] = JSON.stringify([order])

        const updated = await adapter.updateOrder('order-1', {
          status: 'waiting',
          statusDisplay: 'Waiting for Pick Up',
        })

        expect(updated.status).toBe('waiting')
        expect(updated.statusDisplay).toBe('Waiting for Pick Up')
        const stored = JSON.parse(mockStorage.store['pink_pin_orders'])
        expect(stored[0].status).toBe('waiting')
      })

      it('should update updatedAt timestamp', async () => {
        const order = createTestOrder()
        mockStorage.store['pink_pin_orders'] = JSON.stringify([order])

        const originalUpdatedAt = order.updatedAt
        // Wait a tiny bit to ensure different timestamp
        await new Promise(resolve => setTimeout(resolve, 10))

        const updated = await adapter.updateOrder('order-1', { status: 'closed' })
        expect(updated.updatedAt.getTime()).toBeGreaterThanOrEqual(originalUpdatedAt.getTime())
      })

      it('should throw StorageError when order not found', async () => {
        await expect(adapter.updateOrder('non-existent', { status: 'closed' }))
          .rejects.toThrow(StorageError)
      })

      it('should throw StorageError when localStorage is unavailable', async () => {
        mockStorage.shouldThrowErrors = true
        mockStorage.throwError = new Error('localStorage is not available')

        await expect(adapter.updateOrder('order-1', { status: 'closed' }))
          .rejects.toThrow(StorageError)
      })
    })

    describe('deleteOrder', () => {
      it('should remove order from storage', async () => {
        const order1 = createTestOrder({ id: 'order-1' })
        const order2 = createTestOrder({ id: 'order-2' })
        mockStorage.store['pink_pin_orders'] = JSON.stringify([order1, order2])

        await adapter.deleteOrder('order-1')

        const stored = JSON.parse(mockStorage.store['pink_pin_orders'])
        expect(stored).toHaveLength(1)
        expect(stored[0].id).toBe('order-2')
      })

      it('should not throw when deleting non-existent order', async () => {
        const order = createTestOrder()
        mockStorage.store['pink_pin_orders'] = JSON.stringify([order])

        await expect(adapter.deleteOrder('non-existent')).resolves.not.toThrow()
      })

      it('should throw StorageError when localStorage is unavailable', async () => {
        mockStorage.shouldThrowErrors = true
        mockStorage.throwError = new Error('localStorage is not available')

        await expect(adapter.deleteOrder('order-1')).rejects.toThrow(StorageError)
      })
    })
  })

  describe('Merchant CRUD Operations', () => {
    describe('getMerchant', () => {
      it('should return null when no merchants exist', async () => {
        const merchant = await adapter.getMerchant('merchant-1')
        expect(merchant).toBeNull()
      })

      it('should return merchant by id', async () => {
        const merchant = createTestMerchant()
        mockStorage.store['pink_pin_merchants'] = JSON.stringify([merchant])

        const result = await adapter.getMerchant('merchant-1')
        expect(result).not.toBeNull()
        expect(result!.id).toBe('merchant-1')
        expect(result!.email).toBe('test@pinkpin.com')
      })

      it('should throw StorageError for corrupted merchant data', async () => {
        mockStorage.store['pink_pin_merchants'] = 'invalid json{'

        await expect(adapter.getMerchant('merchant-1')).rejects.toThrow(StorageError)
      })

      it('should throw StorageError when localStorage is unavailable', async () => {
        mockStorage.shouldThrowErrors = true
        mockStorage.throwError = new Error('localStorage is not available')

        await expect(adapter.getMerchant('merchant-1')).rejects.toThrow(StorageError)
      })
    })
  })

  describe('Outlet CRUD Operations', () => {
    describe('getOutlets', () => {
      it('should return empty array when no outlets exist', async () => {
        const outlets = await adapter.getOutlets()
        expect(outlets).toEqual([])
      })

      it('should return parsed outlets from localStorage', async () => {
        const outlet = createTestOutlet()
        mockStorage.store['pink_pin_outlets'] = JSON.stringify([outlet])

        const outlets = await adapter.getOutlets()
        expect(outlets).toHaveLength(1)
        expect(outlets[0].id).toBe('outlet-1')
      })

      it('should convert date strings to Date objects', async () => {
        const outlet = createTestOutlet()
        mockStorage.store['pink_pin_outlets'] = JSON.stringify([outlet])

        const outlets = await adapter.getOutlets()
        expect(outlets[0].createdAt).toBeInstanceOf(Date)
      })

      it('should throw StorageError when localStorage is unavailable', async () => {
        mockStorage.shouldThrowErrors = true
        mockStorage.throwError = new Error('localStorage is not available')

        await expect(adapter.getOutlets()).rejects.toThrow(StorageError)
      })

      it('should throw StorageError for corrupted JSON data', async () => {
        mockStorage.store['pink_pin_outlets'] = 'invalid json{'

        await expect(adapter.getOutlets()).rejects.toThrow(StorageError)
      })
    })

    describe('getOutletById', () => {
      it('should return null when outlet does not exist', async () => {
        const outlet = await adapter.getOutletById('non-existent')
        expect(outlet).toBeNull()
      })

      it('should return outlet by id', async () => {
        const outlet1 = createTestOutlet({ id: 'outlet-1' })
        const outlet2 = createTestOutlet({ id: 'outlet-2' })
        mockStorage.store['pink_pin_outlets'] = JSON.stringify([outlet1, outlet2])

        const result = await adapter.getOutletById('outlet-2')
        expect(result).not.toBeNull()
        expect(result!.id).toBe('outlet-2')
      })

      it('should throw StorageError when localStorage is unavailable', async () => {
        mockStorage.shouldThrowErrors = true
        mockStorage.throwError = new Error('localStorage is not available')

        await expect(adapter.getOutletById('outlet-1')).rejects.toThrow(StorageError)
      })
    })
  })

  describe('Error Handling', () => {
    it('should include operation type in StorageError', async () => {
      mockStorage.shouldThrowErrors = true
      mockStorage.throwError = new Error('localStorage is not available')

      try {
        await adapter.getOrders()
        expect.fail('Should have thrown')
      } catch (error) {
        expect(isStorageError(error)).toBe(true)
        expect((error as StorageError).operation).toBe('getOrders')
      }
    })

    it('should include timestamp in StorageError', async () => {
      mockStorage.shouldThrowErrors = true
      mockStorage.throwError = new Error('localStorage is not available')

      try {
        await adapter.getOrders()
        expect.fail('Should have thrown')
      } catch (error) {
        expect(isStorageError(error)).toBe(true)
        expect((error as StorageError).timestamp).toBeInstanceOf(Date)
      }
    })

    it('should include user-friendly message in StorageError', async () => {
      mockStorage.shouldThrowErrors = true
      mockStorage.throwError = new Error('localStorage is not available')

      try {
        await adapter.getOrders()
        expect.fail('Should have thrown')
      } catch (error) {
        expect(isStorageError(error)).toBe(true)
        expect((error as StorageError).userMessage).toContain('Unable to load orders')
      }
    })

    it('should include original error in StorageError', async () => {
      const originalError = new Error('Original error')
      // Set up mock to throw during getOrders (but not during availability check)
      // The availability check uses '__storage_test__' key, so we only throw for other keys
      mockStorage.shouldThrowErrors = true
      mockStorage.throwError = originalError
      const originalGetItem = mockStorage.getItem
      mockStorage.getItem = function(key: string): string | null {
        if (key !== '__storage_test__' && mockStorage.shouldThrowErrors && mockStorage.throwError) {
          throw mockStorage.throwError
        }
        return originalGetItem.call(this, key)
      }
      const originalSetItem = mockStorage.setItem
      mockStorage.setItem = function(key: string, value: string): void {
        if (key !== '__storage_test__' && mockStorage.shouldThrowErrors && mockStorage.throwError) {
          throw mockStorage.throwError
        }
        return originalSetItem.call(this, key, value)
      }
      const originalRemoveItem = mockStorage.removeItem
      mockStorage.removeItem = function(key: string): void {
        if (key !== '__storage_test__' && mockStorage.shouldThrowErrors && mockStorage.throwError) {
          throw mockStorage.throwError
        }
        return originalRemoveItem.call(this, key)
      }

      let caughtError: unknown
      try {
        await adapter.getOrders()
      } catch (error) {
        caughtError = error
      }

      // The error should be thrown
      expect(caughtError).toBeDefined()
      expect(isStorageError(caughtError)).toBe(true)
      // The originalError should be preserved in the StorageError
      expect((caughtError as StorageError).originalError).toBeDefined()
    })

    it('isStorageError should correctly identify StorageError instances', () => {
      const storageError = new StorageError('getOrders', 'Test error')
      const regularError = new Error('Regular error')

      expect(isStorageError(storageError)).toBe(true)
      expect(isStorageError(regularError)).toBe(false)
      expect(isStorageError(null)).toBe(false)
      expect(isStorageError(undefined)).toBe(false)
    })
  })

  describe('Data Persistence - Round Trip Operations', () => {
    it('should persist order through full CRUD cycle', async () => {
      // Create
      const order = createTestOrder()
      const created = await adapter.createOrder(order)
      expect(created.id).toBe('order-1')

      // Read
      const fetched = await adapter.getOrderById('order-1')
      expect(fetched).not.toBeNull()
      expect(fetched!.id).toBe('order-1')

      // Update
      const updated = await adapter.updateOrder('order-1', {
        status: 'closed',
        statusDisplay: 'Delivery Completed',
      })
      expect(updated.status).toBe('closed')

      // Verify update persisted
      const allOrders = await adapter.getOrders()
      expect(allOrders[0].status).toBe('closed')

      // Delete
      await adapter.deleteOrder('order-1')

      // Verify deletion
      const afterDelete = await adapter.getOrderById('order-1')
      expect(afterDelete).toBeNull()
    })

    it('should handle multiple orders independently', async () => {
      const order1 = createTestOrder({ id: 'order-1' })
      const order2 = createTestOrder({ id: 'order-2' })
      const order3 = createTestOrder({ id: 'order-3' })

      await adapter.createOrder(order1)
      await adapter.createOrder(order2)
      await adapter.createOrder(order3)

      let orders = await adapter.getOrders()
      expect(orders).toHaveLength(3)

      await adapter.updateOrder('order-2', { status: 'waiting' })

      const updated = await adapter.getOrderById('order-2')
      expect(updated!.status).toBe('waiting')

      const otherOrders = await adapter.getOrderById('order-1')
      const otherOrders3 = await adapter.getOrderById('order-3')
      expect(otherOrders!.status).toBe('submitted')
      expect(otherOrders3!.status).toBe('submitted')

      await adapter.deleteOrder('order-1')
      orders = await adapter.getOrders()
      expect(orders).toHaveLength(2)
      expect(orders.find(o => o.id === 'order-1')).toBeUndefined()
    })

    it('should preserve complex nested data structures', async () => {
      const order: Order = {
        ...createTestOrder(),
        items: [
          { id: 'item-1', description: 'Package 1', quantity: 2 },
          { id: 'item-2', description: 'Package 2', quantity: 1 },
        ],
        recipient: {
          name: 'Jane Doe',
          phone: '+0987654321',
          email: 'jane@example.com',
          address: '789 Complex Ave, Building B, Floor 3',
          coordinates: { lat: 13.7823, lng: 100.6321 },
        },
      }

      await adapter.createOrder(order)
      const fetched = await adapter.getOrderById('order-1')

      expect(fetched!.items).toHaveLength(2)
      expect(fetched!.items[0].description).toBe('Package 1')
      expect(fetched!.recipient.address).toBe('789 Complex Ave, Building B, Floor 3')
      expect(fetched!.recipient.coordinates.lat).toBe(13.7823)
    })
  })

  describe('StorageError getLogDetails', () => {
    it('should return structured JSON log details', () => {
      const originalError = new Error('Original error')
      const storageError = new StorageError('getOrders', 'Test message', originalError)

      const logDetails = storageError.getLogDetails()
      const parsed = JSON.parse(logDetails)

      expect(parsed.name).toBe('StorageError')
      expect(parsed.message).toBe('Test message')
      expect(parsed.operation).toBe('getOrders')
      expect(parsed.userMessage).toBeDefined()
      expect(parsed.originalError).not.toBeNull()
      expect(parsed.originalError.message).toBe('Original error')
    })
  })
})