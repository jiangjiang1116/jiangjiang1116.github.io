---
title: mock.js
date: 2023-10-13 14:46:31
tags: mock
categories: Notes
---
## Mock.js使用详解

### Mock.js实现的功能

- 支持生成随机的文本、数字、布尔值、日期、邮箱、链接、图片、颜色等。
- 对于同一个seed(默认会对某个请求生成同一个seed)，也就是说你周一mock的数据其实周五也是长这样，跟random的效果不一样，如果想seed每次都不一样就让它根据时间生成。

### Mock安装

#### cdn引用([Mock.js (mockjs.com)](http://mockjs.com/))

可以通过直接在HTML页面中引用 Mock.js 的CDN链接来使用它，而不必使用npm来下载和安装。

[预览](https://pic.imgdb.cn/item/6528f70ac458853aef340ea8.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mock.js 示例</title>
    <style>
        .input-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        .input-container input {
            margin-bottom: 10px;
        }
        .button-container {
            display: flex;
        }
        .button-container button {
            margin-right: 10px;
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/mockjs/dist/mock.min.js"></script>
</head>
<body>
    <h1>Mock.js 示例</h1>
    <div id="mock-data">
        <div class="input-container">
            <input type="text" id="name-input" placeholder="姓名">
            <input type="number" id="age-input" placeholder="年龄">
            <input type="text" id="address-input" placeholder="地址">
            <input type="email" id="email-input" placeholder="邮箱">
        </div>
        <div class="button-container">
            <button id="generate-name">生成姓名</button>
            <button id="generate-age">生成年龄</button>
            <button id="generate-address">生成地址</button>
            <button id="generate-email">生成邮箱</button>
        </div>
        <button id="clear-data">清除数据</button>
        <button id="generate-all">生成全部</button>
    </div>

    <script>
        const nameInput = document.getElementById('name-input');
        const ageInput = document.getElementById('age-input');
        const addressInput = document.getElementById('address-input');
        const emailInput = document.getElementById('email-input');
        const generateNameButton = document.getElementById('generate-name');
        const generateAgeButton = document.getElementById('generate-age');
        const generateAddressButton = document.getElementById('generate-address');
        const generateEmailButton = document.getElementById('generate-email');
        const clearDataButton = document.getElementById('clear-data');
        const generateAllButton = document.getElementById('generate-all');

        generateNameButton.addEventListener('click', () => {
            nameInput.value = Mock.mock('@cname');
        });

        generateAgeButton.addEventListener('click', () => {
            ageInput.value = Mock.mock('@integer(18,60)');
        });

        generateAddressButton.addEventListener('click', () => {
            addressInput.value = Mock.mock('@county(true)');
        });

        generateEmailButton.addEventListener('click', () => {
            emailInput.value = Mock.mock('@email');
        });

        clearDataButton.addEventListener('click', () => {
            nameInput.value = '';
            ageInput.value = '';
            addressInput.value = '';
            emailInput.value = '';
        });

        generateAllButton.addEventListener('click', () => {
            nameInput.value = Mock.mock('@cname');
            ageInput.value = Mock.mock('@integer(18,60)');
            addressInput.value = Mock.mock('@county(true)');
            emailInput.value = Mock.mock('@email');
        });
    </script>
</body>
</html>
```

#### Node下使用

```javascript
# 安装
npm install mockjs
 
     
  
// 使用 Mock
var Mock = require('mockjs')
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})
// 输出结果
console.log(JSON.stringify(data, null, 4))
```

#### RequireJS (AMD)

```javascript
// 配置 Mock 路径
require.config({
    paths: {
        mock: 'http://mockjs.com/dist/mock'
    }
})
// 加载 Mock
require(['mock'], function(Mock){
    // 使用 Mock
    var data = Mock.mock({
        'list|1-10': [{
            'id|+1': 1
        }]
    })
    // 输出结果
    document.body.innerHTML +=
        '<pre>' +
        JSON.stringify(data, null, 4) +
        '</pre>'
})
```

### 使用语法

- ```
  Mock.js
  ```

  的语法规范包括两部分

  - 数据模板定义规范
  - 数据占位符定义规范

#### 数据模板定义规范

- 数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值

```javascript
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
```

- 属性名 和 生成规则 之间用竖线 `|` 分隔
- 生成规则 是可选的
- 生成规则 有 7 种格式
  - `'name|min-max': value`
  - `'name|count': value`
  - `'name|min-max.dmin-dmax': value`
  - `'name|min-max.dcount': value`
  - `'name|count.dmin-dmax': value`
  - `'name|count.dcount': value`
  - `'name|+step': value`
- 生成规则 的 含义 需要依赖 属性值的类型 才能确定
- 属性值 中可以含有 `@`占位符
- 属性值 还指定了最终值的初始值和类型

#### 生成规则和示例

- 属性值是字符串 `String`

  - ```
    'name|min-max': string
    ```

    - 通过重复 `string`生成一个字符串，重复次数大于等于 `min`，小于等于 `max`
  - ```
    'name|count': string
    ```

    - 通过重复 `string`生成一个字符串，重复次数等于 `count`。
- 属性值是数字 `Number`

  - ```
    'name|+1': number
    ```

    - 属性值自动加 `1`，初始值为 `number`
  - ```
    'name|min-max': number
    ```

    - 生成一个大于等于 `min`、小于等于 `max`的整数，属性值 `number` 只是用来确定类型
  - ```
    'name|min-max.dmin-dmax': number
    ```

    - 生成一个浮点数，整数部分大于等于 `min`、小于等于 `max`，小数部分保留 `dmin` 到 `dmax` 位

```javascript
Mock.mock({
    'number1|1-100.1-10': 1,
    'number2|123.1-10': 1,
    'number3|123.3': 1,
    'number4|123.10': 1.123
})
// =>
{
    "number1": 12.92,
    "number2": 123.51,
    "number3": 123.777,
    "number4": 123.1231091814
}  
```

- 属性值是布尔型 `Boolean`

  - ```
    'name|1': boolean
    ```

    - 随机生成一个布尔值，值为 `true` 的概率是 `1/2`，值为 `false` 的概率同样是 `1/2`
  - ```
    'name|min-max': value
    ```

    - 随机生成一个布尔值，值为 `value` 的概率是 `min / (min + max)`，值为 `!value`的概率是 `max / (min + max)`\
- 属性值是对象 `Object`

  - ```
    'name|count': object
    ```

    - 从属性值 `object`中随机选取 `count`个属性
  - ```
    'name|min-max': object
    ```

    - 从属性值 `object`中随机选取 `min` 到 `max` 个属性
- 属性值是数组 `Array`

  - ```
    'name|1': array
    ```

    - 从属性值 `array` 中随机选取 `1`个元素，作为最终值
  - ```
    'name|+1': array
    ```

    - 从属性值 `array`中顺序选取 `1` 个元素，作为最终值
  - ```
    'name|min-max': array
    ```

    - 通过重复属性值 `array` 生成一个新数组，重复次数大于等于 `min`，小于等于 `max`
  - ```
    'name|count': array
    ```

    - 通过重复属性值 `array`生成一个新数组，重复次数为 `count`
- 属性值是函数 `Function`

  - ```
    'name': function
    ```

    - 执行函数 `function`，取其返回值作为最终的属性值，函数的上下文为属性 `'name'` 所在的对象
- 属性值是正则表达式 `RegExp`

  - ```
    'name': regexp
    ```

    - 根据正则表达式 `regexp` 反向生成可以匹配它的字符串。用于生成自定义格式的字符串

```javascript
Mock.mock({
    'regexp1': /[a-z][A-Z][0-9]/,
    'regexp2': /\w\W\s\S\d\D/,
    'regexp3': /\d{5,10}/
})
// =>
{
    "regexp1": "pJ7",
    "regexp2": "F)\fp1G",
    "regexp3": "561659409"
}   
```

#### 数据占位符定义规范

> 占位符,只是在属性值字符串中占个位置，并不出现在最终的属性值中

- 占位符 的格式为

```javascript
@占位符
@占位符(参数 [, 参数])  
```

- 用 `@`来标识其后的字符串是 占位符
- 占位符 引用的是 `Mock.Random` 中的方法
- 通过 `Mock.Random.extend()` 来扩展自定义占位符
- 占位符 也可以引用 数据模板 中的属性
- 占位符 会优先引用 数据模板 中的属性
- 占位符 支持 相对路径 和 绝对路径

```javascript
Mock.mock({
    name: {
        first: '@FIRST',
        middle: '@FIRST',
        last: '@LAST',
        full: '@first @middle @last'
    }
})
// =>
{
    "name": {
        "first": "Charles",
        "middle": "Brenda",
        "last": "Lopez",
        "full": "Charles Brenda Lopez"
    }
}   
```

### Mock.mock()

#### Mock.mock( template )

- 根据数据模板生成模拟数据

```html
<!-- （必选）加载 Mock -->
<script src="http://mockjs.com/dist/mock.js"></script>
 
     
  
