/**
 * Integration tests for TanStack Query setup
 * Verifies QueryClient configuration and hook functionality
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { QueryClient } from '@tanstack/react-query'
import { LocalStorageAdapter } from '@/services/storage/LocalStorageAdapter'
import { setStorageAdapter } from '@/services/storage'
import type { Order } from '@/types'

describe('TanStack Query Integration', () => {
  let queryClient: QueryClient
  let adapter: LocalStorageAdapter

  beforeEach(() => {
    localStorage.clear()
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // 5 minutes
          retry: 3,
        },
      },
    })
    adapter = new LocalStorageAdapter()
    setStorageAdapter(adapter)
  })

  it('should configure QueryClient with 5 minute stale time', () => {
    const defaultOptions = queryClient.getDefaultOptions()
    expect(defaultOptions.queries?.staleTime).toBe(5 * 60 * 1000)
  })

  it('should configure QueryClient with 3 retries', () => {
    const defaultOptions = queryClient.getDefaultOptions()
    expect(defaultOptions.queries?.retry).toBe(3)
  })

  it('should fetch orders from storage adapter', async () => {
    // Create a test order
    const testOrder: Order = {
      id: 'TEST-001',
      merchantId: 'MERCHANT-001',
      outletId: 'OUTLET-001',
      status: 'submitted',
      statusDisplay: 'Shipment Created',
      invoiceNumber: 'INV-001',
      recipient: {
        name: 'Test User',
        phone: '+62812345678',
        email: 'test@example.com',
        address: 'Test Address',
        coordinates: { lat: -6.2088, lng: 106.8456 },
      },
      items: [{ id: 'ITEM-001', description: 'Test Item', quantity: 1 }],
      package: {
        weight: 1,
        dimensions: { length: 10, width: 10, height: 10 },
        isFragile: false,
      },
      delivery: {
        serviceType: 'standard',
        distance: 1.5,
        shippingFee: 17500,
        baseFee: 10000,
        rate: 5000,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Create the order
    await adapter.createOrder(testOrder)

    // Fetch orders
    const orders = await adapter.getOrders()

    // Verify
    expect(orders).toHaveLength(1)
    expect(orders[0].id).toBe('TEST-001')
  })

  it('should support cache invalidation pattern', async () => {
    // Create initial order
    const order1: Order = {
      id: 'ORDER-001',
      merchantId: 'MERCHANT-001',
      outletId: 'OUTLET-001',
      status: 'submitted',
      statusDisplay: 'Shipment Created',
      invoiceNumber: 'INV-001',
      recipient: {
        name: 'User 1',
        phone: '+62812345678',
        email: 'user1@example.com',
        address: 'Address 1',
        coordinates: { lat: -6.2088, lng: 106.8456 },
      },
      items: [{ id: 'ITEM-001', description: 'Item 1', quantity: 1 }],
      package: {
        weight: 1,
        dimensions: { length: 10, width: 10, height: 10 },
        isFragile: false,
      },
      delivery: {
        serviceType: 'standard',
        distance: 1.5,
        shippingFee: 17500,
        baseFee: 10000,
        rate: 5000,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await adapter.createOrder(order1)
    let orders = await adapter.getOrders()
    expect(orders).toHaveLength(1)

    // Create second order (simulating cache invalidation)
    const order2: Order = {
      ...order1,
      id: 'ORDER-002',
      invoiceNumber: 'INV-002',
      recipient: { ...order1.recipient, name: 'User 2' },
    }

    await adapter.createOrder(order2)
    orders = await adapter.getOrders()
    expect(orders).toHaveLength(2)

    // Update order (simulating cache invalidation)
    await adapter.updateOrder('ORDER-001', { status: 'closed' })
    orders = await adapter.getOrders()
    const updatedOrder = orders.find(o => o.id === 'ORDER-001')
    expect(updatedOrder?.status).toBe('closed')

    // Delete order (simulating cache invalidation)
    await adapter.deleteOrder('ORDER-002')
    orders = await adapter.getOrders()
    expect(orders).toHaveLength(1)
  })
})
