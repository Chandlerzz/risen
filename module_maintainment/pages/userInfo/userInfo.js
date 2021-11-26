// pages/userInfo/userInfo.js
import { get, post } from "../../functions/miniapp-api.js"
import regeneratorRuntime from "../../functions/regenerator.js"
import message from '../../functions/message.js'
import loader from "../../functions/loader"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    employee:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    loader.show()
    this.setData({
      employee: app.globalData.employeeInfo
    });
    loader.hide()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  login_out:function () {
    wx.setStorageSync('account','')
    wx.setStorageSync('password','')
    try{
        wx.reLaunch({
            url: `/pages/login/index`
        });
        } catch (err) {
            console.log(err)
            message("数据加载错误:" + err.message)
            loader.hide()
        }
    
  },
})
