/**
 * FilterBar - Filter controls for order history
 * Includes: date range, status, outlet, service type, invoice number
 * Responsive design: collapsible on mobile, expanded on desktop
 * Keyboard accessible with visible focus indicators
 * Performance optimized with debouncing and memoization
 */

'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { useFilters } from '@/src/hooks/useUIStore'
import { useOutlets } from '@/src/hooks/useOutlets'
import { useDebounce } from '@/src/hooks/useDebounce'
import { OrderStatus, ServiceType } from '@/src/types'

interface FilterBarProps {
  onFilterChange?: () => void
}

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: 'submitted', label: 'Shipment Created' },
  { value: 'waiting', label: 'Waiting for Pick Up' },
  { value: 'closed', label: 'Delivery Completed' },
  { value: 'cancelled', label: 'Shipment Cancelled' },
]

const serviceTypeOptions: { value: ServiceType; label: string }[] = [
  { value: 'standard', label: 'Standard' },
  { value: 'express', label: 'Express' },
  { value: 'same-day', label: 'Same-Day' },
]

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const { filters, setDateRange, setStatuses, setOutletId, setServiceTypes, setInvoiceNumber, resetFilters } = useFilters()
  const { data: outlets = [] } = useOutlets()

  const [isExpanded, setIsExpanded] = useState(false)
  const [invoiceInputValue, setInvoiceInputValue] = useState(filters.invoiceNumber)

  // Debounce invoice number input (300ms delay)
  const debouncedInvoiceNumber = useDebounce(invoiceInputValue, 300)

  // Update store when debounced value changes
  useEffect(() => {
    if (debouncedInvoiceNumber !== filters.invoiceNumber) {
      setInvoiceNumber(debouncedInvoiceNumber)
    }
  }, [debouncedInvoiceNumber, filters.invoiceNumber, setInvoiceNumber])

  const handleFilterUpdate = useCallback(() => {
    onFilterChange?.()
  }, [onFilterChange])

  const handleReset = useCallback(() => {
    setInvoiceInputValue('')
    resetFilters()
    handleFilterUpdate()
  }, [resetFilters, handleFilterUpdate])

  const handleToggleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsExpanded((prev) => !prev)
    }
  }, [])

  const handleStatusKeyDown = useCallback(
    (e: React.KeyboardEvent, statusValue: OrderStatus) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        const newStatuses = filters.statuses.includes(statusValue)
          ? filters.statuses.filter((s) => s !== statusValue)
          : [...filters.statuses, statusValue]
        setStatuses(newStatuses)
        handleFilterUpdate()
      }
      // Arrow key navigation
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        const currentIndex = statusOptions.findIndex((s) => s.value === statusValue)
        const nextIndex = (currentIndex + 1) % statusOptions.length
        const nextOption = document.querySelector(`[data-status-option="${statusOptions[nextIndex].value}"]`) as HTMLElement
        nextOption?.focus()
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        const currentIndex = statusOptions.findIndex((s) => s.value === statusValue)
        const prevIndex = (currentIndex - 1 + statusOptions.length) % statusOptions.length
        const prevOption = document.querySelector(`[data-status-option="${statusOptions[prevIndex].value}"]`) as HTMLElement
        prevOption?.focus()
      }
    },
    [filters.statuses, setStatuses, handleFilterUpdate]
  )

  const handleServiceTypeKeyDown = useCallback(
    (e: React.KeyboardEvent, serviceValue: ServiceType) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        const newTypes = filters.serviceTypes.includes(serviceValue)
          ? filters.serviceTypes.filter((t) => t !== serviceValue)
          : [...filters.serviceTypes, serviceValue]
        setServiceTypes(newTypes)
        handleFilterUpdate()
      }
      // Arrow key navigation
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        const currentIndex = serviceTypeOptions.findIndex((s) => s.value === serviceValue)
        const nextIndex = (currentIndex + 1) % serviceTypeOptions.length
        const nextOption = document.querySelector(`[data-service-option="${serviceTypeOptions[nextIndex].value}"]`) as HTMLElement
        nextOption?.focus()
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        const currentIndex = serviceTypeOptions.findIndex((s) => s.value === serviceValue)
        const prevIndex = (currentIndex - 1 + serviceTypeOptions.length) % serviceTypeOptions.length
        const prevOption = document.querySelector(`[data-service-option="${serviceTypeOptions[prevIndex].value}"]`) as HTMLElement
        prevOption?.focus()
      }
    },
    [filters.serviceTypes, setServiceTypes, handleFilterUpdate]
  )

  // Memoize hasActiveFilters to prevent unnecessary re-renders
  const hasActiveFilters = useMemo(
    () =>
      filters.dateRange.from !== null ||
      filters.dateRange.to !== null ||
      filters.statuses.length > 0 ||
      filters.outletId !== null ||
      filters.serviceTypes.length > 0 ||
      filters.invoiceNumber !== '',
    [filters.dateRange.from, filters.dateRange.to, filters.statuses.length, filters.outletId, filters.serviceTypes.length, filters.invoiceNumber]
  )

  // Memoize date formatting to avoid repeated Date object creation
  const dateFromValue = useMemo(() => {
    if (!filters.dateRange.from) return ''
    const d = new Date(filters.dateRange.from)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }, [filters.dateRange.from])

  const dateToValue = useMemo(() => {
    if (!filters.dateRange.to) return ''
    const d = new Date(filters.dateRange.to)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }, [filters.dateRange.to])

  // Memoized handlers
  const handleStatusClick = useCallback(
    (statusValue: OrderStatus) => {
      const newStatuses = filters.statuses.includes(statusValue)
        ? filters.statuses.filter((s) => s !== statusValue)
        : [...filters.statuses, statusValue]
      setStatuses(newStatuses)
      handleFilterUpdate()
    },
    [filters.statuses, setStatuses, handleFilterUpdate]
  )

  const handleServiceTypeClick = useCallback(
    (serviceValue: ServiceType) => {
      const newTypes = filters.serviceTypes.includes(serviceValue)
        ? filters.serviceTypes.filter((t) => t !== serviceValue)
        : [...filters.serviceTypes, serviceValue]
      setServiceTypes(newTypes)
      handleFilterUpdate()
    },
    [filters.serviceTypes, setServiceTypes, handleFilterUpdate]
  )

  const handleOutletChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setOutletId(e.target.value || null)
      handleFilterUpdate()
    },
    [setOutletId, handleFilterUpdate]
  )

  const handleDateFromChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDate = e.target.value ? new Date(e.target.value) : null
      setDateRange(newDate, filters.dateRange.to)
      handleFilterUpdate()
    },
    [filters.dateRange.to, setDateRange, handleFilterUpdate]
  )

  const handleDateToChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDate = e.target.value ? new Date(e.target.value) : null
      setDateRange(filters.dateRange.from, newDate)
      handleFilterUpdate()
    },
    [filters.dateRange.from, setDateRange, handleFilterUpdate]
  )

  const handleInvoiceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInvoiceInputValue(e.target.value)
    },
    []
  )

  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-4 sm:mb-6">
      {/* Toggle button for mobile */}
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        onKeyDown={handleToggleKeyDown}
        className="w-full md:hidden flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 text-left min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#ED0577] focus-visible:ring-inset"
        aria-expanded={isExpanded}
        aria-controls="filter-content"
      >
        <span className="font-medium text-gray-700 text-sm sm:text-base">
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
          {hasActiveFilters && <span className="ml-2 text-[#ED0577]">(Active)</span>}
        </span>
        <svg
          className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filter content */}
      <div
        id="filter-content"
        className={`${isExpanded || 'hidden md:block'} p-3 sm:p-4 space-y-3 sm:space-y-4`}
        role="region"
        aria-label="Filter options"
      >
        {/* Invoice number search */}
        <div>
          <label htmlFor="invoice-search" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Invoice Number
          </label>
          <input
            type="text"
            id="invoice-search"
            placeholder="Search invoice..."
            value={invoiceInputValue}
            onChange={handleInvoiceChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED0577] focus:border-transparent min-h-[44px] text-sm"
            aria-describedby="invoice-search-hint"
          />
          <p id="invoice-search-hint" className="sr-only">
            Enter invoice number to filter orders
          </p>
        </div>

        {/* Date range */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <div>
            <label htmlFor="date-from" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <input
              type="date"
              id="date-from"
              value={dateFromValue}
              onChange={handleDateFromChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED0577] focus:border-transparent min-h-[44px] text-sm"
            />
          </div>
          <div>
            <label htmlFor="date-to" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <input
              type="date"
              id="date-to"
              value={dateToValue}
              onChange={handleDateToChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED0577] focus:border-transparent min-h-[44px] text-sm"
            />
          </div>
        </div>

        {/* Status filter */}
        <div>
          <fieldset>
            <legend className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Status
            </legend>
            <div className="flex flex-wrap gap-1.5 sm:gap-2" role="group" aria-label="Status filter options">
              {statusOptions.map((status) => (
                <button
                  key={status.value}
                  data-status-option={status.value}
                  onClick={() => handleStatusClick(status.value)}
                  onKeyDown={(e) => handleStatusKeyDown(e, status.value)}
                  className={`px-2.5 sm:px-3 py-2 text-xs sm:text-sm rounded-full transition-colors min-h-[44px] ${
                    filters.statuses.includes(status.value)
                      ? 'bg-[#ED0577] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-pressed={filters.statuses.includes(status.value)}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Service type filter */}
        <div>
          <fieldset>
            <legend className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Service Type
            </legend>
            <div className="flex flex-wrap gap-1.5 sm:gap-2" role="group" aria-label="Service type filter options">
              {serviceTypeOptions.map((service) => (
                <button
                  key={service.value}
                  data-service-option={service.value}
                  onClick={() => handleServiceTypeClick(service.value)}
                  onKeyDown={(e) => handleServiceTypeKeyDown(e, service.value)}
                  className={`px-2.5 sm:px-3 py-2 text-xs sm:text-sm rounded-full transition-colors min-h-[44px] ${
                    filters.serviceTypes.includes(service.value)
                      ? 'bg-[#ED0577] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-pressed={filters.serviceTypes.includes(service.value)}
                >
                  {service.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Outlet filter */}
        <div>
          <label htmlFor="outlet-filter" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Outlet
          </label>
          <select
            id="outlet-filter"
            value={filters.outletId || ''}
            onChange={handleOutletChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED0577] focus:border-transparent min-h-[44px] text-sm"
          >
            <option value="">All Outlets</option>
            {outlets.map((outlet) => (
              <option key={outlet.id} value={outlet.id}>
                {outlet.name}
              </option>
            ))}
          </select>
        </div>

        {/* Reset button */}
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-[#ED0577] transition-colors min-h-[44px] flex items-center"
            aria-label="Clear all filters"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}

export default FilterBar