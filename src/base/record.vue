<template>
  <div>
      <loading v-if="loadFlag"></loading>
      <div class="line"></div>
      <i-header :headline="headline"></i-header>
      <!-- <ul class="property" v-cloak>
          <li class="clearfix">利润：<span v-text="property.Bid"></span></li>
          <li class="clearfix">信用：<span v-text="property.Point"></span></li>
          <li class="clearfix">入金：<span v-text="property.fBalance"></span></li>
          <li class="clearfix">出金：<span v-text="property.wBalance"></span></li>
          <li class="clearfix">结余：<span v-text="property.aBalance"></span></li>
      </ul> -->
      <div class="recordOther">
          <h2>交易记录</h2>
          <div class="noneRecord" v-if="this.trecord =='' || this.trecord.length == 0">暂无记录</div>
          <ul class="otherTeams" v-if="!this.trecord || this.trecord.length != 0">
              <li :class="[item.state == false? 'noneStyle clearfix':'tStyle clearfix']" v-for="(item,index) in this.trecord" :key="index" @click="getShow(index)">
                  {{item.CloseTime}}<span v-text="item.Name"></span>
                  <div class="view">
                        <p class="clearfix">买入价:<i v-text="item.CurrentPrice"></i></p>
                        <p class="clearfix">卖出价:<i v-text="item.ClosePrice"></i></p>
                        <p class="clearfix">止损:<i v-text="item.StopLoss"></i></p>
                        <p class="clearfix">止盈:<i v-text="item.TakeProfit"></i></p>
                        <p class="clearfix">库存费:<i v-text="0"></i></p>
                        <p class="clearfix">手续费:<i v-text="item.OrderFee"></i></p>
                        <p class="clearfix">买入:<i>{{item.Quantity}}手</i></p>
                        <p class="clearfix">获利:<i v-text="item.ProfitOrLoss"></i></p>
                  </div>
              </li>
              <div class="more clearfix">
                  <router-link :to="{path:'/recordList',query:{type:'history'}}"><span>查看更多<i class="fa fa-caret-down"></i></span></router-link>
              </div>
          </ul>
      </div>
      <div class="recordOther">
          <h2>充值记录</h2>
          <div class="noneRecord" v-if="this.recharge =='' || this.recharge.length == 0">暂无记录</div>
          <ul class="otherTeams" v-if="!this.recharge || this.recharge.length != 0">
              <li class="clearfix" v-for="(item,index) in this.recharge" :key="index">{{item.SignupTime}}<span>存入:{{item.OrderAmount}}元</span></li>
              <div class="more clearfix">
                  <router-link :to="{path:'/recordList',query:{type:'deposit'}}" ><span>查看更多<i class="fa fa-caret-down"></i></span></router-link>
              </div>
          </ul>
      </div>

      <div class="recordOther">
          <h2>提现记录</h2>
          <div class="noneRecord" v-if="this.withdraw =='' || this.withdraw.length == 0">暂无记录</div>
          <!--暂无数据测试-->
          <ul class="otherTeams" v-if="!this.withdraw || this.withdraw.length != 0">
              <li class="clearfix" v-for="(item,index) in this.withdraw" :key="index">{{item.AddTime}}<span>取出{{item.OrderAmount}}元</span></li>
              <div class="more clearfix">
                  <router-link :to="{path:'/recordList',query:{type:'withdrawal'}}"><span>查看更多<i class="fa fa-caret-down"></i></span></router-link>
              </div>
          </ul>
      </div>


  </div>
</template>

<script>
import iHeader from '@/components/i-header'
import {timestamp} from '@/common/js/common.js'
import {mapGetters} from 'vuex'
import loading from '../components/loading'
export default {
    components:{
        iHeader,
        timestamp,
        loading
    },
    computed:{
        ...mapGetters(['setMID'])
    },
    created(){
        this.userFund()
        this.getRecharge()
        this.getTrecord()
        this.getWithdraw()
        setTimeout(()=>{
            this.loadFlag = false;
        },800)
    },
    data(){
        return{
            headline:'记录',
            //个人信息
            property:[],
            //充值记录
            recharge:[],
            //提现记录
            withdraw:'',
            trecord:[],
            //loading开关
            loadFlag:true
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
                EndTime: '2018-12-30',
            }
            this.$ajax('/deposit/list','post',opt).then(res=>{
                if(res.status != 200){
                    console.log('error!')
                    return
                }
                let arr = res.data.Data
                for(let i = 0; i <arr.length ; i++){
                    let temp = arr[i]
                    temp['SignupTime'] = timestamp(temp['SignupTime'])
                }
                this.recharge = arr
            })
        },
        //提现记录
        getWithdraw(){
            let opt ={
                MID:this.setMID,
                Page:1,
                Limit:4,
                StartTime: '2017-01-01',
                EndTime: '2018-12-30',
            }
            this.$ajax('/withdrawal/list','post',opt).then(res=>{
                if(res.status != 200){
                    console.log('error!')
                    return
                }
                let arr = res.data.Data
                for(let i = 0; i <arr.length ; i++){
                    let temp = arr[i]
                    temp['AddTime'] = timestamp(temp['AddTime'])
                }

                this.withdraw = arr
            })
        },

        //交易记录
        getTrecord(){
            let opt = {
                MID:this.setMID,
                Page:1,
                Limit:4,
                StartTime: '2017-01-01',
                EndTime: '2018-12-30',
            }
            this.$ajax('/trade/history','post',opt).then(res=>{
                if(res.status != 200){
                    return
                }
                let th = 3
                if(res.data.Data.length < 3){
                    th = res.data.Data.length
                }
                let arr = []
                for(let i = 0; i < th; i++){
                    arr.push(res.data.Data[i])
                }
                this.trecord = arr
                if(this.trecord.length == '0' || !this.trecord){
                    return;
                }
                this.timer()
            })
            
        },
        //添加状态
        timer(){
            let elemt = this.trecord;
            for(let i = 0; i <elemt.length; i++){
                let t = timestamp(+elemt[i].CloseTime);
                elemt[i].CloseTime = t;
            }
            this.trecord = elemt
        },

        getShow(i){
            this.trecord[i].state = !this.trecord[i].state;
        },
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
    .noneRecord{
        width:100%;
        line-height: 3rem;
        background: @white;
        text-align: center;
        margin:0.5rem 0 2rem 0;
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
            line-height:2.25rem;
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