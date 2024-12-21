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
  actions: {},
  getters: {}
}
