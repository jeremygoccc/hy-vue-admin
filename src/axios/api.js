import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求拦截器
axios.interceptors.request.use(config => config, error => Promise.reject(error))

// 响应拦截器
axios.interceptors.response.use(response => response, error => Promise.reject(error))

const fetch = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => { resolve(response.data) })
            .catch(error => { reject(error) })
    })
}

const getList = url => {
    return axios.post(url)
            .then(res => res.data)
            .catch(err => console.log(err))
}

export default { getList }
