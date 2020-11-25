// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill';
import 'ie-placeholder'
Vue.config.productionTip = false

import wasm from '@/contracts/welfare.wasm'
import json from '@/contracts/welfare.abi.json'
import sourceMap from '@/contracts/welfare.wasm.map'
import { deployOnce } from '@/api/deploy'

deployOnce()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
