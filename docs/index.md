---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "M0t0y's Wiki"
  text: "知行合一，格物致知"
  tagline: "在这里记录我的探索轨迹"
  image:
    src: /logo.png # 推荐：在 docs/public 目录下放一张 logo.png，VitePress 会自动渲染在右侧
    alt: m0t0y's Logo
  actions:
    - theme: brand
      text: 开始阅读 🚀
      link: /public/ # 这里替换成你真实的第一篇文章路径
    - theme: alt
      text: 查看所有目录 📚
      link: /guide/ # 可以是指向一个全局目录大纲的页面

features:
  - title: 🚩 CTF 赛题复现与 Writeup
    details: 包含 Web、Reverse、Pwn 等方向的实战解题记录，沉淀各类 Bypass 技巧、脱壳方法与 ROP 链构造思路。
    link: /ctf/WEB/intro
    linkText: 查看解题记录
  - title: 🛡️ 渗透测试与体系化攻防
    details: 记录从外网突破到内网横向移动的实战经验，以及真实恶意软件的底层逆向与特征分析。
    link: /security/penetration/intro
    linkText: 我要成为渗透大师
  - title: 💼 面试题汇总
    details: 涵盖网络安全、渗透测试、逆向工程等方向的面试高频考点与真实面经总结，查漏补缺，我要拿到心仪 Offer。
    link: /interview/summary
    linkText: 开始刷题！
---

