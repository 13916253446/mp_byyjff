const state = {
  //  用户信息
  UserInfo: {

  },
  //  登录记住的用户信息
  rememberUserInfo: []
}

const mutations = {
  //  保存用户信息
  saveUserInfo (state, val) {
    //  用户信息必须是对象
    if (Object.prototype.toString.call(val) !== '[object Object]') return
    state.UserInfo = val

    //  缓存用户信息
    wx.setStorageSync('byyj_user', val)
  },
  //  初始化记住的用户信息
  initRememberUserInfo (state, val = []) {
    state.rememberUserInfo = val
  },
  //  保存记住的用户信息
  saveRememberUserInfo (state, val) {
    if (val && val.UserCode && val.PassWord) {
      //  判断是否已经保存过
      let index = state.rememberUserInfo.findIndex((item) => {
        return item.UserCode === val.UserCode
      })
      if (index > -1) {
        state.rememberUserInfo.splice(index, 1, val)
      } else {
        state.rememberUserInfo.push(val)
      }
    }

    //  缓存记住的用户信息
    wx.setStorageSync('byyj_remember_user', state.rememberUserInfo)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
