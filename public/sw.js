/**
 * Pink Pin Merchant App Service Worker
 * 
 * Cache-first strategy for static assets (HTML, CSS, JS, fonts, images)
 * Network-first strategy for API calls/data requests
 * Version: 1.0.0
 */

const CACHE_NAME = 'pink-pin-v1';
const STATIC_CACHE_NAME = 'pink-pin-static-v1';
const DYNAMIC_CACHE_NAME = 'pink-pin-dynamic-v1';

// Static assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/dashboard',
  '/orders',
  '/login',
  '/create-order',
  '/manifest.json',
];

// Cache-first asset patterns
const CACHE_FIRST_PATTERNS = [
  /\.(js|jsx|ts|tsx)$/,           // JavaScript/TypeScript files
  /\.(css|scss|sass)$/,           // CSS files
  /\.(woff|woff2|ttf|eot|otf)$/,  // Font files
  /\.(png|jpg|jpeg|gif|svg|ico)$/, // Image files
  /\.(webp|avif)$/,               // Modern image formats
];

// Network-first patterns (API calls, dynamic content)
const NETWORK_FIRST_PATTERNS = [
  /\/api\//,
  /\/orders\//,
  /\/data\//,
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS.map((url) => new Request(url, { cache: 'reload' })));
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return name !== CACHE_NAME && 
                   name !== STATIC_CACHE_NAME && 
                   name !== DYNAMIC_CACHE_NAME;
          })
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Determine caching strategy based on request type
  if (isNetworkFirst(url)) {
    event.respondWith(networkFirst(request));
  } else if (isCacheFirst(url)) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(staleWhileRevalidate(request));
  }
});

/**
 * Check if request should use network-first strategy
 */
function isNetworkFirst(url) {
  return NETWORK_FIRST_PATTERNS.some((pattern) => pattern.test(url.pathname));
}

/**
 * Check if request should use cache-first strategy
 */
function isCacheFirst(url) {
  return CACHE_FIRST_PATTERNS.some((pattern) => pattern.test(url.pathname));
}

/**
 * Cache-first strategy: Try cache first, fall back to network
 */
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Return cached response and update cache in background
    fetchAndCache(request, STATIC_CACHE_NAME);
    return cachedResponse;
  }
  
  // Not in cache, fetch from network
  return fetchAndCache(request, STATIC_CACHE_NAME);
}

/**
 * Network-first strategy: Try network first, fall back to cache
 */
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Clone response before caching (response can only be consumed once)
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlineResponse = await caches.match('/');
      if (offlineResponse) {
        return offlineResponse;
      }
    }
    
    throw error;
  }
}

/**
 * Stale-while-revalidate: Return cached response while updating cache
 */
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const cacheName = isStaticAsset(request.url) ? STATIC_CACHE_NAME : DYNAMIC_CACHE_NAME;
      const cache = caches.open(cacheName);
      cache.then((c) => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(() => {
    // Silently fail - we have cached response
    return null;
  });
  
  // Return cached response immediately if available, otherwise wait for network
  return cachedResponse || fetchPromise;
}

/**
 * Fetch and cache helper
 */
async function fetchAndCache(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    throw error;
  }
}

/**
 * Check if URL is a static asset
 */
function isStaticAsset(url) {
  const urlObj = new URL(url, self.location.origin);
  return CACHE_FIRST_PATTERNS.some((pattern) => pattern.test(urlObj.pathname));
}

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.map((name) => caches.delete(name)));
      })
    );
  }
  
  if (event.data && event.data.type === 'APP_READY') {
    // Notify all clients that app is ready (triggers splash screen hide)
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({ type: 'APP_READY' });
      });
    });
  }
});

// Background sync for offline order creation
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-orders') {
    event.waitUntil(syncOrders());
  }
});

/**
 * Sync queued orders when connectivity is restored
 */
async function syncOrders() {
  // This will be called when the browser detects network connectivity
  // The actual sync logic is handled by the offlineService in the main app
  console.log('[SW] Background sync triggered for orders');
  
  // Notify all clients to attempt sync
  const clients = await self.clients.matchAll();
  clients.forEach((client) => {
    client.postMessage({
      type: 'SYNC_ORDERS',
      timestamp: Date.now(),
    });
  });
}

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-72.png',
      vibrate: [100, 50, 100],
      data: {
        url: data.url || '/',
      },
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      self.clients.matchAll({ type: 'window' }).then((clientList) => {
        // Focus existing window if available
        for (const client of clientList) {
          if (client.url === event.notification.data.url && 'focus' in client) {
            return client.focus();
          }
        }
        // Open new window
        if (self.clients.openWindow) {
          return self.clients.openWindow(event.notification.data.url);
        }
      })
    );
  }
});

console.log('[SW] Service Worker loaded');