/**
 * ProtectedRoute - Route wrapper that checks authentication
 * Redirects unauthenticated users to login page with preserved return URL
 */

'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
  children: ReactNode
}

/**
 * ProtectedRoute component that:
 * - Checks if a valid authentication token exists
 * - If no token, redirects to /login with the current path preserved as return URL
 * - If authenticated, renders the child components
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, validateToken } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Validate token on mount
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      validateToken()
    }
  }, [isLoading, isAuthenticated, validateToken])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const returnUrl = encodeURIComponent(pathname)
      router.push(`/login?returnTo=${returnUrl}`)
    }
  }, [isLoading, isAuthenticated, pathname, router])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ED0577] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, don't render (redirect will happen)
  if (!isAuthenticated) {
    return null
  }

  // Render protected content
  return <>{children}</>
}

export default ProtectedRoute
