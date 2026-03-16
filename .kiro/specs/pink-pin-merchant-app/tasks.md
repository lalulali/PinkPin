# Implementation Plan: Pink Pin Merchant App

## Overview

This implementation plan breaks down the Pink Pin Merchant App into discrete, testable tasks organized by feature area. Tasks follow a logical development sequence: foundation → authentication → core features → completeness → polish. Each task builds on previous steps with integrated testing throughout.

## Phase 1: Foundation and Infrastructure

- [x] 1. Set up project structure and core dependencies
  - Initialize React + TypeScript project with Vite
  - Install core dependencies: TanStack Query, Zustand, Tailwind CSS, Google Maps API
  - Set up ESLint, Prettier, and TypeScript configuration
  - Create directory structure: src/components, src/pages, src/hooks, src/stores, src/services, src/types, src/utils
  - _Requirements: 1.1, 1.2, 1.3_
  - _Complexity: Medium_

- [x] 2. Define core data models and types
  - Create TypeScript interfaces for Order, Merchant, Outlet, Recipient, Item, Package, Delivery
  - Define status enums and service type enums
  - Create validation utility functions for email, phone, required fields
  - _Requirements: 1.1, 3.1, 3.2, 3.3, 3.4_
  - _Complexity: Small_

- [x] 3. Implement Storage Adapter pattern
  - Create StorageAdapter interface with CRUD methods for orders, merchants, outlets
  - Implement LocalStorageAdapter class implementing StorageAdapter interface
  - Create adapter factory function to switch between implementations
  - Add TypeScript types for all adapter methods
  - _Requirements: 1.6, 1.7, 1.8_
  - _Complexity: Medium_

- [ ]* 3.1 Write property test for Storage Adapter round-trip
  - **Property 2: Order Persistence Round Trip**
  - **Validates: Requirements 1.4, 1.5**

- [x] 4. Initialize sample data and localStorage
  - Generate 10-15 sample orders with various statuses, service types, and dates
  - Create sample merchants and outlets
  - Implement initialization logic that runs on first app load
  - Ensure sample data spans multiple dates for filtering tests
  - _Requirements: 1.1, 1.2, 1.3_
  - _Complexity: Medium_

- [x] 4.1 Write property test for sample data initialization
  - **Property 1: Sample Data Initialization**
  - **Validates: Requirements 1.1, 1.2, 1.3**

- [x] 5. Set up TanStack Query for server state management
  - Configure QueryClient with appropriate stale time (5 minutes) and retry logic
  - Create custom hooks: useOrders(), useOrderById(), useCreateOrder(), useUpdateOrder(), useDeleteOrder()
  - Implement cache invalidation on mutations
  - Set up QueryClientProvider in App component
  - _Requirements: 2.1, 2.3_
  - _Complexity: Medium_

- [ ]* 5.1 Write property test for cache invalidation
  - **Property 3: Cache Invalidation on Mutation**
  - **Validates: Requirements 2.3**

- [x] 6. Set up Zustand for client state management
  - Create Zustand store for UI state: filters, sort, layout, pagination
  - Implement localStorage persistence for UI state
  - Create custom hooks for accessing and updating UI state
  - _Requirements: 2.2, 2.4, 2.5_
  - _Complexity: Medium_

- [ ]* 6.1 Write property test for UI state persistence
  - **Property 5: UI State Persistence**
  - **Validates: Requirements 2.5**

- [x] 7. Checkpoint - Verify foundation setup
  - Ensure all types compile without errors
  - Verify storage adapter can create, read, update, delete orders
  - Verify TanStack Query and Zustand are properly configured
  - Run all foundation property tests
  - _Complexity: Small_


## Phase 2: Authentication and Session Management

- [x] 8. Create authentication service and types
  - Define AuthContext and useAuth hook
  - Create authentication service with login, logout, validateToken methods
  - Implement mock credential validation (demo@pinkpin.com / demo123)
  - Create session token generation and validation logic
  - _Requirements: 5.1, 5.2, 5.5, 6.1, 6.2_
  - _Complexity: Medium_

- [ ] 9. Implement login page and form
  - Create LoginPage component with email and password fields
  - Add CAPTCHA checkbox ("I'm not a robot") - always passes in prototype
  - Implement form validation with error messages
  - Add loading state and error handling
  - Redirect to dashboard on successful login
  - _Requirements: 5.1, 5.3, 5.4, 3.1, 3.2, 3.3_
  - _Complexity: Medium_

- [ ]* 9.1 Write property test for form validation
  - **Property 6: Form Validation**
  - **Validates: Requirements 3.1, 3.4**

