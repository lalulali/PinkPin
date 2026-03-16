# Pink Pin Merchant App - Requirements Document

## Introduction

Pink Pin is a merchant order management system designed for logistics and delivery businesses. The application enables merchants to create, manage, and track orders with map-based delivery features. Phase 2 focuses on core merchant workflows including authentication, order creation with map-based location selection, order history management, order detail viewing, and a merchant dashboard with KPIs and analytics.

The system prioritizes mobile-first design, offline capability via PWA, and real-time order tracking with distance-based shipping fee calculations.

## Glossary

- **Merchant**: A user who owns and manages orders within the Pink Pin system
- **Order**: A complete shipment record containing recipient info, items, package details, and delivery information
- **Outlet**: A merchant's physical location or branch from which orders originate
- **Recipient**: The end customer receiving the delivery
- **Service_Type**: The delivery method (e.g., standard, express, same-day)
- **Order_Status**: The current state of an order (pending, confirmed, in-transit, delivered, cancelled)
- **Shipping_Fee**: The calculated delivery cost based on base fee and distance
- **Distance**: The calculated route distance in kilometers between outlet and delivery location
- **Map_Integration**: Google Maps API for location selection and distance calculation
- **PWA**: Progressive Web App providing offline support and installability
- **Mock_Storage**: localStorage-based data persistence simulating a database
- **Adapter_Pattern**: Switchable storage layer allowing future API integration
- **KPI**: Key Performance Indicator (metrics like daily volume, active shipments, success rate)
- **Tap_Target**: Interactive UI element with minimum 44px dimension for mobile accessibility

## Requirements

### Requirement 1: Mock Data Storage and Initialization with Adapter Pattern

**User Story:** As a developer, I want the app to use localStorage for data persistence with pre-populated sample data and a flexible adapter pattern, so that I can test the system without a backend API and easily integrate with a future backend system.

#### Acceptance Criteria

1. WHEN the app loads for the first time, THE Storage_System SHALL initialize localStorage with 10-15 sample orders representing various statuses and service types
2. WHEN the app loads, THE Storage_System SHALL create sample orders with realistic data including recipient names, addresses, items, and shipping fees
3. WHEN the app loads, THE Storage_System SHALL ensure sample orders span multiple dates to support date range filtering
4. WHEN a merchant creates, updates, or deletes an order, THE Storage_System SHALL persist changes to the active storage adapter immediately
5. WHEN the app loads, THE Storage_System SHALL retrieve all orders from the active storage adapter and populate the application state
6. WHERE the storage adapter pattern is implemented, THE Storage_System SHALL define a consistent interface (contract) for all storage implementations
7. WHERE the storage adapter pattern is implemented, THE Storage_System SHALL allow switching between localStorage adapter and future API/backend adapters without modifying business logic or UI code
8. WHEN a new storage adapter is needed, THE Storage_System SHALL require only implementing the defined storage interface without changing existing code

---

### Requirement 2: State Management and Data Flow

**User Story:** As a developer, I want the app to use TanStack Query for server state and Zustand for client state, so that I can manage application state efficiently.

#### Acceptance Criteria

1. WHEN the app loads, THE State_Management_System SHALL use TanStack Query to manage server state (orders from storage)
2. WHEN a merchant interacts with the UI, THE State_Management_System SHALL use Zustand to manage client state (UI state, filters, sort preferences)
3. WHEN an order is created or updated, THE State_Management_System SHALL invalidate TanStack Query cache to trigger a refresh
4. WHEN a merchant applies filters, THE State_Management_System SHALL update Zustand store and trigger a re-render with filtered data
5. WHEN the app loads, THE State_Management_System SHALL hydrate Zustand store from localStorage to restore previous UI state

---

### Requirement 3: Error Handling and Validation

**User Story:** As a merchant, I want the app to validate my input and display clear error messages, so that I can correct mistakes and complete tasks successfully.

