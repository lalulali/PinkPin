import { useEffect } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { initializeSampleData } from '@/services/sampleData'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
    },
  },
})

function App() {
  useEffect(() => {
    // Initialize sample data on first app load
    initializeSampleData()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white">
        <h1 className="text-3xl font-bold text-primary p-8">Pink Pin Merchant App</h1>
        <p className="text-gray-600 px-8">Project setup complete. Ready for development.</p>
      </div>
    </QueryClientProvider>
  )
}

export default App
