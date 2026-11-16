/* 오프라인 대응 서비스 워커
   - 같은 주소의 파일(화면·data/*.json)은 항상 "최신을 먼저" 받아 오고, 인터넷이 안 될 때만 저장본을 써요.
     그래서 내용을 고쳐 올리면 바로 반영돼요.
   - 글꼴은 한 번 받아 두면 다음부터 저장본을 먼저 써요. */
var VERSION = 'am-guide-v1';
var CORE = [
  './', 'index.html', 'manifest.webmanifest',
  'data/config.json', 'data/cuts.json', 'data/contents.json', 'data/guide.json', 'data/questions.json',
  'assets/icon-192.png', 'assets/icon-512.png', 'assets/icon-180.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) {
    return Promise.all(CORE.map(function (u) { return c.add(u).catch(function () {}); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  if (url.origin === self.location.origin) {
    /* 최신 우선 → 실패하면 저장본 */
    e.respondWith(
      fetch(new Request(req.url, { cache: 'no-cache' })).then(function (res) {
        if (res && res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
        return res;
      }).catch(function () {
        return caches.match(req).then(function (hit) {
          return hit || (req.mode === 'navigate' ? caches.match('index.html') : Response.error());
        });
      })
    );
    return;
  }

  if (/(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(url.hostname)) {
    /* 글꼴: 저장본 먼저, 뒤에서 갱신 */
    e.respondWith(caches.open(VERSION).then(function (c) {
      return c.match(req).then(function (hit) {
        var net = fetch(req).then(function (res) { if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone()); return res; }).catch(function () { return hit; });
        return hit || net;
      });
    }));
  }
});
