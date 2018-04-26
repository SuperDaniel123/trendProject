<template>
  <div>
      <back-header :headline="headline"></back-header>
      <div class="content">
          <ul class="commonList">
              <li><span>原密码：</span><input type="password" placeholder="请输入原密码" v-model="oldcode" /></li>
              <li><span>新密码：</span><input type="password" placeholder="请输入新密码" v-model="newcode"/></li>
              <li><span>确认密码：</span><input type="password" placeholder="请在输入一遍新密码" v-model="affirm" /></li>
          </ul>
        <div class="boundbtn">
            <button @click="getAffirm()">确定</button>
        </div>
      </div>

  </div>
</template>

<script>
import backHeader from '@/components/back-header'
import {mapGetters} from 'vuex'
import { setTimeout } from 'timers';
export default {
  components:{
      backHeader
      
  },
  created(){
  },
  data(){
      return{
          oldcode:'',
          newcode:'',
          affirm:''
      }
  },
  computed:{
        ...mapGetters([
            'setMID'
        ]),
        headline(){
            return this.$route.params.id == 1 ? '修改登录密码':'修改支付密码'
        }
  },
  methods:{
    getAffirm(){
        let opt,url;
        if(!this.oldcode || !this.newcode || !this.affirm){
            this.$vux.alert.show({
                content: '密码不能为空',
            })
            return;
        }else if(this.oldcode == this.newcode){
            this.$vux.alert.show({
                content: '新旧密码不能相同',
            })
            return;
        }else if(this.newcode != this.affirm){
            this.$vux.alert.show({
                content:'新密码不一致'
            })
            return;
        }else{
            opt = {
                MID: this.setMID,
                OldPwd:this.oldcode,
                NewPwd:this.newcode,
                ReNewPwd:this.affirm
            }
            
            url = this.$route.params.id == 1? '/account/pwd':'/account/pay_pwd'
            this.$ajax(url,'post',opt).then(res=>{
                let data = res.data;
                if(data.ResultCD == '4521'){
                    alert(data.ErrorMsg)
                }
                if(data.ResultCD == '200'){
                    this.$vux.alert.show({
                        content:'修改成功'
                    })
                    setTimeout(()=>{
                        this.$router.push('/')
                    },1000)
                    
                }
            })
        }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';


</style>

