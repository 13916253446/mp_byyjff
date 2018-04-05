//  定义全局状态管理器
import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import Drugs from './modules/drugs'

Vue.use(Vuex)

const state = {}

const mutations = {}

export const store = new Vuex.Store({
  state,
  mutations,
  modules: {
    User,
    Drugs
  }
})

export default store
