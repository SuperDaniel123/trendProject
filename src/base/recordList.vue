<template>
  <div class="recordList">
    <back-header :headline="headline"></back-header>
    <div class="content">
      <div class="line"></div>
        <ul class="recordAll">
          <li class="clearfix"><time>2018年3月5日</time><span>存入:1000元</span></li>
          <li class="clearfix"><time>2018年3月5日</time><span>存入:1000元</span></li>
          <li class="clearfix"><time>2018年3月5日</time><span>存入:1000元</span></li>
          <li class="clearfix"><time>2018年3月5日</time><span>存入:1000元</span></li>
          <li class="clearfix"><time>2018年3月5日</time><span>存入:1000元</span></li>
          <li class="clearfix"><time>2018年3月5日</time><span>存入:1000元</span></li>
        </ul>
    </div>
  </div>
</template>

<script>
import backHeader from '@/components/back-header'
export default {
  name: 'recordList',
  components:{
    backHeader
  },
  data () {
    return {
      headline:'预存记录'
    }
  },
}
</script>

<style lang='less' scoped>
@import '../common/css/common.less';
.line{
    .e-line;
}
.recordAll{
  margin:0 0.5rem;
  background: @white;
  li{
    padding:0 1rem;
    line-height: 3.5rem;
    font-size:@font1;
    .bottomRim;
    span{
      float: right;
    }
  }
  
}
</style>
