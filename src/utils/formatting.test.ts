/**
 * Unit tests for formatting utilities
 * Tests currency, distance, date, and other formatting functions
 * Validates: Requirements 3.1, 3.5, 3.7
 */

import { describe, it, expect } from 'vitest'
import * as Formatting from './formatting'

describe('Formatting - Currency Formatting', () => {
  describe('formatCurrency', () => {
    it('should format positive amounts correctly', () => {
      expect(Formatting.formatCurrency(10000)).toMatch(/^Rp\s?10\.000$/)
      expect(Formatting.formatCurrency(15000)).toMatch(/^Rp\s?15\.000$/)
      expect(Formatting.formatCurrency(25000)).toMatch(/^Rp\s?25\.000$/)
      expect(Formatting.formatCurrency(100000)).toMatch(/^Rp\s?100\.000$/)
      expect(Formatting.formatCurrency(1000000)).toMatch(/^Rp\s?1\.000\.000$/)
    })

    it('should handle zero', () => {
      expect(Formatting.formatCurrency(0)).toMatch(/^Rp\s?0$/)
    })

    it('should handle null and undefined', () => {
      expect(Formatting.formatCurrency(null)).toMatch(/^Rp\s?0$/)
      expect(Formatting.formatCurrency(undefined)).toMatch(/^Rp\s?0$/)
    })

    it('should handle NaN', () => {
      expect(Formatting.formatCurrency(NaN as any)).toMatch(/^Rp\s?0$/)
    })
  })

  describe('formatCurrencyCompact', () => {
    it('should format thousands compactly', () => {
      expect(Formatting.formatCurrencyCompact(5000)).toBe('Rp 5.0K')
      expect(Formatting.formatCurrencyCompact(15000)).toBe('Rp 15.0K')
      expect(Formatting.formatCurrencyCompact(999000)).toBe('Rp 999.0K')
    })

    it('should format millions compactly', () => {
      expect(Formatting.formatCurrencyCompact(1000000)).toBe('Rp 1.0M')
      expect(Formatting.formatCurrencyCompact(1500000)).toBe('Rp 1.5M')
      expect(Formatting.formatCurrencyCompact(1000000000)).toBe('Rp 1.0B')
    })

    it('should handle null and undefined', () => {
      expect(Formatting.formatCurrencyCompact(null)).toBe('Rp 0')
      expect(Formatting.formatCurrencyCompact(undefined)).toBe('Rp 0')
    })
  })
})

describe('Formatting - Distance Formatting', () => {
  describe('formatDistance', () => {
    it('should format distance with 1 decimal place', () => {
      expect(Formatting.formatDistance(1.5)).toBe('1.5 km')
      expect(Formatting.formatDistance(2.25)).toBe('2.3 km')
      expect(Formatting.formatDistance(3)).toBe('3.0 km')
      expect(Formatting.formatDistance(0.5)).toBe('0.5 km')
    })

    it('should handle zero', () => {
      expect(Formatting.formatDistance(0)).toBe('0.0 km')
    })

    it('should return placeholder for invalid values', () => {
      expect(Formatting.formatDistance(null)).toBe('- km')
      expect(Formatting.formatDistance(undefined)).toBe('- km')
      expect(Formatting.formatDistance(NaN as any)).toBe('- km')
      expect(Formatting.formatDistance(-1 as any)).toBe('- km')
    })
  })

  describe('formatDistanceCompact', () => {
    it('should format meters for distances under 1 km', () => {
      expect(Formatting.formatDistanceCompact(0.5)).toBe('500 m')
      expect(Formatting.formatDistanceCompact(0.1)).toBe('100 m')
      expect(Formatting.formatDistanceCompact(0.99)).toBe('990 m')
    })

    it('should format km for distances 1 km or more', () => {
      expect(Formatting.formatDistanceCompact(1)).toBe('1.0 km')
      expect(Formatting.formatDistanceCompact(2.5)).toBe('2.5 km')
    })

    it('should handle invalid values', () => {
      expect(Formatting.formatDistanceCompact(null)).toBe('-')
      expect(Formatting.formatDistanceCompact(undefined)).toBe('-')
    })
  })
})

describe('Formatting - Date Formatting', () => {
  const testDate = new Date('2024-01-15T10:30:00')

  describe('formatDate', () => {
    it('should format date in long format', () => {
      expect(Formatting.formatDate(testDate)).toBe('15 Januari 2024')
    })

    it('should handle string dates', () => {
      expect(Formatting.formatDate('2024-01-15')).toBe('15 Januari 2024')
    })

    it('should return placeholder for null/undefined', () => {
      expect(Formatting.formatDate(null)).toBe('-')
      expect(Formatting.formatDate(undefined)).toBe('-')
    })
  })

  describe('formatDateShort', () => {
    it('should format date in short format', () => {
      expect(Formatting.formatDateShort(testDate)).toBe('15 Jan 2024')
    })

    it('should return placeholder for null/undefined', () => {
      expect(Formatting.formatDateShort(null)).toBe('-')
    })
  })

  describe('formatDateTime', () => {
    it('should format date with time', () => {
      expect(Formatting.formatDateTime(testDate)).toBe('15 Januari 2024 pukul 10.30')
    })

    it('should return placeholder for null/undefined', () => {
      expect(Formatting.formatDateTime(null)).toBe('-')
    })
  })

  describe('formatRelativeTime', () => {
    it('should return "just now" for recent times', () => {
      const now = new Date()
      expect(Formatting.formatRelativeTime(now)).toBe('just now')
    })

    it('should format minutes ago', () => {
      const fiveMinsAgo = new Date(Date.now() - 5 * 60000)
      expect(Formatting.formatRelativeTime(fiveMinsAgo)).toBe('5 minutes ago')
    })

    it('should format hours ago', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 3600000)
      expect(Formatting.formatRelativeTime(twoHoursAgo)).toBe('2 hours ago')
    })

    it('should format days ago', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 86400000)
      expect(Formatting.formatRelativeTime(threeDaysAgo)).toBe('3 days ago')
    })

    it('should return placeholder for null/undefined', () => {
      expect(Formatting.formatRelativeTime(null)).toBe('unknown')
    })
  })
})

