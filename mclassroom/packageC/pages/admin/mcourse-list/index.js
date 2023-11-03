const {request} = require("../../../../utils/AdminAPI")
const app = getApp()
const BaseBehavior = require("../../../../behaviors/BaseBehavior")

Page({
  behaviors: [BaseBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    
    type:"public",
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    //this.initCateData();
    this.initData();
  },

  async initData(){
    
    let res = await request({
      url:"tCenter/motioncourse/listall"
    })
    console.log("listall==>", res)
    if(res.statusCode != 200){
      wx.showToast({
        title: res.errMsg,
      })
      return;
    }
    this.setData({
      list: res.data
    })
    console.log("list==>", this.data.list)
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

  handleSelected(evt){
    console.log("handleSelected", evt)
    //TODO
  },
  handleEdit(evt){
    console.log("handleEdit", evt)
    let item = evt.detail
    wx.navigateTo({
      url: '../mcourse-add/index?mcourse='+JSON.stringify(item),
    })
  },
  handleDesign(evt){
    console.log("handleDesign", evt)
    let item = evt.detail
    wx.navigateTo({
      url: '../mcourse-design/index?mcourse='+JSON.stringify(item),
    })
  },
  handleDelete(evt){
    console.log("handleDelete", evt)
    let item = evt.detail
    //从数据库中删除
  },
  handleAdd(evt){
    wx.navigateTo({
      url: '../mcourse-add/index',
    })
  }
})