<template>
  <div>
      <div class="line"></div>
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
            headline:'交易'
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.line{
    .e-line;
}
</style>