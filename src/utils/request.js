
import { apiAddress } from './constants'
import errorIcon from '../../static/error.png'

//  get请求
export function get (namespace = '', data = { }, { showError = true, showLoading = false, msg: title = '加载中...', shutLoading = false } = {}) {
  return new Promise((resolve, reject) => {
    let loaded = false
    let url = `${apiAddress}${namespace}`
    let method = 'GET'
    if (showLoading) {
      wx.showLoading({
        title
      })
    } else if (!shutLoading) {
      //  接口时间控制在500ms之内不显示loading
      let timer = setTimeout(() => {
        if (!loaded) {
          wx.showLoading({
            title
          })
          clearTimeout(timer)
        }
      }, 500)
    }
    wx.request({
      url,
      data,
      method,
      complete (res) {
        loaded = true
        wx.hideLoading()
        let { data, errMsg = '' } = res
        data = Object.prototype.toString.call(data) === '[object String]' ? JSON.parse(data) : data
        if (errMsg === 'request:ok') {
          resolve(data)
          if (showError) {
            let { isSuccess, msg = '' } = data
            if (!isSuccess && msg !== '') {
              wx.showToast({
                title: msg,
                image: errorIcon
              })
            }
          }
        } else {
          if (showError) {
            wx.showToast({
              title: errMsg,
              image: errorIcon
            })
          }
          reject(errMsg)
        }
      }
    })
  })
}

//  post请求
export function post (namespace = '', data = { }, { showError = true, showLoading = true, loadingTitle: title = '加载中...' } = {}) {
  return new Promise((resolve, reject) => {
    let url = `${apiAddress}${namespace}`
    let method = 'POST'
    if (showLoading) {
      wx.showLoading({
        title
      })
    }
    wx.request({
      url,
      data,
      method,
      complete (res) {
        wx.hideLoading()
        let { data, errMsg = '' } = res
        data = Object.prototype.toString.call(data) === '[object String]' ? JSON.parse(data) : data
        if (errMsg === 'request:ok') {
          resolve(data)
        } else {
          if (showError) {
            wx.showToast({
              title: errMsg,
              image: errorIcon
            })
          }
          reject(errMsg)
        }
      }
    })
  })
}
