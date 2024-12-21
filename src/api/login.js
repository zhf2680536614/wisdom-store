import request from '@/utils/request'

export const getPikCode = () => {
  return request.get('/captcha/image')
}
