/**
 * Google Maps API Loader Utility
 * Loads the Google Maps JavaScript API with the geometry library
 */

declare global {
  interface Window {
    google: typeof google
    initGoogleMaps: () => void
  }
}

export interface GoogleMapsLoaderOptions {
  apiKey: string
  version?: string
  libraries?: string[]
}

export interface GoogleMapsLoadResult {
  google: typeof google
  isLoaded: boolean
}

let loadPromise: Promise<typeof google> | null = null
let isLoaded = false

/**
 * Load the Google Maps API with the geometry library
 * Uses singleton pattern to prevent multiple loads
 */
export function loadGoogleMapsAPI(options: GoogleMapsLoaderOptions): Promise<typeof google> {
  if (isLoaded && window.google) {
    return Promise.resolve(window.google)
  }

  if (loadPromise) {
    return loadPromise
  }

  const { apiKey, version = 'weekly', libraries = ['geometry'] } = options

  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(',')}&v=${version}`
  script.async = true
  script.defer = true

  loadPromise = new Promise((resolve, reject) => {
    // Set up global callback
    window.initGoogleMaps = () => {
      isLoaded = true
      resolve(window.google)
    }

    script.onerror = () => {
      reject(new Error('Failed to load Google Maps API'))
    }

    document.head.appendChild(script)
  })

  return loadPromise
}

/**
 * Check if Google Maps API is already loaded
 */
export function isGoogleMapsLoaded(): boolean {
  return isLoaded && !!window.google?.maps
}

/**
 * Get the Google Maps instance if loaded
 */
export function getGoogleMaps(): typeof google | null {
  return window.google || null
}

/**
 * Create a map instance with common configuration
 */
export function createMap(
  mapElement: HTMLElement,
  options: google.maps.MapOptions = {}
): google.maps.Map {
  const defaultOptions: google.maps.MapOptions = {
    zoom: 15,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    gestureHandling: 'greedy',
    ...options,
  }

  return new google.maps.Map(mapElement, defaultOptions)
}

/**
 * Create a marker for a location
 */
export function createMarker(
  map: google.maps.Map,
  position: google.maps.LatLngLiteral,
  options: google.maps.MarkerOptions = {}
): google.maps.Marker {
  const defaultOptions: google.maps.MarkerOptions = {
    map,
    position,
    clickable: true,
    ...options,
  }

  return new google.maps.Marker(defaultOptions)
}

/**
 * Calculate distance between two points using the Geometry library
 */
export function calculateDistance(
  origin: google.maps.LatLngLiteral,
  destination: google.maps.LatLngLiteral
): number {
  if (!window.google?.maps?.geometry?.spherical) {
    // Fallback: haversine formula
    return haversineDistance(origin, destination)
  }

  const from = new google.maps.LatLng(origin.lat, origin.lng)
  const to = new google.maps.LatLng(destination.lat, destination.lng)
  const distance = google.maps.geometry.spherical.computeDistanceBetween(from, to)

  // Convert meters to kilometers
  return distance / 1000
}

/**
 * Haversine formula for calculating distance between two coordinates
 * Used as fallback when Geometry library is not available
 */
function haversineDistance(
  coord1: google.maps.LatLngLiteral,
  coord2: google.maps.LatLngLiteral
): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = toRad(coord2.lat - coord1.lat)
  const dLon = toRad(coord2.lng - coord1.lng)
  const lat1 = toRad(coord1.lat)
  const lat2 = toRad(coord2.lat)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180)
}

export default {
  loadGoogleMapsAPI,
  isGoogleMapsLoaded,
  getGoogleMaps,
  createMap,
  createMarker,
  calculateDistance,
}