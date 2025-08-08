// .vitepress/theme/index.ts
import { h } from 'vue';
import Theme from 'vitepress/theme';
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import sign from '../components/sign.vue'; // 引入自定义的 Mark 组件

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout);
  },
  enhanceApp({ app }) {
    app.use(Antd);
    app.component('sign', sign); // 黄色划线组件
  }
};