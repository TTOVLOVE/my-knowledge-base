

<meta name="referrer" content="no-referrer" />

# Week 4



## RE

### NOT_TUI

##### 解题思路

同样的先查看下程序的信息

![image-20251026154826837](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042349748.png)

是一个图形化的程序

接着反汇编分析

打开没有发现`main`函数和程序的主要逻辑，直接按`shift+f12`查看程序的字符串来定位程序的主要逻辑函数

![image-20251026155126318](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042349216.png)

跟进找到程序判断输入是否正确的主要逻辑

![image-20251026155152473](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042349150.png)

这里可以发现程序首先是做格式检查，必须是 `flag{...}`，末尾 `}`，总长度 `v4 == 38`，因此花括号内有效负载长度 `v9 = v4 - 6 = 32` 字节

然后是一个明显的S 盒替换

对花括号内 32 个字节逐字节做 `out[i] = byte_140005000[in[i]]`。

表 `byte_140005000` 正是一个`AES S-box`

![image-20251026155445702](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042350593.png)

“滑窗”块加密（8 字节/114 轮）

把替换后的 32 字节视为 8 个 little-endian 的 `DWORD`（每 4 字节一个）。

依次对以下 7 组相邻双字做加密（注意**步长 4 字节**的“滑动窗口”，会重叠）：
 `&buf[0]`, `&buf[4]`, `&buf[8]`, `&buf[12]`, `&buf[16]`, `&buf[20]`, `&buf[24]` 也就是对相邻的 `(d0,d1), (d1,d2), …, (d6,d7)` 加密。



接着是一个关键的加密函数 `sub_140001450`

![image-20251026155604810](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042350139.png)

`114` 轮（`i <=0x71`），每轮 `v3 += 1131796`；

偶数轮用 `key = "String_Theocracy"`

奇数轮用 `key = "Paper_Bouquet_Mili"`但是这里只取这串的前 16 字节 `"Paper_Bouquet_Mi"`

![image-20251026155733033](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042350853.png)

然后是每轮先更新 `v5`，再用更新后的 `v5` 去更新 `v4`（TEA/XTEA 风格变种）：

```
v5 += (v4 + v3) ^ (key0 + 16*v4) ^ ((v4 >> 5) + key1);
v4 += (v5 + v3) ^ (key2 + 16*v5) ^ ((v5 >> 5) + key3);
```

全部操作 32 位溢出（`mod 2^32`）

最后与常量比较，将得到的 `8` 个 `dword` 与 `dword_140004040` 相等则正确

![image-20251026160025487](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042350481.png)





要解密按程序加密的步骤倒着来：

将密文
 `T = [0x5AF4429C, 0xBAA6B51B, 0x5CDECA1F, 0xAF439534, 0x8B07D489, 0xCC2048AF, 0x957F02B6, 0x9C4988FD]`

倒序“滑窗”解密`7` 次，然后依次对 `(d6,d7), (d5,d6), …, (d0,d1)` 调用 `sub_140001450`，这里与加密完全对称，114 轮逆序，先还原 `v4` 再还原 `v5`；同一轮的 `sum=(i+1)*1131796`，偶数/奇数轮用相同的那套 `key`

这样拿回的是经过`S` 盒之后的 `32` 字节

最后对 `32` 字节逐字节过 `AES` 逆 `S-box`，得到 `32` 字节明文



##### exp

