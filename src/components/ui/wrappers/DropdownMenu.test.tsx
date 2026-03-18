/**
 * Unit tests for DropdownMenu wrapper component
 * Requirements: 11.1, 11.2, 11.3, 11.4
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DropdownMenu, UserMenu, ActionMenu } from './DropdownMenu'

describe('DropdownMenu Component', () => {
  const mockTrigger = <button data-testid="menu-trigger">Open Menu</button>
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
  }

  describe('Rendering', () => {
    it('renders trigger element', () => {
      render(
        <DropdownMenu
          trigger={mockTrigger}
          user={mockUser}
          onLogout={() => {}}
        />
      )
      expect(screen.getByTestId('menu-trigger')).toBeInTheDocument()
    })
  })
})

describe('UserMenu Component', () => {
  const mockUser = {
    name: 'Jane Doe',
    email: 'jane@example.com',
  }

  describe('Rendering', () => {
    it('renders user avatar with initial', () => {
      render(
        <UserMenu
          user={mockUser}
          onLogout={() => {}}
        />
      )
      
      expect(screen.getByText('J')).toBeInTheDocument()
    })

    it('has accessible label', () => {
      render(
        <UserMenu
          user={mockUser}
          onLogout={() => {}}
        />
      )
      
      expect(screen.getByLabelText('User menu')).toBeInTheDocument()
    })
  })
})

describe('ActionMenu Component', () => {
  const mockTrigger = <button data-testid="actions-trigger">Actions</button>
  const mockActions = [
    { label: 'Edit', onClick: vi.fn() },
    { label: 'Delete', onClick: vi.fn(), destructive: true },
  ]

  describe('Rendering', () => {
    it('renders trigger', () => {
      render(
        <ActionMenu
          trigger={mockTrigger}
          actions={mockActions}
        />
      )
      expect(screen.getByTestId('actions-trigger')).toBeInTheDocument()
    })
  })
})