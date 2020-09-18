---
title: Hexo博客添加看板娘(二)
abbrlink: 6f023c87
date: 2020-08-09 16:35:16
tags: 
  - hexo
  - 教程
  - 看板娘
categories: 教程
cover: https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/live2d1.jpg
keywords: 
  - Hexo博客添加看板娘
  - Hexo博客添加有交互界面的看板娘
description: Hexo博客添加带交互界面的看板娘
---

# 介绍

![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/live2d1.jpg)



[![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/githubck.png)](https://github.com/stevenjoezhang/live2d-widget)

[![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/readwo.png)](https://github.com/stevenjoezhang/live2d-widget/blob/master/README.md)

{% note success%}
此版本有交互界面！
{% endnote%}

# 使用

在主题配置文件`_config.yml`里

```yaml
inject:
  head:
```

添加

```html
<script src="https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"></script>
```

效果

```yaml
inject:
  head:
    - <script src="https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"></script>
```

# 完成

就这么简单，🆗了

我个人觉得配上`思源宋体`非常好看，耐看