```python
SBOX = [
0x63,0x7C,0x77,0x7B,0xF2,0x6B,0x6F,0xC5,0x30,0x01,0x67,0x2B,0xFE,0xD7,0xAB,0x76,
0xCA,0x82,0xC9,0x7D,0xFA,0x59,0x47,0xF0,0xAD,0xD4,0xA2,0xAF,0x9C,0xA4,0x72,0xC0,
0xB7,0xFD,0x93,0x26,0x36,0x3F,0xF7,0xCC,0x34,0xA5,0xE5,0xF1,0x71,0xD8,0x31,0x15,
0x04,0xC7,0x23,0xC3,0x18,0x96,0x05,0x9A,0x07,0x12,0x80,0xE2,0xEB,0x27,0xB2,0x75,
0x09,0x83,0x2C,0x1A,0x1B,0x6E,0x5A,0xA0,0x52,0x3B,0xD6,0xB3,0x29,0xE3,0x2F,0x84,
0x53,0xD1,0x00,0xED,0x20,0xFC,0xB1,0x5B,0x6A,0xCB,0xBE,0x39,0x4A,0x4C,0x58,0xCF,
0xD0,0xEF,0xAA,0xFB,0x43,0x4D,0x33,0x85,0x45,0xF9,0x02,0x7F,0x50,0x3C,0x9F,0xA8,
0x51,0xA3,0x40,0x8F,0x92,0x9D,0x38,0xF5,0xBC,0xB6,0xDA,0x21,0x10,0xFF,0xF3,0xD2,
0xCD,0x0C,0x13,0xEC,0x5F,0x97,0x44,0x17,0xC4,0xA7,0x7E,0x3D,0x64,0x5D,0x19,0x73,
0x60,0x81,0x4F,0xDC,0x22,0x2A,0x90,0x88,0x46,0xEE,0xB8,0x14,0xDE,0x5E,0x0B,0xDB,
0xE0,0x32,0x3A,0x0A,0x49,0x06,0x24,0x5C,0xC2,0xD3,0xAC,0x62,0x91,0x95,0xE4,0x79,
0xE7,0xC8,0x37,0x6D,0x8D,0xD5,0x4E,0xA9,0x6C,0x56,0xF4,0xEA,0x65,0x7A,0xAE,0x08,
0xBA,0x78,0x25,0x2E,0x1C,0xA6,0xB4,0xC6,0xE8,0xDD,0x74,0x1F,0x4B,0xBD,0x8B,0x8A,
0x70,0x3E,0xB5,0x66,0x48,0x03,0xF6,0x0E,0x61,0x35,0x57,0xB9,0x86,0xC1,0x1D,0x9E,
0xE1,0xF8,0x98,0x11,0x69,0xD9,0x8E,0x94,0x9B,0x1E,0x87,0xE9,0xCE,0x55,0x28,0xDF,
0x8C,0xA1,0x89,0x0D,0xBF,0xE6,0x42,0x68,0x41,0x99,0x2D,0x0F,0xB0,0x54,0xBB,0x16]

MASK=0xFFFFFFFF
DELTA=1131796

def to_words16(s):
    b=s.encode('ascii')[:16]
    return [int.from_bytes(b[i:i+4],'little') for i in range(0,16,4)]

K_even=to_words16('String_Theocracy')
K_odd =to_words16('Paper_Bouquet_Mili')  # 只取前16字节，即 Paper_Bouquet_Mi

def dec_pair(v5,v4,rounds=114):
    for i in range(rounds-1,-1,-1):
        sumv=((i+1)*DELTA)&MASK
        key=K_odd if (i&1) else K_even
        t2=((v5+sumv)&MASK) ^ ((key[2]+((v5<<4)&MASK))&MASK) ^ (((v5>>5)+key[3])&MASK)
        v4=(v4 - t2) & MASK
        t1=((v4+sumv)&MASK) ^ ((key[0]+((v4<<4)&MASK))&MASK) ^ (((v4>>5)+key[1])&MASK)
        v5=(v5 - t1) & MASK
    return v5,v4

T=[0x5AF4429C,0xBAA6B51B,0x5CDECA1F,0xAF439534,0x8B07D489,0xCC2048AF,0x957F02B6,0x9C4988FD]

d=T[:]
for j in range(6,-1,-1):
    d[j],d[j+1]=dec_pair(d[j],d[j+1])

inv=[0]*256
for i,v in enumerate(SBOX):
    inv[v]=i

import struct
after_sbox = b''.join(struct.pack('<I',x) for x in d)
plain = bytes(inv[b] for b in after_sbox)
print("flag{"+plain.decode('ascii')+"}")
```

