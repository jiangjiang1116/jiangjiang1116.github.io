node_modules 扁平化 首字母排序abcd 广度优先遍历

扁平化是理想态，理想下ab依赖都用到c1.0,c1.0扁平在第一层，则实现复用
实际上 a-c1.0 b-c1.2 出现依赖冗杂，会b再搞一层node_modules

npm install执行后发生的动作：
![](https://raw.githubusercontent.com/jiangjiang1116/wechat-img/main/newmd/0570bf4581f74a9790bb86567b889e68%7Etplv-k3u1fbpfcp-zoom-in-crop-mark%3A1512%3A0%3A0%3A0.awebp?token=ALRDING2FLXAW7DZJVHVBDTIQB7LI)

npmrc的一个配置参考
```js
registry=http://registry.npmjs.org/
# 定义npm的registry，即npm的包下载源

proxy=http://proxy.example.com:8080/
# 定义npm的代理服务器，用于访问网络

https-proxy=http://proxy.example.com:8080/
# 定义npm的https代理服务器，用于访问网络

strict-ssl=true
# 是否在SSL证书验证错误时退出

cafile=/path/to/cafile.pem
# 定义自定义CA证书文件的路径

user-agent=npm/{npm-version} node/{node-version} {platform}
# 自定义请求头中的User-Agent

save=true
# 安装包时是否自动保存到package.json的dependencies中

save-dev=true
# 安装包时是否自动保存到package.json的devDependencies中

save-exact=true
# 安装包时是否精确保存版本号

engine-strict=true
# 是否在安装时检查依赖的node和npm版本是否符合要求

scripts-prepend-node-path=true
# 是否在运行脚本时自动将node的路径添加到PATH环境变量中

```
### package-lock.json 的作用
name + version + integrity 信息生成一个唯一的key，这个key能找到对应的index-v5 下的缓存记录 也就是npm cache 文件夹下的

![](https://raw.githubusercontent.com/jiangjiang1116/wechat-img/main/newmd/0023c0c4cbd248ae96d99f7f577e5680%7Etplv-k3u1fbpfcp-zoom-in-crop-mark%3A1512%3A0%3A0%3A0.awebp?token=ALRDINCTCMWA53FXGSUFNE3IQB74Q)