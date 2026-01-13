![image-20250716163912944](/images/ThreeJs.png)

1.三维世界是由一个个物体组成，比如常用的 Mesh。

每一个物体都有它的形状，也就是几何体 Geometry，还有材质 Material，比如颜色、粗糙度、金属感等等。

所有物体都有 Geometry 和 Material 这两部分。

物体可以**通过 Group 分组**，最终构成一棵树，添加到场景 Scene 中。

相机放在不同位置，看到的画面就是不一样的。

灯光 Light 

最后有一个渲染器 Renderer 负责渲染，把场景 Scene、相机 Camera、灯光 Light 这些综合渲染到 canvas 画布上。

2.坐标轴**红绿蓝分别对应 x、y、z 轴**

3.临时调试工具dat.gui，刷新后消失，适用于调整位置之类属性

4.Draco**压缩模型**

4.高亮与染色范围不同原因：

高亮更细致

高亮（OutlinePass）靠的是**屏幕后处理**，几何合不合并无所谓；
染色（改材质）靠的是**Mesh 级别**的操作，几何没分开就会整片变色。
想让染色也能“指哪打哪”，要么在建模阶段就把零件拆成独立 Mesh / 材质槽，要么在代码里做三角形级或贴图级细分。

5.3D 场景中点击的实现是基于射线 Ray。

6.高亮描边

```js
outlinePass.visibleEdgeColor.set('blue');
outlinePass.edgeStrength = 20;
outlinePass.edgeThickness = 10;
outlinePass.pulsePeriod = 1;

edgeStrength 强度，影响描边是否明显

edgeThickness 边缘厚度

pulsePeriod 闪烁周期，单位是秒

visibleEdgeColor 描边颜色
```

7.css2d-annotation实现标注，css3d-annotation实现标注面向随视角变化

8.https://threejs.org/editor/官方编辑器

