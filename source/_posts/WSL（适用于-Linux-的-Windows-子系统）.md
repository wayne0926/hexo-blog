---
title: WSL（适用于 Linux 的 Windows 子系统）
abbrlink: 8e43398f
date: 2021-03-27 14:40:09
tags:
categories:
cover: https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1616850274000.webp
keywords:
description:
---
![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1616850612000.png)
# 安装
## 简便安装
这何止是简便……
德芙：真的有这么丝滑吗？
360：真的可以比我安装全家桶还顺畅吗？
### 条件
- 你得加入 `Windows预览体验计划`
- 系统是 `20262 或更高版本`
### 安装
首先建议开启代理
其次建议开启代理
不然下载 `Ubuntu` 的时候就会特别卡。
1. 在管理员模式下打开终端（控制台）
2. 输入命令 `wsl --install` 或 `wsl.exe --install` ，等待安装完成

之后可能会要求重启电脑，重启之后打开 `Ubuntu` 这个应用（属于 `Microsoft Store` 应用），它会要求你创建账户名与密码。
![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1616850565000.png)
![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1616850517000.png)
> **注意：此处默认安装的是 `Ubuntu` 的`Linux`发行版**

如有需要，使用： `wsl --install -d <发行版名称（去掉尖括号）>` 进行更改
## 使用
目前已知有至少 `3` 种启动方式
### `Ubuntu` 应用
这是个 `UWP` 应用，一般来说在开始菜单就能找得到。![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1616850565000.png)
首次打开可能会让你创建用户名和密码，这里我默认你已经搞好了。（如果软件内一直是黑屏状，试着敲个回车）。
![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1617433773000.png)
### `Windows Terminal` 应用
好吧，同样也是 `UWP` 应用（非常建议安装）……

可以去开始菜单启动（安装 `WSL` 时已经启动的，重启一下），也可以使用键盘 `Win + R` （“运行”）输入 `wt` 启动（最爱了……快）
启动 `Windows Terminal` 后在“打开标签页按钮下拉栏”中选择 `Ubuntu` ![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1617434109000.png)
![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1617434219000.png)

> **Tip** ：需要注意的是，使用 `Ubuntu` 应用打开后的工作目录是 `Linux` 用户目录，`dir` 可得知其暂时没有子目录
![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1617434416000.png)
>
> 然而，使用 `Windows Terminal` 启动则是在 `Windows` 用户目录下，（等同于 `命令提示符` 或者 `PowerShell` 里的 `C:\Users\xxxxxx>`）![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1617434631000.png)

### `VSC` 远程管理
一般来说你安装完 `WSL` 之后打开 `VSC` 他就会疯狂的提示你安装插件以支持远程管理 `WSL` ，你安装个插件就好![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1617434885000.png)

之后可能会按照提示设置以下（极其简单），我之前报错了就没管它了，今天发现就没报错了……
`VSC` 里的打开方式多的一批，找个最显眼的讲。![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1617435120000.jpg)

就是这个东西，“打开远程窗口”，然后有几种方式供你选择，自己去折腾吧……
点击第一个（打开新窗口）后会弹出一个新的 `VSC` 窗口，右下角有加载的什么东西的进度，只要没报错就不必管他，一会儿就好了。然后你就进入到 `WSL` 里来了。注意看看左下角是不是绿了。![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1617435664000.png)
#### 工作文件夹
点击侧边栏的“资源管理器”，可以打开工作文件夹
![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1617435554000.jpg)
#### 终端
在顶栏“终端”下拉选择“新终端”即可在界面的某个位置（可能设置不同）呼出一个新终端
![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1617435822000.png)
> **Tip**：如果在 `VSC` 已打开工作文件夹的情况下呼出终端，则终端的工作目录也会是在该工作目录下![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1617436116000.png)
#### 打开 `Windows` 中的文件夹
使用 `VSC` 打开某个文件夹，点击左下角的绿按钮：`打开远程窗口`，在上方弹出的选择框中选择`在WSL中重新打开文件夹`![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1617436389000.png)
然后就好了……不过 `VSC` 会弹窗提示你最好把文件夹移动到 `Ubuntu` 里面去。![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1617436643000.png)
我也建议你这么做，万一出问题了呢？……![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1617437091000.png)
# 持续更新中
