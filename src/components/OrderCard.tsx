/**
 * OrderCard - Card component for displaying order in card view
 * Shows order ID, status badge, recipient name, distance, shipping fee
 * Action buttons (edit, cancel, see detail) appear on hover
 * Implements Requirement 10.9 and 10.11
 * Responsive design: compact on mobile, full on larger screens
 * Keyboard accessible with visible focus indicators
 */

'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Order } from '@/src/types'
import { format } from 'date-fns'
import { useUpdateOrder } from '@/src/hooks/useUpdateOrder'
import { CancelOrderDialog } from '@/src/components/CancelOrderDialog'
import { useFilters, useSort, useLayout, usePagination } from '@/src/hooks/useUIStore'

interface OrderCardProps {
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

export function OrderCard({ order, isOffline = false, isPendingSync = false }: OrderCardProps) {
  const router = useRouter()
  const [showActions, setShowActions] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const updateOrder = useUpdateOrder()
  const { filters } = useFilters()
  const { sort } = useSort()
  const { layout } = useLayout()
  const { currentPage } = usePagination()

  const statusConfig = statusColors[order.status] || statusColors.submitted

  // Only allow cancelling orders that are submitted or waiting (not already closed or cancelled)
  const canCancel = order.status === 'submitted' || order.status === 'waiting'

  // Build URL params for preserving filter/sort state
  const buildUrlParams = useCallback(() => {
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
  }, [currentPage, filters, sort, layout])

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/create-order?edit=${order.id}`)
  }

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      router.push(`/create-order?edit=${order.id}`)
    }
  }

  const handleCancel = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowCancelDialog(true)
  }

  const handleCancelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setShowCancelDialog(true)
    }
  }

  const handleCancelConfirm = async () => {
    try {
      await updateOrder.mutateAsync({
        id: order.id,
        updates: {
          status: 'cancelled',
          statusDisplay: 'Shipment Cancelled',
        },
      })
      setShowCancelDialog(false)
    } catch (error) {
      console.error('Failed to cancel order:', error)
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
    <div
      className="relative bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow cursor-pointer"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={handleSeeDetail}
      onKeyDown={handleSeeDetailKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Order ${order.invoiceNumber}. Status: ${statusConfig.label}. Click to view details.`}
    >
      {/* Offline Badge - shown when viewing cached data */}
      {isOffline && (
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-800 border border-gray-200">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
            </svg>
            Offline
          </span>
        </div>
      )}

      {/* Pending Sync Badge - shown when order is queued for sync */}
      {isPendingSync && (
        <div className={`absolute top-2 ${isOffline ? 'left-2' : 'right-2'} z-10`}>
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-yellow-100 text-yellow-800 border border-yellow-200">
            <svg className="w-3 h-3 mr-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Pending Sync
          </span>
        </div>
      )}

      {/* Header: Order ID and Status */}
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-gray-500">Order ID</p>
          <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{order.invoiceNumber}</p>
        </div>
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full flex-shrink-0 ml-2 ${statusConfig.bg} ${statusConfig.text}`}>
          {statusConfig.label}
        </span>
      </div>

      {/* Recipient info */}
      <div className="mb-2 sm:mb-3">
        <p className="text-xs text-gray-500">Recipient</p>
        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{order.recipient.name}</p>
        <p className="text-xs sm:text-sm text-gray-600 truncate">{order.recipient.address}</p>
      </div>

      {/* Details row */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-2 sm:mb-3">
        <div>
          <p className="text-xs text-gray-500">Distance</p>
          <p className="font-medium text-gray-900 text-sm">{order.delivery.distance.toFixed(1)} km</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Service</p>
          <p className="font-medium text-gray-900 text-sm capitalize">{order.delivery.serviceType}</p>
        </div>
      </div>

      {/* Fee and date */}
      <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500">Shipping Fee</p>
          <p className="font-semibold text-[#ED0577] text-sm sm:text-base">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.delivery.shippingFee)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Created</p>
          <p className="text-xs sm:text-sm text-gray-700">{format(new Date(order.createdAt), 'MMM d, yyyy')}</p>
        </div>
      </div>

      {/* Action buttons - visible on hover */}
      <div
        className={`absolute inset-0 bg-white/95 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition-opacity ${
          showActions ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        role="group"
        aria-label="Order actions"
      >
        <button
          onClick={handleEdit}
          onKeyDown={handleEditKeyDown}
          className={`px-2 sm:px-4 py-2 rounded-md transition-colors min-h-[44px] min-w-[70px] sm:min-w-[90px] text-xs sm:text-sm ${
            order.status === 'submitted'
              ? 'bg-[#ED0577] text-white hover:bg-[#d9066a]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          disabled={order.status !== 'submitted'}
          title={order.status !== 'submitted' ? 'Only pending orders can be edited' : ''}
          aria-label={order.status !== 'submitted' ? 'Edit order - disabled for non-pending orders' : 'Edit order'}
        >
          Edit
        </button>
        <button
          onClick={handleCancel}
          onKeyDown={handleCancelKeyDown}
          className={`px-2 sm:px-4 py-2 rounded-md transition-colors min-h-[44px] min-w-[70px] sm:min-w-[90px] text-xs sm:text-sm ${
            canCancel
              ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              : 'border border-gray-200 text-gray-300 cursor-not-allowed'
          }`}
          disabled={!canCancel}
          title={!canCancel ? 'Only pending orders can be cancelled' : ''}
          aria-label={!canCancel ? 'Cancel order - disabled for non-pending orders' : 'Cancel order'}
        >
          Cancel
        </button>
        <button
          onClick={handleSeeDetail}
          onKeyDown={handleSeeDetailKeyDown}
          className="px-2 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors min-h-[44px] min-w-[70px] sm:min-w-[90px] text-xs sm:text-sm"
          aria-label="View order details"
        >
          Detail
        </button>
      </div>

      {/* Cancel Confirmation Dialog */}
      <CancelOrderDialog
        isOpen={showCancelDialog}
        invoiceNumber={order.invoiceNumber}
        recipientName={order.recipient.name}
        onConfirm={handleCancelConfirm}
        onCancel={() => setShowCancelDialog(false)}
      />
    </div>
  )
}

export default OrderCard