describe('Formatting - Phone Formatting', () => {
  describe('formatPhone', () => {
    it('should clean up whitespace', () => {
      expect(Formatting.formatPhone('  0812 3456 7890  ')).toBe('0812 3456 7890')
    })

    it('should return placeholder for null/undefined', () => {
      expect(Formatting.formatPhone(null)).toBe('-')
      expect(Formatting.formatPhone(undefined)).toBe('-')
    })
  })

  describe('formatPhoneLink', () => {
    it('should clean phone number for tel link', () => {
      expect(Formatting.formatPhoneLink('+62 812-3456-7890')).toBe('+6281234567890')
      expect(Formatting.formatPhoneLink('(021) 1234 5678')).toBe('02112345678')
    })

    it('should return empty string for null/undefined', () => {
      expect(Formatting.formatPhoneLink(null)).toBe('')
      expect(Formatting.formatPhoneLink(undefined)).toBe('')
    })
  })
})

describe('Formatting - Weight and Dimensions', () => {
  describe('formatWeight', () => {
    it('should format weight with 2 decimal places', () => {
      expect(Formatting.formatWeight(1.5)).toBe('1.50 kg')
      expect(Formatting.formatWeight(2.25)).toBe('2.25 kg')
    })

    it('should return placeholder for invalid values', () => {
      expect(Formatting.formatWeight(null)).toBe('- kg')
      expect(Formatting.formatWeight(undefined)).toBe('- kg')
      expect(Formatting.formatWeight(-1 as any)).toBe('- kg')
    })
  })

  describe('formatDimensions', () => {
    it('should format dimensions as L x W x H', () => {
      expect(Formatting.formatDimensions({ length: 10, width: 20, height: 30 })).toBe('10.0 x 20.0 x 30.0 cm')
    })

    it('should handle decimal dimensions', () => {
      expect(Formatting.formatDimensions({ length: 10.5, width: 20.25, height: 30.75 })).toBe('10.5 x 20.3 x 30.8 cm')
    })

    it('should return placeholder for null/undefined', () => {
      expect(Formatting.formatDimensions(null)).toBe('- cm')
      expect(Formatting.formatDimensions(undefined)).toBe('- cm')
    })
  })
})

describe('Formatting - Order Status Formatting', () => {
  describe('formatOrderStatus', () => {
    it('should format status to display text', () => {
      expect(Formatting.formatOrderStatus('submitted')).toBe('Shipment Created')
      expect(Formatting.formatOrderStatus('waiting')).toBe('Waiting for Pick Up')
      expect(Formatting.formatOrderStatus('closed')).toBe('Delivery Completed')
      expect(Formatting.formatOrderStatus('cancelled')).toBe('Shipment Cancelled')
    })

    it('should return original status if unknown', () => {
      expect(Formatting.formatOrderStatus('unknown')).toBe('unknown')
    })

    it('should return placeholder for null/undefined', () => {
      expect(Formatting.formatOrderStatus(null)).toBe('Unknown')
    })
  })

  describe('formatServiceType', () => {
    it('should format service type to display text', () => {
      expect(Formatting.formatServiceType('standard')).toBe('Standard')
      expect(Formatting.formatServiceType('express')).toBe('Express')
      expect(Formatting.formatServiceType('same-day')).toBe('Same-Day')
    })

    it('should return placeholder for null/undefined', () => {
      expect(Formatting.formatServiceType(null)).toBe('Standard')
    })
  })
})

describe('Formatting - Number Formatting', () => {
  describe('formatNumber', () => {
    it('should format with thousand separators', () => {
      expect(Formatting.formatNumber(1000)).toBe('1.000')
      expect(Formatting.formatNumber(1000000)).toBe('1.000.000')
      expect(Formatting.formatNumber(1234567)).toBe('1.234.567')
    })

    it('should handle decimals', () => {
      expect(Formatting.formatNumber(1234.56, 2)).toBe('1.234.56')
    })

    it('should return placeholder for invalid values', () => {
      expect(Formatting.formatNumber(null)).toBe('-')
      expect(Formatting.formatNumber(undefined)).toBe('-')
    })
  })

  describe('formatPercentage', () => {
    it('should format percentage correctly', () => {
      expect(Formatting.formatPercentage(50)).toBe('50.0%')
      expect(Formatting.formatPercentage(99.5)).toBe('99.5%')
      expect(Formatting.formatPercentage(100)).toBe('100.0%')
    })

    it('should return placeholder for invalid values', () => {
      expect(Formatting.formatPercentage(null)).toBe('-%')
    })
  })
})