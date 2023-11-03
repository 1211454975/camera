const {request} = require("../../../../utils/AdminAPI")
const app = getApp()
const BaseBehavior = require("../../../../behaviors/BaseBehavior")
Page({
  bahaviors: [BaseBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.initData()
  },
  async initData(){
    let res = await request({
      url:"tCenter/motioncate/listall"
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
    this.back
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
  async handleDelete(evt){
    console.log("handleDelete", evt)
    let cate = evt.currentTarget.dataset.item;
    let ids = [cate.id]
    let res = await request({
      url:"tCenter/dashcate/delete",
      data:ids
    })
    if(res.statusCode != 200){
      wx.showToast({
        title: res.errMsg,
      })
      return;
    }
    //主要就是刷新
    await this.initData()

  },
  //添加
  handleAdd(evt){
    wx.navigateTo({
      url: '../cate-add/index',
    })
  },
  //编辑基本属性
  handleEdit(evt){
    let cate = evt.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../cate-add/index?cate='+JSON.stringify(cate),
    })
  },
  handleSelected(evt){
    let item = evt.currentTarget.data.item;
    console.log("selected", item, evt)
    let pages = getCurrentPages();
    let prevPage = pages[pages.length-2]
    prevPage.setCate(item)
    wx.navigateBack({delta:1})
  }
  
})