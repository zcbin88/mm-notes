import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航', link: '/nav', activeMatch: '^/nav' },
  {
    text: 'Latex',
    items: [
      { text: '首页', link: '/latex/' },
      {
        items: [{ text: 'One', link: '/latex/one' }],
      },
      { text: 'Two', link: '/latex/two' },
    ],
    activeMatch: '^/latex',
  },
  {
    text: 'Workflow',
    items: [
      {
        text: '编程规范',
        link: '/workflow/style-guide',
      },

      {
        text: 'Tailwind CSS 使用与配置',
        link: '/workflow/library/tailwindcss',
      },
      { text: 'npm 常用命令', link: '/workflow/node/npm' },
      { text: 'Git 相关技巧', link: '/workflow/git/' },
    ],
    activeMatch: '^/workflow',
  },
  {
    text: '提效工具',
    items: [
      {
        text: '软件推荐与配置',
        items: [
          { text: '多平台软件', link: '/efficiency/software/cross-platform' },
          { text: 'Mac 平台', link: '/efficiency/software/mac' },
          { text: 'Windows 平台', link: '/efficiency/software/windows' },
          { text: '浏览器设置与扩展', link: '/efficiency/software/browser' },
          { text: 'Visual Studio Code 配置', link: '/efficiency/software/vscode' },
          { text: 'WebStorm 配置', link: '/efficiency/software/webstorm' },
        ],
      },
      { text: '在线工具', link: '/efficiency/online-tools' },
    ],
    activeMatch: '^/efficiency',
  },
  {
    text: '关于我',
    link: '/me',
  },
]