![image-20251026160524064](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042350923.png)



![image-20251026154732302](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042350259.png)





##### flag

```
flag{bbbd719a361123014e77006476205f73}
```



### PleaseHookMe

##### 解题过程

先将`apk`解包

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042350799.png)

同样的先看java层代码

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042350563.png)

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042351364.png)

Java 层 `check(String)` 调用的是一个`native`方法

java层没有什么有用的信息，跟进so文件分析native方法的内容

但是这里有个问题是题目只给了armv8a架构的so文件，没给x86_64的文件，ida反编译不出来函数

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042351598.png)

这里根据题目的内容，应该是要用`hook`技术来获取关键的一些信息，但是这里由于对`arm`架构不太了解，尝试写了几个`frida`的`js`脚本，都是检测不到`so`文件加载，自然也抓取不到需要的信息

但是这里了解到可以用`ghidra`来反编译`arm`架构的文件

![image-20251026204245141](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042351405.png)

这里将so文件反编译后可以看到so层的大致逻辑

![image-20251026204348397](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042351746.png)

so层用 NEON `TBL`做字节表查找/置换以及做了一堆异或，把 3 组全局常量（记作 `seed`、`t`、`l`）搅成 **16 字节的密钥 K**。

![image-20251026204445161](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042351044.png)

`btea` 函数用 **XXTEA/BTEA**对输入的 `4×uint32` 做 **214 轮**加密，因为这里是`4*52 + 6 = 214`，也解释了 `iVar11 = -0xd6` 的魔数

最后把结果和 4 个常量（`mm, DAT_0010316c, DAT_00103170, DAT_00103174`）逐字比较。全等则返回 true。

![image-20251026204502514](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042351261.png)

可以看到明显的`XXTEA`算法的特征

使用常量 `0x9e3779b9`（TEA delta）、位运算 `(x<<4)^(y>>5)`、`(x<<2)^(y>>3)`、`(sum>>2)&3` 作为索引

![image-20251026210332474](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042351652.png)

因此解法非常标准，把目标密文常量当作 `XXTEA` 的输出，按完全相同的密钥调度和轮数做一次解密

这里就需要找到`t`：16 字节索引表（TBL 的“索引”向量）

![image-20251026204814751](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042351625.png)

`l`：16 字节（分成 `l._0_8_` 和 `l._8_8_` 两个 qword）

![image-20251026204841868](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042351088.png)

密文

![image-20251026204916559](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042351662.png)

最后是`seed`：`_DAT_00100720`（16 字节，第一次 `a64_TBL(ZEXT816(0), _DAT_00100720, t)` 里用到）

![image-20251026205045470](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042351593.png)

得到的常量

```bash
t = 0d 0e 0f 0c 0b 0a 09 08 06 07 05 04 02 03 01 00

l = f0 f1 f2 f3 f4 f5 f6 f7 f8 f9 fa fb fc fd fe ff

seed = 88 cf 93 9b 88 90 93 9b 88 cf 9a 92 88 b0 9a 92

mm = 0x583F7D05, DAT_0010316c = 0xC4E83E36, DAT_00103170 = 0x481C5AAA, DAT_00103174 = 0xA12F85E6
```



解密要先还原密钥 K

按照 so 的 `check()`：

先算 `M = l XOR t`，`s = TBL(seed, t)`，要重复`12` 次：`s = TBL(s XOR M, t)`，最后 `K = s XOR M`

将密钥计算出来



还原出密钥后要做`214` 轮“非典 BTEA”逆运算

so层正向加密每一轮顺序是：先 `v0 → v1 → v2 →（sum += δ）→ v3`，且最后一步用的是 `u = v0 ^ sum_old`。
所以解密要按 `r = 214 → 1` 逆序还原

先做`sum_old = r * 0x9E3779B9`，`e = (sum_old >> 2) & 3`

然后依次撤销：

