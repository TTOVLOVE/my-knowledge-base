---
title: 玄机靶场应急响应:第一章 应急响应-Linux日志分析
date: 2025-03-12 21:01:29
tags:
  - 应急响应
  - 玄机靶场
  - 信息安全
categories:
  - 应急响应
  - 靶场复现
---

<meta name="referrer" content="no-referrer">

# <center>第一章 应急响应-Linux日志分析</center>

## 一、前言

什么是`Linux`日志分析？

`Linux`日志分析是指对`Linux`系统中生成的日志文件进行检查、监控和分析的过程。在`Linux`系统中，各种服务和应用程序会产生日志文件，记录系统运行状态、用户操作、系统错误、安全事件等信息。

通过分析这些日志可以帮助系统管理员理解系统的运行状况，诊断问题，并确保系统的安全和稳定运行。日志分析可以手动进行，也可以使用各种日志分析工具来自动化这一过程。

`Linux`系统中的日志文件通常存储在 `/var/log` 目录下。

常见的日志文件包括：

```
/var/log/syslog：记录系统的各种信息和错误。
/var/log/auth.log：记录身份验证相关的信息，如登录和认证失败。
/var/log/kern.log：记录内核生成的日志信息。
/var/log/dmesg：记录系统启动时内核产生的消息。
/var/log/boot.log：记录系统启动过程中的消息。
/var/log/messages：记录系统的广泛消息，包括启动和应用程序信息。
/var/log/secure：记录安全相关的消息。
/var/log/httpd/：记录Apache HTTP服务器的访问和错误日志（若安装了Apache）。
/var/log/nginx/：记录Nginx服务器的访问和错误日志（若安装了Nginx）。
```



## 二、步骤

### 1.Flag1

