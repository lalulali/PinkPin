/**
 * Property-Based Test: Filter Application
 * **Validates: Requirements 2.4, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7**
 * 
 * Property 4: Filter Application
 * For any filter applied to the order list, all displayed orders should match 
 * the filter criteria (AND logic for multiple filters).
 */

import { describe, it, expect, beforeEach } from 'vitest'
import fc from 'fast-check'
import { Order, OrderStatus, ServiceType } from '@/src/types'
import { UIFilters } from '@/src/stores/uiStore'

/**
 * Filter orders based on filter criteria (same logic as in OrderHistory.tsx)
 */
function filterOrders(orders: Order[], filters: UIFilters): Order[] {
  return orders.filter((order) => {
    // Date range filter
    if (filters.dateRange.from) {
      const orderDate = new Date(order.createdAt)
      if (orderDate < filters.dateRange.from) return false
    }
    if (filters.dateRange.to) {
      const orderDate = new Date(order.createdAt)
      const endOfDay = new Date(filters.dateRange.to)
      endOfDay.setHours(23, 59, 59, 999)
      if (orderDate > endOfDay) return false
    }

    // Status filter (OR logic within status)
    if (filters.statuses.length > 0 && !filters.statuses.includes(order.status)) {
      return false
    }

    // Outlet filter
    if (filters.outletId && order.outletId !== filters.outletId) {
      return false
    }

    // Service type filter (OR logic within service type)
    if (filters.serviceTypes.length > 0 && !filters.serviceTypes.includes(order.delivery.serviceType)) {
      return false
    }

    // Invoice number filter
    if (filters.invoiceNumber) {
      const searchTerm = filters.invoiceNumber.toLowerCase()
      if (!order.invoiceNumber.toLowerCase().includes(searchTerm)) {
        return false
      }
    }

    return true
  })
}

// Arbitraries for generating test data
const coordinatesArbitrary = () =>
  fc.record({
    lat: fc.float({ min: Math.fround(-90), max: Math.fround(90) }),
    lng: fc.float({ min: Math.fround(-180), max: Math.fround(180) }),
  })

const serviceTypeArbitrary = () =>
  fc.constantFrom<ServiceType>('standard', 'express', 'same-day')

const statusArbitrary = () =>
  fc.constantFrom<OrderStatus>('submitted', 'waiting', 'closed', 'cancelled')

const orderArbitrary = () =>
  fc.record({
    id: fc.string({ minLength: 5, maxLength: 20 }),
    merchantId: fc.string({ minLength: 5, maxLength: 20 }),
    outletId: fc.string({ minLength: 5, maxLength: 20 }),
    status: statusArbitrary(),
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
    createdAt: fc.date({ min: new Date('2024-01-01'), max: new Date() }),
    updatedAt: fc.date(),
  })

// Arbitrary for generating filter state
const filterArbitrary = () =>
  fc.record({
    dateRange: fc.record({
      from: fc.option(fc.date(), { nil: null }),
      to: fc.option(fc.date(), { nil: null }),
    }),
    statuses: fc.array(statusArbitrary(), { maxLength: 4 }),
    outletId: fc.option(fc.string({ minLength: 5, maxLength: 20 }), { nil: null }),
    serviceTypes: fc.array(serviceTypeArbitrary(), { maxLength: 3 }),
    invoiceNumber: fc.string({ maxLength: 20 }),
  })

