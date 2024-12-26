// 登录用户的key
const INFO_KEY = 'ws_user_info'

// 搜索历史的key
const HISTORY_KEY = 'ws_history_list'

// 获取用户信息
export const getItem = () => {
  const emptyObj = { token: '', userId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : emptyObj
}

// 设置用户信息
export const setItem = (userInfo) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(userInfo))
}

// 移除用户信息
export const removeItem = () => {
  localStorage.removeItem(INFO_KEY)
}

// 获取搜索历史记录
export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}

// 设置搜索历史记录
export const setHistoryList = (list) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list))
}
