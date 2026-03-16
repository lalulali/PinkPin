/**
 * useAuth hook - Custom hook for accessing authentication state and methods
 */

import { useContext } from 'react'
import { AuthContext, useAuth as useAuthContext } from '../context/AuthContext'
import { AuthState, AuthContextValue } from '../types/auth'

/**
 * Hook to access authentication state and methods
 * @returns AuthContextValue containing user, token, isAuthenticated, isLoading, error, and methods
 */
export function useAuth(): AuthContextValue {
  return useAuthContext()
}

/**
 * Hook to access only authentication state (without methods)
 * Useful when you only need to check authentication status
 */
export function useAuthState(): Pick<AuthState, 'user' | 'token' | 'isAuthenticated' | 'isLoading' | 'error'> {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthProvider')
  }
  const { user, token, isAuthenticated, isLoading, error } = context
  return { user, token, isAuthenticated, isLoading, error }
}

/**
 * Hook to check if user is authenticated
 * @returns boolean indicating if user is authenticated
 */
export function useIsAuthenticated(): boolean {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useIsAuthenticated must be used within an AuthProvider')
  }
  return context.isAuthenticated
}

/**
 * Hook to get current user
 * @returns AuthUser | null - the current authenticated user or null
 */
export function useCurrentUser() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useCurrentUser must be used within an AuthProvider')
  }
  return context.user
}

/**
 * Hook to check if authentication is loading
 * @returns boolean indicating if authentication is still loading
 */
export function useAuthLoading(): boolean {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthLoading must be used within an AuthProvider')
  }
  return context.isLoading
}

/**
 * Hook to get authentication error
 * @returns string | null - the current error message or null
 */
export function useAuthError(): string | null {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthError must be used within an AuthProvider')
  }
  return context.error
}

export default useAuth