#### Acceptance Criteria

1. WHEN a merchant submits a form with invalid data, THE Validation_System SHALL display field-level error messages indicating what needs to be corrected
2. WHEN a merchant enters an invalid email, THE Validation_System SHALL display "Please enter a valid email address"
3. WHEN a merchant enters an invalid phone number, THE Validation_System SHALL display "Please enter a valid phone number"
4. WHEN a merchant leaves a required field empty, THE Validation_System SHALL display "This field is required"
5. IF a storage operation fails, THEN THE Error_Handling_System SHALL display a user-friendly error message and log the error for debugging
6. IF the map fails to load, THEN THE Error_Handling_System SHALL display a fallback address input field and allow manual entry
7. WHEN a merchant encounters an error, THE Error_Handling_System SHALL provide a "Retry" button to attempt the operation again

---

### Requirement 4: Responsive Design and Mobile Accessibility

**User Story:** As a mobile user, I want the app to be fully functional on mobile devices with proper touch targets, so that I can manage orders on the go.

#### Acceptance Criteria

1. WHEN the app is viewed on mobile devices (320px - 768px), THE UI_System SHALL display all content in a mobile-optimized layout
2. WHEN the app is viewed on tablet devices (768px - 1024px), THE UI_System SHALL display a responsive layout optimized for tablet screens
3. WHEN the app is viewed on desktop devices (1024px+), THE UI_System SHALL display a full-width layout with optimal spacing
4. WHEN a merchant interacts with buttons and form fields, THE UI_System SHALL ensure all tap targets are at least 44px in height and width
5. WHEN the app is viewed on mobile, THE UI_System SHALL use Tailwind CSS responsive classes (sm:, md:, lg:) to adjust layouts appropriately
6. WHEN a merchant uses the app, THE UI_System SHALL use the primary color #ED0577 (magenta) for key interactive elements and status indicators
7. WHEN the app displays status badges, THE UI_System SHALL use color coding: green for closed (Delivery Completed), orange for waiting (Waiting for Pick Up), red for cancelled (Shipment Cancelled), blue for submitted (Shipment Created)

---

### Requirement 5: Merchant Authentication (PINK ACCESS)

**User Story:** As a merchant, I want to securely log in to the Pink Pin app, so that I can access my orders and manage my business.

#### Acceptance Criteria

1. WHEN a merchant navigates to the login page, THE Authentication_System SHALL display a login form with email and password fields
2. WHEN a merchant enters valid credentials, THE Authentication_System SHALL authenticate the merchant and redirect to the dashboard
3. WHEN a merchant enters invalid credentials, THE Authentication_System SHALL display a descriptive error message and remain on the login page
4. WHEN a merchant submits the login form, THE Authentication_System SHALL validate the submission using a simulated CAPTCHA (checkbox: "I'm not a robot") to prevent automated attacks
5. WHERE the system is in prototype mode, THE Authentication_System SHALL accept mock credentials (email: demo@pinkpin.com, password: demo123) for testing
6. WHEN a merchant closes the browser, THE Authentication_System SHALL maintain the session using secure token storage for up to 7 days
7. WHEN a merchant clicks logout, THE Authentication_System SHALL clear all session data and redirect to the login page

---

### Requirement 6: Session Management and Security

**User Story:** As a merchant, I want my session to be secure and persist appropriately, so that I can work without frequent re-authentication.

#### Acceptance Criteria

1. WHEN a merchant logs in, THE Session_System SHALL store the authentication token securely (httpOnly cookie or secure localStorage)
2. WHEN a merchant's session expires after 7 days of inactivity, THE Session_System SHALL redirect to the login page
3. WHEN a merchant logs out, THE Session_System SHALL clear all session data and authentication tokens
4. WHEN a merchant navigates to a protected route without authentication, THE Session_System SHALL redirect to the login page
5. WHEN a merchant submits a form, THE Session_System SHALL include the authentication token in the request headers

