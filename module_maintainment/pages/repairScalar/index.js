import throttle from "../../functions/throttle.js"
import loader from "../../functions/loader"
import { get, post } from "../../functions/miniapp-api.js"
import formatDate from '../../functions/formatDate.js'
import message from '../../functions/message.js'

// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    order_id:"",
    barcode:"", 
    fileList:[],
    fileList1:[],
    fileList2:[],
    fileList3:[],
    imageB:"",
    imageB1:"",
    imageF:"",
    imageF1:"",
    voltageB:"",
    valtageF:"",
    barcodeError:"",
    state:1,
    location:"",
  },
  async onLoad(options) {
      const order_id = options.order_id;
      this.setData({
          order_id:order_id,
      })
      const account = wx.getStorageSync('account') || "" ;
      const state = this.data.state;
      const result = await get(`query_repairinfo_by_order_id?account=${account}&order_id=${order_id}&state=${state}`)
      const barcode = result.data.data[0].barcode;
      const imageB = result.data.data[0].imageB;
      const imageB1 = result.data.data[0].imageB1;
      const voltageB = result.data.data[0].voltageB;
      const location = result.data.data[0].location;
      this.setData({
          barcode:barcode,
          imageB:imageB,
          imageB1:imageB1,
          voltageB:voltageB,
          fileList:[{url:"https://object.risen.com/risen-repair-img/"+imageB,name:"name"}],
          fileList1:[{url:"https://object.risen.com/risen-repair-img/"+imageB1,name:"name"}],
          location:location,
      })
  },
  onShow(options){
  },
  afterInput(event){
    this.setData({
        voltageF: event.detail.value
    })
  },
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
  scan:throttle( async function(){
      const that = this
      wx.scanCode({
        success (res) {
          that.setData({
            barcode: res.result
          });
        }
      })
  },1000),
afterRead(event) {
    const that = this;
    const { file } = event.detail;
    const currentDate = formatDate(Date())
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://esbtest.risen.com/dev/app_5_minio/v1/put_object', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: {
		 bucket: 'RISEN_MINIO_NH_BUCKET_REPAIR',
		 file:file,
		 basePath: currentDate,
	  },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList2 = [] } = that.data;
        fileList2.push({ ...file, url: res.data });
        that.setData({ fileList2 });
        const data = JSON.parse(res.data)
        that.setData({imageF:data.data.filePath})
      },
    });
  },
afterRead1(event) {
    const that = this;
    const currentDate = formatDate(Date())
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://esbtest.risen.com/dev/app_5_minio/v1/put_object', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: {
		 bucket: 'RISEN_MINIO_NH_BUCKET_REPAIR',
		 file:file,
		 basePath: currentDate,
	  },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList3 = [] } = that.data;
        fileList3.push({ ...file, url: res.data });
        that.setData({ fileList3 });
        const data = JSON.parse(res.data)
        that.setData({imageF1:data.data.filePath})
      },
    });
  },
      
    edit:throttle( async function(){
        const order_id = this.data.order_id;        
        wx.navigateTo({
          url: `/pages/editModule/index?order_id=${order_id}`
        });
  },1000),

})
