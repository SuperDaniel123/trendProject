<template>
  <div class="timeCharts">
    <div id="main" :style="'max-width: 100%;height:'+ heightD"></div>
    <!-- <div v-text="price"></div> -->
  </div>
</template>

<script>
import echarts from 'echarts'
import recordVue from '../base/record.vue';
export default {
    components:{
        echarts
    },
    
    data(){
        return{
            sdata:[],
            charts:'',
            wsCurrPrice:'',
            wsCurr2:'',
        }
    },
    computed:{
        code(){
            return this.$route.query.details
        },
        heightD(){
            return window.screen.height - 140 +'px'
        }

    },
    created(){
        this.wsCurrPriceCONN()
    },
    beforeDestroy(){
        this.wsCurr2.close();
    },
    methods:{
        drawPie(id){

            this.charts = echarts.init(document.getElementById(id))
                var opt = {
                    coord: [this.sdata.time[this.sdata['time'].length - 1] ,  this.sdata.price[this.sdata.price.length - 1]],
                    value: this.sdata.price[this.sdata.price.length - 1],
                    symbol:'rect',
                    symbolSize:[56,15],
                    symbolOffset:[20,0],
                    itemStyle:{
                        
                        color:'#2197e9'
                    }
                }

            this.charts.setOption(
                {
                    grid: {
                        top:'5%',
                        left: '1%',
                        right: '2.5%',
                        bottom: '3%',
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            animation: false
                        }
                    },
                    xAxis: {
                        type: 'category',
                        splitLine:{
                            show: true,
                            lineStyle:{
                                color:['#f0f0f0'],
                                type:'dashed'
                            }

                        },
                        boundaryGap: false,
                        axisLabel:{
                            textStyle:{
                                color:'#666',
                                fontSize:8
                            },
                        },
                        data:this.sdata['time']
                    },
                    yAxis:  {
                        scale: true,
                        position:'right',
                        splitLine:{
                            show:true,
                            lineStyle:{
                                color:['#f0f0f0'],
                                type:'dashed'
                            }
                        },
                        axisLine:{
                            show: true
                        },
                        axisLabel:{
                            textStyle:{
                                color:'#666',
                                fontSize:9
                            },
                            formatter:function(value){
                                return Math.ceil(value*10000)/10000
                            }
                        },
                        // max:function(value){
                        //     return value.max+value.max*0.001;
                        // },
                        // min:function(value){
                        //     return value.min-value.max*0.001;
                        // }
                    },
                    dataZoom: [
                        {
                            type: 'inside',
                            show: false,
                            start: 0,
                            end: 100
                        }
                    ],
                    animation: false,

                    series: [{
                        name:'价格',
                        type:'line',
                        symbol: false,
                        
                        showSymbol: false,
                        lineStyle:{
                            normal:{
                                width:1,
                                color:'#5b78c0'//如用visualMap需注释掉
                            }
                        },
                        markPoint: {
                            data:[opt] 
                        },
                        // areaStyle:{
                        //     normal:{
                        //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        //             offset: 0,
                        //             color: 'rgba(48,140,234,6)'
                        //         }, {
                        //             offset: 0.5,
                        //             color: 'rgba(48,140,234,.3)'
                        //         }, {
                        //             offset: 1,
                        //             color: 'rgba(48,140,234,0)'
                        //         }])
                        //     }
                        // },
                        data:this.sdata.price,

                    }]
                }
            )
        },
        wsCurrPriceCONN(){	//初始化端口连接-DONE
            this.wsCurrPrice = new WebSocket('ws://price.fa513.cn:16999/');	//ws://mid.price.fcczq.com:16888
            this.wsCurrPrice.onmessage = (e)=>{   
                var data =JSON.parse(e.data); //eval("("+e.data+")");
                    // 握手
                    if(data.Type ==='Login'){
                        this.wsCurrPrice.send('{"Type":"Login","senDd":"'+data.sendid+'"}');
                        this.wsCurrPrice.send('{"Type":"TLine","Code":"'+ this.code +'"}')
                        
                    }
                    if(data.ResultCD == 200 && data.Code == this.code){
                        this.sdata['price'] = data['price']
                        this.sdata['time'] = data['time']
                        this.wsCurrPrice.close();
                        this.wsCurrPriceReal()
                    }
                
            }
        },


        wsCurrPriceReal(){	//初始化端口连接-DONE
            this.wsCurr2 = new WebSocket('ws://price.fa513.cn:16888/');	//ws://mid.price.fcczq.com:16888
            this.wsCurr2.onmessage = (e)=>{            
                let data = eval("("+e.data+")");
                if(data['sendid']){
                    this.wsCurr2.send('{"senDd":"'+data['sendid']+'"}');
                }
                if(!data.hasOwnProperty('Code')){
                    return;
                }
                if(data.Code == this.code){
                    let newTime = this.sdata['time']
                    let newPrice = this.sdata['price']
                    newTime.shift();
                    newPrice.shift();
                    newTime.push(this.inciseStr(data.excTime))
                    newPrice.push(data.Ask)
                    this.price = newPrice[newPrice.length - 1] 
                    this.sdata['time'] = newTime;
                    this.sdata['price'] = newPrice;
                    this.drawPie('main');
                }
            }
            this.wsCurrPrice.onerror = () => {
                console.log("Error!!");
            };
        },

        //字符串转换
        inciseStr(str){
            let a = str.split(' ')
            let b = a.splice(1,1)
            let c = b.join('')
            return c
        }
    }
}
</script>

