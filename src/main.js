import Vue from 'vue'
import App from './App.vue'
import injector from '@/plugins/injector'

Vue.config.productionTip = false
// 注入自定义组件和方法
Vue.use(injector)

new Vue({
  render: h => h(App),
}).$mount('#app')
