const state = {
  //  用户信息
  UserInfo: {

  }
}

const mutations = {
  saveUserInfo (state, val) {
    //  用户信息必须是对象
    if (Object.prototype.toString.call(val) !== '[object Object]') return
    state.UserInfo = { ...state.UserInfo, ...val }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
