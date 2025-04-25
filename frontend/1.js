const fs = require('fs');
const path = require('path');

// 指定要遍历的目录
const directoryPath = path.join(__dirname, '../juejinbook/大厂H5开发实战手册');

// 用于存储结果的数组
let result = [];

// 读取目录
fs.readdir(directoryPath, function (err, files) {
    // 处理错误
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    // 处理文件列表
    files.forEach(function (file) {
        // 检查文件是否是 Markdown 文件
        if (path.extname(file) === '.md') {
            // 移除文件扩展名
            let name = path.basename(file, '.md');
            // 添加到结果数组
            result.push({
                text: name,
                link: '/juejinbook/大厂H5开发实战手册/' + name
            });
        }
    });
    // 输出结果
    console.log(JSON.stringify(result, null, 2));
});
