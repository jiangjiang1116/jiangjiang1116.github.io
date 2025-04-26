import { defineConfig } from "vitepress";

export default defineConfig({
  head: [["link", { rel: "icon", type: "image/gif", href: "/images/dog.png" }]],
  title: 'Sinbad-Website',
  themeConfig: {
    logo: '/images/tree.jpg',
    siteTitle: 'Homepage',
    nav: [
      { text: "笔记", link: "/frontend/持续更新" },
      {
        text: "掘金小册",
        items: [
          {
            // 该部分的标题
            // text: 'Section A Title',
            items: [
              {
                text: "大厂 H5 开发实战手册",
                link: "/juejinbook/大厂H5开发实战手册/大厂H5开发概述",
              },
              {
                text: "如何写出高质量的前端代码",
                link: "/juejinbook/如何写出高质量的前端代码/1-小册介绍",
              },
            ],
          },
        ],
      },
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
              text: "iframe的嵌套使用",
              link: "/frontend/iframe的嵌套使用",
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
              text: "nginx",
              link: "/frontend/nginx",
            },
            {
              text: "Repository",
              link: "/frontend/Repository",
            },
            {
              text: "SQL学习记录",
              link: "/frontend/SQL学习记录",
            },
            {
              text: "ssH未更新导致更新Hexo失败",
              link: "/frontend/ssH未更新导致更新Hexo失败",
            },
            {
              text: "Start",
              link: "/frontend/Start",
            },
            {
              text: "update",
              link: "/frontend/update",
            },
            {
              text: "vue",
              link: "/frontend/vue",
            },
            {
              text: "webpack学习",
              link: "/frontend/webpack学习",
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
              text: "利用nginx判断登录方是PC还是H5",
              link: "/frontend/利用nginx判断登录方是PC还是H5",
            },
            {
              text: "协同编辑",
              link: "/frontend/协同编辑",
            },
            {
              text: "命令行",
              link: "/frontend/命令行",
            },
            {
              text: "大屏",
              link: "/frontend/大屏",
            },
            {
              text: "大量数据的渲染",
              link: "/frontend/大量数据的渲染",
            },
            {
              text: "持续更新",
              link: "/frontend/持续更新",
            },
            {
              text: "集群",
              link: "/frontend/集群",
            },
          ],
        },
      ],

      // 当用户位于 `config` 目录时，会显示此侧边栏
      "/juejinbook/大厂H5开发实战手册/": [
        {
          text: "Config",
          items: [
            {
              text: "动效开发 1：让它动起来",
              link: "/juejinbook/大厂H5开发实战手册/动效开发 1：让它动起来",
            },
            {
              text: "动效开发 2：聊一聊 3D",
              link: "/juejinbook/大厂H5开发实战手册/动效开发 2：聊一聊 3D",
            },
            {
              text: "动效开发 3：补间动画",
              link: "/juejinbook/大厂H5开发实战手册/动效开发 3：补间动画",
            },
            {
              text: "动效开发 4：逐帧动画",
              link: "/juejinbook/大厂H5开发实战手册/动效开发 4：逐帧动画",
            },
            {
              text: "动效开发 5：SVG 动画",
              link: "/juejinbook/大厂H5开发实战手册/动效开发 5：SVG 动画",
            },
            {
              text: "动效开发 6：动效之效",
              link: "/juejinbook/大厂H5开发实战手册/动效开发 6：动效之效",
            },
            {
              text: "响应式页面开发",
              link: "/juejinbook/大厂H5开发实战手册/响应式页面开发",
            },
            {
              text: "基础页面开发",
              link: "/juejinbook/大厂H5开发实战手册/基础页面开发",
            },
            {
              text: "大厂H5开发概述",
              link: "/juejinbook/大厂H5开发实战手册/大厂H5开发概述",
            },
            {
              text: "总结",
              link: "/juejinbook/大厂H5开发实战手册/总结",
            },
            {
              text: "滑屏应用开发",
              link: "/juejinbook/大厂H5开发实战手册/滑屏应用开发",
            },
          ],
        },
      ],
    },
  },
});
