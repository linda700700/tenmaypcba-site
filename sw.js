/*
 * A service worker exists here for one reason: the host answers every file with
 * cache-control: max-age=600, including files whose names already contain a
 * content hash. Ten minutes later the browser revalidates all of them — 59
 * conditional requests — which is a visible delay for a buyer returning to
 * re-read a spec before sending files. The host will not let us change that
 * header, so the browser is told once, here.
 *
 * Scope is deliberately narrow:
 *   - only GET, same-origin, under /assets/
 *   - HTML is never served from cache: a deploy has to be visible on the next
 *     load, and a cached document is how a site silently freezes for a visitor
 *   - only a 200 basic response is stored, so an error page can never replace
 *     a real asset
 *
 * CACHE is rewritten to a per-build value at build time. Every deploy therefore
 * starts with an empty cache and deletes the previous one, which also covers
 * /assets/images/*.webp — those names carry no hash, so the version is what
 * guarantees a replaced photo reaches the buyer.
 */
const CACHE = 'tm-assets-index-BLV-WdA-.js';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k.indexOf('tm-assets-') === 0 && k !== CACHE)
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try {
    url = new URL(req.url);
  } catch (e) {
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (url.pathname.indexOf('/assets/') !== 0) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res && res.status === 200 && res.type === 'basic') {
        cache.put(req, res.clone()).catch(() => {});
      }
      return res;
    })()
  );
});
