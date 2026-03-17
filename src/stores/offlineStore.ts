/**
 * Offline Store - Manages offline state and queued orders
 * Stores orders that were created while offline for sync when connectivity restored
 */

import { create } from 'zustand'
import { Order } from '@/src/types'

export interface QueuedOrder extends Order {
  queuedAt: Date
  syncAttempts: number
  lastSyncError?: string
}

interface OfflineState {
  isOnline: boolean
  queuedOrders: QueuedOrder[]
  isSyncing: boolean
  syncError?: string
  
  // Actions
  setOnlineStatus: (isOnline: boolean) => void
  addQueuedOrder: (order: Order) => void
  removeQueuedOrder: (orderId: string) => void
  updateQueuedOrder: (orderId: string, updates: Partial<QueuedOrder>) => void
  getQueuedOrders: () => QueuedOrder[]
  setIsSyncing: (isSyncing: boolean) => void
  setSyncError: (error?: string) => void
  clearQueuedOrders: () => void
  incrementSyncAttempts: (orderId: string) => void
  setLastSyncError: (orderId: string, error: string) => void
}

export const useOfflineStore = create<OfflineState>((set, get) => ({
  isOnline: typeof window !== 'undefined' ? navigator.onLine : true,
  queuedOrders: [],
  isSyncing: false,
  syncError: undefined,

  setOnlineStatus: (isOnline: boolean) => {
    set({ isOnline })
  },

  addQueuedOrder: (order: Order) => {
    const queuedOrder: QueuedOrder = {
      ...order,
      queuedAt: new Date(),
      syncAttempts: 0,
    }
    set((state) => ({
      queuedOrders: [...state.queuedOrders, queuedOrder],
    }))
  },

  removeQueuedOrder: (orderId: string) => {
    set((state) => ({
      queuedOrders: state.queuedOrders.filter((order) => order.id !== orderId),
    }))
  },

  updateQueuedOrder: (orderId: string, updates: Partial<QueuedOrder>) => {
    set((state) => ({
      queuedOrders: state.queuedOrders.map((order) =>
        order.id === orderId ? { ...order, ...updates } : order
      ),
    }))
  },

  getQueuedOrders: () => {
    return get().queuedOrders
  },

  setIsSyncing: (isSyncing: boolean) => {
    set({ isSyncing })
  },

  setSyncError: (error?: string) => {
    set({ syncError: error })
  },

  clearQueuedOrders: () => {
    set({ queuedOrders: [] })
  },

  incrementSyncAttempts: (orderId: string) => {
    set((state) => ({
      queuedOrders: state.queuedOrders.map((order) =>
        order.id === orderId
          ? { ...order, syncAttempts: order.syncAttempts + 1 }
          : order
      ),
    }))
  },

  setLastSyncError: (orderId: string, error: string) => {
    set((state) => ({
      queuedOrders: state.queuedOrders.map((order) =>
        order.id === orderId
          ? { ...order, lastSyncError: error }
          : order
      ),
    }))
  },
}))
