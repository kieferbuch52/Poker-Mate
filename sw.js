const CACHE = 'poker-mate-v90';
const ASSETS = ['./','./index.html','./core-utils.js?v=9.0.0','./styles.css?v=9.0.0','./js/00-runtime.js?v=9.0.0','./js/10-config.js?v=9.0.0','./js/20-state.js?v=9.0.0','./js/30-shell.js?v=9.0.0','./js/40-sessions.js?v=9.0.0','./js/50-ranges.js?v=9.0.0','./js/60-tools.js?v=9.0.0','./js/70-review-bankroll.js?v=9.0.0','./js/80-components.js?v=9.0.0','./js/90-data.js?v=9.0.0','./app.js?v=9.0.0','./equity-worker.js?v=9.0.0','./auth.mjs?v=9.0.0','./firebase-config.js?v=9.0.0','./FIREBASE_SETUP.md','./ARCHITECTURE.md','./js/module-order.json','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const request=event.request;
  if(request.mode==='navigate'){
    event.respondWith(fetch(request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',copy));return response;}).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(fetch(request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));return response;}).catch(()=>caches.match(request)));
});
