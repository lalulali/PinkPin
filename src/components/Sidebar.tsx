/**
 * Sidebar - Navigation sidebar with links to main sections
 * Responsive design with mobile drawer and desktop sidebar
 */

'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

interface NavLink {
  label: string
  href: string
  icon: React.ReactNode
}

const navLinks: NavLink[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 16l4-4m0 0l4 4m-4-4V5"
        />
      </svg>
    ),
  },
  {
    label: 'Order History',
    href: '/orders',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    label: 'Create Order',
    href: '/create-order',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    ),
  },
]

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const handleLinkClick = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-10"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-[#E5E7EB] transform transition-transform duration-300 ease-in-out md:translate-x-0 z-20 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ top: '64px' }} // Account for header height
      >
        <nav className="p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors min-h-[44px] ${
                isActive(link.href)
                  ? 'bg-[#ED0577] text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-[#ED0577]'
              }`}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
