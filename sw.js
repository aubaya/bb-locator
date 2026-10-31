// Bump the version to invalidate the cache after changing any cached file.
const CACHE = 'bb-locator-v6';
const SHELL = [
    './',
    'index.html',
    'manifest.webmanifest',
    'assets/billy-asking.png',
    'assets/arrow1.png',
    'assets/icons/favicon.svg',
    'assets/icons/favicon-32.png',
    'assets/icons/apple-touch-icon.png',
    'assets/icons/icon-192.png',
    'assets/icons/icon-512.png',
    'assets/icons/icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) =>
            cache.addAll(SHELL.map((url) => new Request(url, { cache: 'reload' })))
        )
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

// Network first (bypassing the browser HTTP cache); the SW cache is only the offline fallback.
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    event.respondWith(
        fetch(event.request, { cache: 'no-cache' })
            .then((response) => {
                if (response.ok && new URL(event.request.url).origin === location.origin) {
                    const copy = response.clone();
                    caches.open(CACHE).then((cache) => cache.put(event.request, copy));
                }
                return response;
            })
            .catch(() => caches.match(event.request).then((hit) => hit || caches.match('index.html')))
    );
});
