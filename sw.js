/* Hifz Grid World — offline app shell service worker.
   Caches the app shell + three.js so the app opens offline.
   Quran API / audio requests pass straight through to the network. */
const CACHE = 'hifz-grid-world-v1';
const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll([
      './', './index.html', './manifest.webmanifest',
      './icons/icon-192.png', './icons/icon-512.png',
      './icons/maskable-512.png', './icons/apple-touch-icon.png',
      CDN
    ])).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks =>
      Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  const shell = u.origin === self.location.origin && (
    u.pathname.endsWith('/') ||
    u.pathname.endsWith('.html') ||
    u.pathname.endsWith('.webmanifest') ||
    u.pathname.includes('/icons/')
  );
  if (!shell && u.href !== CDN) return;          // dynamic APIs/audio: network only
  e.respondWith(
    caches.match(e.request).then(hit => hit ||
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => hit)
    )
  );
});
