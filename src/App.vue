<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'App',
  created(){
    if(this.$store.getters.setMID){
      this.login(true)
    }
    if(!this.$store.getters.isLogin){
      alert('请先登录');
      this.$router.push('/login')
    }
  },
  methods:{
    ...mapMutations({
      login:'IS_LOGIN'
    })
  }
}
</script>

<style lang="less">
#app{
  height:100%;
}
</style>
