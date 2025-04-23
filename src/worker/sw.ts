// TODO: 배포 할때마다 새로운 값이 할당 될 수 있도록 수정 필요
const CACHE_NAME = `sync-master-cache-${new Date().getTime()}`;
// URLs to cache
const urlsToCache = [
  "/",
  "/404",
  "/offline",

  "/login",
  "/find-id",
  "/find-password",
  "/find-password/result",
  "/find-password/set-password",
  "/find-password/success",

  "/model",

  "/device",
  "/device/list",

  "/cmd",

  "/configuration",
  "/configuration/geofence",
  "/configuration/geofence/add",
  "/configuration/geofence/edit/circular",
  "/configuration/geofence/edit/polygon",
  "/configuration/fw-update",
  "/configuration/edit-profile",

  "/settings",
  "/settings/languages",
  "/settings/my-info",
  "/settings/privacy-policy",

  "/offline.html",
];

// broadcase
const swToClientBroadcast = new BroadcastChannel("sw-to-client");
const clientToSwBroadcast = new BroadcastChannel("client-to-sw");

// state
let isOnline = true;
let isInstallFinish = false;

// self binding
const swSelf = self as unknown as ServiceWorkerGlobalScope;

// ---- install event start
/**
 *
 * @param {InstallEvent} event 서비스워커 install event 객체
 */
const handleServiceWorkerInstall = (
  event: ServiceWorkerGlobalScopeEventMap["install"]
) => {
  console.log("service worker install evnet fire!!!");
  isInstallFinish = false;

  swToClientBroadcast.postMessage({
    type: "INSTALL_START",
  });

  event.waitUntil(generateCacheOnSetup(CACHE_NAME, urlsToCache));
};

/**
 * 설치 단계에서 캐시 생성
 *
 * @param {string} cacheName
 * @param {string[]} urlsToCache
 */
async function generateCacheOnSetup(cacheName: string, urlsToCache: string[]) {
  const cache = await caches.open(cacheName);

  for (const url of urlsToCache) {
    try {
      const response = await fetch(url);

      cache.put(url, response);
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
    }
  }

  console.log("service worker skipWaiting...");

  swSelf.skipWaiting();
}

/**
 * 여러 페이지와 관련 리소스들을 캐싱하는 함수
 *
 * @param {*} cache cache 스토리지 객체
 * @param {*} pageUrls 리소스들을 캐싱할 url 문자열 배열
 */
async function cachePagesAndResources(cache: Cache, pageUrls: string[]) {
  for (const pageUrl of pageUrls) {
    try {
      // 각 페이지 요청 및 응답 확인
      const response = await fetch(pageUrl);
      if (!response.ok) throw new Error(`Failed to fetch ${pageUrl}`);

      // 페이지 자체를 캐싱
      cache.put(pageUrl, response.clone());

      // 페이지 HTML에서 리소스 URL 추출 및 캐싱
      const pageText = await response.text();
      const resourceUrls = extractResourceUrls(pageText);

      await Promise.all(
        resourceUrls.map(async (url) => {
          try {
            const res = await fetch(url);
            if (res.ok) {
              cache.put(url, res);
            }
          } catch (error) {
            console.error(`Failed to cache resource: ${url}`, error);
          }
        })
      );
    } catch (error) {
      console.error(`Error caching resources for ${pageUrl}:`, error);
    }
  }
}

/**
 * HTML에서 리소스 URL을 추출
 *
 * @param {*} htmlText HTML 컨텐츠 문자열
 * @returns htmlText 내 포함 된 리소스 url 배열
 */
function extractResourceUrls(htmlText) {
  const resourceUrls = [];

  // CSS 파일 링크를 추출
  const linkRegex = /<link[^>]+href="([^"]+)"[^>]*>/g;
  let match;
  while ((match = linkRegex.exec(htmlText)) !== null) {
    resourceUrls.push(match[1]);
  }

  // JS 파일 링크를 추출
  const scriptRegex = /<script[^>]+src="([^"]+)"[^>]*>/g;
  while ((match = scriptRegex.exec(htmlText)) !== null) {
    resourceUrls.push(match[1]);
  }

  // 이미지 파일 링크를 추출
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;
  while ((match = imgRegex.exec(htmlText)) !== null) {
    resourceUrls.push(match[1]);
  }

  return resourceUrls;
}
swSelf.addEventListener("install", handleServiceWorkerInstall);
// ---- install event end

