/**
 * Accordion - Collapsible accordion form component wrapper
 * Manages state for which section is open
 * Provides smooth transitions between sections
 * Responsive design with touch-friendly headers
 * Implements WAI-ARIA accordion pattern for accessibility
 * Built on base-ui accordion component
 */

import * as React from "react"
import {
  Accordion as AccordionPrimitive,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/src/components/ui/accordion"
import { cn } from "@/lib/utils"

export interface AccordionSection {
  id: string
  title: string
  content: React.ReactNode
  isValid?: boolean
  hasErrors?: boolean
}

export interface AccordionProps {
  sections: AccordionSection[]
  defaultOpenSection?: string
  type?: "single" | "multiple"
  className?: string
  onToggle?: (id: string) => void
}

export function Accordion({
  sections,
  defaultOpenSection,
  type = "single",
  className,
  onToggle,
}: AccordionProps) {
  const [singleOpen, setSingleOpen] = React.useState<string>(() => {
    if (defaultOpenSection) {
      return defaultOpenSection
    }
    return sections.length > 0 ? sections[0].id : ""
  })

  const [multipleOpen, setMultipleOpen] = React.useState<Set<string>>(() => {
    if (defaultOpenSection) {
      return new Set([defaultOpenSection])
    }
    return new Set(sections.length > 0 ? [sections[0].id] : [])
  })

  const handleSingleChange = (value: string[]) => {
    const strValue = value[0] || ""
    setSingleOpen(strValue)
    if (onToggle) {
      onToggle(strValue)
    }
  }

  const handleMultipleChange = (value: string[]) => {
    const strValue = value[0] || ""
    const newOpen = new Set(multipleOpen)
    if (newOpen.has(strValue)) {
      newOpen.delete(strValue)
    } else {
      newOpen.add(strValue)
    }
    setMultipleOpen(newOpen)
    if (onToggle) {
      onToggle(strValue)
    }
  }

  return (
    <div className={cn("space-y-2 sm:space-y-3", className)} role="region" aria-label="Order form sections">
      <AccordionPrimitive
        value={type === "single" ? [singleOpen] : Array.from(multipleOpen)}
        onValueChange={type === "single" ? handleSingleChange : handleMultipleChange}
        className="w-full"
      >
        {sections.map((section) => (
          <AccordionItem key={section.id} value={section.id} className="bg-white rounded-lg shadow overflow-hidden">
            <AccordionTrigger className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-gray-50 transition-colors min-h-[52px] focus-visible:ring-2 focus-visible:ring-[#ED0577] focus-visible:ring-inset">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-base sm:text-lg font-semibold text-gray-900">{section.title}</span>
                {section.hasErrors && (
                  <span className="w-2 h-2 rounded-full bg-red-500" aria-label="Section has errors" />
                )}
                {!section.hasErrors && section.isValid !== undefined && (
                  <span className={cn("w-2 h-2 rounded-full", section.isValid ? "bg-green-500" : "bg-gray-300")} aria-label={section.isValid ? "Section complete" : "Section incomplete"} />
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
              {section.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </AccordionPrimitive>
    </div>
  )
}

export default Accordion
