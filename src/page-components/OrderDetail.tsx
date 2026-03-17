/**
 * OrderDetail - Displays complete details of a specific order
 * Shows order header, recipient info, items, package details, delivery info, shipping fee breakdown, and map
 * Implements Requirements 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8
 * Lazy loads MapContainer for improved initial load performance
 */

'use client'

import { useParams, useRouter } from 'next/navigation'
import { useOrderById } from '@/src/hooks/useOrderById'
import { useOutlets } from '@/src/hooks/useOutlets'
import { useOffline } from '@/src/hooks/useOffline'
import { lazy, Suspense } from 'react'
import { OrderHeader } from '@/src/components/OrderHeader'
import { RecipientInfo } from '@/src/components/RecipientInfo'
import { ShippingFeeBreakdown } from '@/src/components/ShippingFeeBreakdown'

// Lazy load MapContainer to defer Google Maps API loading
const MapContainer = lazy(() => import('@/src/components/MapContainer').then(module => ({ default: module.default })))

function MapContainerLoader() {
  return (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-[#ED0577] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-600">Loading map...</p>
      </div>
    </div>
  )
}

export function OrderDetail() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string

  // Fetch order data (Requirement 11.8)
  const { data: order, isLoading, error } = useOrderById(orderId)
  const { data: outlets = [] } = useOutlets()
  const { isOffline } = useOffline()

  // Get outlet info for map display
  const outlet = outlets.find((o) => o.id === order?.outletId)

  // Handle back button - preserve filter/sort state (Requirement 11.7)
  // Uses router.back() to return to previous page with Zustand store state intact
  const handleBack = () => {
    router.back()
  }

  // Error state with retry button (Requirement 11.8)
  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
          <p className="text-red-600 mb-4">Error loading order. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#ED0577] text-white rounded-lg hover:bg-[#d9066a] min-h-[44px]"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  // Loading state with skeleton (Requirement 11.8)
  if (isLoading || !order) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        {/* Back button skeleton */}
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>

        {/* Order header skeleton */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Content grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-4">
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow h-96 animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Offline Banner */}
      {isOffline && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
            </svg>
            <p className="text-sm font-medium text-yellow-800">
              You are viewing cached order data.
            </p>
          </div>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-[#ED0577] hover:text-[#d9066a] font-medium mb-4 sm:mb-6 min-h-[44px] px-2 py-2"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm sm:text-base">Back to Orders</span>
      </button>

      {/* Order Header Section (Requirement 11.1, 11.4) */}
      <OrderHeader order={order} />

      {/* Main content grid - responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left column - Order details */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Recipient Information Section (Requirement 11.2) */}
          <RecipientInfo recipient={order.recipient} />

          {/* Items List Section (Requirement 11.2) */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Items</h2>
            {order.items.length === 0 ? (
              <p className="text-gray-600 text-sm sm:text-base">No items in this order.</p>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between pb-2 sm:pb-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1 pr-2">
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{item.description}</p>
                    </div>
                    <div className="text-right ml-2 sm:ml-4">
                      <p className="text-xs sm:text-sm text-gray-600">Qty: <span className="font-semibold text-gray-900">{item.quantity}</span></p>
                    </div>
                  </div>
                ))}
                <div className="pt-2 sm:pt-3 border-t border-gray-200 font-semibold text-gray-900 text-sm sm:text-base">
                  Total Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
              </div>
            )}
          </div>

          {/* Package Details Section (Requirement 11.2) */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Package Details</h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Weight</p>
                <p className="font-medium text-gray-900 text-sm sm:text-base">{order.package.weight} kg</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Dimensions</p>
                <p className="font-medium text-gray-900 text-sm sm:text-base">
                  {order.package.dimensions.length} × {order.package.dimensions.width} × {order.package.dimensions.height} cm
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Fragile</p>
                <p className="font-medium text-gray-900 text-sm sm:text-base">
                  {order.package.isFragile ? (
                    <span className="inline-flex items-center gap-1 sm:gap-2 text-orange-600">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs sm:text-sm">Yes - Handle with care</span>
                    </span>
                  ) : (
                    'No'
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Information Section (Requirement 11.2, 11.6) */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Delivery Information</h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Service Type</p>
                <p className="font-medium text-gray-900 capitalize text-sm sm:text-base">{order.delivery.serviceType}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Distance</p>
                <p className="font-medium text-gray-900 text-sm sm:text-base">{order.delivery.distance.toFixed(1)} km</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Outlet</p>
                <p className="font-medium text-gray-900 text-sm sm:text-base">{outlet?.name || 'Unknown Outlet'}</p>
              </div>
              {order.status === 'closed' && (
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Delivery Status</p>
                  <p className="font-medium text-green-600 text-sm sm:text-base">Delivered</p>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Fee Breakdown Section (Requirement 11.2, 11.5) */}
          <ShippingFeeBreakdown
            distance={order.delivery.distance}
            serviceType={order.delivery.serviceType}
            shippingFee={order.delivery.shippingFee}
          />
        </div>

        {/* Right column - Map */}
        {outlet && (
          <div className="lg:col-span-1">
            {/* Map View Section (Requirement 11.3) */}
            <div className="bg-white rounded-lg shadow overflow-hidden sticky top-4 sm:top-6 lg:top-8">
              <div className="h-64 sm:h-80 lg:h-96">
                <Suspense fallback={<MapContainerLoader />}>
                  <MapContainer
                    outlet={outlet}
                    deliveryCoordinates={order.recipient.coordinates}
                    className="w-full h-full"
                  />
                </Suspense>
              </div>
              {/* Map info */}
              <div className="p-3 sm:p-4 border-t border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                  <span className="font-semibold">Outlet:</span> {outlet.name}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  <span className="font-semibold">Recipient:</span> {order.recipient.name}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderDetail
