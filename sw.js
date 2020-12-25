/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/404.html","4c84e87a519623346a4b4f620d6fba8f"],["/about/index.html","1d09bde2759e8cd509a0bd0e6c2caebd"],["/archives/2020/08/index.html","214456a11abde320d24e32a1114383c6"],["/archives/2020/08/page/2/index.html","32cd6170eaf8c8341c255b637dcace1f"],["/archives/2020/09/index.html","8c53fe9d90aeac466e58efb0a7ad7434"],["/archives/2020/10/index.html","9def8ae49ded0ecf2083e1d71b8a8775"],["/archives/2020/11/index.html","9edb10d1005948fb0df8464cfcac0c69"],["/archives/2020/12/index.html","090880719eb4320382bd33b8ddc00b51"],["/archives/2020/index.html","a6e7adf2b407168e75ea1cddb9bc0a16"],["/archives/2020/page/2/index.html","de75e73eb795df6c517620ecf97312b5"],["/archives/2020/page/3/index.html","a162b75b228c4e4596615ea6cc6b188c"],["/archives/index.html","35413276137e50050b3900b50e05e9ec"],["/archives/page/2/index.html","7d5eaac60e44d53ee66ce951326f917c"],["/archives/page/3/index.html","53bb93b68a103021b4f3eb4ec41f7433"],["/assets/css/APlayer.min.css","fbe994054426fadb2dff69d824c5c67a"],["/assets/js/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/assets/js/Meting.min.js","bfac0368480fd344282ec018d28f173d"],["/categories/index.html","4a71b1d1b9af70fe6a1b5d795f5951fe"],["/categories/事件/index.html","2b487f5da836027205a09f46bbae45f0"],["/categories/分享/index.html","d78021cd9710684faae0b9e9791274f2"],["/categories/学习/index.html","978206060dad41091941307dd8c98e9f"],["/categories/工具/index.html","1fd95ee2f60cd1c88f1f1c0f1f404670"],["/categories/工具推荐/index.html","1ddb7bace09166f6bb225600e2e92227"],["/categories/教程/index.html","465c253b06c278a67a0725bfda2f3ce1"],["/categories/教程/page/2/index.html","fdf4552332ee0e7d64ef65305e03a5c2"],["/categories/说明/index.html","9f2407bc99c9be42d002bc5c4a415119"],["/categories/金句分享/index.html","29b5ca74a2e0d4164461021338424a85"],["/css/index.css","f87b894b0fb2227a9853d8acd39f483b"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/download/file/IDM/index.html","a597647dd0f15afb5e27f24693b5d4d1"],["/download/file/anydo/index.html","52535ceffb27b27bc029447040843d0e"],["/download/file/ditto/index.html","8547ba0e4ffcacd24a5c8b9d80d2b4b7"],["/download/file/fastcopy/index.html","b907d6b66d4df41c8a536182f801eaea"],["/download/file/lx-music/index.html","b0c920d8ac570d0dc0e5782dad6b1b66"],["/download/index.html","c43b83295d963e374ad413074b2e3dd9"],["/download/overlay-button.png","1874df840edcf0c56620cdffd50c01e3"],["/download/playground.css","e71f8c523a997bc3d1a314a8a18059cc"],["/font/NotoSerifSC-Bold.css","11804bb9f6525d31f2c0ec13b54739ad"],["/font/NotoSerifSC-Bold.eot","cd52dc1fc25e5befa94e7673bb12c160"],["/font/NotoSerifSC-Bold.svg","5fb9345418b8a8d283db11bfaa1921f4"],["/font/NotoSerifSC-Bold.ttf","22058a3b7dd13202f8bca5e2b163f286"],["/font/NotoSerifSC-Bold.woff","6633d1ba27ca0a2d5a4032970b988fc3"],["/font/NotoSerifSC-Bold.woff2","8f1197816344f5e292ff902cfabdef85"],["/font/NotoSerifSC-Medium.css","e4fd16a9a0677a67832f36a02fc0acd1"],["/font/NotoSerifSC-Medium.eot","28349fd4494e17137321abc4dcd2329b"],["/font/NotoSerifSC-Medium.svg","0996c5f3a6814ad99cb70b37cb14873d"],["/font/NotoSerifSC-Medium.ttf","c7210b21a4ace30f68ff2bed361f761f"],["/font/NotoSerifSC-Medium.woff","d16171707505536bcd839f5afeb77679"],["/font/NotoSerifSC-Medium.woff2","de243bd59f728647e722b8f2397acc68"],["/font/NotoSerifSC-Regular.css","cb8460d1151dbc5d2f8c863c2dc9bd6c"],["/font/NotoSerifSC-Regular.eot","cd874b1af00d2bec2b88ac2e277a00c4"],["/font/NotoSerifSC-Regular.svg","2a9a2285b6c02e4eaf78b461df62eb8c"],["/font/NotoSerifSC-Regular.ttf","7ae71ababbc0172a5bc0585b9e5d31b5"],["/font/NotoSerifSC-Regular.woff","11b82273f0afa39848c2ebfc80970f57"],["/font/NotoSerifSC-Regular.woff2","a6170fcd5680f3e7d9fbc64d8457a093"],["/font/NotoSerifSC-SemiBold.css","6aa10cb2bde91c4e1f5a27d208d7ed79"],["/font/NotoSerifSC-SemiBold.eot","b07550d73c009487b27d656b210a11f5"],["/font/NotoSerifSC-SemiBold.svg","f75bbcae634d9ccfe24648b41d18b72e"],["/font/NotoSerifSC-SemiBold.ttf","f90cbe1b4b3adb319ebde7fc601efd25"],["/font/NotoSerifSC-SemiBold.woff","fe78f2e74eb089c759828a949ff2a9e3"],["/font/NotoSerifSC-SemiBold.woff2","62505e42ebf1c87d3c9015bc03b9caa0"],["/github-card-lib/githubcard.js","caa86aadbe330a8ee459a4ef9a1e2bcd"],["/go.html","54edbe4525f8ab0fd7b66e1e9a2bb69a"],["/hexo-github/badge.js","637f979eccbabca612463ae120dfe8b1"],["/hexo-github/octicons/octicons.css","78034780d6e0af0c98e6d1cb5fcf29fb"],["/hexo-github/octicons/octicons.eot","9f0a2ff14cf82ade5b0d5d09fc77a484"],["/hexo-github/octicons/octicons.svg","9f8c3b9241463c98d71c57ee3aadc4d6"],["/hexo-github/octicons/octicons.ttf","8cc473483ca11c160a7d021b9773e81f"],["/hexo-github/octicons/octicons.woff","5c2faa6e48106b82a0a22652110ba9d5"],["/hexo-github/style.css","b5a2d4967e975077b4f3047cdab71068"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/8848.gif","d1cf8d9ccb6a2b3514a7d14332035a3c"],["/img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/hometown/index.html","a57a781d40dd471468c1f1859940f260"],["/img/icp.png","6e26aed5ced63bc60524cc736611d39e"],["/img/index.html","297f9d817895371b33b6c865ccd2093e"],["/img/loading.gif","ea5977eff4ed49181ed417d141d853d1"],["/img/moeicp.png","8b2fafdc5a22398e22433237c0e2681b"],["/index.html","a035487cb42c02dda467e14ae01c407d"],["/js/calendar - 副本.js","b29f482b4d7a669c51e7615993c544dc"],["/js/calendar.js","4c51c8ceae7063ddfab75d62bdb67f81"],["/js/crash_cheat.js","7c21c983d112beb1465f87f496ec9a36"],["/js/head.js","f7ffcc1b1f42464cfe263e4f5268cc4e"],["/js/languages.js","b97365626226fcaf21fc69e4c5887e62"],["/js/main.js","abb272a432f72dce14f897fb1b9ef4f5"],["/js/pop.js","6f51b77be9cf0e6537962ce4dee21016"],["/js/search/algolia.js","e6a9c3f8fa43a7d3421169ea96eef44e"],["/js/search/local-search.js","86e7fcbc5aa273e6c3d2c94b0054809b"],["/js/tw_cn.js","bd869d5fd54e2fe1f1eeee7c46fa46bc"],["/js/utils.js","5720a78dca20fab16f21914ae3ac0757"],["/link/index.html","b2f2eab6297bca6e8bb5ba45c5fce378"],["/message-board/index.html","65b0317c43c7c5284765623fc3f4addb"],["/message-board/index1.html","9fc636b73e21b0e37799bfbf872cc35f"],["/messageboard/index.html","128f3a6c9ca4345814e49d1c4d5aa3be"],["/mp3/index.html","1fea7010be068223fde182882e6f6b97"],["/music/index.html","a0a36f306615ab13bc66ca84a7f5aeb8"],["/p/13ea88dc/index.html","bbc2c45b38d0b24a8ba6b9aedc371e41"],["/p/157d2c24/index.html","9a66ba375701138c619a9beaa27e13ae"],["/p/36c2c285/index.html","73e3702074bc4fe8cd26db2efd9cde4e"],["/p/39386d76/index.html","ca3c7f71cad3a2156f2e17b90ee912b1"],["/p/644bee3/index.html","e50d8fb6b1b3d499a99932c0b1e1f13c"],["/p/6e9b38bb/index.html","6ec67d7548c61cc9626a715fdc59253a"],["/p/6f023c87/index.html","b01a56b2b8a0f41f079e2eb3ad82d4d7"],["/p/76150073/index.html","16eb98213c9680448a909ded53f507dd"],["/p/7fa67b31/index.html","825e7457cb78621041e0e318a40426ec"],["/p/842862a5/index.html","ee771706a383a3eaaa88c8106e39bc18"],["/p/ad1ad93d/index.html","91dc8e03aec6f97f220cd19e518c7759"],["/p/b204d02b/index.html","35e719360532cab202c0ebcd154c8cf2"],["/p/befe379d/index.html","e5ed430db9b3b14f83afc41fa799570f"],["/p/c4933820/index.html","d0d6b4d63d5b177135a3bc3819b36d35"],["/p/c6ed254e/index.html","a357902bdcffdee2272f9d7f1983eaba"],["/p/cb7b45b6/index.html","82c6c3011711b9ce1225509f4e07faea"],["/p/e0f27af4/index.html","d297cf14dbd8bbf0b5079aa89167284b"],["/p/e626cb30/index.html","ac0dcebcd883bfe01c09b5084b270133"],["/p/e78f01eb/index.html","a506d1a8d64b49b0afb189375eae805a"],["/p/e8c47b9c/index.html","89f84ea03999392f787c43e03f3dddec"],["/p/eb490c73/index.html","cf100a3d4542dd76d0420f43e38ce8f5"],["/p/ec32f1a/index.html","bc73531ae60ecb5494aa1152cfe8f3e1"],["/page/2/index.html","b176d5999e673947e8ea886404831a41"],["/page/3/index.html","ebc07d9e732558f68b0b3a2fddd4f33e"],["/tags/DNS/index.html","b042fe38653e14c3911ee9ea2d7d84f0"],["/tags/Hexo/index.html","2aa49bf3bfd3ee34083ca8688b52f07a"],["/tags/PicGo/index.html","b77d32cb969f303d5cfe2705d3e9e4d6"],["/tags/Travis-CI/index.html","ce7418b7433aa5235fb5fa0051d33afc"],["/tags/VSCode/index.html","904dd3047e1e29195c45f0bec8fb533e"],["/tags/butterfly/index.html","4c03f42acba1d77eb0101e376d5af444"],["/tags/cdn/index.html","cf46c82bf24f92dcd3c6f8c1121026e8"],["/tags/cnzz/index.html","8499ee6b625ad70101a4e81950513f30"],["/tags/github-page/index.html","edc719bbfd846fc25c36e2aa389ad8fd"],["/tags/github/index.html","0c76893c0186741be55e301f1a138f5e"],["/tags/hexo/index.html","310341565a6618500f5ff8caeaa06e5d"],["/tags/index.html","0c27a62eff819abae984d708f96144bc"],["/tags/jsdelivr/index.html","f267ec2dfddd6091c5708ad72f75fea9"],["/tags/下载/index.html","513bb3ca261dee118f7b79a6bf66d368"],["/tags/事件/index.html","18b3344c7d38985dcba28eb7910faf6a"],["/tags/图床/index.html","9e38ce510497391c4b99ddebc0db1a8c"],["/tags/在线更新/index.html","b8ade4277c7394548b086b828bab7715"],["/tags/奇淫巧计/index.html","37e29d66b22d496d538ea64ab13e4b1e"],["/tags/学习/index.html","d452764288d76029fba8fbc5b85c6bbe"],["/tags/工具/index.html","5f78e7cf5f153bf1ea9208614fffc44c"],["/tags/工具推荐/index.html","4b9a7f224b393dc5e64faae2136d3396"],["/tags/插件/index.html","437905f989c74db136446f2a8d173ede"],["/tags/教程/index.html","77af0bffcb0fcc2803265622a75c766f"],["/tags/白嫖/index.html","2cfd188f05f11586b73277cb25650f55"],["/tags/看板娘/index.html","5996cf69074d466195796db9fd187ef9"],["/tags/笔记/index.html","f643ef369450b570095a3aeb3e254964"],["/tags/网易云/index.html","ecb4cb82aa5db2782649c16cc130518f"],["/tags/视频/index.html","a25dfba3fd147bb9b93a11af41a169e1"],["/tags/解析/index.html","1d0647342578cebdfc680f9b21c4baa3"],["/tags/说明/index.html","7cab3b7357cbbb6535ef9cc50db22957"],["/tags/金句分享/index.html","536370c720342052b5fb19cb7f5d5950"],["/tags/阿里/index.html","aeda46359f7a27de8cb707d4f425a6e4"],["/talk/index.html","90ae964e532ff1cb7910e5840244081b"],["/test.html","eac68e3c18af20bab4bfaa4ad7202bac"],["/update/index.html","868720f34dfcbba23883a9ad44c827d1"],["/vadmin/index.html","b1b6c97a096de6a9cc2be1f78e849cc3"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });



// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache 配置转换后的 toolbox 代码.

toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"unpkg.com"});
toolbox.router.get("/gh/*", toolbox.cacheFirst, {"origin":"cdn.jsdelivr.net"});
toolbox.router.get("/t/*", toolbox.cacheFirst, {"origin":"at.alicdn.com"});
toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"fonts.googleapis.com"});
toolbox.router.get("/npm/*", toolbox.cacheFirst, {"origin":"cdn.jsdelivr.net"});





/* eslint-enable */
