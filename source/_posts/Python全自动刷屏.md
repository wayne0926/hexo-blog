---
title: Python全自动刷屏
date: 2021-01-22 20:37:43
tags: 工具
categories: 工具
cover: https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1611323382000.webp
keywords: Python全自动刷屏
description: Python全自动刷屏
abbrlink:
highlight_shrink: true
---
# 介绍
![](https://cdn.jsdelivr.net/gh/wayne0926/myphoto@master/img/1611323382000.webp)
一同学来刷屏，于是花了一会儿直接写出了个全自动的工具。
# 原理
获取网络上的`API`的内容，复制到剪贴板，打开`QQ`界面，粘贴，发送
# 源码
可能更新不及时：
``` python
import requests
import os
import time
import pyautogui, sys
import win32gui
# 请选择（输入数字选择）：1、一言；2、毒鸡汤（搏天）；3、诗句（一句）
x = 3
num = 1
# 窗口名
hld = win32gui.FindWindow(None, u"XXXXXXXXXXXXX")
win32gui.SetForegroundWindow(hld)
# 条数
while num <= 50:
    time.sleep(0.5)
    # 一言
    o = str(requests.get('https://v1.hitokoto.cn/').json()['hitokoto'])
    # 毒鸡汤
    p = str(requests.get(
        'https://api.btstu.cn/yan/api.php?charset=utf-8&encode=json').json()['text'])
    # 诗句
    s = str(requests.get(
        'http://yijuzhan.com/api/word.php?m=json').json()['content'])
    if x == 1:
        bbb = o
    if x == 2:
        bbb = p
    if x == 3:
        bbb = s
    def addToClipBoard(text):
        command = 'echo ' + text.strip() + '| clip'
        os.system(command)
    addToClipBoard(bbb)
    num = num + 1
    pyautogui.hotkey('ctrl', 'v')
    pyautogui . hotkey('ctrl', 'enter')
```
`GitHub`仓库：[https://github.com/wayne0926/shuaping](https://github.com/wayne0926/shuaping)

# 鸣谢
## 1、一言网的一句话（简体） [https://hitokoto.cn/](https://hitokoto.cn/)
## 2、搏天api的随机语录（简体） [https://api.btstu.cn/](https://api.btstu.cn/)
## 3、一句网（简体） [https://yijuzhan.com/](https://yijuzhan.com/)