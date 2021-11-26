// component/imageButton/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    image:String,
    text:String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function () {
      this.triggerEvent("menuitemtapped",{text:this.properties.text},{})
      
    }
  },
  externalClasses: ['custom-class', 'icon-class', 'text-class']
})
