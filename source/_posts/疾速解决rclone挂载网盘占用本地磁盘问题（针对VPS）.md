---
title: 暴力解决rclone挂载网盘占用本地磁盘问题（针对VPS）
abbrlink: a26e0a01
date: 2021-08-12 22:33:33
tags:
categories:
cover:
keywords:
description:
---
# 暴力解决rclone挂载网盘占用本地磁盘问题（针对VPS）
~~水文ing~~
## 基本

我的VPS最近莫名其妙的被占用了大量的空间，后来在群友的大力帮助下，发现这锅 `Rclone` 得背。

~~高端的食材往往只需要采用最朴素的烹饪方法~~

1. 首先，卸载（取消挂载）你的网盘
```bash
fusermount -qzu <本地路径>
```

2. 其次直接把你挂载到的那个目录清空（这里请确保已经取消挂载，这样所作的删除操作就只是针对本地的文件），为了避免没删除到隐藏文件，建议使用本最暴力的方法
```bash
rm -rf <本地路径>
```

> **注意：** 当你再次挂载时一般情况下会自动创建你刚才删除的目录（亲测 `git.io/rcloned` 的脚本正常）。如果没有你再创建不就好了🙅‍♂

## 用法
你可以直接往命令行里扔，但是注意这玩意一般不会自己挂载回来，所以注意挂载回去。

当然你也可以像我一样做成定时任务（~~好吧终究是因为我的 VPS 太拉~~）
```bash
fusermount -qzu <本地路径>
rm -rf <本地路径>
sudo reboot
```
> 我的长这样
> ```bash
> fusermount -qzu /Onedrive
> rm -rf /Onedrive
> sudo reboot
> ```

## 最后
这玩意儿未经过长期测试，也没有经历过什么骚操作所带来的问题，更没有探究其安全与稳定性。

你要是用最好谨慎点，尽量做好备份，当然如果你还有更好的方案可以分享。




