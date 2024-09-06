import { basename } from 'node:path'
import { defineConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'

import { head, nav, sidebar, algolia } from './configs'

const APP_BASE_PATH = basename(process.env.APP_BASE_PATH || '')

export default defineConfig({
  outDir: '../dist',
  base: APP_BASE_PATH ? `/${APP_BASE_PATH}/` : '/',

  lang: 'zh-CN',
  title: '青色烟雨',
  description: ' ',
  head,

  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
  },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,

    logo: '/logo.png',

    nav,
    sidebar,

    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '目录',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/zcbin88/mm-notes' }],

    footer: {
      message: 'ICP备案号:<a href="https://beian.miit.gov.cn/">豫ICP备19044382号-2</a>',
      copyright: 'Copyright © 2023-present ZCB',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    /* Algolia DocSearch 配置 */
    algolia,

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    /*** 自定义配置 ***/
    visitor: {
      badgeId: 'maomao1996.notes',
    },

    comment: {
      repo: 'maomao1996/mm-note',
      repoId: 'MDEwOlJlcG9zaXRvcnkxNTc0ODc5Mjg=',
      category: 'Announcements',
      categoryId: 'DIC_kwDOCWMTOM4CZ2rf',
    },
  },

  /* 生成站点地图 */
  sitemap: {
    hostname: 'https://notes.fe-mm.com/',
  },

  vite: {
    plugins: [MarkdownPreview()],
  },
})
