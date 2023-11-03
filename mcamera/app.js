// app.js
const {wxLogin, request} = require("./utils/API")
App({
  
  async onLaunch() {
    
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
  },
  globalData:{
    userInfo: {id: 1,remark2:2,userMobile:"18621910000",vipFlag: 4,userFlag:1},
    token:null,
    comId:null,
    wxappId:null
  },  
})
