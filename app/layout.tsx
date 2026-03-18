import type { Metadata } from 'next'
import { AuthProvider } from '@/src/context/AuthContext'
import { QueryProvider } from '@/src/providers/QueryProvider'
import '@/src/index.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("font-sans", geist.variable)}>
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
