<template>
  <div>
      <back-header :headline="headline"></back-header>
      <div class="content">
            <div class="commonList">
                <li><span>姓名：</span><input type="text" placeholder="请输入姓名" v-model="user" :disabled='disabled' /></li>
                <li><span>性别：</span><input type="text" placeholder="请输入性别" v-model="gender" :disabled='disabled' /></li>
                <li><span>身份证</span><input type="number" placeholder="请输入身份证号" v-model="IDCARD" :disabled='disabled' /></li>
            </div>
            <div class="boundbtn">
                <button>提交申请</button>
            </div>
      </div>
  </div>
</template>

<script>
import backHeader from '@/components/back-header'
import {mapGetters} from 'vuex'
export default {
  components:{
      backHeader
  },
  data(){
      return{
          headline:'实名认证',
          user:'',
          gender:'',
          IDCARD:'',
          disabled:false

      }
  },
  created(){
      this.certificate_progress()
  },
  mounted(){
  },
  computed:{
      ...mapGetters(['setMID','userInfo']),
      info(){
          return this.userInfo
      }
  },
  methods:{
      //实名认证
    //   certificate(){
    //       let opt ={
    //             MID:this.setMID,
    //             IDName:this.info.IDName,
    //             UID:this.info.UID,
    //             Gender:this.info.Gender,
    //             IDCard:this.info.IDCARD
    //       }
    //       console.log(opt)
    //       this.$ajax('/account/certificate','post',opt).then(res=>{
    //             if(res.status != 200){
    //                 console.log('error!')
    //                 return
    //             }
    //             console.log(res)
    //             // this.userDatum = res.data.Data
    //         })
    //   }

    //实名认证进度
    certificate_progress(){
        this.$ajax('/account/certificate_progress','post',{MID:this.setMID}).then(res=>{
            if(res.status != 200){
                console.log('error!')
                return
            }
            let data = res.data.Data;
            if(data['Status'] == '1' || !data['Status']){
                this.disabled = false;
                return
            }else if(data['Status'] == '0'){
                this.disabled = true
            }
            console.log(res)
            // this.userDatum = res.data.Data
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
</style>
