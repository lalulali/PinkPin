/**
 * OfflineIndicator - Displays offline status and queued orders information
 * Shows when app is offline and number of orders pending sync
 * Implements accessible status updates with proper ARIA attributes
 */

import { useState } from 'react'
import { useOfflineStore } from '@/src/stores/offlineStore'

export function OfflineIndicator() {
  const { isOnline, queuedOrders, isSyncing, syncError } = useOfflineStore()
  const [showDetails, setShowDetails] = useState(false)

  if (isOnline && queuedOrders.length === 0) {
    return null
  }

  const toggleDetails = () => setShowDetails(!showDetails)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Main Indicator */}
      <div
        className={`rounded-lg shadow-lg p-4 max-w-sm cursor-pointer transition-all ${
          isOnline
            ? 'bg-blue-50 border border-blue-200'
            : 'bg-yellow-50 border border-yellow-200'
        }`}
        onClick={toggleDetails}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggleDetails()
          }
        }}
        tabIndex={0}
        role="status"
        aria-expanded={showDetails}
        aria-controls="offline-indicator-details"
        aria-label={isOnline ? `${queuedOrders.length} orders pending sync` : 'You are offline'}
      >
        <div className="flex items-center gap-3">
          {/* Status Icon */}
          <div
            className={`w-3 h-3 rounded-full ${
              isOnline ? 'bg-green-500' : 'bg-yellow-500'
            }`}
            aria-hidden="true"
          />

          {/* Status Text */}
          <div className="flex-1">
            {!isOnline && (
              <p className="text-sm font-medium text-yellow-800">
                You are offline
              </p>
            )}
            {isOnline && queuedOrders.length > 0 && (
              <p className="text-sm font-medium text-blue-800">
                {isSyncing
                  ? 'Syncing orders...'
                  : `${queuedOrders.length} order${queuedOrders.length !== 1 ? 's' : ''} pending sync`}
              </p>
            )}
          </div>

          {/* Chevron Icon */}
          {queuedOrders.length > 0 && (
            <svg
              className={`w-4 h-4 transition-transform ${
                showDetails ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          )}
        </div>

        {/* Details Section */}
        {showDetails && queuedOrders.length > 0 && (
          <div id="offline-indicator-details" className="mt-4 pt-4 border-t border-gray-200 space-y-2" role="region" aria-label="Queued orders details">
            {queuedOrders.map((order) => (
              <div
                key={order.id}
                className="text-xs text-gray-600 p-2 bg-white rounded border border-gray-100"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="font-medium text-gray-700">{order.id}</p>
                    <p className="text-gray-500">
                      {order.recipient.name}
                    </p>
                  </div>
                  <div className="text-right">
                    {order.syncAttempts > 0 && (
                      <p className="text-yellow-600">
                        Attempt {order.syncAttempts}/{3}
                      </p>
                    )}
                    {order.lastSyncError && (
                      <p className="text-red-600 text-xs">
                        {order.lastSyncError}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {syncError && (
              <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700" role="alert">
                {syncError}
              </div>
            )}

            {isSyncing && (
              <div className="flex items-center gap-2 text-xs text-blue-700" role="status">
                <div className="w-3 h-3 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                Syncing...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default OfflineIndicator
