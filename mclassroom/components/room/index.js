// components/room/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    vcamera:null,
    vcameraSetting:{
      vcameraPosition:"left",
      vcameraSize:"small",
      vcameraBone:false,
    }
  },
  lifetimes:{
    ready(){
      let vcamera = this.selectComponent("#vcamera");
      this.setData({
        vcamera:vcamera
      })
      console.log("room==:",vcamera)
    }
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    handleTest(evt){
      this.data.vcamera.test()
      this.data.vcamera.initReady()
    },
    handleSettingChange(evt){
      console.log("handleSettingChange", evt)

      if(evt.detail&&evt.detail.vcameraSize){
        this.setData({
          vcameraSetting: evt.detail
        })
        
      }
      this.updateVcamera()
    },
    updateVcamera(){
      this.data.vcamera.setViewSize(this.data.vcameraSetting.vcameraSize)
      this.data.vcamera.initReady()
      this.data.vcamera.toggleCamera(this.data.vcameraSetting.vcameraDirection)
    },
    handleVrmChange(evt){
      console.log("handleVrmChange", evt)
    },
    handleBackgroundChange(evt){
      console.log("handleBackgroundChange", evt)
    },
    handleDecorationChange(evt){
      console.log("handleDecorationChange", evt)
    },
    handleItemChange(evt){
      console.log("handleItemChange", evt)
    },

    handleMotion(evt){
      console.log("handleMotion", evt)
    }
  }
})
