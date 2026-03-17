/**
 * Unit tests for geocoding utility
 * Tests address geocoding and reverse geocoding functionality
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { geocodeAddress, reverseGeocodeCoordinates } from './geocoding'
import * as googleMapsLoader from './googleMapsLoader'

// Mock the googleMapsLoader
vi.mock('./googleMapsLoader', () => ({
  getGoogleMaps: vi.fn(),
}))

describe('Geocoding Utility', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('geocodeAddress', () => {
    it('should geocode a valid address to coordinates', async () => {
      const mockGeocoder = {
        geocode: vi.fn((request, callback) => {
          callback(
            [
              {
                formatted_address: '123 Main St, New York, NY 10001, USA',
                geometry: {
                  location: {
                    lat: () => 40.7128,
                    lng: () => -74.006,
                  },
                },
              },
            ],
            'OK'
          )
        }),
      }

      vi.mocked(googleMapsLoader.getGoogleMaps).mockReturnValue({
        maps: {
          Geocoder: vi.fn(() => mockGeocoder),
          GeocoderStatus: { OK: 'OK' },
        },
      } as any)

      const result = await geocodeAddress('123 Main St, New York, NY')

      expect(result.coordinates.lat).toBe(40.7128)
      expect(result.coordinates.lng).toBe(-74.006)
      expect(result.formattedAddress).toBe('123 Main St, New York, NY 10001, USA')
    })

    it('should reject when geocoder is not available', async () => {
      vi.mocked(googleMapsLoader.getGoogleMaps).mockReturnValue(null)

      await expect(geocodeAddress('123 Main St')).rejects.toMatchObject({
        code: 'GEOCODER_NOT_AVAILABLE',
      })
    })

    it('should reject when address is not found', async () => {
      const mockGeocoder = {
        geocode: vi.fn((request, callback) => {
          callback([], 'ZERO_RESULTS')
        }),
      }

      vi.mocked(googleMapsLoader.getGoogleMaps).mockReturnValue({
        maps: {
          Geocoder: vi.fn(() => mockGeocoder),
          GeocoderStatus: { OK: 'OK' },
        },
      } as any)

      await expect(geocodeAddress('invalid address xyz')).rejects.toMatchObject({
        code: 'ZERO_RESULTS',
      })
    })

    it('should reject when address is empty', async () => {
      vi.mocked(googleMapsLoader.getGoogleMaps).mockReturnValue({
        maps: {
          Geocoder: vi.fn(),
          GeocoderStatus: { OK: 'OK' },
        },
      } as any)

      await expect(geocodeAddress('')).rejects.toMatchObject({
        code: 'EMPTY_ADDRESS',
      })
    })
  })

  describe('reverseGeocodeCoordinates', () => {
    it('should reverse geocode coordinates to an address', async () => {
      const mockGeocoder = {
        geocode: vi.fn((request, callback) => {
          callback(
            [
              {
                formatted_address: '123 Main St, New York, NY 10001, USA',
                geometry: {
                  location: {
                    lat: () => 40.7128,
                    lng: () => -74.006,
                  },
                },
              },
            ],
            'OK'
          )
        }),
      }

      vi.mocked(googleMapsLoader.getGoogleMaps).mockReturnValue({
        maps: {
          Geocoder: vi.fn(() => mockGeocoder),
          GeocoderStatus: { OK: 'OK' },
        },
      } as any)

      const result = await reverseGeocodeCoordinates(40.7128, -74.006)

      expect(result.coordinates.lat).toBe(40.7128)
      expect(result.coordinates.lng).toBe(-74.006)
      expect(result.formattedAddress).toBe('123 Main St, New York, NY 10001, USA')
    })

    it('should reject when geocoder is not available', async () => {
      vi.mocked(googleMapsLoader.getGoogleMaps).mockReturnValue(null)

      await expect(reverseGeocodeCoordinates(40.7128, -74.006)).rejects.toMatchObject({
        code: 'GEOCODER_NOT_AVAILABLE',
      })
    })

    it('should reject when coordinates cannot be reverse geocoded', async () => {
      const mockGeocoder = {
        geocode: vi.fn((request, callback) => {
          callback([], 'ZERO_RESULTS')
        }),
      }

      vi.mocked(googleMapsLoader.getGoogleMaps).mockReturnValue({
        maps: {
          Geocoder: vi.fn(() => mockGeocoder),
          GeocoderStatus: { OK: 'OK' },
        },
      } as any)

      await expect(reverseGeocodeCoordinates(0, 0)).rejects.toMatchObject({
        code: 'ZERO_RESULTS',
      })
    })
  })
})
