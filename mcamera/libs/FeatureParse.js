const FeatureData = require("./FeatureData");

class FeatureParse{
  constructor(poseData){
    this.poseData = poseData;
    this.newPoseData = [];
    this.featureData = new FeatureData()
    this.featureData.setPoseData(poseData)
  }
  getFeatureData(){
    return this.featureData;
  }
  // 各个肢体角度信息
  parse(){
      //预处理
      var newPoseData = this.normalize();
      
      this.newPoseData = newPoseData;
      // 缩放比例。作为选项功能TODO
      // 将姿态数据转化为特征数据，也就是当前对象的属性
      //重心夹角
      this.featureData.setAngleOfBC(this.parseBC());
      var theta = this.parseOrientation();
      this.featureData.setOriOfUpper(theta.o1);
      this.featureData.setOriOfLower(theta.o2);
      this.featureData.setOriOfBody(theta.o3);
  
  
      var vLimbsAngles = this.parseAngleOfLimbs();
      var vLimbsSectionAngles = this.parseAngleOfLimbsSection()
      // 设置到本对象属性中，便于外部访问
      this.featureData.setLimbsAngles(vLimbsAngles);
      this.featureData.setLimbsSectionAngles(vLimbsSectionAngles);
      // 还需要把PoseData作为原始数据合并到本对象中。
      return {status:true,msg:"特征数据转换成功！"}
  }
  // 计算Neck坐标,为normolize调用
  generateNeck(){
    let poseData = this.poseData;
    var neck = {}
    var rs = poseData[6], ls = poseData[5];
    if(!ls||!rs){
      throw {status:false,msg:"左肩或右肩关键点数据没有捕获！"}
    }
    neck = {x: (rs.x+ls.x)/2, y:(rs.y+ls.y)/2}
    console.log("generateNeck",neck)
    return neck;
  }  

  //计算Hip坐标，为normolize调用
  generateHip(){
    let poseData = this.poseData;

    var hip = {}
    var rhip = poseData[12], lhip = poseData[11];
    if(!lhip||!rhip){
      throw {status:false,msg:"左臀或右臀关键点数据没有捕获！"}
    }
    hip = {x: (rhip.x+lhip.x)/2, y:(rhip.y+lhip.y)/2}
    console.log("generateHip", hip)
    return hip;
  }

