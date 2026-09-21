/**
 * Melojey Modern Furniture — Service Worker
 * Cache-first strategy for static assets, network-first for HTML/data
 */

const CACHE_NAME = 'melojey-v14';
const STATIC_CACHE = 'melojey-static-v14';
const DATA_CACHE = 'melojey-data-v14';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/style.css',
  '/assets/css/showcase.css',
  '/assets/css/shop.css',
  '/assets/js/cart.js',
  '/assets/js/wishlist.js',
  '/assets/js/showcase.js',
  '/assets/js/category.js',
  '/assets/js/script.js',
  '/assets/images/logo.png',
  '/assets/images/favicon.png',
  '/assets/images/pwa-icon-192.png',
  '/assets/images/pwa-icon-512.png',
  '/pages/cart.html',
  '/pages/wishlist.html',
  '/pages/search.html',
];

// Install — pre-cache critical static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' })));
    }).then(() => self.skipWaiting())
  );
});

// Activate — clean up old caches
self.addEventListener('activate', event => {
  const currentCaches = [STATIC_CACHE, DATA_CACHE];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => !currentCaches.includes(name))
          .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch — network-first for HTML, JS, CSS, and API; fallback to cache
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin or CDN requests
  if (!url.origin.includes(self.location.hostname) && !url.hostname.includes('fonts.googleapis.com') && !url.hostname.includes('fonts.gstatic.com')) {
    return;
  }

  const pathname = url.pathname.toLowerCase();
  const isCodeOrDoc = (
    request.headers.get('Accept')?.includes('text/html') ||
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'document' ||
    pathname.endsWith('.html') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.json')
  );

  // HTML, JS, CSS, JSON — Network first, then cache fallback
  if (isCodeOrDoc) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then(cache => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Static images, fonts — cache-first, then network
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        if (!response || !response.ok || response.type === 'opaque') return response;
        const clone = response.clone();
        caches.open(STATIC_CACHE).then(cache => cache.put(request, clone));
        return response;
      });
    })
  );
});
