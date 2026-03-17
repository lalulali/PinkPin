/**
 * AutoSaveIndicator - Displays auto-save status and last saved time
 * Implements accessible status updates with ARIA live regions
 */

import { useEffect, useState } from 'react'

interface AutoSaveIndicatorProps {
  lastSavedTime: Date | null
  isSaving: boolean
}

export function AutoSaveIndicator({ lastSavedTime, isSaving }: AutoSaveIndicatorProps) {
  const [displayText, setDisplayText] = useState<string>('')

  useEffect(() => {
    if (isSaving) {
      setDisplayText('Saving...')
      return
    }

    if (!lastSavedTime) {
      setDisplayText('')
      return
    }

    // Format the last saved time
    const now = new Date()
    const diffMs = now.getTime() - lastSavedTime.getTime()
    const diffSecs = Math.floor(diffMs / 1000)
    const diffMins = Math.floor(diffSecs / 60)

    if (diffSecs < 60) {
      setDisplayText('Saved just now')
    } else if (diffMins < 60) {
      setDisplayText(`Saved ${diffMins} min${diffMins > 1 ? 's' : ''} ago`)
    } else {
      setDisplayText(`Saved at ${lastSavedTime.toLocaleTimeString()}`)
    }

    // Update display every minute
    const interval = setInterval(() => {
      const newNow = new Date()
      const newDiffMs = newNow.getTime() - lastSavedTime.getTime()
      const newDiffSecs = Math.floor(newDiffMs / 1000)
      const newDiffMins = Math.floor(newDiffSecs / 60)

      if (newDiffSecs < 60) {
        setDisplayText('Saved just now')
      } else if (newDiffMins < 60) {
        setDisplayText(`Saved ${newDiffMins} min${newDiffMins > 1 ? 's' : ''} ago`)
      } else {
        setDisplayText(`Saved at ${lastSavedTime.toLocaleTimeString()}`)
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [lastSavedTime, isSaving])

  if (!displayText) {
    return null
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600" role="status" aria-live="polite">
      {isSaving ? (
        <>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" aria-hidden="true" />
          <span>{displayText}</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>{displayText}</span>
        </>
      )}
    </div>
  )
}

export default AutoSaveIndicator
