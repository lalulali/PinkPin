/**
 * Calculation utilities for distance and shipping fees
 */

import { ServiceType, Coordinates } from '@/src/types'

/**
 * Calculate great-circle distance between two coordinates using haversine formula
 * Returns distance in kilometers
 */
export function calculateDistance(from: Coordinates, to: Coordinates): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = ((to.lat - from.lat) * Math.PI) / 180
  const dLng = ((to.lng - from.lng) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((from.lat * Math.PI) / 180) *
      Math.cos((to.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  // Round to 1 decimal place
  return Math.round(distance * 10) / 10
}

/**
 * Get shipping fee rates for a service type
 */
export function getShippingRates(serviceType: ServiceType): { baseFee: number; rate: number } {
  switch (serviceType) {
    case 'standard':
      return { baseFee: 10000, rate: 5000 }
    case 'express':
      return { baseFee: 20000, rate: 7500 }
    case 'same-day':
      return { baseFee: 30000, rate: 10000 }
    default:
      return { baseFee: 10000, rate: 5000 }
  }
}

/**
 * Calculate shipping fee: base_fee + (distance * rate)
 */
export function calculateShippingFee(distance: number, serviceType: ServiceType): number {
  const { baseFee, rate } = getShippingRates(serviceType)
  const fee = baseFee + distance * rate
  return Math.round(fee)
}

/**
 * Validate if distance is within 3 km limit
 */
export function isDistanceValid(distance: number): boolean {
  return distance <= 3
}

/**
 * Format a fee amount as currency string (IDR)
 * Input is in IDR (e.g., 10000 = 100.00)
 */
export function formatCurrency(fee: number): string {
  const amount = fee / 100
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
