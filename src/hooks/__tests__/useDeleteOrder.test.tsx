/**
 * Unit tests for useDeleteOrder hook
 * Tests TanStack Query mutation behavior and cache invalidation
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useDeleteOrder } from '../useDeleteOrder'

// Create mock adapter
const createMockAdapter = () => ({
  getOrders: vi.fn(),
  getOrderById: vi.fn(),
  createOrder: vi.fn(),
  updateOrder: vi.fn(),
  deleteOrder: vi.fn(),
  getMerchant: vi.fn(),
  getOutlets: vi.fn(),
  getOutletById: vi.fn(),
})

// Mock the storage module
vi.mock('@/src/services/storage', () => ({
  getStorageAdapter: vi.fn(() => createMockAdapter()),
}))

import { getStorageAdapter } from '@/src/services/storage'

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })

describe('useDeleteOrder', () => {
  let queryClient: QueryClient
  let mockAdapter: ReturnType<typeof createMockAdapter>

  beforeEach(() => {
    queryClient = createQueryClient()
    mockAdapter = createMockAdapter()
    vi.mocked(getStorageAdapter).mockReturnValue(mockAdapter)
  })

  afterEach(() => {
    queryClient.clear()
    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children?: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  it('should have initial idle state', () => {
    const { result } = renderHook(() => useDeleteOrder(), { wrapper })

    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  it('should delete order successfully', async () => {
    mockAdapter.deleteOrder.mockResolvedValue(undefined)

    const { result } = renderHook(() => useDeleteOrder(), { wrapper })

    await result.current.mutateAsync('ORD-001')

    expect(mockAdapter.deleteOrder).toHaveBeenCalledWith('ORD-001')
  })

  it('should call deleteOrder with correct id', async () => {
    mockAdapter.deleteOrder.mockResolvedValue(undefined)

    const { result } = renderHook(() => useDeleteOrder(), { wrapper })

    await result.current.mutateAsync('ORD-123456')

    expect(mockAdapter.deleteOrder).toHaveBeenCalledWith('ORD-123456')
  })

  it('should call deleteOrder with correct id', async () => {
    mockAdapter.deleteOrder.mockResolvedValue(undefined)

    const { result } = renderHook(() => useDeleteOrder(), { wrapper })

    await result.current.mutateAsync('ORD-123456')

    expect(mockAdapter.deleteOrder).toHaveBeenCalledWith('ORD-123456')
  })
})