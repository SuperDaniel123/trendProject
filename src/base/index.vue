<template>
  <div class="index">
      <div class="content">
          <keep-alive>
              <market v-if="node == 0"></market>
          </keep-alive>
          
          <keep-alive>
              <transaction v-if="node == 1"></transaction>
          </keep-alive>

          <keep-alive>
              <record v-if="node == 2"></record>
          </keep-alive>

          <keep-alive>
              <user-index v-if="node == 3"></user-index>
          </keep-alive>
          
          <!-- <router-link to="/hello">dddddd</router-link> -->
      </div>
      <i-footer @indexNode="ChildNode"></i-footer>
  </div>
</template>

<script>

import iFooter from '@/components/i-footer'
//行情
import market from '@/base/market'
//交易
import transaction from '@/base/transaction'
//记录
import record from '@/base/record'
//我的
import userIndex from '@/base/userIndex'
export default {
    components:{
        iFooter,
        market,
        transaction,
        record,
        userIndex
    },
    name:'index',
    data(){
        return{
            node:'0'
        }
    },
    methods:{
        ChildNode(node){
            this.node = node;
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
    .content{
        .getPadding;
    }
</style>
