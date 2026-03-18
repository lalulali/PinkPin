/**
 * OrderHistory - Paginated list of orders with filtering
 * Implements Requirement 10.1 - 10.11
 */

'use client'

import { useMemo } from 'react'
import { useOrders } from '@/src/hooks/useOrders'
import { useFilters, useSort, useLayout, usePagination } from '@/src/hooks/useUIStore'
import { FilterBar } from '@/src/components/FilterBar'
import { LayoutToggle } from '@/src/components/LayoutToggle'
import { OrderCard } from '@/src/components/OrderCard'
import { OrderTableRow } from '@/src/components/OrderTableRow'
import { Pagination } from '@/src/components/Pagination'
import { EmptyState } from '@/src/components/EmptyState'
import { Order } from '@/src/types'

const ITEMS_PER_PAGE = 20

export function OrderHistory() {
  const { data: orders = [], isLoading, isError } = useOrders()
  const { filters } = useFilters()
  const { sort, setSort } = useSort()
  const { layout } = useLayout()
  const { currentPage, setCurrentPage } = usePagination()

  // Filter orders based on filter criteria
  const filteredOrders = useMemo(() => {
    let result = [...orders]

    // Filter by date range
    if (filters.dateRange.from) {
      const fromDate = new Date(filters.dateRange.from)
      fromDate.setHours(0, 0, 0, 0)
      result = result.filter((order) => new Date(order.createdAt) >= fromDate)
    }
    if (filters.dateRange.to) {
      const toDate = new Date(filters.dateRange.to)
      toDate.setHours(23, 59, 59, 999)
      result = result.filter((order) => new Date(order.createdAt) <= toDate)
    }

    // Filter by status
    if (filters.statuses.length > 0) {
      result = result.filter((order) => filters.statuses.includes(order.status))
    }

    // Filter by outlet
    if (filters.outletId) {
      result = result.filter((order) => order.outletId === filters.outletId)
    }

    // Filter by service type
    if (filters.serviceTypes.length > 0) {
      result = result.filter((order) => filters.serviceTypes.includes(order.delivery.serviceType))
    }

    // Filter by invoice number
    if (filters.invoiceNumber) {
      const searchTerm = filters.invoiceNumber.toLowerCase()
      result = result.filter((order) =>
        order.invoiceNumber.toLowerCase().includes(searchTerm)
      )
    }

    // Sort orders
    result.sort((a, b) => {
      let comparison = 0
      switch (sort.field) {
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        case 'recipient':
          comparison = a.recipient.name.localeCompare(b.recipient.name)
          break
        case 'fee':
          comparison = a.delivery.shippingFee - b.delivery.shippingFee
          break
        case 'distance':
          comparison = a.delivery.distance - b.delivery.distance
          break
        default:
          comparison = 0
      }
      return sort.direction === 'asc' ? comparison : -comparison
    })

    return result
  }, [orders, filters, sort])

  // Paginate orders
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredOrders.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredOrders, currentPage])

  // Calculate pagination info
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  const showingStart = filteredOrders.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0
  const showingEnd = Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)

  // Handle sort column click
  const handleSort = (field: 'createdAt' | 'recipient' | 'fee' | 'distance') => {
    if (sort.field === field) {
      setSort(field, sort.direction === 'asc' ? 'desc' : 'asc')
    } else {
      setSort(field, 'desc') // Default to descending for new sort
    }
  }

  if (isError) {
    return (
      <div className="p-4 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
          Failed to load orders. Please try again.
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-4">Order History</h1>

      {/* Filter Bar */}
      <FilterBar />

      {/* Layout Toggle and Results Count */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <p className="text-sm text-gray-600" aria-live="polite">
          {isLoading ? 'Loading...' : `${filteredOrders.length} orders found`}
        </p>
        <LayoutToggle />
      </div>

      {/* Order List */}
      {isLoading ? (
        <div className="space-y-4" role="status" aria-busy="true" aria-label="Loading orders">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <EmptyState
          title="No orders found"
          description="Try adjusting your filters or create a new order."
        />
      ) : layout === 'card' ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          role="list"
          aria-label="Orders in card view"
        >
          {paginatedOrders.map((order) => (
            <OrderCard key={order.id} order={order} role="listitem" />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th
                    className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 min-w-[100px]"
                    onClick={() => handleSort('createdAt')}
                    aria-sort={sort.field === 'createdAt' ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                  >
                    <div className="flex items-center gap-1">
                      Date
                      {sort.field === 'createdAt' && (
                        <svg
                          className={`w-4 h-4 transform ${sort.direction === 'desc' ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Recipient
                  </th>
                  <th
                    className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('distance')}
                    aria-sort={sort.field === 'distance' ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                  >
                    <div className="flex items-center gap-1">
                      Distance
                      {sort.field === 'distance' && (
                        <svg
                          className={`w-4 h-4 transform ${sort.direction === 'desc' ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th
                    className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('fee')}
                    aria-sort={sort.field === 'fee' ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                  >
                    <div className="flex items-center gap-1">
                      Fee
                      {sort.field === 'fee' && (
                        <svg
                          className={`w-4 h-4 transform ${sort.direction === 'desc' ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedOrders.map((order) => (
                  <OrderTableRow key={order.id} order={order} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredOrders.length}
          showingStart={showingStart}
          showingEnd={showingEnd}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

export default OrderHistory
