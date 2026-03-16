# Pink Pin Merchant App - Design Document

## Overview

The Pink Pin Merchant App is a Progressive Web Application (PWA) designed for logistics and delivery merchants to manage orders efficiently. The system provides a mobile-first experience with map-based location selection, real-time distance and shipping fee calculations, and comprehensive order management capabilities.

### Key Design Principles

- **Mobile-First**: Optimized for mobile devices with responsive design across all screen sizes
- **Offline-Capable**: PWA with service worker for offline order creation and viewing
- **Real-Time Calculations**: Instant distance and shipping fee updates as merchants interact with the map
- **Adapter Pattern**: Flexible storage layer enabling future API integration without code changes
- **Performance**: Lazy loading, virtual scrolling, and optimized rendering for sub-3-second initial load

---

## Architecture

### System Overview

The application follows a layered architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    UI Layer (React)                         │
│  Pages, Components, Forms, Maps, Charts                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              State Management Layer                         │
│  TanStack Query (Server State) + Zustand (Client State)    │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              Business Logic Layer                           │
│  Order Management, Calculations, Validation                │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              Storage Adapter Layer                          │
│  Abstract Interface with localStorage Implementation       │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              External Services                              │
│  Google Maps API, localStorage, Service Worker             │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Initialization**: App loads, service worker registers, localStorage initializes with sample data
2. **Authentication**: User logs in, session token stored, redirected to dashboard
3. **Dashboard**: TanStack Query fetches orders, Zustand manages UI state (filters, sort)
4. **Order Creation**: User selects outlet on map, clicks delivery location, distance calculated, fee updated
5. **Order Persistence**: Order saved via storage adapter, cache invalidated, list refreshed
6. **Offline Support**: Service worker caches critical assets, queues orders for sync when online

---

## Components and Interfaces

### Storage Adapter Pattern

```typescript
interface StorageAdapter {
  // Orders
  getOrders(): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | null>;
  createOrder(order: Order): Promise<Order>;
  updateOrder(id: string, order: Partial<Order>): Promise<Order>;
  deleteOrder(id: string): Promise<void>;
  
  // Merchants
  getMerchant(id: string): Promise<Merchant | null>;
  
  // Outlets
  getOutlets(): Promise<Outlet[]>;
  getOutletById(id: string): Promise<Outlet | null>;
}
```

### Component Hierarchy

```
App
├── AuthLayout
│   └── LoginPage
├── MainLayout
│   ├── Header
│   ├── Sidebar
│   └── MainContent
│       ├── Dashboard
│       │   ├── KPICards
│       │   ├── StatusChart
│       │   └── ActivityFeed
│       ├── OrderHistory
│       │   ├── FilterBar
│       │   ├── LayoutToggle
│       │   ├── OrderCardView
│       │   └── OrderTableView
│       ├── OrderDetail
│       │   ├── OrderHeader
│       │   ├── RecipientInfo
│       │   ├── ItemsList
│       │   ├── PackageDetails
│       │   ├── DeliveryInfo
│       │   ├── ShippingFeeBreakdown
│       │   └── MapView
│       └── OrderCreation
│           ├── FormAccordion
│           │   ├── OutletSelection
│           │   ├── RecipientForm
│           │   ├── ItemsForm
│           │   ├── PackageForm
│           │   └── DeliveryForm
│           ├── MapPanel
│           └── SummaryPanel
```

### Key Components

**MapPanel**: Interactive Google Map with outlet and delivery markers, route visualization, click-to-select functionality

**FormAccordion**: Collapsible form sections with validation, auto-save every 30 seconds, live summary panel

**OrderCard/OrderRow**: Reusable order display with status badge, action buttons (edit, cancel, detail)

**KPICards**: Dashboard metrics with icons, color coding, real-time calculations

**FilterBar**: Multi-select filters (date range, status, outlet, service type, invoice number)

---

## Data Models

### Order
```typescript
interface Order {
  id: string;
  merchantId: string;
  outletId: string;
  status: 'submitted' | 'waiting' | 'closed' | 'cancelled';
  statusDisplay: 'Shipment Created' | 'Waiting for Pick Up' | 'Delivery Completed' | 'Shipment Cancelled';
  invoiceNumber: string;
  
  recipient: {
    name: string;
    phone: string;
    email: string;
    address: string;
    coordinates: { lat: number; lng: number };
  };
  
  items: Array<{
    id: string;
    description: string;
    quantity: number;
  }>;
  
  package: {
    weight: number;
    dimensions: { length: number; width: number; height: number };
    isFragile: boolean;
  };
  
  delivery: {
    serviceType: 'standard' | 'express' | 'same-day';
    distance: number; // km
    shippingFee: number;
    baseFee: number;
    rate: number;
  };
  
  createdAt: Date;
  updatedAt: Date;
}
```

