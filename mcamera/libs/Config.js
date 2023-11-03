const Request = require("../services/Request")

function Config(){
  var request = new Request()
  var token = ""; // 用户
  var comId = ""; // 租户
  var appKey = ""
  var secretKey = ""
  this.setToken = function(token){
    token = token;
    console.log("setToken==>", token)
  }
  this.getToken = function(){
    return token;
  }
  this.setComId = function(comIda){
    comId = comId;
  }
  this.init = function(options){
    token = options.token;
    comId = options.comId;
    appKey = options.appKey;
    secretKey = options.secretKey;
    // TODO检查该账户是否申请。通过则返回，否则就抛出异常。后续所有的访问就禁止。
    //this.comId = request.validate(appKey,secretKey);
    console.log("init success: tenent=>", this.comId)
  };
  this.test = function(){
    //RequestService.test()
  }
  this.getCurrentUserid = function(){
    return this.userid;
  }
  
}
//不能返回对象，否则无法支持不同小程序
module.exports = Config;
