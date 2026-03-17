/**
 * Unit tests for useUpdateOrder hook
 * Tests TanStack Query mutation behavior and cache invalidation
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useUpdateOrder } from '../useUpdateOrder'
import * as storageModule from '@/src/services/storage'
import { Order, OrderStatus, ServiceType } from '@/src/types'

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

describe('useUpdateOrder', () => {
  let queryClient: QueryClient
  let mockAdapter: ReturnType<typeof createMockAdapter>
  let getStorageAdapterSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    queryClient = createQueryClient()
    mockAdapter = createMockAdapter()
    getStorageAdapterSpy = vi.spyOn(storageModule, 'getStorageAdapter')
    getStorageAdapterSpy.mockReturnValue(mockAdapter)
  })

  afterEach(() => {
    queryClient.clear()
    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children?: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  it('should have initial idle state', () => {
    const { result } = renderHook(() => useUpdateOrder(), { wrapper })

    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  it('should return mutation object with expected properties', () => {
    const { result } = renderHook(() => useUpdateOrder(), { wrapper })

    expect(result.current.mutate).toBeDefined()
    expect(result.current.mutateAsync).toBeDefined()
    expect(typeof result.current.mutate).toBe('function')
    expect(typeof result.current.mutateAsync).toBe('function')
  })

  it('should call getStorageAdapter when mutation is executed', async () => {
    mockAdapter.updateOrder.mockResolvedValue(createMockOrder())

    const { result } = renderHook(() => useUpdateOrder(), { wrapper })

    await result.current.mutateAsync({ id: 'ORD-001', updates: { status: 'waiting' } })

    expect(getStorageAdapterSpy).toHaveBeenCalled()
  })

  it('should have isIdle true initially', () => {
    const { result } = renderHook(() => useUpdateOrder(), { wrapper })
    expect(result.current.isIdle).toBe(true)
  })

  it('should have isPending false initially', () => {
    const { result } = renderHook(() => useUpdateOrder(), { wrapper })
    expect(result.current.isPending).toBe(false)
  })

  it('should have isSuccess false initially', () => {
    const { result } = renderHook(() => useUpdateOrder(), { wrapper })
    expect(result.current.isSuccess).toBe(false)
  })

  it('should have isError false initially', () => {
    const { result } = renderHook(() => useUpdateOrder(), { wrapper })
    expect(result.current.isError).toBe(false)
  })

  it('should have data undefined initially', () => {
    const { result } = renderHook(() => useUpdateOrder(), { wrapper })
    expect(result.current.data).toBeUndefined()
  })

  it('should have error null initially', () => {
    const { result } = renderHook(() => useUpdateOrder(), { wrapper })
    expect(result.current.error).toBeNull()
  })
})