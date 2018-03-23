<template>
  <div class="login">
     <div class="loginTest">
         <img class="logo" src="@/common/images/logo.png" alt="logo" />
         <div class="input">
             <input type="phone" name="userPhone" placeholder="请输入手机" v-model="userPhone" />
             <input type="password" name="password" placeholder="请输入密码" v-model="password" />
             <div class="otherOper clearfix"><span>忘记密码</span><span>注册账号</span></div>
         </div>
         <input type="button" name="Submit" value="登录" @click="getLogin" />
         
     </div>
  </div>
</template>

<script>
export default {
    name:'login',
    data(){
        return{
            userPhone:'',
            password:''
        }
    },
    methods:{
        getLogin(){
            this.$router.push({
                path:'/'
            })
        }
    }
  
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.login{
    position: relative;
    width: 100%;
    height:100%;
    background: url('../common/images/loginBg.jpg') no-repeat center center;
    background-size: cover
}
.loginTest{
    text-align: center;
    position: absolute;
    top:20%;
    width:100%;
    .logo{
        width:150px;
        vertical-align: middle;
    }
    div.input{
        margin: 2rem auto 0 auto;
        width:65%;
        input{
            font-family: '微软雅黑';
            width:100%;
            background: @white;
            line-height: 3rem;
            text-indent: 1rem;
            font-size:@font1;
            border:none;
            color:@font-Lgray;
            .border-radius;
            margin-bottom: @font1;
        }
    }
    .otherOper{
        color:@white;
        margin-bottom: @font1;
        span:nth-of-type(1){
            float: left;
        }
        span:nth-of-type(2){
            float: right;
        }
    }
    input[name="Submit"]{
        width:12rem;
        height:3rem;
        .border-radius;
        background: @white;
        color:@font-Sgray;
    }
}

</style>

