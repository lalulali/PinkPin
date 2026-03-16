import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getStorageAdapter } from '@/src/services/storage'

/**
 * Hook to delete an order with automatic cache invalidation
 * Invalidates the ['orders'] query key to trigger a refresh
 */
export function useDeleteOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const adapter = getStorageAdapter()
      return adapter.deleteOrder(id)
    },
    onSuccess: () => {
      // Invalidate the orders list to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}
