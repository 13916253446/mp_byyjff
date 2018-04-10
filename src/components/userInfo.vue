<template>
  <div>
    <div class="item center-flex-v c-6 f-32">
      <div class="key-item">手机号</div>
      <div>{{UserCode}}</div>
    </div>
    <div class="item center-flex-v c-6 f-32">
      <div class="key-item">姓名</div>
      <div class="flex-full">{{Name}}</div>
      <div class="right-icon"></div>
    </div>
    <div class="item center-flex-v c-6 f-32">
      <div class="key-item">身份证号</div>
      <div class="flex-full">{{IdentityCardNo}}</div>
      <div class="right-icon"></div>
    </div>
    <div class="item center-flex-v c-6 f-32">
      <div class="key-item">所在地</div>
      <div class="flex-full">{{DistrictName && DistrictName !== '' ? '江苏省' + DistrictName : ''}}</div>
      <div class="right-icon"></div>
    </div>
    <div class="bottom-wrapper">
      <div class="ext-btn f-36 c-theme center-flex" @click="extLogin">退出登录</div>
      <div class="center-flex-v f-28">
        <div class="c-6 user-agreement flex-full text-left">用户协议</div>
        <div class="c-theme update-pwd flex-full text-right">修改密码</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'UserInfo',
  computed: mapState('User', {
    UserCode: state => state.UserInfo.UserCode,
    Name: state => state.UserInfo.Name,
    IdentityCardNo: state => state.UserInfo.IdentityCardNo,
    DistrictName: state => state.UserInfo.DistrictName
  }),
  methods: {
    //  退出登录
    extLogin () {
      this.saveUserInfo({})
      this.$router.backHome()
    },
    ...mapMutations('User', [
      'saveUserInfo'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  overflow-x hidden
  overflow-y auto

.item
  height 110rpx
  background-color #FFF
  border-bottom 1rpx solid border-color
  padding 0 30rpx

.key-item
  width 190rpx

.right-icon
  width 30rpx
  height 30rpx
  border-top 1rpx solid currentColor
  border-right 1rpx solid  currentColor
  transform rotate(45deg)

.bottom-wrapper
  position absolute
  bottom 0
  left 60rpx
  right 60rpx

.ext-btn
  height 88rpx
  border 1rpx solid theme-color
  border-radius 8rpx

.user-agreement
  padding 40rpx 0 50rpx 10rpx

.update-pwd
  padding 40rpx 10rpx 50rpx 0
</style>
