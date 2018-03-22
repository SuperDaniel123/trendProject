<template>
  <div>
      <back-header :headline="headline"></back-header>
      <div class="content">
            <div class="commonList">
                <li><span>姓名：</span><input type="text" placeholder="请输入原密码" v-model="user" :disabled='disabled' /></li>
                <li><span>性别：</span><input type="text" placeholder="请输入原密码" v-model="gender" :disabled='disabled' /></li>
                <li><span>身份证</span><input type="number" placeholder="请输入原密码" v-model="identityCard" :disabled='disabled' /></li>
            </div>
            <div class="boundbtn">
                <button>提交申请</button>
            </div>
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
          headline:'实名认证',
          user:'刘某某',
          gender:'女',
          identityCard:'440602199906140055',
          disabled:true
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
