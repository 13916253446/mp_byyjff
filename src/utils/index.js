
//  判断是否是手机号
export let isPhoneNum = tel => {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|16[0-9]|17[678]|18[0-9]|14[57]|19[0-9])[0-9]{8}$/.test(tel)
}

export default {
  isPhoneNum
}