1. `v3 -= G(v0, v2, K[e^3], u = v0 ^ sum_old)`
2. `v2 -= F(v3, v1, K[e^2], sum_old)`
3. `v1 -= F(v2, v0, K[e^1], sum_old)`
4. `v0 -= F(v1, v3, K[e^0], sum_old)`

这里的`F/G` 和 so 里的表达式完全一致，只是把最后一项分别写成 `(a ^ sum)` 和 `u`

最后将四个 dword 密文 `[05 7D 3F 58, 36 3E E8 C4, AA 5A 1C 48, E6 85 2F A1]` 代入解密

![image-20251026211121221](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042352935.png)

##### exp

```python
MASK = 0xFFFFFFFF
DELTA = 0x9E3779B9
T = bytes.fromhex("0d0e0f0c0b0a09080607050402030100")
L = bytes.fromhex("f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff")
SEED = bytes.fromhex("88cf939b8890939b88cf9a9288b09a92")
C = [0x583F7D05, 0xC4E83E36, 0x481C5AAA, 0xA12F85E6]


def bytes_xor(a: bytes, b: bytes) -> bytes:
    return bytes(x ^ y for x, y in zip(a, b))

def tbl(src: bytes, idx: bytes) -> bytes:
    return bytes(src[i & 0x0F] for i in idx)

def to_u32_le(b16: bytes):
    return [
        int.from_bytes(b16[0:4],  "little"),
        int.from_bytes(b16[4:8],  "little"),
        int.from_bytes(b16[8:12], "little"),
        int.from_bytes(b16[12:16],"little"),
    ]

def from_u32_le(v4):
    return b"".join((x & MASK).to_bytes(4, "little") for x in v4)


def derive_key(l: bytes, t: bytes, seed: bytes) -> bytes:
    M = bytes_xor(l, t)
    s = tbl(seed, t)
    for _ in range(12):
        s = tbl(bytes_xor(s, M), t)
    K = bytes_xor(M, s)
    return K

def F(a, b, k, s):
    return (
        ((((a << 2) & MASK) ^ (b >> 5)) + (((a << 4) & MASK) ^ (b >> 3))) ^ ((k ^ b) & MASK)
        + ((a ^ s) & MASK)
    ) & MASK

def G(a, b, k, u):
    return (
        ((((a << 2) & MASK) ^ (b >> 5)) + (((a << 4) & MASK) ^ (b >> 3))) ^ ((k ^ b) & MASK)
        + (u & MASK)
    ) & MASK

def btea_decrypt_214(cipher_words, key_words):
    v0, v1, v2, v3 = (x & MASK for x in cipher_words)
    for r in range(214, 0, -1):
        sum_old = (r * DELTA) & MASK
        e = (sum_old >> 2) & 3
        u = (v0 ^ sum_old) & MASK
        v3 = (v3 - G(v0, v2, key_words[e ^ 3], u)) & MASK
        v2 = (v2 - F(v3, v1, key_words[e ^ 2], sum_old)) & MASK
        v1 = (v1 - F(v2, v0, key_words[e ^ 1], sum_old)) & MASK
        v0 = (v0 - F(v1, v3, key_words[e ^ 0], sum_old)) & MASK
    return [v0, v1, v2, v3]

def main():
    K = derive_key(L, T, SEED)
    Kw = to_u32_le(K)
    print("K (hex)  =", K.hex(), "  (ascii:", "".join(chr(c) if 32<=c<127 else "." for c in K), ")")

    Pw = btea_decrypt_214(C, Kw)
    Pbytes = from_u32_le(Pw)
    print("m   =", Pbytes.hex(), " (ascii:", "".join(chr(c) if 32<=c<127 else "." for c in Pbytes), ")")
    print("\nFlag:", Pbytes.decode("ascii"))

if __name__ == "__main__":
    main()
```



##### flag

```
flag{h007_m3_me}
```



### Dancing Keys

##### 解题过程

`64`位的`elf`文件，用`ida64`打开逆向

![image-20251026211319232](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042352341.png)

程序的主逻辑

