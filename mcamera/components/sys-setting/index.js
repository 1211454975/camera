// components/sys-setting/index.js
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
    vcameraChecked: false,
    vcameraPosition: "upperLeft",//upperRight
    vcameraDirection:"0",//1:正向，0:反向
    vcameraSize: "small",
    vcameraBone: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onVcameraChange(evt){
      this.setData({
        vcameraChecked: !this.data.vcameraChecked
      })
      this.sendEvent()
    },
    onVcameraPositionChange(evt){
      this.setData({
        vcameraPosition: evt.detail
      })
      this.sendEvent()
    },
    onVcameraDirectionChange(evt){
      this.setData({
        vcameraDirection: evt.detail
      })
      this.sendEvent()
    },
    onVcameraSizeChange(evt){
      this.setData({
        vcameraSize: evt.detail
      })
      this.sendEvent()
    },
    onVcameraBoneChange(evt){
      this.setData({
        vcameraBone: evt.detail
      })
      this.sendEvent()
    },
    sendEvent(){
      let evt = {
        vcameraChecked:this.data.vcameraChecked,
        vcameraPosition:this.data.vcameraPosition,
        vcameraDirection:this.data.vcameraDirection,
        vcameraSize:this.data.vcameraSize,
        vcameraBone:this.data.vcameraBone
      }
      this.triggerEvent("change", evt)
    }
  }
})
