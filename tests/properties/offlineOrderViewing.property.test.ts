/**
 * Property-Based Test: Offline Order Viewing
 * Validates: Requirements 14.2
 * 
 * Property: Offline Order Viewing
 * For any orders loaded while online, the app should allow viewing them when offline
 * with cached data displayed with an "offline" badge.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fc from 'fast-check'
import { Order, ServiceType } from '@/src/types'
import { useOffline } from '@/src/hooks/useOffline'
import {
  cacheOrders,
  getCachedOrders,
  clearOrderCache,
  isCacheValid,
  getCacheAge,
} from '@/src/services/orderCacheService'
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

describe('Property: Offline Order Viewing', () => {
  beforeEach(() => {
    clearOrderCache()
    localStorage.clear()
    useOfflineStore.setState({
      isOnline: true,
      queuedOrders: [],
      isSyncing: false,
      syncError: undefined,
    })
  })

  afterEach(() => {
    clearOrderCache()
    localStorage.clear()
    useOfflineStore.setState({
      isOnline: true,
      queuedOrders: [],
      isSyncing: false,
      syncError: undefined,
    })
  })

  it('should cache orders for offline access', () => {
    fc.assert(
      fc.property(fc.array(orderArbitrary(), { minLength: 1, maxLength: 10 }), (orders) => {
        clearOrderCache()
        localStorage.clear()

        cacheOrders(orders)
        const cached = getCachedOrders()

        expect(cached).toBeDefined()
        expect(cached).toHaveLength(orders.length)

        // Verify all orders are cached
        orders.forEach((order) => {
          expect(cached?.some((c) => c.id === order.id)).toBe(true)
        })
      }),
      { numRuns: 30 }
    )
  })

  it('should return null when no cache exists', () => {
    clearOrderCache()
    localStorage.clear()

    const cached = getCachedOrders()
    expect(cached).toBeNull()
  })

  it('should validate cache is not valid when empty', () => {
    clearOrderCache()
    localStorage.clear()

    expect(isCacheValid()).toBe(false)
  })

  it('should validate cache is valid after caching orders', () => {
    fc.assert(
      fc.property(fc.array(orderArbitrary(), { minLength: 1, maxLength: 5 }), (orders) => {
        clearOrderCache()
        localStorage.clear()

        cacheOrders(orders)
        expect(isCacheValid()).toBe(true)
      }),
      { numRuns: 30 }
    )
  })

  it('should return valid cache age after caching', () => {
    fc.assert(
      fc.property(fc.array(orderArbitrary(), { minLength: 1, maxLength: 5 }), (orders) => {
        clearOrderCache()
        localStorage.clear()

        const beforeCache = Date.now()
        cacheOrders(orders)
        const afterCache = Date.now()

        const age = getCacheAge()
        expect(age).toBeDefined()
        expect(age).toBeGreaterThanOrEqual(0)
        expect(age).toBeLessThanOrEqual(afterCache - beforeCache + 100) // Allow some tolerance
      }),
      { numRuns: 30 }
    )
  })

  it('should clear order cache', () => {
    fc.assert(
      fc.property(fc.array(orderArbitrary(), { minLength: 1, maxLength: 5 }), (orders) => {
        clearOrderCache()
        localStorage.clear()

        cacheOrders(orders)
        expect(getCachedOrders()).toHaveLength(orders.length)

        clearOrderCache()
        expect(getCachedOrders()).toBeNull()
        expect(isCacheValid()).toBe(false)
      }),
      { numRuns: 30 }
    )
  })

  it('should preserve order data integrity in cache', () => {
    fc.assert(
      fc.property(orderArbitrary(), (order) => {
        clearOrderCache()
        localStorage.clear()

        // Skip if weight is NaN (edge case from fc.float)
        if (Number.isNaN(order.package.weight)) {
          return true
        }

        cacheOrders([order])
        const cached = getCachedOrders()

        expect(cached).toHaveLength(1)
        const cachedOrder = cached![0]

        // Verify all fields are preserved
        expect(cachedOrder.id).toBe(order.id)
        expect(cachedOrder.merchantId).toBe(order.merchantId)
        expect(cachedOrder.outletId).toBe(order.outletId)
        expect(cachedOrder.status).toBe(order.status)
        expect(cachedOrder.invoiceNumber).toBe(order.invoiceNumber)
        expect(cachedOrder.recipient.name).toBe(order.recipient.name)
        expect(cachedOrder.recipient.phone).toBe(order.recipient.phone)
        expect(cachedOrder.recipient.email).toBe(order.recipient.email)
        expect(cachedOrder.recipient.address).toBe(order.recipient.address)
        expect(cachedOrder.items).toHaveLength(order.items.length)
        // Use closeTo for floating point comparison
        expect(cachedOrder.package.weight).toBeCloseTo(order.package.weight, 10)
        expect(cachedOrder.delivery.distance).toBeCloseTo(order.delivery.distance, 10)
        expect(cachedOrder.delivery.shippingFee).toBe(order.delivery.shippingFee)
      }),
      { numRuns: 30 }
    )
  })

  it('should handle cache with multiple orders correctly', () => {
    fc.assert(
      fc.property(
        fc.array(orderArbitrary(), { minLength: 1, maxLength: 10 }),
        fc.array(orderArbitrary(), { minLength: 1, maxLength: 10 }),
        (orders1, orders2) => {
          clearOrderCache()
          localStorage.clear()

          // Cache first set
          cacheOrders(orders1)
          const firstCache = getCachedOrders()
          expect(firstCache).toHaveLength(orders1.length)

          // Cache second set (should replace, not append)
          cacheOrders(orders2)
          const secondCache = getCachedOrders()
          expect(secondCache).toHaveLength(orders2.length)

          // Verify second set is correct
          orders2.forEach((order) => {
            expect(secondCache?.some((c) => c.id === order.id)).toBe(true)
          })
        }
      ),
      { numRuns: 20 }
    )
  })
})

describe('Offline Store Integration', () => {
  beforeEach(() => {
    clearOrderCache()
    localStorage.clear()
    useOfflineStore.setState({
      isOnline: true,
      queuedOrders: [],
      isSyncing: false,
      syncError: undefined,
    })
  })

  afterEach(() => {
    clearOrderCache()
    localStorage.clear()
    useOfflineStore.setState({
      isOnline: true,
      queuedOrders: [],
      isSyncing: false,
      syncError: undefined,
    })
  })

  it('should track online status in store', () => {
    fc.assert(
      fc.property(fc.boolean(), (initialOnline) => {
        useOfflineStore.setState({ isOnline: initialOnline })
        expect(useOfflineStore.getState().isOnline).toBe(initialOnline)

        useOfflineStore.setState({ isOnline: !initialOnline })
        expect(useOfflineStore.getState().isOnline).toBe(!initialOnline)
      }),
      { numRuns: 10 }
    )
  })

  it('should manage queued orders in store', () => {
    fc.assert(
      fc.property(fc.array(orderArbitrary(), { minLength: 1, maxLength: 3 }), (orders) => {
        clearOrderCache()
        localStorage.clear()
        useOfflineStore.setState({ queuedOrders: [] })

        orders.forEach((order) => {
          useOfflineStore.getState().addQueuedOrder(order)
        })

        const queuedOrders = useOfflineStore.getState().getQueuedOrders()
        expect(queuedOrders).toHaveLength(orders.length)

        // Remove first order
        useOfflineStore.getState().removeQueuedOrder(orders[0].id)
        const afterRemove = useOfflineStore.getState().getQueuedOrders()
        expect(afterRemove).toHaveLength(orders.length - 1)
        expect(afterRemove.some((o) => o.id === orders[0].id)).toBe(false)
      }),
      { numRuns: 20 }
    )
  })
})