/**
 * Edge case handling utilities for coordinates, distance, and currency
 * Implements Requirements 3.1, 3.5, 3.7
 */

import { Coordinates } from '@/src/types';
import { ErrorCode, createError, Result, success, failure } from './errorHandling';

// ============================================================================
// Coordinate Validation and Handling
// ============================================================================

/**
 * Valid latitude range
 */
const LATITUDE_MIN = -90;
const LATITUDE_MAX = 90;

/**
 * Valid longitude range
 */
const LONGITUDE_MIN = -180;
const LONGITUDE_MAX = 180;

/**
 * Check if coordinates are valid (Requirement 3.1)
 */
export function isValidCoordinates(coordinates: Coordinates | null | undefined): boolean {
  if (!coordinates) return false;

  const { lat, lng } = coordinates;

  // Check for NaN or Infinity
  if (Number.isNaN(lat) || Number.isNaN(lng)) return false;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false;

  // Check range
  if (lat < LATITUDE_MIN || lat > LATITUDE_MAX) return false;
  if (lng < LONGITUDE_MIN || lng > LONGITUDE_MAX) return false;

  return true;
}

/**
 * Validate coordinates and return a Result (Requirement 3.1)
 */
export function validateCoordinates(
  coordinates: Coordinates | null | undefined
): Result<Coordinates> {
  if (!coordinates) {
    return failure(
      createError(ErrorCode.VALIDATION_COORDINATES, {
        reason: 'Coordinates are null or undefined',
      })
    );
  }

  const { lat, lng } = coordinates;

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return failure(
      createError(ErrorCode.VALIDATION_COORDINATES, {
        reason: 'Coordinates contain NaN values',
        lat,
        lng,
      })
    );
  }

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return failure(
      createError(ErrorCode.VALIDATION_COORDINATES, {
        reason: 'Coordinates contain non-finite values',
        lat,
        lng,
      })
    );
  }

  if (lat < LATITUDE_MIN || lat > LATITUDE_MAX) {
    return failure(
      createError(ErrorCode.VALIDATION_COORDINATES, {
        reason: 'Latitude out of valid range',
        lat,
        validRange: { min: LATITUDE_MIN, max: LATITUDE_MAX },
      })
    );
  }

  if (lng < LONGITUDE_MIN || lng > LONGITUDE_MAX) {
    return failure(
      createError(ErrorCode.VALIDATION_COORDINATES, {
        reason: 'Longitude out of valid range',
        lng,
        validRange: { min: LONGITUDE_MIN, max: LONGITUDE_MAX },
      })
    );
  }

  return success({ lat, lng });
}

/**
 * Safe coordinate creation with defaults
 */
export function createCoordinates(
  lat: number | null | undefined,
  lng: number | null | undefined
): Coordinates | null {
  if (lat === null || lat === undefined || lng === null || lng === undefined) {
    return null;
  }

  const coords: Coordinates = {
    lat: Number(lat),
    lng: Number(lng),
  };

  return isValidCoordinates(coords) ? coords : null;
}

/**
 * Parse coordinates from string input
 */
export function parseCoordinates(input: string): Result<Coordinates> {
  // Try to parse as "lat,lng" format
  const parts = input.split(',').map((s) => parseFloat(s.trim()));

  if (parts.length !== 2 || parts.some((p) => Number.isNaN(p))) {
    return failure(
      createError(ErrorCode.VALIDATION_COORDINATES, {
        reason: 'Invalid coordinate format',
        input,
        expectedFormat: 'lat,lng',
      })
    );
  }

  return validateCoordinates({ lat: parts[0], lng: parts[1] });
}

// ============================================================================
// Distance Handling
// ============================================================================

/**
 * Maximum allowed distance in kilometers
 */
export const MAX_DISTANCE_KM = 3;

/**
 * Minimum positive distance threshold (to avoid floating point issues)
 */
export const MIN_POSITIVE_DISTANCE = 0.001;

/**
 * Handle zero distance calculations (Requirement 3.1)
 */
export function handleZeroDistance(
  from: Coordinates,
  to: Coordinates
): { distance: number; isZero: boolean } {
  // Check if coordinates are identical
  const areIdentical = from.lat === to.lat && from.lng === to.lng;

  if (areIdentical) {
    return { distance: 0, isZero: true };
  }

  return { distance: 0, isZero: false };
}

