---
title: VSCode插件—CloudMusic
cover: https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/cloudmusic.jpg
abbrlink: e0f27af4
date: 2020-08-08 00:14:36
tags: 
  - 网易云
  - VSCode
  - 插件
categories:
keywords:
  - CLOUDMUSIC
  - VSCode插件
  - 网易云
description: VSCode插件—CLOUDMUSIC
---

# 介绍

这是一款傻瓜式的VSC网抑云在线插件。

[![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/cloudmusic.jpg)](https://marketplace.visualstudio.com/items?itemName=yxl.cloudmusic&ssr=false#overview)

本插件具有以下特点：



- 简单：开箱即用，无需安装、修改任何文件
- 快速：使用本机模块，资源占用低，速度快
- 强大：借助网页 API，能实现所有常用功能

已实现的功能：

- 每日签到
- 歌曲播放，收藏，喜欢
- 听歌打卡
- 心动模式
- 私人 FM
- 歌词显示
- 搜索（热搜/单曲/专辑/歌手...）
- 缓存管理
- 可选无损音质
- 媒体控制支持
- 更多功能等待发现

# 安装

[点击这里直接访问插件商店网页版本](https://marketplace.visualstudio.com/items?itemName=yxl.cloudmusic&ssr=false#overview)

[直接点击这里安装](vscode:extension/yxl.cloudmusic)

[![Github仓库](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/githubck.png)](https://github.com/YXL76/cloudmusic-vscode)

# 使用

![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/cloudmusic2.jpg)

![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/cloudmusic3.jpg)

## 设置

- `cloudmusic.account.autoCheck`: 登录后自动签到
- `cloudmusic.cache.size`: 缓存大小限制
- `cloudmusic.music.quality`: 音质选择

## 命令

- `Cloudmusic: Sign in`: 登录
- `Cloudmusic: Sign out` :登出
- `Cloudmusic: Daily check`: 每日签到
- `Cloudmusic: Toggle button`: 显示/隐藏按钮

## 已知问题

- 对于使用代理软件的用户，如果播放出现网络错误，请设置`http.proxy`（不是`cloudmusic.music.proxy`）

# 发行说明

[发行说明](https://github.com/YXL76/cloudmusic-vscode/blob/master/CHANGELOG.md)

