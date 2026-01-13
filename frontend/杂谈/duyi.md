1.interact.js 库:适合低码平台编排系统，支持拖拽（可获取距离、实现层级结构交互及虚线框提示，便于元素嵌套操作）、吸附效果（能吸附到格子等目标位置）、缩放与尺寸重定义，还支持移动端双指缩放及 SVG 的缩放和吸附

2.数组的字符串索引和数值索引
```js
var array = [];
array["a"] = "hello";
array["b"] = "world";
array["c"] = "yes";
console.log(array ,array.length);//0

var arr = []
arr [0] = 2
arr ['0'] = 2
console.log(arr,arr.length);

js里数组继承于对象，用array["a"]赋值这种最后打印后是 [ a: 'hello', b: 'world', c: 'yes' ],但是解析时依然当作 空数组 处理。
用arr ['0']复制会当成索引，因为正常arr [0]赋值也是把0转成字符串"0"
```

3.随机字符串
```js
Math.random().toString(36).substr(2)

Math.random()              // → 0.7819324728534304
          .toString(36)    // → "0.jwz3d4b1i"
                   .substr(2) // → "jwz3d4b1i"
```
4.编辑距离(比较字符串最小操作数)
```js
/**
 * 最简单 Levenshtein 距离示例（浏览器 / Node 皆可运行）
 * 使用 npm i fastest-levenshtein
 */

import { distance } from 'fastest-levenshtein';

const a = 'kitten';
const b = 'sitting';

const d = distance(a, b);   // 3
console.log(`"${a}" vs "${b}" 的编辑距离 = ${d}`);
```