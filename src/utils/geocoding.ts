/**
 * Geocoding utility for converting addresses to coordinates
 * Provides fallback geocoding when map fails to load
 */

import { getGoogleMaps } from './googleMapsLoader'

export interface GeocodeResult {
  coordinates: { lat: number; lng: number }
  formattedAddress: string
}

export interface GeocodeError {
  message: string
  code: string
}

/**
 * Geocode an address to coordinates using Google Geocoding API
 * Requires the Geocoding API to be enabled in Google Cloud Console
 */
export async function geocodeAddress(address: string): Promise<GeocodeResult> {
  if (!address || !address.trim()) {
    return Promise.reject({
      message: 'Please enter an address',
      code: 'EMPTY_ADDRESS',
    } as GeocodeError)
  }

  const google = getGoogleMaps()

  if (!google?.maps?.Geocoder) {
    return Promise.reject({
      message: 'Geocoding service is not available. Please select a location on the map.',
      code: 'GEOCODER_NOT_AVAILABLE',
    } as GeocodeError)
  }

  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder()

    geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        const result = results[0]
        resolve({
          coordinates: {
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
          },
          formattedAddress: result.formatted_address,
        })
      } else {
        reject({
          message: `Unable to find address: "${address}". Please try a different address or select on the map.`,
          code: status || 'GEOCODE_FAILED',
        } as GeocodeError)
      }
    })
  })
}

/**
 * Reverse geocode coordinates to an address
 */
export async function reverseGeocodeCoordinates(
  lat: number,
  lng: number
): Promise<GeocodeResult> {
  const google = getGoogleMaps()

  if (!google?.maps?.Geocoder) {
    return Promise.reject({
      message: 'Geocoding service is not available.',
      code: 'GEOCODER_NOT_AVAILABLE',
    } as GeocodeError)
  }

  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder()

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        const result = results[0]
        resolve({
          coordinates: { lat, lng },
          formattedAddress: result.formatted_address,
        })
      } else {
        reject({
          message: 'Unable to determine address for this location.',
          code: status || 'REVERSE_GEOCODE_FAILED',
        } as GeocodeError)
      }
    })
  })
}

export default {
  geocodeAddress,
  reverseGeocodeCoordinates,
}
