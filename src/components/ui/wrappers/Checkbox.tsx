/**
 * Checkbox Wrapper Component
 * 
 * Wrapper for shadcn/ui Checkbox component that maintains backward compatibility
 * with the existing component API while leveraging shadcn/ui's accessibility
 * and styling capabilities.
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 */

'use client'

import * as React from 'react'
import { Checkbox as ShadcnCheckbox } from '@/src/components/ui/checkbox'
import { cn } from '@/lib/utils'

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked?: boolean
  /** Change handler */
  onChange?: (checked: boolean) => void
  /** Label text */
  label?: string
  /** Whether the checkbox is disabled */
  disabled?: boolean
  /** Checkbox name */
  name?: string
  /** Checkbox id */
  id?: string
  /** Additional CSS classes */
  className?: string
  /** Whether the checkbox is required */
  required?: boolean
  /** Value for the checkbox */
  value?: string
  /** Custom content to display next to checkbox */
  children?: React.ReactNode
}

/**
 * Checkbox component that wraps shadcn/ui Checkbox with custom styling
 * for the Pink Pin Merchant App theme (#ED0577 for checked state).
 * 
 * Features:
 * - Checked state with #ED0577 indicator
 * - Label association with htmlFor pattern
 * - Disabled state
 * - Keyboard accessibility (space to toggle)
 */
export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  function Checkbox(
    {
      checked = false,
      onChange,
      label,
      disabled = false,
      name,
      id,
      className,
      required = false,
      value,
      ...props
    },
    ref
  ) {
    const checkboxId = id || name || React.useId()
    const labelId = `${checkboxId}-label`

    const handleChange = () => {
      if (!disabled && onChange) {
        onChange(!checked)
      }
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        handleChange()
      }
    }

    // Custom styling for #ED0577 checked state
    const checkedClass = React.useMemo(() => {
      if (checked) {
        return 'data-checked:bg-[#ED0577] data-checked:border-[#ED0577] data-checked:text-white'
      }
      return ''
    }, [checked])

    return (
      <div className="flex items-center gap-2">
        <ShadcnCheckbox
          ref={ref}
          id={checkboxId}
          checked={checked}
          disabled={disabled}
          required={required}
          name={name}
          value={value}
          onCheckedChange={() => onChange?.(!checked)}
          className={cn(checkedClass, className)}
          aria-labelledby={label ? labelId : undefined}
          onKeyDown={handleKeyDown}
          {...props}
        />
        {props.children ? (
          <div
            onClick={handleChange}
            className={cn(
              'text-sm text-gray-600 cursor-pointer',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {props.children}
          </div>
        ) : label ? (
          <label
            htmlFor={checkboxId}
            id={labelId}
            className={cn(
              'text-sm text-gray-700 cursor-pointer',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            onClick={handleChange}
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        ) : null}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

/**
 * Checkbox Group - For multiple related checkboxes
 */
export interface CheckboxGroupProps {
  options: Array<{
    value: string
    label: string
    disabled?: boolean
  }>
  values: string[]
  onChange: (values: string[]) => void
  label?: string
  disabled?: boolean
  name?: string
  className?: string
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = function CheckboxGroup({
  options,
  values,
  onChange,
  label,
  disabled = false,
  name = 'checkbox-group',
  className,
}) {
  const groupId = name || React.useId()

  const handleChange = (optionValue: string, checked: boolean) => {
    if (disabled) return
    if (checked) {
      onChange([...values, optionValue])
    } else {
      onChange(values.filter((v) => v !== optionValue))
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <span className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </span>
      )}
      {options.map((option) => (
        <Checkbox
          key={option.value}
          id={`${groupId}-${option.value}`}
          name={`${groupId}-${option.value}`}
          checked={values.includes(option.value)}
          onChange={(checked) => handleChange(option.value, checked)}
          label={option.label}
          disabled={disabled || option.disabled}
        />
      ))}
    </div>
  )
}

/**
 * Terms Checkbox - Pre-configured checkbox for terms acceptance
 */
export interface TermsCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = function TermsCheckbox({
  checked,
  onChange,
  disabled = false,
  className,
}) {
  return (
    <Checkbox
      id="terms-checkbox"
      name="terms"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={className}
    >
      <span className="text-sm text-gray-600">
        I agree to the{' '}
        <a href="/terms" className="text-[#ED0577] hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-[#ED0577] hover:underline">
          Privacy Policy
        </a>
      </span>
    </Checkbox>
  )
}

export default Checkbox