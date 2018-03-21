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
  console.log("[serviceWorker] is fetching",e.request.url);

  e.respondWith(
    fetch(e.request).then((response)=>{
      if(response.status == 404){
        return new Response("Whoops, Page Not Found!");
      }
      return response;
    }).catch(()=>{
      return new Response("Uh Oh, Seems Like The Connection Is Not Enabled!");
    })
  )
});

self.addEventListener('install',(e)=>{
  console.log("[serviceWorker] has installed");

  e.waitUntil(
    //Opens the new cache with the name
    caches.open(cacheName)
      .then((cache)=>{
        console.log("[serviceWorker] caching files");
        //Caches all the files within the cacheFiles array
        return cache.addAll(cacheFiles);
      })
      .catch((err)=>{
        console.log("Error has occured when caching",err);
      })

  );
});

self.addEventListener('activate',(e)=>{
  console.log("[serviceWorker] has activated");

  //Keeps service worker activate event open until completed method below
  e.waitUntil(

    caches.keys().then((cacheNames)=>{
      //Checks through each of the promises / arguments sent from the above .keys() method
      return Promise.all(cacheNames.map((thisCacheName)=>{
        //Checks to find a cache that is not the current cache name set at the line #1
        if(thisCacheName !== cacheName){
          console.log("[serviceWorker] deleting cache",thisCacheName);
          //Deletes the cache
          return caches.delete(thisCacheName);
        }
      }));
    })

  );
});
