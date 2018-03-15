<template>
  <div class="footer">
      <ul class="nav">
          <li :class="[item.state == '1'? 'fontBlue' : '']" v-for="(item,index) in this.navList" :key="index" @click="switchItem(index)"><i :class="'fa '+ item.icon"></i><span v-text="item.name"></span></li>
      </ul>
  </div>
</template>

<script>
export default {
  name:'ifooter',
  data(){
      return{
          navList:[
            {
                name:'行情',
                icon:'fa-bar-chart',
                state:'1'
            },
            {
                name:'交易',
                icon:'fa-gg-circle',
                state:'0'
            },
            {
                name:'记录',
                icon:'fa-book',
                state:'0'
            },
            {
                name:'我的',
                icon:'fa-user',
                state:'0'
            }
        ]
      }
  },
  methods:{
      switchItem(e){
          let item = this.navList;
          for(let i = 0 ; i < this.navList.length ; i++){
              item[i].state = '0';
          }
          item[e].state = '1';
          this.navList = item;
          this.$emit('indexNode',e)
      } 
  }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
    .footer{
        position: fixed;
        bottom:0;
        left: 0;
        background: #fff;
        border-top:1px solid @bgGray;
        width:100%;
        height:50px;
        ul.nav{
            display: flex;
            li{
                transition: all 0.2s;
                height:50px;
                box-sizing: border-box;
                padding:5px 0;
                flex: 1;
                text-align: center;
                color:@font-Sgray;
                span{
                    display: inline-block;
                    width:100%;
                }
                i{
                    font-size:20px;     
                }
            }
            .fontBlue{
                transition: all 0.2s;
                color:@blue
            }
        }
    }
</style>
