import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/reset.css'
// import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui';
Vue.use(Element);

Vue.config.productionTip = false

new Vue({
  router,
  beforeCreate() {
    Vue.prototype.$bus = this    //安装全局事件总线，$bus 就是当前应用的vm
  },
  render: h => h(App)
}).$mount('#app')