// Mock.mock( template )
var template = {
    'title': 'Syntax Demo',

    'string1|1-10': '★',
    'string2|3': 'value',

    'number1|+1': 100,
    'number2|1-100': 100,
    'number3|1-100.1-10': 1,
    'number4|123.1-10': 1,
    'number5|123.3': 1,
    'number6|123.10': 1.123,

    'boolean1|1': true,
    'boolean2|1-2': true,

    'object1|2-4': {
        '110000': '北京市',
        '120000': '天津市',
        '130000': '河北省',
        '140000': '山西省'
    },
    'object2|2': {
        '310000': '上海市',
        '320000': '江苏省',
        '330000': '浙江省',
        '340000': '安徽省'
    },

    'array1|1': ['AMD', 'CMD', 'KMD', 'UMD'],
    'array2|1-10': ['Mock.js'],
    'array3|3': ['Mock.js'],

    'function': function() {
        return this.title
    }
}
var data = Mock.mock(template)

$('<pre>').text(JSON.stringify(data, null, 4))
    .appendTo('body')
 
     
  
//res
{
    "title": "Syntax Demo",
    "string1": "★★★",
    "string2": "valuevaluevalue",
    "number1": 100,
    "number2": 48,
    "number3": 99.05,
    "number4": 123.6,
    "number5": 123.516,
    "number6": 123.1236370317,
    "boolean1": false,
    "boolean2": true,
    "object1": {
        "120000": "天津市",
        "130000": "河北省"
    },
    "object2": {
        "320000": "江苏省",
        "330000": "浙江省"
    },
    "array1": "KMD",
    "array2": [
        "Mock.js"
    ],
    "array3": [
        "Mock.js",
        "Mock.js",
        "Mock.js"
    ],
    "function": "Syntax Demo"
} 
```

#### Mock.mock( rurl, template )

- 记录数据模板。当拦截到匹配 `rurl` 的 `Ajax` 请求时，将根据数据模板 `template`生成模拟数据，并作为响应数据返回

```html
<!-- （必选）加载 Mock -->
<script src="http://mockjs.com/dist/mock.js"></script>
 
     
  