/**
 * Validate distance is within acceptable range (Requirement 3.1)
 */
export function isDistanceValid(distance: number | null | undefined): boolean {
  if (distance === null || distance === undefined) return false;
  if (Number.isNaN(distance)) return false;
  if (!Number.isFinite(distance)) return false;
  if (distance < 0) return false;
  if (distance > MAX_DISTANCE_KM) return false;

  return true;
}

/**
 * Validate distance and return a Result
 */
export function validateDistance(
  distance: number | null | undefined
): Result<{ distance: number; isWithinLimit: boolean }> {
  if (distance === null || distance === undefined) {
    return failure(
      createError(ErrorCode.VALIDATION_DISTANCE, {
        reason: 'Distance is null or undefined',
      })
    );
  }

  if (Number.isNaN(distance)) {
    return failure(
      createError(ErrorCode.VALIDATION_DISTANCE, {
        reason: 'Distance is NaN',
      })
    );
  }

  if (!Number.isFinite(distance)) {
    return failure(
      createError(ErrorCode.VALIDATION_DISTANCE, {
        reason: 'Distance is not finite',
      })
    );
  }

  if (distance < 0) {
    return failure(
      createError(ErrorCode.VALIDATION_DISTANCE, {
        reason: 'Distance is negative',
        distance,
      })
    );
  }

  const isWithinLimit = distance <= MAX_DISTANCE_KM;

  if (!isWithinLimit) {
    return failure(
      createError(ErrorCode.VALIDATION_DISTANCE, {
        reason: 'Distance exceeds maximum limit',
        distance,
        maxDistance: MAX_DISTANCE_KM,
      })
    );
  }

  return success({ distance, isWithinLimit: true });
}

/**
 * Safe distance calculation with edge case handling
 */
