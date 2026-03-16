/**
 * Header - Navigation header with logo, user menu, and logout button
 * Responsive design for mobile, tablet, and desktop
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

interface HeaderProps {
  onMenuToggle?: () => void
  isSidebarOpen?: boolean
}

export function Header({ onMenuToggle, isSidebarOpen }: HeaderProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
    router.push('/login')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section: Menu toggle and logo */}
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-[#ED0577] hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle sidebar"
              aria-expanded={isSidebarOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#ED0577] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-[#ED0577]">Pink Pin</h1>
                <p className="text-xs text-gray-500">Merchant</p>
              </div>
            </div>
          </div>

          {/* Right section: User menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:text-[#ED0577] hover:bg-gray-100 transition-colors min-h-[44px]"
              aria-label="User menu"
              aria-expanded={isUserMenuOpen}
            >
              {/* User avatar */}
              <div className="w-8 h-8 bg-[#ED0577] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              {/* User name - hidden on mobile */}
              <span className="hidden sm:inline text-sm font-medium text-gray-700">
                {user?.name || user?.email}
              </span>
              {/* Dropdown arrow */}
              <svg
                className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>

            {/* User menu dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E5E7EB] py-1 z-30">
                <div className="px-4 py-2 border-b border-[#E5E7EB]">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#ED0577] transition-colors min-h-[44px] flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
