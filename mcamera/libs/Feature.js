const Feature = {
  // 重心夹角
  AngleOfBC: "angleofbc", //
  // 上肢朝向
  OriOfUpper: "oriofupper",// = 3*Math.pi/2
  // 下肢朝向
  OriOfLower: "orioflower",// = Math.pi/2
  // 左右朝向
  OriOfBody: "oriofbody",
  
  // 1上肩夹角
  AngleOfUpperShoulder: "angleofuppershoulder",
  // 2下肩夹角
  AngleOfLowerShoulder: "angleoflowershoulder",
  // 3左肩夹角
  AngleOfLeftShoulder: "angleofleftshoulder",
  // 4右肩夹角
  AngleOfRightShoulder: "angleofrightshoulder",
  // 5左肘夹角
  AngleOfLeftElbow: "angleofleftelbow",
  // 6右肘夹角
  AngleOfRightElbow: "angleofrightelbow",
  // 7臀部夹角
  AngleOfHip:"angleofhip",
  // 8左臀夹角
  AngleOfLeftHip:"angleoflefthip",
  // 9右臀夹角
  AngleOfRightHip:"angleofrighthip",
  // 10左膝关节夹角
  AngleOfLeftKnee: "angleofleftknee",
  // 11右膝关节夹角
  AngleOfRightKnee: "angleofrightknee",
  // 12左踝关节夹角
  AngleOfLeftAnkle: "angleofleftankle",
  // 13右踝关节夹角
  AngleOfRightAnkle: "angleofrightankle",
  // 14左臂区夹角
  AngleOfLeftShoulderSection: "angleofleftshouldersection",
  // 15右臂区夹角
  AngleOfRightShoulderSection: "angleofrightshouldersection",
  // 16左臀区夹角
  AngleOfLeftHipSection: "angleoflefthipsection",
  // 17右臀区夹角
  AngleOfRightHipSection: "angleofrighthipsection",
  
  // 定义所有关节点
  Nose: "nose", //鼻子0
  Neck: "neck", // 脖子1
  RightShoulder: "rightshoulder",//右肩2
  LeftShoulder: "leftshoulder", //左肩部5
  RightElbow:"rightelbow", //右肘3
  RightWrist: "rightwrist",//右腕4
  LeftElbow: "leftelbow",//左肘6
  LeftWrist: "leftwrist",//左腕7
  Hip: "hip",//臀8
  RightHip:"righthip",//右臀9
  LeftHip:"lefthip",//左臀12
  RightKnee:"rightknee",//右膝10
  LeftKnee:"leftknee", //左膝13
  RightAnkle:"rightankle", //右踝11
  LeftAnkle:"leftankle",//左踝14
  RightHeel: "rightheel",//右后跟15
  LeftHeel: "leftheel",//左后跟16
  RightBigToe:"rightbigtoe",//右脚趾17
  LeftBigToe: "leftbigtoe"//左脚趾18
}
module.exports = Feature;
