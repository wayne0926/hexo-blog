---
title: Hexo博客相册
abbrlink: c6ed254e
date: 2020-08-12 22:11:29
tags:
  - hexo
  - 教程
  - butterfly
categories: 教程
cover: https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/hexoxiangce.jpg
keywords: Hexo博客相册
description: Hexo博客相册
---

# 使用1

直接使用：

```html
<div class="gallery-group-main">
{% galleryGroup name description link img-url %}
{% galleryGroup name description link img-url %}
{% galleryGroup name description link img-url %}
</div>
```

| 项          | 描述                 |
| ----------- | -------------------- |
| name        | 图库的名字           |
| description | 图库描述             |
| link        | 连接到对应相册的地址 |
| img-ur      | 图库封面的地址       |

**比如**

```html
<div class="gallery-group-main">
{% galleryGroup '壁纸' '收藏的一些壁纸' '/Gallery/wallpaper' https://i.loli.net/2019/11/10/T7Mu8Aod3egmC4Q.png %}
{% galleryGroup '漫威' '关于漫威的图片' '/Gallery/marvel' https://i.loli.net/2019/12/25/8t97aVlp4hgyBGu.jpg %}
{% galleryGroup 'OH MY GIRL' '关于OH MY GIRL的图片' '/Gallery/ohmygirl' https://i.loli.net/2019/12/25/hOqbQ3BIwa6KWpo.jpg %}
</div>
```

***示例***

![示例](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/xiangce.jpg)

# 使用2

相册页：

```markdown
{% gallery %}
markdown 图片格式
{% endgallery %}
```

比如：

```markdown
{% gallery %}
![](https://i.loli.net/2019/12/25/Fze9jchtnyJXMHN.jpg)
![](https://i.loli.net/2019/12/25/ryLVePaqkYm4TEK.jpg)
![](https://i.loli.net/2019/12/25/gEy5Zc1Ai6VuO4N.jpg)
![](https://i.loli.net/2019/12/25/d6QHbytlSYO4FBG.jpg)
![](https://i.loli.net/2019/12/25/6nepIJ1xTgufatZ.jpg)
![](https://i.loli.net/2019/12/25/E7Jvr4eIPwUNmzq.jpg)
![](https://i.loli.net/2019/12/25/mh19anwBSWIkGlH.jpg)
![](https://i.loli.net/2019/12/25/2tu9JC8ewpBFagv.jpg)
{% endgallery %}
```

{% note info %}

长度会自动调整

{% endnote %}