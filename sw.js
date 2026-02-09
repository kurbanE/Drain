const cacheName = 'drain-v9';
const assets = ['./', './index.html', './manifest.json', './drain.ico'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
  // Yeni service worker'ı hemen aktif et
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheName) {
          // Eski cache'leri sil
          return caches.delete(key);
        }
      }));
    }).then(() => {
      // Tüm sayfaları kontrol et
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      // Cache'ten dön, yoksa sunucudan al
      return res || fetch(e.request).then(response => {
        // HTML dosyalarını her zaman güncelle
        const url = new URL(e.request.url);
        if (url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname === './') {
          return caches.open(cacheName).then(cache => {
            cache.put(e.request, response.clone());
            return response;
          });
        }
        return response;
      });
    })
  );
});