export function safeCalculateDistance(
  from: Coordinates | null | undefined,
  to: Coordinates | null | undefined
): Result<number> {
  // Validate inputs
  const fromResult = validateCoordinates(from);
  if (!fromResult.success) {
    return failure(fromResult.error);
  }

  const toResult = validateCoordinates(to);
  if (!toResult.success) {
    return failure(toResult.error);
  }

  // Handle zero distance edge case
  const { isZero } = handleZeroDistance(fromResult.data, toResult.data);
  if (isZero) {
    return success(0);
  }

  // Calculate distance using haversine formula
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((toResult.data.lat - fromResult.data.lat) * Math.PI) / 180;
  const dLng = ((toResult.data.lng - fromResult.data.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((fromResult.data.lat * Math.PI) / 180) *
      Math.cos((toResult.data.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  // Round to 1 decimal place
  const roundedDistance = Math.round(distance * 10) / 10;

  return success(roundedDistance);
}

/**
 * Format distance for display with edge case handling
 */
export function formatDistance(distance: number | null | undefined): string {
  if (distance === null || distance === undefined || Number.isNaN(distance)) {
    return '- km';
  }

  if (!Number.isFinite(distance)) {
    return '- km';
  }

  if (distance < 0) {
    return '- km';
  }

  return `${distance.toFixed(1)} km`;
}

// ============================================================================
// Currency Formatting Edge Cases
// ============================================================================

/**
 * Safe currency formatting with edge case handling (Requirement 3.1)
 */
export function formatCurrencySafe(
  amount: number | null | undefined,
  options?: Intl.NumberFormatOptions
): string {
  // Handle null, undefined, NaN
  if (amount === null || amount === undefined) {
    return 'Rp 0';
  }

  if (Number.isNaN(amount)) {
    return 'Rp 0';
  }

  // Handle negative values
  if (amount < 0) {
    return `-${formatCurrencyPositive(Math.abs(amount), options)}`;
  }

  return formatCurrencyPositive(amount, options);
}

/**
 * Format positive currency value
 */
function formatCurrencyPositive(amount: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  }).format(amount);
}

/**
 * Validate amount is valid for currency operations
 */
export function isValidAmount(amount: number | null | undefined): boolean {
  if (amount === null || amount === undefined) return false;
  if (Number.isNaN(amount)) return false;
  if (!Number.isFinite(amount)) return false;

  return true;
}

/**
 * Safe amount calculation with edge case handling
 */
export function safeCalculateAmount(baseFee: number, distance: number, rate: number): number {
  // Validate inputs
  if (!isValidAmount(baseFee)) return 0;
  if (!isValidAmount(distance)) return 0;
  if (!isValidAmount(rate)) return 0;

  // Calculate
  const result = baseFee + distance * rate;

  // Handle invalid results
  if (Number.isNaN(result)) return 0;
  if (!Number.isFinite(result)) return 0;

  return Math.round(result);
}

// ============================================================================
// Outlet Data Handling
// ============================================================================

/**
 * Safe outlet data access with edge case handling
 */
export function getOutletName(outlet: Outlet | null | undefined): string {
  if (!outlet) return 'Unknown Outlet';
  return outlet.name?.trim() || 'Unnamed Outlet';
}

export function getOutletAddress(outlet: Outlet | null | undefined): string {
  if (!outlet) return 'No address available';
  return outlet.address?.trim() || 'No address available';
}

export function getOutletCoordinates(outlet: Outlet | null | undefined): Coordinates | null {
  if (!outlet) return null;
  return createCoordinates(outlet.coordinates?.lat, outlet.coordinates?.lng);
}

/**
 * Validate outlet has required data
 */
export function isOutletValid(outlet: Outlet | null | undefined): boolean {
  if (!outlet) return false;
  if (!outlet.id?.trim()) return false;
  if (!outlet.name?.trim()) return false;

  // Coordinates are optional but must be valid if provided
  if (outlet.coordinates && !isValidCoordinates(outlet.coordinates)) {
    return false;
  }

  return true;
}

// ============================================================================
// Order List Handling
// ============================================================================

/**
 * Safe order list access with edge case handling
 */
export function getOrderCount(orders: Order[] | null | undefined): number {
  if (!orders) return 0;
  return orders.length;
}

export function isOrderListEmpty(orders: Order[] | null | undefined): boolean {
  return getOrderCount(orders) === 0;
}

export function getOrderById(orders: Order[] | null | undefined, orderId: string): Order | null {
  if (!orders || !orderId) return null;
  return orders.find((order) => order.id === orderId) ?? null;
}

/**
 * Safe array filter with edge case handling
 */
export function safeFilterOrders<T extends Order>(
  orders: T[] | null | undefined,
  predicate: (order: T) => boolean
): T[] {
  if (!orders) return [];
  return orders.filter(predicate);
}

/**
 * Safe array map with edge case handling
 */
export function safeMapOrders<T, R>(
  orders: T[] | null | undefined,
  mapper: (order: T, index: number) => R
): R[] {
  if (!orders) return [];
  return orders.map(mapper);
}

// ============================================================================
// General Edge Case Utilities
// ============================================================================

/**
 * Safe string value with fallback
 */
export function safeString(value: string | null | undefined, fallback: string = ''): string {
  if (value === null || value === undefined) return fallback;
  return String(value).trim() || fallback;
}

/**
 * Safe number value with fallback
 */
export function safeNumber(value: number | null | undefined, fallback: number = 0): number {
  if (value === null || value === undefined) return fallback;
  const num = Number(value);
  return Number.isNaN(num) ? fallback : num;
}

/**
 * Safe boolean conversion
 */
export function safeBoolean(value: unknown, fallback: boolean = false): boolean {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1';
  }
  return fallback;
}

/**
 * Safe array access with bounds checking
 */
export function safeArrayGet<T>(
  array: T[] | null | undefined,
  index: number,
  fallback: T | null = null
): T | null {
  if (!array) return fallback;
  if (index < 0 || index >= array.length) return fallback;
  return array[index];
}

/**
 * Safe date parsing
 */
export function safeParseDate(value: string | Date | null | undefined): Date | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export default {
  // Coordinates
  isValidCoordinates,
  validateCoordinates,
  createCoordinates,
  parseCoordinates,

  // Distance
  MAX_DISTANCE_KM,
  MIN_POSITIVE_DISTANCE,
  handleZeroDistance,
  isDistanceValid,
  validateDistance,
  safeCalculateDistance,
  formatDistance,

  // Currency
  formatCurrencySafe,
  isValidAmount,
  safeCalculateAmount,

  // Outlet
  getOutletName,
  getOutletAddress,
  getOutletCoordinates,
  isOutletValid,

  // Order list
  getOrderCount,
  isOrderListEmpty,
  getOrderById,
  safeFilterOrders,
  safeMapOrders,

  // General
  safeString,
  safeNumber,
  safeBoolean,
  safeArrayGet,
  safeParseDate,
};