读入长度`48`的字符串，然后调用`sub_40132B`：把每 4 个字节打包为 1 个 32 位整型（共有 12 个 dword），但是这里“打包”的字节顺序很奇怪

接着是对每一对（两个一组）的 dword（即索引 `i, i+1`，`i=0,2,4,...,10`）调用一次  `sub_4015EB`，这里的  `sub_4015EB`明显就是关键的加密函数

最后调用`sub_4013F3`函数操作一遍后与 `byte_402020` 的比较

先看一下 `sub_4015EB`函数

![image-20251026211732523](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042352395.png)





这是一个“加/异或/移位”的自定义迭代函数，循环 `0x72 (114)`轮，看起来有点像乱改版 TEA。这里它内部使用了自写的 `rand()` 得到的随机数 `v7`，且每一对 `dword` 都会各自调用一次 `rand()`，因此每对块的 v7 可能不同，但对这对块的 114 轮迭代都是同一个 v7



`sub_4013F3`比较简单，就是把 12 个 dword 再“拆回”48 个字节，但顺序再次被打乱成另一个固定置换，然后与 `byte_402020` 的 48 个字节逐一比较



但是坑就在这里，这里没有分析出来`seed`的初始值，跟进`rand`

![image-20251026212029723](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042352981.png)

![image-20251026212051451](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042352596.png)

发现这里 `dword_404060` 在 `.bss`，程序启动时 `.bss` 会被清零

这里还动调了很久尝试直接拿到`4`个初始值(kule)

其实这里

“看起来在变来变去的密钥”其实是轮密钥（round tweak），不是主密钥。

这个算法真正的主密钥是固定不变就是 `main` 里那四个 32-bit 常量：
 `K = (0x12345678, 0x90ABCDEF, 0x11451419, 0x19810114)`

每一对 32-bit 分组在加密时，会先调用一次自写 `rand()` 生成 `v7`，再把 `v5` 按 `v5 += v7*i`（累成三角数）混入更新式里；这就导致每一轮看起来像“密钥在变”。本质上它是固定密钥 + PRNG 派生的每轮扰动。

![image-20251026212415250](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042352901.png)

到这里理一下逻辑，其实重点是：程序把输入的 48 个字节做了一次特殊打包 → 用一个两字（64bit）为一组的“自制分组密码”加密 → 再按另一种字节顺序拆包 → 跟  48 个常量字节比较。

这里的重点是

`sub_40132B` 把 48 字节打包成 12 个 32 位整数（每 4 字节成 1 `word`，字节顺序不是常规 的`little-endian`）。

以 `(A,B)` 两两成对（共 6 组）调用 `sub_4015EB` 做 **114 轮**加密。加密使用 4 个 32 位的“密钥字”，以及一次 `rand()`（每对调用一次）。

`sub_4013F3` 再把 12 个 word 拆回 48 字节



这两小函数非常重要，因为解题时我们会用“拆包的逆”和“打包的逆”。

`sub_40132B`做打包，将输入字节 打包为12 个 32 位

对每个块 `base = i*4`：

```c
word = (b[base+1] << 24) |
       (b[base+2] << 16) |
       (b[base+0] <<  8) |
       (b[base+3] <<  0)
```

`sub_4013F3`做拆包，将12 个 32 位拆包输出为字节

对每个块 `base = i*4`：

```c
out[base+0] = (word >> 16) & 0xFF
out[base+1] = (word >> 24) & 0xFF
out[base+2] = (word >>  0) & 0xFF
out[base+3] = (word >>  8) & 0xFF
```

可以看到，这两个函数互为逆变换，只是顺序有点绕



最关键的加密器在`sub_4015EB`函数

指向两个 32 位整数的指针（我们叫它们 `A`、`B`），以及指向 4 个 32 位密钥字数组 `K[4]`，位于 `dword_404070`

内部每处理一对 `(A,B)` 会先调用一次自定义 `rand()`，拿到一个 32 位值 `r8`，然后做 **114 轮**混淆。

