/**
 * Unit tests for useUIStore hook
 * Tests Zustand store selectors and actions
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import {
  useFilters,
  useSort,
  useLayout,
  usePagination,
  useUIState,
  useUIStoreState,
} from '../useUIStore'
import { useUIStore } from '../../stores/uiStore'
import type { OrderStatus, ServiceType } from '@/src/types'

describe('useFilters', () => {
  beforeEach(() => {
    act(() => {
      useUIStore.getState().resetFilters()
    })
  })

  afterEach(() => {
    act(() => {
      useUIStore.getState().resetFilters()
    })
  })

  it('should return filters from store', () => {
    const { result } = renderHook(() => useFilters())

    expect(result.current.filters).toBeDefined()
    expect(result.current.filters.statuses).toEqual([])
  })

  it('should return setFilters function', () => {
    const { result } = renderHook(() => useFilters())

    expect(typeof result.current.setFilters).toBe('function')
  })

  it('should return resetFilters function', () => {
    const { result } = renderHook(() => useFilters())

    expect(typeof result.current.resetFilters).toBe('function')
  })

  it('should set date range', () => {
    const { result } = renderHook(() => useFilters())

    const from = new Date('2024-01-01')
    const to = new Date('2024-01-31')

    act(() => {
      result.current.setDateRange(from, to)
    })

    expect(result.current.filters.dateRange.from).toEqual(from)
    expect(result.current.filters.dateRange.to).toEqual(to)
  })

  it('should set statuses', () => {
    const { result } = renderHook(() => useFilters())

    act(() => {
      result.current.setStatuses(['submitted', 'waiting' as OrderStatus])
    })

    expect(result.current.filters.statuses).toEqual(['submitted', 'waiting'])
  })

  it('should set outlet id', () => {
    const { result } = renderHook(() => useFilters())

    act(() => {
      result.current.setOutletId('OUTLET-001')
    })

    expect(result.current.filters.outletId).toBe('OUTLET-001')
  })

  it('should set service types', () => {
    const { result } = renderHook(() => useFilters())

    act(() => {
      result.current.setServiceTypes(['standard', 'express' as ServiceType])
    })

    expect(result.current.filters.serviceTypes).toEqual(['standard', 'express'])
  })

  it('should set invoice number', () => {
    const { result } = renderHook(() => useFilters())

    act(() => {
      result.current.setInvoiceNumber('INV-12345')
    })

    expect(result.current.filters.invoiceNumber).toBe('INV-12345')
  })
})

describe('useSort', () => {
  beforeEach(() => {
    act(() => {
      useUIStore.getState().setSort({ field: 'date', direction: 'desc' })
    })
  })

  afterEach(() => {
    act(() => {
      useUIStore.getState().setSort({ field: 'date', direction: 'desc' })
    })
  })

  it('should return sort from store', () => {
    const { result } = renderHook(() => useSort())

    expect(result.current.sort).toBeDefined()
    expect(result.current.sort.field).toBe('date')
  })

  it('should return setSort function', () => {
    const { result } = renderHook(() => useSort())

    expect(typeof result.current.setSort).toBe('function')
  })

  it('should set sort field', () => {
    const { result } = renderHook(() => useSort())

    act(() => {
      result.current.setSortField('status')
    })

    expect(result.current.sort.field).toBe('status')
  })

  it('should set sort direction', () => {
    const { result } = renderHook(() => useSort())

    act(() => {
      result.current.setSortDirection('asc')
    })

    expect(result.current.sort.direction).toBe('asc')
  })

  it('should toggle sort direction', () => {
    const { result } = renderHook(() => useSort())

    expect(result.current.sort.direction).toBe('desc')

    act(() => {
      result.current.toggleSortDirection()
    })

    expect(result.current.sort.direction).toBe('asc')

    act(() => {
      result.current.toggleSortDirection()
    })

    expect(result.current.sort.direction).toBe('desc')
  })
})

describe('useLayout', () => {
  beforeEach(() => {
    act(() => {
      useUIStore.getState().setLayout('card')
    })
  })

  afterEach(() => {
    act(() => {
      useUIStore.getState().setLayout('card')
    })
  })

  it('should return layout from store', () => {
    const { result } = renderHook(() => useLayout())

    expect(result.current.layout).toBe('card')
  })

  it('should return setLayout function', () => {
    const { result } = renderHook(() => useLayout())

    expect(typeof result.current.setLayout).toBe('function')
  })

  it('should toggle layout', () => {
    const { result } = renderHook(() => useLayout())

    expect(result.current.layout).toBe('card')

    act(() => {
      result.current.toggleLayout()
    })

    expect(result.current.layout).toBe('table')

    act(() => {
      result.current.toggleLayout()
    })

    expect(result.current.layout).toBe('card')
  })
})

describe('usePagination', () => {
  beforeEach(() => {
    act(() => {
      useUIStore.getState().setCurrentPage(1)
      useUIStore.getState().setItemsPerPage(20)
    })
  })

  afterEach(() => {
    act(() => {
      useUIStore.getState().setCurrentPage(1)
      useUIStore.getState().setItemsPerPage(20)
    })
  })

  it('should return pagination values from store', () => {
    const { result } = renderHook(() => usePagination())

    expect(result.current.currentPage).toBe(1)
    expect(result.current.itemsPerPage).toBe(20)
  })

  it('should return pagination setters', () => {
    const { result } = renderHook(() => usePagination())

    expect(typeof result.current.setCurrentPage).toBe('function')
    expect(typeof result.current.setItemsPerPage).toBe('function')
  })

  it('should go to next page', () => {
    const { result } = renderHook(() => usePagination())

    act(() => {
      result.current.nextPage()
    })

    expect(result.current.currentPage).toBe(2)
  })

  it('should go to previous page', () => {
    act(() => {
      useUIStore.getState().setCurrentPage(3)
    })

    const { result } = renderHook(() => usePagination())

    act(() => {
      result.current.previousPage()
    })

    expect(result.current.currentPage).toBe(2)
  })

  it('should not go below page 1 on previous page', () => {
    const { result } = renderHook(() => usePagination())

    act(() => {
      result.current.previousPage()
    })

    expect(result.current.currentPage).toBe(1)
  })

  it('should go to specific page', () => {
    const { result } = renderHook(() => usePagination())

    act(() => {
      result.current.goToPage(5)
    })

    expect(result.current.currentPage).toBe(5)
  })

  it('should not go below page 1 on goToPage', () => {
    const { result } = renderHook(() => usePagination())

    act(() => {
      result.current.goToPage(0)
    })

    expect(result.current.currentPage).toBe(1)
  })
})

describe('useUIState', () => {
  beforeEach(() => {
    act(() => {
      useUIStore.getState().setIsLoading(false)
      useUIStore.getState().setError(null)
    })
  })

  afterEach(() => {
    act(() => {
      useUIStore.getState().setIsLoading(false)
      useUIStore.getState().setError(null)
    })
  })

  it('should return UI state from store', () => {
    const { result } = renderHook(() => useUIState())

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should return UI state setters', () => {
    const { result } = renderHook(() => useUIState())

    expect(typeof result.current.setIsLoading).toBe('function')
    expect(typeof result.current.setError).toBe('function')
    expect(typeof result.current.clearError).toBe('function')
  })

  it('should set loading state', () => {
    const { result } = renderHook(() => useUIState())

    act(() => {
      result.current.setIsLoading(true)
    })

    expect(result.current.isLoading).toBe(true)
  })

  it('should set error state', () => {
    const { result } = renderHook(() => useUIState())

    act(() => {
      result.current.setError('Network error')
    })

    expect(result.current.error).toBe('Network error')
  })

  it('should clear error state', () => {
    const { result } = renderHook(() => useUIState())

    act(() => {
      result.current.setError('Some error')
      result.current.clearError()
    })

    expect(result.current.error).toBeNull()
  })
})

describe('useUIStoreState', () => {
  it('should return entire store state', () => {
    const { result } = renderHook(() => useUIStoreState())

    expect(result.current.filters).toBeDefined()
    expect(result.current.sort).toBeDefined()
    expect(result.current.layout).toBeDefined()
    expect(result.current.currentPage).toBeDefined()
    expect(result.current.itemsPerPage).toBeDefined()
    expect(result.current.isLoading).toBeDefined()
    expect(result.current.error).toBeDefined()
  })
})