

<meta name="referrer" content="no-referrer" />

# Week 5





## RE

### 天才的“认证”

##### 解题过程

用`exeinfo`检查发现程序是`pyinstaller`打包的`python`程序，这里从程序的图标其实就能直接看出来

![image-20251101155331605](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081259582.png)

先用`pyinstxtractor`将程序解包

![image-20251027112546380](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081259219.png)

将解包后的主函数进行反编译

![image-20251027112724698](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081259704.png)



得到主函数的逻辑

```py
#!/usr/bin/env python
# visit https://tool.lu/pyc/ for more information
# Version: Python 3.8


class TinyVM:
    
    def __init__(self, bytecode, user_input):
        self.bytecode = bytecode
        self.user_input = user_input
        self.mem = [
            0] * 100
        self.ip = 0
        self.stack = []
        self.f = False
        self.halted = False
        for i, char_code in enumerate(self.user_input):
            self.mem[16 + i] = char_code

    
    def push(self, value):
        self.stack.append(value & 255)

    
    def pop(self):
        if self.stack:
            return self.stack.pop()

    
    def run(self):
        if self.halted and self.ip < len(self.bytecode):
            opcode = self.bytecode[self.ip]
            self.ip += 1
            if opcode == 1:
                self.push(self.bytecode[self.ip])
                self.ip += 1
                continue
            if opcode == 2:
                self.push(self.mem[self.bytecode[self.ip]])
                self.ip += 1
                continue
            if opcode == 3:
                self.mem[self.bytecode[self.ip]] = self.pop()
                self.ip += 1
                continue
            if opcode == 4:
                self.push(self.pop() + self.pop())
                continue
            if opcode == 5:
                self.push(self.pop() ^ self.pop())
                continue
            if opcode == 6:
                n = self.pop()
                v = self.pop()
                self.push(v << n)
                continue
            if opcode == 7:
                n = self.pop()
                v = self.pop()
                self.push(v >> n)
                continue
            if opcode == 8:
                self.push(self.pop() | self.pop())
                continue
            if opcode == 9:
                self.f = self.pop() == self.pop()
                continue
            if opcode in (10, 11, 12):
                offset = self.bytecode[self.ip]
                self.ip += 1
                if not opcode == 12:
                    if (opcode == 10 or not (self.f)) and opcode == 11:
                        pass
                should_jump = self.f
                if should_jump:
                    if offset > 127:
                        offset -= 256
                    self.ip += offset
                    continue
                    if opcode == 13:
                        self.push(len(self.user_input))
                        continue
                    if opcode == 14:
                        addr = self.pop()
                        self.push(self.mem[addr])
                        continue
                    if opcode == 15:
                        addr = self.pop()
                        val = self.pop()
                        self.mem[addr] = val
                        continue
                    if opcode == 255:
                        self.halted = True
                        continue
                    self.halted = True
            continue
        return bool(self.pop())



def check_flag(s):
    BYTECODE = b'%01i%032%011%033%01A%034%01\t%035%01%a1%036%01`%037%01%a1%038%01%81%039%011%03:%019%03;%01%8b%03<%01!%03=%01%d1%03>%019%03?%01 %03@%01%b1%03A%01%f9%03B%01%d9%03C%01q%03D%01f%03E%01%18%03F%01%99%03G%01V%03H%01%e9%03I%01q%03J%010%03K%01V%03L%018%03M%01%a1%03N%01%ab%03O%01%86%03P\r%01%1f\t\n=%01K%03%02%01%00%03%00%02%00%01%1f\t%0b+%01%10%02%00%04%0e%02%00%04%02%02%05%03%01%02%01%01%03%06%02%01%01%05%07%08%012%02%00%04%0e\t\n%0c%02%00%01%01%04%03%00%0c%ce%01%01%ff%01%00%ff'
    vm = TinyVM(BYTECODE, s.encode('utf-8'))
    return vm.run()


def main():
    print('「欢迎，开拓者。这里是一个被星核污染的赛博空间。」')
    print('「检测到未知访问者...」机械女声响起，像是黑塔空间站的自动防御系统')
    print('「哼，又一个被星核吸引来的家伙。想通过验证？先证明你不是个笨蛋吧。」——某位不愿透露姓名的天才俱乐部成员留言')
# WARNING: Decompyle incomplete

if __name__ == '__main__':
    main()
```

分析一下程序的主要逻辑


 反编译出的 `run()` 明显被破坏了（比如 `if self.halted and self.ip < len(self.bytecode):` 应该是循环 `while not self.halted ...`，以及很多 `continue`/缩进位置错乱）。第一步是把 VM 的控制流、跳转逻辑、操作码语义恢复成合理的实现。


 将代码中给的 `BYTECODE` 字面包含很多 `%03`、`%01` 之类，这是 percent-encoded 表示的二进制流，需用 `urllib.parse.unquote_to_bytes` 或等价方法 decode 成真正 bytes

 在实现 VM 时加入**日志**（记录每次的 `push/pop`、对内存 `mem` 的读取/写入、比较（cmp）和跳转），这样可以看到 VM 在执行时比较了哪些内存地址、比较了哪些常量，从而直接推断出期待的输入字节。
 原代码在构造 VM 时把用户输入的每个字节写入 `mem[16 + i]`，通常会把每个输入字节与某个常量或由 bytecode 推导出的值做比较。通过观察 VM 日志，就能得到 “mem[16+0] 应该等于 0xNN”, “mem[16+1] 应该等于 0xMM” 这样的映射，从而直接拼出 flag。
 有时候不是直接比较，而是 `mem[x]` 参加了一系列算术/位运算再与常量比对——这时用“履历日志”或把每次操作作为方程倒推（或者用逐字节暴力 / 符号执行）都能还原出原始字节。
 日志还能显示跳转条件（flag f 被设置的点），按执行顺序记录的比较/跳转信息会告诉你 VM 在做哪些检查、以何种顺序检查，方便逐步还原。



所以这里要解出flag来就要将

反编译出的 `BYTECODE` 的 percent-编码解码为真实 bytes；

用一个“修正后的” TinyVM 实现包含输出详细日志内容

提供 `analyze()` 辅助函数：运行 VM 并尝试把 `mem[16 + i]` 被比较的情形提取出来



```python
import urllib.parse

BYTECODE_LITERAL = b'%01i%032%011%033%01A%034%01\t%035%01%a1%036%01`%037%01%a1%038%01%81%039%011%03:%019%03;%01%8b%03<%01!%03=%01%d1%03>%019%03?%01 %03@%01%b1%03A%01%f9%03B%01%d9%03C%01q%03D%01f%03E%01%18%03F%01%99%03G%01V%03H%01%e9%03I%01q%03J%010%03K%01V%03L%018%03M%01%a1%03N%01%ab%03O%01%86%03P\r%01%1f\t\n=%01K%03%02%01%00%03%00%02%00%01%1f\t%0b+%01%10%02%00%04%0e%02%00%04%02%02%05%03%01%02%01%01%03%06%02%01%01%05%07%08%012%02%00%04%0e\t\n%0c%02%00%01%01%04%03%00%0c%ce%01%01%ff%01%00%ff'

def decode_bytecode(literal_bytes):
    s = literal_bytes.decode('latin-1')
    raw = urllib.parse.unquote_to_bytes(s)
    return raw

BYTECODE = decode_bytecode(BYTECODE_LITERAL)

