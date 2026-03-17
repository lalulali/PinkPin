/**
 * useSplashScreen - Hook to manage splash screen visibility
 * Controls when splash screen shows and hides based on app state
 */

'use client'

import { useState, useCallback, useEffect } from 'react'

interface SplashScreenState {
  isVisible: boolean
  hasCompleted: boolean
}

export function useSplashScreen(minimumDuration = 1500) {
  const [state, setState] = useState<SplashScreenState>({
    isVisible: true,
    hasCompleted: false,
  })

  // Hide splash screen
  const hide = useCallback(() => {
    setState({ isVisible: false, hasCompleted: true })
  }, [])

  // Show splash screen again (e.g., after logout)
  const show = useCallback(() => {
    setState({ isVisible: true, hasCompleted: false })
  }, [])

  // Check if app is in standalone mode (installed PWA)
  const isStandalone = useCallback(() => {
    if (typeof window === 'undefined') return false

    // Check various standalone indicators
    return (
      (window.matchMedia('(display-mode: standalone)').matches) ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://') ||
      false
    )
  }, [])

  // Auto-hide after minimum duration
  useEffect(() => {
    if (!state.isVisible) return

    const timer = setTimeout(() => {
      setState((prev) => ({ ...prev, isVisible: false }))
    }, minimumDuration)

    return () => clearTimeout(timer)
  }, [state.isVisible, minimumDuration])

  // Listen for app ready event from service worker
  useEffect(() => {
    const handleAppReady = () => {
      setState((prev) => ({ ...prev, isVisible: false, hasCompleted: true }))
    }

    window.addEventListener('app-ready', handleAppReady)
    
    // Also listen for APP_READY message from service worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'APP_READY') {
          handleAppReady()
        }
      })
    }

    return () => {
      window.removeEventListener('app-ready', handleAppReady)
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', handleAppReady)
      }
    }
  }, [])

  return {
    ...state,
    isStandalone,
    hide,
    show,
  }
}

export default useSplashScreen