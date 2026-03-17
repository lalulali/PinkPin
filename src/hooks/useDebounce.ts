import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * Debounce hook - delays invoking a function until after a specified delay
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Debounced callback hook - creates a debounced version of a callback function
 * @param callback - The callback function to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns The debounced callback
 */
export function useDebouncedCallback<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  delay: number = 300
): T {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Keep callback ref updated
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args)
      }, delay)
    }) as T,
    [delay]
  )
}

/**
 * Debounced state hook - manages a debounced version of state
 * @param initialValue - Initial value
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns [debouncedValue, setValue, cancel] tuple
 */
export function useDebouncedState<T>(initialValue: T, delay: number = 300): [T, (value: T) => void, () => void] {
  const [value, setValue] = useState(initialValue)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedSetValue = useCallback((newValue: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setValue(newValue)
    }, delay)
  }, [delay])

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return [value, debouncedSetValue, cancel]
}