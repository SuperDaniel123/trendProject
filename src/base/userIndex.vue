<template>
  <div>
      <i-header :headline="headline"></i-header>
      <div class="userBox">
          <img class="headPortrait" src="../common/images/portrait.png" />
          <div class="nick">
              <h2>昵称: <span>刘某某</span></h2>
              <p>(18675766521)</p>
          </div>
          <div class="btn">
              <input type="button" value="充值" />
              <input type="button" value="提现" />
          </div>
      </div>
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
@import '../common/css/common.less';
.userBox{
    .shadow;
    position: relative;
    height:7rem;
    box-sizing: border-box;
    padding:1rem 1rem 1rem 7rem;
    background: @white;
    .headPortrait{
        position: absolute;
        top:1rem;
        left: 1rem;
        width:5rem;
        height: 5rem;
        .circle;
        object-fit: cover;
    }
    .nick{
        line-height: 1.5rem;
        display: inline-block;
        padding-top:1rem;
        h2{
            font-size:@font1-25;
        }
        p{
            font-size:@font1;
            color:@font-Sgray;
        }
    }
    .btn{
        position: absolute;
        top:2rem;
        right:5rem;
        input{
            background: @blue;
            color:@white;
            padding:0.5rem 1.5rem;
            margin:0 0.5rem;
            .border-radius;
        }
    }
}
</style>