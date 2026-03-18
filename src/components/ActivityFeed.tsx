/**
 * ActivityFeed - Recent order activity display
 * Implements accessible list with proper heading hierarchy and ARIA attributes
 */

'use client'

import { useRouter } from 'next/navigation'
import { useOrders } from '@/src/hooks/useOrders'
import { STATUS_COLORS, STATUS_DISPLAY_MAP } from '@/src/utils/constants'
import { formatRelativeTime } from '@/src/utils/formatting'
import { Clock, ChevronRight } from 'lucide-react'

export function ActivityFeed() {
  const router = useRouter()
  const { data: orders = [], isLoading, isRefetching } = useOrders()

  // Get last 10 orders sorted by creation date (newest first)
  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 10)

  const handleOrderClick = (orderId: string) => {
    router.push(`/orders/${orderId}`)
  }

  if (isLoading) {
    return (
      <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100" aria-busy="true">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="relative p-3 bg-gray-50 rounded-lg border border-gray-200 animate-pulse">
              <div className="absolute -top-1 -left-1 w-6 h-6 bg-gray-300 rounded-full" />
              <div className="flex items-start gap-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-1" />
                  <div className="h-2 bg-gray-300 rounded w-1/4" />
                </div>
                <div className="w-4 h-4 bg-gray-300 rounded mt-1" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 relative overflow-hidden" aria-labelledby="activity-feed-title">
      {isRefetching && (
        <div className="absolute inset-0 bg-gray-50/50 flex items-center justify-center z-10" role="status" aria-live="polite">
          <div className="w-8 h-8 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <header className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-gray-600" aria-hidden="true" />
        <h2 id="activity-feed-title" className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </header>

      {recentOrders.length === 0 ? (
        <div className="text-center py-4 text-gray-500" role="status">
          No recent activity
        </div>
      ) : (
        <nav aria-label="Recent orders">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            {recentOrders.map((order, index) => (
              <div key={order.id} className="relative">
                <button
                  onClick={() => handleOrderClick(order.id)}
                  className="w-full flex items-start gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left group border border-gray-200 hover:border-gray-300"
                  aria-label={`Order ${index + 1}: ${order.recipient.name}, status: ${STATUS_DISPLAY_MAP[order.status]}, created ${formatRelativeTime(order.createdAt)}`}
                >
                  {/* Number badge */}
                  <div className="absolute -top-1 -left-1 w-6 h-6 bg-[#ED0577] text-white rounded-full flex items-center justify-center text-xs font-bold z-10">
                    {index + 1}
                  </div>
                  
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${STATUS_COLORS[order.status]}20` }}
                    aria-hidden="true"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: STATUS_COLORS[order.status] }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      <span
                        className="text-sm font-semibold truncate"
                        style={{ color: STATUS_COLORS[order.status] }}
                      >
                        {STATUS_DISPLAY_MAP[order.status]}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-900 truncate mb-1">
                      {order.recipient.name}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatRelativeTime(order.createdAt)}
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 mt-1" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </nav>
      )}
    </section>
  )
}

export default ActivityFeed