// ---- activate event start
/**
 * 활성화 단계에서 오래된 캐시 제거(CACHE_NAME 값이 변경되어 배포되면 이전 캐시들을 삭제)
 *
 * @param {ExtendableEvent} event
 */
const handleServiceWorkerActivate = (event) => {
  console.log("service worker activate event fire!!!");
  swToClientBroadcast.postMessage({
    type: "INSTALL_END",
  });
  isInstallFinish = true;

  event.waitUntil(clearOldCacheOnActivate(CACHE_NAME));
};

async function clearOldCacheOnActivate(currentCachName) {
  const cacheNames = await caches.keys();

  await Promise.all(
    cacheNames.map((cacheName) => {
      if (cacheName !== currentCachName) {
        return caches.delete(cacheName);
      }
    })
  );
}

swSelf.addEventListener("activate", handleServiceWorkerActivate);
// ---- activate event end

// ---- fetch event start

/**
 * 정적 파일 캐싱 (Cache-first)
 *
 * @param {FetchEvent} event 서비스 워커 fetch 이벤트 객체
 */
const handleCachingStatic = (event) => {
  const request = event.request;

  event.respondWith(
    caches.match(request).then((response) => {
      return (
        response ||
        fetch(request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        })
      );
    })
  );
};

/**
 * 온라인 상태일때 캐싱 처리 (Network-first)
 *
 * @param {FetchEvent} event 서비스 워커 fetch 이벤트 객체
 */
const handleOnlineCaching = (event) => {
  const request = event.request;

  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        // 네트워크 요청이 실패하면 캐시에서 반환
        return caches.match(request).then((cachedResponse) => {
          // 캐시된 리스폰스가 있다면 보여주고, 없으면 오프라인 페이지를 보여줌
          return cachedResponse || caches.match("/offline");
        });
      })
  );
};

/**
 * 오프라인 상태일때 캐싱 처리 (Cache-only)
 *
 * @param {FetchEvent} event
 */
const handleOfflineCaching = (
  event: ServiceWorkerGlobalScopeEventMap["fetch"]
) => {
  const request = event.request;
  const requestUrl = new URL(request.url);
  const requestUrlHost = requestUrl.host;
  const clientUrlHost = swSelf.location.host;
  const isCientRequest = requestUrlHost === clientUrlHost;

  if (request.method === "GET" && isCientRequest) {
    const normalizedUrl = requestUrl.origin + requestUrl.pathname;

    event.respondWith(
      caches.match(normalizedUrl).then((cachedResponse) => {
        // urlsToCache에 없는 경로 진입시 오프라인 페이지 표시
        if (
          urlsToCache.findIndex((path) => path === requestUrl.pathname) === -1
        ) {
          return caches.match("/offline");
        }

        return cachedResponse || caches.match("/offline");
      })
    );
  } else {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const errorResponse = new Response(
          JSON.stringify({ message: "No network connection", code: 400 }),
          {
            status: 400, // HTTP 상태 코드 설정
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        return cachedResponse || errorResponse;
      })
    );
  }
};

/**
 * fetch 이벤트에서 리소스 파일 캐싱
 *
 * @param {*} event
 */
const handleServiceWorkerFetch = (
  event: ServiceWorkerGlobalScopeEventMap["fetch"]
) => {
  const request = event.request;

  if (request.url.match(/\.(?:png|jpg|jpeg|svg|gif|css|js)$/)) {
    // 정적 자산 파일을 Cache-first 방식으로 캐싱
    handleCachingStatic(event);
  } else {
    if (isOnline) {
      console.log("first time online mode(menual offline mode)");

      // 온라인 요청에 대해서는 Network-first 방식 사용
      handleOnlineCaching(event);
    } else {
      // 오프라인 요청에 대해서는 Cache-only 방식 사용
      handleOfflineCaching(event);
    }
  }
};
swSelf.addEventListener("fetch", handleServiceWorkerFetch);
// ---- fetch event end

// custom message event
async function handleMessage(event) {
  // {type: string, data: any}
  const message = event.data;

  switch (message.type) {
    case "INIT_INSTALL_CHECK":
      swToClientBroadcast.postMessage({
        type: "INIT_INSTALL_CHECK_RESPONSE",
        data: isInstallFinish,
      });
      break;
    case "SYNC_NETWORK_STATE":
      isOnline = message.data;
    case "INIT_INSTALL_UPDATE":
      isInstallFinish = true;
    default:
      break;
  }
}
// swSelf.addEventListener("message", handleMessage);
clientToSwBroadcast.addEventListener("message", handleMessage);
