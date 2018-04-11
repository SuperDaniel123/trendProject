<template>
  <div>
      <back-header :headline="headline"></back-header>
      <div class="content">
          <div class="recbox">
                <!-- <div class="elect clearfix">
                  <h2>微信充值</h2>
                  <span>选择其他<i class="fa fa-angle-down"></i></span>
                </div> -->
                <popup-picker :title="title1" :data="list1" v-model="value1" ></popup-picker>
                <div class="figure">
                    <input type="number" placeholder="请输入金额（最小金额138元）" v-model="sum">
                </div>
          </div>
          <div class="boundbtn">
              <button @click="deposit(value1[0])">下一步</button>
          </div>
          <div class="flag" v-if="flag">
              <div class="codeBox boundbtn">
                  <qrcode :value="QRcodeUrl" type="img"></qrcode>
                  <span>请扫描二维码</span>
                  <button @click="flag = false">确定</button>
              </div>
              
          </div>
      </div>
  </div>
</template>

<script>
import backHeader from '@/components/back-header'
import {pageHeight} from '../common/js/common.js'
import { PopupPicker,Qrcode} from 'vux'
import {mapGetters} from 'vuex'
export default {
    components:{
        backHeader,
        PopupPicker,
        Qrcode
    },
    computed:{
        ...mapGetters([
            'setMID'
        ])
    },
    created(){
        this.getWay()
    },
    mounted(){
        pageHeight('.content')
    },
    data(){
        return{
            headline:'充值',
            title1:'选择其他',
            list1: [[]],
            value1: [' '],
            //备份数据
            backupList:[],
            //金额
            sum:'',

            //弹窗
            flag:false,
            //二维码
            QRcodeUrl:''
        }
    },
    methods:{
        getWay(){
            this.$ajax('/deposit/way','post',{MID:this.setMID}).then(res=>{
                let data = res.data
                if(data.ResultCD != 200){
                    alert(data.ErrorMsg)
                    return
                }
                for(let i = 0; i<data.Data.length; i++){
                    let temp = data.Data[i]
                    for(let key in temp){
                        if(key == 'PayName'){
                            this.list1[0].push(temp[key])
                        }
                    }
                }
                this.backupList = data.Data;
                // console.log(this.backupList)
            })
        },
        deposit(str){
            if(this.value1[0] == ' ' || this.sum == ''){
                alert('充值方式或金额不能为空')
                return
            }
            let opt = {
                MID:this.setMID,
                OrderAmount:this.sum,
                InterfaceID:this.getInterfaceID(str),
                Domain:'http://localhost:8080/'
            }
            this.$ajax('/deposit/apply','post',opt).then(res=>{
                let data = res.data
                if(data.ResultCD != 200){
                    alert(data.ErrorMsg)
                    return
                }
                switch(data.Type){
                    case "echodata" : {

                    }

                    case "headerurl" : {
                        window.location.href = data.Data
                        break;
                    }

                    case "qrurl" : {
                        this.flag = true;
                        this.QRcodeUrl = data.Data
                        break;
                    }
                    
                    default :{
                        alert('暂不支持充值方式')
                        return;
                    }
                }
            })
        },
        getInterfaceID(id){
            for(let i = 0; i<this.backupList.length; i++){
                let temp = this.backupList[i];
                for(let key in temp){
                    if(temp[key] == id){
                        return temp['InterfaceID']
                    }
                }
            }
        }
    }
}
</script>

<style lang="less" >
@import '../common/css/common.less';
.recbox{
    margin:1rem;
    background: @white;
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
        input[type='number']{
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
    .flag{
        width:100%;
        height:100%;
        top: 0;
        left: 0;
        z-index: 999;
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        .codeBox{
            position: absolute;
            top:20%;
            width:100%;
            span{
                line-height: 3rem;
                color:@white;
                display: block;
                font-size:@font1;
            }
        }
    }
</style>
