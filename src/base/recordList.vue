<template>
  <div class="recordList">
    <back-header :headline="headline"></back-header>
    <div class="content">
        <div class="line"></div>
          <scroller lock-x height="500px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="500" >
            <div class="recordAll">
              <div class="clearfix" v-for="i in dataList" :key="i.index"> {{i.SignupTime}}<span>存入:{{i.OrderAmount}}元</span></div>
              <p v-if="!loadIf">没有更多了</p>
              <load-more v-if="loadIf" tip="loading"></load-more>
            </div>
          </scroller>
        <div class="line"></div>
    </div>
  </div>
</template>

<script>
import backHeader from '@/components/back-header'
import {Scroller,LoadMore} from 'vux'
import {timestamp} from '@/common/js/common.js'
import {mapGetters} from 'vuex'
export default {
  name: 'recordList',
  components:{
    backHeader,
    Scroller,
    LoadMore,
    timestamp
  },
  created(){
    this.getRequest(this.$route.query.type)
  },
  computed:{
      ...mapGetters(['setMID'])
  },
  data () {
    return {
      headline:'预存记录',
      dataList:[],
      page:1,
      loadIf:true,
      onFetching:false
      
    }
  },
  
  methods:{
    
    onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          setTimeout(() => {
            this.page++
            this.getRequest(this.$route.query.type);
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            })
            this.onFetching = false
          }, 2000)
        }
    },
    getRequest(type){
      let opt ={
          MID:this.setMID,
          Page:this.page,
          Limit:15,
          StartTime: '2017-01-01',
          EndTime: '2018-12-30',
      }
      switch(type){
        case 'deposit':{
          this.$ajax('/deposit/list','post',opt).then(res=>{
            if(res.status != 200){
                console.log('error!')
                return
            }
            if(res.data.Data.length == 0 || !res.data.Data){
              this.loadIf = false;
              return;
            }
            let arr = this.dataList.concat(res.data.Data)
            for(let i = 0; i <arr.length ; i++){
                let temp = arr[i]
                temp['SignupTime'] = timestamp(temp['SignupTime'])
            }
            this.dataList = arr
          })
        }
      
      }
    }
  }
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
  div{
    padding:0 1rem;
    line-height: 4rem;
    font-size:@font1;
    .bottomRim;
    span{
      float: right;
    }
  }
  p{
    width:100%;
    text-align: center;
    line-height: 4rem;
  }
  
}
</style>
