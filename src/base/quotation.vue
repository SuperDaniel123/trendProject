<template>
  <div class="recordList">
    <back-header :headline="headline"></back-header>
    <div class="content" style="padding-bottom:0;">
      <div class="line"></div>
      <!--线图占位-->
      <div id="echarts">
        <time-charts v-if="this.eNode.key === '0'"></time-charts>
        <geail-charts v-if="this.eNode.key !== '0'" :eindex ="this.eNode"></geail-charts>
      </div>

      <div class="timeTab">
        <checker v-model="eNode" default-item-class="check-item" selected-item-class="check-item-selected">
          <checker-item :value="item" v-for="(item, index) in timeFrame" :key="index" @on-item-click="chartsNode">{{item.value}}</checker-item>
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
import timeCharts from '@/components/timeCharts'
export default {
  name: 'recordList',
  components:{
    backHeader,
    Checker, 
    CheckerItem,
    Tab,
    TabItem,
    quotationDest,
    geailCharts,
    timeCharts
  },
  computed:{
    headline(){
      return this.codeName(this.$route.query.details) +' ' +  this.$route.query.details
    }
  },

  data () {
    return {
      buysNode:0,
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
          key: '15',
          value: '15m'
        },
        {
          key: '60',
          value: '1h'
        },
        {
          key: '1440',
          value: '日K'
        }
      ],
      eNode:{key: '0',value: '时分'}
    }
  },
  methods:{
    chartsNode(value,disabled){
      this.eNode = value
    },
    getData(index){
      this.buysNode = index;
    },
    codeName(code){
        switch(code){
            case "XAG_USD" :
                return '白银';
                break;
            case "WTICO_USD":
                return "美国原油";
                break;
            case "NZD_USD":
                return "新西兰/美元"
                break;
            case "EUR_GBP":
                return "欧元/英磅"
                break;
            case "EU50_EUR":
                return "Europe 50"
                break;
            case "FR40_EUR":
                return "France 40"
                break;
            case "NATGAS_USD":
                return "天然气"
                break;
            case "GBP_CAD":
                return "英磅/加元"
                break;
            case "AUD_CAD":
                return "澳币/加元"
                break;
            case "JP225_USD":
                return "日经指数"
                break;
            case "US30_USD":
                return "US Wall St 30"
                break;
            case "HK33_HKD":
                return "香港恒生"
                break;
            case "EUR_USD":
                return "欧元/美元"
                break;
            case "USD_CHF":
                return "美元/法郎"
                break;
            case "DE30_EUR":
                return "Germany 30"
                break;
            case "NAS100_USD":
                return "US Nas 100"
                break;
            case "UK100_GBP":
                return "UK 100"
                break;
            case "XAU_USD":
                return "黄金"
                break;
            case "SPX500_USD":
                return "SPX 500"
                break;
            default:
                return code;
        }
    },
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
