<template>
  <div>
      <back-header :headline="headline"></back-header>
      <div class="content">
          <div class="common plusList">
                <h2 class="title">已选</h2>
                <!-- <ul class="teams">
                    <li > -->
                        <swipeout>
                            <swipeout-item  transition-mode="follow" v-for="(item,index) in this.plusStock" :key="index" >
                                <div slot="right-menu">
                                    <swipeout-button @click.native="onDelClick(index)" type="warn">删除</swipeout-button>
                                </div>
                                <div slot="content" class="conLine">
                                    <i class="fa fa-minus-circle"></i>
                                    <span v-text="item.Name"></span>
                                </div>
                            </swipeout-item>
                        </swipeout>
                    <!-- </li>
                </ul> -->
          </div>
          <div class="common minuList">
              <h2 class="title">可选</h2>
              <ul class="teams">
                  <li v-for="(item,index) in this.minusStock" :key="index">
                      <i class="fa fa-plus-circle" @click="getPlus(index)"></i>
                      <span v-text="item.Name"></span>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
import backHeader from '@/components/back-header'
import {pageHeight} from '../common/js/common.js'
import { Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
export default {
    components:{
        backHeader,
        pageHeight,
        Swipeout,
        SwipeoutItem, 
        SwipeoutButton
    },
    mounted(){
        pageHeight('.content')
    },
    data(){
        return{
            headline:'增加股票',
            plusStock:[
                {
                    AcrossFee:"80",
                    Code:"XAG_USD",
                    Deposit:"100",
                    Fee:"80",
                    ItemID:"00b62e9d9294f9b8e57922ab5e2b0d5f",
                    Leverage:"1",
                    MinFluctuation:"0.01",
                    Name:"白银",
                    Order:"0",
                    Quantity:{min: 1, max: 5},
                    Status:"0",
                    StopLoss:false,
                    TakeProfit:false
                },
                {
                    AcrossFee:"80",
                    Code:"XAG_USD",
                    Deposit:"100",
                    Fee:"80",
                    ItemID:"00b62e9d9294f9b8e57922ab5e2b0d5f",
                    Leverage:"1",
                    MinFluctuation:"0.01",
                    Name:"黄金",
                    Order:"0",
                    Quantity:{min: 1, max: 5},
                    Status:"0",
                    StopLoss:false,
                    TakeProfit:false
                }
            ],
            minusStock:[
                {
                    Name:'美元'
                }
            ],
        }
    },
    methods:{
        //删除
        onDelClick (id) {
            this.minusStock.push(this.plusStock[id])
            this.plusStock.splice(id,1);

        },
        //添加
        getPlus(id){
            this.plusStock.push(this.minusStock[id])
            this.minusStock.splice(id,1);
        }
    }
  
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.content{
    .getPadding;
    box-sizing: border-box;
    background: @bgGray;
    .title{
        height:2rem;
        line-height: 2rem;
        text-indent: @font1;
        font-size:@font1;
    }
}
.common{
    .conLine{
        position: relative;
        background: url('../common/images/leftDouble.png') no-repeat 95% center;
        background-size:2rem 2rem;
        height:4rem;
        .bottomRim;
        line-height: 4rem;
        padding:0 1rem;
        text-align: center;
        span{
            font-size:@font1-25;
        }
    }
}
.plusList{
    .conLine{
        i{
            width:2rem;
            height:2rem;
            line-height: 2rem;
            font-size:@font1-5;
            position:absolute;
            color:@red;
            top:1rem;
            left: 1rem;
        }
    }
}

.minuList{
    .teams{
        li{
            position: relative;
            line-height: 4rem;
            text-align: center;
            background: @white;
            span{
                font-size:@font1-25;
            }
            i{
                width:2rem;
                height:2rem;
                line-height: 2rem;
                font-size:@font1-5;
                position:absolute;
                color:@blue;
                top:1rem;
                left: 1rem;
            }
        }
    }
}
</style>

