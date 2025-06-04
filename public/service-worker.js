const CACHE_NAME = 'starbucks-clone-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // '/static/js/bundle.js', // Adjust if your main JS bundle has a different name/path
  // '/static/css/main.css', // Adjust if your main CSS bundle has a different name/path
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
  // '/logo.png' // Assuming logo.png is in public and used
  // Add other important static assets here, like fonts or critical images
];

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
