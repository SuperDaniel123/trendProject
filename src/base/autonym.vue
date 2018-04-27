<template>
  <div>
      <back-header :headline="headline"></back-header>
      <div class="content">
            <div class="commonList">
                <li><span>姓名：</span><input type="text" placeholder="请输入姓名" v-model="user" :disabled='disabled' /></li>
                <li>
                    <span>性别：</span>
                    <input v-if="disabled" v-model="value[0]" :disabled='disabled' type="text">
                    <popup-picker v-if="!disabled" :data="list1" value-text-align="left" v-model="value"></popup-picker>
                </li>
                
                <li><span>身份证</span><input type="number" placeholder="请输入身份证号" v-model="IDCARD" :disabled='disabled' /></li>
            </div>
            <p class="ctext" v-if="this.status">审核中..</p>
            <div class="boundbtn" v-if="!this.disabled">
                <button @click="certificate">提交申请</button>
            </div>
      </div>
  </div>
</template>

<script>
import backHeader from '@/components/back-header'
import {mapGetters} from 'vuex'
import {PopupPicker} from 'vux'
export default {
  components:{
      backHeader,
      PopupPicker
  },
  data(){
      return{
          headline:'实名认证',
          user:'',
          IDCARD:'',
          disabled:false,
          status:false,
          value:['男'],
          list1: [['男','女']]

      }
  },
  created(){
      this.certificate_progress()
  },
  mounted(){ 
  },
  computed:{
      ...mapGetters(['setMID','setUID']),
      info(){
          return this.setUID
      },
  },
  methods:{
      //实名认证
      certificate(){
          let gen = ()=>{
              return this.value[0] == '男'? 0 : 1
          }
          console.log(gen)
          let opt ={
                MID:this.setMID,
                IDName:this.user,
                UID:this.info,
                Gender:gen(),
                IDCard:this.IDCARD
          }
          if(!opt.IDName || !opt.IDCard){
              alert('姓名或身份证不能为空')
              return;
          }
          this.$ajax('/account/certificate','post',opt).then(res=>{
              let data = res.data
                if(data.ResultCD != 200){
                    alert(data.ErrorMsg)
                    return
                }
                alert('提交成功')
                this.$router.push('/autonym')
            })
      },

    //实名认证进度
    certificate_progress(){
        this.$ajax('/account/certificate_progress','post',{MID:this.setMID}).then(res=>{
            if(res.data.ResultCD != 200){
                alert(res.data.ErrorMsg)
                return
            }
            let data = res.data.Data;
            console.log(data)
            if(data['Status'] == '1' || !data['Status']){
                this.disabled = false;
                return
            }else if(data['Status'] == '0' || data['Status'] == '10'){
                this.disabled = true;
                if(data['Status'] == '0'){
                    this.status = true;
                }
                this.user = data.IDName;
                this.value[0] = data.Gender == '0'? '男':'女';
                this.IDCARD = data.IDCARD;
                return
            }
            
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
input{
    color:@font-Lgray !important;
}
input:disabled{
    background: @white;
}
.vux-cell-box{
    padding-left:1.5rem;
    width:100%;
}
.ctext{
    color:@red;
    padding:1rem 1rem 0 1rem
}
</style>
