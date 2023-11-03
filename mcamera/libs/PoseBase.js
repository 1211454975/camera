const SCUtil = require("../utils/similarity-check")
/**
 * PoseBase中提供的基本算子，方便自定义完整的动作识别规则。
 * 算子属于代码级别，需要通过代码升级而进行升级。
 * 动作规则则由运维人员进行维护，对于SaaS用户，则不建议用户来配置，只需要利用平台配置好的规则即可。也就是说SaaS用户而言，只需要进行系统集成与功能订阅即可，简化这些用户集成工作，如果有二开需求，则通过在线需求论坛提出即可免费进行交付。
 * @param {*} _key 
 * @param {*} _name 
 * @param {*} _rule 
 */
function PoseBase(_key, _name, _type, _def){
  var key = _key;
  var name= _name;
  var type = _type;
  var def = _def;

  var motionList= []; //保存所有的动作捕获数据
  var times = 0; //根据规则计算出次数
  this.onTick = null;
  /**
   * 执行规则
  */
  this.check = function(poseData){
    if(this.type=="match")return this.doMatch(poseData)
    return this.doCount(poseData)
  }
  /**
    * 
  */
  this.doMatch = function(poseData){
    var pose1=[],pose2=[];
    //pose1 = def //根据规则定义信息获取
    //pose2 = poseData,是通过函数参数提供的
    //img_shape:这里就缺省提供。
    var img_shape = {
      image_height:1,
      image_width: 1,
      channel:3
    }
    var sc = new SCUtil.SimilarityCheck({})
    var res = sc.get_pose_similarity(pose1,img_shape,pose2,img_shape);
    console.log("res==>", res)
    var temp = sc.get_min_pose_similarity(res.details)
    return {
      summary:res.summary,
      details:temp
    }
  }
  //
  /**
   * 需要考虑计时类和计数类两种情况。一般计数类也包含计时。
   * 相似性检查，不在此类提供，单独提供，具体参考MotionBase。
   * 如果是计数，则规则定义格式：
   * {
   *    name:"",
   *    calc:"count",
   *    children:[{},{}]
   * }
   * children中包括两个子规则，表示计数的两个检测条件。
   * 如果是单纯的计时运动，则规则定义格式：
   * {
   *    name:"",
   *    calc:"",
   *    children:[]
   * }
   * calc非count，其它可选择的：
   * OR
   * AND
   * match-xxx
   * 
   * @param {*} poseData 
   */
  this.doCount = function(poseData){
    console.log("PoseBase.check called ", this.name)
    // 根据rule计算是否有对应的动作出现，如果出现，则计数。
    // TODO
    if(this.onTick){
      this.onTick(times)
    }
  }
  //所有计算函数定义于此：角度、垂直、水平、视角、相似、卧躺、范围、关节点追踪
  //1.角度匹配
  this.matchAngle = function(featureData,param){
    //TODO
    return {status:true,msg:""}
  }
  /**
   * 2.是否直立
   * param = {
   *  offset: 15 //default
   * }
   * 处理逻辑：
   * - 重心夹角=0
   * - 左右膝关节夹角=0
  */
  this.matchStand = function(featureData,param){
    //
    return {status:true,msg:""}
  }
  /**
   * 3.是否水平
   * param={
   *  offset:15 //default
   * }
   * 判断逻辑：左右手臂伸直
   * - 左右肩膀夹角=0
   * - 左右肘关节夹角=0
   * */
  this.matchBalance = function(featureData,param){
    //
    return {status:true,msg:""}
  }
  /**
   * 4.视角朝向
   * param={
   *  position: 'right' //front，back，left，right
   * }
   * 判断逻辑：判断朝向
   * /
  this.matchOrientation = function(featureData,param){
    //
    return {status:true,msg:""}
  }
  //5.是否相似
  this.matchSimular = function(featureData,param){
    //
    return {status:true,msg:""}
  }
  //6.卧躺
  this.matchLie = function(featureData,param){
    //
    return {status:true,msg:""}
  }
  //7.范围
  this.matchRange = function(featureData,param){
    //
    return {status:true,msg:""}
  }
  /**
   * 8.全身检查
   * param = {}
   * 处理逻辑：检查各个关键点是否存在
   * 
   * */
  this.whole = function(featureData,param){
    // 检查关键特征数据是否存在。如果全部存在，则返回true，否则返回false
  }

}

module.exports = PoseBase;
