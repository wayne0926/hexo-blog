---
title: Hexo Butterfly主题页面美化
abbrlink: cb7b45b6
date: 2020-08-17 17:53:35
tags:
  - hexo
  - butterfly
  - 教程
categories: 教程
cover: https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/hexoyemianmeihua1.jpg
keywords: Hexo Butterfly主题页面特效
description: Hexo Butterfly主题页面特效
---

# 介绍

> [**韩小韩API接口站**](https://api.vvhan.com/)
>
> [**Lete乐特 's Blog**](https://blog.lete114.top/)
>
>  [**小康博客**](https://www.antmoe.com/)

**源码(API)出处  ↑**

# 使用

## 冒泡特效

![冒泡](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/maopao.jpg)

***找个`JS`文件粘贴进去就行了***（简单粗暴，但是要在主题配置里确定引用了的）  ↓ 

```javascript
// 气泡
function qipao() {
    $('#page-header').circleMagic({
        radius: 10,
        density: .2,
        color: 'rgba(255,255,255,.4)',
        clearOffset: 0.99
    });
}! function(p) {
    p.fn.circleMagic = function(t) {
        var o, a, n, r, e = !0,
            i = [],
            d = p.extend({ color: "rgba(255,0,0,.5)", radius: 10, density: .3, clearOffset: .2 }, t),
            l = this[0];

        function c() { e = !(document.body.scrollTop > a) }

        function s() { o = l.clientWidth, a = l.clientHeight, l.height = a + "px", n.width = o, n.height = a }

        function h() {
            if (e)
                for (var t in r.clearRect(0, 0, o, a), i) i[t].draw();
            requestAnimationFrame(h)
        }

        function f() {
            var t = this;

            function e() { t.pos.x = Math.random() * o, t.pos.y = a + 100 * Math.random(), t.alpha = .1 + Math.random() * d.clearOffset, t.scale = .1 + .3 * Math.random(), t.speed = Math.random(), "random" === d.color ? t.color = "rgba(" + Math.floor(255 * Math.random()) + ", " + Math.floor(0 * Math.random()) + ", " + Math.floor(0 * Math.random()) + ", " + Math.random().toPrecision(2) + ")" : t.color = d.color }
            t.pos = {}, e(), this.draw = function() { t.alpha <= 0 && e(), t.pos.y -= t.speed, t.alpha -= 5e-4, r.beginPath(), r.arc(t.pos.x, t.pos.y, t.scale * d.radius, 0, 2 * Math.PI, !1), r.fillStyle = t.color, r.fill(), r.closePath() }
        }! function() {
            o = l.offsetWidth, a = l.offsetHeight,
                function() {
                    var t = document.createElement("canvas");
                    t.id = "canvas", t.style.top = 0, t.style.zIndex = 0, t.style.position = "absolute", l.appendChild(t), t.parentElement.style.overflow = "hidden"
                }(), (n = document.getElementById("canvas")).width = o, n.height = a, r = n.getContext("2d");
            for (var t = 0; t < o * d.density; t++) {
                var e = new f;
                i.push(e)
            }
            h()
        }(), window.addEventListener("scroll", c, !1), window.addEventListener("resize", s, !1)
    }
}(jQuery);

// 调用气泡方法
qipao();

```

## 波浪特效

![波浪](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/bolang.jpg)

***找到`index.styl`文件粘贴进去***（`z-index`看自己喜好调整）*（要确定被引用）* ↓

```stylus
.hans-container
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 120px;
  z-index: -1
```

把这段粘贴到主题配置文件`bottom:`选项里面去  ↓

```html
<div id="hans-bolang"></div>
<script src="https://api.vvhan.com/api/bolang"></script>
```

## 透明特效

### 首页部分

#### 方法一

把横幅图片`top_img`与背景图`background`设置成一样的  ↓

![透明2](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/touming2.jpg)

#### 方法二

找个`js`文件放进去

```js
var full_page = document.getElementsByClassName("full_page");
if (full_page.length != 0) {
  full_page[0].style.background = "transparent";
}
```

***各有不同！***

### 页脚部分

在`footer.styl`（位置直接搜索）里的`#footer`里加一句话  ↓

```stylus
  background: transparent !important;
```

![透明1](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/touming1.jpg)

### 其他页面头部

首先在主题配置文件里全部把这些页面的图片值改为`false`

如：

```yaml
tag_img: false
```

然后在`head.styl`里把

```stylus
background-color: $light-blue
```

注释掉

```stylus
  // background-color: $light-blue
```

***夜间模式可能不太行***

![透明](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/touming.jpg)

## MAC代码框美化

白色：

![白](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/macwhite.png)

```yaml
    - <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sviptzk/StaticFile_HEXO@latest/butterfly/css/macWhite.css">

```

黑色：

![黑](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/macblack.png)

```yaml
    - <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sviptzk/StaticFile_HEXO@latest/butterfly/css/macWhite.css">

```

## 滚动条美化

![gundongtiao](https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/gundongtiao.jpg)

找个`styl`文件粘贴进去：

```stylus
 /* 滚动条 */
::-webkit-scrollbar 
  width: 8px;
  height: 8px;


::-webkit-scrollbar-track 
  background-color: rgba(73, 177, 245, 0.2);
  border-radius: 2em;


::-webkit-scrollbar-thumb 
  background-color: #49b1f5;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.4) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0.4) 75%,
    transparent 75%,
    transparent
  );
  border-radius: 2em;


::-webkit-scrollbar-corner 
  background-color: transparent;


::-moz-selection 
  color: #fff;
  background-color: #49b1f5;
```

<div class='tip' ><p>默认情况<p></div>

