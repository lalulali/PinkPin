/**
 * Browser Cache Utilities
 * Implements browser-side caching for images and fonts
 * Requirement 13.2: Implement browser cache for images and fonts
 */

/**
 * Preload critical images for faster browser caching
 * @param imageUrls - Array of image URLs to preload
 */
export function preloadImages(imageUrls: string[]): void {
  if (typeof window === 'undefined') return

  imageUrls.forEach((url) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = url
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

/**
 * Preload fonts for faster browser caching
 * @param fontUrls - Array of font URLs to preload
 * @param fontDisplay - Font display strategy
 */
export function preloadFonts(
  fontUrls: string[],
  fontDisplay: 'swap' | 'block' | 'fallback' | 'optional' = 'swap'
): void {
  if (typeof window === 'undefined') return

  fontUrls.forEach((url) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.href = url
    link.crossOrigin = 'anonymous'
    link.setAttribute('style', `font-display: ${fontDisplay}`)
    document.head.appendChild(link)
  })
}

/**
 * Set up browser image caching with link headers
 * Creates link elements for image preloading
 * @param images - Array of image objects with src and sizes
 */
export function setupImageCaching(
  images: Array<{ src: string; sizes?: string; type?: string }>
): void {
  if (typeof window === 'undefined') return

  images.forEach(({ src, sizes, type }) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    if (sizes) link.setAttribute('sizes', sizes)
    if (type) link.setAttribute('type', type)
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

/**
 * Cache API responses in sessionStorage for faster subsequent loads
 * @param key - Storage key
 * @param data - Data to cache
 * @param ttl - Time to live in milliseconds
 */
export function cacheApiResponse<T>(key: string, data: T, ttl: number = 300000): void {
  if (typeof window === 'undefined') return

  try {
    const item = {
      data,
      timestamp: Date.now(),
      ttl,
    }
    sessionStorage.setItem(`cache_${key}`, JSON.stringify(item))
  } catch {
    // Ignore storage errors (quota exceeded, private browsing, etc.)
  }
}

/**
 * Get cached API response from sessionStorage
 * @param key - Storage key
 * @returns Cached data or null if expired/not found
 */
export function getCachedApiResponse<T>(key: string): T | null {
  if (typeof window === 'undefined') return null

  try {
    const item = sessionStorage.getItem(`cache_${key}`)
    if (!item) return null

    const cached = JSON.parse(item) as { data: T; timestamp: number; ttl: number }
    const isExpired = Date.now() - cached.timestamp > cached.ttl

    if (isExpired) {
      sessionStorage.removeItem(`cache_${key}`)
      return null
    }

    return cached.data
  } catch {
    return null
  }
}

/**
 * Clear all cached API responses
 */
export function clearApiCache(): void {
  if (typeof window === 'undefined') return

  try {
    Object.keys(sessionStorage)
      .filter((key) => key.startsWith('cache_'))
      .forEach((key) => sessionStorage.removeItem(key))
  } catch {
    // Ignore storage errors
  }
}