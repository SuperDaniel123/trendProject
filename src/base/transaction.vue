<template>
  <div>
      <loading v-if="loadFlag"></loading>
      <div class="line"></div>
      <i-header :headline="headline"></i-header>
      <ul class="property" v-cloak>
          <li class="clearfix">当前盈亏<span v-text="property.wolBalance"></span></li>
          <li class="clearfix">预存款<span v-text="property.fBalance"></span></li>
          <li class="clearfix">净值<span v-text="(((+property.Balance * 100) + (+property.wolBalance * 100)) / 100).toFixed(2)"></span></li>
          <li class="clearfix">余额<span v-text="property.Balance"></span></li>
          <li class="clearfix">预存款比例<span v-text="scale"></span></li>
      </ul>
      <div class="line"></div>
      <div v-if="this.piceLine.length == 0" class="notMore">暂无数据</div>
      <ul class="piceLine">
          <li v-for="(item,index) in this.piceLine" :key="index" :class="[showList[index] == false? '':'show']" >
              <div class="basic" @click="getShow(index)">
                    <div class="title">
                        <h3 v-text="item.Name"></h3>
                        <span>{{item.PayType == 0?'买入':'卖出'}}:{{item.Quantity}}</span>
                    </div>
                    <p :class="[+item.ProfitOrLoss > 0? 'red':'blue']">
                        <span>{{item.CurrentPrice}}</span>
                        <i class="fa fa-angle-right" style=" color:#999;"></i>
                        <span v-text="currentPice(item.Code,item.PayType)"></span>
                        <i v-if="iCon(item.ProfitOrLoss)" class="fa fa-caret-up"></i>               
                        <i v-if="!iCon(item.ProfitOrLoss)" class="fa fa-caret-down"></i>     
                    </p>
                    <h2 :class="[+item.ProfitOrLoss > 0? 'ProfitOrLoss red':'ProfitOrLoss blue']">{{item.WOL || '-'}}</h2>
              </div>
              <ul class="more">
                  <li class="clearfix">止盈:<span v-text="item.TakeProfit"></span></li>
                  <li class="clearfix">止损:<span v-text="item.StopLoss"></span></li>
                  <li class="clearfix">库存费:<span v-text="item.AcrossFee"></span></li>
                  <li class="clearfix">手续费:<span v-text="item.OrderFee"></span></li>
                  <li class="clearfix"><button @click="closeOut(item.OrderID)">平仓</button></li>
                  <li class="clearfix"><button @click="flag = true" >修改止盈止损</button></li>
              </ul>
          </li> 
      </ul>
        <div class="order_edit" v-if="flag">
            <div class="inbox">
                <h2>{{amendMain.Name}}<span>订单号：{{amendMain.OrderSN}}</span></h2>
                <ul class="editList">
                    <li>{{amendMain.PayType == 0?'买入':'卖出'}}<span v-text="amendMain.CurrentPrice"></span></li>
                    <li>止盈<span v-text="amendMain.TakeProfit"></span></li>
                    <li>止损<span v-text="amendMain.StopLoss"></span></li>
                    <li>当前盈亏<span v-text="amendMain.WOL"></span></li>
                </ul>
                <ul class="amend">
                    <li>
                        修改止盈/点位：
                        <input type="number" v-model="TakeProfit" placeholder="0" />
                    </li>
                    <li>
                        修改止损/点位：
                        <input type="number" v-model="StopLoss" placeholder="0" />
                    </li>
                </ul>
                <div class="buttonS">
                    <button @click="flag = false">取消</button>
                    <button @click="order_edit(amendMain.OrderID)">完成</button>
                </div>

            </div>
        </div>
  </div>
</template>

<script>
import iHeader from '@/components/i-header'
import {mapGetters} from 'vuex'
import { setInterval, clearInterval } from 'timers';
import loading from '../components/loading'
export default { 
    components:{
        iHeader,
        loading
    },
    created(){
        this.holder()
        this.wsCurrPriceReal()
        setTimeout(()=>{
            this.loadFlag = false;
        },800)
        
    },
    mounted(){
        this.clock = setInterval(()=>{
            this.holder()
        },1000)
    },
    beforeDestroy(){
        if(this.clock){
            clearInterval(this.clock)
        }
        this.wsCurr2.close();
        
    },
    computed:{
        ...mapGetters(['setMID']),
        scale(){
            return +this.property.fBalance == 0? 0:(((((+this.property.Balance * 100) + (+this.property.wolBalance * 100)) / 100) / (+this.property.fBalance)) * 100).toFixed(3) + '%'
        }, 
    },
    watch:{
        'piceLine':{
            handler(val,old){
                if(!this.amendMain || !this.pid){
                    return
                }
                this.amendMain = val[this.pid] 
            },  
            deep:true
        }
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
            StopLoss:'',
            
            askList:[],
            //loading开关
            loadFlag:true,
            //show队列
            showList:[],
            //修改止盈止损
            amendMain:'',
            //当前点击id
            pid:''
        }
    },
    methods:{
        //涨跌小箭头
        iCon(hnl){
            return +hnl > 0? true:false
        },
        getShow(id){
            this.pid = id;
            this.amendMain = this.piceLine[id]
            if(this.showList[id] == true){
                this.showList[id] = false;
                return;
            }
            for(let i = 0; i <this.showList.length; i++){
                this.showList[i] = false
            }
            this.showList[id] = true
            
        },
        //个人资金
        userFund(){
            this.$ajax('/account/balance','post',{MID:this.setMID}).then(res=>{
                if(res.status != 200){
                    console.log('error!')
                    return
                }
                let data = res.data.Data
                if(data){
                    this.property = data
                }
                
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
                if(this.askList.length == 0){
                    let arr = data.Data;
                    for(let i = 0; i < arr.length; i++){
                        this.askList.push(arr[i])
                    }
                }
                this.piceLine = data.Data
                if(this.showList.length == 0){
                    for(let i = 0; i<this.piceLine.length;i++){
                        this.showList.push(false)
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
                this.TakeProfit = this.amendMain = this.StopLoss = ''

            })
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
                for(let i = 0; i <this.askList.length; i++){
                    let temp = this.askList[i]
                    if(temp['Code'] == data['Code']){
                        this.askList.splice(i,1,data)
                    }
                }
            }
            this.wsCurr2.onerror = () => {
                console.log("Error!!");
            };
      },
      //获取当前价
      currentPice(code,PayType){
          let arr = this.askList
          for(let i = 0; i <arr.length; i++){
              switch(PayType){
                  case 0 :{
                        if(arr[i]['Code'] == code){
                            return arr[i]['Ask']
                        }
                        break
                    }
                    case 1 :{
                        if(arr[i]['Code'] == code){
                            return arr[i]['Bid']
                        }
                    }
              }
              
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
            i{
                padding:0 0.2rem;
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
        padding-bottom: 0.5rem;
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
        height:12.5rem;
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
.notMore{
    line-height: 3rem;
    text-align: center;
    background: white;
}
</style>