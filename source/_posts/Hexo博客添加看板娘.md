---
title: Hexo博客添加看板娘(一)
tags:
  - hexo
  - 教程
  - 看板娘
categories: 教程
cover: 'https://cdn.jsdelivr.net/gh/wayne0926/myphoto/img/2.jpg'
abbrlink: 842862a5
date: 2020-08-04 20:29:28
keywords: 
  - Hexo博客添加看板娘
  - Hexo博客添加没有交互界面的看板娘
  - Hexo博客添加纯看板娘
description: Hexo博客添加纯看板娘
---

# 准备

本文使用 [hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d) 来构建看板娘，Hexo主题为`Butterfly`。

{% note warning%}
此版本没有交互界面！！
{% endnote %}

# 安装

使用`npm`安装，`node.js`要有哟！

```powershell
npm install --save hexo-helper-live2d
```

# 配置

## 基本配置

把这段配置塞进根目录下的`_config.yml`中
{% note info%}
如果后续完成后没有效果，可以放在主题配置文件里试试
{% endnote %}

```yaml
live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  debug: false
  model:
    use: live2d-widget-model-wanko
  display:
    position: right
    width: 150
    height: 300
  mobile:
    show: true
  react:
    opacity: 0.7
```

更多详细的设置，请参考[官方中文文档](https://github.com/EYHN/hexo-helper-live2d/blob/master/README.zh-CN.md#%E9%85%8D%E7%BD%AE) ，这里只是简单的放进去。。

## 模型配置
{% note info%}
这里直接使用简单的`npm`配置
{% endnote %}

### 模型列表

- `live2d-widget-model-chitose`
- `live2d-widget-model-epsilon2_1`
- `live2d-widget-model-gf`
- `live2d-widget-model-haru/01` (use `npm install --save live2d-widget-model-haru`)
- `live2d-widget-model-haru/02` (use `npm install --save live2d-widget-model-haru`)
- `live2d-widget-model-haruto`
- `live2d-widget-model-hibiki`
- `live2d-widget-model-hijiki`
- `live2d-widget-model-izumi`
- `live2d-widget-model-koharu`
- `live2d-widget-model-miku`
- `live2d-widget-model-ni-j`
- `live2d-widget-model-nico`
- `live2d-widget-model-nietzsche`
- `live2d-widget-model-nipsilon`
- `live2d-widget-model-nito`
- `live2d-widget-model-shizuku`
- `live2d-widget-model-tororo`
- `live2d-widget-model-tsumiki`
- `live2d-widget-model-unitychan`
- `live2d-widget-model-wanko`
- `live2d-widget-model-z16`

### 模型预览

这里可以直接参看CSDN里的一篇文章，里面有截图。

[Hexo添加Live2D看板娘+模型预览_执念-CSDN博客_hexo live2d](https://blog.csdn.net/wang_123_zy/article/details/87181892)

这里我的博客就是用了`live2d-widget-model-wanko`这个模型。

### 模型安装

#### 安装

```powershell
npm install {模型的包名}
```

*把大括号扔掉哈！*

#### 载入

把你安装的模型的包名，比如`live2d-widget-model-hijiki`

，填入前面塞进`_config.yml`的配置中的`    use: `

# 完成

{% note success%}
重启`hexo server`，查看效果
{% endnote%}
