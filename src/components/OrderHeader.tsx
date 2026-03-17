/**
 * OrderHeader - Displays order header with ID, status badge, and dates
 * Implements Requirements 11.1, 11.4
 * Property 13: Status Badge Colors
 */

'use client'

import { Order } from '@/src/types'
import { format } from 'date-fns'

// Status badge colors per Requirement 4.7 and 11.4 - using custom status colors from Tailwind config
const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  submitted: { bg: 'bg-status-submitted/20', text: 'text-status-submitted', label: 'Shipment Created' },
  waiting: { bg: 'bg-status-waiting/20', text: 'text-status-waiting', label: 'Waiting for Pick Up' },
  closed: { bg: 'bg-status-closed/20', text: 'text-status-closed', label: 'Delivery Completed' },
  cancelled: { bg: 'bg-status-cancelled/20', text: 'text-status-cancelled', label: 'Shipment Cancelled' },
}

interface OrderHeaderProps {
  order: Order
}

/**
 * OrderHeader Component
 * 
 * Displays:
 * - Order ID (invoiceNumber)
 * - Status badge with color coding (Requirement 11.4)
 * - Creation date (Requirement 11.1)
 * - Last updated date (Requirement 11.1)
 * - Status display text (Requirement 11.1)
 * 
 * Color coding per Requirement 4.7:
 * - Blue for submitted (Shipment Created)
 * - Orange for waiting (Waiting for Pick Up)
 * - Green for closed (Delivery Completed)
 * - Red for cancelled (Shipment Cancelled)
 */
export function OrderHeader({ order }: OrderHeaderProps) {
  const statusConfig = statusColors[order.status] || statusColors.submitted

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">Order ID</p>
          <h1 className="text-3xl font-bold text-gray-900 mt-1">{order.invoiceNumber}</h1>
          <p className="text-sm text-gray-600 mt-2">
            Created: {format(new Date(order.createdAt), 'MMM d, yyyy HH:mm')}
          </p>
          {order.updatedAt && (
            <p className="text-sm text-gray-600">
              Updated: {format(new Date(order.updatedAt), 'MMM d, yyyy HH:mm')}
            </p>
          )}
        </div>
        <span
          className={`px-4 py-2 text-sm font-semibold rounded-full ${statusConfig.bg} ${statusConfig.text} w-fit min-h-[44px] flex items-center`}
          data-testid={`status-badge-${order.status}`}
        >
          {statusConfig.label}
        </span>
      </div>
    </div>
  )
}

export default OrderHeader
