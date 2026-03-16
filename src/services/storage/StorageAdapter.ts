import { Order, Merchant, Outlet } from '@/src/types'

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
