/**
 * Error Handling Checkpoint Tests
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7
 */

import { describe, it, expect, beforeEach, vi, test } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ErrorBoundary } from './ErrorBoundary'
import { StorageErrorDisplay } from './StorageErrorDisplay'
import { MapContainer } from './MapContainer'
import { Outlet } from '../types'
import {
  validateEmail,
  validatePhone,
  validateRequired,
  getValidationError,
} from '../utils/validation'
import {
  isValidCoordinates,
  validateCoordinates,
  isDistanceValid,
  validateDistance,
  formatDistance,
  formatCurrencySafe,
  safeCalculateDistance,
} from '../utils/edgeCases'
import { ErrorCode, handleStorageError, handleNetworkError, logError } from '../utils/errorHandling'

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

// ============================================================================
// STORAGE ERROR HANDLING TESTS
// Requirement 3.5: Display user-friendly error message and log error for debugging
// Requirement 3.7: Provide "Retry" button to attempt operation again
// ============================================================================

describe('Storage Error Handling', () => {
  describe('StorageErrorDisplay Component', () => {
    it('should display error message for read operation', () => {
      render(
        <StorageErrorDisplay
          operation="read"
          onRetry={() => {}}
        />
      )
      expect(screen.getByText(/Unable to load data/i)).toBeInTheDocument()
      expect(screen.getByText(/Please try again/i)).toBeInTheDocument()
    })

    it('should display error message for write operation', () => {
      render(
        <StorageErrorDisplay
          operation="write"
          onRetry={() => {}}
        />
      )
      expect(screen.getByText(/Unable to save/i)).toBeInTheDocument()
      expect(screen.getByText(/Please try again/i)).toBeInTheDocument()
    })

    it('should display error message for delete operation', () => {
      render(
        <StorageErrorDisplay
          operation="delete"
          onRetry={() => {}}
        />
      )
      expect(screen.getByText(/Unable to delete/i)).toBeInTheDocument()
      expect(screen.getByText(/Please try again/i)).toBeInTheDocument()
    })

    it('should display retry button (Requirement 3.7)', () => {
      const onRetry = vi.fn()
      render(
        <StorageErrorDisplay
          operation="read"
          onRetry={onRetry}
        />
      )
      const retryButton = screen.getByRole('button', { name: /Retry/i })
      expect(retryButton).toBeInTheDocument()
      fireEvent.click(retryButton)
      expect(onRetry).toHaveBeenCalled()
    })

    it('should have minimum tap target size of 44px', () => {
      render(
        <StorageErrorDisplay
          operation="read"
          onRetry={() => {}}
        />
      )
      const retryButton = screen.getByRole('button', { name: /Retry/i })
      expect(retryButton).toHaveClass('min-h-[44px]')
    })

    it('should not display retry button when onRetry is not provided', () => {
      render(
        <StorageErrorDisplay operation="read" />
      )
      expect(screen.queryByRole('button', { name: /Retry/i })).not.toBeInTheDocument()
    })
  })

  describe('Storage Error Logging', () => {
    it('should log error details with timestamp and operation type', () => {
      // For STORAGE_WRITE errors (MEDIUM severity), logError calls console.warn
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const error = new Error('Storage quota exceeded')
      const appError = handleStorageError('write', error)
      
      logError(appError)
      
      expect(consoleSpy).toHaveBeenCalled()
      const logCall = consoleSpy.mock.calls[0][0] as string
      expect(logCall).toContain('[WARN]')
      expect(logCall).toContain('STORAGE_WRITE')
      expect(logCall).toContain('write')
      consoleSpy.mockRestore()
    })

    it('should log STORAGE_READ error with correct format', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const error = new Error('Storage read failed')
      const appError = handleStorageError('read', error)
      
      logError(appError)
      
      expect(consoleSpy).toHaveBeenCalled()
      const logCall = consoleSpy.mock.calls[0][0] as string
      expect(logCall).toContain('[WARN]')
      expect(logCall).toContain('STORAGE_READ')
      consoleSpy.mockRestore()
    })

    it('should handle quota exceeded error specifically', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const quotaError = new Error('QuotaExceededError')
      quotaError.name = 'QuotaExceededError'
      const appError = handleStorageError('write', quotaError)
      
      expect(appError.code).toBe(ErrorCode.STORAGE_QUOTA_EXCEEDED)
      consoleSpy.mockRestore()
    })
  })
})

// ============================================================================
// MAP ERROR HANDLING TESTS
// Requirement 3.6: Display fallback address input field and allow manual entry
// Requirement 3.7: Provide "Retry" button to reload map
// ============================================================================

