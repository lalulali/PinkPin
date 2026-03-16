/**
 * Authentication types for Pink Pin Merchant App
 */

export interface AuthToken {
  token: string
  expiresAt: Date
  createdAt: Date
}

export interface AuthUser {
  id: string
  email: string
  name: string
}

export interface LoginCredentials {
  email: string
  password: string
  captchaVerified: boolean
}

export interface AuthState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  validateToken: () => Promise<boolean>
  clearError: () => void
}

export interface TokenPayload {
  sub: string
  email: string
  name: string
  iat: number
  exp: number
}