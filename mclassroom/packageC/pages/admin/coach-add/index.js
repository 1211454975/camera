const {request} = require("../../../../utils/AdminAPI")
const app = getApp()
const BaseBehavior = require("../../../../behaviors/BaseBehavior")
Page({
  behaviors: [BaseBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    types: [],
    formData: {
      type: 1,
      name: "",
      content: ""
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options.ds){
      let ds = JSON.parse(options.ds||"{}")
      this.setData({
        formData:ds
      })
    }
    this.initTypes()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  async initTypes(){
    let res = await request({
      url:"tCenter/dashds/type",
    })
    if(res.statusCode != 200){
      wx.showToast({
        title: res.errMsg,
      })
      return;
    }
    let types = res.data
    let temp = []
    for(let key in types){
      temp.push({
        code:key,
        name:types[key]
      })
    }
    this.setData({
      types: temp
    })
    console.log("types==>", this.data.types)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.back()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  //显示类型选择框
  handleType(evt){
    this.setData({
      show:!this.data.show
    })
  },
  //确定选则
  onSelect(evt){
    console.log("onSelect", evt)
    let formData = this.data.formData
    formData.type = Number(evt.detail.code)
    formData.typeName = evt.detail.name
    this.setData({
      formData:formData,
      show: false
    })
  },
  //表单字段更新
  formItemChange(evt){
    let formData = this.data.formData
    formData[evt.currentTarget.dataset.type] = evt.detail
    this.setData({
      formData:formData
    })
  },
  //提交表单
  async handleSubmit(){
    console.log("handleSubmit:", this.data.formData)
    let data = this.data.formData
    data.comId = "1"
    let res = await request({
      url:"tCenter/dashds/save",
      method:"post",
      data: data
    })
    if(res.statusCode != 200){
      wx.showToast({
        title: res.errMsg,
      })
      return;
    }
    wx.navigateBack();
  }
})