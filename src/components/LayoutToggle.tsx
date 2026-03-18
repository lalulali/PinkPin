/**
 * LayoutToggle - Toggle between card view and table view
 * Implements Requirement 10.8
 * Keyboard accessible with visible focus indicators
 */

'use client'

import { useLayout } from '@/src/hooks/useUIStore'

export function LayoutToggle() {
  const { layout, toggleLayout } = useLayout()

  const handleKeyDown = (e: React.KeyboardEvent, newLayout: 'table' | 'card') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (layout !== newLayout) {
        toggleLayout()
      }
    }
    // Arrow key navigation between toggle buttons
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      const nextLayout = newLayout === 'table' ? 'card' : 'table'
      const nextButton = document.querySelector(`[data-layout="${nextLayout}"]`) as HTMLElement
      nextButton?.focus()
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      const prevLayout = newLayout === 'table' ? 'card' : 'table'
      const prevButton = document.querySelector(`[data-layout="${prevLayout}"]`) as HTMLElement
      prevButton?.focus()
    }
  }

  return (
    <div className="flex items-center gap-2" role="radiogroup" aria-label="Layout view selection">
      <span className="text-sm text-gray-600 hidden sm:inline">View:</span>
      <div className="flex rounded-lg border border-gray-200 overflow-hidden">
        <button
          data-layout="table"
          onClick={() => layout !== 'table' && toggleLayout()}
          onKeyDown={(e) => handleKeyDown(e, 'table')}
          className={`px-3 py-2 text-sm transition-colors min-h-[44px] flex items-center gap-1 ${
            layout === 'table'
              ? 'bg-[#ED0577] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          aria-label="Switch to table view"
          aria-pressed={layout === 'table'}
          role="radio"
          aria-checked={layout === 'table'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <span className="hidden sm:inline">Table</span>
        </button><button
          data-layout="card"
          onClick={() => layout !== 'card' && toggleLayout()}
          onKeyDown={(e) => handleKeyDown(e, 'card')}
          className={`px-3 py-2 text-sm transition-colors min-h-[44px] flex items-center gap-1 ${
            layout === 'card'
              ? 'bg-[#ED0577] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          aria-label="Switch to card view"
          aria-pressed={layout === 'card'}
          role="radio"
          aria-checked={layout === 'card'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="hidden sm:inline">Card</span>
        </button>
      </div>
    </div>
  )
}

export default LayoutToggle