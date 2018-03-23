<template>
  <div class="recordList">
    <back-header :headline="headline"></back-header>
    <div class="content" style="padding-bottom:0;">
      <div class="line"></div>
      <!--线图占位-->
      <div id="echarts">
        <geail-charts></geail-charts>
      </div>

      <div class="timeTab">
        <checker v-model="frameValue" default-item-class="check-item" selected-item-class="check-item-selected">
          <checker-item :value="item" v-for="(item, index) in timeFrame" :key="index">{{item.value}}</checker-item>
        </checker>
      </div>
      <div class="line"></div>

      <div class="buyTeams">
        <tab :line-width="2" custom-bar-width="2rem" active-color="#2197e9" >
          <tab-item selected @on-item-click="getData">买入</tab-item>
          <tab-item @on-item-click="getData">卖出</tab-item>
        </tab>

        <div v-if="this.buysNode == 0">
          <quotation-dest :deal="this.buysNode"></quotation-dest>

        </div>
        <div v-if="this.buysNode == 1">
          <quotation-dest :deal="this.buysNode"></quotation-dest>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import backHeader from '@/components/back-header'
import quotationDest from '@/components/quotationDest'
import { Checker, CheckerItem, Tab, TabItem} from 'vux'
import geailCharts from '@/components/grailCharts'
export default {
  name: 'recordList',
  components:{
    backHeader,
    Checker, 
    CheckerItem,
    Tab,
    TabItem,
    quotationDest,
    geailCharts
  },
  mounted(){
    // this.$router.query.num
  },
  data () {
    return {
      headline:'美的集团',
      buysNode:0,
      frameValue:{key: '0',value: '时分'},
      timeFrame: [
        {
          key: '0',
          value: '时分'
        }, 
        {
          key: '1',
          value: '1m'
        }, 
        {
          key: '2',
          value: '15m'
        },
        {
          key: '3',
          value: '1h'
        },
        {
          key: '4',
          value: '日K'
        }
      ]
    }
  },
  methods:{
    getData(index){
      this.buysNode = index;
    }
  }
}
</script>

<style lang='less' scoped>
@import '../common/css/common.less';
#echarts{
  width:100%;
  height:30rem;
  background: @white;
}
.line{
  .e-line;
}
.timeTab{
  .topRim;
  background: @white;
  padding:0.5rem 0;
  .vux-checker-box{
    text-align: center;
    .check-item {
      border-radius: 2rem;
      margin:0 0.8rem;
      width:4rem;
      border: 1px solid @bgGray;
      line-height: 2rem;
    }
    .check-item-selected {
      transition: all 0.2s;
      border: 1px solid @blue;
      background: @blue;
      color:@white;
    }
  }
}

.buyTeams{
  background:@white;

}
</style>
