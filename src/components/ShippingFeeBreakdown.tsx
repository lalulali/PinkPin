/**
 * ShippingFeeBreakdown - Displays shipping fee calculation breakdown
 * Shows base fee, distance, rate, and total in a clear format
 * Updates in real-time as distance or service type changes
 * Uses proper semantic structure with description lists
 */

import { ServiceType } from '@/src/types'
import { getShippingRates } from '@/src/utils/calculations'

interface ShippingFeeBreakdownProps {
  distance: number | null
  serviceType: ServiceType
  shippingFee: number
  className?: string
}

// Format number as Indonesian Rupiah currency
function formatRupiah(amount: number): string {
  return amount.toLocaleString('id-ID')
}

export function ShippingFeeBreakdown({
  distance,
  serviceType,
  shippingFee,
  className = '',
}: ShippingFeeBreakdownProps) {
  const { baseFee, rate } = getShippingRates(serviceType)

  // Format values for display
  const baseFeeDisplay = formatRupiah(baseFee)
  const rateDisplay = formatRupiah(rate)
  const totalDisplay = formatRupiah(shippingFee)
  const distanceDisplay = distance ? `${distance.toFixed(1)} km` : 'N/A'

  return (
    <article className={`bg-white rounded-lg shadow p-6 ${className}`} aria-labelledby="shipping-fee-title">
      <h3 id="shipping-fee-title" className="text-lg font-semibold mb-4">Shipping Fee Breakdown</h3>

      <dl className="space-y-3 text-sm">
        {/* Base Fee */}
        <div className="flex justify-between items-center">
          <dt className="text-gray-600">Base Fee:</dt>
          <dd className="font-medium">Rp {baseFeeDisplay}</dd>
        </div>

        {/* Distance */}
        <div className="flex justify-between items-center">
          <dt className="text-gray-600">Distance:</dt>
          <dd className="font-medium">{distanceDisplay}</dd>
        </div>

        {/* Rate per km */}
        <div className="flex justify-between items-center">
          <dt className="text-gray-600">Rate per km:</dt>
          <dd className="font-medium">Rp {rateDisplay}</dd>
        </div>

        {/* Distance Charge */}
        {distance !== null && (
          <div className="flex justify-between items-center">
            <dt className="text-gray-600">Distance Charge:</dt>
            <dd className="font-medium">Rp {formatRupiah(distance * rate)}</dd>
          </div>
        )}

        {/* Divider */}
        <div className="border-t pt-3" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <dt className="font-semibold text-gray-900">Total Shipping Fee:</dt>
          <dd className="font-bold text-lg text-[#ED0577]">Rp {totalDisplay}</dd>
        </div>
      </dl>

      {/* Calculation Formula */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          <span className="font-medium">Formula:</span> Base Fee + (Distance × Rate per km)
        </p>
        {distance !== null && (
          <p className="text-xs text-gray-600 mt-1">
            <span className="font-medium">Calculation:</span> Rp {baseFeeDisplay} + ({distance.toFixed(1)} km × Rp {rateDisplay}) = Rp {totalDisplay}
          </p>
        )}
      </div>
    </article>
  )
}

export default ShippingFeeBreakdown