- [ ] 10. Implement session token storage and management
  - Store authentication token securely in localStorage
  - Implement token expiration logic (7 days)
  - Create token refresh mechanism on activity
  - Add logout functionality to clear session data
  - _Requirements: 6.1, 6.2, 6.3_
  - _Complexity: Small_

- [ ]* 10.1 Write property test for session persistence
  - **Property 16: Session Persistence**
  - **Validates: Requirements 5.6, 6.1, 6.3**

- [ ] 11. Create protected route wrapper and redirect logic
  - Implement ProtectedRoute component that checks for valid token
  - Redirect unauthenticated users to login page
  - Preserve intended destination for post-login redirect
  - _Requirements: 6.4_
  - _Complexity: Small_

- [ ]* 11.1 Write property test for protected route access
  - **Property 17: Protected Route Access**
  - **Validates: Requirements 6.4**

- [ ] 12. Create layout components (Header, Sidebar, MainLayout)
  - Build Header component with logo, user menu, logout button
  - Build Sidebar component with navigation links
  - Create MainLayout wrapper for authenticated pages
  - Implement responsive layout for mobile/tablet/desktop
  - _Requirements: 4.1, 4.2, 4.3, 4.4_
  - _Complexity: Medium_

- [ ] 13. Checkpoint - Verify authentication flow
  - Test login with valid credentials
  - Test login with invalid credentials
  - Test session persistence across page reloads
  - Test logout clears session
  - Test protected routes redirect to login
  - Run all authentication property tests
  - _Complexity: Small_


## Phase 3: Map Integration and Distance Calculation

- [ ] 14. Set up Google Maps API integration
  - Load Google Maps API with geometry library
  - Create MapContainer component with initialization logic
  - Implement map centering on outlet coordinates
  - Set zoom level to 15 (street level)
  - Add error handling for map load failures
  - _Requirements: 7.1, 7.8_
  - _Complexity: Medium_

- [ ] 15. Implement map markers and route visualization
  - Create outlet marker (blue pin) with outlet icon
  - Create delivery marker (red pin) with destination icon
  - Draw polyline route between outlet and delivery location
  - Implement marker click handlers for location selection
  - Add responsive marker sizing for mobile
  - _Requirements: 7.6, 7.7_
  - _Complexity: Medium_

- [ ]* 15.1 Write property test for map marker display
  - **Property 18: Map Marker Display**
  - **Validates: Requirements 7.6, 7.7**

- [ ] 16. Implement distance calculation using Google Geometry library
  - Create distance calculation utility using haversine formula
  - Calculate great-circle distance between outlet and delivery coordinates
  - Format distance with 1 decimal place precision
  - Handle calculation errors with fallback values
  - _Requirements: 7.3, 7.4, 7.5_
  - _Complexity: Small_

- [ ]* 16.1 Write property test for distance calculation consistency
  - **Property 7: Distance Calculation**
  - **Validates: Requirements 7.3, 7.4, 7.5**

- [ ] 17. Implement map click-to-select delivery location
  - Add click event listener to map
  - Update delivery location marker on click
  - Update delivery address field with clicked coordinates
  - Trigger distance recalculation on location change
  - _Requirements: 7.2, 7.5_
  - _Complexity: Small_

- [ ] 18. Create fallback address input for map failures
  - Implement address input field as map fallback
  - Add geocoding fallback for manual address entry
  - Create retry button to attempt map reload
  - Display user-friendly error messages
  - _Requirements: 3.5, 3.6, 3.7_
  - _Complexity: Medium_

- [ ] 19. Checkpoint - Verify map integration
  - Test map loads and displays correctly
  - Test outlet marker displays at correct location
  - Test clicking map updates delivery location
  - Test distance calculation is accurate
  - Test distance updates in real-time on location change
  - Test map error handling and fallback
  - _Complexity: Small_


## Phase 4: Shipping Fee Calculation

- [ ] 20. Implement shipping fee calculation logic
  - Create fee calculation utility: base_fee + (distance * rate)
  - Define service type rates: Standard (10000 base, 5000/km), Express (20000 base, 7500/km), Same-Day (30000 base, 10000/km)
  - Handle edge cases: zero distance, invalid service type
  - Format fees as currency with 2 decimal places
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.7_
  - _Complexity: Small_

- [ ]* 20.1 Write property test for shipping fee calculation
  - **Property 8: Shipping Fee Calculation**
  - **Validates: Requirements 8.1, 8.5, 8.6, 8.7**

- [ ] 21. Create shipping fee breakdown component
  - Display base fee, distance, rate, and total in breakdown format
  - Update breakdown in real-time as distance or service type changes
  - Format all values as currency
  - _Requirements: 8.1, 8.5, 8.6_
  - _Complexity: Small_

