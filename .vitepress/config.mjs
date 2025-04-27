import { defineConfig } from "vitepress";

export default defineConfig({
  head: [["link", { rel: "icon", type: "image/gif", href: "/images/dog.png" }]],
  title: 'Sinbad-Website',
  themeConfig: {
    logo: '/images/camera.png',
    siteTitle: 'Homepage',
    nav: [
      { text: "笔记", link: "/frontend/持续更新" },
      // {
      //   text: "掘金小册",
      //   items: [
      //     {
      //       // 该部分的标题
      //       // text: 'Section A Title',
      //       items: [
      //         {
      //           text: "H5 开发实战手册",
      //           link: "/juejinbook/大厂H5开发实战手册/大厂H5开发概述",
      //         },
      //         {
      //           text: "如何写出高质量的前端代码",
      //           link: "/juejinbook/如何写出高质量的前端代码/1-小册介绍",
      //         },
      //       ],
      //     },
      //   ],
      // },
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
              text: "使用docxtemplater实现前端导出word",
              link: "/frontend/使用docxtemplater实现前端导出word",
            },
            {
              text: "内存泄漏",
              link: "/frontend/内存泄漏",
            },
            {
              text: "大屏",
              link: "/frontend/大屏",
            },
            {
              text: "持续更新",
              link: "/frontend/持续更新",
            }
          ],
        },
      ]
    },
  },
});
