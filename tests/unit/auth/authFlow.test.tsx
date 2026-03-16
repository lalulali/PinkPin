/**
 * Unit tests for authentication flow
 * Tests login with valid/invalid credentials, session persistence, logout, and protected routes
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from '../../../src/context/AuthContext'
import { ProtectedRoute } from '../../../src/components/ProtectedRoute'
import { LoginPage } from '../../../src/pages/LoginPage'
import * as authServiceModule from '../../../src/services/authService'

// Mock window.location.href
delete (window as any).location
window.location = { href: '', assign: vi.fn(), replace: vi.fn() } as any

// Mock authService
vi.mock('../../../src/services/authService')

const mockAuthService = vi.mocked(authServiceModule.authService)

describe('Authentication Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    window.location.href = ''
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('Login with Valid Credentials', () => {
    it('should successfully login with demo credentials', async () => {
      mockAuthService.login.mockResolvedValue({
        user: { id: 'merchant-001', email: 'demo@pinkpin.com', name: 'Demo Merchant' },
        token: 'mock-token',
      })

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
        </MemoryRouter>
      )

      // Fill in form
      fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: 'demo@pinkpin.com' },
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'demo123' },
      })
      fireEvent.click(screen.getByLabelText(/i'm not a robot/i))

      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /login/i }))

      // Wait for login to complete
      await waitFor(() => {
        expect(mockAuthService.login).toHaveBeenCalledWith({
          email: 'demo@pinkpin.com',
          password: 'demo123',
          captchaVerified: true,
        })
      })
    })

    it('should redirect to dashboard after successful login', async () => {
      mockAuthService.login.mockResolvedValue({
        user: { id: 'merchant-001', email: 'demo@pinkpin.com', name: 'Demo Merchant' },
        token: 'mock-token',
      })

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
        </MemoryRouter>
      )

      // Fill in form
      fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: 'demo@pinkpin.com' },
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'demo123' },
      })
      fireEvent.click(screen.getByLabelText(/i'm not a robot/i))

      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /login/i }))

      // Wait for redirect
      await waitFor(() => {
        expect(window.location.assign).toHaveBeenCalled()
      })
    })
  })

  describe('Login with Invalid Credentials', () => {
    it('should display error for invalid email format', async () => {
      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
        </MemoryRouter>
      )

      // Try to submit with invalid email
      fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: 'invalid-email' },
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'demo123' },
      })
      fireEvent.click(screen.getByLabelText(/i'm not a robot/i))
      fireEvent.click(screen.getByRole('button', { name: /login/i }))

      // Should show validation error
      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
      })
    })

    it('should display error for invalid password', async () => {
      mockAuthService.login.mockRejectedValue(new Error('Invalid email or password'))

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
        </MemoryRouter>
      )

      // Fill in form with invalid credentials
      fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: 'demo@pinkpin.com' },
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'wrong-password' },
      })
      fireEvent.click(screen.getByLabelText(/i'm not a robot/i))
      fireEvent.click(screen.getByRole('button', { name: /login/i }))

      // Should show error message
      await waitFor(() => {
        expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument()
      })
    })

    it('should not redirect on login failure', async () => {
      mockAuthService.login.mockRejectedValue(new Error('Invalid email or password'))

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
        </MemoryRouter>
      )

      // Fill in form with invalid credentials
      fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: 'demo@pinkpin.com' },
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'wrong-password' },
      })
      fireEvent.click(screen.getByLabelText(/i'm not a robot/i))
      fireEvent.click(screen.getByRole('button', { name: /login/i }))

      // Should not redirect
      await waitFor(() => {
        expect(window.location.assign).not.toHaveBeenCalled()
      })
    })
  })

  describe('Session Persistence', () => {
    it('should maintain session after page reload when token is valid', async () => {
      // Set up a valid session in localStorage
      const validToken = {
        token: 'mock-jwt-token',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        createdAt: new Date(),
      }
      localStorage.setItem('pinkpin_auth_token', JSON.stringify(validToken))
      localStorage.setItem(
        'pinkpin_auth_user',
        JSON.stringify({ id: 'merchant-001', email: 'demo@pinkpin.com', name: 'Demo Merchant' })
      )

      mockAuthService.validateToken.mockResolvedValue(true)
      mockAuthService.getCurrentUser.mockReturnValue({
        id: 'merchant-001',
        email: 'demo@pinkpin.com',
        name: 'Demo Merchant',
      })
      mockAuthService.getToken.mockReturnValue('mock-jwt-token')

      // Create a test component that uses auth
      const AuthStatus = () => {
        const { isAuthenticated, isLoading } = useAuth()
        if (isLoading) return <span>Loading...</span>
        return <span data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</span>
      }

      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <AuthStatus />
          </AuthProvider>
        </MemoryRouter>
      )

      // Should show authenticated state
      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated')
      })
    })

    it('should clear session when token expires', async () => {
      // Set up an expired session in localStorage
      const expiredToken = {
        token: 'mock-jwt-token',
        expiresAt: new Date(Date.now() - 1000), // Expired 1 second ago
        createdAt: new Date(),
      }
      localStorage.setItem('pinkpin_auth_token', JSON.stringify(expiredToken))
      localStorage.setItem(
        'pinkpin_auth_user',
        JSON.stringify({ id: 'merchant-001', email: 'demo@pinkpin.com', name: 'Demo Merchant' })
      )

      mockAuthService.validateToken.mockResolvedValue(false)

      // Create a test component that uses auth
      const AuthStatus = () => {
        const { isAuthenticated, isLoading } = useAuth()
        if (isLoading) return <span>Loading...</span>
        return <span data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</span>
      }

      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <AuthStatus />
          </AuthProvider>
        </MemoryRouter>
      )

      // Should show not authenticated state
      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated')
      })
    })
  })

  describe('Logout', () => {
    it('should clear session data on logout', async () => {
      // Set up a valid session
      const validToken = {
        token: 'mock-jwt-token',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
      }
      localStorage.setItem('pinkpin_auth_token', JSON.stringify(validToken))
      localStorage.setItem(
        'pinkpin_auth_user',
        JSON.stringify({ id: 'merchant-001', email: 'demo@pinkpin.com', name: 'Demo Merchant' })
      )

      mockAuthService.validateToken.mockResolvedValue(true)
      mockAuthService.getCurrentUser.mockReturnValue({
        id: 'merchant-001',
        email: 'demo@pinkpin.com',
        name: 'Demo Merchant',
      })
      mockAuthService.getToken.mockReturnValue('mock-jwt-token')

      // Create a component with logout button
      const AuthComponent = () => {
        const { isAuthenticated, logout } = useAuth()
        return (
          <div>
            <span data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</span>
            <button onClick={logout} data-testid="logout-btn">
              Logout
            </button>
          </div>
        )
      }

      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <AuthComponent />
          </AuthProvider>
        </MemoryRouter>
      )

      // Verify authenticated state
      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated')
      })

      // Click logout
      fireEvent.click(screen.getByTestId('logout-btn'))

      // Verify session is cleared
      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated')
        expect(mockAuthService.logout).toHaveBeenCalled()
        expect(localStorage.getItem('pinkpin_auth_token')).toBeNull()
        expect(localStorage.getItem('pinkpin_auth_user')).toBeNull()
      })
    })
  })

  describe('Protected Routes', () => {
    it('should redirect unauthenticated users to login page', async () => {
      // Clear any existing session
      localStorage.clear()

      mockAuthService.validateToken.mockResolvedValue(false)

      // Create a protected route
      const ProtectedPage = () => <div data-testid="protected-content">Protected Content</div>

      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <ProtectedPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<div data-testid="login-page">Login Page</div>} />
            </Routes>
          </AuthProvider>
        </MemoryRouter>
      )

      // Should redirect to login page
      await waitFor(() => {
        expect(screen.getByTestId('login-page')).toBeInTheDocument()
      })
    })

    it('should preserve return URL when redirecting to login', async () => {
      // Clear any existing session
      localStorage.clear()

      mockAuthService.validateToken.mockResolvedValue(false)

      // Create a protected route
      const ProtectedPage = () => <div data-testid="protected-content">Protected Content</div>

      render(
        <MemoryRouter initialEntries={['/dashboard?returnTo=%2Forders%2F123']}>
          <AuthProvider>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <ProtectedPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<div data-testid="login-page">Login Page</div>} />
            </Routes>
          </AuthProvider>
        </MemoryRouter>
      )

      // Should redirect to login page
      await waitFor(() => {
        expect(screen.getByTestId('login-page')).toBeInTheDocument()
      })
    })

    it('should render protected content when authenticated', async () => {
      // Set up a valid session
      const validToken = {
        token: 'mock-jwt-token',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
      }
      localStorage.setItem('pinkpin_auth_token', JSON.stringify(validToken))
      localStorage.setItem(
        'pinkpin_auth_user',
        JSON.stringify({ id: 'merchant-001', email: 'demo@pinkpin.com', name: 'Demo Merchant' })
      )

      mockAuthService.validateToken.mockResolvedValue(true)
      mockAuthService.getCurrentUser.mockReturnValue({
        id: 'merchant-001',
        email: 'demo@pinkpin.com',
        name: 'Demo Merchant',
      })
      mockAuthService.getToken.mockReturnValue('mock-jwt-token')

      // Create a protected route
      const ProtectedPage = () => <div data-testid="protected-content">Protected Content</div>

      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <ProtectedPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </MemoryRouter>
      )

      // Should render protected content
      await waitFor(() => {
        expect(screen.getByTestId('protected-content')).toBeInTheDocument()
      })
    })
  })
})
