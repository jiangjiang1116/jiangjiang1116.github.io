---
title: vue里打印台属性需要点击展开的原因
date: 2025-04-12 21:39:33
tags:
categories:
---

在vue里打印属性需要再点一下，只是因为vue为了属性值的触发和监听，自动封装getter和setter

解决办法：

Json序列化和反序列化转化成普通属性

Json.parse和Json.stringify
