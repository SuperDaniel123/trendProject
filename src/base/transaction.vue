<template>
  <div>
      <div class="line"></div>
      <i-header :headline="headline"></i-header>
      <ul class="property" v-cloak>
          <li class="clearfix" v-for="(item,index) in this.property" :key="index">{{item.title}}<span v-text="item.num"></span></li>
      </ul>
      <div class="line"></div>
      <ul class="piceLine">
          <li v-for="(item,index) in this.piceLine" :key="index" :class="[item.state == false? '':'show']" @click="getShow(index)">
              <div class="basic">
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
                    <h2 :class="[item.PayType == '0'? 'ProfitOrLoss red':'ProfitOrLoss blue']" v-text="item.ProfitOrLoss"></h2>
              </div>
              <ul class="more">
                  <li class="clearfix">止损<span v-text="item.StopLoss"></span></li>
                  <li class="clearfix">获利<span v-text="item.ProfitOrLoss"></span></li>
                  <li class="clearfix">库存量<span v-text="item.TakeProfit"></span></li>
                  <li class="clearfix">手续费<span v-text="item.OrderFee"></span></li>
              </ul>
          </li>
      </ul>
  </div>
</template>

<script>
import iHeader from '@/components/i-header'
export default {
    components:{
        iHeader
    },
    data(){
        return{
            headline:'交易',
            property:[
                {title:'结余',num:'100 100.00'},
                {title:'净值',num:'100 149.00'},
                {title:'结余',num:'312.94'},
                {title:'预存值',num:'97851.00'},
                {title:'可用预付款',num:'64111.00'},
            ],
            piceLine:[
                {
                   OrderID:"76d08a9c078e1db0b45dc75ffe473d7a",
        　　　　　　OrderSN:"L2018031520183302635",
        　　　　　　UID:"7ab783688614df64672260e773c35ecb",
        　　　　　　uName:"001",
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
        　　　　　　StopLoss:"5000",
        　　　　　　TakeProfit:"0",
        　　　　　　Leverage:"2",
        　　　　　　MinFluctuation:"0.01",
        　　　　　　CurrentTime:"1521116313",
        　　　　　　CurrentPrice:"1322.548",
        　　　　　　ClosePrice:"1322.735",
        　　　　　　CloseTime:"1521116572",
        　　　　　　FinalTime:"1521144000",
        　　　　　　ProfitOrLoss:"-37.40",
        　　　　　　Status:"200",
        　　　　　　OrderDeposit:"100.00",
        　　　　　　WOL:null,
                   state:false
                },
                {
                   OrderID:"76d08a9c078e1db0b45dc75ffe473d7a",
        　　　　　　OrderSN:"L2018031520183302635",
        　　　　　　UID:"7ab783688614df64672260e773c35ecb",
        　　　　　　uName:"001",
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
        　　　　　　StopLoss:"5000",
        　　　　　　TakeProfit:"0",
        　　　　　　Leverage:"2",
        　　　　　　MinFluctuation:"0.01",
        　　　　　　CurrentTime:"1521116313",
        　　　　　　CurrentPrice:"1322.548",
        　　　　　　ClosePrice:"1322.735",
        　　　　　　CloseTime:"1521116572",
        　　　　　　FinalTime:"1521144000",
        　　　　　　ProfitOrLoss:"-37.40",
        　　　　　　Status:"200",
        　　　　　　OrderDeposit:"100.00",
        　　　　　　WOL:null,
                   state:false
                }
            ]
        }
    },
    methods:{
        getShow(id){
            this.piceLine[id].state = !this.piceLine[id].state
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
[v-cloak] {
    display: none;
}
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
        height:4rem;
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
        }
    }
    li.show{
        transition: all 0.2s;
        height:10rem;
    }

}
</style>