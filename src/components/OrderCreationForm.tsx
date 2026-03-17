/**
 * OrderCreationForm - Main form for creating new orders with accordion layout
 * Includes outlet selection, recipient info, items, package details, and delivery info
 * Integrates with MapContainer for delivery location selection
 */

import { useState, useCallback, useMemo, useEffect, lazy, Suspense } from 'react'
import { Order, Outlet, Coordinates, ServiceType } from '@/src/types'
import { calculateDistance, calculateShippingFee, isDistanceValid } from '@/src/utils/calculations'
import { useAutoSave } from '@/src/hooks/useAutoSave'
import { useOfflineStore } from '@/src/stores/offlineStore'
import { queueOrderForSync } from '@/src/services/offlineService'
import FormAccordion, { AccordionSection } from './FormAccordion'
import SummaryPanel from './SummaryPanel'
import AutoSaveIndicator from './AutoSaveIndicator'
import ConfirmationModal from './ConfirmationModal'
import OutletSelection from './form-sections/OutletSelection'
import RecipientForm from './form-sections/RecipientForm'
import ItemsForm from './form-sections/ItemsForm'
import PackageForm from './form-sections/PackageForm'
import DeliveryForm from './form-sections/DeliveryForm'

// Lazy load MapContainer to defer Google Maps API loading
const MapContainer = lazy(() => import('./MapContainer').then(module => ({ default: module.default })))

function MapContainerLoader() {
  return (
    <div className="h-[250px] sm:h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-[#ED0577] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-600">Loading map...</p>
      </div>
    </div>
  )
}

interface OrderCreationFormProps {
  outlets: Outlet[]
  onSubmit: (order: Order) => void
  onCancel: () => void
  editOrder?: Order | null
}

interface FormState {
  outletId: string
  recipientName: string
  recipientPhone: string
  recipientEmail: string
  recipientAddress: string
  deliveryCoordinates: Coordinates | null
  serviceType: ServiceType
  items: Array<{ id: string; description: string; quantity: number }>
  weight: number
  length: number
  width: number
  height: number
  isFragile: boolean
}

