---
title: ssH未更新导致更新Hexo失败
date: 2025-04-01 11:17:17
tags:
categories:
---
```js
 3 files changed, 20 insertions(+), 17 deletions(-)
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

#### 解决方法：

```
ssh-keygen -t rsa -b 4096 -C "你的邮箱地址"
```

重新在Github账号绑定本地重新生成的SSH解决此问题