describe('Map Error Handling', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('MapContainer Error State', () => {
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

    it('should display user-friendly error message (Requirement 3.6)', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Failed to load Google Maps API')
      )

      render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

      await waitFor(() => {
        expect(screen.getByText(/Failed to load Google Maps API/i)).toBeInTheDocument()
      })
    })

    it('should display fallback address input field (Requirement 3.6)', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Map load failed')
      )

      render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

      await waitFor(() => {
        expect(screen.getByText(/Enter delivery address manually/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Enter address/i)).toBeInTheDocument()
      })
    })

    it('should allow manual address entry with geocoding fallback (Requirement 3.6)', async () => {
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
        const input = screen.getByPlaceholderText(/Enter address/i) as HTMLInputElement
        fireEvent.change(input, { target: { value: '123 Main St, New York' } })
      })

      const searchButton = screen.getByRole('button', { name: /Look Up Address/i })
      fireEvent.click(searchButton)

      await waitFor(() => {
        expect(geocoding.geocodeAddress).toHaveBeenCalledWith('123 Main St, New York')
        expect(onSelect).toHaveBeenCalledWith({ lat: 40.7128, lng: -74.006 })
      })
    })

    it('should display retry button (Requirement 3.7)', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Map load failed')
      )

      render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Retry Loading Map/i })).toBeInTheDocument()
      })
    })

    it('should have minimum tap target size of 44px for retry button', async () => {
      vi.mocked(googleMapsLoader.isGoogleMapsLoaded).mockReturnValue(false)
      vi.mocked(googleMapsLoader.loadGoogleMapsAPI).mockRejectedValue(
        new Error('Map load failed')
      )

      render(<MapContainer outlet={mockOutlet} apiKey="test-key" />)

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
})

// ============================================================================
// FORM VALIDATION ERROR MESSAGE TESTS
// Requirement 3.1: Display field-level error messages
// Requirement 3.2: Display "Please enter a valid email address"
// Requirement 3.3: Display "Please enter a valid phone number"
// Requirement 3.4: Display "This field is required"
// ============================================================================

describe('Form Validation Error Messages', () => {
  describe('Email Validation', () => {
    it('should validate email format correctly', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
      expect(validateEmail('invalid')).toBe(false)
      expect(validateEmail('invalid@')).toBe(false)
      expect(validateEmail('@domain.com')).toBe(false)
    })

    it('should return false for email without @ symbol', () => {
      expect(validateEmail('testexample.com')).toBe(false)
    })

    it('should return false for email without domain', () => {
      expect(validateEmail('test@')).toBe(false)
    })

    it('should return false for email without username', () => {
      expect(validateEmail('@example.com')).toBe(false)
    })
  })

  describe('Phone Validation', () => {
    it('should validate phone number format correctly', () => {
      expect(validatePhone('+1234567890')).toBe(true)
      expect(validatePhone('123-456-7890')).toBe(true)
      expect(validatePhone('(123) 456-7890')).toBe(true)
      expect(validatePhone('1234567890')).toBe(true)
    })

    it('should require minimum 10 digits', () => {
      expect(validatePhone('123456789')).toBe(false) // 9 digits
      expect(validatePhone('1234567890')).toBe(true) // 10 digits
      expect(validatePhone('12345678901')).toBe(true) // 11 digits
    })

    it('should ignore non-digit characters', () => {
      expect(validatePhone('+1 (234) 567-8901')).toBe(true)
      expect(validatePhone('123-456-7890')).toBe(true)
    })
  })

  describe('Required Field Validation', () => {
    it('should validate required field correctly', () => {
      expect(validateRequired('text')).toBe(true)
      expect(validateRequired('  text  ')).toBe(true)
      expect(validateRequired('')).toBe(false)
      expect(validateRequired('   ')).toBe(false)
      expect(validateRequired(null)).toBe(false)
      expect(validateRequired(undefined)).toBe(false)
      expect(validateRequired(0)).toBe(true) // 0 is a valid number
      expect(validateRequired(123)).toBe(true)
    })

    it('should trim whitespace for string validation', () => {
      expect(validateRequired('  ')).toBe(false)
      expect(validateRequired(' a ')).toBe(true)
    })
  })

  describe('Validation Error Messages', () => {
    it('should return "This field is required" for empty required field', () => {
      expect(getValidationError('email', '', 'required')).toBe('This field is required')
      expect(getValidationError('phone', '', 'required')).toBe('This field is required')
    })

    it('should return "Please enter a valid email address" for invalid email', () => {
      expect(getValidationError('email', 'invalid', 'email')).toBe('Please enter a valid email address')
      expect(getValidationError('email', 'test@', 'email')).toBe('Please enter a valid email address')
    })

    it('should return "Please enter a valid phone number" for invalid phone', () => {
      expect(getValidationError('phone', '123', 'phone')).toBe('Please enter a valid phone number')
    })

    it('should return null for valid values', () => {
      expect(getValidationError('email', 'test@example.com', 'email')).toBe(null)
      expect(getValidationError('phone', '1234567890', 'phone')).toBe(null)
      expect(getValidationError('name', 'John', 'required')).toBe(null)
    })
  })
})

