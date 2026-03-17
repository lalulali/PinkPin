/**
 * Unit tests for validation utilities
 * Tests email, phone, and required field validation
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4
 */

import { describe, it, expect } from 'vitest'
import {
  validateEmail,
  validatePhone,
  validateRequired,
  getValidationError,
} from './validation'

describe('Validation - Email Validation', () => {
  describe('validateEmail', () => {
    it('should return true for valid email formats', () => {
      expect(validateEmail('user@example.com')).toBe(true)
      expect(validateEmail('user.name@example.com')).toBe(true)
      expect(validateEmail('user+tag@example.com')).toBe(true)
      expect(validateEmail('user@subdomain.example.com')).toBe(true)
      expect(validateEmail('a@b.co')).toBe(true)
    })

    it('should return false for invalid email formats', () => {
      expect(validateEmail('')).toBe(false)
      expect(validateEmail('invalid')).toBe(false)
      expect(validateEmail('invalid@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
      expect(validateEmail('user@.com')).toBe(false)
      expect(validateEmail('user@example')).toBe(false)
      expect(validateEmail('user name@example.com')).toBe(false)
      expect(validateEmail('user@exam ple.com')).toBe(false)
    })

    it('should handle edge cases', () => {
      expect(validateEmail(null as any)).toBe(false)
      expect(validateEmail(undefined as any)).toBe(false)
    })
  })

  describe('getValidationError for email', () => {
    it('should return null for valid email', () => {
      expect(getValidationError('email', 'user@example.com', 'email')).toBe(null)
    })

    it('should return required error for empty email', () => {
      expect(getValidationError('email', '', 'email')).toBe('This field is required')
      expect(getValidationError('email', '   ', 'email')).toBe('This field is required')
    })

    it('should return invalid email error for malformed email', () => {
      expect(getValidationError('email', 'invalid', 'email')).toBe('Please enter a valid email address')
      expect(getValidationError('email', 'user@', 'email')).toBe('Please enter a valid email address')
    })
  })
})

describe('Validation - Phone Validation', () => {
  describe('validatePhone', () => {
    it('should return true for valid phone formats', () => {
      expect(validatePhone('1234567890')).toBe(true)
      expect(validatePhone('+1234567890')).toBe(true)
      expect(validatePhone('+62 812 3456 7890')).toBe(true)
      expect(validatePhone('0812-3456-7890')).toBe(true)
      expect(validatePhone('(021) 1234 5678')).toBe(true)
      expect(validatePhone('+62 21 1234 5678')).toBe(true)
    })

    it('should return false for invalid phone formats', () => {
      expect(validatePhone('')).toBe(false)
      expect(validatePhone('123')).toBe(false) // Less than 10 digits
      expect(validatePhone('abc')).toBe(false)
      expect(validatePhone('12345')).toBe(false)
    })

    it('should handle edge cases', () => {
      expect(validatePhone(null as any)).toBe(false)
      expect(validatePhone(undefined as any)).toBe(false)
    })
  })

  describe('getValidationError for phone', () => {
    it('should return null for valid phone', () => {
      expect(getValidationError('phone', '08123456789', 'phone')).toBe(null)
    })

    it('should return required error for empty phone', () => {
      expect(getValidationError('phone', '', 'phone')).toBe('This field is required')
    })

    it('should return invalid phone error for malformed phone', () => {
      expect(getValidationError('phone', '123', 'phone')).toBe('Please enter a valid phone number')
    })
  })
})

describe('Validation - Required Field Validation', () => {
  describe('validateRequired', () => {
    it('should return true for non-empty strings', () => {
      expect(validateRequired('hello')).toBe(true)
      expect(validateRequired('  text  ')).toBe(true)
      expect(validateRequired('a')).toBe(true)
    })

    it('should return false for empty strings', () => {
      expect(validateRequired('')).toBe(false)
      expect(validateRequired('   ')).toBe(false)
    })

    it('should return true for non-null numbers', () => {
      expect(validateRequired(0)).toBe(true)
      expect(validateRequired(123)).toBe(true)
      expect(validateRequired(-1)).toBe(true)
    })

    it('should return false for null/undefined', () => {
      expect(validateRequired(null)).toBe(false)
      expect(validateRequired(undefined)).toBe(false)
    })
  })

  describe('getValidationError for required', () => {
    it('should return null for valid required field', () => {
      expect(getValidationError('name', 'John', 'required')).toBe(null)
      expect(getValidationError('quantity', 5, 'required')).toBe(null)
    })

    it('should return required error for empty values', () => {
      expect(getValidationError('name', '', 'required')).toBe('This field is required')
      expect(getValidationError('name', '   ', 'required')).toBe('This field is required')
      expect(getValidationError('quantity', null, 'required')).toBe('This field is required')
      expect(getValidationError('quantity', undefined, 'required')).toBe('This field is required')
    })
  })
})