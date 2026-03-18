/**
 * StatusChart - Order status distribution chart
 * Responsive design: stacked on mobile, side-by-side on tablet+
 * Implements accessible chart with proper ARIA labels and descriptions
 */

'use client'

import { useOrders } from '@/src/hooks/useOrders'
import { STATUS_COLORS, STATUS_DISPLAY_MAP } from '@/src/utils/constants'
import { PieChart } from 'lucide-react'

interface StatusCount {
  status: string
  count: number
  color: string
  label: string
}

export function StatusChart() {
  const { data: orders = [], isLoading, isRefetching } = useOrders()

  const statusCounts: StatusCount[] = [
    {
      status: 'submitted',
      count: orders.filter((o) => o.status === 'submitted').length,
      color: STATUS_COLORS.submitted,
      label: STATUS_DISPLAY_MAP.submitted,
    },
    {
      status: 'waiting',
      count: orders.filter((o) => o.status === 'waiting').length,
      color: STATUS_COLORS.waiting,
      label: STATUS_DISPLAY_MAP.waiting,
    },
    {
      status: 'closed',
      count: orders.filter((o) => o.status === 'closed').length,
      color: STATUS_COLORS.closed,
      label: STATUS_DISPLAY_MAP.closed,
    },
    {
      status: 'cancelled',
      count: orders.filter((o) => o.status === 'cancelled').length,
      color: STATUS_COLORS.cancelled,
      label: STATUS_DISPLAY_MAP.cancelled,
    },
  ]

  const total = statusCounts.reduce((sum, item) => sum + item.count, 0)

  // Calculate pie chart segments
  const radius = 80
  const circumference = 2 * Math.PI * radius
  let currentOffset = 0

  const segments = statusCounts
    .filter((item) => item.count > 0)
    .map((item) => {
      const percentage = item.count / total
      const dashLength = percentage * circumference
      const dashArray = `${dashLength} ${circumference - dashLength}`
      const offset = circumference - currentOffset
      currentOffset += dashLength

      return {
        ...item,
        percentage: Math.round(percentage * 100),
        dashArray,
        offset,
      }
    })

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100" aria-busy="true">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6 animate-pulse" />
        <div className="flex items-center justify-center">
          <div className="w-48 h-48 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 relative overflow-hidden" aria-labelledby="status-chart-title">
      {isRefetching && (
        <div className="absolute inset-0 bg-gray-50/50 flex items-center justify-center z-10" role="status" aria-live="polite">
          <div className="w-8 h-8 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <header className="flex items-center gap-2 mb-6">
        <PieChart className="w-5 h-5 text-gray-600" aria-hidden="true" />
        <h2 id="status-chart-title" className="text-lg font-semibold text-gray-900">
          Order Status Distribution
        </h2>
      </header>

      <div className="flex flex-col items-center gap-4">
        {/* Pie Chart */}
        <div className="relative w-56 h-56 md:w-64 md:h-64" role="img" aria-label={`Pie chart showing order status distribution. Total: ${total} orders`}>
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full transform -rotate-90"
            aria-hidden="true"
          >
            {segments.map((segment) => (
              <circle
                key={segment.status}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth="40"
                strokeDasharray={segment.dashArray}
                strokeDashoffset={segment.offset}
                className="transition-all duration-500"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-gray-900">{total}</div>
              <div className="text-xs md:text-sm text-gray-500">Total</div>
            </div>
          </div>
        </div>

        {/* Legend - full width below chart */}
        <dl className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3" aria-label="Order status breakdown">
          {statusCounts.map((item) => (
            <div
              key={item.status}
              className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg bg-gray-50"
            >
              <div
                className="w-3 h-3 md:w-4 md:h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <dt className="text-xs md:text-sm font-medium text-gray-900">
                  {item.label}
                </dt>
                <dd className="text-xs text-gray-500">
                  {item.count} ({total > 0 ? Math.round((item.count / total) * 100) : 0}%)
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default StatusChart