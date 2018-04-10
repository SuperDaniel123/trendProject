<template>
  <div>
      <back-header :headline="headline"></back-header>
      <div class="content">
          <div class="recbox">
                <popup-picker :title="title" :data="list" v-model="value" ></popup-picker>
                <div class="figure">
                    <input type="phone" placeholder="请输入金额"  v-model="cash" @blur="exceed">
                </div>
          </div>
          <p class="payText">余额 ￥{{this.allPay}}，<span @click="getAll">全部提现</span></p>
          <div class="boundbtn">
              <button @click="flag = true">下一步</button>
          </div>
          <div class="verify" v-if="flag">
                <div class="passBox">
                    <i class="fa fa-close"  @click="flag = !flag"></i>
                    <h1>输入密码</h1>
                    <input type="password" v-model="password" placeholder="请输入密码"/>
                    <button @click="getWithdraw()">提交</button>
                </div>
          </div>
      </div>
  </div>
</template>

<script>
import backHeader from '@/components/back-header'
import {pageHeight} from '../common/js/common.js'
import { PopupPicker } from 'vux'
import {mapGetters} from 'vuex'
export default {
    components:{
        backHeader,
        PopupPicker
    },
    computed:{
        ...mapGetters([
            'setMID'
        ])
    },
    created(){
        //获取银行卡
        this.gainCard(),
        //获取用户信息
        this.getbalance()
    },
    mounted(){
        pageHeight('.content')
    },
    data(){
        return{
            headline:'提现',
            title:'选择其他',
            //银行列表
            list: [[]],
            //银行value值
            value: [' '],
            cash:'',
            allPay:'',
            //备份ID
            listID:[],
            //开关
            flag:false,
            //密码
            password:''
            
        }
    },
    methods:{
            getAll(){
                this.cash = this.allPay;
            },
            gainCard(){
                this.$ajax('/card/list','post',{MID:this.setMID}).then(res=>{
                    let data = res.data.Data;
                    for(let key in data){
                        let sx = data[key]
                        for(let j in sx){
                            if(j == 'BankName'){
                                this.list[0].push(sx[j])
                                let obj = {}
                                obj['BankName'] = sx['BankName']
                                obj['ID'] = sx['ID']
                                this.listID.push(obj)                                
                            }
                            
                        }
                    }
                })
            },
            //获取余额
            getbalance(){
                this.$ajax('/account/balance','post',{MID:this.setMID}).then(res=>{
                    let data = res.data.Data;
                    this.allPay = data['Balance']
                })
            },
            getWithdraw(){
                let opt = {
                    MID:this.setMID,
                    OrderAmount:this.cash,
                    CardID:this.gainID(),
                    tPwd:this.password
                }
                this.$ajax('/withdrawal/apply','post',opt).then(res=>{
                    let data = res.data
                    if(data.ResultCD != '200'){
                        alert(data.ErrorMsg)
                        this.flag = false;
                        this.password = '';
                        return
                    }
                    alert('提现成功')
                    this.$router.go(-1)


                })
            },
            gainID(){
                let arr = this.listID
                let id = ''
                for(let i = 0; i<arr.length; i++){
                    let temp = arr[i];
                    for(let key in temp){
                        if(temp[key] == this.value[0]){
                            id = temp['ID']
                        }
                    }
                }
                return id
            },
            exceed(){
                if(+this.cash > +this.allPay){
                    alert('金额不能大于'+ this.allPay)
                    this.cash = ''
                    return
                }
            }
            
    }
}
</script>

<style lang="less" >
@import '../common/css/common.less';

.verify{
    position: fixed;
    top:0;
    left: 0;
    z-index: 999;
    width:100%;
    height:100%;
    background:rgba(0, 0, 0, 0.5);
    .passBox{
        position: absolute;
        top:50%;
        left: 50%;
        margin:-6.5rem 0 0 -10rem;
        width: 20rem;
        height:13rem;
        background: @white;
        text-align: center;
        overflow: hidden;
        .border-radiusS;
        h1{
            line-height: 4rem;
            font-size:@font1-5;
            .bottomRim;
        }
        i.fa{
            position: absolute;
            top:1rem;
            right:1rem;
            font-size:@font1-25;
        }
        input[type='password']{
            display: block;
            width:80%;
            margin:1rem auto;
            line-height: 3rem;
            color:@font-Lgray;
            text-align: center;
            .border-radiusS;
            border: 1px @bgGray solid;
        }
        button{
            position: absolute;
            bottom:0;
            left: 0;
            width:100%;
            color:@white;
            background: @blue;
            font-size:@font1;
            line-height: 3rem;
        }
    }
}

.payText{
    padding:0 1rem;
    font-size:@font1;
    color:@font-Sgray;
    span{
        color:@blue;
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
