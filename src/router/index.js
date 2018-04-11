import Vue from 'vue'
import Router from 'vue-router'
// import root from '@/base/rootLayer'
// import index from ''
//预存记录
// import recordList from '@/base/recordList'
//添加产品
// import proListChange from ''
//提现
// import recharge from '@/base/recharge'
//充值
// import withdraw from '@/base/withdraw'
//银行卡列表
// import bankCard from '@/base/bankCard'
//添加银行卡
// import addCard from '@/base/addCard'
//修改密码
// import password from '@/base/changePassword'
//实名认证
// import autonym from '@/base/autonym'
//个人信息
// import personal from '@/base/personal'
//股票详情
// import quotation from '@/base/quotation'
//login
// import login from '@/base/login'

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
