 [分层模型和应用协议](1.分层模型和应用协议)<br>
 [浏览器的通信能力](2.浏览器的通信能力)<br>
 [跨域问题和解决方案](3.跨域问题和解决方案)<br>
::: details live server /page/index.html 路径能访问，是否存在文件夹对应路径?
不一定，程序决定
:::

rest client<br/>
url 最后的"/":浏览器最后/现在都是自动处理，性能区别也几乎不计

301
```http
GET / HTTP/1.1
Host: www.douyutv.com
```
::: details 301与302区别
搬家，301永久重定向，302临时重定向
:::

```http
POST /api/user/login HTTP/1.1
Host: study.duyiedu.com
Content-Type: application/
x-www-form-urlencoded

{
    "loginId:"admin1",
    "loginPwd":"123"
}
```

::: info
请求行 Line<br>
请求头 Header<br>
空行<br>
请求体 Body<br>
注意 rest client 的回车空行必须有（？）<br>
空行（Blank Line）

请求头和请求体之间必须有一个空行（即一个换行符 \n 或 \r\n）。这个空行表示请求头的结束，请求体的开始。
rest client vscode里写二进制可以直接用< ./1.png
:::
![](/images/markdown/http.png)

::: info MIME 格式
这里的 x/y 是 MIME 格式 ，有
application/x-www-form-urlencoded<br/>
image/png<br/>
image/gif<br/>
text/plain<br/>
text/css<br/>
application/javascript<br/>
application/json
:::

::: info base64
二进制文件（图片等）转字符串,转换耗时,消耗带宽，blob本质二进制
:::

```html
content-Type: multipart/form-data;boundary = aaa //分隔符
```