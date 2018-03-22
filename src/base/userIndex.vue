<template>
  <div>
      <i-header :headline="headline"></i-header>
      <div class="userBox">
          <router-link to="/personal">
                <img class="headPortrait" src="../common/images/portrait.png" />
                <div class="nick">
                    <h2>昵称: <span>刘某某</span></h2>
                    <p>(18675766521)</p>
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
export default {
    components:{
        iHeader
    },
    data(){
        return{
            headline:'我的'
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