/**
 * Unit tests for useOrderById hook
 * Tests TanStack Query hook behavior for fetching a single order
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useOrderById } from '../useOrderById'
import { getStorageAdapter } from '@/src/services/storage'
import { Order, OrderStatus, ServiceType } from '@/src/types'

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

describe('useOrderById', () => {
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

  it('should return undefined and not fetch when id is undefined', () => {
    const mockAdapter = {
      getOrderById: vi.fn(),
    }
    mockGetStorageAdapter.mockReturnValue(mockAdapter)

    const { result } = renderHook(() => useOrderById(undefined), { wrapper })

    // When query is disabled, data is undefined
    expect(result.current.data).toBeUndefined()
    expect(result.current.isPending).toBe(true)
    expect(mockAdapter.getOrderById).not.toHaveBeenCalled()
  })

  it('should return undefined and not fetch when id is empty string', () => {
    const mockAdapter = {
      getOrderById: vi.fn(),
    }
    mockGetStorageAdapter.mockReturnValue(mockAdapter)

    const { result } = renderHook(() => useOrderById(''), { wrapper })

    // When query is disabled, data is undefined
    expect(result.current.data).toBeUndefined()
    expect(mockAdapter.getOrderById).not.toHaveBeenCalled()
  })

  it('should return loading state initially when id is provided', () => {
    const mockAdapter = {
      getOrderById: vi.fn().mockImplementation(() => new Promise(() => {})), // Pending promise
    }
    mockGetStorageAdapter.mockReturnValue(mockAdapter)

    const { result } = renderHook(() => useOrderById('ORD-001'), { wrapper })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.isPending).toBe(true)
  })

  it('should return order on successful fetch', async () => {
    const order = createMockOrder({ id: 'ORD-001' })
    const mockAdapter = {
      getOrderById: vi.fn().mockResolvedValue(order),
    }
    mockGetStorageAdapter.mockReturnValue(mockAdapter)

    const { result } = renderHook(() => useOrderById('ORD-001'), { wrapper })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(order)
    expect(mockAdapter.getOrderById).toHaveBeenCalledWith('ORD-001')
  })

  it('should return null when order is not found', async () => {
    const mockAdapter = {
      getOrderById: vi.fn().mockResolvedValue(null),
    }
    mockGetStorageAdapter.mockReturnValue(mockAdapter)

    const { result } = renderHook(() => useOrderById('NONEXISTENT'), { wrapper })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toBeNull()
  })

  it('should return error on fetch failure', async () => {
    const error = new Error('Failed to fetch order')
    const mockAdapter = {
      getOrderById: vi.fn().mockRejectedValue(error),
    }
    mockGetStorageAdapter.mockReturnValue(mockAdapter)

    const { result } = renderHook(() => useOrderById('ORD-001'), { wrapper })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toBeDefined()
    expect(result.current.error?.message).toBe('Failed to fetch order')
  })

  it('should fetch different orders when id changes', async () => {
    const order1 = createMockOrder({ id: 'ORD-001' })
    const order2 = createMockOrder({ id: 'ORD-002' })
    const mockAdapter = {
      getOrderById: vi.fn().mockResolvedValue(order1),
    }
    mockGetStorageAdapter.mockReturnValue(mockAdapter)

    const { result, rerender } = renderHook(
      ({ id }: { id: string }) => useOrderById(id),
      { wrapper, initialProps: { id: 'ORD-001' } }
    )

    await waitFor(() => {
      expect(result.current.data).toEqual(order1)
    })

    // Change the id
    mockAdapter.getOrderById.mockResolvedValue(order2)
    rerender({ id: 'ORD-002' })

    await waitFor(() => {
      expect(result.current.data).toEqual(order2)
    })

    expect(mockAdapter.getOrderById).toHaveBeenCalledWith('ORD-001')
    expect(mockAdapter.getOrderById).toHaveBeenCalledWith('ORD-002')
  })
})