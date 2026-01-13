---
title: cesium使用
date: 2024-06-05 17:24:33
tags:
---

# cesium 隐藏地球

需求是隐藏cesium初始化的地球

代码如下：

要改的设置有天空盒（太空星星），天空大气，太阳月亮，地球本体（也可以把地球本体改变颜色）

```js
viewer.scene.sun.show = false; //在Cesium1.6(不确定)之后的版本会显示太阳和月亮，不关闭会影响展示
viewer.scene.moon.show = false;
viewer.scene.skyBox.show = false;//关闭天空盒，否则会显示天空颜色，例如星星

viewer.scene.undergroundMode = true; //重要，开启地下模式，设置基色透明，这样就看不见黑色地球了
viewer.scene.underGlobe.show = true;
viewer.scene.underGlobe.baseColor = new Cesium.Color(0, 0, 0, 0);
viewer.scene.globe.show = false; //不显示地球，这条和地球透明度选一个就可以
viewer.scene.globe.baseColor = new Cesium.Color(0, 0, 0, 0);
viewer.scene.backgroundcolor = new Cesium.Color(0, 0, 0, 0);

viewer.scene.skyAtmosphere.show=false;// 隐藏天空大气
```

参考：

[Cesium隐藏地球](https://www.jianshu.com/p/1f9c5f367620)

[cesium隐藏地球及设置默认视角及其他viewer属性设置](https://blog.csdn.net/dangga/article/details/103177741?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-103177741-blog-111313683.235%5Ev43%5Epc_blog_bottom_relevance_base2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-103177741-blog-111313683.235%5Ev43%5Epc_blog_bottom_relevance_base2&utm_relevant_index=2)

[cesium隐藏球以及大气层白圈](https://blog.csdn.net/sinat_31213021/article/details/119784202?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-119784202-blog-103177741.235^v43^pc_blog_bottom_relevance_base2&spm=1001.2101.3001.4242.1&utm_relevant_index=3)

