// pages/index/index.js
import throttle from "../../functions/throttle.js"

Page({

    data: {
    },

    onLoad: async function (options) {
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: async function () { },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () { },


  /**lesson详情 */
    showLesson:throttle(function(event){
        const data = event.currentTarget.dataset;
        wx.navigateTo({
          url: `/pages/lesson/index?id=${data.id}`
        })
    },1000),

})
