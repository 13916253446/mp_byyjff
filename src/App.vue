<script>
export default {
  created () {
    //  页面初始化的时候从缓存中获取用户信息
    const user = wx.getStorageSync('byyj_user') || {}
    this.$store.commit('User/saveUserInfo', user)

    //  获取记住的用户信息
    const rememberUser = wx.getStorageSync('byyj_remember_user') || []
    this.$store.commit('User/initRememberUserInfo', rememberUser)
  }
}
</script>

<style lang="stylus">
view
  font-size 32rpx
*
*
  &::after
  &::before
    box-sizing border-box
    line-height 1.4

.center-flex
  display flex
  align-items center
  justify-content center

.center-flex-v
  display flex
  align-items center

.center-flex-h
  display flex
  justify-content center

.flex
  display flex

.flex-v
  display flex
  flex-direction column

.flex-full
  flex 1

.active-btn
  opacity .6

.f-28
  font-size 28rpx

.f-30
  font-size 30rpx

.f-32
  font-size 32rpx

.f-36
  font-size 36rpx 

.c-3
  color #333

.c-6
  color #666

.c-9
  color #999

.c-theme
  color theme-color

.c-f
  color #FFF

.loading-spin
  width 30rpx
  height 30rpx
  border-radius 50%
  border 2rpx solid #DDD
  border-left-color theme-color

.text-center
  text-align center

.c-theme-bg
  background-color theme-bg-color

.input-placeholder
  color #999
  opacity .4

.text-right
  text-align right

.text-left
  text-align left
</style>

