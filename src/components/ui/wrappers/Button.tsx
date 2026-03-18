/**
 * Button Wrapper Component
 * 
 * Wrapper for shadcn/ui Button component that maintains backward compatibility
 * with the existing component API while leveraging shadcn/ui's accessibility
 * and styling capabilities.
 * 
 * Requirements: 2.1, 2.2, 2.3
 */

'use client'

import * as React from 'react'
import { Button as ShadcnButton } from '@/src/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export interface ButtonProps {
  /** Button variant style */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  /** Button size */
  size?: 'sm' | 'default' | 'lg'
  /** Whether the button is disabled */
  disabled?: boolean
  /** Whether to show loading state */
  loading?: boolean
  /** Icon to display */
  icon?: React.ReactNode
  /** Icon position relative to text */
  iconPosition?: 'leading' | 'trailing'
  /** Button content */
  children: React.ReactNode
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Button type */
  type?: 'button' | 'submit' | 'reset'
  /** Additional CSS classes */
  className?: string
  /** ARIA label for accessibility */
  'aria-label'?: string
}

/**
 * Maps wrapper variant to shadcn variant
 */
function mapVariant(variant: ButtonProps['variant']): 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link' {
  switch (variant) {
    case 'primary':
      return 'default'
    case 'secondary':
      return 'outline'
    case 'ghost':
      return 'ghost'
    case 'danger':
      return 'destructive'
    default:
      return 'default'
  }
}

/**
 * Maps wrapper size to shadcn size
 */
function mapSize(size: ButtonProps['size']): 'xs' | 'sm' | 'default' | 'lg' | 'icon' {
  switch (size) {
    case 'sm':
      return 'sm'
    case 'lg':
      return 'lg'
    default:
      return 'default'
  }
}

/**
 * Button component that wraps shadcn/ui Button with custom styling
 * for the Pink Pin Merchant App theme (#ED0577 primary color).
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'default',
      disabled = false,
      loading = false,
      icon,
      iconPosition = 'leading',
      children,
      onClick,
      type = 'button',
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) {
    const isDisabled = disabled || loading

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled && onClick) {
        onClick(event)
      }
    }

    // Custom variant classes for primary color (#ED0577)
    const variantClass = React.useMemo(() => {
      if (variant === 'primary') {
        return 'bg-[#ED0577] hover:bg-[#d9066a] text-white focus-visible:ring-[#ED0577]'
      }
      return ''
    }, [variant])

    return (
      <ShadcnButton
        ref={ref}
        type={type}
        variant={mapVariant(variant)}
        size={mapSize(size)}
        disabled={isDisabled}
        onClick={handleClick}
        className={cn(variantClass, className)}
        aria-label={ariaLabel}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <Loader2
            className={cn(
              'mr-2 h-4 w-4 animate-spin',
              iconPosition === 'trailing' && 'mr-0 ml-2'
            )}
            aria-hidden="true"
          />
        )}
        {!loading && icon && iconPosition === 'leading' && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {!loading && icon && iconPosition === 'trailing' && (
          <span className="ml-2">{icon}</span>
        )}
      </ShadcnButton>
    )
  }
)

Button.displayName = 'Button'

export default Button