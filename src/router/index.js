import Vue from 'vue'
import Router from 'vue-router'
import root from '@/base/rootLayer'
import index from '@/base/index'
//预存记录
import recordList from '@/base/recordList'
//添加产品
import proListChange from '@/base/proListChange'
//提现
import recharge from '@/base/recharge'
//充值
import withdraw from '@/base/withdraw'
//银行卡列表
import bankCard from '@/base/bankCard'
//添加银行卡
import addCard from '@/base/addCard'
//修改密码
import password from '@/base/changePassword'
//实名认证
import autonym from '@/base/autonym'
//个人信息
import personal from '@/base/personal'
//股票详情
import quotation from '@/base/quotation'
//login
import login from '@/base/login'


Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: root,
      children:[
        //首页
        {
          path:'/',
          name:'index',
          component:index
        },
        {
          path:'/proListChange',
          name:'proListChange',
          component:proListChange
        },
        {
          path:'/recharge',
          name:'recharge',
          component:recharge
        },
        {
          path:'/withdraw',
          name:'withdraw',
          component:withdraw
        },
        {
          path:'/bankCard',
          name:'bankCard',
          component:bankCard
        },
        {
          path:'/addCard',
          name:'addCard',
          component:addCard
        },
        {
          path:'/password',
          name:'password',
          component:password
        },
        {
          path:'/autonym',
          name:'autonym',
          component:autonym
        },
        {
          path:'/personal',
          name:'personal',
          component:personal
        },
        {
          path:'/quotation',
          name:'quotation',
          component:quotation
        },
        {
          path:'/recordList',
          name:'recordList',
          component:recordList
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      component:login
    }
  ]
})
