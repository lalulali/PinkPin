/**
 * EmptyState - Displayed when no orders match the filter criteria
 * Implements Requirement 10.15
 * Uses proper semantic structure with ARIA attributes
 */

interface EmptyStateProps {
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ title = 'No orders found', description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4" role="status">
      {/* Icon */}
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>

      {/* Title */}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-600 text-center max-w-sm mb-4">{description}</p>
      )}

      {/* Action button */}
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-[#ED0577] text-white rounded-md hover:bg-[#d9066a] transition-colors min-h-[44px] min-w-[100px] flex items-center justify-center"
          aria-label={action.label}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

export default EmptyState