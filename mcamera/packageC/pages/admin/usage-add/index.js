const {request} = require("../../../../utils/AdminAPI")
const app = getApp()
const BaseBehavior = require("../../../../behaviors/BaseBehavior")
Page({
  behaviors: [BaseBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    formData:{
      code:"",
      name:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options.usage){
      let usage = JSON.parse(options.usage||"{}")
      this.setData({
        formData: usage
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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
  formItemChange(evt){
    let formData = this.data.formData
    formData[evt.currentTarget.dataset.type] = evt.detail
    this.setData({
      formData:formData
    })
  },
  async handleSubmit(){
    console.log("handleSubmit:", this.data.formData)
    let data = this.data.formData;
    data.comId = "1"
    let res = await request({
      url:"tCenter/plugincate/save",
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