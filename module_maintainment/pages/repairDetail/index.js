// pages/index/index.js
import throttle from "../../functions/throttle.js"
import {get,post } from "../../functions/miniapp-api.js"
import loader from "../../functions/loader"
import navigation from "../../functions/navigation"
import message from "../../functions/message"
import { publicUrl, env } from "../../config.js"

Page({

    data: {
        lists:[],
    },

    onLoad: async function (options) {
      const barcode = options.barcode;
      this.setData({
          barcode:barcode,
      })
      const account = wx.getStorageSync('account') || "" 
        try {
          const result = await get(`risen_module_maintainment_and_management/query_repairinfo?account=${account}&barcode=${barcode}`)
          const lists = result.data.data;
          this.setData({
              lists:lists,
          })
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
        const limit = 3; 
        const result = await get(`risen_module_maintainment_and_management/query_repairinfo?account=${account}&limit=${limit}`)
        let recentRepiairs  = [];
        recentRepiairs = result.data.data;
        recentRepiairs = recentRepiairs.map(item => { 
            item.account = wx.getStorageSync("account");
            return item 
        })
        this.setData({
            recentRepiairs:recentRepiairs,
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

  edit:throttle(async function(e){
      const order_id = e.target.dataset.name;
       wx.navigateTo({
          url: `/pages/editModule/index?order_id=${order_id}`
        });
  },1000),
  swiperClick: function (e) {
      let row = e.currentTarget.dataset.row
      if (row.type === 'list') {
          wx.navigateTo({
              url: row.module
          })
          return
      } else if (row.type === "example")
          wx.navigateTo({
              url: row.module
          })
          return
  },

  scan:throttle( async function(){
      const that = this
      wx.scanCode({
        async success (res) {
            const account = wx.getStorageSync('account') || "" ;
            const barcode = res.result
            const result = await get(`risen_module_maintainment_and_management/query_repairinfo?account=${account}&barcode=${barcode}`)
            const data = result.data.data
            if (data.length ===0){
                message("can not find the infomation about this barcode")
                return
            }else if (data.length === 1){
                const order_id = data[0].order_id
                wx.navigateTo({
                   url: `/pages/repairScalar/index?order_id=${order_id}`
                });
            }else{
                const data1 = data.filter(item => item.state === 1)
                if (data1.length === 1){
                    const order_id = data1[0].order_id
                    wx.navigateTo({
                       url: `/pages/repairScalar/index?order_id=${order_id}`
                    });
                }else{
                    wx.navigateTo({
                       url: `/pages/repairList/index?order_id=${barcode}`
                    });
                } 

            }
            
        }
      })
  },1000),

})
