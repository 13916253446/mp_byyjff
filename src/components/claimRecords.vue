<template>
  <div class="wrapper">
    <div v-if="ajaxLoad">
      <!-- 没有申领记录 -->
      <div v-if="!haveOrders" class="center-flex">
        <div class="text-center">
          <img class="no-data-img" :src="noData_img" alt="" srcset="">
          <div class="no-data-tip c-3 f-30">暂无领取记录</div>
        </div>
      </div>
      <div v-else>123</div>
    </div>
    <!-- 数据加载中 -->
    <div v-else class="text-center">
      <div class="loading-spin" :animation="animationData"></div>
    </div>
    <!-- 促使加载数据，无实际意义 -->
    <div v-if="guideGetOrders"></div>
  </div>
</template>

<script>
import { createInfiniteLoading } from '@/utils/animations'
export default {
  name: '申领记录',
  data () {
    return {
      ajaxLoad: false,
      animationData: {},
      MyOrders: {},
      noData_img: this.serverImg('no_data_default@3x.png')
    }
  },
  computed: {
    //  有没有申领记录
    haveOrders () {
      return Object.keys(this.MyOrders).length > 0
    },
    //  引导获取申领记录数据
    guideGetOrders () {
      let UserId = this.$store.state.User.UserInfo.ID || ''
      if (UserId === '') {
        this.MyOrders = {}
      } else {
        this.$get('/Orders/GetMyOrders', { json: JSON.stringify({ UserId }) }, { shutLoading: true }).then(res => {
          this.ajaxLoad = true
          let { isSuccess, dtData = [] } = res
          if (isSuccess) {
            let model = {}
            for (let item of dtData) {
              if (item.OrderId != null && item.OrderId !== '') {
                if (model[item.OrderId]) {
                  model[item.OrderId].push(item)
                } else {
                  model[item.OrderId] = [item]
                }
              }
            }
            this.MyOrders = {...model}
          } else {
            this.MyOrders = {}
          }
        }, () => {
          this.ajaxLoad = true
          this.MyOrders = {}
        })
      }
    }
  },
  created () {
    this.animationData = createInfiniteLoading()
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

.loading-spin
  width 50rpx
  height 50rpx
  margin 50rpx auto 0

.no-data-img
  width 750rpx
  height 750rpx

.no-data-tip
  margin-top 48rpx
</style>


