<template>
  <div class="test">
    <div id="main" style="max-width: 100%;height:42rem"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'test',
    components:{
        echarts
    },
    props:['eindex'],
    created(){
        this.Kline(this.eindex.key);
    },
    data () {
        return {
            //原始数据
            isArr:[],
            //处理后数据
            data0:'',
            //线图初始化
            theLine:'',


            //颜色
            upColor:'#ec0000',
            upBorderColor:'#ec0000',
            downColor:'#00da3c',
            downBorderColor:'#008F28',

        }
    },
    watch:{
        'eindex':{
            handler(val,old){
                if(val.key == '0'){
                    return;
                }
                this.theLine.close();
                this.charts.clear();
                this.Kline(this.eindex.key)
            },
            deep:true
        }
    },
    computed:{
        code(){
            return this.$route.query.details
        },
    },
    beforeDestroy(){
        this.theLine.close();
    },
    methods: {
        splitData(rawData) {
            var categoryData = [];
            var values = []
            for (let i = 0; i < rawData['PriceItemList'].length; i++) {
                let dar = rawData['PriceItemList'][i]
                categoryData.push(dar.PriceDateTime);
                values[i] = new Array();
                for(let key in dar){
                    if(key != 'PriceDateTime'){
                        values[i].push(+dar[key])
                    }
                }
            }
            return {
                categoryData: categoryData,
                values: values
            };
        },


        calculateMA(dayCount) {
            var result = [];
            for (var i = 0, len = this.data0.values.length; i < len; i++) {
                if (i < dayCount) {
                    result.push('-');
                    continue;
                }
                var sum = 0;
                for (var j = 0; j < dayCount; j++) {
                    sum += this.data0.values[i - j][1];
                }
                result.push((sum / dayCount).toFixed(5));
            }
            return result;
        },

        drawPie(id){
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
            backgroundColor: 'rgb(255,255,255)',
            //提示框
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    fontSize:10,
                    color:'#fff'
                },
                triggerOn:'click',
                axisPointer: {
                    link: [{
                        xAxisIndex: [0, 1]
                    }],
                    lineStyle: {
                        color: '#bbbbbb',
                        width: 1,
                        opacity: 1
                    },
                    
                }

            },
            // legend: {
            //     data: ['日K', 'MA5', 'MA10', 'MA15'],
            //     textStyle: {
            //         color: '#fff'
            //     }
            // },
            grid: {
                top:"5%",
                left: '2%',
                right: '10%',
                bottom: '10%'
            },
            xAxis: {

                type: 'category',
                data: this.data0.categoryData,
                scale: true,
                axisLine: {lineStyle: { color: '#8392A5' ,width:"1",type:"double"}},
                splitLine:{show: true,
                    lineStyle:{
                        color: "#f0f0f0",
                        width: 1,
                        type: 'solid'
                    }
                },//网格线
                splitArea : {show : false},//网格区域
                axisLabel:{
                    textStyle:{
                        color:'#666',
                        fontSize:8
                    },
                }

            },
            yAxis: {
                position:'right',
                scale: true,
                axisLine: { lineStyle: { color: '#8392A5' ,width:"1",type:"dashed"}},
                axisLabel: {
                        textStyle: {
                            color: 'rgb(32,117,195)',//坐标值得具体的颜色
                            fontSize:8
                        }
                    },
                splitLine:{show: true,
                    lineStyle:{
                        color: "#f0f0f0",
                        width: 1,
                        type: 'solid'
                    }
                },//网格线
                splitArea: {
                    show: false
                }
            },

            dataZoom: [
                {
                    type: 'inside',
                    start: 30,
                    end: 100
                },
                {
                    show: false,
                    type: 'slider',
                    y: '95%',
                    start:30,
                    end: 100
                }
            ],
            series: [

                    {
                    name:this.eindex.value,
                    type: 'candlestick',
                    data: this.data0.values,
                    itemStyle: {
                        normal: {
                            color: this.upColor,
                            color0: this.downColor,
                            borderColor: this.upBorderColor,
                            borderColor0: this.downBorderColor
                        }
                    },
                    markLine: {
                        symbol: ['none', 'none'],
                        data: [
                            [
                                {
                                    // name: 'from lowest to highest',
                                    // type: 'min',
                                    // valueDim: 'lowest',
                                    // symbol: 'circle',
                                    // symbolSize: 10,
                                    // label: {
                                    //     normal: {show: false},
                                    //     emphasis: {show: false}
                                    // }
                                },
                                {
                                    type: 'max',
                                    valueDim: 'highest',
                                    symbol: 'circle',
                                    symbolSize: 10,
                                    label: {
                                        normal: {show: false},
                                        emphasis: {show: false}
                                    }
                                }
                            ],

                        ]
                    }
                },
                {
                    name: 'MA3',
                    type: 'line',
                    data: this.calculateMA(3),
                    smooth: true,
                    lineStyle: {
                        normal: {
                            opacity: 0.5,
                            color:'red'
                            
                        }
                    }
                },
                {
                    name: 'MA5',
                    type: 'line',
                    data: this.calculateMA(5),
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
                {
                    name: 'MA15',
                    type: 'line',
                    data: this.calculateMA(15),
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                }

            ]
        })
        },

        Kline(min){
            this.theLine = new WebSocket('ws://price.fa513.cn:16999/');
            this.theLine.onmessage = (e)=>{   
            var data =JSON.parse(e.data);
                // 握手
                if(data.Type ==='Login'){
                    this.theLine.send('{"Type":"Login","senDd":"'+data.sendid+'"}');
                    this.theLine.send('{"Type":"KChart","Code":"'+ this.code +'","Min": "'+ min +'"}')
                }
                //获取原始数据
                if(data.ResultCD == 200 && data.Code == this.code){
                    this.isArr = data
                    let arr = this.splitData(data);
                    this.data0 = arr;
                    this.drawPie('main')
                    
                }
                //更新线图
                if(data['Type'] == 'ChartUpdate' && data.Time){
                    this.theLine.close();
                    this.Kline()
                }

            }
        },

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
