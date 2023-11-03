const {request} = require("../../../../utils/AdminAPI")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTriggered:false,
    curPage:1,//当前页
    pages: 1,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    console.log("user-list")
    let list = await this.initData()
    this.setData({list:list})
  },
  async initDemoData(){
    let list = [{
      id:1,
      name:"demo1",
      mobile:"123"
    },{
      id:2,
      name:"demo2",
      mobile:"112"
    }]
    this.setData({
      isTriggered:false
    })
    return list
  },
  async initData(){
    if(this.data.curPage > this.data.pages){
      console.log("到底了")
      return;
    }
    let res = await request({
      url:"tCenter/user/list",
      data:{page: this.data.curPage}
    })
    console.log("user-list by page==>", res)
    if(res.statusCode != 200){
      wx.showToast({
        title: res.errMsg,
      })
      return;
    }
    this.setData({
      curPage: this.data.curPage+1,
      pages: res.data.pages,
      isTriggered:false
    })
    console.log("list==>", this.data.list.records)
    return res.data.records
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

  handleRefresherRefresh(){
    console.log("handle refresher refresh")
  },
  async handleScrollToLower(){
    console.log("handle scroll to lower");
    let list = await this.initData()
    this.setData({
      list: [...this.data.list,...list]
    })
  }
})