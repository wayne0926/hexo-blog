/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/404.html","c7b4ad789fec0ec5c941af1b3deabced"],["/about/index.html","7f5570438ab5a629bce881ae5577fb01"],["/archives/2020/08/index.html","7fa1ce338d0f15b4dde19d6a5161a65d"],["/archives/2020/08/page/2/index.html","2afe29cdb9b8a799edaade794c5e0ee6"],["/archives/2020/09/index.html","6d62ae19d5eb4c5f049455a18f56724f"],["/archives/2020/10/index.html","f1a751ef5783584cfd8578da49365324"],["/archives/2020/11/index.html","cd089f6df2fc9540c2e3c609e02dfb7e"],["/archives/2020/12/index.html","1a77b827ba0d205ee50f54bb3d1faa07"],["/archives/2020/index.html","d0915ac21014751703808419cbb7c562"],["/archives/2020/page/2/index.html","78c02d03e5c163c29328106d270896d6"],["/archives/2020/page/3/index.html","37a5d7cbb3e367b9b15704d910be907d"],["/archives/index.html","23dd3008756be35408773c200e4418ed"],["/archives/page/2/index.html","3429a4af38fe5cd00b5ca0a6425f4075"],["/archives/page/3/index.html","32cdc249740425dc101c48e6021343b5"],["/assets/css/APlayer.min.css","fbe994054426fadb2dff69d824c5c67a"],["/assets/js/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/assets/js/Meting.min.js","bfac0368480fd344282ec018d28f173d"],["/categories/index.html","b085d9cfed386c0eca9b00c92a2b49a8"],["/categories/事件/index.html","a39cd4e212c54e224f9f1ec2a4ec0b1d"],["/categories/分享/index.html","9b22badeff5e5b111b3d53f5e4a0fd93"],["/categories/学习/index.html","fab8ff1629ccacb63bf2819b34c0ce5d"],["/categories/工具/index.html","7249e45a1b94e616288e3de7564a20b4"],["/categories/教程/index.html","387c5e70918ebea7b7d0e577ea7a839c"],["/categories/教程/page/2/index.html","3d517a77bc43fc5083c5567052d2e7bf"],["/categories/说明/index.html","eba730eb3f33691f5fc369ad5ffe1f4f"],["/categories/金句分享/index.html","1170dff32de8ced2cb40f88ea5b50c68"],["/css/index.css","f87b894b0fb2227a9853d8acd39f483b"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/download/file/IDM/index.html","487a64f36269f2b1e36322808764b326"],["/download/file/anydo/index.html","3292ee914a7f0480b9d5fe610c4c2128"],["/download/file/ditto/index.html","7052c54c2148d1d068f5c468146e3f5b"],["/download/file/fastcopy/index.html","9f819d267494981a9f30ca142c25d856"],["/download/file/lx-music/index.html","b322f86824db3d0bd706031cd4db65c8"],["/download/index.html","e7919e84ecff2ffaab349f2bcb0fa09a"],["/download/overlay-button.png","1874df840edcf0c56620cdffd50c01e3"],["/download/playground.css","e71f8c523a997bc3d1a314a8a18059cc"],["/font/NotoSerifSC-Bold.css","11804bb9f6525d31f2c0ec13b54739ad"],["/font/NotoSerifSC-Bold.eot","cd52dc1fc25e5befa94e7673bb12c160"],["/font/NotoSerifSC-Bold.svg","5fb9345418b8a8d283db11bfaa1921f4"],["/font/NotoSerifSC-Bold.ttf","22058a3b7dd13202f8bca5e2b163f286"],["/font/NotoSerifSC-Bold.woff","6633d1ba27ca0a2d5a4032970b988fc3"],["/font/NotoSerifSC-Bold.woff2","8f1197816344f5e292ff902cfabdef85"],["/font/NotoSerifSC-Medium.css","e4fd16a9a0677a67832f36a02fc0acd1"],["/font/NotoSerifSC-Medium.eot","28349fd4494e17137321abc4dcd2329b"],["/font/NotoSerifSC-Medium.svg","0996c5f3a6814ad99cb70b37cb14873d"],["/font/NotoSerifSC-Medium.ttf","c7210b21a4ace30f68ff2bed361f761f"],["/font/NotoSerifSC-Medium.woff","d16171707505536bcd839f5afeb77679"],["/font/NotoSerifSC-Medium.woff2","de243bd59f728647e722b8f2397acc68"],["/font/NotoSerifSC-Regular.css","cb8460d1151dbc5d2f8c863c2dc9bd6c"],["/font/NotoSerifSC-Regular.eot","cd874b1af00d2bec2b88ac2e277a00c4"],["/font/NotoSerifSC-Regular.svg","2a9a2285b6c02e4eaf78b461df62eb8c"],["/font/NotoSerifSC-Regular.ttf","7ae71ababbc0172a5bc0585b9e5d31b5"],["/font/NotoSerifSC-Regular.woff","11b82273f0afa39848c2ebfc80970f57"],["/font/NotoSerifSC-Regular.woff2","a6170fcd5680f3e7d9fbc64d8457a093"],["/font/NotoSerifSC-SemiBold.css","6aa10cb2bde91c4e1f5a27d208d7ed79"],["/font/NotoSerifSC-SemiBold.eot","b07550d73c009487b27d656b210a11f5"],["/font/NotoSerifSC-SemiBold.svg","f75bbcae634d9ccfe24648b41d18b72e"],["/font/NotoSerifSC-SemiBold.ttf","f90cbe1b4b3adb319ebde7fc601efd25"],["/font/NotoSerifSC-SemiBold.woff","fe78f2e74eb089c759828a949ff2a9e3"],["/font/NotoSerifSC-SemiBold.woff2","62505e42ebf1c87d3c9015bc03b9caa0"],["/github-card-lib/githubcard.js","caa86aadbe330a8ee459a4ef9a1e2bcd"],["/go.html","54edbe4525f8ab0fd7b66e1e9a2bb69a"],["/hexo-github/badge.js","637f979eccbabca612463ae120dfe8b1"],["/hexo-github/octicons/octicons.css","78034780d6e0af0c98e6d1cb5fcf29fb"],["/hexo-github/octicons/octicons.eot","9f0a2ff14cf82ade5b0d5d09fc77a484"],["/hexo-github/octicons/octicons.svg","9f8c3b9241463c98d71c57ee3aadc4d6"],["/hexo-github/octicons/octicons.ttf","8cc473483ca11c160a7d021b9773e81f"],["/hexo-github/octicons/octicons.woff","5c2faa6e48106b82a0a22652110ba9d5"],["/hexo-github/style.css","b5a2d4967e975077b4f3047cdab71068"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/8848.gif","d1cf8d9ccb6a2b3514a7d14332035a3c"],["/img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/hometown/index.html","db86fbc24de910177bf250e2d0b0df64"],["/img/icp.png","6e26aed5ced63bc60524cc736611d39e"],["/img/index.html","71b2a3e87e10c96814de27a9aec561a4"],["/img/loading.gif","ea5977eff4ed49181ed417d141d853d1"],["/img/moeicp.png","8b2fafdc5a22398e22433237c0e2681b"],["/index.html","add74ab972802c05b6bce427f853df68"],["/js/calendar - 副本.js","b29f482b4d7a669c51e7615993c544dc"],["/js/calendar.js","4c51c8ceae7063ddfab75d62bdb67f81"],["/js/crash_cheat.js","7c21c983d112beb1465f87f496ec9a36"],["/js/head.js","f7ffcc1b1f42464cfe263e4f5268cc4e"],["/js/languages.js","b97365626226fcaf21fc69e4c5887e62"],["/js/main.js","abb272a432f72dce14f897fb1b9ef4f5"],["/js/pop.js","6f51b77be9cf0e6537962ce4dee21016"],["/js/search/algolia.js","e6a9c3f8fa43a7d3421169ea96eef44e"],["/js/search/local-search.js","86e7fcbc5aa273e6c3d2c94b0054809b"],["/js/tw_cn.js","bd869d5fd54e2fe1f1eeee7c46fa46bc"],["/js/utils.js","5720a78dca20fab16f21914ae3ac0757"],["/link/index.html","6291fe51090662c5d3cb3fcc8f49a707"],["/message-board/index.html","82bfe2b8844ac6576b12d05640e674b0"],["/message-board/index1.html","9886e53a2d362ea128f6d80e9be8ba9e"],["/messageboard/index.html","f17e73f17a2a104ac6eed570f766de13"],["/mp3/index.html","1fea7010be068223fde182882e6f6b97"],["/music/index.html","1860fa225a6e8a3c4537aa7e4d47f92b"],["/p/13ea88dc/index.html","e070be7ad21cb3a0995726bf9aa9f875"],["/p/157d2c24/index.html","1685c4481163652deace75f74c87fa0d"],["/p/36c2c285/index.html","96e370427d9a35a54d5d2b6034ec56fb"],["/p/39386d76/index.html","8fa06f146e3c9de3f647718d90f9d829"],["/p/6e9b38bb/index.html","0ca600da622637066937a8fc66ac54bf"],["/p/6f023c87/index.html","d6d9e639d136b21fea1e51b6edec2e4c"],["/p/76150073/index.html","a566763f46eb5771fc20c0deb8b92928"],["/p/7fa67b31/index.html","0c3d24dabc3a1ddd28c9eec943ac8075"],["/p/842862a5/index.html","be1577a38a128a6ffa142e46b6746384"],["/p/ad1ad93d/index.html","c653856e224c73376517d20d50562bfb"],["/p/b204d02b/index.html","ca78df445293bbd52009191c5563fce8"],["/p/befe379d/index.html","14525db5ac06af9ba7a51faa62755a21"],["/p/c4933820/index.html","bb641ac4564ed1856945212ac74d6034"],["/p/c6ed254e/index.html","b6ce911720ab2babf0585bd985147eed"],["/p/cb7b45b6/index.html","ece52a2762901b2afaa7756071be7860"],["/p/e0f27af4/index.html","eb631d26040512a3a9d6ea1e77aab904"],["/p/e626cb30/index.html","b924777cad1c87a8b90e8cce9f42fa52"],["/p/e78f01eb/index.html","0ce93379fb90d5810d6e8299b963f42c"],["/p/e8c47b9c/index.html","41223cc96d81e81ff4340ad4ec999736"],["/p/eb490c73/index.html","0b3d5f82ce2ce9eae778b86800d9a7ef"],["/p/ec32f1a/index.html","08608565c133c0f4dc2300d61b0ddf84"],["/page/2/index.html","8c1e39d7f94dc2857d822c012e846469"],["/page/3/index.html","90c5557634878516224a21bb512e544e"],["/tags/DNS/index.html","481ffe363d821341db8579a18d859f2d"],["/tags/Hexo/index.html","0935a01b3476ddfa941d8b98689d294b"],["/tags/PicGo/index.html","65c7ec168d0db27da73151e0c25140ad"],["/tags/Travis-CI/index.html","954e0946d496e75859f80876bb7aa82e"],["/tags/VSCode/index.html","49e97a87989332328a7a29d45ab4c74c"],["/tags/butterfly/index.html","87c59cf36c27517cbd7c9ae9c93dbd6a"],["/tags/cdn/index.html","a78663301e74406e06ed0aa6eeabb9f5"],["/tags/cnzz/index.html","a03a295552c1eb2130a3cea3c44ac9be"],["/tags/github-page/index.html","0eca36ab7ccc467bb2079f98cc040b46"],["/tags/github/index.html","f4f8bbfd371b13287d369d43156a1d49"],["/tags/hexo/index.html","a7c05b0153b71b37dfdabf52a6d5a9b7"],["/tags/index.html","dee455e71e20b87f1aa968bd6896ac89"],["/tags/jsdelivr/index.html","2b29ef005eab4f668d29a3ea7e6c8340"],["/tags/下载/index.html","f31e01ccf830e5beac62f846d80be7d6"],["/tags/事件/index.html","b6b4d1263f67e1c65ba4477cbf1bb9e9"],["/tags/图床/index.html","580efa84e435a5f38d5a8a3b6d6555a5"],["/tags/在线更新/index.html","0abb5b165d5178b7829c3c22282e0177"],["/tags/奇淫巧计/index.html","1c600581d7cd32bbf815755e285a4a39"],["/tags/学习/index.html","5ab2c7f380f2c6e46070c217696f586f"],["/tags/工具/index.html","02a16a8a2e6e167d69fc26638c4c1807"],["/tags/插件/index.html","c4b47767e8b2d6a42924818c4e4a92ed"],["/tags/教程/index.html","1ccaad7c6483b20dd5e7f11a9452f599"],["/tags/白嫖/index.html","69c257ac3e7e9aadb34de185de597322"],["/tags/看板娘/index.html","ad42cbe6e488057c8b7fc904481a65a2"],["/tags/笔记/index.html","e936b6c29789b16cbb95c3cdaef055f4"],["/tags/网易云/index.html","3c8f8431ca5996a19ddbb04853730105"],["/tags/视频/index.html","85a48c18b215e4d6ec54528b7aa0f9bf"],["/tags/解析/index.html","bd39d183d0a03f6078d175a5d9587f44"],["/tags/说明/index.html","4560aaf79fb74e85e8efe21c7560342c"],["/tags/金句分享/index.html","60aef1f56e192b91c71ea5b32b11737b"],["/tags/阿里/index.html","5f987507e1fa2cf8dff5d077e0376d9d"],["/talk/index.html","d588479bf5c94ace178b93a38ed8e4e8"],["/test.html","9814f1e34b994abc2290a5c3a0ead83b"],["/update/index.html","ad19b35fc88b0cdbe99f5716b70bd1da"],["/vadmin/index.html","0e7451c9cc0a30456126381baf63185d"]];
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
