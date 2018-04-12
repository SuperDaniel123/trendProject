<template>
  <div>
      <div class="line"></div>
      <i-header :headline="headline"></i-header>
      <ul class="property" v-cloak>
          <li class="clearfix">结余<span v-text="property.wolBalance"></span></li>
          <li class="clearfix">净值<span v-text="property.fBalance"></span></li>
          <li class="clearfix">预存值<span v-text="property.aBalance"></span></li>
          <li class="clearfix">可用预付款<span v-text="property.Balance"></span></li>
      </ul>
      <div class="line"></div>
      <ul class="piceLine">
          <li v-for="(item,index) in this.piceLine" :key="index" :class="[item.state == false? '':'show']" >
              <div class="basic" @click="getShow(index)">
                    <div class="title">
                        <h3 v-text="item.Name"></h3>
                        <span>买入: {{item.Quantity}}</span>
                    </div>
                    <p :class="[item.PayType == '0'? 'red':'blue']">
                        <span v-text="item.CurrentPrice"></span>
                        <span v-text="item.ClosePrice"></span>
                        <i v-if="item.PayType == '0'" class="fa fa-caret-up"></i>               
                        <i v-if="item.PayType == '1'" class="fa fa-caret-down"></i>     
                    </p>
                    <h2 :class="[item.PayType == '0'? 'ProfitOrLoss red':'ProfitOrLoss blue']" v-text=" item.WOL || '-'"></h2>
              </div>
              <ul class="more">
                  <li class="clearfix">止损<span v-text="item.StopLoss"></span></li>
                  <li class="clearfix">获利<span v-text="item.WOL || '-'"></span></li>
                  <li class="clearfix">库存量<span v-text="item.TakeProfit"></span></li>
                  <li class="clearfix">手续费<span v-text="item.OrderFee"></span></li>
                  <li class="clearfix"><button @click="closeOut(item.OrderID)">平仓</button></li>
                  
              </ul>
          </li> 
      </ul>
  </div>
</template>

<script>
import iHeader from '@/components/i-header'
import {mapGetters} from 'vuex'
import { setInterval, clearInterval } from 'timers';
export default {
    components:{
        iHeader,
    },
    created(){
        this.holder()
        this.userFund()
    },
    mounted(){
        this.clock = setInterval(()=>{
            this.holder()
        },3000)
        
    },
    beforeDestroy(){
        if(this.clock){
            clearInterval(this.clock)
        }
    },
    computed:{
      ...mapGetters(['setMID'])
    },
    data(){
        return{
            headline:'交易',
            property:[],
            piceLine:[],
            //挂在计时器
            clock:''
        }
    },
    methods:{
        getShow(id){
            this.piceLine[id].state = !this.piceLine[id].state
        },
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

        //订单数
        holder(){
            this.$ajax('/trade/holder','post',{MID:this.setMID}).then((res)=>{
                let data = res.data;
                if(!data.ResultCD){
                    console.log(data.ErrorMsg)
                    return
                }
                console.log(data)
                if(this.piceLine.length == 0 ){
                    for(let i = 0; i <data.Data.length ; i++){
                        let temp = data.Data[i];
                        temp['state'] = false;
                    }
                    this.piceLine = data.Data
                }
                else if(this.piceLine.length > 0){
                    for(let i = 0; i <data.Data.length ; i++){
                        let temp = data.Data[i];
                        for (let key in temp){
                            this.piceLine[i][key] = temp[key]
                        }
                    }
                }
            })
        },
        closeOut(id){
            let c = confirm("是否平仓?")
            if(c){
                let opt = {
                    MID:this.setMID,
                    OrderID:id
                }
                this.$ajax('/trade/order_finish','post',opt).then(res=>{
                    let data = res.data;
                    if(data.ResultCD != 200){
                        alert(data.ErrorMsg)
                        return
                    }
                    alert('成功');
                    for(let i = 0; i<this.piceLine.length; i++){
                        let temp = this.piceLine[i]
                        for(let key in temp){
                            if(temp[key] == id){
                                this.piceLine.splice(i, 1)
                            }
                        }
                    }
                    this.userFund()
                })
            }
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
.piceLine{
    background: @white;
    >li{
        
        transition: all 0.2s;
        height:6rem;
        overflow: hidden;
        .topRim;
        .basic{
            padding:0.5rem 1rem;
            position: relative;
            height:5rem;
            .bottomRim;
        }
        .title{
            h3{
                display: inline-block;
                font-size:@font1-25;
                color:@font-Lgray;
                padding-right:10px;
            }
            span{
                color:@font-Sgray;
            }
        }
        p{
            margin-top:0.5rem;
            span{
                margin-right:@font1;
            }
        }
        p.red{
            color:@red;
        }
        p.blue{
            color:@blue;
        }
    }
    .ProfitOrLoss{
        position: absolute;
        font-size:@font1-5;
        right:@font1;
        top:2rem;
    }
    .ProfitOrLoss.red{
        color:@red;
    }
    .ProfitOrLoss.blue{
        color:@blue;
    }
    .more{
        // height:6rem;
        line-height: 2rem;
        background: @bgGray;
        display: flex;
        flex-wrap:wrap;
        li{
            width:50%;
            box-sizing: border-box;
            padding:0 0.5rem;
            span{
                float: right;
            }
            button{
                width:5rem;
                height:1.8rem;
                background: @blue;
                color:@white;
                .border-radiusS;
                font-size:@font1
            }
        }
    }
    li.show{
        transition: all 0.2s;
        height:12rem;
    }

}
</style>