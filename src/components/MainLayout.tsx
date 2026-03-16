/**
 * MainLayout - Layout component for authenticated pages
 * Includes header, sidebar navigation, and responsive layout
 * Responsive design: single column on mobile, sidebar + content on desktop
 */

'use client'

import { ReactNode, useState } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleSidebarClose = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        onMenuToggle={handleMenuToggle}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Layout container */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
        />

        {/* Main content */}
        <main className="flex-1 w-full md:w-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout