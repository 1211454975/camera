const MotionBase = require("./MotionBase")
const PoseData = require("./PoseData")

function MotionEngine(){
  // 内置一些动作模板
  var motionTemplMap = new Map();

  this.name="MotionEngine"
  var init = function(){
    //定义或初始化动作模板
  }
  init();
  //MotionTempl集合
  this.getMotionTemplList = function(){
    // 存在数据库后，可以从数据库实时查询
    return motionTemplMap.values()
  }

  //动作对象实例构建器
  this.MotionBase = MotionBase;
  // 注册一个新的动作计数器
  this.MotionBase.register = function(key,name,video){
    if(!key||!name||!video)return new MotionBase();
    let config = motionTemplMap.get(key);
    if(config){
      return new MotionBase(config);
    }else{
      motionTemplMap.set(key,{key,name,video})
      return new MotionBase({key,name,video})
    }
  }
  // 去注册一个动作模板
  this.MotionBase.unregister = function(key){
    // TODO
  }
  this.MotionBase.create = function(key){
    let config = motionMap.get(key)
    return MotionBase(config)
    console.log("PoseCorrect.demo called ", this.name)
  }
  this.MotionBase.update = function(motionBase){
    //对已有运动序列进行修改
    return;
  }
  this.MotionBase.remove = function(key){
    //删除一个运动序列
  }
  this.PoseData = PoseData;
  

}
module.exports = CorrectEngine;