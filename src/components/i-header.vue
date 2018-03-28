<template>
  <div class='header'>
      <h1>{{headline}}</h1>
  </div>
</template>

<script>
export default {
  props:['headline']
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
    .header{
        position: fixed;
        top:0;
        z-index: 99;
        left: 0;
        width:100%;
        height:44px;
        background: #fff;
        text-align:center;
        line-height: 44px;
        font-size:18px;
        .bottomRim;
        
    }
</style>
