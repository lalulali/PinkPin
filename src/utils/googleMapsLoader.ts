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

export default {
  loadGoogleMapsAPI,
  isGoogleMapsLoaded,
  getGoogleMaps,
  createMap,
  createMarker,
}