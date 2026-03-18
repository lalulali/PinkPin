/**
 * Dashboard - Merchant dashboard with KPIs and analytics
 * Shows KPIs, order status distribution, and recent activity
 */

'use client'

import { KPICards } from '@/src/components/KPICards'
import { StatusChart } from '@/src/components/StatusChart'
import { ActivityFeed } from '@/src/components/ActivityFeed'

export function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      {/* Key Performance Indicators */}
      <KPICards />
      
      {/* Order Status Distribution and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <StatusChart />
        <ActivityFeed />
      </div>
    </div>
  )
}

export default Dashboard
