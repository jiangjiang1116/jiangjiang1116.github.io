import { h } from 'vue';
import Theme from 'vitepress/theme';
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import 'viewerjs/dist/viewer.min.css'; // 引入 ViewerJS 的样式文件
import imageViewer from 'vitepress-plugin-image-viewer'; // 使用默认导入
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import sign from './components/sign.vue';
import Gallery from './components/Gallery.vue';
import Linkcard from "./components/Linkcard.vue";
import update from "./components/update.vue";
import ArticleMetadata from "./components/ArticleMetadata.vue"
import Quote from "./components/Quote.vue"
import Card from "./components/Card.vue"
import BackToTop from './components/BackToTop.vue';
import Search from "./components/Search.vue"
import { useRoute } from 'vitepress';
// 导入链接样式
import '../styles/link.scss'
import '../styles/index.css'
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import { h } from 'vue' // h函数
// 组件
import bsz from "./components/bsz.vue";
import 'virtual:group-icons.css' //代码组样式

export default {
  ...Theme,
  Layout: () => {
     return h(Theme.Layout, null, {

      // 指定组件使用layout-bottom插槽
      'layout-bottom': () => h(bsz),

    })
  },
  enhanceApp({ app, router }) {
    app.use(Antd);
    app.component('sign', sign); // 黄色划线组件
    app.component('vImageViewer', vImageViewer);// 图片预览组件
    app.component('Gallery', Gallery);
    app.component('Linkcard', Linkcard);
    app.component('update', update);
    app.component('ArticleMetadata', ArticleMetadata);
    app.component('Quote', Quote);
    app.component('Card', Card);
    app.component('BackToTop', BackToTop);
    app.component('Search', Search);
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
      }
    }
  },
  setup() {
    const route = useRoute();
    // 启用插件
    imageViewer(route);
  }
};