class TinyVM:
    def __init__(self, bytecode: bytes, user_input: bytes):
        self.bytecode = bytecode
        self.ip = 0
        self.stack = []
        self.mem = [0] * 256
        self.f = False
        self.halted = False
        for i,b in enumerate(user_input):
            self.mem[16 + i] = b
        self.user_input = user_input
        self.log = []  # (step_index, opname, details)

    def push(self, v):
        v = v & 0xFF
        self.stack.append(v)
        self.log.append(("push", v))

    def pop(self):
        v = self.stack.pop() if self.stack else None
        self.log.append(("pop", v))
        return v

    def run(self, max_steps=2000000):
        steps = 0
        while (not self.halted) and (self.ip < len(self.bytecode)) and steps < max_steps:
            steps += 1
            opcode = self.bytecode[self.ip]
            self.ip += 1

            if opcode == 1:
                val = self.bytecode[self.ip]; self.ip += 1
                self.push(val); continue

            if opcode == 2:
                addr = self.bytecode[self.ip]; self.ip += 1
                val = self.mem[addr]
                self.push(val)
                self.log.append(("load_mem", addr, val))
                continue

            if opcode == 3:
                addr = self.bytecode[self.ip]; self.ip += 1
                val = self.pop() or 0
                self.mem[addr] = val & 0xFF
                self.log.append(("store_mem", addr, self.mem[addr]))
                continue

            if opcode == 4:
                a = self.pop() or 0; b = self.pop() or 0
                self.push((a + b) & 0xFF); continue

            if opcode == 5:
                a = self.pop() or 0; b = self.pop() or 0
                self.push((a ^ b) & 0xFF); continue

            if opcode == 6:
                n = self.pop() or 0; v = self.pop() or 0
                self.push((v << n) & 0xFF); continue

            if opcode == 7:
                n = self.pop() or 0; v = self.pop() or 0
                self.push((v >> n) & 0xFF); continue

            if opcode == 8:
                a = self.pop() or 0; b = self.pop() or 0
                self.push((a | b) & 0xFF); continue

            if opcode == 9:
                a = self.pop() or 0; b = self.pop() or 0
                self.f = (a == b)
                self.log.append(("cmp", a, b, self.f)); continue

            if opcode in (10,11,12):
                offset = self.bytecode[self.ip]; self.ip += 1
                if opcode == 10:
                    should_jump = (not self.f)
                elif opcode == 11:
                    should_jump = self.f
                else:
                    should_jump = True
                if should_jump:
                    if offset > 127: offset -= 256
                    self.log.append(("jump", opcode, offset, self.ip))
                    self.ip += offset
                continue

            if opcode == 13:
                self.push(len(self.user_input)); continue

            if opcode == 14:
                addr = self.pop() or 0
                self.push(self.mem[addr]); self.log.append(("load_mem_by_pop", addr, self.mem[addr])); continue

            if opcode == 15:
                addr = self.pop() or 0; val = self.pop() or 0
                self.mem[addr] = val & 0xFF; self.log.append(("store_mem_by_pop", addr, val)); continue

            if opcode == 255:
                self.halted = True; self.log.append(("halt",)); continue
            self.log.append(("unknown_opcode", opcode, self.ip - 1))
            self.halted = True
        return self

def analyze(bytecode):
    dummy = b'?' * 64
    vm = TinyVM(bytecode, dummy)
    vm.run()
    comparisons = []
    for e in vm.log:
        if e[0] == "cmp":
            comparisons.append(e)
        if e[0] in ("load_mem", "load_mem_by_pop", "store_mem", "store_mem_by_pop"):
            pass
        
    mem_reads = [x for x in vm.log if x[0] in ("load_mem","load_mem_by_pop")]
    return vm, comparisons, mem_reads

if __name__ == "__main__":
    vm, cmps, mem_reads = analyze(BYTECODE)
    print("执行结束，log 长度：", len(vm.log))
    print("前 80 条 log：")
    for i, e in enumerate(vm.log[:80]):
        print(i, e)
    print("\n检测到的比较（cmp）数量：", len(cmps))
    print("检测到的内存读取样例（load_mem / load_mem_by_pop）数量：", len(mem_reads))
```

运行后得到

![image-20251101160132717](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081300664.png)

在修正后的 `VM` 里 `loop` 的核心步骤是（对第 `i` 字节）：

1. 取输入字节 `X = mem[16 + i]`。
2. 计算 `t = X + i`。
3. `m1 = mem[2] ^ t`，题里 `mem[2]` 被设为 `75`。
4. 把 `m1` **左循环移位 3 位**（8-bit rotate left 3）得到 `rotl(m1,3)`。
5. 将结果与表中对应字节 `table[i] = mem[50 + i]` 比较：要求 `rotl(m1,3) == table[i]`。

所以反推公式为：

- 先把 `table[i]` 做右循环移位 3（`z = rotr(table[i], 3)`），
- 得到 `m1 = z`，于是 `X + i ≡ (mem2 ^ z) (mod 256)`，
- 因此 `X = (mem2 ^ z) - i (mod 256)`，其中 `mem2 = 75`。

这里发现只取前`80`条得不到完整的，这里调整到前100条

![image-20251101161111057](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081300123.png)

取到`False`前的

还原

```python
def rotl8(x, n):
    return ((x << n) & 0xFF) | ((x & 0xFF) >> (8 - n))

def rotr8(x, n):
    return ((x & 0xFF) >> n) | ((x << (8 - n)) & 0xFF)

def decode_flag_from_table(table_bytes, mem2, start_i=0):

    res = []
    for idx, tb in enumerate(table_bytes):
        i = start_i + idx
        z = rotr8(tb, 3)
        x = ( (mem2 ^ z) - i ) & 0xFF
        res.append(x)
    return bytes(res)

if __name__ == "__main__":

    table_bytes = [
        105, 49, 65, 9, 161, 96, 161, 129, 49, 57, 139, 33, 209, 57, 32, 177,
        249, 217, 113, 102, 24, 153, 86, 233, 113, 48, 86, 56, 161, 171, 134
    ]

    mem2 = 75

    decoded = decode_flag_from_table(table_bytes, mem2, start_i=0)
    try:
        decoded_text = decoded.decode('utf-8')
    except UnicodeDecodeError:

        decoded_text = decoded.decode('latin-1', errors='replace')

    print("解出的字节 (raw):", decoded)
    print("解出的 ASCII:", decoded_text)
```

![image-20251101161136946](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081300628.png)



##### flag

```
flag{Bytec0de_And_St4ck_M4g1c!}
```









### 河图洛书

##### 解题过程

先查看一下程序的信息，发现也是一个`python`程序

![image-20251027150828253](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081300183.png)

先将程序解包

![image-20251027150927759](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081300694.png)

接着要将主函数的`pyc`反编译，但是这里发现这里用的是`python3.12`，没有找到可以完全还原程序逻辑的工具，综合下来发现用`pycdc`还原出的代码还勉强能读

![image-20251027170601820](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081300010.png)

得到

```python
# Source Generated with Decompyle++
# File: luoshu_c.pyc (Python 3.12)

import sys
import os
import time
import random
import threading
import msvcrt
from colorama import init, Fore, Style
init()
magic_square = [
    [
        4,
        9,
        2],
    [
        3,
        5,
        7],
    [
        8,
        1,
        6]]
input_buffer = ''
stop_animation = False
COLOR_MAP = {
    1: Fore.RED + Style.BRIGHT,
    2: Fore.GREEN + Style.BRIGHT,
    3: Fore.BLUE + Style.BRIGHT,
    4: Fore.YELLOW,
    5: Fore.WHITE + Style.BRIGHT,
    6: Fore.CYAN,
    7: Fore.MAGENTA,
    8: Fore.RED,
    9: Fore.GREEN }

def clear_lines(n):
    for _ in range(n):
        sys.stdout.write('\x1b[1A')
        sys.stdout.write('\x1b[2K')
    sys.stdout.flush()


def goto_line(line):
    sys.stdout.write(f'''\x1b[{line + 1};1H''')


def clear_line():
    sys.stdout.write('\x1b[2K')


def print_magic_square():
    clear_lines(10)
    goto_line(0)
    top = '  ┌───┬───┬───┐'
    middle = '  ├───┼───┼───┤'
    bottom = '  └───┴───┴───┘'
    sys.stdout.write(top + '\n')
    for i in range(3):
        line = '  │'
        for j in range(3):
            num = magic_square[i][j]
            color = COLOR_MAP.get(num, Fore.WHITE)
            line += f''' {color}{num}{Style.RESET_ALL} │'''
        sys.stdout.write(line + '\n')
        if not i < 2:
            continue
        sys.stdout.write(middle + '\n')
    sys.stdout.write(bottom + '\n')
    sys.stdout.write('\n')
    sys.stdout.flush()


def shift_row_left(row):
    magic_square[row] = magic_square[row][1:] + [
        magic_square[row][0]]


def shift_row_right(row):
    magic_square[row] = [
        magic_square[row][-1]] + magic_square[row][:-1]


def shift_col_up(col):
    t = magic_square[0][col]
    magic_square[0][col] = magic_square[1][col]
    magic_square[1][col] = magic_square[2][col]
    magic_square[2][col] = t


def shift_col_down(col):
    t = magic_square[2][col]
    magic_square[2][col] = magic_square[1][col]
    magic_square[1][col] = magic_square[0][col]
    magic_square[0][col] = t


def random_transform():
    op = random.randint(0, 3)
    idx = random.randint(0, 2)
    if op == 0:
        shift_row_left(idx)
        return None
    if op == 1:
        shift_row_right(idx)
        return None
    if op == 2:
        shift_col_up(idx)
        return None
    shift_col_down(idx)


def animation_loop():
    if not stop_animation:
        time.sleep(0.5)
        if not stop_animation:
            random_transform()
            print_magic_square()
            goto_line(10)
            clear_line()
            sys.stdout.write(f'''Input your flag: {input_buffer}''')
            sys.stdout.flush()
        if not stop_animation:
            continue
        return None

