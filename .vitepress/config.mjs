import { defineConfig } from 'vitepress';
import sidebarAuto from '../.vitepress/sidebar-auto.json' assert { type: 'json' };

export default defineConfig({
  base: '/',
  head: [['link', { rel: 'icon', type: 'image/gif', href: '/images/dog.png' }]],
  title: 'Sinbad-Website',
  themeConfig: {
    logo: '/images/eraser.png',
    siteTitle: 'Homepage',
    nav: [{ text: 'note', link: '/frontend/持续更新' }],
    sidebar: {
      '/frontend/': sidebarAuto
    }
  }
});