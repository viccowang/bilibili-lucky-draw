import Vue from 'vue'
import axios from './axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/font/iconfont.css'

Vue.use(ElementUI, { size: 'mini' })

export default {
  install (Vue) {
    Vue.prototype.$ajax = axios
  }
}
