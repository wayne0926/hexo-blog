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

# 解决

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