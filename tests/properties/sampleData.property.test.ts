/**
 * Property-based tests for Sample Data Initialization
 * Feature: pink-pin-merchant-app, Property 1: Sample Data Initialization
 * Validates: Requirements 1.1, 1.2, 1.3
 */

import { describe, it, expect, beforeEach } from 'vitest'
import fc from 'fast-check'
import { initializeSampleData, generateSampleOrders, generateSampleMerchants, generateSampleOutlets } from '@/services/sampleData'

describe('Sample Data Initialization Property Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('Property 1: Sample Data Initialization', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constant(null), async () => {
        // Clear localStorage to simulate first app load
        localStorage.clear()
        
        // Initialize sample data
        initializeSampleData()
        
        // Verify orders were created
        const ordersData = localStorage.getItem('pink_pin_orders')
        expect(ordersData).not.toBeNull()
        
        const orders = JSON.parse(ordersData!)
        expect(orders).toBeInstanceOf(Array)
        expect(orders.length).toBeGreaterThanOrEqual(10)
        expect(orders.length).toBeLessThanOrEqual(15)
        
        // Verify merchants were created
        const merchantsData = localStorage.getItem('pink_pin_merchants')
        expect(merchantsData).not.toBeNull()
        
        const merchants = JSON.parse(merchantsData!)
        expect(merchants).toBeInstanceOf(Array)
        expect(merchants.length).toBeGreaterThan(0)
        
        // Verify outlets were created
        const outletsData = localStorage.getItem('pink_pin_outlets')
        expect(outletsData).not.toBeNull()
        
        const outlets = JSON.parse(outletsData!)
        expect(outlets).toBeInstanceOf(Array)
        expect(outlets.length).toBeGreaterThan(0)
        
        // Verify orders have various statuses
        const statuses = new Set(orders.map((order: any) => order.status))
        expect(statuses.size).toBeGreaterThan(1) // Should have multiple statuses
        
        // Verify orders have various service types
        const serviceTypes = new Set(orders.map((order: any) => order.delivery.serviceType))
        expect(serviceTypes.size).toBeGreaterThan(1) // Should have multiple service types
        
        // Verify orders span multiple dates (last 30 days)
        const now = new Date()
        const thirtyDaysAgo = new Date(now)
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        
        const orderDates = orders.map((order: any) => new Date(order.createdAt))
        const hasRecentOrders = orderDates.some(date => date >= thirtyDaysAgo)
        const hasOlderOrders = orderDates.some(date => date < now)
        
        expect(hasRecentOrders).toBe(true)
        expect(hasOlderOrders).toBe(true)
        
        // Verify initialization flag is set
        const initFlag = localStorage.getItem('pink_pin_sample_data_initialized')
        expect(initFlag).toBe('true')
        
        // Verify second initialization doesn't duplicate data
        const originalOrdersLength = orders.length
        initializeSampleData() // Call again
        
        const ordersDataAfterSecondInit = localStorage.getItem('pink_pin_orders')
        const ordersAfterSecondInit = JSON.parse(ordersDataAfterSecondInit!)
        expect(ordersAfterSecondInit.length).toBe(originalOrdersLength)
      }),
      { numRuns: 10 }
    )
  })

  it('Sample orders have realistic data structure', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const orders = generateSampleOrders()
        
        expect(orders.length).toBeGreaterThanOrEqual(10)
        expect(orders.length).toBeLessThanOrEqual(15)
        
        orders.forEach(order => {
          // Verify required fields exist
          expect(order.id).toBeDefined()
          expect(order.merchantId).toBeDefined()
          expect(order.outletId).toBeDefined()
          expect(order.status).toBeDefined()
          expect(order.statusDisplay).toBeDefined()
          expect(order.invoiceNumber).toBeDefined()
          
          // Verify recipient data
          expect(order.recipient.name).toBeDefined()
          expect(order.recipient.phone).toBeDefined()
          expect(order.recipient.email).toBeDefined()
          expect(order.recipient.address).toBeDefined()
          expect(order.recipient.coordinates.lat).toBeTypeOf('number')
          expect(order.recipient.coordinates.lng).toBeTypeOf('number')
          
          // Verify items array
          expect(order.items).toBeInstanceOf(Array)
          expect(order.items.length).toBeGreaterThan(0)
          
          // Verify package details
          expect(order.package.weight).toBeTypeOf('number')
          expect(order.package.dimensions.length).toBeTypeOf('number')
          expect(order.package.dimensions.width).toBeTypeOf('number')
          expect(order.package.dimensions.height).toBeTypeOf('number')
          expect(order.package.isFragile).toBeTypeOf('boolean')
          
          // Verify delivery details
          expect(['standard', 'express', 'same-day']).toContain(order.delivery.serviceType)
          expect(order.delivery.distance).toBeTypeOf('number')
          expect(order.delivery.distance).toBeGreaterThan(0)
          expect(order.delivery.distance).toBeLessThanOrEqual(3)
          expect(order.delivery.shippingFee).toBeTypeOf('number')
          expect(order.delivery.baseFee).toBeTypeOf('number')
          expect(order.delivery.rate).toBeTypeOf('number')
          
          // Verify dates
          expect(order.createdAt).toBeInstanceOf(Date)
          expect(order.updatedAt).toBeInstanceOf(Date)
        })
      }),
      { numRuns: 5 }
    )
  })

  it('Sample merchants have valid structure', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const merchants = generateSampleMerchants()
        
        expect(merchants.length).toBeGreaterThan(0)
        
        merchants.forEach(merchant => {
          expect(merchant.id).toBeDefined()
          expect(merchant.email).toBeDefined()
          expect(merchant.name).toBeDefined()
          expect(merchant.outlets).toBeInstanceOf(Array)
          expect(merchant.createdAt).toBeInstanceOf(Date)
        })
      }),
      { numRuns: 5 }
    )
  })

  it('Sample outlets have valid structure', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const outlets = generateSampleOutlets()
        
        expect(outlets.length).toBeGreaterThan(0)
        
        outlets.forEach(outlet => {
          expect(outlet.id).toBeDefined()
          expect(outlet.merchantId).toBeDefined()
          expect(outlet.name).toBeDefined()
          expect(outlet.address).toBeDefined()
          expect(outlet.coordinates.lat).toBeTypeOf('number')
          expect(outlet.coordinates.lng).toBeTypeOf('number')
          expect(outlet.createdAt).toBeInstanceOf(Date)
        })
      }),
      { numRuns: 5 }
    )
  })
})