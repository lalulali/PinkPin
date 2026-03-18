/**
 * Authentication service for Pink Pin Merchant App
 * Handles login, logout, token validation, and session management
 */

import { AuthToken, AuthUser, LoginCredentials } from '../types/auth'

// Constants
const MOCK_CREDENTIALS = {
  email: 'demo@pinkpin.com',
  password: 'demo123',
}

const TOKEN_KEY = 'pinkpin_auth_token'
const USER_KEY = 'pinkpin_auth_user'
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

/**
 * Generate a mock JWT-like token for session management
 */
function generateToken(user: AuthUser): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const now = Date.now()
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      name: user.name,
      iat: now,
      exp: now + SESSION_DURATION_MS,
    })
  )
  const signature = btoa('mock-signature')
  return `${header}.${payload}.${signature}`
}

/**
 * Decode token payload without verification (for client-side use)
 */
function decodeToken(token: string): { sub: string; email: string; name: string; iat: number; exp: number } | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    return JSON.parse(atob(parts[1]))
  } catch {
    return null
  }
}

/**
 * Check if token is expired
 */
function isTokenExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt
}

/**
 * Create AuthToken object from user
 */
function createAuthToken(user: AuthUser): AuthToken {
  const now = new Date()
  return {
    token: generateToken(user),
    expiresAt: new Date(now.getTime() + SESSION_DURATION_MS),
    createdAt: now,
  }
}

/**
 * Validate mock credentials
 */
function validateCredentials(credentials: LoginCredentials): { valid: boolean; user?: AuthUser; error?: string } {
  // Check CAPTCHA verification
  if (!credentials.captchaVerified) {
    return { valid: false, error: 'CAPTCHA verification required' }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(credentials.email)) {
    return { valid: false, error: 'Please enter a valid email address' }
  }

  // Check mock credentials
  if (
    credentials.email.toLowerCase() === MOCK_CREDENTIALS.email.toLowerCase() &&
    credentials.password === MOCK_CREDENTIALS.password
  ) {
    const user: AuthUser = {
      id: 'merchant-001',
      email: credentials.email.toLowerCase(),
      name: 'Demo Merchant',
    }
    return { valid: true, user }
  }

  return { valid: false, error: 'Invalid email or password' }
}

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__test__'
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

/**
 * Broadcast auth changes to other tabs
 */
function broadcastAuthChange(): void {
  if (!isLocalStorageAvailable()) {
    return
  }
  
  // Create a custom event to notify other tabs
  const event = new StorageEvent('storage', {
    key: TOKEN_KEY,
    newValue: localStorage.getItem(TOKEN_KEY),
    oldValue: localStorage.getItem(TOKEN_KEY),
    storageArea: localStorage,
    url: window.location.href
  })
  
  // Dispatch the event to trigger storage listeners in other tabs
  window.dispatchEvent(event)
}

/**
 * Store token securely in localStorage and broadcast change
 */
function storeToken(token: AuthToken): void {
  if (!isLocalStorageAvailable()) {
    return
  }
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
  broadcastAuthChange()
}

/**
 * Retrieve token from localStorage
 */
function getStoredToken(): AuthToken | null {
  if (!isLocalStorageAvailable()) {
    return null
  }
  const stored = localStorage.getItem(TOKEN_KEY)
  if (!stored) return null
  try {
    const token = JSON.parse(stored) as AuthToken
    // Convert date strings back to Date objects
    token.expiresAt = new Date(token.expiresAt)
    token.createdAt = new Date(token.createdAt)
    return token
  } catch {
    return null
  }
}

/**
 * Store user in localStorage and broadcast change
 */
function storeUser(user: AuthUser): void {
  if (!isLocalStorageAvailable()) {
    return
  }
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  broadcastAuthChange()
}

/**
 * Retrieve user from localStorage
 */
function getStoredUser(): AuthUser | null {
  if (!isLocalStorageAvailable()) {
    return null
  }
  const stored = localStorage.getItem(USER_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored) as AuthUser
  } catch {
    return null
  }
}

/**
 * Clear all auth data from localStorage and broadcast change
 */
function clearAuthData(): void {
  if (!isLocalStorageAvailable()) {
    return
  }
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  broadcastAuthChange()
}

/**
 * Update token expiration on activity (refresh session)
 */
function refreshSession(): boolean {
  const token = getStoredToken()
  if (!token || isTokenExpired(token.expiresAt)) {
    return false
  }

  // Extend session by updating expiration
  const user = getStoredUser()
  if (user) {
    const newToken = createAuthToken(user)
    storeToken(newToken)
    return true
  }
  return false
}

export const authService = {
  /**
   * Authenticate user with credentials
   */
  async login(credentials: LoginCredentials): Promise<{ user: AuthUser; token: string }> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const result = validateCredentials(credentials)

    if (!result.valid || !result.user) {
      throw new Error(result.error || 'Authentication failed')
    }

    const authToken = createAuthToken(result.user)

    // Store auth data
    storeToken(authToken)
    storeUser(result.user)

    return {
      user: result.user,
      token: authToken.token,
    }
  },

  /**
   * Logout user and clear session
   */
  logout(): void {
    clearAuthData()
  },

  /**
   * Validate current token
   */
  async validateToken(): Promise<boolean> {
    const token = getStoredToken()
    if (!token) return false

    // Check if token is expired
    if (isTokenExpired(token.expiresAt)) {
      clearAuthData()
      return false
    }

    // Validate token structure
    const payload = decodeToken(token.token)
    if (!payload) {
      clearAuthData()
      return false
    }

    // Verify token matches stored user
    const user = getStoredUser()
    if (!user || user.id !== payload.sub) {
      clearAuthData()
      return false
    }

    return true
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser(): AuthUser | null {
    return getStoredUser()
  },

  /**
   * Get current token
   */
  getToken(): string | null {
    const token = getStoredToken()
    return token?.token || null
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.validateTokenSync()
  },

  /**
   * Synchronous token validation (for route protection)
   */
  validateTokenSync(): boolean {
    const token = getStoredToken()
    if (!token) return false
    if (isTokenExpired(token.expiresAt)) return false
    return true
  },

  /**
   * Refresh session on user activity
   */
  refreshOnActivity(): void {
    refreshSession()
  },

  /**
   * Get session expiration time
   */
  getSessionExpiration(): Date | null {
    const token = getStoredToken()
    return token?.expiresAt || null
  },

  /**
   * Get time remaining until session expires (in milliseconds)
   */
  getTimeUntilExpiry(): number {
    const token = getStoredToken()
    if (!token) return 0
    const remaining = token.expiresAt.getTime() - Date.now()
    return Math.max(0, remaining)
  },
}

export default authService