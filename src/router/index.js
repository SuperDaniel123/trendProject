import Vue from 'vue'
import Router from 'vue-router'

//密码测试
import enter from '@/components/enterPassword'
import { resolve } from 'path';


Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component:resolve => require(['@/base/rootLayer'],resolve),
      children:[
        //首页
        {
          path:'/',
          name:'index',
          component:resolve => require(['@/base/index'],resolve)
        },
        {
          path:'/proListChange',
          name:'proListChange',
          component:resolve => require(['@/base/proListChange'],resolve)
        },
        {
          path:'/recharge',
          name:'recharge',
          component:resolve => require(['@/base/recharge'],resolve)
        },
        {
          path:'/withdraw',
          name:'withdraw',
          component:resolve => require(['@/base/withdraw'],resolve)
        },
        {
          path:'/bankCard',
          name:'bankCard',
          component:resolve => require(['@/base/bankCard'],resolve)
        },
        {
          path:'/addCard',
          name:'addCard',
          component:resolve => require(['@/base/addCard'],resolve)
        },
        {
          path:'/password/:id',
          name:'password',
          component:resolve => require(['@/base/changePassword'],resolve)
        },
        {
          path:'/autonym',
          name:'autonym',
          component:resolve => require(['@/base/autonym'],resolve)
        },
        {
          path:'/personal',
          name:'personal',
          component:resolve => require(['@/base/personal'],resolve)
        },
        {
          path:'/quotation',
          name:'quotation',
          component:resolve => require(['@/base/quotation'],resolve)
        },
        {
          path:'/recordList/',
          name:'recordList',
          component:resolve => require(['@/base/recordList'],resolve)
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      component:resolve => require(['@/base/login'],resolve)
    },
    {
      path:'/enter',
      component:enter
    },
    {
      path:'*',
      redirect:'/'
    }
  ]
})
