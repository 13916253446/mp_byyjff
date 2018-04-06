
import { get } from '@/utils/request'

const state = {
  //  药具列表
  drugList: [],
  //  药具接口是否请求完成
  drugListAjaxLoaded: false,
  //  地区药具状态0表示没有数据，1表示该地区没有开通，2.表示该地区有专属平台
  listStatus: 0,
  //  地区专属平台地址
  drugURL: ''
}

const mutations = {
  setListStatus (state, val, drugURL = '') {
    state.listStatus = val
    state.drugURL = drugURL
  },
  setDrugList (state, val = []) {
    state.drugListAjaxLoaded = true
    state.drugList = val
  }
}

const actions = {
  getDrugList (context, DistrictNo = '') {
    //  获取药具列表
    return get('/Drug/GetDrugByArea', {json: JSON.stringify({ DistrictNo })}, { shutLoading: true }).then(res => {
      let { isSuccess, msg, dtData = [], result } = res
      let status = (isSuccess ? '0' : msg) >>> 0
      let drugURL = status === 2 ? result : ''
      context.commit('setListStatus', status, drugURL)
      context.commit('setDrugList', dtData)
    }, () => {
      context.commit('setListStatus', 0, '')
      context.commit('setDrugList', [])
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
