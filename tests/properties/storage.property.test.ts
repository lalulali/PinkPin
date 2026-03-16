/**
 * Property-based tests for Storage Adapter
 * Feature: pink-pin-merchant-app, Property 2: Order Persistence Round Trip
 * Validates: Requirements 1.4, 1.5
 */

import { describe, it, expect, beforeEach } from 'vitest'
import fc from 'fast-check'
import { LocalStorageAdapter } from '@/services/storage/LocalStorageAdapter'
import type { Order, OrderStatus, ServiceType } from '@/types'

// Simple test data generators that avoid edge cases
const simpleOrderArb = fc.record({
  id: fc.string({ minLength: 5, maxLength: 15 }).map(s => `order-${s.replace(/[^a-zA-Z0-9]/g, 'x')}`),
  merchantId: fc.string({ minLength: 5, maxLength: 15 }).map(s => `merchant-${s.replace(/[^a-zA-Z0-9]/g, 'x')}`),
  outletId: fc.string({ minLength: 5, maxLength: 15 }).map(s => `outlet-${s.replace(/[^a-zA-Z0-9]/g, 'x')}`),
  status: fc.constantFrom<OrderStatus>('submitted', 'waiting', 'closed', 'cancelled'),
  statusDisplay: fc.constantFrom('Shipment Created', 'Waiting for Pick Up', 'Delivery Completed', 'Shipment Cancelled'),
  invoiceNumber: fc.string({ minLength: 5, maxLength: 15 }).map(s => `INV-${s.replace(/[^a-zA-Z0-9]/g, 'x')}`),
  recipient: fc.record({
    name: fc.string({ minLength: 2, maxLength: 50 }).map(s => s.replace(/[^a-zA-Z\s]/g, 'A')),
    phone: fc.string({ minLength: 10, maxLength: 15 }).map(s => s.replace(/[^0-9]/g, '1')),
    email: fc.emailAddress(),
    address: fc.string({ minLength: 5, maxLength: 100 }).map(s => s.replace(/[^a-zA-Z0-9\s]/g, 'A')),
    coordinates: fc.record({
      lat: fc.double({ min: -90, max: 90, noNaN: true }),
      lng: fc.double({ min: -180, max: 180, noNaN: true }),
    }),
  }),
  items: fc.array(fc.record({
    id: fc.string({ minLength: 5, maxLength: 15 }).map(s => `item-${s.replace(/[^a-zA-Z0-9]/g, 'x')}`),
    description: fc.string({ minLength: 2, maxLength: 50 }).map(s => s.replace(/[^a-zA-Z0-9\s]/g, 'A')),
    quantity: fc.integer({ min: 1, max: 10 }),
  }), { minLength: 1, maxLength: 5 }),
  package: fc.record({
    weight: fc.double({ min: 0.1, max: 50, noNaN: true }),
    dimensions: fc.record({
      length: fc.double({ min: 1, max: 100, noNaN: true }),
      width: fc.double({ min: 1, max: 100, noNaN: true }),
      height: fc.double({ min: 1, max: 100, noNaN: true }),
    }),
    isFragile: fc.boolean(),
  }),
  delivery: fc.record({
    serviceType: fc.constantFrom<ServiceType>('standard', 'express', 'same-day'),
    distance: fc.double({ min: 0.1, max: 3.0, noNaN: true }),
    shippingFee: fc.integer({ min: 10000, max: 50000 }),
    baseFee: fc.integer({ min: 10000, max: 30000 }),
    rate: fc.integer({ min: 5000, max: 10000 }),
  }),
  createdAt: fc.date({ min: new Date('2024-01-01'), max: new Date('2024-12-31') }),
  updatedAt: fc.date({ min: new Date('2024-01-01'), max: new Date('2024-12-31') }),
})

describe('Storage Adapter Property Tests', () => {
  let adapter: LocalStorageAdapter

  beforeEach(() => {
    localStorage.clear()
    adapter = new LocalStorageAdapter()
  })

  it('Property 2: Order Persistence Round Trip', async () => {
    await fc.assert(
      fc.asyncProperty(simpleOrderArb, async (originalOrder: Order) => {
        // Clear localStorage for each iteration to ensure clean state
        localStorage.clear()
        
        // Create the order
        const createdOrder = await adapter.createOrder(originalOrder)
        
        // Retrieve the order by ID
        const retrievedOrder = await adapter.getOrderById(originalOrder.id)
        
        // Verify the order was retrieved successfully
        expect(retrievedOrder).not.toBeNull()
        expect(retrievedOrder!.id).toBe(originalOrder.id)
        expect(retrievedOrder!.merchantId).toBe(originalOrder.merchantId)
        expect(retrievedOrder!.status).toBe(originalOrder.status)
        expect(retrievedOrder!.recipient.name).toBe(originalOrder.recipient.name)
        expect(retrievedOrder!.items).toHaveLength(originalOrder.items.length)
        
        // Test update round trip
        const updatedOrder = await adapter.updateOrder(originalOrder.id, { status: 'closed' })
        const retrievedUpdatedOrder = await adapter.getOrderById(originalOrder.id)
        
        expect(retrievedUpdatedOrder).not.toBeNull()
        expect(retrievedUpdatedOrder!.status).toBe('closed')
      }),
      { numRuns: 50 }
    )
  })
})