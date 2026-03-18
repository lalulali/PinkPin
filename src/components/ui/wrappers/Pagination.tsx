/**
 * Pagination - Pagination controls wrapper component
 * Displays page numbers with ellipsis for large page counts
 * Active page styling with #ED0577 background
 * Responsive design with showing info text
 * Built on shadcn/ui patterns
 */

'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/src/components/ui/button"

export interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  showingStart: number
  showingEnd: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  showingStart,
  showingEnd,
  onPageChange,
  className,
}: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = (): (number | string)[] => {
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
    <div className={cn("mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4", className)}>
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
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="min-w-[36px] sm:min-w-[44px] min-h-[36px] sm:min-h-[44px] p-1.5 sm:p-2"
          aria-label="Previous page"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>

        {/* Page numbers */}
        {pageNumbers.map((page, index) =>
          typeof page === 'number' ? (
            <Button
              key={index}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className={cn(
                "min-w-[44px] min-h-[44px] px-2.5 sm:px-3",
                page === currentPage && "bg-[#ED0577] hover:bg-[#d90466]"
              )}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </Button>
          ) : (
            <span key={index} className="px-1 sm:px-2 text-gray-500 text-xs sm:text-sm" aria-hidden="true">
              ...
            </span>
          )
        )}

        {/* Next button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="min-w-[36px] sm:min-w-[44px] min-h-[36px] sm:min-h-[44px] p-1.5 sm:p-2"
          aria-label="Next page"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </nav>
    </div>
  )
}

export default Pagination