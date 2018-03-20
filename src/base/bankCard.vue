<template>
  <div>
      <back-header :headline="headline"></back-header>
      <div class="content">
        <ul class="cardList">
            <li></li>
        </ul>
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
            headline:'我的银行卡'
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.content{
    .getPadding;
    box-sizing: border-box;
    background: @bgGray;
}
</style>

