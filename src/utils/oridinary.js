import request from '@/utils/request'
import { toEmail } from '@/utils/register'
import { getToken, getUserId } from '@/utils/auth'
import { Message } from 'element-ui'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const seconds = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getLocation = async () => {
  await request({
    url: 'http://api.map.baidu.com/api?v=2.0&ak=o1oYoWQbl3NEGncEaIdabuNTr5avoV04',
    method: 'get'
  })
  const geolocation = new createImageBitmap.Geolocation()
  geolocation.getCurrentPosition(r => {
    if (this.getSatus() === BMAP_STATUS_SUCCESS) {
      console.log('经度:' + r.point.lng + ', ' + '纬度:' + r.point.lat)
    } else {
      console.log('failed' + this.getSatus())
    }
  }, { enableHighAccuracy: true })
}

// console.log(getLocation())

const sendEmail = () => {
  toEmail(getUserId(), {
    token: getToken()
  }).then(res => {
    if (res.data.code === 20000) {
      Message({
        message: res.data.message,
        type: 'success'
      })
    }
  }).catch(err => {
    Message.error(err || '未知错误，请重试')
  })
}

export { formatTime, sendEmail }
