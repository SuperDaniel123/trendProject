<template>
  <div>
      <back-header :headline='headline'></back-header>
      <div class="content">
            <div class="userBox person">
                <img class="headPortrait" src="../common/images/portrait.png" />
                <span class="mores">更换头像</span>
            </div>
            <ul class="commonList">
                <li><span>昵称：</span><input type="text" v-model="name" placeholder="昵称" /></li>
                <li><span>电话号码：</span><input type="telPhone" v-model="telPhone" placeholder="电话号码" /></li>
            </ul>
            <div class="disButton">更换账号</div>
      </div>

  </div>
</template>

<script>
import backHeader from '@/components/back-header'
export default {
  components:{
      backHeader
  },
  data(){
      return{
          headline:'个人信息',
          name:'刘某某',
          telPhone:'13450776126'
      }
  }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.person{
    text-align: right;
    line-height: 5rem;
    span.mores{
        padding-right:2rem;
        font-size:@font1;
        color:@font-Sgray;
    }
}
.disButton{
    margin-top:0.5rem;
    text-align: center;
    line-height: 3rem;
    background: @white;
    color:@blue;
    .shadow;

}
</style>
