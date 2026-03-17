'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { OrderCreationForm } from '@/src/components/OrderCreationForm'
import { useCreateOrder } from '@/src/hooks/useCreateOrder'
import { useUpdateOrder } from '@/src/hooks/useUpdateOrder'
import { useOrderById } from '@/src/hooks/useOrderById'
import { Order, Outlet } from '@/src/types'
import { useOfflineStore } from '@/src/stores/offlineStore'

interface CreateOrderContentProps {
  outlets: Outlet[]
  isLoading: boolean
}

export function CreateOrderContent({ outlets, isLoading }: CreateOrderContentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editOrderId = searchParams.get('edit')
  const isEditMode = !!editOrderId

  const { mutate: createOrder, isPending: isCreating } = useCreateOrder()
  const { mutate: updateOrder, isPending: isUpdating } = useUpdateOrder()
  const { data: existingOrder, isLoading: isLoadingOrder } = useOrderById(editOrderId || undefined)
  const { isOnline } = useOfflineStore()

  const handleSubmit = (order: Order) => {
    if (!isOnline) {
      router.push('/orders')
      return
    }

    if (isEditMode && existingOrder) {
      updateOrder(
        { id: existingOrder.id, updates: order },
        {
          onSuccess: () => {
            router.push('/orders')
          },
          onError: (error) => {
            console.error('Failed to update order:', error)
          },
        }
      )
    } else {
      createOrder(order, {
        onSuccess: () => {
          router.push('/orders')
        },
        onError: (error) => {
          console.error('Failed to create order:', error)
        },
      })
    }
  }

  const handleCancel = () => {
    router.push('/dashboard')
  }

  if (isLoading || (isEditMode && isLoadingOrder)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#ED0577] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (isEditMode && !existingOrder) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">Order not found</p>
          <button
            onClick={() => router.push('/orders')}
            className="px-4 py-2 bg-[#ED0577] text-white rounded-lg hover:bg-[#d9066a] transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {isEditMode ? 'Edit Order' : 'Create New Order'}
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          {isEditMode ? 'Update order details below' : 'Click on the map to select a delivery location'}
        </p>
        {!isOnline && (
          <p className="text-yellow-700 mt-2 text-xs sm:text-sm">
            You are offline. Orders will be queued and synced when connectivity is restored.
          </p>
        )}
      </div>

      {(isCreating || isUpdating) && (
        <div className="mb-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            {isUpdating ? 'Updating order...' : 'Creating order...'}
          </p>
        </div>
      )}

      <OrderCreationForm
        outlets={outlets}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        editOrder={isEditMode ? existingOrder || undefined : undefined}
      />
    </div>
  )
}
