// components/dialog/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible:{
      type:Boolean,
      value:false
    },
    title:{
      type:String,
      value:""
    },

  },
  observers:{
    "visible": function(newV){
      console.log("visible changed",newV)
      this.setData({
        curVisible: newV
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    curVisible: false
  },
  lifetimes:{
    created(){
      console.log("visible created",this.data.visible)
      this.setData({
        curVisible:this.data.visible
      })
    },
    attached(){
      console.log("visible attached",this.data.visible)
      this.setData({
        curVisible:this.data.visible
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleClose(){
      //先发出通知，然后关闭
      this.triggerEvent("close")
      this.setData({
        curVisible:false
      })
    }
  }
})
