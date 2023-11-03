import FeatureParse from "./FeatureParse"
const MaxErrorsOfFrame = 100;
/**
 * 
 * @param {*} _key 
 * @param {*} _name 
 * @param {*} _type 
 * @param {*} _def 
 */
function MotionBase(_key, _name, _type, _def){
  this.key = _key;
  this.name= _name;
  this.type = _type;
  this.def = _def; //后面需要调整为模板解析出来的特征数据FeatureData
  this.defJson = JSON.parse(_def||"{}");
  this.motionList= []; //保存所有的动作捕获数据
  this.counts = 0; //根据规则计算出次数
  this.duration = 0;//保持一个动作持续的时间
  this.isHalf = false;//标志计数的开始动作
  this.errorsOfFrame=0;//在计时时出现的最大错误帧，超过则停止即时
  this.timeStarted=false;//表示开始计时了
  this.parse = function(poseDataList){
    let featureParse = new FeatureParse(poseDataList);
    featureParse.parse()
    return featureParse.getFeatureData();
  }

  
  this.check = function(poseDataList,cb){
    console.log("MotionBase.check called", this.name)
    // 1.转换为待检测的特征数据列表
    var featureData = this.parse(poseDataList)
    // 2.根据type进行分别处理
    if(this.type=="count"){
      this.countCheck(featureData)
      if(cb)cb({counts:this.counts,duration:this.duration})
    }
    if(this.type=="time"){
      this.timeCheck(featureData)
      if(cb)cb({duration:this.duration})
    }

    // 调用DTW算法库与模板特征数据进行比对

    // 3.返回结果
  }
  // 计时,MaxErrorsOfFrame表示可以容忍一定的错误动作时长。
  this.timeCheck=function(featureData){
    //用于测试
    let defJson=JSON.parse(this.def)//[{name:'angleofbc',op:'leq',value:1}]
    if(!featureData)return;
    let b = featureData.check(defJson)
    if(!b)this.errorsOfFrame++;
    else this.errorsOfFrame = 0;//归零
    if(this.duration==0&&b)this.timeStarted = true
    if(this.timeStarted&&this.errorsOfFrame <= MaxErrorsOfFrame)
    this.duration++;//获取时间时
    console.log("timeCheck...",this.duration,this.errorsOfFrame , MaxErrorsOfFrame)
    return;
  }
  this.countCheck=function(featureData){
    //用于测试
    let defJson = JSON.parse(this.def)
    if(!Array.isArray(defJson))throw "规则定义不是数组";
    if(defJson.length!=2)throw "规则定义需要提供长度为2的数组";
    console.log("countCheck==>", defJson)
    let start_defJson=defJson[0] //[{name:'angleofbc',op:'eq',value:1}]
    let end_defJson=defJson[1]//[{name:'angleofbc',op:'eq',value:1}]
    
    if(!featureData)return;
    let b = false;
    if(this.isHalf){
      b = featureData.check(end_defJson)
      if(b){
        this.isHalf = false;
        this.counts++;
        if(this.duration==0)this.timeStarted=true
      }
    }
    
    else{
      b = featureData.check(start_defJson)
      if(b)this.isHalf = true
    }
    if(this.timeStarted)
      this.duration++;

    console.log("timeCount...")
  }
}

module.exports = MotionBase;
