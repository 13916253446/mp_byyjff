<template>
  <div>
    <div class="banner-placeholder">
      <img class="banner" :src="banner_img" alt="" srcset="">
    </div>
    <div class="userinfo-view center-flex-v" @click="viewUserInfo">
      <div class="flex-full f-32 c-6">
        {{DistrictName && DistrictName !== '' ? DistrictName : '未知城市'}}
      </div>
      <div>
        <div v-if="isLogin">

        </div>
        <div v-else class="c-theme center-flex-v">
          <div>当前未登录</div>
          <div class="right-icon"></div>
        </div>
      </div>
    </div>
    <drug-list></drug-list>
    <!-- 促使加载数据，无实际意义 -->
    <div v-if="DistrictNo"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import drugList from '@/components/drugList'
//  上一次加载药具的行政区划代码
let preDistrictNo = null
export default {
  name: 'Home',
  components: {
    drugList
  },
  data () {
    return {
      banner_img: this.serverImg('banner@2x.png')
    }
  },
  computed: mapState('User', {
    //  行政区划代码
    DistrictNo (state) {
      let DistrictNo = state.UserInfo.DistrictNo || ''
      if (preDistrictNo === DistrictNo) return
      preDistrictNo = DistrictNo
      //  拉取药具数据
      this.$store.dispatch('Drugs/getDrugList', DistrictNo)
    },
    //  行政区划
    DistrictName: state => state.UserInfo.DistrictName,
    //  姓名
    Name: state => state.UserInfo.Name,
    //  是否登录
    isLogin: state => state.UserInfo.UserCode && state.UserInfo.UserCode !== ''
  }),
  methods: {
    //  查看用户信息
    viewUserInfo () {
      //  已登录
      if (this.isLogin) {
      //  未登录
      } else {
        this.$router.push('/pages/login/main')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.banner
.banner-placeholder
  width 750rpx
  height 375rpx
.banner-placeholder
  background-color placeholder-color
.userinfo-view
  height 110rpx
  padding 0 30rpx
  border-bottom 1rpx solid border-color
.right-icon
  width 18rpx
  height 18rpx
  border 1px solid theme-color
  border-bottom none
  border-left none 
  transform rotate(45deg)
  margin-left 20rpx
</style>


