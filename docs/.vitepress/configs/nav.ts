import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航', link: '/nav', activeMatch: '^/nav' },
  {
    text: 'Latex',
    link: '/latex/',
    activeMatch: '^/latex',
  },
  {
    text: '提效工具',
    items: [
      {
        text: '工具推荐',
        items: [
          { text: '跨平台软件', link: '/efficiency/software/cross-platform' },
          { text: 'Mac软件', link: '/efficiency/software/mac' },
          { text: 'Windows软件', link: '/efficiency/software/windows' },
          { text: '浏览器扩展', link: '/efficiency/software/browser' },
        ],
      },
      { text: '在线工具', link: '/efficiency/online-tools' },
    ],
    activeMatch: '^/efficiency',
  },
  {
    text: 'Flutter',
    link: '/me',
  },
  {
    text: '关于我',
    link: '/me',
  },
]
