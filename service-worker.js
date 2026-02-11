const CACHE_NAME = 'tilawa-cache-v1';
const ASSETS_TO_CACHE = [
'./',
'./index.html',
'./style.css',
'./script.js',
'./manifest.json',
'./icon-192.png',
'./icon-512.png'
];
self.addEventListener('install', (event) => {
event.waitUntil(
caches.open(CACHE_NAME).then((cache) => {
return cache.addAll(ASSETS_TO_CACHE);
})
);
self.skipWaiting();
});
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
self.addEventListener('fetch', (event) => {
const url = new URL(event.request.url);
if (url.pathname.endsWith('.mp3') || url.hostname.includes('mp3quran.net')) {
return;
}
if (event.request.mode === 'navigate') {
event.respondWith(
fetch(event.request)
.catch(() => {
return caches.match('./index.html');
})
);
return;
}
event.respondWith(
caches.match(event.request).then((response) => {
return response || fetch(event.request);
})
);
});