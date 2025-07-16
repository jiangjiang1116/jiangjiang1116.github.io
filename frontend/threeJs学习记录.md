![image-20250716163912944](/images/ThreeJs.png)

1.三维世界是由一个个物体组成，比如常用的 Mesh。

每一个物体都有它的形状，也就是几何体 Geometry，还有材质 Material，比如颜色、粗糙度、金属感等等。

所有物体都有 Geometry 和 Material 这两部分。

物体可以**通过 Group 分组**，最终构成一棵树，添加到场景 Scene 中。

相机放在不同位置，看到的画面就是不一样的。

灯光 Light 

最后有一个渲染器 Renderer 负责渲染，把场景 Scene、相机 Camera、灯光 Light 这些综合渲染到 canvas 画布上。