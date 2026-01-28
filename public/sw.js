self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open("pasala-shell-v1")
      .then((cache) =>
        cache.addAll([
          "/",
          "/manifest.json",
          "/apple-icon.png",
          "/icon-light-32x32.png",
          "/icon-dark-32x32.png",
          "/icon.svg",
        ])
      )
      .then(() => self.skipWaiting())
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== "pasala-shell-v1")
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match("/")))
    return
  }

  const url = new URL(request.url)
  const isSameOrigin = url.origin === self.location.origin
  const isStaticAsset =
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "image" ||
    request.destination === "font"

  if (!isSameOrigin || !isStaticAsset) return

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached
      return fetch(request)
        .then((response) => {
          if (!response || response.status !== 200) return response
          const copy = response.clone()
          caches.open("pasala-shell-v1").then((cache) => cache.put(request, copy))
          return response
        })
        .catch(() => cached)
    })
  )
})
