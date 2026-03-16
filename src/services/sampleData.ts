import { Order, Merchant, Outlet } from '@/types'

const SAMPLE_DATA_INITIALIZED_KEY = 'pink_pin_sample_data_initialized'

/**
 * Generate sample orders with various statuses, service types, and dates
 * Spans multiple dates to support date range filtering
 */
export function generateSampleOrders(): Order[] {
  const now = new Date()
  const orders: Order[] = []

  const statuses = ['submitted', 'waiting', 'closed', 'cancelled'] as const
  const serviceTypes = ['standard', 'express', 'same-day'] as const
  const statusDisplays = [
    'Shipment Created',
    'Waiting for Pick Up',
    'Delivery Completed',
    'Shipment Cancelled',
  ] as const

  const recipients = [
    {
      name: 'John Doe',
      phone: '+62812345678',
      email: 'john@example.com',
      address: 'Jl. Sudirman No. 123, Jakarta',
    },
    {
      name: 'Jane Smith',
      phone: '+62812345679',
      email: 'jane@example.com',
      address: 'Jl. Gatot Subroto No. 456, Jakarta',
    },
    {
      name: 'Bob Johnson',
      phone: '+62812345680',
      email: 'bob@example.com',
      address: 'Jl. Thamrin No. 789, Jakarta',
    },
    {
      name: 'Alice Williams',
      phone: '+62812345681',
      email: 'alice@example.com',
      address: 'Jl. Rasuna Said No. 101, Jakarta',
    },
    {
      name: 'Charlie Brown',
      phone: '+62812345682',
      email: 'charlie@example.com',
      address: 'Jl. Kuningan No. 202, Jakarta',
    },
  ]

  // Generate 15 sample orders
  for (let i = 0; i < 15; i++) {
    const daysAgo = Math.floor(Math.random() * 30)
    const createdAt = new Date(now)
    createdAt.setDate(createdAt.getDate() - daysAgo)

    const statusIndex = i % 4
    const serviceTypeIndex = i % 3
    const recipientIndex = i % recipients.length

    const distance = 0.5 + Math.random() * 2.5 // 0.5 to 3 km
    const serviceType = serviceTypes[serviceTypeIndex]

    let baseFee = 10000
    let rate = 5000
    if (serviceType === 'express') {
      baseFee = 20000
      rate = 7500
    } else if (serviceType === 'same-day') {
      baseFee = 30000
      rate = 10000
    }

    const shippingFee = baseFee + distance * rate

    // Generate 1-3 items per order for variety
    const itemCount = Math.floor(Math.random() * 3) + 1
    const items = []
    for (let j = 0; j < itemCount; j++) {
      items.push({
        id: `ITEM-${i}-${j + 1}`,
        description: `Product ${i + 1}-${j + 1}`,
        quantity: Math.floor(Math.random() * 5) + 1,
      })
    }

    // Vary outlet selection for some orders
    const outletId = i % 3 === 0 ? 'OUTLET-002' : 'OUTLET-001'

    orders.push({
      id: `ORD-${String(i + 1).padStart(5, '0')}`,
      merchantId: 'MERCHANT-001',
      outletId,
      status: statuses[statusIndex],
      statusDisplay: statusDisplays[statusIndex],
      invoiceNumber: `INV-${String(i + 1).padStart(5, '0')}`,
      recipient: {
        ...recipients[recipientIndex],
        coordinates: {
          lat: -6.2088 + Math.random() * 0.05,
          lng: 106.8456 + Math.random() * 0.05,
        },
      },
      items,
      package: {
        weight: Math.floor(Math.random() * 10) + 1,
        dimensions: {
          length: Math.floor(Math.random() * 30) + 10,
          width: Math.floor(Math.random() * 20) + 10,
          height: Math.floor(Math.random() * 15) + 5,
        },
        isFragile: Math.random() > 0.7,
      },
      delivery: {
        serviceType,
        distance: Math.round(distance * 10) / 10,
        shippingFee: Math.round(shippingFee),
        baseFee,
        rate,
      },
      createdAt,
      updatedAt: createdAt,
    })
  }

  return orders
}

/**
 * Generate sample merchants
 */
export function generateSampleMerchants(): Merchant[] {
  return [
    {
      id: 'MERCHANT-001',
      email: 'demo@pinkpin.com',
      name: 'Demo Merchant',
      outlets: [],
      createdAt: new Date(),
    },
  ]
}

/**
 * Generate sample outlets
 */
export function generateSampleOutlets(): Outlet[] {
  return [
    {
      id: 'OUTLET-001',
      merchantId: 'MERCHANT-001',
      name: 'Jakarta Main Outlet',
      address: 'Jl. Sudirman No. 1, Jakarta',
      coordinates: {
        lat: -6.2088,
        lng: 106.8456,
      },
      createdAt: new Date(),
    },
    {
      id: 'OUTLET-002',
      merchantId: 'MERCHANT-001',
      name: 'Jakarta South Outlet',
      address: 'Jl. Gatot Subroto No. 1, Jakarta',
      coordinates: {
        lat: -6.2256,
        lng: 106.8002,
      },
      createdAt: new Date(),
    },
  ]
}

/**
 * Initialize sample data in localStorage if not already initialized
 */
export function initializeSampleData(): void {
  const isInitialized = localStorage.getItem(SAMPLE_DATA_INITIALIZED_KEY)

  if (!isInitialized) {
    const orders = generateSampleOrders()
    const merchants = generateSampleMerchants()
    const outlets = generateSampleOutlets()

    localStorage.setItem('pink_pin_orders', JSON.stringify(orders))
    localStorage.setItem('pink_pin_merchants', JSON.stringify(merchants))
    localStorage.setItem('pink_pin_outlets', JSON.stringify(outlets))
    localStorage.setItem(SAMPLE_DATA_INITIALIZED_KEY, 'true')

    console.log(`✅ Sample data initialized: ${orders.length} orders, ${merchants.length} merchants, ${outlets.length} outlets`)
  }
}

/**
 * Reset sample data - useful for testing and development
 */
export function resetSampleData(): void {
  localStorage.removeItem('pink_pin_orders')
  localStorage.removeItem('pink_pin_merchants')
  localStorage.removeItem('pink_pin_outlets')
  localStorage.removeItem(SAMPLE_DATA_INITIALIZED_KEY)
  
  console.log('🔄 Sample data reset')
}

/**
 * Check if sample data has been initialized
 */
export function isSampleDataInitialized(): boolean {
  return localStorage.getItem(SAMPLE_DATA_INITIALIZED_KEY) === 'true'
}
