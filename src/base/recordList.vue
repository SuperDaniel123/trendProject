<template>
  <div class="recordList">
    <back-header :headline="headline"></back-header>
    <div  style="padding-top:44px;box-sizing: border-box;height:100%;background: @bgGray;">
        <div class="line"></div>

          <!--充值记录-->
          <scroller v-if="this.$route.query.type == 'deposit'" lock-x :height="heightStte" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="500" >
            <div class="recordAll">
              <div class="clearfix" v-for="i in dataList" :key="i.index"> {{i.SignupTime}}<i>{{i.Status == 20? '成功':'未付款'}}</i><span>存入:{{i.OrderAmount}}</span></div>
              <p v-if="!loadIf">没有更多了</p>
              <load-more v-if="loadIf" tip="loading"></load-more>
            </div>
          </scroller>

          <!--提现记录-->
          <scroller v-if="this.$route.query.type == 'withdrawal'" lock-x :height="this.heightStte" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="500" >
            <div class="recordAll">
              <div class="clearfix" v-for="i in dataList" :key="i.index"> {{i.AddTime}}<i>{{Wstate(i.Status)}}</i><span>取出:{{i.OrderAmount}}</span></div>
              <p v-if="!loadIf">没有更多了</p>
              <load-more v-if="loadIf" tip="loading"></load-more>
            </div>
          </scroller>

          <!--交易记录-->
          <scroller v-if="this.$route.query.type == 'history'" lock-x :height="this.heightStte" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="500" >
            <ul class="history">
              <li v-for="item in dataList" :key="item.index">
                <h2>{{item.CloseTime}} <span v-text="item.Name"></span></h2>
                <div class="text">
                    <p class="clearfix"><span>买入价:</span><i v-text="item.CurrentPrice"></i></p>
                    <p class="clearfix"><span>卖出价:</span><i v-text="item.ClosePrice"></i></p>
                    <p class="clearfix"><span>止损:</span><i v-text="item.StopLoss"></i></p>
                    <p class="clearfix"><span>获利:</span><i v-text="item.TakeProfit"></i></p>
                    <p class="clearfix"><span>库存费:</span><i v-text="item.AcrossFee"></i></p>
                    <p class="clearfix"><span>手续费:</span><i v-text="item.OrderFee"></i></p>
                    <p class="clearfix"><span>{{item.PayType == 0?'买入':'卖出'}}:</span><i>{{item.Quantity}}手</i></p>
                    <p class="clearfix"><span>结果:</span><i v-text="item.ProfitOrLoss"></i></p>
                    <p class="clearfix"><span>注释:</span><i v-text="item.OutStock"></i></p>
                </div>
              </li>
              <p v-if="!loadIf">没有更多了</p>
              <load-more v-if="loadIf" tip="loading"></load-more>
            </ul>
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
      ...mapGetters(['setMID']),
      headline(){
        switch(this.$route.query.type){
          case 'deposit' :{
            return '预存记录'
          }
          case 'history' :{
            return '交易记录'
          }
          case 'withdrawal' :{
            return '提现记录'
          }
        }
      },
      heightStte(){
        return window.screen.height - 44 - 20 + 'px'
      }
  },
  data () {
    return {
      dataList:[],
      page:1,
      loadIf:true,
      onFetching:false,
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

    //冒泡排序
    bubble(data){
      let arr = data
      for(var j=0;j<arr.length-1;j++){
          //两两比较，如果前一个比后一个大，则交换位置。
          for(var i=0;i<arr.length-1-j;i++){
              if(arr[i].CloseTime<arr[i+1].CloseTime){
                  var temp = arr[i];
                  arr[i] = arr[i+1];
                  arr[i+1] = temp;
              }
              
          } 
      }
      return arr
    },

    //判断类型
    getRequest(type){
      switch(type){
        case 'deposit':{
          this.getAllList('deposit')
          break;
        }
        case 'withdrawal':{
          this.getAllList('withdrawal')
          break;
        }
        case 'history' :{
          this.getAllList('history')
        }
      
      }
    },


    //获取数据封装
    getAllList(genre){
      let opt = {
          MID:this.setMID,
          Page:this.page,
          Limit:genre == 'history'? 10:15,
          StartTime: '2017-01-01',
          EndTime: '2018-12-30',
      }
      let urls = (d) =>{
        if(d == 'history'){
          return '/trade/history'
        }
        if(d == 'withdrawal'){
          return '/withdrawal/list'
        }
        if(d == 'deposit'){
          return '/deposit/list'
        }
      }

      this.$ajax(urls(genre),'post',opt).then(res=>{
          let data = res.data.Data
          if(res.status != 200){
              console.log('error!')
              return
          }
          if((res.data.Data&&res.data.Data.length == 0) || !res.data.Data){
            this.loadIf = false;
            return;
          }
          if(res.data.Data&&res.data.Data.length < 10){
            this.loadIf = false;
          }

          if(genre == 'history'){
            data = this.bubble(data)
          }
          let arr = this.dataList.concat(data)
          for(let i = 0; i<arr.length; i++){
            let temp = arr[i];
            if(genre == 'history'){
              temp['CloseTime'] = timestamp(temp['CloseTime'])
            }
            if(genre == 'withdrawal'){
               temp['AddTime'] = timestamp(temp['AddTime'])
            }
            if(genre == 'deposit'){
              temp['SignupTime'] = timestamp(temp['SignupTime'])
            }
            
          }
          this.dataList = arr
      })

    },


    //提现状态
    Wstate(id){
        switch(id){
            case 0:
              return '待审核'
              break;
            case 10:
              return '待转账'
              break;
            case 11:
              return '审核失败'
              break;
            case 20:
              return '转账中'
              break;
            case 30:
              return '转帐成功'
              break;
            case 31:
              return '转账失败'
              break;
            default:{
                return '提现失败'
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
    i{
      float:right;
      margin-left:2rem;
    }
  }

}
.history p,.recordAll p{
  width:100%;
  text-align: center;
  line-height: 4rem;
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
        text-align: left;
        padding:0 0.5rem;
        box-sizing: border-box;
        font-size:@font1;
        color:@font-Sgray;
        line-height: 1.8rem;
        i{
          float: right;
        }
      }
      p:nth-last-of-type(1){
        width:100%;
      }
    }
  }
}
</style>
