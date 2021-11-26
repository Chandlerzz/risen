// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    const account = wx.getStorageSync('account') 
    const password = wx.getStorageSync('password')

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  signin: function() {
  },
  globalData: {
    userInfo: null,
    appSessionCode:null
  }
})
