/**
 * 一次捕获的身体关键点数据
 */
class PoseData{
  constructor(){

    // 重心夹角
    this.angleOfBC = 0;//: "angleofbc", //
    // 上肢朝向
    this.oriOfUpper = 0;//: "oriofupper",// = 3*Math.pi/2
    // 下肢朝向
    this.oriOfLower = 0;//: "orioflower",// = Math.pi/2
    // 左右朝向
    this.oriOfBody = 0;//: "oriofbody",
    
    // 1上肩夹角
    this.angleOfUpperShoulder = 0;//: "angleofuppershoulder",
    // 2下肩夹角
    this.angleOfLowerShoulder = 0;//: "angleoflowershoulder",
    // 3左肩夹角
    this.angleOfLeftShoulder = 0;//: "angleofleftshoulder",
    // 4右肩夹角
    this.angleOfRightShoulder = 0;//: "angleofrightshoulder",
    // 5左肘夹角
    this.angleOfLeftElbow = 0;//: "angleofleftelbow",
    // 6右肘夹角
    this.angleOfRightElbow = 0;//: "angleofrightelbow",
    // 7臀部夹角
    this.angleOfHip = 0;//:"angleofhip",
    // 8左臀夹角
    this.angleOfLeftHip = 0;//:"angleoflefthip",
    // 9右臀夹角
    this.angleOfRightHip = 0;//:"angleofrighthip",
    // 10左膝关节夹角
    this.angleOfLeftKnee = 0;//: "angleofleftknee",
    // 11右膝关节夹角
    this.angleOfRightKnee = 0;//: "angleofrightknee",
    // 12左踝关节夹角
    this.angleOfLeftAnkle = 0;//: "angleofleftankle",
    // 13右踝关节夹角
    this.angleOfRightAnkle = 0;//: "angleofrightankle",
    // 14左臂区夹角
    this.angleOfLeftShoulderSection = 0;//: "angleofleftshouldersection",
    // 15右臂区夹角
    this.angleOfRightShoulderSection = 0;// "angleofrightshouldersection",
    // 16左臀区夹角
    this.angleOfLeftHipSection = 0;//: "angleoflefthipsection",
    // 17右臀区夹角
    this.angleOfRightHipSection = 0;//: "angleofrighthipsection",
  
  }
  mock(){
    let poseData = [22]
    poseData[0]={x:0.0,y:0.8}
    poseData[1]={x:0.1,y:0.9}
    poseData[2]={x:-0.1,y:0.9}
    poseData[3]={x:0.2,y:0.8}
    poseData[4]={x:-0.2,y:0.8}
    poseData[5]={x:0.4,y:0.6}
    poseData[6]={x:-0.4,y:0.6}
    poseData[7]={x:0.5,y:0.3}
    poseData[8]={x:-0.5,y:0.3}
    poseData[9]={x:0.55,y:0.1}
    poseData[10]={x:-0.55,y:0.1}
    poseData[11]={x:0.6,y:0.0}
    poseData[12]={x:-0.6,y:0.0}
    poseData[13]={x:0.2,y:-0.3}
    poseData[14]={x:-0.2,y:-0.3}
    poseData[15]={x:0.2,y:-0.6}
    poseData[16]={x:-0.2,y:-0.6}
    poseData[17]={x:0.65,y:0.0}
    poseData[18]={x:-0.65,y:0.0}
    poseData[19]={x:0.3,y:-0.65}
    poseData[20]={x:-0.3,y:-0.65}
    poseData[21]={x:0.15,y:-0.62}
    poseData[22]={x:-0.15,y:-0.62}
    return poseData;
  }

  mock1(){
    let poseData = [22]
    poseData[0]={x:0.8,y:0.8}
    poseData[1]={x:0.9,y:0.9}
    poseData[2]={x:-0.7,y:0.9}
    poseData[3]={x:1.0,y:0.8}
    poseData[4]={x:0.8,y:0.8}
    poseData[5]={x:0.4,y:0.6}
    poseData[6]={x:-0.4,y:0.6}
    poseData[7]={x:0.5,y:0.3}
    poseData[8]={x:-0.5,y:0.3}
    poseData[9]={x:0.55,y:0.1}
    poseData[10]={x:-0.55,y:0.1}
    poseData[11]={x:0.6,y:0.0}
    poseData[12]={x:-0.6,y:0.0}
    poseData[13]={x:0.2,y:-0.3}
    poseData[14]={x:-0.2,y:-0.3}
    poseData[15]={x:0.2,y:-0.6}
    poseData[16]={x:-0.2,y:-0.6}
    poseData[17]={x:0.65,y:0.0}
    poseData[18]={x:-0.65,y:0.0}
    poseData[19]={x:0.3,y:-0.65}
    poseData[20]={x:-0.3,y:-0.65}
    poseData[21]={x:0.15,y:-0.62}
    poseData[22]={x:-0.15,y:-0.62}
    return poseData;
  }
}

module.exports = PoseData;