/**
 * DeliveryForm - Form section for delivery information
 * Allows selection of service type and displays distance, shipping fee, and fee breakdown
 * Implements accessible form controls with proper fieldset/legend and ARIA attributes
 */

import { ServiceType } from '@/src/types'
import { formatCurrency } from '@/src/utils/formatting'
import ShippingFeeBreakdown from '../ShippingFeeBreakdown'

interface DeliveryFormProps {
  serviceType: ServiceType
  distance: number | null
  shippingFee: number
  onServiceTypeChange: (type: ServiceType) => void
  errors?: Record<string, string>
  showErrors?: boolean
}

export function DeliveryForm({
  serviceType,
  distance,
  shippingFee,
  onServiceTypeChange,
  errors = {},
  showErrors = false,
}: DeliveryFormProps) {
  const serviceTypes: ServiceType[] = ['standard', 'express', 'same-day']
  const distanceError = showErrors ? errors.distance : null

  return (
    <div className="space-y-6">
      {/* Service Type Selector */}
      <fieldset>
        <legend className="block text-sm font-medium text-gray-700 mb-3">
          Service Type
        </legend>
        <div className="space-y-2" role="radiogroup" aria-label="Select delivery service type">
          {serviceTypes.map((type) => (
            <label
              key={type}
              className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors min-h-[44px]"
            >
              <input
                type="radio"
                name="serviceType"
                value={type}
                checked={serviceType === type}
                onChange={() => onServiceTypeChange(type)}
                className="w-5 h-5 text-[#ED0577] cursor-pointer"
                aria-describedby={`service-type-${type}-description`}
              />
              <span className="ml-3 font-medium capitalize text-gray-900">{type}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Distance Display with Error */}
      {distance !== null && (
        <div className={`p-4 border rounded-lg ${distanceError ? 'bg-red-50 border-red-500' : 'bg-blue-50 border-blue-200'}`} role="status">
          <p className={`text-sm ${distanceError ? 'text-red-700' : 'text-gray-600'}`}>Distance</p>
          <p className={`text-lg font-semibold ${distanceError ? 'text-red-900' : 'text-gray-900'}`}>{distance.toFixed(1)} km</p>
          {distanceError && (
            <p className="text-xs text-red-600 mt-2 font-medium">{distanceError}</p>
          )}
        </div>
      )}

      {/* Shipping Fee Summary */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg" role="status">
        <p className="text-sm text-gray-600">Shipping Fee</p>
        <p className="text-2xl font-bold text-[#ED0577]">{formatCurrency(shippingFee)}</p>
      </div>

      {/* Fee Breakdown */}
      <ShippingFeeBreakdown
        distance={distance}
        serviceType={serviceType}
        shippingFee={shippingFee}
      />

      <p className="text-sm text-gray-600">
        Select your preferred service type. The shipping fee will be calculated based on distance
        and service type.
      </p>
    </div>
  )
}

export default DeliveryForm
