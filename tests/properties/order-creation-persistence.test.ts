/**
 * Property-Based Test: Order Creation Persistence
 * **Validates: Requirements 9.12**
 * 
 * Property 10: Order Creation Persistence
 * For any order created and confirmed, the order should be saved to storage 
 * and retrievable with the same data.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import * as fc from 'fast-check'
import { LocalStorageAdapter } from '@/src/services/storage/LocalStorageAdapter'
import { Order } from '@/src/types'

describe('Property 10: Order Creation Persistence', () => {
  let adapter: LocalStorageAdapter

  beforeEach(() => {
    // Create a new adapter for each test
    adapter = new LocalStorageAdapter()
  })

  it('should persist and retrieve orders with identical data', async () => {
    // Generate arbitrary orders using fast-check
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          id: fc.string({ minLength: 5, maxLength: 20 }),
          merchantId: fc.string({ minLength: 5, maxLength: 20 }),
          outletId: fc.string({ minLength: 5, maxLength: 20 }),
          status: fc.constantFrom('submitted', 'waiting', 'closed', 'cancelled'),
          invoiceNumber: fc.string({ minLength: 5, maxLength: 20 }),
          recipientName: fc.string({ minLength: 1, maxLength: 50 }),
          recipientPhone: fc.string({ minLength: 10, maxLength: 15 }),
          recipientEmail: fc.emailAddress(),
          recipientAddress: fc.string({ minLength: 5, maxLength: 100 }),
          lat: fc.integer({ min: -90, max: 90 }),
          lng: fc.integer({ min: -180, max: 180 }),
          itemCount: fc.integer({ min: 1, max: 10 }),
          weight: fc.integer({ min: 1, max: 100 }),
          length: fc.integer({ min: 1, max: 100 }),
          width: fc.integer({ min: 1, max: 100 }),
          height: fc.integer({ min: 1, max: 100 }),
          isFragile: fc.boolean(),
          serviceType: fc.constantFrom('standard', 'express', 'same-day'),
          distance: fc.integer({ min: 1, max: 30 }).map(d => d / 10),
          shippingFee: fc.integer({ min: 10000, max: 100000 }),
          baseFee: fc.integer({ min: 10000, max: 30000 }),
          rate: fc.integer({ min: 5000, max: 10000 }),
        }),
        async (data) => {
          // Clear localStorage for this test run
          localStorage.clear()
          const testAdapter = new LocalStorageAdapter()

          // Create order object
          const order: Order = {
            id: data.id,
            merchantId: data.merchantId,
            outletId: data.outletId,
            status: data.status as 'submitted' | 'waiting' | 'closed' | 'cancelled',
            statusDisplay: 'Shipment Created',
            invoiceNumber: data.invoiceNumber,
            recipient: {
              name: data.recipientName,
              phone: data.recipientPhone,
              email: data.recipientEmail,
              address: data.recipientAddress,
              coordinates: { lat: data.lat, lng: data.lng },
            },
            items: [
              {
                id: 'item-1',
                description: 'Test Item',
                quantity: data.itemCount,
              },
            ],
            package: {
              weight: data.weight,
              dimensions: {
                length: data.length,
                width: data.width,
                height: data.height,
              },
              isFragile: data.isFragile,
            },
            delivery: {
              serviceType: data.serviceType as 'standard' | 'express' | 'same-day',
              distance: data.distance,
              shippingFee: data.shippingFee,
              baseFee: data.baseFee,
              rate: data.rate,
            },
            createdAt: new Date(),
            updatedAt: new Date(),
          }

          // Create order
          await testAdapter.createOrder(order)

          // Retrieve order
          const retrievedOrder = await testAdapter.getOrderById(order.id)

          // Verify order exists
          expect(retrievedOrder).not.toBeNull()

          // Verify all fields match
          expect(retrievedOrder?.id).toBe(order.id)
          expect(retrievedOrder?.merchantId).toBe(order.merchantId)
          expect(retrievedOrder?.outletId).toBe(order.outletId)
          expect(retrievedOrder?.status).toBe(order.status)
          expect(retrievedOrder?.invoiceNumber).toBe(order.invoiceNumber)

          // Verify recipient data
          expect(retrievedOrder?.recipient.name).toBe(order.recipient.name)
          expect(retrievedOrder?.recipient.phone).toBe(order.recipient.phone)
          expect(retrievedOrder?.recipient.email).toBe(order.recipient.email)
          expect(retrievedOrder?.recipient.address).toBe(order.recipient.address)

          // Verify items
          expect(retrievedOrder?.items.length).toBe(order.items.length)
          expect(retrievedOrder?.items[0].description).toBe(order.items[0].description)
          expect(retrievedOrder?.items[0].quantity).toBe(order.items[0].quantity)

          // Verify package data
          expect(retrievedOrder?.package.weight).toBe(order.package.weight)
          expect(retrievedOrder?.package.dimensions.length).toBe(
            order.package.dimensions.length
          )
          expect(retrievedOrder?.package.dimensions.width).toBe(
            order.package.dimensions.width
          )
          expect(retrievedOrder?.package.dimensions.height).toBe(
            order.package.dimensions.height
          )
          expect(retrievedOrder?.package.isFragile).toBe(order.package.isFragile)

          // Verify delivery data
          expect(retrievedOrder?.delivery.serviceType).toBe(order.delivery.serviceType)
          expect(retrievedOrder?.delivery.distance).toBe(order.delivery.distance)
          expect(retrievedOrder?.delivery.shippingFee).toBe(order.delivery.shippingFee)
          expect(retrievedOrder?.delivery.baseFee).toBe(order.delivery.baseFee)
          expect(retrievedOrder?.delivery.rate).toBe(order.delivery.rate)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should retrieve all created orders from storage', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            id: fc.string({ minLength: 5, maxLength: 20 }),
            merchantId: fc.constant('MERCHANT-001'),
            outletId: fc.constant('OUTLET-001'),
            status: fc.constantFrom('submitted', 'waiting', 'closed', 'cancelled'),
            invoiceNumber: fc.string({ minLength: 5, maxLength: 20 }),
            recipientName: fc.string({ minLength: 1, maxLength: 50 }),
            recipientPhone: fc.string({ minLength: 10, maxLength: 15 }),
            recipientEmail: fc.emailAddress(),
            recipientAddress: fc.string({ minLength: 5, maxLength: 100 }),
            lat: fc.integer({ min: -90, max: 90 }),
            lng: fc.integer({ min: -180, max: 180 }),
            itemCount: fc.integer({ min: 1, max: 10 }),
            weight: fc.integer({ min: 1, max: 100 }),
            length: fc.integer({ min: 1, max: 100 }),
            width: fc.integer({ min: 1, max: 100 }),
            height: fc.integer({ min: 1, max: 100 }),
            isFragile: fc.boolean(),
            serviceType: fc.constantFrom('standard', 'express', 'same-day'),
            distance: fc.integer({ min: 1, max: 30 }).map(d => d / 10),
            shippingFee: fc.integer({ min: 10000, max: 100000 }),
            baseFee: fc.integer({ min: 10000, max: 30000 }),
            rate: fc.integer({ min: 5000, max: 10000 }),
          }),
          { minLength: 1, maxLength: 5 }
        ),
        async (orderDataArray) => {
          // Clear localStorage for this test run
          localStorage.clear()
          const testAdapter = new LocalStorageAdapter()

          // Create multiple orders
          for (const data of orderDataArray) {
            const order: Order = {
              id: data.id,
              merchantId: data.merchantId,
              outletId: data.outletId,
              status: data.status as 'submitted' | 'waiting' | 'closed' | 'cancelled',
              statusDisplay: 'Shipment Created',
              invoiceNumber: data.invoiceNumber,
              recipient: {
                name: data.recipientName,
                phone: data.recipientPhone,
                email: data.recipientEmail,
                address: data.recipientAddress,
                coordinates: { lat: data.lat, lng: data.lng },
              },
              items: [
                {
                  id: 'item-1',
                  description: 'Test Item',
                  quantity: data.itemCount,
                },
              ],
              package: {
                weight: data.weight,
                dimensions: {
                  length: data.length,
                  width: data.width,
                  height: data.height,
                },
                isFragile: data.isFragile,
              },
              delivery: {
                serviceType: data.serviceType as 'standard' | 'express' | 'same-day',
                distance: data.distance,
                shippingFee: data.shippingFee,
                baseFee: data.baseFee,
                rate: data.rate,
              },
              createdAt: new Date(),
              updatedAt: new Date(),
            }

            await testAdapter.createOrder(order)
          }

          // Retrieve all orders
          const allOrders = await testAdapter.getOrders()

          // Verify all orders are retrieved
          expect(allOrders.length).toBe(orderDataArray.length)

          // Verify each order ID is present
          const retrievedIds = allOrders.map((o) => o.id)
          for (const data of orderDataArray) {
            expect(retrievedIds).toContain(data.id)
          }
        }
      ),
      { numRuns: 50 }
    )
  })
})
