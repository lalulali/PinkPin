/**
 * Offline Service - Manages offline detection and queue synchronization
 * Handles online/offline status detection and automatic sync when connectivity restored
 */

import { Order } from '@/src/types'
import { useOfflineStore } from '@/src/stores/offlineStore'
import { getStorageAdapter } from './storage'

const OFFLINE_QUEUE_KEY = 'pink_pin_offline_queue'
const MAX_SYNC_ATTEMPTS = 3

/**
 * Initialize offline detection and sync handlers
 */
export function initializeOfflineDetection() {
  if (typeof window === 'undefined') return

  // Set initial online status
  useOfflineStore.setState({ isOnline: navigator.onLine })

  // Listen for online/offline events
  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)

  // Restore queued orders from localStorage on initialization
  restoreQueuedOrdersFromStorage()

  return () => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  }
}

/**
 * Handle online event - attempt to sync queued orders
 */
async function handleOnline() {
  useOfflineStore.setState({ isOnline: true })
  await syncQueuedOrders()
}

/**
 * Handle offline event
 */
function handleOffline() {
  useOfflineStore.setState({ isOnline: false })
}

/**
 * Add order to offline queue
 */
export function queueOrderForSync(order: Order) {
  const store = useOfflineStore.getState()
  store.addQueuedOrder(order)
  persistQueuedOrdersToStorage()
}

/**
 * Sync all queued orders to storage
 */
export async function syncQueuedOrders() {
  const store = useOfflineStore.getState()
  const queuedOrders = store.getQueuedOrders()

  if (queuedOrders.length === 0) {
    return
  }

  store.setIsSyncing(true)
  store.setSyncError(undefined)

  const adapter = getStorageAdapter()
  let successCount = 0
  let failureCount = 0

  for (const queuedOrder of queuedOrders) {
    try {
      // Check if max sync attempts exceeded
      if (queuedOrder.syncAttempts >= MAX_SYNC_ATTEMPTS) {
        store.setLastSyncError(
          queuedOrder.id,
          `Failed to sync after ${MAX_SYNC_ATTEMPTS} attempts`
        )
        failureCount++
        continue
      }

      // Attempt to sync the order
      const { queuedAt, syncAttempts, lastSyncError, ...orderData } = queuedOrder
      await adapter.createOrder(orderData as Order)

      // Remove from queue on success
      store.removeQueuedOrder(queuedOrder.id)
      successCount++
    } catch (error) {
      store.incrementSyncAttempts(queuedOrder.id)
      store.setLastSyncError(
        queuedOrder.id,
        error instanceof Error ? error.message : 'Unknown error'
      )
      failureCount++
    }
  }

  // Persist updated queue to storage
  persistQueuedOrdersToStorage()

  // Update sync status
  if (failureCount > 0) {
    store.setSyncError(
      `Synced ${successCount} orders. ${failureCount} orders failed to sync.`
    )
  }

  store.setIsSyncing(false)
}

/**
 * Persist queued orders to localStorage
 */
function persistQueuedOrdersToStorage() {
  const store = useOfflineStore.getState()
  const queuedOrders = store.getQueuedOrders()
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queuedOrders))
}

/**
 * Restore queued orders from localStorage
 */
function restoreQueuedOrdersFromStorage() {
  try {
    const data = localStorage.getItem(OFFLINE_QUEUE_KEY)
    if (data) {
      const queuedOrders = JSON.parse(data) as Order[]
      const store = useOfflineStore.getState()
      queuedOrders.forEach((order) => {
        store.addQueuedOrder(order)
      })
    }
  } catch (error) {
    console.error('Failed to restore queued orders from storage:', error)
  }
}

/**
 * Clear all queued orders
 */
export function clearOfflineQueue() {
  const store = useOfflineStore.getState()
  store.clearQueuedOrders()
  localStorage.removeItem(OFFLINE_QUEUE_KEY)
}

/**
 * Get current online status
 */
export function isOnline(): boolean {
  if (typeof window === 'undefined') return true
  return navigator.onLine
}

/**
 * Get queued orders count
 */
export function getQueuedOrdersCount(): number {
  const store = useOfflineStore.getState()
  return store.getQueuedOrders().length
}
