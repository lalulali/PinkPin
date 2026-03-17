import { Order, Merchant, Outlet } from '@/src/types'

/**
 * Storage operation types for error tracking
 */
export type StorageOperation =
  | 'getOrders'
  | 'getOrderById'
  | 'createOrder'
  | 'updateOrder'
  | 'deleteOrder'
  | 'getMerchant'
  | 'getOutlets'
  | 'getOutletById'

/**
 * User-friendly error messages for each operation type
 */
const ERROR_MESSAGES: Record<StorageOperation, string> = {
  getOrders: 'Unable to load orders. Please check your connection and try again.',
  getOrderById: 'Unable to load the order. Please try again.',
  createOrder: 'Unable to save your changes. Please try again.',
  updateOrder: 'Unable to update the order. Please try again.',
  deleteOrder: 'Unable to delete the order. Please try again.',
  getMerchant: 'Unable to load merchant data. Please try again.',
  getOutlets: 'Unable to load outlets. Please try again.',
  getOutletById: 'Unable to load outlet data. Please try again.',
}

/**
 * StorageError - Custom error type for storage operations
 * Implements Requirements 3.5, 3.7
 * - Includes operation type for logging
 * - Includes timestamp for debugging
 * - Provides user-friendly message
 * - Supports retry functionality
 */
export class StorageError extends Error {
  public readonly operation: StorageOperation
  public readonly timestamp: Date
  public readonly originalError: Error | null
  public readonly userMessage: string

  constructor(
    operation: StorageOperation,
    message: string,
    originalError?: Error
  ) {
    super(message)
    this.name = 'StorageError'
    this.operation = operation
    this.timestamp = new Date()
    this.originalError = originalError || null
    this.userMessage = ERROR_MESSAGES[operation]
  }

  /**
   * Get formatted error details for logging
   */
  public getLogDetails(): string {
    return JSON.stringify(
      {
        name: this.name,
        message: this.message,
        operation: this.operation,
        timestamp: this.timestamp.toISOString(),
        userMessage: this.userMessage,
        stack: this.stack,
        originalError: this.originalError
          ? {
              name: this.originalError.name,
              message: this.originalError.message,
              stack: this.originalError.stack,
            }
          : null,
      },
      null,
      2
    )
  }
}

/**
 * Check if an error is a StorageError
 */
export function isStorageError(error: unknown): error is StorageError {
  return error instanceof StorageError
}

/**
 * StorageAdapter interface defines the contract for all storage implementations
 * This allows switching between localStorage, API, or other storage backends
 * without changing business logic or UI code
 */
export interface StorageAdapter {
  // Orders
  getOrders(): Promise<Order[]>
  getOrderById(id: string): Promise<Order | null>
  createOrder(order: Order): Promise<Order>
  updateOrder(id: string, order: Partial<Order>): Promise<Order>
  deleteOrder(id: string): Promise<void>

  // Merchants
  getMerchant(id: string): Promise<Merchant | null>

  // Outlets
  getOutlets(): Promise<Outlet[]>
  getOutletById(id: string): Promise<Outlet | null>
}
