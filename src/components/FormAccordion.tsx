/**
 * FormAccordion - Collapsible accordion form component
 * Manages state for which section is open
 * Provides smooth transitions between sections
 * Responsive design with touch-friendly headers
 * Implements WAI-ARIA accordion pattern for accessibility
 */

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface AccordionSection {
  id: string
  title: string
  content: React.ReactNode
  isValid?: boolean
}

interface FormAccordionProps {
  sections: AccordionSection[]
  defaultOpenSection?: string
}

export function FormAccordion({ sections, defaultOpenSection }: FormAccordionProps) {
  const [openSectionId, setOpenSectionId] = useState<string | null>(
    defaultOpenSection || sections[0]?.id || null
  )

  const toggleSection = (sectionId: string) => {
    setOpenSectionId(openSectionId === sectionId ? null : sectionId)
  }

  const isOpen = (sectionId: string) => openSectionId === sectionId

  return (
    <div className="space-y-2 sm:space-y-3" role="region" aria-label="Order form sections">
      {sections.map((section) => (
        <div key={section.id} className="bg-white rounded-lg shadow overflow-hidden">
          {/* Accordion Header */}
          <button
            onClick={() => toggleSection(section.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                toggleSection(section.id)
              }
            }}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-gray-50 transition-colors min-h-[52px] focus-visible:ring-2 focus-visible:ring-[#ED0577] focus-visible:ring-inset"
            aria-expanded={isOpen(section.id)}
            aria-controls={`accordion-content-${section.id}`}
            id={`accordion-header-${section.id}`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-base sm:text-lg font-semibold text-gray-900">{section.title}</span>
              {section.isValid !== undefined && (
                <span
                  className={`w-2 h-2 rounded-full ${
                    section.isValid ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  aria-label={section.isValid ? 'Section complete' : 'Section incomplete'}
                />
              )}
            </div>
            <ChevronDown
              size={20}
              className={`text-gray-600 transition-transform hidden sm:block ${
                isOpen(section.id) ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
            <ChevronDown
              size={18}
              className={`text-gray-600 transition-transform sm:hidden ${
                isOpen(section.id) ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          {/* Accordion Content */}
          {isOpen(section.id) && (
            <div
              id={`accordion-content-${section.id}`}
              className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50 animate-in fade-in duration-200"
              role="region"
              aria-labelledby={`accordion-header-${section.id}`}
            >
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FormAccordion
