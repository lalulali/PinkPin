/**
 * ConfirmationModal - Displays order creation success confirmation with order ID
 * Shows order details and provides redirect option
 * Keyboard accessible with focus management
 */

import { useEffect, useRef } from 'react'

interface ConfirmationModalProps {
  isOpen: boolean
  orderId: string
  onClose: () => void
}

export function ConfirmationModal({ isOpen, orderId, onClose }: ConfirmationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Focus the close button when modal opens
      closeButtonRef.current?.focus()
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
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  // Auto-close after 3 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-title"
      aria-describedby="confirmation-description"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4"
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center" aria-hidden="true">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 id="confirmation-title" className="text-2xl font-bold text-center text-gray-900 mb-2">
          Order Created!
        </h2>

        {/* Message */}
        <p id="confirmation-description" className="text-center text-gray-600 mb-6">
          Your order has been successfully created.
        </p>

        {/* Order ID */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">Order ID</p>
          <p className="text-lg font-mono font-bold text-gray-900 break-all">{orderId}</p>
        </div>

        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onClose()
            }
          }}
          className="w-full px-4 py-3 bg-[#ED0577] text-white rounded-lg font-medium hover:bg-[#d9066a] transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#ED0577] focus:ring-offset-2"
          autoFocus
        >
          Continue
        </button>

        {/* Auto-close message */}
        <p className="text-xs text-gray-500 text-center mt-4" aria-live="polite">
          Redirecting in 3 seconds...
        </p>
      </div>
    </div>
  )
}

export default ConfirmationModal