### Merchant
```typescript
interface Merchant {
  id: string;
  email: string;
  name: string;
  outlets: Outlet[];
  createdAt: Date;
}
```

### Outlet
```typescript
interface Outlet {
  id: string;
  merchantId: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  createdAt: Date;
}
```

---

## API/Storage Layer

### LocalStorage Adapter Implementation

The localStorage adapter implements the StorageAdapter interface with the following features:

- **Initialization**: On first load, creates sample data with 10-15 orders spanning multiple dates
- **CRUD Operations**: Create, read, update, delete orders with immediate persistence
- **Query Support**: Filtering by date range, status, outlet, service type, invoice number
- **Transactions**: Atomic operations to prevent data corruption

### Sample Data Generation

Sample orders include:
- Various statuses: pending, confirmed, in-transit, delivered, cancelled
- Multiple service types: standard, express, same-day
- Date range: Last 30 days to support filtering
- Realistic data: Valid recipient names, addresses, phone numbers, emails
- Varied distances: 0.5 km to 3 km from outlets

---

## State Management

### TanStack Query (Server State)

Manages orders fetched from storage with:
- **Query Keys**: `['orders']`, `['orders', orderId]`
- **Stale Time**: 5 minutes (auto-refresh after 5 minutes)
- **Cache Invalidation**: On create/update/delete operations
- **Retry Logic**: 3 retries with exponential backoff

### Zustand Store (Client State)

Manages UI state with:
- **Filters**: Date range, status, outlet, service type, invoice number
- **Sort**: Field and direction (ascending/descending)
- **Layout**: Card view or table view
- **Pagination**: Current page, items per page
- **UI State**: Loading, error messages, modal visibility

Persists to localStorage for restoration on page reload.

---

## UI/UX Design

### Color Scheme

- **Primary**: #ED0577 (Magenta) - Interactive elements, CTAs
- **Status Colors**:
  - Submitted (Shipment Created): #3B82F6 (Blue)
  - Waiting (Waiting for Pick Up): #F59E0B (Orange)
  - Closed (Delivery Completed): #10B981 (Green)
  - Cancelled (Shipment Cancelled): #EF4444 (Red)
- **Background**: #FFFFFF (White)
- **Text**: #1F2937 (Dark Gray)
- **Border**: #E5E7EB (Light Gray)

### Responsive Breakpoints

- **Mobile**: 320px - 768px (single column, stacked layout)
- **Tablet**: 768px - 1024px (two-column layout)
- **Desktop**: 1024px+ (full-width with optimal spacing)

### Accessibility

- **Tap Targets**: Minimum 44px × 44px for all interactive elements
- **Color Contrast**: WCAG AA compliant (4.5:1 for text)
- **Focus States**: Visible focus indicators on all interactive elements
- **Semantic HTML**: Proper heading hierarchy, form labels, ARIA attributes

### Layout Patterns

**Dashboard**: KPI cards in grid (1 col mobile, 3 col desktop), chart below, activity feed

**Order History**: Filter bar at top, layout toggle, paginated list/table, action buttons on hover

**Order Creation**: Accordion form on left (mobile: full width), map on right (mobile: below), summary panel pinned

**Order Detail**: Header with status badge, sections below, map with route, back button preserves state

---

## Map Integration

### Google Maps Implementation

**Initialization**:
- Load Google Maps API with geometry library
- Center map on selected outlet coordinates
- Set zoom level to 15 (street level)

**Interactions**:
- Click on map to select delivery location
- Outlet marker: Blue pin with outlet icon
- Delivery marker: Red pin with destination icon
- Route line: Polyline connecting outlet to delivery location

**Distance Calculation**:
- Use Google Geometry library (haversine formula)
- Calculate great-circle distance between coordinates
- Display with 1 decimal place precision (e.g., "2.5 km")

**Error Handling**:
- If map fails to load, display fallback address input field
- Allow manual address entry with geocoding fallback
- Retry button to attempt map reload

**Mobile Responsiveness**:
- Full-width map on mobile
- Touch-friendly controls
- Pinch-to-zoom enabled
- Responsive marker sizing

---

