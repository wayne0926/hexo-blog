---
title: Hexo博客添加CNZZ统计
abbrlink: 157d2c24
date: 2020-08-12 21:26:44
tags:
  - hexo
  - 教程
  - cnzz
  - butterfly
categories: 教程
cover: https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/cnzztongji.jpg
keywords: Hexo博客添加CNZZ统计
description: Hexo博客添加CNZZ统计
---

# 注册

略。。

# 安装

## 获取

获取代码：

![获取代码](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/youmeng1.jpg)

选择你要的。

我选择`横排数据显示`

## 安装

打开文件`\themes\butterfly\layout\includes\footer.pug`

`pug`文件要更改格式

```html
<script type="text/javascript">document.write(xxxxxxx);</script>
```

```pug
script(type="text/javascript") document.write(xxxxxxx);
```

注意`document`前面有空格

# 完成

刷新本地服务网页，可以看到。

![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/youmengdemo.jpg)

{%note  warning %}

**注意：**可能会被广告拦截！

{% endnote%} 