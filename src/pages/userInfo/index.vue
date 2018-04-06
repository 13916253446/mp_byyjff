<template>
  <div>
    <div class="tab-wrapper center-flex c-6 f-32">
      <div  @click="changeTab(1)" class="flex-full first-tab tab-item text-right">
        <div class="inline-bc relative-view" :class="{'c-theme': currentTab === 1}">
          账号信息
          <div class="scroll-bar bounding-rect" data-type="scrollbar" :animation="scrollAnimation"></div>
        </div>
      </div>
      <div class="tab-splite-node bounding-rect" data-type="tabsplite"></div>
      <div @click="changeTab(2)" class="flex-full second-tab tab-item text-left" :class="{'c-theme': currentTab === 2}">
        <div class="inline-bc bounding-rect" data-type="tab">申领记录</div>
      </div>
    </div>
    <div class="content-wrapper c-theme-bg">
      <div class="content-box" :animation="tab1Animation">
        <user-info></user-info>
      </div>
      <div class="content-box" :animation="tab2Animation">
        <claim-records></claim-records>
      </div>
    </div>
  </div>
</template>

<script>
import userInfo from '@/components/userInfo'
import claimRecords from '@/components/claimRecords'
export default {
  name: 'UserInfo',
  data () {
    return {
      currentTab: '',
      //  scrollBar动画
      scrollAnimation: {},
      //  tab1动画
      tab1Animation: {},
      //  tab2动画
      tab2Animation: {}
    }
  },
  components: {
    userInfo,
    claimRecords
  },
  mounted () {
    //  初始化tab
    let initTab = this.$root.$mp.query.tab || 1
    this.changeTab(initTab)
  },
  methods: {
    //  tab内容动画
    tabContentChange: (() => {
      let isInit = true
      return function (tab) {
        let tab1Intance = wx.createAnimation({
          duration: isInit ? 0 : 200
        })
        let tab2Intance = wx.createAnimation({
          duration: isInit ? 0 : 200
        })
        if (isInit) {
          if (tab === 1) {
            tab2Intance.translateX('-100%').step()
            this.tab2Animation = tab2Intance.export()
          } else if (tab === 2) {
            tab1Intance.translateX('100%').step()
            this.tab1Animation = tab1Intance.export()
          }
        } else {
          if (tab === 1) {
            tab1Intance.translateX(0).step()
            this.tab1Animation = tab1Intance.export()
            tab2Intance.translateX('-100%').step()
            this.tab2Animation = tab2Intance.export()
          } else if (tab === 2) {
            tab2Intance.translateX(0).step()
            this.tab2Animation = tab2Intance.export()
            tab1Intance.translateX('100%').step()
            this.tab1Animation = tab1Intance.export()
          }
        }
        isInit = false
      }
    })(),
    //  scrollBar 动画
    scrollbarScroll: (() => {
      let tab2translateX = null
      return function (tab) {
        let animationInstant = wx.createAnimation({
          duration: 200
        })
        if (tab === 2) {
          if (tab2translateX) {
            animationInstant.translateX(tab2translateX).step()
            this.scrollAnimation = animationInstant.export()
          } else {
            wx.createSelectorQuery().selectAll('.bounding-rect').boundingClientRect((rects) => {
              let tabSpliteWidth = null
              let tabbarWidth = null
              let tab2Width = null
              rects.forEach((rect) => {
                let domType = rect.dataset.type
                let width = rect.width
                if (domType === 'tab') {
                  tab2Width = width
                } else if (domType === 'scrollbar') {
                  tabbarWidth = width
                } else if (domType === 'tabsplite') {
                  tabSpliteWidth = width
                }
              })
              tab2translateX = tabSpliteWidth + (tab2Width - tabbarWidth) + tabbarWidth / 2
              animationInstant.translateX(tab2translateX).step()
              this.scrollAnimation = animationInstant.export()
            }).exec()
          }
        } else if (tab === 1) {
          animationInstant.translateX('-50%').step()
          this.scrollAnimation = animationInstant.export()
        }
      }
    })(),
    //  切换tab
    changeTab (tab) {
      if (this.currentTab === tab) return
      if (tab !== 1 && tab !== 2) return
      this.scrollbarScroll(tab)
      this.tabContentChange(tab)
      this.currentTab = tab
    }
  }
}
</script>

<style lang="stylus" scoped>
.tab-wrapper
  background-color #FFF

.tab-item
  height 88rpx
  line-height 88rpx

.content-wrapper
  position absolute
  top 88rpx
  bottom 0
  left 0
  right 0
  overflow-x hidden

.inline-bc
  display inline-block
  height 88rpx
  line-height 88rpx

.scroll-bar
  width 88rpx
  height 6rpx
  background-color theme-color
  transform translateX(-50%)
  position absolute
  bottom 0
  left 50%

.tab-splite-node
  width 88rpx

.content-box
  position absolute
  left 0;
  right 0
  top 0
  bottom 0  
</style>