if __name__ == '__main__':
    os.system('cls')
    for _ in range(12):
        print()
    goto_line(0)
    print_magic_square()
    goto_line(10)
    sys.stdout.write('Input your flag: ')
    sys.stdout.flush()
    target_hex = '490e0ad0374f2cdd126e5b184bf4e6da669a4cbea88fac916494edd90149809a7c92eec2e82ed3fca5812d9f69'
    anim_thread = threading.Thread(target = animation_loop, daemon = True)
    anim_thread.start()
    if msvcrt.kbhit():
        ch = msvcrt.getch()
        if ch in frozenset({b'\n', b'\r'}):
            if len(input_buffer) != 45:
                goto_line(11)
                sys.stdout.write(Fore.RED + 'Length wrong!' + Style.RESET_ALL + '                              ')
                sys.stdout.flush()
                time.sleep(1.5)
                goto_line(11)
                clear_line()
                goto_line(10)
                clear_line()
                sys.stdout.write(f'''Input your flag: {input_buffer}''')
                sys.stdout.flush()
                continue
            import luo_shu
            msg = input_buffer.encode()
            key = b'LESCBCKEY'
            iv = b'LESCBC_iv'
            cipher = luo_shu.encrypt(msg, 1, key, iv)
            result_hex = cipher.hex()
            goto_line(11)
            if result_hex == target_hex:
                sys.stdout.write(Fore.GREEN + 'Right flag! Congratulations!' + Style.RESET_ALL + '                    ')
            else:
                sys.stdout.write(Fore.RED + 'Wrong flag! Try again.' + Style.RESET_ALL + '                         ')
            sys.stdout.flush()
            time.sleep(2)
        elif ch == b'\x08' or input_buffer:
            input_buffer = input_buffer[:-1]
            goto_line(10)
            clear_line()
            sys.stdout.write(f'''Input your flag: {input_buffer}''')
            sys.stdout.flush()
        elif len(input_buffer) < 45:
            char = ch.decode('ascii', errors = 'ignore')
    time.sleep(0.01)
    continue
    True = None if char else input_buffer += char
    anim_thread.join(timeout = 0.1)
    print('\n')
    return None
return None
# WARNING: Decompyle incomplete
```

程序读取用户输入 `input_buffer`，要求长度 `== 45`。

然后调用：

```py
import luo_shu
msg = input_buffer.encode()
key = b'LESCBCKEY'
iv  = b'LESCBC_iv'
cipher = luo_shu.encrypt(msg, 1, key, iv)
result_hex = cipher.hex()
```

接着把 `result_hex` 与程序中给定的常量 `target_hex` 做**完全等值比较**，相等则认为 flag 正确。

`target_hex` 的长度为 90 hex 字符 → 即 45 bytes 的密文（`len(bytes.fromhex(target_hex)) == 45`），恰好与明文长度 45 一致。

这里的关键是反编译出的函数本身并没有包含决定性逻辑的 `luo_shu` 模块实现 —— 程序把输入 `input_buffer` 传进去调用了

```
import luo_shu
cipher = luo_shu.encrypt(msg, 1, key, iv)
```

也就是真正决定密文如何产生的函数在另一个模块 `luo_shu`。要解出 `flag`，必须要知道 `luo_shu.encrypt` 的实现

这里程序直接调用 `luo_shu.encrypt`，这里就需要得到 `luo_shu` 的实现

接着要要分析 `luo_shu.cp312-win_amd64.pyd` 文件，这是`C/C++`编写的`Python`扩展模块

用`ida`打开程序，没有找到主要的程序调用逻辑，直接`shift+f12`看字符串来定位

跟进

![image-20251101162314749](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081300800.png)

得到

![image-20251101162625462](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081300653.png)

这段 `pyd` 的包装函数基本就是 `luo_shu.encrypt(msg, mode, key, iv)` 的函数原型：

- 第 1 个参数 `msg` 要求是 `bytes`（明文）
- 第 2 个参数是 **整数** `mode`（ py 里传的是 `1`）
- 第 3、4 个参数 `key`、`iv` 也都强制是 `bytes`
- 返回值是 `bytes`（密文）
- 实际加密在内部的 `sub_180001510(...)` 完成，这个包装函数只是做 Python 端的参数校验与类型转换

接着看`sub_180001510(...)`函数

![image-20251101162746250](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081300750.png)

函数签名（从外层包装函数和这里的用法综合）：

```
sub_180001510(message: PyBytes, mode: int, key: PyBytes, iv: PyBytes) -> PyBytes
```

`a2` 是 `message`（必须是 `bytes`），取长度 `L = *(a2+16)`；若 `None` 或取长失败就抛错。

`a4` 是 `key`（必须 `bytes`），最多取 **9 字节**（超出就截断）。

`a5` 是 `iv`（必须 `bytes`），最多取 **9 字节**（超出就截断）。

`a3` 是 `mode`（外层传的是 `1`，这里保存到 `v48`）。

接着程序按 9 字节对齐做填充

```c
pad = (9 - (L % 9)) % 9;   // v14
buf = malloc(L + pad)
memcpy(buf, message, L)
if (pad > 0) memset(buf+L, (unsigned char)pad, pad);  // PKCS7 风格的值填充
```

块大小是 9，不是 16；用“PKCS#7 语义”的填充值（填充字节值 = 填充长度）。

这里题目要求 `len(flag) == 45`，而 `45 % 9 == 0`，所以这里 **pad=0**，不会真正加填充。

然后是导入 `key/iv`（各截到 9 字节）到局部缓冲

```c
// v52（8字节） + v53（1字节） 组成 9 字节 key
memcpy(&v52, key, min(len(key), 9))
// Src 指向另一个 9 字节区域作为 iv
memcpy(&Src, iv, min(len(iv), 9))
```

做“密钥调度/状态初始化”

```
sub_1800050E0(v49, &v52, &Src, mode);
```

`v49` 是一块 **432 字节** 的工作区（`char v49[432]`），明显是“轮密钥/查表/常量状态”的缓存。

它把 `key(≤9)`、`iv(≤9)`、`mode(=1)` 混进去，初始化这块工作状态。



然后是数据处理，就地加密

```
sub_1800052A0(v49, buf, (unsigned)L);
```

用第 4 步的状态 `v49`，就地处理 `buf` 里的前 `L` 个字节（注意传的是原始 `L`，不是 `L+pad`）。

根据你这题 `L=45`、`pad=0`，所以等价于“对 45 字节就地加密”。

最后返回 `Python bytes`

```
PyBytes_FromStringAndSize(buf, L + pad);
```

返回的长度是 `L + pad`。你这题 pad=0，所以返回 45 字节密文（与你拿到的 `target_hex` 长度吻合）。

最后 `free(buf)`（在成功路径上，`PyBytes_FromStringAndSize` 会复制数据，所以可以释放临时缓冲）。



也就是说这个函数就是一个以 `9` 字节为块、有 `key≤9 / iv≤9`、带 `mode` 的自定义分组加密。
 先 `KeySchedule`（`sub_1800050E0`），再对`payload`做就地变换（`sub_1800052A0`），并用`9` 字节 `PKCS7` 样式填充



这里应该要继续跟进函数`sub_1800050E0`和`sub_1800052A0`的



但是这里发现 `luo_shu.encrypt` 只能做加密预言机

从 `sub_180001510` 可以看出是分组处理，块长 9 字节（明文 45=9×5，恰好无填充）。真实变换在：

- `sub_1800050E0(ctx, key9, iv9, mode)`：把 9 字节 key/iv 和 mode 做进一个 432B 的状态（轮密钥/置换表/旋转量等）。
- `sub_1800052A0(ctx, buf, L)`：就地处理 `buf[0..L-1]`。

这类自定义分组算法（九宫/位旋/加减/XOR/轮替）通常是按顺序、按轮推进的：第 i 步（或第几轮内的第 i 位置）产出的某些输出位，只依赖当前“已处理前缀”的输入，不会被“未来的后缀”改变。这种“只受前缀影响”的性质就是我反复强调的因果性。
这里测试了一下也印证了：`E(全零)` 与 `target` 的差能露出前缀 `flag{7H3_...}` —— 说明前几位输出已经完全由前缀决定，后缀再怎么改也不影响它们。

![image-20251101164207992](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081301763.png)

测试脚本

```python
import luo_shu

TARGET_HEX = "490e0ad0374f2cdd126e5b184bf4e6da669a4cbea88fac916494edd90149809a7c92eec2e82ed3fca5812d9f69"
ct = bytes.fromhex(TARGET_HEX)
assert len(ct) == 45

