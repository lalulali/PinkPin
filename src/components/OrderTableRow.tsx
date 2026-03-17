/**
 * OrderTableRow - Table row component for displaying order in table view
 * Implements Requirement 10.8
 * Responsive design: shows essential columns on mobile, all on desktop
 * Keyboard accessible with visible focus indicators
 */

'use client'

import { useRouter } from 'next/navigation'
import { Order } from '@/src/types'
import { format } from 'date-fns'
import { useFilters, useSort, useLayout, usePagination } from '@/src/hooks/useUIStore'

interface OrderTableRowProps {
  order: Order
  isOffline?: boolean
  isPendingSync?: boolean
}

// Status badge colors per Requirement 4.7 - using custom status colors from Tailwind config
const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  submitted: { bg: 'bg-status-submitted/20', text: 'text-status-submitted', label: 'Shipment Created' },
  waiting: { bg: 'bg-status-waiting/20', text: 'text-status-waiting', label: 'Waiting for Pick Up' },
  closed: { bg: 'bg-status-closed/20', text: 'text-status-closed', label: 'Delivery Completed' },
  cancelled: { bg: 'bg-status-cancelled/20', text: 'text-status-cancelled', label: 'Shipment Cancelled' },
}

export function OrderTableRow({ order, isOffline = false, isPendingSync = false }: OrderTableRowProps) {
  const router = useRouter()
  const statusConfig = statusColors[order.status] || statusColors.submitted
  const { filters } = useFilters()
  const { sort } = useSort()
  const { layout } = useLayout()
  const { currentPage } = usePagination()

  // Build URL params for preserving filter/sort state
  const buildUrlParams = () => {
    const params = new URLSearchParams()
    params.set('page', String(currentPage))
    if (filters.dateRange.from) params.set('from', filters.dateRange.from.toISOString())
    if (filters.dateRange.to) params.set('to', filters.dateRange.to.toISOString())
    if (filters.statuses.length > 0) params.set('statuses', filters.statuses.join(','))
    if (filters.outletId) params.set('outletId', filters.outletId)
    if (filters.serviceTypes.length > 0) params.set('serviceTypes', filters.serviceTypes.join(','))
    if (filters.invoiceNumber) params.set('invoiceNumber', filters.invoiceNumber)
    params.set('sortField', sort.field)
    params.set('sortDir', sort.direction)
    params.set('layout', layout)
    return params.toString()
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/create-order?edit=${order.id}`)
  }

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      router.push(`/create-order?edit=${order.id}`)
    }
  }

  const handleCancel = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Are you sure you want to cancel this order?')) {
      console.log('Cancel order:', order.id)
    }
  }

  const handleCancelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      if (confirm('Are you sure you want to cancel this order?')) {
        console.log('Cancel order:', order.id)
      }
    }
  }

  const handleSeeDetail = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/orders/${order.id}?${buildUrlParams()}`)
  }

  const handleSeeDetailKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      router.push(`/orders/${order.id}?${buildUrlParams()}`)
    }
  }

  return (
    <tr
      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={handleSeeDetail}
      onKeyDown={handleSeeDetailKeyDown}
      tabIndex={0}
      role="row"
      aria-label={`Order ${order.invoiceNumber}. Status: ${statusConfig.label}. Press Enter or Space to view details.`}
    >
      {/* Offline Badge - shown when viewing cached data */}
      {isOffline && (
        <td className="px-3 sm:px-4 py-2.5 sm:py-3">
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-800 border border-gray-200">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
            </svg>
            Offline
          </span>
        </td>
      )}

      {/* Pending Sync Badge - shown when order is queued for sync */}
      {isPendingSync && (
        <td className="px-3 sm:px-4 py-2.5 sm:py-3">
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-yellow-100 text-yellow-800 border border-yellow-200">
            <svg className="w-3 h-3 mr-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Pending Sync
          </span>
        </td>
      )}

      {/* Order ID */}
      <td className="px-3 sm:px-4 py-2.5 sm:py-3">
        <span className="font-medium text-gray-900 text-xs sm:text-sm">{order.invoiceNumber}</span>
      </td>

      {/* Status */}
      <td className="px-3 sm:px-4 py-2.5 sm:py-3">
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusConfig.bg} ${statusConfig.text}`}>
          {statusConfig.label}
        </span>
      </td>

      {/* Recipient - hidden on small mobile */}
      <td className="px-3 sm:px-4 py-2.5 sm:py-3 hidden sm:table-cell">
        <div>
          <p className="font-medium text-gray-900 text-sm">{order.recipient.name}</p>
          <p className="text-xs text-gray-500 truncate max-w-[120px]">{order.recipient.address}</p>
        </div>
      </td>

      {/* Distance */}
      <td className="px-3 sm:px-4 py-2.5 sm:py-3">
        <span className="text-gray-700 text-xs sm:text-sm">{order.delivery.distance.toFixed(1)} km</span>
      </td>

      {/* Fee */}
      <td className="px-3 sm:px-4 py-2.5 sm:py-3">
        <span className="font-medium text-[#ED0577] text-xs sm:text-sm">
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.delivery.shippingFee)}
        </span>
      </td>

      {/* Date - hidden on mobile */}
      <td className="px-3 sm:px-4 py-2.5 sm:py-3 hidden md:table-cell">
        <span className="text-gray-700 text-xs sm:text-sm">{format(new Date(order.createdAt), 'MMM d, yyyy')}</span>
      </td>

      {/* Actions */}
      <td className="px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex items-center gap-0.5 sm:gap-1" role="group" aria-label="Order actions">
          <button
            onClick={handleEdit}
            onKeyDown={handleEditKeyDown}
            className="p-2 text-gray-500 hover:text-[#ED0577] hover:bg-gray-100 rounded transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Edit order"
            disabled={order.status !== 'submitted'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleCancel}
            onKeyDown={handleCancelKeyDown}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Cancel order"
            disabled={order.status !== 'submitted'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={handleSeeDetail}
            onKeyDown={handleSeeDetailKeyDown}
            className="p-2 text-gray-500 hover:text-[#ED0577] hover:bg-gray-100 rounded transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="View order details"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  )
}

export default OrderTableRow