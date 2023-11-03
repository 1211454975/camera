const PoseBase = require("./PoseBase")
const PoseData = require("./PoseData")
/**
 * 姿态计算引擎
 */
function PoseEngine(){
  // 内置一些姿势规则
  var poseRuleMap = new Map();

  this.name="PoseEngine";
  var init = function(){
    // 初始化内置的计数动作
    poseRuleMap.set("Rope-Skipping",{key:"Rope-Skipping",name:"跳绳", rule:{}});
    poseRuleMap.set("Jumping-Jack",{key:"Jumping-Jack",name:"开合跳",rule:{}});
    poseRuleMap.set("Site-Up",{key:"Site-Up",name:"仰卧起坐"});
    poseRuleMap.set("Push-Up",{key:"Push-Up",name:"俯卧撑"});
    poseRuleMap.set("Squat",{key:"Squat",name:"深蹲起"})
    poseRuleMap.set("Plank",{key:"Plank",name:"平板支撑"})
    poseRuleMap.set("Squat-Horse",{key:"Squat-Horse",name:"马步蹲"})
  }
  init();
  //PoseRule集合
  this.list = function(queryParam){
    //从数据库查询
    return poseRuleMap.values()
  }
  this.listall = function(){
    //从数据库查询
  }
  this.info = function(key){
    //获取一个对象
    var poseBase = null;
    return poseBase;
  }
  //动作对象实例构建器
  this.PoseBase = PoseBase
  // 注册一个新的动作计数器
  this.PoseBase.register = function(key,name,rule){
    if(!key||!name||!rule)return new PoseBase();
    let config = poseRuleMap.get(key);
    if(config){
      return new PoseBase(config);
    }else{
      poseRuleMap.set(key,{key,name,rule})
      return new PoseBase({key,name,rule})
    }
  }
  // 去注册一个动作计数器
  this.PoseBase.unregister = function(key){
    // TODO
  }
  this.PoseBase.create = function(key){
    let config = motionMap.get(key)
    return MotionBase(config)
    console.log("PoseEngine.demo called ", this.name)
  }
  this.PoseBase.update = function(poseBase){

  }
  this.PoseBase.remove = function(key){
    return;
  }



  this.PoseData = PoseData;
  /**
   * 随机生成数据
   */
  this.PoseData.mock = function(width=480,height=640){
    var data = {
      score: generateRandom(),
      width: width,
      height: height,
      timestamp: Date.now(),
      keypoints:[]
    }
    data.keypoints.push(generateKeypointData("noise"))
    data.keypoints.push(generateKeypointData("left_eye"))
    data.keypoints.push(generateKeypointData("right_eye"))
    data.keypoints.push(generateKeypointData("left_ear"))
    data.keypoints.push(generateKeypointData("right_ear"))
    data.keypoints.push(generateKeypointData("left_shoulder"))
    data.keypoints.push(generateKeypointData("right_shoulder"))
    data.keypoints.push(generateKeypointData("left_elbow"))
    data.keypoints.push(generateKeypointData("right_elbow"))
    data.keypoints.push(generateKeypointData("left_wrist"))
    data.keypoints.push(generateKeypointData("right_wrist"))
    data.keypoints.push(generateKeypointData("left_hip"))
    data.keypoints.push(generateKeypointData("right_hip"))
    data.keypoints.push(generateKeypointData("left_knee"))
    data.keypoints.push(generateKeypointData("right_knee"))
    data.keypoints.push(generateKeypointData("left_ankle"))
    data.keypoints.push(generateKeypointData("right_ankle"))
    data.keypoints.push(generateKeypointData("noise"))
    data.keypoints.push(generateKeypointData("noise"))
    
    return data;
  }
  function generateKeypointData(name){
    var keypointData = {
      name: name,
      x: 100*generateRandom(),
      y: 100*generateRandom()+100,
      score: generateRandom()
    }
    return keypointData;

  }
  function generateRandom(){
    var a = Math.random()
    if(a<0.5)a=a+0.5
    return a;
  }
}

module.exports = PoseEngine;

