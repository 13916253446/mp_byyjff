//  定义全局状态管理器
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {}

const mutations = {}

export const store = new Vuex.Store({
  state,
  mutations
})

export default store
