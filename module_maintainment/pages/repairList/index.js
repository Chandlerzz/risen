// pages/repairList/index.js
import throttle from "../../functions/throttle.js"
import {get,post } from "../../functions/miniapp-api.js"
import loader from "../../functions/loader"
import navigation from "../../functions/navigation"
import message from "../../functions/message"
import { publicUrl, env } from "../../config.js"

Page({

    data: {
        currentTabsIndex: 0,
        active: 1,
        activeNames: [],
        lists:[],
        state:1,
    },

    onLoad: async function (options) {
        const account = wx.getStorageSync('account') || "" 
        const password = wx.getStorageSync('password') || ""
        try {
            const result = await get(`risen_module_maintainment_and_management/queryaccount?account=${account}&password=${password}`)
            if (!result.data.rows){
              wx.navigateTo({
                url: `/pages/login/index`
              });
            }
        } catch (err) {
            console.log(err)
            message("数据加载错误:" + err.message)
            loader.hide()
        }
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: async function () {
        const account = wx.getStorageSync('account') || "" ;
        const barcode = null;
        const state = this.data.state;
        const result = await get(`risen_module_maintainment_and_management/query_repairinfo?account=${account}&barcode=${barcode}&state=${state}`)
        const lists = result.data.data;
        this.setData({
            lists:lists
        })

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () { },

  //tab页切换
  changeCurrentTabsIndex: function (event) {
      const state = event.detail.index + 1;
      this.selectComponent("#searchBar").input_clear(event);
    this.setData({
      currentTabsIndex:event.detail.index,
      state:state,
    });
    this.onShow();
  },

  //搜索框
  endsearchList:throttle(async function(e){
    loader.show();
    try{
        const account = wx.getStorageSync('account') || "" ;
        const barcode = e.detail;
        const state = this.data.state;
        const result = await get(`risen_module_maintainment_and_management/query_repairinfo?account=${account}&barcode=${barcode}&state=${state}`)
        const lists = result.data.data;
        this.setData({
            lists:lists
        })
    }catch(err){
      message("加载错误:"+err.message)
      console.info(err.message)
    }
    loader.hide();
  },1000),

  //collapse
  onChange(event) {
     this.setData({
        activeNames: event.detail,
     });
  },
  edit:throttle(async function(e){
      const order_id = e.target.dataset.name;
       wx.navigateTo({
          url: `/pages/editModule/index?order_id=${order_id}`
        });
  },1000),

})
