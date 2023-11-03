function PoseGraph(ctx, width,height, alpha=1){
  var ctx = ctx;
  var width = width;
  var height = height;
  var alpha = alpha;
  this.name="PoseGraph"
  this.lineColor = "#FF8E148C" //设置缺省的线颜色
  // 测试
  this.demo = function(){
    drawCircle(100,100, this.lineColor)
  }
  // 绘制圆点
  var drawCircle = function(x,y,color){
    if(!ctx)return;
    ctx.beginPath()
    ctx.arc(x,y,6,0, 2*Math.PI)
    ctx.fillStyle=color
    ctx.strokeStyle="#EBEEF5";
    ctx.lineWidth = 2
    ctx.fill()
    ctx.stroke() 
    ctx.closePath()
    ctx.beginPath()
    //ctx.moveTo(x,y)
    ctx.arc( x,y,8,0, 2*Math.PI)
    ctx.fillStyle=color
    ctx.strokeStyle="#EBEEF5";
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  }
  //绘制线段
  var drawLine = function(from,to,color){
    ctx.beginPath()
    ctx.moveTo(from.x,from.y)
    ctx.strokeStyle="blue"
    ctx.lineWidth = 2
    ctx.lineTo(to.x,to.y)
    ctx.stroke()
    drawCircle(from.x,from.y,"#FF8E148C")
    drawCircle(to.x,to.y,"#FF8E148C")
  }
  this.drawLine = drawLine;

  this.draw = function(keypoints){
    for(var i=0;i<keypoints.length;i++){
      drawCircle(keypoints[i].x,keypoints[i].y,this.lineColor)
    }
  }
}
module.exports = PoseGraph;
