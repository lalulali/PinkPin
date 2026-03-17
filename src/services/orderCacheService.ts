/**
 * Order Cache Service - Manages order caching for offline access
 * Caches orders in localStorage for viewing when offline
 * Implements network-first strategy with cache fallback
 */

import { Order } from '@/src/types'
import { getStorageAdapter } from './storage'

const ORDER_CACHE_KEY = 'pink_pin_orders_cache'
const ORDER_CACHE_TIMESTAMP_KEY = 'pink_pin_orders_cache_timestamp'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export interface CachedOrderData {
  orders: Order[]
  cachedAt: string
  source: 'network' | 'cache'
}

/**
 * Save orders to localStorage cache
 */
export function cacheOrders(orders: Order[]): void {
  try {
    const data: CachedOrderData = {
      orders,
      cachedAt: new Date().toISOString(),
      source: 'cache',
    }
    localStorage.setItem(ORDER_CACHE_KEY, JSON.stringify(data))
    localStorage.setItem(ORDER_CACHE_TIMESTAMP_KEY, Date.now().toString())
  } catch (error) {
    console.error('Failed to cache orders:', error)
  }
}

/**
 * Get cached orders from localStorage
 */
export function getCachedOrders(): Order[] | null {
  try {
    const data = localStorage.getItem(ORDER_CACHE_KEY)
    if (!data) return null

    const cachedData: CachedOrderData = JSON.parse(data)
    return cachedData.orders
  } catch (error) {
    console.error('Failed to get cached orders:', error)
    return null
  }
}

/**
 * Get cache timestamp
 */
export function getCacheTimestamp(): number | null {
  try {
    const timestamp = localStorage.getItem(ORDER_CACHE_TIMESTAMP_KEY)
    return timestamp ? parseInt(timestamp, 10) : null
  } catch {
    return null
  }
}

/**
 * Check if cache is valid (not expired)
 */
export function isCacheValid(): boolean {
  const timestamp = getCacheTimestamp()
  if (!timestamp) return false

  const age = Date.now() - timestamp
  return age < CACHE_DURATION
}

/**
 * Get cache age in milliseconds
 */
export function getCacheAge(): number | null {
  const timestamp = getCacheTimestamp()
  if (!timestamp) return null
  return Date.now() - timestamp
}

/**
 * Clear order cache
 */
export function clearOrderCache(): void {
  try {
    localStorage.removeItem(ORDER_CACHE_KEY)
    localStorage.removeItem(ORDER_CACHE_TIMESTAMP_KEY)
  } catch (error) {
    console.error('Failed to clear order cache:', error)
  }
}

/**
 * Fetch orders from network and update cache
 */
export async function fetchOrdersFromNetwork(): Promise<Order[]> {
  const adapter = getStorageAdapter()
  const orders = await adapter.getOrders()
  cacheOrders(orders)
  return orders
}

/**
 * Get orders - network first, with cache fallback
 * Returns cached data if offline or network fails
 */
export async function getOrdersWithCache(): Promise<CachedOrderData> {
  // Try network first
  try {
    const orders = await fetchOrdersFromNetwork()
    return {
      orders,
      cachedAt: new Date().toISOString(),
      source: 'network',
    }
  } catch (error) {
    console.error('Failed to fetch orders from network:', error)
    
    // Fallback to cache
    const cachedOrders = getCachedOrders()
    if (cachedOrders) {
      return {
        orders: cachedOrders,
        cachedAt: new Date().toISOString(),
        source: 'cache',
      }
    }
    
    // Return empty array if no cache
    return {
      orders: [],
      cachedAt: new Date().toISOString(),
      source: 'cache',
    }
  }
}

/**
 * Cache a single order (for offline order creation)
 */
export function cacheOrder(order: Order): void {
  const cachedOrders = getCachedOrders()
  if (cachedOrders) {
    // Check if order already exists
    const existingIndex = cachedOrders.findIndex(o => o.id === order.id)
    if (existingIndex >= 0) {
      cachedOrders[existingIndex] = order
    } else {
      cachedOrders.unshift(order)
    }
    cacheOrders(cachedOrders)
  }
}

/**
 * Remove order from cache
 */
export function removeOrderFromCache(orderId: string): void {
  const cachedOrders = getCachedOrders()
  if (cachedOrders) {
    const filtered = cachedOrders.filter(o => o.id !== orderId)
    if (filtered.length !== cachedOrders.length) {
      cacheOrders(filtered)
    }
  }
}

export default {
  cacheOrders,
  getCachedOrders,
  getCacheTimestamp,
  isCacheValid,
  getCacheAge,
  clearOrderCache,
  fetchOrdersFromNetwork,
  getOrdersWithCache,
  cacheOrder,
  removeOrderFromCache,
}