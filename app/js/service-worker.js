let cacheName = 'v1';
let cacheFiles = [
  '/index.html',
  '/restaurant.html',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
  '/js/service-worker.js',
  '/css/styles.css',
  '/css/media_queries.css',
  '/css/media_queries_reviews.css',
  '/data/restaurants.json'
];


self.addEventListener('fetch',(e)=>{
  console.log("[serviceWorker] has fetching",e.request.url);
});

self.addEventListener('install',(e)=>{
  console.log("[serviceWorker] has installed");

  e.waitUntil(

    caches.open(cacheName)
      .then((cache)=>{
        console.log("[serviceWorker] caching files");
        return cache.addAll(cacheFiles);
      })
      .catch((err)=>{
        console.log("Error has occured when caching",err);
      })

  );
});

self.addEventListener('activate',(e)=>{
  console.log("[serviceWorker] has activated");
});
