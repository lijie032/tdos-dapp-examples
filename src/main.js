// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill';
import 'ie-placeholder'
import toastRegistry from './components/toast/index'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';//样式文件一定要引入
Vue.config.productionTip = false

Vue.use(ElementUI);


//定义全局临时变量
var momentObj = {};
Vue.prototype.getMainData = function () {
  return momentObj
}
Vue.prototype.changeMainData = function (key, val) {
  momentObj[key] = val
}


var pubKey = "";
var timer;
timer = setInterval(function () {

  var pk = document.getElementById('receiveP')
  if (pk != null) {
    pubKey = pk.innerHTML;
  }

}, 1000);
Vue.prototype.getPK = function () {
  return pubKey
}

//Use
// that.changeMainData("name","gangYong")
// that.changeMainData("old","88")
// alert(JSON.stringify(that.getMainData()));




Vue.use(toastRegistry)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})