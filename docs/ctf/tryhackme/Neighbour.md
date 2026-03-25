---
title: tryhackme靶场挑战1
date: 2025-03-18 20:40:17
tags:
  - CTF
categories:
  - CTF
---

<meta name="referrer" content="no-referrer">

# <centre>Neighbour</centre>

## 一、介绍

![](https://gitee.com/ttovlove/images/raw/master/images/tryhackme/1/题目.png)



## 二、攻击过程

打开靶场，`join room`后开启机器，得到靶机的`ip`，开启`Start AttackBox`

使用`nmap`对`IP`进行扫描，识别靶机上开放的端口及其服务

```
nmap <靶机IP>
```

![](https://gitee.com/ttovlove/images/raw/master/images/tryhackme/1/4.png)

扫描结果显示目标靶机上开放了 `22` 和 `80` 两个端口，分别对应 `SSH` 和 `HTTP` 服务。

访问`80`端口的网页，得到提示，`ctrl+u`查看源码，拿到提示

![](https://gitee.com/ttovlove/images/raw/master/images/tryhackme/1/1.png)

![](https://gitee.com/ttovlove/images/raw/master/images/tryhackme/1/2.png)

使用`guest:guest`登录看一下

这里说`admin`用户被禁止，猜测要以`admin`的身份进入才可以得到`flag`



![3](https://gitee.com/ttovlove/images/raw/master/images/tryhackme/1/3.png)

这里以`guest`身份进入无法获取有用信息，用`bp`抓包看一下(这里前面的包是`POST`是要放行的，是前端发给后端验证的)

这里后端验证后会返回验证结果给前端，抓到这个包我们发到重放模块

![5](https://gitee.com/ttovlove/images/raw/master/images/tryhackme/1/5.png)

这里给前端的没有任何验证，我们前面以`guest`登录时的密码是对的，这里后端返回给前端的消息只有说这个用户是谁，但是后端验证后返回的验证结果中仅包含用户身份信息，而未对用户身份进行严格限制，那我们将这个包的用户名字段修改为`admin`的话前端就会返回`admin`的页面给我们

![6](https://gitee.com/ttovlove/images/raw/master/images/tryhackme/1/6.png)

改完后发包，成功进入`admin`的页面，得到`flag`

![7](https://gitee.com/ttovlove/images/raw/master/images/tryhackme/1/7.png)