![](https://gitee.com/ttovlove/images/raw/master/images/%E7%8E%84%E6%9C%BA%E5%BA%94%E6%80%A5%E5%93%8D%E5%BA%94/%E7%AC%AC%E4%B8%80%E5%BC%A0Liunx/步骤一.png)

首先肯定是先找到日志的位置，一般来说，`SSH`登录尝试会记录在 `/var/log/auth.log.1`（`auth.log`的备份文件）

问题中说的是爆破，那肯定会有很多失败的次数

这里就可以使用`grep`筛选出`SSH`失败的登录尝试，我们需要筛选出涉及到`root`帐号的`SSH`失败登录尝试的日志条目。

接着就是提取`IP`地址，从这些日志条目中提取尝试登录的`IP`地址。

统计各个`IP`地址的尝试次数， 统计每个`IP`地址的尝试次数，找出所有尝试暴力破解的`IP`。

我们先查看一下登录日志：

```
cat /var/log/auth.log.1
```

![](https://gitee.com/ttovlove/images/raw/master/images/%E7%8E%84%E6%9C%BA%E5%BA%94%E6%80%A5%E5%93%8D%E5%BA%94/%E7%AC%AC%E4%B8%80%E5%BC%A0Liunx/5.png)

可以看到日志是非常多的，靠看去分析的话不太可能，如果日志少一些那还好，可以一条条进行分析，日志多的话那可能还要进行筛选

使用命令：

```bash
cat auth.log.1 | grep -a "Failed password for root" | awk '{print $11}' | sort | uniq -c | sort -nr | more
```

![](https://gitee.com/ttovlove/images/raw/master/images/%E7%8E%84%E6%9C%BA%E5%BA%94%E6%80%A5%E5%93%8D%E5%BA%94/%E7%AC%AC%E4%B8%80%E5%BC%A0Liunx/1.png)

##### flag

```
flag{192.168.200.2,192.168.200.31,192.168.200.32}
```



##### 命令分解和分析：

1. `cat auth.log.1`:

   - `cat` 命令: 将 `auth.log.1` 文件的内容输出。

   - `auth.log.1` 文件: 这是一个系统日志文件，通常包含与身份验证相关的信息，例如 `SSH` 登录尝试。 `auth.log.1` 通常是 `auth.log` 的轮换备份，包含了前一天的日志。

2. `grep -a "Failed password for root"`:

   - `grep` 命令: 在 `cat` 的输出中搜索包含特定字符串的行。

   - `-a` 选项: 将二进制文件视为文本文件进行搜索。 尽管 `auth.log.1` 应该是文本文件，但使用 `-a` 可以确保即使文件包含一些非文本数据，`grep` 也能正常工作。 这通常不是必须的，但可以作为一种防御性措施。

   - `"Failed password for root"` 字符串: 指定要搜索的字符串。 这条语句专门查找 `root` 用户的密码尝试失败的日志条目。

3. `awk '{print $11}'`:

   - `awk` 命令:  用于处理文本数据，按字段分隔行，并提取指定的字段。

   - `'{print $11}'`:  `awk` 的程序，它打印每一行的第 `11` 个字段。  假设 `auth.log.1` 中的 `SSH` 失败登录日志条目的格式是标准的，那么第 `11` 个字段通常是尝试登录的 `IP` 地址。 
   
	  例如：
	
	```
	Feb  8 10:28:04 vm sshd[1234]: Failed password for root from 	192.168.1.10 port 56789 ssh2
	```

​		在这种情况下，`awk` 将提取 `192.168.1.10`。

4. `sort`:
   - `sort` 命令: 对 `awk` 的输出进行排序。 默认情况下，`sort` 按字母顺序对行进行排序。 这对于准备下一步的 `uniq` 命令非常重要。

5. `uniq -c`:

   - `uniq` 命令: 报告或忽略重复的行。

   - `-c` 选项: 在每一行的开头显示该行重复出现的次数。 因为 `sort` 已经对 `IP` 地址进行了排序，所以 `uniq -c` 会计算每个 `IP` 地址在 `awk` 的输出中出现的次数，从而得到每个 `IP` 地址的失败登录尝试次数。

6. `sort -nr`:

   - `sort` 命令: 再次对 `uniq` 的输出进行排序。

   - `-n` 选项: 按数值顺序排序。

   - `-r` 选项: 反向排序 (从大到小)。 这会将具有最多失败登录尝试的 `IP` 地址排在列表的最前面。

7. `more`:
   - `more` 命令: 分页显示 `sort` 命令的输出。 如果列表很长，`more` 可以防止屏幕滚动太快，让你逐页查看结果。

##### 命令的作用总结：

这条命令的目的是从 `SSH` 认证日志中提取尝试使用 `root` 账户暴力破解密码的 `IP` 地址，并按尝试失败的次数进行排序。  最终，它会显示一个列表，其中包含：

- 每个 `IP` 地址
- 每个 `IP` 地址尝试登录失败的次数

该列表按失败次数降序排列，因此可以快速识别尝试次数最多的 `IP` 地址。 这对于识别潜在的攻击者非常有用。



### 2.Flag2

![](https://gitee.com/ttovlove/images/raw/master/images/%E7%8E%84%E6%9C%BA%E5%BA%94%E6%80%A5%E5%93%8D%E5%BA%94/%E7%AC%AC%E4%B8%80%E5%BC%A0Liunx/步骤二.png)

SSH爆破的最多次数是4次，所以这里大概率可以确定是`192.168.200.2`

![](https://gitee.com/ttovlove/images/raw/master/images/%E7%8E%84%E6%9C%BA%E5%BA%94%E6%80%A5%E5%93%8D%E5%BA%94/%E7%AC%AC%E4%B8%80%E5%BC%A0Liunx/2.png)

使用命令：

```bash
cat auth.log.1 | grep -a "Accepted " | awk '{print $11}' | sort | uniq -c | sort -nr | more
```

在`Linux`系统的认证日志（例如`auth.log`）中，`"Accepted"`这个词通常用来标识成功的登录尝试。当一个用户或者系统通过认证机制成功登录时，相关的日志条目会包含`"Accepted"`这个词。这包括通过`SSH`、`FTP`、`sudo`等方式的成功登录。

这里忘记截图了，这里的输出应该是

```
2   192.168.200.2
```



##### flag

```
flag{192.168.200.2}
```



##### 命令分析

这条命令分析 SSH 成功登录的 IP 地址，并按登录次数对 IP 地址进行排序，最终以分页方式显示结果。

##### **命令分解和分析：**

1.  **`cat auth.log.1`**:
    *   **`cat` 命令:**  将 `auth.log.1` 文件的内容输出到标准输出 (`stdout`)。
    *   **`auth.log.1` 文件:**  系统日志文件，通常包含与身份验证相关的信息，例如 SSH 登录记录。 `auth.log.1` 通常是 `auth.log` 的轮换备份，包含了前一天的日志。

2.  **`grep -a "Accepted "`**:
    *   **`grep` 命令:**  在 `cat` 的输出中搜索包含特定字符串的行。
    *   **`-a` 选项:** 将二进制文件视为文本文件进行搜索。 尽管 `auth.log.1` 应该是文本文件，但使用 `-a` 可以确保即使文件包含一些非文本数据，`grep` 也能正常工作。
    *   **`"Accepted "` 字符串:**  指定要搜索的字符串。  这条语句专门查找成功 SSH 登录的日志条目。 注意 `"Accepted "` 结尾的空格，以确保只匹配成功登录的行，而不是包含 "Accepted" 的其他类型日志消息。

3.  **`awk '{print $11}'`**:
    *   **`awk` 命令:**  用于处理文本数据，按字段分隔行，并提取指定的字段。
    *   **`'{print $11}'`**:  `awk` 的程序，它打印每一行的第 11 个字段。  假设 `auth.log.1` 中的 SSH 成功登录日志条目的格式是标准的，那么第 11 个字段通常是登录的 IP 地址。 例如：

        ```
        Feb  8 10:28:04 vm sshd[1234]: Accepted password for user from 192.168.1.10 port 56789 ssh2
        ```

        在这种情况下，`awk` 将提取 `192.168.1.10`。

4.  **`sort`**:
    *   **`sort` 命令:**  对 `awk` 的输出进行排序。  默认情况下，`sort` 按字母顺序对行进行排序。  这对于准备下一步的 `uniq` 命令非常重要。

5.  **`uniq -c`**:
    *   **`uniq` 命令:**  报告或忽略重复的行。
    *   **`-c` 选项:**  在每一行的开头显示该行重复出现的次数。  因为 `sort` 已经对 IP 地址进行了排序，所以 `uniq -c` 会计算每个 IP 地址在 `awk` 的输出中出现的次数，从而得到每个 IP 地址的成功登录次数。

6.  **`sort -nr`**:
    *   **`sort` 命令:**  再次对 `uniq` 的输出进行排序。
    *   **`-n` 选项:**  按数值顺序排序。
    *   **`-r` 选项:**  反向排序 (从大到小)。  这会将具有最多成功登录次数的 IP 地址排在列表的最前面。

7.  **`more`**:
    *   **`more` 命令:**  分页显示 `sort` 命令的输出。 如果列表很长，`more` 可以防止屏幕滚动太快，让你逐页查看结果。

##### 命令的作用总结：

这条命令的目的是从 SSH 认证日志中提取成功登录的 IP 地址，并按登录次数进行排序。  最终，它会显示一个列表，其中包含：

*   每个 IP 地址
*   每个 IP 地址成功登录的次数

该列表按登录次数降序排列，因此可以快速识别登录次数最多的 IP 地址。

**命令用途：**

*   **监控常用登录 IP:** 可以识别系统管理员或其他授权用户常用的 IP 地址。
*   **发现异常活动:** 虽然成功登录的记录通常是良性的，但如果某个不常见的 IP 地址有大量的登录记录，可能表明账户被盗用或存在内部威胁。



### 3.Flag3

![](https://gitee.com/ttovlove/images/raw/master/images/%E7%8E%84%E6%9C%BA%E5%BA%94%E6%80%A5%E5%93%8D%E5%BA%94/%E7%AC%AC%E4%B8%80%E5%BC%A0Liunx/步骤三.png)

简单来说**爆破用户名字典**就是一种通过尝试大量可能的用户名字来猜测有效用户名，并结合密码破解尝试获取未授权访问的攻击手段。

那这里的思路就是：

1. 识别关键日志条目：


​	确定日志中包含攻击相关信息的条目。例如，`SSH` 失败登录尝试通常包含“`Failed password`”关键字，成功登录则包含“`Accepted`”。

2. 提取有用信息：

​	使用文本处理工具如 `grep`、`awk`、`perl` 或 `sed` 提取出关键数据。例如，可以从日志中提取出失败尝试的用户名、IP地址、时间戳等。

3. 统计分析：

​	对提取出的信息进行统计分析，以确定被尝试最多的用户名和来源IP等。例如，使用 `uniq` 和 `sort` 对数据进行去重和排序。

使用命令：

```bash
cat auth.log.1 | grep -a "Failed password" | perl -e 'while($_=<>){ /for(.*?) from/; print "$1\n";}'| sort | uniq -c | sort -nr
```

![](https://gitee.com/ttovlove/images/raw/master/images/%E7%8E%84%E6%9C%BA%E5%BA%94%E6%80%A5%E5%93%8D%E5%BA%94/%E7%AC%AC%E4%B8%80%E5%BC%A0Liunx/3.png)

##### flag

```
flag{user,hello,root,test3,test2,test1}
```



##### 命令分析

这条命令分析 SSH 失败登录尝试的 IP 地址，并按失败登录次数对 IP 地址进行排序，最终显示结果。

##### **命令分解和分析：**

1.  **`cat auth.log.1`**:
    *   **`cat` 命令:**  将 `auth.log.1` 文件的内容输出到标准输出 (stdout)。
    *   **`auth.log.1` 文件:**  系统日志文件，通常包含与身份验证相关的信息，例如 SSH 登录记录。 `auth.log.1` 通常是 `auth.log` 的轮换备份，包含了前一天的日志。

2.  **`grep -a "Failed password"`**:
    *   **`grep` 命令:**  在 `cat` 的输出中搜索包含特定字符串的行。
    *   **`-a` 选项:** 将二进制文件视为文本文件进行搜索。 尽管 `auth.log.1` 应该是文本文件，但使用 `-a` 可以确保即使文件包含一些非文本数据，`grep` 也能正常工作。
    *   **`"Failed password"` 字符串:**  指定要搜索的字符串。  这条语句专门查找 SSH 密码验证失败的日志条目。

3.  **`perl -e 'while($_=<>){ /for(.*?) from/; print "$1\n";}'`**:
    *   **`perl -e` 命令:**  执行一段 Perl 代码。
    *   **`'while($_=<>){ /for(.*?) from/; print "$1\n";}'`**:  这是一段 Perl 代码，其作用是从每一行输入中提取 IP 地址。  让我们分解一下：
        
        *   **`while($_=<>)`**:  循环读取每一行输入，并将每一行存储在特殊变量 `$_` 中。 `<>` 是 Perl 中从标准输入读取数据的操作符。
        *   **`/for(.*?) from/`**:  这是一个正则表达式匹配。 它在 `$_` 中搜索以 "for" 开头，然后是任意字符（非贪婪匹配，用 `*?` 表示），最后是 " from" 的字符串。  非贪婪匹配确保只匹配到 "from" 之前的最近的 "for"。  括号 `()` 捕获匹配到的内容，并将其存储在 `$1` 变量中。
        *   **`print "$1\n"`**:  打印 `$1` 变量的内容，即捕获到的 IP 地址，并在末尾添加一个换行符。
    *   **作用：**  这段 Perl 代码的作用是从包含 "Failed password" 的日志行中提取 IP 地址。  例如，如果日志行是：
    
        ```bash
        Feb  8 10:28:04 vm sshd[1234]: Failed password for invalid user root from 192.168.1.10 port 56789 ssh2
        ```
    
        这段 Perl 代码将提取 `192.168.1.10`。
    
4.  **`uniq -c`**:
    *   **`uniq` 命令:**  报告或忽略重复的行。
    *   **`-c` 选项:**  在每一行的开头显示该行重复出现的次数。  因为 `sort` 已经对 IP 地址进行了排序，所以 `uniq -c` 会计算每个 IP 地址在 `awk` 的输出中出现的次数，从而得到每个 IP 地址的失败登录次数。 **注意：这一步依赖于 `sort` 命令在 `uniq` 之前执行。 但是，命令中 `sort` 在 `uniq` 之后，因此需要调整命令顺序。**

5.  **`sort -nr`**:
    *   **`sort` 命令:**  对 `uniq` 的输出进行排序。
    *   **`-n` 选项:**  按数值顺序排序。
    *   **`-r` 选项:**  反向排序 (从大到小)。  这会将具有最多失败登录次数的 IP 地址排在列表的最前面。

##### 命令的作用总结：

这条命令的目的是从 SSH 认证日志中提取密码验证失败的 IP 地址，并按失败登录次数进行排序。  最终，它会显示一个列表，其中包含：

*   每个 IP 地址
*   每个 IP 地址密码验证失败的次数

该列表按失败登录次数降序排列，因此可以快速识别密码验证失败次数最多的 IP 地址，这些 IP 地址可能是潜在的攻击者。





### 4.Flag4

![](https://gitee.com/ttovlove/images/raw/master/images/%E7%8E%84%E6%9C%BA%E5%BA%94%E6%80%A5%E5%93%8D%E5%BA%94/%E7%AC%AC%E4%B8%80%E5%BC%A0Liunx/步骤四.png)

这里在前面第一个步骤时问：

```
有多少IP在爆破主机ssh的root账号？这里又问成功登录 root 用户的 ip 一共爆破了多少次？
```

所以这里在前面第一步时就已经统计出来了

命令和第一步的一样：

```bash
cat auth.log.1 | grep -a "Failed password for root" | awk '{print $11}' | sort | uniq -c | sort -nr | more
```

![](https://gitee.com/ttovlove/images/raw/master/images/%E7%8E%84%E6%9C%BA%E5%BA%94%E6%80%A5%E5%93%8D%E5%BA%94/%E7%AC%AC%E4%B8%80%E5%BC%A0Liunx/4.png)

##### flag

```
flag{4}
```





### 5.Flag5

![](https://gitee.com/ttovlove/images/raw/master/images/%E7%8E%84%E6%9C%BA%E5%BA%94%E6%80%A5%E5%93%8D%E5%BA%94/%E7%AC%AC%E4%B8%80%E5%BC%A0Liunx/步骤五.png)

##### 思路

这种的思路一般是：

1. 确定日志文件

   - 通常与用户登录和用户管理活动相关的日志文件是 /`var/log/auth.log` 或其备份文件 `/var/log/auth.log.1`。


2. 搜索创建用户的关键字

   - 使用 `grep` 命令搜索与创建用户相关的关键字，像 `new user`。这样可以找到所有新建用户的日志条目。


   - ```bash
     cat /var/log/auth.log.1 | grep -a "new user"
     ```

​		此命令会列出所有包含 `new user` 的日志行，这些行通常记录了用户创建的详细信息。

3. 提取新用户信息
   - 从日志中提取新用户的详细信息，包括用户名、创建时间等。


​		例如，假设你得到了如下输出：


```bash
Jan 12 10:32:15 server useradd[1234]: new user: name=testuser, UID=1001, GID=1001, home=/home/testuser, shell=/bin/bash
```


​		这条日志显示了创建的新用户 `testuser`。

4. 分析执行上下文

   - 确认新用户的创建是否由合法用户执行，或是否有可疑的远程登录记录。


   - 可以使用以下命令查找所有用户登录的情况，以确定是否有可疑的登录行为：


```bash
grep "Accepted" /var/log/auth.log.1
```

5. 进一步确认

​		结合其他日志文件，如 `/var/log/syslog`，查看是否有异常的命令执行或系统变更。



使用命令：

```bash
cat auth.log.1 |grep -a "new user"
```

![](https://gitee.com/ttovlove/images/raw/master/images/%E7%8E%84%E6%9C%BA%E5%BA%94%E6%80%A5%E5%93%8D%E5%BA%94/%E7%AC%AC%E4%B8%80%E5%BC%A0Liunx/4.png)

这里用`-a`的原因和前面的`grep -a`的原因也是一样的

`-a` 选项: 将二进制文件视为文本文件进行搜索。 尽管 `auth.log.1` 应该是文本文件，但使用 `-a` 可以确保即使文件包含一些非文本数据，`grep` 也能正常工作。 这通常不是必须的，但可以作为一种防御性措施。



##### flag

```
flag{test2}
```

