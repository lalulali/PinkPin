import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getStorageAdapter } from '@/services/storage'
import { Order } from '@/types'

/**
 * Hook to update an existing order with automatic cache invalidation
 * Invalidates both the specific order and the orders list
 */
export function useUpdateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Order> }) => {
      const adapter = getStorageAdapter()
      return adapter.updateOrder(id, updates)
    },
    onSuccess: (updatedOrder) => {
      // Invalidate both the specific order and the orders list
      queryClient.invalidateQueries({ queryKey: ['orders', updatedOrder.id] })
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}
