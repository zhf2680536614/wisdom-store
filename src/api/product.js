import request from '@/utils/request'

// 获取搜索数据
export const getProList = (obj) => {
  const { sortType, categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      sortType,
      categoryId,
      goodsName,
      page
    }
  })
}

// 获取数据详情
export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

// 获取商品评价
export const getProComments = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
