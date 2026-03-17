/**
 * Component exports
 */

// Common components
export { EmptyState, EmptyOrderList, EmptyOutlets, OfflineState } from './EmptyState'
export { ErrorBoundary, AsyncErrorBoundary, createErrorBoundary } from './ErrorBoundary'
export { StorageErrorDisplay, useStorageError } from './StorageErrorDisplay'

// Layout components
export { default as Header } from './Header'
export { default as Sidebar } from './Sidebar'
export { default as MainLayout } from './MainLayout'

// Form components
export { default as FormAccordion } from './FormAccordion'
export { default as FilterBar } from './FilterBar'
export { default as Pagination } from './Pagination'
export { default as LayoutToggle } from './LayoutToggle'

// Order components
export { default as OrderCard } from './OrderCard'
export { default as OrderTableRow } from './OrderTableRow'
export { default as OrderHeader } from './OrderHeader'
export { default as OrderCreationForm } from './OrderCreationForm'
export { default as RecipientInfo } from './RecipientInfo'
export { default as DeliveryInfo } from './DeliveryInfo'
export { default as SummaryPanel } from './SummaryPanel'
export { default as ShippingFeeBreakdown } from './ShippingFeeBreakdown'
export { default as CancelOrderDialog } from './CancelOrderDialog'
export { default as VirtualizedOrderList } from './VirtualizedOrderList'

// Map components
export { default as MapContainer } from './MapContainer'

// Dashboard components
export { default as KPICards } from './KPICards'
export { default as StatusChart } from './StatusChart'
export { default as ActivityFeed } from './ActivityFeed'

// Auth components
export { default as ProtectedRoute } from './ProtectedRoute'
export { default as AutoSaveIndicator } from './AutoSaveIndicator'

// PWA components
export { default as OfflineIndicator } from './OfflineIndicator'
export { default as OfflineInitializer } from './OfflineInitializer'
export { default as PWAInstallPrompt } from './PWAInstallPrompt'
export { default as ServiceWorkerInitializer } from './ServiceWorkerInitializer'
export { default as SplashScreen } from './SplashScreen'

// Form section components
export { default as OutletSelection } from './form-sections/OutletSelection'
export { default as RecipientForm } from './form-sections/RecipientForm'
export { default as ItemsForm } from './form-sections/ItemsForm'
export { default as PackageForm } from './form-sections/PackageForm'
export { default as DeliveryForm } from './form-sections/DeliveryForm'

// Confirmation modal
export { default as ConfirmationModal } from './ConfirmationModal'