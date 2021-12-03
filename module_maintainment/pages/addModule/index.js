//创建逻辑 
//自动生成单号
import throttle from "../../functions/throttle.js"
import loader from "../../functions/loader"
import { get, post } from "../../functions/miniapp-api.js"
import formatDate from '../../functions/formatDate.js'
import concatDate from '../../functions/concatDate.js'
import message from '../../functions/message.js'
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog'
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify'
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    barcode:"", 
    fileList:[],
    fileList1:[],
    imageB:"",
    imageB1:"",
    voltageB:"",
    voltageBError:"",
    barcodeError:"",
    location:""
  },
  onLoad(options) {
  },
  onShow(options){
  },
  beforeInput(event){
    this.setData({
        voltageB: event.detail.value
    })
  },
  afterInput(event){
    this.setData({
        voltageF: event.detail.value
    })
  },
  scan:throttle( async function(){
      const that = this
      wx.scanCode({
        async success (res) {
        const account = wx.getStorageSync('account') || "" ;
        const barcode = res.result;
        const state = 1;
        const flag = true;
        const result = await get(`query_repairinfo?account=${account}&barcode=${barcode}&state=${state}`)
        const data = result.data.data;
        if(result.data.data.length > 0) {
            const order_id = data[0].order_id;
            Dialog.confirm({
               title: 'WARNNING',
               confirmButtonText:"confirm",
               cancelButtonText: "cancel",
               message: 'The module corresponding to this barcode is under repair, do you want to edit this order?',
            })
              .then(() => {
                wx.navigateTo({
                  url: `/pages/editModule/index?order_id=${order_id}`
                })
                flag =false;
              })
              .catch(() => {
                     // on cancel
              });
        } 
            if(flag){
              that.setData({
                barcode: res.result
              });
            }
        }
      })
  },1000),
  //图片上传  
  afterRead(event) {
    const that = this;
    const { file } = event.detail;
    const currentDate = formatDate(Date())
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://esbtest.risen.com/dev/risen_minio/put_object', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: {
		 bucket: 'RISEN_MINIO_NH_BUCKET_REPAIR',
		 file:file,
		 basePath: currentDate,
	  },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = that.data;
        fileList.push({ ...file, url: res.data });
        that.setData({ fileList });
        const data = JSON.parse(res.data)
        that.setData({imageB:data.data.filePath})
      },
    });
  },
  afterRead1(event) {
    const that = this;
    const { file } = event.detail;
    const currentDate = formatDate(Date())
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://esbtest.risen.com/dev/risen_minio/put_object', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: {
		 bucket: 'RISEN_MINIO_NH_BUCKET_REPAIR',
		 file:file,
		 basePath: currentDate,
	  },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList1 = [] } = that.data;
        fileList1.push({ ...file, url: res.data });
        that.setData({ fileList1 });
        const data = JSON.parse(res.data)
        that.setData({imageB1:data.data.filePath})
      },
    });
  },
  // 图片删除
  deleteImage(event){
      this.setData({
          fileList:[]
      })
  },
  deleteImage1(event){
      this.setData({
          fileList1:[]
      })
  },
  getLocation:throttle(async function(){
      const that = this;             
      wx.getLocation({
          type: 'wgs84',
          success (res) {
              const latitude = res.latitude
              const longitude = res.longitude
              const location = latitude +","+longitude
              that.setData({
                  location:location
              })
          }
      })
  },1000),
      
    save:throttle( async function(){
        let validate = true;
        if (!this.data.barcode) {
            this.setData({
                barcodeError: "please enter barcode"
            })
            validate = false
        }
        if (isNaN(this.data.voltageB)) {
            this.setData({
                voltageBError: "please enter number without char on voltage"
            })
            Notify(this.data.voltageBError);    
            validate = false
        }
        // if (!this.data.imageB || this.data.imageB === "") {
        //     message("please upload the images")
        //     validate = false
        // }

        // if (!this.data.imageB1 || this.data.imageB1 === "") {
        //     message("please upload the images")
        //     validate = false
        // }

        // if (!this.data.voltageB || this.data.voltageB === "") {
        //     message("please enter the voltage")
        //     validate = false
        // }
        if (!validate) {
            return
        }
        try{
            const account = wx.getStorageSync('account') || "" 
            const order_id = concatDate(Date());
            const barcode = this.data.barcode;
            const imageB = this.data.imageB;
            const imageB1 = this.data.imageB1;
            const voltageB = this.data.voltageB;
            const location = this.data.location;
            const that = this;
            const result = await post("create_and_update_repairinfo",{
                data:{
                    state:1,
                    order_id:order_id,
                    barcode:barcode,
                    account:account,
                    voltageB:voltageB,
                    imageB:imageB,
                    imageB1:imageB1,
                    location:location,
                }
            })
           wx.reLaunch({
              url: `/pages/index/index`
            });
          } catch (error) {
            message(error.message || "数据加载错误，请重试")
            loader.hide()
          }
  },1000),

})
