const CACHE_VERSION = self.__CACHE_VERSION__ || "discipline-os-runtime-v1";
const PRECACHE_URLS = self.__PRECACHE_URLS__ || ["/", "/tasks/", "/habits/", "/finance/", "/reminders/", "/manifest.json", "/icon-192x192.png", "/icon-512x512.png"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_VERSION).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match(event.request).then(cached => cached || caches.match("/"))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) caches.open(CACHE_VERSION).then(cache => cache.put(event.request, response.clone()));
    return response;
  })));
});

self.addEventListener("push", event => {
  let payload = { title: "Discipline OS", body: "Время действовать", url: "/reminders/" };
  try { payload = { ...payload, ...event.data.json() }; } catch {}
  event.waitUntil(self.registration.showNotification(payload.title, { body: payload.body, icon: "/icon-192x192.png", badge: "/icon-192x192.png", data: { url: payload.url }, tag: payload.tag || "discipline-reminder" }));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const target = event.notification.data?.url || "/reminders/";
  event.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(clients => {
    for (const client of clients) {
      if ("focus" in client) { client.navigate(target); return client.focus(); }
    }
    return self.clients.openWindow ? self.clients.openWindow(target) : undefined;
  }));
});
