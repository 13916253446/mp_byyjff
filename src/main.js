//  小程序公共设置app.json
import Vue from 'vue'
import App from './App'
import store from '@/store/'
import { assetsImgPublicPath } from '@/utils/constants'
import { get, post } from '@/utils/request'
import router from '@/routes/'

//  初始化全局状态
Vue.prototype.$store = store

//  初始化全局状态请求
Vue.prototype.$get = get
Vue.prototype.$post = post

//  初始化全局导航
Vue.prototype.$router = router

//  注册全局混合处理图片地址问题
Vue.mixin({
  methods: {
    //  处理图片
    serverImg (src) {
      return `${assetsImgPublicPath}${src}`
    }
  }
})

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#0098DD',
      navigationBarTitleText: '避孕药具发放',
      navigationBarTextStyle: '#FFFFFF'
    }
  }
}
