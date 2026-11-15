const CACHE='brewplan-shell-v1';
const SHELL=['/','/manifest.webmanifest','/icon.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin)return;
 if(url.pathname.startsWith('/rest/')||url.pathname.startsWith('/auth/')||url.pathname.startsWith('/storage/'))return;
 if(request.mode==='navigate'){event.respondWith(fetch(request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('/',copy));return response;}).catch(()=>caches.match('/')));return;}
 if(SHELL.includes(url.pathname)){event.respondWith(caches.match(request).then(cached=>cached||fetch(request)));return;}
});
