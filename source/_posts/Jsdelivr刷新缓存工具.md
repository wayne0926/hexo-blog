---
title: JsDelivr刷新缓存工具
date: 2020-11-21 21:17:31
tags: 工具
categories: 工具
cover: https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/jsdelivrhuancun.jpg
keywords: JsDelivr刷新缓存工具
description: JsDelivr刷新缓存工具
abbrlink:
---
# 介绍
## 关于 JsDelivr

![JSD·3](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/20201121222634.png)

![JSD·1](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/20201121222029.png)

![JSD·2](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/20201121222119.png)
> jsDelivr is a public, open-source CDN (Content Delivery Network) developed by Dmitriy Akulov and Prospect One, focused on performance, reliability, and security. It is free to use for everyone, with no bandwidth limits.

> JsDelivr是由Dmitriy Akulov和Prospect One开发的一个公开的、开源的CDN(内容分发网络)，专注于性能、可靠性和安全性。每个人都可以免费使用，没有带宽限制。

![JSD·4](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/20201121223153.png)

并且 `JsDelivr` 在中国大陆拥有众多节点，非常迅速。可能是至今中国大陆最快的免费 `CDN` 服务了。

**[JsDelivr.com](https://www.jsdelivr.net)**

平时在打理博客的时候经常需要改到 `CSS` 或者 `JavaScrip` ，然而这些我为了博客加速，都放在了 `JsDelivr` 上，众所周知， `CDN` 是有缓存的，`JsDelivr` 也不例外。

## 缓存刷新

根据官方的说法，将任意 `CDN` 的链接的 `cdn.jsdelivr.net` 改为 `purge.jsdelivr.net` 即可刷新缓存，但是总是很麻烦且不多来几次还不见效！

# 原理

先将用户输入的 `CDN` 链接的 `cdn.jsdelivr.net` 改为 `purge.jsdelivr.net`。

然后使用 `Requests` 对改之后的链接进行 `get` ，并且计数。

# 使用方法

直接将 `CDN` 的链接粘贴进去。比如：`https://cdn.jsdelivr.net/gh/wayne0926/hexo-blog@gh-pages/css/index.min.css` 。

![截图·1](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/jsd1.jpg)

![截图·2](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/jsd2.jpg)

将请求 `4` 次，恰到好处。

# 源码

[https://github.com/wayne0926/jsd](https://github.com/wayne0926/jsd)

> 来都来了，给个 Star 呗 😙

# 成品（ `exe` ）

[GitHub-Releases](https://github.com/wayne0926/jsd/releases/)

## 0.0.1

考虑到 `GitHub` 的情况，我在这里放个第三方的加速链接。（不保证可用，不保证最新）

- [美国洛杉矶（推荐）](https://git.yumenaka.net/https://github.com/wayne0926/jsd/releases/download/0.0.1/jsd.exe)

- [美国1](https://gh.con.sh/https://github.com/wayne0926/jsd/releases/download/0.0.1/jsd.exe)

- [美国2](https://gh.api.99988866.xyz/https://github.com/wayne0926/jsd/releases/download/0.0.1/jsd.exe)

- [日本东京](https://download.fastgit.org/wayne0926/jsd/releases/download/0.0.1/jsd.exe)
