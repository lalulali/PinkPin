/**
 * AuthContext - React Context for authentication state management
 * Includes cross-tab synchronization for multi-tab authentication
 */

'use client'

import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react'
import { AuthState, AuthContextValue, LoginCredentials } from '../types/auth'
import { authService } from '../services/authService'
import { initializeSampleData } from '../services/sampleData'
import { startSessionHeartbeat, stopSessionHeartbeat } from '../utils/sessionHeartbeat'

interface AuthProviderProps {
  children: ReactNode
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialState)

  // Initialize auth state from storage
  const initializeAuth = useCallback(async () => {
    try {
      // Initialize sample data on first app load
      initializeSampleData()

      const isValid = await authService.validateToken()
      if (isValid) {
        const user = authService.getCurrentUser()
        const token = authService.getToken()
        setState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })
        // Start session heartbeat if already authenticated
        startSessionHeartbeat()
      } else {
        setState((prev) => ({ ...prev, isLoading: false }))
      }
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  // Handle cross-tab storage synchronization
  const handleStorageChange = useCallback((event: StorageEvent) => {
    if (event.key === 'pinkpin_auth_token' || event.key === 'pinkpin_auth_user') {
      // Auth data changed in another tab, re-initialize
      initializeAuth()
    }
  }, [initializeAuth])

  // Set up cross-tab synchronization
  useEffect(() => {
    // Listen for storage changes from other tabs
    window.addEventListener('storage', handleStorageChange)
    
    // Also check for auth changes periodically (every 5 seconds)
    const intervalId = setInterval(() => {
      if (!state.isLoading) {
        initializeAuth()
      }
    }, 5000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(intervalId)
    }
  }, [handleStorageChange, state.isLoading, initializeAuth])

  // Initial auth initialization
  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  // Set up activity listeners to refresh session
  useEffect(() => {
    const refreshOnActivity = () => {
      if (state.isAuthenticated) {
        authService.refreshOnActivity()
      }
    }

    // Refresh on various user activities
    window.addEventListener('mousemove', refreshOnActivity)
    window.addEventListener('keypress', refreshOnActivity)
    window.addEventListener('click', refreshOnActivity)
    window.addEventListener('scroll', refreshOnActivity)

    return () => {
      window.removeEventListener('mousemove', refreshOnActivity)
      window.removeEventListener('keypress', refreshOnActivity)
      window.removeEventListener('click', refreshOnActivity)
      window.removeEventListener('scroll', refreshOnActivity)
    }
  }, [state.isAuthenticated])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const { user, token } = await authService.login(credentials)
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
      // Start session heartbeat after successful login
      startSessionHeartbeat()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
    // Stop session heartbeat on logout
    stopSessionHeartbeat()
  }, [])

  const validateToken = useCallback(async () => {
    const isValid = await authService.validateToken()
    if (!isValid && state.isAuthenticated) {
      // Token expired or invalid, clear state
      setState((prev) => ({
        ...prev,
        isAuthenticated: false,
        user: null,
        token: null,
      }))
      // Stop heartbeat if token is invalid
      stopSessionHeartbeat()
    } else if (isValid && !state.isAuthenticated) {
      // Token is valid but state wasn't set, update state
      const user = authService.getCurrentUser()
      const token = authService.getToken()
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
      // Start heartbeat
      startSessionHeartbeat()
    }
    return isValid
  }, [state.isAuthenticated])

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }))
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      validateToken,
      clearError,
    }),
    [state, login, logout, validateToken, clearError]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext