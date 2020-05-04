const assets = [
    '/',
    'index.html',
    'style.css',
    'app.js',
    'cat.js',
    'dict.js',
    'manifest.json',
    'favicon.ico',
    'https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.css',
    'https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
    'https://unpkg.com/dexie@latest/dist/dexie.js'
];

const staticCacheName = 'app-cache-v1';

self.addEventListener('install', event => {
    console.log('Installing service worker and caching static assets');
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            return cache.addAll(assets);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        }).catch(error => {})
    );
});
