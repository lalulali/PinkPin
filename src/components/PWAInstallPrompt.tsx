/**
 * PWAInstallPrompt - Component that displays "Add to Home Screen" prompt
 * Only shows on mobile devices when PWA installation is available
 * Dismissible by user choice
 */

'use client'

import { useEffect, useState } from 'react'
import { usePWAInstall } from '@/src/hooks/usePWAInstall'

export function PWAInstallPrompt() {
  const { canInstall, showPrompt, isLoading, dismissPrompt, triggerInstall, checkInstalled } = usePWAInstall()
  const [isVisible, setIsVisible] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Only show on mobile devices
  const isMobile = typeof window !== 'undefined' && 
    (window.innerWidth <= 768 || 
     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))

  useEffect(() => {
    // Delay showing to avoid showing immediately on page load
    const timer = setTimeout(() => {
      if (canInstall && showPrompt && isMobile && !checkInstalled()) {
        setIsVisible(true)
      }
    }, 30000) // Show after 30 seconds to not be intrusive

    return () => clearTimeout(timer)
  }, [canInstall, showPrompt, isMobile, checkInstalled])

  const handleInstall = async () => {
    setHasInteracted(true)
    const success = await triggerInstall()
    if (success) {
      setIsVisible(false)
    }
  }

  const handleDismiss = () => {
    setHasInteracted(true)
    dismissPrompt()
    setIsVisible(false)
  }

  // Don't render if not applicable
  if (isLoading || !canInstall || !showPrompt || !isMobile || checkInstalled()) {
    return null
  }

  // Don't show if already interacted with
  if (hasInteracted) {
    return null
  }

  return (
    <>
      {/* Backdrop */}
      {isVisible && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
          onClick={handleDismiss}
          aria-hidden="true"
        />
      )}

      {/* Install Prompt */}
      {isVisible && (
        <div 
          className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-install-title"
          aria-describedby="pwa-install-description"
        >
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-md mx-auto">
            {/* Header with icon */}
            <div className="bg-[#ED0577] px-4 py-3 flex items-center gap-3">
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" 
                />
              </svg>
              <h3 
                id="pwa-install-title" 
                className="text-white font-semibold text-lg"
              >
                Install Pink Pin Merchant
              </h3>
            </div>

            {/* Content */}
            <div className="p-4">
              <p 
                id="pwa-install-description" 
                className="text-gray-600 text-sm mb-4"
              >
                Add Pink Pin Merchant to your home screen for quick access and offline functionality.
              </p>

              {/* Feature list */}
              <ul className="text-sm text-gray-500 space-y-2 mb-4" aria-label="Features">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Access orders offline</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Fast access from home screen</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Full-screen experience</span>
                </li>
              </ul>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleInstall}
                  className="flex-1 bg-[#ED0577] text-white py-2.5 px-4 rounded-lg font-medium hover:bg-[#d9066a] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ED0577]"
                  aria-label="Install Pink Pin Merchant app"
                >
                  Install
                </button>
                <button
                  onClick={handleDismiss}
                  className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                  aria-label="Dismiss install prompt"
                >
                  Not Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PWAInstallPrompt