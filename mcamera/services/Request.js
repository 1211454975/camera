// 提供对后端访问服务
function Request(options={}){
  this.baseUrl = options.baseUrl||"http://localhost:7070/";
  this.url = "";
  this.token = "";
  this.comId = "1681887987204660008";
  //
  this.validate = function(appKey,secretKey){
    // 访问后台成功后，设置token和tenant，并返回tenent。
    // demo code
    this.token = "X00001"
    this.comId = "1681887987204660008"
    return this.comId;
  }
  this.test = function(){
    this.request({
      url:"/pluginapi/admin/user/test",
      method:"get",
      data:{},
      callback: (res) =>{
        console.log("res==>", res)
      }
    })
  }
  this.init = function(){}
  // 获取缺省动作库
  this.getDefaultMotionList = function(){
    return []
  }
  // 获取跟学模板库
  this.getTemplList = function(){
    return []
  }
  // get请求
  this.request = function({url,method,data,callback,errFun}){
    var header = {
      "Content-type":"application/json;charset=utf-8",
      "Accept":"application/json",
      "Authorization": "Bearer "+ this.token,
      "comId": this.comId
    }
    
    wx.request({
      url:this.baseUrl+url,
      method: method,
      data:data,
      header:{
        "Content-type":"application/json;charset=utf-8",
        "Accept":"application/json",
        "Authorization": "Bearer "+ this.token,
        "comId": this.comId
      },
      timeout:10000,
      dataType:"json",
      success: function(res){
        console.log("request.success:", res)
        if(callback)callback(res.data)
      },
      fail:function(err){
        if(errFun)errFun(err)
      }
    })
  }
}

module.exports = Request;
