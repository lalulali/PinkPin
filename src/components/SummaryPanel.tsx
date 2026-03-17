/**
 * SummaryPanel - Live order summary panel
 * Displays order details and totals
 * Pinned on right side (desktop) or below form (mobile)
 * Responsive design: full width on mobile, fixed width on desktop
 * Implements proper semantic structure with dl/ dt/dd elements
 */

import { ServiceType } from '@/src/types'
import { formatCurrency } from '@/src/utils/formatting'

interface SummaryPanelProps {
  outletName?: string
  recipientName?: string
  recipientAddress?: string
  itemCount: number
  distance: number | null
  serviceType: ServiceType
  shippingFee: number
  weight: number
  isFragile: boolean
}

export function SummaryPanel({
  outletName,
  recipientName,
  recipientAddress,
  itemCount,
  distance,
  serviceType,
  shippingFee,
  weight,
  isFragile,
}: SummaryPanelProps) {
  return (
    <aside className="bg-white rounded-lg shadow p-4 sm:p-6 sticky top-4 sm:top-6 h-fit" aria-label="Order summary">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Order Summary</h3>

      <dl className="space-y-3 sm:space-y-4">
        {/* Outlet */}
        {outletName && (
          <div>
            <dt className="text-xs sm:text-sm text-gray-600">From</dt>
            <dd className="font-medium text-gray-900 text-sm sm:text-base">{outletName}</dd>
          </div>
        )}

        {/* Recipient */}
        {recipientName && (
          <div>
            <dt className="text-xs sm:text-sm text-gray-600">To</dt>
            <dd className="font-medium text-gray-900 text-sm sm:text-base">{recipientName}</dd>
            {recipientAddress && (
              <dd className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{recipientAddress}</dd>
            )}
          </div>
        )}

        {/* Items */}
        {itemCount > 0 && (
          <div className="pt-3 sm:pt-4 border-t border-gray-200">
            <dt className="text-xs sm:text-sm text-gray-600">Items</dt>
            <dd className="font-medium text-gray-900 text-sm sm:text-base">{itemCount} item{itemCount !== 1 ? 's' : ''}</dd>
          </div>
        )}

        {/* Package Details */}
        {(weight > 0 || isFragile) && (
          <div className="pt-3 sm:pt-4 border-t border-gray-200">
            <dt className="text-xs sm:text-sm text-gray-600">Package</dt>
            <dd className="space-y-1">
              {weight > 0 && (
                <span className="text-xs sm:text-sm text-gray-900 block">Weight: {weight} kg</span>
              )}
              {isFragile && (
                <span className="text-xs sm:text-sm text-red-600 font-medium block" aria-label="Fragile item warning">⚠ Fragile</span>
              )}
            </dd>
          </div>
        )}

        {/* Distance & Service Type */}
        {distance !== null && (
          <div className="pt-3 sm:pt-4 border-t border-gray-200">
            <dt className="text-xs sm:text-sm text-gray-600">Service Type</dt>
            <dd className="font-medium text-gray-900 capitalize text-sm sm:text-base">{serviceType}</dd>
            <dd className="text-xs sm:text-sm text-gray-600 mt-2">Distance: {distance.toFixed(1)} km</dd>
          </div>
        )}

        {/* Shipping Fee */}
        <div className="pt-3 sm:pt-4 border-t border-gray-200">
          <dt className="text-xs sm:text-sm text-gray-600">Shipping Fee</dt>
          <dd className="text-xl sm:text-2xl font-bold text-[#ED0577]">{formatCurrency(shippingFee)}</dd>
        </div>
      </dl>
    </aside>
  )
}

export default SummaryPanel
