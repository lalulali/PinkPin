/**
 * EmptyState - Displayed when no orders match the filter criteria or data is unavailable
 * Implements variant content mapping (orders, outlets, search, offline, error)
 * Action button support with aria-live attributes for announcements
 * Built on shadcn/ui patterns
 */

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/src/components/ui/button'

export type EmptyStateVariant = 'default' | 'orders' | 'outlets' | 'search' | 'offline' | 'error'

export interface EmptyStateProps {
  variant?: EmptyStateVariant
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  icon?: ReactNode
  className?: string
}

/**
 * Get default content based on variant
 */
function getDefaultContent(variant: EmptyStateVariant): { title: string; description: string } {
  switch (variant) {
    case 'orders':
      return {
        title: 'No orders found',
        description: "You haven't created any orders yet. Create your first order to get started.",
      }
    case 'outlets':
      return {
        title: 'No outlets available',
        description: 'No outlets have been configured. Please contact support or add outlets in your account settings.',
      }
    case 'search':
      return {
        title: 'No results found',
        description: 'Try adjusting your search or filters to find what you\'re looking for.',
      }
    case 'offline':
      return {
        title: 'You\'re offline',
        description: 'Some features may be limited while offline. Your data will sync when you\'re back online.',
      }
    case 'error':
      return {
        title: 'Unable to load data',
        description: 'There was a problem loading the data. Please try again.',
      }
    default:
      return {
        title: 'No data available',
        description: '',
      }
  }
}

/**
 * Get default icon based on variant
 */
function getDefaultIcon(variant: EmptyStateVariant): ReactNode {
  const iconClass = 'w-8 h-8 text-gray-400'

  switch (variant) {
    case 'orders':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      )
    case 'outlets':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      )
    case 'search':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      )
    case 'offline':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
          />
        </svg>
      )
    case 'error':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      )
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      )
  }
}

/**
 * EmptyState - A reusable component for displaying empty states
 * Handles various edge cases: empty order lists, missing outlet data, search results, offline states
 */
export function EmptyState({
  variant = 'default',
  title,
  description,
  action,
  icon,
  className,
}: EmptyStateProps) {
  const defaults = getDefaultContent(variant)
  const displayTitle = title ?? defaults.title
  const displayDescription = description ?? defaults.description
  const displayIcon = icon ?? getDefaultIcon(variant)

  return (
    <div
      className={cn("flex flex-col items-center justify-center py-12 px-4", className)}
      role="status"
      aria-live="polite"
    >
      {/* Icon */}
      <div
        className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4"
        aria-hidden="true"
      >
        {displayIcon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{displayTitle}</h3>

      {/* Description */}
      {displayDescription && (
        <p className="text-sm text-gray-600 text-center max-w-sm mb-4">{displayDescription}</p>
      )}

      {/* Action button */}
      {action && (
        <Button
          variant="default"
          onClick={action.onClick}
          className="bg-[#ED0577] hover:bg-[#d90466] min-h-[44px] min-w-[100px]"
          aria-label={action.label}
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}

export default EmptyState