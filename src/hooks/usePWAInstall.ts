/**
 * usePWAInstall - Hook for PWA "Add to Home Screen" installation prompt
 * Handles the beforeinstallprompt event and manages installation state
 */

'use client'

import { useState, useEffect, useCallback } from 'react'

interface PWAInstallState {
  canInstall: boolean
  isInstalled: boolean
  showPrompt: boolean
  deferredPrompt: Event | null
  isLoading: boolean
}

interface PWAInstallActions {
  dismissPrompt: () => void
  triggerInstall: () => Promise<boolean>
  checkInstalled: () => boolean
}

export function usePWAInstall(): PWAInstallState & PWAInstallActions {
  const [state, setState] = useState<PWAInstallState>({
    canInstall: false,
    isInstalled: false,
    showPrompt: false,
    deferredPrompt: null,
    isLoading: true,
  })

  // Check if app is already installed
  const checkInstalled = useCallback(() => {
    if (typeof window === 'undefined') return false
    
    // Check if running in standalone mode (installed PWA)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    const isInWebAppiOS = (window.navigator as any).standalone === true
    
    return isStandalone || isInWebAppiOS
  }, [])

  // Handle beforeinstallprompt event
  const handleBeforeInstallPrompt = useCallback((event: Event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault()
    
    // Check if already installed
    if (checkInstalled()) {
      return
    }

    // Check if user has already dismissed or installed
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    const installed = localStorage.getItem('pwa-installed')
    
    if (dismissed || installed) {
      return
    }

    // Stash the event so it can be triggered later
    setState((prev) => ({
      ...prev,
      canInstall: true,
      deferredPrompt: event,
      showPrompt: true,
      isLoading: false,
    }))
  }, [checkInstalled])

  // Handle successful installation
  const handleAppInstalled = useCallback(() => {
    console.log('[PWA] App was installed successfully')
    
    localStorage.setItem('pwa-installed', 'true')
    
    setState((prev) => ({
      ...prev,
      canInstall: false,
      isInstalled: true,
      showPrompt: false,
      deferredPrompt: null,
    }))
  }, [])

  // Dismiss the install prompt
  const dismissPrompt = useCallback(() => {
    localStorage.setItem('pwa-install-dismissed', 'true')
    
    setState((prev) => ({
      ...prev,
      showPrompt: false,
    }))
  }, [])

  // Trigger the install prompt
  const triggerInstall = useCallback(async (): Promise<boolean> => {
    const { deferredPrompt } = state
    
    if (!deferredPrompt) {
      console.log('[PWA] No install prompt available')
      return false
    }

    // Show the prompt
    const promptEvent = deferredPrompt as any
    await promptEvent.prompt()

    // Wait for the user to respond
    const { outcome } = await promptEvent.userChoice

    console.log('[PWA] User response to install prompt:', outcome)

    // Clear the saved prompt
    localStorage.setItem('pwa-install-dismissed', 'true')
    
    setState((prev) => ({
      ...prev,
      deferredPrompt: null,
      showPrompt: false,
      canInstall: outcome === 'accepted',
      isInstalled: outcome === 'accepted',
    }))

    return outcome === 'accepted'
  }, [state.deferredPrompt])

  // Set up event listeners
  useEffect(() => {
    if (typeof window === 'undefined') {
      setState((prev) => ({ ...prev, isLoading: false }))
      return
    }

    // Check if already installed
    if (checkInstalled()) {
      setState((prev) => ({
        ...prev,
        isInstalled: true,
        isLoading: false,
      }))
      return
    }

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener)
    
    // Listen for successful installation
    window.addEventListener('appinstalled', handleAppInstalled)

    // Check if prompt was already dismissed
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    const installed = localStorage.getItem('pwa-installed')
    
    if (dismissed || installed) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }))
    } else {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }))
    }

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [handleBeforeInstallPrompt, handleAppInstalled, checkInstalled])

  return {
    ...state,
    dismissPrompt,
    triggerInstall,
    checkInstalled,
  }
}

export default usePWAInstall