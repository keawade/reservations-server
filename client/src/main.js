// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import './stylus/main.styl'

import App from './App'
import router from './router'
import axios from 'axios'

const baseDomain = 'https://reservations-server.herokuapp.com/'
const baseURL = baseDomain + 'rest/'
let instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

Vue.prototype.$http = instance
Vue.prototype.$baseApi = baseURL
Vue.prototype.$baseDomain = baseDomain

Vue.use(Vuetify)
Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})
