/**
 * useOffline - Hook for detecting online/offline status
 * Provides reactive state for network connectivity
 * Used throughout the app to adapt UI for offline mode
 */

import { useState, useEffect, useCallback } from 'react'
import { useOfflineStore } from '@/src/stores/offlineStore'

/**
 * Hook to detect and respond to online/offline status changes
 * @returns Object containing online status and utility functions
 */
export function useOffline() {
  const { isOnline, setOnlineStatus } = useOfflineStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Set initial status
    setOnlineStatus(navigator.onLine)
    setIsInitialized(true)

    // Listen for online/offline events
    const handleOnline = () => {
      setOnlineStatus(true)
    }

    const handleOffline = () => {
      setOnlineStatus(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [setOnlineStatus])

  const forceOnline = useCallback(() => {
    setOnlineStatus(true)
  }, [setOnlineStatus])

  const forceOffline = useCallback(() => {
    setOnlineStatus(false)
  }, [setOnlineStatus])

  return {
    isOnline: isInitialized ? isOnline : true,
    isOffline: isInitialized ? !isOnline : false,
    forceOnline,
    forceOffline,
  }
}

export default useOffline