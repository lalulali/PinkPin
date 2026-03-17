/**
 * Formatting utilities for display values
 * Implements Requirements 3.1, 3.5, 3.7
 */

import { isValidAmount, formatCurrencySafe } from './edgeCases'

// ============================================================================
// Currency Formatting
// ============================================================================

/**
 * Format a number as IDR currency (Requirement 3.1)
 * Handles edge cases: null, undefined, NaN, negative values
 */
export function formatCurrency(amount: number | null | undefined): string {
  return formatCurrencySafe(amount)
}

/**
 * Format currency with custom options
 */
export function formatCurrencyWithOptions(
  amount: number | null | undefined,
  options: Intl.NumberFormatOptions
): string {
  if (!isValidAmount(amount)) {
    return 'Rp 0'
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  }).format(amount!)
}

/**
 * Format currency compact (e.g., "Rp 10K", "Rp 1.5M")
 */
export function formatCurrencyCompact(amount: number | null | undefined): string {
  if (!isValidAmount(amount)) {
    return 'Rp 0'
  }

  const absAmount = Math.abs(amount!)
  const sign = amount! < 0 ? '-' : ''

  if (absAmount >= 1_000_000_000) {
    return `${sign}Rp ${(absAmount / 1_000_000_000).toFixed(1)}B`
  }
  if (absAmount >= 1_000_000) {
    return `${sign}Rp ${(absAmount / 1_000_000).toFixed(1)}M`
  }
  if (absAmount >= 1_000) {
    return `${sign}Rp ${(absAmount / 1_000).toFixed(1)}K`
  }

  return `${sign}Rp ${absAmount.toFixed(0)}`
}

// ============================================================================
// Distance Formatting
// ============================================================================

/**
 * Format distance in kilometers with 1 decimal place
 */
export function formatDistance(distance: number | null | undefined): string {
  if (
    distance === null ||
    distance === undefined ||
    Number.isNaN(distance) ||
    !Number.isFinite(distance) ||
    distance < 0
  ) {
    return '- km'
  }

  return `${distance.toFixed(1)} km`
}

/**
 * Format distance compact (e.g., "2.5 km", "1000 m")
 */
export function formatDistanceCompact(distance: number | null | undefined): string {
  if (
    distance === null ||
    distance === undefined ||
    Number.isNaN(distance) ||
    !Number.isFinite(distance) ||
    distance < 0
  ) {
    return '-'
  }

  if (distance < 1) {
    // Convert to meters if less than 1 km
    const meters = Math.round(distance * 1000)
    return `${meters} m`
  }

  return `${distance.toFixed(1)} km`
}

// ============================================================================
// Date Formatting
// ============================================================================

/**
 * Format date as long date string
 */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '-'

  const d = typeof date === 'string' ? new Date(date) : date

  if (Number.isNaN(d.getTime())) return '-'

  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

/**
 * Format date as short date string
 */
export function formatDateShort(date: Date | string | null | undefined): string {
  if (!date) return '-'

  const d = typeof date === 'string' ? new Date(date) : date

  if (Number.isNaN(d.getTime())) return '-'

  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d)
}

/**
 * Format date and time
 */
export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return '-'

  const d = typeof date === 'string' ? new Date(date) : date

  if (Number.isNaN(d.getTime())) return '-'

  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

/**
 * Format relative time (e.g., "2 hours ago", "3 days ago")
 */
export function formatRelativeTime(date: Date | string | null | undefined): string {
  if (!date) return 'unknown'

  const d = typeof date === 'string' ? new Date(date) : date

  if (Number.isNaN(d.getTime())) return 'unknown'

  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`

  return formatDate(d)
}

// ============================================================================
// Phone Number Formatting
// ============================================================================

/**
 * Format phone number for display
 */
export function formatPhone(phone: string | null | undefined): string {
  if (!phone) return '-'

  // Keep original format but clean up whitespace
  return phone.trim()
}

/**
 * Format phone number as clickable tel link
 */
export function formatPhoneLink(phone: string | null | undefined): string {
  if (!phone) return ''

  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '')
  return cleaned
}

// ============================================================================
// Weight and Dimensions Formatting
// ============================================================================

/**
 * Format weight in kilograms
 */
export function formatWeight(weight: number | null | undefined): string {
  if (
    weight === null ||
    weight === undefined ||
    Number.isNaN(weight) ||
    !Number.isFinite(weight) ||
    weight < 0
  ) {
    return '- kg'
  }

  return `${weight.toFixed(2)} kg`
}

/**
 * Format dimensions as L x W x H
 */
export function formatDimensions(
  dimensions: { length: number; width: number; height: number } | null | undefined
): string {
  if (!dimensions) return '- cm'

  const { length, width, height } = dimensions

  if (
    Number.isNaN(length) ||
    Number.isNaN(width) ||
    Number.isNaN(height) ||
    !Number.isFinite(length) ||
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    length < 0 ||
    width < 0 ||
    height < 0
  ) {
    return '- cm'
  }

  return `${length.toFixed(1)} x ${width.toFixed(1)} x ${height.toFixed(1)} cm`
}

// ============================================================================
// Order Status Formatting
// ============================================================================

/**
 * Format order status for display
 */
export function formatOrderStatus(status: string | null | undefined): string {
  if (!status) return 'Unknown'

  const statusMap: Record<string, string> = {
    submitted: 'Shipment Created',
    waiting: 'Waiting for Pick Up',
    closed: 'Delivery Completed',
    cancelled: 'Shipment Cancelled',
  }

  return statusMap[status] || status
}

/**
 * Format service type for display
 */
export function formatServiceType(serviceType: string | null | undefined): string {
  if (!serviceType) return 'Standard'

  const typeMap: Record<string, string> = {
    standard: 'Standard',
    express: 'Express',
    'same-day': 'Same-Day',
  }

  return typeMap[serviceType] || serviceType
}

// ============================================================================
// Number Formatting
// ============================================================================

/**
 * Format number with thousand separators
 */
export function formatNumber(
  value: number | null | undefined,
  decimals: number = 0
): string {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(value) ||
    !Number.isFinite(value)
  ) {
    return '-'
  }

  return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

/**
 * Format percentage
 */
export function formatPercentage(
  value: number | null | undefined,
  decimals: number = 1
): string {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(value) ||
    !Number.isFinite(value)
  ) {
    return '-%'
  }

  return `${value.toFixed(decimals)}%`
}

// ============================================================================
// Export all formatting functions
// ============================================================================