每轮都有一个“变动的 sum”：

```c
sum(i) = 0xDEADBEEF + r8 * (i * (i + 1) / 2)    // 32位溢出
```

每轮的移位量是按轮数取模计算：

```c
r1 = (i + 1) % 5
r4 = (i + 4) & 7        // % 8
r2 = (i + 2) % 6
r3 = (i + 3) % 7
```

一轮的正向更新（从 A0,B0 到 A1,B1）

```c
t1 = ((B0 << r1) ^ K[2]) ^ (B0 - sum)
A1 = A0 + (((B0 >> r4) ^ K[0]) ^ t1)

t2 = ((A1 << r2) ^ K[1]) ^ (A1 - sum)
B1 = B0 + (((A1 >> r3) ^ K[3]) ^ t2)
```

全部 32 位无符号运算，溢出截断）



然后就是 “密钥字” 与 自定义的 PRNG（rand）

这里的`rand`其实是一个 `xorshift32` 变体

全局状态在 `dword_404060`，每次做

```c
x ^= x << 11
x ^= x >>  4
x ^= x <<  5
x ^= x >> 14
return x 
```



密钥就是解题的关键

主线程在一个状态机循环里把 `.bss` 的 4 个初值写定：

```c
K0=0x12345678, K1=0x90ABCDEF, K2=0x11451419, K3=0x19810114
```

但是在 `.init_array` 里会先创建一个线程 `start_routine`

![image-20251026213811142](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042352949.png)

对从 `start` 函数起，直到 `0x4019ED` 的代码字节区间做两种归约

`xorSum = 所有字节按位异或`

`mulSum = Σ (i * byte[i])`

调 `ptrace(PTRACE_TRACEME)`（request=0），如果被调试会返回 `-1`，否则返回 `0`。

这里的`seed = (ptrace_ret ^ xorSum) * mulSum`（u32）

![image-20251026213642869](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042352011.png)

设为 `dword_404060=seed`，`sleep(1)`，然后依次调用 4 次 `rand()` 把 K0..K3 逐个异或

```
for i in 0..3: K[i] ^= rand()
```

主线程随后才读入输入、打包、并用改过的 `K`去加密。

所以这里如果调试器单步，`ptrace` 返回 -1，会改变随机序列与密钥；另外线程 `sleep 1` 秒后才去改密钥，基本上输完 48 字节它就改完了



拿一下密文`byte_402020`

```
6E AA B2 46 14 A4 7E 60 BA 44 4E CC 43 AA AA CD
D4 FC 71 AA F6 7D 4B 9B E6 7D EF 4E 3D 43 0B BF
28 14 85 B2 CF 62 A2 C5 EA 7D EB 5E D6 FC 3C BF
```

![image-20251026213953275](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042352611.png)



编写解密的脚本

从文件读取代码片段（`VA 0x401130..0x4019ED` → 文件偏移 = `VA-0x401000+0x1000`）计算 `xorSum` / `mulSum`；

然后计算 `seed`（默认按“未调试”情况，`ptrace_ret=0`，如要模拟被调试就改成 -1）；

还原程序中自定义的 `rand()` 得到被异或后的 `K[4]`；

把上面的 48 个常量字节按 `sub_4013F3` 的逆组合成 12 个 word；

对每一对 (A,B) 做 114 轮逆运算，每对入手前先取一次 `rand()`；

把得到的 12 个 word 再用 `sub_40132B` 的逆还原为 48 个字节



##### exp

