<template>
  <div>
      <i-header :headline="headline"></i-header>
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

</style>