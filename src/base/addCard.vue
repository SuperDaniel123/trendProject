<template>
  <div>
      <back-header :headline="headline"></back-header>
      <div class="content">
          <ul class="ulTeams">
              <li><span>姓名：</span><input type="text" placeholder="请输入姓名" v-model="userName"/></li>
              <li><span>手机：</span><input type="phone" placeholder="请输入预留手机" v-model="telphone" /></li>
              <li class="plus">
                <popup-picker :title="siteName" :data="addlist" :columns="2" v-model="value" show-name placeholder="请选择"></popup-picker>
              </li>
              <li><span>网点：</span><input type="phone" placeholder="请输入网点" v-model="branch"/></li>
              <li class="plus">
                <popup-picker :title="bankName" :data="bankList"  v-model="bank" placeholder="请选择银行"></popup-picker>
              </li>
              <li><span>银行卡：</span><input type="number" placeholder="请输入银行卡号" v-model="bankNum" /></li>
          </ul>
          <div class="boundbtn">
              <button @click="addCard()">立即绑定</button>
          </div>
      </div>
  </div>
</template>

<script>
import backHeader from '@/components/back-header'
import {PopupPicker,ChinaAddressV4Data, Value2nameFilter as value2name} from 'vux'
import data from '@/common/js/bank.json'
export default {
    components:{
        PopupPicker,
        backHeader
    },
    computed:{
        //银行列表json
        bankList(){
            return [data.list]
        },
        //地区json
        addlist(){
            return ChinaAddressV4Data;
        },
        //地区名转换
        city(){
            return value2name(this.value, ChinaAddressV4Data)
        }
    },
    data(){
        return{
            headline:'添加银行卡',
            siteName: '地区：',
            //用户名
            userName:'',
            //电话
            telphone:'',
            //地区
            value: [],
            //网点
            branch:'',
            bankName:'银行：',
            //银行
            bank:[],
            //地级市json 
            bankNum:''
        }
    },
    methods:{
        addCard(){
            // console.log(this.userName + '用户名')
            // console.log(this.telphone + '电话号码')
            // console.log(this.city)
            // console.log(this.branch + '网点')
            // console.log(this.bank + '银行')
            if(this.userName == '' || this.telphone == '' || this.city.length == 0 || this.branch == '' || this.bank == '' || this.bankNum == ''){
                alert('参数不能为空')
                return;
            }

            //验证电话号码
            let p = this.telphone
            if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(p))){ 
                alert("请输入正确的电话号码"); 
                this.telphone = ''
                return; 
            } 
            //验证银行卡
            let c = this.bankNum;
            if(!( /^\d{19}$/g.test(c))){
                alert('银行卡格式错误')
                this.bankNum = ''
                return;
            }


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
