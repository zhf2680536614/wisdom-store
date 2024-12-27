import { getCartList, changeCount } from '@/api/cart'

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
    },

    // 切换商品选中框的状态
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },

    // 全选反选
    toggleAllChecked (state, flag) {
      state.cartList.forEach(item => { item.isChecked = flag })
    },

    changeCountMutations (state, obj) {
      const goods = state.cartList.find(item => item.goods_id === obj.goodsId)
      goods.goods_num = obj.value
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
    },

    // 修改商品数量
    async changeCountAction (context, obj) {
      // 修改本地数据
      context.commit('changeCountMutations', obj)
      const { goodsId, value, goodsSkuId } = obj

      // 发送请求修改数据库数据
      await changeCount(goodsId, value, goodsSkuId)
    }
  },
  getters: {
    // 商品总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item, index) => {
        return sum + item.goods_num
      }, 0)
    },
    // 选中商品
    selCartList (state) {
      return state.cartList.filter((item) => item.isChecked)
    },
    // 选中商品总数
    selCartTotal (state, getters) {
      return getters.selCartList.reduce((sum, item) => {
        return sum + item.goods_num
      }, 0)
    },
    // 选中商品的总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    // 是否全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
