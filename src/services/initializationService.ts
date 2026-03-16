import { getStorageAdapter } from './storage'
import { initializeSampleData, isSampleDataInitialized } from './sampleData'

/**
 * Service responsible for app initialization including sample data setup
 */
export class InitializationService {
  private static instance: InitializationService | null = null

  private constructor() {}

  static getInstance(): InitializationService {
    if (!InitializationService.instance) {
      InitializationService.instance = new InitializationService()
    }
    return InitializationService.instance
  }

  /**
   * Initialize the application with sample data and storage
   */
  async initialize(): Promise<void> {
    try {
      // Initialize sample data if not already done
      if (!isSampleDataInitialized()) {
        initializeSampleData()
      }

      // Verify storage adapter is working
      const storageAdapter = getStorageAdapter()
      const orders = await storageAdapter.getOrders()
      const merchants = await storageAdapter.getMerchant('MERCHANT-001')
      const outlets = await storageAdapter.getOutlets()

      console.log(`📊 App initialized successfully:`)
      console.log(`   - Orders: ${orders.length}`)
      console.log(`   - Merchants: ${merchants ? 1 : 0}`)
      console.log(`   - Outlets: ${outlets.length}`)

      // Validate data integrity
      this.validateSampleData(orders, outlets)
    } catch (error) {
      console.error('❌ Failed to initialize app:', error)
      throw error
    }
  }

  /**
   * Validate that sample data meets requirements
   */
  private validateSampleData(orders: any[], outlets: any[]): void {
    // Requirement 1.1: 10-15 sample orders
    if (orders.length < 10 || orders.length > 15) {
      throw new Error(`Invalid order count: ${orders.length}. Expected 10-15 orders.`)
    }

    // Requirement 1.2: Various statuses and service types
    const statuses = new Set(orders.map(order => order.status))
    const serviceTypes = new Set(orders.map(order => order.delivery.serviceType))

    if (statuses.size < 2) {
      throw new Error('Sample orders must have various statuses')
    }

    if (serviceTypes.size < 2) {
      throw new Error('Sample orders must have various service types')
    }

    // Requirement 1.3: Multiple dates (last 30 days)
    const now = new Date()
    const thirtyDaysAgo = new Date(now)
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const orderDates = orders.map(order => new Date(order.createdAt))
    const hasRecentOrders = orderDates.some(date => date >= thirtyDaysAgo)
    const hasVariedDates = orderDates.some(date => date < now)

    if (!hasRecentOrders || !hasVariedDates) {
      throw new Error('Sample orders must span multiple dates within the last 30 days')
    }

    // Validate outlets exist
    if (outlets.length === 0) {
      throw new Error('No outlets found in sample data')
    }

    console.log('✅ Sample data validation passed')
  }

  /**
   * Get initialization status
   */
  isInitialized(): boolean {
    return isSampleDataInitialized()
  }
}

export const initializationService = InitializationService.getInstance()