import { defineConfig } from "vitepress";

export default defineConfig({
  head: [["link", { rel: "icon", type: "image/gif", href: "/images/dog.png" }]],
  title: 'Sinbad-Website',
  themeConfig: {
    logo: '/images/eraser.png',
    siteTitle: 'Homepage',
    nav: [
      { text: "笔记", link: "/frontend/持续更新" },
    ],
    sidebar: {
      // 当用户位于 `guide` 目录时，会显示此侧边栏
      "/frontend/": [
        {
          text: "frontend",
          items: [
            {
              text: "cesium使用",
              link: "/frontend/cesium使用",
            },
            {
              text: "jmeter使用记录",
              link: "/frontend/jmeter使用记录",
            },
            {
              text: "Linux操作手册",
              link: "/frontend/Linux操作手册",
            },
            {
              text: "mock-js",
              link: "/frontend/mock-js",
            },
            {
              text: "纯前端导出word:docxtemplater",
              link: "/frontend/纯前端导出word",
            },
            {
              text: "内存泄漏的原因",
              link: "/frontend/内存泄漏",
            },
            {
              text: "持续更新",
              link: "/frontend/持续更新",
            },
            {
              text: "button",
              link: "/frontend/button",
            },
            {
              text: "原生合并单元格",
              link: "/frontend/原生合并单元格",
            }
          ],
        },
        {
          text: "vue",
          items: [
            {
              text: "Object的变化侦测",
              link: "/frontend/vue/Object的变化侦测",
            }
          ],
        },
        {
          text: "HTML",
          items: [
            {
              text: "a",
              link: "/frontend/HTML/a",
            }
          ],
        },
        {
          text: "ant",
          items: [
            {
              text: "select",
              link: "/frontend/ant/select",
            }
          ],
        },
      ],
    },
  },
});
