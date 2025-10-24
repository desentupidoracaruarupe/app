const CACHE_NAME = "desentupidora-cache-v1.0.2";

const urlsToCache = [
  "/",
  "/index.html",
  "/css/index.css",
  "/images/logo.png",
  "/images/desentupimento.png",
  "/images/icons/icon-192.png",
  "/images/icons/icon-512.png",
  "/images/servicos/aguas-pluviais.png",
  "/images/servicos/caixa-de-gordura.png",
  "/images/servicos/caixa.png",
  "/images/servicos/esgoto.png",
  "/images/servicos/fossa.png",
  "/images/servicos/pia.png",
  "/images/servicos/vaso.png",
  "/fonts/MaterialIcons-Regular.woff2",
  "/fonts/Roboto-Bold.ttf",
  "/fonts/Roboto-Regular.ttf",
];

// Instala o SW e salva arquivos no cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa o SW e remove caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Intercepta requisições e retorna do cache quando offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
