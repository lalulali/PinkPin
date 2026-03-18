/**
 * Input Wrapper Component
 * 
 * Wrapper for shadcn/ui Input component that maintains backward compatibility
 * with the existing component API while leveraging shadcn/ui's accessibility
 * and styling capabilities.
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6
 */

'use client'

import * as React from 'react'
import { Input as ShadcnInput } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { cn } from '@/lib/utils'

export interface InputProps {
  /** Input type */
  type?: 'text' | 'number' | 'date' | 'email' | 'search'
  /** Label text */
  label?: string
  /** Placeholder text */
  placeholder?: string
  /** Input value */
  value?: string | number
  /** Change handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /** Blur handler */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  /** Error message to display */
  error?: string
  /** Whether the input is disabled */
  disabled?: boolean
  /** Whether the input is readonly */
  readonly?: boolean
  /** Whether the input is required */
  required?: boolean
  /** Input name */
  name?: string
  /** Input id */
  id?: string
  /** ARIA describedby for accessibility */
  'aria-describedby'?: string
  /** Debounce delay in milliseconds */
  debounce?: number
  /** Additional CSS classes */
  className?: string
}

/**
 * Input component that wraps shadcn/ui Input with custom styling
 * for the Pink Pin Merchant App theme (#ED0577 focus ring).
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      type = 'text',
      label,
      placeholder,
      value,
      onChange,
      onBlur,
      error,
      disabled = false,
      readonly = false,
      required = false,
      name,
      id,
      'aria-describedby': ariaDescribedBy,
      debounce,
      className,
      ...props
    },
    ref
  ) {
    const inputId = id || name || React.useId()
    const errorId = `${inputId}-error`

    // Combine aria-describedby ids
    const describedByIds = React.useMemo(() => {
      const ids: string[] = []
      if (ariaDescribedBy) ids.push(ariaDescribedBy)
      if (error) ids.push(errorId)
      return ids.length > 0 ? ids.join(' ') : undefined
    }, [ariaDescribedBy, error, errorId])

    // Custom focus ring styling with #ED0577
    const focusRingClass = React.useMemo(() => {
      return 'focus-visible:ring-[#ED0577] focus-visible:border-[#ED0577]'
    }, [])

    // Error state styling
    const errorClass = React.useMemo(() => {
      if (error) {
        return 'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500 aria-invalid:border-destructive aria-invalid:ring-destructive'
      }
      return ''
    }, [error])

    // Debounced input handling
    const [debouncedValue, setDebouncedValue] = React.useState(value)
    const debounceTimeoutRef = React.useRef<NodeJS.Timeout>()

    React.useEffect(() => {
      if (debounce && debounce > 0) {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current)
        }
        debounceTimeoutRef.current = setTimeout(() => {
          setDebouncedValue(value)
        }, debounce)
      } else {
        setDebouncedValue(value)
      }
    }, [value, debounce])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!debounce && onChange) {
        onChange(event)
      } else if (debounce && onChange) {
        // For debounced inputs, call onChange with the current value
        // The actual debouncing is handled by the parent
        onChange(event)
      }
    }

    return (
      <div className="w-full">
        {label && (
          <Label
            htmlFor={inputId}
            className={cn(
              'block text-sm font-medium text-gray-700 mb-1',
              required && "after:content-['*'] after:text-red-500 after:ml-0.5"
            )}
          >
            {label}
          </Label>
        )}
        <ShadcnInput
          ref={ref}
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={debouncedValue}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
          readOnly={readonly}
          required={required}
          name={name}
          aria-invalid={!!error}
          aria-describedby={describedByIds}
          className={cn(focusRingClass, errorClass, className)}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            className="mt-1 text-sm text-red-500"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input