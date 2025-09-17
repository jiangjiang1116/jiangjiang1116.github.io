import { defineConfig } from 'vitepress';
import fronted from '../.vitepress/fronted.json' assert { type: 'json' };
import notes from '../.vitepress/notes.json' assert { type: 'json' };
import markdownItContainer from 'markdown-it-container';
export default defineConfig({
  base: '/',
  head: [['link', { rel: 'icon', type: 'image/gif', href: '/images/dog.png' }]],
  title: 'Sinbad-Website',
  themeConfig: {
    logo: '/images/eraser.png',
    siteTitle: 'Homepage',
    nav: [{ text: '技术', link: '/frontend/持续更新' },{ text: 'note', link: '/notes/收藏' }],
    sidebar: {
      '/frontend/': fronted,
      '/notes':notes
    },
    search: {
      provider: 'local'
    },
    lastUpdated: {
      text: '最后更新于', // 自定义文本
      formatOptions: {
        dateStyle: 'short', // 日期格式
        timeStyle: 'medium' // 时间格式
      }
    }
  },
  // md的居中类
  markdown: {
    config: (md) => {
      md.use(markdownItContainer, 'center', {
        validate: (params) => params.trim().match(/^center\s*(.*)/),
        render: (tokens, idx) => {
          const m = tokens[idx].info.trim().match(/^center\s*(.*)/);
          if (tokens[idx].nesting === 1) {
            // 开始标签
            return `<div class="center-text">\n`;
          } else {
            // 结束标签
            return `\n</div>\n`;
          }
        }
      });
    }
  },
  //Vite 将使用现代的 Sass API，而不是即将被废弃的旧版 API
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
});