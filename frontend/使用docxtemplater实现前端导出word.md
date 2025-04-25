---
title: 使用docxtemplater实现前端导出word
date: 2025-03-30 15:13:01
tags:
categories:
---
具体 api 请查阅[docxtemplater 官网网站](https://docxtemplater.com/docs/)
参考依赖：

```js
"docxtemplater": "^3.31.2",
"docxtemplater-image-module-free": "^1.1.1",
"echarts": "^4.9.0",
"file-saver": "^2.0.5",
"jszip-utils": "^0.1.0",
"pizzip": "^3.1.1",
```

注意事项：

- 注意file-saver与docxtemplater版本对应关系
- 需要 word 创建模板文件
- word 模板后缀可为 doc/docx
- word 导出样式在 word 模板里进行设置（字体，加粗等）
- 需要导出图片的需要使用到 docxtemplater-image-module-free 模块

## 代码示例：

```vue
<template>
  <div>
    <button @click="exportWord">导出 Word</button>
  </div>
</template>

<script>
import docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";

export default {
  data() {
    return {
      // 模拟数据，用于填充 Word 模板
      exportData: {
        name: "张三",
        items: [
          { name: "项目1", description: "描述1", colspan: 2, rowspan: 1 },
          { name: "项目2", description: "描述2", colspan: 1, rowspan: 2 },
        ],
      },
    };
  },
  methods: {
    exportWord() {
      // 指定模板文件路径（放在 public 文件夹中）
      //注意(vue2/public，vue3/static)，如果有qiankun主子应用，请把word模板放在主应用public下
      const templatePath = "/template.docx";
      // 指定导出的文件名
      const fileName = "output.docx";

      // 使用 JSZipUtils 加载模板文件
      JSZipUtils.getBinaryContent(templatePath, (error, content) => {
        if (error) {
          throw error;
        }

        // 创建 PizZip 实例
        const zip = new PizZip(content);
        // 创建 docxtemplater 实例
        const doc = new docxtemplater().loadZip(zip);

        // 设置数据到模板
        doc.setData(this.exportData);

        try {
          // 渲染模板
          doc.render();
        } catch (error) {
          const e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
          };
          console.error(JSON.stringify({ error: e }));
          throw error;
        }

        // 生成 Word 文件
        const out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        // 保存文件
        saveAs(out, fileName);
      });
    },
  },
};
</script>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
```

## 合并单元格

[掘金链接](https://juejin.cn/post/7299354844455370764)

```
//数据需要组成：
let data = [
{name:'xiaochen',
list:[
  {'unit':'chinese',score:90},
  {'unit':'math',score:80},
]}
]
```

模板：
注意，**这里右边的表格{#list}{unit}这行是插入的**

![这是一张示例图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e6007f2f2ae498c8094ff1d920bd513~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=583&h=66&s=2712&e=webp&b=fffefe)

结果：

![这是一张示例图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/935823f8a1d741e0a61d653ca4e62607~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=585&h=64&s=1910&e=webp&b=ffffff)
