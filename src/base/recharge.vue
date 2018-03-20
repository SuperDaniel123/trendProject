<template>
  <div>
      <back-header :headline="headline"></back-header>
      <div class="contentD">
          <div class="recbox">
                <!-- <div class="elect clearfix">
                  <h2>微信充值</h2>
                  <span>选择其他<i class="fa fa-angle-down"></i></span>
                </div> -->
                <popup-picker :title="title1" :data="list1" v-model="value1" ></popup-picker>
                <div class="figure">
                    <input type="phone" placeholder="请输入金额（最小金额138元）" value="">
                </div>
          </div>
          <div class="botton">
              <input type="button" value="下一步" />
          </div>
      </div>
  </div>
</template>

<script>
import backHeader from '@/components/back-header'
import {pageHeight} from '../common/js/common.js'
import { PopupPicker } from 'vux'
export default {
  components:{
      backHeader,
      PopupPicker
  },
  mounted(){
    pageHeight('.contentD')
  },
  data(){
      return{
          headline:'充值',
          title1:'选择其他',
          list1: [['微信', '支付宝', '建设银行', '农业银行', '工商银行', '广发银行']],
          value1: ['微信']
      }
  },
  methods:{

  }
}
</script>

<style lang="less" >
@import '../common/css/common.less';
.contentD{
    .getPadding;
    box-sizing: border-box;
    background: @bgGray;
    .botton{
        text-align: center;
        margin-top:2rem;
        input[type="button"]{
            background: @blue;
            color:@white;
            padding:0.8rem 3rem;
            .border-radius;
        }
    }
}
.recbox{
    margin:1rem;
    background: @white;
    // .elect{
    //     padding:0 1rem;
    //     line-height: 4rem;
    //     height: 4rem;
    //     .bottomRim;
    //     h2{
    //         display: inline-block;
    //         font-size:@font1-25;
    //         color:@font-Lgray;
    //     }
    //     span{
    //         color:@font-Sgray;
    //         font-size:@font1;
    //         float:right;
    //         i{
    //             padding-left: 0.5rem;
    //         }
    //     }
    // }
    .vux-cell-box{
        line-height: 4rem;
        padding:0 1rem;
        .bottomRim;
    }
    .weui-cell__hd{
        float: right;
        color:@font-Sgray;
        font-size:@font1;
        padding-right:1.2rem;
        background: url('../common/images/down.png') no-repeat right center;
        background-size:0.8rem 0.8rem;
        
    }
    .vux-popup-picker-select{
        font-size:@font1-25;
        text-align: left !important;
        color:@font-Lgray;
    }
    .figure{
        padding:2rem;
        input[type='phone']{
            color:@font-Sgray;
            font-family:'微软雅黑';
            width:100%;
            line-height: 1rem;
            font-size:3rem;
        }
        input::-webkit-input-placeholder{
                font-size:1rem;
                color:#bababa;
            }
    }


}
    .vux-popup-header-right{
        color:@blue !important;
    }
</style>
