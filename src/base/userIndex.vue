<template>
  <div>
      <i-header :headline="headline"></i-header>
      <div class="userBox">
          <router-link to="/personal">
                <img class="headPortrait" src="../common/images/portrait.png" />
                <div class="nick">
                    <h2>昵称: <span v-text="userDatum.IDName"></span></h2>
                    <p>( {{userDatum.LoginID}} )</p>
                </div>
          </router-link>
          <div class="btn">
              <router-link to="/recharge">
                  <input type="button" value="充值" />
              </router-link>
              <router-link to="/withdraw">
                <input type="button" value="提现" />
              </router-link>
          </div>
      </div>
      <div class="line"></div>
      <ul class="common-line">
          <router-link to="/autonym"><li>实名认证</li></router-link>
          <router-link to="/bankCard"><li>我的银行卡</li></router-link>
      </ul>
      <div class="line"></div>
      <ul class="common-line">
          <router-link to="/password"><li>修改登录密码</li></router-link>
          <router-link to="/password"><li>修改支付密码</li></router-link>
          
      </ul>
  </div>
</template>

<script>
import iHeader from '@/components/i-header'
import {mapGetters,mapMutations} from 'vuex'
export default {
    components:{
        iHeader
    },
    computed:{
        ...mapGetters([
            'setMID'
        ])
    },
    created(){
        this.getUserDatum()
    },
    data(){
        return{
            headline:'我的',
            userDatum:'',
        }
    },
    watch:{
        'userDatum':{
            handler(val,old){
                this.userInfo(val)
            },
            deep:true
        }
    },
    methods:{
        ...mapMutations({
            userInfo:"USER_INFO"
        }),
        //个人信息
        getUserDatum(){
            this.$ajax('/account/info','post',{MID:this.setMID}).then(res=>{
                if(res.status != 200){
                    console.log('error!')
                    return
                }
                this.userDatum = res.data.Data
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';

.line{
    .e-line;
}
.common-line{
    width:100%;
    li{
        .lineStyle;
    }
}
</style>