// Mock.mock(rurl, template)
Mock.mock(/\.json/, {
    'list|1-10': [{
        'id|+1': 1,
        'email': '@EMAIL'
    }]
})
$.ajax({
    url: '1.json',
    dataType: 'json'
}).done(function(data, status, jqXHR){
    $('<pre>').text(JSON.stringify(data, null, 4))
        .appendTo('body')
})
 
     
  
{
    "list": [
        {
            "id": 1,
            "email": "k.sejuwxvego@xcwc.中国互联.公司"
        },
        {
            "id": 2,
            "email": "f.hjns@rhivyrvhpb.ve"
        },
        {
            "id": 3,
            "email": "g.bdwuuhm@czoybmyp.ms"
        },
        {
            "id": 4,
            "email": "n.tkgs@javvkxz.bf"
        }
    ]
}  
```

#### Mock.mock( rurl, function( options ) )

- 记录用于生成响应数据的函数。当拦截到匹配 `rurl` 的 `Ajax` 请求时，函数 `function(options)`将被执行，并把执行结果作为响应数据返回

```javascript
// Mock.mock(rurl, function(options))
Mock.mock(/\.json/, function(options) {
    return options
})
$.ajax({
    url: 'hello.json',
    dataType: 'json'
}).done(function(data, status, jqXHR) {
    $('<pre>').text(JSON.stringify(data, null, 4))
        .appendTo('body')
})
$.ajax({
    url: 'hello.json',
    dataType: 'json',
    data: {
        foo: 1,
        bar: 2,
        faz: 3
    }
}).done(function(data, status, jqXHR) {
    $('<pre>').text(JSON.stringify(data, null, 4))
        .appendTo('body')
})
$.ajax({
    url: 'hello.json',
    type: 'post',
    dataType: 'json',
    data: {
        foo: 1,
        bar: 2,
        faz: 3
    }
}).done(function(data, status, jqXHR) {
    $('<pre>').text(JSON.stringify(data, null, 4))
        .appendTo('body')
})

 

  
{
    "url": "hello.json?foo=1&bar=2&faz=3",
    "type": "GET",
    "body": null
}
{
    "url": "hello.json",
    "type": "GET",
    "body": null
}
{
    "url": "hello.json",
    "type": "POST",
    "body": "foo=1&bar=2&faz=3"
}  
```

#### Mock.setup()

- ```
  Mock.setup( settings )
  ```

  - 配置拦截 `Ajax` 请求时的行为。支持的配置项有：`timeout`

> 指定被拦截的 `Ajax` 请求的响应时间，单位是毫秒。值可以是正整数，例如 `400`，表示 `400` 毫秒 后才会返回响应内容；也可以是横杠 `'-'` 风格的字符串，例如 `'200-600'`，表示响应时间介于 `200` 和 `600` 毫秒之间。默认值是 `'10-100'`

```javascript
Mock.setup({
    timeout: 400
})
Mock.setup({
    timeout: '200-600'
})
```

- 目前，接口 `Mock.setup( settings )`仅用于配置 `Ajax` 请求

#### Mock.Random

- `Mock.Random` 是一个工具类，用于生成各种随机数据
- `Mock.Random`的方法在数据模板中称为『占位符』，书写格式为 `@`占位符(参数 [, 参数])

```javascript
var Random = Mock.Random
Random.email()
// => "n.clark@miller.io"
Mock.mock('@email')
// => "y.lee@lewis.org"
Mock.mock( { email: '@email' } )
// => { email: "v.lewis@hall.gov" } 
```

## 简单构建一套mock-server

> 为了更好的分工合作，让前端能在不依赖后端环境的情况下进行开发，其中一种手段就是为前端开发者提供一个 web 容器，这个本地环境就是 mock-server

**一个比较好的 mock-server 该有的能力**

- 与线上环境一致的接口地址，每次构建前端代码时不需要修改调用接口的代码
- 所改即所得，具有热更新的能力，每次增加修改 `mock` 接口时不需要重启 `mock` 服务，更不用重启前端构建服务
- 能配合 `Webpack`
- `mock` 数据可以由工具生成不需要自己手动写
- 能模拟 `POST`、`GET` 请求

**搭建主要思路**

> 以 `json-server` 作为 `mock` 服务器， `mock.js` 生成 `mock` 数据，利用 `gulp + nodemon + browser-sync` 监听 `mock`文件的改动重启 `node` 服务，刷新浏览器，以此达到一种相对完美的 `mock-server`要求

### json-server 搭配 mock.js

- 这里以 `Webpack` 的前端工程为例

```javascript
cnpm install json-server mockjs --save
```

- 在项目根目录新建 `mock`文件夹，新建 `mock/db.js` 作为 `mock` 数据源，`mock/server.js`作为 `mock` 服务，`mock/routes.js`重写路由表

```javascript
var Mock = require('mockjs');

