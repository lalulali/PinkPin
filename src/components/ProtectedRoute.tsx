/**
 * ProtectedRoute - Route wrapper that checks authentication
 * Redirects unauthenticated users to login page with preserved return URL
 * Includes improved handling for multi-tab scenarios
 */

'use client'

import { useEffect, ReactNode, useState } from 'react'
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
 * - Includes debounced redirect to prevent race conditions
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, validateToken } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false)
  const [redirectAttempted, setRedirectAttempted] = useState(false)

  // Validate token on mount and when auth state changes
  useEffect(() => {
    const checkAuth = async () => {
      if (!isLoading) {
        await validateToken()
        setHasCheckedAuth(true)
      }
    }
    
    checkAuth()
  }, [isLoading, validateToken])

  // Debounced redirect to prevent race conditions
  useEffect(() => {
    if (!hasCheckedAuth || isLoading || redirectAttempted) {
      return
    }

    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        const returnUrl = encodeURIComponent(pathname)
        setRedirectAttempted(true)
        router.push(`/login?returnTo=${returnUrl}`)
      }
    }, 100) // Small delay to ensure auth state is stable

    return () => clearTimeout(timer)
  }, [isAuthenticated, isLoading, hasCheckedAuth, pathname, router, redirectAttempted])

  // Show loading state while checking authentication
  if (isLoading || !hasCheckedAuth) {
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
