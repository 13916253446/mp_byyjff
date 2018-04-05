/* 药具列表 */
<template>
  <div>
    <!-- 数据请求完成 -->
    <div v-if="drugListAjaxLoaded">
      <!-- 没有数据的情况 -->
      <div v-if="listStatus === 0" class="center-flex empty-bc">
        <div class="text-center">
          <img class="empty-icon" :src="emptyIcon" alt="" srcset="">
          <div class="c-6 f-32 empty-content">药具列表为空</div>
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
export default {
  name: 'DrugList',
  data () {
    return {
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
</style>


