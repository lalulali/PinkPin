/**
 * Validation utilities for form fields and data
 */

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  // Accept phone numbers with +, -, spaces, and digits
  const phoneRegex = /^[\d\s\-+()]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

export function validateRequired(value: string | number | undefined | null): boolean {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return value !== undefined && value !== null
}

export function getValidationError(
  field: string,
  value: string | number | undefined | null,
  type: 'email' | 'phone' | 'required'
): string | null {
  if (type === 'email') {
    if (!validateRequired(value)) return 'This field is required'
    if (!validateEmail(value as string)) return 'Please enter a valid email address'
  } else if (type === 'phone') {
    if (!validateRequired(value)) return 'This field is required'
    if (!validatePhone(value as string)) return 'Please enter a valid phone number'
  } else if (type === 'required') {
    if (!validateRequired(value)) return 'This field is required'
  }
  return null
}
