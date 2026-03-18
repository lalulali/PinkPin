/**
 * Unit tests for Input wrapper component
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

describe('Input Component', () => {
  describe('Rendering', () => {
    it('renders input with correct type', () => {
      render(<Input type="text" />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('renders number input', () => {
      render(<Input type="number" />)
      expect(screen.getByRole('spinbutton')).toBeInTheDocument()
    })

    it('renders email input', () => {
      render(<Input type="email" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('type', 'email')
    })

    it('renders date input', () => {
      render(<Input type="date" />)
      expect(screen.getByDisplayValue('')).toBeInTheDocument()
    })

    it('renders label when provided', () => {
      render(<Input label="Email Address" />)
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    })

    it('renders placeholder', () => {
      render(<Input placeholder="Enter your email" />)
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
    })
  })

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Input disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('renders readonly state', () => {
      render(<Input readonly value="Read only text" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
    })

    it('renders required state', () => {
      render(<Input label="Name" required />)
      expect(screen.getByLabelText('Name')).toBeRequired()
    })
  })

  describe('Error State', () => {
    it('renders error message', () => {
      render(<Input error="This field is required" />)
      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })

    it('associates error with aria-invalid', () => {
      render(<Input error="Error message" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    })
  })

  describe('Interactions', () => {
    it('calls onChange when value changes', () => {
      const handleChange = vi.fn()
      render(<Input onChange={handleChange} />)
      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'test' } })
      expect(handleChange).toHaveBeenCalled()
    })

    it('calls onBlur when input loses focus', () => {
      const handleBlur = vi.fn()
      render(<Input onBlur={handleBlur} />)
      const input = screen.getByRole('textbox')
      fireEvent.blur(input)
      expect(handleBlur).toHaveBeenCalled()
    })
  })
})