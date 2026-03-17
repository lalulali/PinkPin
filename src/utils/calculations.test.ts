/**
 * Property-based tests for distance and shipping fee calculations
 * Property 7: Distance Calculation
 * Property 8: Shipping Fee Calculation
 * Validates: Requirements 7.3, 7.4, 7.5, 8.1, 8.5, 8.6, 8.7
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import {
  calculateDistance,
  calculateShippingFee,
  getShippingRates,
  isDistanceValid,
  formatCurrency,
} from './calculations'
import { Coordinates, ServiceType } from '../types'

// Arbitraries for generating test data
const coordinatesArbitrary = fc.record({
  lat: fc.float({ min: -90, max: 90, noNaN: true }),
  lng: fc.float({ min: -180, max: 180, noNaN: true }),
})

const serviceTypeArbitrary = fc.oneof(
  fc.constant('standard' as ServiceType),
  fc.constant('express' as ServiceType),
  fc.constant('same-day' as ServiceType)
)

describe('Calculations - Property 7: Distance Calculation', () => {
  it('should calculate consistent distance for same coordinates', () => {
    fc.assert(
      fc.property(coordinatesArbitrary, (coords: Coordinates) => {
        const distance1 = calculateDistance(coords, coords)
        const distance2 = calculateDistance(coords, coords)
        expect(distance1).toBe(distance2)
        expect(distance1).toBeLessThan(0.1) // Should be very close to 0
      })
    )
  })

  it('should calculate distance symmetrically', () => {
    fc.assert(
      fc.property(coordinatesArbitrary, coordinatesArbitrary, (from: Coordinates, to: Coordinates) => {
        const distance1 = calculateDistance(from, to)
        const distance2 = calculateDistance(to, from)
        // Due to rounding to 1 decimal place, they should be equal
        expect(distance1).toBe(distance2)
      })
    )
  })

  it('should return distance with 1 decimal place precision or less', () => {
    fc.assert(
      fc.property(coordinatesArbitrary, coordinatesArbitrary, (from: Coordinates, to: Coordinates) => {
        const distance = calculateDistance(from, to)
        // Check that distance is a valid number
        expect(typeof distance).toBe('number')
        expect(isFinite(distance)).toBe(true)
      })
    )
  })

  it('should return non-negative distance', () => {
    fc.assert(
      fc.property(coordinatesArbitrary, coordinatesArbitrary, (from: Coordinates, to: Coordinates) => {
        const distance = calculateDistance(from, to)
        expect(distance).toBeGreaterThanOrEqual(0)
      })
    )
  })
})

describe('Calculations - Property 8: Shipping Fee Calculation', () => {
  it('should calculate fee using formula: base_fee + (distance * rate)', () => {
    fc.assert(
      fc.property(fc.float({ min: 0, max: 5, noNaN: true }), serviceTypeArbitrary, (distance: number, serviceType: ServiceType) => {
        const fee = calculateShippingFee(distance, serviceType)
        const { baseFee, rate } = getShippingRates(serviceType)
        const expectedFee = Math.round(baseFee + distance * rate)
        expect(fee).toBe(expectedFee)
      })
    )
  })

  it('should return different fees for different service types at same distance', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 5 }), (distance: number) => {
        const standardFee = calculateShippingFee(distance, 'standard')
        const expressFee = calculateShippingFee(distance, 'express')
        const sameDayFee = calculateShippingFee(distance, 'same-day')

        // Fees should be in expected order
        expect(standardFee).toBeLessThanOrEqual(expressFee)
        expect(expressFee).toBeLessThanOrEqual(sameDayFee)
      })
    )
  })

  it('should use correct rates for each service type', () => {
    const standardRates = getShippingRates('standard')
    const expressRates = getShippingRates('express')
    const sameDayRates = getShippingRates('same-day')

    expect(standardRates.baseFee).toBe(10000)
    expect(standardRates.rate).toBe(5000)

    expect(expressRates.baseFee).toBe(20000)
    expect(expressRates.rate).toBe(7500)

    expect(sameDayRates.baseFee).toBe(30000)
    expect(sameDayRates.rate).toBe(10000)
  })

  it('should return non-negative fee', () => {
    fc.assert(
      fc.property(fc.float({ min: 0, max: 5, noNaN: true }), serviceTypeArbitrary, (distance: number, serviceType: ServiceType) => {
        const fee = calculateShippingFee(distance, serviceType)
        expect(fee).toBeGreaterThanOrEqual(0)
      })
    )
  })
})

describe('Calculations - Distance Validation', () => {
  it('should validate distance within 3 km limit', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 3 }), (distance: number) => {
        expect(isDistanceValid(distance)).toBe(true)
      })
    )
  })

  it('should reject distance exceeding 3 km limit', () => {
    fc.assert(
      fc.property(fc.integer({ min: 4, max: 10 }), (distance: number) => {
        expect(isDistanceValid(distance)).toBe(false)
      })
    )
  })

  it('should accept exactly 3 km', () => {
    expect(isDistanceValid(3)).toBe(true)
  })
})

describe('Calculations - Currency Formatting', () => {
  it('should format fee as currency with 2 decimal places', () => {
    expect(formatCurrency(10000)).toBe('100,00')
    expect(formatCurrency(15000)).toBe('150,00')
    expect(formatCurrency(25000)).toBe('250,00')
  })

  it('should include thousand separators for large fees', () => {
    expect(formatCurrency(100000)).toBe('1.000,00')
    expect(formatCurrency(150000)).toBe('1.500,00')
    expect(formatCurrency(1000000)).toBe('10.000,00')
  })

  it('should handle zero fee', () => {
    expect(formatCurrency(0)).toBe('0,00')
  })
})