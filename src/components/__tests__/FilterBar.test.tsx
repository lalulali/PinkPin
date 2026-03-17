/**
 * Tests for FilterBar component
 * Tests: filter toggles (status, service type), date range inputs,
 * outlet dropdown, invoice search, reset button, keyboard navigation
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { FilterBar } from '@/src/components/FilterBar'
import { useFilters } from '@/src/hooks/useUIStore'
import { useOutlets } from '@/src/hooks/useOutlets'
import { useDebounce } from '@/src/hooks/useDebounce'
import { OrderStatus, ServiceType } from '@/src/types'

// Mock dependencies
vi.mock('@/src/hooks/useUIStore', () => ({
  useFilters: vi.fn(),
}))

vi.mock('@/src/hooks/useOutlets', () => ({
  useOutlets: vi.fn(),
}))

vi.mock('@/src/hooks/useDebounce', () => ({
  useDebounce: vi.fn((value) => value),
}))

const mockSetDateRange = vi.fn()
const mockSetStatuses = vi.fn()
const mockSetOutletId = vi.fn()
const mockSetServiceTypes = vi.fn()
const mockSetInvoiceNumber = vi.fn()
const mockResetFilters = vi.fn()

describe('FilterBar', () => {
  const mockFilters = {
    dateRange: { from: null, to: null },
    statuses: [] as OrderStatus[],
    outletId: null as string | null,
    serviceTypes: [] as ServiceType[],
    invoiceNumber: '',
  }

  const mockOutlets = [
    { id: 'outlet-1', name: 'Main Outlet', merchantId: 'merchant-1', address: '123 Main St', coordinates: { lat: 0, lng: 0 }, createdAt: new Date() },
    { id: 'outlet-2', name: 'Branch Outlet', merchantId: 'merchant-1', address: '456 Side St', coordinates: { lat: 0, lng: 0 }, createdAt: new Date() },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useFilters as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      filters: mockFilters,
      setDateRange: mockSetDateRange,
      setStatuses: mockSetStatuses,
      setOutletId: mockSetOutletId,
      setServiceTypes: mockSetServiceTypes,
      setInvoiceNumber: mockSetInvoiceNumber,
      resetFilters: mockResetFilters,
    })
    ;(useOutlets as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ data: mockOutlets })
    ;(useDebounce as unknown as ReturnType<typeof vi.fn>).mockImplementation((value) => value)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render filter toggle button', () => {
      render(<FilterBar />)

      expect(screen.getByRole('button', { name: 'Show Filters' })).toBeTruthy()
    })

    it('should render invoice search input', () => {
      render(<FilterBar />)

      expect(screen.getByLabelText('Invoice Number')).toBeTruthy()
      expect(screen.getByPlaceholderText('Search invoice...')).toBeTruthy()
    })

    it('should render date range inputs', () => {
      render(<FilterBar />)

      expect(screen.getByLabelText('From')).toBeTruthy()
      expect(screen.getByLabelText('To')).toBeTruthy()
    })

    it('should render status filter buttons', () => {
      render(<FilterBar />)

      expect(screen.getByRole('button', { name: 'Shipment Created' })).toBeTruthy()
      expect(screen.getByRole('button', { name: 'Waiting for Pick Up' })).toBeTruthy()
      expect(screen.getByRole('button', { name: 'Delivery Completed' })).toBeTruthy()
      expect(screen.getByRole('button', { name: 'Shipment Cancelled' })).toBeTruthy()
    })

    it('should render service type filter buttons', () => {
      render(<FilterBar />)

      expect(screen.getByRole('button', { name: 'Standard' })).toBeTruthy()
      expect(screen.getByRole('button', { name: 'Express' })).toBeTruthy()
      expect(screen.getByRole('button', { name: 'Same-Day' })).toBeTruthy()
    })

    it('should render outlet dropdown', () => {
      render(<FilterBar />)

      expect(screen.getByLabelText('Outlet')).toBeTruthy()
      expect(screen.getByText('All Outlets')).toBeTruthy()
      expect(screen.getByText('Main Outlet')).toBeTruthy()
      expect(screen.getByText('Branch Outlet')).toBeTruthy()
    })

    it('should show active filters indicator when filters are active', () => {
      ;(useFilters as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        filters: { ...mockFilters, statuses: ['submitted'] },
        setDateRange: mockSetDateRange,
        setStatuses: mockSetStatuses,
        setOutletId: mockSetOutletId,
        setServiceTypes: mockSetServiceTypes,
        setInvoiceNumber: mockSetInvoiceNumber,
        resetFilters: mockResetFilters,
      })

      render(<FilterBar />)

      expect(screen.getByText('(Active)')).toBeTruthy()
    })
  })

  describe('Invoice Search', () => {
    it('should update invoice input value', () => {
      render(<FilterBar />)

      const invoiceInput = screen.getByLabelText('Invoice Number')
      fireEvent.change(invoiceInput, { target: { value: 'ORD-123' } })

      expect((invoiceInput as HTMLInputElement).value).toBe('ORD-123')
    })

    it('should call setInvoiceNumber on change', () => {
      render(<FilterBar />)

      const invoiceInput = screen.getByLabelText('Invoice Number')
      fireEvent.change(invoiceInput, { target: { value: 'ORD-123' } })

      expect(mockSetInvoiceNumber).toHaveBeenCalledWith('ORD-123')
    })
  })

  describe('Date Range', () => {
    it('should update date from value', () => {
      render(<FilterBar />)

      const dateFromInput = screen.getByLabelText('From')
      fireEvent.change(dateFromInput, { target: { value: '2024-01-15' } })

      expect(mockSetDateRange).toHaveBeenCalled()
    })

    it('should update date to value', () => {
      render(<FilterBar />)

      const dateToInput = screen.getByLabelText('To')
      fireEvent.change(dateToInput, { target: { value: '2024-01-20' } })

      expect(mockSetDateRange).toHaveBeenCalled()
    })
  })

  describe('Status Filter', () => {
    it('should toggle status filter when clicked', () => {
      render(<FilterBar />)

      const statusButton = screen.getByRole('button', { name: 'Shipment Created' })
      fireEvent.click(statusButton)

      expect(mockSetStatuses).toHaveBeenCalledWith(['submitted'])
    })

    it('should remove status filter when already selected', () => {
      ;(useFilters as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        filters: { ...mockFilters, statuses: ['submitted'] },
        setDateRange: mockSetDateRange,
        setStatuses: mockSetStatuses,
        setOutletId: mockSetOutletId,
        setServiceTypes: mockSetServiceTypes,
        setInvoiceNumber: mockSetInvoiceNumber,
        resetFilters: mockResetFilters,
      })

      render(<FilterBar />)

      const statusButton = screen.getByRole('button', { name: 'Shipment Created' })
      fireEvent.click(statusButton)

      expect(mockSetStatuses).toHaveBeenCalledWith([])
    })

    it('should show selected status with active styling', () => {
      ;(useFilters as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        filters: { ...mockFilters, statuses: ['submitted'] },
        setDateRange: mockSetDateRange,
        setStatuses: mockSetStatuses,
        setOutletId: mockSetOutletId,
        setServiceTypes: mockSetServiceTypes,
        setInvoiceNumber: mockSetInvoiceNumber,
        resetFilters: mockResetFilters,
      })

      render(<FilterBar />)

      const statusButton = screen.getByRole('button', { name: 'Shipment Created' })
      expect(statusButton.className).toContain('bg-[#ED0577]')
    })

    it('should have aria-pressed attribute', () => {
      ;(useFilters as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        filters: { ...mockFilters, statuses: ['submitted'] },
        setDateRange: mockSetDateRange,
        setStatuses: mockSetStatuses,
        setOutletId: mockSetOutletId,
        setServiceTypes: mockSetServiceTypes,
        setInvoiceNumber: mockSetInvoiceNumber,
        resetFilters: mockResetFilters,
      })

      render(<FilterBar />)

      const statusButton = screen.getByRole('button', { name: 'Shipment Created' })
      expect(statusButton).toHaveAttribute('aria-pressed', 'true')
    })
  })

  describe('Service Type Filter', () => {
    it('should toggle service type filter when clicked', () => {
      render(<FilterBar />)

      const serviceButton = screen.getByRole('button', { name: 'Standard' })
      fireEvent.click(serviceButton)

      expect(mockSetServiceTypes).toHaveBeenCalledWith(['standard'])
    })

    it('should remove service type filter when already selected', () => {
      ;(useFilters as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        filters: { ...mockFilters, serviceTypes: ['standard'] },
        setDateRange: mockSetDateRange,
        setStatuses: mockSetStatuses,
        setOutletId: mockSetOutletId,
        setServiceTypes: mockSetServiceTypes,
        setInvoiceNumber: mockSetInvoiceNumber,
        resetFilters: mockResetFilters,
      })

      render(<FilterBar />)

      const serviceButton = screen.getByRole('button', { name: 'Standard' })
      fireEvent.click(serviceButton)

      expect(mockSetServiceTypes).toHaveBeenCalledWith([])
    })

    it('should show selected service type with active styling', () => {
      ;(useFilters as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        filters: { ...mockFilters, serviceTypes: ['express'] },
        setDateRange: mockSetDateRange,
        setStatuses: mockSetStatuses,
        setOutletId: mockSetOutletId,
        setServiceTypes: mockSetServiceTypes,
        setInvoiceNumber: mockSetInvoiceNumber,
        resetFilters: mockResetFilters,
      })

      render(<FilterBar />)

      const serviceButton = screen.getByRole('button', { name: 'Express' })
      expect(serviceButton.className).toContain('bg-[#ED0577]')
    })
  })

  describe('Outlet Filter', () => {
    it('should update outlet selection', () => {
      render(<FilterBar />)

      const outletSelect = screen.getByLabelText('Outlet')
      fireEvent.change(outletSelect, { target: { value: 'outlet-1' } })

      expect(mockSetOutletId).toHaveBeenCalledWith('outlet-1')
    })

    it('should clear outlet when All Outlets is selected', () => {
      ;(useFilters as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        filters: { ...mockFilters, outletId: 'outlet-1' },
        setDateRange: mockSetDateRange,
        setStatuses: mockSetStatuses,
        setOutletId: mockSetOutletId,
        setServiceTypes: mockSetServiceTypes,
        setInvoiceNumber: mockSetInvoiceNumber,
        resetFilters: mockResetFilters,
      })

      render(<FilterBar />)

      const outletSelect = screen.getByLabelText('Outlet')
      fireEvent.change(outletSelect, { target: { value: '' } })

      expect(mockSetOutletId).toHaveBeenCalledWith(null)
    })
  })

  describe('Reset Button', () => {
    it('should show reset button when filters are active', () => {
      ;(useFilters as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        filters: { ...mockFilters, statuses: ['submitted'] },
        setDateRange: mockSetDateRange,
        setStatuses: mockSetStatuses,
        setOutletId: mockSetOutletId,
        setServiceTypes: mockSetServiceTypes,
        setInvoiceNumber: mockSetInvoiceNumber,
        resetFilters: mockResetFilters,
      })

      render(<FilterBar />)

      // Expand the filter bar first (it's hidden on mobile by default)
      const toggleButton = screen.getByRole('button', { name: /Show Filters/ })
      fireEvent.click(toggleButton)

      expect(screen.getByRole('button', { name: 'Clear all filters' })).toBeTruthy()
    })

    it('should not show reset button when no filters are active', () => {
      render(<FilterBar />)

      expect(screen.queryByRole('button', { name: 'Clear all filters' })).toBeNull()
    })

    it('should call resetFilters when clicked', () => {
      ;(useFilters as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        filters: { ...mockFilters, statuses: ['submitted'] },
        setDateRange: mockSetDateRange,
        setStatuses: mockSetStatuses,
        setOutletId: mockSetOutletId,
        setServiceTypes: mockSetServiceTypes,
        setInvoiceNumber: mockSetInvoiceNumber,
        resetFilters: mockResetFilters,
      })

      render(<FilterBar />)

      // Expand the filter bar first
      const toggleButton = screen.getByRole('button', { name: /Show Filters/ })
      fireEvent.click(toggleButton)

      const resetButton = screen.getByRole('button', { name: 'Clear all filters' })
      fireEvent.click(resetButton)

      expect(mockResetFilters).toHaveBeenCalled()
    })
  })

  describe('Mobile Toggle', () => {
    it('should toggle filter visibility on mobile', () => {
      render(<FilterBar />)

      const toggleButton = screen.getByRole('button', { name: 'Show Filters' })
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false')

      fireEvent.click(toggleButton)

      expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByRole('button', { name: 'Hide Filters' })).toBeTruthy()
    })

    it('should show filter content when expanded on mobile', () => {
      render(<FilterBar />)

      const toggleButton = screen.getByRole('button', { name: 'Show Filters' })
      fireEvent.click(toggleButton)

      // Invoice input should be visible
      expect(screen.getByLabelText('Invoice Number')).toBeTruthy()
    })
  })

  describe('Keyboard Navigation', () => {
    it('should toggle filter bar with Enter key', () => {
      render(<FilterBar />)

      const toggleButton = screen.getByRole('button', { name: 'Show Filters' })
      fireEvent.keyDown(toggleButton, { key: 'Enter' })

      expect(screen.getByRole('button', { name: 'Hide Filters' })).toBeTruthy()
    })

    it('should toggle filter bar with Space key', () => {
      render(<FilterBar />)

      const toggleButton = screen.getByRole('button', { name: 'Show Filters' })
      fireEvent.keyDown(toggleButton, { key: ' ' })

      expect(screen.getByRole('button', { name: 'Hide Filters' })).toBeTruthy()
    })

    it('should navigate status options with arrow keys', () => {
      render(<FilterBar />)

      const toggleButton = screen.getByRole('button', { name: 'Show Filters' })
      fireEvent.click(toggleButton)

      const submittedButton = screen.getByRole('button', { name: 'Shipment Created' })
      fireEvent.keyDown(submittedButton, { key: 'ArrowRight' })

      // Should not throw error - just testing keyboard navigation doesn't crash
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<FilterBar />)

      const toggleButton = screen.getByRole('button', { name: 'Show Filters' })
      expect(toggleButton).toHaveAttribute('aria-expanded')
      expect(toggleButton).toHaveAttribute('aria-controls')
    })

    it('should have proper fieldset and legend for status filter', () => {
      render(<FilterBar />)

      const statusFieldset = screen.getByRole('group', { name: 'Status filter options' })
      expect(statusFieldset).toBeTruthy()
    })

    it('should have proper fieldset and legend for service type filter', () => {
      render(<FilterBar />)

      const serviceFieldset = screen.getByRole('group', { name: 'Service type filter options' })
      expect(serviceFieldset).toBeTruthy()
    })

    it('should have screen reader only description for invoice search', () => {
      render(<FilterBar />)

      const invoiceInput = screen.getByLabelText('Invoice Number')
      expect(invoiceInput).toHaveAttribute('aria-describedby')
    })
  })
})