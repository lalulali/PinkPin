'use client'

import { ProtectedRoute } from '@/src/components/ProtectedRoute'
import { MainLayout } from '@/src/components/MainLayout'
import { ErrorBoundary } from '@/src/components/ErrorBoundary'
import { CreateOrderContent } from '@/src/page-components/CreateOrderContent'
import { useOutlets } from '@/src/hooks/useOutlets'

export default function CreateOrderPage() {
  const { data: outlets = [], isLoading } = useOutlets()

  return (
    <ProtectedRoute>
      <MainLayout>
        <ErrorBoundary
          fallback={
            <div className="min-h-[400px] flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 max-w-md w-full text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Something went wrong
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Please refresh the page and try again.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-[#ED0577] text-white font-medium rounded-lg
                             hover:bg-[#d9066a] transition-colors min-h-[44px] min-w-[120px]"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          }
        >
          <CreateOrderContent outlets={outlets} isLoading={isLoading} />
        </ErrorBoundary>
      </MainLayout>
    </ProtectedRoute>
  )
}
