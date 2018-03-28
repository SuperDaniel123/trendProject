<template>
  <div>
      <div class="line"></div>
      <i-header :headline="headline"></i-header>
      <ul class="property" v-cloak>
          <li class="clearfix">利润：<span v-text="property.Bid"></span></li>
          <li class="clearfix">信用：<span v-text="property.Point"></span></li>
          <li class="clearfix">入金：<span v-text="property.fBalance"></span></li>
          <li class="clearfix">出金：<span v-text="property.wBalance"></span></li>
          <li class="clearfix">结余：<span v-text="property.aBalance"></span></li>
      </ul>
      <div class="recordOther">
          <h2>预存记录</h2>
          <ul class="otherTeams">
              <li class="clearfix">2018年3月5日<span>存入:1000元</span></li>
              <li class="clearfix">2018年3月5日<span>存入:1000元</span></li>
              <li class="clearfix">2018年3月5日<span>存入:1000元</span></li>
              <li class="clearfix">2018年3月5日<span>存入:1000元</span></li>
              <div class="more clearfix">
                  <router-link to="/recordList"><span>查看更多<i class="fa fa-caret-down"></i></span></router-link>
              </div>
          </ul>
      </div>
      <div class="recordOther">
          <h2>交易记录</h2>
          <ul class="otherTeams">
              <li :class="[item.state == false? 'noneStyle clearfix':'tStyle clearfix']" v-for="(item,index) in this.trecord" :key="index" @click="getShow(index)">
                  {{item.FinalTime}}<span v-text="item.Name"></span>
                  <div class="view">
                      <p class="clearfix">止损:<i v-text="item.StopLoss"></i></p>
                      <p class="clearfix">获利:<i v-text="item.TakeProfit"></i></p>
                      <p class="clearfix">库存费:<i v-text="item.OrderDeposit"></i></p>
                      <p class="clearfix">手续费:<i v-text="item.OrderFee"></i></p>
                      <p class="clearfix">买入:<i v-text="item.Quantity"></i>手</p>
                      <p class="clearfix">结果:<i v-text="item.ProfitOrLoss"></i></p>
                  </div>
              </li>
              <div class="more clearfix">
                  <router-link to="/recordList"><span>查看更多<i class="fa fa-caret-down"></i></span></router-link>
              </div>
          </ul>
      </div>
  </div>
</template>

<script>
import iHeader from '@/components/i-header'
import {timestamp} from '@/common/js/common.js'
import {mapGetters} from 'vuex'
export default {
    components:{
        iHeader,
        timestamp
    },
    computed:{
        ...mapGetters(['setMID'])
    },
    created(){
        this.userFund()
        this.getRecharge()
        
    },
    mounted(){
        this.timer()
    },
    data(){
        return{
            headline:'记录',
            property:[],
            recharge:[],
            trecord:[
        　　　　{
        　　　　　　OrderID:"6327c8be806cd0f7bd145c378768c88d",
        　　　　　　OrderSN:"L2018031616214407081",
        　　　　　　UID:"7ab783688614df64672260e773c35ecb",
        　　　　　　uCode:"001",
        　　　　　　AID:"962685f22a2f607852aa9a01e5d801b8",
        　　　　　　aName:"001",
        　　　　　　aCode:"001001",
        　　　　　　MID:"bc2229fafa8421b4a00baa27ed5b170d",
        　　　　　　IDName:"sam",
        　　　　　　LoginID:"13360312127",
        　　　　　　Code:"XAUUSD",
        　　　　　　Name:"黄金",
        　　　　　　PayType:"1", 
        　　　　　　Quantity:"1",
        　　　　　　OrderFee:"80.00",
        　　　　　　StopLoss:"1000",
        　　　　　　TakeProfit:"0",
        　　　　　　Leverage:"2",
        　　　　　　MinFluctuation:"0.01",
        　　　　　　CurrentTime:"1521188504",
        　　　　　　CurrentPrice:"1317.910",
        　　　　　　ClosePrice:"1318.937",
        　　　　　　CloseTime:"1521188998",
        　　　　　　FinalTime:"1521230400",
        　　　　　　ProfitOrLoss:"-205.40",
        　　　　　　Status:"200",
        　　　　　　OrderDeposit:"100.00",
        　　　　　　WOL:null,
                   state:false
        　　　　}
        　　]
        }
    },
    methods:{
        //个人资金
        userFund(){
            this.$ajax('/account/balance','post',{MID:this.setMID}).then(res=>{
                if(res.status != 200){
                    console.log('error!')
                    return
                }
                this.property = res.data.Data
            })
        },
        //充值记录
        getRecharge(){
            let opt ={
                MID:this.setMID,
                Page:1,
                Limit:4,
                StartTime: '2017-01-01',
                EndTime: '2017-12-30',
            }
            this.$ajax('/deposit/list','post',opt).then(res=>{
                if(res.status != 200){
                    console.log('error!')
                    return
                }
                this.recharge = res.data.Data
                console.log(this.recharge)
            })
        },
        //添加状态
        timer(){
            let elemt = this.trecord;
            for(let i = 0; i <elemt.length; i++){
                let t = timestamp(+elemt[i].FinalTime);
                elemt[i].FinalTime = t;
            }
            this.trecord = elemt
        },

        getShow(i){
            this.trecord[i].state = !this.trecord[i].state;
        }
    }



}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.line{
    .e-line;
}
.property{
    background: @white;
    padding:0.5rem 1rem;
    box-sizing: border-box;
    li{
        line-height: 2rem;
        color:@font-Sgray;
        span{
            float: right;
        }
    }
}
.recordOther{
    padding:0 1rem;
    h2{
        text-align: center;
        line-height: 2rem;
        color:@font-Lgray;
    }
    .otherTeams{
        background: @white;
        .border-radiusS;
        >li{
            position: relative;
            line-height: 3rem;
            padding:0 1rem;
            .bottomRim;
            span{
                float: right;
            }
        }
        .more{
            width:100%;
            span{
                float: right;
                line-height: 3rem;
                padding:0 1rem;
                i{
                    margin-left:0.5rem;
                    color:@blue
                }
            }
        }

        .view{
            position: absolute;
            left: 0;
            line-height:3rem;
            width:100%;
            background: @bgGray;
            display: flex;
            flex-wrap: wrap;
            p{
                width:50%;
                box-sizing: border-box;
                padding:0 0.6rem;
                background: none;
                i{
                    float: right;
                }
            }
        }

        >li.noneStyle{
            transition: all 0.2s;
            padding:0 2rem 0 1rem;
            height:3rem;
            overflow: hidden;
            background: url('../common/images/more.png') no-repeat 99% 1rem;
            background-size:1rem 1rem;
        }
        >li.tStyle{
            transition: all 0.2s;
            height:12rem;
            overflow: hidden;
            padding:0 2rem 0 1rem;
            background: url('../common/images/more.png') no-repeat 99% 1rem;
            background-size:1rem 1rem;
        }
    }
}
</style>