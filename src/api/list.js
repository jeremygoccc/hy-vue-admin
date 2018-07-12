import request from '@/utils/request'

export function getList (url) {
  return request({
    url: url,
    method: 'post'
  })
}
