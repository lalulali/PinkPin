/**
 * Unit tests for Checkbox wrapper component
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox, CheckboxGroup, TermsCheckbox } from './Checkbox'

describe('Checkbox Component', () => {
  describe('Rendering', () => {
    it('renders checkbox', () => {
      render(<Checkbox />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('renders unchecked by default', () => {
      render(<Checkbox />)
      expect(screen.getByRole('checkbox')).not.toBeChecked()
    })

    it('renders checked when checked prop is true', () => {
      render(<Checkbox checked={true} />)
      expect(screen.getByRole('checkbox')).toBeChecked()
    })
  })

  describe('Checked State Styling', () => {
    it('applies #ED0577 styling when checked', () => {
      const { container } = render(<Checkbox checked={true} />)
      const checkbox = container.querySelector('[data-slot="checkbox"]')
      expect(checkbox).toHaveClass('data-checked:bg-[#ED0577]')
    })

    it('does not apply checked styling when unchecked', () => {
      const { container } = render(<Checkbox checked={false} />)
      const checkbox = container.querySelector('[data-slot="checkbox"]')
      expect(checkbox).not.toHaveClass('data-checked:bg-[#ED0577]')
    })
  })

  describe('Interactions', () => {
    it('calls onChange when toggled with space key', () => {
      const handleChange = vi.fn()
      render(<Checkbox onChange={handleChange} />)
      
      const checkbox = screen.getByRole('checkbox')
      fireEvent.keyDown(checkbox, { key: ' ' })
      
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it('calls onChange with false when unchecked', () => {
      const handleChange = vi.fn()
      render(<Checkbox checked={true} onChange={handleChange} />)
      
      const checkbox = screen.getByRole('checkbox')
      fireEvent.keyDown(checkbox, { key: ' ' })
      
      expect(handleChange).toHaveBeenCalledWith(false)
    })

    it('does not call onChange when disabled', () => {
      const handleChange = vi.fn()
      render(<Checkbox disabled={true} onChange={handleChange} />)
      
      const checkbox = screen.getByRole('checkbox')
      fireEvent.keyDown(checkbox, { key: ' ' })
      
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Keyboard Accessibility', () => {
    it('toggles on space key', () => {
      const handleChange = vi.fn()
      render(<Checkbox onChange={handleChange} />)
      
      const checkbox = screen.getByRole('checkbox')
      fireEvent.keyDown(checkbox, { key: ' ' })
      
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it('toggles off on space key when checked', () => {
      const handleChange = vi.fn()
      render(<Checkbox checked={true} onChange={handleChange} />)
      
      const checkbox = screen.getByRole('checkbox')
      fireEvent.keyDown(checkbox, { key: ' ' })
      
      expect(handleChange).toHaveBeenCalledWith(false)
    })
  })

  describe('Required State', () => {
    it('shows required asterisk', () => {
      render(<Checkbox label="Terms" required={true} />)
      expect(screen.getByText('*')).toBeInTheDocument()
    })
  })
})

describe('CheckboxGroup Component', () => {
  const mockOptions = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
  ]

  describe('Rendering', () => {
    it('renders group label', () => {
      render(
        <CheckboxGroup
          options={mockOptions}
          values={[]}
          onChange={() => {}}
          label="Select Options"
        />
      )
      expect(screen.getByText('Select Options')).toBeInTheDocument()
    })

    it('renders correct number of checkboxes', () => {
      render(
        <CheckboxGroup
          options={mockOptions}
          values={[]}
          onChange={() => {}}
        />
      )
      expect(screen.getAllByRole('checkbox')).toHaveLength(2)
    })
  })

  describe('Interactions', () => {
    it('calls onChange when checkbox is toggled', () => {
      const handleChange = vi.fn()
      render(
        <CheckboxGroup
          options={mockOptions}
          values={[]}
          onChange={handleChange}
        />
      )
      
      const checkboxes = screen.getAllByRole('checkbox')
      fireEvent.keyDown(checkboxes[0], { key: ' ' })
      
      expect(handleChange).toHaveBeenCalled()
    })
  })
})

describe('TermsCheckbox Component', () => {
  it('renders checkbox', () => {
    render(<TermsCheckbox checked={false} onChange={() => {}} />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('applies checked state', () => {
    render(<TermsCheckbox checked={true} onChange={() => {}} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })
})