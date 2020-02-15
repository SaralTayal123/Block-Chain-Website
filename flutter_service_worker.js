'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "/manifest.json": "bfaeaca27566cebe13e1732464cb7c58",
"/main.dart.js": "f00612c739f06e51b0cd8b77cbe8f909",
"/index.html": "86e69778b63635e3dedea9ab73446df1",
"/icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"/icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"/assets/AssetManifest.json": "9b8ab4c4be3eef494b09b4a3ec27d6c3",
"/assets/lib/images/logo.png": "4780302cc29bde87083389bfa96d24fa",
"/assets/FontManifest.json": "01700ba55b08a6141f33e168c4a6c22f",
"/assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"/assets/LICENSE": "9e8760f5de9816c5610a25315d421de9",
"/assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request, {
          credentials: 'include'
        });
      })
  );
});