## Authentication Flow

### Login Process

1. User navigates to `/login`
2. Enters email and password
3. Simulated CAPTCHA validation (checkbox: "I'm not a robot" - always passes in prototype)
4. Credentials validated against mock data (demo@pinkpin.com / demo123)
5. Session token generated and stored
6. Redirect to `/dashboard`

### Session Management

- **Token Storage**: Secure localStorage with expiration
- **Session Duration**: 7 days of inactivity
- **Token Refresh**: Automatic refresh on activity
- **Logout**: Clear token and redirect to login
- **Protected Routes**: Redirect to login if no valid token

### Route Protection

Protected routes check for valid session token before rendering. Unauthenticated users redirected to login page.

---

## Error Handling

### Validation Errors

- **Field-Level**: Display inline error messages below fields
- **Form-Level**: Display summary error at top of form
- **Real-Time**: Validate on blur and change events
- **Messages**: Specific, actionable error text

### Storage Errors

- **Failure**: Display user-friendly error message
- **Logging**: Log error details for debugging
- **Retry**: Provide "Retry" button to attempt operation again
- **Fallback**: Allow user to continue with cached data if available

### Map Errors

- **Load Failure**: Display fallback address input field
- **Geocoding Failure**: Allow manual coordinate entry
- **Distance Calculation**: Use fallback distance if API fails

### Error Boundaries

- Wrap major sections in error boundaries
- Display error UI with retry option
- Log errors to console for debugging
- Prevent full app crash from component errors

---

## Testing Strategy

### Unit Testing

Unit tests verify specific examples, edge cases, and error conditions:

- **Validation**: Test email, phone, required field validation with various inputs
- **Calculations**: Test shipping fee calculation with different service types and distances
- **Filtering**: Test filter logic with various combinations
- **Formatting**: Test currency and distance formatting
- **Error Handling**: Test error messages and retry logic

### Property-Based Testing

Property-based tests verify universal properties across all inputs using a PBT library (Vitest with fast-check for JavaScript):

- **Minimum 100 iterations** per property test
- **Tag format**: `Feature: pink-pin-merchant-app, Property {number}: {property_text}`
- **Each property** implemented by a single PBT test
- **Comprehensive coverage** through randomized input generation

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Sample Data Initialization

For any first app load with empty localStorage, the system should initialize with 10-15 orders with various statuses and service types.

**Validates: Requirements 1.1, 1.2, 1.3**

### Property 2: Order Persistence Round Trip

For any order created or updated, persisting it to storage and retrieving it should return an equivalent order with all fields intact.

**Validates: Requirements 1.4, 1.5**

### Property 3: Cache Invalidation on Mutation

For any order creation, update, or deletion, the TanStack Query cache should be invalidated and fresh data fetched.

**Validates: Requirements 2.3**

### Property 4: Filter Application

For any filter applied to the order list, all displayed orders should match the filter criteria (AND logic for multiple filters).

**Validates: Requirements 2.4, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7**

### Property 5: UI State Persistence

For any UI state (filters, sort, layout) set in Zustand, closing and reopening the app should restore the same state.

**Validates: Requirements 2.5**

### Property 6: Form Validation

For any form submission with invalid data, field-level error messages should display indicating what needs correction.

**Validates: Requirements 3.1, 3.4**

### Property 7: Distance Calculation

For any outlet and delivery location pair, calculating distance and then recalculating should produce consistent results.

**Validates: Requirements 7.3, 7.4, 7.5**

### Property 8: Shipping Fee Calculation

For any service type and distance, the shipping fee should equal base_fee + (distance * rate) where values are service-type-specific.

**Validates: Requirements 8.1, 8.5, 8.6, 8.7**

### Property 9: Distance Validation

For any delivery location more than 3 km from outlet, order confirmation should be prevented with error message.

**Validates: Requirements 9.4, 9.5**

### Property 10: Order Creation Persistence

For any order created and confirmed, the order should be saved to storage and retrievable with the same data.

**Validates: Requirements 9.12**

### Property 11: Auto-Save Functionality

For any form data entered during order creation, waiting 30 seconds should persist the data to localStorage.

**Validates: Requirements 9.14**

### Property 12: Pagination

For any order list with more than 20 orders, displaying should show exactly 20 orders per page.

**Validates: Requirements 10.1**

### Property 13: Status Badge Colors

For any order with a given status, the status badge should display the correct color (green for closed, orange for waiting, red for cancelled, blue for submitted).

