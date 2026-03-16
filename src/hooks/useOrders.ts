import { useQuery } from '@tanstack/react-query'
import { getStorageAdapter } from '@/services/storage'
import { Order } from '@/types'

/**
 * Hook to fetch all orders from storage
 * Uses TanStack Query for caching and automatic refetching
 */
export function useOrders() {
  return useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: async () => {
      const adapter = getStorageAdapter()
      return adapter.getOrders()
    },
  })
}
