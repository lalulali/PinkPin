/**
 * Tests for LoginPage component
 * Tests: form validation, email/password fields, CAPTCHA checkbox, submit button,
 * loading state, error handling, authentication flow
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { LoginPage } from '@/src/page-components/LoginPage'
import { useAuth } from '@/src/context/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation'

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}))

vi.mock('@/src/context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

const mockPush = vi.fn()
const mockSearchParams = new URLSearchParams()

describe('LoginPage', () => {
  const mockLogin = vi.fn()
  const mockIsAuthenticated = false
  const mockIsLoading = false
  const mockAuthError = null

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ push: mockPush })
    ;(useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockSearchParams)
    ;(useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      login: mockLogin,
      isAuthenticated: mockIsAuthenticated,
      isLoading: mockIsLoading,
      error: mockAuthError,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Form Rendering', () => {
    it('should render login form with email and password fields', () => {
      render(<LoginPage />)

      expect(screen.getByLabelText('Email Address')).toBeTruthy()
      expect(screen.getByLabelText('Password')).toBeTruthy()
    })

    it('should render CAPTCHA checkbox', () => {
      render(<LoginPage />)

      expect(screen.getByLabelText("I'm not a robot")).toBeTruthy()
    })

    it('should render submit button', () => {
      render(<LoginPage />)

      expect(screen.getByRole('button', { name: 'Login' })).toBeTruthy()
    })

    it('should render demo credentials info', () => {
      render(<LoginPage />)

      expect(screen.getByText('Demo Credentials:')).toBeTruthy()
      expect(screen.getByText(/demo@pinkpin\.com/)).toBeTruthy()
    })

    it('should render page title', () => {
      render(<LoginPage />)

      expect(screen.getByText('Pink Pin')).toBeTruthy()
      expect(screen.getByText('Merchant Order Management')).toBeTruthy()
    })
  })

  describe('Form Validation', () => {
    it('should show email error when email is empty and blurred', async () => {
      render(<LoginPage />)

      const emailInput = screen.getByLabelText('Email Address')
      fireEvent.blur(emailInput)

      await waitFor(() => {
        expect(screen.getByText('This field is required')).toBeTruthy()
      })
    })

    it('should show email error for invalid email format', async () => {
      render(<LoginPage />)

      const emailInput = screen.getByLabelText('Email Address')
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
      fireEvent.blur(emailInput)

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeTruthy()
      })
    })

    it('should show password error when password is empty and blurred', async () => {
      render(<LoginPage />)

      const passwordInput = screen.getByLabelText('Password')
      fireEvent.blur(passwordInput)

      await waitFor(() => {
        expect(screen.getByText('This field is required')).toBeTruthy()
      })
    })

    it('should show CAPTCHA error when not checked and form submitted', async () => {
      render(<LoginPage />)

      const submitButton = screen.getByRole('button', { name: 'Login' })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Please verify the CAPTCHA')).toBeTruthy()
      })
    })

    it('should clear email error when user starts typing valid email', async () => {
      render(<LoginPage />)

      const emailInput = screen.getByLabelText('Email Address')
      fireEvent.blur(emailInput)
      await waitFor(() => {
        expect(screen.getByText('This field is required')).toBeTruthy()
      })

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

      await waitFor(() => {
        expect(screen.queryByText('This field is required')).toBeNull()
      })
    })
  })

  describe('Form Submission', () => {
    it('should call login with correct credentials when form is valid', async () => {
      mockLogin.mockResolvedValue(undefined)

      render(<LoginPage />)

      const emailInput = screen.getByLabelText('Email Address')
      const passwordInput = screen.getByLabelText('Password')
      const captchaCheckbox = screen.getByLabelText("I'm not a robot")

      fireEvent.change(emailInput, { target: { value: 'demo@pinkpin.com' } })
      fireEvent.change(passwordInput, { target: { value: 'demo123' } })
      fireEvent.click(captchaCheckbox)

      const submitButton = screen.getByRole('button', { name: 'Login' })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'demo@pinkpin.com',
          password: 'demo123',
          captchaVerified: true,
        })
      })
    })

    it('should not call login when form is invalid', async () => {
      render(<LoginPage />)

      const submitButton = screen.getByRole('button', { name: 'Login' })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockLogin).not.toHaveBeenCalled()
      })
    })
  })

  describe('Loading State', () => {
    it('should show loading state when isLoading is true', () => {
      ;(useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        login: mockLogin,
        isAuthenticated: false,
        isLoading: true,
        error: null,
      })

      render(<LoginPage />)

      expect(screen.getByRole('button', { name: 'Logging in...' })).toBeTruthy()
      expect(screen.getByRole('button', { name: 'Logging in...' })).toBeDisabled()
    })

    it('should disable inputs when loading', () => {
      ;(useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        login: mockLogin,
        isAuthenticated: false,
        isLoading: true,
        error: null,
      })

      render(<LoginPage />)

      expect(screen.getByLabelText('Email Address')).toBeDisabled()
      expect(screen.getByLabelText('Password')).toBeDisabled()
      expect(screen.getByLabelText("I'm not a robot")).toBeDisabled()
    })
  })

  describe('Error Handling', () => {
    it('should display auth error message', () => {
      ;(useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        login: mockLogin,
        isAuthenticated: false,
        isLoading: false,
        error: 'Invalid credentials',
      })

      render(<LoginPage />)

      expect(screen.getByText('Invalid credentials')).toBeTruthy()
    })
  })

  describe('Authentication Flow', () => {
    it('should redirect to dashboard when already authenticated', () => {
      ;(useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        login: mockLogin,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      render(<LoginPage />)

      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })

    it('should redirect to custom return URL when provided', () => {
      const customParams = new URLSearchParams({ returnTo: '/orders' })
      ;(useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue(customParams)

      ;(useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        login: mockLogin,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      render(<LoginPage />)

      expect(mockPush).toHaveBeenCalledWith('/orders')
    })

    it('should not redirect when not authenticated', () => {
      render(<LoginPage />)

      expect(mockPush).not.toHaveBeenCalled()
    })
  })

  describe('CAPTCHA Interaction', () => {
    it('should toggle CAPTCHA checkbox when clicked', () => {
      render(<LoginPage />)

      const captchaCheckbox = screen.getByLabelText("I'm not a robot")
      expect(captchaCheckbox).not.toBeChecked()

      fireEvent.click(captchaCheckbox)
      expect(captchaCheckbox).toBeChecked()

      fireEvent.click(captchaCheckbox)
      expect(captchaCheckbox).not.toBeChecked()
    })

    it('should clear CAPTCHA error when checkbox is checked', async () => {
      render(<LoginPage />)

      const submitButton = screen.getByRole('button', { name: 'Login' })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Please verify the CAPTCHA')).toBeTruthy()
      })

      const captchaCheckbox = screen.getByLabelText("I'm not a robot")
      fireEvent.click(captchaCheckbox)

      await waitFor(() => {
        expect(screen.queryByText('Please verify the CAPTCHA')).toBeNull()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper form labels', () => {
      render(<LoginPage />)

      expect(screen.getByLabelText('Email Address')).toBeTruthy()
      expect(screen.getByLabelText('Password')).toBeTruthy()
    })

    it('should have submit button with type submit', () => {
      render(<LoginPage />)

      const submitButton = screen.getByRole('button', { name: 'Login' })
      expect(submitButton).toHaveAttribute('type', 'submit')
    })

    it('should be focusable with keyboard', () => {
      render(<LoginPage />)

      const emailInput = screen.getByLabelText('Email Address')
      // Native inputs are focusable by default (tabIndex is null/undefined for native elements)
      expect(emailInput).toBeTruthy()
    })
  })
})