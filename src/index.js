import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'

import router from '@/router/router'
import store from '@/store/store'

import './assets/styles/test-scss.scss'

Vue.use(VueRouter)
Vue.use(Vuex)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
