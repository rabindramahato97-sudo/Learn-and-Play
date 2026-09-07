const CACHE="learn-play-v16";
const ASSETS=["./","./index.html","./manifest.json","./icon.svg"];
self.addEventListener("install",event=>{
 self.skipWaiting();
 event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener("activate",event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(
  keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
 )).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",event=>{
 event.respondWith(fetch(event.request).then(r=>{
  const c=r.clone(); caches.open(CACHE).then(cache=>cache.put(event.request,c)); return r;
 }).catch(()=>caches.match(event.request)));
});
