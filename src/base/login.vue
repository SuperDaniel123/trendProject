<template>
  <div class="login">
     <div class="loginTest">
         <img class="logo" src="@/common/images/logo.png" alt="logo" />
         <div class="input" v-if="state==0">
             <input type="number" name="userPhone" placeholder="请输入手机" v-model="userPhone" />
             <input type="password" name="password" placeholder="请输入密码" v-model="password" />
             <div class="otherOper clearfix"><span @click ="getToken(1)">忘记密码</span><span @click ="getToken(2)">注册账号</span></div>
             <input type="button" name="Submit" value="登录" @click="getLogin" />
         </div>
         <!--忘记密码-->
         <div class="input" v-if="state==1">
             <input type="number" placeholder="请输入手机" v-model="forgetUser"/>
             <div class="aCode">
                <input type="number" placeholder="请输入验证码" v-model="authCode"/>
                <input type="button" :class="disabled == false? 'btnCode blue':'btnCode gray'" :disabled = disabled @click="getCode(forgetUser)" v-model="sdCode" />
             </div>
             <input type="password" name="password" placeholder="请输入新密码" v-model="newPwd" />
             <input type="password" name="password" placeholder="请再次输入新密码" v-model="ReNewPwd" />
             <div class="otherOper clearfix"><span @click ="state = 0">登录</span></div>
             <input type="button" @click="forget_pwd()" name="Submit" value="完成" />
         </div>
        <!--注册-->
         <div class="input" v-if="state==2">
             <input type="text" placeholder="请输入推荐人" v-model="referrer" />
             <input type="number"  placeholder="请输入手机" v-model="registerPhone" />
             <input type="text" placeholder="请输入姓名" v-model="IdName" />
             <input type="password" placeholder="请输入密码" v-model="enrollPwd" />
             <input type="password" placeholder="请输入确认密码" v-model="affirmPwd" />
             <div class="aCode">
                <input type="number" placeholder="请输入验证码" v-model="authCode"/>
                <input type="button" :class="disabled == false? 'btnCode blue':'btnCode gray'" :disabled = disabled @click="getCode(registerPhone)" v-model="sdCode" />
             </div>
             <div class="otherOper clearfix"><span @click ="state = 0">登录</span></div>
             <input type="button" @click="reg()" name="Submit" value="注册" />
         </div>
         
     </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import { setInterval, clearInterval } from 'timers';
