<template>
  <div class="hello">
    <i @click="getBack">111</i>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    getBack(){
      this.$router.goBack();
    }
  }
}
</script>

<style lang='less' scoped>
@import '../common/css/common.less';

</style>
