// plugin/pages/admin/home/index.js
const {request} = require("../../../../utils/AdminAPI")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeCounts:{},
    adminUser: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      adminUser: app.globalData.adminUser
    })
    this.initData()
  },
  async initData(){
    let res = await request({
      url:"tCenter/motioncourse/homeCounts"
    })
    console.log("homeCounts==>", res)
    if(res.statusCode != 200){
      wx.showToast({
        title: res.errMsg,
      })
      return;
    }
    this.setData({
      homeCounts: res.data
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: "管理首页"
    })

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
  toCateList(){
    wx.navigateTo({
      url: '../cate-list/index',
    })
  },
  toMCourseList(){
    wx.navigateTo({
      url: '../mcourse-list/index?type=public',
    })
  },
  
  toCoachList(){
    wx.navigateTo({
      url: '../coach-list/index',
    })
  },
  toUserList(){
    wx.navigateTo({
      url: '../user-list/index',
    })
  },



})