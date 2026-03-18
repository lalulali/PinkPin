/**
 * Badge Wrapper Component
 * 
 * Wrapper for shadcn/ui Badge component that maintains backward compatibility
 * with the existing component API while leveraging shadcn/ui's styling capabilities.
 * 
 * Requirements: 10.1, 10.2, 10.3, 10.4
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export type BadgeVariant = 'submitted' | 'waiting' | 'closed' | 'cancelled' | 'default'

export interface BadgeProps {
  /** Badge variant/color */
  variant?: BadgeVariant
  /** Badge content */
  children: React.ReactNode
  /** Additional CSS classes */
  className?: string
}

/**
 * Color mapping for badge variants
 */
const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  submitted: { bg: 'bg-blue-100', text: 'text-blue-800' },
  waiting: { bg: 'bg-amber-100', text: 'text-amber-800' },
  closed: { bg: 'bg-green-100', text: 'text-green-800' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800' },
  default: { bg: 'bg-gray-100', text: 'text-gray-800' },
}

/**
 * Label mapping for badge variants
 */
const variantLabels: Record<BadgeVariant, string> = {
  submitted: 'Shipment Created',
  waiting: 'Waiting for Pick Up',
  closed: 'Delivery Completed',
  cancelled: 'Shipment Cancelled',
  default: '',
}

/**
 * Badge component that displays status indicators with consistent color mapping.
 * 
 * Styling:
 * - rounded-full
 * - px-2 py-0.5
 * - text-xs
 */
export const Badge = function Badge(
  {
    variant = 'default',
    children,
    className,
  }: BadgeProps
) {
  const colors = variantColors[variant]
  const label = variantLabels[variant]

  return (
    <span
      className={cn(
        // Base styling per requirements
        'rounded-full',
        'px-2',
        'py-0.5',
        'text-xs',
        // Font weight for better readability
        'font-medium',
        // Color variants
        colors.bg,
        colors.text,
        className
      )}
      role="status"
      aria-label={label}
    >
      {children || label}
    </span>
  )
}

Badge.displayName = 'Badge'

export default Badge