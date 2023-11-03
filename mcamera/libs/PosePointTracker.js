/**
 * 在适配诸如跳绳、开合眺或动作交互类场景时，需要追踪某些关键点的变化趋势，插件的关键点跳跃追踪能力PointTracker可以追踪指定的关键点的x或y轴变化，趋势变化时将记录变化临界轴值。
 */
function PosePointTracker(){
  this.name="PosePointTracker";
  this.demo = function(){
    console.log("PosePointTracker demo called ", this.name)
  }


  
}
module.exports = PosePointTracker;