/**
 * Comprehensive error handling utilities for Pink Pin Merchant App
 * Implements Requirements 3.1, 3.5, 3.7
 */

// Error codes for different error types
export enum ErrorCode {
  // Validation errors (Requirement 3.1)
  VALIDATION_REQUIRED = 'VALIDATION_REQUIRED',
  VALIDATION_EMAIL = 'VALIDATION_EMAIL',
  VALIDATION_PHONE = 'VALIDATION_PHONE',
  VALIDATION_COORDINATES = 'VALIDATION_COORDINATES',
  VALIDATION_DISTANCE = 'VALIDATION_DISTANCE',
  VALIDATION_INVALID_INPUT = 'VALIDATION_INVALID_INPUT',

  // Storage errors (Requirement 3.5)
  STORAGE_READ = 'STORAGE_READ',
  STORAGE_WRITE = 'STORAGE_WRITE',
  STORAGE_DELETE = 'STORAGE_DELETE',
  STORAGE_NOT_FOUND = 'STORAGE_NOT_FOUND',
  STORAGE_QUOTA_EXCEEDED = 'STORAGE_QUOTA_EXCEEDED',

  // Map errors (Requirement 3.6)
  MAP_LOAD_FAILED = 'MAP_LOAD_FAILED',
  MAP_GEOCODING_FAILED = 'MAP_GEOCODING_FAILED',
  MAP_DISTANCE_CALCULATION_FAILED = 'MAP_DISTANCE_CALCULATION_FAILED',

  // Network errors (Requirement 3.5)
  NETWORK_OFFLINE = 'NETWORK_OFFLINE',
  NETWORK_REQUEST_FAILED = 'NETWORK_REQUEST_FAILED',

  // Generic errors
  UNKNOWN = 'UNKNOWN',
}

// Error severity levels
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

// App-specific error interface
export interface AppError {
  code: ErrorCode
  message: string
  severity: ErrorSeverity
  timestamp: Date
  context?: Record<string, unknown>
  originalError?: Error
}

// User-friendly error messages
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  // Validation errors
  [ErrorCode.VALIDATION_REQUIRED]: 'This field is required',
  [ErrorCode.VALIDATION_EMAIL]: 'Please enter a valid email address',
  [ErrorCode.VALIDATION_PHONE]: 'Please enter a valid phone number',
  [ErrorCode.VALIDATION_COORDINATES]: 'Invalid coordinates provided',
  [ErrorCode.VALIDATION_DISTANCE]: 'Delivery location must be within 3 km radius of the outlet',
  [ErrorCode.VALIDATION_INVALID_INPUT]: 'Invalid input provided',

  // Storage errors
  [ErrorCode.STORAGE_READ]: 'Unable to load data. Please refresh the page.',
  [ErrorCode.STORAGE_WRITE]: 'Unable to save changes. Please try again.',
  [ErrorCode.STORAGE_DELETE]: 'Unable to delete. Please try again.',
  [ErrorCode.STORAGE_NOT_FOUND]: 'The requested item was not found.',
  [ErrorCode.STORAGE_QUOTA_EXCEEDED]: 'Storage limit exceeded. Please clear some data.',

  // Map errors
  [ErrorCode.MAP_LOAD_FAILED]: 'Map failed to load. Please enter address manually.',
  [ErrorCode.MAP_GEOCODING_FAILED]: 'Unable to find the address. Please try a different location.',
  [ErrorCode.MAP_DISTANCE_CALCULATION_FAILED]: 'Unable to calculate distance. Please select a location on the map.',

  // Network errors
  [ErrorCode.NETWORK_OFFLINE]: 'You are offline. Some features may be limited.',
  [ErrorCode.NETWORK_REQUEST_FAILED]: 'Network request failed. Please check your connection.',

  // Generic
  [ErrorCode.UNKNOWN]: 'An unexpected error occurred. Please try again.',
}

/**
 * Create an AppError with proper context
 */
export function createError(
  code: ErrorCode,
  context?: Record<string, unknown>,
  originalError?: Error,
  severity?: ErrorSeverity
): AppError {
  return {
    code,
    message: ERROR_MESSAGES[code],
    severity: severity ?? determineSeverity(code),
    timestamp: new Date(),
    context,
    originalError,
  }
}

/**
 * Determine error severity based on error code
 */
function determineSeverity(code: ErrorCode): ErrorSeverity {
  switch (code) {
    case ErrorCode.STORAGE_QUOTA_EXCEEDED:
    case ErrorCode.NETWORK_OFFLINE:
      return ErrorSeverity.LOW
    case ErrorCode.STORAGE_READ:
    case ErrorCode.STORAGE_WRITE:
    case ErrorCode.STORAGE_DELETE:
    case ErrorCode.MAP_LOAD_FAILED:
    case ErrorCode.MAP_GEOCODING_FAILED:
    case ErrorCode.MAP_DISTANCE_CALCULATION_FAILED:
    case ErrorCode.NETWORK_REQUEST_FAILED:
      return ErrorSeverity.MEDIUM
    case ErrorCode.VALIDATION_REQUIRED:
    case ErrorCode.VALIDATION_EMAIL:
    case ErrorCode.VALIDATION_PHONE:
    case ErrorCode.VALIDATION_COORDINATES:
    case ErrorCode.VALIDATION_DISTANCE:
    case ErrorCode.VALIDATION_INVALID_INPUT:
    case ErrorCode.STORAGE_NOT_FOUND:
      return ErrorSeverity.HIGH
    default:
      return ErrorSeverity.MEDIUM
  }
}