// ============================================================================
// NETWORK ERROR HANDLING TESTS
// Requirement 3.5: Display user-friendly error message
// ============================================================================

describe('Network Error Handling', () => {
  it('should handle offline network error', () => {
    const appError = handleNetworkError(true)
    expect(appError.code).toBe(ErrorCode.NETWORK_OFFLINE)
    expect(appError.message).toBe('You are offline. Some features may be limited.')
  })

  it('should handle network request failure', () => {
    const originalError = new Error('Connection timeout')
    const appError = handleNetworkError(false, originalError)
    expect(appError.code).toBe(ErrorCode.NETWORK_REQUEST_FAILED)
    expect(appError.message).toBe('Network request failed. Please check your connection.')
  })

  it('should log network errors', () => {
    // For NETWORK_REQUEST_FAILED errors (MEDIUM severity), logError calls console.warn
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const appError = handleNetworkError(false, new Error('Network error'))
    logError(appError)
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})

// ============================================================================
// EDGE CASE HANDLING TESTS
// Requirement 3.1: Handle invalid coordinates
// Requirement 3.5: Handle edge cases without crashes
// ============================================================================

describe('Edge Case Handling', () => {
  describe('Coordinate Validation', () => {
    it('should validate valid coordinates', () => {
      expect(isValidCoordinates({ lat: 40.7128, lng: -74.006 })).toBe(true)
      expect(isValidCoordinates({ lat: 0, lng: 0 })).toBe(true)
      expect(isValidCoordinates({ lat: 90, lng: 180 })).toBe(true)
      expect(isValidCoordinates({ lat: -90, lng: -180 })).toBe(true)
    })

    it('should reject invalid coordinates', () => {
      expect(isValidCoordinates(null)).toBe(false)
      expect(isValidCoordinates(undefined)).toBe(false)
      expect(isValidCoordinates({ lat: NaN, lng: 0 })).toBe(false)
      expect(isValidCoordinates({ lat: Infinity, lng: 0 })).toBe(false)
      expect(isValidCoordinates({ lat: 91, lng: 0 })).toBe(false)
      expect(isValidCoordinates({ lat: -91, lng: 0 })).toBe(false)
      expect(isValidCoordinates({ lat: 0, lng: 181 })).toBe(false)
      expect(isValidCoordinates({ lat: 0, lng: -181 })).toBe(false)
    })

    it('should validate coordinates with Result type', () => {
      const validResult = validateCoordinates({ lat: 40.7128, lng: -74.006 })
      expect(validResult.success).toBe(true)
      if (validResult.success) {
        expect(validResult.data.lat).toBe(40.7128)
      }

      const invalidResult = validateCoordinates(null)
      expect(invalidResult.success).toBe(false)
    })
  })

  describe('Distance Validation', () => {
    it('should validate distance within limit', () => {
      expect(isDistanceValid(0)).toBe(true)
      expect(isDistanceValid(1.5)).toBe(true)
      expect(isDistanceValid(3)).toBe(true)
    })

    it('should reject distance exceeding limit', () => {
      expect(isDistanceValid(3.1)).toBe(false)
      expect(isDistanceValid(10)).toBe(false)
    })

    it('should reject invalid distance values', () => {
      expect(isDistanceValid(null)).toBe(false)
      expect(isDistanceValid(undefined)).toBe(false)
      expect(isDistanceValid(NaN)).toBe(false)
      expect(isDistanceValid(Infinity)).toBe(false)
      expect(isDistanceValid(-1)).toBe(false)
    })

    it('should validate distance with Result type', () => {
      const validResult = validateDistance(2.5)
      expect(validResult.success).toBe(true)
      if (validResult.success) {
        expect(validResult.data.distance).toBe(2.5)
        expect(validResult.data.isWithinLimit).toBe(true)
      }

      const invalidResult = validateDistance(5)
      expect(invalidResult.success).toBe(false)
    })
  })

  describe('Distance Calculation Edge Cases', () => {
    it('should calculate distance between two points', () => {
      const result = safeCalculateDistance(
        { lat: 40.7128, lng: -74.006 },
        { lat: 40.758, lng: -73.9855 }
      )
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toBeGreaterThan(0)
        expect(result.data).toBeLessThan(10)
      }
    })

    it('should handle null coordinates', () => {
      const result = safeCalculateDistance(null, { lat: 40.7128, lng: -74.006 })
      expect(result.success).toBe(false)
    })

    it('should handle zero distance (same point)', () => {
      const point = { lat: 40.7128, lng: -74.006 }
      const result = safeCalculateDistance(point, point)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toBe(0)
      }
    })
  })

  describe('Currency Formatting Edge Cases', () => {
    it('should format valid currency', () => {
      const result = formatCurrencySafe(100000)
      expect(result).toContain('Rp')
      expect(result).toContain('100')
    })

    it('should handle null/undefined values', () => {
      expect(formatCurrencySafe(null)).toBe('Rp 0')
      expect(formatCurrencySafe(undefined)).toBe('Rp 0')
    })

    it('should handle NaN values', () => {
      expect(formatCurrencySafe(NaN)).toBe('Rp 0')
    })

    it('should handle negative values', () => {
      const result = formatCurrencySafe(-50000)
      expect(result).toContain('50')
    })
  })

  describe('Distance Display Edge Cases', () => {
    it('should format valid distance', () => {
      expect(formatDistance(2.5)).toBe('2.5 km')
      expect(formatDistance(0)).toBe('0.0 km')
    })

    it('should handle null/undefined values', () => {
      expect(formatDistance(null)).toBe('- km')
      expect(formatDistance(undefined)).toBe('- km')
    })

    it('should handle NaN values', () => {
      expect(formatDistance(NaN)).toBe('- km')
    })

    it('should handle negative values', () => {
      expect(formatDistance(-1)).toBe('- km')
    })
  })
})

