import Vue from 'vue'
import Router from 'vue-router'
import root from '@/base/rootLayer'
import index from '@/base/index'
import HelloWorld from '@/components/HelloWorld'
import proListChange from '@/base/proListChange'
import recharge from '@/base/recharge'
import withdraw from '@/base/withdraw'
import bankCard from '@/base/bankCard'

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
          path:'/hello',
          name:'HelloWorld',
          component:HelloWorld
        },

      ]
    }
  ]
})
