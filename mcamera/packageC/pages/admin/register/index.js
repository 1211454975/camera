// packageC/pages/admin/register/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  login(){
    wx.navigateTo({
      url: '../login/index',
    })
  },

  
  async formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e,e.detail.value)
    var formData = e.detail.value;
    let res = await request({
      url:"sCenter/mplugin/registToDever",
      method:"post",
      data: formData
    })
    console.log("admin.login==>", res)
    if(res.data.errCode != 0){
      wx.showToast({
        title: res.data.msg,
      })
      return;
    }
    
    //跳转到登录页
    wx.navigateTo({
      url: '../login/index',
    })
    
  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      username: '',
      password:''
    })
  },
})