MODE = 1
KEY  = b"LESCBCKEY"   
IV   = b"LESCBC_iv"   

def enc(msg: bytes) -> bytes:
    return luo_shu.encrypt(msg, MODE, KEY, IV)

N = 45
base = bytes(N)               
c_base = enc(base)

pos_map = [-1]*N
affected_indices = [None]*N

for i in range(N):
    m = bytearray(base)
    m[i] = 1                  
    c = enc(bytes(m))
    diff_pos = [k for k in range(N) if c[k] != c_base[k]]
    if len(diff_pos) == 1:
        pos_map[i] = diff_pos[0]
        affected_indices[i] = diff_pos
    else:
        affected_indices[i] = diff_pos

single_maps = sum(1 for x in pos_map if x != -1)
print(f"[+] single-position mappings learned: {single_maps}/45")

def prefer_j(i, candidates):
    if not candidates:
        return None
    if len(candidates) == 1:
        return candidates[0]
    blk = i // 5
    blk_cands = [j for j in candidates if j//5 == blk]
    return blk_cands[0] if blk_cands else candidates[0]

inv_tables = [None]*N
final_pos = [None]*N

for i in range(N):
    if pos_map[i] == -1:
        j = prefer_j(i, affected_indices[i])
    else:
        j = pos_map[i]
    if j is None:
        raise RuntimeError(f"Cannot determine affected output pos for input {i}")
    final_pos[i] = j

    Ti = [0]*256
    for x in range(256):
        m = bytearray(base)
        m[i] = x
        c = enc(bytes(m))
        Ti[x] = c[j]
        
    inv = [-1]*256
    for x, y in enumerate(Ti):
        inv[y] = x

    if any(v == -1 for v in inv):
        raise RuntimeError(f"Non-bijective mapping at position {i}")
    inv_tables[i] = inv

pt = bytearray(N)
for i in range(N):
    j = final_pos[i]
    inv = inv_tables[i]
    pt[i] = inv[ct[j]]

try:
    s = pt.decode('utf-8')
    print("[+] recovered plaintext (utf-8):", s)
except:
    print("[+] recovered plaintext (raw):", pt)

c_check = enc(bytes(pt))
print("[+] re-encrypt matches ciphertext?", c_check == ct)
```



这里就可以用一个前缀约束增量求解方案，用采样学出“哪些输出位只受当前前缀影响”，再用这些“稳定输出位”去筛选每一位的 0..255 候选，逐字节把明文推出来。

思路是用一种黑盒技巧

对第 `i` 个明文字节：

把前缀固定，假设前 `i-1` 个已经求出来

随机扰动后缀（`i+1..N-1`）很多次，观察输出每个位置是否保持不变；不变的位置说明只依赖当前前缀（与后缀无关），称为该步的稳定位集合 `S_i`；

用候选 `x∈[0..255]` 试第 `i` 字节：把消息设为“已知前缀 + x + 全零后缀”，加密后只比较 `S_i` 这些位置是否等于目标密文对应位置。满足就锁定 `x`，进入下一位；

重复直到 45 字节都确定。

这里可行完全是因为`sub_180001510` 的 ctx 只取决于 `(key≤9, iv≤9, mode)`，这个题目里三个都是固定的，所以：`E(·)` 对同一输入**完全确定**，采样能稳定地区分“受后缀影响/不影响”的位，用上面的筛选，可以逐位锁定 `P[i]` 后，最终拼出的 `P` 会满足 `E(P)==C`

```python
import os, random
import luo_shu

TARGET_HEX = "490e0ad0374f2cdd126e5b184bf4e6da669a4cbea88fac916494edd90149809a7c92eec2e82ed3fca5812d9f69"
C = bytes.fromhex(TARGET_HEX)
N = len(C)  

MODE = 1
KEY  = b"LESCBCKEY"
IV   = b"LESCBC_iv"

def E(msg: bytes) -> bytes:
    return luo_shu.encrypt(msg, MODE, KEY, IV)

def stability_mask(prefix: bytes, pos: int, samples=120):
    base = prefix + bytes([0]) + bytes(N - pos - 1)
    ref = E(base)
    stable = [True]*N
    for _ in range(samples):
        suffix = os.urandom(N - pos - 1)
        test = prefix + bytes([0]) + suffix
        out = E(test)
        for j in range(N):
            if stable[j] and out[j] != ref[j]:
                stable[j] = False
    return [j for j in range(N) if stable[j]]

def solve():
    P = bytearray(N)
    prefix = b""
    for i in range(N):
        S = stability_mask(prefix, i, samples=160)
        if not S:
            S = stability_mask(prefix, i, samples=320)
            if not S:
                raise RuntimeError(f"No stable outputs at pos {i}, try increasing samples.")

        trial_space = list(range(32,127)) + list(range(0,32)) + list(range(127,256))
        found = None
        for x in trial_space:
            cand = prefix + bytes([x]) + bytes(N - i - 1)
            out = E(cand)
            ok = True
            for j in S:
                if out[j] != C[j]:
                    ok = False
                    break
            if ok:
                found = x
                P[i] = x
                prefix = bytes(P[:i+1])
                print(f"[{i:02d}] {prefix.decode('utf-8', errors='ignore')}")
                break
        if found is None:
            raise RuntimeError(f"Failed at pos {i}. Stable set size={len(S)}")
    return bytes(P)

if __name__ == "__main__":
    P = solve()
    assert E(P) == C
    print("\n[OK] plaintext:", P.decode('utf-8'))
```



![image-20251027170324676](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081301703.png)



##### flag

```
flag{7H3_Lu0_5hu_3nCrYP710n_1s_b10Ck_C1ph3R!}
```







### AnEasySystem

##### 解题过程

题目给了一个`hap`文件，搜索了解到这是一个鸿蒙的软件，和`apk`是一样的，可以直接解压

用`bandzip`打开可以直接解压

解压后的文件

在网上了解到`ets/`文件夹下是`HarmonyOS（ArkTS/TS/JS）`代码会被编译成 **ABC 字节码** ，是程序的关键逻辑

用`jadx-dev-all`工具可以反编译`.abc`文件

![image-20251101165243880](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081301332.png)

输入的 **flag** 和一个 6 位数字 **key** 喂给原生函数 `modifiedAESEncrypt`，得到的密文要与 `targetCipher`（160 个十六进制字符，80 字节）一致。
 ArkTS 侧对 key 的处理是：

- `SHA256(key)` → 32 字节
- **前 16 字节** 作为 **AES key**，**后 16 字节** 作为 **IV**



需要解密就需要把 `libentry.so` 里的 `modifiedAESEncrypt` 还原，但是这里也是只给了armv8a架构的so文件

用`Ghidra`尝试反编译

![image-20251101165644503](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081301176.png)

其实就是 `AES-128-CBC + PKCS7` 填充 + 小写十六进制输出

`aes_cbc_encrypt`：

`KeyExpansion` → 只用 `128-bit key`（对应 `SHA256(pin)` 的前 16 字节）。

`pkcs7_pad` → 明文按 16 字节块 **PKCS7** 填充。

CBC 流程明确：`xor_block(PT_i, IV)` → `AES128_EncryptBlock` → 输出 `CT_i`，并把 `IV = CT_i`。

整段完成后把密文传给…

`bytesToHex`：设置了 `hex` + 宽度 2 + 填充字符 `'0'`，逐字节转为两位小写十六进制串。

这与 ArkTS 侧完全对齐：
 `processPassword(pin)` = `SHA256(pin)` → `key = digest[:16]`，`iv = digest[16:32]`；
 `modifiedAESEncrypt(plain, key, iv)` = AES-128-CBC(plain, key, iv) → hex 字符串；
 再与常量 `targetCipher` 比对。



总结这个程序的整体流程：

页面里有两个输入框：`flag`（任意文本）和 `key`（6 位数字）。点击“Check”后，会把两者送去加密并与内置的目标密文做全量字符串比较。目标密文是这串 160 个十六进制字符（80 字节）：

```
b250062307bbe0216de2fe549c9a768ff67e1063c1e1dfb38265ded7610603514c3e3951c392f403cce40b5be0adf5c03cd1a8d035892c1b1b5f3579127a45e843d99b87b45d292fff75cb2332f1b59c
```

密钥与 IV 的派生（KDF），`processPassword` 用 HarmonyOS 的 `cryptoFramework.createMd("SHA256")` 对6 位数字 key 的 UTF-8 字节做 SHA-256，取 `digest` 前 16 字节作为 AES 密钥，后 16 字节作为 IV。也就是：`key = sha256(pass)[:16]`，`iv = sha256(pass)[16:32]`。

调用 native 加密

`ArkTS` 里调用的是 `nativeCrypto.modifiedAESEncrypt(plaintext, key, iv)`，把 `flag`作为明文传进去。

`so` 里的“`modifiedAESEncrypt`”实际做

反编译出的实现是 `AES-128-CBC + PKCS#7` 填充这里是自行实现的 AES。

`aes_cbc_encrypt`：检查 key/iv 长度都是 16；先 `KeyExpansion`；对明文做 `pkcs7_pad`；每块做 `prev = IV/cipher[-1]` 的异或后调用 `AES128_EncryptBlock`；循环更新“上一块 = 当前密文”。这是标准 CBC。

`pkcs7_pad`：典型 PKCS#7。

`AES128_EncryptBlock`：常规 10 轮（SubBytes/ShiftRows/MixColumns + AddRoundKey，最后一轮无 MixColumns）。

最后把密文字节转十六进制字符串（`bytesToHex`）。



因为题目是一个双输入校验程序（输入 `flag` 与 6 位数字 `key`），其验证方式是利用一个自定义加密算法生成密文与题目内置密文比对。通过反编译 .abc 与 so 文件可知，加密流程为：先对 6 位数字密码做 SHA-256，前 16 字节作为 AES 密钥、后 16 字节作为 IV；再使用自定义的 AES-128-CBC（其中 `ShiftRows` 被改写、同时混入常量异或与字节加法）对明文加密，最后输出十六进制密文。

因此标准 AES 解密无法得到正确结果。解题思路是实现与 so 中一致的“改造版 AES 解密算法”，然后对所有 000000–999999 的数字密码进行穷举。对每个候选 key，按相同 KDF 派生 key/IV，用改造版 AES-CBC 解密目标密文、去除 PKCS#7 填充，并检测明文是否符合 `flag{...}` 格式。一旦匹配成功，即可确定该密码与正确的 flag。

利用加密的对称性和有限的 key 空间，`key/iv` 全由 6 位数字决定，空间很小，CBC 解密后若是随机串，绝大多数不会是“完整的可打印文本 + 合法 PKCS#7”，而真正的 flag 一定是可读的、还有明显格式特征，易精准命中；



##### exp

```python
import argparse
import hashlib
import sys
import time
from multiprocessing import Process, Event, Value, Lock, Queue, cpu_count

TARGET_HEX = "b250062307bbe0216de2fe549c9a768ff67e1063c1e1dfb38265ded7610603514c3e3951c392f403cce40b5be0adf5c03cd1a8d035892c1b1b5f3579127a45e843d99b87b45d292fff75cb2332f1b59c"

SBOX = [
  0x63,0x7c,0x77,0x7b,0xf2,0x6b,0x6f,0xc5,0x30,0x01,0x67,0x2b,0xfe,0xd7,0xab,0x76,
  0xca,0x82,0xc9,0x7d,0xfa,0x59,0x47,0xf0,0xad,0xd4,0xa2,0xaf,0x9c,0xa4,0x72,0xc0,
  0xb7,0xfd,0x93,0x26,0x36,0x3f,0xf7,0xcc,0x34,0xa5,0xe5,0xf1,0x71,0xd8,0x31,0x15,
  0x04,0xc7,0x23,0xc3,0x18,0x96,0x05,0x9a,0x07,0x12,0x80,0xe2,0xeb,0x27,0xb2,0x75,
  0x09,0x83,0x2c,0x1a,0x1b,0x6e,0x5a,0xa0,0x52,0x3b,0xd6,0xb3,0x29,0xe3,0x2f,0x84,
  0x53,0xd1,0x00,0xed,0x20,0xfc,0xb1,0x5b,0x6a,0xcb,0xbe,0x39,0x4a,0x4c,0x58,0xcf,
  0xd0,0xef,0xaa,0xfb,0x43,0x4d,0x33,0x85,0x45,0xf9,0x02,0x7f,0x50,0x3c,0x9f,0xa8,
  0x51,0xa3,0x40,0x8f,0x92,0x9d,0x38,0xf5,0xbc,0xb6,0xda,0x21,0x10,0xff,0xf3,0xd2,
  0xcd,0x0c,0x13,0xec,0x5f,0x97,0x44,0x17,0xc4,0xa7,0x7e,0x3d,0x64,0x5d,0x19,0x73,
  0x60,0x81,0x4f,0xdc,0x22,0x2a,0x90,0x88,0x46,0xee,0xb8,0x14,0xde,0x5e,0x0b,0xdb,
  0xe0,0x32,0x3a,0x0a,0x49,0x06,0x24,0x5c,0xc2,0xd3,0xac,0x62,0x91,0x95,0xe4,0x79,
  0xe7,0xc8,0x37,0x6d,0x8d,0xd5,0x4e,0xa9,0x6c,0x56,0xf4,0xea,0x65,0x7a,0xae,0x08,
  0xba,0x78,0x25,0x2e,0x1c,0xa6,0xb4,0xc6,0xe8,0xdd,0x74,0x1f,0x4b,0xbd,0x8b,0x8a,
  0x70,0x3e,0xb5,0x66,0x48,0x03,0xf6,0x0e,0x61,0x35,0x57,0xb9,0x86,0xc1,0x1d,0x9e,
  0xe1,0xf8,0x98,0x11,0x69,0xd9,0x8e,0x94,0x9b,0x1e,0x87,0xe9,0xce,0x55,0x28,0xdf,
  0x8c,0xa1,0x89,0x0d,0xbf,0xe6,0x42,0x68,0x41,0x99,0x2d,0x0f,0xb0,0x54,0xbb,0x16,
]
INV_SBOX = [0]*256
for i,v in enumerate(SBOX):
    INV_SBOX[v] = i

RCON = [0x00,0x01,0x02,0x04,0x08,0x10,0x20,0x40,0x80,0x1B,0x36]

def xtime(a):
    a <<= 1
    if a & 0x100:
        a ^= 0x11B
    return a & 0xFF

def gf_mul(a, b):
    res = 0
    x = a
    y = b
    while y:
        if y & 1:
            res ^= x
        x = xtime(x)
        y >>= 1
    return res & 0xFF

M2  = [xtime(i) for i in range(256)]
M3  = [M2[i] ^ i for i in range(256)]
M9  = [gf_mul(i,9)  for i in range(256)]
M11 = [gf_mul(i,11) for i in range(256)]
M13 = [gf_mul(i,13) for i in range(256)]
M14 = [gf_mul(i,14) for i in range(256)]

C0 = 0x43c33700000000B7
C1 = 0x00000000000D00D4

def be_pack8(b7,b6,b5,b4,b3,b2,b1,b0):
    return ((b7&0xFF)<<56)|((b6&0xFF)<<48)|((b5&0xFF)<<40)|((b4&0xFF)<<32)|((b3&0xFF)<<24)|((b2&0xFF)<<16)|((b1&0xFF)<<8)|(b0&0xFF)

def le_bytes_from_u64(x):
    return [(x >> (8*i)) & 0xFF for i in range(8)]

def u64_from_le_bytes(bs8):
    x = 0
    for i, b in enumerate(bs8):
        x |= (b & 0xFF) << (8*i)
    return x

def shiftrows_mod(state):
    v0 = be_pack8(
        state[3], state[0xE], state[9],
        (state[4]+0x46)&0xFF, (state[0xF]+0x4E)&0xFF, (state[10]+0x5B)&0xFF,
        (state[5]+0x1D)&0xFF, state[0]
    ) ^ C0
    v1 = be_pack8(
        (state[0xB]+0x7D)&0xFF, (state[6]+0x95)&0xFF, (state[1]+0xF9)&0xFF,
        (state[0xC]+0xD7)&0xFF, (state[7]+0x24)&0xFF, state[2],
        (state[0xD]+0x8F)&0xFF, state[8]
    ) ^ C1
    b0 = le_bytes_from_u64(v0)
    b1 = le_bytes_from_u64(v1)
    for i in range(8):
        state[i]   = b0[i]
        state[8+i] = b1[i]

def inv_shiftrows_mod(state):
    v0 = u64_from_le_bytes(state[0:8])   ^ C0
    v1 = u64_from_le_bytes(state[8:16])  ^ C1
    b0 = [ (v0 >> (8*(7-i))) & 0xFF for i in range(8) ]  # b7..b0
    b1 = [ (v1 >> (8*(7-i))) & 0xFF for i in range(8) ]
    orig = [0]*16
    orig[3]   = b0[0]
    orig[0xE] = b0[1]
    orig[9]   = b0[2]
    orig[4]   = (b0[3]-0x46)&0xFF
    orig[0xF] = (b0[4]-0x4E)&0xFF
    orig[10]  = (b0[5]-0x5B)&0xFF
    orig[5]   = (b0[6]-0x1D)&0xFF
    orig[0]   = b0[7]
    orig[0xB] = (b1[0]-0x7D)&0xFF
    orig[6]   = (b1[1]-0x95)&0xFF
    orig[1]   = (b1[2]-0xF9)&0xFF
    orig[0xC] = (b1[3]-0xD7)&0xFF
    orig[7]   = (b1[4]-0x24)&0xFF
    orig[2]   = b1[5]
    orig[0xD] = (b1[6]-0x8F)&0xFF
    orig[8]   = b1[7]
    for i in range(16):
        state[i] = orig[i] & 0xFF

def sub_bytes(state):
    for i in range(16):
        state[i] = SBOX[state[i]]

def inv_sub_bytes(state):
    for i in range(16):
        state[i] = INV_SBOX[state[i]]

def mix_columns(state):
    for c in range(4):
        i = 4*c
        a0,a1,a2,a3 = state[i:i+4]
        state[i+0] = (M2[a0]^M3[a1]^a2^a3)&0xFF
        state[i+1] = (a0^M2[a1]^M3[a2]^a3)&0xFF
        state[i+2] = (a0^a1^M2[a2]^M3[a3])&0xFF
        state[i+3] = (M3[a0]^a1^a2^M2[a3])&0xFF

def inv_mix_columns(state):
    for c in range(4):
        i = 4*c
        a0,a1,a2,a3 = state[i:i+4]
        state[i+0] = (M14[a0]^M11[a1]^M13[a2]^M9[a3])&0xFF
        state[i+1] = (M9[a0]^M14[a1]^M11[a2]^M13[a3])&0xFF
        state[i+2] = (M13[a0]^M9[a1]^M14[a2]^M11[a3])&0xFF
        state[i+3] = (M11[a0]^M13[a1]^M9[a2]^M14[a3])&0xFF

def add_round_key(state, rk):
    for i in range(16):
        state[i] ^= rk[i]

def rot_word(w): return ((w<<8)|(w>>24)) & 0xFFFFFFFF
def sub_word(w):
    return ((SBOX[(w>>24)&0xFF]<<24)|(SBOX[(w>>16)&0xFF]<<16)|(SBOX[(w>>8)&0xFF]<<8)|SBOX[w&0xFF])

def expand_key_128(key16):
    w = [0]*44
    for i in range(4):
        w[i] = (key16[4*i]<<24)|(key16[4*i+1]<<16)|(key16[4*i+2]<<8)|key16[4*i+3]
    for i in range(4,44):
        t = w[i-1]
        if i%4==0:
            t = sub_word(rot_word(t)) ^ (RCON[i//4]<<24)
        w[i] = w[i-4] ^ t
    rks = []
    for r in range(11):
        rk=[]
        for j in range(4):
            word = w[4*r+j]
            rk += [(word>>24)&0xFF,(word>>16)&0xFF,(word>>8)&0xFF,word&0xFF]
        rks.append(rk)
    return rks

def decrypt_block_mod(c16, rks):
    s = list(c16)
    add_round_key(s, rks[10])
    for r in range(9,0,-1):
        inv_shiftrows_mod(s)
        inv_sub_bytes(s)
        add_round_key(s, rks[r])
        inv_mix_columns(s)
    inv_shiftrows_mod(s)
    inv_sub_bytes(s)
    add_round_key(s, rks[0])
    return bytes(s)

def cbc_decrypt_mod(ct, key16, iv16):
    rk = expand_key_128(list(key16))
    out = bytearray()
    prev = iv16
    for i in range(0, len(ct), 16):
        dec = decrypt_block_mod(ct[i:i+16], rk)
        out += bytes([dec[j]^prev[j] for j in range(16)])
        prev = ct[i:i+16]
    return bytes(out)

def pkcs7_unpad(b):
    if not b: return None
    pad = b[-1]
    if pad<1 or pad>16: return None
    if b[-pad:] != bytes([pad])*pad: return None
    return b[:-pad]

def looks_like_flag(b):
    return b.startswith(b"flag{") and b.endswith(b"}") and all(32<=x<127 for x in b[5:-1])

def kdf(pass6):
    d = hashlib.sha256(pass6.encode()).digest()
    return d[:16], d[16:32]

def fmt_dur(t):
    t = max(0, int(t)); m,s = divmod(t,60); h,m = divmod(m,60)
    return f"{h:d}:{m:02d}:{s:02d}" if h else f"{m:02d}:{s:02d}"

def print_prog(done,total,t0):
    el = max(1e-9, time.time()-t0)
    sp = done/el; pct = done/total*100
    bar = "█"*int(pct/100*30) + "░"* (30-int(pct/100*30))
    eta = (total-done)/sp if sp>0 else 0
    sys.stdout.write(f"\r{pct:6.2f}% |{bar}| {done:,}/{total:,} | {sp:8.0f}/s | ETA {fmt_dur(eta)}")
    sys.stdout.flush()

def worker(ct, a, b, stop, hitq, done, lk, step=2000):
    local=0
    for i in range(a,b):
        if stop.is_set(): break
        p = f"{i:06d}"
        k,iv = kdf(p)
        pt = cbc_decrypt_mod(ct, k, iv)
        u  = pkcs7_unpad(pt)
        if u is not None and looks_like_flag(u):
            hitq.put((p, u.decode('utf-8','ignore')))
            stop.set()
            break
        local+=1
        if local>=step:
            with lk:
                done.value += local
            local=0
    if local:
        with lk:
            done.value += local

def split_rng(s,e,n):
    tot=e-s; base=tot//n; r=tot% n; cur=s; out=[]
    for i in range(n):
        step=base+(1 if i<r else 0)
        out.append((cur,cur+step)); cur+=step
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--target", default=TARGET_HEX)
    ap.add_argument("--start", type=int, default=0)
    ap.add_argument("--end", type=int, default=1_000_000)
    ap.add_argument("--procs", type=int, default=max(1, cpu_count() or 1))
    ap.add_argument("--refresh-sec", type=float, default=0.2)
    ap.add_argument("--accum-step", type=int, default=2000)
    args = ap.parse_args()

    ct = bytes.fromhex(args.target.strip())
    total = args.end-args.start
    rngs = split_rng(args.start, args.end, max(1,args.procs))

    stop = Event(); hitq = Queue(); lk = Lock(); done = Value('Q',0)
    procs=[]
    for a,b in rngs:
        p=Process(target=worker, args=(ct,a,b,stop,hitq,done,lk,args.accum_step)); p.start(); procs.append(p)

    t0=time.time(); hit=None
    try:
        while True:
            try:
                hit = hitq.get(timeout=args.refresh_sec)
                break
            except Exception:
                pass
            print_prog(done.value,total,t0)
            if done.value>=total or not any(p.is_alive() for p in procs):
                break
    finally:
        stop.set()
        for p in procs: p.join(timeout=1.0)
    print()
    if hit:
        k,f=hit
        print("[HIT] pass =", k)
        print("[FLAG]", f)
        sys.exit(0)
    else:
        print("[*] 未找到。")
        sys.exit(1)

if __name__=="__main__":
    main()
```




![image-20251027220916289](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081301065.png)



##### flag

```
flag{r3v3Rs1Ng_7h3_H4rm0nY_05_1s_n07_4S_d1Ff1cUl7_45_y0U_7h1nK!}
```





### Jvav Master

##### 解题过程

题目给了一个`jre`和一个`exe`文件

用`ida`反编译`exe`文件

![image-20251101172120501](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081301389.png)

 `WinMain`函数可以确定这基本就是 **install4j** 的启动器壳（wrapper），真正的业务逻辑在 **Java/JAR** 里，不在这个 `exe` 里。

 `__i4j_reboot`、`__i4j_lang_restart`、`-J-splash:none`、`-console`、以及那句 *“This executable was created with an evaluation version of …”* 都是 install4j 的典型特征。
所以这里应该是把内置/临时解压的 JAR 找出来

这里在网上看到一种JVM 自报家门法

```
your.exe -c -J-verbose:class
```

控制台会打印 “from jar:file:/C:/Users/.../AppData/Local/Temp/i4j_XXXX/xxx.jar”——路径。

![image-20251101172625938](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081301247.png)

把“真身”暴露出来了：

```
[Loaded Main from file:/D:/vpn/Temp/e4jFCF3.tmp_dir1761631383/jvav.jar]
```

也就是说这是 **exe4j** 外壳，真正的题目代码在 `D:\vpn\Temp\e4jFCF3.tmp_dir1761631383\jvav.jar` 里

此时程序正好在运行，我们到对应目录下就可以看到对应的文件

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081302245.png)

