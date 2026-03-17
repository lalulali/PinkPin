/**
 * CancelOrderDialog - Confirmation dialog for cancelling an order
 * Displays order details and asks for confirmation before cancelling
 * Implements Requirement 10.11
 * Keyboard accessible with focus management
 */

import { useEffect, useRef } from 'react'

interface CancelOrderDialogProps {
  isOpen: boolean
  invoiceNumber: string
  recipientName: string
  onConfirm: () => void
  onCancel: () => void
}

export function CancelOrderDialog({
  isOpen,
  invoiceNumber,
  recipientName,
  onConfirm,
  onCancel,
}: CancelOrderDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const confirmButtonRef = useRef<HTMLButtonElement>(null)

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Focus the cancel button (safer default) when dialog opens
      cancelButtonRef.current?.focus()
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    } else {
      // Restore body scroll
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onCancel])

  // Handle keyboard navigation within dialog
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      // Trap focus within dialog
      if (e.shiftKey) {
        if (document.activeElement === cancelButtonRef.current) {
          e.preventDefault()
          confirmButtonRef.current?.focus()
        }
      } else {
        if (document.activeElement === confirmButtonRef.current) {
          e.preventDefault()
          cancelButtonRef.current?.focus()
        }
      }
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cancel-dialog-title"
      aria-describedby="cancel-dialog-description"
    >
      <div
        ref={dialogRef}
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4"
        onKeyDown={handleKeyDown}
      >
        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center" aria-hidden="true">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 id="cancel-dialog-title" className="text-xl font-bold text-center text-gray-900 mb-2">
          Cancel Order?
        </h2>

        {/* Message */}
        <p id="cancel-dialog-description" className="text-center text-gray-600 mb-4">
          Are you sure you want to cancel this order? This action cannot be undone.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Order ID</span>
            <span className="text-sm font-mono font-medium text-gray-900">{invoiceNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Recipient</span>
            <span className="text-sm font-medium text-gray-900">{recipientName}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3" role="group" aria-label="Cancel order confirmation">
          <button
            ref={cancelButtonRef}
            onClick={onCancel}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onCancel()
              }
            }}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#ED0577] focus:ring-offset-2"
            autoFocus
          >
            Keep Order
          </button>
          <button
            ref={confirmButtonRef}
            onClick={onConfirm}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onConfirm()
              }
            }}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default CancelOrderDialog