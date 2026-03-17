import { useEffect, useRef, useState } from 'react'

interface UseAutoSaveOptions {
  interval?: number // milliseconds
  storageKey: string
}

/**
 * Custom hook for auto-saving form data to localStorage
 * Saves data at specified intervals and restores on mount
 */
export function useAutoSave<T>(
  data: T,
  options: UseAutoSaveOptions
) {
  const { interval = 30000, storageKey } = options
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Save data to localStorage
  const saveData = (dataToSave: T) => {
    try {
      setIsSaving(true)
      localStorage.setItem(storageKey, JSON.stringify(dataToSave))
      setLastSavedTime(new Date())
      setIsSaving(false)
    } catch (error) {
      console.error('Failed to auto-save form data:', error)
      setIsSaving(false)
    }
  }

  // Restore data from localStorage
  const restoreData = (): T | null => {
    try {
      const stored = localStorage.getItem(storageKey)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error('Failed to restore form data:', error)
      return null
    }
  }

  // Clear saved data
  const clearSavedData = () => {
    try {
      localStorage.removeItem(storageKey)
      setLastSavedTime(null)
    } catch (error) {
      console.error('Failed to clear saved form data:', error)
    }
  }

  // Set up auto-save interval
  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(() => {
      saveData(data)
    }, interval)

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [data, interval])

  return {
    lastSavedTime,
    isSaving,
    restoreData,
    clearSavedData,
    saveData,
  }
}
