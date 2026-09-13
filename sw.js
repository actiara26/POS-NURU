/* Generated with immutable release assets and SHA-256 digests. No database data enters these caches. */
const RELEASE = "1.0.0-mtzziwgq";
const ASSETS = [{"path":"guide.html","hash":"577ad5ca4d6f8b5003aa4b0838d0fd2d4e96b52174d09244c6a50270222fb7fd"},{"path":"GUIDE_IPAD_TH.md","hash":"283e710b84c0b37a7d59b657a0eee605f76f5654e70ea20e987b795f879a3a5a"},{"path":"icon-180.png","hash":"a29afc9221887a9bb1f08f2943ca8151ba1ae070e1feef6827f11d908ad10a1a"},{"path":"icon-192.png","hash":"994c0fce3135941eb6505ab4c432b4e6adf8528ee241ceeb4e26eed4f9b678f4"},{"path":"icon-512.png","hash":"9cb2f3b982864c2ff4362d431a84d609a6330e9d9bf68b4a77e06b4ff6cb5a5b"},{"path":"manifest.webmanifest","hash":"ee766c93fe02411edff80bd6cf482e1b551640442a2050daa95a36c1be847c18"},{"path":"README.md","hash":"e52f0bf50b386f7a4608da6b8a29035cea6f4f3ec69a26c51820c58ac20608a4"},{"path":"releases/1.0.0-mtzziwgq/assets/index-BpO8ArY2.js","hash":"5e5873adcfba7b9ab210f808707ddd2a19f280f5b6a88a9c486463938280c55e"},{"path":"releases/1.0.0-mtzziwgq/assets/index-CPmKxEVo.css","hash":"8eae73d836ad4eca53e9e019c93c1750aea492443ecf7944ad05894f0b2267d4"},{"path":"releases/1.0.0-mtzziwgq/engine.js","hash":"a5b0fd71f61795dee5ecbfe1484a8f669c500065c2934461bc50e7b5fb2b09d2"},{"path":"releases/1.0.0-mtzziwgq/index.html","hash":"985c06e8929538ac48d8030f16a0f623ed02beb4afe43a1e8614955308596f46"},{"path":"releases/1.0.0-mtzziwgq/sqlite.mjs","hash":"a6d3fe46aa3f924e7686329f97b0564549ef1f787e0c19924179aef7f72bcc01"},{"path":"releases/1.0.0-mtzziwgq/sqlite3.wasm","hash":"2ee8f3dab694532afc8840e07703127287662d08b74e6ff50491ce63f00d5752"},{"path":"releases/1.0.0-mtzziwgq/store.mjs","hash":"4de4d3d8dc19c28e455070b1c0960efb914edb41cd42c40feb1a59a314d6bef9"},{"path":"releases/1.0.0-mtzziwgq/worker.mjs","hash":"2d00d7b8dd25a07b031d17df1d9b98cf55cb9cee25539b672016b5ae31b7ee6d"}];
const root = self.registration.scope;
const prefix = `pos-pwa:${root}:`;
const cacheName = prefix + RELEASE;
const metaName = prefix + 'metadata';
const pointer = new URL('active-release', root).href;
const assetURL = path => new URL(path, root).href;
async function activeRelease() { return (await (await caches.open(metaName)).match(pointer))?.text(); }
async function setActive(version) { await (await caches.open(metaName)).put(pointer, new Response(version)); }
self.addEventListener('install', event => event.waitUntil((async () => {
  const cache = await caches.open(cacheName);
  for (const asset of ASSETS) {
    const response = await fetch(assetURL(asset.path), { cache: 'no-store' });
    // Static hosts canonicalize .html URLs. Accept only same-origin redirects,
    // then verify bytes and remove redirect metadata before caching navigation.
    if (!response.ok || (response.redirected && new URL(response.url).origin !== new URL(root).origin)) throw new Error('Incomplete release');
    const bytes = await response.clone().arrayBuffer();
    const hash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)), b => b.toString(16).padStart(2, '0')).join('');
    if (hash !== asset.hash) throw new Error('Release checksum mismatch');
    await cache.put(assetURL(asset.path), new Response(bytes, { headers: {
      'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
    } }));
  }
  await cache.put(assetURL('release-ready'), new Response(RELEASE));
  // Do not replace an active POS session, even when an update has finished downloading.
})()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  // Browser activation on closing all tabs does NOT automatically switch the POS program.
  if (!await activeRelease()) await setActive(RELEASE);
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== new URL(root).origin || !url.href.startsWith(root)) return;
  event.respondWith((async () => {
    const version = await activeRelease();
    if (event.request.mode === 'navigate' && (url.pathname === new URL(root).pathname || url.pathname === new URL('index.html', root).pathname)) {
      const page = version && await (await caches.open(prefix + version)).match(assetURL(`releases/${version}/index.html`));
      return page || new Response('ไฟล์โปรแกรมออฟไลน์ไม่ครบ กรุณาต่ออินเทอร์เน็ตและเปิดใหม่ ห้ามล้างข้อมูลเว็บไซต์', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
    // Release-qualified URLs prevent old UI/new engine mixtures during installation.
    const relative = url.href.slice(root.length).split('?')[0];
    const match = /^releases\/([^/]+)\//.exec(relative);
    if (match) {
      const cached = await (await caches.open(prefix + match[1])).match(assetURL(relative));
      if (cached) return cached;
    }
    if (version) {
      const cached = await (await caches.open(prefix + version)).match(event.request);
      if (cached) return cached;
    }
    return fetch(event.request);
  })());
});
self.addEventListener('message', event => {
  event.waitUntil((async () => {
    try {
      const ready = !!await (await caches.open(cacheName)).match(assetURL('release-ready'));
      if (event.data?.type === 'STATUS') {
        event.ports[0]?.postMessage({ latest: RELEASE, active: await activeRelease(), ready });
      } else if (event.data?.type === 'COMMIT_UPDATE') {
        const windows = (await self.clients.matchAll({ type: 'window', includeUncontrolled: true })).filter(c => c.url.startsWith(root));
        if (!ready || windows.length !== 1 || windows[0].id !== event.source?.id) throw new Error('ปิดหน้าต่าง POS อื่นทั้งหมดก่อนอัปเดต');
        const previous = await activeRelease();
        await setActive(RELEASE);
        await self.skipWaiting();
        // Keep the chosen release and its predecessor; never evict app data or other sites' caches.
        const keep = new Set([metaName, prefix + RELEASE, prefix + previous]);
        for (const name of await caches.keys()) {
          if (name.startsWith(prefix) && !keep.has(name)) await caches.delete(name);
        }
        event.ports[0]?.postMessage({ success: true });
      }
    } catch (error) { event.ports[0]?.postMessage({ error: error.message }); }
  })());
});
