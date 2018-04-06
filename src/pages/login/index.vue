<template>
  <div class="wrapper c-theme-bg">
    <div class="contain">
      <div class="input-item center-flex-v first-input-item usercode-input-item">
        <img class="input-icon" :src="telIcon" alt="" srcset="">
        <input @focus="telFoucus" @blur="telBlur" placeholder="请输入手机号" maxlength="11" placeholder-class='input-placeholder' class="flex-full" type="number" v-model="tel" >
        <!-- 登录用户提示 -->
        <div v-show="showInputTip">
          <login-tip :current-user-code="tel" @chooseUser="chooseUser"></login-tip>
        </div>
      </div>
      <div class="input-item center-flex-v">
        <img class="input-icon" :src="pwdIcon" alt="" srcset="">
        <input placeholder="请输入密码" placeholder-class='input-placeholder' class="flex-full" type="text" password  v-model.lazy="pwd" >
      </div>
      <div class="tools-box center-flex-v c-9">
        <div @click="rememberMeHandler" class="flex-full c-28 center-flex-v tool-item">
          <div class="success-box center-flex">
            <icon v-if="rememberMe" type="success_no_circle" size="12" color='#0098DD'></icon>
          </div>
          <div class="c-9 f-30 remember-me">记住我</div>
        </div>
        <div class="flex-full c-30 text-right tool-item">忘记密码</div>
      </div>
    </div>
    <div class="btn-contain">
      <div class="center-flex c-f f-36 login-btn" @click="loginHandler">登录</div>
      <div class="center-flex f-36 c-theme register-btn" @click="registerHandler">用户注册</div>
    </div>
  </div>
</template>

<script>
import { isPhoneNum } from '@/utils/'
import loginTip from '@/components/inputTip'
export default {
  name: 'Login',
  components: {
    loginTip
  },
  data () {
    return {
      tel: '',
      pwd: '',
      rememberMe: true,
      ajaxing: false,
      telIcon: this.serverImg('login/icon_phone@3x.png'),
      pwdIcon: this.serverImg('login/icon_code@3x.png'),
      showInputTip: false
    }
  },
  methods: {
    //  显示提醒消息
    showModal (content = '') {
      wx.showModal({
        title: '温馨提示',
        content,
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#0098DD'
      })
    },
    //  登录
    loginHandler () {
      if (this.ajaxing) return
      if (this.tel === '') {
        this.showModal('请填写用户名')
        return
      }
      if (this.pwd === '') {
        this.showModal('请填写登录密码')
        return
      }
      if (!isPhoneNum(this.tel)) {
        this.showModal('请填写正确的用户名')
        return
      }
      const json = {
        UserCode: this.tel,
        PassWord: this.pwd
      }
      this.ajaxing = true
      this.$get('/User/LoginIn', { json }, { showLoading: true, msg: '正在登录...' }).then(res => {
        this.ajaxing = false
        let { isSuccess, dtData = [] } = res
        let user = dtData.length > 0 ? dtData[0] : {}
        if (isSuccess) {
          //  提交用户信息
          this.$store.commit('User/saveUserInfo', user)
          //  提交要记住的用户信息
          if (this.rememberMe) {
            this.$store.commit('User/saveRememberUserInfo', { ...json, Name: user.Name || '' })
          }
          // 返回首页
          this.$router.backHome()
        }
      }, () => {
        this.ajaxing = false
      })
    },
    //  记住我
    rememberMeHandler () {
      this.rememberMe = !this.rememberMe
    },
    //  用户名获取焦点时
    telFoucus () {
      this.showInputTip = true
    },
    //  用户名失去焦点时
    telBlur () {
      console.log('blur')
      this.showInputTip = false
    },
    //  选择用户
    chooseUser (user) {
      if (user == null || user === '') return
      this.tel = user.UserCode
      this.pwd = user.PassWord
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  position absolute
  left 0
  right 0
  bottom 0
  top 0
  height 100%

.contain
  margin-top 160rpx

.input-item
  height 110rpx
  background-color #FFF
  padding 20rpx 60rpx

.input-icon
  width 34rpx
  height 34rpx
  margin-right 12rpx

.first-input-item
  border-bottom 1rpx solid border-color

.success-box
  width 30rpx
  height 30rpx
  border 1rpx solid theme-color

.tool-item
  padding 30rpx 0

.tools-box
  padding 0 60rpx 0 64rpx

.btn-contain
  padding 30rpx 60rpx 30rpx 64rpx

.login-btn
  background-color theme-color
  height 88rpx
  border-radius 8rpx

.register-btn
  border 1rpx solid theme-color
  margin-top 50rpx
  height 88rpx
  border-radius 8rpx

.remember-me
  margin-left 14rpx

.usercode-input-item
  position relative
</style>
