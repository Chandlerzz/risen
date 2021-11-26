import throttle from "../../functions/throttle.js"
import { get } from "../../functions/miniapp-api.js"
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify'

Page({

  /**
   * 页面的初始数据
   */
  data: {
      account:"",
      password:"",
  },

  nameOnChange(event) {
      this.setData({
          account: event.detail
      });
  },
  passwordOnChange(event) {
      this.setData({
          password: event.detail
      });
  },

  isAuthorize:throttle( async function(){
      const account = this.data.account
      const password = this.data.password
      const result = await get(`risen_module_maintainment_and_management/queryaccount?account=${account}&password=${password}`)
      if (result.data.rows){
       wx.setStorageSync('account',account) 
       wx.setStorageSync('password',password) 
       wx.switchTab({
          url: `/pages/index/index`
        });
      } else {
      Notify('account or password error');    
      }
  },1000),
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})