- [ ] 22. Implement distance validation (3 km limit)
  - Create validation function to check distance <= 3 km
  - Display error message if distance exceeds 3 km
  - Prevent order confirmation when distance exceeds limit
  - _Requirements: 9.4, 9.5_
  - _Complexity: Small_

- [ ]* 22.1 Write property test for distance validation
  - **Property 9: Distance Validation**
  - **Validates: Requirements 9.4, 9.5**

- [ ] 23. Checkpoint - Verify shipping calculations
  - Test fee calculation for each service type
  - Test fee updates when distance changes
  - Test fee updates when service type changes
  - Test distance validation prevents orders > 3 km
  - Test fee breakdown displays correctly
  - _Complexity: Small_


## Phase 5: Order Creation Flow

- [ ] 24. Create order creation page layout with accordion form
  - Build FormAccordion component with collapsible sections
  - Create sections: outlet selection, recipient info, items, package details, delivery info
  - Implement accordion state management (which section is open)
  - Add live summary panel pinned on right side (mobile: below form)
  - _Requirements: 9.1_
  - _Complexity: Medium_

- [ ] 25. Implement outlet selection section
  - Create outlet selector dropdown/list
  - Display selected outlet on map
  - Update map center and zoom to outlet location
  - _Requirements: 9.2_
  - _Complexity: Small_

- [ ] 26. Implement recipient information form section
  - Create form fields: name, phone, email, address
  - Add real-time validation with error messages
  - Validate email format, phone format, required fields
  - _Requirements: 9.6, 3.1, 3.2, 3.3, 3.4_
  - _Complexity: Small_

- [ ]* 26.1 Write unit tests for recipient validation
  - Test email validation with various formats
  - Test phone validation with various formats
  - Test required field validation
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 27. Implement items form section
  - Create form to add multiple items with description and quantity
  - Display item list with total count
  - Allow edit and delete for each item
  - _Requirements: 9.7_
  - _Complexity: Small_

- [ ] 28. Implement package details form section
  - Create form fields: weight, dimensions (length, width, height), fragile flag
  - Add validation for numeric values
  - _Requirements: 9.8_
  - _Complexity: Small_

- [ ] 29. Implement delivery information form section
  - Create service type selector (standard, express, same-day)
  - Display distance and shipping fee (calculated from map)
  - Show fee breakdown
  - _Requirements: 9.9, 9.10_
  - _Complexity: Small_

- [ ] 30. Implement map panel for order creation
  - Display interactive map with outlet and delivery markers
  - Allow clicking map to select delivery location
  - Update delivery address field on map click
  - Recalculate distance and fee on location change
  - _Requirements: 9.3, 7.2, 7.5_
  - _Complexity: Medium_

- [ ] 31. Implement live summary panel
  - Display order summary with all details
  - Update summary in real-time as form changes
  - Show order total, shipping fee, item count
  - Pin summary panel on right side (mobile: below form)
  - _Requirements: 9.11_
  - _Complexity: Medium_

- [ ] 32. Implement form auto-save functionality
  - Auto-save form data to localStorage every 30 seconds
  - Restore form data on page reload
  - Show auto-save indicator
  - _Requirements: 9.14_
  - _Complexity: Small_

- [ ]* 32.1 Write property test for auto-save functionality
  - **Property 11: Auto-Save Functionality**
  - **Validates: Requirements 9.14**

- [ ] 33. Implement order confirmation and creation
  - Create "Confirm Order" button that validates all fields
  - Save order to storage via adapter
  - Display success confirmation with order ID
  - Redirect to order history or dashboard
  - _Requirements: 9.12_
  - _Complexity: Small_

- [ ]* 33.1 Write property test for order creation persistence
  - **Property 10: Order Creation Persistence**
  - **Validates: Requirements 9.12**

- [ ] 34. Implement cancel functionality
  - Create "Cancel" button that discards form data
  - Return to dashboard without saving
  - _Requirements: 9.13_
  - _Complexity: Small_

- [ ] 35. Implement offline order creation and queueing
  - Detect offline status
  - Allow order creation while offline
  - Queue orders for sync when connectivity restored
  - Display offline indicator
  - _Requirements: 9.15, 14.2, 14.3_
  - _Complexity: Medium_

- [ ]* 35.1 Write property test for offline order creation
  - **Property 23: Offline Order Creation**
  - **Validates: Requirements 9.15, 14.2, 14.3**

- [ ] 36. Checkpoint - Verify order creation flow
  - Test complete order creation with all fields
  - Test validation errors display correctly
  - Test distance validation prevents orders > 3 km
  - Test order saves to storage
  - Test auto-save persists form data
  - Test offline order creation and queueing
  - Run all order creation property tests
  - _Complexity: Small_


## Phase 6: Order History and Filtering

