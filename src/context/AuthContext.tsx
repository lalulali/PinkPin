/**
 * AuthContext - React Context for authentication state management
 */

'use client'

import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react'
import { AuthState, AuthContextValue, LoginCredentials } from '../types/auth'
import { authService } from '../services/authService'
import { initializeSampleData } from '../services/sampleData'

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
  useEffect(() => {
    const initializeAuth = async () => {
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
        } else {
          setState((prev) => ({ ...prev, isLoading: false }))
        }
      } catch {
        setState((prev) => ({ ...prev, isLoading: false }))
      }
    }

    initializeAuth()
  }, [])

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