/**
 * Unit tests for useOrders hook
 * Tests TanStack Query hook behavior for fetching orders
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useOrders } from '../useOrders'
import { getStorageAdapter } from '@/src/services/storage'
import { Order, OrderStatus, ServiceType } from '@/src/types'

// Mock the storage adapter
vi.mock('@/src/services/storage', () => ({
  getStorageAdapter: vi.fn(),
}))

const mockGetStorageAdapter = vi.mocked(getStorageAdapter)

const createMockOrder = (overrides: Partial<Order> = {}): Order => ({
  id: 'ORD-001',
  merchantId: 'MERCH-001',
  outletId: 'OUTLET-001',
  status: 'submitted' as OrderStatus,
  statusDisplay: 'Shipment Created',
  invoiceNumber: 'INV-001',
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

describe('useOrders', () => {
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

  it('should return loading state initially', () => {
    const mockAdapter = {
      getOrders: vi.fn().mockImplementation(() => new Promise(() => {})), // Pending promise
    }
    mockGetStorageAdapter.mockReturnValue(mockAdapter)

    const { result } = renderHook(() => useOrders(), { wrapper })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.isPending).toBe(true)
    expect(result.current.data).toBeUndefined()
  })

  it('should return orders on successful fetch', async () => {
    const orders = [createMockOrder({ id: 'ORD-001' }), createMockOrder({ id: 'ORD-002' })]
    const mockAdapter = {
      getOrders: vi.fn().mockResolvedValue(orders),
    }
    mockGetStorageAdapter.mockReturnValue(mockAdapter)

    const { result } = renderHook(() => useOrders(), { wrapper })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(orders)
    expect(result.current.data?.length).toBe(2)
    expect(mockAdapter.getOrders).toHaveBeenCalledTimes(1)
  })

  it('should return empty array when no orders exist', async () => {
    const mockAdapter = {
      getOrders: vi.fn().mockResolvedValue([]),
    }
    mockGetStorageAdapter.mockReturnValue(mockAdapter)

    const { result } = renderHook(() => useOrders(), { wrapper })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual([])
    expect(result.current.data?.length).toBe(0)
  })

  it('should return error on fetch failure', async () => {
    const error = new Error('Failed to fetch orders')
    const mockAdapter = {
      getOrders: vi.fn().mockRejectedValue(error),
    }
    mockGetStorageAdapter.mockReturnValue(mockAdapter)

    const { result } = renderHook(() => useOrders(), { wrapper })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toBeDefined()
    expect(result.current.error?.message).toBe('Failed to fetch orders')
  })

  it('should refetch when manually invalidated', async () => {
    const orders = [createMockOrder({ id: 'ORD-001' })]
    const mockAdapter = {
      getOrders: vi.fn().mockResolvedValue(orders),
    }
    mockGetStorageAdapter.mockReturnValue(mockAdapter)

    const { result, rerender } = renderHook(() => useOrders(), { wrapper })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Invalidate queries
    queryClient.invalidateQueries({ queryKey: ['orders'] })
    rerender()

    await waitFor(() => {
      expect(mockAdapter.getOrders).toHaveBeenCalledTimes(2)
    })
  })
})