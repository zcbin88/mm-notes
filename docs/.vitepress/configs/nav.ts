import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '网站导航', link: '/nav', activeMatch: '^/nav' },
  {
    text: 'Latex',
    link: '/latex/',
    activeMatch: '^/latex',
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
