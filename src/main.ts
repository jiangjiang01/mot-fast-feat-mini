import { createSSRApp } from "vue";
import App from "./App.vue";
import './common/common.less';

export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
