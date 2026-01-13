---
title: 工具使用教程&工作记录
date: 2023-09-21T11:02:48+08:00
tags: 工具
categories: 测试
comment: false
hidden: true
---
压力测试工具Java：{% link 【jmeter教程——从入门到熟练】 https://blog.csdn.net/weixin_45014379/article/details/124190381 %}</br>
接口测试工具：{% link 全网最全的 postman 工具使用教程 https://zhuanlan.zhihu.com/p/401385193 %}</br>
可用示例：{% link JSON API免费接口 https://www.bejson.com/knownjson/webInterface/ %}</br>

## 关于接口联调
1.一个接口需要经过数据库（Navicat）插入，其中要根据文档来插入数据并且写好表与表之间的关联关系（con_table与con_sql）;
2.接口要过内部路由通过postman测试，其中特高压的入参由start_date&end_date改为了create_time与update_time,由两个参数确定一个区间改为两个参数各确定两个区间；
3.业务连接组件配置，设置好权限；
4.加解密测试接口(Java程序)；

