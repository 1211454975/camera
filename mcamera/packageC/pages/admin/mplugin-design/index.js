/**
 * 这个设计功能主要为作为管理模块调用的。
 * 因为访问后台的URL对应的是teacher模块
 */
const {getHot,getRecomment,request} = require("../../../../utils/AdminAPI/")
const bones = require("./bones")
const features = require("./features")
const help = require("./help")
const app = getApp();
const BaseBehavior = require("../../../../behaviors/BaseBehavior")
const info = wx.getSystemInfoSync();
Page({
  behaviors:[BaseBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    width:1,
    height:1,
    mplugin:{},
    toView: 'green',
    
    active:0,
    helpVisible: false,
    bones:bones,
    features: features,
    // md:"# tt \nwewe\nswswsw \n# w2\n1212"
    md:help
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("design.onLoad==>", options)
    let mplugin = JSON.parse(options.mplugin||"{type:'time'}")
    this.setData({
      mplugin:mplugin
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    const {windowWidth,windowHeight} = info
    this.setData({
      width:windowWidth,
      height:windowHeight
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.back();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  
  //保存插件配置
  saveDesign(event){},
  //进行插件测试
  doTest(event){
    console.log("test...")
  },
  //显示编写脚本帮助信息
  showHelp(event){
    this.setData({
      helpVisible:!this.data.helpVisible
    })
  }
})