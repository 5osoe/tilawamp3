const CACHE_NAME = 'tilawa-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
  // إضافة أي ملفات CSS أو JS خارجية هنا إذا وجدت، ولكن حالياً كل شيء في ملف واحد
];

// Install Event - Cache Static Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Network First Strategy for HTML, Stale-While-Revalidate for others
// Important: IGNORE MP3 FILES to prevent huge storage usage
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Ignore Audio Files (Don't cache MP3s)
  if (url.pathname.endsWith('.mp3') || url.hostname.includes('mp3quran.net')) {
    return; // Let the browser handle it directly from network
  }

  // 2. Handle Navigation (HTML) - Network First, fall back to cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match('./index.html');
        })
    );
    return;
  }

  // 3. Handle Static Assets - Cache First
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});