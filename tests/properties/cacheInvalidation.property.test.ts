/**
 * Property-based tests for TanStack Query Cache Invalidation
 * Feature: pink-pin-merchant-app, Property 3: Cache Invalidation on Mutation
 * Validates: Requirements 2.3
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import fc from 'fast-check'
import { QueryClient } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { useOrders, useCreateOrder, useUpdateOrder, useDeleteOrder } from '@/hooks'
import { LocalStorageAdapter } from '@/services/storage/LocalStorageAdapter'
import { setStorageAdapter } from '@/services/storage'
import type { Order, OrderStatus, ServiceType } from '@/types'

// Simple test data generators
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

describe('Cache Invalidation Property Tests', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    localStorage.clear()
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000,
          retry: 3,
        },
      },
    })
    setStorageAdapter(new LocalStorageAdapter())
  })

  it('Property 3: Cache Invalidation on Mutation - Create', async () => {
    await fc.assert(
      fc.asyncProperty(simpleOrderArb, async (order: Order) => {
        localStorage.clear()
        queryClient.clear()

        const wrapper = ({ children }: { children: React.ReactNode }) =>
          React.createElement(QueryClientProvider, { client: queryClient }, children)

        // Hook to fetch orders
        const { result: ordersResult } = renderHook(() => useOrders(), { wrapper })

        // Wait for initial fetch
        await waitFor(() => {
          expect(ordersResult.current.isSuccess).toBe(true)
        })

        const initialCount = ordersResult.current.data?.length ?? 0

        // Hook to create order
        const { result: createResult } = renderHook(() => useCreateOrder(), { wrapper })

        // Create an order
        createResult.current.mutate(order)

        // Wait for mutation to complete
        await waitFor(() => {
          expect(createResult.current.isSuccess).toBe(true)
        })

        // Wait for cache invalidation and refetch
        await waitFor(() => {
          expect(ordersResult.current.data).toBeDefined()
          expect(ordersResult.current.data!.length).toBe(initialCount + 1)
        })

        // Verify the new order is in the list
        const newOrder = ordersResult.current.data?.find(o => o.id === order.id)
        expect(newOrder).toBeDefined()
      }),
      { numRuns: 10 }
    )
  })

  it('Property 3: Cache Invalidation on Mutation - Update', async () => {
    await fc.assert(
      fc.asyncProperty(simpleOrderArb, async (order: Order) => {
        localStorage.clear()
        queryClient.clear()

        const wrapper = ({ children }: { children: React.ReactNode }) =>
          React.createElement(QueryClientProvider, { client: queryClient }, children)

        // Create initial order
        const adapter = new LocalStorageAdapter()
        await adapter.createOrder(order)

        // Hook to fetch orders
        const { result: ordersResult } = renderHook(() => useOrders(), { wrapper })

        // Wait for initial fetch
        await waitFor(() => {
          expect(ordersResult.current.isSuccess).toBe(true)
        })

        const initialOrder = ordersResult.current.data?.find(o => o.id === order.id)
        expect(initialOrder?.status).toBe(order.status)

        // Hook to update order
        const { result: updateResult } = renderHook(() => useUpdateOrder(), { wrapper })

        // Update the order
        updateResult.current.mutate({
          id: order.id,
          updates: { status: 'closed' as OrderStatus },
        })

        // Wait for mutation to complete
        await waitFor(() => {
          expect(updateResult.current.isSuccess).toBe(true)
        })

        // Wait for cache invalidation and refetch
        await waitFor(() => {
          const updatedOrder = ordersResult.current.data?.find(o => o.id === order.id)
          expect(updatedOrder?.status).toBe('closed')
        })
      }),
      { numRuns: 10 }
    )
  })

  it('Property 3: Cache Invalidation on Mutation - Delete', async () => {
    await fc.assert(
      fc.asyncProperty(simpleOrderArb, async (order: Order) => {
        localStorage.clear()
        queryClient.clear()

        const wrapper = ({ children }: { children: React.ReactNode }) =>
          React.createElement(QueryClientProvider, { client: queryClient }, children)

        // Create initial order
        const adapter = new LocalStorageAdapter()
        await adapter.createOrder(order)

        // Hook to fetch orders
        const { result: ordersResult } = renderHook(() => useOrders(), { wrapper })

        // Wait for initial fetch
        await waitFor(() => {
          expect(ordersResult.current.isSuccess).toBe(true)
        })

        const initialCount = ordersResult.current.data?.length ?? 0
        expect(initialCount).toBeGreaterThan(0)

        // Hook to delete order
        const { result: deleteResult } = renderHook(() => useDeleteOrder(), { wrapper })

        // Delete the order
        deleteResult.current.mutate(order.id)

        // Wait for mutation to complete
        await waitFor(() => {
          expect(deleteResult.current.isSuccess).toBe(true)
        })

        // Wait for cache invalidation and refetch
        await waitFor(() => {
          expect(ordersResult.current.data).toBeDefined()
          expect(ordersResult.current.data!.length).toBe(initialCount - 1)
        })

        // Verify the order is no longer in the list
        const deletedOrder = ordersResult.current.data?.find(o => o.id === order.id)
        expect(deletedOrder).toBeUndefined()
      }),
      { numRuns: 10 }
    )
  })
})
