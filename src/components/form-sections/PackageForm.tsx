/**
 * PackageForm - Form section for package details
 * Includes validation for numeric values (weight, dimensions)
 */

import { useState, useCallback } from 'react'

interface PackageFormProps {
  weight: number
  length: number
  width: number
  height: number
  isFragile: boolean
  onWeightChange: (value: number) => void
  onLengthChange: (value: number) => void
  onWidthChange: (value: number) => void
  onHeightChange: (value: number) => void
  onFragileChange: (value: boolean) => void
  errors?: Record<string, string>
}

export function PackageForm({
  weight,
  length,
  width,
  height,
  isFragile,
  onWeightChange,
  onLengthChange,
  onWidthChange,
  onHeightChange,
  onFragileChange,
  errors = {},
}: PackageFormProps) {
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Mark field as touched on blur
  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  // Mark field as touched on first change
  const handleChange = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  // Validate numeric value
  const validateNumeric = useCallback((value: number, fieldName: string): string | null => {
    if (value < 0) {
      return `${fieldName} must be a positive number`
    }
    if (!Number.isFinite(value)) {
      return `${fieldName} must be a valid number`
    }
    return null
  }, [])

  // Get validation error for a field
  const getFieldError = useCallback(
    (field: string): string | null => {
      if (!touched[field]) return null

      switch (field) {
        case 'weight':
          return validateNumeric(weight, 'Weight')
        case 'length':
          return validateNumeric(length, 'Length')
        case 'width':
          return validateNumeric(width, 'Width')
        case 'height':
          return validateNumeric(height, 'Height')
        default:
          return null
      }
    },
    [touched, weight, length, width, height, validateNumeric]
  )

  const weightError = getFieldError('weight') || errors.weight
  const lengthError = getFieldError('length') || errors.length
  const widthError = getFieldError('width') || errors.width
  const heightError = getFieldError('height') || errors.height

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="package-weight" className="block text-sm font-medium text-gray-700 mb-1">
          Weight (kg)
        </label>
        <input
          id="package-weight"
          type="number"
          placeholder="0"
          min="0"
          step="0.1"
          value={weight}
          onChange={(e) => {
            onWeightChange(parseFloat(e.target.value) || 0)
            handleChange('weight')
          }}
          onBlur={() => handleBlur('weight')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] min-h-[44px] transition-colors ${
            weightError ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          aria-invalid={!!weightError}
          aria-describedby={weightError ? 'package-weight-error' : undefined}
        />
        {weightError && (
          <p id="package-weight-error" className="text-sm text-red-600 mt-1">
            {weightError}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dimensions (cm)
        </label>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <input
              id="package-length"
              type="number"
              placeholder="Length"
              min="0"
              step="0.1"
              value={length}
              onChange={(e) => {
                onLengthChange(parseFloat(e.target.value) || 0)
                handleChange('length')
              }}
              onBlur={() => handleBlur('length')}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] text-sm transition-colors ${
                lengthError ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              aria-invalid={!!lengthError}
              aria-describedby={lengthError ? 'package-length-error' : undefined}
            />
            {lengthError && (
              <p id="package-length-error" className="text-xs text-red-600 mt-1">
                {lengthError}
              </p>
            )}
          </div>
          <div>
            <input
              id="package-width"
              type="number"
              placeholder="Width"
              min="0"
              step="0.1"
              value={width}
              onChange={(e) => {
                onWidthChange(parseFloat(e.target.value) || 0)
                handleChange('width')
              }}
              onBlur={() => handleBlur('width')}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] text-sm transition-colors ${
                widthError ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              aria-invalid={!!widthError}
              aria-describedby={widthError ? 'package-width-error' : undefined}
            />
            {widthError && (
              <p id="package-width-error" className="text-xs text-red-600 mt-1">
                {widthError}
              </p>
            )}
          </div>
          <div>
            <input
              id="package-height"
              type="number"
              placeholder="Height"
              min="0"
              step="0.1"
              value={height}
              onChange={(e) => {
                onHeightChange(parseFloat(e.target.value) || 0)
                handleChange('height')
              }}
              onBlur={() => handleBlur('height')}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] text-sm transition-colors ${
                heightError ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              aria-invalid={!!heightError}
              aria-describedby={heightError ? 'package-height-error' : undefined}
            />
            {heightError && (
              <p id="package-height-error" className="text-xs text-red-600 mt-1">
                {heightError}
              </p>
            )}
          </div>
        </div>
      </div>

      <label htmlFor="package-fragile" className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors min-h-[44px]">
        <input
          id="package-fragile"
          type="checkbox"
          checked={isFragile}
          onChange={(e) => onFragileChange(e.target.checked)}
          className="w-5 h-5 text-[#ED0577] rounded cursor-pointer"
        />
        <span className="ml-3 font-medium text-gray-900">Fragile Item</span>
      </label>

      <p className="text-sm text-gray-600">
        Provide package details for accurate shipping calculations
      </p>
    </div>
  )
}

export default PackageForm