  // 正则化数据：也就是把neck作为坐标原点，重新计算关节点的坐标
  normalize(){
    let poseData = this.poseData;

    var neck = this.generateNeck()
    var hip = this.generateHip();
    

    var newPoseData = []
    for(var i=0;i<poseData.length;i++){
      var joint = poseData[i];
      joint = {x: joint.x-neck.x, y: joint.y-neck.y}
      newPoseData.push(joint);
    }
    newPoseData.push(neck) //23
    newPoseData.push(hip) //24
    return newPoseData;
  }
  //生成重心数据
  generateBC(){
    let poseData = this.newPoseData;
    var x,y;
    // 定义一系列关节点的重心权重参数
    var k_nose = 0.0706;
    var k_neck = 0.2391;
    var k_shoulder = 0.0356;
    var k_elbow = 0.0580;
    var k_wrist = 0.0192;
    var k_hand = 0.0180;
    var k_rlhip = 0.1297;
    var k_midhip = 0.1879;
    var k_knee = 0.1630;
    var k_ankle = 0.0643;
    var k_heel = 0.0158;

    // 重新计算手心坐标：根据elbow和wrist
    var rhand = {x: poseData[10].x + (poseData[10].x-poseData[8].x)/9, y: poseData[10].y + (poseData[10].y - poseData[8].y)/9}
    var lhand = {x: poseData[9].x  + (poseData[9].x -poseData[7].x)/9, y: poseData[9].y  + (poseData[9].y  - poseData[7].y)/9}

    var x = poseData[0].x * k_nose +
        poseData[23].x * k_neck +
        poseData[6].x * k_shoulder +
        poseData[5].x * k_shoulder +
        poseData[8].x * k_elbow +
        poseData[7].x * k_elbow +
        poseData[10].x * k_wrist +
        poseData[9].x * k_wrist +
        rhand.x * k_hand +
        lhand.x * k_hand +
        poseData[12].x * k_rlhip +
        poseData[11].x * k_rlhip +
        poseData[24].x * k_midhip +
        poseData[14].x * k_knee +
        poseData[13].x * k_knee +
        poseData[16].x * k_ankle +
        poseData[15].x * k_ankle +
        poseData[22].x * k_heel +
        poseData[21].x * k_heel;

    var y = poseData[0].y * k_nose +
        poseData[23].y * k_neck +
        poseData[6].y * k_shoulder +
        poseData[5].y * k_shoulder +
        poseData[8].y * k_elbow +
        poseData[7].y * k_elbow +
        poseData[10].y * k_wrist +
        poseData[9].y * k_wrist +
        rhand.y * k_hand +
        lhand.y * k_hand +
        poseData[12].y * k_rlhip +
        poseData[11].y * k_rlhip +
        poseData[24].y * k_midhip +
        poseData[14].y * k_knee +
        poseData[13].y * k_knee +
        poseData[16].y * k_ankle +
        poseData[15].y * k_ankle +
        poseData[22].y * k_heel +
        poseData[21].y * k_heel;
    return {x,y}
  }
  //生成重心夹角
  parseBC(){
    let poseData = this.newPoseData;
    //生成重心坐标
    var vBC = this.generateBC();
    //生成脊柱向量
    var neck = poseData[23]  //需要验证是否是这个数据
    var hip = poseData[24]  //需要验证是否是这个数据
    var vSpine = {
      x: hip.x,y:hip.y
    }
    // 计算vBC和vSpine夹角
    var theta = Math.acos((vBC.x*vSpine.x + vBC.y*vSpine.y)/Math.sqrt((vBC.x*vBC.x+vBC.y*vBC.y)*(vSpine.x*vSpine.x + vSpine.y*vSpine.y)))

    return theta;
  }
  //生成朝向数据
  parseOrientation(){
    let poseData = this.newPoseData;
    var rs = poseData[6];
    var ls = poseData[5];
    //上身朝向
    var s = (rs.x-ls.x)/Math.abs(rs.x-ls.x);

    //下身朝向
    var rhip = poseData[12];
    var lhip = poseData[11];
    var h = (rhip.x-lhip.x)/Math.abs(rhip.x-lhip.x);

    //左右朝向
    var rheel = poseData[22];
    var lheel = poseData[21];
    var rtoe = poseData[20];
    var ltoe = poseData[19];
    var vf = {
      x: rtoe.x+ltoe.x-rheel.x-lheel.x,
      y: rtoe.y+ltoe.y-rheel.y-lheel.y
    }
    var theta = 0;
    if(vf.x>0)
      theta = Math.atan(vf.x/vf.y)
    else if(vf.y>=0 && vf.x<0)
      theta = Math.atan(vf.y/vf.x) + Math.PI
    else if(vf.y<0 && vf.x<0)
      theta = Math.atan(vf.y/vf.x) - Math.PI
    else if(vf.y>0 && vf.x==0)
      theta = Math.PI
    else if(vf.y<0 && vf.x ==0)
      theta = -Math.PI
    
    //
    var o1 = s==1?3*Math.PI/2: Math.PI/2;
    var o2 = h==1?3*Math.PI/2: Math.PI/2;
    var o = {o1,o2,o3: theta}
    return o;

  }
  //生成肢体夹角数据
  parseAngleOfLimbs(){
    let poseData= this.newPoseData;
    // 一共有13个肢体夹角需要计算
    var vLimbsAngles = {}
    //1.头脖肩夹角
    vLimbsAngles.angleofuppershoulder = this.computeAngle(
      poseData[0],poseData[23],poseData[5]
    )
    //2.肩脖臀夹角
    vLimbsAngles.angleOfLowerShoulder = this.computeAngle(
      poseData[5],poseData[23],poseData[24]
    )
    //3.脖肩肘（左）
    vLimbsAngles.angleOfLeftShoulder = this.computeAngle(
      poseData[23],poseData[5],poseData[7]
    )
    //4.脖肩肘（右）
    vLimbsAngles.angleOfRightShoulder = this.computeAngle(
      poseData[23],poseData[6],poseData[8]
    )
    // 5.肩肘腕(左)
    vLimbsAngles.angleOfLeftElbow = this.computeAngle(
      poseData[5],poseData[7],poseData[9]
    )
    // 6.肩肘腕(右)
    vLimbsAngles.angleOfRightElbow = this.computeAngle(
      poseData[6],poseData[8],poseData[10]
    )
    // 7.脖臀腿(左)
    vLimbsAngles.angleOfHip = this.computeAngle(
      poseData[23],poseData[24],poseData[11]
    )
    // 8.臀腿膝(右)
    vLimbsAngles.angleOfLeftHip = this.computeAngle(
      poseData[24],poseData[12],poseData[14]
    )
    // 9.臀腿膝(左)
    vLimbsAngles.angleOfRightHip = this.computeAngle(
      poseData[24],poseData[11],poseData[13]
    )
    // 10.臀膝踝(右)
    vLimbsAngles.angleOfLeftKnee= this.computeAngle(
      poseData[12],poseData[14],poseData[16]
    )
    // 11.臀膝踝(左)
    vLimbsAngles.angleOfRightKnee = this.computeAngle(
      poseData[11],poseData[13],poseData[15]
    )
    // 12.膝踝趾(右)
    vLimbsAngles.angleOfLeftAnkle = this.computeAngle(
      poseData[14],poseData[16],poseData[20]
    )
    // 13.膝踝趾(左)
    vLimbsAngles.angleOfRightAnkle = this.computeAngle(
      poseData[13],poseData[15],poseData[19]
    )
    console.log("vLimbsAngles",vLimbsAngles)
    return vLimbsAngles;
  }
  //肢体区块重心夹角数据
  parseAngleOfLimbsSection() {
    let poseData = this.newPoseData;

    var vLimbsSectionAngles = {}
    //1.脖肩肘腕（右）
    vLimbsSectionAngles.angleOfLeftShoulderSection = this.computeAngleOfLimbsSection(
      poseData[23],poseData[6],poseData[8],poseData[10],poseData[24]
    )
    //2.脖肩肘腕（左）
    vLimbsSectionAngles.angleOfRightShoulderSection = this.computeAngleOfLimbsSection(
      poseData[23],poseData[5],poseData[7],poseData[9],poseData[24]
    )
    //3.臀腿膝踝（右）
    vLimbsSectionAngles.angleOfLeftHipSection = this.computeAngleOfLimbsSection(
      poseData[24],poseData[12],poseData[14],poseData[16],poseData[24]
    )
    //4.臀腿膝踝（左）
    vLimbsSectionAngles.angleOfRightHipSection = this.computeAngleOfLimbsSection(
      poseData[24],poseData[11],poseData[13],poseData[15],poseData[24]
    )

    return vLimbsSectionAngles;
  }
  /**
   * 根据三点坐标计算夹角C原点的夹角。
   * */
  computeAngle(A,C,B){
    if(!A||!B||!C)return 0;
    // 余弦定理
    //            C(0,0)
    //           /θ\
    //         b/   \a
    //         /     \
    // (x1,y1)A_______B(x2,y2)
    //            c
    // c^2 = a^2 + b^2 - 2*a*b*cosθ

    var x1 = A.x-C.x
    var y1 = A.y-C.y
    var x2 = B.x-C.x
    var y2 = B.y-C.y
    let cosRadian =
    (Math.pow(x1, 2) +
      Math.pow(y1, 2) +
      Math.pow(x2, 2) +
      Math.pow(y2, 2) -
      (Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))) /
    (2 *
      Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2)) *
      Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2)))

    return Math.acos(cosRadian)

  }
  /***
   * 计算由4个关节点组成的肢体块重心与脊柱夹角
   */
  computeAngleOfLimbsSection(p1,p2,p3,p4,vSpine){
    if(!p1||!p2||!p3||!p4||!vSpine)return 0;

    var vLimbsSection = {
      x: (p1.x+p2.x+p3.x+p4.x)/4,
      y: (p1.y+p2.y+p3.y+p4.y)/4
    }
    //计算三点组成夹角
    return this.computeAngle(vLimbsSection, {x:0,y:0}, vSpine);
  }
}
module.exports = FeatureParse;