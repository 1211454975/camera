// components/widget-add/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:null
    }
  },
  observers:{
    "item":function(newV){
      if(newV){
        this.setData({formData:newV})
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    showWidget:false,
    formData:{
      type:""
    },
    type:"",
    types:[{ text: '杭州', disabled: true },
    { text: '宁波' },
    { text: '温州' }],

    actions: [
      {
        name: '类型1',
      },
      {
        name: '类型2',
      },
      {
        name: '类型3',
        subname: '描述信息'
      }],
    showPicker:false,
    title:"",
    animateEffect:true,
    units:"",
    includeSl:false,
    value:"",
    size: 0,
    minimum:0,
    maximum:100,

    direction: 0,

    imageUrl:"",
    imageRefreshEvery: 10,//
  },
  lifetimes:{
    ready(){
      this.setData({
        showWidget:true
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    submitForm(evt){
      console.log("form发生了submit事件，携带数据为：", evt)
      let formData = {
        type:this.data.type,
        title:this.data.title,
        size:this.data.size,
        value:this.data.value,
        includeSl:this.data.includeSl,
        units:this.data.units,
        animateEffect:this.data.animateEffect
      }
      //进行数据验证
      this.triggerEvent("submit", formData)
      this.setData({
        showWidget:false
      })
    },
    setSelectedItem(refCol,value){
      let param = {}
      param[refCol]=value.name
      console.log("setSelectedItem",refCol,value,param)
      this.setData(param)
      this.setData({
        refCol: value.name
      })
    },
    openType(evt){
      this.setData({
        showPicker:true
      })
      console.log("openType:", this.data.showPicker)
      this.triggerEvent("showPicker", "type")
    },
    onClose() {
      this.setData({ showPicker: false });
    },
  
    onSelect(event) {
      console.log("onSelect",event.detail);
      this.setData({
        type: event.detail.name,
        showPicker:false
      })
    },
    onAnimateEffectChange(evt){
      console.log("onAnimateEffectChange",evt.detail);
      this.setData({
        animateEffect:evt.detail
      })
    },
    onIncludeSlChange(evt){
      this.setData({
        includeSl:evt.detail
      })
    },
    //确定提交弹窗按钮
  // updategoodlist(res){
  //   wx.showLoading({
  //     title: '正在提交',
  //     mask:true
  //   })
  //   //解构赋值
  //   var {barcode,name} = res.detail.value;
  //   //云函数
  //   wx.cloud.callFunction({
  //     name:"goodsUpdateData",
  //     data:{
  //       barcode:barcode,
  //       name:name
  //     }
  //   }).then(res => {
  //     console.log(res)
  //     this.setData({
  //       show:false
  //     })
  //     wx.hideLoading()
  //   })
  // },
  // //取消修改弹窗按钮
  // dialogOnClose(){
  //   console.log("关闭弹窗")
  // },

  }
})