---

### Requirement 7: Map Integration and Distance Calculation

**User Story:** As a merchant, I want to select delivery locations on a map and have distances calculated automatically, so that I can accurately calculate shipping fees.

#### Acceptance Criteria

1. WHEN a merchant creates an order, THE Map_System SHALL display an interactive Google Map centered on the selected outlet location
2. WHEN a merchant clicks on the map, THE Map_System SHALL update the delivery location marker and address field
3. WHEN a merchant selects a delivery location, THE Map_System SHALL calculate the distance using Google Geometry library (haversine formula or routing API)
4. WHEN the distance is calculated, THE Map_System SHALL display the distance in kilometers with one decimal place precision
5. WHEN a merchant changes the delivery location, THE Map_System SHALL recalculate the distance and update the shipping fee in real-time
6. WHEN a merchant selects an outlet, THE Map_System SHALL display the outlet location on the map with a distinct marker
7. WHEN a merchant selects a delivery location, THE Map_System SHALL display the delivery location with a distinct marker and draw a route line between outlet and delivery location
8. WHEN the map is displayed on mobile, THE Map_System SHALL ensure the map is fully interactive and responsive

---

### Requirement 8: Shipping Fee Calculation

**User Story:** As a merchant, I want shipping fees to be calculated automatically based on distance and service type, so that I can ensure accurate pricing.

#### Acceptance Criteria

1. WHEN a merchant selects a service type and delivery location, THE Shipping_System SHALL calculate the shipping fee using the formula: base_fee + (distance * rate)
2. WHEN a merchant selects "Standard" service, THE Shipping_System SHALL use base_fee = 10000 and rate = 5000 per kilometer
3. WHEN a merchant selects "Express" service, THE Shipping_System SHALL use base_fee = 20000 and rate = 7500 per kilometer
4. WHEN a merchant selects "Same-Day" service, THE Shipping_System SHALL use base_fee = 30000 and rate = 10000 per kilometer
5. WHEN the shipping fee is calculated, THE Shipping_System SHALL display the fee breakdown showing base fee, distance, rate, and total
6. WHEN a merchant changes the service type or delivery location, THE Shipping_System SHALL recalculate the shipping fee in real-time
7. WHEN the shipping fee is displayed, THE Shipping_System SHALL format the fee as currency with two decimal places

---

### Requirement 9: Order Creation with Map-Based Location Selection (THE PIN FLOW)

**User Story:** As a merchant, I want to create a new order by selecting locations on a map and entering recipient details, so that I can efficiently place delivery orders.

#### Acceptance Criteria

1. WHEN a merchant clicks "Create Order", THE Order_Creation_System SHALL display an accordion-style form with collapsible sections for: outlet selection, recipient information, items, package details, and delivery information, with a pinned live summary panel visible at all times
2. WHEN a merchant selects an outlet, THE Order_Creation_System SHALL display the outlet's location on the map as the origin point
3. WHEN a merchant clicks on the map to select a delivery location, THE Order_Creation_System SHALL update the delivery address and calculate the distance using Google Geometry library
4. WHEN a merchant selects a delivery location that is more than 3 km away from the outlet, THE Order_Creation_System SHALL display an error message "Delivery location must be within 3 km radius of the outlet" and prevent order confirmation
5. WHEN a merchant selects a delivery location that is within 3 km radius of the outlet, THE Order_Creation_System SHALL allow the order to proceed
6. WHEN a merchant enters recipient information (name, phone, email), THE Order_Creation_System SHALL validate the format and display validation errors if invalid
7. WHEN a merchant adds items to the order, THE Order_Creation_System SHALL allow multiple items with quantity and description, and calculate total item count
8. WHEN a merchant specifies package details (weight, dimensions, fragile flag), THE Order_Creation_System SHALL store these details for shipping calculations
9. WHEN a merchant selects a service type (standard, express, same-day), THE Order_Creation_System SHALL update the shipping fee calculation
10. WHEN the distance is calculated, THE Order_Creation_System SHALL compute the shipping fee using the formula: base_fee + (distance * rate) where base_fee and rate are service-type-specific
11. WHEN a merchant completes all required fields, THE Order_Creation_System SHALL display a live summary showing order total, shipping fee, and all details
12. WHEN a merchant clicks "Confirm Order", THE Order_Creation_System SHALL save the order to storage and display a success confirmation with order ID
13. WHEN a merchant clicks "Cancel", THE Order_Creation_System SHALL discard the order and return to the dashboard without saving
14. WHILE the merchant is creating an order, THE Order_Creation_System SHALL auto-save form data to localStorage every 30 seconds to prevent data loss
15. WHERE the app is offline, THE Order_Creation_System SHALL allow order creation and queue it for sync when connectivity is restored