/**
 * Log error for debugging (Requirement 3.5)
 */
export function logError(error: AppError): void {
  const logEntry = {
    timestamp: error.timestamp.toISOString(),
    code: error.code,
    message: error.message,
    severity: error.severity,
    context: error.context,
    originalError: error.originalError?.message,
    stack: error.originalError?.stack,
  }

  // Use appropriate console method based on severity
  switch (error.severity) {
    case ErrorSeverity.CRITICAL:
    case ErrorSeverity.HIGH:
      console.error('[ERROR]', JSON.stringify(logEntry, null, 2))
      break
    case ErrorSeverity.MEDIUM:
      console.warn('[WARN]', JSON.stringify(logEntry, null, 2))
      break
    default:
      console.log('[INFO]', JSON.stringify(logEntry, null, 2))
  }
}

/**
 * Handle storage errors (Requirement 3.5)
 */
export function handleStorageError(
  operation: 'read' | 'write' | 'delete',
  originalError: Error
): AppError {
  const codeMap: Record<string, ErrorCode> = {
    read: ErrorCode.STORAGE_READ,
    write: ErrorCode.STORAGE_WRITE,
    delete: ErrorCode.STORAGE_DELETE,
  }

  const code = codeMap[operation] ?? ErrorCode.STORAGE_READ

  // Check for specific error types
  if (originalError.name === 'QuotaExceededError') {
    return createError(ErrorCode.STORAGE_QUOTA_EXCEEDED, { operation }, originalError)
  }

  return createError(code, { operation }, originalError)
}

/**
 * Handle map errors (Requirement 3.6)
 */
export function handleMapError(errorType: 'load' | 'geocoding' | 'distance'): AppError {
  const codeMap: Record<string, ErrorCode> = {
    load: ErrorCode.MAP_LOAD_FAILED,
    geocoding: ErrorCode.MAP_GEOCODING_FAILED,
    distance: ErrorCode.MAP_DISTANCE_CALCULATION_FAILED,
  }

  return createError(codeMap[errorType] ?? ErrorCode.UNKNOWN)
}

/**
 * Handle network errors (Requirement 3.5)
 */
export function handleNetworkError(isOffline: boolean, originalError?: Error): AppError {
  if (isOffline) {
    return createError(ErrorCode.NETWORK_OFFLINE, undefined, originalError, ErrorSeverity.LOW)
  }

  return createError(
    ErrorCode.NETWORK_REQUEST_FAILED,
    undefined,
    originalError,
    ErrorSeverity.MEDIUM
  )
}

/**
 * Safe execute wrapper that catches and handles errors
 */
export function safeExecute<T>(
  fn: () => T,
  errorHandler: (error: AppError) => T
): T {
  try {
    return fn()
  } catch (error) {
    const appError = createError(
      ErrorCode.UNKNOWN,
      undefined,
      error instanceof Error ? error : undefined
    )
    logError(appError)
    return errorHandler(appError)
  }
}

/**
 * Async safe execute wrapper for promises
 */
export async function safeExecuteAsync<T>(
  fn: () => Promise<T>,
  errorHandler: (error: AppError) => Promise<T>
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    const appError = createError(
      ErrorCode.UNKNOWN,
      undefined,
      error instanceof Error ? error : undefined
    )
    logError(appError)
    return await errorHandler(appError)
  }
}

/**
 * Result type for operations that can fail
 */
export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: AppError }

/**
 * Create a successful result
 */
export function success<T>(data: T): Result<T> {
  return { success: true, data }
}

/**
 * Create a failed result
 */
export function failure<T>(error: AppError): Result<T> {
  return { success: false, error }
}

/**
 * Execute a function and return a Result
 */
export function tryExecute<T>(fn: () => T): Result<T> {
  try {
    return success(fn())
  } catch (error) {
    const appError = createError(
      ErrorCode.UNKNOWN,
      undefined,
      error instanceof Error ? error : undefined
    )
    logError(appError)
    return failure<T>(appError)
  }
}

/**
 * Async version of tryExecute
 */
export async function tryExecuteAsync<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    return success(await fn())
  } catch (error) {
    const appError = createError(
      ErrorCode.UNKNOWN,
      undefined,
      error instanceof Error ? error : undefined
    )
    logError(appError)
    return failure<T>(appError)
  }
}

export default {
  ErrorCode,
  ErrorSeverity,
  createError,
  logError,
  handleStorageError,
  handleMapError,
  handleNetworkError,
  safeExecute,
  safeExecuteAsync,
  success,
  failure,
  tryExecute,
  tryExecuteAsync,
}