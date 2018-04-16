<template>
  <div class="recordList">
    <transition name="fade">
      <div class="bgshow" v-show="flag" @click="flag = false"></div>
    </transition>
    <back-header :headline="headline"></back-header>
    <div class="content" style="padding-bottom:0;">
      <div class="line"></div>
      <!--线图占位-->
      <div id="echarts">
        <time-charts v-if="this.eNode.key === '0'" ></time-charts>
        <geail-charts v-if="this.eNode.key !== '0'" :eindex ="this.eNode"></geail-charts>
      </div>
      <div class="timeTab">
        <checker type="radio" :radio-required="true" v-model="eNode" default-item-class="check-item" selected-item-class="check-item-selected">
          <checker-item :value="item" v-for="(item, index) in timeFrame" :key="index" @on-item-click="chartsNode">{{item.value}}</checker-item>
        </checker>
      </div>
      <div class="line"></div>

      <div class="buyTeams">
        <div class="buttonTeams">
            <button @click="getData(0)">买入</button>
            <button @click="getData(1)">卖出</button>
        </div>
        <transition name="fadeDown">
          <div class="dealDetails" v-if="flag">
            <h2>{{buysNode == 0? '买入':'卖出'}}<i class="fa fa-close" @click="flag = false"></i></h2>
            <quotation-dest :deal="this.buysNode" :real="this.realPrice"></quotation-dest>
          </div>
        </transition>

          

      </div>
      
    </div>
  </div>
</template>

<script>
import backHeader from '@/components/back-header'
import quotationDest from '@/components/quotationDest'
import { Checker, CheckerItem} from 'vux'
import geailCharts from '@/components/grailCharts'
import timeCharts from '@/components/timeCharts'
export default {
  name: 'recordList',
  components:{
    backHeader,
    Checker, 
    CheckerItem,
    quotationDest,
    geailCharts,
    timeCharts
  },
  computed:{
    headline(){
      return this.codeName(this.$route.query.details) +' ' +  this.$route.query.details
    },
  },
  created(){
    this.wsCurrPriceReal()
  },
  beforeDestroy(){
    this.wsCurr2.close();
  },
  data () {
    return {
      buysNode:null,
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
      eNode:{key: '0',value: '时分'},
      wsCurr2:'',
      //现价
      realPrice:'',
      flag:false
    }
  },
  
  methods:{
      chartsNode(value,disabled){
        this.eNode = value
      },
      getData(index){
        this.buysNode = index;
        this.flag = true
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
      wsCurrPriceReal(){	//初始化端口连接-DONE
        this.wsCurr2 = new WebSocket('ws://price.fa513.cn:16888/');	//ws://mid.price.fcczq.com:16888
        this.wsCurr2.onmessage = (e)=>{            
            let data = eval("("+e.data+")");
            if(data['sendid']){
                this.wsCurr2.send('{"senDd":"'+data['sendid']+'"}');
            }
            if(!data.hasOwnProperty('Code')){
                return;
            }
            if(data.Code == this.$route.query.details){
                this.realPrice = data['Ask']
            }
        }
        this.wsCurr2.onerror = () => {
            console.log("Error!!");
        };
      }
  }
}
</script>

<style lang='less' scoped>
@import '../common/css/common.less';
.bgshow{
  width: 100%;
  height: 100%;
  position: fixed;
  top:0;
  left: 0;
  z-index: 998;
  background: rgba(0, 0, 0, 0.2)
}
.fade-enter-active, .fade-leave-active {
  transition:opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
#echarts{
  width:100%;
  height:42rem;
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
.buttonTeams{
  position: fixed;
  bottom: 0;
  width:100%;
  display: flex;
  button{
    flex: 1;
    line-height: 3.5rem;
    color:@white;
    font-size:@font1-25;
  }
  button:nth-of-type(1){
    background: @blue;
  }
  button:nth-of-type(2){
    background: @red;
  }
}
.dealDetails{
  .topRim;
  width:100%;
  position: fixed;
  bottom: 0;
  z-index: 999;
  background: @white;
  h2{
    padding:0 0.5rem 0 1rem;
    line-height: 3rem;
    font-size:@font1-25;
    color:@font-Sgray;
    i{
      width:3rem;
      height:3rem;
      float: right;
      line-height: 3rem;
      display: inline-block;
      text-align: center;
      font-size:1.5rem;
    }
  }
}

.fadeDown-enter-active{
  animation: fade-Down 0.3s
}

.fadeDown-leave-active{
  animation: fade-Down 0.3s reverse;
}

@keyframes fade-Down{
  0%  {
      height:0;
  }
  100% {
      height:20rem;
  }
}
</style>
