/**
 * Session Heartbeat Utility
 * Helps maintain active session across tabs by periodically checking and refreshing session
 */

import { authService } from '../services/authService'

const HEARTBEAT_INTERVAL = 60 * 1000 // 1 minute
const SESSION_WARNING_THRESHOLD = 5 * 60 * 1000 // 5 minutes before expiry

let heartbeatInterval: NodeJS.Timeout | null = null
let isHeartbeatActive = false

/**
 * Start session heartbeat
 * Periodically checks session validity and refreshes if needed
 */
export function startSessionHeartbeat(): void {
  if (isHeartbeatActive) {
    return
  }

  heartbeatInterval = setInterval(() => {
    const timeUntilExpiry = authService.getTimeUntilExpiry()
    
    if (timeUntilExpiry <= 0) {
      // Session expired, stop heartbeat
      stopSessionHeartbeat()
      return
    }
    
    if (timeUntilExpiry < SESSION_WARNING_THRESHOLD) {
      // Session about to expire, refresh it
      authService.refreshOnActivity()
    }
  }, HEARTBEAT_INTERVAL)

  isHeartbeatActive = true
}

/**
 * Stop session heartbeat
 */
export function stopSessionHeartbeat(): void {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval)
    heartbeatInterval = null
  }
  isHeartbeatActive = false
}

/**
 * Check if heartbeat is active
 */
export function isHeartbeatRunning(): boolean {
  return isHeartbeatActive
}

/**
 * Manually trigger a heartbeat check
 */
export function triggerHeartbeatCheck(): void {
  const timeUntilExpiry = authService.getTimeUntilExpiry()
  
  if (timeUntilExpiry <= 0) {
    stopSessionHeartbeat()
  } else if (timeUntilExpiry < SESSION_WARNING_THRESHOLD) {
    authService.refreshOnActivity()
  }
}