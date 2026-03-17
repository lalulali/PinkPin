/**
 * ServiceWorkerInitializer - Client component that registers service worker on app load
 * Handles service worker updates and displays update notification to user
 */

'use client'

import { useEffect, useState } from 'react'
import { useServiceWorker } from '@/src/hooks/useServiceWorker'

interface ServiceWorkerUpdateNotificationProps {
  onUpdate: () => void
}

function ServiceWorkerUpdateNotification({ onUpdate }: ServiceWorkerUpdateNotificationProps) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-4">
        <span className="text-sm font-medium">
          A new version is available
        </span>
        <button
          onClick={onUpdate}
          className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
        >
          Refresh
        </button>
      </div>
    </div>
  )
}

export function ServiceWorkerInitializer() {
  const { isUpdating, skipWaiting } = useServiceWorker()
  const [showUpdateNotification, setShowUpdateNotification] = useState(false)

  useEffect(() => {
    if (isUpdating) {
      setShowUpdateNotification(true)
    }
  }, [isUpdating])

  const handleUpdate = () => {
    skipWaiting()
    setShowUpdateNotification(false)
  }

  return (
    <>
      {showUpdateNotification && (
        <ServiceWorkerUpdateNotification onUpdate={handleUpdate} />
      )}
    </>
  )
}

export default ServiceWorkerInitializer