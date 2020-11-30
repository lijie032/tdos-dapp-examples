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
import storage from "@/storage";

Vue.config.productionTip = false

Vue.use(ElementUI);



var momentObj = {};
Vue.prototype.getMainData = function () {
  return momentObj
}
Vue.prototype.changeMainData = function (key, val) {
  momentObj[key] = val
}

var timer;
timer = setInterval(function () {

  var pk = document.getElementById('receivePTdos')

  if (pk != null) {
    let newPk = pk.innerHTML;
    newPk = newPk.replace(/\s*/g, "");
    localStorage.setItem('myPubKeyStorage', newPk);

    var box = document.getElementById("receivePTdos")
    if (box) {
      box.parentNode.removeChild(box);
    }

  }

}, 1000);

Vue.prototype.getPK = function () {

  var pubK = localStorage.getItem('myPubKeyStorage');
  if (pubK != null) {
    return pubK
  } else {
    return ""
  }

}

Vue.prototype.getRes = function () {

  var res = document.getElementById('receivePTos-reulst')
  if (res != null) {
    let str = res.innerHTML

    var box = document.getElementById("receivePTos-reulst")
    if (box) {
      box.parentNode.removeChild(box);
    }

    return str
  } else {
    return ""
  }
}


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
