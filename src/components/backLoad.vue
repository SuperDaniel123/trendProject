<template>
    <div class="wait" :style="'height:'+ this.heightD">
        <div class="text">
            <inline-loading></inline-loading>
            <p>加载中..</p>
        </div>
    </div>
</template>

<script>
import { InlineLoading } from 'vux'
export default {
    components:{
        InlineLoading,
    },
    computed:{
        heightD(){
            return window.screen.height + 'px'
        }
    }
    
}
</script>

<style lang="less" scoped>
.wait{
    background: rgba(0, 0, 0, 0.2);
    top:0;
    left:0;
    position: fixed;
    width:100%;
    z-index: 9999999;
    .text{
        text-align: center;
        position: absolute;
        top:40%;
        width:100%;
    }
}
</style>

