//  创建动画

//  创建无限循环loading动画
export function createInfiniteLoading () {
  //  创建动画实例
  let totalTime = 1000000000
  let animationInstant = wx.createAnimation({
    duration: 1000 * totalTime,
    timingFunction: 'linear'
  })
  animationInstant.rotate(360 * totalTime).step()
  return animationInstant.export()
}

export default {
  createInfiniteLoading
}
