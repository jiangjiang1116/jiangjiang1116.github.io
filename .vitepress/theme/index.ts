import { h } from 'vue';
import Theme from 'vitepress/theme';
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import sign from '../components/sign.vue'; // 引入自定义的 Mark 组件
import 'viewerjs/dist/viewer.min.css'; // 引入 ViewerJS 的样式文件
import imageViewer from 'vitepress-plugin-image-viewer'; // 使用默认导入
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue'; // 引入组件
import { useRoute } from 'vitepress';

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout);
  },
  enhanceApp({ app }) {
    app.use(Antd);
    app.component('sign', sign); // 黄色划线组件
    app.component('vImageViewer', vImageViewer);// 图片预览组件
  },
  setup() {
    const route = useRoute();
    // 启用插件
    imageViewer(route);
  }
};