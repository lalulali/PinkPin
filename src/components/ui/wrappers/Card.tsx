/**
 * Card Wrapper Component
 * 
 * Wrapper for shadcn/ui Card component that maintains backward compatibility
 * with the existing component API while leveraging shadcn/ui's styling capabilities.
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from './Button'

// Status badge colors per Requirement 4.7
export const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  submitted: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Shipment Created' },
  waiting: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Waiting for Pick Up' },
  closed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Delivery Completed' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Shipment Cancelled' },
}

export interface Order {
  id: string
  invoiceNumber: string
  status: 'submitted' | 'waiting' | 'closed' | 'cancelled'
  recipient: {
    name: string
    address: string
  }
  delivery: {
    distance: number
    serviceType: string
    shippingFee: number
  }
  createdAt: string | Date
}

export interface CardProps {
  /** Order data to display */
  order: Order
  /** Edit handler */
  onEdit?: (orderId: string) => void
  /** Cancel handler */
  onCancel?: (orderId: string) => void
  /** View details handler */
  onViewDetails?: (orderId: string) => void
  /** Whether the order is offline */
  isOffline?: boolean
  /** Whether the order is pending sync */
  isPendingSync?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * Card component that displays order information with status badge
 * and action buttons on hover.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  function Card(
    {
      order,
      onEdit,
      onCancel,
      onViewDetails,
      isOffline = false,
      isPendingSync = false,
      className,
    },
    ref
  ) {
    const [showActions, setShowActions] = React.useState(false)
    const statusConfig = statusColors[order.status] || statusColors.submitted

    // Only allow cancelling orders that are submitted or waiting
    const canCancel = order.status === 'submitted' || order.status === 'waiting'
    const canEdit = order.status === 'submitted'

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(amount)
    }

    const formatDate = (date: string | Date) => {
      const d = typeof date === 'string' ? new Date(date) : date
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    const handleEdit = (e: React.MouseEvent) => {
      e.stopPropagation()
      onEdit?.(order.id)
    }

    const handleCancel = (e: React.MouseEvent) => {
      e.stopPropagation()
      onCancel?.(order.id)
    }

    const handleViewDetails = (e: React.MouseEvent) => {
      e.stopPropagation()
      onViewDetails?.(order.id)
    }

    return (
      <div
        ref={ref}
        className={cn(
          // Base card styling
          'relative bg-white border border-gray-200 rounded-lg',
          // Responsive padding: p-3 mobile, p-4 desktop
          'p-3 sm:p-4',
          // Hover shadow effect
          'hover:shadow-md transition-shadow',
          // Cursor pointer for card interaction
          'cursor-pointer',
          className
        )}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        onClick={handleViewDetails}
        tabIndex={0}
        role="button"
        aria-label={`Order ${order.invoiceNumber}. Status: ${statusConfig.label}. Click to view details.`}
      >
        {/* Offline Badge */}
        {isOffline && (
          <div className="absolute top-2 right-2 z-10">
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-800 border border-gray-200">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
                />
              </svg>
              Offline
            </span>
          </div>
        )}

        {/* Pending Sync Badge */}
        {isPendingSync && (
          <div className={cn('absolute top-2 z-10', isOffline ? 'left-2' : 'right-2')}>
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-yellow-100 text-yellow-800 border border-yellow-200">
              <svg
                className="w-3 h-3 mr-1 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Pending Sync
            </span>
          </div>
        )}

        {/* Header: Order ID and Status */}
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-500">Order ID</p>
            <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
              {order.invoiceNumber}
            </p>
          </div>
          <span
            className={cn(
              'px-2 py-0.5 text-xs font-medium rounded-full flex-shrink-0 ml-2',
              statusConfig.bg,
              statusConfig.text
            )}
          >
            {statusConfig.label}
          </span>
        </div>

        {/* Recipient info */}
        <div className="mb-2 sm:mb-3">
          <p className="text-xs text-gray-500">Recipient</p>
          <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
            {order.recipient.name}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 truncate">
            {order.recipient.address}
          </p>
        </div>

        {/* Details row */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-2 sm:mb-3">
          <div>
            <p className="text-xs text-gray-500">Distance</p>
            <p className="font-medium text-gray-900 text-sm">
              {order.delivery.distance.toFixed(1)} km
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Service</p>
            <p className="font-medium text-gray-900 text-sm capitalize">
              {order.delivery.serviceType}
            </p>
          </div>
        </div>

        {/* Fee and date */}
        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Shipping Fee</p>
            <p className="font-semibold text-[#ED0577] text-sm sm:text-base">
              {formatCurrency(order.delivery.shippingFee)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Created</p>
            <p className="text-xs sm:text-sm text-gray-700">{formatDate(order.createdAt)}</p>
          </div>
        </div>

        {/* Action buttons - visible on hover */}
        <div
          className={cn(
            'absolute inset-0 bg-white/95 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition-opacity',
            showActions ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          role="group"
          aria-label="Order actions"
        >
          <Button
            variant={canEdit ? 'primary' : 'secondary'}
            size="sm"
            onClick={handleEdit}
            disabled={!canEdit}
            aria-label={canEdit ? 'Edit order' : 'Edit order - disabled for non-pending orders'}
          >
            Edit
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCancel}
            disabled={!canCancel}
            aria-label={canCancel ? 'Cancel order' : 'Cancel order - disabled for non-pending orders'}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleViewDetails}
            aria-label="View order details"
          >
            Detail
          </Button>
        </div>
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card