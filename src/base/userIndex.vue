<template>
  <div>
      <i-header :headline="headline"></i-header>
      <div class="userBox">
          <img class="headPortrait" src="../common/images/portrait.png" />
          <div class="nick">
              <h2>昵称: <span>刘某某</span></h2>
              <p>(18675766521)</p>
          </div>
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
          <li>实名认证</li>
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
.userBox{
    .shadow;
    position: relative;
    height:7rem;
    box-sizing: border-box;
    padding:1rem 1rem 1rem 7rem;
    .moreBg;
    .headPortrait{
        position: absolute;
        top:1rem;
        left: 1rem;
        width:5rem;
        height: 5rem;
        .circle;
        object-fit: cover;
    }
    .nick{
        line-height: 1.5rem;
        display: inline-block;
        padding-top:1rem;
        h2{
            font-size:@font1-25;
        }
        p{
            font-size:@font1;
            color:@font-Sgray;
        }
    }
    .btn{
        position: absolute;
        top:2rem;
        right:5rem;
        input{
            background: @blue;
            color:@white;
            padding:0.5rem 1.5rem;
            margin:0 0.5rem;
            .border-radius;
        }
    }
}
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