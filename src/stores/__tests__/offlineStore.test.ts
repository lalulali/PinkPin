/**
 * Unit tests for offlineStore (Zustand store)
 * Tests offline state management and queued orders
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { act } from '@testing-library/react'
import { useOfflineStore } from '../offlineStore'
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

describe('offlineStore', () => {
  beforeEach(() => {
    act(() => {
      useOfflineStore.setState({
        isOnline: true,
        queuedOrders: [],
        isSyncing: false,
        syncError: undefined,
      })
    })
  })

  afterEach(() => {
    act(() => {
      useOfflineStore.getState().clearQueuedOrders()
    })
    vi.clearAllMocks()
  })

  describe('online status', () => {
    it('should have default isOnline as true', () => {
      const { isOnline } = useOfflineStore.getState()
      expect(isOnline).toBe(true)
    })

    it('should set online status to false', () => {
      act(() => {
        useOfflineStore.getState().setOnlineStatus(false)
      })

      const { isOnline } = useOfflineStore.getState()
      expect(isOnline).toBe(false)
    })

    it('should set online status to true', () => {
      act(() => {
        useOfflineStore.getState().setOnlineStatus(false)
        useOfflineStore.getState().setOnlineStatus(true)
      })

      const { isOnline } = useOfflineStore.getState()
      expect(isOnline).toBe(true)
    })
  })

  describe('queued orders', () => {
    it('should have empty queued orders by default', () => {
      const { queuedOrders } = useOfflineStore.getState()
      expect(queuedOrders).toEqual([])
    })

    it('should add queued order', () => {
      const order = createMockOrder({ id: 'ORD-NEW' })

      act(() => {
        useOfflineStore.getState().addQueuedOrder(order)
      })

      const { queuedOrders } = useOfflineStore.getState()
      expect(queuedOrders.length).toBe(1)
      expect(queuedOrders[0].id).toBe('ORD-NEW')
      expect(queuedOrders[0].queuedAt).toBeInstanceOf(Date)
      expect(queuedOrders[0].syncAttempts).toBe(0)
    })

    it('should add multiple queued orders', () => {
      const order1 = createMockOrder({ id: 'ORD-001' })
      const order2 = createMockOrder({ id: 'ORD-002' })

      act(() => {
        useOfflineStore.getState().addQueuedOrder(order1)
        useOfflineStore.getState().addQueuedOrder(order2)
      })

      const { queuedOrders } = useOfflineStore.getState()
      expect(queuedOrders.length).toBe(2)
      expect(queuedOrders[0].id).toBe('ORD-001')
      expect(queuedOrders[1].id).toBe('ORD-002')
    })

    it('should remove queued order', () => {
      const order = createMockOrder({ id: 'ORD-001' })

      act(() => {
        useOfflineStore.getState().addQueuedOrder(order)
        useOfflineStore.getState().removeQueuedOrder('ORD-001')
      })

      const { queuedOrders } = useOfflineStore.getState()
      expect(queuedOrders.length).toBe(0)
    })

    it('should update queued order', () => {
      const order = createMockOrder({ id: 'ORD-001' })

      act(() => {
        useOfflineStore.getState().addQueuedOrder(order)
        useOfflineStore.getState().updateQueuedOrder('ORD-001', {
          syncAttempts: 1,
          lastSyncError: 'Network error',
        })
      })

      const { queuedOrders } = useOfflineStore.getState()
      expect(queuedOrders[0].syncAttempts).toBe(1)
      expect(queuedOrders[0].lastSyncError).toBe('Network error')
    })

    it('should get queued orders', () => {
      const order1 = createMockOrder({ id: 'ORD-001' })
      const order2 = createMockOrder({ id: 'ORD-002' })

      act(() => {
        useOfflineStore.getState().addQueuedOrder(order1)
        useOfflineStore.getState().addQueuedOrder(order2)
      })

      const queuedOrders = useOfflineStore.getState().getQueuedOrders()
      expect(queuedOrders.length).toBe(2)
    })

    it('should clear all queued orders', () => {
      const order1 = createMockOrder({ id: 'ORD-001' })
      const order2 = createMockOrder({ id: 'ORD-002' })

      act(() => {
        useOfflineStore.getState().addQueuedOrder(order1)
        useOfflineStore.getState().addQueuedOrder(order2)
        useOfflineStore.getState().clearQueuedOrders()
      })

      const { queuedOrders } = useOfflineStore.getState()
      expect(queuedOrders.length).toBe(0)
    })

    it('should increment sync attempts', () => {
      const order = createMockOrder({ id: 'ORD-001' })

      act(() => {
        useOfflineStore.getState().addQueuedOrder(order)
        useOfflineStore.getState().incrementSyncAttempts('ORD-001')
        useOfflineStore.getState().incrementSyncAttempts('ORD-001')
      })

      const { queuedOrders } = useOfflineStore.getState()
      expect(queuedOrders[0].syncAttempts).toBe(2)
    })

    it('should set last sync error for order', () => {
      const order = createMockOrder({ id: 'ORD-001' })

      act(() => {
        useOfflineStore.getState().addQueuedOrder(order)
        useOfflineStore.getState().setLastSyncError('ORD-001', 'Failed to sync')
      })

      const { queuedOrders } = useOfflineStore.getState()
      expect(queuedOrders[0].lastSyncError).toBe('Failed to sync')
    })
  })

  describe('sync state', () => {
    it('should have isSyncing as false by default', () => {
      const { isSyncing } = useOfflineStore.getState()
      expect(isSyncing).toBe(false)
    })

    it('should set isSyncing to true', () => {
      act(() => {
        useOfflineStore.getState().setIsSyncing(true)
      })

      const { isSyncing } = useOfflineStore.getState()
      expect(isSyncing).toBe(true)
    })

    it('should set isSyncing to false', () => {
      act(() => {
        useOfflineStore.getState().setIsSyncing(true)
        useOfflineStore.getState().setIsSyncing(false)
      })

      const { isSyncing } = useOfflineStore.getState()
      expect(isSyncing).toBe(false)
    })

    it('should have syncError as undefined by default', () => {
      const { syncError } = useOfflineStore.getState()
      expect(syncError).toBeUndefined()
    })

    it('should set sync error', () => {
      act(() => {
        useOfflineStore.getState().setSyncError('Sync failed')
      })

      const { syncError } = useOfflineStore.getState()
      expect(syncError).toBe('Sync failed')
    })

    it('should clear sync error', () => {
      act(() => {
        useOfflineStore.getState().setSyncError('Sync failed')
        useOfflineStore.getState().setSyncError(undefined)
      })

      const { syncError } = useOfflineStore.getState()
      expect(syncError).toBeUndefined()
    })
  })
})