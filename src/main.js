import Vue from 'vue'
import fastclick from 'fastclick'
import VuwLozyLoad from 'vue-lazyload'

import App from './App'
import router from './router'

import '@/common/stylus/index.styl'

Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(VuwLozyLoad, {
  loading: require('@/common/images/default_pic.jpg')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
