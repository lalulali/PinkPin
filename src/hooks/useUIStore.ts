import { useUIStore as useStore } from '../stores/uiStore'
import type { OrderStatus, ServiceType } from '../types'

/**
 * Hook to access and update filters
 */
export const useFilters = () => {
  const filters = useStore((state) => state.filters)
  const setFilters = useStore((state) => state.setFilters)
  const resetFilters = useStore((state) => state.resetFilters)

  return {
    filters,
    setFilters,
    resetFilters,
    setDateRange: (from: Date | null, to: Date | null) =>
      setFilters({ dateRange: { from, to } }),
    setStatuses: (statuses: OrderStatus[]) => setFilters({ statuses }),
    setOutletId: (outletId: string | null) => setFilters({ outletId }),
    setServiceTypes: (serviceTypes: ServiceType[]) =>
      setFilters({ serviceTypes }),
    setInvoiceNumber: (invoiceNumber: string) =>
      setFilters({ invoiceNumber }),
  }
}

/**
 * Hook to access and update sort preferences
 */
export const useSort = () => {
  const sort = useStore((state) => state.sort)
  const setSort = useStore((state) => state.setSort)

  return {
    sort,
    setSort,
    setSortField: (field: SortField) =>
      setSort({ ...sort, field }),
    setSortDirection: (direction: 'asc' | 'desc') =>
      setSort({ ...sort, direction }),
    toggleSortDirection: () =>
      setSort({
        ...sort,
        direction: sort.direction === 'asc' ? 'desc' : 'asc',
      }),
  }
}

/**
 * Hook to access and update layout preference
 */
export const useLayout = () => {
  const layout = useStore((state) => state.layout)
  const setLayout = useStore((state) => state.setLayout)

  return {
    layout,
    setLayout,
    toggleLayout: () =>
      setLayout(layout === 'card' ? 'table' : 'card'),
  }
}

/**
 * Hook to access and update pagination
 */
export const usePagination = () => {
  const currentPage = useStore((state) => state.currentPage)
  const itemsPerPage = useStore((state) => state.itemsPerPage)
  const setCurrentPage = useStore((state) => state.setCurrentPage)
  const setItemsPerPage = useStore((state) => state.setItemsPerPage)

  return {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    nextPage: () => setCurrentPage(currentPage + 1),
    previousPage: () => setCurrentPage(Math.max(1, currentPage - 1)),
    goToPage: (page: number) => setCurrentPage(Math.max(1, page)),
  }
}

/**
 * Hook to access and update UI loading and error states
 */
export const useUIState = () => {
  const isLoading = useStore((state) => state.isLoading)
  const error = useStore((state) => state.error)
  const setIsLoading = useStore((state) => state.setIsLoading)
  const setError = useStore((state) => state.setError)

  return {
    isLoading,
    error,
    setIsLoading,
    setError,
    clearError: () => setError(null),
  }
}

/**
 * Hook to access the entire UI store
 */
export const useUIStoreState = () => useStore()
