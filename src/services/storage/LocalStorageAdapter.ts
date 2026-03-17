import { Order, Merchant, Outlet } from '@/src/types'
import { StorageAdapter, StorageError, StorageOperation } from './StorageAdapter'

const ORDERS_KEY = 'pink_pin_orders'
const MERCHANTS_KEY = 'pink_pin_merchants'
const OUTLETS_KEY = 'pink_pin_outlets'

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__'
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

/**
 * Log error details with timestamp and operation type (Requirement 3.5)
 */
function logStorageError(operation: StorageOperation, error: Error): void {
  const storageError = new StorageError(operation, error.message, error)
  console.error(`[Storage Error] ${operation}:`, storageError.getLogDetails())
}

/**
 * LocalStorageAdapter implements StorageAdapter using browser localStorage
 * Provides CRUD operations for orders, merchants, and outlets
 * Implements comprehensive error handling (Requirements 3.5, 3.7)
 */
export class LocalStorageAdapter implements StorageAdapter {
  async getOrders(): Promise<Order[]> {
    const operation: StorageOperation = 'getOrders'

    if (!isLocalStorageAvailable()) {
      const error = new Error('localStorage is not available (private browsing or storage disabled)')
      logStorageError(operation, error)
      throw new StorageError(operation, error.message, error)
    }

    try {
      const data = localStorage.getItem(ORDERS_KEY)
      if (!data) return []

      try {
        const orders = JSON.parse(data) as Order[]
        return orders.map((order) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
        }))
      } catch (parseError) {
        const error = parseError instanceof Error ? parseError : new Error(String(parseError))
        logStorageError(operation, error)
        throw new StorageError(
          operation,
          'Unable to load orders. The data may be corrupted.',
          error
        )
      }
    } catch (error) {
      if (error instanceof StorageError) throw error
      const unknownError = error instanceof Error ? error : new Error(String(error))
      logStorageError(operation, unknownError)
      throw new StorageError(operation, unknownError.message, unknownError)
    }
  }

  async getOrderById(id: string): Promise<Order | null> {
    const operation: StorageOperation = 'getOrderById'

    if (!isLocalStorageAvailable()) {
      const error = new Error('localStorage is not available (private browsing or storage disabled)')
      logStorageError(operation, error)
      throw new StorageError(operation, error.message, error)
    }

    try {
      const orders = await this.getOrders()
      const order = orders.find((o) => o.id === id)
      return order || null
    } catch (error) {
      if (error instanceof StorageError) throw error
      const unknownError = error instanceof Error ? error : new Error(String(error))
      logStorageError(operation, unknownError)
      throw new StorageError(operation, unknownError.message, unknownError)
    }
  }

  async createOrder(order: Order): Promise<Order> {
    const operation: StorageOperation = 'createOrder'

    if (!isLocalStorageAvailable()) {
      const error = new Error('localStorage is not available (private browsing or storage disabled)')
      logStorageError(operation, error)
      throw new StorageError(operation, error.message, error)
    }

    try {
      const orders = await this.getOrders()
      const newOrder = {
        ...order,
        createdAt: new Date(order.createdAt),
        updatedAt: new Date(order.updatedAt),
      }
      orders.push(newOrder)

      try {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
      } catch (quotaError) {
        const error = quotaError instanceof Error ? quotaError : new Error(String(quotaError))
        logStorageError(operation, error)
        if (error.name === 'QuotaExceededError' || error.message.includes('quota')) {
          throw new StorageError(
            operation,
            'Storage is full. Please clear some data and try again.',
            error
          )
        }
        throw new StorageError(operation, error.message, error)
      }

      return newOrder
    } catch (error) {
      if (error instanceof StorageError) throw error
      const unknownError = error instanceof Error ? error : new Error(String(error))
      logStorageError(operation, unknownError)
      throw new StorageError(operation, unknownError.message, unknownError)
    }
  }

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
    const operation: StorageOperation = 'updateOrder'

    if (!isLocalStorageAvailable()) {
      const error = new Error('localStorage is not available (private browsing or storage disabled)')
      logStorageError(operation, error)
      throw new StorageError(operation, error.message, error)
    }

    try {
      const orders = await this.getOrders()
      const index = orders.findIndex((o) => o.id === id)
      if (index === -1) {
        const error = new Error(`Order ${id} not found`)
        logStorageError(operation, error)
        throw new StorageError(operation, error.message, error)
      }

      const updatedOrder = {
        ...orders[index],
        ...updates,
        updatedAt: new Date(),
      }
      orders[index] = updatedOrder

      try {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
      } catch (quotaError) {
        const error = quotaError instanceof Error ? quotaError : new Error(String(quotaError))
        logStorageError(operation, error)
        if (error.name === 'QuotaExceededError' || error.message.includes('quota')) {
          throw new StorageError(
            operation,
            'Storage is full. Please clear some data and try again.',
            error
          )
        }
        throw new StorageError(operation, error.message, error)
      }

      return updatedOrder
    } catch (error) {
      if (error instanceof StorageError) throw error
      const unknownError = error instanceof Error ? error : new Error(String(error))
      logStorageError(operation, unknownError)
      throw new StorageError(operation, unknownError.message, unknownError)
    }
  }

  async deleteOrder(id: string): Promise<void> {
    const operation: StorageOperation = 'deleteOrder'

    if (!isLocalStorageAvailable()) {
      const error = new Error('localStorage is not available (private browsing or storage disabled)')
      logStorageError(operation, error)
      throw new StorageError(operation, error.message, error)
    }

    try {
      const orders = await this.getOrders()
      const filtered = orders.filter((o) => o.id !== id)

      try {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(filtered))
      } catch (quotaError) {
        const error = quotaError instanceof Error ? quotaError : new Error(String(quotaError))
        logStorageError(operation, error)
        if (error.name === 'QuotaExceededError' || error.message.includes('quota')) {
          throw new StorageError(
            operation,
            'Storage is full. Please clear some data and try again.',
            error
          )
        }
        throw new StorageError(operation, error.message, error)
      }
    } catch (error) {
      if (error instanceof StorageError) throw error
      const unknownError = error instanceof Error ? error : new Error(String(error))
      logStorageError(operation, unknownError)
      throw new StorageError(operation, unknownError.message, unknownError)
    }
  }

  async getMerchant(id: string): Promise<Merchant | null> {
    const operation: StorageOperation = 'getMerchant'

    if (!isLocalStorageAvailable()) {
      const error = new Error('localStorage is not available (private browsing or storage disabled)')
      logStorageError(operation, error)
      throw new StorageError(operation, error.message, error)
    }

    try {
      const data = localStorage.getItem(MERCHANTS_KEY)
      if (!data) return null

      try {
        const merchants = JSON.parse(data) as Merchant[]
        const merchant = merchants.find((m) => m.id === id)
        return merchant || null
      } catch (parseError) {
        const error = parseError instanceof Error ? parseError : new Error(String(parseError))
        logStorageError(operation, error)
        throw new StorageError(
          operation,
          'Unable to load merchant data. The data may be corrupted.',
          error
        )
      }
    } catch (error) {
      if (error instanceof StorageError) throw error
      const unknownError = error instanceof Error ? error : new Error(String(error))
      logStorageError(operation, unknownError)
      throw new StorageError(operation, unknownError.message, unknownError)
    }
  }

  async getOutlets(): Promise<Outlet[]> {
    const operation: StorageOperation = 'getOutlets'

    if (!isLocalStorageAvailable()) {
      const error = new Error('localStorage is not available (private browsing or storage disabled)')
      logStorageError(operation, error)
      throw new StorageError(operation, error.message, error)
    }

    try {
      const data = localStorage.getItem(OUTLETS_KEY)
      if (!data) {
        // Initialize with dummy data if no outlets exist
        const dummyOutlets: Outlet[] = [
          {
            id: 'outlet-001',
            merchantId: 'MERCHANT-001',
            name: 'Jakarta Central Hub',
            address: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 12190',
            coordinates: { lat: -6.2088, lng: 106.8456 },
            createdAt: new Date(),
          },
          {
            id: 'outlet-002',
            merchantId: 'MERCHANT-001',
            name: 'Bandung Distribution Center',
            address: 'Jl. Gatot Subroto No. 456, Bandung, Jawa Barat 40274',
            coordinates: { lat: -6.9175, lng: 107.6062 },
            createdAt: new Date(),
          },
          {
            id: 'outlet-003',
            merchantId: 'MERCHANT-001',
            name: 'Surabaya East Terminal',
            address: 'Jl. Ahmad Yani No. 789, Surabaya, Jawa Timur 60188',
            coordinates: { lat: -7.2575, lng: 112.7521 },
            createdAt: new Date(),
          },
        ]
        await this.initializeOutlets(dummyOutlets)
        return dummyOutlets
      }

      try {
        const outlets = JSON.parse(data) as Outlet[]
        return outlets.map((outlet) => ({
          ...outlet,
          createdAt: new Date(outlet.createdAt),
        }))
      } catch (parseError) {
        const error = parseError instanceof Error ? parseError : new Error(String(parseError))
        logStorageError(operation, error)
        throw new StorageError(
          operation,
          'Unable to load outlets. The data may be corrupted.',
          error
        )
      }
    } catch (error) {
      if (error instanceof StorageError) throw error
      const unknownError = error instanceof Error ? error : new Error(String(error))
      logStorageError(operation, unknownError)
      throw new StorageError(operation, unknownError.message, unknownError)
    }
  }

  private async initializeOutlets(outlets: Outlet[]): Promise<void> {
    try {
      localStorage.setItem(OUTLETS_KEY, JSON.stringify(outlets))
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      logStorageError('getOutlets', err)
      throw new StorageError('getOutlets', err.message, err)
    }
  }

  async getOutletById(id: string): Promise<Outlet | null> {
    const operation: StorageOperation = 'getOutletById'

    if (!isLocalStorageAvailable()) {
      const error = new Error('localStorage is not available (private browsing or storage disabled)')
      logStorageError(operation, error)
      throw new StorageError(operation, error.message, error)
    }

    try {
      const outlets = await this.getOutlets()
      const outlet = outlets.find((o) => o.id === id)
      return outlet || null
    } catch (error) {
      if (error instanceof StorageError) throw error
      const unknownError = error instanceof Error ? error : new Error(String(error))
      logStorageError(operation, unknownError)
      throw new StorageError(operation, unknownError.message, unknownError)
    }
  }
}
