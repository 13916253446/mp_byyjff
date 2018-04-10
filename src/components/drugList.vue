/* 药具列表 */
<template>
  <div>
    <!-- 数据请求完成 -->
    <div v-if="drugListAjaxLoaded">
      <!-- 有数据 -->
      <div v-if="listStatus === 3">
        <div class="drug-item center-flex-v" v-for="(item, index) in drugList" :key="index">
          <img mode="aspectFill" class="drug-icon flex-shrink" :src="rootImgAddress + item.Icon" alt="" srcset="">
          <div class="flex-full right-block">
            <div class="center-flex-v flex-wrap">
              <div class="flex-full c-6 f-36">{{item.DrugName}}</div>
              <div class="c-6 f-30 flex-shrink">{{item.Spec}}</div>
            </div>
            <div class="text-ellipsis c-6 f-30 second-class-bc">{{item.SecondClass}}</div>
            <div class="f-26 c-9 text-ellipsis introduce-bc">{{item.Introduce}}</div>
            <div class="text-right">
              <div @click="receiveDrugs(item)" class="receive-btn f-28 c-9 center-flex" :class="{'c-theme': item.LeftCount && item.LeftCount > 0 }">{{item.LeftCount && item.LeftCount > 0 ? '领取' : '缺货'}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 没有数据的情况 -->
      <div v-else class="center-flex empty-bc">
        <div class="text-center">
          <img class="empty-icon" :src="emptyIcon" alt="" srcset="">
          <div class="c-6 f-32 empty-content">{{listStatus === 0 ? '药具列表为空' : (listStatus === 1 ? '该地区暂未开通' : (listStatus === 2 ? '请通过该地区专属平台领取药具' : '')) }}</div>
          <div class="f-36 c-f center-flex self-platform" @click="viewSelfPlatform">去看看</div>
        </div>
      </div>
    </div>
    <!-- 数据加载中 -->
    <div v-else class="text-center">
      <div class="loading-spin" :animation="animationData"></div>
    </div>
    <!-- 促使加载数据，无实际意义 -->
    <div v-if="DistrictNoIdentityCardNo"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { createInfiniteLoading } from '@/utils/animations'
import { rootImgAddress } from '@/utils/constants'
export default {
  name: 'DrugList',
  data () {
    return {
      rootImgAddress,
      animationData: {},
      emptyIcon: this.serverImg('empty_state@2x.png')
    }
  },
  computed: {
    ...mapState('Drugs', [
      'listStatus',
      'drugURL',
      'drugList',
      'drugListAjaxLoaded'
    ]),
    ...mapState('User', {
      //  是否登录
      isLogin: state => state.UserInfo.UserCode && state.UserInfo.UserCode !== '',
      Name: state => state.UserInfo.Name || '',
      IdentityCardNo: state => state.UserInfo.IdentityCardNo || '',
      DistrictNo: state => state.UserInfo.DistrictNo || '',
      //  是否可领取
      UserCanReceive: state => !!state.UserApply.isSuccess,
      //  不能领取原因
      CannotReceiveMsg: state => state.UserApply.msg || ''
    }),
    //  获取可领取药具数据
    DistrictNoIdentityCardNo: (() => {
      //  上次加载数据的参数值
      let preDistrictNo = null
      let preIdentityCardNo = null
      return function () {
        let DistrictNo = this.$store.state.User.UserInfo.DistrictNo || ''
        let IdentityCardNo = this.$store.state.User.UserInfo.IdentityCardNo || ''
        let drugList = this.$store.state.Drugs.drugList || []
        //  没有药具数据或者没有身份证或者和上次加载数据的参数相同就不再加载
        if (IdentityCardNo === '' || drugList.length < 1 || (DistrictNo === preDistrictNo && IdentityCardNo === preIdentityCardNo)) return
        preDistrictNo = DistrictNo
        preIdentityCardNo = IdentityCardNo
        this.$store.dispatch('User/getUserApply', { IdentityCardNo, DistrictNo })
      }
    })()
  },
  created () {
    this.animationData = createInfiniteLoading()
  },
  methods: {
    //  查看自己的专属平台
    viewSelfPlatform () {
      let url = `/pages/webview/main?src=${this.drugURL}`
      wx.navigateTo({
        url
      })
    },
    //  点击领取药具
    receiveDrugs (item) {
      //  判断有没有登录
      if (!this.isLogin) {
        wx.showModal({
          title: '温馨提示',
          content: '您还没有登录，请先登录哦！',
          confirmText: '去登录',
          confirmColor: '#0098DD',
          success: (res) => {
            //  点击去登录
            if (res.confirm) {
              this.$router.push('/pages/login/main')
            }
          }
        })
        return
      }
      //  判断信息是否完整
      if (this.Name === '' || this.IdentityCardNo === '' || this.DistrictNo === '') {
        wx.showModal({
          title: '温馨提示',
          content: '先完善个人资料后再领取药具！',
          confirmText: '去录入',
          confirmColor: '#0098DD',
          success: (res) => {
            //  点击去录入个人信息
            if (res.confirm) {
              this.$router.push(`/pages/userInfo/main?tab=1`)
            }
          }
        })
        return
      }
      //  判断是否还可以领取
      if (!this.UserCanReceive) {
        wx.showModal({
          title: '温馨提示',
          content: this.CannotReceiveMsg,
          confirmText: '知道了',
          confirmColor: '#0098DD',
          showCancel: false
        })
        return
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.loading-spin
  width 50rpx
  height 50rpx
  margin 50rpx auto 0

.empty-bc
  margin-top 100rpx

.empty-icon
  width 300rpx
  height 300rpx

.empty-content
  margin-top 70rpx

.self-platform
  background-color theme-color
  border-radius 8rpx
  margin-top 70rpx
  width 300rpx
  height 88rpx

.drug-item
  padding 30rpx
  border-bottom 1rpx solid border-color

.drug-icon
  width 240rpx
  height 180rpx
  margin-right 20rpx

.right-block
  max-width 430rpx

.second-class-bc
  margin-top 6rpx

.introduce-bc
  margin-top 16rpx

.receive-btn
  border 1rpx solid currentColor
  width 120rpx
  height 56rpx
  background-color #FFF
  display inline-flex
  border-radius 999rpx
  margin-top 16rpx
</style>


