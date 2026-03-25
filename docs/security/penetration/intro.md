---
order: 1
---

# 🛡️ 渗透测试实战演练指南

如果说 CTF 是一场设定好规则的“解谜游戏”，那么真实的渗透测试（Penetration Testing）则是一场没有固定解法的“迷宫探险”。本模块主要沉淀从外网边界突破到内网深处的信息搜集、漏洞利用与权限维持经验。

## 🗺️ 标准渗透测试模型 (PTES)

真实的攻防演练通常遵循一套严谨的方法论：

1. **前期交互 (Pre-engagement)：** 明确授权范围（Rules of Engagement）、目标边界。
2. **情报搜集 (Reconnaissance)：** 子域名爆破、端口扫描、指纹识别、社工信息搜集（信息搜集的广度往往决定了渗透的深度）。
3. **威胁建模与漏洞分析：** 寻找薄弱点（如遗留的未授权接口、老旧组件的 N-day）。
4. **漏洞利用 (Exploitation)：** 获取初始立足点（Initial Access），拿到 WebShell 或反弹 Shell。
5. **后渗透攻击 (Post-Exploitation)：**
   * 提权（Privilege Escalation：如 Linux SUID 提权、Windows 内核漏洞提权）。
   * 凭证窃取（抓取 Hash/明文密码）。
   * **内网横向移动 (Lateral Movement)：** 搭建代理隧道，跨越网段，直捣核心域控。
6. **痕迹清理与报告：** 形成闭环。

::: warning ⚠️ 授权红线
本目录下的所有技术分析与 Payload 仅用于本地靶场环境（如 HTB, VulnHub）的安全研究与技术提升。**未经授权的渗透测试属于违法行为。** 务必坚守安全从业者的底线。
:::