**Validates: Requirements 4.7, 11.4**

### Property 14: Responsive Layout

For any viewport size, the layout should be optimized: single column for mobile (320-768px), two columns for tablet (768-1024px), full-width for desktop (1024px+).

**Validates: Requirements 4.1, 4.2, 4.3**

### Property 15: Tap Target Size

For any interactive element (button, form field, link), the tap target should be at least 44px in height and width.

**Validates: Requirements 4.4**

### Property 16: Session Persistence

For any logged-in user, closing and reopening the browser within 7 days should maintain the session without re-authentication.

**Validates: Requirements 5.6, 6.1, 6.3**

### Property 17: Protected Route Access

For any protected route accessed without valid authentication token, the system should redirect to login page.

**Validates: Requirements 6.4**

### Property 18: Map Marker Display

For any order with outlet and delivery location, the map should display distinct markers for both and a route line between them.

**Validates: Requirements 7.6, 7.7**

### Property 19: Order Detail Sections

For any order detail page load, all sections should display: order header, recipient info, items list, package details, delivery info, and shipping fee breakdown.

**Validates: Requirements 11.2**

### Property 20: Dashboard KPI Calculation

For any dashboard load, KPI cards should display: today's volume (orders created today), active shipments (submitted or waiting status), and success rate ((closed/total)*100).

**Validates: Requirements 12.1, 12.2, 12.3, 12.4**

### Property 21: Activity Feed Display

For any dashboard load, the activity feed should display the last 10 orders with status, recipient name, and timestamp.

**Validates: Requirements 12.7**

### Property 22: Service Worker Registration

For any app load, a service worker should be registered to enable offline functionality.

**Validates: Requirements 14.1**

### Property 23: Offline Order Creation

For any order created while offline, the order should be queued and synced to storage when connectivity is restored.

**Validates: Requirements 9.15, 14.2, 14.3**

### Property 24: Performance Load Time

For any app initial load on 4G network, the page should load in under 3 seconds.

**Validates: Requirements 13.1**

### Property 25: Filter Update Performance

For any filter applied to order list, the display should update in under 200ms.

**Validates: Requirements 13.3**

---

## Error Handling

### Validation Error Messages

- **Email**: "Please enter a valid email address"
- **Phone**: "Please enter a valid phone number"
- **Required Field**: "This field is required"
- **Distance**: "Delivery location must be within 3 km radius of the outlet"

### Storage Error Handling

- Display: "Unable to save order. Please try again."
- Logging: Log error details with timestamp and operation type
- Retry: Provide "Retry" button to attempt operation again
- Fallback: Show cached data if available

### Map Error Handling

- Display: "Map failed to load. Please enter address manually."
- Fallback: Show address input field for manual entry
- Retry: Provide "Retry" button to reload map

### Error Boundaries

- Wrap Dashboard, OrderHistory, OrderDetail, OrderCreation in error boundaries
- Display: "Something went wrong. Please refresh the page."
- Logging: Log component errors for debugging

---

## Performance Optimization

### Lazy Loading

- **Maps**: Load Google Maps API only when order creation or detail page accessed
- **Charts**: Load chart library only when dashboard accessed
- **Images**: Use lazy loading for order images if applicable

### Virtual Scrolling

- Implement virtual scrolling for order lists with 100+ orders
- Render only visible items to maintain smooth performance
- Scroll performance target: 60 FPS

### Code Splitting

- Split code by route: Dashboard, OrderHistory, OrderDetail, OrderCreation
- Load route code on demand
- Shared components in main bundle

### Caching Strategy

- **Service Worker**: Cache critical assets (HTML, CSS, JS, fonts)
- **TanStack Query**: Cache orders for 5 minutes
- **Browser Cache**: Set appropriate cache headers

---

## PWA Implementation

### Service Worker

- Register on app load
- Cache critical assets for offline access
- Implement cache-first strategy for static assets
- Implement network-first strategy for API calls

### Offline Support

- Allow viewing previously loaded orders
- Allow creating new orders (queued for sync)
- Display offline indicator
- Auto-sync when connectivity restored

### Installation

- Display "Add to Home Screen" prompt on mobile
- Show splash screen with Pink Pin branding on launch
- Hide browser address bar in full-screen mode
- Support standalone mode

### Manifest

- App name: "Pink Pin Merchant"
- Short name: "Pink Pin"
- Icons: 192px and 512px
- Theme color: #ED0577
- Background color: #FFFFFF
- Display: standalone

