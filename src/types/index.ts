/**
 * Core data models and types for Pink Pin Merchant App
 */

export type OrderStatus = 'submitted' | 'waiting' | 'closed' | 'cancelled'

export type OrderStatusDisplay =
  | 'Shipment Created'
  | 'Waiting for Pick Up'
  | 'Delivery Completed'
  | 'Shipment Cancelled'

export type ServiceType = 'standard' | 'express' | 'same-day'

export interface Coordinates {
  lat: number
  lng: number
}

export interface Recipient {
  name: string
  phone: string
  email: string
  address: string
  coordinates: Coordinates
}

export interface Item {
  id: string
  description: string
  quantity: number
}

export interface Package {
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
  }
  isFragile: boolean
}

export interface Delivery {
  serviceType: ServiceType
  distance: number // km
  shippingFee: number
  baseFee: number
  rate: number
}

export interface Order {
  id: string
  merchantId: string
  outletId: string
  status: OrderStatus
  statusDisplay: OrderStatusDisplay
  invoiceNumber: string
  recipient: Recipient
  items: Item[]
  package: Package
  delivery: Delivery
  createdAt: Date
  updatedAt: Date
}

export interface Outlet {
  id: string
  merchantId: string
  name: string
  address: string
  coordinates: Coordinates
  createdAt: Date
}

export interface Merchant {
  id: string
  email: string
  name: string
  outlets: Outlet[]
  createdAt: Date
}

export interface AuthToken {
  token: string
  expiresAt: Date
}
