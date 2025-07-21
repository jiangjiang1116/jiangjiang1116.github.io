import fs from 'node:fs';
import { parse } from '@babel/parser';
import generate from '@babel/generator';
import traverse from '@babel/traverse';
import Diff from 'deep-diff';

// 1️⃣ 读文件
const codeA = fs.readFileSync('g-d8a65e.js', 'utf8');
const codeB = fs.readFileSync('g-e218fa.js', 'utf8');

// 2️⃣ 解析成 AST
const astA = parse(codeA, { sourceType: 'module' });
const astB = parse(codeB, { sourceType: 'module' });

// 3️⃣ 把 AST 转成可 diff 的 POJO（去掉 loc 等噪音）
function astToJson(ast) {
  return JSON.parse(JSON.stringify(ast, (k, v) => (k === 'loc' ? undefined : v)));
}

// 4️⃣ 深度 diff
const diff = Diff.diff(astToJson(astA), astToJson(astB));

// 5️⃣ 输出
console.log(JSON.stringify(diff, null, 2));