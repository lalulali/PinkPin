# PHASE 1: THE GLOBAL LOOM (Project Foundation)

> Project: Pink Pin
> 
> Architect: Loom (CDD Master)
> 
> Status: [STATUS: FINALIZED]

## 1. PROJECT DNA

- Framework: Next.js 14+ (App Router) - Chosen for SEO-friendly merchant landing pages and high-performance routing.
- Branding: Pink Pin Identity (Primary Color: #ED0577 Magenta).
- State Management: - Server State: TanStack Query (React Query) - For seamless API synchronization and automatic caching.
- Client State: Zustand - Lightweight management for map coordinates and active order drafts.
- Styling: Tailwind CSS + Headless UI/Radix UI - Ensures a responsive, accessible, and mobile-first design.
- PWA Engine: next-pwa - Configured for offline manifests and "Add to Home Screen" functionality.


## 2. THE SOURCE OF TRUTH

- Core Files Structure:
    - src/app/: File-based routing (Next.js).
    - src/components/ui/: Atomic UI components (Buttons, Inputs, Modals).
    - src/components/maps/: Specialized Google Maps/Mapbox integration components.
    - src/hooks/: Custom hooks for geolocation and radius calculations (useGeolocation, useRadiusCheck).
    - src/services/api/: Centralized Axios/Fetch instances with interceptors for Anteraja Backend.
    - src/types/: TypeScript interfaces for Orders, Merchants, and Address payloads.

## 3. GLOBAL CONSTRAINTS & STANDARDS

- Performance: 90+ Lighthouse score for Performance and PWA.
- Map Logic: Radius checking must be performed client-side for instant feedback before API submission.
- Responsive Standard: Mobile-First. All map interactions must be touch-friendly with minimum 44px tap targets.
- Error Handling: Global boundary for API failures; specific toast notifications for "Outside Delivery Radius."

4. BUFFERED FOR PHASE 2 (KINETIC WEAVE)

- Map-based Radius Validation: Logic to calculate distance between merchant_origin and delivery_destination.
- Geolocation Address Information Flow: Reverse geocoding to auto-fill address fields from map pins.
- Order Form Logic: Integration with the provided backend endpoints.

> [SYSTEM NOTE]: This Global Loom is the foundation. 
> Every feature in Phase 2 must adhere to these architectural decisions.