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
        className={`${isExpanded || 'hidden md:block'} p-4`}
        role="region"
        aria-label="Filter options"
      >
        {/* Compact filter row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Invoice number */}
          <div className="min-w-0">
            <label htmlFor="invoice-search" className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
              Invoice
            </label>
            <input
              type="text"
              id="invoice-search"
              placeholder="Search invoice..."
              value={invoiceInputValue}
              onChange={handleInvoiceChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ED0577] focus:border-transparent focus:bg-white transition-all"
              aria-describedby="invoice-search-hint"
            />
          </div>

          {/* Date from */}
          <div className="min-w-0">
            <label htmlFor="date-from" className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
              From
            </label>
            <input
              type="date"
              id="date-from"
              value={dateFromValue}
              onChange={handleDateFromChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ED0577] focus:border-transparent focus:bg-white transition-all"
            />
          </div>

          {/* Date to */}
          <div className="min-w-0">
            <label htmlFor="date-to" className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
              To
            </label>
            <input
              type="date"
              id="date-to"
              value={dateToValue}
              onChange={handleDateToChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ED0577] focus:border-transparent focus:bg-white transition-all"
            />
          </div>

          {/* Status */}
          <div className="min-w-0">
            <label htmlFor="status-filter" className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
              Status
            </label>
            <select
              id="status-filter"
              value={filters.statuses[0] || ''}
              onChange={(e) => {
                const value = e.target.value as OrderStatus
                setStatuses(value ? [value] : [])
                handleFilterUpdate()
              }}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ED0577] focus:border-transparent focus:bg-white transition-all cursor-pointer"
            >
              <option value="">All Status</option>
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Service type */}
          <div className="min-w-0">
            <label htmlFor="service-filter" className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
              Service
            </label>
            <select
              id="service-filter"
              value={filters.serviceTypes[0] || ''}
              onChange={(e) => {
                const value = e.target.value as ServiceType
                setServiceTypes(value ? [value] : [])
                handleFilterUpdate()
              }}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ED0577] focus:border-transparent focus:bg-white transition-all cursor-pointer"
            >
              <option value="">All Services</option>
              {serviceTypeOptions.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>

          {/* Outlet */}
          <div className="min-w-0">
            <label htmlFor="outlet-filter" className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
              Outlet
            </label>
            <select
              id="outlet-filter"
              value={filters.outletId || ''}
              onChange={handleOutletChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ED0577] focus:border-transparent focus:bg-white transition-all cursor-pointer"
            >
              <option value="">All Outlets</option>
              {outlets.map((outlet) => (
                <option key={outlet.id} value={outlet.id}>
                  {outlet.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reset button */}
        {hasActiveFilters && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-[#ED0577] transition-colors"
              aria-label="Clear all filters"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterBar