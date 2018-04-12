const state = {
    //MID
    MID:''||sessionStorage.getItem('MID'),
    //登录状态
    isLogin:false,
    //首页状态
    indexState:0,

    //个人信息
    user:'',

    //过度loading
    isloading:false
}

export default state