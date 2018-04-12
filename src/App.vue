<template>
  <div id="app">
    <loading v-if="this.isLoading"></loading>
    <router-view/>

  </div>
</template>

<script>
import {mapMutations,mapGetters} from 'vuex'
import loading from '../src/components/loading'
export default {
  name: 'App',
  components:{
    loading
  },
  created(){
    if(this.$store.getters.setMID){
      this.login(true)
    }
    if(!this.$store.getters.isLogin){
      // alert('请先登录');
      this.$router.push('/login')
    }
  },
  computed:{
    ...mapGetters(['isLoading'])
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
