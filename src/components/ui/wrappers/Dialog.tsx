/**
 * Dialog Wrapper Component
 * 
 * Wrapper for shadcn/ui Dialog component that maintains backward compatibility
 * with the existing component API while leveraging shadcn/ui's accessibility
 * and styling capabilities.
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5
 */

'use client'

import * as React from 'react'
import {
  Dialog as ShadcnDialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
} from '@/src/components/ui/dialog'
import { Button } from './Button'
import { cn } from '@/lib/utils'

export interface DialogProps {
  /** Whether the dialog is open */
  isOpen: boolean
  /** Callback when dialog closes */
  onClose: () => void
  /** Dialog title */
  title?: string
  /** Dialog description */
  description?: string
  /** Dialog content */
  children: React.ReactNode
  /** Dialog size */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Whether to show close button */
  showCloseButton?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * Maps wrapper size to CSS classes
 */
function getSizeClass(size: DialogProps['size']): string {
  switch (size) {
    case 'sm':
      return 'max-w-sm'
    case 'md':
      return 'max-w-md'
    case 'lg':
      return 'max-w-lg'
    case 'xl':
      return 'max-w-xl'
    default:
      return 'max-w-md'
  }
}

/**
 * Dialog component that wraps shadcn/ui Dialog with custom styling
 * for the Pink Pin Merchant App theme.
 * 
 * Features:
 * - WAI-ARIA dialog pattern with proper roles and attributes
 * - Focus trapping when dialog opens
 * - Escape key handling to close dialog
 * - Overlay with 50% opacity black background
 * - Animation transitions
 * - Support for order details in confirmation dialogs
 */
export const Dialog: React.FC<DialogProps> = function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  className,
}) {
  return (
    <ShadcnDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50" />
        <DialogContent
          className={cn(getSizeClass(size), className)}
          showCloseButton={showCloseButton}
        >
          <DialogHeader>
            {title && (
              <DialogTitle>{title}</DialogTitle>
            )}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="py-4">
            {children}
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </ShadcnDialog>
  )
}

/**
 * Confirmation Dialog variant for order confirmations
 * Displays order details (invoice number, recipient name)
 */
export interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  invoiceNumber?: string
  recipientName?: string
  confirmText?: string
  cancelText?: string
  children?: React.ReactNode
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  invoiceNumber,
  recipientName,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  children,
}) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
    >
      {/* Order details display */}
      {(invoiceNumber || recipientName) && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg space-y-2">
          {invoiceNumber && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Invoice Number:</span>
              <span className="font-medium">{invoiceNumber}</span>
            </div>
          )}
          {recipientName && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Recipient:</span>
              <span className="font-medium">{recipientName}</span>
            </div>
          )}
        </div>
      )}
      
      {children}
      
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="secondary" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </Dialog>
  )
}

export default Dialog