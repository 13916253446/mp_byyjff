import errorIcon from '../../static/error.png'

const routes = {
  //  药具列表
  '/pages/index/main': {
    title: '避孕药具发放'
  },
  //  登录
  '/pages/login/main': {
    title: '登录'
  },
  //  账号信息和申领记录
  '/pages/userInfo/main': {
    title: '我的'
  }
}

//  跳转失败
function fail () {
  wx.showToast({
    title: '导航失败',
    image: errorIcon
  })
}

//  跳转成功
function success (title = '避孕药具发放') {
  wx.setNavigationBarTitle({
    title
  })
}

//  push跳转
export function push (url = '') {
  const currentRoute = routes[url]
  wx.navigateTo({
    url,
    fail,
    success () {
      success(currentRoute && currentRoute.title)
    }
  })
}

//  关闭当前页面跳转
export function replace (url = '') {
  const currentRoute = routes[url]
  wx.redirectTo({
    url,
    fail,
    success () {
      success(currentRoute && currentRoute.title)
    }
  })
}

// 返回首页
export function backHome () {
  wx.navigateBack({
    delta: 10000
  })
}

export default {
  push,
  replace,
  backHome
}
