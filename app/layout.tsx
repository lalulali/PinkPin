import type { Metadata } from 'next'
import { AuthProvider } from '@/src/context/AuthContext'
import { QueryProvider } from '@/src/providers/QueryProvider'
import '@/src/index.css'

export const metadata: Metadata = {
  title: 'Pink Pin Merchant App',
  description: 'Merchant order management system for logistics and delivery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
