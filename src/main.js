import 'babel-polyfill'
import 'common/js/hack'
import Vue from 'vue'
import fastclick from 'fastclick'
import VuwLozyLoad from 'vue-lazyload'

import App from './App'
import router from './router'
import store from './store'
import 'common/stylus/index.styl'

// 生成环境注释掉
/* eslint-disable no-unused-vars */
// import VConsole from 'vconsole'
// const vConsole = new VConsole()

Vue.config.productionTip = false
fastclick.attach(document.body)

Vue.use(VuwLozyLoad, {
  loading: require('common/images/default_pic.jpg')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
