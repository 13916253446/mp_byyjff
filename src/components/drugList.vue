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
  computed: mapState('Drugs', [
    'listStatus',
    'drugURL',
    'drugList',
    'drugListAjaxLoaded'
  ]),
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
</style>


