/**
 * VirtualizedOrderList - Virtual scrolling container for order lists
 * Implements Requirement 13.6 - Virtual scrolling for long order lists
 * Renders only visible items to maintain 60 FPS performance
 * Supports offline mode with cached data badge
 */

'use client'

import { useRef, useCallback, useMemo } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Order } from '@/src/types'
import { OrderCard } from './OrderCard'
import { OrderTableRow } from './OrderTableRow'
import { useOffline } from '@/src/hooks/useOffline'
import { useOfflineStore } from '@/src/stores/offlineStore'

interface VirtualizedOrderListProps {
  orders: Order[]
  layout: 'card' | 'table'
  containerRef: React.RefObject<HTMLDivElement | null>
}

export function VirtualizedOrderList({ orders, layout, containerRef }: VirtualizedOrderListProps) {
  const parentRef = useRef<HTMLDivElement>(null)
  const { isOffline } = useOffline()
  const { queuedOrders } = useOfflineStore()

  // Get IDs of orders pending sync
  const pendingSyncOrderIds = useMemo(() => 
    new Set(queuedOrders.map(o => o.id)), 
    [queuedOrders]
  )

  // Use the provided containerRef or our own ref
  const effectiveRef = containerRef || parentRef

  // Estimate item height based on layout
  // Card view: ~180px per item, Table view: ~60px per item
  const estimateSize = useCallback(() => {
    return layout === 'card' ? 180 : 60
  }, [layout])

  const rowVirtualizer = useVirtualizer({
    count: orders.length,
    getScrollElement: () => effectiveRef.current,
    estimateSize,
    overscan: 5, // Render 5 items outside viewport for smooth scrolling
  })

  if (orders.length === 0) {
    return null
  }

  if (layout === 'card') {
    return (
      <div
        ref={effectiveRef as React.RefObject<HTMLDivElement>}
        className="h-full overflow-y-auto"
        style={{ contain: 'strict' }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <OrderCard 
                order={orders[virtualItem.index]} 
                isOffline={isOffline}
                isPendingSync={pendingSyncOrderIds.has(orders[virtualItem.index].id)}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Table layout
  return (
    <div
      ref={effectiveRef as React.RefObject<HTMLDivElement>}
      className="overflow-x-auto overflow-y-auto"
      style={{ contain: 'strict' }}
    >
      <div className="min-w-full inline-block align-middle">
        <table className="w-full border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">
                Order ID
              </th>
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 hidden sm:table-cell">
                Recipient
              </th>
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">
                Distance
              </th>
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">
                Fee
              </th>
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 hidden md:table-cell">
                Date
              </th>
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rowVirtualizer.getVirtualItems().map((virtualItem) => (
              <tr
                key={virtualItem.key}
                style={{
                  height: `${virtualItem.size}px`,
                }}
              >
                <OrderTableRow 
                  order={orders[virtualItem.index]} 
                  isOffline={isOffline}
                  isPendingSync={pendingSyncOrderIds.has(orders[virtualItem.index].id)}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default VirtualizedOrderList