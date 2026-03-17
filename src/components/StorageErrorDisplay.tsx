/**
 * StorageErrorDisplay - Displays storage-related errors with retry option
 * Implements Requirements 3.5, 3.7
 */

'use client'

import { useCallback } from 'react'
import { EmptyState } from './EmptyState'

interface StorageErrorDisplayProps {
  operation: 'read' | 'write' | 'delete'
  error?: Error | null
  onRetry?: () => void
  onFallback?: () => void
}

/**
 * StorageErrorDisplay - Shows user-friendly error for storage operations
 */
export function StorageErrorDisplay({
  operation,
  error,
  onRetry,
  onFallback,
}: StorageErrorDisplayProps) {
  const getErrorMessage = () => {
    switch (operation) {
      case 'read':
        return {
          title: 'Unable to load data',
          description: 'We couldn\'t retrieve your data. Please try again.',
        }
      case 'write':
        return {
          title: 'Unable to save',
          description: 'Your changes couldn\'t be saved. Please try again.',
        }
      case 'delete':
        return {
          title: 'Unable to delete',
          description: 'The item couldn\'t be deleted. Please try again.',
        }
      default:
        return {
          title: 'Something went wrong',
          description: 'An error occurred. Please try again.',
        }
    }
  }

  const { title, description } = getErrorMessage()

  return (
    <EmptyState
      variant="error"
      title={title}
      description={description}
      action={
        onRetry
          ? {
              label: 'Retry',
              onClick: onRetry,
            }
          : undefined
      }
    />
  )
}

/**
 * useStorageError - Hook for handling storage errors
 */
export function useStorageError() {
  const handleError = useCallback((error: Error) => {
    console.error('Storage error:', error)
    // In production, you might want to send this to an error tracking service
  }, [])

  return { handleError }
}

export default StorageErrorDisplay