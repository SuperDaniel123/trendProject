<template>
  <div>
      <div class="line"></div>
      <i-header :headline="headline"></i-header>
      <ul class="property" v-cloak>
          <li class="clearfix">当前盈亏<span v-text="property.wolBalance"></span></li>
          <li class="clearfix">净值<span v-text="property.fBalance"></span></li>
          <li class="clearfix">预存值<span v-text="property.aBalance"></span></li>
          <li class="clearfix">可用预付款<span v-text="property.Balance"></span></li>
          <li class="clearfix">预存款比例<span v-text="scale"></span></li>
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
                        <span>{{item.CurrentPrice}}</span>
                        <!-- <span v-text="current(item.Code)" style="display:inline-block;width:4rem;"></span> -->
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
                  <li class="clearfix"><button @click="flag = true">修改止盈止损</button></li>
              </ul>
              <div class="order_edit" v-if="flag">
                  <div class="inbox">
                      <h2>{{item.Name}}<span>订单号：{{item.OrderSN}}</span></h2>
                      <ul class="editList">
                          <li>买入<span v-text="item.CurrentPrice"></span></li>
                          <li>止盈<span v-text="item.TakeProfit"></span></li>
                          <li>止损<span v-text="item.StopLoss"></span></li>
                          <li>当前盈亏<span v-text="item.WOL"></span></li>
                      </ul>
                      <ul class="amend">
                          <li>
                              修改止盈(填0为不限)：
                              <input type="number" v-model="TakeProfit" placeholder="0" />
                          </li>
                          <li>
                              修改止盈(填0为不限)：
                              <input type="number" v-model="StopLoss" placeholder="0" />
                          </li>
                      </ul>
                      <div class="buttonS">
                            <button @click="flag = false">取消</button>
                            <button @click="order_edit(item.OrderID)">完成</button>
                      </div>

                  </div>
              </div>
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
        // this.wsCurrPriceReal()
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
        // this.wsCurr2.close();
    },
    computed:{
      ...mapGetters(['setMID']),
      scale(){
          return ((this.property.fBalance / this.property.aBalance) * 100).toFixed(2) + '%'
      },
      
      
    },
    data(){
        return{
            headline:'交易',
            property:[],
            piceLine:[],
            //挂在计时器
            clock:'',
            wsCurr2:'',
            //开关
            flag:false,
            //止盈止损修改
            TakeProfit:'',
            StopLoss:''
            
            // askList:[]
        }
    },
    methods:{
        // current(code){
        //     for(let i = 0; i<this.askList.length; i++){
        //         let temp = this.askList[i]
        //         if(temp['Code'] == code){  
        //             return temp["Ask"]
        //         }
        //     }
        // },
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
                this.askList = data.Data
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
            this.userFund()
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
        },
        order_edit(id){
            let opt = {
                MID:this.setMID,
                OrderID:id,
                StopLoss:this.StopLoss == ''? 0 : this.StopLoss,
                TakeProfit:this.TakeProfit == ''? 0 : this.TakeProfit
            }
            this.$ajax('/trade/order_edit','post',opt).then(res=>{
                let data = res.data;
                if(data.ResultCD != 200){
                    alert(data.ErrorMsg)
                    return
                }
                alert('修改成功')
                this.flag = false;
                this.TakeProfit=''
                this.StopLoss=''

            })
        }
    //     wsCurrPriceReal(){	//初始化端口连接-DONE
    //         this.wsCurr2 = new WebSocket('ws://price.fa513.cn:16888/');	//ws://mid.price.fcczq.com:16888
    //         this.wsCurr2.onmessage = (e)=>{            
    //             let data = eval("("+e.data+")");
    //             if(data['sendid']){
    //                 this.wsCurr2.send('{"senDd":"'+data['sendid']+'"}');
    //             }
    //             if(!data.hasOwnProperty('Code')){
    //                 return;
    //             }
                
    //             let list = this.askList;
    //             for(let i = 0; i < list.length; i++){
    //                 if(list[i]['Code'] == data['Code']){
    //                     list.splice(i,1,data)
    //                 }
    //             }
    //             this.askList = list
               
    //         }
    //         this.wsCurr2.onerror = () => {
    //             console.log("Error!!");
    //         };
    //   }

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
                padding:0 0.5rem;
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
.order_edit{
    position: fixed;
    top:0;
    left: 0;
    z-index: 99;
    width:100%;
    height:100%;
    background:rgba(0, 0, 0, 0.5);
    .inbox{
        width:80%;
        margin:20% auto 0 auto;
        background: #fff;
        padding:0.5rem;
        .border-radiusS;
        h2{
            line-height: 3rem;
            .bottomRim;
            span{
                float: right;
            }
        }
        .editList{
            display: flex;
            .bottomRim;
            li{
                flex:1;
                text-align: center;
                padding:0.5rem 0;
                line-height: 2rem;
                span{
                    display: block;
                }
            }
        }
        .amend{
            display: flex;
            li{
                padding:1rem;
                flex: 1;
                input{
                    width:100%;
                    line-height: 2rem;
                    margin-top:0.5rem;
                    border:1px solid @bgGray;
                    text-align:center;
                }
            }
        }
        .buttonS{
            display: flex;
            button{
                flex:1;
                margin:0 0.5rem;
                line-height: 3rem;
                width:50%;
            }
        }
    }
}
</style>