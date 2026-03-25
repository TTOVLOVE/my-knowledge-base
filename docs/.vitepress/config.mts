import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

export default defineConfig({
  title: "M0t0y's Wiki",
  description: "个人知识沉淀与技术空间",
  lang: 'zh-CN',
  lastUpdated: true,

 ignoreDeadLinks: true,

  themeConfig: {
    // 开启本地全文搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },

    // 顶部导航栏 (Nav) - CTF 已移动到第一个
    nav: [
      { text: '首页', link: '/' },
      { text: '🚩 CTF解题', link: '/ctf/WEB/intro', activeMatch: '/ctf/' },
      { text: '🛡️ 安全与逆向', link: '/security/penetration/intro', activeMatch: '/security/' },
      { text: '⚙️ 面试题汇总', link: '/interview/summary', activeMatch: '/interview/' }
    ],

    // 左侧侧边栏 (Sidebar) - 路由匹配
    sidebar: generateSidebar([
    {
      documentRootPath: 'docs',
      scanStartPath: 'ctf',
      resolvePath: '/ctf/',
      useTitleFromFileHeading: true, // 自动读取文章里的第一个 # 标题作为侧边栏名字
      useFolderTitleFromIndexFile: true, // 自动读取文件夹下 index.md 的标题作为目录名
      collapsed: false, // 默认展开
    },
    {
      documentRootPath: 'docs',
      scanStartPath: 'security',
      resolvePath: '/security/',
      useTitleFromFileHeading: true,
      useFolderTitleFromIndexFile: true,
      collapsed: false,
    },
    {
      documentRootPath: 'docs',
      scanStartPath: 'interview',
      resolvePath: '/interview/',
      useTitleFromFileHeading: true,
      useFolderTitleFromIndexFile: true,
      collapsed: false,
    }
  ]),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/TTOVLOVE' }
    ],

    outline: { level: [2, 3], label: '本页目录' },
    footer: {
      message: '基于 VitePress 构建，托管于 Cloudflare Pages',
      copyright: 'Copyright © 2026-present M0t0y'
    },
    docFooter: { prev: '上一篇', next: '下一篇' },
    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录'
  }
})