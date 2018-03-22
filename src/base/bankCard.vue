<template>
  <div>
      <back-header :headline="headline"></back-header>
      <div class="content">
        <ul class="cardList">
            <li v-for="item in this.cardList" :key="item.key">
                <img src="../common/images/bankCard.jpg" />
                <b v-text="item.encrypt"></b>
            </li>
        </ul>
        <div class="boundbtn">
            <router-link to="/addCard">
                <button>添加</button>
            </router-link>
        </div>
      </div>

  </div>
</template>

<script>
import backHeader from '@/components/back-header'
    export default {
    components:{
        backHeader
    },
    mounted(){
        this.dataRes();
    },
    data(){
        return{
            headline:'我的银行卡',
            cardList:[
                {
                    cardNum:'6227003110370109578',
                    encrypt:''
                },
                {
                    cardNum:'5466124986548651348',
                    encrypt:''
                }
            ]

        }
    },
    methods:{
        //加密号码
        /*
            mtext:要替换的字符
            place:位置
            ptext：替换值
        */
        requestText(mtext,place,ptext){
            let text = mtext.charAt(place);
            mtext = mtext.replace(text,ptext)
            return mtext;
        },

        //数据替换
        dataRes(){
            let arr = this.cardList;
            for(let i=0; i<arr.length; i++){
                //字符串转成数组
                let tra = arr[i].cardNum.split('')
                //承载字符串转成数组
                let _arr = [];
                //承载转换后的字符
                let siti;
                for(let j = 0; j< tra.length; j++){
                    let flag = true
                    if(j>tra.length - 4){
                        flag = false
                    }
                    if(flag){
                        var txt = this.requestText(tra[j],0,'*');
                        _arr.push(txt);
                    }else{
                        _arr.push(tra[j]);
                    }
                }
                siti = _arr.join('');
                //每四个字符加一个空格
                siti = siti.replace(/\s/g,'').replace(/(.{4})/g,"$1 ");
                arr[i].encrypt = siti;
            }
            this.cardList = arr;
        }
        
    }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.cardList{
    padding:1rem 1rem 0 1rem;
    li{
        position: relative;
        margin-bottom: @font1;
        .border-radiusS;
        img{
            max-width:100%;
        }
        b{
            position: absolute;
            bottom: 1rem;
            right:1rem;
            color:@white;
            font-size:2rem;
        }
    }
}

</style>

