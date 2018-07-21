import request from '@/utils/request'

export function getCategory () {
  return request({
    url: '/getCategorys',
    method: 'get'
  })
}

export function getTag (cId) {
  return request({
    url: `/getTag/${cId}`,
    method: 'get'
  })
}

export function toEmail (id, data) {
  return request({
    url: `/toEmail/${id}`,
    method: 'post',
    data: { ...data }
  })
}