拷贝出来后用`jadx`打开分析

![image-20251028141034566](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081302154.png)



先输入 22 字节 `key`，用 `KeyChecker.checkKey` 校验。

再输入 `flag`，用自定义 RC4（其实是 RC4 的“像素移位版”）加密成 48 字节密文。

把这 48 字节密文丢给 `FlagChecker.Checker` 的“字节码虚拟机”跑一串变换和等值校验，全部校验通过则输出 “right flag!”

![image-20251101172953870](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081302676.png)

`KeyChecker` 的条件是（对每个 i=0..21）：
![image-20251101172909985](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081302998.png)
 其中 `MASK` 是 `"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"` 的字节（我们只用到前 22 个)，`TARGET` 就是看到的那串常量

 这个是标准的“上三角”结构，可以从 i=21 往回递推，每次只剩一个未知数可以直接求出。



![image-20251101173030001](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081302360.png)



`RC4.encrypt` 有两处改动：

S 盒初始：`box[i] = (255 - i) ^ 131`

PRGA：`x2 = (x2 + 3) % 256;  y = (y - box[x2]) & 255;  swap(box[x2], box[y]);  index = (box[x2] ^ box[y]) % 256;`

输出字节：`out[i] = (plain[i] + box[index]) ^ 119`（注意是加上 keystream 再 XOR 119）