export default {
    name:'login',
    data(){
        return{ 
            token:'',
            userPhone:localStorage.getItem('userName') || '',
            password:'',
            facility:'iphone',
            ip:sessionStorage.getItem('ip'),
            //0 是登录，1是忘记密码, 2是注册
            state:0,
            
            //验证码按钮
            sdCode:'获取验证码',
            //禁用状态
            disabled:false,


            //验证码
            authCode:'',


            //忘记密码
            forgetUser:'',
            newPwd:'',
            ReNewPwd:'',

            //注册
            referrer:'',
            registerPhone:'',
            IdName:'',
            enrollPwd:'',
            affirmPwd:''
        }
    },
    created(){

    },
    methods:{
        ...mapMutations({
            setMID:'SET_MID',
            setUID:'SET_UID',
            isLogin:'IS_LOGIN'
        }),
        getLogin(){
            let opt = {
                LoginID:this.userPhone,
                LoginPwd:this.password,
                LoginDev:this.facility, 
                LoginIP:this.ip
            }
            this.$ajax('/login','post',opt).then(res=>{
                let data = res.data;
                if(this.userPhone == ''){
                    this.$vux.alert.show({
                        content:'请输入用户名'
                    })
                    return;
                }else if(this.password == ''){
                    this.$vux.alert.show({
                        content:'密码不能为空'
                    })
                    return;
                }

                switch(data.ResultCD){
                    case -3:{ 
                            this.$vux.alert.show({
                                content:'用户名长或密码长度不正确'
                            })
                            break;
                        }
                    
                    case "4129":{
                        this.$vux.alert.show({
                            content:data.ErrorMsg
                        })
                        break;
                    }

                    default:{
                        sessionStorage.setItem('MID',data.Data.MID)
                        sessionStorage.setItem('UID',data.Data.UID)
                        localStorage.setItem('userName',this.userPhone)
                        this.isLogin(true);
                        this.setMID(sessionStorage.getItem('MID'));
                        this.setUID(sessionStorage.getItem('UID'));
                        this.$router.push({
                            path:'/'
                        })
                    }
                }
            })
        },
        getToken(id){
            this.state = id
            this.$ajax('/sms/getToken','get',{}).then(res=>{
                let data = res.data
                this.token = data.Token
            })
        },

        //计时器
        countDown(){
            var i = 60
            let times = setInterval(()=>{
                this.sdCode = --i + '秒重新获取'
                console.log(i)
                if(i<0){
                    clearInterval(times)
                    this.disabled = false;
                    this.sdCode = '获取验证码'
                }
            },1000)
            
            

            
        },

        //获取验证码
        getCode(code){
            if(code == '' && code.length != 11){
                alert('请输入正确手机号')
                return;
            }

            this.$ajax('/sms/sendMsg','post',{LoginID:code,Token:this.token}).then(res=>{
                if(res.data.ResultCD != 200){
                    alert(res.data.ErrorMsg)
                    return
                }
                alert('验证码已发送到手机上')
                this.countDown()
                this.disabled = true
                return;
            })

        },
        forget_pwd(){
            let opt = {
                LoginID:this.forgetUser,
                NewPwd:this.newPwd,
                ReNewPwd:this.ReNewPwd,
                Token:this.token,
                Code:this.authCode
            }
            if(!opt.NewPwd || !opt.ReNewPwd){
                alert('密码或确认密码不能为空')
                return;
                if(opt.NewPwd != opt.ReNewPwd){
                    alert('密码不一致')
                    return
                }
            }
            this.$ajax('/forget_pwd','post',opt).then(res=>{
                let data = res.data;
                if(data.ResultCD =! 200){
                    alert(data.ErrorMsg)
                    return
                }
                alert('操作成功')
                this.state = 0;
                this.authCode = this.forgetUser = this.newPwd = this.ReNewPwd = ''
            })
        },
        reg(){
            let opt = {
                LoginID:this.registerPhone,
                LoginPwd:this.enrollPwd,
                ReLoginPwd:this.affirmPwd,
                IDName:this.IdName,
                Token:this.token,
                aCode:this.referrer,
                Code:this.authCode
                
            }
            if(!opt.LoginID){
                alert('请输入手机');
                return;
            }
            if(!opt.IDName){
                alert('请输入姓名')
                return;
            }
            if(!opt.LoginPwd || !opt.ReLoginPwd){
                alert('密码或确认密码不能为空')
                return;
                if(opt.LoginPwd != opt.ReLoginPwd){
                    alert('密码不一致')
                    return
                }
            }


            this.$ajax('/reg','post',opt).then(res=>{
                let data = res.data;
                if(data.ResultCD == 200){
                    alert('注册成功')
                    this.state = 0;
                    this.registerPhone = this.enrollPwd = this.affirmPwd = this.IdName = this.referrer = this.authCode = ''
                    return
                }
                alert(data.ErrorMsg)
                
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
    top:15%;
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
        text-indent: 0 !important;
    }
}
.aCode{
    position: relative;
    input[type="button"].btnCode{
        width:auto !important;
        text-indent: 0 ;
        padding:0 0.5rem !important;
        line-height: 2rem;
        position: absolute ;
        right:0.5rem ;
        top:0.5rem 
    }
    input[type="button"].btnCode.blue{
        border:1px solid @blue;
        background: @blue;
        color:@white;
    }
    input[type="button"].btnCode.gray{
        background: @white;
        color:#666666;
        border:1px solid #cacaca;
    }
}

</style>

