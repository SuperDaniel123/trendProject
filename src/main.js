// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import '@/common/css/style.css'
import '@/common/font/font-awesome/css/font-awesome.min.css'
import './common/js/axios'
import store from './store'

import  { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

Vue.config.productionTip = false
FastClick.attach(document.body)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


var mid = sessionStorage.getItem('MID');

//判断登录全局守卫
router.beforeEach((to, from, next) => {
  if(to.path === '/login'){
    next()
  }else if(store.getters.isLogin == false){
    alert('请先登录')
    next('/login')
  }else{
    next();
  }
})