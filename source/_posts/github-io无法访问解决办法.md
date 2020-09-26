---
title: 'github.io无法访问解决办法'
abbrlink: befe379d
date: 2020-08-12 18:01:36
tags:
  - github
  - github page
  - DNS
  - 阿里
  - 教程
categories: 教程
cover: https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/githubiofangwen.jpg
keywords: github.io无法访问解决办法
description: github.io无法访问解决办法
---
# 方案一
> 😘让你“爱”上 GitHub，解决访问时图裂、加载慢的问题。

**[https://github.com/521xueweihan/GitHub520](https://github.com/521xueweihan/GitHub520)**
**使用Host大法**

> **来自评论区的大佬：**
> > [访问github或部署在gitpage上的网站过慢的解决方案](https://akilar.top/post/61b3e163.html)
> > 我这还有另一种思路，通过修改hosts来实现。
> > 原理大体就是用爬虫爬取域名对应的IP然后写入hosts
>
> 👆其实Github520项目就是这个原理

# 方案二

之前一直用的自动，有问题。我们接下来都换成`阿里DNS`

[阿里DNS](https://www.alidns.com/)

## 一键设置

来源阿里DNS官网

[阿里DNS | 设置](https://www.alidns.com/setup/?spm=a2chw.13814944.0.0.783a17605rWcc3#windows)

[![一键设置](https://www.alidns.com/public/img/windows-setup.png)](https://www.alidns.com/public/soft/AliDNS.exe?spm=a2chw.13814944.0.0.395f1760vtb5sz&file=AliDNS.exe)

## 打开

打开`控制面板-> 网络和 Internet ->网络和共享中心 -> 以太网 ->属性`

## 更改IPV4



![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/Snipaste_2020-08-12_18-20-28.jpg
)

## 更改IPV6

![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/Snipaste_2020-08-12_18-21-06.jpg)

## 生效

清除DNS缓存

打开`powershell`或者`CMD`或者其他终端，输入命令

```powershell
ipconfig /flushdns
```

# 总结

这应该是DNS污染造成的。

`TMD用的114也不行，垃圾`

换用阿里就OK了。
> ***有些经验后就知道阿里的DNS其实也是有它的小问题的***
> > **比如**：更新不及时（新添加了一个CNAME后隔了一会儿，其他的DNS服务商都可以解析(114爬开），唯独阿里不行）。
>
