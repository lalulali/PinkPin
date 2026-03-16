/**
 * LoginPage - Authentication page for Pink Pin Merchant App
 * Handles user login with email, password, and CAPTCHA verification
 */

'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { getValidationError } from '../utils/validation'
import { LoginCredentials } from '../types/auth'

function LoginPageContent() {
  const { login, isLoading, error: authError, isAuthenticated } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captchaChecked, setCaptchaChecked] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; captcha?: string }>({})
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({})

  // Get return URL from query params
  const [returnTo, setReturnTo] = useState<string>('/dashboard')

  useEffect(() => {
    // Parse returnTo from URL query params
    const returnParam = searchParams.get('returnTo')
    if (returnParam) {
      try {
        const decoded = decodeURIComponent(returnParam)
        // Validate it's a safe URL (internal path)
        if (decoded.startsWith('/') && !decoded.startsWith('//')) {
          setReturnTo(decoded)
        }
      } catch {
        // Invalid return URL, use default
      }
    }
  }, [searchParams])

  // Redirect to intended destination after successful login
  useEffect(() => {
    if (isAuthenticated) {
      router.push(returnTo)
    }
  }, [isAuthenticated, returnTo, router])

  // Validate email field
  const validateEmailField = (value: string) => {
    return getValidationError('email', value, 'email')
  }

  // Validate password field
  const validatePasswordField = (value: string) => {
    return getValidationError('password', value, 'required')
  }

  // Handle email blur
  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }))
    const error = validateEmailField(email)
    setErrors((prev) => ({ ...prev, email: error || undefined }))
  }

  // Handle password blur
  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }))
    const error = validatePasswordField(password)
    setErrors((prev) => ({ ...prev, password: error || undefined }))
  }

  // Handle email change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)

    // Real-time validation if field has been touched
    if (touched.email) {
      const error = validateEmailField(value)
      setErrors((prev) => ({ ...prev, email: error || undefined }))
    }
  }

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)

    // Real-time validation if field has been touched
    if (touched.password) {
      const error = validatePasswordField(value)
      setErrors((prev) => ({ ...prev, password: error || undefined }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const emailError = validateEmailField(email)
    const passwordError = validatePasswordField(password)
    const captchaError = !captchaChecked ? 'Please verify the CAPTCHA' : undefined

    setErrors({
      email: emailError || undefined,
      password: passwordError || undefined,
      captcha: captchaError,
    })

    // Mark all fields as touched
    setTouched({ email: true, password: true })

    // Stop if validation failed
    if (emailError || passwordError || captchaError) {
      return
    }

    try {
      const credentials: LoginCredentials = {
        email,
        password,
        captchaVerified: captchaChecked,
      }

      await login(credentials)
      // Navigation happens automatically via useEffect when isAuthenticated changes
    } catch {
      // Error is handled by authError from context
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pink Pin</h1>
          <p className="text-gray-600">Merchant Order Management</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Login</h2>

          {/* Auth Error Message */}
          {authError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{authError}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                placeholder="demo@pinkpin.com"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors ${
                  errors.email
                    ? 'border-red-300 focus:ring-red-500 bg-red-50'
                    : 'border-gray-300 focus:ring-[#ED0577]'
                }`}
                disabled={isLoading}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                placeholder="••••••••"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors ${
                  errors.password
                    ? 'border-red-300 focus:ring-red-500 bg-red-50'
                    : 'border-gray-300 focus:ring-[#ED0577]'
                }`}
                disabled={isLoading}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* CAPTCHA Checkbox */}
            <div className="flex items-start space-x-3 p-4 border border-gray-300 rounded-md bg-gray-50">
              <input
                id="captcha"
                type="checkbox"
                checked={captchaChecked}
                onChange={(e) => {
                  setCaptchaChecked(e.target.checked)
                  if (e.target.checked) {
                    setErrors((prev) => ({ ...prev, captcha: undefined }))
                  }
                }}
                className="mt-1 w-5 h-5 text-[#ED0577] border-gray-300 rounded focus:ring-[#ED0577] cursor-pointer"
                disabled={isLoading}
              />
              <label htmlFor="captcha" className="text-sm text-gray-700 cursor-pointer flex-1">
                I'm not a robot
              </label>
            </div>
            {errors.captcha && <p className="text-sm text-red-600">{errors.captcha}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#ED0577] hover:bg-[#d60668] disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#ED0577] focus:ring-offset-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Demo Credentials:</span>
              <br />
              Email: demo@pinkpin.com
              <br />
              Password: demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  )
}

export default LoginPage
