<template>
  <div class="opeBox">
      <div class="Lot clearfix">
        <span>手数</span>
        <div class="priceTeams">
            <button @click="Lot(-5)">-5</button>
            <button @click="Lot(-3)">-3</button>
            <input type="number" v-model="skill" @blur="getloseFocus(skill)"/>
            <button @click="Lot(3)">+3</button>
            <button @click="Lot(5)">+5</button>
        </div>
      </div>

        <ul class="operation">
            <li><span>止损</span><small>(止损价 : {{ getStopLoss(this.real,'loss') }} )</small><x-number :min="0" fillable :step="100" v-model="stopLoss"></x-number></li>
            <li><span>获利</span><small>(止盈价 : {{ getStopLoss(this.real,'gain') }} )</small><x-number fillable :min="0" :step="100" v-model="earnProfit"></x-number></li>
            <!-- <li><span>偏差</span><x-number fillable :step="0.1" v-model="deviation"></x-number></li> -->
        </ul>
        <div class="quoBtn">
            <button @click="getPresent">立即执行</button>
        </div>
  </div>
</template>

<script>
import {XNumber} from 'vux'
import {mapGetters,mapMutations} from 'vuex'
export default {
    components:{
        XNumber
    },
    //升跌，现价
    props:['deal','real'],
    data(){
        return{
            //手数
            skill:1,
            //止损
            stopLoss:0,
            //获利
            earnProfit:0,
            //偏差
            // deviation:""
        }
    },
    computed:{
        ...mapGetters(['setMID'])
    },
    watch:{
        'real':{
            handler(val,old){
                // return +val
            }
        }
    },
    methods:{
        ...mapMutations({
            indexState:'INDEX_STATE'
        }),
        getloseFocus(num){
            if(num <= 0 || isNaN(num) || !num){
                this.skill = 1
            }
            return
        },
        Lot(num){
            let o = this.skill;
            o += num;
            if(o<1){
                alert('最少买1手')
                o = 1
            }
            this.skill = o
        },

        getStopLoss(o,id){
            if(this.deal == 0){
                if(o){
                    let float = o
                    let point = (float.split('.'))[1].length
                    switch(id){
                        case 'loss':{
                            let num = (Number(o) * (Math.pow(10,point)) - this.stopLoss)/Math.pow(10,point)
                            return num
                            break
                        }
                        case 'gain' :{
                            let num = (Number(o) * (Math.pow(10,point)) + this.earnProfit)/Math.pow(10,point)
                            return num
                            break
                        }
                    }
                
                }   
            }
            else if(this.deal == 1){
                if(o){
                    let float = o
                    let point = (float.split('.'))[1].length
                    switch(id){
                        case 'loss':{
                            let num = (Number(o) * (Math.pow(10,point)) + this.stopLoss)/Math.pow(10,point)
                            return num
                            break
                        }
                        case 'gain' :{
                            let num = (Number(o) * (Math.pow(10,point)) - this.earnProfit)/Math.pow(10,point)
                            return num
                            break
                        }
                    }
                }   
            }
            else{
                return o
            }
        },

        getPresent(){
            let opt = {
                MID:this.setMID, 
                PayType:this.deal, 
                Quantity:this.skill, 
                StopLoss:this.stopLoss, 
                TakeProfit:this.earnProfit, 
                ItemID:this.$route.query.itemID
            }
            this.$ajax('/trade/order','post',opt).then((res)=>{
                let data = res.data;
                if(data.ResultCD != 200){
                    console.log(data.ErrorMsg)
                    return
                }
                if(data.ResultCD == 200){
                    alert('下单成功')
                    this.indexState(1)
                    this.$router.push({
                        path:'/'
                    })
                }
            })
        }
    },

}
</script>

<style lang="less">
@import '../common/css/common.less';
.opeBox{
    .Lot{
        padding:0 1rem 0 2rem;
        span{
            line-height: 3rem;
            color:@font-Lgray;
            float: left;
        }
        .priceTeams{
            float: right;
            text-align: center;
            line-height: 3rem;
            .bottomRim;
            input[type="number"]{
                border:1px solid @bgGray;
                height:2rem;
                width:4rem;
                text-align: center;
                color:@font-Lgray;
                margin:0 1rem;
            }
            button{
                color:@white;
                height:1.8rem;
                width:3rem;
                margin:0 0.5rem;
                background: @blue;
                .border-radiusS;
            }
        }
    }

    .operation{
        width:100%;
        li{
            height:4rem;
            line-height: 4rem;
            padding:0 1rem 0 2rem;
            .bottomRim;
            span{
                font-size:@font1;
                color:@font-Lgray;
                margin-right:1rem;
            }
            small{
                font-size:@font1;
                color:@font-Sgray
            }
            .weui-cell{
                float: right;
            }
        }
    }
    .vux-number-selector {
        border:none;
        svg{
            fill: @blue !important;
        }
        
        
    }
    .vux-number-input{
        font-family:"微软雅黑";
        font-size:1.25rem !important;
    }
    .quoBtn{
        padding:1rem;
        text-align: center;
        button{
            background: @blue;
            color:@white;
            .btnBig;
        }
    }
}

</style>

