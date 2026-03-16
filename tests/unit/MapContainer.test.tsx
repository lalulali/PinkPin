/**
 * Unit tests for MapContainer component
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MapContainer } from '../../src/components/MapContainer'
import { Outlet } from '../../src/types'

const mockOutlet: Outlet = {
  id: 'outlet-1',
  merchantId: 'merchant-1',
  name: 'Main Outlet',
  address: '123 Main Street, City',
  coordinates: { lat: 40.7128, lng: -74.006 },
  createdAt: new Date(),
}

const renderMapContainer = (props = {}) => {
  return render(
    <div style={{ width: '100%', height: '400px' }}>
      <MapContainer outlet={mockOutlet} {...props} />
    </div>
  )
}

describe('MapContainer Component', () => {
  describe('Map Initialization', () => {
    it('should render map container element', () => {
      renderMapContainer()
      const mapContainer = screen.getByRole('application')
      expect(mapContainer).toBeInTheDocument()
    })

    it('should have correct ARIA label', () => {
      renderMapContainer()
      const mapContainer = screen.getByRole('application')
      expect(mapContainer).toHaveAttribute('aria-label', expect.stringContaining('Main Outlet'))
    })

    it('should have responsive sizing classes', () => {
      renderMapContainer()
      const mapContainer = screen.getByRole('application')
      expect(mapContainer).toHaveClass('w-full', 'h-full')
    })

    it('should have minimum height for mobile', () => {
      renderMapContainer()
      const mapContainer = screen.getByRole('application')
      expect(mapContainer).toHaveStyle({ minHeight: '300px' })
    })
  })

  describe('Loading State', () => {
    it('should show loading indicator when map is loading', () => {
      renderMapContainer()
      expect(screen.getByText('Loading map...')).toBeInTheDocument()
    })

    it('should have loading spinner with correct color', () => {
      renderMapContainer()
      const spinner = screen.getByText('Loading map...').parentElement?.parentElement
      expect(spinner).toHaveClass('bg-gray-100')
    })
  })

  describe('Outlet Marker', () => {
    it('should display outlet information badge', () => {
      renderMapContainer()
      expect(screen.getByText('Outlet')).toBeInTheDocument()
      expect(screen.getByText('Main Outlet')).toBeInTheDocument()
    })

    it('should position outlet badge correctly', () => {
      renderMapContainer()
      const outletBadge = screen.getByText('Outlet').closest('div')
      expect(outletBadge).toHaveClass('absolute', 'top-4', 'right-4')
    })
  })

  describe('Responsive Design', () => {
    it('should have rounded corners', () => {
      renderMapContainer()
      const mapElement = screen.getByRole('application')
      expect(mapElement).toHaveClass('rounded-lg')
    })

    it('should have overflow hidden', () => {
      renderMapContainer()
      const mapElement = screen.getByRole('application')
      expect(mapElement).toHaveClass('overflow-hidden')
    })
  })

  describe('Accessibility', () => {
    it('should have role application for map', () => {
      renderMapContainer()
      expect(screen.getByRole('application')).toBeInTheDocument()
    })

    it('should have ARIA label describing map content', () => {
      renderMapContainer()
      expect(screen.getByRole('application')).toHaveAttribute(
        'aria-label',
        expect.stringContaining('Map showing')
      )
    })
  })

  describe('Props Interface', () => {
    it('should accept outlet prop', () => {
      expect(() => renderMapContainer({ outlet: mockOutlet })).not.toThrow()
    })

    it('should accept deliveryCoordinates prop', () => {
      expect(() => renderMapContainer({ 
        deliveryCoordinates: { lat: 40.7228, lng: -74.016 } 
      })).not.toThrow()
    })

    it('should accept onDeliveryLocationSelect callback prop', () => {
      const handleSelect = vi.fn()
      expect(() => renderMapContainer({ onDeliveryLocationSelect: handleSelect })).not.toThrow()
    })

    it('should accept apiKey prop', () => {
      expect(() => renderMapContainer({ apiKey: 'test-key' })).not.toThrow()
    })

    it('should accept className prop', () => {
      expect(() => renderMapContainer({ className: 'custom-class' })).not.toThrow()
    })
  })

  describe('Visual States', () => {
    it('should have proper container structure', () => {
      renderMapContainer()
      const container = screen.getByRole('application').parentElement
      expect(container).toHaveClass('relative')
    })
  })
})
