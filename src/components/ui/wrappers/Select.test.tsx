/**
 * Unit tests for Select wrapper component
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Select, StatusSelect, ServiceTypeSelect, OutletSelect } from './Select'

describe('Select Component', () => {
  const mockOptions = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
    { value: 'opt3', label: 'Option 3' },
  ]

  describe('Rendering', () => {
    it('renders select trigger', () => {
      render(
        <Select
          options={mockOptions}
          onChange={() => {}}
          placeholder="Select an option"
        />
      )
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('renders label when provided', () => {
      render(
        <Select
          options={mockOptions}
          label="Test Label"
          onChange={() => {}}
        />
      )
      expect(screen.getByText('Test Label')).toBeInTheDocument()
    })

    it('renders disabled state', () => {
      render(
        <Select
          options={mockOptions}
          disabled={true}
          onChange={() => {}}
        />
      )
      expect(screen.getByRole('combobox')).toBeDisabled()
    })
  })

  describe('Single Select', () => {
    it('selects value when clicked', () => {
      const handleChange = vi.fn()
      render(
        <Select
          options={mockOptions}
          onChange={handleChange}
        />
      )
      
      const trigger = screen.getByRole('combobox')
      fireEvent.click(trigger)
      
      // Click first option
      const option = screen.getByText('Option 1')
      fireEvent.click(option)
      
      expect(handleChange).toHaveBeenCalledWith('opt1')
    })
  })

  describe('Error State', () => {
    it('renders error message', () => {
      render(
        <Select
          options={mockOptions}
          error="This field is required"
          onChange={() => {}}
        />
      )
      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })

    it('has aria-invalid attribute when error is present', () => {
      render(
        <Select
          options={mockOptions}
          error="Error message"
          onChange={() => {}}
        />
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
    })
  })
})

describe('StatusSelect Component', () => {
  it('renders with default options', () => {
    render(<StatusSelect onChange={() => {}} />)
    
    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)
    
    expect(screen.getByText('Shipment Created')).toBeInTheDocument()
    expect(screen.getByText('Waiting for Pickup')).toBeInTheDocument()
    expect(screen.getByText('Delivered')).toBeInTheDocument()
    expect(screen.getByText('Cancelled')).toBeInTheDocument()
  })
})

describe('ServiceTypeSelect Component', () => {
  it('renders with default options', () => {
    render(<ServiceTypeSelect onChange={() => {}} />)
    
    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)
    
    expect(screen.getByText('Same Day')).toBeInTheDocument()
    expect(screen.getByText('Next Day')).toBeInTheDocument()
    expect(screen.getByText('Scheduled')).toBeInTheDocument()
    expect(screen.getByText('Express')).toBeInTheDocument()
  })
})

describe('OutletSelect Component', () => {
  it('renders with provided outlets', () => {
    const outlets = [
      { id: 'outlet1', name: 'Main Store' },
      { id: 'outlet2', name: 'Branch Office' },
    ]
    render(<OutletSelect outlets={outlets} onChange={() => {}} />)
    
    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)
    
    expect(screen.getByText('Main Store')).toBeInTheDocument()
    expect(screen.getByText('Branch Office')).toBeInTheDocument()
  })
})