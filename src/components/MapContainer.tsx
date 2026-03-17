/**
 * MapContainer - Interactive Google Map component
 * Displays a map centered on outlet coordinates with zoom level 15
 * Handles map load errors with fallback address input
 * Responsive design for mobile devices
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { Outlet } from '../types'
import {
  loadGoogleMapsAPI,
  createMap,
  createMarker,
  isGoogleMapsLoaded,
  getGoogleMaps,
} from '../utils/googleMapsLoader'
import { calculateDistance } from '../utils/calculations'

interface MapContainerProps {
  outlet: Outlet
  deliveryCoordinates?: { lat: number; lng: number } | null
  onDeliveryLocationSelect?: (coordinates: { lat: number; lng: number }) => void
  apiKey?: string
  className?: string
}

interface MapError {
  message: string
  timestamp: Date
}

export function MapContainer({
  outlet,
  deliveryCoordinates,
  onDeliveryLocationSelect,
  apiKey = process.env.GOOGLE_MAPS_API_KEY || '',
  className = '',
}: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const outletMarkerRef = useRef<google.maps.Marker | null>(null)
  const deliveryMarkerRef = useRef<google.maps.Marker | null>(null)
  const routeLineRef = useRef<google.maps.Polyline | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<MapError | null>(null)
  const [distance, setDistance] = useState<number | null>(null)

  // Initialize map
  const initializeMap = useCallback(async () => {
    if (!mapRef.current) return

    try {
      setIsLoading(true)
      setError(null)

      // Check if already loaded
      if (!isGoogleMapsLoaded()) {
        await loadGoogleMapsAPI({ apiKey, libraries: ['geometry'] })
      }

      const google = getGoogleMaps()
      if (!google) {
        throw new Error('Google Maps failed to initialize')
      }

      // Create map instance centered on outlet
      const mapOptions: google.maps.MapOptions = {
        center: {
          lat: outlet.coordinates.lat,
          lng: outlet.coordinates.lng,
        },
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        gestureHandling: 'greedy',
        // Mobile-optimized settings
        disableDoubleClickZoom: false,
        keyboardShortcuts: true,
      }

      mapInstanceRef.current = createMap(mapRef.current, mapOptions)

      // Create outlet marker (blue pin)
      outletMarkerRef.current = createMarker(mapInstanceRef.current, outlet.coordinates, {
        title: outlet.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#3B82F6',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 3,
        },
      })

      // Add info window for outlet
      const outletInfoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; max-width: 200px;">
            <h3 style="font-weight: 600; margin-bottom: 4px;">${outlet.name}</h3>
            <p style="font-size: 12px; color: #666;">${outlet.address}</p>
          </div>
        `,
      })

      outletMarkerRef.current.addListener('click', () => {
        outletInfoWindow.open(mapInstanceRef.current, outletMarkerRef.current || undefined)
      })

      // Add click listener for delivery location selection
      mapInstanceRef.current.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng && onDeliveryLocationSelect) {
          const coords = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          }
          onDeliveryLocationSelect(coords)
        }
      })

      setIsLoading(false)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load map'
      setError({
        message: errorMessage,
        timestamp: new Date(),
      })
      setIsLoading(false)
    }
  }, [apiKey, outlet, onDeliveryLocationSelect])

  // Update delivery marker and route when coordinates change
  const updateDeliveryMarker = useCallback(() => {
    if (!mapInstanceRef.current || !deliveryCoordinates) {
      return
    }

    const google = getGoogleMaps()
    if (!google) return

    // Remove existing delivery marker
    if (deliveryMarkerRef.current) {
      deliveryMarkerRef.current.setMap(null)
    }

    // Remove existing route line
    if (routeLineRef.current) {
      routeLineRef.current.setMap(null)
    }

    // Create delivery marker (red pin)
    deliveryMarkerRef.current = createMarker(mapInstanceRef.current, deliveryCoordinates, {
      title: 'Delivery Location',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#EF4444',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 3,
      },
    })

    // Draw route line between outlet and delivery
    routeLineRef.current = new google.maps.Polyline({
      path: [outlet.coordinates, deliveryCoordinates],
      geodesic: true,
      strokeColor: '#ED0577',
      strokeOpacity: 1.0,
      strokeWeight: 3,
      map: mapInstanceRef.current,
    })

    // Calculate distance
    const dist = calculateDistance(outlet.coordinates, deliveryCoordinates)
    setDistance(dist)

    // Add info window for delivery location
    const deliveryInfoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 8px; max-width: 200px;">
          <h3 style="font-weight: 600; margin-bottom: 4px;">Delivery Location</h3>
          <p style="font-size: 12px; color: #666;">${dist.toFixed(1)} km from outlet</p>
        </div>
      `,
    })

    deliveryMarkerRef.current.addListener('click', () => {
      deliveryInfoWindow.open(mapInstanceRef.current, deliveryMarkerRef.current || undefined)
    })

    // Fit bounds to show both markers
    const bounds = new google.maps.LatLngBounds()
    bounds.extend(outlet.coordinates)
    bounds.extend(deliveryCoordinates)
    mapInstanceRef.current.fitBounds(bounds)
  }, [deliveryCoordinates, outlet.coordinates])

  // Initialize map on mount
  useEffect(() => {
    initializeMap()
  }, [initializeMap])

  // Update delivery marker when coordinates change
  useEffect(() => {
    if (mapInstanceRef.current && deliveryCoordinates) {
      updateDeliveryMarker()
    }
  }, [deliveryCoordinates, updateDeliveryMarker])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (outletMarkerRef.current) {
        outletMarkerRef.current.setMap(null)
      }
      if (deliveryMarkerRef.current) {
        deliveryMarkerRef.current.setMap(null)
      }
      if (routeLineRef.current) {
        routeLineRef.current.setMap(null)
      }
    }
  }, [])

  const handleRetry = () => {
    initializeMap()
  }

  const [isGeocoding, setIsGeocoding] = useState(false)
  const [geocodingError, setGeocodingError] = useState<string | null>(null)

  const handleManualAddressSubmit = async (address: string) => {
    if (!address.trim()) {
      setGeocodingError('Please enter an address')
      return
    }

    setIsGeocoding(true)
    setGeocodingError(null)

    try {
      const { geocodeAddress } = await import('../utils/geocoding')
      const result = await geocodeAddress(address)
      if (onDeliveryLocationSelect) {
        onDeliveryLocationSelect(result.coordinates)
      }
      // Clear error state after successful geocoding
      setError(null)
    } catch (err) {
      const errorMessage = err && typeof err === 'object' && 'message' in err 
        ? (err as { message: string }).message 
        : 'Failed to geocode address'
      setGeocodingError(errorMessage)
    } finally {
      setIsGeocoding(false)
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#ED0577] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-600">Loading map...</p>
          </div>
        </div>
      )}

      {/* Error state with fallback */}
      {error && (
        <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center z-10 p-4">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Map unavailable</h3>
                <p className="text-sm text-gray-600">{error.message}</p>
              </div>
            </div>

            {/* Fallback address input */}
            <div className="space-y-3">
              <p className="text-sm text-gray-700">Enter delivery address manually:</p>
              <input
                type="text"
                placeholder="Enter address..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED0577] focus:border-[#ED0577] min-h-[44px]"
                disabled={isGeocoding}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleManualAddressSubmit(e.currentTarget.value)
                  }
                }}
              />
              {geocodingError && (
                <p className="text-sm text-red-600" role="alert">
                  {geocodingError}
                </p>
              )}
              <button
                onClick={(e) => {
                  const input = (e.target as HTMLButtonElement).parentElement?.querySelector('input')
                  if (input) {
                    handleManualAddressSubmit(input.value)
                  }
                }}
                disabled={isGeocoding}
                className="w-full px-4 py-3 bg-[#ED0577] text-white rounded-lg font-medium hover:bg-[#d9066a] transition-colors min-h-[44px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeocoding ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Looking up address...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Look Up Address
                  </>
                )}
              </button>
              <button
                onClick={handleRetry}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors min-h-[44px] flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Retry Loading Map
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map container */}
      <div
        ref={mapRef}
        className="w-full h-full min-h-[300px] md:min-h-[400px] rounded-lg overflow-hidden"
        style={{ minHeight: '300px' }}
        role="application"
        aria-label={`Map showing ${outlet.name} at ${outlet.address}`}
      />

      {/* Distance display */}
      {distance !== null && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md px-3 py-2 z-10">
          <p className="text-sm font-medium text-gray-700">
            Distance: <span className="text-[#ED0577] font-bold">{distance.toFixed(1)} km</span>
          </p>
        </div>
      )}

      {/* Outlet info */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md px-3 py-2 z-10 max-w-[200px]">
        <p className="text-xs font-medium text-gray-500 uppercase">Outlet</p>
        <p className="text-sm font-semibold text-gray-900 truncate">{outlet.name}</p>
      </div>
    </div>
  )
}

export default MapContainer