<template>
  <div class="wrapper" v-show="simpleUser.length > 0">
    <div class="contain">
      <div class="c-9 f-28">登录用户</div>
      <div @click="chooseUser(item)" class="tip-item" v-for="(item, index) in simpleUser" :key="index">
        <div class="f-32">{{item.Name}}</div>
        <div class="f-28 c-9">用户名:&ensp;{{item.UserCode}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputTip',
  props: {
    currentUserCode: {
      required: true,
      default: ''
    }
  },
  computed: {
    simpleUser () {
      let code = this.currentUserCode
      let state = this.$store.state.User
      let users = state.rememberUserInfo.filter(item => {
        return (item.UserCode && item.UserCode.includes(code) && code !== '')
      })
      return users
    }
  },
  methods: {
    //  选择用户
    chooseUser (user) {
      this.$emit('chooseUser', user)
    }
  }
}
</script>


<style lang="stylus" scoped>
.wrapper
  position absolute
  left 0
  width 100%
  top 100%
  z-index 99
  box-shadow: 0px 5px 5px -5px black, 0px -5px 5px -5px black;
.contain
  background-color #FFF
  padding 20rpx 0 20rpx 20rpx

.tip-item
  border-top 1px solid border-color
  padding 10rpx 0
</style>

