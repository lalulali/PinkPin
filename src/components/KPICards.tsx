/**
 * KPICards - Dashboard key performance indicator cards
 * Implements accessible cards with proper heading hierarchy and ARIA attributes
 */

'use client'

import { useOrders } from '@/src/hooks/useOrders'
import { Package, Truck, TrendingUp } from 'lucide-react'

interface KPICardProps {
  title: string
  value: number | string
  description: string
  icon: React.ReactNode
  iconBgColor: string
  iconColor: string
  isRefetching?: boolean
}

function KPICard({ title, value, description, icon, iconBgColor, iconColor, isRefetching }: KPICardProps) {
  return (
    <article
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative overflow-hidden"
      aria-labelledby={`kpi-${title.toLowerCase().replace(/\s+/g, '-')}-title`}
    >
      {isRefetching && (
        <div className="absolute inset-0 bg-gray-50/50 flex items-center justify-center" role="status" aria-live="polite">
          <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg" style={{ backgroundColor: iconBgColor }}>
          <span className="sr-only">{title}</span>
          <span className={iconColor}>{icon}</span>
        </div>
        <h3 id={`kpi-${title.toLowerCase().replace(/\s+/g, '-')}-title`} className="text-sm font-medium text-gray-600">
          {title}
        </h3>
      </div>
      <div className="text-3xl font-bold text-gray-900" aria-live="polite" aria-atomic="true">
        {value}
      </div>
      <div className="text-sm text-gray-500 mt-1">{description}</div>
    </article>
  )
}

export function KPICards() {
  const { data: orders = [], isLoading, isRefetching } = useOrders()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Today's order volume
  const todaysOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt)
    return orderDate >= today
  }).length

  // Active shipments (submitted or waiting)
  const activeShipments = orders.filter(
    (order) => order.status === 'submitted' || order.status === 'waiting'
  ).length

  // Delivery success rate for current month
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  const monthlyOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt)
    return (
      orderDate.getMonth() === currentMonth &&
      orderDate.getFullYear() === currentYear
    )
  })

  const closedOrders = monthlyOrders.filter(
    (order) => order.status === 'closed'
  ).length
  const totalMonthlyOrders = monthlyOrders.length
  const successRate =
    totalMonthlyOrders > 0
      ? Math.round((closedOrders / totalMonthlyOrders) * 100)
      : 0

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" role="status" aria-busy="true" aria-label="Loading KPI cards">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse min-h-[120px]"
          >
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-8 bg-gray-200 rounded w-1/3" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <section aria-label="Key Performance Indicators" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Today's Order Volume */}
      <KPICard
        title="Today's Orders"
        value={todaysOrders}
        description="orders created today"
        icon={<Package className="w-5 h-5 text-blue-600" />}
        iconBgColor="#eff6ff"
        iconColor="text-blue-600"
        isRefetching={isRefetching}
      />

      {/* Active Shipments */}
      <KPICard
        title="Active Shipments"
        value={activeShipments}
        description="orders in transit"
        icon={<Truck className="w-5 h-5 text-orange-600" />}
        iconBgColor="#fff7ed"
        iconColor="text-orange-600"
        isRefetching={isRefetching}
      />

      {/* Delivery Success Rate */}
      <KPICard
        title="Success Rate"
        value={`${successRate}%`}
        description="delivery completion this month"
        icon={<TrendingUp className="w-5 h-5 text-green-600" />}
        iconBgColor="#f0fdf4"
        iconColor="text-green-600"
        isRefetching={isRefetching}
      />
    </section>
  )
}

export default KPICards