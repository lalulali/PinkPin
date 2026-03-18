/**
 * DropdownMenu Wrapper Component
 * 
 * Wrapper for shadcn/ui DropdownMenu component that maintains backward compatibility
 * with the existing component API while leveraging shadcn/ui's accessibility
 * and styling capabilities.
 * 
 * Requirements: 11.1, 11.2, 11.3, 11.4
 */

'use client'

import * as React from 'react'
import {
  DropdownMenu as ShadcnDropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from '@/src/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { LogOut, User, Settings, HelpCircle } from 'lucide-react'

export interface DropdownMenuProps {
  /** Trigger element */
  trigger: React.ReactNode
  /** User information to display */
  user?: {
    name: string
    email: string
  }
  /** Logout handler */
  onLogout?: () => void
  /** Additional CSS classes */
  className?: string
  /** Menu items configuration */
  items?: Array<{
    label: string
    icon?: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    destructive?: boolean
  }>
}

/**
 * Default menu items when not provided
 */
const DEFAULT_MENU_ITEMS: DropdownMenuProps['items'] = [
  { label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  { label: 'Help', icon: <HelpCircle className="w-4 h-4" /> },
]

/**
 * DropdownMenu component that wraps shadcn/ui DropdownMenu with custom styling
 * for the Pink Pin Merchant App theme.
 * 
 * Features:
 * - Trigger rendering
 * - User info display (name, email)
 * - Logout option
 * - Click-outside-to-close behavior
 * - Keyboard navigation (arrow keys, escape to close)
 */
export const DropdownMenu: React.FC<DropdownMenuProps> = function DropdownMenu({
  trigger,
  user,
  onLogout,
  className,
  items = DEFAULT_MENU_ITEMS,
}) {
  const [open, setOpen] = React.useState(false)

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
  }

  const handleLogout = () => {
    setOpen(false)
    onLogout?.()
  }

  const handleItemClick = (onClick?: () => void) => {
    setOpen(false)
    onClick?.()
  }

  return (
    <ShadcnDropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger className={className}>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-56"
      >
        {/* User info section */}
        {user && (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        {/* Custom menu items */}
        <DropdownMenuGroup>
          {items.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => handleItemClick(item.onClick)}
              disabled={item.disabled}
              className={cn(
                item.destructive && 'text-red-600 focus:text-red-600'
              )}
            >
              {item.icon && (
                <span className="mr-2">{item.icon}</span>
              )}
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        {/* Logout option */}
        {onLogout && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </ShadcnDropdownMenu>
  )
}

/**
 * User Menu Dropdown - Pre-configured dropdown for user navigation
 */
export interface UserMenuProps {
  user: {
    name: string
    email: string
    avatar?: string
  }
  onLogout: () => void
  onProfile?: () => void
  onSettings?: () => void
  className?: string
}

export const UserMenu: React.FC<UserMenuProps> = function UserMenu({
  user,
  onLogout,
  onProfile,
  onSettings,
  className,
}) {
  const trigger = (
    <button
      className={cn(
        'flex items-center gap-2 rounded-full bg-gray-100 p-1',
        'hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ED0577]',
        'transition-colors'
      )}
      aria-label="User menu"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ED0577] text-white text-sm font-medium">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          user.name.charAt(0).toUpperCase()
        )}
      </div>
    </button>
  )

  const menuItems = [
    ...(onProfile
      ? [
          {
            label: 'Profile',
            icon: <User className="w-4 h-4" />,
            onClick: onProfile,
          },
        ]
      : []),
    ...(onSettings
      ? [
          {
            label: 'Settings',
            icon: <Settings className="w-4 h-4" />,
            onClick: onSettings,
          },
        ]
      : []),
  ]

  return (
    <DropdownMenu
      trigger={trigger}
      user={user}
      onLogout={onLogout}
      items={menuItems}
      className={className}
    />
  )
}

/**
 * Action Menu Dropdown - For row actions in tables/lists
 */
export interface ActionMenuProps {
  trigger: React.ReactNode
  actions: Array<{
    label: string
    onClick: () => void
    disabled?: boolean
    destructive?: boolean
  }>
  className?: string
}

export const ActionMenu: React.FC<ActionMenuProps> = function ActionMenu({
  trigger,
  actions,
  className,
}) {
  const menuItems = actions.map((action) => ({
    label: action.label,
    onClick: action.onClick,
    disabled: action.disabled,
    destructive: action.destructive,
  }))

  return (
    <DropdownMenu
      trigger={trigger}
      items={menuItems}
      className={className}
    />
  )
}

export default DropdownMenu