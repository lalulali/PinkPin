import { StorageAdapter } from './StorageAdapter'
import { LocalStorageAdapter } from './LocalStorageAdapter'

let storageAdapter: StorageAdapter | null = null

/**
 * Get the current storage adapter instance
 * Creates a LocalStorageAdapter if none exists
 */
export function getStorageAdapter(): StorageAdapter {
  if (!storageAdapter) {
    storageAdapter = new LocalStorageAdapter()
  }
  return storageAdapter
}

/**
 * Set a custom storage adapter
 * Allows switching between localStorage, API, or other implementations
 */
export function setStorageAdapter(adapter: StorageAdapter): void {
  storageAdapter = adapter
}

export type { StorageAdapter } from './StorageAdapter'
export { LocalStorageAdapter } from './LocalStorageAdapter'
