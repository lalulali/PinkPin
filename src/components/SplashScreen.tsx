/**
 * SplashScreen - Displays Pink Pin branding on app launch
 * Shows during initial load and when app is launched from home screen in standalone mode
 */

'use client'

import { useEffect, useState } from 'react'

interface SplashScreenProps {
  minimumDuration?: number // Minimum time to show splash (ms)
  onComplete?: () => void // Callback when splash screen completes
}

export function SplashScreen({ minimumDuration = 1500, onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Hide splash screen after minimum duration
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, minimumDuration)

    // Listen for app ready event from service worker
    const handleAppReady = () => {
      setIsVisible(false)
      onComplete?.()
    }

    window.addEventListener('app-ready', handleAppReady)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('app-ready', handleAppReady)
    }
  }, [minimumDuration, onComplete])

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#FFFFFF',
        // Prevent scrolling and touch interactions
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        touchAction: 'none',
      }}
      role="alert"
      aria-label="Loading Pink Pin Merchant App"
    >
      {/* Pink Pin Logo */}
      <div className="flex flex-col items-center gap-4">
        {/* Logo Icon */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#ED0577' }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Pin icon shape */}
            <circle cx="32" cy="24" r="16" fill="white" />
            <path
              d="M32 44C32 44 20 56 20 62H44C44 56 32 44 32 44Z"
              fill="white"
            />
            <circle cx="32" cy="24" r="6" fill="#ED0577" />
          </svg>
        </div>

        {/* App Name */}
        <h1
          className="text-2xl font-bold"
          style={{ color: '#ED0577' }}
        >
          Pink Pin
        </h1>

        {/* Tagline */}
        <p className="text-sm text-gray-500">
          Merchant App
        </p>

        {/* Loading indicator */}
        <div className="mt-8 flex gap-2" aria-hidden="true">
          <div
            className="w-3 h-3 rounded-full animate-bounce"
            style={{ backgroundColor: '#ED0577', animationDelay: '0ms' }}
          />
          <div
            className="w-3 h-3 rounded-full animate-bounce"
            style={{ backgroundColor: '#ED0577', animationDelay: '150ms' }}
          />
          <div
            className="w-3 h-3 rounded-full animate-bounce"
            style={{ backgroundColor: '#ED0577', animationDelay: '300ms' }}
          />
        </div>
      </div>

      {/* Version info */}
      <div className="absolute bottom-8 text-xs text-gray-400">
        v1.0.0
      </div>
    </div>
  )
}

export default SplashScreen