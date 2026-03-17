import { useState, useCallback } from 'react'
import { StorageError, isStorageError } from '@/src/services/storage'

/**
 * State for storage error handling
 */
interface StorageErrorState {
  error: StorageError | null
  isVisible: boolean
}

/**
 * Hook to handle storage errors with retry functionality
 * Implements Requirements 3.5, 3.7
 * - Displays user-friendly error message
 * - Logs error details with timestamp and operation type
 * - Provides "Retry" button to attempt operation again
 * - Shows cached data if available
 */
export function useStorageError<T = unknown>() {
  const [errorState, setErrorState] = useState<StorageErrorState>({
    error: null,
    isVisible: false,
  })
  const [cachedData, setCachedData] = useState<T | null>(null)

  /**
   * Handle a storage error
   */
  const handleError = useCallback((error: Error | unknown, data?: T | null) => {
    if (isStorageError(error)) {
      setErrorState({
        error,
        isVisible: true,
      })
      // Log error details with timestamp and operation type (Requirement 3.5)
      console.error(
        `[Storage Error] Operation: ${error.operation}, Timestamp: ${error.timestamp.toISOString()}, Message: ${error.message}`
      )
    } else {
      const genericError = new StorageError(
        'getOrders',
        error instanceof Error ? error.message : 'An unexpected error occurred'
      )
      setErrorState({
        error: genericError,
        isVisible: true,
      })
      console.error('[Storage Error] Unexpected error:', error)
    }

    if (data !== undefined && data !== null) {
      setCachedData(data)
    }
  }, [])

  /**
   * Clear the error and hide the error display
   */
  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      isVisible: false,
    })
    setCachedData(null)
  }, [])

  /**
   * Retry the failed operation
   */
  const retry = useCallback(async (retryFn: () => Promise<void>) => {
    try {
      await retryFn()
      clearError()
    } catch (error) {
      handleError(error, cachedData)
    }
  }, [clearError, handleError, cachedData])

  return {
    error: errorState.error,
    isErrorVisible: errorState.isVisible,
    cachedData,
    handleError,
    clearError,
    retry,
  }
}

export default useStorageError