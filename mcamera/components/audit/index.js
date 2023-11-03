// plugin/components/audit/index.js
const Body = require("../../utils/body")
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    width:320,
    height:640,
  },
  lifetimes:{
    attached(){
      
    },
    ready(){
      
    }
  },
  pageLifetimes:{
    show(){
      this.draw()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initCanvas(){
      const info = wx.getSystemInfoSync()
      const calcSize = (width, height) => {
        console.log(`canvas size: width = ${width} , height = ${height}`)
        this.setData({
          width,
          height,
        })
      }
      calcSize(info.windowWidth, info.windowHeight)
    },
    draw () {
    
      this.initCanvas()
  
      const $ = wx.createSelectorQuery().in(this)
      $.select('#canvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          // Canvas 对象
          const canvas = res[0].node
          this.canvas = canvas
          // Canvas 画布的实际绘制宽高
          const width = res[0].width
          const height = res[0].height
          console.log('---node:', width,height)
          // 创建canvas渲染上下文
          const ctx = canvas.getContext('2d')
          const dpr = wx.getWindowInfo().pixelRatio
          console.log('---dpr', dpr)
          // 手动改变canvas的宽和高
          canvas.width = width * dpr
          canvas.height = height * dpr
          console.log('---canvas', canvas)
          ctx.scale(dpr, dpr)
          // 以上代码都是基础工作，给canvas写css样式时可以使用rpx单位。
          
          ctx.fillStyle = 'orange'
          //ctx.fillRect(0,0, this.rpx2px(750),  this.rpx2px(this.data.height))
          //ctx.fillRect(0,0,this.data.width,this.data.height);
  
          //ctx.fillStyle = 'white'
          //ctx.font = `bold ${this.rpx2px(80)}px serif`
          //ctx.fillText('你好世界', this.rpx2px(215), 50)
          var marker = new Body.marker({
            canvas:canvas,
            pixelRatio:dpr
          })
          marker.init()
      })
    },
  }
})
