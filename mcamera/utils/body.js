function marker(options){
  var canvas = options.canvas;
  var pixelRatio = options.pixelRatio;

  var rpx2px = function(arg) {
    const info = wx.getSystemInfoSync()
    const width = info.screenWidth
    const height = info.screenHeight
    var canvasH = 750*height/width
    console.log("screenWidth",width, height, canvasH)
    return arg * width / 750
  }
  // 获取图片对象
  var getImage = async function (url) {  
    const off = wx.createOffscreenCanvas({type:'2d'})
    const image = off.createImage()   
    await new Promise((resolve, reject)=>{      
      image.onload = resolve  // 绘制图片逻辑
      image.src = url
    })
    return image
  }
  // 另外一个
  //把网路图片下载成本地图片
  
  this.init = function(){
    const ctx = canvas.getContext('2d')
    //ctx.scale(pixelRatio, pixelRatio)
    var imgUrl = "https://gitee.com/hawklink/motionsdk_oss/raw/master/images/body.png"
    getImage(imgUrl).then(image=>{
      // 定义画布对象
      //const ctx = wx.createCanvasContext("canvas", this);
      console.log("iamge", image)
      var dx = rpx2px(188)
      var dy = rpx2px(120)
      var dw = rpx2px(375)
      var dh = rpx2px(896)
      console.log("drawImage",dx,dy,dw,dh)
      ctx.drawImage(
        image,
        dx,dy,dw,dh
      )
      // ctx.drawImage(
      //   image, 
      //   rpx2px(188), rpx2px(120),
      //   rpx2px(375), rpx2px(200)
      // )
    })
  }

}
module.exports={
  marker
}