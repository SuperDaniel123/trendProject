<template>
  <div>
      <loading v-if="loadFlag"></loading>
      <i-header :headline="headline"></i-header>
      <div class="userBox">
          <!-- <router-link to="/personal"> -->
                <img class="headPortrait" src="../common/images/portrait.png" />
                <div class="nick">
                    <h2>昵称: <span v-text="userDatum.IDName"></span></h2>
                    <p>( {{userDatum.LoginID}} )</p>
                </div>
          <!-- </router-link> -->
          <!-- <div class="btn">
              <router-link to="/recharge">
                  <input type="button" value="充值" />
              </router-link>
              <router-link to="/withdraw">
                <input type="button" value="提现" />
              </router-link>
          </div> -->
      </div>
      <div class="line"></div>
      <ul class="common-line">
          <router-link to="/autonym"><li>实名认证</li></router-link>
          <router-link to="/bankCard"><li>我的银行卡</li></router-link>
      </ul>
      <div class="line"></div>
      <ul class="common-line">
          <router-link :to=" {name:'password', params: { id: 1 }} "><li>修改登录密码</li></router-link>
          <router-link :to=" {name:'password', params: { id: 2 }} "><li>修改支付密码</li></router-link>
      </ul>

      <div class="boundbtn">
          <button @click="logOut">退出</button>
      </div>
  </div>
</template>

<script>
import iHeader from '@/components/i-header'
import {mapGetters,mapMutations} from 'vuex'
import loading from '../components/loading'
export default {
    components:{
        iHeader,
        loading
    },
    computed:{
        ...mapGetters([
            'setMID'
        ])
    },
    created(){
        this.getUserDatum()
        setTimeout(()=>{
            this.loadFlag = false;
        },800)
    },
    data(){
        return{
            headline:'我的',
            userDatum:'',
            //loading开关
            loadFlag:true
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
            userInfo:"USER_INFO",
            mid:'SET_MID',
            isLogin:'IS_LOGIN',
            indexState:'INDEX_STATE'
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
        },
        logOut(){
            sessionStorage.removeItem('MID')
            sessionStorage.removeItem('UID')
            this.mid('')
            this.isLogin(false)
            alert('退出成功')
            location.reload()
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