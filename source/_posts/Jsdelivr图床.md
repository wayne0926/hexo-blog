---
title: JsDelivr图床
abbrlink: c4933820
date: 2020-08-12 23:40:02
tags:
  - cdn
  - 教程
  - hexo
  - github
  - jsdelivr
categories: 教程
cover: https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/githubtuchuang1.jpg
keywords: JsDelivr图床
description: JsDelivr图床
---

# 介绍

先说一下：

`JsDelivr`是`GitHub`的CDN

直接访问即可。

# 使用

## GitHub

新建一个库，放图片。

（细说略。。）

## PicGo

下载不说了。

默认的不好用。

用插件`githubPlus`

### 配置

| 项目      | 描述                                                     |
| --------- | -------------------------------------------------------- |
| repo      | 你的库名：`用户名/库名`                                  |
| branch    | 直接填：`master`                                         |
| token     | Github申请token(后面讲)                                  |
| path      | 库内路径(选)：`img/`                                     |
| customUrl | 使用JsDerlivr：`https://cdn.jsdelivr.net/gh/用户名/库名` |
| origin    | 选`github`                                               |

### GitHub Token

[GitHub申请Token](https://github.com/settings/apps)![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/jsdelivr1.jpg)

![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/jsdelivr2.jpg)

{% note warning%}

**注意：** Token妥善保管，且只显示一次。

{% endnote %}

# 上传

![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/jsdelivr3.jpg)

{% note info%}

如果出错，改个名字，重试。

{% endnote %}

# 视频版


{% raw %}
<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
<iframe src="//player.bilibili.com/player.html?aid=414284918&bvid=BV14V411U7Uo&cid=225060470&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; Left: 0; top: 0;" ></iframe></div>
{% endraw %}
