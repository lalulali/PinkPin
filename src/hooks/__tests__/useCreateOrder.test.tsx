/**
 * Unit tests for useCreateOrder hook
 * Tests TanStack Query mutation behavior and cache invalidation
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCreateOrder } from '../useCreateOrder'
import { getStorageAdapter } from '@/src/services/storage'
import { Order, OrderStatus, ServiceType } from '@/src/types'

vi.mock('@/src/services/storage', () => ({
  getStorageAdapter: vi.fn(),
}))

const mockGetStorageAdapter = vi.mocked(getStorageAdapter)

const createMockOrder = (overrides: Partial<Order> = {}): Order => ({
  id: 'ORD-NEW',
  merchantId: 'MERCH-001',
  outletId: 'OUTLET-001',
  status: 'submitted' as OrderStatus,
  statusDisplay: 'Shipment Created',
  invoiceNumber: 'INV-NEW',
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

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })

describe('useCreateOrder', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = createQueryClient()
    vi.clearAllMocks()
  })

  afterEach(() => {
    queryClient.clear()
  })

  const wrapper = ({ children }: { children?: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  it('should have initial idle state', () => {
    const { result } = renderHook(() => useCreateOrder(), { wrapper })

    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  it('should return mutation object with expected properties', () => {
    const { result } = renderHook(() => useCreateOrder(), { wrapper })

    expect(result.current.mutate).toBeDefined()
    expect(result.current.mutateAsync).toBeDefined()
    expect(typeof result.current.mutate).toBe('function')
    expect(typeof result.current.mutateAsync).toBe('function')
  })

  it('should create order successfully', async () => {
    const newOrder = createMockOrder()
    const mockAdapter = {
      createOrder: vi.fn().mockResolvedValue(newOrder),
    }
    mockGetStorageAdapter.mockReturnValue(mockAdapter)

    const { result } = renderHook(() => useCreateOrder(), { wrapper })

    await result.current.mutateAsync(newOrder)

    expect(mockAdapter.createOrder).toHaveBeenCalledWith(newOrder)
  })

  it('should call createOrder with correct order data', async () => {
    const newOrder = createMockOrder({ invoiceNumber: 'INV-12345' })
    const mockAdapter = {
      createOrder: vi.fn().mockResolvedValue(newOrder),
    }
    mockGetStorageAdapter.mockReturnValue(mockAdapter)

    const { result } = renderHook(() => useCreateOrder(), { wrapper })

    await result.current.mutateAsync(newOrder)

    expect(mockAdapter.createOrder).toHaveBeenCalledWith(
      expect.objectContaining({
        invoiceNumber: 'INV-12345',
      })
    )
  })

  it('should return error on creation failure', async () => {
    const error = new Error('Failed to create order')
    const newOrder = createMockOrder()
    const mockAdapter = {
      createOrder: vi.fn().mockRejectedValue(error),
    }
    mockGetStorageAdapter.mockReturnValue(mockAdapter)

    const { result } = renderHook(() => useCreateOrder(), { wrapper })

    try {
      await result.current.mutateAsync(newOrder)
    } catch (e) {
      // Expected to throw
    }

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })
  })
})