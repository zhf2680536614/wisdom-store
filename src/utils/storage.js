const INFO_KEY = 'ws_user_info'

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
