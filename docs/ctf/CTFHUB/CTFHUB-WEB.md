

<meta name="referrer" content="no-referrer" />

# 信息泄露

## Git泄露-Index

#### 一、题目内容

![image-20251010142507655](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602221911120.png)

*注：Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区*

#### 二、Git索引（Index）的基本概念

Git索引有时也被称为缓存区（Cache），它用于暂存将要提交到版本控制系统的文件。在执行`git add .`命令后，文件将被添加到索引中，Git将对这些添加到索引中的文件进行监视。索引保存了工作目录中的文件的元数据，包括文件名、文件的类型（文本文件或二进制文件）、文件的权限等。索引还保存了文件的内容快照，以便之后可以生成提交对象。

每次执行`git add`命令后，索引文件都会被更新。当我们对文件进行修改时，索引中的相应条目将会被更新，以反映文件的最新状态。这就是为什么在执行`git commit`命令之前需要使用`git add`命令将文件添加到索引中的原因。



git泄露工具：[lijiejie/GitHack: A `.git` folder disclosure exploit](https://github.com/lijiejie/GitHack)

#### 三、解题过程

开启题目环境

![image-20251010142723694](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602221911207.png)

对于信息泄露的题目，可以使用dirsearch扫目录

```
dirsearch -u http://challenge-b638173f66bdf2c5.sandbox.ctfhub.com:10800
```

![image-20251010143621124](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602221911722.png)

用 GitHack 工具下载泄露的 Git 源代码

```
python GitHack.py http://challenge-b638173f66bdf2c5.sandbox.ctfhub.com:10800/.git
```

其中有一个txt文件里面就是flag

![image-20251010143324373](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602221911002.png)

```
ctfhub{cb74e96218fef68888b2a87c}
```

我们可以使用git log命令或者直接访问master文件查看命令

![image-20251010144650759](https://gitee.com/ttovlove/images/raw/master/CTFHUB_WEB/202602221912547.png)

`commit (initial): init`：代表这是初始化提交（initial commit），建立了仓库并提交第一个版本

`commit: add flag`：表示进行了第二次提交，提交信息是 “add flag”，很可能是往仓库里加了 flag 文件