export function OrderCreationForm({ outlets, onSubmit, onCancel, editOrder }: OrderCreationFormProps) {
  const isEditMode = !!editOrder
  const STORAGE_KEY = isEditMode ? `order-edit-form-${editOrder.id}` : 'order-creation-form-autosave'

  // Initialize form state - use existing order data if editing
  const [formState, setFormState] = useState<FormState>({
    outletId: editOrder?.outletId || outlets[0]?.id || '',
    recipientName: editOrder?.recipient.name || '',
    recipientPhone: editOrder?.recipient.phone || '',
    recipientEmail: editOrder?.recipient.email || '',
    recipientAddress: editOrder?.recipient.address || '',
    deliveryCoordinates: editOrder?.recipient.coordinates || null,
    serviceType: editOrder?.delivery.serviceType || 'standard',
    items: editOrder?.items || [],
    weight: editOrder?.package.weight || 0,
    length: editOrder?.package.dimensions.length || 0,
    width: editOrder?.package.dimensions.width || 0,
    height: editOrder?.package.dimensions.height || 0,
    isFragile: editOrder?.package.isFragile || false,
  })

  const [distance, setDistance] = useState<number | null>(editOrder?.delivery.distance || null)
  const [shippingFee, setShippingFee] = useState<number>(editOrder?.delivery.shippingFee || 0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [createdOrderId, setCreatedOrderId] = useState<string>('')
  const { isOnline: appIsOnline } = useOfflineStore()

  // Set up auto-save
  const { lastSavedTime, isSaving, restoreData, clearSavedData } = useAutoSave(formState, {
    storageKey: STORAGE_KEY,
    interval: 30000, // 30 seconds
  })

  // Restore form data on mount
  useEffect(() => {
    const savedData = restoreData()
    if (savedData) {
      setFormState(savedData)
      // Recalculate distance and shipping fee if delivery coordinates exist
      if (savedData.deliveryCoordinates) {
        const selectedOutlet = outlets.find((o) => o.id === savedData.outletId)
        if (selectedOutlet) {
          const dist = calculateDistance(selectedOutlet.coordinates, savedData.deliveryCoordinates)
          setDistance(dist)
          const fee = calculateShippingFee(dist, savedData.serviceType)
          setShippingFee(fee)
        }
      }
    }
  }, [])

  const selectedOutlet = outlets.find((o) => o.id === formState.outletId)

  // Handle delivery location selection from map
  const handleDeliveryLocationSelect = useCallback(
    (coordinates: Coordinates) => {
      setFormState((prev) => ({
        ...prev,
        deliveryCoordinates: coordinates,
        recipientAddress: `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`,
      }))

      // Calculate distance and update shipping fee
      if (selectedOutlet) {
        const dist = calculateDistance(selectedOutlet.coordinates, coordinates)
        setDistance(dist)

        // Calculate shipping fee
        const fee = calculateShippingFee(dist, formState.serviceType)
        setShippingFee(fee)
      }
    },
    [selectedOutlet, formState.serviceType]
  )

  // Handle service type change
  const handleServiceTypeChange = (newServiceType: ServiceType) => {
    setFormState((prev) => ({
      ...prev,
      serviceType: newServiceType,
    }))

    // Recalculate shipping fee with new service type
    if (distance !== null) {
      const fee = calculateShippingFee(distance, newServiceType)
      setShippingFee(fee)
    }
  }

  // Handle item operations
  const handleAddItem = () => {
    setFormState((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: `item-${Date.now()}`,
          description: '',
          quantity: 1,
        },
      ],
    }))
  }

  const handleUpdateItem = (id: string, field: 'description' | 'quantity', value: string | number) => {
    setFormState((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }))
  }

  const handleRemoveItem = (id: string) => {
    setFormState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }))
  }

  // Build accordion sections
  const accordionSections: AccordionSection[] = useMemo(
    () => [
      {
        id: 'outlet',
        title: 'Outlet Selection',
        isValid: !!formState.outletId,
        content: (
          <OutletSelection
            outlets={outlets}
            selectedOutletId={formState.outletId}
            onChange={(outletId) => setFormState((prev) => ({ ...prev, outletId }))}
          />
        ),
      },
      {
        id: 'recipient',
        title: 'Recipient Information',
        isValid:
          !!formState.recipientName &&
          !!formState.recipientPhone &&
          !!formState.recipientEmail &&
          !!formState.deliveryCoordinates,
        content: (
          <RecipientForm
            name={formState.recipientName}
            phone={formState.recipientPhone}
            email={formState.recipientEmail}
            address={formState.recipientAddress}
            onNameChange={(value) => setFormState((prev) => ({ ...prev, recipientName: value }))}
            onPhoneChange={(value) => setFormState((prev) => ({ ...prev, recipientPhone: value }))}
            onEmailChange={(value) => setFormState((prev) => ({ ...prev, recipientEmail: value }))}
            errors={errors}
          />
        ),
      },
      {
        id: 'items',
        title: 'Items',
        isValid: formState.items.length > 0,
        content: (
          <ItemsForm
            items={formState.items}
            onAddItem={handleAddItem}
            onUpdateItem={handleUpdateItem}
            onRemoveItem={handleRemoveItem}
          />
        ),
      },
      {
        id: 'package',
        title: 'Package Details',
        content: (
          <PackageForm
            weight={formState.weight}
            length={formState.length}
            width={formState.width}
            height={formState.height}
            isFragile={formState.isFragile}
            onWeightChange={(value) => setFormState((prev) => ({ ...prev, weight: value }))}
            onLengthChange={(value) => setFormState((prev) => ({ ...prev, length: value }))}
            onWidthChange={(value) => setFormState((prev) => ({ ...prev, width: value }))}
            onHeightChange={(value) => setFormState((prev) => ({ ...prev, height: value }))}
            onFragileChange={(value) => setFormState((prev) => ({ ...prev, isFragile: value }))}
          />
        ),
      },
      {
        id: 'delivery',
        title: 'Delivery Information',
        isValid: distance !== null && isDistanceValid(distance),
        content: (
          <DeliveryForm
            serviceType={formState.serviceType}
            distance={distance}
            shippingFee={shippingFee}
            onServiceTypeChange={handleServiceTypeChange}
          />
        ),
      },
    ],
    [
      formState,
      outlets,
      distance,
      shippingFee,
      errors,
      handleAddItem,
      handleUpdateItem,
      handleRemoveItem,
      handleServiceTypeChange,
    ]
  )

  const handleConfirmOrder = () => {
    // Validate form
    if (!formState.recipientName || !formState.recipientPhone || !formState.recipientEmail || !formState.deliveryCoordinates) {
      setErrors({
        form: 'Please fill in all required fields and select a delivery location',
      })
      return
    }

    if (distance !== null && !isDistanceValid(distance)) {
      setErrors({
        form: 'Delivery location must be within 3 km radius of the outlet',
      })
      return
    }

    // Create order object
    const order: Order = {
      id: editOrder?.id || `ORD-${Date.now()}`,
      merchantId: editOrder?.merchantId || 'MERCHANT-001',
      outletId: formState.outletId,
      status: editOrder?.status || 'submitted',
      statusDisplay: editOrder?.statusDisplay || 'Shipment Created',
      invoiceNumber: editOrder?.invoiceNumber || `INV-${Date.now()}`,
      recipient: {
        name: formState.recipientName,
        phone: formState.recipientPhone,
        email: formState.recipientEmail,
        address: formState.recipientAddress,
        coordinates: formState.deliveryCoordinates!,
      },
      items: formState.items,
      package: {
        weight: formState.weight,
        dimensions: { length: formState.length, width: formState.width, height: formState.height },
        isFragile: formState.isFragile,
      },
      delivery: {
        serviceType: formState.serviceType,
        distance: distance || 0,
        shippingFee,
        baseFee: 0,
        rate: 0,
      },
      createdAt: editOrder?.createdAt || new Date(),
      updatedAt: new Date(),
    }

    // Show confirmation modal for new orders only
    if (!isEditMode) {
      setCreatedOrderId(order.id)
      setShowConfirmation(true)
    }

    // Clear auto-save data
    clearSavedData()

    // Submit order after a short delay (for modal display on new orders)
    setTimeout(() => {
      // If offline, queue the order; otherwise submit normally
      if (!appIsOnline) {
        queueOrderForSync(order)
      }
      onSubmit(order)
    }, isEditMode ? 0 : 500)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        orderId={createdOrderId}
        onClose={() => setShowConfirmation(false)}
      />

      {/* Form Section with Accordion */}
      <div className="lg:col-span-2 space-y-4 sm:space-y-6">
        {/* Auto-Save Indicator */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex items-center gap-2 order-2 sm:order-1">
            {!appIsOnline && (
              <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span className="text-sm text-yellow-700 font-medium">Offline Mode</span>
              </div>
            )}
          </div>
          <AutoSaveIndicator lastSavedTime={lastSavedTime} isSaving={isSaving} />
        </div>

        <FormAccordion sections={accordionSections} defaultOpenSection="outlet" />

        {/* Distance Validation Error */}
        {distance !== null && !isDistanceValid(distance) && (
          <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-medium text-red-700">
              Delivery location must be within 3 km radius of the outlet
            </p>
          </div>
        )}

        {/* Form Error */}
        {errors.form && (
          <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-medium text-red-700">{errors.form}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 sm:space-y-3">
          <button
            onClick={handleConfirmOrder}
            disabled={distance !== null && !isDistanceValid(distance)}
            className="w-full px-4 py-3 bg-[#ED0577] text-white rounded-lg font-medium hover:bg-[#d9066a] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors min-h-[44px] text-sm sm:text-base"
          >
            {isEditMode ? 'Update Order' : 'Confirm Order'}
          </button>
          <button
            onClick={() => {
              clearSavedData()
              onCancel()
            }}
            className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors min-h-[44px] text-sm sm:text-base"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Map and Summary Section */}
      <div className="lg:col-span-1 space-y-4 sm:space-y-6">
        {/* Map - lazy loaded with Suspense */}
        {selectedOutlet && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Suspense fallback={<MapContainerLoader />}>
              <MapContainer
                outlet={selectedOutlet}
                deliveryCoordinates={formState.deliveryCoordinates}
                onDeliveryLocationSelect={handleDeliveryLocationSelect}
                className="h-[250px] sm:h-[300px]"
              />
            </Suspense>
          </div>
        )}

        {/* Summary Panel */}
        <SummaryPanel
          outletName={selectedOutlet?.name}
          recipientName={formState.recipientName}
          recipientAddress={formState.recipientAddress}
          itemCount={formState.items.reduce((sum, item) => sum + item.quantity, 0)}
          distance={distance}
          serviceType={formState.serviceType}
          shippingFee={shippingFee}
          weight={formState.weight}
          isFragile={formState.isFragile}
        />
      </div>
    </div>
  )
}

export default OrderCreationForm
