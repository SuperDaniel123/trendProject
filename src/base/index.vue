<template>
  <div class="index">
      <div class="content">
          <!-- <keep-alive> -->
              <market v-if="this.indexStateS == 0"></market>
          <!-- </keep-alive> -->
          
          <keep-alive>
              <transaction v-if="this.indexStateS == 1"></transaction>
          </keep-alive>

          <keep-alive>
              <record v-if="this.indexStateS == 2"></record>
          </keep-alive>

          <keep-alive>
              <user-index v-if="this.indexStateS == 3"></user-index>
          </keep-alive>
      </div>
      <i-footer></i-footer>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import iFooter from '@/components/i-footer'
//行情
import market from '@/base/market'
//交易
import transaction from '@/base/transaction'
//记录
import record from '@/base/record'
//我的
import userIndex from '@/base/userIndex'
import {pageHeight} from '@/common/js/common.js'
export default {
    components:{
        iFooter,
        market,
        transaction,
        record,
        userIndex,
        pageHeight
    },
    computed:{
        ...mapGetters([
            'setMID',
            'indexStateS'
        ])
    },
    name:'index',
    mounted(){
        pageHeight('.content')
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
</style>
