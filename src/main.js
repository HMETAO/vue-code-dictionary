import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/reset.css'
import './assets/css/globel.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font/iconfont.css'
import Element from 'element-ui'
import CodeEditor from 'bin-code-editor';
import VCalendar from 'v-calendar'; // 引入日历插件

Vue.use(VCalendar, {
  componentPrefix: 'vc',
});

Vue.use(CodeEditor);
Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  router,
  beforeCreate() {
    Vue.prototype.$bus = this    //安装全局事件总线，$bus 就是当前应用的vm
  },
  render: h => h(App)
}).$mount('#app')
