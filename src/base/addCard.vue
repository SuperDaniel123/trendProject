<template>
  <div>
      <back-header :headline="headline"></back-header>
      <div class="content">
          <ul class="ulTeams">
              <li><span>姓名：</span><input type="text" placeholder="请输入姓名" /></li>
              <li><span>手机：</span><input type="phone" placeholder="请输入预留手机" /></li>
              <li class="plus">
                <popup-picker :title="siteName" :data="addlist" :columns="2" v-model="value" show-name placeholder="请选择"></popup-picker>
              </li>
              <li><span>网点：</span><input type="phone" placeholder="请输入网点" /></li>
              <li class="plus">
                <popup-picker :title="bankName" :data="bankList"  v-model="bank" placeholder="请选择银行"></popup-picker>
              </li>
              <li><span>银行卡：</span><input type="number" placeholder="请输入银行卡号" /></li>
          </ul>
          <div class="boundbtn">
              <button>立即绑定</button>
          </div>
      </div>
  </div>
</template>

<script>
import backHeader from '@/components/back-header'
import {PopupPicker} from 'vux'
export default {
    components:{
        PopupPicker,
        backHeader
    },
    data(){
        return{
            headline:'添加银行卡',
            siteName: '地区：',
            value: [],
            bankName:'银行：',
            bankList:[['广发银行', '农业银行', '建设银行', '中国银行', '浦发银行', '农商银行', '不告诉你']],
            bank:[],
            addlist: [{
                name: '广东',
                value: 'gd',
                parent: 0
            }, {
                name: '广西',
                value: 'gx',
                parent: 0
            }, {
                name: '佛山',
                value: 'foshan',
                parent: 'gd'
            }, {
                name: '广州',
                value: 'guangzhou',
                parent: 'gd'
            }, {
                name: '梧州',
                value: 'wuzhou',
                parent: 'gx'
            }, {
                name: '广宁',
                value: 'guangning',
                parent: 'gx'
            }],
        }
    }
}
</script>

<style lang="less">
@import '../common/css/common.less';
.ulTeams{
    li{
        line-height: 3rem;
        margin-top:0.5rem;
        background: @white;
        font-size:@font1-25;
        display: flex;
        padding:0 1rem;
        box-sizing: border-box;
        span{
            width:5rem;
        }
        input{
            flex: 1;
            line-height:3rem;
            color:@font-Sgray;
            font-family: '微软雅黑'
        }
        input::placeholder{
            color:@font-Sgray;
        }
    }
    li.plus{
        .vux-cell-box{
            width:100%;
            .weui-cell{
                display: flex;
                background: url('../common/images/more.png') no-repeat center right;
                background-size:1.5rem 1.5rem;
            }
        }
        .vux-popup-picker-select{
            font-size:@font1;
            color:@font-Sgray;
            width:auto;
            padding-right:2rem;
        }
    }
}

</style>
