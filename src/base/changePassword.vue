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
            <button @click="getAffirm">确定</button>
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
          headline:'修改密码',
          oldcode:'',
          newcode:'',
          affirm:''
      }
  },
  methods:{
      getAffirm(){
        if(!this.oldcode || !this.newcode || !this.affirm){
            this.$vux.alert.show({
                content: '密码不能为空',
            })
        }else if(this.oldcode == this.newcode){
            this.$vux.alert.show({
                content: '新旧密码不能相同',
            })
        }else if(this.newcode != this.affirm){
            this.$vux.alert.show({
                content:'新密码不一致'
            })
        }else{
            this.$vux.alert.show({
                content:'成功'
            })
        }

      }
  }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';


</style>

