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
    nav: [{ text: 'Code', link: '/frontend/持续更新' }, { text: 'note', link: '/notes/收藏' }],
    sidebar: {
      '/frontend/': fronted,
      '/notes': notes
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
      // ::: title 容器
      md.use(markdownItContainer, 'title', {
        render: (tokens, idx) => {
          const token = tokens[idx];
          const info = token.info.trim().slice(5).trim(); // 去掉 'title ' 这部分
          if (token.nesting === 1) {
            // 开始标签
            return `<div class="title-text">\n`;
          } else {
            // 结束标签
            return '</div>';
          }
        }
      });

      // ::: center 容器
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

      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`; 
          return htmlResult;
      }

    },
    container: {
      tipLabel: '\n',
      warningLabel: '\n',
      dangerLabel: '\n',
      infoLabel: '\n',
      detailsLabel: '\n'
    }
  },
  // Vite 将使用现代的 Sass API，而不是即将被废弃的旧版 API
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
});