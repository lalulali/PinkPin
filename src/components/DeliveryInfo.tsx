/**
 * DeliveryInfo - Displays delivery information for an order
 * Shows service type, distance, outlet name, and delivery status/tracking
 * Implements Requirements 11.2, 11.6
 * Uses proper semantic structure with description lists
 */

import { Delivery, Outlet } from '@/src/types'

interface DeliveryInfoProps {
  delivery: Delivery
  outlet?: Outlet
}

const serviceTypeLabels: Record<string, string> = {
  'standard': 'Standard',
  'express': 'Express',
  'same-day': 'Same-Day',
}

export function DeliveryInfo({ delivery, outlet }: DeliveryInfoProps) {
  return (
    <article className="bg-white rounded-lg shadow p-6" aria-labelledby="delivery-info-title">
      <h2 id="delivery-info-title" className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h2>
      <dl className="space-y-4">
        <div>
          <dt className="text-sm text-gray-500">Service Type</dt>
          <dd className="font-medium text-gray-900">
            {serviceTypeLabels[delivery.serviceType] || delivery.serviceType}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Distance</dt>
          <dd className="font-medium text-gray-900">{delivery.distance.toFixed(1)} km</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Outlet</dt>
          <dd className="font-medium text-gray-900">{outlet?.name || 'Unknown Outlet'}</dd>
        </div>
      </dl>
    </article>
  )
}

export default DeliveryInfo