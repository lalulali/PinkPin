/**
 * Browser Cache Hook
 * React hook for browser caching utilities
 * Requirement 13.2: Implement browser cache for images and fonts
 */

import { useEffect } from 'react'
import {
  preloadImages,
  preloadFonts,
  setupImageCaching,
  cacheApiResponse,
  getCachedApiResponse,
  clearApiCache,
} from '../utils/browserCache'

/**
 * Hook to preload images for faster browser caching
 * @param imageUrls - Array of image URLs to preload
 */
export function usePreloadImages(imageUrls: string[]): void {
  useEffect(() => {
    preloadImages(imageUrls)
  }, [imageUrls])
}

/**
 * Hook to preload fonts for faster browser caching
 * @param fontUrls - Array of font URLs to preload
 * @param fontDisplay - Font display strategy
 */
export function usePreloadFonts(
  fontUrls: string[],
  fontDisplay: 'swap' | 'block' | 'fallback' | 'optional' = 'swap'
): void {
  useEffect(() => {
    preloadFonts(fontUrls, fontDisplay)
  }, [fontUrls, fontDisplay])
}

/**
 * Hook to set up image caching
 * @param images - Array of image objects to preload
 */
export function useImageCaching(
  images: Array<{ src: string; sizes?: string; type?: string }>
): void {
  useEffect(() => {
    setupImageCaching(images)
  }, [images])
}

/**
 * Hook to cache and retrieve API responses
 * @param key - Cache key
 * @param fetcher - Data fetcher function
 * @param ttl - Time to live in milliseconds (default 5 minutes)
 * @returns Cached data and refresh function
 */
export function useApiCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 300000
): { data: T | null; isLoading: boolean; refresh: () => Promise<void> } {
  const cached = getCachedApiResponse<T>(key)

  return {
    data: cached,
    isLoading: false,
    refresh: async () => {
      const data = await fetcher()
      cacheApiResponse(key, data, ttl)
    },
  }
}

export { cacheApiResponse, getCachedApiResponse, clearApiCache }