- [ ] 37. Create order history page layout
  - Build page with filter bar at top
  - Create layout toggle (card view / table view)
  - Implement paginated order list (20 per page)
  - Add empty state message when no orders match filters
  - _Requirements: 10.1, 10.8, 10.15_
  - _Complexity: Medium_

- [ ] 38. Implement filter bar component
  - Create date range filter (from/to dates)
  - Create status filter (multi-select: submitted, waiting, closed, cancelled)
  - Create outlet filter (dropdown)
  - Create service type filter (multi-select: standard, express, same-day)
  - Create invoice number search field
  - _Requirements: 10.2, 10.3, 10.4, 10.5, 10.6_
  - _Complexity: Medium_

- [ ]* 38.1 Write property test for filter application
  - **Property 4: Filter Application**
  - **Validates: Requirements 2.4, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7**

- [ ] 39. Implement filter logic with AND combination
  - Apply all active filters in combination (AND logic)
  - Update order list when filters change
  - Persist filter state to Zustand store
  - _Requirements: 10.7_
  - _Complexity: Small_

- [ ] 40. Create order card component
  - Display order ID, status badge, recipient name, distance, shipping fee
  - Show action buttons: edit, cancel, see detail
  - Implement hover state to show action buttons
  - _Requirements: 10.9_
  - _Complexity: Small_

- [ ] 41. Create order table/row component
  - Display order data in table format
  - Include columns: ID, status, recipient, distance, fee, date, actions
  - Implement sortable columns
  - _Requirements: 10.8_
  - _Complexity: Small_

- [ ] 42. Implement layout toggle (card/table view)
  - Create toggle button to switch between card and table views
  - Persist layout preference to Zustand store
  - _Requirements: 10.8_
  - _Complexity: Small_

- [ ] 43. Implement sorting functionality
  - Add sort by date (ascending/descending)
  - Add sort by status (grouped and sorted)
  - Persist sort preference to Zustand store
  - _Requirements: 10.13, 10.14_
  - _Complexity: Small_

- [ ] 44. Implement pagination
  - Display 20 orders per page
  - Create pagination controls (previous, next, page numbers)
  - Update page when pagination controls clicked
  - _Requirements: 10.1, 12.1_
  - _Complexity: Small_

- [ ]* 44.1 Write property test for pagination
  - **Property 12: Pagination**
  - **Validates: Requirements 10.1**

- [ ] 45. Implement edit order functionality
  - Create edit button on order cards
  - Open order in edit mode with all fields editable
  - Allow editing only pending orders
  - Save changes to storage
  - _Requirements: 10.10_
  - _Complexity: Medium_

- [ ] 46. Implement cancel order functionality
  - Create cancel button on order cards
  - Display confirmation dialog before cancelling
  - Mark order as cancelled in storage
  - Update order list after cancellation
  - _Requirements: 10.11_
  - _Complexity: Small_

- [ ] 47. Implement "See Detail" navigation
  - Create detail button on order cards
  - Navigate to order detail page
  - Preserve filter and sort state for back button
  - _Requirements: 10.12_
  - _Complexity: Small_

- [ ] 48. Checkpoint - Verify order history and filtering
  - Test all filters work individually
  - Test multiple filters work in combination (AND logic)
  - Test layout toggle switches between card and table
  - Test sorting by date and status
  - Test pagination displays 20 orders per page
  - Test edit, cancel, and detail buttons work
  - Test empty state displays when no orders match
  - Run all filtering property tests
  - _Complexity: Small_


## Phase 7: Order Detail View

- [ ] 49. Create order detail page layout
  - Display order header with ID, status, creation date
  - Display sections: recipient info, items list, package details, delivery info, shipping fee breakdown
  - Add back button that preserves filter/sort state
  - _Requirements: 11.1, 11.2, 11.7_
  - _Complexity: Medium_

- [ ] 50. Implement order header section
  - Display order ID, status badge with color coding
  - Display creation date and last updated date
  - Show status display text (Shipment Created, Waiting for Pick Up, etc.)
  - _Requirements: 11.1, 11.4_
  - _Complexity: Small_

- [ ]* 50.1 Write property test for status badge colors
  - **Property 13: Status Badge Colors**
  - **Validates: Requirements 4.7, 11.4**

- [ ] 51. Implement recipient information section
  - Display recipient name, phone, email, address
  - Format phone and email as clickable links
  - _Requirements: 11.2_
  - _Complexity: Small_

- [ ] 52. Implement items list section
  - Display all items with description and quantity
  - Show total item count
  - _Requirements: 11.2_
  - _Complexity: Small_

- [ ] 53. Implement package details section
  - Display weight, dimensions (length x width x height), fragile flag
  - Format dimensions clearly
  - _Requirements: 11.2_
  - _Complexity: Small_

