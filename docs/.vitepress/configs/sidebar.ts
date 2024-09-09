import type { DefaultTheme } from 'vitepress'
import fs from 'fs-extra'

const sidebarDailyNotes: DefaultTheme.SidebarItem[] =
  fs.readJSONSync('./scripts/daily-notes.json', { throws: false }) || []

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/latex/': [
    {
      text: '语法入门',
      items: [
        { text: '数据类型', link: '/latex/one' },
        { text: '引用类型的拷贝', link: '/latex/two' },
      ],
    },
    {
      text: '高级进阶',
      items: [{ text: '继承', link: '/latex/one' }],
    },
  ],

  '/efficiency/': [
    {
      text: 'Git 相关',
      collapsed: false,
      items: [
        { text: 'Git 相关技巧', link: '/efficiency/git/' },
        { text: 'Git 命令清单', link: '/efficiency/git/command' },
        { text: 'Git 提交规范', link: '/efficiency/git/style' },
      ],
    },
    {
      text: '软件推荐与配置',
      // collapsed: false,
      items: [
        { text: '跨平台软件', link: '/efficiency/software/cross-platform' },
        { text: 'Mac软件', link: '/efficiency/software/mac' },
        { text: 'Windows软件', link: '/efficiency/software/windows' },
        { text: '浏览器扩展', link: '/efficiency/software/browser' },
      ],
    },
    { text: '在线工具', link: '/efficiency/online-tools' },
  ],
  '/daily-notes': sidebarDailyNotes,
}
