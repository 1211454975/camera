// app.js
const {wxLogin, request} = require("./utils/API")
App({
  async onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    let code = await wxLogin();
    let res = await request({
      url:"wx/maportal/login",
      method:"post",
      data:{code:code}
    })
    console.log("res==>", res)
    wx.setStorageSync("token",res.data.data.token)
    //获取用户基本信息
    res = await request({
      url:"sCenter/getCurrentUserInfo"
    })
    
    this.globalData.userInfo = res.data
    console.log("userInfo==>", res)
    
    if(this.callbackAfterLogin){
      this.callbackAfterLogin()
    }
    

    // wx.login({
    //   success: res => {
    //     console.log("wx.login==>",res)
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     // url:"http://50526f7a.r8.cpolar.top/app/wx/maportal/login",
    //     wx.request({
    //       url:"http://192.168.37.9:8106/app/wx/maportal/login",
    //       method:"post",
    //       data:{code:res.code},
    //       success:(res1)=>{
    //         console.log("res1==>", res1)
    //         this.globalData.token = res1.data.data.token

    //       }
    //     })
    //   }
    // })
  },
  globalData:{
    userInfo: {id: 1,remark2:2,userMobile:"18621910000",vipFlag: 4,userFlag:1},
    token:null,
    comId:null,
    wxappId:null
  },  
})
