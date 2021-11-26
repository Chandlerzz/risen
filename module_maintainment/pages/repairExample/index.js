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
    location,
  },
  async onLoad(options) {
      const account = wx.getStorageSync('account') || "" ;
      const imageB = "images/public/after_repair.png"
      const imageB1 = "images/public/after_repair_voltage.png"
      const imageF = "images/public/before_repair.png"
      const imageF1 = "images/public/before_repair_voltage.png"
      const location = "23.231278,89.123456"
      const voltageB = "30"
      const voltageF = "40.3"
      this.setData({
          barcode:"462113I4303724",
          imageB:imageB,
          imageB1:imageB1,
          imageF:imageF,
          imageF1:imageF1,
          voltageB:voltageB,
          voltageF:voltageF,
          fileList:[{url:"https://object.risen.com/risen-repair-img/"+imageB,name:"name"}],
          fileList1:[{url:"https://object.risen.com/risen-repair-img/"+imageB1,name:"name"}],
          fileList2:[{url:"https://object.risen.com/risen-repair-img/"+imageF,name:"name"}],
          fileList3:[{url:"https://object.risen.com/risen-repair-img/"+imageF1,name:"name"}],
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
        const { fileList3 = [] } = that.data;
        fileList3.push({ ...file, url: res.data });
        that.setData({ fileList3 });
        const data = JSON.parse(res.data)
        that.setData({imageF1:data.data.filePath})
      },
    });
  },
      
    save:throttle( async function(){
        let validate = true;
        if (!this.data.barcode) {
            this.setData({
                barcodeError: "please enter barcode"
            })
            validate = false
        }
        if (!this.data.imageF || this.data.imageF === "") {
            message("please upload the images")
            validate = false
        }
        if (!this.data.imageF1 || this.data.imageF1 === "") {
            message("please upload the images")
            validate = false
        }

        if (!this.data.voltageF || this.data.voltageF === "") {
            message("please enter the voltage")
            validate = false
        }
        if (!validate) {
            return
        }
        try{
            loader.show()
            const order_id = this.data.order_id;
            const account = wx.getStorageSync('account') || "" 
            const barcode = this.data.barcode;
            const imageB = this.data.imageB;
            const imageB1 = this.data.imageB1;
            const voltageB = this.data.voltageB;
            const imageF = this.data.imageF;
            const imageF1 = this.data.imageF1;
            const voltageF = this.data.voltageF;
            const location = this.location;
            const that = this;
            const result = await post("risen_module_maintainment_and_management/create_and_update_repairinfo",{
                data:{
                    state:2,
                    order_id:order_id,
                    barcode:barcode,
                    account:account,
                    voltageB:voltageB,
                    voltageF:voltageF,
                    imageB:imageB,
                    imageB1:imageB1,
                    imageF:imageF,
                    imageF1:imageF1,
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