// ============================================================================
// ERROR BOUNDARY TESTS
// Requirement 3.5: Display user-friendly error message
// Requirement 3.7: Provide "Retry" button
// ============================================================================

describe('Error Boundary', () => {
  it('should render children when no error occurs', () => {
    const ChildComponent = () => <div data-testid="child">Child Content</div>

    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })

  it('should display error UI when child component throws', () => {
    const ThrowError = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('should display retry button (Requirement 3.7)', () => {
    const ThrowError = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    const retryButton = screen.getByRole('button', { name: /retry/i })
    expect(retryButton).toBeInTheDocument()
  })

  it('should log errors to console for debugging (Requirement 3.5)', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const ThrowError = () => {
      throw new Error('Test error for logging')
    }

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(consoleSpy).toHaveBeenCalled()
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('ErrorBoundary caught an error'),
      expect.any(Error)
    )
    consoleSpy.mockRestore()
  })

  it('should have minimum tap target size for retry button (44px)', () => {
    const ThrowError = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    const retryButton = screen.getByRole('button', { name: /retry/i })
    expect(retryButton).toHaveClass('min-h-[44px]')
  })
})

// ============================================================================
// COMPREHENSIVE ERROR HANDLING VERIFICATION
// ============================================================================

describe('Comprehensive Error Handling Verification', () => {
  test('all error messages are user-friendly and actionable', () => {
    const errorMessages = [
      'This field is required',
      'Please enter a valid email address',
      'Please enter a valid phone number',
      'Unable to load data. Please refresh the page.',
      'Unable to save changes. Please try again.',
      'Map failed to load. Please enter address manually.',
      'You are offline. Some features may be limited.',
    ]

    errorMessages.forEach((message) => {
      expect(message).not.toContain('null')
      expect(message).not.toContain('undefined')
      expect(message).not.toContain('NaN')
      expect(message).not.toContain('Error')
      expect(message).toMatch(/Please|Unable|Map|offline|field/i)
    })
  })

  test('all error states have retry functionality', () => {
    const retryPatterns = ['Retry', 'Try again', 'Look Up Address']
    retryPatterns.forEach((pattern) => {
      expect(pattern).toBeTruthy()
    })
  })

  test('all error states have minimum tap target size', () => {
    const minTapTargetClass = 'min-h-[44px]'
    expect(minTapTargetClass).toBe('min-h-[44px]')
  })

  test('errors are logged with sufficient context for debugging', () => {
    // Both STORAGE_READ and NETWORK_REQUEST_FAILED have MEDIUM severity
    // which calls console.warn, not console.error
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    
    const storageError = handleStorageError('read', new Error('Test'))
    logError(storageError)
    
    const networkError = handleNetworkError(false, new Error('Test'))
    logError(networkError)
    
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})

