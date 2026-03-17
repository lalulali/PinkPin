/**
 * Property-Based Test: Offline Order Creation
 * Validates: Requirements 9.15, 14.2, 14.3
 * 
 * Property 23: Offline Order Creation
 * For any order created while offline, the order should be queued and synced to storage when connectivity is restored.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fc from 'fast-check'
import { Order, ServiceType } from '@/src/types'
import {
  queueOrderForSync,
  clearOfflineQueue,
  getQueuedOrdersCount,
} from '@/src/services/offlineService'
import { useOfflineStore } from '@/src/stores/offlineStore'

// Simplified arbitraries for generating test data
const coordinatesArbitrary = () =>
  fc.record({
    lat: fc.float({ min: Math.fround(-90), max: Math.fround(90) }),
    lng: fc.float({ min: Math.fround(-180), max: Math.fround(180) }),
  })

const serviceTypeArbitrary = () =>
  fc.constantFrom<ServiceType>('standard', 'express', 'same-day')

const orderArbitrary = () =>
  fc.record({
    id: fc.string({ minLength: 5, maxLength: 20 }),
    merchantId: fc.string({ minLength: 5, maxLength: 20 }),
    outletId: fc.string({ minLength: 5, maxLength: 20 }),
    status: fc.constantFrom('submitted', 'waiting', 'closed', 'cancelled'),
    statusDisplay: fc.constantFrom(
      'Shipment Created',
      'Waiting for Pick Up',
      'Delivery Completed',
      'Shipment Cancelled'
    ),
    invoiceNumber: fc.string({ minLength: 5, maxLength: 20 }),
    recipient: fc.record({
      name: fc.string({ minLength: 2, maxLength: 50 }),
      phone: fc.string({ minLength: 10, maxLength: 15 }),
      email: fc.emailAddress(),
      address: fc.string({ minLength: 5, maxLength: 100 }),
      coordinates: coordinatesArbitrary(),
    }),
    items: fc.array(
      fc.record({
        id: fc.string({ minLength: 5, maxLength: 20 }),
        description: fc.string({ minLength: 1, maxLength: 100 }),
        quantity: fc.integer({ min: 1, max: 100 }),
      }),
      { minLength: 1, maxLength: 5 }
    ),
    package: fc.record({
      weight: fc.float({ min: Math.fround(0.1), max: Math.fround(100) }),
      dimensions: fc.record({
        length: fc.float({ min: Math.fround(1), max: Math.fround(100) }),
        width: fc.float({ min: Math.fround(1), max: Math.fround(100) }),
        height: fc.float({ min: Math.fround(1), max: Math.fround(100) }),
      }),
      isFragile: fc.boolean(),
    }),
    delivery: fc.record({
      serviceType: serviceTypeArbitrary(),
      distance: fc.float({ min: Math.fround(0), max: Math.fround(3) }),
      shippingFee: fc.integer({ min: 10000, max: 100000 }),
      baseFee: fc.integer({ min: 10000, max: 30000 }),
      rate: fc.integer({ min: 5000, max: 10000 }),
    }),
    createdAt: fc.date(),
    updatedAt: fc.date(),
  })

describe('Property 23: Offline Order Creation', () => {
  beforeEach(() => {
    clearOfflineQueue()
    localStorage.clear()
  })

  afterEach(() => {
    clearOfflineQueue()
    localStorage.clear()
  })

  it('should queue orders when offline', () => {
    fc.assert(
      fc.property(orderArbitrary(), (order) => {
        clearOfflineQueue()
        localStorage.clear()
        useOfflineStore.setState({
          isOnline: false,
          queuedOrders: [],
          isSyncing: false,
          syncError: undefined,
        })

        queueOrderForSync(order)
        expect(getQueuedOrdersCount()).toBeGreaterThan(0)
        const queuedOrders = useOfflineStore.getState().getQueuedOrders()
        expect(queuedOrders.some(q => q.id === order.id)).toBe(true)
      }),
      { numRuns: 30 }
    )
  })

  it('should persist queued orders to localStorage', () => {
    fc.assert(
      fc.property(orderArbitrary(), (order) => {
        clearOfflineQueue()
        localStorage.clear()
        useOfflineStore.setState({ queuedOrders: [] })

        queueOrderForSync(order)
        const stored = localStorage.getItem('pink_pin_offline_queue')
        expect(stored).toBeDefined()
        const queuedOrders = JSON.parse(stored!)
        expect(queuedOrders.some((q: Order) => q.id === order.id)).toBe(true)
      }),
      { numRuns: 30 }
    )
  })

  it('should increment sync attempts', () => {
    fc.assert(
      fc.property(orderArbitrary(), (order) => {
        clearOfflineQueue()
        localStorage.clear()
        useOfflineStore.setState({ queuedOrders: [] })

        queueOrderForSync(order)
        useOfflineStore.getState().incrementSyncAttempts(order.id)
        useOfflineStore.getState().incrementSyncAttempts(order.id)
        const queuedOrder = useOfflineStore.getState().getQueuedOrders().find(q => q.id === order.id)
        expect(queuedOrder?.syncAttempts).toBe(2)
      }),
      { numRuns: 30 }
    )
  })

  it('should clear offline queue', () => {
    fc.assert(
      fc.property(fc.array(orderArbitrary(), { minLength: 1, maxLength: 3 }), (orders) => {
        clearOfflineQueue()
        localStorage.clear()
        useOfflineStore.setState({ queuedOrders: [] })

        orders.forEach((order) => {
          queueOrderForSync(order)
        })
        expect(getQueuedOrdersCount()).toBeGreaterThan(0)
        clearOfflineQueue()
        expect(getQueuedOrdersCount()).toBe(0)
        expect(localStorage.getItem('pink_pin_offline_queue')).toBeNull()
      }),
      { numRuns: 30 }
    )
  })
})
