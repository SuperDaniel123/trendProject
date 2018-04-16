<template>
  <div class="recordList">
    <back-header :headline="headline"></back-header>
    <div class="content">
        <div class="line"></div>

          <!--充值记录-->
          <scroller v-if="this.$route.query.type == 'deposit'" lock-x height="500px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="500" >
            <div class="recordAll">
              <div class="clearfix" v-for="i in dataList1" :key="i.index"> {{i.SignupTime}}<span>存入:{{i.OrderAmount}}元</span></div>
              <p v-if="!loadIf">没有更多了</p>
              <load-more v-if="loadIf" tip="loading"></load-more>
            </div>
          </scroller>
          <!--交易记录-->
          <ul v-if="this.$route.query.type == 'history'" class="history">
            <li v-for="item in dataList" :key="item.index">
              <h2>{{item.FinalTime}} <span v-text="item.Name"></span></h2>
              <div class="text">
                  <p class="clearfix">止损:<i v-text="item.StopLoss"></i></p>
                  <p class="clearfix">获利:<i v-text="item.TakeProfit"></i></p>
                  <p class="clearfix">库存费:<i v-text="item.OrderDeposit"></i></p>
                  <p class="clearfix">手续费:<i v-text="item.OrderFee"></i></p>
                  <p class="clearfix">买入:<i v-text="item.Quantity"></i>手</p>
                  <p class="clearfix">结果:<i v-text="item.ProfitOrLoss"></i></p>
              </div>

            </li>
          </ul>
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
      ...mapGetters(['setMID']),
      headline(){
        switch(this.$route.query.type){
          case 'deposit' :{
            return '预存记录'
          }
          case 'history' :{
            return '交易记录'
          }
        }
      }
  },
  data () {
    return {
      dataList:[],
      dataList1:[],
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
            let arr = this.dataList1.concat(res.data.Data)
            for(let i = 0; i <arr.length ; i++){
                let temp = arr[i]
                temp['SignupTime'] = timestamp(temp['SignupTime'])
            }
            this.dataList1 = arr
          })
        }
        case 'history' :{
          this.$ajax('/trade/history','post',{MID:this.setMID}).then(res=>{
              let data = res.data.Data
              if(res.status != 200){
                  console.log('error!')
                  return
              }
              for(let i = 0; i<data.length; i++){
                let temp = data[i];
                temp['FinalTime'] = timestamp(temp['FinalTime'])
              }
              this.dataList = data
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

.history{
  padding:0 1rem;
  li{
    padding:0 1rem;
    background: @white;
    .bottomRim;
    h2{
      line-height:2.5rem;
      span{
        float:right
      }
    }
    .text{
      display: flex;
      flex-wrap:wrap;
      p{
        width:50%;
        font-size:@font1;
        color:@font-Sgray;
        line-height: 1.8rem;
      }
    }
  }
}
</style>
