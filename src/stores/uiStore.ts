import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { OrderStatus, ServiceType } from '../types'

export interface UIFilters {
  dateRange: {
    from: Date | null
    to: Date | null
  }
  statuses: OrderStatus[]
  outletId: string | null
  serviceTypes: ServiceType[]
  invoiceNumber: string
}

export type SortField = 'date' | 'status' | 'createdAt' | 'recipient' | 'fee' | 'distance'

export interface UISort {
  field: SortField
  direction: 'asc' | 'desc'
}

export interface UIState {
  // Filters
  filters: UIFilters
  setFilters: (filters: Partial<UIFilters>) => void
  resetFilters: () => void

  // Sort
  sort: UISort
  setSort: (sort: UISort) => void

  // Layout
  layout: 'card' | 'table'
  setLayout: (layout: 'card' | 'table') => void

  // Pagination
  currentPage: number
  itemsPerPage: number
  setCurrentPage: (page: number) => void
  setItemsPerPage: (items: number) => void

  // UI state
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  error: string | null
  setError: (error: string | null) => void
}

const defaultFilters: UIFilters = {
  dateRange: {
    from: null,
    to: null,
  },
  statuses: [],
  outletId: null,
  serviceTypes: [],
  invoiceNumber: '',
}

const defaultSort: UISort = {
  field: 'createdAt',
  direction: 'desc',
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Filters
      filters: defaultFilters,
      setFilters: (newFilters) =>
        set((state) => ({
          filters: {
            ...state.filters,
            ...newFilters,
          },
        })),
      resetFilters: () =>
        set({
          filters: defaultFilters,
        }),

      // Sort
      sort: defaultSort,
      setSort: (sort) => set({ sort }),

      // Layout
      layout: 'table',
      setLayout: (layout) => set({ layout }),

      // Pagination
      currentPage: 1,
      itemsPerPage: 20,
      setCurrentPage: (page) => set({ currentPage: Math.max(1, page) }),
      setItemsPerPage: (items) => set({ itemsPerPage: Math.max(1, items) }),

      // UI state
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
      error: null,
      setError: (error) => set({ error }),
    }),
    {
      name: 'pink-pin-ui-store',
      partialize: (state) => ({
        filters: state.filters,
        sort: state.sort,
        layout: state.layout,
        currentPage: state.currentPage,
        itemsPerPage: state.itemsPerPage,
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as Partial<UIState>),
      }),
    }
  )
)
