import { defineConfig } from "vitepress";

export default defineConfig({
  themeConfig: {
    nav: [
      { text: 'note', link: '/frontend/持续更新' },
      // {
      //   text: 'Dropdown Menu',
      //   items: [
      //     {
      //       // 该部分的标题
      //       text: 'Section A Title',
      //       items: [
      //         { text: 'Section A Item A', link: '...' },
      //         { text: 'Section B Item B', link: '...' }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   text: 'Dropdown Menu',
      //   items: [
      //     {
      //       // 也可以省略标题
      //       items: [
      //         { text: 'Section A Item A', link: '...' },
      //         { text: 'Section B Item B', link: '...' }
      //       ]
      //     }
      //   ]
      // }
    ],
    sidebar: {
      // 当用户位于 `guide` 目录时，会显示此侧边栏
      '/frontend/': [
        {
          text: 'frontend',
          items: [
            { text: '持续更新', link: '/frontend/持续更新' },
            { text: '使用docxtemplater实现前端导出word', link: '/frontend/使用docxtemplater实现前端导出word' },
            { text: '大量数据渲染方案', link: '/frontend/大量数据的渲染' },
            { text: 'jmeter使用记录', link: '/frontend/jmeter使用记录' },
          ]
        },
        {
          text: 'vue',
          items: [
            { text: '控制台打印属性需点击查看的原因', link: '/frontend/vue' },
          ]
        },
        {
          text: 'webpack',
          items: [
            { text: 'webpack学习', link: '/frontend/webpack学习' },
          ]
        }
      ],

      // 当用户位于 `config` 目录时，会显示此侧边栏
      '/config/': [
        {
          text: 'Config',
          items: [
            { text: 'Index', link: '/config/' },
            { text: 'Three', link: '/config/three' },
            { text: 'Four', link: '/config/four' }
          ]
        }
      ]
    }
  }
});
