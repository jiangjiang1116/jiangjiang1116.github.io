---
title: cesium使用
date: 2024-06-05 17:24:33
tags:
---

# cesium 隐藏地球

需求是隐藏地球使其变成3d模型展示，效果类似如下：

![img](https://upload-images.jianshu.io/upload_images/20461764-e78129bfec291b0d.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

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

参考：[Cesium隐藏地球](https://www.jianshu.com/p/1f9c5f367620)

[cesium隐藏地球及设置默认视角及其他viewer属性设置](https://blog.csdn.net/dangga/article/details/103177741?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-103177741-blog-111313683.235%5Ev43%5Epc_blog_bottom_relevance_base2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-103177741-blog-111313683.235%5Ev43%5Epc_blog_bottom_relevance_base2&utm_relevant_index=2)

[cesium隐藏球以及大气层白圈](https://blog.csdn.net/sinat_31213021/article/details/119784202?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-119784202-blog-103177741.235^v43^pc_blog_bottom_relevance_base2&spm=1001.2101.3001.4242.1&utm_relevant_index=3)

# Cesium

Cesium概述 Cesium是一个基于JavaScript开发的WebGL三维地球和地图可视化库。它利用了现代Web技术，如HTML5、WebGL和WebAssembly，来提供跨平台和跨浏览器的三维地理空间数据可视化。Cesium的主要特点包括： 跨平台、跨浏览器：无需额外插件，即可在多种操作系统和浏览器上运行。 海量数据支持：Cesium定义了3D Tiles数据格式，支持大规模三维模型和地形数据的加载与渲染。 丰富的地图模式：支持三维、二维和哥伦布视图（2.5D），提供多种地图和地形图层选择。 交互功能：支持地址搜索、信息属性框等用户交互功能，以及全屏模型和WebVR虚拟现实体验。
