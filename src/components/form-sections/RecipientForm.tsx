/**
 * RecipientForm - Form section for recipient information
 * Includes real-time validation for name, phone, email, and address fields
 */

import { useState, useCallback } from 'react'
import { getValidationError } from '@/src/utils/validation'

interface RecipientFormProps {
  name: string
  phone: string
  email: string
  address: string
  onNameChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onEmailChange: (value: string) => void
  errors?: Record<string, string>
}

export function RecipientForm({
  name,
  phone,
  email,
  address,
  onNameChange,
  onPhoneChange,
  onEmailChange,
  errors = {},
}: RecipientFormProps) {
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Validate field on blur
  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  // Get validation error for a field
  const getFieldError = useCallback(
    (field: string): string | null => {
      if (!touched[field]) return null

      switch (field) {
        case 'name':
          return getValidationError(field, name, 'required')
        case 'phone':
          return getValidationError(field, phone, 'phone')
        case 'email':
          return getValidationError(field, email, 'email')
        case 'address':
          return getValidationError(field, address, 'required')
        default:
          return null
      }
    },
    [touched, name, phone, email, address]
  )

  const nameError = getFieldError('name') || errors.name
  const phoneError = getFieldError('phone') || errors.phone
  const emailError = getFieldError('email') || errors.email
  const addressError = getFieldError('address') || errors.address

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="recipient-name" className="block text-sm font-medium text-gray-700 mb-1">
          Recipient Name *
        </label>
        <input
          id="recipient-name"
          type="text"
          placeholder="Enter recipient name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          onBlur={() => handleBlur('name')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] min-h-[44px] transition-colors ${
            nameError ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          aria-invalid={!!nameError}
          aria-describedby={nameError ? 'recipient-name-error' : undefined}
        />
        {nameError && (
          <p id="recipient-name-error" className="text-sm text-red-600 mt-1">
            {nameError}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="recipient-phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number *
        </label>
        <input
          id="recipient-phone"
          type="tel"
          placeholder="Enter phone number (e.g., +1 (555) 123-4567)"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          onBlur={() => handleBlur('phone')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] min-h-[44px] transition-colors ${
            phoneError ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          aria-invalid={!!phoneError}
          aria-describedby={phoneError ? 'recipient-phone-error' : undefined}
        />
        {phoneError && (
          <p id="recipient-phone-error" className="text-sm text-red-600 mt-1">
            {phoneError}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="recipient-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          id="recipient-email"
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          onBlur={() => handleBlur('email')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] min-h-[44px] transition-colors ${
            emailError ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          aria-invalid={!!emailError}
          aria-describedby={emailError ? 'recipient-email-error' : undefined}
        />
        {emailError && (
          <p id="recipient-email-error" className="text-sm text-red-600 mt-1">
            {emailError}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="recipient-address" className="block text-sm font-medium text-gray-700 mb-1">
          Delivery Address *
        </label>
        <input
          id="recipient-address"
          type="text"
          placeholder="Click on the map to select delivery address"
          value={address}
          readOnly
          className={`w-full px-4 py-3 border rounded-lg bg-gray-50 min-h-[44px] cursor-not-allowed ${
            addressError ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-invalid={!!addressError}
          aria-describedby={addressError ? 'recipient-address-error' : undefined}
        />
        {addressError && (
          <p id="recipient-address-error" className="text-sm text-red-600 mt-1">
            {addressError}
          </p>
        )}
        <p className="text-sm text-gray-600 mt-2">
          Click on the map to select the delivery address
        </p>
      </div>
    </div>
  )
}

export default RecipientForm