- [ ] 54. Implement delivery information section
  - Display service type, distance, outlet name
  - Display delivery status and tracking info if available
  - _Requirements: 11.2, 11.6_
  - _Complexity: Small_

- [ ] 55. Implement shipping fee breakdown section
  - Display base fee, distance, rate, and total
  - Format all values as currency
  - Show calculation formula
  - _Requirements: 11.2, 11.5_
  - _Complexity: Small_

- [ ] 56. Implement map view on order detail
  - Display map showing outlet origin and delivery destination
  - Draw route line between outlet and delivery location
  - Center map appropriately
  - _Requirements: 11.3_
  - _Complexity: Medium_

- [ ]* 56.1 Write property test for order detail sections
  - **Property 19: Order Detail Sections**
  - **Validates: Requirements 11.2**

- [ ] 57. Implement back button with state preservation
  - Create back button that returns to order history
  - Preserve previous filter and sort state
  - Restore scroll position if possible
  - _Requirements: 11.7_
  - _Complexity: Small_

- [ ] 58. Implement data refresh on page load
  - Fetch latest order data from storage on page load
  - Handle loading and error states
  - _Requirements: 11.8_
  - _Complexity: Small_

- [ ] 59. Checkpoint - Verify order detail view
  - Test all sections display correctly
  - Test status badge displays correct color
  - Test map displays with markers and route
  - Test back button returns to history with state preserved
  - Test data refreshes on page load
  - Run all order detail property tests
  - _Complexity: Small_


## Phase 8: Dashboard Implementation

- [ ] 60. Create dashboard page layout
  - Display KPI cards in grid (1 col mobile, 3 col desktop)
  - Display order status distribution chart below KPI cards
  - Display recent activity feed below chart
  - _Requirements: 12.1, 12.5, 12.6, 12.7_
  - _Complexity: Medium_

- [ ] 61. Implement KPI cards component
  - Create card for today's order volume
  - Create card for active shipments count
  - Create card for delivery success rate
  - Display with icons and color coding (green for positive)
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_
  - _Complexity: Small_

- [ ]* 61.1 Write property test for KPI calculation
  - **Property 20: Dashboard KPI Calculation**
  - **Validates: Requirements 12.1, 12.2, 12.3, 12.4**

- [ ] 62. Implement order status distribution chart
  - Create pie or bar chart showing order counts by status
  - Display counts for: submitted, waiting, closed, cancelled
  - Use status colors for chart segments
  - _Requirements: 12.6_
  - _Complexity: Medium_

- [ ] 63. Implement activity feed component
  - Display last 10 orders with status, recipient name, timestamp
  - Format timestamps as relative time (e.g., "2 hours ago")
  - Make orders clickable to navigate to detail page
  - _Requirements: 12.7, 12.8_
  - _Complexity: Small_

- [ ]* 63.1 Write property test for activity feed display
  - **Property 21: Activity Feed Display**
  - **Validates: Requirements 12.7**

- [ ] 64. Implement responsive dashboard layout
  - Stack KPI cards vertically on mobile
  - Adjust chart sizes for mobile readability
  - Adjust activity feed for mobile
  - _Requirements: 12.9_
  - _Complexity: Small_

- [ ] 65. Implement automatic data refresh
  - Refresh dashboard data every 5 minutes
  - Refresh on page focus (when user returns to tab)
  - Show loading state during refresh
  - _Requirements: 12.10_
  - _Complexity: Small_

- [ ] 66. Checkpoint - Verify dashboard
  - Test KPI cards display correct values
  - Test chart displays all statuses
  - Test activity feed shows last 10 orders
  - Test responsive layout on mobile/tablet/desktop
  - Test automatic refresh works
  - Run all dashboard property tests
  - _Complexity: Small_


## Phase 9: Responsive Design and Accessibility

- [ ] 67. Implement responsive design with Tailwind CSS
  - Use Tailwind responsive classes (sm:, md:, lg:) throughout
  - Test layouts on mobile (320px), tablet (768px), desktop (1024px+)
  - Ensure single column on mobile, multi-column on larger screens
  - _Requirements: 4.1, 4.2, 4.3, 4.5_
  - _Complexity: Medium_

- [ ]* 67.1 Write property test for responsive layout
  - **Property 14: Responsive Layout**
  - **Validates: Requirements 4.1, 4.2, 4.3**

- [ ] 68. Implement tap target sizing
  - Ensure all buttons, form fields, links are at least 44px × 44px
  - Add padding to smaller elements to meet minimum size
  - Test on mobile devices
  - _Requirements: 4.4, 4.15_
  - _Complexity: Small_

- [ ]* 68.1 Write property test for tap target size
  - **Property 15: Tap Target Size**
  - **Validates: Requirements 4.4**

