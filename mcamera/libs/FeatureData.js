// 特征数据：通过数据预处理，将捕获的关键点位置信息转换为特征信息。
class FeatureData{
  constructor(){
    // 原始数据
    this.poseData= []
    // 重心夹角
    this.angleOfBC = 0; //
    // 上肢朝向
    this.oriOfUpper = 3*Math.pi/2
    // 下肢朝向
    this.oriOfLower = Math.pi/2
    // 左右朝向
    this.oriOfBody = Math.pi/2
  }
  setPoseData(poseData){
    this.poseData = poseData;
  }
  setAngleOfBC(angleOfBC){this.angleOfBC= angleOfBC;}
  setOriOfUpper(oriOfUpper){this.oriOfUpper = oriOfUpper;}
  setOriOfLower(oriOfLower){this.oriOfLower=oriOfLower;}
  setOriOfBody(oriOfBody){this.oriOfBody=oriOfBody;}
  setLimbsAngles(limbsAngles){
    // 1上肩夹角
    this.angleOfUpperShoulder = limbsAngles.angleofuppershoulder;
    // 2下肩夹角
    this.angleOfLowerShoulder = limbsAngles.angleoflowershoulder;
    // 3左肩夹角
    this.angleOfLeftShoulder = limbsAngles.angleofleftshoulder;
    // 4右肩夹角
    this.angleOfRightShoulder = limbsAngles.angleofrightshoulder;
    // 5左肘夹角
    this.angleOfLeftElbow = limbsAngles.angleofleftelbow;
    // 6右肘夹角
    this.angleOfRightElbow = limbsAngles.angleofrightelbow;
    // 7臀部夹角
    this.angleOfHip = limbsAngles.angleofhip;
    // 8左臀夹角
    this.angleOfLeftHip = limbsAngles.angleoflefthip;
    // 9右臀夹角
    this.angleOfRightHip = limbsAngles.angleofrighthip;
    // 10左膝关节夹角
    this.angleOfLeftKnee = limbsAngles.angleofleftknee
    // 11右膝关节夹角
    this.angleOfRightKnee = limbsAngles.angleofrightknee;
    // 12左踝关节夹角
    this.angleOfLeftAnkle = limbsAngles.angleofleftankle
    // 13右踝关节夹角
    this.angleOfRightAnkle = limbsAngles.angleofrightankle;
    
  }
  setLimbsSectionAngles(limbsSectionAngles){
    // 14左臂区夹角
    this.angleOfLeftShoulderSection = limbsSectionAngles.angleofleftshouldersection;
    // 15右臂区夹角
    this.angleOfRightShoulderSection = limbsSectionAngles.angleofrightshouldersection;
    // 16左臀区夹角
    this.angleOfLeftHipSection = limbsSectionAngles.angleoflefthipsection;
    // 17右臀区夹角
    this.angleOfRightHipSection = limbsSectionAngles.angleofrighthipsection;
  }
  
  //根据规则进行检查，如果满足则返回true，否则返回false
  /***
   * rule=[{
   *  name:"",
   *  op:"",
   *  value:xx
   * },{},...]
   */
  check(rule){
    
    if(!rule)return false;
    for(var i=0;i<rule.length;i++){
      let b = this.checkItem(rule[i])
      if(!b)return false;
    }
    return true;
  }
  /***
   * checkItem={}
   */
  checkItem(ruleItem){
    if(!ruleItem)return false;
    if(!this[ruleItem.name])return false;
    if(ruleItem.op=='eq'){
      if(this[ruleItem.name]==ruleItem.value)return true;
      else return false;
    }
    if(ruleItem.op=='leq'){
      console.log("leq==>", this[ruleItem.name],ruleItem.value)
      if(this[ruleItem.name]<=ruleItem.value)return true;
      else return false;
    }
    if(ruleItem.op=='geq'){
      console.log("geq==>", this[ruleItem.name],ruleItem.value)
      if(this[ruleItem.name]>=ruleItem.value)return true;
      else return false;
    }
    
    if(ruleItem.op=='between'){
      let {v1,v2} = ruleItem.value
      if(this[ruleItem.name]<=v2&&this[ruleItem.name]<=v1)return true;
      else return false;
    }
    return false;
    

  }
  //return this;
}
module.exports=FeatureData;
