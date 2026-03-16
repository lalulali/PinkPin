/**
 * Application constants and configuration
 */

export const DEMO_CREDENTIALS = {
  email: 'demo@pinkpin.com',
  password: 'demo123',
}

export const SESSION_DURATION_DAYS = 7

export const ORDERS_PER_PAGE = 20

export const STALE_TIME_MS = 5 * 60 * 1000 // 5 minutes

export const AUTO_SAVE_INTERVAL_MS = 30 * 1000 // 30 seconds

export const MAX_DELIVERY_DISTANCE_KM = 3

export const MAP_DEFAULT_ZOOM = 15

export const STATUS_COLORS = {
  submitted: '#3B82F6', // Blue
  waiting: '#F59E0B', // Orange
  closed: '#10B981', // Green
  cancelled: '#EF4444', // Red
}

export const STATUS_DISPLAY_MAP = {
  submitted: 'Shipment Created',
  waiting: 'Waiting for Pick Up',
  closed: 'Delivery Completed',
  cancelled: 'Shipment Cancelled',
}

export const SERVICE_TYPES = ['standard', 'express', 'same-day'] as const

export const ORDER_STATUSES = ['submitted', 'waiting', 'closed', 'cancelled'] as const
