import { get } from '@/utils/request'
const state = {
  //  用户信息
  UserInfo: {

  },
  //  登录记住的用户信息
  rememberUserInfo: [],
  //  用户可领取药具的信息
  UserApply: {

  }
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
  },
  //  保存用户可领取药具数据
  saveUserApply (state, val) {
    state.UserApply = val
  }
}

const actions = {
  //  获取用户可领取数据
  getUserApply (context, { IdentityCardNo = '', DistrictNo = '' } = {}) {
    console.log(arguments)
    let json = JSON.stringify({
      IdentityCardNo,
      DistrictNo
    })
    return get('/Orders/IsApply', { json }, { shutLoading: true, showError: false }).then(res => {
      let { isSuccess = false, msg = '', result = '0|0' } = res
      context.commit('saveUserApply', {
        isSuccess,
        msg,
        result
      })
    }, error => {
      context.commit('saveUserApply', {
        isSuccess: false,
        msg: error,
        result: '0|0'
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
