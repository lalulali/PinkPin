# PHASE 2: THE KINETIC WEAVE (Project: PINK PIN)

## 0. PROTOTYPE ARCHITECTURE (MOCK-FIRST)

* Objective: Create a fully functional end-to-end prototype for Project Pink Pin that works without a live backend.
* Mock Service Layer: All API calls will be routed through a src/services/mock/ directory.
* Persistence: Use localStorage to simulate a database. This allows the Pink Pin Dashboard, Order History, and Detail views to reflect real-time changes during the prototype phase.
* Adapter Pattern: Implement a "Switchable Adapter" logic. When the real API is ready, you only need to swap the provider in your service layer from MockProvider to ApiProvider.

## 1. FEATURE: PINK ACCESS (LOGIN)

* Objective: Secure entry with reCAPTCHA.
* Logic:
  * Email/Password fields.
  * Toggle visibility for password (type="password" vs type="text").
  * Mock Auth: Accept any valid email format with any password for the prototype.
  * Integration with Google reCAPTCHA (use test keys).
  * On success: Store a mock token in sessionStorage and redirect to Pink View.

## 2. FEATURE: THE PIN FLOW (ORDER CREATION)

* Objective: High-fidelity order placement with map-pin accuracy.
* Execution Logic:
  1. Outlet Selection: Fetch registered outlets from a mock JSON file.
  2. Recipient Info:
    * Standard fields: Name, Phone.
    * Map Flow: Use Google Maps API. User searches/pins location.
    * Address Override: Provide a "Correct Address" textarea that allows manual edits without updating the latitude/longitude.
    * Satria Notes: Optional field specifically for the courier.
  3. Items Information: Dynamic array of items (Item Name, Total Quantity).
  4. Package Information: Total Weight, Total Price, Invoice Number (Manual entry).
  5. Delivery Information:
    * Pickup Type: "Pick up now" vs "Scheduled" (Date/Time picker).
  6. Summary (Live Feedback):
    * Calculate distance using Google Geometry library.
    * Display Service Type, Total Distance, and Shipping Fee (calculated via mock formula: base_fee + (dist * rate)).
  7. Submission: On "Create Order," push the new object into the Mock Storage array.

## 3. FEATURE: PIN HISTORY (ORDER LIST)

* Objective: Manage and track order lifecycle using Mock Data.
* Filters: Implementation of Date Range, Status (Cancelled, Closed, Submitted, Waiting), Outlet, Invoice No, and Service Type.
* List View (Card/Row Layout):
  * Header/Meta: Created Datetime (formatted DD MMM YYYY, HH:mm).
  * Shipping Section:
    * Origin Outlet: Name and City of the merchant outlet.
    * Airwaybill (AWB): Generate a random "ANTJ-XXXX" string for the prototype.
  * Order Section:
    * Invoice Number: Reference number from the merchant.
    * Recipient Details: Combined display of Receiver Name and Phone number.
  * Status Badge: Color-coded status indicator.
  * Service Label: Small tag indicating "Instant" or "Regular" service.
* Actions:
  * Edit: Only active if status is "Submitted".
  * Cancel: Updates the Mock Storage status to "Cancelled".
  * See Detail: Route to Detail view.

## 4. FEATURE: PIN DETAIL (ORDER DETAIL)

* Objective: Full read-only view of the order.
* Fields: Retrieve specific ID from Mock Storage and display all captured sections (Origin, Recipient, Items, Package, Delivery, Summary).

## 5. FEATURE: PINK VIEW (MERCHANT DASHBOARD)

* Objective: Provide immediate situational awareness for the merchant.
* Key Metrics (KPI Cards):
  * Today's Volume: Total orders created today vs yesterday (calculated from Mock Storage).
  * Active Shipments: Count of orders in "Waiting" or "Submitted" status.
  * Success Rate: Percentage of "Closed" vs "Cancelled" orders in the last 7 days.
  * Quick Actions: Prominent "Drop a Pin" card for starting a new Order.
* Visualizations:
  * Order Status Distribution: A simple doughnut chart or status pill bar showing the current lifecycle of all active orders.
  * Recent Activity: A feed of the last 5 status updates (e.g., "Order #123 picked up by Satria").

## INTEGRATION POINTS

* Mock Storage Init: A script to populate 10-15 sample orders on first load so the merchant sees a "lived-in" dashboard.
* Styling: Use #ED0577 (Anteraja Magenta) for the "Create Order" button and "Status" badges.