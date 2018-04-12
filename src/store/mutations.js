import * as types from "./mutation-types"

const mutations = {
    //MID
    [types.SET_MID](state,setMID){
        state.MID = setMID
    },

    //登录状态
    [types.IS_LOGIN](state,login){
        state.isLogin = login
    },

    //首页状态
    [types.INDEX_STATE](state,index){
        state.indexState = index
    },

    //个人信息
    [types.USER_INFO](state,info){
        state.user = info
    },

    [types.IS_LOADING](state,load){
        state.isLogin = load
    }

}

export default mutations