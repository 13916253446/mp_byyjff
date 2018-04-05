import errorIcon from '../../static/error.png'

const routes = {
  //  登录
  '/pages/login/main': {
    title: '登录'
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

export default {
  push
}
