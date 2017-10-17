// https://jakearchibald.com/2016/caching-best-practices/

const CACHE_NAME = 'split-pay';
const CACHE_TARGET = [
  '/',
  '/assets/manifest.json',
  'styles.d41d8cd98f00b204e980.bundle.css',
  'inline.0163c8edc97b81f76cf6.bundle.js',
  'polyfills.8eba0ab53b5457105d75.bundle.js',
  'vendor.40b7bdadb7863af08573.bundle.js',
  'main.bfd59e38c2ba787e43f1.bundle.js',
];

self.addEventListener('install', (event) => {
  // event.waitUntil(
  //   // caches
  //   //   .open(CACHE_NAME)
  //   //   .then(cache => cache.addAll(CACHE_TARGET))
  //   //   .catch(console.err)

  //   caches.open(CACHE_NAME).then(cache => {
  //     return Promise.all(
  //       CACHE_TARGET.map(url => {
  //         return fetch(new Request(url, { cache: 'no-cache', mode: 'no-cors' }))
  //           .then(response => {
  //             return cache.put(url, response);
  //           });
  //       })
  //     );
  //   })
  // )

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(
        // [
        //   new Request('/styles.css', { cache: 'no-cache' }),
        //   new Request('/script.js', { cache: 'no-cache' })
        // ]
        CACHE_TARGET.map((url) => {
          return new Request(url, { cache: 'no-cache', mode: 'no-cors' })
        })
      ))
  )
});

self.addEventListener('fetch', (event) => {
  // event.respondWith(
  //   caches
  //     .match(event.request)
  //     .then(function (response) {
  //       return response || fetch(event.request);
  //     })
  // );
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );

  // event.respondWith(
  //   fetch(event.request)
  //     .then((response) => {
  //       if (!response.ok) {
  //         // An HTTP error response code (40x, 50x) won't cause the fetch() promise to reject.
  //         // We need to explicitly throw an exception to trigger the catch() clause.
  //         throw Error('response status ' + response.status);
  //       }
  //       // If we got back a non-error HTTP response, return it to the page.
  //       cache.put(event.reqquest.url, response);
  //       return response;
  //     })
  //     .catch(function(error) {
  //       console.warn('Constructing a fallback response, ' +
  //         'due to an error while fetching the real response:', error);

  //       caches
  //         .match(event.request)
  //         .then((response) => {
  //           return response || fetch(event.request);
  //         });
  //     })
  // )
});