---

### Requirement 10: Order History and Management (PIN HISTORY)

**User Story:** As a merchant, I want to view all my orders with filtering and sorting options, so that I can efficiently manage and track my shipments.

#### Acceptance Criteria

1. WHEN a merchant navigates to the order history page, THE Order_History_System SHALL display all orders in a paginated list with 20 orders per page
2. WHEN a merchant applies a date range filter, THE Order_History_System SHALL display only orders created within the selected date range
3. WHEN a merchant filters by order status, THE Order_History_System SHALL display only orders matching the selected status (submitted, waiting, closed, cancelled)
4. WHEN a merchant filters by outlet, THE Order_History_System SHALL display only orders originating from the selected outlet
5. WHEN a merchant filters by invoice number, THE Order_History_System SHALL search and display matching orders
6. WHEN a merchant filters by service type, THE Order_History_System SHALL display only orders with the selected service type
7. WHEN a merchant applies multiple filters simultaneously, THE Order_History_System SHALL apply all filters in combination (AND logic)
8. WHEN a merchant clicks the layout toggle, THE Order_History_System SHALL switch between card view and row/table view
9. WHEN a merchant hovers over an order card, THE Order_History_System SHALL display action buttons: edit, cancel, and see detail
10. WHEN a merchant clicks "Edit" on a pending order, THE Order_History_System SHALL open the order in edit mode with all fields editable
11. WHEN a merchant clicks "Cancel" on an order, THE Order_History_System SHALL display a confirmation dialog and mark the order as cancelled if confirmed
12. WHEN a merchant clicks "See Detail", THE Order_History_System SHALL navigate to the order detail page
13. WHEN a merchant sorts by date, THE Order_History_System SHALL display orders in ascending or descending order by creation date
14. WHEN a merchant sorts by status, THE Order_History_System SHALL display orders grouped and sorted by status
15. WHEN the order list is empty after filtering, THE Order_History_System SHALL display a message indicating no orders match the criteria

---

### Requirement 11: Order Detail View (PIN DETAIL)

**User Story:** As a merchant, I want to view complete details of a specific order, so that I can verify all information and track delivery progress.

#### Acceptance Criteria

1. WHEN a merchant navigates to an order detail page, THE Order_Detail_System SHALL display all order information in a read-only format
2. WHEN the order detail page loads, THE Order_Detail_System SHALL display the following sections: order header (ID, status, creation date), recipient information, items list, package details, delivery information, and shipping fee breakdown
3. WHEN an order has a map location, THE Order_Detail_System SHALL display an embedded map showing the outlet origin and delivery destination with a route line
4. WHEN a merchant views the order status, THE Order_Detail_System SHALL display a color-coded status badge using: blue for submitted (Shipment Created), orange for waiting (Waiting for Pick Up), green for closed (Delivery Completed), and red for cancelled (Shipment Cancelled) statuses
5. WHEN a merchant views the shipping fee breakdown, THE Order_Detail_System SHALL display base fee, distance, rate, and total shipping fee calculation
6. WHEN an order is in transit, THE Order_Detail_System SHALL display live tracking information if available
7. WHEN a merchant clicks "Back", THE Order_Detail_System SHALL return to the order history page preserving the previous filter and sort state
8. WHEN the order detail page loads, THE Order_Detail_System SHALL fetch the latest order data from storage to ensure current information is displayed

