import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getStorageAdapter } from '@/services/storage'
import { Order } from '@/types'

/**
 * Hook to create a new order with automatic cache invalidation
 * Invalidates the ['orders'] query key to trigger a refresh
 */
export function useCreateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (order: Order) => {
      const adapter = getStorageAdapter()
      return adapter.createOrder(order)
    },
    onSuccess: () => {
      // Invalidate the orders list to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}
