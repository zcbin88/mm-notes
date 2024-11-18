import type { DefaultTheme } from 'vitepress'
import fs from 'fs-extra'

const sidebarDailyNotes: DefaultTheme.SidebarItem[] =
  fs.readJSONSync('./scripts/daily-notes.json', { throws: false }) || []

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/efficiency/': [
    {
      text: '软件推荐',
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
