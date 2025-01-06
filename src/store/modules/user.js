import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      userInfo: getItem()
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      setItem(userInfo)
    }
  },
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})
      // 跨模块请求方法 {root: true} 在全局查找setCartList方法
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {}
}
