/**
 * 基本要点：需要以租户管理账号进行登录
 */
const {request} = require("../../../../utils/AdminAPI")
const app = getApp();

Page({
  onShareAppMessage() {
    return {
      title: 'form',
      path: 'page/component/pages/form/form'
    }
  },

  data: {
    username:"18621919999",
    password:"123456",
    pickerHidden: true,
    chosen: ''
  },
  onReady(){
    
    
  },
  pickerConfirm(e) {
    this.setData({
      pickerHidden: true
    })
    this.setData({
      chosen: e.detail.value
    })
  },

  pickerCancel() {
    this.setData({
      pickerHidden: true
    })
  },

  pickerShow() {
    this.setData({
      pickerHidden: false
    })
  },

  async formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e,e.detail.value)
    var formData = e.detail.value;
    let res = await request({
      url:"common/login",
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
    //登录成功，设置token
    let token = res.data.data;
    wx.setStorageSync("admin-token", token)
    //获取当前用户基本信息
    res = await request({
      url:"tCenter/base/getLoginStaff",
    })
    console.log("loginStaff==>", res)
    app.globalData.adminUser = res.data;
    //跳转到管理门户主页
    wx.navigateTo({
      url: '../home/index',
    })
    
  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      username: "",
      password:""
    })
  },
  //申请成为开发者
  registerToDever(){
    wx.navigateTo({
      url: '../register/index',
    })
  }
})