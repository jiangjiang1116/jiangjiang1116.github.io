npm run 之后

先从当前项目的 node_modules/.bin 去查找可执行命令(vite)
如果没找到就去全局的 node_modules 去找可执行命令(vite)
如果还没找到就去环境变量查找
再找不到就进行报错

node_modules/.bin

![](https://raw.githubusercontent.com/jiangjiang1116/wechat-img/main/newmd/20250723143117.png?token=ALRDINADXHMSRFF44QWCXXDIQCA7E)
.sh 文件是给 Linux unix Macos 使用
.cmd 给 windows 的 cmd 使用
.ps1 给 windows 的 powerShell 使用

npm 生命周期

```js
// 以npm run dev举例
    "predev": "node prev.js",
    "dev": "node index.js",
    "postdev": "node post.js"
```

目前用过：
webpack 打包后删除之前生成的 dist
vitepress 运行生成目录
