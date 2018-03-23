<template>
  <div class="opeBox">
        <div class="priceTeams">
            <checker v-model="current" default-item-class="price-item" selected-item-class="price-item-selected">
                <checker-item :value="item" v-for="(item, index) in priceList" :key="index">{{item.value}}</checker-item>
            </checker>
        </div>
        <ul class="operation">
            <li><span>止损</span><x-number fillable :step="0.1" v-model="stopLoss"></x-number></li>
            <li><span>获利</span><x-number fillable :step="0.1" v-model="earnProfit"></x-number></li>
            <li><span>偏差</span><x-number fillable :step="0.1" v-model="deviation"></x-number></li>
            
        </ul>
        <div class="quoBtn">
            <button>立即执行</button>
        </div>
  </div>
</template>

<script>
import { Checker, CheckerItem,XNumber } from 'vux'
export default {
    components:{
        Checker, 
        CheckerItem,
        XNumber
    },
    props:['deal'],
    data(){
        return{
            current:{key: '3',value: '0.01'},

            priceList: [{
                key: '1',
                value: '-0.1'
            }, {
                key: '2',
                value: '-0.01'
            }, {
                key: '3',
                value: '0.01'
            },
            {
                key: '4',
                value: '+0.01'
            },
            {
                key: '5',
                value: '+0.1'
            }],
            //止损
            stopLoss:0,
            //获利
            earnProfit:0,
            //偏差
            deviation:0
        }
    }
}
</script>

<style lang="less">
@import '../common/css/common.less';
.opeBox{
    .priceTeams{
        text-align: center;
        width:100%;
        line-height: 3rem;
        .bottomRim;
        .price-item {
            color: @font-Sgray;
            padding: 0.5rem 1.5rem;
        }
        .price-item-selected {
            color: @blue;
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

