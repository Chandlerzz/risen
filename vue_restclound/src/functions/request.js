import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/functions/sessionToken'
import AppError, {ERR_DEFAULT} from '@/appError'



// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_ENDPOINT, // api的base_url
    timeout: 60000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
    config => {
        if (store.state.session.token) {
            config.headers.Authorization = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }

        config.headers['Content-Type'] = 'application/json'
        config.headers.Accept='application/json'

        return config
    },
    error => {
        // Do something with request error
        Promise.reject(error)
    }
)

const fail = (error, callback) => {
  callback()


  Message.error(error.message)

}
service.interceptors.response.use(
    response => {


        let data

        try {
            data = JSON.parse(response.data)
        } catch (e) {
            data = response.data
        }


        //服务器端返回字符串
        if (typeof data === 'string') {
            throw new AppError(ERR_DEFAULT,data)
        }

        //服务器端返回json格式
        if (data.code && data.code.indexOf("ERR") !== -1 ) {

          if(data.code==='ERR_SESSION_INVALID') {
            store.dispatch('RemoveToken').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })

          }
          throw new AppError(data.code, data.message)

        }
        return data

    },
    error => {
        return Promise.reject(error)
    },
)


export const get = (url, params) => new Promise((resolve, reject) => {
    service({
        url,
        method: 'get',
        params
    })
    .then(res => {
        resolve(res)
    })
    .catch(err => {
        fail(err, () => reject(err))
    })
})

export const post = (url, data) => new Promise((resolve, reject) => {
    service({
        url,
        method: 'post',
        data
    })
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            fail(err, () => reject(err))
        })
})

export const put = (url, data) => new Promise((resolve, reject) => {
    service({
        url,
        method: 'put',
        data
    })
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            fail(err, () => reject(err))
        })
})

export const del = (url, params) => new Promise((resolve, reject) => {
    service({
        url,
        method: 'delete',
        params
    })
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            fail(err, () => reject(err))
        })
})