```python
from pathlib import Path

BIN_PATH = Path("key") 
TARGET = bytes.fromhex(
    "6E AA B2 46 14 A4 7E 60 BA 44 4E CC 43 AA AA CD"
    " D4 FC 71 AA F6 7D 4B 9B E6 7D EF 4E 3D 43 0B BF"
    " 28 14 85 B2 CF 62 A2 C5 EA 7D EB 5E D6 FC 3C BF"
)

def u32(x): return x & 0xFFFFFFFF

state = 0
def xr_rand():
    global state
    x = state
    x = u32(x ^ u32(x << 11))
    x = u32(x ^ (x >> 4))
    x = u32(x ^ u32(x << 5))
    x = u32(x ^ (x >> 14))
    state = x
    return x

def compute_seed(bin_path: Path, ptrace_ret=0):
    VA_START = 0x401130
    VA_END   = 0x4019ED
    FILE_BASE_VA = 0x401000
    FILE_BASE_OFF= 0x1000  

    off_start = FILE_BASE_OFF + (VA_START - FILE_BASE_VA)
    off_end   = FILE_BASE_OFF + (VA_END   - FILE_BASE_VA)
    data = (bin_path.read_bytes())[off_start:off_end] 

    xorSum = 0
    mulSum = 0
    for i, b in enumerate(data):
        xorSum ^= b
        mulSum = u32(mulSum + u32(i * b))
    seed = u32((ptrace_ret ^ xorSum) * mulSum)
    return seed

def words_from_target48(t: bytes): 
    assert len(t) == 48
    out = []
    for i in range(12):
        base = 4*i
        w = (t[base+1] << 24) | (t[base+0] << 16) | (t[base+3] << 8) | t[base+2]
        out.append(w)
    return out

def bytes_from_words12(words):    
    out = bytearray(48)
    for i, w in enumerate(words):
        base = 4*i
        out[base+1] = (w >> 24) & 0xFF
        out[base+2] = (w >> 16) & 0xFF
        out[base+0] = (w >> 8)  & 0xFF
        out[base+3] = (w >> 0)  & 0xFF
    return bytes(out)

def decrypt_pair(A1, B1, K, r8):
    for i in range(113, -1, -1):
        sum_i = u32(0xDEADBEEF + u32(r8 * ((i*(i+1))//2)))

        r1 = (i + 1) % 5
        r4 = (i + 4) & 7
        r2 = (i + 2) % 6
        r3 = (i + 3) % 7

        t2 = u32((u32(A1 << r2) ^ K[1]) ^ u32(A1 - sum_i))
        B0 = u32(B1 - u32((u32(A1 >> r3) ^ K[3]) ^ t2))

        t1 = u32((u32(B0 << r1) ^ K[2]) ^ u32(B0 - sum_i))
        A0 = u32(A1 - u32((u32(B0 >> r4) ^ K[0]) ^ t1))

        A1, B1 = A0, B0
    return A1, B1

def main():
    global state
    seed = compute_seed(BIN_PATH, ptrace_ret=0)
    state = seed

    K = [0x12345678, 0x90ABCDEF, 0x11451419, 0x19810114]
    for i in range(4):
        K[i] ^= xr_rand()
        K[i] = u32(K[i])

    enc_words = words_from_target48(TARGET)

    dec_words = [0]*12
    for pair_i in range(6):
        r8 = xr_rand()  
        A1 = enc_words[2*pair_i]
        B1 = enc_words[2*pair_i+1]
        A0, B0 = decrypt_pair(A1, B1, K, r8)
        dec_words[2*pair_i]   = A0
        dec_words[2*pair_i+1] = B0

    flag_bytes = bytes_from_words12(dec_words)
    print(flag_bytes.decode("utf-8"))


if __name__ == "__main__":
    main()
```

![image-20251026214400904](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042353212.png)



##### flag

```
flag{1_h4t3_h4sH_ch3cK1ng_4Nd_r4Nd0m_t3AenCRypt}
```







### ezrust

##### 解题过程

先查看一下文件信息

![image-20251026151913400](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042353291.png)

用ida64反编译程序

进入程序没有找到程序的主逻辑

![image-20251026152054958](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042353501.png)

接着跟进

![image-20251026152125793](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042353580.png)

发现程序的主逻辑函数

不太能看懂这个函数的内容

但是在这里有一个关键的信息

![image-20251026152251844](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042353908.png)

`"expand 32-byte k"` 是 `ChaCha/Salsa` 系列的固定常量，`ChaCha20` 使用它