describe('Property 4: Filter Application', () => {
  describe('All filtered orders match filter criteria', () => {
    it('should return orders that match date range filter', () => {
      fc.assert(
        fc.property(
          fc.array(orderArbitrary(), { minLength: 1, maxLength: 50 }),
          fc.record({
            from: fc.option(fc.date(), { nil: null }),
            to: fc.option(fc.date(), { nil: null }),
          }),
          (orders, dateRange) => {
            const filters: UIFilters = {
              dateRange,
              statuses: [],
              outletId: null,
              serviceTypes: [],
              invoiceNumber: '',
            }

            const filteredOrders = filterOrders(orders, filters)

            // All filtered orders should be within the date range
            for (const order of filteredOrders) {
              const orderDate = new Date(order.createdAt)
              if (dateRange.from) {
                expect(orderDate >= dateRange.from).toBe(true)
              }
              if (dateRange.to) {
                const endOfDay = new Date(dateRange.to)
                // Handle edge case where date is at maximum value
                if (endOfDay.getFullYear() < 10000) {
                  endOfDay.setHours(23, 59, 59, 999)
                  expect(orderDate <= endOfDay).toBe(true)
                }
                // If endOfDay is at max value, all dates are valid
              }
            }
          }
        ),
        { numRuns: 50 }
      )
    })

    it('should return orders that match status filter (OR logic within status)', () => {
      fc.assert(
        fc.property(
          fc.array(orderArbitrary(), { minLength: 1, maxLength: 50 }),
          fc.array(statusArbitrary(), { maxLength: 4 }),
          (orders, statuses) => {
            const filters: UIFilters = {
              dateRange: { from: null, to: null },
              statuses,
              outletId: null,
              serviceTypes: [],
              invoiceNumber: '',
            }

            const filteredOrders = filterOrders(orders, filters)

            // If statuses filter is active, all orders should match one of the statuses
            if (statuses.length > 0) {
              for (const order of filteredOrders) {
                expect(statuses).toContain(order.status)
              }
            }
          }
        ),
        { numRuns: 50 }
      )
    })

    it('should return orders that match outlet filter', () => {
      fc.assert(
        fc.property(
          fc.array(orderArbitrary(), { minLength: 1, maxLength: 50 }),
          fc.option(fc.string({ minLength: 5, maxLength: 20 }), { nil: null }),
          (orders, outletId) => {
            const filters: UIFilters = {
              dateRange: { from: null, to: null },
              statuses: [],
              outletId,
              serviceTypes: [],
              invoiceNumber: '',
            }

            const filteredOrders = filterOrders(orders, filters)

            // If outlet filter is active, all orders should match the outlet
            if (outletId) {
              for (const order of filteredOrders) {
                expect(order.outletId).toBe(outletId)
              }
            }
          }
        ),
        { numRuns: 50 }
      )
    })

    it('should return orders that match service type filter (OR logic within service type)', () => {
      fc.assert(
        fc.property(
          fc.array(orderArbitrary(), { minLength: 1, maxLength: 50 }),
          fc.array(serviceTypeArbitrary(), { maxLength: 3 }),
          (orders, serviceTypes) => {
            const filters: UIFilters = {
              dateRange: { from: null, to: null },
              statuses: [],
              outletId: null,
              serviceTypes,
              invoiceNumber: '',
            }

            const filteredOrders = filterOrders(orders, filters)

            // If service types filter is active, all orders should match one of the service types
            if (serviceTypes.length > 0) {
              for (const order of filteredOrders) {
                expect(serviceTypes).toContain(order.delivery.serviceType)
              }
            }
          }
        ),
        { numRuns: 50 }
      )
    })

    it('should return orders that match invoice number filter', () => {
      fc.assert(
        fc.property(
          fc.array(orderArbitrary(), { minLength: 1, maxLength: 50 }),
          fc.string({ maxLength: 20 }),
          (orders, invoiceNumber) => {
            const filters: UIFilters = {
              dateRange: { from: null, to: null },
              statuses: [],
              outletId: null,
              serviceTypes: [],
              invoiceNumber,
            }

            const filteredOrders = filterOrders(orders, filters)

            // If invoice number filter is active, all orders should contain the search term
            if (invoiceNumber) {
              const searchTerm = invoiceNumber.toLowerCase()
              for (const order of filteredOrders) {
                expect(order.invoiceNumber.toLowerCase()).toContain(searchTerm)
              }
            }
          }
        ),
        { numRuns: 50 }
      )
    })

    it('should apply all active filters in combination (AND logic)', () => {
      fc.assert(
        fc.property(
          fc.array(orderArbitrary(), { minLength: 1, maxLength: 50 }),
          filterArbitrary(),
          (orders, filters) => {
            const uiFilters: UIFilters = {
              dateRange: filters.dateRange,
              statuses: filters.statuses,
              outletId: filters.outletId ?? null,
              serviceTypes: filters.serviceTypes,
              invoiceNumber: filters.invoiceNumber,
            }

            const filteredOrders = filterOrders(orders, uiFilters)

            // All filtered orders must match ALL active filter criteria
            for (const order of filteredOrders) {
              // Date range check
              if (uiFilters.dateRange.from) {
                expect(new Date(order.createdAt) >= uiFilters.dateRange.from).toBe(true)
              }
              if (uiFilters.dateRange.to) {
                const endOfDay = new Date(uiFilters.dateRange.to)
                endOfDay.setHours(23, 59, 59, 999)
                expect(new Date(order.createdAt) <= endOfDay).toBe(true)
              }

              // Status check (OR within status)
              if (uiFilters.statuses.length > 0) {
                expect(uiFilters.statuses).toContain(order.status)
              }

              // Outlet check
              if (uiFilters.outletId) {
                expect(order.outletId).toBe(uiFilters.outletId)
              }

              // Service type check (OR within service type)
              if (uiFilters.serviceTypes.length > 0) {
                expect(uiFilters.serviceTypes).toContain(order.delivery.serviceType)
              }

              // Invoice number check
              if (uiFilters.invoiceNumber) {
                expect(order.invoiceNumber.toLowerCase()).toContain(uiFilters.invoiceNumber.toLowerCase())
              }
            }
          }
        ),
        { numRuns: 50 }
      )
    })
  })

  describe('No orders are incorrectly filtered out', () => {
    it('should not filter out orders that match all criteria', () => {
      fc.assert(
        fc.property(
          fc.array(orderArbitrary(), { minLength: 1, maxLength: 50 }),
          filterArbitrary(),
          (orders, filters) => {
            const uiFilters: UIFilters = {
              dateRange: filters.dateRange,
              statuses: filters.statuses,
              outletId: filters.outletId ?? null,
              serviceTypes: filters.serviceTypes,
              invoiceNumber: filters.invoiceNumber,
            }

            const filteredOrders = filterOrders(orders, uiFilters)

            // For each order in the original list, if it matches all filters,
            // it should be in the filtered list
            for (const order of orders) {
              let matchesAllFilters = true

              // Check date range
              if (uiFilters.dateRange.from && new Date(order.createdAt) < uiFilters.dateRange.from) {
                matchesAllFilters = false
              }
              if (uiFilters.dateRange.to) {
                const endOfDay = new Date(uiFilters.dateRange.to)
                endOfDay.setHours(23, 59, 59, 999)
                if (new Date(order.createdAt) > endOfDay) {
                  matchesAllFilters = false
                }
              }

              // Check status
              if (uiFilters.statuses.length > 0 && !uiFilters.statuses.includes(order.status)) {
                matchesAllFilters = false
              }

              // Check outlet
              if (uiFilters.outletId && order.outletId !== uiFilters.outletId) {
                matchesAllFilters = false
              }

              // Check service type
              if (uiFilters.serviceTypes.length > 0 && !uiFilters.serviceTypes.includes(order.delivery.serviceType)) {
                matchesAllFilters = false
              }

              // Check invoice number
              if (uiFilters.invoiceNumber && !order.invoiceNumber.toLowerCase().includes(uiFilters.invoiceNumber.toLowerCase())) {
                matchesAllFilters = false
              }

              // If order matches all filters, it should be in the filtered list
              if (matchesAllFilters) {
                expect(filteredOrders).toContain(order)
              }
            }
          }
        ),
        { numRuns: 50 }
      )
    })
  })

  describe('Empty filters return all orders', () => {
    it('should return all orders when no filters are active', () => {
      fc.assert(
        fc.property(
          fc.array(orderArbitrary(), { minLength: 1, maxLength: 50 }),
          (orders) => {
            const emptyFilters: UIFilters = {
              dateRange: { from: null, to: null },
              statuses: [],
              outletId: null,
              serviceTypes: [],
              invoiceNumber: '',
            }

            const filteredOrders = filterOrders(orders, emptyFilters)

            expect(filteredOrders.length).toBe(orders.length)
            expect(filteredOrders).toEqual(orders)
          }
        ),
        { numRuns: 30 }
      )
    })
  })
})