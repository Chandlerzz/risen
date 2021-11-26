
import regeneratorRuntime from "./regenerator.js"
const {request} = require('./api.js')
import checkSession from '../services/wx.checkSession.js'
import appCode2session from '../services/app.code2session.js'
import login from '../services/wx.login.js'
const { utf16toEntities, uncodeUtf16 } = require('../functions/transforEmoji.js')

export const get = async function (api, params) {
  let res = await requestMiniAppApi("GET", api, params)
  if (res !== undefined) {
    res = JSON.parse(uncodeUtf16(JSON.stringify(res)))
  }
  res = JSON.parse(uncodeUtf16(JSON.stringify(res)))
  return res
}

export const put =  async function (api, params) {
  if (params !== undefined) {
    params = JSON.parse(utf16toEntities(JSON.stringify(params)))
  }
  let res = await requestMiniAppApi("PUT", api, params)
  if (res !== undefined) {
    res = JSON.parse(uncodeUtf16(JSON.stringify(res)))
  }
  return res
}

export const post = async function (api, params) {
  if (params !== undefined) {
    params = JSON.parse(utf16toEntities(JSON.stringify(params)))
  }
  let res = await requestMiniAppApi("POST", api, params)
  if (res !== undefined) {
    res = JSON.parse(uncodeUtf16(JSON.stringify(res)))
  }
  return res
}
export const requestMiniAppApi = async function (method, api, params={}) {
  const app = getApp()
  const globalData = app.globalData

  try{
    await checkSession()
  } catch(err) {
    refreshSession(globalData)
  }

  params.header = { 'app-session-code': globalData.appSessionCode }

  let result
  try{
    result = await request(method, api, params)
  } catch(err) {
    console.error(err)

    if (err.code === "ERR_SESSION_INVALID") {
      await refreshSession(globalData)
      params.header = { 'app-session-code': globalData.appSessionCode }
      result = await request(method, api, params)
    } else {
      throw err
    }
  }
  return result

}

const refreshSession = async function(globalData) {
  console.info("start refresh session")
  let retry = 0
  for (; retry < 3; retry++) {

    try {
      let loginResult = await login()
      let { appSessionCode } = await appCode2session(loginResult.code)
      console.debug("login result obtained session=%s ", appSessionCode)
      globalData.appSessionCode = appSessionCode
      break;

    } catch(err) {
      console.error(err)
    }
  }

  console.info("end refresh session")
  if(retry===3)
    throw Error("登录失败，请稍后重试")

}
