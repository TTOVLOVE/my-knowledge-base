---
title: vulnhub-deadnote Writeup
date: 2025-06-08 21:32:57
tags:
  - CTF
  - 信息安全
categories:
  - vulnhub	
  - 渗透
---

<meta name="referrer" content="no-referrer">

# deathnote1 Writeup

## 描述

```
Level - easy

Description : don't waste too much time thinking outside the box . It is a Straight forward box .

This works better with VirtualBox rather than VMware
```

等级 - 简单 

描述：不要浪费太多时间进行发散性思考。这是一个直接明了的盒子。 

这在`VirtualBox`上比在`VMware`上运行得更好



## 环境搭建

- ### About Release

  - **Name**: Deathnote: 1
  - **Date release**: 4 Sep 2021
  - **Author**: [HWKDS](https://www.vulnhub.com/author/hwkds,816/)
  - **Series**: [Deathnote](https://www.vulnhub.com/series/deathnote,499/)

  ### Download

  Please remember that VulnHub is a free community resource so we are unable to check the machines that are provided to us. Before you download, please read our FAQs sections dealing with the dangers of running unknown VMs and our suggestions for “protecting yourself and your network. If you understand the risks, please download!

  - **Deathnote.ova** (Size: 658 MB)
  - **Download (Mirror)**: https://download.vulnhub.com/deathnote/Deathnote.ova

  



下载虚拟机文件后导入`VirtualBox`启动即可

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/0.png)

注意：靶机和攻击机要在一个网段，我这里`kali`使用的是`NAT`网络，所以这里靶机用的也是`NAT`网络



## 信息收集

使用`nmap`对内网存活的机器扫描

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/1.png)

找到靶机的`ip`，使用`nmap`扫描端口

```
nmap -T4 -sV -p- -A 192.168.11.5
```

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/2.png)

开启了`22`(`ssh`)和`80`(`http`)端口

访问`80`端口看看



## 域名解析

访问后自动跳转到一个域名`http://deathnote.vuln/wordpress`，无法成功访问

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/3.png)

`ai`说是域名解析问题

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/4.png)

编辑`/etc/hosts`文件，添加一条

```
192.168.11.5	deathnote.vuln
```

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/5.png)

再访问即可正常进入

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/6.png)

点击提示

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/7.png)

提示说要找到在服务器上查找`notes.txt`文件 或 查看`L`评论

使用`dirsearch`扫描一下目录

发现一个爬虫协议的文件

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/13.png)

访问一下，也是一个提示

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/14.png)

这个图片直接访问看不了

发个包看看

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/15.png)

得到提示是登录的`username`在`user.txt`中

接着扫下一级目录

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/8.png)

发现了`wp`的上传目录，浏览器访问

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/9.png)

在`/wordpress/wp-content/uploads/2021/07`下发现`note.txt`文件

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/10.png)

打开查看

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/11.png)

```
death4
death4life
death4u
death4ever
death4all
death420
death45
death4love
death49
death48
death456
death4014
1death4u
yaydeath44
thedeath4u2
thedeath4u
stickdeath420
reddeath44
megadeath44
megadeath4
killdeath405
hot2death4sho
death4south
death4now
death4l0ve
death4free
death4elmo
death4blood
death499Eyes301
death498
death4859
death47
death4545
death445
death444
death4387n
death4332387
death42521439
death42
death4138
death411
death405
death4me
```

下面还有一个`user.txt`，也打开看看

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/12.png)

结合提示登录的用户名在`user.txt`中，那`note.txt`应该就是密码

扫目录时发现了`wp`的后台登录地址`/wordpress/wp-login.php` 

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/16.png)



## 爆破ssh用户密码

将两个内容保存下来，接下来使用`hydra`对`ssh`进行账户名和密码爆破

**注:这里要多尝试几次才能爆破成功**

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/17.png)

得到`ssh`的用户名和密码

```
login: l   password: death4me
```

使用`ssh`连接上去

```
ssh l@192.168.11.5
```

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/18.png)

发现目录下有一个文件，查看内容

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/19.png)

明显的`brainfuck`加密

复制出来解密

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/20.png)

得到

```
i think u got the shell , but you wont be able to kill me -kira
```

继续查看有没有什么有用的信息

在`kira`用户的文件夹下有一个`kira.txt`的文件，但是不给查看

接着在`opt`文件夹下找到一个`L`的文件夹

里面有两个内容`fake-notebook-rule`  `kira-case`两个文件夹

分别查看内容

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/21.png)

说我们会在`fake-notebook-rule`有发现

![22](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/22.png)

提示使用`cyberchef`

解码后得到`passwd : kiraisevil` 

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/23.png)

使用密码切换到`kira`用户，读取`kira.txt`

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/24.png)

同样使用`cyberchef`解密

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/25.png)

说要保护`/opt/L`和`/var/Misa`

`/opt/L`的内容我们已经得到了，现在去看一下`/var/Misa`有什么内容

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/26.png)

服了，没什么用

但是发现`kira`是`sudo`权限，也就是说可以切换到`root`用户

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/27.png)

在`root`根目录下发现一个`root.txt`文件

读取成功拿到`flag`

![](https://gitee.com/ttovlove/images/raw/master/images/vulnhub/deadnote1/28.png)
