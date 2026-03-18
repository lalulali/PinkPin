/**
 * Select Wrapper Component
 * 
 * Wrapper for shadcn/ui Select component that maintains backward compatibility
 * with the existing component API while leveraging shadcn/ui's accessibility
 * and styling capabilities.
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5
 */

'use client'

import * as React from 'react'
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select'
import { Label } from '@/src/components/ui/label'
import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  /** Select options */
  options: SelectOption[]
  /** Selected value(s) */
  value?: string | string[]
  /** Change handler */
  onChange?: (value: string | string[]) => void
  /** Placeholder text */
  placeholder?: string
  /** Label text */
  label?: string
  /** Error message */
  error?: string
  /** Whether the select is disabled */
  disabled?: boolean
  /** Whether multi-select mode is enabled */
  multiple?: boolean
  /** Select name */
  name?: string
  /** Additional CSS classes */
  className?: string
  /** Group label for grouped options */
  groupLabel?: string
}

/**
 * Select component that wraps shadcn/ui Select with custom styling
 * for the Pink Pin Merchant App theme.
 * 
 * Features:
 * - Single and multi-select modes
 * - Keyboard navigation (arrow keys, enter, escape)
 * - Error state styling
 * - Gray background and border styling preserved
 * - Support for filter options (status, service type, outlet, date ranges)
 * - Responsive design (full width on mobile)
 */
export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  function Select(
    {
      options,
      value,
      onChange,
      placeholder = 'Select an option',
      label,
      error,
      disabled = false,
      multiple = false,
      name,
      className,
      groupLabel,
    },
    ref
  ) {
    const selectId = name || React.useId()
    const errorId = `${selectId}-error`

    // Convert value to array for multi-select handling
    const values = React.useMemo(() => {
      if (multiple && Array.isArray(value)) {
        return value
      }
      if (!multiple && typeof value === 'string') {
        return [value]
      }
      return []
    }, [value, multiple])

    // Get selected labels for display
    const selectedLabels = React.useMemo(() => {
      return options
        .filter((opt) => values.includes(opt.value))
        .map((opt) => opt.label)
    }, [options, values])

    const handleChange = (newValue: string | string[] | null) => {
      if (newValue === null) return
      if (multiple && Array.isArray(newValue)) {
        onChange?.(newValue)
      } else if (!multiple && typeof newValue === 'string') {
        onChange?.(newValue)
      }
    }

    // Custom styling classes
    const triggerClass = React.useMemo(() => {
      const baseClass = 'w-full justify-start'
      const errorClass = error ? 'border-red-500 focus-visible:ring-red-500' : ''
      const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''
      return cn(baseClass, errorClass, disabledClass, className)
    }, [error, disabled, className])

    return (
      <div className="w-full">
        {label && (
          <Label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </Label>
        )}
        <ShadcnSelect
          value={multiple ? values[0] || '' : value as string}
          onValueChange={handleChange}
          multiple={multiple}
          disabled={disabled}
        >
          <SelectTrigger
            ref={ref}
            id={selectId}
            className={triggerClass}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
          >
            <SelectValue placeholder={placeholder}>
              {selectedLabels.length > 0 ? (
                multiple ? (
                  <span className="flex flex-wrap gap-1">
                    {selectedLabels.map((label, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 bg-[#ED0577]/10 text-[#ED0577] rounded text-xs"
                      >
                        {label}
                      </span>
                    ))}
                  </span>
                ) : (
                  selectedLabels[0]
                )
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {groupLabel && (
              <SelectGroup>
                <SelectLabel>{groupLabel}</SelectLabel>
              </SelectGroup>
            )}
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </ShadcnSelect>
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

/**
 * Status Select - Pre-configured select for order status filtering
 */
export interface StatusSelectProps {
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  placeholder?: string
  disabled?: boolean
  multiple?: boolean
  className?: string
}

const STATUS_OPTIONS: SelectOption[] = [
  { value: 'submitted', label: 'Shipment Created' },
  { value: 'waiting', label: 'Waiting for Pickup' },
  { value: 'closed', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
]

export const StatusSelect: React.FC<StatusSelectProps> = function StatusSelect({
  value,
  onChange,
  placeholder = 'Filter by status',
  disabled = false,
  multiple = true,
  className,
}) {
  return (
    <Select
      options={STATUS_OPTIONS}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      multiple={multiple}
      className={className}
      groupLabel="Order Status"
    />
  )
}

/**
 * Service Type Select - Pre-configured select for service type filtering
 */
export interface ServiceTypeSelectProps {
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  placeholder?: string
  disabled?: boolean
  multiple?: boolean
  className?: string
}

const SERVICE_TYPE_OPTIONS: SelectOption[] = [
  { value: 'same_day', label: 'Same Day' },
  { value: 'next_day', label: 'Next Day' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'express', label: 'Express' },
]

export const ServiceTypeSelect: React.FC<ServiceTypeSelectProps> = function ServiceTypeSelect({
  value,
  onChange,
  placeholder = 'Filter by service type',
  disabled = false,
  multiple = true,
  className,
}) {
  return (
    <Select
      options={SERVICE_TYPE_OPTIONS}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      multiple={multiple}
      className={className}
      groupLabel="Service Type"
    />
  )
}

/**
 * Outlet Select - Pre-configured select for outlet filtering
 */
export interface OutletSelectProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  outlets?: Array<{ id: string; name: string }>
}

export const OutletSelect: React.FC<OutletSelectProps> = function OutletSelect({
  value,
  onChange,
  placeholder = 'Select outlet',
  disabled = false,
  className,
  outlets = [],
}) {
  const outletOptions: SelectOption[] = outlets.map((outlet) => ({
    value: outlet.id,
    label: outlet.name,
  }))

  return (
    <Select
      options={outletOptions}
      value={value}
      onChange={(v) => onChange?.(v as string)}
      placeholder={placeholder}
      disabled={disabled}
      multiple={false}
      className={className}
      groupLabel="Outlet"
    />
  )
}

export default Select