module.exports = {
  getComment: Mock.mock({
    "error": 0,
    "message": "success",
    "result|40": [{
      "author": "@name",
      "comment": "@cparagraph",
      "date": "@datetime"
    }]
  }),
  addComment: Mock.mock({
    "error": 0,
    "message": "success",
    "result": []
  })
};  
```

- 这里我们利用 `mock.js` 生成 `mock` 数据，可以尽可能的还原真实数据，还可以减少数据构造的复杂度

```javascript
// routes.js
module.exports = {
  "/comment/get.action": "/getComment",
  "/comment/add.action": "/addComment"
}

// server.js
const jsonServer = require('json-server')
const db = require('./db.js')
const routes = require('./routes.js')
const port = 3000;

const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()
const rewriter = jsonServer.rewriter(routes)

server.use(middlewares)
// 将 POST 请求转为 GET
server.use((request, res, next) => {
  request.method = 'GET';
  next();
})

server.use(rewriter) // 注意：rewriter 的设置一定要在 router 设置之前
server.use(router)

server.listen(port, () => {
  console.log('open mock server at localhost:' + port)
})
  
```

- 启动服务

```javascript
$ node mock/server.js
```

- 打开 `http://localhost:3000/comment/get.action`即可查看到我们想要的数据

![img](https://s.poetries.work/uploads/2022/05/970a371380180edd.png)

> 是不是这样就算搭建完了我们的 `mock-server` ？不，并没有。我们可以尝试修改一下 `db.js` 的文件内容，刷新浏览器发现 `mock` 数据并没有像我们想象的那样修改。那也就是说每次当我们需要添加 /修改 `mock` 数据使都需要重启一次 `mock` 服务

### 端口代理

> 通过 `Webpack` 配置 `proxy` 代理

```javascript
module.exports = {
  
  devServer: {  
    //其实很简单的，只要配置这个参数就可以了  
    proxy: {  
      '/api/': {  
        target: 'http://localhost:3000',
  	    changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  } 
}
```

- 接着在代码里进行 `ajax`请求就可以写成，这里以 `axios` 为例子

```javascript
function getComments () {
  axios.get('api/comment/get.action', {}).then((res) => {
    console.log(res.data)
  })
}
```

### 文件改动自动刷新

> 我们希望更改 `mock`文件能和 `webpack` 热更新一样，所改即所得。这里我使用了 `nodemon`，利用 `gulp` 建立自动执行的任务。

```javascript
cnpm install gulp gulp-nodemon browser-sync --save 
  
// gulpfile.js 的代码如下
onst path = require('path');
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();
const server = path.resolve(__dirname, 'mock');

// browser-sync 配置，配置里启动 nodemon 任务
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:8080", // 这里的端口和 webpack 的端口一致
    port: 8081
  });
});

// browser-sync 监听文件
gulp.task('mock', ['browser-sync'], function() {
  gulp.watch(['./mock/db.js', './mock/**'], ['bs-delay']);
});

// 延时刷新
gulp.task('bs-delay', function() {
  setTimeout(function() {
    browserSync.reload();
  }, 1000);
});

// 服务器重启
gulp.task('nodemon', function(cb) {
  // 设个变量来防止重复重启
  var started = false;
  var stream = nodemon({
    script: './mock/server.js',
    // 监听文件的后缀
    ext: "js",
    env: {
      'NODE_ENV': 'development'
    },
    // 监听的路径
    watch: [
      server
    ]
  });
  stream.on('start', function() {
    if (!started) {
      cb();
      started = true;
    }
  }).on('crash', function() {
    console.error('application has crashed!\n')
    stream.emit('restart', 10)
  })
});
 
     
  
```

- 这样以后我们在构建我们 `Webpack` 工程时只需要先执行 `npm run dev`
- 之后新建 `terminal` 执行 `gulp mock`
- 就可以搭建一个随改随变的 `mock-server` 环境

**完整的代码详情** https://github.com/poetries/mock-server
