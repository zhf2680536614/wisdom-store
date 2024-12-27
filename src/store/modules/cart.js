import { getCartList } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 设置购物车数据
    setCartList (state, cartList) {
      state.cartList = cartList
    }
  },
  actions: {
    // 异步请求获取购物车数据
    async getCartList (context) {
      const { data } = await getCartList()
      // 手动给购物车的每条数据添加属性isCheck 判断是否被选中
      data.list.forEach((item) => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
      console.log(data.list)
    }
  },
  getters: {}
}