因此解密时对密文字节 `E[i]` 有：

```
plain[i] = ((E[i] ^ 119) - box[index]) & 0xFF
```



![image-20251101173056045](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081302361.png)

`random(i)` 是个确定性 32 位扰动函数，`getInstruction(random(i))` 在一个巨大的 `switch` 里查表，得到三元组 `(op, idx, param)`。

可执行指令：
 `1`=加，`2`=减，`3`=异或，`4`=左循环位移(rol)，`5`=右循环位移(ror)，`204`=断言检查（`data[idx] == param` 则标记通过，否则置为 -1）。
 `-1` 是终止标记。

这个 VM 只对同一 `idx` 的字节做局部变换；遇到 `204` 时检查当前值是否等于给定 `param`。因此我们可以对每个 `idx` 收集“自开始以来对它施加的指令序列”，在 `204` 处把 `param` 逆着这些可逆操作一步步还原，直接得到**初始密文字节** `E[idx]`。





将以上逻辑全部用 Python 复刻一遍（包括 Java 的 32 位位运算细节、PRNG 与整张 `switch` 表、字节旋转、以及 RC4 变体），先解出 key，再从 VM 的断言推出 48 个密文字节，最后逆 RC4 得到明文 flag。

##### exp

```python
MASK = list(b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
TARGET = [107655, 99322, 95708, 87877, 85730, 80988, 72416, 76077, 74252, 70300,
          68724, 68020, 63439, 53540, 51340, 42431, 37382, 28611, 25737, 18364, 9711, 9030]

MASK32 = 0xFFFFFFFF

def to_uint32(x): return x & MASK32
def to_int32(x):
    x &= MASK32
    return x - (1<<32) if (x & (1<<31)) else x

def recover_key():
    key = [0]*22
    for i in reversed(range(22)):
        mask_i = MASK[i]
        sum_known = 0
        for j in range(i+1, 22):
            xor = (key[j] ^ mask_i) & 0xFF
            sum_known += xor * MASK[j]
        value = TARGET[i] - sum_known
        if MASK[i] == 0:
            raise ValueError("zero mask")
        if value % MASK[i] != 0:
            raise ValueError(f"non-integer division at i={i}, value={value}, mask_i={MASK[i]}")
        xor_val = (value // MASK[i]) & 0xFF
        key_i = (xor_val ^ MASK[i]) & 0xFF
        key[i] = key_i
    return bytes(key)

def random_java(seed: int) -> int:
    s = to_int32(seed)
    part1 = to_uint32((s << 19) & MASK32) & to_uint32(to_int32(-119793247) & MASK32)
    x = to_int32(s ^ part1)
    part2 = (to_uint32(x) >> 1) | 469912079
    x2 = to_int32(x ^ part2)
    part3 = to_uint32((x2 << 9) & MASK32) ^ 663526098
    x3 = to_int32(x2 ^ part3)
    part4 = (to_uint32(x3) >> 8) & to_uint32(to_int32(-886859118) & MASK32)
    x4 = to_int32(x3 ^ part4)
    part5 = to_uint32((x4 << 10) & MASK32) | 846897082
    out = to_int32(to_int32(x4 ^ part5) ^ 592136849)
    return out

def rol8(b: int, shift: int) -> int:
    shift &= 7
    return ((b << shift) | (b >> (8-shift))) & 0xFF

def ror8(b: int, shift: int) -> int:
    shift &= 7
    return ((b >> shift) | (b << (8-shift))) & 0xFF


instr_map = {
    -2105780347: (4,23,5),
    -2105778303: (5,12,4),
    -2097301675: (1,41,-76),
    -2097299631: (2,33,121),
    -2088921243: (1,32,47),
    -2088919199: (5,8,6),
    -2080606283: (2,3,-97),
    -2080604239: (-52,41,53),
    -2038638651: (-52,7,-128),
    -2038636607: (5,8,5),
    -2030225643: (-52,37,4),
    -2030223599: (3,9,82),
    -2021845211: (4,36,2),
    -2021843167: (-52,46,51),
    -1703914110: (2,0,27),
    -1703912058: (3,17,103),
    -1695435438: (3,24,-97),
    -1695433386: (4,21,5),
    -1687055006: (4,5,7),
    -1687052954: (5,12,3),
    -1678740046: (3,41,-99),
    -1678737994: (1,29,-116),
    -1636772414: (-52,30,-7),
    -1636770362: (2,7,30),
    -1628359406: (4,1,1),
    -1628357354: (2,37,-117),
    -1619978974: (2,46,-103),
    -1619976922: (4,40,1),
    -1435971188: (5,19,4),
    -1435969144: (1,22,-84),
    -1427558052: (5,19,4),
    -1427556008: (3,13,-68),
    -1419177620: (2,41,-123),
    -1419175576: (1,46,39),
    -1410797124: (5,42,7),
    -1410795080: (2,15,-45),
    -1368895028: (2,27,-57),
    -1368892984: (2,38,-19),
    -1360416484: (4,39,5),
    -1360414440: (-52,4,12),
    -1352036052: (4,4,5),
    -1352034008: (-52,21,20),
    -1343720964: (3,25,-25),
    -1343718920: (4,15,2),
    -1302015093: (3,22,84),
    -1302013041: (3,13,-95),
    -1293601957: (2,12,27),
    -1293599905: (5,14,4),
    -1285221525: (3,5,124),
    -1285219473: (5,0,5),
    -1276841029: (2,28,16),
    -1276838977: (-52,42,58),
    -1234938933: (-52,38,93),
    -1234936881: (-52,27,-27),
    -1226460389: (5,7,6),
    -1226458337: (4,20,4),
    -1218079957: (5,32,4),
    -1218077905: (4,6,3),
    -1209764869: (-52,15,-119),
    -1209762817: (-52,25,-97),
    -1038342243: (5,20,6),
    -1038340199: (-52,17,49),
    -1029847219: (3,36,114),
    -1029845175: (5,40,4),
    -1021450371: (1,11,109),
    -1021448327: (3,27,-88),
    -1013184595: (3,39,-54),
    -1013182551: (2,35,74),
    -971200547: (-52,9,81),
    -971198503: (-52,31,58),
    -962771187: (3,33,126),
    -962769143: (2,34,-84),
    -954374339: (2,34,-59),
    -954372295: (4,36,7),
    -636476006: (3,17,-25),
    -636473954: (4,6,5),
    -627980982: (3,42,93),
    -627978930: (1,10,38),
    -619584134: (5,7,4),
    -619582082: (5,32,2),
    -611318358: (3,27,118),
    -611316306: (4,5,7),
    -569334310: (2,31,83),
    -569332258: (5,9,3),
    -560904950: (-52,3,89),
    -560902898: (1,25,79),
    -552508102: (4,44,6),
    -552506050: (-52,10,-95),
    -368533100: (2,2,-77),
    -368531056: (2,22,-96),
    -360103612: (5,2,5),
    -360101568: (5,34,2),
    -351706764: (5,43,1),
    -351704720: (3,35,4),
    -343375452: (5,47,6),
    -343373408: (1,6,12),
    -301456940: (5,18,7),
    -301454896: (-52,23,-51),
    -292962044: (-52,36,-106),
    -292960000: (5,33,7),
    -284565196: (-52,35,-37),
    -284563152: (4,28,2),
    -276299292: (2,45,88),
    -276297248: (1,0,54),
    -234577005: (1,15,-64),
    -234574953: (4,35,5),
    -226147517: (2,4,-58),
    -226145465: (2,4,-51),
    -217750669: (4,35,5),
    -217748617: (5,26,5),
    -209419357: (5,8,4),
    -209417305: (1,15,-75),
    -167500845: (1,9,-109),
    -167498793: (-52,18,-41),
    -159005949: (4,23,5),
    -159003897: (5,16,2),
    -150609101: (4,26,5),
    -150607049: (5,31,2),
    -142343197: (-52,0,59),
    -142341145: (-52,45,120),
    37533589: (-52,2,-31),
    37535633: (5,21,5),
    45963077: (5,12,3),
    45965121: (4,36,2),
    54359925: (3,17,-127),
    54361969: (3,46,26),
    62691237: (1,37,-21),
    62693281: (3,9,112),
    104609749: (1,23,127),
    104611793: (-52,14,-90),
    113104645: (1,29,96),
    113106689: (-52,40,-108),
    121501493: (-52,5,92),
    121503537: (4,25,7),
    129767397: (-52,43,68),
    129769441: (-52,1,98),
    439399826: (3,38,94),
    439401878: (3,2,-43),
    447829314: (2,42,-35),
    447831366: (1,28,54),
    456226162: (1,25,-27),
    456228214: (1,24,74),
    464557474: (5,33,7),
    464559526: (1,30,15),
    506475986: (1,14,-47),
    506478038: (5,38,7),
    514970882: (4,40,4),
    514972934: (-52,16,51),
    523367730: (-52,26,75),
    523369782: (1,5,-12),
    531633634: (3,1,33),
    531635686: (5,43,1),
    707277212: (-52,12,-17),
    707279256: (2,16,88),
    715772236: (5,44,1),
    715774280: (2,45,-100),
    724169084: (4,39,5),
    724171128: (2,16,34),
    732434860: (3,24,-110),
    732436904: (5,31,7),
    774418908: (5,8,4),
    774420952: (4,22,2),
    782848268: (5,47,6),
    782850312: (-52,33,57),
    791245116: (3,45,118),
    791247160: (3,44,32),
    841233307: (3,6,-24),
    841235359: (1,27,119),
    849728331: (1,16,-81),
    849730383: (5,10,3),
    858125179: (4,1,1),
    858127231: (1,37,-19),
    866390955: (3,3,-71),
    866393007: (-52,24,21),
    908375003: (-52,22,-82),
    908377055: (-52,8,-35),
    916804363: (3,3,21),
    916806415: (-52,47,87),
    925201211: (1,11,27),
    925203263: (4,10,5),
    1113376653: (3,18,55),
    1113378697: (5,43,1),
    1121789789: (1,26,14),
    1121791833: (5,29,1),
    1130170221: (4,45,6),
    1130172265: (3,2,56),
    1138550717: (3,24,65),
    1138552761: (-52,19,-38),
    1180452813: (-52,29,40),
    1180454857: (-52,44,-59),
    1188931357: (3,4,108),
    1188933401: (-52,13,-42),
    1197311789: (4,21,5),
    1197313833: (4,14,1),
    1205626877: (-52,28,55),
    1205628921: (-52,39,-91),
    1515242890: (2,19,89),
    1515244942: (2,20,-44),
    1523656026: (2,1,-78),
    1523658078: (3,46,60),
    1532036458: (5,30,4),
    1532038510: (4,43,4),
    1540416954: (3,19,-45),
    1540419006: (3,40,-20),
    1582319050: (1,44,-21),
    1582321102: (2,29,-18),
    1590797594: (4,13,3),
    1590799646: (-52,20,1),
    1599178026: (-52,32,-85),
    1599180078: (-52,6,-15),
    1607493114: (4,39,7),
    1607495166: (3,28,-14),
    1783120260: (2,38,20),
    1783122304: (4,47,5),
    1791598932: (3,18,-22),
    1791600976: (2,3,32),
    1799979364: (5,32,3),
    1799981408: (5,42,3),
    1808294324: (5,41,1),
    1808296368: (4,10,7),
    1850261956: (3,34,-105),
    1850264000: (4,0,3),
    1858674964: (1,47,-48),
    1858677008: (2,11,45),
    1867055396: (2,7,12),
    1867057440: (5,31,6),
    1875436020: (-1,0,0),
    1917076355: (1,23,85),
    1917078407: (4,26,3),
    1925555027: (4,17,7),
    1925557079: (4,21,2),
    1933935459: (2,13,-28),
    1933937511: (4,30,7),
    1942250419: (4,18,6),
    1942252471: (4,20,6),
    1984218051: (2,30,-39),
    1984220103: (-52,34,-112),
    1992631059: (-52,11,49),
    1992633111: (1,11,84),
    2001011491: (4,37,5),
    2001013543: (2,14,97)
}

def build_instruction_sequence():
    seq = []
    i = 0
    while True:
        idx = random_java(i)
        if idx in instr_map:
            op, index, param = instr_map[idx]
        else:
            break
        seq.append((op, index, param))
        if op == -1:
            break
        i += 1
        if i > 10000:
            raise RuntimeError("too many iterations")
    return seq

def invert_ops_for_index_at_pos(instr_seq, index, pos, target_val):
    val = target_val & 0xFF
    for p in range(pos-1, -1, -1):
        op, idx, param = instr_seq[p]
        if idx != index:
            continue
        if op == 1:    
            val = (val - (param & 0xFF)) & 0xFF
        elif op == 2:    
            val = (val + (param & 0xFF)) & 0xFF
        elif op == 3:   
            val = val ^ (param & 0xFF)
        elif op == 4:    
            val = ror8(val, param & 0xFF)
        elif op == 5:   
            val = rol8(val, param & 0xFF)
    return val

def rc4_variant_keystream(key_bytes: bytes, length: int):
    box = [0]*256
    for i in range(256):
        box[i] = ((255 - i) ^ 131) & 0xFF
    x = 0
    keylen = len(key_bytes)
    for i2 in range(256):
        x = (x + box[i2] + key_bytes[(i2 + 72) % keylen]) % 256
        box[i2], box[x] = box[x], box[i2]
    x2 = 0
    y = 0
    keystream_vals = []
    for _ in range(length):
        x2 = (x2 + 3) % 256
        y = (y - box[x2]) & 255
        box[x2], box[y] = box[y], box[x2]
        index = (box[x2] ^ box[y]) % 256
        keystream_vals.append(box[index] & 0xFF)
    return keystream_vals

def main():
    instr_seq = build_instruction_sequence()
    checks_per_index = {}
    for pos, (op, index, param) in enumerate(instr_seq):
        if op == -52:
            checks_per_index.setdefault(index, []).append((pos, param & 0xFF))

    enc = [None]*48
    inconsistencies = []
    for idx, checks in checks_per_index.items():
        implied = []
        for pos, param in checks:
            init_b = invert_ops_for_index_at_pos(instr_seq, idx, pos, param)
            implied.append(init_b)
        if len(set(implied)) != 1:
            inconsistencies.append((idx, implied))
        else:
            enc[idx] = implied[0]

    missing = [i for i,b in enumerate(enc) if b is None]
    if missing:
        print("Warning: missing indices:", missing)
    if inconsistencies:
        print("Inconsistencies:", inconsistencies)

    enc_bytes = bytes([b if b is not None else 0 for b in enc])

    key = recover_key()
    keystream = rc4_variant_keystream(key, 48)

    plain = []
    for i in range(48):
        eb = enc_bytes[i]
        pk = ((eb ^ 119) - keystream[i]) & 0xFF
        plain.append(pk)
    plain_bytes = bytes(plain)

    print("Recovered key (22 bytes):", key)
    try:
        print("Key ASCII:", key.decode('ascii'))
    except:
        pass
    print("Recovered encrypted bytes (hex):", enc_bytes.hex())
    print("Recovered plaintext (hex):", plain_bytes.hex())
    try:
        print("Recovered flag:", plain_bytes.decode('utf-8'))
    except:
        print("Recovered flag (bytes):", plain_bytes)

if __name__ == "__main__":
    main()
```



![image-20251101173705461](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603081302528.png)

##### key

```
4r3_y0U_a_Jv4V_m4s73R?
```



##### flag

```
flag{4r3_y0U_g0oD_a7_j4vA?I'm_V3rY_Go0d_47_JvaV}
```