而且这里在轮函数里出现了 **+ / XOR / 32-bit 旋转 16, 12, 8, 7**，正是 `ChaCha20` 的四分之一轮

循环 `10` 次、每次两轮（列轮 + 对角轮）= `20` 轮，基本可以判断是 `ChaCha20`

![image-20251026152458802](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042353609.png)

state内容

```python
const:  "expand 32-byte k"         // 16 bytes, 固定
key:    32 bytes =  "String_Theocracy"  ||   xmmword_14001B600
ctr:    4 bytes = 0                 // v71.m128i_i32[0] = 0
nonce:  12 bytes = "NewStar 2025"   // 题里把 "NewStar 2025"拷到 v71[4..15]
```

产生 `64` 字节 `keystream`（`ChaCha20 block`），但程序只拿前 40 字节按位 `XOR` 到输入中
代码里虽然用了一些 `SSE` 拼接，看起来很花，但本质就是顺序取`block` 的前 `40` 字节去异或

最后 `memcmp(v21, unk_14001B6F0, 0x28)` 比较 `40` 字节结果。所以：

```
flag = unk_14001B6F0  XOR  chacha20_block(key, ctr=0, nonce)[:40]
```

接着提取一下`key`的后`16`字节`xmmword_14001B600`

![image-20251026151819827](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042353511.png)

![image-20251026153234608](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042353832.png)

提取密文`unk_14001B6F0`，这里按`A`集合所有元素

![image-20251026153325974](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042353236.png)

所以这里我们只要

实现 `ChaCha20` 单 `block`

```
key = b"String_TheocracyycarcoehT_gnirtS"
nonce = b"NewStar 2025"
counter = 0
```

取 `block[:40]` 作 `keystream`，然后 `flag = target ^ keystream`



##### exp

```python
from typing import List

def rotl32(x:int,n:int)->int:
    return ((x<<n)&0xffffffff)|((x&0xffffffff)>>(32-n))

def qr(s:List[int],a:int,b:int,c:int,d:int)->None:
    s[a]=(s[a]+s[b])&0xffffffff; s[d]^=s[a]; s[d]=rotl32(s[d],16)
    s[c]=(s[c]+s[d])&0xffffffff; s[b]^=s[c]; s[b]=rotl32(s[b],12)
    s[a]=(s[a]+s[b])&0xffffffff; s[d]^=s[a]; s[d]=rotl32(s[d],8)
    s[c]=(s[c]+s[d])&0xffffffff; s[b]^=s[c]; s[b]=rotl32(s[b],7)

def chacha20_block(key:bytes, ctr:int, nonce:bytes)->bytes:
    assert len(key)==32 and len(nonce)==12
    const = b"expand 32-byte k"
    buf = const + key + ctr.to_bytes(4,'little') + nonce
    state = [int.from_bytes(buf[i:i+4],'little') for i in range(0,64,4)]
    w = state[:]
    for _ in range(10):
        qr(w,0,4,8,12); qr(w,1,5,9,13); qr(w,2,6,10,14); qr(w,3,7,11,15)
        qr(w,0,5,10,15); qr(w,1,6,11,12); qr(w,2,7,8,13); qr(w,3,4,9,14)
    out = [(w[i]+state[i])&0xffffffff for i in range(16)]
    return b''.join(x.to_bytes(4,'little') for x in out)

KEY = b"String_TheocracyycarcoehT_gnirtS"
NONCE = b"NewStar 2025"
TARGET = bytes.fromhex("A36258DB4B824FCE48DABE421CD8596BC7B2CA020B216B104D4E7BEBCE9FFB21E9CF6BC2C24CB34D")

block = chacha20_block(KEY, 0, NONCE)
flag = bytes(t ^ k for t,k in zip(TARGET, block[:40]))
print(flag.decode('utf-8'))
```



![image-20251026153917842](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603042353900.png)



##### flag

```
flag{rUS7_ReveRse_1s_MY_n19h7m4rE_eW2fZ}
```



