/**
 * Pagination - Pagination controls for order list
 * Displays 20 orders per page (Requirement 10.1)
 * Responsive design: stacked on mobile, inline on desktop
 * Implements keyboard navigation for accessibility
 */

'use client'

import { useCallback } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  showingStart: number
  showingEnd: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  showingStart,
  showingEnd,
  onPageChange,
}: PaginationProps) {
  // Handle keyboard navigation for page buttons
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, page: number, callback: () => void) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        callback()
      }
      // Arrow key navigation
      if (e.key === 'ArrowRight' && page < totalPages) {
        e.preventDefault()
        onPageChange(page + 1)
      }
      if (e.key === 'ArrowLeft' && page > 1) {
        e.preventDefault()
        onPageChange(page - 1)
      }
    },
    [totalPages, onPageChange]
  )

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate start and end of visible page range
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if at the beginning
      if (currentPage <= 2) {
        end = maxVisiblePages - 1
      }
      // Adjust if at the end
      if (currentPage >= totalPages - 1) {
        start = totalPages - maxVisiblePages + 2
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push('...')
      }

      // Add visible pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push('...')
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
      {/* Showing info */}
      <p className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1" aria-live="polite">
        Showing <span className="font-medium">{showingStart}</span> to{' '}
        <span className="font-medium">{showingEnd}</span> of{' '}
        <span className="font-medium">{totalItems}</span> orders
      </p>

      {/* Page controls */}
      <nav
        className="flex items-center gap-1 order-1 sm:order-2"
        aria-label="Pagination"
        role="navigation"
      >
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          onKeyDown={(e) => handleKeyDown(e, currentPage - 1, () => onPageChange(currentPage - 1))}
          disabled={currentPage === 1}
          className="p-1.5 sm:p-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed min-w-[36px] sm:min-w-[44px] min-h-[36px] sm:min-h-[44px] flex items-center justify-center transition-colors"
          aria-label="Previous page"
          aria-disabled={currentPage === 1}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page numbers */}
        {pageNumbers.map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              onKeyDown={(e) => handleKeyDown(e, page, () => onPageChange(page))}
              className={`px-2.5 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors ${
                page === currentPage
                  ? 'bg-[#ED0577] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-1 sm:px-2 text-gray-500 text-xs sm:text-sm" aria-hidden="true">
              ...
            </span>
          )
        )}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          onKeyDown={(e) => handleKeyDown(e, currentPage + 1, () => onPageChange(currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-1.5 sm:p-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed min-w-[36px] sm:min-w-[44px] min-h-[36px] sm:min-h-[44px] flex items-center justify-center transition-colors"
          aria-label="Next page"
          aria-disabled={currentPage === totalPages}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>
    </div>
  )
}

export default Pagination