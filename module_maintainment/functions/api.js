
import {endpoints, env} from "../config.js"


export function url(api) {

  if(!endpoints[env]) throw new Error(`未设定${env}环境的服务地址`)

  let base = endpoints[env]
  if(base.lastIndexOf('/') != base.length-1) throw new Error("服务地址的末尾必须为/")

  return base + api;
}


export function get(api, params) {
  return request("GET", api, params)
}

export function put(api, params) {
  return request("PUT", api, params)
}

export function post(api, params) {
  return request("POST", api, params)
}

export function request( method,api, params={}) {

  return new Promise((resolve, reject) => {

    wx.request({
      url: url(api),
      method: method,
      header:params.header,
      data: params.data,
      success: res => {

        if (!res.data.code || res.data.code.indexOf('ERR_') !== 0) {
          resolve(res)
        } else {
          reject({
            code: res.data.code,
            message: res.data.message || defaultServerError.message
          })
        }


      },
      fail: res => {
        reject({
          code:  (res.data && res.data.code) || defaultNetworkError.code,
          message: (res.data && res.data.message) || defaultNetworkError.message
        });
      }
    });
  });
}

export const defaultServerError = { code: 'ERR_SERVER', message: "服务器错误，请联系管理员" };
export const defaultNetworkError = { code: 'ERR_NETWORK', message: "网络错误，请检查您的网络连接" };

/**
 * 返回比较基础库的大小
 */
export function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)
  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])
    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
}