- [ ] 69. Implement color scheme and status colors
  - Use primary color #ED0577 (magenta) for interactive elements
  - Use status colors: blue for submitted, orange for waiting, green for closed, red for cancelled
  - Apply colors consistently throughout app
  - _Requirements: 4.6, 4.7_
  - _Complexity: Small_

- [ ] 70. Implement focus states and keyboard navigation
  - Add visible focus indicators on all interactive elements
  - Ensure keyboard navigation works throughout app
  - Test with keyboard only (no mouse)
  - _Requirements: 4.8_
  - _Complexity: Medium_

- [ ] 71. Implement semantic HTML and ARIA attributes
  - Use proper heading hierarchy (h1, h2, h3)
  - Add form labels for all inputs
  - Add ARIA attributes where needed (aria-label, aria-describedby, etc.)
  - Use semantic elements (button, nav, main, etc.)
  - _Requirements: 4.9_
  - _Complexity: Medium_

- [ ] 72. Checkpoint - Verify responsive design and accessibility
  - Test layout on mobile, tablet, desktop
  - Test all tap targets are at least 44px
  - Test color contrast meets WCAG AA (4.5:1)
  - Test keyboard navigation works
  - Test semantic HTML is correct
  - Run all responsive design property tests
  - _Complexity: Small_


## Phase 10: Performance Optimization

- [ ] 73. Implement code splitting by route
  - Split code for Dashboard, OrderHistory, OrderDetail, OrderCreation routes
  - Load route code on demand using React.lazy and Suspense
  - Show loading indicator while route code loads
  - _Requirements: 13.4_
  - _Complexity: Medium_

- [ ] 74. Implement lazy loading for non-critical components
  - Lazy load Google Maps API only when needed (order creation, detail)
  - Lazy load chart library only when dashboard accessed
  - Lazy load images if applicable
  - _Requirements: 13.4_
  - _Complexity: Small_

- [ ] 75. Implement virtual scrolling for long order lists
  - Use virtual scrolling library for order lists with 100+ orders
  - Render only visible items to maintain performance
  - Maintain smooth scrolling at 60 FPS
  - _Requirements: 13.6_
  - _Complexity: Medium_

- [ ] 76. Optimize bundle size and initial load
  - Analyze bundle size with webpack-bundle-analyzer
  - Remove unused dependencies
  - Minify and compress assets
  - Target initial load under 3 seconds on 4G
  - _Requirements: 13.1_
  - _Complexity: Medium_

- [ ]* 76.1 Write property test for performance load time
  - **Property 24: Performance Load Time**
  - **Validates: Requirements 13.1**

- [ ] 77. Implement filter update performance optimization
  - Optimize filter logic to update display in under 200ms
  - Use memoization and useMemo hooks
  - Debounce filter input if needed
  - _Requirements: 13.3_
  - _Complexity: Small_

- [ ]* 77.1 Write property test for filter update performance
  - **Property 25: Filter Update Performance**
  - **Validates: Requirements 13.3**

- [ ] 78. Implement caching strategy
  - Set appropriate cache headers for static assets
  - Use TanStack Query caching (5 minute stale time)
  - Implement browser cache for images and fonts
  - _Requirements: 13.2_
  - _Complexity: Small_

- [ ] 79. Checkpoint - Verify performance
  - Run Lighthouse audit and verify Performance score >= 90
  - Test initial load time < 3 seconds on 4G
  - Test filter updates < 200ms
  - Test page transitions < 500ms
  - Run all performance property tests
  - _Complexity: Small_


## Phase 11: Progressive Web App Implementation

- [ ] 80. Create service worker for offline support
  - Register service worker on app load
  - Implement cache-first strategy for static assets (HTML, CSS, JS, fonts)
  - Implement network-first strategy for API calls
  - Handle service worker updates
  - _Requirements: 14.1_
  - _Complexity: Medium_

- [ ]* 80.1 Write property test for service worker registration
  - **Property 22: Service Worker Registration**
  - **Validates: Requirements 14.1**

- [ ] 81. Implement offline order viewing
  - Allow viewing previously loaded orders when offline
  - Display offline indicator
  - Show cached data with "offline" badge
  - _Requirements: 14.2_
  - _Complexity: Small_

- [ ] 82. Implement offline order creation and queueing
  - Allow creating new orders while offline
  - Queue orders in localStorage for sync
  - Display queued orders with "pending sync" indicator
  - _Requirements: 14.2, 14.3_
  - _Complexity: Medium_

- [ ] 83. Implement automatic sync when connectivity restored
  - Detect when connectivity is restored
  - Automatically sync queued orders to storage
  - Update UI to show sync status
  - Handle sync errors with retry logic
  - _Requirements: 14.3_
  - _Complexity: Medium_

