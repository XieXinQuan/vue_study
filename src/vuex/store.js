import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    count: 0,
    isShowLogin:false,
    isShowMember:false,
    leftMenu:false,
    rightMenu:false,
    coverUpLayer : false
}

const mutations = {
  mutationsSetIsShowLogin(state, isShow = false){
    return (state.isShowLogin = isShow)
  },
  mutationsSetIsShowMember(state, isShow = false){
    return (state.isShowMember = isShow)
  }
}

export default new Vuex.Store({
    state, mutations
})