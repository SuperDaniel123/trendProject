<template>
  <div class="market">
      <div class="line"></div>
      <i-header :headline="headline"></i-header>
      <ul class="marketList">
          <li v-for="(item,index) in this.mkChange" :key='index' :class="[item.return_UpDown == 1? 'rise':'fall']" @click="getPush(item.Code,item.Ask)" >
              <div class="title">
                  <h2 v-text="codeName(item.Code)"></h2>
                  <span>点差:{{item.Diff|| '-'}}</span>
                  <i v-if="item.return_UpDown == 1" class="fa fa-caret-up"></i>               
                  <i v-if="item.return_UpDown == 2" class="fa fa-caret-down"></i>         
              </div>
              
              <ul class="priceBox">
                  <li>
                      <h3 v-text="item.Ask || '-'"></h3>
                      <span>最高:{{item.Max || '-'}}</span>
                  </li>
                  <li>
                      <h3 v-text="item.Bid|| '-'"></h3>
                      <span>最低{{item.Min || '-'}}</span>
                  </li>
              </ul>
          </li>
      </ul>
      <router-link :to="{path:'/proListChange'}">
        <div class="more">
            <i class="fa fa-plus-circle"></i>
        </div>
      </router-link>
  </div>
</template>

<script>
import iHeader from '@/components/i-header'
import {mapGetters} from 'vuex'
import { setTimeout } from 'timers';
export default {
    components:{
        iHeader,
    },
    created(){
        this.getPost();
    },
    computed:{
        ...mapGetters(['setMID']),
    },
    beforeDestroy(){
        this.wsCurrPrice.close();
    },
    data(){
        return{
            headline:'最新行情',
            //产品itemID
            itemID:[],
            mkChange:[], 
            wsCurrPrice:''
        }
    },
    methods:{
        codeName(code){
            let arr = this.itemID
            for(let i = 0; i < arr.length; i++){
                let temp = arr[i]
                for(let key in temp){
                    if(temp[key] == code){
                        return temp['TypeName']
                    }
                }
            }
        },

        getPost(){
            this.$ajax('/trade/game','post',{MID:this.setMID}).then(res=>{
                if(res.data.ResultCD != 200){
                    console.log('error!')
                    return
                }
                let arr = res.data.Data
                for(let i = 0 ; i<arr.length; i++){
                    for(let key in arr[i]){
                        let o = {}
                        if(key == "ItemID"){
                            o['ItemID'] = arr[i][key]
                            o['code'] = arr[i]['Code']
                            o['TypeName'] = arr[i]['TypeName']
                            this.itemID.push(o)
                            
                        }
                    }
                    
                }
                this.mkChange = res.data.Data
                this.excludeList()

            })
            
        },

        //排除
        excludeList(){
            let localCode = localStorage.getItem('code')
            if(!localCode){
                this.wsCurrPriceCONN();
                return
            }
            let arr = localCode.split(' ')
            let list = this.mkChange;
            
            for(let i = 0 ; i<list.length; i++){
                for(let j = 0; j<arr.length; j++){
                    if(list[i] && list[i]["Code"] == arr[j]){
                        list.splice(i,1)
                    }
                }
            }
            this.mkChange = list;
            this.wsCurrPriceCONN();
        },

        getPush(pro,ask){
            if(!ask){
                return;
            }
            let id;
            for(let i = 0; i<this.itemID.length; i++){
                let entity = this.itemID[i]
                if(pro == entity['code']){
                    id = entity['ItemID']
                }
            }
            this.$router.push({
                path:'/quotation',
                query: {
                    details:pro,
                    itemID:id
                } 
            })
        },
        wsCurrPriceCONN(){	//初始化端口连接-DONE
            this.wsCurrPrice = new WebSocket('ws://price.fa513.cn:16888/');	//ws://mid.price.fcczq.com:16888
            this.wsCurrPrice.onmessage = (e)=>{            
                let data = eval("("+e.data+")");
                if(data['sendid']){
                    this.wsCurrPrice.send('{"senDd":"'+data['sendid']+'"}');
                }
                if(!data.hasOwnProperty('Code')){
                    return;
                }
                let list = this.mkChange
                
                for(let i = 0; i <list.length; i++){
                    if(list[i]['Code'] == data['Code']){
                        // for(var key in data){
                        //     this.mkChange[i][key] = data[key]
                        // }
                        list.splice(i,1,data)
                    }
                }
                this.mkChange = list
                

            }
            

                // pubPrice.updateData(e);
            // wsCurrPrice.onclose = ()=> {
            //     // console.log("CurrPrice reConnect :(");
            //     setTimeout('wsCurrPriceCONN()',3000);
            // };
            this.wsCurrPrice.onerror = () => {
                /*if(typeof layer !='undefined'){
                    layer.open({content:'WS连接服务器失败请稍候再试',skin:'msg',time:2})
                }*/
                console.log("Error!!");
            };
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
        padding-bottom: 1rem;
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