- [ ] 84. Create web app manifest
  - Define app name: "Pink Pin Merchant"
  - Define short name: "Pink Pin"
  - Add icons: 192px and 512px
  - Set theme color: #ED0577
  - Set background color: #FFFFFF
  - Set display: standalone
  - _Requirements: 14.4, 14.5, 14.6_
  - _Complexity: Small_

- [ ] 85. Implement "Add to Home Screen" prompt
  - Display prompt on mobile devices
  - Allow users to install app to home screen
  - Handle install success and failure
  - _Requirements: 14.4_
  - _Complexity: Small_

- [ ] 86. Implement splash screen and full-screen mode
  - Display splash screen with Pink Pin branding on launch
  - Hide browser address bar in full-screen mode
  - Support standalone mode
  - _Requirements: 14.5, 14.6_
  - _Complexity: Small_

- [ ] 87. Checkpoint - Verify PWA capabilities
  - Test service worker registers and caches assets
  - Test offline viewing of orders
  - Test offline order creation and queueing
  - Test automatic sync when online
  - Test "Add to Home Screen" prompt appears
  - Test splash screen displays on launch
  - Run Lighthouse PWA audit and verify score >= 90
  - _Complexity: Small_


## Phase 12: Error Handling and Edge Cases

- [ ] 88. Implement comprehensive error boundaries
  - Wrap Dashboard, OrderHistory, OrderDetail, OrderCreation in error boundaries
  - Display error UI with retry option
  - Log errors to console for debugging
  - Prevent full app crash from component errors
  - _Requirements: 3.5, 3.7_
  - _Complexity: Medium_

- [ ] 89. Implement storage error handling
  - Display user-friendly error message on storage failures
  - Log error details with timestamp and operation type
  - Provide "Retry" button to attempt operation again
  - Show cached data if available
  - _Requirements: 3.5, 3.7_
  - _Complexity: Small_

- [ ] 90. Implement map error handling
  - Display fallback address input field if map fails to load
  - Allow manual address entry with geocoding fallback
  - Provide "Retry" button to reload map
  - _Requirements: 3.6, 3.7_
  - _Complexity: Small_

- [ ] 91. Implement form validation error messages
  - Display field-level error messages below fields
  - Display form-level error summary at top
  - Validate on blur and change events
  - Use specific, actionable error text
  - _Requirements: 3.1, 3.2, 3.3, 3.4_
  - _Complexity: Small_

- [ ] 92. Implement network error handling
  - Detect network failures
  - Display offline indicator
  - Queue operations for retry when online
  - Show user-friendly error messages
  - _Requirements: 3.5, 3.7_
  - _Complexity: Medium_

- [ ] 93. Implement edge case handling
  - Handle empty order lists
  - Handle missing outlet data
  - Handle invalid coordinates
  - Handle zero distance calculations
  - Handle currency formatting edge cases
  - _Requirements: 3.1, 3.5, 3.7_
  - _Complexity: Medium_

- [ ] 94. Checkpoint - Verify error handling
  - Test storage error displays message and retry works
  - Test map error displays fallback and retry works
  - Test form validation errors display correctly
  - Test network errors handled gracefully
  - Test edge cases handled without crashes
  - _Complexity: Small_


## Phase 13: Testing and Quality Assurance

- [ ] 95. Set up testing infrastructure
  - Configure Vitest as test runner
  - Install fast-check for property-based testing
  - Set up test utilities and helpers
  - Configure code coverage reporting
  - _Complexity: Small_

- [ ] 96. Write unit tests for utility functions
  - Test validation functions (email, phone, required fields)
  - Test distance calculation utility
  - Test shipping fee calculation utility
  - Test currency formatting
  - Test date formatting
  - _Complexity: Medium_

- [ ] 97. Write unit tests for storage adapter
  - Test CRUD operations for orders
  - Test CRUD operations for merchants and outlets
  - Test error handling
  - Test data persistence
  - _Complexity: Medium_

- [ ] 98. Write unit tests for state management
  - Test TanStack Query hooks
  - Test Zustand store actions
  - Test cache invalidation
  - Test state persistence
  - _Complexity: Medium_

- [ ] 99. Write component unit tests
  - Test LoginPage component
  - Test OrderCard component
  - Test FilterBar component
  - Test KPICards component
  - Test FormAccordion component
  - _Complexity: Large_

- [ ] 100. Write integration tests
  - Test complete order creation flow
  - Test complete order filtering flow
  - Test authentication and session flow
  - Test offline order creation and sync
  - _Complexity: Large_

- [ ] 101. Run full test suite and verify coverage
  - Run all unit tests
  - Run all integration tests
  - Run all property-based tests
  - Verify code coverage >= 80%
  - Fix any failing tests
  - _Complexity: Medium_

