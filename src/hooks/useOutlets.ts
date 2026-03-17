import { useQuery } from '@tanstack/react-query'
import { getStorageAdapter } from '@/src/services/storage'
import { Outlet } from '@/src/types'

/**
 * Hook to fetch all outlets from storage
 */
export function useOutlets() {
  return useQuery<Outlet[], Error>({
    queryKey: ['outlets'],
    queryFn: async () => {
      const adapter = getStorageAdapter()
      return adapter.getOutlets()
    },
  })
}