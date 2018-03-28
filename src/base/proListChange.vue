<template>
  <div>
      <back-header :headline="headline"></back-header>
      <div class="content">
          <div class="common plusList">
                <h2 class="title">已选</h2>
                <!-- <ul class="teams">
                    <li > -->
                        <swipeout>
                            <swipeout-item  transition-mode="follow" v-for="(item,index) in this.plusStock" :key="index" >
                                <div slot="right-menu">
                                    <swipeout-button @click.native="onDelClick(index)" type="warn">删除</swipeout-button>
                                </div>
                                <div slot="content" class="conLine">
                                    <i class="fa fa-minus-circle"></i>
                                    <span v-text="item.Name"></span>
                                </div>
                            </swipeout-item>
                        </swipeout>
                    <!-- </li>
                </ul> -->
          </div>
          <div class="common minuList">
              <h2 class="title">可选</h2>
              <ul class="teams">
                  <li v-for="(item,index) in this.minusStock" :key="index">
                      <i class="fa fa-plus-circle" @click="getPlus(index)"></i>
                      <span v-text="item.Name"></span>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
import backHeader from '@/components/back-header'
import {pageHeight} from '../common/js/common.js'
import { Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
import {mapGetters} from 'vuex'
export default {
    components:{
        backHeader,
        pageHeight,
        Swipeout,
        SwipeoutItem, 
        SwipeoutButton
    },
    computed:{
      ...mapGetters(['setMID']),
    },
    created(){
        this.getStock()
    },
    mounted(){
        pageHeight('.content')
    },
    data(){
        return{
            headline:'增加股票',
            plusStock:[],
            minusStock:[],
            codeStr:''
        }
    },
    
    methods:{
        getStock(){
            this.$ajax('/trade/game','post',{MID:this.setMID}).then(res=>{
                if(res.data.ResultCD != 200){
                    console.log('error!')
                    return
                }
                let list = res.data.Data
                let stock = []
                if(!localStorage.getItem('code')){
                    this.plusStock = list;
                    this.minusStock = stock
                    return
                }
                this.codeStr = localStorage.getItem('code')
                let localCode = this.codeStr.split(' ')
                
                
                for(let i = 0; i <list.length; i++){
                    for (let j = 0; j<localCode.length; j++){
                        if(list[i] && list[i]['Code'] == localCode[j]){
                            stock.push(list[i])
                            list.splice(i,1)
                        }
                    }
                }
                this.plusStock = list;
                this.minusStock = stock

            })
        },
        //删除
        onDelClick (id) {
            this.minusStock.push(this.plusStock[id])
            if(this.codeStr == ''){
                this.codeStr += this.plusStock[id]['Code']
            }else{
                this.codeStr += ' ' + this.plusStock[id]['Code']
            }
            
            localStorage.setItem('code',this.codeStr)
            this.plusStock.splice(id,1);

        },
        //添加
        getPlus(id){
            this.plusStock.push(this.minusStock[id])
            let eCode = this.codeStr.split(' ')
            for(let i = 0; i<eCode.length; i++){
                let c;
                if(this.minusStock[id]['Code']== eCode[i]){
                    eCode.splice(i,1)
                    c = eCode.join(' ')
                    this.codeStr = c;
                    localStorage.setItem('code',c)
                }
            }
            this.minusStock.splice(id,1);
        }
    }
  
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.title{
    height:2rem;
    line-height: 2rem;
    text-indent: @font1;
    font-size:@font1;
}
.common{
    .conLine{
        position: relative;
        background: url('../common/images/leftDouble.png') no-repeat 95% center;
        background-size:2rem 2rem;
        height:4rem;
        .bottomRim;
        line-height: 4rem;
        padding:0 1rem;
        text-align: center;
        span{
            font-size:@font1-25;
        }
    }
}
.plusList{
    .conLine{
        i{
            width:2rem;
            height:2rem;
            line-height: 2rem;
            font-size:@font1-5;
            position:absolute;
            color:@red;
            top:1rem;
            left: 1rem;
        }
    }
}

.minuList{
    .teams{
        li{
            position: relative;
            line-height: 4rem;
            text-align: center;
            background: @white;
            span{
                font-size:@font1-25;
            }
            i{
                width:2rem;
                height:2rem;
                line-height: 2rem;
                font-size:@font1-5;
                position:absolute;
                color:@blue;
                top:1rem;
                left: 1rem;
            }
        }
    }
}
</style>