- [ ] 102. Final checkpoint - Complete implementation
  - Verify all requirements are implemented
  - Verify all properties are tested
  - Verify all tests pass
  - Verify Lighthouse Performance score >= 90
  - Verify Lighthouse PWA score >= 90
  - Verify no console errors or warnings
  - _Complexity: Small_


## Implementation Notes

### Task Dependencies

- **Foundation (Tasks 1-7)**: Must complete before any other tasks
- **Authentication (Tasks 8-13)**: Depends on foundation; must complete before accessing protected routes
- **Map Integration (Tasks 14-19)**: Depends on foundation; can run in parallel with authentication
- **Shipping Calculations (Tasks 20-23)**: Depends on map integration
- **Order Creation (Tasks 24-36)**: Depends on authentication, map integration, and shipping calculations
- **Order History (Tasks 37-48)**: Depends on authentication and foundation
- **Order Detail (Tasks 49-59)**: Depends on order history
- **Dashboard (Tasks 60-66)**: Depends on authentication and foundation
- **Responsive Design (Tasks 67-72)**: Can run in parallel with feature implementation
- **Performance (Tasks 73-79)**: Should run after feature implementation
- **PWA (Tasks 80-87)**: Can run in parallel with feature implementation
- **Error Handling (Tasks 88-94)**: Should be integrated throughout implementation
- **Testing (Tasks 95-102)**: Should run throughout implementation, final comprehensive testing at end

### Property-Based Testing Strategy

All property-based tests use Vitest with fast-check library:
- Minimum 100 iterations per property test
- Tag format: `Feature: pink-pin-merchant-app, Property {number}: {property_text}`
- Each property implemented by a single PBT test
- Properties cover universal correctness guarantees

### Complexity Estimates

- **Small**: 2-4 hours (straightforward implementation, minimal dependencies)
- **Medium**: 4-8 hours (moderate complexity, some integration needed)
- **Large**: 8+ hours (complex implementation, significant integration)

### Code Organization

```
src/
├── components/
│   ├── auth/
│   │   └── LoginPage.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── MainLayout.tsx
│   ├── dashboard/
│   │   ├── KPICards.tsx
│   │   ├── StatusChart.tsx
│   │   └── ActivityFeed.tsx
│   ├── orders/
│   │   ├── OrderCard.tsx
│   │   ├── OrderRow.tsx
│   │   ├── OrderDetail.tsx
│   │   └── OrderCreation.tsx
│   ├── map/
│   │   └── MapPanel.tsx
│   └── common/
│       ├── FilterBar.tsx
│       ├── FormAccordion.tsx
│       └── ErrorBoundary.tsx
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── OrderHistoryPage.tsx
│   ├── OrderDetailPage.tsx
│   └── OrderCreationPage.tsx
├── hooks/
│   ├── useOrders.ts
│   ├── useAuth.ts
│   ├── useFilters.ts
│   └── useMap.ts
├── stores/
│   ├── authStore.ts
│   ├── uiStore.ts
│   └── offlineStore.ts
├── services/
│   ├── storageAdapter.ts
│   ├── authService.ts
│   ├── distanceService.ts
│   └── shippingService.ts
├── types/
│   ├── order.ts
│   ├── merchant.ts
│   ├── outlet.ts
│   └── common.ts
├── utils/
│   ├── validation.ts
│   ├── formatting.ts
│   ├── calculations.ts
│   └── sampleData.ts
├── App.tsx
└── main.tsx
```

### Testing Structure

```
tests/
├── unit/
│   ├── services/
│   ├── utils/
│   ├── stores/
│   └── hooks/
├── integration/
│   ├── auth.test.ts
│   ├── orderCreation.test.ts
│   ├── orderFiltering.test.ts
│   └── offlineSync.test.ts
└── properties/
    ├── storage.property.ts
    ├── calculations.property.ts
    ├── filtering.property.ts
    ├── validation.property.ts
    ├── performance.property.ts
    └── pwa.property.ts
```

### Key Implementation Patterns

1. **Storage Adapter Pattern**: All storage operations go through adapter interface, enabling future API integration
2. **Custom Hooks**: Encapsulate TanStack Query and Zustand logic in reusable hooks
3. **Error Boundaries**: Wrap major sections to prevent full app crashes
4. **Lazy Loading**: Load non-critical components and libraries on demand
5. **Property-Based Testing**: Verify universal properties across randomized inputs
6. **Offline-First**: Design with offline capability from the start

### Success Criteria

- All 102 tasks completed
- All 25 properties verified with property-based tests
- All requirements mapped to implementation tasks
- Lighthouse Performance score >= 90
- Lighthouse PWA score >= 90
- Code coverage >= 80%
- Zero console errors or warnings
- All tests passing

