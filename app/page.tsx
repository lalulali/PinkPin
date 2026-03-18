'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/src/services/authService'

export default function Home() {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        // Check authentication synchronously first (fast check)
        const isAuthenticated = authService.validateTokenSync()
        
        if (isAuthenticated) {
          router.push('/dashboard')
        } else {
          // If sync check fails, do async check to be sure
          const isValid = await authService.validateToken()
          if (isValid) {
            router.push('/dashboard')
          } else {
            router.push('/login')
          }
        }
      } catch (error) {
        // If any error occurs, redirect to login
        router.push('/login')
      } finally {
        setIsChecking(false)
      }
    }

    checkAuthAndRedirect()
  }, [router])

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ED0577] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // This shouldn't render, but just in case
  return null
}
