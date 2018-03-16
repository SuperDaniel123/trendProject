<template>
  <div class="market">
      <div class="line"></div>
      <i-header :headline="headline"></i-header>
      <ul class="marketList">
          <li v-for="(item,index) in this.mklist" :key='index' :class="[item.state == 0? 'rise':'fall']" >
              <div class="title">
                  <h2 v-text="item.name"></h2>
                  <span>点差:{{item.difference}}</span>
                  <i v-if="item.state == 0" class="fa fa-caret-up"></i>               
                  <i v-if="item.state == 1" class="fa fa-caret-down"></i>         
              </div>
              
              <ul class="priceBox">
                  <li>
                      <h3 v-text="item.rise"></h3>
                      <span>最高:{{item.max}}</span>
                  </li>
                  <li>
                      <h3 v-text="item.fall"></h3>
                      <span>最低{{item.mix}}</span>
                  </li>
              </ul>
          </li>
      </ul>
      <div class="more">
          <i class="fa fa-plus-circle"></i>
      </div>
  </div>
</template>

<script>
import iHeader from '@/components/i-header'

export default {
    components:{
        iHeader,
        
    },

    data(){
        return{
            headline:'最新行情',
            mklist:[{
                name:'美的集团',
                difference:'19',
                rise:'1.21985',
                fall:'1.21986',
                max:'1.211981',
                mix:'1.21989',
                state:0,
            },
            {
                name:'美的集团',
                difference:'19',
                rise:'1.21985',
                fall:'1.21986',
                max:'1.211981',
                mix:'1.21989',
                state:1,
            }]
        }
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.line{
    .e-line;
}
.market{
    
    .more{
        width:100%;
        text-align: center;
        margin-top:1rem;
        i.fa{
            font-size:2rem;
            color:@font-Sgray;
        }
    }
}
.marketList{
    width:100%;
    >li{
        h3{
            height:2rem;
        }
        display: flex;
        .bottomRim;
        padding:0.5rem 0.5rem 0.5rem 1rem;
        background: @white;
        .title{
            position: relative;
            width:15rem;
            .fa{
                margin-left: 0.5rem;
                font-size:@font1-25;
            }
            h2{
                color: @font-Lgray;
                font-size:@font1-25;
            }
            span{
                color:@font-Sgray;
            }
        }
        .priceBox{
            flex:1;
            display: flex;
            li{
                flex: 1;
                text-align: center;
                h3{
                    font-size:@font1-25;
                }
                span{
                    font-size:@font1;
                    color:@font-Sgray;
                }
            }
        }
    }
    >li.rise{
        h3{
            color:@red
        }
        .title{
            .fa{
                color:@red;
            }
        }
    }
    >li.fall{
        h3{
            color:@blue
        }
        .title{
            .fa{
                color:@blue;
            }
        }
        
    }
}
</style>
