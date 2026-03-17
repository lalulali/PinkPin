/**
 * useServiceWorker - Hook for service worker registration and management
 * Registers service worker on app load and handles updates
 */

'use client'

import { useState, useEffect, useCallback } from 'react'

interface ServiceWorkerState {
  isRegistered: boolean
  isUpdating: boolean
  version: string | null
  error: Error | null
}

interface ServiceWorkerMessage {
  type: string
  version?: string
  timestamp?: number
}

export function useServiceWorker() {
  const [state, setState] = useState<ServiceWorkerState>({
    isRegistered: false,
    isUpdating: false,
    version: null,
    error: null,
  })

  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)

  // Register service worker
  const register = useCallback(async () => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      console.log('[ServiceWorker] Not supported in this browser')
      return
    }

    try {
      const swUrl = '/sw.js'
      const newRegistration = await navigator.serviceWorker.register(swUrl)

      console.log('[ServiceWorker] Registered successfully:', newRegistration.scope)

      // Handle updates
      newRegistration.addEventListener('updatefound', () => {
        const installingWorker = newRegistration.installing
        if (installingWorker) {
          setState((prev) => ({ ...prev, isUpdating: true }))

          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New content is available
                console.log('[ServiceWorker] New content available, refresh to update')
                setState((prev) => ({ ...prev, isUpdating: true }))
              } else {
                // Content is cached for offline use
                console.log('[ServiceWorker] Content cached for offline use')
                setState((prev) => ({ ...prev, isUpdating: false }))
              }
            }
          })
        }
      })

      // Handle messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        const message = event.data as ServiceWorkerMessage
        
        if (message.type === 'SYNC_ORDERS') {
          // Trigger order sync when connectivity is restored
          window.dispatchEvent(new CustomEvent('sw-sync-orders', { detail: message }))
        }
      })

      setRegistration(newRegistration)
      setState((prev) => ({
        ...prev,
        isRegistered: true,
        error: null,
      }))

      // Get current version
      newRegistration.active?.postMessage({ type: 'GET_VERSION' })
      
      // Notify clients that app is ready
      setTimeout(() => {
        newRegistration.active?.postMessage({ type: 'APP_READY' })
      }, 500)
    } catch (error) {
      console.error('[ServiceWorker] Registration failed:', error)
      setState((prev) => ({
        ...prev,
        isRegistered: false,
        error: error instanceof Error ? error : new Error('Registration failed'),
      }))
    }
  }, [])

  // Unregister service worker
  const unregister = useCallback(async () => {
    if (!registration) return

    try {
      const unregistered = await registration.unregister()
      if (unregistered) {
        console.log('[ServiceWorker] Unregistered successfully')
        setState((prev) => ({
          ...prev,
          isRegistered: false,
        }))
      }
    } catch (error) {
      console.error('[ServiceWorker] Unregister failed:', error)
    }
  }, [registration])

  // Skip waiting (activate new service worker immediately)
  const skipWaiting = useCallback(async () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      setState((prev) => ({ ...prev, isUpdating: false }))
    }
  }, [registration])

  // Clear all caches
  const clearCache = useCallback(async () => {
    if (registration?.active) {
      registration.active.postMessage({ type: 'CLEAR_CACHE' })
    }
  }, [registration])

  // Check for updates
  const checkForUpdates = useCallback(async () => {
    if (!registration) return

    try {
      await registration.update()
    } catch (error) {
      console.error('[ServiceWorker] Update check failed:', error)
    }
  }, [registration])

  // Register on mount
  useEffect(() => {
    register()
  }, [register])

  return {
    ...state,
    registration,
    register,
    unregister,
    skipWaiting,
    clearCache,
    checkForUpdates,
  }
}

export default useServiceWorker