/**
 * Integration tests for app initialization
 * Tests the complete flow from sample data generation to storage adapter integration
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { initializationService } from '@/services/initializationService'
import { getStorageAdapter } from '@/services/storage'
import { resetSampleData } from '@/services/sampleData'

describe('App Initialization Integration Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    resetSampleData()
  })

  it('should initialize app with sample data and verify storage adapter integration', async () => {
    // Verify app is not initialized initially
    expect(initializationService.isInitialized()).toBe(false)

    // Initialize the app
    await initializationService.initialize()

    // Verify initialization status
    expect(initializationService.isInitialized()).toBe(true)

    // Verify storage adapter can retrieve data
    const storageAdapter = getStorageAdapter()
    
    const orders = await storageAdapter.getOrders()
    expect(orders).toHaveLength(15)
    
    const merchant = await storageAdapter.getMerchant('MERCHANT-001')
    expect(merchant).not.toBeNull()
    expect(merchant!.email).toBe('demo@pinkpin.com')
    
    const outlets = await storageAdapter.getOutlets()
    expect(outlets).toHaveLength(2)
    expect(outlets[0].name).toBe('Jakarta Main Outlet')
    expect(outlets[1].name).toBe('Jakarta South Outlet')

    // Verify orders have the required variety
    const statuses = new Set(orders.map(order => order.status))
    expect(statuses.size).toBeGreaterThanOrEqual(2)
    
    const serviceTypes = new Set(orders.map(order => order.delivery.serviceType))
    expect(serviceTypes.size).toBeGreaterThanOrEqual(2)

    // Verify orders span multiple dates
    const now = new Date()
    const thirtyDaysAgo = new Date(now)
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const orderDates = orders.map(order => new Date(order.createdAt))
    const hasRecentOrders = orderDates.some(date => date >= thirtyDaysAgo)
    const hasVariedDates = orderDates.some(date => date < now)
    
    expect(hasRecentOrders).toBe(true)
    expect(hasVariedDates).toBe(true)

    // Verify some orders use different outlets
    const outletIds = new Set(orders.map(order => order.outletId))
    expect(outletIds.size).toBeGreaterThan(1)

    // Verify orders have multiple items (some orders should have more than 1 item)
    const hasMultiItemOrders = orders.some(order => order.items.length > 1)
    expect(hasMultiItemOrders).toBe(true)
  })

  it('should not reinitialize data if already initialized', async () => {
    // Initialize once
    await initializationService.initialize()
    const storageAdapter = getStorageAdapter()
    const initialOrders = await storageAdapter.getOrders()
    const initialOrderCount = initialOrders.length

    // Initialize again
    await initializationService.initialize()
    const ordersAfterSecondInit = await storageAdapter.getOrders()
    
    // Should have the same number of orders (no duplication)
    expect(ordersAfterSecondInit).toHaveLength(initialOrderCount)
  })

  it('should handle storage adapter operations correctly', async () => {
    await initializationService.initialize()
    const storageAdapter = getStorageAdapter()

    // Test creating a new order
    const newOrder = {
      id: 'TEST-ORDER-001',
      merchantId: 'MERCHANT-001',
      outletId: 'OUTLET-001',
      status: 'submitted' as const,
      statusDisplay: 'Shipment Created' as const,
      invoiceNumber: 'INV-TEST-001',
      recipient: {
        name: 'Test User',
        phone: '+62812345999',
        email: 'test@example.com',
        address: 'Test Address',
        coordinates: { lat: -6.2088, lng: 106.8456 }
      },
      items: [{ id: 'ITEM-TEST-1', description: 'Test Item', quantity: 1 }],
      package: {
        weight: 1,
        dimensions: { length: 10, width: 10, height: 10 },
        isFragile: false
      },
      delivery: {
        serviceType: 'standard' as const,
        distance: 1.5,
        shippingFee: 17500,
        baseFee: 10000,
        rate: 5000
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const createdOrder = await storageAdapter.createOrder(newOrder)
    expect(createdOrder.id).toBe('TEST-ORDER-001')

    // Test retrieving the order
    const retrievedOrder = await storageAdapter.getOrderById('TEST-ORDER-001')
    expect(retrievedOrder).not.toBeNull()
    expect(retrievedOrder!.recipient.name).toBe('Test User')

    // Test updating the order
    const updatedOrder = await storageAdapter.updateOrder('TEST-ORDER-001', { status: 'closed' })
    expect(updatedOrder.status).toBe('closed')

    // Test deleting the order
    await storageAdapter.deleteOrder('TEST-ORDER-001')
    const deletedOrder = await storageAdapter.getOrderById('TEST-ORDER-001')
    expect(deletedOrder).toBeNull()
  })
})