<template>
  <div class="loadBox">
      <div>
          <spinner type="crescent"  class="svg"></spinner>
          <span>Loading</span>
      </div>
      
  </div>
</template>

<script>
import { Spinner } from 'vux'
export default {
    components:{
        Spinner
    }
}
</script>

<style lang="less" scoped>
    .loadBox{
        position: fixed;
        background: #fff;
        z-index: 10;
        top:0;
        left:0;
        width:100%;
        height:100%;
        text-align: center;
        div{
            position: absolute;
            width:100%;
            top:35%;
            .svg{
                width:100%;
            }
            span{
                display: block;
                margin-top:1rem;
            }
        }

    }
</style>
