import { useQuery } from '@tanstack/react-query'
import { getStorageAdapter } from '@/src/services/storage'
import { Order } from '@/src/types'

/**
 * Hook to fetch a single order by ID
 * Uses TanStack Query for caching and automatic refetching
 */
export function useOrderById(id: string | undefined) {
  return useQuery<Order | null, Error>({
    queryKey: ['orders', id],
    queryFn: async () => {
      if (!id) return null
      const adapter = getStorageAdapter()
      return adapter.getOrderById(id)
    },
    enabled: !!id,
  })
}
