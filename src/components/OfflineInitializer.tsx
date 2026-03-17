/**
 * OfflineInitializer - Client component that initializes offline detection
 * Must be rendered in a client component context
 */

'use client'

import { useEffect } from 'react'
import { initializeOfflineDetection } from '@/src/services/offlineService'
import { OfflineIndicator } from './OfflineIndicator'

export function OfflineInitializer() {
  useEffect(() => {
    const cleanup = initializeOfflineDetection()
    return cleanup
  }, [])

  return <OfflineIndicator />
}

export default OfflineInitializer