---

### Requirement 12: Merchant Dashboard (PINK VIEW)

**User Story:** As a merchant, I want to view a dashboard with key metrics and analytics, so that I can monitor my business performance at a glance.

#### Acceptance Criteria

1. WHEN a merchant navigates to the dashboard, THE Dashboard_System SHALL display KPI cards showing: today's order volume, active shipments count, and delivery success rate
2. WHEN the dashboard loads, THE Dashboard_System SHALL calculate today's volume as the count of orders created in the current calendar day
3. WHEN the dashboard loads, THE Dashboard_System SHALL calculate active shipments as the count of orders with status submitted or waiting
4. WHEN the dashboard loads, THE Dashboard_System SHALL calculate success rate as (closed orders / total orders) * 100 for the current month
5. WHEN a merchant views the KPI cards, THE Dashboard_System SHALL display the metrics with appropriate icons and color coding (green for positive metrics)
6. WHEN the dashboard loads, THE Dashboard_System SHALL display an order status distribution visualization (pie or bar chart) showing counts for each status
7. WHEN the dashboard loads, THE Dashboard_System SHALL display a recent activity feed showing the last 10 orders with status, recipient name, and timestamp
8. WHEN a merchant clicks on an order in the activity feed, THE Dashboard_System SHALL navigate to the order detail page
9. WHEN the dashboard is viewed on mobile, THE Dashboard_System SHALL stack KPI cards vertically and adjust chart sizes for readability
10. WHEN the dashboard data is stale (older than 5 minutes), THE Dashboard_System SHALL automatically refresh the data in the background

---

### Requirement 13: Performance and Optimization

**User Story:** As a user, I want the app to load quickly and respond smoothly to my interactions, so that I can work efficiently.

#### Acceptance Criteria

1. WHEN the app loads, THE Performance_System SHALL load the initial page in under 3 seconds on 4G networks
2. WHEN a merchant navigates between pages, THE Performance_System SHALL transition in under 500ms
3. WHEN a merchant applies filters to the order list, THE Performance_System SHALL update the display in under 200ms
4. WHEN the app loads, THE Performance_System SHALL lazy-load non-critical components (charts, maps) to improve initial load time
5. WHEN the app is audited with Lighthouse, THE Performance_System SHALL achieve a Performance score of 90 or higher
6. WHEN a merchant scrolls through a long order list, THE Performance_System SHALL use virtual scrolling to maintain smooth performance

---

### Requirement 14: Progressive Web App Capabilities

**User Story:** As a merchant, I want to use the Pink Pin app offline and install it on my device, so that I can access my orders even without internet connectivity.

#### Acceptance Criteria

1. WHEN the app is loaded, THE PWA_System SHALL register a service worker to enable offline functionality
2. WHEN a merchant is offline, THE PWA_System SHALL allow viewing previously loaded orders and creating new orders (queued for sync)
3. WHEN connectivity is restored, THE PWA_System SHALL automatically sync queued orders to storage
4. WHEN the app is accessed on a mobile device, THE PWA_System SHALL display an "Add to Home Screen" prompt allowing installation
5. WHEN the app is installed as a PWA, THE PWA_System SHALL display a splash screen with the Pink Pin branding on launch
6. WHEN the app is running as a PWA, THE PWA_System SHALL hide the browser address bar and display in full-screen mode
7. WHEN the app is audited with Lighthouse, THE PWA_System SHALL achieve a PWA score of 90 or higher
8. WHEN the app is audited with Lighthouse, THE PWA_System SHALL achieve a Performance score of 90 or higher
