// component/searchBox/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholderValue:{
      type:String,
      value:"请输入..."
    },
    searchflag: {
      type: Boolean,
      value: false,
    },
    inputDisable:{
      type:Boolean,
      value:false
    },
    inputFocus:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchstr:""
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //获得焦点
    getfocus() {
      this.triggerEvent("searchGetfocus");
    },
    //搜索输入
    searchList(e) {
      this.setData({
        searchstr:e.detail.value
      })
      this.triggerEvent("searchList", e);
    },
    //搜索
    endsearchList(e) {
      this.triggerEvent("endsearchList",this.data.searchstr);
    },
    //失去焦点
    blursearch() {

    },
    // 取消
    cancelsearch() {
      this.setData({
        searchflag: false,
      })
      this.triggerEvent("cancelsearch");
    },
    //清空搜索框
    input_clear(e) {
      this.setData({
        searchstr:"" 
      })
    },
  }
})
