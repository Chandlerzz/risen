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
      const order_id = options.order_id;
      this.setData({
          order_id:order_id,
      })
      const account = wx.getStorageSync('account') || "" ;
      const state = this.data.state;
      const result = await get(`risen_module_maintainment_and_management/query_repairinfo_by_order_id?account=${account}&order_id=${order_id}&state=${state}`)
      const barcode = result.data.data[0].barcode;
      const imageB = result.data.data[0].imageB;
      const imageB1 = result.data.data[0].imageB1;
      const voltageB = result.data.data[0].voltageB;
      const imageF = result.data.data[0].imageF;
      const imageF1 = result.data.data[0].imageF1;
      const voltageF = result.data.data[0].voltageF;
      const location = result.data.data[0].location;
      const fileList = imageB === ""? [] : [{url:"https://object.risen.com/risen-repair-img/"+imageB,name:"name"}]
      const fileList1 = imageB1 === "" ? [] :[{url:"https://object.risen.com/risen-repair-img/"+imageB1,name:"name"}]
      const fileList2 = imageF === ""? [] : [{url:"https://object.risen.com/risen-repair-img/"+imageF,name:"name"}]
      const fileList3 = imageF1 === "" ? [] :[{url:"https://object.risen.com/risen-repair-img/"+imageF1,name:"name"}]
      this.setData({
          barcode:barcode,
          imageB:imageB,
          imageB1:imageB1,
          voltageB:voltageB,
          imageF:imageF,
          imageF1:imageF1,
          voltageF:voltageF,
          fileList:fileList,
          fileList1:fileList1,
          fileList2:fileList2,
          fileList3:fileList3,
          location:location,
      })
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
  deleteImage2(event){
      this.setData({
          fileList2:[]
      })
  },
  deleteImage3(event){
      this.setData({
          fileList3:[]
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
        const { fileList1 = [] } = that.data;
        fileList1.push({ ...file, url: res.data });
        that.setData({ fileList1 });
        const data = JSON.parse(res.data)
        that.setData({imageB1:data.data.filePath})
      },
    });
  },
afterRead2(event) {
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
afterRead3(event) {
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
        // if (!this.data.imageF || this.data.imageF === "") {
        //     message("please upload the images")
        //     validate = false
        // }
        // if (!this.data.imageF1 || this.data.imageF1 === "") {
        //     message("please upload the images")
        //     validate = false
        // }

        // if (!this.data.voltageF || this.data.voltageF === "") {
        //     message("please enter the voltage")
        //     validate = false
        // }
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
            let state = 2;
            if(imageB ==="" || imageB1 ==="" || voltageB ==="" || imageF ==="" || imageF1 === "" || voltageF ===""){
                state = 1
            }
            const that = this;
            const result = await post("risen_module_maintainment_and_management/create_and_update_repairinfo",{
                data:{
                    state:state,
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
