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
    // [types.MK_LIST](state,list){
    //     state.mkList = list
    // },

    //当前价（共用）
    [types.CURRENT_PRICE](state,index){
        state.currPrice = index
    }

}

export default mutations