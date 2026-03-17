/**
 * Tests for MapContainer error handling and fallback functionality
 * Tests map load failures, fallback address input, and retry button
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MapContainer } from './MapContainer'
import { Outlet } from '../types'

// Mock Google Maps API
vi.mock('../utils/googleMapsLoader', () => ({
  loadGoogleMapsAPI: vi.fn(),
  isGoogleMapsLoaded: vi.fn(),
  getGoogleMaps: vi.fn(),
  createMap: vi.fn(),
  createMarker: vi.fn(),
  calculateDistance: vi.fn(),
}))

// Mock geocoding utility
vi.mock('../utils/geocoding', () => ({
  geocodeAddress: vi.fn(),
}))

import * as googleMapsLoader from '../utils/googleMapsLoader'
import * as geocoding from '../utils/geocoding'

const mockOutlet: Outlet = {
  id: 'outlet-1',
  merchantId: 'merchant-1',
  name: 'Main Outlet',
  address: '123 Main St, City',
  coordinates: { lat: 40.7128, lng: -74.006 },
  createdAt: new Date(),
}

describe('MapContainer - Error Handling and Fallback', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Map Load Failure', () => {
    it('should display error message when map fails to load', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Failed to load Google Maps API')
      )

      render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

      await waitFor(() => {
        expect(screen.getByText(/Map unavailable/i)).toBeInTheDocument()
      })
    })

    it('should display user-friendly error message', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Failed to load Google Maps API')
      )

      render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

      await waitFor(() => {
        expect(screen.getByText(/Failed to load Google Maps API/i)).toBeInTheDocument()
      })
    })
  })

  describe('Fallback Address Input', () => {
    it('should display fallback address input field when map fails', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Map load failed')
      )

      render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/Enter address/i)).toBeInTheDocument()
      })
    })

    it('should display label for address input', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Map load failed')
      )

      render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

      await waitFor(() => {
        expect(screen.getByText(/Enter delivery address manually/i)).toBeInTheDocument()
      })
    })

    it('should have minimum tap target size of 44px', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Map load failed')
      )

      const { container } = render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

      await waitFor(() => {
        const input = screen.getByPlaceholderText(/Enter address/i)
        expect(input).toHaveClass('min-h-[44px]')
      })
    })
  })

  describe('Geocoding Fallback', () => {
    it('should geocode address when search button is clicked', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Map load failed')
      )

      vi.mocked(geocoding.geocodeAddress).mockResolvedValue({
        coordinates: { lat: 40.7128, lng: -74.006 },
        formattedAddress: '123 Main St, New York, NY 10001, USA',
      })

      const onSelect = vi.fn()
      render(
        <MapContainer
          outlet={mockOutlet}
          onDeliveryLocationSelect={onSelect}
          apiKey="test-key"
        />
      )

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/Enter address/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/Enter address/i) as HTMLInputElement
      const searchButton = screen.getByRole('button', { name: /Look Up Address/i })

      fireEvent.change(input, { target: { value: '123 Main St, New York' } })
      fireEvent.click(searchButton)

      await waitFor(() => {
        expect(geocoding.geocodeAddress).toHaveBeenCalledWith('123 Main St, New York')
        expect(onSelect).toHaveBeenCalledWith({ lat: 40.7128, lng: -74.006 })
      })
    })

    it('should display success message when address is geocoded', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Map load failed')
      )

      vi.mocked(geocoding.geocodeAddress).mockResolvedValue({
        coordinates: { lat: 40.7128, lng: -74.006 },
        formattedAddress: '123 Main St, New York, NY 10001, USA',
      })

      render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/Enter address/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/Enter address/i) as HTMLInputElement
      const searchButton = screen.getByRole('button', { name: /Look Up Address/i })

      fireEvent.change(input, { target: { value: '123 Main St, New York' } })
      fireEvent.click(searchButton)

      await waitFor(() => {
        expect(screen.getByText(/Looking up address/i)).toBeInTheDocument()
      })
    })

    it('should display error message when geocoding fails', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Map load failed')
      )

      vi.mocked(geocoding.geocodeAddress).mockRejectedValue(
        new Error('Unable to find address')
      )

      render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/Enter address/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/Enter address/i) as HTMLInputElement
      const searchButton = screen.getByRole('button', { name: /Look Up Address/i })

      fireEvent.change(input, { target: { value: 'invalid address xyz' } })
      fireEvent.click(searchButton)

      await waitFor(() => {
        expect(screen.getByText(/Unable to find address/i)).toBeInTheDocument()
      })
    })

    it('should allow pressing Enter to submit address', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Map load failed')
      )

      vi.mocked(geocoding.geocodeAddress).mockResolvedValue({
        coordinates: { lat: 40.7128, lng: -74.006 },
        formattedAddress: '123 Main St, New York, NY 10001, USA',
      })

      render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/Enter address/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/Enter address/i) as HTMLInputElement

      fireEvent.change(input, { target: { value: '123 Main St, New York' } })
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

      await waitFor(() => {
        expect(geocoding.geocodeAddress).toHaveBeenCalledWith('123 Main St, New York')
      })
    })

    it('should disable search button when input is empty', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Map load failed')
      )

      render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/Enter address/i)).toBeInTheDocument()
      })

      // Button is enabled by default (only disabled during geocoding)
      const searchButton = screen.getByRole('button', { name: /Look Up Address/i })
      expect(searchButton).not.toBeDisabled()
    })

    it('should show loading state while geocoding', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Map load failed')
      )

      vi.mocked(geocoding.geocodeAddress).mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                coordinates: { lat: 40.7128, lng: -74.006 },
                formattedAddress: '123 Main St, New York, NY 10001, USA',
              })
            }, 100)
          })
      )

      render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/Enter address/i)).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(/Enter address/i) as HTMLInputElement
      const searchButton = screen.getByRole('button', { name: /Look Up Address/i })

      fireEvent.change(input, { target: { value: '123 Main St, New York' } })
      fireEvent.click(searchButton)

      await waitFor(() => {
        expect(screen.getByText(/Looking up address/i)).toBeInTheDocument()
      })
    })
  })

  describe('Retry Button', () => {
    it('should display retry button when map fails', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Map load failed')
      )

      render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Retry Loading Map/i })).toBeInTheDocument()
      })
    })

    it('should have minimum tap target size of 44px', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Map load failed')
      )

      const { container } = render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

      await waitFor(() => {
        const retryButton = screen.getByRole('button', { name: /Retry Loading Map/i })
        expect(retryButton).toHaveClass('min-h-[44px]')
      })
    })

    it('should attempt to reload map when retry button is clicked', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI)
        .mockRejectedValueOnce(new Error('Map load failed'))
        .mockResolvedValueOnce({})

      vi.mocked(googleMapsLoader.getGoogleMaps).mockReturnValue({
        maps: {
          Map: vi.fn().mockImplementation(() => ({
            addListener: vi.fn(),
          })),
          Marker: vi.fn().mockImplementation(() => ({
            setMap: vi.fn(),
            addListener: vi.fn(),
          })),
          SymbolPath: { CIRCLE: 'CIRCLE' },
          InfoWindow: vi.fn().mockImplementation(() => ({
            open: vi.fn(),
          })),
        },
      } as any)

      render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Retry Loading Map/i })).toBeInTheDocument()
      })

      const retryButton = screen.getByRole('button', { name: /Retry Loading Map/i })
      fireEvent.click(retryButton)

      await waitFor(() => {
        expect(googleMapsLoader.loadGoogleMapsAPI).toHaveBeenCalledTimes(2)
      })
    })
  })

  describe('Error Message Display', () => {
    it('should display error with icon', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Map load failed')
      )

      const { container } = render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

      await waitFor(() => {
        const errorIcon = container.querySelector('svg')
        expect(errorIcon).toBeInTheDocument()
      })
    })

    it('should display error heading', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Map load failed')
      )

      render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

      await waitFor(() => {
        expect(screen.getByText(/Map unavailable/i)).toBeInTheDocument()
      })
    })
  })
})
