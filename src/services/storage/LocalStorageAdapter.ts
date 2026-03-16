import { Order, Merchant, Outlet } from '@/src/types'
import { StorageAdapter } from './StorageAdapter'

const ORDERS_KEY = 'pink_pin_orders'
const MERCHANTS_KEY = 'pink_pin_merchants'
const OUTLETS_KEY = 'pink_pin_outlets'

/**
 * LocalStorageAdapter implements StorageAdapter using browser localStorage
 * Provides CRUD operations for orders, merchants, and outlets
 */
export class LocalStorageAdapter implements StorageAdapter {
  async getOrders(): Promise<Order[]> {
    const data = localStorage.getItem(ORDERS_KEY)
    if (!data) return []
    const orders = JSON.parse(data) as Order[]
    return orders.map((order) => ({
      ...order,
      createdAt: new Date(order.createdAt),
      updatedAt: new Date(order.updatedAt),
    }))
  }

  async getOrderById(id: string): Promise<Order | null> {
    const orders = await this.getOrders()
    const order = orders.find((o) => o.id === id)
    return order || null
  }

  async createOrder(order: Order): Promise<Order> {
    const orders = await this.getOrders()
    const newOrder = {
      ...order,
      createdAt: new Date(order.createdAt),
      updatedAt: new Date(order.updatedAt),
    }
    orders.push(newOrder)
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
    return newOrder
  }

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
    const orders = await this.getOrders()
    const index = orders.findIndex((o) => o.id === id)
    if (index === -1) throw new Error(`Order ${id} not found`)

    const updatedOrder = {
      ...orders[index],
      ...updates,
      updatedAt: new Date(),
    }
    orders[index] = updatedOrder
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
    return updatedOrder
  }

  async deleteOrder(id: string): Promise<void> {
    const orders = await this.getOrders()
    const filtered = orders.filter((o) => o.id !== id)
    localStorage.setItem(ORDERS_KEY, JSON.stringify(filtered))
  }

  async getMerchant(id: string): Promise<Merchant | null> {
    const data = localStorage.getItem(MERCHANTS_KEY)
    if (!data) return null
    const merchants = JSON.parse(data) as Merchant[]
    const merchant = merchants.find((m) => m.id === id)
    return merchant || null
  }

  async getOutlets(): Promise<Outlet[]> {
    const data = localStorage.getItem(OUTLETS_KEY)
    if (!data) return []
    const outlets = JSON.parse(data) as Outlet[]
    return outlets.map((outlet) => ({
      ...outlet,
      createdAt: new Date(outlet.createdAt),
    }))
  }

  async getOutletById(id: string): Promise<Outlet | null> {
    const outlets = await this.getOutlets()
    const outlet = outlets.find((o) => o.id === id)
    return outlet || null
  }
}
